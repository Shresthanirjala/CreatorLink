import { getCounterProgram, getCounterProgramId } from "@/anchor/contract-export";
import { ClusterNetwork, useCluster } from "@/components/cluster/cluster-data-access";
import { useAnchorProvider } from "@/components/Solana/solana-provider";
import { Keypair, PublicKey } from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTransactionToast } from "./use-transactiontoast";
import { toast } from "sonner";
import { useConnection } from "@solana/wallet-adapter-react";
import { Program, setProvider } from "@coral-xyz/anchor";
import { useMemo } from "react";
import { AnchorCounter } from "@/anchor/idlType";
import idl from "@/anchor/idl.json";

// const programId = getCounterProgramId(ClusterNetwork.Devnet)
// const provider = useAnchorProvider()
// const cluster = useCluster()

export function useCounterProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()

  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getCounterProgramId("devnet"), [cluster])
  const program = getCounterProgram(provider)

    const program1 = new Program<AnchorCounter>(idl, provider);


  setProvider(provider)
  console.log("provider", provider)

  const accounts = useQuery({
    queryKey: ["counter", "all", { cluster }],
    queryFn: () => program.account.counter.all()
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
    onError: (error) => toast.error(`Failed to initialize account ${error}`),
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
  const provider = useAnchorProvider()
  const program = getCounterProgram(provider)
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