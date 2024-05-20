import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL } from "../../lib/vars";
import {
  createSignerFromKeypair,
  generateSigner,
  percentAmount,
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
  // 计算Token Keypair
  let collectionMint = generateSigner(umi);
  console.log("Collection Mint address:", collectionMint.publicKey);
  umi.use(mplTokenMetadata());

  await createNft(umi, {
    mint: collectionMint,
    name: NonFungible.name,
    symbol: NonFungible.symbol,
    uri: "https://arweave.net/_ShA_RoIEYEj0sVXaZ7t5FvJ-1WqeVt3DZxW1HsLngc",
    sellerFeeBasisPoints: percentAmount(5.5),
    isMutable: false,
    isCollection: true,
  })
    .sendAndConfirm(umi)
    .then(({ signature }) => {
      txExplorer(signature);
    });
  // 保存Token账户地址
  savePublicKeyToFile("umi_collection", new PublicKey(collectionMint.publicKey));
})();
