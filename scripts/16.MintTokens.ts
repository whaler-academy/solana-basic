import { connection, payer, FgGreen, FgYellow, TokenMint } from "./lib/vars";
import { explorerURL } from "./lib/helpers";
import { mintTo } from "@solana/spl-token";
import { Ata } from "./15.ATA";
// 演示如何在现有 SPL 代币铸币厂中创建新的 SPL 代币（又名'铸造代币'）
(async () => {
  console.log(`${FgGreen}Payer address: ${FgYellow + payer.publicKey.toBase58()}`);
  // 读取保存的Token地址
  let tokenMint = TokenMint();
  // Ata地址
  const tokenAccount = await Ata(connection, payer, tokenMint);
  // 2位精度，10000.00个
  const amountOfTokensToMint = 1_000_000;

  // 铸造一些数量的Token到Ata账户
  console.log(FgGreen + "Minting some tokens to the ata...");
  const mintSig = await mintTo(
    connection, // 网络链接
    payer, // 支付账户
    tokenMint, // token地址
    tokenAccount, // Ata地址
    payer, // 铸造权限
    amountOfTokensToMint, // 数量
  );

  console.log(explorerURL({ txSignature: mintSig }));
})();
