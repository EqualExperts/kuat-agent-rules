# Authentication Scenarios

Patterns for login, registration, password flows, and account verification.

---

## Principles

### User Goals

- **Get in quickly** - Authentication is a barrier to the actual task
- **Feel secure** - Trust that credentials are protected
- **Recover easily** - Forgot password shouldn't be frustrating

### UX Principles

| Principle | Implementation |
|-----------|----------------|
| Minimise friction | Only ask for essential information |
| Clear feedback | Immediate, helpful error messages |
| Maintain trust | Security indicators, clear privacy info |
| Support recovery | Easy password reset, account recovery |

### Success Metrics

- Time to complete login/registration
- Password reset completion rate
- Error rate and recovery success
- Abandonment rate

---

## Layout

**Base Layout:** Single Column

Authentication pages should minimise distraction and focus users on the task.

### Page Structure

```
┌─────────────────────────────────────────┐
│            [Logo] (centered)            │
├─────────────────────────────────────────┤
│                                         │
│     ┌─────────────────────────┐         │
│     │      Auth Card          │         │
│     │      (max 400px)        │         │
│     │                         │         │
│     │  [Form Fields]          │         │
│     │                         │         │
│     │  [Primary Action]       │         │
│     │                         │         │
│     │  [Secondary Link]       │         │
│     └─────────────────────────┘         │
│                                         │
├─────────────────────────────────────────┤
│     Footer (minimal: legal links)       │
└─────────────────────────────────────────┘
```

### Specifications

| Element | Value |
|---------|-------|
| Content alignment | Centered (vertical + horizontal) |
| Card max-width | 400px |
| Card padding | 32px (`p-8`) |
| Card background | `bg-card` with `border` |
| Card radius | 6px (interactive element) |
| Minimum viewport height | 100vh |
| Logo placement | Centered above card, or inside card header |

### Header

- **Minimal navigation** - Logo only, no full navigation
- Logo links to marketing site or app home
- No distracting elements

### Footer

- Minimal: legal links only (Privacy Policy, Terms)
- Copyright notice optional
- No marketing content

---

## Design

### Color Tokens

| Element | Token |
|---------|-------|
| Page background | `bg-background` or `bg-muted` |
| Card background | `bg-card` |
| Card border | `border` |
| Primary button | `bg-primary` |
| Error text | `text-destructive` |
| Link text | `text-primary` |

### Typography

| Element | Style |
|---------|-------|
| Page heading | `text-2xl font-bold` |
| Subheading | `text-muted-foreground` |
| Labels | `text-sm font-medium` |
| Input text | `text-base` |
| Error messages | `text-sm text-destructive` |
| Links | `text-sm text-primary underline` |

### Spacing

| Element | Spacing |
|---------|---------|
| Between fields | 24px (`space-y-6`) |
| Label to input | 8px |
| Input to error | 4px |
| Form to button | 24px |
| Button to secondary link | 16px |

---

## Content

### Login Page

**Required Elements:**

1. Logo (centered above card or in card header)
2. Heading: "Sign in" or "Welcome back"
3. Email/username field with label
4. Password field with show/hide toggle
5. "Forgot password?" link (below password field, right-aligned)
6. Primary submit button (full width)
7. Secondary action: "Don't have an account? Sign up"

**Microcopy:**

| Element | Example |
|---------|---------|
| Heading | "Sign in to your account" |
| Email label | "Email address" |
| Password label | "Password" |
| Submit button | "Sign in" |
| Forgot link | "Forgot your password?" |
| Register link | "Don't have an account? Sign up" |

### Registration Page

**Required Elements:**

1. Logo
2. Heading: "Create account" or "Get started"
3. Name field(s) - first/last or full name
4. Email field
5. Password field with strength indicator
6. Terms acceptance checkbox
7. Primary submit button
8. Secondary: "Already have an account? Sign in"

**Password Requirements Display:**

- Show requirements list below password field
- Check/uncheck as requirements are met
- Unmet: `text-muted-foreground`
- Met: `text-green-600` with checkmark

### Password Reset Flow

**Step 1: Request Reset**

- Email field only
- "Send reset link" button
- Success message (don't reveal if email exists)

**Step 2: Reset Password**

- New password field
- Confirm password field
- Password requirements visible
- "Reset password" button

### MFA / Code Entry

- 6-digit code input (individual boxes or single field)
- "Resend code" link with countdown timer
- "Use different method" secondary action
- Clear instructions on where code was sent

---

## Accessibility

**Base requirements:** See [general accessibility](../../../../general/accessibility.md) and [web accessibility](../accessibility.md)

**Scenario-specific:**

| Requirement | Implementation |
|-------------|----------------|
| Focus first field | Auto-focus email/username on page load |
| Form labels | All inputs have visible, associated labels |
| Error linking | Use `aria-describedby` for error messages |
| Submit on Enter | Form submits when Enter pressed in any field |
| Password toggle | Toggle button is keyboard accessible |
| Error announcement | Screen reader announces errors on submit |

### Form Validation

Follow the standard validation pattern:

- **Validate on submit** - Show all errors after submission attempt
- **Never disable submit button** - Users can always attempt submission
- **No inline validation on blur** - Don't interrupt mid-flow
- **Error summary** - Show summary at top with links to fields
- **Focus first error** - Move focus to first invalid field

---

## Implementation

### Button Placement

| Button | Position | Variant |
|--------|----------|---------|
| Primary (Submit) | Full width | `variant="default"` |
| Secondary link | Below button, centered | Text link |
| Forgot password | Below password field, right | Text link |

### Error States

| Error Type | Display Location |
|------------|-----------------|
| Field validation | Inline, below field |
| Invalid credentials | Alert above form |
| Rate limiting | Alert above form with wait time |
| Network error | Alert above form with retry option |

### Security Considerations

| Requirement | Implementation |
|-------------|----------------|
| Don't reveal email existence | Generic "check your email" messages |
| Rate limit attempts | Show user-friendly wait message |
| Password visibility | Toggle with clear state indication |
| Session timeout | Warn before logging out |

### Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Card padding reduced to 24px, full width with margin |
| Tablet | Centered card, 400px max |
| Desktop | Centered card, 400px max |

---

## Best Practices

### Do's

1. **Keep forms minimal** - Only required fields
2. **Show password option** - Let users verify their input
3. **Persist email** - Remember email for returning users (with consent)
4. **Clear success states** - Confirm successful actions
5. **Offer alternatives** - Social login, SSO where appropriate

### Don'ts

1. **Don't use CAPTCHAs** as first defense - Use rate limiting first
2. **Don't reveal** whether an email exists in the system
3. **Don't require** password confirmation on login
4. **Don't auto-submit** on field completion
5. **Don't clear form** on error - Preserve user input

### Common Mistakes

| Mistake | Solution |
|---------|----------|
| Disabling submit button | Always allow submission attempts |
| Inline blur validation | Validate on submit only |
| Vague errors ("Invalid input") | Specific, actionable messages |
| No password visibility toggle | Always include toggle |
| Missing forgot password | Prominent link near password field |

### Edge Cases

| Case | Handling |
|------|----------|
| Expired password reset link | Clear message with option to request new link |
| Account locked | Explain why, provide recovery path |
| Email not verified | Offer to resend verification |
| Session expired mid-flow | Preserve form data, prompt re-authentication |

---

## Related Documentation

- [Product Design](../design.md) - Layout patterns
- [Web Accessibility](../accessibility.md) - Form validation pattern
- [Forms Scenario](./forms.md) - General form patterns
