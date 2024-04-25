import { Keypair, PublicKey } from "@solana/web3.js";
import {
  createCreateMetadataAccountV3Instruction,
} from "@metaplex-foundation/mpl-token-metadata";
import { ProgramAddressSync } from "./12.ProgramAddressSync";
// 创建Token元数据
export async function CreateTokenWithMetadata(
  payer: Keypair,
  tokenMint: PublicKey,
  name: string,
  symbol: string,
  uri: string,
) {
  // 元数据派生地址
  const metadataAccount = ProgramAddressSync(tokenMint);

  // 创建元数据
  const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataAccount, // 元数据账户
      mint: tokenMint, // 铸造地址
      mintAuthority: payer.publicKey, // 拥有者账户地址
      payer: payer.publicKey, // 支付账户地址
      updateAuthority: payer.publicKey, // 升级权限账户地址
    },
    {
      createMetadataAccountArgsV3: {
        data: {
          creators: null, // 创建者
          name: name, // Token名称
          symbol: symbol, // Token缩写
          uri: uri, // 链接uri
          sellerFeeBasisPoints: 0, // 版税
          collection: null, // 合集
          uses: null, //特殊功能
        },
        // `collectionDetails` - 对于非 nft 类型令牌，通常设置为 `null` 以不设置值
        collectionDetails: null,
        // 元数据应该可更新吗？
        isMutable: true,
      },
    },
  );
  return createMetadataInstruction;
}
