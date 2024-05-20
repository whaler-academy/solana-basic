import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, txExplorer } from "../../lib/vars";
import {
  createSignerFromKeypair,
  generateSigner,
  percentAmount,
  signerIdentity,
  some,
} from "@metaplex-foundation/umi";
import { umiPayer } from "../../lib/umiHelper";
import { createFungibleAsset, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { savePublicKeyToFile } from "../../lib/helpers";
import { PublicKey } from "@solana/web3.js";
import { FungibleAsset } from "../1.TokenStandards/TokenStandard";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));
  // 计算Token Keypair
  let tokenMint = generateSigner(umi);
  console.log("Mint address:", tokenMint.publicKey);
  umi.use(mplTokenMetadata());

  await createFungibleAsset(umi, {
    mint: tokenMint,
    name: FungibleAsset.name,
    symbol: FungibleAsset.symbol,
    uri: FungibleAsset.external_url,
    sellerFeeBasisPoints: percentAmount(5.5),
    decimals: some(7),
  })
    .sendAndConfirm(umi)
    .then(({ signature }) => {
      txExplorer(signature);
    });
  // 保存Token账户地址
  savePublicKeyToFile("umi_fungible_asset_token", new PublicKey(tokenMint.publicKey));
})();
