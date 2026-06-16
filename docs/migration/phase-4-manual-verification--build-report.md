# Manual Execution Report — Phase 4

**Plugin:** kuat-build
**Run date:** 2026-06-16
**Status:** ⚠️ complete with caveats 

## 1. What was done

- Test directory created at ~/Claude/Projects/kuat-test
- Simple prompt given to "Build a sign-in form using the Kuat button."
- The ouput was a simple web page for a sign in.

## 2. Kuat review (from Skill)

EE Web App UI Review — Kuat Sign-in Form


|                      |                                                                                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Scope**            | `src/SignInForm.tsx`, `src/app.css`, `src/main.tsx`, `index.html` (sign-in screen, happy path + inline validation + success state)                                                                |
| **Review depth**     | `full` (brand + accessibility + product-UX + pattern rules)                                                                                                                                       |
| **Context received** | None — proceeded without product context. **All product/UX findings are provisional** (see UX notes, Open questions).                                                                             |
| **Reference ref**    | `kuat-agent-rules@a115ac0` · `@equal-experts/kuat-react@0.13.1` · reviewed 2026-06-16                                                                                                             |
| **Overall status**   | **Changes required.** Strong foundation (tokens, semantic HTML, validate-on-submit, submit never disabled) but **one Critical accessibility gap** in error handling, plus two Major pattern gaps. |


**High-risk gaps:** Validation errors are neither programmatically linked to their fields nor announced to assistive tech — on an auth gate every user must clear. Missing password show/hide toggle and post-submit focus management.

### Checklist


| Rule / Group                                | Status      | Notes                                                                                                           |
| ------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| Colours — semantic tokens, no arbitrary hex | **Partial** | Tokens used throughout; one literal `rgb(0 0 0 / 6%)` box-shadow                                                |
| Typography — scale + roles                  | **Partial** | Scale tokens used; H1 weight 600 vs auth pattern's bold (700)                                                   |
| Spacing — 4px grid                          | **Pass**    | All values are `--spacing` multiples (4/16/24/32px)                                                             |
| Border radius — 0 / 4 / 6px only            | **Fail**    | Card radius ≈ 9.6px (`--radius × 2`)                                                                            |
| Logo usage                                  | **Partial** | Correct EE-Blue colour & accessible name, but mark-only (no wordmark)                                           |
| Heading hierarchy / single H1               | **Pass**    | One `<h1>` "Sign in"                                                                                            |
| Semantic HTML / landmarks                   | **Pass**    | Real `<form>`, `<main>`, labels via `htmlFor`                                                                   |
| Form labels associated                      | **Pass**    | All inputs have associated `<FieldLabel htmlFor>`                                                               |
| Error linking (`aria-describedby`)          | **Fail**    | Not wired; Field primitives don't auto-wire it                                                                  |
| Error announcement (`role`/live region)     | **Fail**    | `FieldError` renders a plain div; no `role="alert"`                                                             |
| Validate on submit / never disable submit   | **Pass**    | `noValidate` + validate in `handleSubmit`; submit always enabled                                                |
| Focus first invalid field / error summary   | **Fail**    | No focus move, no summary                                                                                       |
| Auto-focus first field                      | **Fail**    | Email not auto-focused on load                                                                                  |
| Password show/hide toggle                   | **Fail**    | Plain `type="password"`, no toggle                                                                              |
| Required-field indication                   | **Fail**    | Required fields not marked (asterisk / `aria-required`)                                                         |
| Dark navigation pattern                     | **N/A**     | Auth pattern intentionally uses logo-only minimal header                                                        |
| Components per decision tree                | **Pass**    | Kuat primitives used appropriately; Input/Checkbox/Field have no published component guide (see Open questions) |
| No inline styles for themeable props        | **Pass**    | All styling via classes + tokens                                                                                |


### Violations

#### Critical

**C1 — Validation errors are not perceivable by assistive technology**

- **Rule:** `web-product/accessibility.md` §Forms ("Link error messages with `aria-describedby`", "`aria-invalid`"); §ARIA→Error States; `patterns/authentication.md` §Accessibility ("Error linking: `aria-describedby`"; "Error announcement: screen reader announces errors on submit").
- **Evidence:** `SignInForm.tsx:74,77,89,92` — `aria-invalid` is set, but `<FieldError>` has no `id` and the `<Input>` has no `aria-describedby` pointing to it. The kuat `FieldError` is a presentational `<div>` (verified in `field-CpIBifwy.js`) — it sets **no** `role="alert"`/`aria-live` and the primitives do **not** auto-wire `aria-describedby`. There is also no error summary.
- **Impact:** Screen-reader users get `invalid` state with no associated message, and nothing is announced when errors appear on submit. This is the login gate — it blocks task completion for AT users.
- **Fix:** Give each `FieldError` a stable `id`; set `aria-describedby={errors.email ? 'email-error' : undefined}` on the matching `Input`. Add `role="alert"` (or an `aria-live="assertive"` summary region) so errors announce on submit. Per the pattern, also render an error summary at the top and move focus to it / the first invalid field.

#### Major

**M1 — No password show/hide toggle**

- **Rule:** `patterns/authentication.md` §Content ("Password field with show/hide toggle"); §Common Mistakes ("No password visibility toggle → Always include toggle"); §Best Practices ("Show password option").
- **Evidence:** `SignInForm.tsx:82–91` — plain `type="password"` Input, no reveal control.
- **Fix:** Add a keyboard-accessible show/hide toggle that switches `type` between `password`/`text` with clear state (`aria-pressed`).

**M2 — No focus management or error summary on failed submit**

- **Rule:** `web-product/accessibility.md` §Forms→Validation Pattern ("Error summary at top"; "Focus first invalid field"); `patterns/authentication.md` §Form Validation.
- **Evidence:** `SignInForm.tsx:39–46` — errors are set in state and rendered inline only; focus stays on the submit button, no summary.
- **Fix:** After a failed submit, render a summary with links to invalid fields and move focus to the first invalid field (or the summary).

#### Minor

**m1 — Card border-radius exceeds the allowed set**

- **Rule:** `design-language/borders.md` §Border Radius ("Only 0px, 4px, or 6px"); `patterns/authentication.md` (Card radius = 6px).
- **Evidence:** `app.css:30` `border-radius: calc(var(--radius) * 2)` → `0.3rem × 2 ≈ 9.6px`. Fix: use `var(--radius)` (≈4.8px) or a token resolving to ≤6px; a static card is 0px or, per the auth spec, 6px.

**m2 — Logo is brand-mark only (no wordmark)**

- **Rule:** `brand/logo.md` §Composition ("always used together unless space constraints require the brand mark only"); §Brand Mark Only (limited cases); `patterns/authentication.md` §Content ("Logo").
- **Evidence:** `SignInForm.tsx:51` uses `EELogoIcon` — the bracket mark only (verified: `viewBox 0 0 143 133`, `aria-label="Equal Experts"`, renders in `--primary`). An auth card is not space-constrained. The package ships `KuatLogoLockup` (service logo + name) which fits this use. Colour and accessible name are correct; this is a composition/brand-consistency nit. Fix: use the full lockup or `KuatLogoLockup`.

**m3 — Email field not auto-focused on load**

- **Rule:** `patterns/authentication.md` §Accessibility ("Auto-focus email/username on page load"). Fix: `autoFocus` on the email Input.

**m4 — Required fields not indicated**

- **Rule:** `web-product/accessibility.md` §Forms→Required Fields; `patterns/forms.md` §Accessibility. Both fields are required by `validate()` but lack asterisk / `aria-required`. Fix: mark required fields and add `aria-required` (or note the convention if all fields are required).

**m5 — H1 weight below pattern spec**

- **Rule:** `patterns/authentication.md` §Typography (Page heading `font-bold`). `app.css:48` uses `font-weight: 600`. `typography.md` permits 600 or 700 for headings, so low-impact; align to bold if matching the auth spec strictly.

**m6 — Hardcoded box-shadow colour**

- **Rule:** `colours.md` ("no arbitrary"); product checklist ("design tokens used"). `app.css:32` uses literal `rgb(0 0 0 / 6%)`. Acceptable if Kuat exposes no shadow/elevation token — flag and confirm; otherwise use the token.

**m7 — Focus not moved to success confirmation**

- **Rule:** `web-product/accessibility.md` §Focus Management. On success (`SignInForm.tsx:58–61`) the form unmounts and focus is lost. The `role="status"` will announce, but moving focus to the confirmation improves the flow. Fix: focus the success region on mount.

### Recommendations (non-blocking)

- **Verify subtitle contrast.** `--muted-foreground` (light mode = `--slate-500`) on `--card` at 14px must meet 4.5:1 (`colours.md` §Accessibility). It's near the threshold — confirm with a contrast check rather than assuming.
- **Keep user input on error** — already satisfied (state-driven), good; preserve this when adding the summary/focus logic (`authentication.md` "Don't clear form on error").

### Product / UX notes — Provisional (no context supplied)

Depth was `full` but no user story / research / scope was provided, so these are flagged provisional, not assessed against evidence:

- **"Forgot password?" placement.** Currently centered in the footer below the button (`SignInForm.tsx:109–113`). The auth pattern places it below the password field, right-aligned (`authentication.md` §Content / §Implementation). Provisional — confirm against intended layout.
- **No "Sign up" secondary action.** The pattern lists "Don't have an account? Sign up" as a required element; its absence may be intentional (e.g. invite-only / SSO). Cannot judge without context.
- **Subtitle copy** "Welcome back. Please enter your details." is slightly more conversational than the product-content guidance ("Get to the point", remove filler like "Please…"). Provisional — depends on product voice decisions.

### Open questions

1. **Product context** needed to finalize UX notes: user story / job-to-be-done, scope (is registration/SSO in play?), and whether the centered forgot-password layout is intended.
2. **Component guides unavailable.** `Input`, `Checkbox`, and `Field` (used here) are **not** in `components.manifest.json` (only `shadcn:button`, `kuat:button-group`, `kuat:kuat-header` are registered). Per the skill, these were reviewed against documented patterns; flagging that their dedicated component guides were unresolvable.
3. **States not in scope/observed:** loading/submitting state, server-side error (invalid credentials / rate-limit alert above form), and network-failure handling are not implemented in the artifact. The auth pattern expects an alert-above-form for invalid credentials — confirm whether that's handled elsewhere.

### References

Rules applied (all under `kuat-agent-rules@a115ac0`):

- `skills/_shared/review-common.md`
- `reference/design-language/colours.md`, `typography.md`, `spacing.md`, `borders.md`
- `reference/brand/logo.md`
- `reference/media-types/web-product/design.md`, `accessibility.md`, `component-decision-tree.md`, `component-registry.md`
- `reference/media-types/web-product/patterns/authentication.md`, `patterns/forms.md`
- `reference/media-types/web-product/content/forms.md`, `errors.md`, `product-content.md`
- Component guide: `@equal-experts/kuat-react@0.13.1` `agent-docs/components/button.md`

**Reference ref:** `kuat-agent-rules a115ac0` · **Package:** `@equal-experts/kuat-react 0.13.1` · **Reviewed:** 2026-06-16

## 3. Observations

- The skill review states that fields do not have focus. Manual test shows they do have focus
- The logo selection was not correct. The full EE logo should have been selected
- Minor - It would be good to have reduced padding and margin on the smallest breakpoints to reduce content squash 

