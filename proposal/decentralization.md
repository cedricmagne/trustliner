# Decentralization rationale

The RFP requires an explanation of the decentralization approach (or why it is not
applicable).

## No new trusted intermediary

Trustline Onboarder introduces **no new custodian and no new trusted third party**.
Onboarding is performed using native Stellar primitives — sponsored reserves (CAP-33)
and claimable balances — executed by the **sender the user already transacts with**
(their exchange or wallet). At no point is custody of the recipient's funds transferred
to a Trustline Onboarder-operated service.

## Open and self-hostable

- The **standard** is an open SEP; anyone can implement it.
- The **SDK and reference implementation** are open-source (Apache-2.0) and run entirely
  client-side / against public network infrastructure. Any wallet or exchange can adopt
  the standard independently, with no dependency on a service we operate.

## Trust model

| Actor | Trust assumption |
| --- | --- |
| Sender (exchange/wallet) | Already trusted by the user; pays reserves; cannot seize claimed funds |
| Recipient | Holds their own keys; claims their own balance |
| Sponsor | Reserves are recoverable only by the sponsor if onboarding is abandoned |
| Trustline Onboarder | No keys, no custody, no privileged role |

## Centralized components

The only optional centralized component is the **hosted "Welcome to Stellar" landing
page**, which holds no keys and no user funds and is purely a convenience/demonstration
surface. It can be self-hosted or replaced; the protocol does not depend on it.

## Conclusion

The design is decentralization-preserving: it adds UX, not a new point of trust.
