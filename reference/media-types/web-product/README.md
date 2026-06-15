# Web Product

Reference for Equal Experts web applications, dashboards, internal tools, and product emails.

| File | Scope |
|------|-------|
| [design.md](./design.md) | Layout, navigation, product visual patterns |
| [accessibility.md](./accessibility.md) | Product accessibility requirements |
| [emails.md](./emails.md) | Transactional / product email patterns |
| [component-decision-tree.md](./component-decision-tree.md) | Which component source to use (Blocks → Kuat → shadcn → custom) |
| [component-registry.md](./component-registry.md) | Stable component IDs → overlay/package guides |
| [content/](./content/) | UX copy (actions, errors, forms, confirmations, empty states) |
| [patterns/](./patterns/) | Page-type patterns (auth, dashboards, documentation, forms) |
| [examples/](./examples/) | Framework code samples (React, Vue, CSS) |

Per-component usage, variants, and API live in the implementation overlay or npm package `agent-docs/components/`, resolved via the IDs in [component-registry.md](./component-registry.md) — not in this upstream tree.
