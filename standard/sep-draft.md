## Preamble

```
SEP: TBD
Title: Trustline-Free Asset Onboarding
Author: TODO (applicant)
Track: Standard
Status: Draft
Created: 2026-06-08
Version: 0.1.0
Discussion: TODO (RFC link)
```

## Simple Summary

A standard handshake that lets a sender (exchange or wallet) deliver a non-native
Stellar asset to a recipient who holds no XLM and has no trustline, by composing
sponsored reserves (CAP-33) and claimable balances. The recipient configures nothing
in advance.

## Dependencies

- **CAP-0033** — Sponsored Reserves.
- **Claimable Balances** (CAP-0023).
- Existing SEP conventions for service discovery and message signing _(TBD: cite exact
  SEPs reused — e.g. SEP-0001 stellar.toml, SEP-0010 auth — during M1)._

## Motivation

Receiving a non-native asset on Stellar requires a funded account and a pre-established
trustline. New users from exchanges and fresh wallets have neither, which is the largest
drop-off point in asset onboarding. A shared standard replaces bespoke, non-interoperable
integrations with one documented protocol.

## Abstract

The standard defines:

1. A **discovery** mechanism for a sender to advertise onboarding support.
2. A **handshake**: `request` → `authorize` → `settle` messages between sender and
   recipient tooling.
3. A **settlement flow** using sponsored reserves + a claimable balance so the recipient
   needs zero XLM and no prior trustline, and so unclaimed onboarding is recoverable.

## Specification

### Roles

- **Sender** — holds the asset, sponsors reserves, initiates settlement.
- **Recipient** — the onboarding user; may not yet have an account.
- **Sponsor** — account paying base + trustline reserve (typically the sender).

### Discovery

_TBD (M1): how a sender advertises onboarding support and parameters (asset(s),
endpoints, limits). Likely via `stellar.toml`._

### Handshake messages

_TBD (M1): exact JSON schemas, required fields, and signing for each message._

| Message | Direction | Purpose |
| --- | --- | --- |
| `request` | recipient tooling → sender | Ask to onboard `recipient` for `asset` |
| `authorize` | sender → recipient tooling | Approve; return terms + sponsor account |
| `settle` | — | On-chain settlement (see below) |

### Settlement flow

1. Sender begins sponsorship (`BEGIN_SPONSORING_FUTURE_RESERVES`).
2. If the recipient account does not exist, create it (sponsored).
3. Establish the asset trustline under sponsorship.
4. Create a **claimable balance** of the asset addressed to the recipient.
5. Sender ends sponsorship (`END_SPONSORING_FUTURE_RESERVES`).
6. Recipient claims the balance on first interaction.

_TBD (M1): exact operation ordering, claim predicates, reclaim path, and fee handling._

### Error semantics

_TBD (M1): error codes for already-onboarded, insufficient sponsor balance, expired
authorization, asset not supported, etc._

## Design Rationale

See [`rationale.md`](./rationale.md).

## Security Concerns

See [`security.md`](./security.md).

## Implementation

Reference implementation: [`../packages/reference`](../packages/reference).
SDK: [`../packages/sdk`](../packages/sdk).
