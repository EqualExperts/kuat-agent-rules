# React Typography Examples

Code examples for using Kuat Design System typography in React.

**Rules:** See [foundations/design/typography.md](../../../../foundations/design/typography.md)

---

## Font Families

```tsx
<p className="font-sans">Primary text using Lexend</p>
<code className="font-mono">Code example using JetBrains Mono</code>
<p className="font-serif">Decorative text using Lora</p>
```

---

## Text Sizes

```tsx
<h1 className="text-4xl font-bold">Page Title</h1>
<h2 className="text-3xl font-semibold">Section Heading</h2>
<h3 className="text-xl font-semibold">Subsection</h3>
<p className="text-base">Body text content</p>
<span className="text-sm text-muted-foreground">Secondary information</span>
<span className="text-xs">Labels and captions</span>
```

---

## Text Colors

```tsx
<p className="text-foreground">Primary text</p>
<p className="text-muted-foreground">Secondary text</p>
<h2 className="text-primary">Brand heading</h2>
<span className="text-destructive">Error message</span>
```

---

## Typography Hierarchy

```tsx
<div>
  <h1 className="text-5xl font-bold text-foreground mb-4">
    Main Page Title
  </h1>
  <h2 className="text-3xl font-semibold text-foreground mb-3">
    Section Heading
  </h2>
  <p className="text-base font-normal text-foreground mb-2">
    Body text content goes here. This is the primary content.
  </p>
  <p className="text-sm text-muted-foreground">
    Supporting information or metadata.
  </p>
</div>
```

---

## With shadcn/ui Components

```tsx
import { Button, Card, CardHeader, CardTitle, CardDescription } from "@equal-experts/kuat-react";

// Button
<Button className="text-lg font-semibold">
  Click me
</Button>

// Card
<Card>
  <CardHeader>
    <CardTitle className="text-2xl font-bold">Card Title</CardTitle>
    <CardDescription className="text-sm text-muted-foreground">
      Card description
    </CardDescription>
  </CardHeader>
</Card>
```

---

## Creating Typography Utilities

```tsx
import { cn } from "@/lib/utils"

const headingStyles = cn(
  "text-2xl font-bold text-foreground",
  "tracking-tight"
)

<h1 className={headingStyles}>Heading</h1>
```

---

## Responsive Typography

```tsx
<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
  Responsive Heading
</h1>
```

---

## Dark Mode

```tsx
// Colors automatically switch in dark mode
<p className="text-foreground">This text adapts to dark mode</p>
<p className="text-muted-foreground">Secondary text also adapts</p>
```
