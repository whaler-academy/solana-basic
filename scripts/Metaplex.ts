import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import {
  publicKey,
  generateSigner,
  percentAmount,
  keypairIdentity,
  KeypairSigner,
  createSignerFromKeypair,
} from "@metaplex-foundation/umi";
import { fetchCandyMachine, fetchCandyGuard } from "@metaplex-foundation/mpl-candy-machine";
import { TokenStandard } from "@metaplex-foundation/mpl-token-metadata";
import { connection } from "./lib/vars";
import { createTree, mplBubblegum } from "@metaplex-foundation/mpl-bubblegum";
import fs from "fs";
import path from "path";
import base58 from "bs58";
const DEFAULT_KEY_DIR_NAME = ".local_keys";

(async () => {
  // Use the RPC endpoint of your choice.
  const umi = createUmi(connection).use(mplBubblegum());

  const searchPath = path.join(DEFAULT_KEY_DIR_NAME, `Payer.json`);
  const secretKey = JSON.parse(fs.readFileSync(searchPath, "utf-8"));

  // attempt to load the keypair from the file
  const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secretKey));
  const payerSigner = createSignerFromKeypair(umi, keypair);
  umi.use(keypairIdentity(payerSigner));

  const merkleTree = generateSigner(umi);
  const builder = await createTree(umi, {
    merkleTree,
    maxDepth: 14,
    maxBufferSize: 64,
  });
  const build = await builder.sendAndConfirm(umi);
  const sig = base58.encode(build.signature);
  console.log("tree", merkleTree.publicKey);
  console.log("sig", sig);
})();
