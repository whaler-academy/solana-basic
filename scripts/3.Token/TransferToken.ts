import { transfer } from "@solana/spl-token";
import { Connection, PublicKey, Signer } from "@solana/web3.js";
import { explorerURL } from "../lib/helpers";
import { FgGreen, FgYellow } from "../lib/vars";

export async function TransferToken(
  connection: Connection,
  payer: Signer,
  source: PublicKey,
  destination: PublicKey,
  owner: Signer | PublicKey,
  amount: number | bigint,
) {
  const signature = await transfer(connection, payer, source, destination, owner, amount);
  console.log(`${FgGreen}交易完成.`);
  console.log(FgYellow + explorerURL({ txSignature: signature }));
}
