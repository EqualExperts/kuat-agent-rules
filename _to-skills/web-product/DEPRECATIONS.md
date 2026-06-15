# Web product — deprecations

Assets superseded by package/overlay component guides and consumption architecture.

---

| Asset | Status | Replacement |
|-------|--------|-------------|
| [examples/react/components.md](./examples/react/components.md) | Deprecated | `shadcn:button` etc. → package `agent-docs/components/{slug}.md` |
| [examples/vue/components.md](./examples/vue/components.md) | Deprecated | Same |
| Full CVA source listings in examples | Deprecated | [component-registry.md](./component-registry.md) + overlay docs |
| Duplicate consumer setup in [technical.md](./technical.md) | Trimmed | Package README + `agent-docs/AGENTS.md` |
| [kuat-docs/.tmp/documentation-agent.md](../../../.tmp/documentation-agent.md) | Moved | `kuat-mono/contribution-docs/component-documentation-agent.md` (mono plan) |

---

## Examples directory policy

[examples/](./examples/) remains for **create** sessions as illustrative token/layout syntax. Do **not** treat example component source as canonical API.

Load [examples/README.md](./examples/README.md) for scope. Prefer component IDs when generating UI.

---

## Related

- [component-registry.md](./component-registry.md)
- [consumption-architecture.md](../../../../setup/consumption-architecture.md)
