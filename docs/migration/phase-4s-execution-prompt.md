# Phase 4S — Execution Prompt (kuat-studio remediation)

**Repo / Claude Code project:** `kuat-agent-rules`
**Branch:** `feat/phase-4s-studio-asset-pack`
**Detailed plan:** `docs/migration/phase-studio-asset-pack.md` (copy it in if not present) — read it first.

> **Intention.** Make the **kuat-studio** bundle genuinely on-brand and releasable. The Phase-4 pilot proved studio output was a convincing fake (fabricated `[E]` logo, lookalike template, wrong colour) that *passed* review, because studio had no genuine asset source-of-truth and the skills improvised. 4S gives studio its missing "component library": a **bundled brand asset pack + master template**, with `create-presentation` **building from the master** (inherit, don't improvise) and `review-presentation` **verifying authenticity** against ground truth. This **gates the kuat-studio release**; kuat-build is unaffected.

---

## Run conventions

- **Plan mode first** — read `docs/migration/phase-studio-asset-pack.md`, propose a task breakdown against the live repo, present for approval; no edits until approved.
- Branch `feat/phase-4s-studio-asset-pack`; keep a dated `docs/migration/LOG.md`; end with `docs/migration/report-studio-asset-pack.md` from the template, output it.
- **Base off the corrected reference** — ensure the colour-reconcile + token-SoT work (`reference/design-language/tokens/colors.tokens.json`, corrected `colours.md`, the skill `#0066CC` purge) is in your base; build on it, don't redo it.

## Prerequisites (in hand)

- **Genuine master**: "2026 EE branded master slides" (Google Slides canonical; PPTX export uploaded). PPTX is the build/bundle form.
- **Validated mechanism**: the prototype `build_from_master.py` (clone master → strip example slides → add slides from real layouts → fill placeholders, force Lexend). Use it as the starting point — it's proven to inherit genuine colour/layout/bracket/logo/Lexend.

## Deliverables

1. **Template prep → `assets/slides/ee-master-2026.pptx`.** From the genuine master: **slim** it (strip example slides + unused media; raw export ~52MB), fix **theme font Arial → Lexend**, and **embed** Lexend (+ Lora, JetBrains Mono) so decks render correctly anywhere.
2. **Asset pack + manifest.** `assets/slides/assets.manifest.json` — the curated layout map (title/section/content/blank verified; expand as curated) + key-asset notes (logo, left bracket, icon library inherited from the master). Upstream in agent-rules.
3. **`build-plugin.mjs` bundles `assets/` into kuat-studio only** (not kuat-build). Watch payload size; verifier extended to check the master + manifest resolve.
4. **Rewire `create-presentation`** — build a deck **from the master** (clone + layouts + fill), **retire the bespoke-HTML path**. Insert the genuine logo (inherited); **never recreate**; stop + flag if an asset is missing. Imagery: marked placeholders that block release (no image library yet).
5. **Rewire `review-presentation`** — authenticity auto-fails: logo is the genuine asset (not a recreation), deck built on the master (not an approximation); keep the visual pass; "authenticity unverified" when no ground truth. Read colour from `colours.md` (already de-inlined).
6. **`create-imagery`** — same "use, never recreate" + asset-pack consumption (or log as immediate follow-up).
7. *(Deferred to a future phase, per Ed)* full layout-map curation + richer per-layout handling. Note, don't build.

## Acceptance / verification

- `create-presentation` produces a **build-from-master** deck that inherits genuine EE blue (`#1795d4`/theme), real layouts + left bracket, the **genuine logo**, and Lexend — verified structurally (theme + run fonts) and by a human visual spot-check.
- **Negative eval (the proof the false pass is fixed):** feed `review-presentation` a deck with a recreated `[E]` logo / non-master layout → it **FAILS**. Re-run the original Phase-4 failing deck → **no longer a false pass**.
- `kuat-studio` payload bundles the slimmed master + manifest; `verify-plugins.mjs` green; local install test (`claude --plugin-dir plugins/kuat-studio`) works.
- Eval set updated + green (incl. the negative test).

## Report back

Fill `docs/migration/report-studio-asset-pack.md`: template-prep result (size before/after, font fix + embed), asset pack + manifest, the create/review reworks, eval results incl. the negative test + the re-run of the original failing deck, payload verify + install result, and a go/no-go for the kuat-studio pilot.
