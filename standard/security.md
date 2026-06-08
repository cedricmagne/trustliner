# Security considerations

Initial security analysis for the trustline-free onboarding standard. Expanded and
audited during milestones M1 and M5.

## Threat model

- The **sender** sponsors reserves and may custody the asset before settlement; it is an
  entity the user already trusts. It must not be able to seize a *claimed* balance.
- The **recipient** controls their own keys and claims their own balance.
- A **third party** must not be able to redirect, front-run, or grief the onboarding.

## Considerations

### Reserve exhaustion / griefing

A malicious caller could attempt to make a sender sponsor many reserves. _Mitigation
(M1): authorization step, per-recipient/asset limits, expiry on `authorize`._

### Claim predicate correctness

The claimable balance must be claimable only by the intended recipient and reclaimable by
the sponsor after expiry. _Mitigation: precise claim predicates; documented reclaim path._

### Authorization replay / expiry

Handshake messages must be signed and time-bounded to prevent replay. _Mitigation:
nonce + expiry; reuse SEP-0010-style auth where applicable._

### Issuer controls (authorized / clawback)

If the asset uses `AUTHORIZATION_REQUIRED` or clawback, the flow must account for issuer
authorization and the recipient's awareness of clawback. _Mitigation: document and surface
these flags in discovery._

### Custody boundaries

The SDK must never custody recipient keys. The caller signs. The reference implementation
must demonstrate trust-minimized, client-side signing.

### Reentrancy / partial failure

Settlement spans multiple operations; partial failure must not strand funds. _Mitigation:
atomic transaction construction where possible; recoverable claimable balance otherwise._

## Disclosure

See [`../SECURITY.md`](../SECURITY.md) for reporting vulnerabilities.
