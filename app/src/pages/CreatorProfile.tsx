import React from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useCreatorProgram } from "@/hooks/use-creator"
import { Keypair, PublicKey } from "@solana/web3.js"

export default function CreatorProfile() {
  const { connected } = useWallet()
  const { accounts, initialize, getProgramAccount } = useCreatorProgram()

  const createCreatorProfile = async () => {
    const creatorState = Keypair.generate()
    const mint = new PublicKey("So11111111111111111111111111111111111111112") // example
    const basePrice = 1000000
    const slope = 10000
    const totalSupply = 1000
    const link = "https://example.com/creator"

    await initialize.mutateAsync({
      creatorState,
      mint,
      basePrice,
      slope,
      totalSupply,
      link,
    })
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Creator Profile</h1>

      <WalletMultiButton className="mb-4" />

      {!connected ? (
        <p className="text-yellow-400">Connect wallet to manage your profile.</p>
      ) : (
        <>
          <button
            onClick={createCreatorProfile}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={initialize.isPending}
          >
            {initialize.isPending ? "Creating..." : "Create Creator Profile"}
          </button>

          <div className="mt-8">
            {accounts.isLoading ? (
              <p>Loading creator accounts...</p>
            ) : (
              accounts.data?.map((acc, i) => (
                <div key={i} className="text-white bg-black/30 p-4 rounded-lg my-2">
                  {acc.publicKey.toBase58()}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}
