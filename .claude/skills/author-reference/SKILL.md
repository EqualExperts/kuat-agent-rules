---
name: author-reference
description: Add or edit a guideline or pattern in the passive reference library (reference/). Use when writing/changing brand, design-language, content, accessibility, or per-medium reference — keeps it passive (the WHAT, no procedure), places media patterns under media-types/<medium>/patterns/, updates MIGRATION-MAP.md when paths move, and routes colour changes through the token SoT. Contributor-only; repo-local. NOT for writing a skill (that's author-skill) or applying the brand to a deliverable (consumer skills).
---

# Author a reference guideline / pattern

`reference/` is the **passive** source of truth — it states **what is true about Equal Experts**
and nothing about how to do a job. Write to that boundary, then gate the change with
[review-reference-change](../review-reference-change/SKILL.md) before merging.

> **The passive test (the one rule that matters):** a file belongs in `reference/` only if it states
> what is true — principles, specs, token values, fact tables, patterns. The moment it tells an agent
> *how to do a job* (verbs, role cards, checklists, "before you create/review", loading order), it is
> **procedure** and belongs in a **skill**. See the boundary in
> [`reference/README.md`](../../../reference/README.md#the-passiveskill-boundary).

## Step 1 — Place it correctly

- **Foundations** (cross-medium truth): `reference/brand/`, `reference/design-language/`,
  `reference/content/`, `reference/accessibility/`.
- **A medium's guidance**: `reference/media-types/<medium>/` (slides, web-product, web-marketing,
  imagery, charts-data).
- **A medium's pattern** ("how we do X in this medium", stated passively): under that medium's
  **`patterns/`** subfolder — `reference/media-types/<medium>/patterns/`. `patterns/` is **per-medium
  only**, never a top-level concept.
- **Platform isolation:** a media-type file may reference foundations but **not** another media-type
  (slides ↛ web, imagery ↛ web). See [AGENTS.md](../../../AGENTS.md).

## Step 2 — Write it passive

- State facts and specs. Prefer tables, value lists, and "X is Y" statements.
- **No** verbs-as-instructions, role cards, checklists, "before you create/review" sections, numbered
  `Step N` procedures, or task→files loading tables. Those go in a skill.
- Don't smuggle procedure into prose ("first… then…", a recipe). If you're telling the reader to *do*
  something, it's a skill.
- Keep links relative (`../brand/logo.md`) so the repo dev path and the packaged snapshot both resolve.

## Step 3 — Colours go through the token SoT (never by hand)

`reference/design-language/colours.md` is a **generated artifact**. Do **not** edit it.
To change a brand colour, scale, or alias: edit
[`tokens/colors.tokens.json`](../../../reference/design-language/tokens/colors.tokens.json) and run
[generate-tokens](../generate-tokens/SKILL.md) (`npm run tokens:generate`). The drift check enforces this.

## Step 4 — If you move or rename a path

- Use `git mv` to preserve history.
- Update every inbound link (the gate's link check will catch stragglers).
- Record the move in [`reference/MIGRATION-MAP.md`](../../../reference/MIGRATION-MAP.md) (old path → new home),
  so the map stays the canonical old→new index.

## Step 5 — Gate before merge

Run the review gate and fix until green:

```bash
npm run reference:check        # passive test + link integrity + structure + token drift
```

Then hand to [review-reference-change](../review-reference-change/SKILL.md) for the manual pass
(is it actually true? platform isolation? prose-smuggled procedure?). Stamp the reference ref
([version-stamp](../../../skills/_shared/version-stamp.md)).

## Related

- Part of the [contribution model](../../../contribute/overview.md) — this is the **Light/Medium · reference** path ([proposing a reference change](../../../contribute/proposing-a-reference-change.md)).
- Review gate: [review-reference-change](../review-reference-change/SKILL.md)
- Colours: [generate-tokens](../generate-tokens/SKILL.md)
- New skill (not reference): [author-skill](../author-skill/SKILL.md)
- The library: [`reference/README.md`](../../../reference/README.md) · old→new: [`MIGRATION-MAP.md`](../../../reference/MIGRATION-MAP.md)
