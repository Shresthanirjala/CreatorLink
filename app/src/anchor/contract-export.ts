import { AnchorProvider, Program, type Idl } from '@coral-xyz/anchor';
import { PublicKey, type Cluster } from '@solana/web3.js';
import counterIdl from "./idl.json"
import type { AnchorCounter } from './idlType';


export const COUNTER_PROGRAM_ID = new PublicKey(counterIdl.address);

export function getCounterProgram(provider: AnchorProvider) {
  return new Program<AnchorCounter>(counterIdl , provider);
}

export function getCounterProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
      return new PublicKey(counterIdl.address);
    case 'testnet':
    case 'mainnet-beta':
    default:
      return COUNTER_PROGRAM_ID;
  }
}
