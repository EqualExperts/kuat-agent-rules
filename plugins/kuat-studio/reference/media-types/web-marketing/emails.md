# Marketing Email Rules

Guidelines for Equal Experts marketing emails and campaigns.

---

## Overview

Marketing emails are external, opted-in communications designed to inform, engage, and convert prospects and customers — newsletters, announcements, invitations, and nurture content. Unlike product emails, the reader hasn't triggered this specific message, so it has to earn its place in the inbox on relevance and value alone.

---

## Key Principles

1. **Permission-based** — send only to people who opted in, and honour unsubscribes immediately.
2. **Value-first** — the reader gets something (an insight, an offer, useful information) before being asked for anything.
3. **One clear goal** — a single primary CTA per email; competing asks dilute all of them.
4. **Relevant and personal** — segment and personalise. Research consistently shows irrelevant content is what makes recipients call an email "spam", regardless of consent status.
5. **Scannable** — mobile-first, chunked content, clear visual hierarchy; most opens happen on a phone.
6. **Brand-consistent** — recognisable as Equal Experts in look, tone, and voice.

---

## Email Types

| Type | Description |
|------|-------------|
| Newsletter | Regular round-up of updates, insights, and content |
| Product announcement | New feature or release news |
| Event invitation | Webinars, conferences, meetups |
| Nurture sequence | Educational content delivered over a series |
| Promotional / campaign | Time-bound offer or call to act |

Transactional messages (confirmations, receipts) follow [product email rules](../web-product/emails.md) even when sent to an external customer.

---

## Design Guidelines

### Layout

- Single column, mobile-first, roughly 600–640px wide. Multi-column layouts now read as cluttered even on desktop — keep it simple.
- Lead with a strong headline or high-quality image, then a clear content hierarchy: headline → subheading → chunked body → CTA.
- One primary CTA per email. More choices measurably reduce the chance any one of them gets clicked. Long-form newsletters are the one common exception, where a few clearly secondary links are acceptable.

### Colour and imagery

- Use the light, marketing-layout treatment (see [website](./website.md)) rather than the dark product navigation.
- Apply brand [colours](../../design-language/colours.md) by role; reserve the extended/data palette for genuine data content, never for decoration.
- Prefer full-width, high-quality imagery over small thumbnails or dense multi-image grids — large, clear images test better than cluttered ones.
- Compress images, keep total email weight reasonable, and always pair images with alt text (many clients block images by default).

### Typography

- Brand typeface with a web-safe fallback stack. Use size and weight to establish hierarchy — see [typography](../../design-language/typography.md) and [formatting](../../content/formatting.md).

### CTA buttons

- Filled, high-contrast, live-text ("bulletproof") buttons, sentence case, verb-led.

### Footer (legal/compliance minimum)

- Recognisable sender identity and registered/physical address.
- A visible, one-click unsubscribe or preference centre — never hidden, buried, or made deliberately effortful. Making it hard to leave erodes trust faster than losing the subscriber does.
- A link to the relevant privacy/preferences information.

---

## Content Guidelines

Follow [writing style](../../content/writing-style.md) and [formatting](../../content/formatting.md) for tone and conventions.

### Subject line

- Be specific and honest about what's inside. Curiosity-gap or "mystery" framing reads as spam and erodes trust even when it lifts opens.
- Keep it concise for the mobile preview pane; avoid spam-trigger patterns (excess capitals, exclamation marks, misleading claims).

### Preheader

- Extend the subject with a concrete reason to open — don't waste it on "view in browser" boilerplate.

### Body

- Open with the value to the reader, not company news for its own sake.
- Personalise with what you actually know about the recipient's interests or activity; a generic blast to everyone is the most common reason recipients call an email irrelevant or spammy.
- Write in short, scannable chunks. One primary message per email.
- Give the reader an easy way out. Most people who stop wanting an email won't bother to unsubscribe — they'll just tune out or mark it as spam, which is worse for deliverability than a clean unsubscribe.

---

## Common Scenarios

| Scenario | Must include | Tone |
|----------|---------------|------|
| **Newsletter / digest** | A handful of curated, genuinely relevant items; one lead story | Informative, personality allowed, not salesy |
| **Product announcement** | What's new, why it matters to this reader, one CTA to try/learn more | Confident, benefit-led, brief |
| **Event invitation** | What, when, where/format, who it's for, one registration CTA | Clear and direct, low-friction to say yes |
| **Nurture sequence** | One educational idea per email, building toward a later ask | Helpful first, low-pressure |
| **Promotional / campaign** | The offer, the deadline if any, one CTA | Confident but not hyped; avoid false urgency |

---

## Deliverability and List Health

Kept technology-agnostic here; implementation specifics (sending platform, list architecture) live outside this reference.

- Send only to recipients who've opted in; process unsubscribes immediately.
- Keep the sending identity consistent so recipients recognise it at a glance.
- Periodically remove inactive or invalid addresses — sender reputation depends on engagement, not list size.
- Avoid spam-trigger patterns in subject and body copy (excess capitals, exclamation marks, misleading claims).

---

## Accessibility Checklist

- Alt text on every image; decorative images marked as such.
- Colour contrast meets [accessibility](../../accessibility/accessibility.md#colour-contrast) minimums.
- Key messages and CTAs exist as live text, not baked into images.
- A plain-text version accompanies the HTML email.
- No auto-playing video/audio; limit animated GIFs and provide a static fallback where possible.

---

## Related Documentation

- [Reference home](../../README.md) — brand and design language
- [Marketing website](./website.md) — layout and visual patterns
- [Writing style](../../content/writing-style.md) · [Formatting](../../content/formatting.md)
- [Accessibility](../../accessibility/accessibility.md)
- [Colours](../../design-language/colours.md) · [Typography](../../design-language/typography.md)
- [Product emails](../web-product/emails.md) — transactional messages, including ones sent to external customers
