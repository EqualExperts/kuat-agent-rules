# React Logo Examples

Code examples for using the Equal Experts logo in React.

**Rules:** See [general/logo.md](../../../../general/logo.md)

---

## Marketing Header (Light Background)

```tsx
<header className="bg-white p-6">
  <img 
    src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-colour.svg" 
    alt="Equal Experts" 
    className="w-[120px] min-w-[100px] h-auto" 
  />
</header>
```

---

## Marketing Footer (Light Background)

```tsx
<footer className="bg-muted p-8">
  <div className="p-4">
    <img 
      src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-colour.svg" 
      alt="Equal Experts" 
      className="w-[100px] min-w-[100px] h-auto" 
    />
  </div>
</footer>
```

---

## Dark Navigation (White Text Logo)

```tsx
<footer className="bg-slate-900 p-8">
  <div className="p-4">
    <img 
      src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-white-text.svg" 
      alt="Equal Experts" 
      className="w-[100px] min-w-[100px] h-auto" 
    />
  </div>
</footer>
```

---

## Dark Navigation (Monochrome White)

```tsx
// Use when primary logo contrast is insufficient
<footer className="bg-black p-8">
  <div className="p-4">
    <img 
      src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-white.svg" 
      alt="Equal Experts" 
      className="w-[100px] min-w-[100px] h-auto" 
    />
  </div>
</footer>
```

---

## Brand Mark Only (Space Constrained)

```tsx
<div className="w-8 h-8">
  <img 
    src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/brand-mark-blue.svg" 
    alt="Equal Experts" 
    className="w-full h-full" 
  />
</div>
```

---

## App Sidebar

```tsx
<aside className="bg-sidebar text-sidebar-foreground w-64">
  <div className="p-6 border-b border-sidebar-border">
    <img 
      src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-white.svg" 
      alt="Equal Experts" 
      className="h-10 w-auto min-w-[100px]" 
    />
  </div>
  <nav className="p-4">
    {/* Navigation items */}
  </nav>
</aside>
```

---

## App Horizontal Navigation

```tsx
<nav className="bg-sidebar text-sidebar-foreground h-16">
  <div className="container mx-auto px-6 h-full flex items-center">
    <img 
      src="https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-white.svg" 
      alt="Equal Experts" 
      className="h-10 w-auto min-w-[100px]" 
    />
    {/* Navigation items */}
  </div>
</nav>
```

---

## Logo Component

```tsx
interface LogoProps {
  variant?: 'color' | 'white-text' | 'white' | 'black';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const logoUrls = {
  'color': 'https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-colour.svg',
  'white-text': 'https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-white-text.svg',
  'white': 'https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-white.svg',
  'black': 'https://raw.githubusercontent.com/EqualExperts/brand-assets/master/logo/logo-monochrome-black.svg',
};

const sizes = {
  sm: 'w-[100px]',
  md: 'w-[120px]',
  lg: 'w-[150px]',
};

export function Logo({ variant = 'color', size = 'md', className }: LogoProps) {
  return (
    <img 
      src={logoUrls[variant]} 
      alt="Equal Experts" 
      className={`min-w-[100px] h-auto ${sizes[size]} ${className || ''}`}
    />
  );
}

// Usage
<Logo variant="color" size="md" />
<Logo variant="white" size="lg" />
```
