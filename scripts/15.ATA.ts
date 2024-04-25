import { PublicKey, Connection, Keypair } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { FgGreen, FgYellow } from "./lib/vars";

/**
 * SPL 代币是使用一种特殊关系来拥有的，
 * 其中实际代币由不同的帐户存储/拥有，
 * 然后由用户的钱包/帐户拥有。
 * 这个特殊帐户称为'关联代币帐户'（或简称'ata'）
 * 它是这样的：
 * Token存储在每个Token账户的ata中，然后ata由用户的钱包拥有
 */
// 获取或创建关联的令牌帐户
export async function Ata(connection: Connection, payer: Keypair, tokenMint: PublicKey) {
  // 获取或者创建ATA
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    tokenMint,
    payer.publicKey,
  ).then(ata => ata.address);
  console.log(`${FgGreen}Ata address: ${FgYellow + tokenAccount}`);
  return tokenAccount;
}
