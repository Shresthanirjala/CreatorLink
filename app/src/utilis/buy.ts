import { Connection } from "@solana/web3.js"
import { useAnchorProvider } from "@/components/Solana/solana-provider"
import { Program, BN, AnchorProvider, Wallet } from "@coral-xyz/anchor"
import idl from "@/anchor/idl.json"
import type { CreatorLink } from "@/anchor/idlType"
import { PublicKey, Transaction, SystemProgram } from "@solana/web3.js"
import { 
  getAssociatedTokenAddress, 
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID
} from "@solana/spl-token"
import { useWallet } from "@solana/wallet-adapter-react"


const PlatformAddress =  "9X7MA8QsmtgsHU3WK4bjgjJtNEsWRrmuDTYncEBmPBCM"

const buytoken = async (
  amount: number,
  connection: Connection,
  wallet: any, // type from @solana/wallet-adapter-react
  token?: string
) => {
  if (!connection) throw new Error("Connection is required")
  if (!wallet.publicKey) throw new Error("Wallet not connected")

  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
    commitment: "processed",
  })

  const programId = new PublicKey("DTqpMgwBnw8jzBK3sH3ARBFHx4jD1JqgGqJVyymj1tqa")

  const program = new Program<CreatorLink>(idl, provider)
  const tokenMint = new PublicKey(token || "2ZSNQk3mBa6Zhd7ddCpK7cexTgdtptsKc5KJ6VFhorzM")
  const buyerTokenAccount = await getAssociatedTokenAddress(tokenMint, wallet.publicKey)

  // Check if token account exists
  let transaction = new Transaction()
  let buyerTokenAccountExists = true

  try {
    await connection.getTokenAccountBalance(buyerTokenAccount)
  } catch {
    buyerTokenAccountExists = false
    transaction.add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        buyerTokenAccount,
        wallet.publicKey,
        tokenMint
      )
    )
    const [vaultAuthority] = await PublicKey.findProgramAddressSync(
      [Buffer.from("vault_authority"), new PublicKey(PlatformAddress).toBuffer()],
      programId
    );
    
  }



  if (!buyerTokenAccountExists) {
    await provider.sendAndConfirm(transaction)
  }

  const tx = await program.methods
    .buyT(new BN(amount))
    .accounts({
      buyer: wallet.publicKey,
      creator: new PublicKey("57JGJZJcvwtp3mpx8ShMDv4dQ67P6Hj9R3arMud2Qxqj"),
      creatorState: new PublicKey("5rpuD1rYDBoQJ7jzw9FdFEe7QFBipaMvT8k1T1p1D1ft"),
      vaultTokenAccount: new PublicKey("5rpuD1rYDBoQJ7jzw9FdFEe7QFBipaMvT8k1T1p1D1ft"),
      buyerTokenAccount: buyerTokenAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
      mint: tokenMint,
      
    })
    .rpc()

  return tx
}


export { 
  buytoken
}