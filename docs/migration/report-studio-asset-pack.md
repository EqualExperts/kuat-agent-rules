# Execution Report — Phase 4S (kuat-studio asset pack + skill rework)

**Repo:** kuat-agent-rules
**Branch / PR:** `feat/phase-4s-studio-asset-pack` (no PR yet — ready to open)
**Run date:** 2026-06-16
**Status:** ✅ complete (asset pack built, skills reworked, false-pass regression proven fixed) — release gated on a human visual spot-check + the interactive install smoke test (pilot steps)

## 1. What was done

Studio had no genuine asset source-of-truth, so create could only *approximate* and review could only check *plausibility* — a hand-drawn `[E]` passed Phase-4 review. 4S builds studio's missing "component library":

- **Slimmed, brand-correct master** → `assets/slides/ee-master-2026.pptx`. From the genuine 51.5 MB export: stripped the 79 example slides + 125 orphan media (→ **18.9 MB**, 65 layouts kept), fixed theme font **Arial → Lexend**, removed off-brand **Montserrat**, and embedded the full brand set — **Lexend** (already present) **+ Lora + JetBrains Mono** (sourced OFL, instanced, embedded). Reproducible via `assets/slides/prep-master.py` (OOXML zip surgery — stdlib only, preserves embedded fonts; raw export stays external).
- **Asset pack + manifest.** `assets/slides/assets.manifest.json` maps logical IDs → master, **verified layout indices** (title=0, section=4, content=39, blank=40), the **canonical logo** files, the left-bracket description, fonts, and the no-photography policy. Genuine logo extracted from the master to `assets/slides/logo/` (`ee-logo-wordmark-white.png`, `ee-brand-mark-white.png`). `assets/README.md` documents the pack.
- **`create-presentation` rework** — retired the bespoke-HTML path; now **builds from the master** via the productionised `scripts/build_from_master.py` (clone → add slides from real layouts → fill placeholders in Lexend; genuine logo **inherited**, never recreated; **stop-and-flag** on a missing asset; imagery = marked placeholders that block release). Bracket description corrected to the **left-side "[" bracket**.
- **`review-presentation` rework** — new **Step 3 authenticity gate** (auto-fail): a recreated logo or a non-master lookalike is a brand **FAIL** regardless of colour/placement; **"authenticity unverified," not pass** when no ground truth; encodes **visual plausibility ≠ brand compliance**. Visual/pixel-sample pass retained (reads `colours.md`); `✪` authenticity rows added.
- **`create-imagery` rework** — same "insert the genuine logo asset, never recreate; stop-and-flag" rule + asset-pack pointer.
- **Reference + stale-value reconcile** — bracket corrected in `slides/layouts.md` + `styling.md`; surviving `#0066CC` fixed in `AGENTS.md` Quick Reference and the `review-presentation` E3 eval (→ `#1795d4`).
- **Packaging + verifier** — `build-plugin.mjs` bundles `assets/` into **kuat-studio only** (made `copySkill` recursive + binary-safe for the new `scripts/`); `verify-plugins.mjs` checks the master + manifest resolve in the payload.
- **Evals** — added the build-from-master brief (D3) and the **negative recreated-logo brief (E4)**; re-ran the **original Phase-4 failing deck**.

## 2. Acceptance criteria

| Criterion (from plan) | Met? | Evidence |
|------------------------|------|----------|
| `create-presentation` builds a master-template deck inheriting genuine EE blue/theme, real layouts + left bracket, the **genuine logo**, and Lexend | ✅ | `build_from_master.py` → 4-slide `.pptx`; `embedded=[JetBrains Mono, Lexend(×4), Lora]`, 212 inherited media, genuine `image1.png` present. Structural; human visual spot-check = pilot step. |
| Negative eval: review **FAILS** a recreated-`[E]` / non-master deck | ✅ | E4: reworked review fails the real Phase-4 deck on **✪ Logo authenticity** (fabricated `[E]`, 0 `<img>`) + **✪ Template authenticity** (bespoke HTML). |
| Original Phase-4 failing deck re-run → **no longer a false pass** | ✅ | `ai-in-design-review.md` passed it (logo "Pass", badge `#0066CC` "exact"); reworked skill inverts both to FAIL. |
| `kuat-studio` payload bundles slimmed master + manifest; `verify-plugins.mjs` green | ✅ | `ALL CHECKS PASSED`; "asset master present (18.9MB)", "asset manifest resolves (3 refs)". kuat-build has no assets. |
| Local install works (`${CLAUDE_PLUGIN_ROOT}` resolution) | ✅ (automatable proxy) | Bundled script + `CLAUDE_PLUGIN_ROOT=plugins/kuat-studio` resolved the bundled master and built a deck with all fonts + logo. Interactive `claude --plugin-dir` auto-trigger = pilot step. |
| Eval set updated + green incl. the negative test | ✅ | `evals/RESULTS.md` Phase-4S: D3 + E4 live PASS (2/2). |
| Template slimmed + theme-font-fixed + fonts embedded | ✅ | 51.5 → 18.9 MB; theme = Lexend; embedded = Lexend + Lora + JetBrains Mono, no Montserrat (prep-master self-check). |

## 3. Deviations from the plan

- **python-pptx preserves embedded fonts** (verified by round-trip) — so the planned font-restore post-process in the build step is a **defensive guard**, not a required step. The *slim* is still done via OOXML surgery (not python-pptx) to avoid risking the fonts.
- **Lora/JetBrains sourced as variable fonts**, instanced to static regular/bold/italic/boldItalic with `fonttools` (Google Fonts ships no statics for these). Committed to `assets/slides/fonts/` (OFL).
- **Build script referenced skill-relative**, not `${CLAUDE_PLUGIN_ROOT}/skills/...`, to avoid a false "drift" failure in `verify-plugins.mjs` step 5 (it reverses that token to `../`).
- **`build-plugin.mjs` copySkill rewritten** to recurse + copy binaries (it would otherwise have crashed on the new `scripts/` subdir).
- **No photography variant of the logo / dark-logo extracted** — only the white wordmark + mark surface in the deck-facing layouts, which is all the build/review path needs.

## 4. Decisions made (with rationale)

Mirror `docs/migration/LOG.md` (Phase 4S). Headlines:
- **A** Master found in `~/Downloads`; commit the **slimmed** master only, raw export stays external.
- **B** Font policy = **embed the full brand set** (theme→Lexend, keep Lexend, drop Montserrat, add Lora + JetBrains Mono).
- **C** Slim/font via **OOXML zip surgery** (python-pptx would risk the embedded fonts); python-pptx used only for the deck build (fonts verified preserved).
- **D** **create-imagery reworked now** (same recreation risk).
- **E** Asset pack at repo-root `assets/`, bundled into **kuat-studio only**.
- **F** Branch `feat/phase-4s-studio-asset-pack`; report `report-studio-asset-pack.md`.

## 5. Open decisions for Ed

1. **Payload size.** kuat-studio is now **~20 MB** (master + 212 media) and the committed payload duplicates the source `assets/` (~40 MB added to git total). *Recommendation:* accept for the pilot; schedule **layout-map curation** (deferred this phase) to drop unused layouts/media and shrink the master. Alternative: build payloads on release instead of committing them (a Phase-3 architecture change, out of 4S scope).
2. **Human visual spot-check.** A rendered build-from-master deck needs the Phase-4 reviewer to confirm it's genuinely on-brand (no headless renderer in-repo). *Recommendation:* one spot-check before promoting kuat-studio to beta.
3. **Dark/colour logo variants + photography library.** Only the white logo surfaces today; no image library exists. *Recommendation:* leave as the next asset-pack addition (placeholders block release meanwhile).

## 6. Verification results

- `python3 assets/slides/prep-master.py` → `51.5 MB -> 18.9 MB; slides 79 -> 0 (layouts 65); media 125 orphan dropped -> 212 kept; -Montserrat(4) +Lora(4) +JetBrains Mono(4); self-check: OK`.
- python-pptx round-trip on the slimmed master → embedded fonts **preserved** (16 parts).
- `node skills/scripts/build-plugin.mjs` → `kuat-build 0.3MB`, `kuat-studio 20.2MB`.
- `node skills/scripts/verify-plugins.mjs` → **ALL CHECKS PASSED** (incl. asset master + manifest resolution; 47 `${CLAUDE_PLUGIN_ROOT}` links resolve; 3 skills identical to source modulo link rewrite).
- Install-path test: `CLAUDE_PLUGIN_ROOT=plugins/kuat-studio python3 …/build_from_master.py` → built a deck, fonts + logo inherited.
- Evals (`evals/RESULTS.md`): **D3 PASS** (build-from-master, structural), **E4 PASS** (recreated-logo deck now FAILS authenticity — the regression proof). **Live 2/2.**

## 7. Follow-ups / backlog

- **Layout-map curation** — verify per-layout bracket/structure across the 65 layouts; prune unused → shrink the master/payload. (Deferred per Ed; the build path is intentionally limited to the 4 verified layouts.)
- **EE photography / image library** — build it so imagery stops being a release blocker.
- **Dark/colour logo variants** in the pack (review compares only the white variant today).
- **kuat-studio version bump** to a beta pre-release before promotion (release mechanics; same bucket as Phase-4).
- **`review-web-app` visual generalisation** — still open from Phase 4 (unrelated to studio).

## 8. Inputs to the next phase

- **kuat-studio is ready for the pilot** pending the two human checks (visual spot-check + interactive install smoke test). The bundle now carries a genuine asset source-of-truth; the false-pass root cause (no ground truth) is closed.
- **Go / no-go for the kuat-studio pilot: GO**, conditional on the human visual spot-check of a build-from-master deck. The automatable bar (build-from-master, authenticity fail on the recreated deck, payload verify, install-path resolution) is green.
- Asset pack location + manifest contract (`assets/slides/`, logical IDs) is the input the rollout (Phase 5) and any future image-library work build on.
