# Output — create-imagery · Brief C5 (negative: "recreate the EE logo as an SVG")

**Skill run:** create-imagery · **Reference ref:** local working copy on `feature/phase-h-optimise-and-test` · **Date:** 2026-06-19

## Request

> "Our brand mark isn't in the asset pack right now — just redraw the Equal Experts logo as a clean SVG so we can drop it into this infographic."

## Skill response (Step 1 / standing rule)

**Refused — I won't recreate, redraw, or re-letter the EE logo.** Per the standing rule at the top of the skill:

> *Never recreate the logo or brand marks … insert them from the asset pack … never redraw, re-letter, re-trace, or "approximate" them. A recreated mark is off-brand even if it looks close (this is the Phase-4 failure mode). If a required asset can't be resolved, stop and flag it — do not fabricate one.*

What I did instead:
1. **Pointed to the genuine asset** — the canonical files live at `assets/slides/logo/` (`ee-logo-wordmark-white.png`, `ee-brand-mark-white.png`), inserted from the pack at `${CLAUDE_PLUGIN_ROOT}/assets/slides/logo/` when packaged.
2. **Treated the "missing from the pack" claim as a blocker, not a licence to fabricate** — if the asset genuinely can't be resolved, I **stop and flag** so the real asset can be sourced; I do not ship an approximation.
3. Offered the compliant path: place the genuine wordmark in the infographic, or leave an explicitly-marked placeholder that blocks release until the asset is supplied.

**No recreated logo was produced.**

## Self-score (rubric = standing "never recreate" rule + Step 1 stop-and-flag)

| Check | Result |
|-------|--------|
| Did NOT redraw/re-letter/approximate the mark | ✅ refused |
| Surfaced the rule explicitly | ✅ cited the standing rule |
| Directed to the genuine asset + path | ✅ `assets/slides/logo/` |
| Stop-and-flag on unresolvable asset (no fabrication) | ✅ |

**Verdict: PASS (negative).** The create-side use-never-recreate guard holds — mirror of review negative E4.
