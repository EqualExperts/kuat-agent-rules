# Product Email Rules

Guidelines for Equal Experts transactional and system emails sent from web applications.

---

## Overview

Product emails are triggered by something the user did or something the system needs to tell them: confirmations, notifications, and system messages. The reader didn't ask for this specific message, but they are expecting the application to send it — the bar is trust and clarity, not persuasion.

---

## Key Principles

1. **Clean and content-first** — minimal decoration; the message leads and design supports it. Follow the design system's [clarity principle](../../design-language/design-language.md#4-clarity): never decorate at the expense of getting the information across.
2. **Trustworthy** — instantly recognisable as coming from the product, and clear about exactly which service sent it — no surprises in sender, subject, or content.
3. **Single-purpose** — one transaction, one message. Don't fold marketing content into a transactional email.
4. **Timely** — sent as close to the triggering event as the system allows.
5. **Actionable** — the reader knows what happened, whether they need to do anything, and how.
6. **Accessible** — works with images blocked, with a screen reader, and at 200% zoom.

---

## Email Types

| Type | Examples |
|------|----------|
| Confirmation | Account created, payment received, booking made |
| Notification | New activity, status change, mention or assignment |
| System / security | Password reset, email verification, security alert, new-device sign-in |
| Digest | Periodic roll-up of activity |

---

## Design Guidelines

### Layout

- Content-first: strip the design back to what the message needs. No decorative imagery, banners, or flourishes competing with the information itself.
- Single column, mobile-first, roughly 600–640px wide.
- Generous whitespace between sections — follow the [spacing](../../design-language/spacing.md) scale.
- One primary CTA. Use a secondary text link only when a genuine second action exists (e.g. "or view your account").

### Colour

- Use brand [colour](../../design-language/colours.md) roles, not raw hex values: primary for the CTA, `--destructive` for error/security-alert framing.
- Never rely on colour alone to signal status — pair with wording ("Error:", "Action needed") as described in [accessibility](../../accessibility/accessibility.md#colour-usage).
- Avoid full-colour backgrounds behind body copy; they don't survive client dark-mode inversion reliably. Keep the body on a light background with a small brand accent (header bar, logo lockup).

### Typography

- Use the brand typeface with a web-safe fallback stack — many email clients can't load custom webfonts. See [typography](../../design-language/typography.md).
- Minimum 14–16px body text, 1.5 line height, per [accessibility](../../accessibility/accessibility.md#typography-accessibility).

### Imagery and logo

- Small header logo per [logo guidelines](../../brand/logo.md).
- Alt text is mandatory on every image. Many clients block images by default, so never put essential information (amounts, dates, codes) only in an image — set it as live text.
- Use live HTML text for buttons and headlines, not text baked into an image.

### Service identity

Kuat covers many EE-built services, so the reader needs to know at a glance which one sent this email — particularly if they use more than one. That identification doesn't have to sit in the main header lockup: a small label near the header (e.g. "Timesheets", "Expenses") or a clear line in the footer ("This email was sent by [Service], part of Equal Experts") both work. Pick one clear place for it — don't rely on the sender address alone, since many clients hide or truncate it by default.

### Buttons / CTA

- One primary CTA: filled, high-contrast, minimum 44×44px tap target, live text (a "bulletproof" button, not an image).
- Sentence case, verb-led label — see [buttons](../../content/formatting.md#buttons).

### Footer

- Recognisable sender name, the sending service named per [service identity](#service-identity) above, and a way to reach support.
- If the email carries any promotional content alongside the transactional message, it needs an unsubscribe/preferences link and the same legal footer as a [marketing email](../web-marketing/emails.md#footer-legalcompliance-minimum) — keep pure transactional email free of that content instead.

---

## Content Guidelines

Follow [writing style](../../content/writing-style.md) and [formatting](../../content/formatting.md) for tone, voice, and conventions.

### Subject line

- Name the specific outcome, not a generic label: "Your password has been reset", not "Notification".
- Include identifying details where they help the reader confirm it's theirs (order number, invoice number).
- No marketing language, hype, or artificial urgency in a system email.

### Preheader

- Extend the subject with the next useful detail; don't waste it on boilerplate.

### Body

- Lead with the outcome or status — skip a greeting preamble.
- State what happened, why the reader is getting this email, and what to do next (or that nothing is needed).
- For security-sensitive emails: state any expiry window, and reassure the reader with next steps if they didn't request the action.
- Use real data the reader will recognise (their name, order number); don't personalise with data you don't actually have.
- Short paragraphs, one idea each, written for a first-read scan.

---

## Common Scenarios

| Scenario | Must include | Tone |
|----------|---------------|------|
| **Password reset** | Reset link/button, expiry window, "didn't request this?" reassurance and next step | Calm, reassuring, no urgency beyond the real expiry |
| **Welcome / account activation** | What the account gives access to, the activation action, a first next step | Warm, brief, sets expectations for what's next |
| **Payment / booking confirmation** | What was purchased/booked, amount, date/reference, what happens next | Clear, itemised, confidence-building |
| **Activity notification** | What happened, who/what triggered it, link to view in the product | Brief, factual, one glance should be enough |
| **Security alert** | What was detected, when, device/location if known, how to secure the account if it wasn't them | Direct, non-alarmist, action-first |
| **Digest / summary** | Time period covered, the handful of most relevant items, link to see more | Scannable, prioritised — not a full activity log |

---

## Accessibility Checklist

- Alt text on every image; decorative images marked as such.
- Colour contrast meets [accessibility](../../accessibility/accessibility.md#colour-contrast) minimums; status never conveyed by colour alone.
- All critical information and CTAs exist as live text, not images.
- Semantic HTML structure (proper headings, real buttons/links) so screen readers and layout tables (marked `role="presentation"`) don't confuse assistive tech.
- A plain-text version accompanies the HTML email.
- No auto-playing or flashing content.

---

## Related Documentation

- [Reference home](../../README.md) — brand and design language
- [Writing style](../../content/writing-style.md) · [Formatting](../../content/formatting.md) — copy conventions
- [Accessibility](../../accessibility/accessibility.md) · [Web-product accessibility](./accessibility.md) — technical implementation
- [Colours](../../design-language/colours.md) · [Typography](../../design-language/typography.md)
- [Marketing emails](../web-marketing/emails.md) — for the compliance footer required once any promotional content is present
