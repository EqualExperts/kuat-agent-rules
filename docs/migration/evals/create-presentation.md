# Eval briefs — create-presentation

Rubric = the **Step 5 delivery checklist** in [skills/create-presentation/SKILL.md](../../../skills/create-presentation/SKILL.md).

---

## Brief D1 — Knowledge-sharing talk outline (5 slides, live)

> Outline a 5-slide internal knowledge-sharing talk on "Trunk-based development at scale". Internal audience, presented live.

**Targets:** scenario/audience/delivery-mode resolved (knowledge-sharing, internal/masterbrand-lite, live → sparse); title carries the argument per slide; B&W photography; page-number badge on body slides; logo on title + closing only; one idea per slide; 5–8 layouts guidance respected.

---

## Brief D2 — Sales case-study deck cover + structure (read-ahead)

> Draft the cover and section structure for a client-facing case-study deck, sent as a read-ahead.

**Targets:** masterbrand-strict; co-brand endorsement pattern (EE leads, client logo in body, not equal weight on cover); read-ahead density (self-contained slides); case study named/true/approved; closing contact block.

---

## Brief D3 — Build-from-master deck (authenticity + fonts) — Phase 4S

> Create a short (5–6 slide) knowledge-sharing deck on "AI in UX design". The output must be a real EE deck file.

**Targets:** Step 1 confirms the **asset pack resolves** (master + manifest + logo); Step 2 **builds a `.pptx` from `ee-master-2026.pptx`** via `scripts/build_from_master.py` using manifest layouts (`title`/`section`/`content`) — *not* bespoke HTML; the **genuine logo is inherited** from the master layouts and **never recreated**; **embedded Lexend survives** the build (the script's post-save guard reports Lexend/Lora/JetBrains present); the **left-side "[" bracket** is inherited; any imagery is an **explicitly-marked placeholder that blocks release** (no EE image library yet); if a required asset were missing the skill **stops and flags** rather than improvising. Verifiable structurally (theme font, embedded fonts, inherited logo media via the build guard) + a human visual spot-check.
