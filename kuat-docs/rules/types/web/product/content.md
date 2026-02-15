---
scope: type
platform: web_product
prerequisites: general, general/content.md
---

# Product Content Guidelines

UX writing and content guidelines for Equal Experts web applications.

---

**Prerequisites:** Load [general rules](../../../general/) first, especially [content.md](../../../general/content.md).

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

## Content Patterns

### Actions (Buttons and Links)

**Do:**
- Use verb-driven labels
- Be specific about what happens
- Keep labels short (1-3 words ideal)
- Use sentence case

**Don't:**
- Use vague labels like "OK" or "Submit"
- Make labels overly long
- Use ALL CAPS
- Include instructions in button labels

**Good examples:**
- [Save and close]
- [Delete expense]
- [Send invoice now]
- [Connect bank]

**Bad examples:**
- [OK] (ambiguous)
- [SUBMIT FORM NOW] (shouty, vague)
- [Click here to continue] (generic)

### Confirmations

**Use for:**
- Destructive actions (delete, remove)
- Actions that can't be undone
- Actions with significant consequences

**Don't use for:**
- Actions easily undone
- Low-stakes decisions
- Frequent actions

**Good confirmation:**
```
Delete client account?

This will permanently delete [Client Name] and all associated:
- Invoices (12)
- Payments (8)
- Transaction history

You can't undo this action.

[Delete permanently]  [Cancel]
```

### Empty States

**Do:**
- Explain why the state is empty
- Provide clear next action
- Use positive, encouraging tone

**Good example:**
```
No invoices yet

Create your first invoice to get paid faster.
It takes less than 2 minutes.

[Create invoice]
```

### Errors

**Error formula:**
1. What went wrong (specific)
2. Why it happened (if helpful)
3. How to fix it (actionable)

**Do:**
- Be specific about the problem
- Use plain language
- Provide actionable next steps
- Take responsibility ("We couldn't save...")

**Don't:**
- Blame the user
- Use technical jargon or error codes
- Be vague
- Leave user without next step

**Good error:**
```
Can't save invoice

The customer email "john@example,com" has a comma instead of a period.

Fix the email address and try again.
```

### Form Fields

**Do:**
- Always use a label (not just placeholder)
- Keep labels short and clear
- Use sentence case
- Position labels above fields

**Don't:**
- Use placeholder as only label
- Make labels overly long
- Hide labels on focus

### Mobile

- Cut content by 50% compared to desktop
- Front-load important information
- Use progressive disclosure
- Test on actual devices

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

- [General Content Guidelines](../../../general/content.md) - Universal principles
- [Design Rules](./design.md) - Visual design guidelines
- [Component Decision Tree](./component-decision-tree.md) - Component development
