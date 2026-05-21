# Install skills in Claude Projects

Claude Projects use uploaded knowledge files rather than filesystem skills. Use **bundled** skills so shared content is inlined in one file per skill.

## 1. Rules

Add **kuat-agent-docs** rules to project knowledge (not embedded in skill bundles):

- Minimum: `kuat-docs/rules/LOADING.md` plus foundations/types for your work
- Better: periodic re-upload when `dist/manifest.json` → `rules.builtAtRef` changes

Run locally and paste into project instructions when you update rules:

```bash
KUAT_RULES_UPDATE=1 ./skills/scripts/ensure-rules.sh
# Paste RULES_REF from output
```

## 2. Skills (upload bundled files)

Regenerate bundles if needed: `npm run bundle:skills`

| Upload this file | Purpose |
|----------------|---------|
| `skills/dist/kuat-review/SKILL.md` | **Self-contained** review procedure (shared + report formats inlined) |
| `skills/dist/kuat-create/SKILL.md` | **Self-contained** create procedure |

You do **not** need separate `shared/` uploads when using `dist/` bundles.

Optional: upload `skills/dist/manifest.json` so the project knows which rules ref the bundle was built against.

## 3. Project instructions

```text
For Equal Experts brand review → follow the uploaded kuat-review skill (dist bundle).
For create work → follow the uploaded kuat-create skill (dist bundle).

Rules standards live in uploaded kuat-docs/rules (LOADING.md first).
Confirm RULES_REF matches manifest rules.builtAtRef when provided.

Do not invent user stories or research on web reviews at product_ux/full depth.
```

## 4. Verify

Prompt: *Review this slide deck for brand compliance.*

Expected: grouped intake before findings; citations to uploaded rule files.

## Related

- [../README.md](../README.md)
- [../dist/README.md](../dist/README.md)
- [figma-make.md](./figma-make.md) — same upload-only pattern for Figma Make custom skills
