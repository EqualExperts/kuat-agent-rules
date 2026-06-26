# Patterns

A **pattern** is an outcome-framed, best-practice solution to a user-focused problem. It is named for
the *outcome a user is after*, not the UI that delivers it, and it describes how components and Blocks
are organised to reach that outcome in a given medium.

Patterns sit above components: a component is a single building block (a Button, an Input); a pattern is
how those blocks come together to help a user achieve something.

## Outcome framing

Patterns are grouped by the kind of outcome they serve:

- **Ask users for…** — collecting something from a user (contact details, a date, a brief).
- **Help users to…** — accomplishing a task (sign in, complete a form, understand a case study).
- **Pages** — whole page or artefact types (a dashboard, a documentation site, a deck section).

The name states the outcome, so the same idea reads the same way across every medium that implements it.

## Concept and implementation

One outcome can be built very differently in different media — a case study told in **slides** is not
built like a case study on a **web-marketing** page, even though the user goal and the principles behind
them are shared. The model separates the two:

- A **concept** owns the *why* and the medium-agnostic principles, stated once: the user goal, when it
  applies, and the best-practice principles that hold regardless of medium.
- An **implementation** owns the *how in one medium*: the layout, components/Blocks, and content for
  that medium, and it links up to its concept.

## Where a pattern lives

Placement encodes which media a pattern is relevant to. A pattern is relevant to a medium only when it
has an implementation there — so a medium's `patterns/` folder holds only the patterns it actually
implements, never patterns it does not.

- A **single-medium pattern** lives entirely within that medium, at `media-types/<medium>/patterns/`,
  with its concept and implementation together in one document. Most patterns are single-medium. For
  example, signing in is a web-product concern, so
  [sign-in](../media-types/web-product/patterns/sign-in.md) lives only under web-product.
- A **shared pattern** — one genuinely implemented in more than one medium — factors its concept up to
  this top-level `patterns/` folder (medium-agnostic), with a per-medium implementation under each
  relevant medium linking back to it. For example,
  [describe a case study](./help-users/describe-a-case-study.md) is a shared concept with a slides
  implementation and a planned web-marketing one — and no web-product implementation, because
  web-product does not tell case studies.

A shared concept exists only once a second medium needs the pattern. A single-medium pattern that later
becomes relevant to a second medium has its concept extracted to this folder and the new implementation
added alongside — a small, deliberate refactor, not a default.

## Pattern document anatomy

A **concept** document (shared, top-level) reads: **user goal** (the outcome) → **context** (when it
occurs and why it matters) → **principles** (medium-agnostic best practice) → **implementations** (a
link per medium) → related components or Blocks.

An **implementation** document reads: **implements** (a link up to its concept, when one exists) →
**solution in this medium** (layout, components/Blocks, content) → **examples**. A single-medium pattern
carries the concept and the implementation together in one document, leading with the user goal.

## Relationship to Blocks

A **Block** is a predefined coded composition that solves part of a pattern. Blocks are decoupled from
patterns: a pattern may have a Block, may have none (guidance only), and a Block may exist with no
pattern. A pattern implementation may link to a Block where one exists. The Block model, and any
pattern↔Block registry, are defined separately and are not yet part of this reference.
