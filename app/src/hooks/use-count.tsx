import { getCounterProgram, getCounterProgramId } from "@/anchor/contract-export";
import { ClusterNetwork, useCluster } from "@/components/cluster/cluster-data-access";
import { useAnchorProvider } from "@/components/Solana/solana-provider";
import { Keypair, PublicKey } from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTransactionToast } from "./use-transactiontoast";
import { toast } from "sonner";
import { useConnection } from "@solana/wallet-adapter-react";
import { setProvider } from "@coral-xyz/anchor";
import { useMemo } from "react";

const programId = getCounterProgramId(ClusterNetwork.Devnet)
const provider = useAnchorProvider()
const program = getCounterProgram(provider)
const cluster = useCluster()

export function useCounterProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  setProvider(provider)
  console.log("cluster")
  console.log("cluster", cluster)
  const programId = useMemo(() => getCounterProgramId("devnet"), [cluster])
  console.log("provider")
  console.log("provider", provider)
  const program = getCounterProgram(provider)

  const accounts = useQuery({
    queryKey: ["counter", "all", { cluster }],
    queryFn: () => program.account.counter.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ["get-program-account", { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ["counter", "initialize", { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods
        .initialize()
        .accounts({ counter: keypair.publicKey })
        .signers([keypair])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error("Failed to initialize account"),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useCounterProgramAccount({ account }: { account: PublicKey }) {
  const transactionToast = useTransactionToast()

  const accountQuery = useQuery({
    queryKey: ["account", account.toBase58()],
    queryFn: () => program.account.counter.fetch(account),
  })

  const incrementMutation = useMutation({
    mutationKey: ["increment"],
    mutationFn: () =>
      program.methods
        .increment()
        .accounts({
          counter: account,
        })
        .rpc(),

    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ["decrement"],
    mutationFn: () =>
      program.methods
        .decrement()
        .accounts({
          counter: account,
        })
        .rpc(),

    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

 

  return {
    incrementMutation,
    decrementMutation,
    accountQuery,
  }
}