# Verification Guide

How to test that your Kuat Design System documentation integration is working correctly.

---

## Overview

After integrating the design rules into your environment, use these tests to verify the agent/tool correctly understands and applies the rules.

**Rule loading:** For which files to load per task (e.g. web product, slides, marketing), see the canonical index [rules/LOADING.md](../rules/LOADING.md). Load general rules first, then the type-specific path for your task.

---

## Quick Verification

Ask your agent these questions and verify the expected answers:

| Question | Expected Answer |
|----------|-----------------|
| "What is the primary brand color?" | EE Blue (#0066CC or oklch(0.645 0.163 237.5)) |
| "What font should I use for code?" | JetBrains Mono (font-mono) |
| "What border radius for a button?" | 6px (interactive element) |
| "What spacing between form fields?" | space-y-4 (16px) |
| "Where should I get Button components?" | shadcn CLI (installed directly, themed by kuat-core) |
| "What Kuat components are available?" | ButtonGroup, and blocks (KuatHeader, etc.) |

If answers match, basic integration is working.

---

## Comprehensive Testing

### Design Rules Tests

#### Color Test

**Prompt:** "What is the primary brand color and when should I use it?"

**Expected:**
- Primary brand color is EE Blue
- Value: `oklch(0.645 0.163 237.5)` or `#0066CC`
- Use for: Primary actions, brand identity, navigation active states, focus rings
- CSS variable: `--primary`
- Tailwind class: `bg-primary`, `text-primary`

**Verification:**
- [ ] Correctly identifies EE Blue as primary
- [ ] Provides oklch or hex value
- [ ] Lists appropriate use cases
- [ ] Mentions semantic token approach

---

#### Typography Test

**Prompt:** "What font should I use for code snippets?"

**Expected:**
- JetBrains Mono
- CSS variable: `--font-mono`
- Tailwind class: `font-mono`
- Fallback: `ui-monospace, monospace`

**Verification:**
- [ ] Identifies JetBrains Mono
- [ ] Provides correct Tailwind class
- [ ] Distinguishes from other font families

---

#### Spacing Test

**Prompt:** "What spacing should I use between form fields?"

**Expected:**
- `space-y-4` (16px) between form fields
- `mb-2` (8px) between label and input
- `space-y-6` (24px) between form sections
- Based on 8-point grid (4px base unit)

**Verification:**
- [ ] Provides specific spacing values
- [ ] Uses Tailwind utility class names
- [ ] Mentions 8-point grid system

---

#### Border Test

**Prompt:** "Should a clickable card have border radius?"

**Expected:**
- Yes, 6px border radius for interactive elements
- Static cards have 0px (no radius)
- Form inputs have 4px radius
- Use `rounded-[6px]` class

**Verification:**
- [ ] Correctly identifies 6px for interactive
- [ ] Distinguishes from static content (0px)
- [ ] Mentions form inputs (4px)

---

#### Layout Test

**Prompt:** "I'm building a dashboard with 8+ navigation items. What layout should I use?"

**Expected:**
- Dark sidebar navigation (not horizontal)
- Sidebar for complex/hierarchical navigation (8+ items)
- Horizontal navigation for simpler apps (5-7 items)
- Use `bg-sidebar` (Tech Blue) for sidebar background
- White monochrome logo in sidebar

**Verification:**
- [ ] Recommends sidebar over horizontal
- [ ] Explains when to use each pattern
- [ ] Mentions sidebar color tokens
- [ ] Addresses logo placement

---

### Content Rules Tests

#### Voice Test

**Prompt:** "Write a button label for saving a document as a draft."

**Expected:**
- "Save draft" or "Save as draft"
- Short (1-3 words)
- Action verb + object
- Sentence case

**Not expected:**
- "SAVE DRAFT" (all caps)
- "Click here to save your document as a draft" (too long)
- "OK" (vague)

**Verification:**
- [ ] Concise label
- [ ] Action-oriented
- [ ] Follows button label rules

---

#### Error Message Test

**Prompt:** "Write an error message for an invalid email address."

**Expected:**
- Specific about problem
- Actionable solution
- No technical jargon

Example: "Email address is invalid. Check for typos and try again."

**Not expected:**
- "Error 422: Validation failed"
- "An error occurred"
- Blaming the user

**Verification:**
- [ ] Specific problem identified
- [ ] Solution provided
- [ ] User-friendly language

---

### Component Rules Tests

#### Naming Test

**Prompt:** "How should I name a component for displaying alert dialogs?"

**Expected:**
- PascalCase: `AlertDialog`
- File name matches: `AlertDialog.tsx` or `AlertDialog.vue`
- Props in camelCase: `isOpen`, `variant`

**Verification:**
- [ ] Correct naming convention
- [ ] Consistent with shadcn/ui patterns

---

#### Variant Test

**Prompt:** "What variants should a button component support?"

**Expected:**
- `variant`: default, destructive, outline, secondary, ghost, link
- `size`: default, sm, lg, icon
- Uses class-variance-authority (CVA)
- Default variants specified

**Verification:**
- [ ] Lists standard variants
- [ ] Mentions CVA
- [ ] Includes size variants

---

## Environment-Specific Tests

### Cursor IDE

1. Open a file in your project
2. Ask Cursor: "Create a primary button using the Kuat design system"
3. Verify:
   - Uses `bg-primary text-primary-foreground`
   - Uses `rounded-[6px]`
   - Uses `px-4 py-2` spacing

### GitHub Copilot

1. Start typing a component
2. Accept suggestions
3. Verify suggestions follow design system patterns

### Claude/ChatGPT

1. Upload rules files to context
2. Ask design questions
3. Verify answers match expected outputs above

### Custom Pipelines

1. Inject context using your integration method
2. Run verification prompts programmatically
3. Compare outputs to expected answers

---

## Troubleshooting

### Agent gives wrong color values

**Cause:** Old or incomplete rules loaded

**Fix:**
- Verify latest `rules/foundations/design/colours.md` is loaded (see [LOADING.md](../rules/LOADING.md))
- Check for cached/stale context

### Agent uses wrong spacing values

**Cause:** May be using generic Tailwind knowledge

**Fix:**
- Ensure `rules/foundations/design/spacing.md` is loaded
- Add explicit instruction to follow Kuat patterns

### Agent doesn't know component patterns

**Cause:** Component rules not loaded

**Fix:**
- Load `rules/types/web/product/component-decision-tree.md` and `rules/types/web/product/technical.md`
- Add `rules/types/web/product/examples/{framework}/components.md` for code (see LOADING.md optional paths)

### Agent ignores border radius rules

**Cause:** Rules may be overridden by generic knowledge

**Fix:**
- Explicitly mention border radius rules in prompt
- Load `rules/foundations/design/borders.md`

---

## Automated Testing

### Test Script Template

```python
def test_design_system_integration():
    """Automated verification of design system integration."""
    
    tests = [
        {
            "prompt": "What is the primary brand color?",
            "expected_contains": ["EE Blue", "0066CC", "primary"],
        },
        {
            "prompt": "What border radius for interactive elements?",
            "expected_contains": ["6px", "interactive", "rounded"],
        },
        {
            "prompt": "What font for code?",
            "expected_contains": ["JetBrains Mono", "font-mono"],
        },
    ]
    
    for test in tests:
        response = ask_agent(test["prompt"])
        for expected in test["expected_contains"]:
            assert expected.lower() in response.lower(), \
                f"Missing '{expected}' in response to: {test['prompt']}"
    
    print("All verification tests passed!")
```

---

## Architecture Verification

### Test Consumer App

A minimal test app is available at `apps/test-consumer-react/` that demonstrates:

1. kuat-core design tokens loading correctly
2. shadcn Button themed by kuat-core CSS variables
3. Kuat ButtonGroup working alongside shadcn components
4. Dark mode functioning
5. Typography loading (Lexend, Lora, JetBrains Mono)

**Run the test app:**

```bash
cd apps/test-consumer-react
pnpm install
pnpm dev
```

### Architecture Tests

#### Component Source Test

**Prompt:** "I need a Button component for my React app using Kuat. Where should I get it?"

**Expected:**
- Install via shadcn CLI: `npx shadcn@latest add button`
- Theme will be applied automatically via kuat-core CSS variables
- Import from local: `import { Button } from "@/components/ui/button"`

**Not expected:**
- Import from `@equal-experts/kuat-react` (deprecated for Button)

**Verification:**
- [ ] Recommends shadcn CLI installation
- [ ] Mentions kuat-core theming
- [ ] Does NOT suggest importing Button from kuat-react

---

#### Kuat Components Test

**Prompt:** "What components should I import from @equal-experts/kuat-react?"

**Expected:**
- ButtonGroup (custom component not in shadcn)
- Future blocks: KuatHeader, KuatFooter, etc.
- Utilities: `cn()`

**Not expected:**
- Button, Dialog, Accordion, Badge (use shadcn directly)

**Verification:**
- [ ] Lists ButtonGroup as primary export
- [ ] Does NOT list standard shadcn components
- [ ] Mentions blocks (coming soon)

---

#### Setup Test

**Prompt:** "How do I set up a new React project with Kuat?"

**Expected:**
1. Install `@equal-experts/kuat-core`
2. Configure Tailwind with kuat preset
3. Import `@equal-experts/kuat-core/variables.css`
4. Initialize shadcn CLI
5. Install shadcn components as needed
6. Optionally install `@equal-experts/kuat-react` for custom components

**Verification:**
- [ ] Mentions kuat-core as foundation
- [ ] Includes shadcn CLI initialization
- [ ] Shows correct import order

---

#### Decision Priority Test

**Prompt:** "I need a search form with a text input and submit button. What should I use?"

**Expected:**
1. Check if Kuat has a block (KuatSearchPattern) - use if available
2. Otherwise use shadcn components (Input, Button) themed by kuat-core
3. Compose them following Kuat patterns

**Verification:**
- [ ] Checks Kuat blocks first
- [ ] Falls back to shadcn components
- [ ] Mentions kuat-core theming

---

## Related Documentation

- [Consumer Setup Guide](./consumer-setup.md) - Recommended project setup
- [Integration Guide](./integration.md) - Setup instructions
- [Rules](../rules/) - Design language documentation
- [Examples](../examples/) - Framework-specific code
