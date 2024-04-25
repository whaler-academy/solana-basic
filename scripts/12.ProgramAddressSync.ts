import { PublicKey } from "@solana/web3.js";
import { MPL_TOKEN_METADATA_PROGRAM_ID as METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters";
import { FgGreen, FgYellow } from "./lib/vars";
// 创建Token元数据
export function ProgramAddressSync(tokenMint: PublicKey) {
  // 元数据派生地址
  const metadataAccount = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      toWeb3JsPublicKey(METADATA_PROGRAM_ID).toBuffer(),
      tokenMint.toBuffer(),
    ],
    toWeb3JsPublicKey(METADATA_PROGRAM_ID),
  )[0];
  console.log(`${FgGreen}Metadata address: ${FgYellow + metadataAccount.toBase58()}`);

  return metadataAccount;
}
