## Consumption Contract for Kuat Mono

This repository is the canonical source for Equal Experts design and structural guidance.

### What this repo owns

- Brand principles and identity
- Foundations (color, typography, spacing, borders, accessibility baseline)
- Content voice/style guidance
- High-level web structure (marketing + product)
- Task-to-context loading guidance

### What kuat-mono owns

- Kuat component implementation architecture
- Package-specific API behavior (`@equal-experts/kuat-react`, `@equal-experts/kuat-vue`)
- Storybook/testing conventions and contributor workflow
- Agent pipeline details for implementation and verification

### Integration order for agents in kuat-mono

1. Load upstream rules from this repository.
2. Load local implementation overlays from kuat-mono.
3. Apply conflict policy:
   - design intent from upstream
   - implementation truth from kuat-mono

### Drift policy

Local repos may mirror quick reference values, but upstream remains the canonical source for foundations.