/**
 * @trustline-onboarder/sdk
 *
 * TypeScript SDK for trustline-free Stellar asset onboarding.
 *
 * Pure transaction builders (no network, no key custody). The caller loads source
 * accounts, calls a builder to get an UNSIGNED transaction, then signs and submits.
 *
 * Core mechanic: a recipient cannot be given a trustline by someone else (changeTrust
 * needs the recipient's own signature). So the sender instead escrows the asset as a
 * claimable balance, and a single sponsored transaction creates the recipient account,
 * adds the trustline, and claims the balance — all reserves paid by the sponsor. The
 * recipient ends up holding the asset with ZERO XLM of their own.
 *
 * @see ../../standard/sep-draft.md
 */

import {
  Asset as StellarAsset,
  BASE_FEE,
  Claimant,
  Operation,
  TransactionBuilder,
} from "@stellar/stellar-sdk";
import type { Account, Transaction } from "@stellar/stellar-sdk";

/** A Stellar account address (G... public key). */
export type StellarAddress = string;

/** A non-native asset by code + issuer. */
export interface Asset {
  code: string;
  issuer: StellarAddress;
}

/** Convert the SDK's plain asset shape to a stellar-sdk `Asset`. */
export function toStellarAsset(asset: Asset): StellarAsset {
  return new StellarAsset(asset.code, asset.issuer);
}

/** Default transaction validity window (seconds). */
const DEFAULT_TIMEOUT = 180;

export interface BuildCreateClaimableBalanceParams {
  /** Loaded source account that holds (or issues) the asset. Pays the fee, signs. */
  senderAccount: Account;
  asset: Asset;
  /** Amount, as a string (e.g. "10.5"). */
  amount: string;
  /** Recipient who will be able to claim. May not yet have an account. */
  recipient: StellarAddress;
  networkPassphrase: string;
  baseFee?: string;
}

/**
 * Sender flow, step 1: escrow the asset for a recipient who has no account and no
 * trustline. Returns an UNSIGNED transaction for the sender to sign.
 */
export function buildCreateClaimableBalanceTx(
  params: BuildCreateClaimableBalanceParams,
): Transaction {
  const { senderAccount, asset, amount, recipient, networkPassphrase } = params;
  return new TransactionBuilder(senderAccount, {
    fee: params.baseFee ?? BASE_FEE,
    networkPassphrase,
  })
    .addOperation(
      Operation.createClaimableBalance({
        asset: toStellarAsset(asset),
        amount,
        claimants: [new Claimant(recipient, Claimant.predicateUnconditional())],
      }),
    )
    .setTimeout(DEFAULT_TIMEOUT)
    .build();
}

export interface BuildSponsoredClaimParams {
  /** Loaded sponsor account (typically the sender). Tx source + fee payer; signs. */
  sponsorAccount: Account;
  /** Recipient onboarding account. Must also sign the returned transaction. */
  recipient: StellarAddress;
  asset: Asset;
  /** The claimable balance id (hex) produced by the sender flow. */
  balanceId: string;
  /** Create the recipient account (sponsored) if it does not exist yet. */
  createRecipientAccount: boolean;
  networkPassphrase: string;
  baseFee?: string;
}

/**
 * Recipient flow, sponsored: in one transaction, (optionally) create the recipient
 * account, add the asset trustline, and claim the balance — with the sponsor paying
 * every reserve. Returns an UNSIGNED transaction that BOTH the sponsor and the
 * recipient must sign.
 *
 * Operation sandwich (CAP-33 sponsored reserves):
 *   beginSponsoringFutureReserves(recipient)   [source: sponsor]
 *   [createAccount(recipient, "0")]            [source: sponsor]
 *   changeTrust(asset)                         [source: recipient]
 *   claimClaimableBalance(balanceId)           [source: recipient]
 *   endSponsoringFutureReserves()              [source: recipient]
 */
export function buildSponsoredClaimTx(params: BuildSponsoredClaimParams): Transaction {
  const { sponsorAccount, recipient, asset, balanceId, networkPassphrase } = params;
  const stellarAsset = toStellarAsset(asset);

  const builder = new TransactionBuilder(sponsorAccount, {
    fee: params.baseFee ?? BASE_FEE,
    networkPassphrase,
  }).addOperation(
    Operation.beginSponsoringFutureReserves({ sponsoredId: recipient }),
  );

  if (params.createRecipientAccount) {
    builder.addOperation(
      Operation.createAccount({ destination: recipient, startingBalance: "0" }),
    );
  }

  return builder
    .addOperation(Operation.changeTrust({ asset: stellarAsset, source: recipient }))
    .addOperation(Operation.claimClaimableBalance({ balanceId, source: recipient }))
    .addOperation(Operation.endSponsoringFutureReserves({ source: recipient }))
    .setTimeout(DEFAULT_TIMEOUT)
    .build();
}

export interface BuildCreateAccountParams {
  /** Loaded funder account (the sponsor). Pays the starting balance + fee, signs. */
  sponsorAccount: Account;
  recipient: StellarAddress;
  /** XLM to seed the new account with (must be >= the 1 XLM base reserve). */
  startingBalance: string;
  networkPassphrase: string;
  baseFee?: string;
}

/**
 * Create and fund a recipient account, paid for entirely by the sponsor. Use this when
 * the recipient signs in a wallet (e.g. Freighter) that refuses to sign from an account
 * that does not yet exist on-chain. The recipient pays nothing.
 */
export function buildCreateAccountTx(params: BuildCreateAccountParams): Transaction {
  const { sponsorAccount, recipient, startingBalance, networkPassphrase } = params;
  return new TransactionBuilder(sponsorAccount, {
    fee: params.baseFee ?? BASE_FEE,
    networkPassphrase,
  })
    .addOperation(
      Operation.createAccount({ destination: recipient, startingBalance }),
    )
    .setTimeout(DEFAULT_TIMEOUT)
    .build();
}

export interface BuildClaimParams {
  /** Loaded recipient account (must already exist). Tx source; signs (e.g. Freighter). */
  recipientAccount: Account;
  asset: Asset;
  balanceId: string;
  networkPassphrase: string;
  baseFee?: string;
}

/**
 * Add the asset trustline and claim the escrowed balance, signed solely by the
 * recipient. Used by the wallet flow once the recipient account exists and holds enough
 * XLM to cover the trustline reserve and fee.
 */
export function buildClaimTx(params: BuildClaimParams): Transaction {
  const { recipientAccount, asset, balanceId, networkPassphrase } = params;
  return new TransactionBuilder(recipientAccount, {
    fee: params.baseFee ?? BASE_FEE,
    networkPassphrase,
  })
    .addOperation(Operation.changeTrust({ asset: toStellarAsset(asset) }))
    .addOperation(Operation.claimClaimableBalance({ balanceId }))
    .setTimeout(DEFAULT_TIMEOUT)
    .build();
}

export const VERSION = "0.0.0";
