import { useAnchorProvider } from "@/components/Solana/solana-provider"
import { useCreatorProgram } from "@/hooks/use-creator"
import { Keypair, PublicKey } from "@solana/web3.js"
import React, { useState } from "react"
import { toast } from "sonner"

const Itest = () => {
  const { initialize } = useCreatorProgram()
  const provider = useAnchorProvider()
  const [isInitializing, setIsInitializing] = useState(false)
  const [initializationDone, setInitializationDone] = useState(false)
  const [creatorStateKey, setCreatorStateKey] = useState<string | null>(null)

  const handleInitialize = async () => {
    if (!provider?.wallet?.publicKey) {
      toast.error("Please connect your wallet first")
      return
    }

    setIsInitializing(true)
    toast.loading("Initializing creator state...", { id: "initialize" })
    console.log("Starting initialization process...")

    const creatorState = Keypair.generate() // Ensure new keypair
    console.log(
      "Generated creator state keypair:",
      creatorState.publicKey.toString()
    )

    const mintaddress = "FWGfCg2BiF56hJcL4QQkSx4hx8PXnQE1obQXXhpPLBMn"
    const mint = new PublicKey(mintaddress)
    console.log("Using mint address:", mintaddress)

    try {
      const tx = await initialize.mutateAsync({
        creatorState,
        mint,
        basePrice: 1,
        slope: 1,
        totalSupply: 1,
        link: "https://example.com",
      })

      console.log("Initialization successful! Transaction signature:", tx)
      toast.success("Creator initialized successfully!", { id: "initialize" })
      setCreatorStateKey(creatorState.publicKey.toString())
      setInitializationDone(true)
    } catch (err: any) {
      console.error("Transaction failed:", err)
      if (err.getLogs) {
        const logs = await err.getLogs()
        console.log("Transaction logs:", logs)
      }
      toast.error("Initialization failed. See console for details.", {
        id: "initialize",
      })
    } finally {
      setIsInitializing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Creator Initialization
        </h1>

        <div className="space-y-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="font-medium mb-2">Initialize a New Creator</h2>
            <p className="text-gray-300 text-sm mb-4">
              This will create a new creator state account with the specified
              parameters.
            </p>

            <button
              onClick={handleInitialize}
              disabled={isInitializing || initializationDone}
              className={`w-full py-3 rounded-lg transition-all ${
                isInitializing
                  ? "bg-gray-600 cursor-not-allowed"
                  : initializationDone
                  ? "bg-green-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
              }`}
            >
              {isInitializing
                ? "Initializing..."
                : initializationDone
                ? "Initialized Successfully"
                : "Initialize Creator"}
            </button>
          </div>

          {initializationDone && creatorStateKey && (
            <div className="bg-gray-700 p-4 rounded-lg">
              <h2 className="font-medium mb-2">Initialization Successful!</h2>
              <div className="mt-2">
                <p className="text-gray-300 text-sm">
                  Creator State Public Key:
                </p>
                <div className="bg-gray-800 p-2 rounded mt-1 break-all font-mono text-xs">
                  {creatorStateKey}
                </div>
              </div>
              <p className="text-gray-300 text-xs mt-4">
                Save this public key for future reference. You'll need it to
                interact with your creator account.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Itest
