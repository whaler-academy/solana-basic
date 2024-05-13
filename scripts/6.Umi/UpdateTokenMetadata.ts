import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, TokenMint, payer } from "../lib/vars";
import {
  createSignerFromKeypair,
  generateSigner,
  percentAmount,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { umiPayer } from "../lib/umiHelper";
import { TokenStandard, createV1, updateV1 } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));
  // 读取保存的Token地址
  let tokenMintPublicKey = publicKey("TWrUhokGMUS1frTDXqKD4zhjxjaCJELvXRqGPzpy5Wu");

  console.log("Mint address:", tokenMintPublicKey);

  const tokenConfig = {
    name: "My New Token 2025",
    symbol: "MNT2025",
    uri: "",
  };

  await updateV1(umi, {
    mint: tokenMintPublicKey,
    data: {
      name: tokenConfig.name,
      symbol: tokenConfig.symbol,
      uri: tokenConfig.uri,
      sellerFeeBasisPoints: 0,
      creators:[]
    }
  })
    .sendAndConfirm(umi)
    .then(() => {
      console.log("Successfully set metadata.");
    });
})();
