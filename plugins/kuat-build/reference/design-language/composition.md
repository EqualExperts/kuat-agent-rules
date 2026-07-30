# Composition & Craft

Companion to [spacing.md](./spacing.md) and [typography.md](./typography.md). Those files define
the units — the scale, the ramp. This file defines the **medium-agnostic principles** governing how
units combine into a considered layout. It intentionally does not prescribe numbers, densities, or
defaults for any specific medium — those live in each medium's own reference file (see
[Medium specialization](#medium-specialization) below), the same way `spacing.md`'s 4px scale is
specialized differently by web marketing's hero padding vs web product's content padding.

A layout can use correct tokens, real components, and accessible contrast and still read as generic.
Genericness is a composition failure, not a token failure — these principles name what "considered"
means so it can be checked, not just felt.

---

## Focal hierarchy

Every screen or section has one clear focal point at first glance, established by a deliberate
combination of size, weight, position, and whitespace — not by colour alone and not by making
everything the same visual weight. A layout where five elements compete for attention equally has
no hierarchy, regardless of whether each element individually uses correct tokens.

**Why:** a viewer should be able to say what a screen is *for* within a second, without reading
every line of copy.

## Whitespace as an active tool, not a minimum

The spacing scale sets the unit; how generously that scale is spent is a separate, deliberate
decision — not always the smallest value that satisfies the grid, and not always the largest either.
Which end of that range is correct is medium- and content-dependent (see
[Medium specialization](#medium-specialization)): dense, minimum-spacing layouts are the right
choice for some content; generous spacing is the right choice for other content. Neither is a
universal default.

## Scale contrast

Distinctiveness comes from deliberate contrast between hierarchy levels — size, weight, and spacing
moving together, not just a colour or a border. A heading one step up in the type ramp from body
text, sitting close to generous surrounding whitespace, reads as more considered than the same
heading in the same position with only a colour change to distinguish it. Two adjacent hierarchy
levels that differ only by colour are not a real hierarchy — colour is standing in for structure.

## Restraint vs decoration — not the same axis

Simplicity ([design-language.md](./design-language.md) principle 3) rules out *unnecessary*
complexity — visual noise that doesn't serve the content. It does not rule out *deliberate*
visual interest that serves hierarchy or focus. A single well-placed accent, an intentionally
asymmetric layout, or one section that breaks the grid to draw the eye are restrained choices, not
decoration, when they exist to make the focal hierarchy clearer. The failure mode this principle
guards against is ornamentation with no job to do — not visual interest itself.

Every considered composition can name at least one thing it deliberately left out, dialed back, or
declined to add. A composition where everything considered made it onto the screen has not been
edited.

## Real content sharpens hierarchy decisions

Placeholder text ("Title", "Heading text goes here", generic Latin filler) hides whether a
hierarchy decision actually works, because placeholder content has no real length, tone, or
information density to test against. A layout validated only against placeholder copy has not been
validated for composition — only for structure.

## Divergence is a legitimate output, not just a fallback

For exploratory or comparative briefs, genuinely different compositions (not just palette or
spacing variations of one idea) surface the considered option faster than committing to the first
assembly that satisfies the component map. Concepts that share the same structure and differ only
in accent colour or minor spacing are one idea presented twice, not real divergence.

---

## Medium specialization

This file states principles only. Each medium specializes them differently — the medium's own
file holds the actual defaults, and a principle applied literally without them is misapplied:

| Medium | Where the specialization lives | What it specializes |
|--------|--------------------------------|--------------------|
| Web product | [web-product/design.md](../media-types/web-product/design.md) | When density is correct (dashboards, tables) vs when generosity is correct (onboarding, empty states, confirmation) |
| Web marketing | [web-marketing/patterns/marketing-pages.md](../media-types/web-marketing/patterns/marketing-pages.md) | Persuasive-default spacing (hero, CTA sections), one-message-per-section as this medium's focal-hierarchy rule |
| Slides | [slides/content.md](../media-types/slides/content.md) | One-idea-per-slide as this medium's focal-hierarchy rule; "empty area is fine" as this medium's whitespace rule |

## Related Documentation

- [Design language](./design-language.md) - Principles overview, including Craft (principle 6)
- [Spacing](./spacing.md) - The 4px scale these principles spend
- [Typography](./typography.md) - The type ramp scale contrast draws on
