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

Loading is **per-skill** now — prefer the matching **activity skill** for the task (see Related). If loading reference directly: start from `{RULES_DIR}/README.md` (git: `reference/`; package snapshot: `{RULES_DIR}/LOADING-consumer.md`), confirm **task type**, and load:

1. Foundations — `{RULES_DIR}/brand/`, `{RULES_DIR}/design-language/`, `{RULES_DIR}/content/`, `{RULES_DIR}/accessibility/` (only the slices the task needs)
2. The medium's rules — `{RULES_DIR}/media-types/<medium>/` (+ its `patterns/` when the scenario is known)
3. For infographics/icons, adopt the role framing carried by [create-imagery](../create-imagery/SKILL.md)
4. Component guides from package/overlay when building UI primitives (prefer over the illustrative `{RULES_DIR}/media-types/web-product/examples/`)
5. `{RULES_DIR}/media-types/web-product/examples/` **only** for token/layout syntax when overlay docs are unavailable

## Step 2 — Pre-flight

Run type-specific **Before you create** guidance (now carried by the activity skills):

| Task type | Guidance |
|-----------|----------|
| **slides** | [create-presentation](../create-presentation/SKILL.md); rules in `{RULES_DIR}/media-types/slides/` |
| **web_product** | [create-web-app](../create-web-app/SKILL.md); rules in `{RULES_DIR}/media-types/web-product/design.md` |
| **icons / infographics** | [create-imagery](../create-imagery/SKILL.md); rules in `{RULES_DIR}/media-types/imagery/patterns/graphics/` |
| **web_marketing** | `{RULES_DIR}/media-types/web-marketing/` + pattern when known |

If deliverable format is ambiguous, ask once: Figma, code, copy doc, deck file, etc.

## Step 3 — Create

- Search existing patterns first; do not invent layouts or components unless asked
- Use semantic tokens (`bg-primary`), not raw hex
- Follow type rules and scenarios over improvisation
- Ask if scenario, audience, or constraints are unclear

## Step 4 — Deliver

Run the activity skill's delivery checklist before handoff (e.g. the slides checklist in [create-presentation](../create-presentation/SKILL.md)).

## Related

- Activity skills (preferred): [create-web-app](../create-web-app/SKILL.md), [create-imagery](../create-imagery/SKILL.md), [create-presentation](../create-presentation/SKILL.md)
- Companion skill: `kuat-review` (source: `skills/kuat-review/`)
- Install and bundle: `skills/README.md`
