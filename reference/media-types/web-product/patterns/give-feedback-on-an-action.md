# Help users to know the outcome of their action

**User goal:** Know, immediately and unambiguously, whether an action worked — and what, if
anything, to do next.

> **Pattern:** *Help users to…* · single-medium (web-product) — concept and implementation together.
> Covers what happens immediately after a user takes an action: form submissions, saves, deletes,
> multi-step transactions, and system-triggered status changes.

## Context

A user has just done something — submitted a form, saved a setting, deleted a record, started a
process. Two failure modes sit on either side of this moment: under-communicating (the user isn't
sure the action landed, so they retry or abandon) and over-communicating (every action triggers a
banner or dialog, so real warnings get tuned out).

This pattern is scoped to feedback after an action completes or fails. It is not:

- Confirmation *before* a destructive action — see [content/confirmations.md](../content/confirmations.md).
- Validation *while* filling in a form — see [content/errors.md](../content/errors.md) and the
  form-validation section of [complete a form](./complete-a-form.md).
- Persistent status indicators (RAG dots on a progress tracker) — a separate, related gap; see
  the Badge row in [component-registry.md](../component-registry.md).

## Principles

| Principle | Implementation |
|-----------|----------------|
| Match feedback weight to the significance of the action | A completed, committed transaction needs a stopping point; a small in-place update doesn't |
| Write the message before choosing the component | Draft the copy first, then pick the component that matches its severity/weight — not the reverse |
| One message per priority tier, on screen, at a time | Avoids alert fatigue |
| Be specific, not generic | Real values (names, numbers, dates), not "an error occurred" |
| Don't blame the user | "Your changes couldn't be saved," not "You entered invalid data" |
| Always pair colour with icon + label | Never rely on red/green alone (CVD) |

Success shows up as: task completion confirmed without a support contact, low retry/duplicate-submit
rate, and low dismissal-without-reading rate on assertive messages.

## Solution in web-product

### Layout

Placement communicates priority. Cap how many messages can be visible per zone at once.

| Zone | Where | Used for | Cap |
|------|-------|----------|-----|
| Global | Full-width, above the app shell (see the [system banner region](../design.md#region-breakdown)) | System-wide status only (outage, deprecation, access changes) | 1 at a time, app-wide |
| Top of content area | Full-width, above the page's main heading or form (see the [Feedback row](../design.md#region-breakdown) in the main content composition table) | Page/section-level feedback tied to a submitted action: error summary, inline confirmation banner | 1 at a time, per content area |
| Inline | Directly beside/below the specific element it concerns | Field-level validation, helper text | No hard cap, but consolidate rather than crowd — summarise if more than one |
| Toast | Fixed position, top-right by default | Lightweight, transient task feedback that doesn't need a persistent record | Treat the component's visible-toast default as a ceiling, not a target; most screens should show one at a time |

Reserve warning/danger states for when they're genuinely necessary. A page that regularly shows
more than one top-of-content-area or global message at once signals an underlying issue to
consolidate, not a reason to stack messages.

A confirmation page (application/order/payment/account-creation submitted, with a reference number
or "what happens next") uses the narrow/centred [Single Column](../design.md#option-3-single-column)
layout — the same shape as auth/forms/wizards, not a distinct page type. It answers, in order: what
was completed, what happens next and when, contact/help info, and a way to keep a record (print,
PDF, email).

### Design

| Element | Token |
|---------|-------|
| Positive feedback | `bg-callout-positive`, `border-callout-positive-foreground` |
| Informational feedback | `bg-callout-info`, `border-callout-info-foreground` |
| Warning feedback | `bg-callout-warning`, `border-callout-warning-foreground` |
| Error/issue feedback | `bg-callout-issue`, `border-callout-issue-foreground` |
| Success text (inline, non-callout) | `text-success` |

Every state pairs its colour with an icon and a text label — never colour alone.

### Content

Use the existing anatomy in [content/errors.md](../content/errors.md) (what went wrong → why, if
it helps → how to fix) for failures, and [content/confirmations.md](../content/confirmations.md)
for pre-action dialogs. For the feedback copy this pattern adds:

- Lead with the outcome, not the mechanism: "Your changes were saved," not "Update successful."
- State the outcome before any secondary detail.
- Confirmation-page body copy answers, in order: what was completed, what happens next, and when.
- Keep toast copy to one short sentence; if it needs more than that, it's a callout or a page, not
  a toast.

### Accessibility

- Toasts: reserve an assertive announcement for errors that need immediate attention; default to a
  polite announcement for success/info so screen reader users aren't interrupted mid-task.
- Confirmation pages: the page `<title>` reflects completion (e.g. "Application complete").
- Error summaries: move keyboard focus to the summary on submission failure; each error links to
  its field via `aria-describedby` (see [complete a form](./complete-a-form.md)'s Form Validation
  Pattern). A validation-failure summary needs assertive announcement on submit, which a passive
  live region doesn't give — the composing component takes on this behaviour itself.
- Never rely on colour alone — every state pairs an icon with its colour and label.

### Implementation

Choose the mechanism in order:

1. Is this warning the user *before* an irreversible/destructive action? → Not this pattern; use
   the confirmation-dialog pattern in [content/confirmations.md](../content/confirmations.md).
2. Did the action complete (or fail) a distinct task the user came to this page/flow to do — an
   application, an order, an onboarding step, a payment, a submission with a reference number —
   such that the user would want a stopping point, a record, or a "you're done, here's what's next"
   moment? → Confirmation page.
3. Did it complete a meaningful sub-task while the user stays on a multi-purpose page — one card in
   a settings page, one step submitted mid-wizard — where a persistent record isn't needed, but a
   toast alone would be too easy to miss or dismiss before the user has registered it? → Inline
   confirmation banner, in the page/section, above or below the content it relates to.
4. Is this a small, low-stakes, in-place update — a single field, a toggle, a preference — where the
   user stays in flow and keeps working immediately? → Toast.
5. Did something fail? → Component depends on whether the failure is field-level, form-level, or
   system-level; see the table below.

| Scenario | Component | Why not the alternatives |
|----------|-----------|---------------------------|
| Application/order/payment/account-creation submitted; reference number or "what happens next" exists | Confirmation page | A toast can be dismissed or missed and leaves nothing to point back to |
| One settings card saved, user stays on a multi-section settings page | Inline confirmation banner in that card/section | A page navigation would be disproportionate; a toast risks being missed if the user has scrolled away |
| Single field/toggle/preference updated in place | Toast | Lightweight, non-blocking, matches the size of the change |
| Field-level validation error | Inline error message next to the field | See [content/errors.md](../content/errors.md) / [complete a form](./complete-a-form.md) |
| Multiple fields fail on submit | Error summary at top of form, focus moved to it | Same |
| System-wide status (outage, deprecation, maintenance) | Global banner, top of the app, above navigation | Not tied to a single user action; needs the highest-priority placement |

**Component guide:** see [component-registry.md](../component-registry.md) for the Callout,
Sonner, AlertDialog, and Error Summary entries — the consumer package `agent-docs/` or overlay
carries each component's implementation doc.

## Best Practices

### Do's

1. **Choose the mechanism by weight, not habit** — match the component to the significance of the
   action, not what's fastest to implement.
2. **Keep exactly one message per priority zone visible at a time.**
3. **Write the message first, then pick the component.**

### Don'ts

1. **Don't use a toast for anything the user might need to reference later** — receipts, reference
   numbers.
2. **Don't stack multiple callouts of the same priority on one page.**
3. **Don't use warning/danger styling for routine, expected outcomes.**

### Common Mistakes

| Mistake | Solution |
|---------|----------|
| Toast for a completed transaction with a reference number | Use a confirmation page instead |
| Multiple top-of-content-area messages at once | Consolidate into one summary |
| Generic error copy ("An error occurred") | Name the real field/value that failed |
| Colour-only status signalling | Pair every state with an icon and label |

### Edge Cases

| Case | Handling |
|------|----------|
| Action succeeds but a secondary effect fails (e.g. save succeeds, notification email fails) | Report the secondary failure separately, don't block on it |
| User navigates away before a toast is read | Escalate to an inline banner or confirmation page instead of relying on the toast |
| Repeated identical toasts in quick succession | Consolidate rather than stack — respect the component's visible-toast ceiling |

## Examples

A settings page where one card saves independently uses an inline confirmation banner in that
card, not a page-level toast or navigation. A multi-step application ending in a reference number
uses a confirmation page. A single preference toggle uses a toast. A failed multi-field form
submission uses an error summary at the top of the form with focus moved to it.

## Open questions

- **Naming:** is "Help users to know the outcome of their action" the right outcome-framed name, or
  should this split into a `confirm-completion.md` "Pages" pattern plus a separate "Help users
  to…" pattern for the toast/inline tiers?
- Does an internal business tool need a "feature discovery" message state, distinct from this
  pattern's scope?

## Related

- [Confirmations](../content/confirmations.md) — pre-action dialogs
- [Errors](../content/errors.md) — error copy anatomy
- [Complete a form](./complete-a-form.md) — form validation timing and layout
- [Product Design](../design.md) — region model and layout options
- [Component decision tree](../component-decision-tree.md)
- [Component registry](../component-registry.md) — Callout, Sonner, AlertDialog, Error Summary
