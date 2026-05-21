# Resolve Rules (mandatory)

Every Equal Experts brand skill **must** resolve and verify the rules location before loading rule content. Do not rely on memory of tokens, colours, or patterns.

---

## Variables

| Variable | Meaning |
|----------|---------|
| `RULES_ROOT` | Git repo root or npm package root (`@equal-experts/kuat-react`) |
| `RULES_DIR` | `{RULES_ROOT}/kuat-docs/rules` (git) or `{RULES_ROOT}/agent-docs/rules` (package) |
| `RULES_REF` | Git SHA, or `manifest.json` `rules.snapshotRef` for packages |
| `RULES_SOURCE` | `git` or `package` |
| `PACKAGE_VERSION` | Installed package version when `RULES_SOURCE=package` |
| `OVERLAY_DIR` | Set when `KUAT_RULES_OVERLAY_PATH` is valid |
| `COMPONENT_MANIFEST` | Path to `components.manifest.json` when present |

---

## Resolution order

Run [ensure-rules.sh](../scripts/ensure-rules.sh) when shell is available. Otherwise try in order:

1. **`KUAT_RULES_PATH`** — git repo (`kuat-docs/rules/LOADING.md`) or package root (`agent-docs/`)
2. **`.kuat-rules-path`** — in cwd or git root
3. **npm package** — walk up from cwd: `node_modules/@equal-experts/kuat-{react,vue,core}` with `agent-docs/rules/LOADING-consumer.md`
4. **Sibling git paths:** `kuat-agent-docs`, `vendor/kuat-agent-docs`, `../kuat-agent-docs`
5. **Skills co-located** — parent of `skills/` in `kuat-agent-docs`

If none resolve, stop and direct the user to [skills/README.md](../README.md#install-rules).

### Loading index by source

| `RULES_SOURCE` | Load |
|----------------|------|
| `git` | `{RULES_DIR}/LOADING.md` (full taxonomy) |
| `package` | `{RULES_DIR}/LOADING-consumer.md` (bundled web + foundations) |

---

## Freshness

| `RULES_SOURCE` | Action |
|----------------|--------|
| `git` | `KUAT_RULES_REF` pin; `KUAT_RULES_UPDATE=1` to pull/checkout |
| `package` | Rules pinned to installed version; override with `KUAT_RULES_PATH` to git clone for latest upstream |

---

## Local overlay (library / mono)

After rules are resolved, load overlay second when `KUAT_RULES_OVERLAY_PATH` is set:

- Typical: `kuat-mono/kuat-docs` for contributors
- Resolve component IDs via `COMPONENT_MANIFEST` → `components/{slug}.md`

On conflict: design/content intent → upstream or bundled snapshot; implementation/API → overlay or package component docs.

See [consumption-contract.md](./consumption-contract.md) and [kuat-docs/setup/consumption-architecture.md](../../kuat-docs/setup/consumption-architecture.md).

---

## Component docs on demand

When a scenario or artifact references a component ID (e.g. `shadcn:button`):

1. Read [component-registry.md](../../kuat-docs/rules/types/web/product/component-registry.md) for slug mapping.
2. Load doc from `{RULES_ROOT}/agent-docs/components/{slug}.md` or `{OVERLAY_DIR}/components/{slug}.md`.

Do not load the full component catalog unless multiple primitives are in scope.

---

## Related

- [consumption-contract.md](./consumption-contract.md)
- [../scripts/README.md](../scripts/README.md)
- [../../kuat-docs/rules/LOADING.md](../../kuat-docs/rules/LOADING.md)
- [../../kuat-docs/setup/consumption-architecture.md](../../kuat-docs/setup/consumption-architecture.md)
