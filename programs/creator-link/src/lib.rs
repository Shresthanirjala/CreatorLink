use anchor_lang::prelude::*;
use anchor_spl::token_interface::{self, Mint, TokenAccount, TokenInterface};

declare_id!("DTqpMgwBnw8jzBK3sH3ARBFHx4jD1JqgGqJVyymj1tqa");

#[program]
pub mod creator_link {
    use super::*;

    pub fn initialize_creator(
        ctx: Context<InitializeCreator>,
        mint: Pubkey,
        base_price: u64,
        slope: u64,
        total_supply: u64,
        link: String,
    ) -> Result<()> {
        let state = &mut ctx.accounts.creator_state;

        state.creator = *ctx.accounts.creator.key;
        state.mint = mint;
        state.base_price = base_price;
        state.slope = slope;
        state.total_supply = total_supply;
        state.tokens_sold = 0;
        state.link = link;

        Ok(())
    }

    pub fn buy_t(ctx: Context<BuyToken>, token_to_bought: u64) -> Result<()> {
        let statedata = &mut ctx.accounts.creator_state;
        let price = statedata.base_price + (statedata.slope * statedata.tokens_sold);

        require!(
            **ctx.accounts.buyer.to_account_info().lamports.borrow() >= price,
            CustomError::InsufficientFunds
        );

        let cpi_accounts = token_interface::TransferChecked {
            mint: ctx.accounts.mint.to_account_info(),
            from: ctx.accounts.vault_token_account.to_account_info(),
            to: ctx.accounts.buyer_token_account.to_account_info(),
            authority: ctx.accounts.vault_authority.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_context = CpiContext::new(cpi_program, cpi_accounts);

        token_interface::transfer_checked(
            cpi_context,
            token_to_bought,
            ctx.accounts.mint.decimals
        )?;

        **ctx.accounts.buyer.try_borrow_mut_lamports()? -= price;
        **ctx.accounts.creator.try_borrow_mut_lamports()? += price;

        update_token_counter(statedata, token_to_bought);

        emit!(TokenPurchased {
            buyer: ctx.accounts.buyer.key(),
            amount: token_to_bought,
            price_paid: price,
        });

        Ok(())
    }

    pub fn withdraw(ctx: Context<WithdrawFunds>, amount: u64) -> Result<()> {
        require_keys_eq!(
            ctx.accounts.creator.key(),
            ctx.accounts.creator_state.creator,
            CustomError::Unauthorized
        );

        require!(
            **ctx.accounts.vault_account.try_borrow_lamports()? >= amount,
            CustomError::InsufficientFunds
        );

        **ctx.accounts.vault_account.try_borrow_mut_lamports()? -= amount;
        **ctx.accounts.destination.try_borrow_mut_lamports()? += amount;

        Ok(())
    }
}

fn update_token_counter(state: &mut CreatorState, amount: u64) {
    state.tokens_sold = state.tokens_sold.checked_add(amount).unwrap();
}

#[derive(Accounts)]
pub struct InitializeCreator<'info> {
    #[account(init, payer = creator, space = 8 + 32 * 2 + 8 * 4 + 4 + 220)]
    pub creator_state: Account<'info, CreatorState>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateMint<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init,
        payer = signer,
        mint::decimals = 6,
        mint::authority = signer,
        mint::freeze_authority = signer,
        seeds = [b"mint", signer.key().as_ref()],
        bump
    )]
    pub mint: InterfaceAccount<'info, Mint>,

    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct BuyToken<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(mut)]
    pub creator: SystemAccount<'info>,

    #[account(mut)]
    pub creator_state: Account<'info, CreatorState>,

    #[account(
        mut,
        token::token_program = token_program
    )]
    pub vault_token_account: InterfaceAccount<'info, TokenAccount>,

    #[account(
        mut,
        token::token_program = token_program
    )]
    pub buyer_token_account: InterfaceAccount<'info, TokenAccount>,

    /// CHECK: This is validated via seeds
    #[account(
        seeds = [b"vault_authority", creator.key().as_ref()],
        bump
    )]
    pub vault_authority: UncheckedAccount<'info>,

    pub token_program: Interface<'info, TokenInterface>,

    #[account(
        mint::token_program = token_program
    )]
    pub mint: InterfaceAccount<'info, Mint>,
}


#[derive(Accounts)]
pub struct WithdrawFunds<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,

    #[account(mut)]
        /// CHECK: We assume that this is the creator's vault account and it is safe to access directly.

    pub vault_account: AccountInfo<'info>,

    #[account(mut)]
    pub destination: AccountInfo<'info>,

    pub creator_state: Account<'info, CreatorState>,
}

#[account]
pub struct CreatorState {
    pub creator: Pubkey,
    pub mint: Pubkey,
    pub base_price: u64,
    pub slope: u64,
    pub total_supply: u64,
    pub tokens_sold: u64,
    pub link: String,
}

#[error_code]
pub enum CustomError {
    #[msg("Buyer has insufficient SOL to purchase token.")]
    InsufficientFunds,
    #[msg("You are not authorized to perform this action.")]
    Unauthorized,
}

#[event]
pub struct TokenPurchased {
    pub buyer: Pubkey,
    pub amount: u64,
    pub price_paid: u64,
}
