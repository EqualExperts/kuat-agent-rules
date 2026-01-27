# Marketing Page Scenarios

Patterns for landing pages, feature pages, pricing, testimonials, and promotional content.

---

## Principles

### User Goals

- **Understand the value** - What's in it for me?
- **Build trust** - Is this credible?
- **Make decisions** - Which option is right for me?
- **Take action** - Easy path to next step

### UX Principles

| Principle | Implementation |
|-----------|----------------|
| Clear value proposition | Hero communicates benefit immediately |
| Social proof | Testimonials, logos, metrics build trust |
| Scannable content | Users skim before they read |
| Clear CTAs | Obvious next steps at every section |

### Success Metrics

- Time on page
- Scroll depth
- CTA click-through rate
- Conversion rate

---

## Layout

**Base Layout:** Horizontal Navigation

Marketing pages use full-width sections with contained content.

### Landing Page Structure

```
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ Hero Section (full width)           │
├─────────────────────────────────────┤
│ Social Proof / Logos                │
├─────────────────────────────────────┤
│ Features Section                    │
├─────────────────────────────────────┤
│ Benefits / How It Works             │
├─────────────────────────────────────┤
│ Testimonials                        │
├─────────────────────────────────────┤
│ CTA Section                         │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

### Pricing Page Structure

```
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ Heading: "Pricing" or "Choose Plan" │
│ [Monthly] [Annual] toggle           │
├─────────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐            │
│ │Free │ │ Pro │ │Enter│            │
│ │     │ │ ★   │ │prise│            │
│ └─────┘ └─────┘ └─────┘            │
├─────────────────────────────────────┤
│ Feature Comparison Table            │
├─────────────────────────────────────┤
│ FAQ Section                         │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

### Specifications

| Element | Value |
|---------|-------|
| Header height | 64-80px |
| Content container | max-width 1200-1400px, centered |
| Section padding | 64-96px vertical |
| Footer padding | 48-64px vertical |

---

## Design

### Color Tokens

| Element | Token |
|---------|-------|
| Page background | `bg-background` |
| Header | `bg-background` (light) |
| Alternating sections | `bg-muted` or `bg-background` |
| CTA sections | `bg-primary` or dark |
| Footer | `bg-muted` |

### Typography

| Element | Style |
|---------|-------|
| Hero heading | `text-4xl md:text-5xl lg:text-6xl font-bold` |
| Hero subheading | `text-xl text-muted-foreground` |
| Section heading | `text-3xl font-bold` |
| Section subheading | `text-lg text-muted-foreground` |
| Body text | `text-base` or `text-lg` |
| Feature title | `text-lg font-semibold` |

### Spacing Between Sections

| Section Type | Vertical Padding |
|--------------|-----------------|
| Hero | 64-96px |
| Standard content | 64px |
| CTA sections | 64-80px |
| Compact (logos) | 32-48px |

---

## Content

### Hero Section

**Required Elements:**

1. Headline - Clear value proposition
2. Subheadline - Supporting detail
3. Primary CTA button
4. Secondary CTA (optional)
5. Hero image/illustration (optional)

**Hero Variants:**

| Variant | Structure |
|---------|-----------|
| Centered | Text centered, buttons centered below |
| Split | Text left (50%), image right (50%) |
| With background | Dark/image background, light text |

**Specifications:**

| Element | Value |
|---------|-------|
| Heading | Max 10-12 words |
| Subheading | 1-2 sentences |
| CTA spacing | 16px between buttons |

### Feature Sections

**Feature Grid:**

```
┌─────────┐ ┌─────────┐ ┌─────────┐
│  Icon   │ │  Icon   │ │  Icon   │
│ Heading │ │ Heading │ │ Heading │
│  Text   │ │  Text   │ │  Text   │
└─────────┘ └─────────┘ └─────────┘
```

| Element | Specification |
|---------|---------------|
| Grid | 3 columns desktop, 2 tablet, 1 mobile |
| Gap | 32px |
| Icon size | 48px, brand color |
| Alignment | Center or left |

**Feature Alternating:**

```
┌─────────────────────────────────────┐
│ [Image]          Text content       │
├─────────────────────────────────────┤
│ Text content          [Image]       │
├─────────────────────────────────────┤
│ [Image]          Text content       │
└─────────────────────────────────────┘
```

- Alternate image position left/right
- 50/50 or 60/40 split
- Stack on mobile (image above text)

### Pricing Cards

| Element | Specification |
|---------|---------------|
| Card padding | 32px (`p-8`) |
| Highlighted tier | `border-primary`, "Popular" badge |
| Price display | `text-4xl font-bold` |
| Period | `text-sm text-muted-foreground` |
| Feature list | 8-10 items max, checkmarks |
| CTA button | Full width at bottom |

### Testimonials

**Card Pattern:**

| Element | Specification |
|---------|---------------|
| Quote | `text-lg`, optional quotation marks |
| Avatar | 48-64px, rounded full |
| Name | `font-semibold` |
| Title/Company | `text-muted-foreground` |
| Logo | 80-120px wide |

**Layout Options:**

| Layout | Use Case |
|--------|----------|
| Grid (3 col) | Multiple equal testimonials |
| Carousel | Many testimonials, limited space |
| Featured | Single prominent quote |

### CTA Sections

**Mid-page CTA:**

| Element | Specification |
|---------|---------------|
| Background | `bg-muted` |
| Padding | 64px vertical |
| Content | Centered heading + button |

**Final CTA (above footer):**

| Element | Specification |
|---------|---------------|
| Background | `bg-primary` or dark |
| Text | White/light |
| Padding | 80-96px vertical |
| Content | Strong headline + single button |

---

## Accessibility

**Base requirements:** See [general accessibility](../../../../general/accessibility.md)

**Scenario-specific:**

| Requirement | Implementation |
|-------------|----------------|
| Image alt text | Describe meaningful images, decorative get empty alt |
| Heading structure | H1 (hero) → H2 (sections) → H3 (sub-sections) |
| Link purpose | CTAs describe destination/action |
| Contrast on dark sections | Ensure text meets 4.5:1 on dark backgrounds |
| Video captions | All promotional videos have captions |

### Pricing Table Accessibility

- Use semantic `<table>` for comparison tables
- Clear header row with `<th>` elements
- Don't rely on color alone for highlighting

---

## Implementation

### Header Pattern

| Element | Specification |
|---------|---------------|
| Background | `bg-background` (light) |
| Logo | Full-color, left-aligned, 120-150px |
| Navigation | Right-aligned, horizontal |
| CTA button | Primary action in header |
| Height | 64-80px |

### Footer Pattern

| Element | Specification |
|---------|---------------|
| Background | `bg-muted` |
| Logo | Full-color, 100-120px |
| Link columns | Company, Resources, Legal |
| Social links | Icons, 24px |
| Copyright | Bottom, `text-sm text-muted-foreground` |

### Case Study Structure

1. Hero with client logo and headline
2. Challenge section - What problem?
3. Solution section - How did we help?
4. Results section - Metrics and outcomes
5. Client quote
6. Related case studies CTA

**Results Display:**

```
┌──────┐ ┌──────┐ ┌──────┐
│ 50%  │ │ 3x   │ │ 24h  │
│ cost │ │faster│ │deploy│
│ saved│ │ time │ │ time │
└──────┘ └──────┘ └──────┘
```

- Use KPI card pattern
- Include context (e.g., "50% reduction in...")

### Responsive Behavior

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Hero heading | `text-6xl` | `text-5xl` | `text-4xl` |
| Feature grid | 3 columns | 2 columns | 1 column |
| Pricing cards | 3 horizontal | 3 horizontal | Stacked |
| Split sections | 50/50 | 50/50 | Stacked |
| Testimonials | 3 columns | 2 columns | 1 column |

---

## Best Practices

### Do's

1. **Lead with value** - Hero should answer "what's in it for me?"
2. **Use social proof** - Logos, testimonials, metrics
3. **Clear CTAs** - One primary action per section
4. **Scannable content** - Users skim before reading
5. **Mobile-first** - Many visitors are on mobile
6. **Fast loading** - Optimize images, lazy load below fold

### Don'ts

1. **Don't overwhelm** - One message per section
2. **Don't hide CTAs** - Make them prominent
3. **Don't use jargon** - Plain language for broad audience
4. **Don't auto-play video with sound** - Respect user preferences
5. **Don't neglect footer** - Important for trust and navigation

### Common Mistakes

| Mistake | Solution |
|---------|----------|
| Unclear value prop | Test headline with users |
| Too many CTAs | One primary per section |
| Walls of text | Break into scannable sections |
| Generic testimonials | Specific, credible quotes |
| Missing social proof | Add logos, numbers, quotes |
| Slow loading | Optimize images, lazy load |

### Edge Cases

| Case | Handling |
|------|----------|
| No testimonials yet | Use partner logos, team credentials |
| Complex pricing | Summary cards + detailed table |
| Many features | Categorize, show top 3-6, link to full list |
| Video content | Thumbnail + play button, don't auto-play |
| International | Consider localization, currency display |

---

## Related Documentation

- [Marketing Website](../website.md) - Marketing website guidelines
- [General Accessibility](../../../../general/accessibility.md) - Accessibility principles
- [Logo Usage](../../../../general/logo.md) - Logo placement and variants
