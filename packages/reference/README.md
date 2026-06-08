# @trustline-onboarder/reference

Reference implementation of the trustline-free onboarding standard, demonstrating both
the **issuer/sender** and **recipient** flows end-to-end on Stellar testnet.

> 🚧 Foundation skeleton — flows implemented in milestone **M2**.

## Flows

- **Sender/issuer** — sponsor reserves (CAP-33), establish trustline under sponsorship,
  escrow asset as a claimable balance.
- **Recipient** — claim the asset on first interaction; trustline goes live.

See the [standard](../../standard/sep-draft.md) and
[architecture](../../proposal/architecture.md).
