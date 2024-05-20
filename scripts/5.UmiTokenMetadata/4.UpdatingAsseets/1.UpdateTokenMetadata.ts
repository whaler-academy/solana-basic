import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, TokenMint, txExplorer } from "../../lib/vars";
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import { umiPayer } from "../../lib/umiHelper";
import { fetchMetadataFromSeeds, updateV1 } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));
  // 读取保存的Token地址
  let mint = publicKey(TokenMint("umi_non_fungible_token"));
  const initialMetadata = await fetchMetadataFromSeeds(umi, { mint });

  await updateV1(umi, {
    mint: mint,
    data: { ...initialMetadata, name: "Updated Assets" },
    primarySaleHappened: true,
    isMutable: true,
  })
    .sendAndConfirm(umi)
    .then(({ signature }) => {
      txExplorer(signature);
    });
})();
