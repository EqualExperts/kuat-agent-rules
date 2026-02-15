# Agent Rules Authoring Guide

A meta-framework for creating clear, performant, and verifiable agent rules across design systems and creative outputs.

---

## Purpose

This guide defines how to write agent rules that:
- Generate consistent, high-quality outputs across tools and contexts
- Enable compliance review against established standards
- Scale across skill levels, from designers to developers to non-technical contributors
- Remain tool-agnostic (Cursor, Claude Code, Codex, MCP servers, etc.)

---

## Part 1: Rule File Architecture

### 1.1 File Organisation Principles

Structure rules files by **concern**, not by consumer. This enables agents to load only relevant context.

**Recommended hierarchy:**

```
rules/
├── _index.md                    # Entry point: describes repo structure, how to use
├── _glossary.md                 # Shared terminology definitions
├── foundations/                 # Universal principles (apply to all outputs)
│   ├── accessibility.md
│   ├── brand-voice.md
│   └── design-principles.md
├── design-language/             # Visual system primitives
│   ├── colour.md
│   ├── typography.md
│   ├── spacing.md
│   ├── logo.md
│   └── iconography.md
├── media-types/                 # Output-specific rules
│   ├── web/
│   │   ├── _web-common.md       # Shared web patterns
│   │   ├── react.md
│   │   ├── vue.md
│   │   └── html-css.md
│   ├── presentations/
│   │   ├── slides.md
│   │   └── infographics.md
│   ├── data-visualisation/
│   │   ├── charts.md
│   │   └── dashboards.md
│   └── imagery/
│       ├── photography.md
│       ├── illustrations.md
│       └── icons.md
└── scenarios/                   # Cross-cutting use cases
    ├── marketing-page.md
    ├── internal-tool.md
    └── client-demo.md
```

**Key principles:**

- **Underscore prefix** (`_index.md`) for meta/navigation files
- **Singular nouns** for specific rules (`colour.md` not `colours.md`)
- **Common files** (`_web-common.md`) for shared patterns within a category
- **Maximum file size**: Keep individual files under 500 lines. Agents perform better with focused context.

### 1.2 Cross-Referencing

Use explicit references rather than assuming agents will infer connections.

**Pattern:**
```markdown
## Colour Usage

See: `design-language/colour.md` for token definitions.
See: `foundations/accessibility.md#colour-contrast` for contrast requirements.

When these rules conflict, accessibility requirements take precedence.
```

**Why this works:** Agents can follow explicit paths. They cannot reliably infer that colour choices should consider accessibility unless told.

### 1.3 Entry Point Structure

The `_index.md` file should orient agents to the repository:

```markdown
# [System Name] Agent Rules

## How to Use These Rules

1. **Always load**: `foundations/` rules apply to all outputs
2. **Load by output type**: Select the relevant `media-types/` file
3. **Load by context**: If a `scenarios/` file matches your task, load it
4. **Resolve conflicts**: Foundation rules override media-type rules unless explicitly stated

## Rule Hierarchy (Highest to Lowest Priority)

1. Accessibility requirements
2. Brand non-negotiables (logo clear space, protected colours)
3. Design language tokens
4. Media-type conventions
5. Stylistic preferences
```

---

## Part 2: Rule Anatomy

### 2.1 Structure of an Effective Rule

Each rule should contain these elements:

```markdown
## [Rule Name]

**Intent:** Why this rule exists (the problem it solves)

**Rule:** Clear, unambiguous instruction

**Applies to:** Scope of application

**Examples:**
- ✓ Correct: [concrete example]
- ✗ Incorrect: [counter-example with explanation]

**Verification:** How to check compliance

**Exceptions:** When this rule may be relaxed (if ever)
```

**Example in practice:**

```markdown
## Primary Button Colour

**Intent:** Ensure interactive elements are immediately recognisable and accessible.

**Rule:** Primary action buttons must use the `action-primary` colour token. Never use raw hex values.

**Applies to:** All interactive button elements across web, mobile, and presentation media.

**Examples:**
- ✓ Correct: `className="bg-action-primary"` or `background-color: var(--action-primary)`
- ✗ Incorrect: `background-color: #E63C19` — raw hex values bypass theme support and create maintenance burden

**Verification:** Search for hex colour codes in button-related styles. Any matches indicate a violation.

**Exceptions:** None. This rule has no exceptions.
```

### 2.2 Positive vs Negative Constraints

Use both, but understand their different functions:

| Type | Function | Example |
|------|----------|---------|
| **Positive** | Guides toward correct output | "Use sentence case for all headings" |
| **Negative** | Prevents common errors | "Never use ampersands in body text" |
| **Conditional** | Handles edge cases | "Use title case only for proper nouns" |

**Negative constraints are more powerful for preventing drift.** Agents will explore solution space; telling them where NOT to go is often more effective than describing the entire valid space.

**Pattern for strong constraints:**
```markdown
**Never:**
- Use colour alone to convey meaning
- Create new colour tokens without approval
- Override spacing tokens with arbitrary values

**Always:**
- Provide text alternatives for colour-coded information
- Reference existing tokens before proposing new ones
- Use the spacing scale (4px base unit)
```

### 2.3 Decision Hierarchies

When multiple valid approaches exist, provide explicit priority ordering:

```markdown
## Icon Selection

When selecting an icon, follow this priority:

1. **Use existing icon** from the icon library — search before creating
2. **Request addition** to the library if no suitable icon exists
3. **Never create one-off icons** — this fragments the system

If you cannot find a suitable icon, describe the concept and suggest the agent pause for human input rather than improvising.
```

**Why this works:** Removes ambiguity. The agent knows exactly what to try first, second, and what requires escalation.

### 2.4 Specificity Levels

Write rules at the appropriate level of specificity:

| Level | Use for | Example |
|-------|---------|---------|
| **Principle** | Foundational truths | "Accessibility is non-negotiable" |
| **Guideline** | Directional guidance | "Prefer shorter labels for navigation items" |
| **Rule** | Specific requirements | "Navigation labels must be ≤3 words" |
| **Specification** | Exact values | "Primary nav font-size: 16px / 1rem" |

**Anti-pattern:** Mixing levels creates confusion.
```markdown
# Bad: Mixed specificity
- Accessibility matters (principle)
- Use 16px font size (specification)
- Keep things simple (principle)
- WCAG AA contrast ratio of 4.5:1 (specification)
```

**Better: Grouped by level**
```markdown
## Principles
- Accessibility is non-negotiable
- Simplicity over decoration

## Specifications
- Body text: 16px minimum
- Contrast ratio: 4.5:1 (WCAG AA)
```

---

## Part 3: Writing for Generation and Review

### 3.1 Dual-Purpose Rule Structure

Rules must support two modes:
1. **Generation**: "Create something that follows this rule"
2. **Review**: "Check if this existing thing follows the rule"

**Pattern:**
```markdown
## Heading Hierarchy

**Rule:** Pages must have exactly one H1, which describes the page purpose. Subsequent headings must not skip levels.

**When generating:**
- Start with the H1 reflecting the page's primary purpose
- Use H2 for major sections
- Use H3 for subsections within H2s
- Continue nesting logically

**When reviewing:**
- Count H1 elements (must equal 1)
- Check heading sequence (no jumps from H2 to H4)
- Verify H1 describes page purpose, not decoration

**Automated check:** Parse DOM for heading elements; validate count and sequence.
```

### 3.2 Verification Methods

Every rule should indicate how compliance can be verified:

| Verification Type | Description | Example |
|-------------------|-------------|---------|
| **Automated** | Can be checked programmatically | "Lint for hex values in stylesheets" |
| **Visual inspection** | Requires human review | "Logo clear space appears sufficient" |
| **Functional test** | Requires interaction | "Focus states are visible when tabbing" |
| **Comparative** | Compare against reference | "Matches approved colour palette" |

**Include verification method in the rule:**
```markdown
## Link Styling

**Rule:** Links must be visually distinct from surrounding text through colour AND underline (not colour alone).

**Verification:**
- Visual inspection: Links should be identifiable with monitor set to greyscale
- Automated: CSS audit for `text-decoration: none` on link elements without alternative indicators
```

### 3.3 Review Checklists

For complex outputs, provide structured checklists:

```markdown
## Web Page Review Checklist

### Accessibility
- [ ] Single H1 present and descriptive
- [ ] Heading hierarchy is sequential
- [ ] All images have alt text (decorative images use empty alt)
- [ ] Colour contrast meets WCAG AA (4.5:1 for text)
- [ ] Interactive elements are keyboard accessible
- [ ] Focus states are visible

### Brand Compliance
- [ ] Colours are from approved palette (no arbitrary hex values)
- [ ] Typography uses defined type scale
- [ ] Spacing follows 4px grid
- [ ] Logo usage follows clear space rules (if present)

### Code Quality
- [ ] No inline styles (use design tokens)
- [ ] Component naming follows conventions
- [ ] No hardcoded values for themeable properties
```

---

## Part 4: Context and Role Definition

### 4.1 Agent Behaviour Preamble

Every rules file should open with behaviour guidance:

```markdown
## Agent Behaviour

When using these rules, you should:
- **Search before creating**: Check existing patterns and components first
- **Verify against rules**: Cross-reference outputs with relevant rule files
- **Explain decisions**: When asked, cite the specific rule informing a choice
- **Flag conflicts**: If rules conflict, state the conflict and which takes precedence
- **Request clarification**: If requirements are ambiguous, ask rather than assume
- **Acknowledge limitations**: State when a request falls outside covered rules
```

### 4.2 Audience Context

Define who will consume the outputs:

```markdown
## Audience Context

These rules produce outputs for:
- **Internal teams**: Familiar with company terminology, need efficiency
- **Clients**: May need more polish, less assumed knowledge
- **Public**: Requires clearest communication, most rigorous accessibility

When generating, consider the audience:
- Internal: Prioritise speed and functionality
- Client: Balance polish with practicality
- Public: Maximise clarity and accessibility
```

### 4.3 Domain Grounding

Anchor rules in external authorities where possible:

```markdown
## Reference Standards

These rules extend and apply:
- **WCAG 2.2**: Web Content Accessibility Guidelines (AA level minimum)
- **APCA**: Advanced Perceptual Contrast Algorithm (for enhanced contrast guidance)
- **Material Design**: Referenced for motion and interaction patterns
- **[Internal] Brand Guidelines v2.3**: Source of truth for visual identity

When rules conflict with reference standards, reference standards take precedence unless explicitly stated otherwise.
```

---

## Part 5: Examples and Scenarios

### 5.1 Example Quality

Examples are more powerful than abstract rules. Invest in good ones.

**Effective example pattern:**
```markdown
## Card Component

**Rule:** Cards must have a clear visual hierarchy with a single primary action.

**✓ Good example:**
```jsx
<Card>
  <CardHeader>
    <CardTitle>Project Update</CardTitle>
    <CardMeta>2 hours ago</CardMeta>
  </CardHeader>
  <CardBody>
    <p>Sprint 14 completed with all stories delivered.</p>
  </CardBody>
  <CardFooter>
    <Button variant="primary">View Details</Button>
    <Button variant="ghost">Dismiss</Button>
  </CardFooter>
</Card>
```
*Primary action (View Details) is visually prominent. Secondary action is de-emphasised.*

**✗ Poor example:**
```jsx
<Card>
  <CardFooter>
    <Button variant="primary">View</Button>
    <Button variant="primary">Edit</Button>
    <Button variant="primary">Delete</Button>
  </CardFooter>
</Card>
```
*Three primary buttons create decision paralysis. No clear hierarchy.*
```

### 5.2 Scenario-Based Rules

For complex workflows, use scenarios:

```markdown
# Scenario: Creating a Marketing Landing Page

## Context
Marketing pages are public-facing and must balance brand expression with conversion goals.

## Load These Rules
- `foundations/accessibility.md`
- `foundations/brand-voice.md`
- `design-language/colour.md`
- `design-language/typography.md`
- `media-types/web/_web-common.md`

## Scenario-Specific Guidance

### Hero Section
- H1 must be benefit-focused, not feature-focused
- Maximum 8 words for headline
- Single primary CTA above the fold
- Supporting image must have meaningful alt text (not decorative)

### Social Proof
- Testimonials require attribution (name, role, company)
- Client logos must use approved versions from asset library
- Minimum 3, maximum 6 logos in a logo bar

### Form Design
- Single-column forms only
- Required fields must be marked (asterisk with legend)
- Error messages appear inline, not in alerts
- Success state confirms action and sets expectation

## Review Checklist for Marketing Pages
- [ ] H1 is benefit-focused and ≤8 words
- [ ] Single primary CTA above fold
- [ ] All client logos are approved versions
- [ ] Forms are single-column with inline validation
- [ ] Page passes Lighthouse accessibility audit (score ≥90)
```

---

## Part 6: Maintenance and Evolution

### 6.1 Versioning

Include version and changelog in rule files:

```markdown
---
version: 2.1.0
last-updated: 2025-02-13
changelog:
  - 2.1.0: Added dark mode colour tokens
  - 2.0.0: Migrated to APCA contrast model
  - 1.2.0: Added icon guidelines
---
```

### 6.2 Deprecation

When rules change, provide migration guidance:

```markdown
## Deprecated: Hex Colour Values

**Status:** Deprecated as of v2.0.0. Will be removed in v3.0.0.

**Old pattern:**
```css
.button { background-color: #E63C19; }
```

**New pattern:**
```css
.button { background-color: var(--color-action-primary); }
```

**Migration:** Search codebase for hex values matching the deprecated palette. Replace with corresponding token references per the mapping table in `design-language/colour.md#migration`.
```

### 6.3 Extension Points

Allow for context-specific extensions:

```markdown
## Extending These Rules

For project-specific rules:
1. Create a `project-rules/` directory in your project
2. Reference the base rules: "This project follows kuat-agent-rules with the following additions..."
3. Document exceptions with rationale
4. Do not override foundation rules (accessibility, brand non-negotiables)

**Example project extension:**
```markdown
# Project: Client Portal

Extends: kuat-agent-rules v2.1.0

## Additions
- Authentication flows use MSAL patterns (see `auth-patterns.md`)
- Data tables use AG Grid (see `data-grid-rules.md`)

## Exceptions
- None. All base rules apply.
```
```

---

## Part 7: Anti-Patterns

### 7.1 Rules to Avoid

| Anti-Pattern | Problem | Better Approach |
|--------------|---------|-----------------|
| "Use good judgement" | Unverifiable, subjective | Provide specific criteria |
| "Should generally" | Ambiguous scope | State clearly when it applies |
| "Consider using" | Non-committal | "Use X when Y" or "Never use X" |
| "Etc." or "and so on" | Incomplete rule | List all items or provide clear category |
| Rules without examples | Abstract, misinterpreted | Include ✓/✗ examples |
| Contradictory rules in different files | Conflicts without resolution | State precedence explicitly |

### 7.2 Cognitive Load

Keep individual rule files focused:
- Maximum 5-7 major sections per file
- Maximum 3 levels of heading depth
- If a section exceeds 100 lines, consider splitting to a new file

---

## Part 8: Validation Checklist

Use this checklist when reviewing new or updated rules:

### Clarity
- [ ] Rule uses imperative mood ("Use X" not "X should be used")
- [ ] No ambiguous terms ("appropriate", "reasonable", "good")
- [ ] Scope is explicit (what does this apply to?)

### Completeness
- [ ] Both positive instruction and negative constraints included
- [ ] Examples show correct AND incorrect usage
- [ ] Exceptions are documented (or "None" is stated)

### Verifiability
- [ ] Verification method is specified
- [ ] Pass/fail criteria are objective
- [ ] Automated checks are noted where possible

### Maintainability
- [ ] Version/date is included
- [ ] Cross-references use explicit paths
- [ ] No duplication of rules from other files (reference instead)

### Accessibility
- [ ] Rule itself is clearly written (someone unfamiliar could follow it)
- [ ] Technical terms are defined or linked to glossary
- [ ] File size is under 500 lines

---

## Quick Reference

**When writing a new rule:**
1. State the intent (why)
2. Write the rule (what)
3. Define the scope (where)
4. Provide examples (how)
5. Specify verification (check)
6. Document exceptions (unless)

**When organising rules:**
1. One concern per file
2. Foundations apply universally
3. Media-types are additive
4. Scenarios combine both
5. Entry point explains hierarchy

**When conflicts arise:**
1. Explicit precedence > implicit
2. Accessibility > aesthetics
3. Foundation > media-type
4. Specificity > generality
