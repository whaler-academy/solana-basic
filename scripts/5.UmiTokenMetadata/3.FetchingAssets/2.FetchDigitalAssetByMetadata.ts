import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL } from "../../lib/vars";
import { createSignerFromKeypair, publicKey, signerIdentity } from "@metaplex-foundation/umi";
import { umiPayer } from "../../lib/umiHelper";
import { fetchDigitalAssetByMetadata } from "@metaplex-foundation/mpl-token-metadata";
const metadata = publicKey("9aRXDXKC3z7zEMTXjrrZFR8SN9uPwkFkbw2bA2jeCrQ9");
(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));

  let ret = await fetchDigitalAssetByMetadata(umi, metadata);
  console.log(ret);
})();
