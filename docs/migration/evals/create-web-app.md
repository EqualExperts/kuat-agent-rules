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
