import { useAnchorProvider } from '@/components/Solana/solana-provider'
import { useCreatorProgram } from '@/hooks/use-creator'
import { Keypair , PublicKey} from '@solana/web3.js'
import React, { useEffect } from 'react'

const Itest = () => {

    const { initialize } = useCreatorProgram()
    const provider = useAnchorProvider()
    
    // console.log("provider.wallet", provider.publicKey.toString())
    // console.log("key pair ", new Keypair())

    useEffect(() => {
      const run = async () => {
        if (!provider?.wallet?.publicKey) return

        const creatorState = Keypair.generate() // Ensure new keypair
        const mintaddress = "FWGfCg2BiF56hJcL4QQkSx4hx8PXnQE1obQXXhpPLBMn"
        const mint = new PublicKey(mintaddress)

        try {
          await initialize.mutateAsync({
            creatorState,
           mint,
            basePrice: 1,
            slope: 1,
            totalSupply: 1,
            link: "https://example.com",
          })
        } catch (err: any) {
          console.error("Transaction failed:", err)
          if (err.getLogs) {
            const logs = await err.getLogs()
            console.log("Transaction logs:", logs)
          }
        }
      }

      run()
    }, [provider?.wallet?.publicKey])
      
      
  return (
    <div>
      hi
    </div>
  )
}

export default Itest
