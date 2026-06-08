/**
 * @trustline-onboarder/sdk
 *
 * TypeScript SDK for trustline-free Stellar asset onboarding.
 *
 * Foundation skeleton: public surface sketched to match the standard's handshake
 * (request → authorize → settle → claim). Implementation lands in milestone M3.
 *
 * @see ../../standard/sep-draft.md
 */

/** A Stellar account address (G... public key). */
export type StellarAddress = string;

/** A non-native asset by code + issuer. */
export interface Asset {
  code: string;
  issuer: StellarAddress;
}

/** Recipient onboarding context. The recipient may not yet have an account. */
export interface OnboardingRequest {
  recipient: StellarAddress;
  asset: Asset;
  amount: string;
}

/** Sender's authorization of an onboarding request. */
export interface OnboardingAuthorization {
  sponsor: StellarAddress;
  /** ISO-8601 expiry for the authorization. */
  expiresAt: string;
}

export interface SdkConfig {
  /** Horizon or RPC endpoint. Endpoint-agnostic; caller supplies the network. */
  horizonUrl: string;
  networkPassphrase: string;
}

/**
 * Sender-side entry point (exchange / wallet backend).
 * Builds transactions; never custodies keys — the caller signs.
 */
export class OnboarderSender {
  constructor(private readonly _config: SdkConfig) {}

  /** Authorize an incoming onboarding request. */
  authorize(_request: OnboardingRequest): Promise<OnboardingAuthorization> {
    throw new Error("Not implemented (M3): authorize");
  }

  /**
   * Build the settlement: begin sponsorship → (create account) → trustline →
   * claimable balance → end sponsorship. Returns an unsigned transaction XDR.
   */
  buildSettlement(
    _request: OnboardingRequest,
    _authorization: OnboardingAuthorization,
  ): Promise<{ unsignedXdr: string }> {
    throw new Error("Not implemented (M3): buildSettlement");
  }
}

/**
 * Recipient-side entry point (wallet).
 * Claims the escrowed asset on first interaction.
 */
export class OnboarderRecipient {
  constructor(private readonly _config: SdkConfig) {}

  /** Build the claim transaction for the recipient to sign. */
  buildClaim(_recipient: StellarAddress, _asset: Asset): Promise<{ unsignedXdr: string }> {
    throw new Error("Not implemented (M3): buildClaim");
  }
}

export const VERSION = "0.0.0";
