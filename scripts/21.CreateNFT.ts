import { Metaplex } from "@metaplex-foundation/js";
// 创建NFT
export async function CreateNFT(metaplex: Metaplex, uri: string, name: string, symbol: string) {
  // 使用metaplex sdk创建一个新的nft
  const { nft, response } = await metaplex.nfts().create({
    uri,
    name: name,
    symbol: symbol,
    // `sellerFeeBasisPoints` 是您可以在 nft 上定义的版税
    sellerFeeBasisPoints: 500, // 5.00%.
    // 可变的
    isMutable: true,
  });

  console.log("NFT:", nft);
  return { nft, response };
}
