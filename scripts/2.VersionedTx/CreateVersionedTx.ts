import {
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
  TransactionInstruction,
  Connection,
} from "@solana/web3.js";
import { FgGreen, FgYellow } from "../lib/vars";
// 创建版本化交易
export async function CreateVersionedTx(
  publicKey: PublicKey,
  connection: Connection,
  txs: TransactionInstruction[],
) {
  // 获取最后的区块hash
  let recentBlockhash = await connection.getLatestBlockhash().then(res => res.blockhash);

  // 创建消息 (v0)
  const message = new TransactionMessage({
    payerKey: publicKey,
    recentBlockhash,
    instructions: txs,
  }).compileToV0Message();

  // 用消息创建版本化交易
  const tx = new VersionedTransaction(message);
  console.log(`${FgGreen}tx.version: ${FgYellow + tx.version}`);
  return tx;
}
