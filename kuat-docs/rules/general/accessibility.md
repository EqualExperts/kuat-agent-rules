---
scope: general
---

# Accessibility

Foundational accessibility requirements for Equal Experts content and products. These rules ensure products and services deliver the best experience for all users.

**Target: WCAG 2.2 Level AA compliance.**

---

## Quick reference

- **Standard:** WCAG 2.2 Level AA (legal baseline for many contexts).
- **Contrast:** Body text 4.5:1, large text/UI 3:1; never rely on colour alone for meaning.
- **Typography:** Min body 11pt (14px), line height 1.5; use relative units; support 200% zoom.
- **Motion:** Provide reduced-motion alternative; no auto-play without user control.
- **Images:** Meaningful images need alt text; decorative images need empty or role="presentation".
- **Links/buttons:** Descriptive labels; visible focus; keyboard operable.
- **Content:** Plain language; logical structure (headings, lists); person-first language.
- **Testing:** Use contrast checkers and automated a11y tools; test with keyboard and screen reader.

*Full detail follows.*

---

## Why Accessibility Matters

Accessibility is the practice of making information, activities, and environments sensible, meaningful, and usable for as many people as possible.

### The Case for Accessibility

- **16% of the global population** (1.3 billion people) live with a significant disability
- **Legal requirements** - UK Public Sector organisations must create accessible products, websites, and services
- **Better UX for everyone** - Accessible design benefits older people, non-native English speakers, those with temporary disabilities, and situational limitations (bright sunlight, noisy environments)
- **Extended reach** - Accessible content reaches more users and improves overall satisfaction

### Equal Experts Commitment

If we want clients to trust us on accessibility, we must lead by example. All content we produce—websites, documents, applications—should reflect our commitment to accessibility.

---

## WCAG Principles (POUR)

The Web Content Accessibility Guidelines are built on four principles:

| Principle | Description |
|-----------|-------------|
| **Perceivable** | Information must be presented in ways users can perceive using their senses |
| **Operable** | All users must be able to interact with interface components |
| **Understandable** | Users must be able to understand information and how to operate the UI |
| **Robust** | Content must work with assistive technologies and user agents |

### Conformance Levels

| Level | Description |
|-------|-------------|
| A | Minimum conformance (bare minimum) |
| **AA** | Mid-range conformance (our target) |
| AAA | Highest conformance level |

**Equal Experts targets AA compliance** - this is the standard for most legal requirements.

---

## Visual Accessibility

Visual accessibility ensures that design choices don't exclude users with visual impairments, colour blindness, or other conditions that affect how they perceive content.

**Key principle:** Design should never rely solely on visual characteristics to convey meaning.

### Colour Contrast

Sufficient contrast between text and background is essential for readability.

| Content Type | Minimum Ratio | Example |
|--------------|---------------|---------|
| Body text | 4.5:1 | Standard paragraphs, labels |
| Large text (18pt+ or 14pt bold) | 3:1 | Headings, large buttons |
| UI components | 3:1 | Borders, icons, focus indicators |
| Print materials | 7:1 | Higher due to printing variables |

Use contrast checking tools to verify ratios. See [Testing Tools](#testing-tools).

### Colour Usage

**Never use colour alone to convey information.**

| Bad | Good |
|-----|------|
| Red text for errors | Red text + error icon + "Error:" prefix |
| Green for success | Green + checkmark icon + success message |
| Link only distinguished by colour | Link with underline + colour |

### Status Indicators

When using colour for status (red/amber/green):

1. **Add shapes** - Different shapes for each status (circle, triangle, square)
2. **Add labels** - Text labels alongside colours
3. **Include legend** - Always explain what colours mean
4. **Consider colour blindness** - Red/green are commonly confused

### Charts and Data Visualisation

- Use patterns or textures in addition to colours
- Ensure adjacent colours have sufficient contrast
- Provide data tables as alternatives to charts

---

## Typography Accessibility

### Minimum Sizes

| Context | Minimum Size |
|---------|--------------|
| Body text | 11pt (14px) |
| Small text (captions, labels) | 10pt (12px) - use sparingly |
| Touch device body | 16px recommended |

### Line Spacing

| Content Type | Line Height |
|--------------|-------------|
| Body copy | 1.5x font size |
| Headings | 1.2x font size |
| Dense UI (tables) | 1.3x minimum |

### Text Scaling

- Text must be scalable to 200% without loss of content or functionality
- Use relative units (rem, em) not fixed pixels for font sizes
- Test layouts at 200% zoom

### Typeface Selection

- Prefer sans-serif fonts for screen readability
- Avoid decorative fonts for body text
- Ensure consistent character spacing

### Text Alignment

- **Left-align** body text (default)
- **Avoid justified** text - uneven spacing hinders readability
- **Centre-align** sparingly - only for short headings or CTAs

---

## Motion and Animation

### Risks

- Flashing content can trigger epileptic seizures
- Excessive motion causes nausea/disorientation for some users
- Auto-playing content is distracting

### Requirements

| Requirement | Implementation |
|-------------|----------------|
| No flashing | Never use content that flashes more than 3 times per second |
| Pause controls | All auto-playing content must have pause/stop controls |
| Reduced motion | Respect user preferences for reduced motion |
| Duration limits | Auto-playing content longer than 5 seconds needs controls |

### GIFs and Animated Content

- Limit excessive movement
- Provide static fallback images where possible
- Never use GIFs for essential information

---

## Icons

### Size Requirements

| Context | Minimum Size |
|---------|--------------|
| Touch targets | 44x44px minimum tap area |
| Visual icon | 24x24px minimum visible size |
| Dense UI | 20x20px with adequate spacing |

### Accessibility Requirements

- **High contrast** - Icons must meet 3:1 contrast ratio
- **Universal symbols** - Use well-understood icons (magnifying glass for search)
- **Consistent style** - Same visual style throughout application
- **Text alternatives** - Provide labels or text alternatives for meaningful icons
- **Decorative icons** - Mark purely decorative icons appropriately

---

## Images

### Background Images

- **Never place text on busy backgrounds**
- Use colour overlays to improve contrast when text over images is necessary
- Test text legibility across the full image area

### Inclusive Imagery

- Represent diverse ages, backgrounds, and perspectives
- Prioritise diversity year-round, not just during awareness events
- Avoid stereotypical representations

### Decorative vs Meaningful Images

| Type | Alt Text | Example |
|------|----------|---------|
| Decorative | Empty or none | Background patterns, visual flourishes |
| Meaningful | Descriptive text | Photos, diagrams, charts |
| Functional | Describes action | Icons in buttons |

---

## Content Accessibility

Accessible content can be understood by everyone—including people with cognitive disabilities, non-native English speakers, and those using assistive technologies.

**Key principle:** Write content that users can understand the first time they read or hear it.

### Plain Language

| Do | Don't |
|----|-------|
| Use short sentences | Write long, complex sentences |
| Use active voice | Use passive voice |
| Use common words | Use jargon or technical terms without explanation |
| Be direct and specific | Be vague or ambiguous |
| Use concrete examples | Use abstract concepts without illustration |

### Readability Targets

- Aim for reading level that most users can understand first time
- Break complex concepts into digestible chunks
- Test with readability tools (see [Testing Tools](#testing-tools))

### Content Structure

**Headings:**
- Descriptive headings that accurately describe the content below
- Hierarchical structure - H1 → H2 → H3 (never skip levels)
- One H1 per page - the main page title
- Headings help users navigate and scan content

**Paragraphs:**
- Keep paragraphs short - 3-4 sentences maximum
- One idea per paragraph
- Avoid walls of text - dense blocks are hard to read

**Lists:**
- Use bullet points for unordered items
- Use numbered lists for sequential steps
- Keep list items concise

**Reading Order:**
- Content should make sense when read linearly
- Don't rely on visual layout to convey meaning

---

## Alternative Text

### When Alt Text is Required

| Image Type | Alt Text Required | Approach |
|------------|-------------------|----------|
| Informative images | Yes | Describe content and purpose |
| Decorative images | No | Mark as decorative |
| Functional images (buttons, links) | Yes | Describe the action |
| Charts and diagrams | Yes | Summarize data, link to full data |
| Images with text | Yes | Include all text from image |

### Writing Good Alt Text

| Do | Don't |
|----|-------|
| Describe content and purpose | Start with "Image of..." or "Picture of..." |
| Be concise (under 125 characters) | Write lengthy descriptions |
| Include text that appears in image | Describe visual appearance only |
| Provide context for charts | Just say "Chart" or "Graph" |

### Examples

| Context | Bad Alt Text | Good Alt Text |
|---------|--------------|---------------|
| Company logo | "Logo" | "Equal Experts" |
| Chart | "Bar chart" | "Monthly sales chart showing 40% growth in Q4" |
| Product photo | "Image of laptop" | "MacBook Pro with dashboard displayed" |
| Icon button | "Icon" | "Search" |

### Complex Images

For complex diagrams or charts:

1. Provide brief alt text summarizing the image
2. Include detailed description in surrounding text or linked page
3. For data charts, provide accessible data table alternative

---

## Links and Buttons

### Link Text

Links should tell users where they're going and why.

| Bad | Good |
|-----|------|
| "Click here" | "View our pricing plans" |
| "Read more" | "Read more about accessibility guidelines" |
| "Learn more" | "Learn more about our consulting services" |
| URL as link text | Descriptive text for the destination |

### Link Visibility

- Links must be visually distinct from regular text
- Use **underline** plus colour change
- Don't rely on colour alone

### Button Labels

- Describe the action clearly
- Use verbs: "Submit", "Save", "Delete", "Cancel"
- Be specific: "Save changes" not just "Save"
- Match user expectation to actual outcome

---

## Abbreviations and Acronyms

### First Use

Always spell out abbreviations on first use:

- "Artificial Intelligence (AI)" - then use "AI" thereafter
- "Application Programming Interface (API)"
- "User Experience (UX)"

### Screen Reader Considerations

- Use capitals for abbreviations: `HMRC` not `Hmrc`
- Screen readers may mispronounce lowercase abbreviations as words

---

## Text Formatting

### Capitalisation

| Do | Don't |
|----|-------|
| Use sentence case | USE ALL CAPS FOR EMPHASIS |
| Capitalise proper nouns | use alternating caps (LiKe ThIs) |
| Use bold for emphasis | Rely on caps for emphasis |

**Why:** Screen readers cannot convey the context of ALL CAPS. Alternating caps is read as gibberish.

### Semantic Formatting

- Use appropriate markup for important text, not just bold styling
- Use appropriate markup for emphasis, not just italic styling
- Use semantic lists, not manual bullet characters

---

## Inclusive Language

### Guidelines

- Use language that is respectful and free of bias
- Avoid exclusionary terms or outdated phrases
- Consider diverse audiences and perspectives
- When in doubt, research current preferred terminology

### Person-First Language

- "Person with a disability" not "disabled person"
- "User who is blind" not "blind user"
- Focus on the person, not the condition

---

## Multimedia Content

### Video

- **Captions required** - Essential for deaf/hard-of-hearing users
- 85% of social media videos are watched without sound
- Captions can be burned-in or added via platform tools

### Audio

- **Transcripts required** - Full text alternative for audio content
- Helps users who can't listen (noisy environment, preference)
- Benefits SEO and searchability

### Auto-Playing Content

- Provide pause/stop controls
- Never auto-play audio without user consent
- Limit duration of auto-playing visual content

---

## Testing Tools

### Colour Contrast

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Text contrast
- [Contrast Checker](https://contrastchecker.com/) - Images
- [Brandwood A11y](https://www.brandwood.com/a11y/) - Text over images

### Automated Testing

- [WAVE Browser Extension](https://wave.webaim.org/extension/) - Page accessibility evaluation
- [Axe DevTools](https://www.deque.com/axe/devtools/) - Comprehensive accessibility testing

### Content Readability

- [WebFX Readability Test](https://www.webfx.com/tools/read-able/)
- [Hemingway Editor](https://hemingwayapp.com/)

---

## Further Reading

- [Introduction to Web Accessibility (W3C)](https://www.w3.org/WAI/fundamentals/accessibility-intro/)
- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [UK Government Accessibility Guidelines](https://gcs.civilservice.gov.uk/guidance/digital-communication/planning-creating-and-publishing-accessible-website-content/)

---

## Related Documentation

- [Colours](./colours.md) - Brand colour palette and contrast
- [Typography](./typography.md) - Font families and type scale
- [Content](./content.md) - Writing style and tone
- [Web Technical Accessibility](../types/web/product/accessibility.md) - Implementation details
