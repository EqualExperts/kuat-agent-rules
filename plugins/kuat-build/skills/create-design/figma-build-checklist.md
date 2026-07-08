# Figma Build Checklist

Verification checklist for any Figma build that claims to follow a design system — run it at the
start of a build (Step 0) and again before handoff (Steps 1-5). It applies whether the target system
is Kuat or a different client's own library; nothing here assumes Kuat by default.

There is no persisted component/variable registry to keep in sync. Discovery is done live, in full,
every request — Step 1 is what replaces a registry.

---

## Step 0 — Context gate (run first, every session)

Normally satisfied by [figma-build-intake](${CLAUDE_PLUGIN_ROOT}/skills/figma-build-intake/SKILL.md), which runs before Figma's
own skills are invoked. Re-confirm here if that skill wasn't run for some reason:

- [ ] Confirm which design system is in scope before touching the canvas: Equal Experts / Kuat, or a
      different client or project's own system.
- [ ] **If Kuat:** use the Kuat2 file and the tokens/patterns in [reference/media-types/web-product/design.md](${CLAUDE_PLUGIN_ROOT}/reference/media-types/web-product/design.md).
- [ ] **If not Kuat:** do not default to Kuat components, tokens, colours, or layout rules. Discover
      the target file's own components and variables using Step 1 below, the same way.
- Kuat defaults are never applied automatically outside EE/Kuat work. Treat this as a hard stop, not
  a preference — ask if it isn't already stated.

## Step 1 — Discovery completeness

- [ ] List every distinct UI element the build needs before writing a single node — not just the
      obvious primitives (button, input, select) but the full set: badges/chips, avatars,
      checkboxes/toggles, dividers, icons, tables, tooltips, empty states, and anything else the
      source calls for.
- [ ] For each element, attempt resolution in order: Code Connect → inspect an existing screen in the
      target file → `search_design_system`. Record a result for **every** line item — resolved (with
      key) or confirmed absent — before building.
- [ ] Don't stop once the obvious elements resolve. A partially-resolved list is not a finished
      discovery pass.

## Step 2 — Token binding

- [ ] Every fill, stroke, spacing, and radius value is bound to a real variable from the target file
      — never a literal hex or pixel value.
- [ ] Every text node uses a real text style from the target file (`node.textStyleId`) — never a
      hardcoded font family/size/weight (e.g. defaulting to Inter) standing in for the system's actual
      type styles.
- [ ] Any value that can't be bound, because no matching variable or text style exists, is flagged
      explicitly in the handoff notes rather than silently hardcoded.

## Step 3 — Component fidelity

- [ ] Every element uses a real component instance where one exists in the target library.
- [ ] Manually constructed elements (shapes or text standing in for a component) are used only when
      Step 1 confirmed no equivalent component exists, and each one is named and flagged in the
      handoff notes.

## Step 4 — Composition honesty

- [ ] State plainly whether the overall layout is copied from an existing on-system screen or newly
      composed from on-system parts. "Built from on-system components" and "matches an existing
      on-system layout" are different claims — don't conflate them.

## Step 5 — Pre-handoff self-audit

- [ ] Re-scan the finished build for: unbound colours/spacing, non-component shapes duplicating an
      available component, and anything skipped in Step 1.
- [ ] Report gaps in the handoff message — the component wanted, why it wasn't resolved, what was
      used instead — rather than shipping silently.

## Related

- [claude-design-build-checklist](./claude-design-build-checklist.md) - equivalent checklist for the Claude Design route
- [create-web-app](${CLAUDE_PLUGIN_ROOT}/skills/create-web-app/SKILL.md) - invokes this checklist for Figma deliverables
- [intake](${CLAUDE_PLUGIN_ROOT}/skills/_shared/intake.md) - shared intake, run before this checklist
