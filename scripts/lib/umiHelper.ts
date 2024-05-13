import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";
import path from "path";
import fs from "fs";
import { Keypair } from "@solana/web3.js";

const DEFAULT_KEY_DIR_NAME = ".local_keys";
export function UmiKeypair(fileName: string, dirName: string = DEFAULT_KEY_DIR_NAME) {
  try {
    // compute the path to locate the file
    const searchPath = path.join(dirName, `${fileName}.json`);
    const loaded = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(searchPath).toString())),
    );

    return fromWeb3JsKeypair(loaded);
  } catch (err) {
    console.error("loadOrGenerateKeypair:", err);
    throw err;
  }
}

export const umiPayer = UmiKeypair("payer");
