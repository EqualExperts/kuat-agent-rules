# Phase-2 eval results

Reference ref: local working copy on `migration/phase-2-activity-skills`. Scoring per [README.md](./README.md). Decision D: representative live + fixtures — one live brief per skill (plus the mandated create-web-app run), remaining briefs are the regression net.

| Skill | Brief | Run | Verdict | Output |
|-------|-------|-----|---------|--------|
| create-web-app | A1 — sign-in (no Kuat pkg) | live | ✅ PASS | [outputs/create-web-app-A1.md](./outputs/create-web-app-A1.md) |
| create-web-app | A2 — dashboard sidebar | fixture | regression net | — |
| create-web-app | A3 — docs empty/loading | fixture | regression net | — |
| review-web-app | B1 — flawed sign-in, brand_compliance | live | ✅ PASS | [outputs/review-web-app-B1.md](./outputs/review-web-app-B1.md) |
| review-web-app | B2 — full-depth dashboard | fixture | regression net | — |
| create-imagery | C1 — icon set | live | ✅ PASS | [outputs/create-imagery-C1.md](./outputs/create-imagery-C1.md) |
| create-imagery | C2 — infographic (refs required) | fixture | regression net | — |
| create-imagery | C3 — photography selection | fixture | regression net | — |
| create-presentation | D1 — knowledge-sharing talk | live | ✅ PASS | [outputs/create-presentation-D1.md](./outputs/create-presentation-D1.md) |
| create-presentation | D2 — sales case-study cover | fixture | regression net | — |
| review-presentation | E1 — flawed sales deck | live | ✅ PASS | [outputs/review-presentation-E1.md](./outputs/review-presentation-E1.md) |
| review-presentation | E2 — read-ahead density | fixture | regression net | — |

**Live total: 5/5 PASS.**

## Notes

- **create-web-app A1:** PASS. Graceful fallback exercised (`shadcn:button` guide unresolvable → documented pattern + flagged gap). Auth-specific validate-on-submit rule correctly took precedence over the more permissive `content/forms.md` guidance.
- **review-web-app B1:** PASS. All planted brand/a11y defects caught and cited; UX-fit correctly held **out of scope** at `brand_compliance` (no invented user story).
- **create-imagery C1:** PASS. 3 icons consistent at 24×24 / 2px stroke; single-colour via `currentColor`; accessible labels. (C2 fixture asserts the "missing references → ask and stop" behaviour.)
- **create-presentation D1:** PASS. Knowledge-sharing/live conventions met; titles carry arguments; badge/logo placement correct.
- **review-presentation E1:** PASS. All seven planted deck defects detected and cited to `reference/media-types/slides/...`.

---

## Phase 4S — studio asset pack + authenticity (run 2026-06-16)

Reference ref: branch `feat/phase-4s-studio-asset-pack`. New briefs exercise the build-from-master path and the authenticity gate (the false-pass regression).

| Skill | Brief | Run | Verdict | Evidence |
|-------|-------|-----|---------|----------|
| create-presentation | D3 — build-from-master deck | live | ✅ PASS | `build_from_master.py` built a 4-slide `.pptx` from `ee-master-2026.pptx`; embedded fonts = Lexend/Lora/JetBrains preserved; genuine logo (`image1.png`) inherited via layouts; left bracket inherited. |
| review-presentation | E4 — recreated-logo deck must FAIL | live | ✅ PASS | Re-ran reworked review against the original Phase-4 failing deck (`Kuat/kuat-studio-test/ai-in-design.*`). Now **FAILS** authenticity where Phase-4 passed it. |
| review-presentation | E3 — rendered visual pass | fixture | regression net | Needs an interactive render + vision pass (a pilot step; same bucket as Phase-4 decision D). Token reference corrected `#0066CC`→`#1795d4`. |

**Live total this phase: 2/2 PASS.**

### D3 — build-from-master (PASS, structural)
The bespoke-HTML path is retired. The skill resolves the asset pack and builds a real `.pptx` by cloning the master's layouts. Verified by the build script's post-save guard: `embedded=['JetBrains Mono','Lexend','Lexend Light','Lexend Medium','Lexend SemiBold','Lora']`, 212 inherited media, `image1.png` (the genuine wordmark) present. Lexend/Lora/JetBrains survive the python-pptx round-trip (verified). Human visual spot-check of the rendered deck remains a pilot step (no headless renderer in-repo).

### E4 — recreated-logo regression (PASS — the proof)
Source: the actual Phase-4 false-pass deck. Findings under the reworked skill:
- **✪ Logo authenticity → FAIL.** The deck's "logo" is a fabricated **text `[E]` + "Equal Experts"** — the HTML has **zero `<img>` assets** (`grep -c '<img>'` = 0; `class="logo"` holds the literal `[E]`). It is a **recreation**, not the canonical `logo/ee-logo-wordmark-white.png`. Per Step 3 this is a blocking brand FAIL regardless of placement.
- **✪ Template authenticity → FAIL.** Bespoke HTML, not built on `ee-master-2026.pptx`; the badge/bracket are redrawn, not inherited.
- **Colour:** the title-bar blue is hard-coded `#0066CC` in the deck CSS — a **near-miss** vs the genuine EE Blue `#1795d4` in `colours.md` (the same wrong value the Phase-4 review pixel-sampled and *passed*).
- **Contrast with Phase 4:** `kuat-studio-test/ai-in-design-review.md` recorded "Logo — title + closing only … **Pass**" and "badge `#0066CC` exact … **Pass**". The reworked skill inverts both to FAIL. **The false pass is fixed.**
