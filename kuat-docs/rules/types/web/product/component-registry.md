---
scope: type
platform: web_product
prerequisites: foundations, component-decision-tree.md
---

# Component registry

Stable IDs link upstream scenarios and checklists to per-component guides in the implementation overlay or npm `agent-docs/`.

---

## How to use

1. Scenario or checklist cites an ID (e.g. `shadcn:button`).
2. Resolve via `components.manifest.json`:
   - Package: `node_modules/@equal-experts/kuat-react/agent-docs/components.manifest.json`
   - Overlay: `{KUAT_RULES_OVERLAY_PATH}/components.manifest.json`
3. Load `components/{slug}.md` from the manifest `path` field.

**Slug:** ID without namespace prefix (`shadcn:button` → `button`).

---

## Registry (pilot)

| ID | Display name | Source | Overlay / package doc | Upstream refs |
|----|--------------|--------|----------------------|---------------|
| `shadcn:button` | Button | shadcn CLI + `kuat-core` theme | `components/button.md` | [forms](./scenarios/forms.md), [authentication](./scenarios/authentication.md), [content/actions](./content/actions.md) |
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
- [consumption-architecture.md](../../../../setup/consumption-architecture.md)
- [DEPRECATIONS.md](./DEPRECATIONS.md)
