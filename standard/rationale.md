# Design rationale

The RFP suggests three possible approaches. This document compares them and explains the
chosen composition.

## Approaches considered

### A. Authorize-trustline via standard interface

A SEP interface by which a wallet requests an issuer/sender to set up a trustline on the
user's behalf.

- ➕ Clean, explicit; issuer stays in control of who can hold the asset.
- ➖ Recipient still needs XLM for the trustline reserve unless combined with sponsorship.
- ➖ Requires issuer-side endpoint and auth.

### B. Temporary intermediary accounts

Create an ephemeral account, set up the trustline, receive the asset, then merge into the
recipient.

- ➕ Works without recipient pre-setup.
- ➖ Introduces a transient account that briefly custodies the asset (trust + complexity).
- ➖ Account merge constraints; more operations; harder to reason about failure.

### C. Auto-generated claimable balances

Escrow the asset as a claimable balance the recipient claims later.

- ➕ Asset can be sent before the recipient has a trustline/account.
- ➖ Claiming still requires a trustline + reserve unless sponsored.
- ➖ Needs a recovery path for unclaimed balances.

## Chosen design: B-avoiding composition of A-style handshake + sponsorship + C

We compose:

- **Sponsored reserves (CAP-33)** — removes the recipient's XLM requirement (solves the
  gap in A and C).
- **Claimable balances** — lets the asset be delivered before the recipient acts, with a
  built-in **recovery path** (sponsor reclaims if unclaimed).
- **A standard handshake** — the interoperability layer (the value A contributes),
  without requiring the recipient to hold XLM.

We **avoid temporary intermediary accounts (B)** because they add transient custody and
operational complexity for no benefit once sponsorship + claimable balances are combined.

## Trade-off summary

| Property | A alone | B | C alone | Chosen |
| --- | --- | --- | --- | --- |
| Recipient needs XLM | yes | no | yes | **no** |
| Recipient needs prior trustline | no | no | no | **no** |
| New transient custodian | no | yes | no | **no** |
| Recoverable if abandoned | n/a | partial | yes | **yes** |
| Protocol change required | no | no | no | **no** |
| Interoperable standard | yes | partial | partial | **yes** |

## Open questions (resolved during M1)

- Exact discovery mechanism (`stellar.toml` fields).
- Claim predicates and authorization expiry.
- Fee responsibility between sender and recipient.
- Optional issuer authorization flags (authorized/clawback) interaction.
