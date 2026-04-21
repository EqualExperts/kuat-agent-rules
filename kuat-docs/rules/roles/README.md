# Role Cards

Reusable role personas and default output specs for Equal Experts prompting scenarios. Use with [LOADING.md](../LOADING.md) to assemble prompts: load the role card first (or as the first instruction block), then foundations, then type-specific rules.

---

## Role cards

| Role | File | Task types |
|------|------|------------|
| Technical Illustrator | [technical-illustrator.md](./technical-illustrator.md) | infographics |
| Icon Designer | [icon-designer.md](./icon-designer.md) | icons |

---

## Task type → role (dispatcher)

Use this table to choose which role card to load for a given task type.

| Task type / scenario | Role card | Signals |
|---------------------|-----------|---------|
| Infographic (process flow, comparison, timeline, statistical, hierarchical) | [technical-illustrator.md](./technical-illustrator.md) | Single 16:9 visual; data/information design; often 2K; reference files expected |
| Icon (single symbol, set, or small graphic) | [icon-designer.md](./icon-designer.md) | Small format (e.g. 24×24); line/icon style; no long-form copy |
| Marketing page / landing / blog | (TBD) | Public-facing; conversion/content; full page layout |
| Web product (app UI, forms, dashboards) | (TBD) | Application screens; components; product content |
| Photography (selection or brief) | (TBD) | Real imagery; people-focused; B&W; EE sources |

**Decision signals:** Infographic = one primary visual (chart/diagram/flow), often with a headline/caption. Marketing page = full page layout, multiple sections, CTAs, narrative. Icons = small, symbolic, often in a set.

---

## How to use

1. Determine the task type (e.g. infographic, icon) using the rubric above.
2. Load the role card for that task type first (or inject it as the first instruction block when assembling the prompt).
3. Load required foundations per [LOADING.md](../LOADING.md).
4. Load the type-specific rules for the task (e.g. `types/graphics/infographics.md`).

Type-specific files link to their required role in the header (e.g. **Required role:** [Technical Illustrator](./technical-illustrator.md)).

---

## Related

- [LOADING.md](../LOADING.md) – Task → foundations and type-specific paths; load order
- [rules/README.md](../README.md) – Rules structure overview
