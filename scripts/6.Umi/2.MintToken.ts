import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, TokenMint } from "../lib/vars";
import {
  createSignerFromKeypair,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { umiPayer } from "../lib/umiHelper";
import { TokenStandard, mintV1 } from "@metaplex-foundation/mpl-token-metadata";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));

  // 读取保存的Token地址
  let tokenMint = publicKey(TokenMint("umi_token"));

  await mintV1(umi, {
    mint: tokenMint,
    amount: 100,
    tokenStandard: TokenStandard.Fungible,
  })
    .sendAndConfirm(umi)
    .then(() => {
      console.log("Successfully.");
    });
})();
