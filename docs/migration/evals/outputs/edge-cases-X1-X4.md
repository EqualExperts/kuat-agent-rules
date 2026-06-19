# Output — cross-skill edge cases (X1–X4)

**Reference ref:** local working copy on `feature/phase-h-optimise-and-test` · **Date:** 2026-06-19
Behavioural runs — pass/fail is on the skill's intake / conflict / fallback behaviour, not a produced artifact.

---

## X1 — Ambiguous intake → ask, don't guess (create-web-app)

**Request:** "Make us a page for the new tool."

**Behaviour:** create-web-app Step 1 runs the **grouped intake once** and stops before building. Single grouped ask:
- What page/scenario — form, dashboard, docs, auth, table, settings?
- Framework + deliverable — React / Vue / HTML; code, Figma, or a spec?
- State scope — happy path only, or also empty / loading / error?
- Is `@equal-experts/kuat-*` (or an overlay) installed? (drives component resolution)

No scenario, framework, or scope was assumed; nothing was generated.
**Result: ✅ PASS** — asks once, doesn't guess (`_shared/intake.md` + Step 1).

---

## X2 — Conflict: request vs rule → flag + recommend compliant

**Request (web):** "Use `#FF0000` for the primary button — campaign colour."
**Behaviour (create-web-app `## Conflict & ambiguity`):** flags that arbitrary hex violates the semantic-token rule; recommends a token (`bg-primary`, or a sanctioned campaign token if one is added to the SoT); notes foundation (colour/token) rule wins; proceeds only with the conflict surfaced (records a flagged deviation if the user insists). **Did not** silently emit `#FF0000`.

**Request (slides):** "Put the EE logo top-left on every single slide."
**Behaviour (create-presentation `## Conflict & ambiguity`):** flags that the logo belongs on title + closing; the **page-number badge** is the persistent per-slide cue; recommends the compliant pattern; foundation/brand rule wins.

**Result: ✅ PASS (both)** — conflict raised + compliant option offered; rule not broken silently.

---

## X3 — Missing component / asset → graceful fallback + flag (create-web-app)

**Request:** "Build a multi-step wizard using the Kuat `Stepper`." (no package installed; `kuat:stepper` guide unresolvable)

**Behaviour:** Step 3 attempts registry resolution → unresolvable → falls back to a **documented accessible step pattern** (semantic markup, `aria-current="step"`, semantic tokens) and emits an explicit flag: *"`kuat:stepper` guide unavailable — built against the documented pattern; verify against the package once installed."* No component API was invented; no claim that a Kuat component was used.
**Result: ✅ PASS** — graceful documented fallback **and** explicit flagged gap (generalises the live A1 behaviour).

---

## X4 — Varied input sources → intake adapts, gaps flagged (review-*)

| Source | Behaviour | Gaps flagged |
|--------|-----------|--------------|
| a) Figma link | visual rows supported from frames | — |
| b) requirements-MCP ticket | supplies product context for `product_ux`/`full`; **no render** | visual rows → "needs a render/export" |
| c) prose brief | neither render nor verified research | UX findings marked **provisional** under Open questions |
| d) greenfield (no artifact) | nothing to audit | says so; redirects to **create-web-app** rather than inventing an artifact |

Across all four the skill never asserts compliance on rows the source can't evidence, and never invents user stories/research — missing inputs become **flagged gaps / Open questions** (review-web-app Step 1/3, review-presentation Step 1/5).
**Result: ✅ PASS.**

---

## Summary

| Edge case | Behaviour gate | Result |
|-----------|----------------|--------|
| X1 ambiguous intake | ask once, don't guess | ✅ |
| X2 conflict vs rule | flag + recommend compliant, foundation wins | ✅ |
| X3 missing component/asset | graceful fallback + flag, no fabrication | ✅ |
| X4 varied input sources | intake adapts, gaps flagged, nothing invented | ✅ |

**No known-broken intake / conflict / fallback behaviour surfaced** — the (b) promotion bar is met. The one consistency gap found while authoring these (review-web-app had no explicit `## Conflict & ambiguity` section) was fixed this phase.
