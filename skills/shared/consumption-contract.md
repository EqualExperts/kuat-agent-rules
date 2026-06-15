# Rules consumption contract

When skills are used from a consumer implementation repository (for example `kuat-mono`) or an application with only npm packages installed:

## Load order

1. Resolve rules (`RULES_DIR`) — see [resolve-rules.md](./resolve-rules.md); run [ensure-rules.sh](../scripts/ensure-rules.sh)
2. Start from the index: `reference/README.md` (git) or `LOADING-consumer.md` (package); loading is per-skill
3. Load the `reference/` slices the active skill points to (foundations → medium → pattern)
4. Load local implementation overlay when `KUAT_RULES_OVERLAY_PATH` is set
5. Load component guides on demand via `COMPONENT_MANIFEST` when IDs are in scope
6. Run the skill procedure (review or create)

## Sources

| Source | `RULES_SOURCE` | Typical entry |
|--------|----------------|---------------|
| `kuat-agent-docs` git clone | `git` | Org, slides, marketing, full taxonomy |
| `@equal-experts/kuat-react` / `kuat-vue` | `package` | App developers; version-pinned snapshot |
| `kuat-mono` overlay | (with git upstream) | Library contributors |

Bundled package rules are canonical for **design intent at that package version**. Use `KUAT_RULES_PATH` to override with latest upstream git.

## Conflict policy

| Topic | Canonical source |
|-------|------------------|
| Design, structure, content intent | Upstream rules or bundled snapshot at installed version |
| Per-component usage, API, a11y behaviour | Package `agent-docs/components/` or overlay |
| Implementation, testing, build | Local consumer repo / `kuat-mono` |
| Ambiguous implementation behaviour | Runtime evidence: tests → Storybook → package exports → source |

## Platform isolation

Load only the active medium's rules from `reference/media-types/<medium>/` plus the shared foundations (`brand/`, `design-language/`, `content/`, `accessibility/`). Do not mix slides rules with web-product rules in one session.

## Related

- [../../AGENTS.md](../../AGENTS.md)
- [reference library](../../reference/README.md)
- [../../kuat-docs/setup/consumption-architecture.md](../../kuat-docs/setup/consumption-architecture.md)
- [../../kuat-docs/setup/ownership-matrix.md](../../kuat-docs/setup/ownership-matrix.md)
