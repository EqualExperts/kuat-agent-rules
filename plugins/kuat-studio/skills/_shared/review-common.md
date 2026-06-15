# Common review checklist (shared)

Brand + accessibility core that applies to **every** review intent (web, slides, imagery). Pair with the medium-specific checklist in the calling skill. Cite the `reference/...` file + section for each finding.

## Brand compliance (all depths)

- [ ] Colours from the approved palette / semantic tokens — no arbitrary hex ([../../reference/design-language/colours.md](${CLAUDE_PLUGIN_ROOT}/reference/design-language/colours.md))
- [ ] Typography uses the defined scale and roles ([../../reference/design-language/typography.md](${CLAUDE_PLUGIN_ROOT}/reference/design-language/typography.md))
- [ ] Spacing follows the 4px grid ([../../reference/design-language/spacing.md](${CLAUDE_PLUGIN_ROOT}/reference/design-language/spacing.md))
- [ ] Border radius matches the rule: 0px static, 6px interactive, 4px inputs ([../../reference/design-language/borders.md](${CLAUDE_PLUGIN_ROOT}/reference/design-language/borders.md))
- [ ] Logo usage follows [../../reference/brand/logo.md](${CLAUDE_PLUGIN_ROOT}/reference/brand/logo.md) (no recolour, distortion, effects, or busy backing)

## Accessibility (all depths)

- [ ] Single logical H1 / page-title per view; sequential heading hierarchy
- [ ] Text contrast meets WCAG AA (4.5:1 body, 3:1 large text / UI / graphics)
- [ ] Focus states visible for keyboard users; controls have accessible names
- [ ] Non-decorative images have descriptive alt text; decorative images use `alt=""`

Full requirements: [../../reference/accessibility/accessibility.md](${CLAUDE_PLUGIN_ROOT}/reference/accessibility/accessibility.md).

## Severity & reporting

Map failures to severity (Critical / Major / Minor) and the chosen output format — see [report-formats.md](./report-formats.md). Flag any rule-vs-request conflict in the output rather than silently breaking the rule.
