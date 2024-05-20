import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, FgGreen, FgYellow } from "../../lib/vars";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import { umiPayer } from "../../lib/umiHelper";
import { NonFungible } from "../1.TokenStandards/TokenStandard";

// 上传metadata数据
(async () => {
  const umi = createUmi(CLUSTER_URL);
  umi.use(irysUploader());
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));

  const uri = await umi.uploader.uploadJson(NonFungible);

  console.log(`${FgGreen}payer => ${FgYellow + signer.publicKey.toString()}`);
  console.log(`${FgGreen}uri => ${FgYellow + uri}`);
})();
