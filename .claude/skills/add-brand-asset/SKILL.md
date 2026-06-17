---
name: add-brand-asset
description: Add a brand asset (logo variant, photograph, or icon) to the studio asset pack and register it in assets.manifest.json. Use when extending assets/slides/ — e.g. a dark/colour logo lockup, the first EE photography, or a catalogued icon — so create-presentation can insert the genuine asset and review-presentation can compare against it. Contributor-only; repo-local. NOT for recreating/redrawing a logo (never do that) and NOT for building a deck.
---

# Add a brand asset

The studio asset pack is the **ground truth** the slide skills consume: `create-presentation`
**inserts** these genuine assets (never recreates them) and `review-presentation` **compares** decks
against them. A new asset only counts once it's a file in `assets/slides/` **and** a manifest entry —
an asset the manifest doesn't list is invisible to the skills.

> **The rule that doesn't bend:** you add **genuine** assets — official logo files, real EE
> photography, real icons. You **never** recreate, redraw, or re-letter a logo. If you only have a
> recreation, **stop** — a fabricated mark is exactly the Phase-4 false pass this pack exists to prevent.

## Step 1 — Place the file

- **Logo variant** → `assets/slides/logo/` (e.g. `ee-logo-wordmark-dark.png`). Use the official
  export; keep the existing naming (`ee-logo-<kind>-<variant>.png`).
- **Photography** → `assets/slides/photography/` (create it). Establishing the image library flips the
  pack's photography policy (see Step 3). EE photography is **B&W**.
- **Icon** → `assets/slides/icons/` (create it) if cataloguing beyond the ~80 inherited from the
  master media.

Record the source/provenance (where the official asset came from) for the LOG.

## Step 2 — Register it in the manifest

Add an entry to the matching section of
[`assets.manifest.json`](../../../assets/slides/assets.manifest.json), mirroring the existing shape:

```jsonc
// logo example — match the existing keyed-entry shape
"wordmark-dark": {
  "file": "logo/ee-logo-wordmark-dark.png",
  "from": "<official source>",
  "dimensions": "WxH",
  "use": "Primary EE lockup, dark variant — light slides."
}
```

- **IDs:** the key is the stable id the skills reference (`wordmark-white`, `brand-mark-white`, …);
  `file` is the path **relative to `assets/slides/`**.
- **`verify-plugins.mjs` checks** `master`, `layouts`, `logo` exist and that `master.file` + each
  `logo.*.file` resolve — so a logo entry with a missing file fails the build. Keep `file` correct.
- Use real `dimensions` and a `use` line that tells the skill *when* to reach for this variant.

## Step 3 — Photography flips a policy (when you add the first images)

The pack currently declares `photography.available: false`, and both slide skills treat any photo as a
**release-blocking placeholder**. When you add a genuine B&W image library:

- set `photography.available: true` and describe the library (location, B&W, licensing/usage);
- update [create-presentation](../../../skills/create-presentation/SKILL.md) and
  [review-presentation](../../../skills/review-presentation/SKILL.md) so placeholders are no longer the
  only allowed imagery. Do this deliberately — it changes what passes review.

## Step 4 — Verify

```bash
npm run build:plugins && npm run verify:plugins   # asset manifest resolves (N refs); master ≤ 30 MB
```

Confirm the new file is bundled into the kuat-studio payload and the manifest reference resolves.
Log the addition + provenance in [`docs/migration/LOG.md`](../../../docs/migration/LOG.md).

## Related

- Master prep: [prep-slides-master](../prep-slides-master/SKILL.md) · layout map: [curate-slide-layouts](../curate-slide-layouts/SKILL.md)
- Consumers: [create-presentation](../../../skills/create-presentation/SKILL.md), [review-presentation](../../../skills/review-presentation/SKILL.md)
- Manifest: [`assets/slides/assets.manifest.json`](../../../assets/slides/assets.manifest.json) · pack README: [`assets/README.md`](../../../assets/README.md)
