# Contributing

Trustline Onboarder is built in the open under Apache-2.0. Contributions are welcome.

## Development

```bash
pnpm install
pnpm build
pnpm test
pnpm typecheck
```

Requires Node.js ≥ 22 and pnpm ≥ 11.

## Workflow

1. Open an issue describing the change (bug, feature, or spec question).
2. For standard changes, discuss in the public RFC before implementation.
3. Branch, implement with tests, run `pnpm test && pnpm typecheck`.
4. Open a PR referencing the issue. CI must pass.

## Conventions

- TypeScript strict mode; no `any` without justification.
- The SDK must never custody private keys — callers sign.
- Track the latest stable Stellar releases.
- Document public APIs and protocol changes.

## Standard development

The specification lives in [`standard/`](./standard) and is advanced through the Stellar
SEP process. Spec discussion happens publicly; see [`proposal/ecosystem.md`](./proposal/ecosystem.md).

## Code of conduct

Be respectful and constructive. Harassment is not tolerated.
