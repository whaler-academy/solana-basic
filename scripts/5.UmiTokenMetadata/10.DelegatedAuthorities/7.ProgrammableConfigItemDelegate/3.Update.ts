import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, TokenMint, txExplorer } from "../../../lib/vars";
import {
  createSignerFromKeypair,
  generateSigner,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { findAssociatedTokenPda } from "@metaplex-foundation/mpl-toolbox";
import { UmiKeypair, umiPayer } from "../../../lib/umiHelper";
import {
  mplTokenMetadata,
  ruleSetToggle,
  updateAsProgrammableConfigItemDelegateV2,
} from "@metaplex-foundation/mpl-token-metadata";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));
  umi.use(mplTokenMetadata());

  // 读取保存的Delegate
  let delegateKeyPair = UmiKeypair("Delegate");
  console.log("Delegate address:", delegateKeyPair.publicKey);
  const delegate = createSignerFromKeypair(umi, delegateKeyPair);

  // 读取保存的Token地址
  let mint = publicKey(TokenMint("umi_ProgramableNonFungibl_token"));
  const ruleSet = generateSigner(umi);

  await updateAsProgrammableConfigItemDelegateV2(umi, {
    mint,
    payer: signer,
    token: findAssociatedTokenPda(umi, { mint, owner: signer.publicKey }),
    authority: delegate,
    ruleSet: ruleSetToggle("Set", [ruleSet.publicKey]),
  })
    .sendAndConfirm(umi)
    .then(({ signature }) => {
      txExplorer(signature);
    });
})();
