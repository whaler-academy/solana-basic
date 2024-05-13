import { NATIVE_MINT } from "@solana/spl-token";
import { connection, payer } from "../lib/vars";
import { Ata } from "../3.Token/ATA";
import { CloseAccount } from "./CloseAccount";
// 包装SOL
(async () => {
  // 创建Ata账户用来保存你的wrapped SOL
  const associatedTokenAccount = await Ata(connection, payer, NATIVE_MINT, payer.publicKey);
  // 关闭账户，回收SOL
  await CloseAccount(connection, payer, associatedTokenAccount, payer.publicKey, payer);
})();
