import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, TokenMint, txExplorer } from "../../lib/vars";
import { createSignerFromKeypair, publicKey, signerIdentity } from "@metaplex-foundation/umi";
import { umiPayer } from "../../lib/umiHelper";
import { TokenStandard, mintV1, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));
  // 读取保存的Token地址
  let tokenMint = publicKey(TokenMint("umi_fungible_token"));

  umi.use(mplTokenMetadata());
  await mintV1(umi, {
    mint: tokenMint,
    tokenOwner: umi.identity.publicKey,
    tokenStandard: TokenStandard.Fungible,
    amount: 1_000_000_000_000_000_000n,
  })
    .sendAndConfirm(umi)
    .then(({ signature }) => {
      txExplorer(signature);
    });
})();
