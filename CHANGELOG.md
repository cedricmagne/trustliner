# Changelog

All notable changes to this project are documented here. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/); the project uses semantic versioning
once packages are published.

## [Unreleased]

### Added
- Project foundation: pnpm monorepo, Apache-2.0 license, CI-ready structure.
- SCF Build Award proposal covering all RFP-required sections
  (architecture, milestones, maintenance, decentralization, infrastructure, privacy).
- Standard skeleton: SEP draft, design rationale, security considerations.
- SDK and reference-implementation package skeletons.
- "Welcome to Stellar" landing-page placeholder.
- **M2 — sender + sponsored-recipient flows** implemented and verified on testnet:
  SDK transaction builders (`buildCreateClaimableBalanceTx`, `buildSponsoredClaimTx`)
  and reference orchestration (`runSenderFlow`, `runRecipientFlow`, `runDemo`). An
  unfunded recipient is onboarded to hold an asset with zero XLM and no pre-trustline.
- Freighter test harness in `apps/welcome` (Vite): connect Freighter on testnet and
  onboard your own wallet end-to-end, with the recipient signature done in the wallet.
- Idempotency + stable per-session issuer in the welcome demo (no duplicate trustlines on
  repeat onboarding).
- Vercel preview support: app build compiles the workspace SDK first; root `vercel.json`.
- **M1 — standard specification complete** (`standard/sep-draft.md` v0.2): discovery via
  `stellar.toml`, `GET /info`, `POST /transactions` + status polling, JSON message
  schemas, on-chain settlement (claimable-balance claim predicates, reclaim window, fee
  responsibility, `funded` vs `sponsored` account-creation strategies), and error codes.
  Remaining: open the public RFC.
