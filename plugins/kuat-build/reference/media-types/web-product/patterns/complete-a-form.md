# Help users to complete a form

**User goal:** Complete a form efficiently — understand what's needed, correct mistakes easily, and not
lose work in progress.

> **Pattern:** *Help users to…* · single-medium (web-product) — concept and implementation together.
> Covers forms, settings pages, multi-step wizards, and data entry interfaces.

## Context

Forms are where users hand over information to get something done, and every field is friction between
them and their task. They want to complete the task efficiently, understand what each field needs and
why, fix errors without re-entering data, and trust that their progress won't be lost. This covers
public forms, app settings, multi-step wizards, and inline data entry.

## Principles

| Principle | Implementation |
|-----------|----------------|
| Minimal friction | Only ask for necessary information |
| Clear expectations | Explain what each field needs |
| Helpful feedback | Specific, actionable error messages |
| Progress preservation | Save work, confirm destructive actions |

Success shows up as: form completion rate, time to complete, error rate and recovery, and abandonment rate.

## Solution in web-product

### Layout

**Base Layout:** Varies by context

| Context | Recommended Layout |
|---------|-------------------|
| Public forms (contact, signup) | Single Column |
| App settings | Sidebar Navigation |
| Multi-step wizards | Single Column or Horizontal Navigation |
| Inline editing | Within parent layout |

#### Card-Based Form (Settings, Profile)

```
┌─────────────────────────────────────┐
│ Card Header: Section Title          │
├─────────────────────────────────────┤
│ Form Fields                         │
│ ...                                 │
├─────────────────────────────────────┤
│ Card Footer:       [Cancel] [Save]  │
└─────────────────────────────────────┘
```

#### Multi-Step Wizard

```
┌─────────────────────────────────────┐
│ Progress: ●───●───○───○             │
├─────────────────────────────────────┤
│ Step Title                          │
│ Step description                    │
├─────────────────────────────────────┤
│                                     │
│ Form Fields for Current Step        │
│                                     │
├─────────────────────────────────────┤
│ [Back]                    [Next →]  │
└─────────────────────────────────────┘
```

#### Specifications

| Element | Value |
|---------|-------|
| Form card max-width | 600px (single-column forms) |
| Card padding | 24px (`p-6`) |
| Field spacing | 24px (`space-y-6`) |
| Section spacing | 32px between cards |
| Settings page max-width | 800px |

### Design

#### Color Tokens

| Element | Token |
|---------|-------|
| Card background | `bg-card` |
| Card border | `border` |
| Input background | `bg-background` |
| Input border | `border-input` |
| Input focus | `ring-ring` |
| Error state | `border-destructive`, `text-destructive` |
| Success indicator | `text-green-600` |

#### Typography

| Element | Style |
|---------|-------|
| Section title | `text-lg font-semibold` |
| Section description | `text-sm text-muted-foreground` |
| Field label | `text-sm font-medium` |
| Input text | `text-base` |
| Helper text | `text-sm text-muted-foreground` |
| Error text | `text-sm text-destructive` |
| Required indicator | `text-destructive` (asterisk) |

#### Spacing

| Element | Value |
|---------|-------|
| Label to input | 8px |
| Input to helper/error | 4px |
| Between fields | 24px |
| Button group gap | 16px |

### Content

#### Field Labels

| Requirement | Example |
|-------------|---------|
| Clear and specific | "Email address" not "Email" |
| Required indicator | "Email address *" |
| Optional indicator | "Phone number (optional)" |

#### Helper Text

Use to:
- Explain format requirements
- Provide examples
- Clarify why information is needed

```
Email address *
[                                    ]
We'll send your receipt to this address.
```

#### Error Messages

| Quality | Bad | Good |
|---------|-----|------|
| Specific | "Invalid input" | "Email must include @ symbol" |
| Actionable | "Error" | "Please enter a valid date (DD/MM/YYYY)" |
| Polite | "Wrong!" | "Please check this field" |

#### Button Labels

| Action | Label |
|--------|-------|
| Submit form | "Save changes", "Submit", "Create account" |
| Go to next step | "Next", "Continue" |
| Go back | "Back", "Previous" |
| Cancel | "Cancel", "Discard changes" |
| Delete | "Delete", "Remove" |

### Accessibility

**Base requirements:** See [accessibility foundations](../../../accessibility/accessibility.md) and [web accessibility](../accessibility.md)

**Scenario-specific:**

| Requirement | Implementation |
|-------------|----------------|
| Labels | Every input has visible, associated `<label>` |
| Required fields | Marked with asterisk AND `aria-required` |
| Error linking | Errors linked via `aria-describedby` |
| Error summary | Summary at top with links to fields |
| Focus management | Focus first error after failed submission |
| No time limits | Allow unlimited time (or generous extension) |

#### Form Validation Pattern

**Critical: Validate on submit, not on blur**

| Rule | Implementation |
|------|----------------|
| Validate on submit | Show all errors after form submission |
| Never disable submit | Users can always attempt submission |
| No blur validation | Don't show errors while user is typing |
| Error summary | Show summary above form with field links |
| Focus first error | Move focus to first invalid field |

#### Grouping

Use `<fieldset>` and `<legend>` for:
- Radio button groups
- Checkbox groups
- Related fields (e.g., address components)

### Implementation

#### Field Layout Patterns

**Vertical (Default):**

```
Label
[Input field                    ]
Helper text or error
```

Best for: Most forms, mobile-first

**Horizontal (Settings):**

```
Label                [Input field        ]
Description text
```

Best for: Settings pages with many fields

**Grid (Related Fields):**

```
[First Name     ] [Last Name      ]
[Email                            ]
[Phone          ] [Extension      ]
```

Best for: Related fields (names, addresses)

#### Button Placement

**Component guide:** `shadcn:button` — the `components/button.md` guide for button behaviour lives in the consumer package `agent-docs/` or overlay (see [component-registry.md](../component-registry.md)).

**Single Form:**

| Position | Button | Variant |
|----------|--------|---------|
| Right | Submit/Save | `variant="default"` (primary) |
| Left of submit | Cancel | `variant="outline"` or `ghost` |
| Far left or separate | Delete | `variant="destructive"` |

**Form in Modal:**

| Position | Button |
|----------|--------|
| Left | Cancel |
| Right | Submit |

**Multi-step Wizard:**

| Position | Button |
|----------|--------|
| Left | Back (`variant="outline"`) |
| Right | Next/Submit (`variant="default"`) |

#### Settings Page Pattern

Multiple card sections, each independently saveable:

```
┌─ Profile Information ───────────────┐
│ [Fields...]                         │
│                          [Save]     │
└─────────────────────────────────────┘
        ↓ 32px gap
┌─ Notification Preferences ──────────┐
│ [Fields...]                         │
│                          [Save]     │
└─────────────────────────────────────┘
```

| Element | Specification |
|---------|---------------|
| Section gap | 32px |
| Section max-width | 800px |
| Alignment | Left-aligned (not centered) |

#### Multi-Step Wizard Pattern

**Progress Indicator:**

- Show step numbers or names
- Highlight: completed, current, upcoming
- Allow clicking completed steps to go back

**Step Transitions:**

- Validate current step before "Next"
- Show summary on final step before submit
- Preserve data when going back

**State Management:**

- Save progress to prevent data loss
- Warn before leaving with unsaved changes
- Handle session timeout gracefully

#### Responsive Behavior

| Breakpoint | Grid Fields | Button Layout |
|------------|-------------|---------------|
| Mobile | Stack to single column | Stack vertically |
| Tablet | 2 columns | Horizontal |
| Desktop | As designed | Horizontal |

## Best Practices

### Do's

1. **Ask only what's needed** - Every field should be justified
2. **Group related fields** - Logical sections aid completion
3. **Show progress** - Especially for long/multi-step forms
4. **Preserve input** - Never clear on error
5. **Confirm success** - Toast, redirect, or inline confirmation
6. **Autosave where possible** - Drafts, settings

### Don'ts

1. **Don't validate on blur** - Interrupts user flow
2. **Don't disable submit** - Users should always try
3. **Don't use placeholders as labels** - They disappear
4. **Don't require confirmation for simple saves** - Only for destructive actions
5. **Don't hide required indicators** - Make them obvious

### Common Mistakes

| Mistake | Solution |
|---------|----------|
| Disabling submit button | Keep enabled, show errors on submit |
| Blur validation | Validate on submit only |
| Placeholder-only labels | Always use visible labels |
| Vague errors | Specific, actionable messages |
| No error summary | Add summary at top with links |
| Clearing form on error | Preserve all user input |

### Edge Cases

| Case | Handling |
|------|----------|
| Very long forms | Break into steps or sections |
| Conditional fields | Show/hide smoothly, don't lose data |
| File uploads | Show progress, handle failures |
| Unsaved changes | Warn before navigation |
| Session timeout | Save draft, prompt re-auth |
| Network failure | Queue submission, retry automatically |

## Examples

The card-based form above (600px max-width, section title in the header, fields stacked with 24px
spacing, and `[Cancel] [Save]` in the footer) is the canonical mid-fidelity frame. The same frame
scales up to independently saveable settings sections and, with a progress indicator and Back / Next
controls, to multi-step wizards.

## Related

- [Product Design](../design.md) - Layout options
- [Web Accessibility](../accessibility.md) - Form validation pattern
- [Help users to sign in](./sign-in.md) - Login/registration forms
