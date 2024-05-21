import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, TokenMint, txExplorer } from "../../lib/vars";
import {
  createSignerFromKeypair,
  generateSigner,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { umiPayer } from "../../lib/umiHelper";
import {
  TokenStandard,
  fetchMasterEditionFromSeeds,
  mplTokenMetadata,
  printV1,
} from "@metaplex-foundation/mpl-token-metadata";

(async () => {
  // 初始化
  const umi = createUmi(CLUSTER_URL);
  // 获取签名人
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));
  umi.use(mplTokenMetadata());
  // 读取保存的Token地址
  let masterEditionMint = publicKey(TokenMint("umi_non_fungible_token"));
  // 随机计算接受者
  let receiver = generateSigner(umi);
  // 获取masterEdition数据
  const masterEdition = await fetchMasterEditionFromSeeds(umi, {
    mint: masterEditionMint,
  });
  console.log("masterEdition:", masterEdition.publicKey);
  // 随机计算editionMint地址
  const editionMint = generateSigner(umi);
  console.log("editionMint:", editionMint.publicKey);
  // 打印
  await printV1(umi, {
    masterTokenAccountOwner: signer,
    masterEditionMint: masterEditionMint,
    editionMint,
    editionTokenAccountOwner: receiver.publicKey,
    editionNumber: masterEdition.supply + 1n,
    tokenStandard: TokenStandard.NonFungible,
  })
    .sendAndConfirm(umi)
    .then(({ signature }) => {
      txExplorer(signature);
    });
})();
