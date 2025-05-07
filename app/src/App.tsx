import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { clusterApiUrl } from "@solana/web3.js"
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { useMemo } from "react"

import AppRoutes from "./app-routes"

// Import the required styles
import "@solana/wallet-adapter-react-ui/styles.css"

const queryClient = new QueryClient()

const App = () => {
  // You need to define network or use a specific value
  const network = "devnet" // or "mainnet-beta" or any other valid network
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [
      // if desired, manually define specific/custom wallets here (normally not required)
      // otherwise, the wallet-adapter will auto detect the wallets a user's browser has available
    ],
    [network]
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect={true}>
          <WalletModalProvider>
            <AppRoutes />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </QueryClientProvider>
  )
}

export default App
