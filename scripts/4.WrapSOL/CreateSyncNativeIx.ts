import { TOKEN_PROGRAM_ID, createSyncNativeInstruction } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

export function CreateSyncNativeIx(account: PublicKey, programId = TOKEN_PROGRAM_ID) {
  return createSyncNativeInstruction(account, programId);
}
