import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, TokenMint, txExplorer } from "../../../lib/vars";
import { createSignerFromKeypair, publicKey, signerIdentity } from "@metaplex-foundation/umi";
import { umiPayer } from "../../../lib/umiHelper";
import {
  TokenStandard,
  mplTokenMetadata,
  revokeProgrammableConfigItemV1,
} from "@metaplex-foundation/mpl-token-metadata";
import { loadOrGenerateKeypair } from "../../../lib/helpers";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));
  umi.use(mplTokenMetadata());
  // 读取保存的Token地址
  let mint = publicKey(TokenMint("umi_ProgramableNonFungibl_token"));
  // 读取保存的Delegate
  let delegate = loadOrGenerateKeypair("Delegate");

  await revokeProgrammableConfigItemV1(umi, {
    mint,
    authority: signer,
    delegate: publicKey(delegate.publicKey),
    tokenStandard: TokenStandard.NonFungible,
  })
    .sendAndConfirm(umi)
    .then(({ signature }) => {
      txExplorer(signature);
    });
})();
