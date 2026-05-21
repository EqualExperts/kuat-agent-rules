# Rules consumption contract

When skills are used from a consumer implementation repository (for example `kuat-mono`) or an application with only npm packages installed:

## Load order

1. Resolve rules (`RULES_DIR`) — see [resolve-rules.md](./resolve-rules.md); run [ensure-rules.sh](../scripts/ensure-rules.sh)
2. Load matching index: `LOADING.md` (git) or `LOADING-consumer.md` (package)
3. Load foundations → role → type rules per task
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

Load only the task type's rules from `types/` plus `foundations/`. Do not mix slides rules with web product rules in one session.

## Related

- [../../AGENTS.md](../../AGENTS.md)
- [../../kuat-docs/rules/LOADING.md](../../kuat-docs/rules/LOADING.md)
- [../../kuat-docs/setup/consumption-architecture.md](../../kuat-docs/setup/consumption-architecture.md)
- [../../kuat-docs/setup/ownership-matrix.md](../../kuat-docs/setup/ownership-matrix.md)
