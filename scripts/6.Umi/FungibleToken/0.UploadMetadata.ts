import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, FgGreen, FgYellow } from "../../lib/vars";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { umiPayer } from "../../lib/umiHelper";
import path from "path";
import fs from "fs";
import { Fungible } from "../TokenStandard";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

// 上传metadata数据
(async () => {
  const umi = createUmi(CLUSTER_URL);
  umi.use(irysUploader());
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));

  const fileBuffer = fs.readFileSync(path.join("img", "Whaler_logo.gif"));
  const file = createGenericFile(fileBuffer, "Whaler_logo.gif", {
    contentType: "image/gif",
  });

  const uploadPrice = await umi.uploader.getUploadPrice([file]);
  const [imageUri] = await umi.uploader.upload([file]);
  const uri = await umi.uploader.uploadJson({
    name: Fungible.name,
    symbol: Fungible.symbol,
    description: Fungible.description,
    image: imageUri,
  });

  console.log(`${FgGreen}payer => ${FgYellow + signer.publicKey.toString()}`);
  console.log(
    `${FgGreen}uploadPrice => ${FgYellow}  ${
      FgYellow + Number(uploadPrice.basisPoints) / LAMPORTS_PER_SOL
    } ${FgGreen + uploadPrice.identifier}`,
  );
  console.log(`${FgGreen}uri => ${FgYellow + uri}`);
})();
