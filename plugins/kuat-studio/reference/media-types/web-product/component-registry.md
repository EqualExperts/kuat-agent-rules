# Component registry

Stable IDs link patterns and checklists to per-component guides in the implementation overlay or npm `agent-docs/`. Component docs live as `components/{slug}.md` in the consumer package `agent-docs/` or overlay, resolved via `components.manifest.json`. The slug is the ID without its namespace prefix (`shadcn:button` → `button`).

---

## Registry (pilot)

| ID | Display name | Source | Overlay / package doc | Upstream refs |
|----|--------------|--------|----------------------|---------------|
| `shadcn:button` | Button | shadcn CLI + `kuat-core` theme | `components/button.md` | [forms](./patterns/forms.md), [authentication](./patterns/authentication.md), [content/actions](./content/actions.md) |
| `kuat:button-group` | ButtonGroup | `@equal-experts/kuat-react` / `kuat-vue` | `components/button-group.md` | [component-decision-tree](./component-decision-tree.md) |
| `kuat:kuat-header` | KuatHeader | `@equal-experts/kuat-react` / `kuat-vue` block | `components/kuat-header.md` | [component-decision-tree](./component-decision-tree.md), [design](./design.md) |

Expand this table in `kuat-mono` as component docs are added. Keep IDs stable; add new rows rather than renaming IDs.

---

## ID conventions

| Prefix | Meaning | Example |
|--------|---------|---------|
| `kuat:` | Exported from Kuat packages or Kuat-specific | `kuat:button-group` |
| `shadcn:` | App-installed shadcn primitive, EE-themed via kuat-core | `shadcn:dialog` |
| `kuat:kuat-*` | Kuat blocks (compositions) | `kuat:kuat-header` |

---

## Manifest shape (downstream)

```json
{
  "components": {
    "shadcn:button": {
      "path": "components/button.md",
      "sources": ["shadcn:button", "@equal-experts/kuat-core"]
    }
  }
}
```

Authoritative manifest lives in `kuat-mono` and is published inside each package `agent-docs/`.

---

## Related

- [component-decision-tree.md](./component-decision-tree.md)
- consumption-architecture.md
