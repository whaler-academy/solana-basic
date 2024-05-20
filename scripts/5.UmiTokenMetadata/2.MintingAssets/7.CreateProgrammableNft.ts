import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, txExplorer } from "../../lib/vars";
import {
  createSignerFromKeypair,
  generateSigner,
  percentAmount,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { umiPayer } from "../../lib/umiHelper";
import { createProgrammableNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { savePublicKeyToFile } from "../../lib/helpers";
import { PublicKey } from "@solana/web3.js";
import { ProgramableNonFungible } from "../1.TokenStandards/TokenStandard";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));
  // 计算Token Keypair
  let tokenMint = generateSigner(umi);
  console.log("Mint address:", tokenMint.publicKey);
  umi.use(mplTokenMetadata());

  await createProgrammableNft(umi, {
    mint: tokenMint,
    name: ProgramableNonFungible.name,
    uri: ProgramableNonFungible.external_url,
    sellerFeeBasisPoints: percentAmount(5.5),
  })
    .sendAndConfirm(umi)
    .then(({ signature }) => {
      txExplorer(signature);
    });
  // 保存Token账户地址
  savePublicKeyToFile("umi_ProgramableNonFungibl_token", new PublicKey(tokenMint.publicKey));
})();
