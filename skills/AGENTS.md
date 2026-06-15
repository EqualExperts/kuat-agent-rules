# Skills — agent discovery

Equal Experts brand **session procedures** live here. **Compliance standards** live in the passive [`reference/`](../reference/README.md) library.

## Available skills

**Activity skills (preferred)** — pick by job; each carries its own intake and loads the `reference/` slices it needs:

| Skill ID | File |
|----------|------|
| `create-web-app` | [create-web-app/SKILL.md](./create-web-app/SKILL.md) |
| `review-web-app` | [review-web-app/SKILL.md](./review-web-app/SKILL.md) |
| `create-imagery` | [create-imagery/SKILL.md](./create-imagery/SKILL.md) |
| `create-presentation` | [create-presentation/SKILL.md](./create-presentation/SKILL.md) |
| `review-presentation` | [review-presentation/SKILL.md](./review-presentation/SKILL.md) |

**Legacy intent skills** (rewired onto `reference/`; kept until Phase 5):

| Skill ID | File |
|----------|------|
| `kuat-review` | [kuat-review/SKILL.md](./kuat-review/SKILL.md) |
| `kuat-create` | [kuat-create/SKILL.md](./kuat-create/SKILL.md) |

## Mandatory first step

Before any review or create work:

1. Follow [shared/resolve-rules.md](./shared/resolve-rules.md) (or use **bundled** `dist/*/SKILL.md` where shared content is inlined)
2. Run `skills/scripts/ensure-rules.sh` when shell is available
3. Start from `{RULES_DIR}/README.md`, then load the `reference/` slices the active skill points to (loading is per-skill)
4. Compare `RULES_REF` to [dist/manifest.json](./dist/manifest.json) → `rules.builtAtRef`

Do not proceed with brand guidance from memory alone.

**Upload-only tools:** load [dist/kuat-review/SKILL.md](./dist/kuat-review/SKILL.md) or [dist/kuat-create/SKILL.md](./dist/kuat-create/SKILL.md).

## Intent

Prefer the activity skill for the job. The legacy intent skills still work as a fallback:

| User goal | Skill |
|-----------|--------|
| Audit / validate / review existing work | `review-web-app`, `review-presentation`, or `kuat-review` |
| Generate / build / write new branded content | `create-web-app`, `create-imagery`, `create-presentation`, or `kuat-create` |

If unclear, ask: *Are you reviewing existing work or creating something new?*

## Related

- [README.md](./README.md) — Human setup and env vars
- [reference library](../reference/README.md) — Compliance standards (the WHAT)
