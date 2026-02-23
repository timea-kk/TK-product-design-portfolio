<!--
  Header.vue – Sticky top navigation bar.
  Contains the logo (links home), a Home nav link, the theme switcher dropdown, and the
  accessibility options dropdown. Theme and a11y state come from Pinia stores accessed
  directly by ThemeSwitcher and A11yPanel — Header doesn't need to manage them.
-->

<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import A11yPanel from '@/components/A11yPanel.vue'
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]"
    role="banner"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
      <!-- Logo links to home; aria-label covers the logo since it has no visible text -->
      <a href="/" class="flex items-center gap-2 focus-visible:rounded" aria-label="Timea Konya – Home">
        <Logo class="h-8 w-auto" />
      </a>

      <nav class="flex items-center gap-2" aria-label="Main">
        <a
          href="/"
          class="rounded px-3 py-2 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-brand)] focus-visible:outline-offset-2"
        >
          Home
        </a>

        <!-- Each dropdown is self-contained; they read from and write to their Pinia stores -->
        <ThemeSwitcher />
        <A11yPanel />
      </nav>
    </div>
  </header>
</template>
