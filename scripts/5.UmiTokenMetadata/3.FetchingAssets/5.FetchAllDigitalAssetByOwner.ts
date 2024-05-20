import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL } from "../../lib/vars";
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import { umiPayer } from "../../lib/umiHelper";
import { fetchAllDigitalAssetByOwner } from "@metaplex-foundation/mpl-token-metadata";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));

  let ret = await fetchAllDigitalAssetByOwner(umi, signer.publicKey);
  console.log(ret);
})();
