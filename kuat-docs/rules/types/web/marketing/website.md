# Marketing Website Rules

Guidelines for Equal Experts marketing websites and landing pages.

---

**Prerequisites:** Load [general rules](../../../general/) first

---

## Overview

Marketing websites are public-facing pages designed to inform, engage, and convert visitors. They use light backgrounds with full-color branding.

---

## When to Use Marketing Layout

Use marketing layout when:
- Creating public-facing website content
- Building landing pages
- External audience (customers, prospects, public)
- Content-focused pages (blog, documentation)
- No complex navigation or application features

---

## Layout Structure

```
┌─────────────────────────────────────────┐
│ Header (Light background)               │
│ [Logo]              [Navigation Links]  │
├─────────────────────────────────────────┤
│                                         │
│         Main Content Area               │
│         (Full width, spacious)          │
│                                         │
├─────────────────────────────────────────┤
│ Footer (Light background)               │
│ [Logo]              [Links/Info]        │
└─────────────────────────────────────────┘
```

---

## Header Specifications

| Property | Value |
|----------|-------|
| Background | Light (`bg-background` or white) |
| Logo | Full-color (`logo-colour.svg`), left-aligned |
| Logo size | 120-150px (min 100px) |
| Navigation | Horizontal, right-aligned or centered |
| Height | 64-80px |
| Padding | 16-24px horizontal, 16px vertical |

---

## Footer Specifications

| Property | Value |
|----------|-------|
| Background | Light (`bg-muted` or light gray) |
| Logo | Full-color, 100-120px |
| Padding | 32-48px vertical, 24px horizontal |

---

## Logo Placement

| Location | Logo Variant | Size |
|----------|--------------|------|
| Header | Full-color | 120-150px |
| Footer | Full-color | 100-120px |

See [general/logo.md](../../../general/logo.md) for logo guidelines.

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (< 640px) | Stack logo/nav vertically, or hamburger menu |
| Tablet (640-1024px) | Horizontal with adjusted spacing |
| Desktop (> 1024px) | Full horizontal layout |

---

## Content Guidelines

Follow [general/content.md](../../../general/content.md) for writing style.

### Marketing Content Should:

- Build awareness and reputation
- Demonstrate expertise through evidence
- Generate leads and opportunities
- Educate external audiences

### Tone

**Tone range:** Confident to conversational (depends on content type)  
**Key balance:** Expertise + Clarity = Credibility

---

## Content Types

### Case Studies

**Structure:**
1. Context Setting - What was the situation?
2. Challenge Identification - What problems needed solving?
3. Our Approach - How did we help?
4. Solution and Implementation - What was built/changed?
5. Measurable Business Results - What was the impact?

**Tips:**
- Start with business problem, not technology
- Use specific numbers and evidence
- Make understandable by anyone

### Blog Posts

**Structure:**
1. Captivating Introduction - Story, question, or surprising insight
2. Clear Problem/Question - What you're addressing
3. Evidence-Based Insights - What you've learned with examples
4. Practical Takeaways - Actionable guidance
5. Compelling CTA - Invite further engagement

### Landing Pages

- Clear value proposition above the fold
- Scannable content with clear headings
- Compelling calls to action
- Trust indicators (logos, testimonials)

---

## Usage Guidelines

### Do's

1. **Use light backgrounds** - White or light gray for content areas
2. **Use full-color logo** - Maximum brand recognition
3. **Prioritize content** - Design serves content
4. **Include clear CTAs** - What should visitors do next?
5. **Ensure accessibility** - WCAG AA compliance

### Don'ts

1. **Don't use dark navigation** - That's for product layouts
2. **Don't use monochrome logo** - Use full-color on light backgrounds
3. **Don't overload with CTAs** - One primary action per section
4. **Don't use jargon** - Write for general audiences
5. **Don't make claims without evidence** - Be specific

---

## Related Documentation

- [General Rules](../../../general/) - Brand and design language
- [General Accessibility](../../../general/accessibility.md) - Accessibility principles
- [Web Foundations](../README.md) - Common web principles
- [Marketing Emails](./emails.md) - Email guidelines
- [Marketing Scenarios](./scenarios/) - Patterns for marketing pages
