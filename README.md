# Trustliner

> Onboard users to Stellar assets **without manual trustline setup.**

Trustliner is a Stellar standard, reference implementation, and SDK that
lets exchanges and wallets deliver non-native assets (USDC, EURC, etc.) to brand-new
users who hold no XLM and have never created a trustline. It removes the single
biggest source of friction in Stellar asset onboarding.

Built as a submission to the **Stellar Community Fund — Build Award, RFP Track**
([Trustliner RFP](https://stellar.gitbook.io/scf-handbook/scf-awards/build-award/rfp-track)).

---

## The problem

On Stellar, an account must complete two steps before it can hold a non-native asset:

1. Be **funded** with XLM to meet the base reserve.
2. Establish a **trustline** to the asset's issuer (which itself locks 0.5 XLM of reserve).

For a user arriving from a centralized exchange or a freshly created wallet, this is a
chicken-and-egg wall: they cannot receive the asset until they already hold XLM and have
manually configured a trustline they don't understand. Most onboarding flows die here.

## The approach

Trustliner defines an **open standard** (SEP draft) plus tooling that lets a
sender (exchange/wallet) deliver an asset to a recipient who has done *nothing* in
advance. The standard composes three existing Stellar primitives so no protocol change
is required to ship v1:

- **Sponsored reserves (CAP-33)** — the sender pays the recipient's base + trustline
  reserve, so the recipient needs zero XLM.
- **Claimable balances** — the asset is escrowed for the recipient and claimed on first
  interaction, even before the account exists.
- **A standard request/authorize interface** — wallets and exchanges coordinate the
  onboarding handshake through one documented protocol instead of bespoke integrations.

See [`standard/`](./standard) for the full specification and rationale.

## Repository layout

| Path | What it is |
| --- | --- |
| [`standard/`](./standard) | The published standard — SEP/CAP draft, rationale, security notes |
| [`proposal/`](./proposal) | SCF Build Award grant proposal and supporting docs |
| [`packages/sdk/`](./packages/sdk) | TypeScript SDK for wallet & exchange integration |
| [`packages/reference/`](./packages/reference) | Reference implementation — issuer & recipient flows |
| [`apps/welcome/`](./apps/welcome) | "Welcome to Stellar" onboarding landing page |
| [`docs/`](./docs) | Integration guides and architecture documentation |

## Status

🚧 **Foundation stage.** Project scaffold and grant proposal in place; specification
and implementation in progress. See [`proposal/milestones.md`](./proposal/milestones.md)
for the delivery plan.

## Development

```bash
pnpm install      # install workspace dependencies
pnpm build        # build all packages
pnpm test         # run all tests
pnpm typecheck    # type-check all packages
```

Requires Node.js ≥ 22 and pnpm ≥ 11.

## License

[Apache-2.0](./LICENSE). Built in the open.
