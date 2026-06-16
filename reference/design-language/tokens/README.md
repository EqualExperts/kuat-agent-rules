# Design tokens — source of truth

This folder holds the **canonical design tokens** for the Equal Experts design system, **upstream** in `kuat-agent-rules`. It is the single source of truth; everything else is generated from it.

- **`colors.tokens.json`** — brand colour palettes (EE Blue, Tech Blue, Transform Teal, Equal Ember) + aliases, in [W3C Design Tokens](https://tr.designtokens.org/format/) format. `$value` is hex; OKLCH is preserved in `$extensions`.

## Generated artifacts (do not hand-edit — regenerate from here)

| Artifact | Repo | Note |
|----------|------|------|
| `reference/design-language/colours.md` | kuat-agent-rules | human-readable mirror |
| `@equal-experts/kuat-core` `src/variables.css` | kuat-mono (**downstream**) | CSS implementation; consumes these tokens via the upstream→mono sync |

## Rules

- **Change colours here, then regenerate.** Never hand-edit `colours.md` or `variables.css` — they drift (that's how EE Blue became `#0066CC`). A CI drift check should fail if a generated artifact diverges from these tokens.
- **Direction is one-way:** tokens (upstream) → `colours.md` + kuat-core (downstream). Never generate these tokens *from* kuat-core.
- **Support scales** (slate/red/indigo) are not brand colours and live only in kuat-core.

*(Generation scripts + CI check are part of Phase 4S — see `docs/migration/phase-studio-asset-pack.md`. Until they exist, these tokens are the authority and `colours.md` is kept in sync by hand.)*
