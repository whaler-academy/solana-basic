import { FgGreen, FgYellow, TokenMint, connection, payer } from "./lib/vars";
import { explorerURL, printConsoleSeparator } from "./lib/helpers";
import { MakeMetaplex } from "./19.MakeMetaplex";
import { UploadMetadata } from "./20.UploadMetadata";
import { CreateNFT } from "./21.CreateNFT";
// 创建NFT
(async () => {
  console.log(`${FgGreen}Payer address: ${FgYellow + payer.publicKey.toBase58()}`);
  // 读取保存的Token地址
  let tokenMint = TokenMint();

  //////////////////////////////////////////////////////////////////////////////

  // 定义NFT的 JSON 元数据
  const metadata = {
    name: "The Gradient Pearl",
    symbol: "SHIP",
    description:
      "The Gradient Pearl is a legendary Pirate ship that sails the Seven Seas. Captain Rajovenko leads with a drink can in his hand. ",
    image:
      "https://bafybeic75qqhfytc6xxoze2lo5af2lfhmo2kh4mhirelni2wota633dgqu.ipfs.nftstorage.link/",
  };
  // another ship: "https://bafybeiblld2wlxyivlivnhaqbcixhzxrodjzrycjkitz3kdmzj65gebwxe.ipfs.nftstorage.link/"
  // Captain Rajovenko: "https://bafybeihww4tue5pme3h2udqvkpfbzs5zf4h2pysuoowwofbbk372vvtmja.ipfs.nftstorage.link/"

  // 创建Metaplex sdk实例以供使用
  const metaplex = await MakeMetaplex(connection, payer);

  // upload the JSON metadata
  const uri = await UploadMetadata(metaplex, metadata);

  // create a new nft using the metaplex sdk
  const { nft, response } = await CreateNFT(metaplex, uri, metadata.name, metadata.symbol);

  printConsoleSeparator("NFT created:");
  console.log(explorerURL({ txSignature: response.signature }));

  return;

  /**
   *
   */

  printConsoleSeparator("Find by mint:");

  // you can also use the metaplex sdk to retrieve info about the NFT's mint
  const mintInfo = await metaplex.nfts().findByMint({
    mintAddress: tokenMint,
  });
  console.log(mintInfo);
})();
