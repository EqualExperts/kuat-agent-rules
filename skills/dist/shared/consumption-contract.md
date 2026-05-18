# Rules consumption contract

When skills are used from a consumer implementation repository (for example `kuat-mono`):

## Load order

1. Resolve upstream rules (`RULES_DIR`) — see [resolve-rules.md](./resolve-rules.md)
2. Load local implementation overlay when `KUAT_RULES_OVERLAY_PATH` is set or documented in the consumer repo
3. Run the skill procedure (review or create)

## Conflict policy

| Topic | Canonical source |
|-------|------------------|
| Design, structure, content intent | Upstream rules (`kuat-agent-docs`) |
| Implementation, API, testing, build | Local consumer repo |
| Ambiguous implementation behaviour | Runtime evidence: tests → Storybook → package exports → source |

## Platform isolation

Load only the task type's rules from `types/` plus `foundations/`. Do not mix slides rules with web product rules in one session.

## Related

- [../../AGENTS.md](../../AGENTS.md)
- [../../kuat-docs/rules/LOADING.md](../../kuat-docs/rules/LOADING.md)
