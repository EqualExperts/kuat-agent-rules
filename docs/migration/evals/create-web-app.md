# Eval briefs — create-web-app

Rubric = the **Step 5 pre-handoff checklist** in [skills/create-web-app/SKILL.md](../../../skills/create-web-app/SKILL.md).

---

## Brief A1 — Sign-in form (no Kuat package installed)

> Build a sign-in screen for our internal admin tool, in React. No `@equal-experts/kuat-react` package is installed in this project. Happy path plus invalid-credentials and validation errors.

**Targets:** auth pattern adherence; graceful fallback (component guides unresolvable → documented patterns + **flagged gap**); semantic tokens; accessible form (labels, `aria-describedby`, focus, validate-on-submit).

---

## Brief A2 — Dashboard shell with sidebar nav (Kuat available)

> Create the layout shell for a data dashboard — sidebar navigation with 9 items, a top bar with breadcrumbs and a user menu, and a content area with stat cards. Vue. `@equal-experts/kuat-vue` is installed.

**Targets:** dark sidebar nav (8+ items → sidebar, not horizontal); white monochrome logo on Tech Blue; component resolution via registry (`kuat:kuat-header`, `kuat:button-group`); `bg-sidebar`/`bg-card` tokens; responsive behaviour.

---

## Brief A3 — Empty state for a documentation search (states in scope)

> A docs search results page. Include the empty state (no results) and the loading state, not just results. HTML/CSS, no framework.

**Targets:** documentation pattern; empty/loading states present; UX copy supports the task (not marketing tone); contrast + headings; tokens not hex.

---

## Brief A4 — Settings page (Kuat available)

> Build an account settings page in React. `@equal-experts/kuat-react` is installed. Sections for profile, notifications, and security; each section saves independently with explicit Save / Cancel actions.

**Targets:** settings/forms pattern (sectioned form, persistent labels, validate-on-submit, never disable submit); component resolution via the registry (`kuat:*` / `shadcn:*`) before custom code; semantic tokens (`bg-card`, `text-foreground`) not hex; action labels describe the action ("Save profile", not "OK"); 4px-grid spacing and interactive radius (6px) / input radius (4px); accessible (labelled inputs, `aria-describedby` for help/errors, logical headings). Settings is a form-heavy page → no marketing tone.

---

## Brief A5 — Data table / list view (states + interaction)

> Build a data table listing support tickets — sortable columns, pagination, and per-row actions (view / assign / close). Include the empty state (no tickets) and the loading state. React, `@equal-experts/kuat-vue` not relevant; assume Kuat available.

**Targets:** table pattern (semantic `<table>`/header scope or an accessible grid; sortable column affordance with `aria-sort`; pagination control with accessible names); empty + loading states present and on-pattern (skeleton/spinner with accessible status, not a blank screen); row actions are real labelled controls, not icon-only without names; semantic tokens (`bg-card`, `bg-muted`) not hex; contrast AA on row text and status chips; no marketing copy. Component resolution attempted via the registry before custom markup; if a table primitive is unresolvable, falls back to a documented pattern and **flags the gap**.
