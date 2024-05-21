import { NATIVE_MINT, getAccount } from "@solana/spl-token";
import { LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";
import { connection, payer, FgGreen, FgYellow } from "../lib/vars";
import { Ata } from "../3.Token/ATA";
import { AddTransaction } from "./AddTransaction";
import { SendAndConfirmTx } from "./SendAndConfirmTx";
import { CreateSyncNativeIx } from "./CreateSyncNativeIx";
// 包装SOL
(async () => {
  // 创建Ata账户用来保存你的wrapped SOL
  const associatedTokenAccount = await Ata(connection, payer, NATIVE_MINT, payer.publicKey);

  // 将 SOL 转移到关联的代币账户并使用 SyncNative 更新wrapped SOL 余额
  const solTransferTransaction = AddTransaction(
    // 第一个交易，发送sol
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: associatedTokenAccount,
      lamports: LAMPORTS_PER_SOL, // 数量
    }),
    // 第二个交易，创建SyncNative指令
    CreateSyncNativeIx(associatedTokenAccount),
  );
  // 发送和确认交易
  await SendAndConfirmTx(connection, solTransferTransaction, [payer]);
  // 获取账户信息
  const accountInfo = await getAccount(connection, associatedTokenAccount);

  console.log(
    `${FgGreen}Native: ${FgYellow + accountInfo.isNative}, ${FgGreen}Lamports: ${
      FgYellow + accountInfo.amount
    }`,
  );
})();
