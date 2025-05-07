
import { Keypair, PublicKey } from "@solana/web3.js"
import { useMemo } from "react"
import { ExplorerLink } from "../hooks/use-transactiontoast"
import { useCounterProgram, useCounterProgramAccount } from "../hooks/use-count"
import { ellipsify } from "@/utilis/truncket"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export function CounterCreate() {
  const { initialize } = useCounterProgram()

  return (
    <button
      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all"
      onClick={() => initialize.mutateAsync(Keypair.generate())}
      disabled={initialize.isPending}
    >
      {initialize.isPending ? "Creating..." : "Create New Counter"}
    </button>
  )
}

export function CounterList() {
  const { accounts, getProgramAccount } = useCounterProgram()

  if (getProgramAccount.isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    )
  }

  if (!getProgramAccount.data?.value) {
    return (
      <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
        <span className="text-blue-400">
          Program account not found. Make sure you have deployed the program and
          are on the correct cluster.
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {accounts.isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      ) : accounts.data?.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.data?.map((account) => (
            <CounterCard
              key={account.publicKey.toString()}
              account={account.publicKey}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-10 bg-black/20 border border-white/10 rounded-xl">
          <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            No Counters Found
          </h2>
          <p className="text-gray-400 mb-6">
            Create your first counter to get started with the demo.
          </p>
          <CounterCreate />
        </div>
      )}
    </div>
  )
}

function CounterCard({ account }: { account: PublicKey }) {
  const { accountQuery, incrementMutation, decrementMutation } =
    useCounterProgramAccount({ account })

  let count = useMemo(
    () => accountQuery.data?.count ?? 0,
    [accountQuery.data?.count]
  )

  count = Number(count)

  return accountQuery.isLoading ? (
    <div className="p-10 border border-white/10 rounded-xl flex justify-center items-center min-h-[200px] bg-black/20">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  ) : (
    <div className="p-6 border border-white/10 rounded-xl bg-gradient-to-b from-black/40 to-black/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
      <div className="flex flex-col items-center">
        <div
          onClick={() => accountQuery.refetch()}
          className="text-7xl font-bold my-6 cursor-pointer bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text hover:scale-110 transition-transform"
        >
          {count}
        </div>

        <div className="flex gap-4 w-full my-4">
          <button
            className="w-1/2 py-2 rounded-lg bg-black/30 text-gray-300 hover:bg-black/50 border border-white/5 transition-colors disabled:opacity-50 font-medium"
            onClick={() => decrementMutation.mutateAsync()}
            disabled={decrementMutation.isPending}
          >
            {decrementMutation.isPending ? "Processing..." : "Decrement"}
          </button>
          <button
            className="w-1/2 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-opacity disabled:opacity-50 font-medium"
            onClick={() => incrementMutation.mutateAsync()}
            disabled={incrementMutation.isPending}
          >
            {incrementMutation.isPending ? "Processing..." : "Increment"}
          </button>
        </div>

        <div className="mt-4 w-full text-center">
          <ExplorerLink
            path={`account/${account}`}
            label={ellipsify(account.toString())}
            className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
          />
        </div>
      </div>
    </div>
  )
}

export default function Test() {
  const { connected } = useWallet()

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text text-center">
          Solana Counter Demo
        </h1>
        <p className="text-gray-400 text-center max-w-2xl mb-8">
          Create, increment, and decrement counters stored on the Solana
          blockchain.
        </p>

        {/* Connection status */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <div
            className={`px-4 py-2 rounded-full text-sm ${
              connected
                ? "bg-green-500/20 text-green-400"
                : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {connected ? "✓ Wallet Connected" : "⚠ Wallet Not Connected"}
          </div>
          <WalletMultiButton className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full" />
        </div>
      </div>

      {connected ? (
        <>
          {/* Counter creation section */}
          <div className="mb-10 p-6 bg-black/30 border border-white/10 rounded-xl text-center">
            <h2 className="text-xl font-semibold mb-4">Create a New Counter</h2>
            <p className="text-gray-400 text-sm mb-6">
              Each counter is stored as an account on the Solana blockchain.
            </p>
            <CounterCreate />
          </div>

          {/* Counter list section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Counters</h2>
              <button
                className="text-blue-400 text-sm hover:text-blue-300 flex items-center gap-1"
                onClick={() => useCounterProgram().accounts.refetch()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 2v6h-6"></path>
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                  <path d="M3 22v-6h6"></path>
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                </svg>
                Refresh
              </button>
            </div>
            <CounterList />
          </div>
        </>
      ) : (
        <div className="p-10 bg-black/20 border border-white/10 rounded-xl text-center mb-12">
          <p className="text-xl text-gray-300 mb-6">
            Please connect your wallet to create and manage counters
          </p>
          <WalletMultiButton className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full" />
        </div>
      )}

      {/* Information cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-black/20 border border-white/10 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">How It Works</h3>
          <p className="text-gray-400 text-sm">
            This demo showcases a Solana program deployed on devnet that
            implements a simple counter. Each counter account stores a number
            that can be incremented or decremented.
          </p>
        </div>

        <div className="p-6 bg-black/20 border border-white/10 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">
            React Query Integration
          </h3>
          <p className="text-gray-400 text-sm">
            We use TanStack Query to manage the state of Solana program
            interactions, providing efficient caching and background updates for
            a responsive user experience.
          </p>
        </div>

        <div className="p-6 bg-black/20 border border-white/10 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">Solana Blockchain</h3>
          <p className="text-gray-400 text-sm">
            Each operation (create, increment, decrement) is a transaction on
            the Solana blockchain. Click on the account addresses to view them
            in Solana Explorer.
          </p>
        </div>
      </div>
    </div>
  )
}
