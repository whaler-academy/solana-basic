import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CLUSTER_URL, FgGreen, FgYellow } from "../lib/vars";
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import { umiPayer } from "../lib/umiHelper";
import {irysUploader} from '@metaplex-foundation/umi-uploader-irys';
import { createNft } from "@metaplex-foundation/mpl-token-metadata";

(async () => {
  const umi = createUmi(CLUSTER_URL);
  const signer = createSignerFromKeypair(umi, umiPayer);
  umi.use(signerIdentity(signer, true));

  const balance = await umi.rpc.getBalance(umi.payer.publicKey);
  console.log(`${FgGreen}umi Payer address: ${FgYellow + umi.payer.publicKey}`);
  console.log(`${FgGreen}umi Payer balance: ${FgYellow + balance.basisPoints}`);
  umi.use(irysUploader())
  const uri = await umi.uploader.uploadJson({
    name: 'SolBay Listing',
    symbol: 'SBL',
    description: 'NFT tracking your listing :O',
    selleter_fee_basis_points: 0,
    image: "https://bafybeihkc3tu4ugc5camayoqw7tl2lahtzgm2kpiwps3itvfsv7zcmceji.ipfs.nftstorage.link/",
    animation_url: '',
    external_url: 'https://sol-bay-gamma.vercel.app/',
    attributes: [
      {
        trait_type: 'listing_id',
        value: [1],
      },
    ],
  });
  console.log(uri)
})();
