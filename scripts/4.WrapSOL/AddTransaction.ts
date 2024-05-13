import {
  Transaction,
  TransactionInstruction,
  TransactionInstructionCtorFields,
} from "@solana/web3.js";

export function AddTransaction(
  ...items: (Transaction | TransactionInstruction | TransactionInstructionCtorFields)[]
) {
  return new Transaction().add(...items);
}
