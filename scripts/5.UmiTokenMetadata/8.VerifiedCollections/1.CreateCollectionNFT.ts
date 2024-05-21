import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, TokenMint, txExplorer } from "../../lib/vars";
import {
  createSignerFromKeypair,
  generateSigner,
  percentAmount,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { umiPayer } from "../../lib/umiHelper";
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { savePublicKeyToFile } from "../../lib/helpers";
import { PublicKey } from "@solana/web3.js";
import { NonFungible } from "../1.TokenStandards/TokenStandard";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));
  umi.use(mplTokenMetadata());
  // 读取保存的Token地址
  let collectionMint = publicKey(TokenMint("umi_collection"));
  // 计算Token Keypair
  let collectionNFTMint = generateSigner(umi);
  console.log("Collection NFT Mint address:", collectionNFTMint.publicKey);
  // 保存Token账户地址
  savePublicKeyToFile("umi_collection_NFT", new PublicKey(collectionNFTMint.publicKey));

  await createNft(umi, {
    mint: collectionNFTMint,
    name: NonFungible.name,
    symbol: NonFungible.symbol,
    uri: "https://arweave.net/_ShA_RoIEYEj0sVXaZ7t5FvJ-1WqeVt3DZxW1HsLngc",
    sellerFeeBasisPoints: percentAmount(5.5),
    isMutable: true,
    collection: {
      verified: false,
      key: collectionMint,
    },
  })
    .sendAndConfirm(umi)
    .then(({ signature }) => {
      txExplorer(signature);
    });
})();
