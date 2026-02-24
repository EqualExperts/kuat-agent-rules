---
scope: type
platform: web_product
prerequisites: foundations, foundations/content/voice-and-tone.md
---

# Product Content Guidelines

UX writing and content guidelines for Equal Experts web applications.

---

**Prerequisites:** Load [foundations](../../../../foundations/) first, especially [voice and tone](../../../../foundations/content/voice-and-tone.md).

---

## Overview

Product content is the text inside product interfaces, designed to help users complete tasks. It's more concise than marketing content and action-oriented.

**Core purpose:** Give users exactly what they need, exactly when they need it, to complete their task successfully.

**Tone:** Helpful, concise, action-oriented, respectful

---

## Product Voice Formula

`[Action] + [Object] + [Benefit if needed]`

**Examples:**
- "Save invoice" (action + object)
- "Export to CSV" (action + object + format)
- "Archive project · Free up space" (action + object · benefit)

---

## Key Differences from Marketing

| Aspect | Marketing | Product |
|--------|-----------|---------|
| Purpose | Persuade, inform | Enable task completion |
| Length | Can be expansive | Must be concise |
| Tone | Conversational | Action-oriented |
| Style | Storytelling | Direct, functional |
| Context | User chose to read | User is trying to do |

---

## Foundational Principles

### 1. Understand the Audience

Before writing, know:
- **Who** sees this? (All users? Specific segments?)
- **When** do they see it? (First login? After error?)
- **What** are they trying to do?
- **How** are they feeling? (Confident? Frustrated?)

### 2. Keep Users Focused

- Surface information at moment of need
- Don't make users remember for later
- Remove info when no longer relevant
- Avoid "just in case" content

### 3. Get to the Point

- Lead with most important information
- Remove filler words and phrases
- Every word should earn its place

**Common filler to remove:**
- "Please note that..."
- "At this time..."
- "In order to..."
- "You may wish to..."
- "It appears that..."

### 4. Make It Accessible

- Ensure proper heading hierarchy
- Write descriptive link text
- Provide alt text for images
- Keep form labels clear and persistent
- Error messages must be actionable

---

## Common Mistakes

| Mistake | Bad | Good |
|---------|-----|------|
| Explaining obvious | "Click the button below to continue" | [Continue] |
| Technical language | "Authentication failed for endpoint" | "We couldn't log you in" |
| Being vague | "An error occurred" | "Password must be 8+ characters" |
| Overusing exclamation | "Success! Invoice sent!" | "Invoice sent" |
| Apologizing unnecessarily | "Sorry, no results found" | "No results found" |
| Marketing speak | "Leverage our innovative AI-powered categorization" | "Auto-categorize expenses" |

---

## Product Content Checklist

**Context and Timing:**
- [ ] Content appears at right moment
- [ ] Information directly relevant
- [ ] Content disappears when not relevant

**Clarity and Conciseness:**
- [ ] Every word carries meaning
- [ ] As short as possible while clear
- [ ] Most important info first

**Usability:**
- [ ] Users can complete task without leaving for help
- [ ] Button labels describe action clearly
- [ ] Form labels clear and persistent
- [ ] Error messages explain problem and fix

**Accessibility:**
- [ ] Accessible to screen readers
- [ ] Labels connected to inputs
- [ ] Error messages associated with fields
- [ ] Logical heading hierarchy

---

## Related Documentation

- [Foundations content](../../../../foundations/content/README.md) - Voice, tone, style
- [Actions](./actions.md) - Buttons and links
- [Confirmations](./confirmations.md) - Confirmation dialogs
- [Empty states](./empty-states.md) - Empty state copy
- [Errors](./errors.md) - Error messages
- [Forms](./forms.md) - Form content
- [Design](../design.md) - Visual design guidelines
- [Component Decision Tree](../component-decision-tree.md) - Component development
