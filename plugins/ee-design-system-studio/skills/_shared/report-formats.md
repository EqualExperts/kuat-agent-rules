# Review output formats

Ask the user to select one format before producing findings. Default to `full_report` only if they decline to choose.

| Format | Use when |
|--------|----------|
| `full_report` | Structured Markdown (sections below) |
| `checklist_only` | Pass/fail by rule group |
| `violations_only` | Prioritized fix list (Critical / Major / Minor) |
| `inline_annotations` | Screen-by-screen or slide-by-slide notes in thread |
| `executive_summary` | Short narrative + top 3–5 risks |

## full_report sections

1. **Summary** — Scope, review depth, context received/missing, overall status, high-risk gaps
2. **Checklist** (optional) — Rule/Group | Status (Pass/Fail/Partial/N/A) | Notes
3. **Violations** — Severity | Rule | Evidence | Location | Fix
4. **Recommendations** — Non-blocking improvements; cite rule file
5. **Product/UX notes** — When depth ≥ `product_ux` and context supplied; else N/A with reason
6. **Open questions** — Missing context or artifacts
7. **References** — Rules files used + `RULES_REF` from ensure-rules

## Severity

| Severity | Definition |
|----------|------------|
| **Critical** | Brand or accessibility violations that must be fixed before release |
| **Major** | Clear rule breaks with user-facing impact |
| **Minor** | Nits, inconsistencies, or polish gaps |
