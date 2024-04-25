import { Metaplex, bundlrStorage, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, Keypair } from "@solana/web3.js";
/**
 * 使用 Metaplex sdk 处理大多数 NFT 操作
 */
export async function MakeMetaplex(connection: Connection, payer: Keypair) {
  // 创建Metaplex sdk实例以供使用
  const metaplex = Metaplex.make(connection)
    // 设置要使用的密钥对，并支付交易费用
    .use(keypairIdentity(payer))
    // 定义上传的存储机制
    .use(
      irysStorage({
        address: "https://devnet.bundlr.network",
        providerUrl: "https://api.devnet.solana.com",
        timeout: 60000,
      }),
    );
  return metaplex;
}
