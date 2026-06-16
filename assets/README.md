# Studio asset pack

The genuine brand source-of-truth for **kuat-studio** — the slides equivalent of web's
component library (kuat-mono). The Phase-4 pilot failed because studio had no such pack: the
skills could only *approximate* the brand and reviews could only check *plausibility*, so a
hand-drawn `[E]` logo passed review. This pack fixes that root cause.

**Principle:** skills **build from** and **compare against** these assets. They never improvise,
redraw, or recreate a brand mark. If an asset can't be resolved, the skill **stops and flags** —
it does not fabricate one.

## Contents

```
assets/
└── slides/
    ├── ee-master-2026.pptx        # the slimmed, brand-correct master template (built by prep-master.py)
    ├── assets.manifest.json       # logical IDs → master / layouts / logo / fonts / bracket
    ├── logo/                      # canonical EE logo assets (extracted from the master)
    │   ├── ee-logo-wordmark-white.png
    │   └── ee-brand-mark-white.png
    ├── fonts/                     # OFL brand fonts embedded into the master (Lora + JetBrains Mono)
    │   ├── Lora-*.ttf  JetBrainsMono-*.ttf
    │   └── OFL-Lora.txt  OFL-JetBrainsMono.txt
    └── prep-master.py             # regenerates ee-master-2026.pptx from the raw export
```

## Regenerating the master

The raw "2026 EE branded master slides" export (~51 MB) is **not committed** — it stays external
(provenance in `docs/migration/LOG.md`, Phase 4S decision A). To rebuild the slimmed master:

```bash
python3 assets/slides/prep-master.py "~/Downloads/2026 EE branded master slides.pptx"
```

`prep-master.py` slims the deck (drops the 79 example slides + orphan media, 51.5 → 18.9 MB),
fixes the theme font (Arial → Lexend), strips off-brand Montserrat, and embeds the full brand
font set (Lexend already present; Lora + JetBrains Mono added from `fonts/`). It self-checks the
output and refuses to write a broken package. Stdlib only — no python-pptx round-trip (which would
drop the embedded fonts).

## Bundling

`skills/scripts/build-plugin.mjs` copies `assets/` into the **kuat-studio** payload only.
`kuat-build` ships no asset pack. `skills/scripts/verify-plugins.mjs` checks the master + manifest
resolve in the payload.

## Fonts

Lora and JetBrains Mono are redistributed under the SIL Open Font License 1.1 (see the `OFL-*.txt`
files). Lexend is embedded in the upstream master.
