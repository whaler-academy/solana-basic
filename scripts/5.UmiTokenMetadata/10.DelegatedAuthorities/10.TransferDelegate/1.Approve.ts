import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, TokenMint, txExplorer } from "../../../lib/vars";
import { createSignerFromKeypair, publicKey, signerIdentity } from "@metaplex-foundation/umi";
import { loadOrGenerateKeypair } from "../../../lib/helpers";
import { umiPayer } from "../../../lib/umiHelper";
import {
  TokenStandard,
  delegateTransferV1,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));
  umi.use(mplTokenMetadata());
  // 读取保存的Token地址
  let mint = publicKey(TokenMint("umi_ProgramableNonFungibl_token"));
  // 计算Delegate
  let delegate = loadOrGenerateKeypair("Delegate");
  console.log("Delegate address:", delegate.publicKey.toBase58());

  await delegateTransferV1(umi, {
    mint: mint,
    tokenOwner: signer.publicKey,
    authority: signer,
    delegate: publicKey(delegate.publicKey),
    tokenStandard: TokenStandard.ProgrammableNonFungible,
  })
    .sendAndConfirm(umi)
    .then(({ signature }) => {
      txExplorer(signature);
    });
})();
