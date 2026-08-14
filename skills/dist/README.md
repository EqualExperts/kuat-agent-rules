# Bundled skills (generated)

Do not edit by hand. Regenerate from repo root:

```bash
node skills/scripts/bundle-skills.mjs
```

## Figma AI custom skills (`figma-custom-skills/`)

Fully self-contained — no `{RULES_DIR}`, no network access required. Install all six via
`create_custom_skill` / `edit_custom_skill`:

| Artifact | Loads for |
|----------|-----------|
| [figma-custom-skills/kuat-create/SKILL.md](./figma-custom-skills/kuat-create/SKILL.md) | Orchestrator — start here, load siblings per step, see `skills/kuat-create-figma/SKILL.md` for source |
| [figma-custom-skills/kuat-tokens/SKILL.md](./figma-custom-skills/kuat-tokens/SKILL.md) | tokens rules, see `skills/kuat-tokens/SKILL.md` for source |
| [figma-custom-skills/kuat-composition/SKILL.md](./figma-custom-skills/kuat-composition/SKILL.md) | composition rules, see `skills/kuat-composition/SKILL.md` for source |
| [figma-custom-skills/kuat-patterns/SKILL.md](./figma-custom-skills/kuat-patterns/SKILL.md) | patterns rules, see `skills/kuat-patterns/SKILL.md` for source |
| [figma-custom-skills/kuat-components/SKILL.md](./figma-custom-skills/kuat-components/SKILL.md) | components rules, see `skills/kuat-components/SKILL.md` for source |
| [figma-custom-skills/kuat-review/SKILL.md](./figma-custom-skills/kuat-review/SKILL.md) | Reviewing existing Figma/Figma Make work, see `skills/kuat-review-figma/SKILL.md` for source |

## Other consumption surfaces

| Artifact | Use |
|----------|-----|
| [kuat-review/SKILL.md](./kuat-review/SKILL.md) | Upload to Claude Projects and other single-file tools; resolves `{RULES_DIR}` at runtime via `scripts/ensure-rules.sh` |
| [kuat-create/SKILL.md](./kuat-create/SKILL.md) | Upload to Claude Projects and other single-file tools; resolves `{RULES_DIR}` at runtime via `scripts/ensure-rules.sh` |
| [manifest.json](./manifest.json) | Version and rules ref for installers |
| [scripts/ensure-rules.sh](./scripts/ensure-rules.sh) | Keep rules fresh (filesystem tools) |

**Deprecated:** `kuat-figma-design`, `kuat-figma-prototype`, `kuat-figma-review-design`,
`kuat-figma-make`, `kuat-figma-review-make` — superseded by `figma-custom-skills/` above.
Not emitted by default (still `{RULES_DIR}`-dependent); set
`KUAT_EMIT_DEPRECATED_FIGMA_SKILLS=1` to emit them during the transition.

Rules standards for the legacy group remain in the `reference/` library — not embedded in those
bundles. The `figma-custom-skills/` group inlines everything it needs instead, by design.

Built against rules ref: `d87e1c6cbacb3637df82264b8e50d04c03767be4`
