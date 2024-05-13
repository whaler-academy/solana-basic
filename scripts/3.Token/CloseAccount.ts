import { closeAccount } from "@solana/spl-token";
import { Connection, PublicKey, Signer } from "@solana/web3.js";

export async function CloseAccount(
  connection: Connection,
  payer: Signer,
  account: PublicKey,
  destination: PublicKey,
  authority: Signer | PublicKey,
) {
  await closeAccount(connection, payer, account, destination, authority);
}
