# Output — create-imagery · Brief C1 (icon set)

**Skill run:** create-imagery (Icon Designer role) · **Reference ref:** local working copy · **Date:** 2026-06-15

## Role + spec

> "You are a professional Icon Designer for Equal Experts…" — 24×24, single brand colour (`currentColor` so it inherits a token), unified **2px** stroke, round caps/joins, consistent geometry across the set.

## Artifact — 3 icons (alert, retry, settings)

```svg
<!-- alert -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Alert">
  <path d="M12 3 22 20 2 20Z"/><path d="M12 10v4"/><path d="M12 17h.01"/>
</svg>

<!-- retry -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Retry">
  <path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v4h-4"/>
</svg>

<!-- settings -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Settings">
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>
</svg>
```

## Light quality & accessibility check (rubric)

| Area | Result |
|------|--------|
| Technical quality | ✅ vector (resolution-independent); clean geometry |
| Consistency | ✅ 24×24 grid; uniform 2px stroke; round caps/joins across all three |
| Brand colour | ✅ `currentColor` → inherits a single brand token (no hardcoded hex) |
| Accessibility | ✅ meaningful icons carry `role="img"` + `aria-label`; decorative use would set `aria-hidden` instead |
| No fictional/AR motifs | ✅ standard UI symbols |
| Version stamp | ✅ header above |

**Verdict: PASS.** Set is consistent and on-brand; single-colour, token-friendly, accessible.
