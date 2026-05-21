# Web product rules

Guidelines for Equal Experts web applications, dashboards, internal tools, and product emails.

---

**Prerequisites:** Load [foundations](../../../foundations/) first.

**Architecture:** [consumption-architecture.md](../../../../setup/consumption-architecture.md) — entry points and package bundling.

---

## Core files

| File | Purpose |
|------|---------|
| [design.md](./design.md) | Layout, navigation, product visual patterns |
| [accessibility.md](./accessibility.md) | Product accessibility requirements |
| [technical.md](./technical.md) | Stack, tokens, integration (summary; consumer setup in package README) |
| [component-decision-tree.md](./component-decision-tree.md) | Which component source to use (Blocks → Kuat → shadcn → custom) |
| [component-registry.md](./component-registry.md) | Stable component IDs → overlay/package docs |
| [review-context.md](./review-context.md) | Product context for review at `product_ux` / `full` depth |
| [review-checklist.md](./review-checklist.md) | Review checklist |

---

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| [content/](./content/) | UX copy (actions, errors, forms, confirmations) |
| [scenarios/](./scenarios/) | Page-type patterns (auth, forms, dashboards, documentation) |
| [examples/](./examples/) | Framework code samples — **create only**; see [DEPRECATIONS.md](./DEPRECATIONS.md) |

---

## Component-level guides

Per-component usage, variants, API, and accessibility behaviour live in the **implementation overlay** or **npm package** `agent-docs/components/`, not in this upstream tree.

1. Look up the ID in [component-registry.md](./component-registry.md).
2. Resolve `components/{slug}.md` via `components.manifest.json` in:
   - `node_modules/@equal-experts/kuat-react/agent-docs/`, or
   - `KUAT_RULES_OVERLAY_PATH` (e.g. `kuat-mono/kuat-docs/`).

Upstream scenarios cite IDs (e.g. `shadcn:button`) — load the matching component doc when implementing or reviewing that primitive.

---

## LOADING summary

| Intent | Load |
|--------|------|
| **review** | design, accessibility, component-decision-tree, review-context, review-checklist + relevant scenario; skip `examples/` |
| **create** | Above + scenarios/content as needed + `examples/` when generating code |

Full index: [LOADING.md](../../../LOADING.md).

---

## Related

- [Web rules parent](../README.md)
- [consumption-architecture.md](../../../../setup/consumption-architecture.md)
- [DEPRECATIONS.md](./DEPRECATIONS.md)
