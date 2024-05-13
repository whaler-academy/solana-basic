import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL } from "../../lib/vars";
import {
  createSignerFromKeypair,
  generateSigner,
  percentAmount,
  signerIdentity,
  some,
} from "@metaplex-foundation/umi";
import { umiPayer } from "../../lib/umiHelper";
import { createFungible } from "@metaplex-foundation/mpl-token-metadata";
import { savePublicKeyToFile } from "../../lib/helpers";
import { PublicKey } from "@solana/web3.js";
import { Fungible } from "../TokenStandard";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));
  // 计算Token Keypair
  let tokenMint = generateSigner(umi);
  console.log("Mint address:", tokenMint.publicKey);

  await createFungible(umi, {
    mint: tokenMint,
    name: Fungible.name,
    symbol: Fungible.symbol,
    uri: "https://arweave.net/NoZ4gtzT_kYadwm7d3ArJyROdyuvn6r84KhpIYGHgPw",
    sellerFeeBasisPoints: percentAmount(5.5),
    decimals: some(9), // for 0 decimals use some(0)
  })
    .sendAndConfirm(umi)
    .then(() => {
      console.log("Successfully.");
    });
  // 保存Token账户地址
  savePublicKeyToFile("umi_fungible_token", new PublicKey(tokenMint.publicKey));
})();
