import { Keypair, SystemProgram } from "@solana/web3.js";
import { connection, payer, FgGreen, FgYellow } from "./lib/vars";
import { SignTx } from "./8.SignTx";
import { CreateAccountIx } from "./5.CreateAccountIx";
import { SendTx } from "./9.SendTx";
import { CreateVersionedTx } from "./7.CreateVersionedTx";
// 创建账户Ix，签署交易，发送交易
(async () => {
  console.log(`${FgGreen}Payer address: ${FgYellow + payer.publicKey.toBase58()}`);
  let to = Keypair.generate();
  console.log(`${FgGreen}to address: ${FgYellow + to.publicKey.toBase58()}`);
  let createAccountIx = await CreateAccountIx(
    payer,
    to.publicKey,
    connection,
    SystemProgram.programId,
  );
  const tx = await CreateVersionedTx(payer.publicKey, connection, [createAccountIx]);
  const signedTx = await SignTx([payer, to], tx);
  await SendTx(signedTx);
})();
