import { connection, payer } from "../lib/vars";
import { Ata } from "./ATA";
import { AuthorityType, getAccount, getMint } from "@solana/spl-token";
import { CreateMint } from "./CreateMint";
import { MintTo } from "./MintTo";
import { AddTransaction } from "../4.WrapSOL/AddTransaction";
import { SendAndConfirmTx } from "../4.WrapSOL/SendAndConfirmTx";
import { CreateSetAuthorityIx } from "./CreateSetAuthorityInstyIx";
import { FgGreen, FgYellow } from "../lib/vars";
// 创建NFT
(async () => {
  // 创建Token，精度为0
  const tokenMint = await CreateMint(
    connection,
    payer,
    payer.publicKey,
    payer.publicKey,
    0, // NFT的小数点精度为0
    "NFT",
  );
  // 创建ATA账户
  const associatedTokenAccount = await Ata(connection, payer, tokenMint, payer.publicKey);
  // 向ATA账户铸造1个Token
  await MintTo(connection, payer, tokenMint, associatedTokenAccount, payer, 1);
  // 创建设置权限为空的指令交易
  let tx = AddTransaction(
    CreateSetAuthorityIx(tokenMint, payer.publicKey, AuthorityType.MintTokens, null),
  );
  // 发送交易
  await SendAndConfirmTx(connection, tx, [payer]);
  // 获取账户信息
  const accountInfo = await getAccount(connection, associatedTokenAccount);
  console.log(`${FgGreen}账户余额： ${FgYellow + accountInfo.amount}`);
  const mintInfo = await getMint(connection, tokenMint);
  console.log(`${FgGreen}NFT信息：`, mintInfo);
})();
