import { createMint, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { savePublicKeyToFile } from "../lib/helpers";
import { Connection, Keypair, PublicKey, Signer } from "@solana/web3.js";
import { FgGreen, FgYellow } from "../lib/vars";

export async function CreateMint(
  connection: Connection,
  payer: Signer,
  mintAuthority: PublicKey,
  freezeAuthority: PublicKey | null,
  decimals: number,
  symble: string,
  keypair = Keypair.generate(),
  programId = TOKEN_PROGRAM_ID,
) {
  const mint = await createMint(
    connection, // 链接
    payer, // 支付账户
    mintAuthority, // 铸造账户地址
    freezeAuthority, // 冻结账户地址
    decimals, // 小数点精度
    keypair,
    undefined,
    programId,
  );
  console.log(`${FgGreen}Mint地址： ${FgYellow + mint.toBase58()}`);
  // 保存Token账户地址
  savePublicKeyToFile(symble, mint);
  return mint;
}
