import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, TokenMint, txExplorer } from "../../lib/vars";
import { createSignerFromKeypair, publicKey, signerIdentity } from "@metaplex-foundation/umi";
import { umiPayer } from "../../lib/umiHelper";
import {
  findMetadataPda,
  mplTokenMetadata,
  verifyCollectionV1,
} from "@metaplex-foundation/mpl-token-metadata";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));
  umi.use(mplTokenMetadata());
  // 读取保存的Token地址
  let collectionMint = publicKey(TokenMint("umi_collection"));
  // 读取保存的Token地址
  let collectionNFTMint = publicKey(TokenMint("umi_collection_NFT"));

  const metadata = findMetadataPda(umi, {
    mint: collectionNFTMint,
  });
  console.log("metadata:", metadata[0]);

  await verifyCollectionV1(umi, {
    metadata: metadata,
    collectionMint: collectionMint,
    authority: signer,
  })
    .sendAndConfirm(umi)
    .then(({ signature }) => {
      txExplorer(signature);
    });
})();
