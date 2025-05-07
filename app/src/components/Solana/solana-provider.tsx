import { AnchorProvider } from "@coral-xyz/anchor"
import { WalletError } from "@solana/wallet-adapter-base"
import React from "react"
import {
  useConnection,
  useWallet,
  ConnectionProvider,
  WalletProvider,
  type AnchorWallet,
} from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { useCallback, useMemo } from "react"
import { useCluster } from "../cluster/cluster-data-access"

import("@solana/wallet-adapter-react-ui/styles.css")

export const WalletButton = React.lazy(() =>
  import("@solana/wallet-adapter-react-ui").then((mod) => ({
    default: mod.WalletMultiButton,
  }))
)

export function SolanaProvider({ children }: { children: React.ReactNode }) {
  const { cluster } = useCluster()
  const endpoint = useMemo(() => cluster.endpoint, [cluster])
  const onError = useCallback((error: WalletError) => {
    console.error(error)
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} onError={onError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export function useAnchorProvider() {
  const { connection } = useConnection()
  const wallet = useWallet()

  return new AnchorProvider(connection, wallet as AnchorWallet, {
    commitment: "confirmed",
  })
}
