---
name: kuat-create
description: Create EE-branded slides, web UI, marketing content, graphics, or copy using kuat-agent-docs rules. Use when building or generating new Equal Experts branded artifacts. Always resolves up-to-date rules before creating.
---

# Equal Experts brand create

Produce new EE-branded artifacts following upstream rules and existing patterns.

## Step 0 — Resolve rules (mandatory)

{{include:skills/shared/resolve-rules.md}}

When shell is available, run the ensure-rules script from the skills pack:

```bash
/path/to/skills/scripts/ensure-rules.sh
```

Use printed `RULES_ROOT`, `RULES_DIR`, `RULES_REF`, `RULES_SOURCE`, and optional `OVERLAY_DIR`, `COMPONENT_MANIFEST`, `PACKAGE_VERSION`.

{{include:skills/shared/consumption-contract.md}}

## Step 1 — Load rules index

Read `{RULES_DIR}/LOADING.md` when `RULES_SOURCE=git`, or `{RULES_DIR}/LOADING-consumer.md` when `RULES_SOURCE=package`. Confirm **task type** and load:

1. Foundations (per LOADING row)
2. Create role card if any (e.g. `{RULES_DIR}/roles/technical-illustrator.md` for infographics)
3. Type-specific rules and optional scenarios
4. Component guides from package/overlay when building UI primitives (prefer over deprecated [examples](../../kuat-docs/rules/types/web/product/examples/))
5. `{RULES_DIR}/types/web/product/examples/` **only** for token/layout syntax when overlay docs are unavailable

## Step 2 — Pre-flight

Run type-specific **Before you create** guidance:

| Task type | Guidance |
|-----------|----------|
| **slides** | `{RULES_DIR}/types/slides/README.md` |
| **web_product** | `{RULES_DIR}/types/web/product/design.md` |
| **icons / infographics** | Role card + `{RULES_DIR}/types/graphics/` |
| **web_marketing** | `{RULES_DIR}/types/web/marketing/` + scenario when known |

If deliverable format is ambiguous, ask once: Figma, code, copy doc, deck file, etc.

## Step 3 — Create

- Search existing patterns first; do not invent layouts or components unless asked
- Use semantic tokens (`bg-primary`), not raw hex
- Follow type rules and scenarios over improvisation
- Ask if scenario, audience, or constraints are unclear

## Step 4 — Deliver

Run the type checklist before handoff (e.g. `{RULES_DIR}/types/slides/checklist.md`).

## Related

- Companion skill: `kuat-review` (source: `skills/kuat-review/`)
- Install and bundle: `skills/README.md`
