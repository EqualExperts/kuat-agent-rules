---
name: kuat-patterns
description: Per-medium page and scenario patterns for Equal Experts / Kuat design work — product UI (dashboards, forms, sign-in, detail pages, browse-and-filter, documentation), marketing pages, and their layout shells, components, and density defaults. Use when building or reviewing a specific page type or scenario in Figma, Figma Make, or code, to pick the right layout shell and know which components and density that scenario expects. Load alongside kuat-composition (the density/hierarchy principles these patterns specialise) and kuat-components (the components named per pattern).
---

# Kuat patterns

Each pattern below states: the layout shell to start from, the density default, which components
it expects, and the most common mistake for that scenario. These are starting points to adapt to
the actual brief, not templates to fill in unmodified — see kuat-composition for when a genuinely
divergent layout is the right call.

## Product UI — layout shells

Product UI (web applications, dashboards, internal tools) uses **dark navigation**, distinguishing
it from marketing. Pick one shell per app, not per screen:

| Shell | Use when | Shape |
|---|---|---|
| **Dark horizontal nav** | Limited nav items (5–7) | Full-width dark bar: logo left, nav items after it, user menu right. Fixed height, everything below is a light content area |
| **Dark sidebar nav** (default for internal tools) | Complex or hierarchical navigation, 8+ items | Persistent dark sidebar (workspace switcher → primary nav → secondary links → account footer) + a light top bar (collapse toggle, breadcrumb/title left; search/notifications/theme toggle right) + light main content |
| **Single column — narrow/centred** | Self-contained flows with no persistent nav: auth, forms, wizards, confirmations | Centred logo, a single card (bounded max width) holding the flow, minimal footer |
| **Single column — full-width/long-form** | Structured documents: reports, briefs | Slim brand bar + breadcrumb + status; document header (eyebrow label, H1 title, one-line dek, metadata strip); numbered sections, each self-contained; document-metadata footer |
| **Split layout (add-on)** | A contextual right rail (TOC, inspector, metadata) | Adds a right rail to the sidebar shell — pair with it, never use alone |

A **system banner** (outage, deprecation, access change) is a full-width zone above the *entire*
shell — spanning both sidebar and top bar — present only when a site-wide message is active. It is
distinct from page/section-level feedback (a submitted-action callout), which sits inside the main
content area at the top, not in the banner zone.

**Sidebar shell content, top to bottom:** workspace/brand switcher → primary navigation (icon +
label, children expand in place) → muted section labels grouping related nav items → secondary
utility links (Help, Settings), visually separated → account footer (avatar + name + identifier)
pinned to the bottom.

**Main content area, in likely order (skip rows that don't apply):** submitted-action feedback →
page header (title + primary actions; omit if the top bar already carries the title) → metric/
summary row (card grid, 3–4 columns desktop) → visualisation row (one or two chart cards) →
primary work surface (table/list, card grid, identity+tabs, kanban, or form — see the pattern
below for the scenario in hand).

## Product UI — patterns by scenario

### Dashboard
**Goal:** key metrics at a glance, trends over time, confident decisions, drill-down only when
needed. **Shell:** dark sidebar. **Density:** dense in the metric row and any table; the metric row
itself is the sharpest test of this — most important number first and visually largest, same time
period/units/format across all metrics, and every number paired with context on what it means, not
a bare figure. **Common mistake:** four identical metric cards with no size/weight differentiation
between the headline number and the supporting ones — a hierarchy-differentiation-test failure.

### Browse and filter
**Goal:** find one item, or a small relevant subset, inside a larger collection by narrowing rather
than scanning. **Shell:** dark sidebar, or single-column full-width for a standalone search page.
**Density:** dense results list/table; filters visible as removable chips, not buried in a menu
only. **Expects:** a result count alongside applied filters, an always-available "clear filters,"
and an empty-result state that explains why and offers a way out (not a dead end). **Common
mistake:** filters that only exist inside a dropdown with no visible chips, so the user can't see
what's currently narrowing the set.

### Complete a form
**Goal:** finish efficiently, understand what's needed, correct mistakes easily, not lose progress.
**Shell:** single-column for public forms; dark sidebar for app settings; single-column or
horizontal nav for multi-step wizards. **Density:** balanced — generous at section breaks, dense
within a section (fields belonging together sit close; a new section gets a real gap). **Expects:**
only necessary fields, specific and actionable error messages (not "invalid input"), and explicit
handling for lost-work risk (autosave or a clear warning before navigating away). **Common
mistake:** uniform spacing between every field regardless of whether adjacent fields belong to the
same logical group — a uniform-spacing-test failure.

### Sign in
**Goal:** get in quickly and securely; recover access without friction when something's forgotten.
**Shell:** single-column, narrow/centred — minimise distraction, one task only. **Density:**
generous — this is exactly the "onboarding/confirmation" content type from kuat-composition's
density table, not a form to cram. **Expects:** minimal fields, immediate and specific error
feedback, a visible path to password reset/MFA recovery. **Common mistake:** treating sign-in as a
"form" and applying form-density spacing — sign-in is generous, not balanced.

### Detail page
**Goal:** see everything about one record and act on it without leaving the page to piece together
context. **Shell:** dark sidebar. **Density:** identity block generous (name, status, key
identifiers visible without scrolling); related content dense within tabs/sections. **Expects:** a
breadcrumb or back link to the list/hub the record was reached from; primary actions anchored near
the identity block, not in a footer; related data grouped into tabs/sections rather than one long
scroll. **Common mistake:** burying the record's status or key identifier below the fold instead of
in the identity block.

### Section hub
**Goal:** orient inside a part of the product and choose the right sub-page — no single task, just
clear options. **Shell:** dark sidebar. **Density:** generous card grid; each card's copy states
what's inside, not a bare label. **Expects:** a flat structure reaching real content in 1–2 clicks
(avoid hubs that just lead to more hubs); recency/relevance surfaced when the data exists. **Common
mistake:** decorative card copy ("Explore now!") instead of descriptive copy that lets the user
predict what's behind the click.

### Give feedback on an action (post-submit outcome)
**Goal:** know immediately and unambiguously whether an action worked, and what to do next. Scoped
to *after* an action completes or fails — not pre-action confirmation, not in-form validation, not
a persistent status indicator (those are separate patterns/components). **Expects:** feedback
weight matched to the action's significance (a completed transaction needs a stopping point; a
small in-place update doesn't); the message drafted before the component is chosen, not the
reverse; one message per priority tier on screen at a time (avoid alert fatigue); specific values
(names, numbers, dates) rather than "an error occurred"; never blaming the user in copy; colour
always paired with icon + label. **Common mistake:** picking a heavy modal for a minor, low-stakes
confirmation, or a passive toast for a destructive action's outcome — weight mismatch either way.

### Documentation
**Goal:** find information quickly, understand it, complete tasks with step-by-step guidance, stay
oriented. **Shell:** dark sidebar + split-layout right rail (table of contents) — a three-column
desktop layout; horizontal nav for a docs landing page. **Density:** scannable — headings, lists,
code blocks; progressive detail (overview first, details on demand). **Expects:** multiple wayfind
paths (search, nav, breadcrumbs) always visible. **Common mistake:** a docs body page with no
persistent TOC rail, forcing the reader to scroll blind to find their place.

## Content-type notes that cut across patterns

- **Empty states, error messages, confirmations, action-button copy** each have their own tone and
  structure rules (drafted before the component is picked, per the feedback pattern above) — treat
  copy as part of the design brief, not filler to swap in later.
- A **confirmation page** (the end state of a completed form/application/transaction) uses the
  single-column narrow/centred shell, same as sign-in and forms — it is not a distinct layout
  shape, just that shell's end state.

## Marketing pages

**Goal:** communicate value immediately, build trust, help visitors decide, give an easy next
action. **Shell:** horizontal nav, light background, full-width sections with contained content —
distinct from product UI's dark nav. **Density:** generous throughout — persuasion, not density,
is the goal; this medium's focal-hierarchy rule is **one message and one primary CTA per section**,
not one focal point per whole page. **Structure (landing page):** header → hero (full width) →
social proof/logos → features → benefits/how-it-works → testimonials → CTA section → footer.
**Structure (pricing page):** header → heading + billing-period toggle → plan cards in a row →
comparison/detail below. **Colour:** core-dominant — almost everything from the core tier (see
kuat-tokens); full-page background floods restricted to a dark-brand or dark-neutral token (or
light neutral); extended-tier accent colours only as small pull-outs, capped near 5–10% of page
area, always with dark text on them. **Common mistake:** a hero section with two competing CTAs of
equal visual weight — violates the one-primary-CTA-per-section rule even if both CTAs use correct
tokens.

## Choosing a shell when the brief doesn't say

- Data-heavy, workflow-driven, needs persistent navigation → dark sidebar (default for internal
  tools) or dark horizontal nav (≤7 nav items).
- A single, self-contained task with no app chrome around it → single-column narrow/centred.
- A structured document meant to be read top-to-bottom → single-column full-width/long-form.
- Public-facing, persuasive, external audience → marketing shell, not a product shell — the two
  are never interchangeable (light vs dark nav is the fastest tell of which one a brief needs).

## Version stamp

Stamp deliverables with the reference version this skill was used at, e.g. `Kuat patterns skill
vX.Y.Z · <date>`, in the deliverable footer or the review's References section.

## Related

- **kuat-composition** — the density-by-content-type and focal-hierarchy principles these patterns
  specialise per medium.
- **kuat-components** — which named component fills each pattern's slots (metric card, table,
  status indicator, etc.).
- **kuat-tokens** — token binding once the pattern and shell are chosen.
- **kuat-create** — the orchestrator; load this skill alongside it for any build or review task.

<!-- kuat-skill-bundle: kuat-patterns v1.0.0 -->
