import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer, TOKEN_PROGRAM_ID, getAssociatedTokenAddress, getMint } from "@solana/spl-token";

/**
 * Requests an airdrop of SOL to the specified wallet
 */
export async function requestAirdrop(connection: Connection, wallet: Keypair, amount = LAMPORTS_PER_SOL): Promise<string> {
  const signature = await connection.requestAirdrop(wallet.publicKey, amount);
  
  // Wait for airdrop confirmation
  await connection.confirmTransaction({
    signature,
    ...(await connection.getLatestBlockhash()),
  });
  
  return signature;
}

/**
 * Creates a new token mint
 */
export async function createNewMint(
  connection: Connection,
  payer: Keypair,
  mintAuthority: PublicKey,
  freezeAuthority: PublicKey | null = null,
  decimals = 9
): Promise<PublicKey> {
  const tokenMint = await createMint(
    connection,
    payer,
    mintAuthority,
    freezeAuthority,
    decimals
  );
  
  return tokenMint;
}

/**
 * Gets or creates an associated token account
 */
export async function getOrCreateTokenAccount(
  connection: Connection,
  payer: Keypair,
  mint: PublicKey,
  owner: PublicKey
) {
  return await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    owner
  );
}

/**
 * Mints tokens to a specified token account
 */
export async function mintTokens(
  connection: Connection,
  payer: Keypair,
  mint: PublicKey,
  destination: PublicKey,
  authority: PublicKey,
  amount: number
): Promise<string> {
  const signature = await mintTo(
    connection,
    payer,
    mint,
    destination,
    authority,
    amount,
    []
  );
  
  return signature;
}

/**
 * Transfers tokens from one account to another
 */
export async function transferTokens(
  connection: Connection,
  payer: Keypair,
  source: PublicKey,
  destination: PublicKey,
  owner: PublicKey,
  amount: number
): Promise<string> {
  const signature = await transfer(
    connection,
    payer,
    source,
    destination,
    owner,
    amount,
    []
  );
  
  return signature;
}

/**
 * Creates a connection to the Solana cluster
 */
export function createConnection(): Connection {
  return new Connection(clusterApiUrl("devnet"), 'confirmed');
}

/**
 * Creates a token from scratch and transfers it to a recipient
 */
export async function createAndTransferToken(
  payer: Keypair,
  recipientPublicKey: PublicKey,
  amount = 1000000000,
  decimals = 9
): Promise<{ mint: PublicKey, signature: string }> {
  // Connect to cluster
  const connection = createConnection();

  // Create new token mint using the payer's keypair
  const mint = await createNewMint(
    connection,
    payer,
    payer.publicKey,
    null,
    decimals
  );

  // Get token accounts
  const fromTokenAccount = await getOrCreateTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  );

  const toTokenAccount = await getOrCreateTokenAccount(
    connection,
    payer,
    mint,
    recipientPublicKey
  );

  // Mint tokens
  await mintTokens(
    connection,
    payer,
    mint,
    fromTokenAccount.address,
    payer.publicKey,
    amount
  );

  // Transfer tokens
  const signature = await transferTokens(
    connection,
    payer,
    fromTokenAccount.address,
    toTokenAccount.address,
    payer.publicKey,
    amount
  );

  return { mint, signature };
}

/**
 * Creates and mints tokens to the user's wallet
 */
export async function createAndMintToken(
  payer: Keypair,
  amount = 1000000000,
  decimals = 9
): Promise<{ mint: PublicKey, signature: string }> {
  // Connect to cluster
  const connection = createConnection();

  // Create new token mint
  const mint = await createNewMint(
    connection,
    payer,
    payer.publicKey,
    null,
    decimals
  );

  // Get token account
  const tokenAccount = await getOrCreateTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  );

  // Mint tokens
  const signature = await mintTokens(
    connection,
    payer,
    mint,
    tokenAccount.address,
    payer.publicKey,
    amount
  );

  return { mint, signature };
}