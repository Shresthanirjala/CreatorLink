import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CreatorLink } from "../target/types/creator_link";
import { SystemProgram, Keypair, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";

describe("creator-link", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CreatorLink as Program<CreatorLink>;

  const creatorState = Keypair.generate();
  const mint = Keypair.generate(); // dummy mint, not used yet
  const link = "https://example.com"; // dummy link, not used yet
  const connection = provider.connection;
  const wallet = provider.wallet;

  // Airdrop check and balance validation for the wallet
 
  // Initialize the creator if needed (this part is skipped in the current test)
  it("initialize_creator", async () => {
    const tx = await program.methods
      .initializeCreator(
        mint.publicKey,
        new anchor.BN(100),    // base_price
        new anchor.BN(5),      // slope
        new anchor.BN(1000),   // total_supply
        link
      )
      .accounts({
        creatorState: creatorState.publicKey,
        creator: provider.wallet.publicKey,
      })
      .remainingAccounts([
        {
          pubkey: SystemProgram.programId,
          isWritable: false,
          isSigner: false,
        }
      ])
      .signers([creatorState]) // ✅ THIS IS CRITICAL
      .rpc();

    console.log("Tx signature", tx);
    const data = await program.account.creatorState.fetch(creatorState.publicKey)
    console.log("Creator state", data);
  });
});
