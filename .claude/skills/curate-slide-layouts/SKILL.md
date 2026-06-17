---
name: curate-slide-layouts
description: Label and prune the PRESENTATION / SLIDE-DECK master's slide layouts in assets/slides/assets.manifest.json. Slides-only. Use when the slide master ships more layouts than are catalogued (today 65 layouts, only 4 labelled) — enumerate them, label each by purpose, mark which create-presentation may use, and prune unused layouts to shrink the master. Contributor-only; repo-local. NOT for building a deck (that's create-presentation), and NOT for web/marketing/imagery.
---

# Curate the slide-deck master layout map

> **Slides only.** "Layouts" here = the slide layouts inside the kuat-studio presentation master
> (`assets/slides/ee-master-2026.pptx`). This is not about web page layouts.

The studio master ships **65 layouts**; only four are labelled in
[`assets.manifest.json`](../../../assets/slides/assets.manifest.json) (`title`, `section`, `content`,
`blank`). `create-presentation` can only pick from labelled layouts, so the rest are invisible — and
unused layouts bloat the master. This skill turns the raw layout set into a curated, labelled map.

> **Note on this environment:** there is no slide renderer here (4S confirmed no LibreOffice/soffice),
> so the **visual** judgement (what a layout *looks* like, whether it's redundant) is a contributor
> step done with a real PowerPoint/Slides client. The mechanical half — enumerate layouts + their
> placeholder structure — is scripted below.

## Step 1 — Enumerate the layouts (mechanical)

```bash
python3 skills/scripts/inspect-layouts.py            # human table: index, name, placeholders
python3 skills/scripts/inspect-layouts.py --json     # JSON seed for the manifest
```

Each row gives the **index** (the python-pptx `slide_layouts` index — the exact value the manifest
records), the layout name, and its placeholders (`idx:name(type)`). The placeholder **type**
(TITLE / BODY / SLIDE_NUMBER / PICTURE …) and the indices are what you need to wire a layout into the
manifest. (Needs python-pptx: `pip install python-pptx`.)

## Step 2 — Label each layout by purpose (visual)

Open the master in PowerPoint/Slides and, for each layout, record in the manifest's `layouts` map:

- a **key** (`title`, `section`, `content`, `two-column`, `quote`, `stat`, `image-full`, `closing`, …),
- the **index** + **name** from Step 1,
- the **placeholder indices** `create-presentation` fills (`title`, `subtitle`, `body`, …),
- a one-line **purpose** so the build skill picks the right one.

Keep the existing verified four (`title:0`, `section:4`, `content:39`, `blank:40`) unless prep changed
indices. Label the page-number badge behaviour where relevant (badge present on body layouts, absent
on title/section/full-bleed).

## Step 3 — Prune the unused (visual + mechanical)

- Decide which layouts are **genuinely used** by the EE deck patterns
  ([slides/patterns](../../../reference/media-types/slides/patterns/)). Redundant/never-used layouts
  are pruning candidates.
- Pruning shrinks the master toward the verifier's **≤ 30 MB** guard. If you remove layouts, re-run
  [prep-slides-master](../prep-slides-master/SKILL.md) (its orphan-media prune drops media only the removed layouts
  referenced) and re-enumerate to confirm indices.
- **Don't** prune a layout `create-presentation` references without updating the manifest + the skill.

## Step 4 — Update the manifest + verify

- Replace the `layouts._note` placeholder with the curated map; bump `assets.manifest.json` notes.
- Confirm every labelled index still resolves (re-run Step 1).
- Rebuild + verify:
  ```bash
  npm run build:plugins && npm run verify:plugins   # asset manifest resolves; master ≤ 30 MB
  ```

## Related

- Master prep: [prep-slides-master](../prep-slides-master/SKILL.md) · brand assets: [add-brand-asset](../add-brand-asset/SKILL.md)
- Consumer: [create-presentation](../../../skills/create-presentation/SKILL.md)
- Helper: `skills/scripts/inspect-layouts.py` · manifest: [`assets/slides/assets.manifest.json`](../../../assets/slides/assets.manifest.json)
