import { Keypair, PublicKey } from "@solana/web3.js";
import { createUpdateMetadataAccountV2Instruction } from "@metaplex-foundation/mpl-token-metadata";
import { ProgramAddressSync } from "./12.ProgramAddressSync";
// 创新更新的元数据
export async function UpdateTokenMetadata(
  payer: Keypair,
  tokenMint: PublicKey,
  name: string,
  symbol: string,
  uri: string,
) {
  // 元数据派生地址
  const metadataAccount = ProgramAddressSync(tokenMint);

  // 创新更新的元数据
  const updateMetadataInstruction = createUpdateMetadataAccountV2Instruction(
    {
      metadata: metadataAccount,
      updateAuthority: payer.publicKey,
    },
    {
      updateMetadataAccountArgsV2: {
        data: {
          creators: null,
          name: name,
          symbol: symbol,
          uri: uri,
          sellerFeeBasisPoints: 0,
          collection: null,
          uses: null,
        },
        isMutable: true,
        primarySaleHappened: null,
        updateAuthority: payer.publicKey,
      },
    },
  );
  return updateMetadataInstruction;
}
