# User privacy

Plans for tracking and user-data protection, as required by the RFP.

## Data minimization

The standard requires **no personal data**. Onboarding operates on Stellar account
identifiers and asset definitions only — the same public on-chain data any Stellar
transaction involves.

## What we do NOT collect

- No names, emails, or KYC data (those remain with the exchange/wallet that already
  holds the relationship, outside this project's scope).
- No private keys — the SDK never custodies keys; the caller signs.
- No off-chain store of user activity in the reference tooling.

## Landing page

- No PII collected, no accounts, no key entry into a server.
- Any analytics are **privacy-preserving and opt-in** (no third-party trackers by
  default; aggregate, non-identifying metrics only if enabled).

## On-chain transparency

Stellar transactions are inherently public. We document this clearly to integrators so
they can inform users; the standard does not add any new on-chain data beyond what the
asset transfer itself requires.

## Compliance posture

KYC/AML obligations sit with the regulated sender (exchange/wallet). The standard is
neutral infrastructure and does not relocate those obligations.
