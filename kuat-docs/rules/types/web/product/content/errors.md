---
scope: type
platform: web_product
prerequisites: foundations, product/content/product-content.md
---

# Errors

How to write error messages that help users fix the problem.

---

## Error Message Formula

1. **What went wrong** – Be specific
2. **Why it happened** – If it helps the user (e.g. which field, what rule)
3. **How to fix it** – Actionable next step

---

## Do

- Be specific about the problem
- Use plain language
- Provide actionable next steps
- Take responsibility where appropriate ("We couldn't save..." rather than "You entered invalid data")

---

## Don't

- Blame the user
- Use technical jargon or error codes in the UI
- Be vague ("An error occurred")
- Leave the user without a next step

---

## Example

```
Can't save invoice

The customer email "john@example,com" has a comma instead of a period.

Fix the email address and try again.
```

---

## Related

- [Product content](./product-content.md)
- [Forms](./forms.md) – Validation messages
