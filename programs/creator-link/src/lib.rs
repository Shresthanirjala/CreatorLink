use anchor_lang::prelude::*;

declare_id!("2gK3Zf1joWevGnHJxUZPf3F56NhPYetdxQQo9QeH46cy");

#[program]
pub mod creator_link {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
