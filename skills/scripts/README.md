# Skills scripts

## bundle-skills.mjs

Produces self-contained `skills/dist/` artifacts for upload-only UIs (Claude Projects, etc.).

```bash
npm run bundle:skills
# or: node skills/scripts/bundle-skills.mjs
```

- Inlines `{{include:...}}` from source `SKILL.md` files
- Writes `dist/manifest.json` with `rules.builtAtRef`
- Copies `ensure-rules.sh` to `dist/scripts/`

Edit **source** under `skills/kuat-review/` and `skills/kuat-create/`; regenerate `dist/` before upload.

## ensure-rules.sh

Resolves the Equal Experts rules repository and prints paths for agents and humans.

```bash
# From repo root or any consumer project
/path/to/kuat-agent-docs/skills/scripts/ensure-rules.sh

# Update rules when behind upstream
KUAT_RULES_UPDATE=1 ./skills/scripts/ensure-rules.sh

# Pin to a specific ref
KUAT_RULES_REF=main KUAT_RULES_UPDATE=1 ./skills/scripts/ensure-rules.sh
```

**Output:**

```
RULES_ROOT=/path/to/kuat-agent-docs
RULES_DIR=/path/to/kuat-agent-docs/kuat-docs/rules
RULES_REF=abc1234...
```

See [../shared/resolve-rules.md](../shared/resolve-rules.md) for resolution order and environment variables.
