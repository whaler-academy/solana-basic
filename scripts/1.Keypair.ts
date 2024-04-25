import { Keypair } from "@solana/web3.js";
import base58 from "bs58";
import { FgGreen, FgYellow } from "./lib/vars";

// 创建Keypair
async function main() {
  // 随机创建Keypair
  let keypair = Keypair.generate();
  console.log(`${FgGreen}publicKey 公钥/地址: ${FgYellow + keypair.publicKey.toBase58()}`);
  console.log(`${FgGreen}secretKey 私钥: ${FgYellow}[${keypair.secretKey}]`);
  console.log(`${FgGreen}secretKey 私钥-Base58: ${FgYellow + base58.encode(keypair.secretKey)}`);
}
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
