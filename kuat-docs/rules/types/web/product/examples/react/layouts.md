# React Layout Examples

Code examples for Kuat Design System layouts in React.

**Rules:** See [product/design.md](../design.md)

---

## Marketing Header

```tsx
import { Button } from "@equal-experts/kuat-react";

export function MarketingHeader() {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo - Left aligned */}
        <div className="flex-shrink-0">
          <img 
            src="/logo.svg" 
            alt="Equal Experts" 
            className="h-12 w-auto min-w-[100px]" 
          />
        </div>
        
        {/* Navigation - Right aligned */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="/about" className="text-foreground hover:text-primary">
            About
          </a>
          <a href="/services" className="text-foreground hover:text-primary">
            Services
          </a>
          <a href="/contact" className="text-foreground hover:text-primary">
            Contact
          </a>
          <Button variant="default">Get Started</Button>
        </nav>
      </div>
    </header>
  );
}
```

---

## Dark Horizontal Navigation

```tsx
import { Button } from "@equal-experts/kuat-react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Dark Horizontal Navigation */}
      <nav className="bg-sidebar text-sidebar-foreground border-b border-sidebar-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo - White monochrome */}
          <div className="flex-shrink-0">
            <img 
              src="/logo-white.svg" 
              alt="Equal Experts" 
              className="h-10 w-auto min-w-[100px]" 
            />
          </div>
          
          {/* Navigation Items */}
          <div className="flex items-center gap-6 flex-1 px-8">
            <a href="/dashboard" className="text-sidebar-foreground hover:text-sidebar-primary-foreground">
              Dashboard
            </a>
            <a href="/projects" className="text-sidebar-foreground hover:text-sidebar-primary-foreground">
              Projects
            </a>
            <a href="/reports" className="text-sidebar-foreground hover:text-sidebar-primary-foreground">
              Reports
            </a>
            <a href="/settings" className="text-sidebar-foreground hover:text-sidebar-primary-foreground">
              Settings
            </a>
          </div>
          
          {/* User Menu - Right aligned */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-sidebar-foreground">
              Profile
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
```

---

## Dark Sidebar Navigation

```tsx
import { Button } from "@equal-experts/kuat-react";
import { useState } from "react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Dark Sidebar */}
      <aside 
        className={`bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <img 
            src="/logo-white.svg" 
            alt="Equal Experts" 
            className={`h-10 w-auto min-w-[100px] transition-opacity ${
              sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'
            }`}
          />
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <a 
            href="/dashboard" 
            className="flex items-center gap-3 px-4 py-2 rounded-[6px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <span>Dashboard</span>
          </a>
          <a 
            href="/projects" 
            className="flex items-center gap-3 px-4 py-2 rounded-[6px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <span>Projects</span>
          </a>
          <a 
            href="/reports" 
            className="flex items-center gap-3 px-4 py-2 rounded-[6px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <span>Reports</span>
          </a>
          <a 
            href="/settings" 
            className="flex items-center gap-3 px-4 py-2 rounded-[6px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <span>Settings</span>
          </a>
        </nav>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded-[6px]"
            >
              ☰
            </button>
            <nav className="text-sm text-muted-foreground">
              Dashboard / Overview
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Profile</Button>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
```

---

## Marketing Footer

```tsx
export function MarketingFooter() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <img 
              src="/logo.svg" 
              alt="Equal Experts" 
              className="h-10 w-auto min-w-[100px] mb-4" 
            />
            <p className="text-muted-foreground text-sm">
              © 2024 Equal Experts. All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-12">
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/about" className="hover:text-foreground">About</a></li>
                <li><a href="/careers" className="hover:text-foreground">Careers</a></li>
                <li><a href="/contact" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/docs" className="hover:text-foreground">Documentation</a></li>
                <li><a href="/blog" className="hover:text-foreground">Blog</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
```
