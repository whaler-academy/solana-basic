import { getMint } from "@solana/spl-token";
import { connection, payer } from "../lib/vars";
import { CreateMint } from "./CreateMint";

(async () => {
  const mint = await CreateMint(
    connection,
    payer,
    payer.publicKey,
    payer.publicKey,
    2, // 小数点精度
    "Token",
  );

  // 获取铸造详情
  const mintInfo = await getMint(connection, mint);
  console.log(mintInfo);
})();
