import { useAnchorProvider } from "@/components/Solana/solana-provider"
import { Keypair, PublicKey, Transaction, SystemProgram } from "@solana/web3.js"



import {
  ChevronRight,
  ChevronLeft,
  Wallet,
  User,
  Upload,
  Zap,
  Check,
  CheckIcon,
} from "lucide-react"

import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from "@solana/spl-token"
import React, { useState, useCallback } from "react"
import {
  Metaplex,
  keypairIdentity,
  toMetaplexFile,
} from "@metaplex-foundation/js"
// import { bundlrStorage } from "@metaplex-foundation/js-plugin-bundlr"


const TokenCreate = () => {
  const provider = useAnchorProvider()
  const [tokenMint, setTokenMint] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [shouldCreateToken, setShouldCreateToken] = useState<boolean>(false)
  const [tokenSupply, setTokenSupply] = useState<number>(1000000);

  const createToken = useCallback(async () => {
    if (
      !provider?.wallet?.publicKey ||
      !provider.connection ||
      !shouldCreateToken
    )
      return
    if (loading) return

    setLoading(true)
    setError(null)

    try {
      console.log("Creating new token...")
      const connection = provider.connection

      // Create a new mint account
      const mintKeypair = Keypair.generate()
      const lamports = await connection.getMinimumBalanceForRentExemption(82)

      // Get token account address
      const tokenAccount = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        provider.wallet.publicKey
      )

      // TRANSACTION 1: Create mint and token account in one transaction
      const createAccountsTx = new Transaction()

      // Add mint account creation instruction
      createAccountsTx.add(
        SystemProgram.createAccount({
          fromPubkey: provider.wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: 82,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          9,
          provider.wallet.publicKey,
          provider.wallet.publicKey,
          TOKEN_PROGRAM_ID
        )
      )

      // Add token account creation instruction
      createAccountsTx.add(
        createAssociatedTokenAccountInstruction(
          provider.wallet.publicKey,
          tokenAccount,
          provider.wallet.publicKey,
          mintKeypair.publicKey
        )
      )

      // Get latest blockhash and set transaction properties
      const blockhash = await connection.getLatestBlockhash()
      createAccountsTx.recentBlockhash = blockhash.blockhash
      createAccountsTx.feePayer = provider.wallet.publicKey

      // Partial sign with the mint keypair
      createAccountsTx.partialSign(mintKeypair)

      // Send and confirm transaction
      const signedTx = await provider.wallet.signTransaction(createAccountsTx)
      const signature = await connection.sendRawTransaction(
        signedTx.serialize()
      )
      await connection.confirmTransaction(signature)

      console.log(
        "Token mint and account created:",
        mintKeypair.publicKey.toString()
      )

      // TRANSACTION 2: Mint tokens to the wallet
      const mintTx = new Transaction().add(
        createMintToInstruction(
          mintKeypair.publicKey,
          tokenAccount,
          provider.wallet.publicKey,
          tokenSupply * 10 ** 9 // Convert to smallest units based on 9 decimals
        )
      )

      // Get latest blockhash
      const mbh = await connection.getLatestBlockhash()
      mintTx.recentBlockhash = mbh.blockhash
      mintTx.feePayer = provider.wallet.publicKey

      // Send and confirm transaction
      const mintSig = await provider.sendAndConfirm(mintTx, [])

      console.log("Tokens minted to wallet")
      setTokenMint(mintKeypair.publicKey.toString())
    } catch (error) {
      console.error("Error creating token:", error)
      setError("Failed to create token. See console for details.")
    } finally {
      setLoading(false)
      setShouldCreateToken(false)
    }
  }, [provider, shouldCreateToken, loading])
    
  
  const name = "dhenga_token"
  const image =
    "https://images.unsplash.com/photo-1660062993887-4938423dce59?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
   <div className="max-w-2xl w-full mx-auto bg-black">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Launch Your Creator Token
          </h2>

          {!tokenMint ? (
            <>
              <div className="mb-8">
                <div className="p-6 rounded-xl bg-gray-800 border border-gray-700 mb-6">
                  <h3 className="text-lg font-medium mb-4">Token Details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Token Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                          defaultValue="CREATOR"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Token Symbol
                        </label>
                        <input
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                          defaultValue="CRT"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Initial Supply
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                        defaultValue="1,000,000"
                        onChange={(e) => {
                          // Remove commas and convert to number
                          const value = e.target.value.replace(/,/g, '');
                          if (!isNaN(Number(value))) {
                            setTokenSupply(Number(value));
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gray-800 border border-gray-700">
                  <h3 className="text-lg font-medium mb-4">
                    Token Distribution
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Creator Reserve</span>
                      <div className="flex items-center">
                        <span className="text-white font-medium">20%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 h-full rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-gray-400">Community Rewards</span>
                      <div className="flex items-center">
                        <span className="text-white font-medium">50%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 h-full rounded-full"
                        style={{ width: "50%" }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-gray-400">Public Sale</span>
                      <div className="flex items-center">
                        <span className="text-white font-medium">30%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 h-full rounded-full"
                        style={{ width: "30%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => {}}
                  className="flex items-center px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-gray-500"
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Back
                </button>

                <button
                                  onClick={() => {
                                      setShouldCreateToken(true) 
                                      
                                        createToken()
                                  }}
                  disabled={loading}
                  className={`flex items-center px-8 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-medium ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Creating Token..." : "Launch Token"}
                  <Zap className="h-5 w-5 ml-2" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 mb-6">
                <Check className="h-12 w-12 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-4">Congratulations!</h3>
              <p className="text-gray-400 mb-8">
                Your creator token has been successfully launched.
                <br />
                You're now ready to start building your community!
              </p>

              <div className="p-6 rounded-xl bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-gray-700 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-gray-400 text-sm">Token Name:</span>
                    <h4 className="text-white font-medium">CREATOR (CRT)</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 text-sm">
                      Initial Supply:
                    </span>
                      <h4 className="text-white font-medium">{ tokenSupply}</h4>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-400 text-sm">
                      Contract Address:
                    </span>
                    <h4 className="text-white font-mono text-sm">
                      {tokenMint.substring(0, 4)}...
                      {tokenMint.substring(tokenMint.length - 4)}
                    </h4>
                  </div>
                  <a
                    href={`https://explorer.solana.com/address/${tokenMint}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center"
                  >
                    View on Explorer
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>

              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-medium">
                Go to Creator Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TokenCreate
