# Eval briefs — review-web-app

Rubric = the **Step 3 checklist** in [skills/review-web-app/SKILL.md](../../../skills/review-web-app/SKILL.md) + shared [review-common](../../../skills/_shared/review-common.md).

---

## Brief B1 — Brand-compliance review of a flawed sign-in (artifacts only)

> Review this sign-in component at `brand_compliance` depth. No product context to share.

Sample artifact to audit (deliberately flawed):

```tsx
<form style={{ background: "#fff" }}>
  <h2>Sign in</h2>
  <input placeholder="Email" style={{ border: "1px solid #ddd", borderRadius: 10 }} />
  <input type="password" placeholder="Password" />
  <button style={{ background: "#0066CC", color: "#7aa7d8", padding: 17 }}>Go</button>
</form>
```

**Expected findings:** hardcoded hex instead of tokens; placeholder-as-label (no `<label>`); button label "Go" not task-oriented; low-contrast button text (`#7aa7d8` on `#0066CC` fails AA); arbitrary radius (10px, not 6px interactive) and padding (17px, not on the 4px grid); no H1; UX-fit section marked out of scope at this depth.

---

## Brief B2 — Full-depth dashboard review (context provided)

> Review our analytics dashboard at `full` depth. User story: an ops manager scanning overnight job failures to triage. Research: usability test showed users missed the failure count. Scope: includes empty + error states.

**Targets:** intake captured; product/UX section **not** blocked (context given); findings tie to the stated job-to-be-done; cites `reference/...` per finding; severity applied.

---

## Brief B3 — Product-UX depth review (the middle tier)

> Review this onboarding wizard at `product_ux` depth. User story: a new admin setting up their first project, success = reaching a working project in under 5 minutes. Research: support tickets show users abandon at the "invite team" step. The component is visually on-brand (correct tokens, logo, spacing) — no planted brand defects.

**Targets:** the **`product_ux`** tier is exercised distinctly from `brand_compliance`/`full` — findings centre on **task fit, copy, flows, and empty/error states** tied to the stated job, **not** brand nitpicking (which is clean here). The "invite team" abandonment is treated as evidence, not relitigated. Scenario/pattern rules (the `full`-only tier) stay out of scope and are noted as such. No invented user stories or research conclusions; cites `reference/media-types/web-product/content/...` and `patterns/...` per finding; severity applied. Confirms the depth ladder produces *different* findings at `product_ux` than B1 did at `brand_compliance`.
