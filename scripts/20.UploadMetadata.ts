import { FgGreen, FgYellow } from "./lib/vars";
import { Metaplex, UploadMetadataInput } from "@metaplex-foundation/js";
// 上传Json元数据
export async function UploadMetadata(metaplex: Metaplex, metadata: UploadMetadataInput) {
  console.log(FgGreen + "Uploading metadata...");

  const { uri } = await metaplex.nfts().uploadMetadata(metadata);

  console.log(`${FgGreen}Metadata uploaded:, ${FgYellow + uri}`);
  return uri;
}
