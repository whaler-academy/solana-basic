import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, TokenMint } from "../../lib/vars";
import { createSignerFromKeypair, publicKey, signerIdentity } from "@metaplex-foundation/umi";
import { umiPayer } from "../../lib/umiHelper";
import { fetchDigitalAssetWithTokenByMint } from "@metaplex-foundation/mpl-token-metadata";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));
  // 读取保存的Token地址
  let mint = publicKey(TokenMint("umi_non_fungible_token"));

  let ret = await fetchDigitalAssetWithTokenByMint(umi, mint);
  console.log(ret);
})();
