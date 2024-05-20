import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, TokenMint, txExplorer } from "../../lib/vars";
import { createSignerFromKeypair, generateSigner, signerIdentity } from "@metaplex-foundation/umi";
import { umiPayer } from "../../lib/umiHelper";
import {
  TokenStandard,
  mplTokenMetadata,
  transferV1,
} from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));
  umi.use(mplTokenMetadata());
  // 读取保存的Token地址
  let mint = publicKey(TokenMint("umi_fungible_token"));
  let receiver = generateSigner(umi);

  await transferV1(umi, {
    mint: mint,
    authority: signer,
    tokenOwner: signer.publicKey,
    destinationOwner: receiver.publicKey,
    tokenStandard: TokenStandard.Fungible,
    amount: 1_000_000_000,
  })
    .sendAndConfirm(umi)
    .then(({ signature }) => {
      txExplorer(signature);
    });
})();
