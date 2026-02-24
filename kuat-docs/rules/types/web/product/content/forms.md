---
scope: type
platform: web_product
prerequisites: foundations, product/content/product-content.md
---

# Forms

Content guidance for forms: labels, placeholders, helper text, validation, and structure.

---

## Labels

**Do:**
- Always use a visible label (not only a placeholder)
- Keep labels short and clear
- Use sentence case
- Position labels above fields (or consistent with your design system)

**Don't:**
- Use placeholder as the only label (placeholders disappear on focus and aren’t always read by assistive tech)
- Make labels overly long
- Hide labels on focus

---

## Placeholders

- Use for short hints or examples (e.g. "e.g. name@example.com")
- Don’t put critical instructions only in placeholders
- Keep placeholder text brief; move longer guidance to helper text

---

## Helper Text

- Use for optional instructions, format requirements, or context
- Place below the field or with the label
- Keep it concise; link to full help if needed

---

## Validation Messages

- Show validation at the right time (e.g. on blur or submit, depending on pattern)
- Be specific: "Password must be at least 8 characters" not "Invalid password"
- Tie the message to the field (inline or next to the field) so users know what to fix
- See [Errors](./errors.md) for the problem–cause–fix pattern

---

## Form Structure

- Group related fields (e.g. contact details, payment)
- Use clear section headings for long forms
- Order fields in a logical flow (e.g. match the user’s mental model or task order)
- Use progressive disclosure for optional or advanced fields so the form doesn’t feel overwhelming

---

## Mobile

- Keep form copy short; every word counts on small screens
- Consider shorter labels or stacked layout if space is tight
- Ensure tap targets and font sizes meet accessibility guidelines

---

## Related

- [Product content](./product-content.md)
- [Errors](./errors.md)
- [Foundations accessibility](../../../../foundations/accessibility.md)
