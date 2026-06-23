---
name: prep-slides-master
description: Re-slim and brand-fix the Equal Experts PRESENTATION / SLIDE-DECK master template (the .pptx behind kuat-studio) when the raw Google Slides master changes. Slides-only. Use when a new "2026 EE branded master slides" export needs turning into the shipped assets/slides/ee-master-2026.pptx — strips example slides + orphan media, sets the theme font to Lexend, embeds Lora + JetBrains Mono, removes Montserrat, and self-checks. Contributor-only; repo-local. NOT for building a deck (that's create-presentation), and NOT for web/marketing/imagery.
---

# Prep the studio slide-deck master

> **Slides only.** This skill maintains the **presentation master** (`.pptx`) that the kuat-studio
> slide skills build from. It has nothing to do with web, marketing, or imagery.

The studio asset pack ships **one** genuine master, `assets/slides/ee-master-2026.pptx`, that
`create-presentation` builds from and `review-presentation` compares against. When the canonical
Google Slides master changes, regenerate the shipped master from the fresh raw export — never
hand-edit the committed `.pptx`.

> The raw 51 MB export stays **out of git** by design (provenance in
> [`docs/migration/LOG.md`](../../../docs/migration/LOG.md), Phase 4S decision A). You need it on
> hand to run this skill.

## Step 1 — Get the raw master

Obtain the latest `2026 EE branded master slides.pptx` (PPTX export of the canonical Google Slides
master). The script defaults to `~/Downloads/2026 EE branded master slides.pptx`; pass another path
as the argument.

## Step 2 — Run the prep script

The bundled [`assets/slides/prep-master.py`](../../../assets/slides/prep-master.py) operates directly
on the OOXML package (zip + targeted XML edits), **not** via python-pptx — python-pptx doesn't model
`embeddedFontLst` and a round-trip can silently drop the embedded fonts that are the whole point.
It is pure stdlib (no install needed).

```bash
python3 assets/slides/prep-master.py "/path/to/2026 EE branded master slides.pptx"
```

It performs, then self-checks:

1. **Slim** — drop the example slides + their notesSlides, then prune orphan media (anything no
   retained master/layout/theme part still references).
2. **Fonts** — theme font Arial → **Lexend**; strip off-brand **Montserrat**; embed **Lora** +
   **JetBrains Mono** (from the committed OFL TTFs in `assets/slides/fonts/`); sweep stray
   Arial/Montserrat run typefaces in retained layouts/master → Lexend.
3. **Check** — assert a valid package with the expected font state and no dangling font/media rels;
   it **refuses to write a broken file**.

Expected output (reference run): `51.5 MB → 18.9 MB`, `slides 79 → 0`, `layouts kept: 65`,
`embedded: JetBrains Mono, Lexend (+Light/Medium/SemiBold), Lora`, `self-check: OK`.

## Step 3 — Verify against the manifest, then commit

- Confirm the self-check passed and the counts match
  [`assets/slides/assets.manifest.json`](../../../assets/slides/assets.manifest.json):
  `layoutCount: 65`, `themeFont: Lexend`, `embeddedFonts` includes Lexend/Lora/JetBrains Mono.
- If layout indices changed, re-run [curate-slide-layouts](../curate-slide-layouts/SKILL.md) and update the
  manifest's verified `layouts` (title/section/content/blank) — `create-presentation` depends on them.
- Sanity-check the size against the verifier's guard: the master must stay **≤ 30 MB**
  (`verify-plugins.mjs` asset-pack check). If it grew, prune layouts (curate-slide-layouts) before committing.
- Rebuild the studio payload and verify:
  ```bash
  npm run build:plugins && npm run verify:plugins   # asset master present (…MB), manifest resolves
  ```

## Step 4 — Update fonts (only if the brand font set changes)

The non-embedded brand fonts (Lora, JetBrains Mono) are committed as **static OFL TTFs** in
`assets/slides/fonts/` (instanced from the variable fonts). If a new weight/style is needed, add the
TTF there and extend `NEW_FONTS` in `prep-master.py`. Keep the `OFL-*.txt` licences alongside.

## Related

- Part of the [contribution model](../../../contribute/overview.md) — this is the **Medium · slide-asset** path ([proposing a slide asset](../../../contribute/proposing-a-slide-asset.md)).
- Layout map: [curate-slide-layouts](../curate-slide-layouts/SKILL.md) · brand assets: [add-brand-asset](../add-brand-asset/SKILL.md)
- Consumers: [create-presentation](../../../skills/create-presentation/SKILL.md), [review-presentation](../../../skills/review-presentation/SKILL.md)
- Script: [`assets/slides/prep-master.py`](../../../assets/slides/prep-master.py) · manifest: [`assets/slides/assets.manifest.json`](../../../assets/slides/assets.manifest.json)
