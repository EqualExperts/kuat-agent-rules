# Skills — agent discovery

Equal Experts brand **session procedures** live here. **Compliance standards** live in `kuat-docs/rules/`.

## Available skills

| Skill ID | File |
|----------|------|
| `kuat-review` | [kuat-review/SKILL.md](./kuat-review/SKILL.md) |
| `kuat-create` | [kuat-create/SKILL.md](./kuat-create/SKILL.md) |

## Mandatory first step

Before any review or create work:

1. Follow [shared/resolve-rules.md](./shared/resolve-rules.md) (or use **bundled** `dist/*/SKILL.md` where shared content is inlined)
2. Run `skills/scripts/ensure-rules.sh` when shell is available
3. Load `{RULES_DIR}/LOADING.md` from printed `RULES_ROOT`
4. Compare `RULES_REF` to [dist/manifest.json](./dist/manifest.json) → `rules.builtAtRef`

Do not proceed with brand guidance from memory alone.

**Upload-only tools:** load [dist/kuat-review/SKILL.md](./dist/kuat-review/SKILL.md) or [dist/kuat-create/SKILL.md](./dist/kuat-create/SKILL.md).

## Intent

| User goal | Skill |
|-----------|--------|
| Audit / validate / review existing work | `kuat-review` |
| Generate / build / write new branded content | `kuat-create` |

If unclear, ask: *Are you reviewing existing work or creating something new?*

## Related

- [README.md](./README.md) — Human setup and env vars
- [../kuat-docs/rules/LOADING.md](../kuat-docs/rules/LOADING.md) — Rule file index
