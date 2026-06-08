/**
 * @trustline-onboarder/reference
 *
 * Reference implementation of the trustline-free onboarding standard.
 * Demonstrates issuer/sender and recipient flows end-to-end against Stellar testnet.
 *
 * Foundation skeleton — flows implemented in milestone M2.
 *
 * @see ../../standard/sep-draft.md
 */

/**
 * Sender/issuer flow: sponsor reserves for a recipient with zero XLM, establish the
 * trustline under sponsorship, and escrow the asset as a claimable balance.
 */
export async function runSenderFlow(): Promise<void> {
  throw new Error("Not implemented (M2): sender/issuer flow");
}

/**
 * Recipient flow: claim the escrowed asset on first interaction; trustline goes live.
 */
export async function runRecipientFlow(): Promise<void> {
  throw new Error("Not implemented (M2): recipient flow");
}
