---
name: create-imagery
description: Create or select Equal Experts visual assets — icons, infographics, illustrations, diagrams, and photography selection/briefs. Use when producing or choosing imagery that must follow EE brand, colour, and photography rules. Includes a light pre-publish quality/accessibility check. Not for full slide decks or web UI.
---

# Create EE imagery

Produce on-brand Equal Experts visual assets, then run the light quality check before handoff. This skill covers four jobs — **icons**, **infographics**, **illustrations**, and **photography selection**. Pick the role for the job, load only the matching reference, and don't invent visual language beyond the brand and any supplied references. Standards live in [`/reference`](${CLAUDE_PLUGIN_ROOT}/reference/README.md).

## Step 1 — Intake

Run the grouped intake ([../_shared/intake.md](${CLAUDE_PLUGIN_ROOT}/skills/_shared/intake.md)) and confirm:

- **Which job** — icon / infographic / illustration / photography selection.
- **Deliverable** — format, size, vector vs raster, quantity (single vs set).
- **Reference assets** — for icon sets and infographics, EE style references are usually **required** (see role guardrails).
- **Data/copy** — provided, or to be supplied? Never invent statistics, claims, or copy.

If a required reference or spec is missing, **ask and stop** before generating.

## Step 2 — Adopt the role for the job

| Job | Role (use verbatim as the framing) | Default output |
|-----|-----------------------------------|----------------|
| **Infographic** | "You are a professional Technical Illustrator. Create a 2K high-fidelity infographic (16:9) for Equal Experts by strictly adhering to the visual language in the attached reference files." | 2K, 16:9, single deliverable |
| **Icon** | "You are a professional Icon Designer for Equal Experts. Create recognizable, consistent, simple icons using the brand palette, with a unified line weight and corner style." | SVG, 24×24 base, consistent line weight/radius |
| **Illustration** | Technical Illustrator framing, scaled to the requested format | Per brief; follow brand + illustration rules |
| **Photography** | Selection/brief against EE photography rules (not generation) | EE People/Stock library sources; B&W |

**Hard rules (all jobs):** follow the brand and design-language foundations for colour/type/spacing; follow the job-specific reference for domain rules; do not restate or override them. For "match existing set" tasks, reference files are mandatory.

## Step 3 — Load the standards you need

- Brand identity & logo: [../../reference/brand/](${CLAUDE_PLUGIN_ROOT}/reference/brand/) (brand, logo)
- Colour / typography / spacing: [../../reference/design-language/](${CLAUDE_PLUGIN_ROOT}/reference/design-language/)
- Accessibility (contrast, alt text): [../../reference/accessibility/accessibility.md](${CLAUDE_PLUGIN_ROOT}/reference/accessibility/accessibility.md)
- **Icons:** [../../reference/media-types/imagery/patterns/graphics/icons.md](${CLAUDE_PLUGIN_ROOT}/reference/media-types/imagery/patterns/graphics/icons.md)
- **Infographics:** [../../reference/media-types/imagery/patterns/graphics/infographics.md](${CLAUDE_PLUGIN_ROOT}/reference/media-types/imagery/patterns/graphics/infographics.md)
- **Illustrations:** [../../reference/media-types/imagery/patterns/graphics/illustrations.md](${CLAUDE_PLUGIN_ROOT}/reference/media-types/imagery/patterns/graphics/illustrations.md)
- **Photography:** [../../reference/media-types/imagery/patterns/photography/](${CLAUDE_PLUGIN_ROOT}/reference/media-types/imagery/patterns/photography/) (principles, diversity-inclusion, style-and-sources)

## Step 4 — Create / select

- Stay within the brand palette and supplied references; keep line weight, corner style, and colour consistent across a set.
- Infographics: data/information design only from supplied data; ask if the brief is missing what's needed.
- Photography: choose from EE People/Stock libraries; monochrome unless an exception applies; authentic, diverse, realistic technology.

## Step 5 — Light quality & accessibility check (before handoff)

Run this gate on every imagery deliverable (full photography rubric folds the EE quality-validation checklist):

**Technical quality** — resolution adequate for output (web ≥72dpi, print ≥300dpi); sharp; correctly exposed; sensible crop; correct aspect ratio.

**Accessibility** — non-decorative images have descriptive, contextual alt text ("Engineer reviewing a pull request on a laptop", not "person at computer"); decorative images use `alt=""`; meaning never carried by colour or text-in-image alone; contrast meets AA.

**Style & content** — monochrome (photography, unless exception); brand palette and consistent line/corner style (graphics); no holograms/AR/fictional tech; supports the surrounding content, not generic filler; sourced from approved EE libraries with rights cleared.

**Diversity & inclusion (photography sets)** — assess across the **full set**, not each image alone: varied ethnicity, age, gender; women and non-binary people in technical/leadership contexts; authentic, not staged for representation.

- [ ] Version stamp applied — see [../_shared/version-stamp.md](${CLAUDE_PLUGIN_ROOT}/skills/_shared/version-stamp.md)

## Conflict & ambiguity

Flag any request that conflicts with brand/photography/accessibility rules rather than silently breaking them. Ask when format, context, or references are unclear — don't guess usage context.

## Related

- Shared: [intake](${CLAUDE_PLUGIN_ROOT}/skills/_shared/intake.md) · [version-stamp](${CLAUDE_PLUGIN_ROOT}/skills/_shared/version-stamp.md)
- Imagery used inside decks: see [create-presentation](${CLAUDE_PLUGIN_ROOT}/skills/create-presentation/SKILL.md)
