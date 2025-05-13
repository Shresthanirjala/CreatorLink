import { useCluster } from "@/components/cluster/cluster-data-access"
import { useConnection } from "@solana/wallet-adapter-react"
import { useTransactionToast } from "./use-transactiontoast"
import { useAnchorProvider } from "@/components/Solana/solana-provider"
import { getCounterProgram, getCounterProgramId } from "@/anchor/contract-export"
import { useMemo } from "react"
import { Program, setProvider, BN } from "@coral-xyz/anchor"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { CreatorLink } from "@/anchor/idlType"
import idl from "@/anchor/idl.json"
import { Keypair, PublicKey } from "@solana/web3.js"

export function useCreatorProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()

  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()

  const programId = useMemo(() => getCounterProgramId("devnet"), [cluster])
  const program = useMemo(() => new Program<CreatorLink>(idl, provider), [provider])

  setProvider(provider)

  const accounts = useQuery({
    queryKey: ["creator", "state", { cluster }],
    queryFn: () => program.account.creatorState.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ["get-program-account", { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ["creator", "initialize", { cluster }],
    mutationFn: async ({
      creatorState,
      mint,
      basePrice,
      slope,
      totalSupply,
      link,
    }: {
      creatorState: Keypair
      mint: PublicKey
      basePrice: number
      slope: number
      totalSupply: number
      link: string
    }) => {
      try {
        const tx = await program.methods
          .initializeCreator(
            mint,
            new BN(basePrice),
            new BN(slope),
            new BN(totalSupply),
            link
          )
          .accounts({
            creatorState: creatorState.publicKey,
            creator: provider.wallet.publicKey,
          })
          .signers([creatorState])
          .rpc()

        return tx
      } catch (err) {
        console.error("Initialization error:", err)
        throw err
      }
    },
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: (error: any) =>
      toast.error(`Failed to initialize account: ${error.message}`),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}
