---
scope: type
platform: web_product
prerequisites: foundations, product/content/product-content.md
---

# Confirmations

When and how to write confirmation dialogs for destructive or high-impact actions.

---

## When to Use Confirmations

**Use for:**
- Destructive actions (delete, remove)
- Actions that can't be undone
- Actions with significant consequences

**Don't use for:**
- Actions easily undone
- Low-stakes decisions
- Frequent actions

---

## Confirmation Pattern

1. **Clear question or statement** – What is about to happen?
2. **Consequences** – What will be affected? (list if helpful)
3. **Irreversibility** – State if the action can't be undone
4. **Primary action** – Specific, verb-driven (e.g. "Delete permanently")
5. **Cancel** – "Cancel" or "Keep [item]"

---

## Example

```
Delete client account?

This will permanently delete [Client Name] and all associated:
- Invoices (12)
- Payments (8)
- Transaction history

You can't undo this action.

[Delete permanently]  [Cancel]
```

---

## Related

- [Product content](./product-content.md)
- [Actions](./actions.md)
