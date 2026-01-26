# Vue Layout Examples

Code examples for Kuat Design System layouts in Vue.

**Rules:** See [product/design.md](../design.md)

---

## Marketing Header

```vue
<script setup lang="ts">
import { Button } from "@equal-experts/kuat-vue";
</script>

<template>
  <header class="bg-background border-b border-border">
    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo - Left aligned -->
      <div class="flex-shrink-0">
        <img 
          src="/logo.svg" 
          alt="Equal Experts" 
          class="h-12 w-auto min-w-[100px]" 
        />
      </div>
      
      <!-- Navigation - Right aligned -->
      <nav class="hidden md:flex items-center gap-6">
        <a href="/about" class="text-foreground hover:text-primary">
          About
        </a>
        <a href="/services" class="text-foreground hover:text-primary">
          Services
        </a>
        <a href="/contact" class="text-foreground hover:text-primary">
          Contact
        </a>
        <Button variant="default">Get Started</Button>
      </nav>
    </div>
  </header>
</template>
```

---

## Dark Horizontal Navigation

```vue
<script setup lang="ts">
import { Button } from "@equal-experts/kuat-vue";
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Dark Horizontal Navigation -->
    <nav class="bg-sidebar text-sidebar-foreground border-b border-sidebar-border">
      <div class="container mx-auto px-6 h-16 flex items-center justify-between">
        <!-- Logo - White monochrome -->
        <div class="flex-shrink-0">
          <img 
            src="/logo-white.svg" 
            alt="Equal Experts" 
            class="h-10 w-auto min-w-[100px]" 
          />
        </div>
        
        <!-- Navigation Items -->
        <div class="flex items-center gap-6 flex-1 px-8">
          <a href="/dashboard" class="text-sidebar-foreground hover:text-sidebar-primary-foreground">
            Dashboard
          </a>
          <a href="/projects" class="text-sidebar-foreground hover:text-sidebar-primary-foreground">
            Projects
          </a>
          <a href="/reports" class="text-sidebar-foreground hover:text-sidebar-primary-foreground">
            Reports
          </a>
          <a href="/settings" class="text-sidebar-foreground hover:text-sidebar-primary-foreground">
            Settings
          </a>
        </div>
        
        <!-- User Menu - Right aligned -->
        <div class="flex items-center gap-4">
          <Button variant="ghost" class="text-sidebar-foreground">
            Profile
          </Button>
        </div>
      </div>
    </nav>
    
    <!-- Main Content -->
    <main class="container mx-auto px-6 py-8">
      <slot />
    </main>
  </div>
</template>
```

---

## Dark Sidebar Navigation

```vue
<script setup lang="ts">
import { Button } from "@equal-experts/kuat-vue";
import { ref } from "vue";

const sidebarOpen = ref(true);
</script>

<template>
  <div class="min-h-screen bg-background flex">
    <!-- Dark Sidebar -->
    <aside 
      :class="[
        'bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-16'
      ]"
    >
      <!-- Logo -->
      <div class="p-6 border-b border-sidebar-border">
        <img 
          src="/logo-white.svg" 
          alt="Equal Experts" 
          :class="[
            'h-10 w-auto min-w-[100px] transition-opacity',
            sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'
          ]"
        />
      </div>
      
      <!-- Navigation -->
      <nav class="p-4 space-y-2">
        <a 
          href="/dashboard" 
          class="flex items-center gap-3 px-4 py-2 rounded-[6px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <span>Dashboard</span>
        </a>
        <a 
          href="/projects" 
          class="flex items-center gap-3 px-4 py-2 rounded-[6px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <span>Projects</span>
        </a>
        <a 
          href="/reports" 
          class="flex items-center gap-3 px-4 py-2 rounded-[6px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <span>Reports</span>
        </a>
        <a 
          href="/settings" 
          class="flex items-center gap-3 px-4 py-2 rounded-[6px] text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <span>Settings</span>
        </a>
      </nav>
    </aside>
    
    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col">
      <!-- Top Bar -->
      <header class="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button 
            @click="sidebarOpen = !sidebarOpen"
            class="p-2 hover:bg-muted rounded-[6px]"
          >
            ☰
          </button>
          <nav class="text-sm text-muted-foreground">
            Dashboard / Overview
          </nav>
        </div>
        <div class="flex items-center gap-4">
          <Button variant="ghost">Profile</Button>
        </div>
      </header>
      
      <!-- Content -->
      <main class="flex-1 p-6 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
```

---

## Marketing Footer

```vue
<template>
  <footer class="bg-muted py-12">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <img 
            src="/logo.svg" 
            alt="Equal Experts" 
            class="h-10 w-auto min-w-[100px] mb-4" 
          />
          <p class="text-muted-foreground text-sm">
            © 2024 Equal Experts. All rights reserved.
          </p>
        </div>
        
        <div class="flex gap-12">
          <div>
            <h4 class="font-semibold mb-4">Company</h4>
            <ul class="space-y-2 text-muted-foreground">
              <li><a href="/about" class="hover:text-foreground">About</a></li>
              <li><a href="/careers" class="hover:text-foreground">Careers</a></li>
              <li><a href="/contact" class="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Resources</h4>
            <ul class="space-y-2 text-muted-foreground">
              <li><a href="/docs" class="hover:text-foreground">Documentation</a></li>
              <li><a href="/blog" class="hover:text-foreground">Blog</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
```
