# Rules ownership matrix

Who owns which guidance when Kuat rules are consumed across repositories and npm packages.

---

## Upstream (`kuat-agent-docs`)

| Topic | Owner |
|-------|--------|
| Brand principles and identity | This repo |
| Foundations (colour, typography, spacing, borders, accessibility baseline) | This repo |
| Content voice and style | This repo |
| Web product and marketing structure, scenarios, patterns | This repo |
| Task → context loading taxonomy ([LOADING.md](../rules/LOADING.md)) | This repo |
| Component **selection** priority ([component-decision-tree.md](../rules/types/web/product/component-decision-tree.md)) | This repo |
| Stable component **IDs** ([component-registry.md](../rules/types/web/product/component-registry.md)) | This repo |

---

## Downstream (`kuat-mono` / npm packages)

| Topic | Owner |
|-------|--------|
| Kuat component implementation architecture | `kuat-mono` |
| Package API behaviour (`@equal-experts/kuat-react`, `@equal-experts/kuat-vue`) | `kuat-mono` |
| Per-component usage guides (`agent-docs/components/`) | `kuat-mono` → published in packages |
| Storybook, testing, contributor workflow | `kuat-mono` |
| Version-pinned rules snapshot in npm `agent-docs/` | `kuat-mono` (built on release) |

---

## Conflict resolution

| Conflict type | Wins |
|---------------|------|
| Design, structure, content intent | Upstream (`kuat-agent-docs` or bundled snapshot at package version) |
| Implementation, API, testing, build | Local overlay or package component docs |
| Ambiguous implementation behaviour | Tests → Storybook → package exports → source |

---

## Drift policy

- **Org / git consumers:** upstream `main` or pinned tag is canonical for foundations; use `KUAT_RULES_UPDATE=1` when intentionally refreshing.
- **npm consumers:** bundled `agent-docs/manifest.json` `rulesSnapshotRef` is canonical for design intent **at that package version**; override with `KUAT_RULES_PATH` only when you need bleeding-edge upstream.

---

## Related

- [consumption-architecture.md](./consumption-architecture.md) — three entry points and resolution
- [skills/shared/consumption-contract.md](../../skills/shared/consumption-contract.md)
- [AGENTS.md](../../AGENTS.md)
