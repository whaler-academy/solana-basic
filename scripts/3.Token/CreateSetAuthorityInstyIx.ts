import { AuthorityType, createSetAuthorityInstruction } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

export function CreateSetAuthorityIx(
  account: PublicKey,
  currentAuthority: PublicKey,
  authorityType: AuthorityType,
  newAuthority: PublicKey | null,
) {
  return createSetAuthorityInstruction(account, currentAuthority, authorityType, newAuthority);
}
