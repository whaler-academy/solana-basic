import { closeAccount } from "@solana/spl-token";
import { Connection, PublicKey, Signer } from "@solana/web3.js";
import { FgGreen, FgYellow } from "../lib/vars";

export async function CloseAccount(
  connection: Connection,
  payer: Signer,
  account: PublicKey,
  destination: PublicKey,
  authority: Signer | PublicKey,
) {
  const walletBalance = await connection.getBalance(payer.publicKey);
  console.log(`${FgGreen}Balance before unwrapping 1 WSOL: ${FgYellow + walletBalance}`);

  await closeAccount(connection, payer, account, destination, authority);

  const walletBalancePostClose = await connection.getBalance(payer.publicKey);
  console.log(`${FgGreen}Balance after unwrapping 1 WSOL: ${FgYellow + walletBalancePostClose}`);
}
