<!--
  Header.vue – Floating pill navigation bar.
  Uses Dropdown directly for the theme switcher and accessibility panels.
-->

<script setup lang="ts">
import { ref } from 'vue'
import { IconPalette, IconAccessible } from '@tabler/icons-vue'
import { useThemeStore } from '@/stores/theme'
import { useA11yStore } from '@/stores/a11y'
import { THEME_LABELS, THEME_DESCRIPTIONS } from '@/constants/themes'
import Dropdown from './Dropdown.vue'

const themeStore = useThemeStore()
const a11y = useA11yStore()
const themeDropRef = ref<InstanceType<typeof Dropdown> | null>(null)

function selectTheme(id: string) {
  themeStore.setTheme(id)
  themeDropRef.value?.close()
}
</script>

<template>
  <header class="fixed top-4 left-1/2 z-50 -translate-x-1/2" role="banner">
    <nav
      class="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevation-1)] px-2 py-2 shadow-lg"
      aria-label="Main"
    >
      <!-- Theme picker -->
      <Dropdown
        ref="themeDropRef"
        label="Themes"
        trigger-aria-label="Choose theme"
        haspopup="listbox"
        panel-class="left-0 top-full mt-4 w-[322px]"
      >
        <template #trigger="{ open, toggle }">
          <button
            type="button"
            @click="toggle"
            :class="['rounded-full p-2 focus-visible:outline-offset-2', open ? 'text-[var(--color-brand-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)]']"
            :aria-expanded="open"
            aria-haspopup="listbox"
            aria-label="Choose theme"
          >
            <IconPalette class="h-4 w-4" />
          </button>
        </template>
        <ul role="listbox" aria-label="Theme options">
          <li
            v-for="id in themeStore.themes.filter(t => ['default', 'neo-brutalism', 'material'].includes(t))"
            :key="id"
            role="option"
            :aria-selected="themeStore.theme === id"
          >
            <button
              type="button"
              class="w-full px-4 py-3 text-left text-sm hover:bg-[var(--color-highlight)] hover:text-[var(--color-brand-primary)] focus:bg-[var(--color-highlight)] focus:outline-none"
              @click="selectTheme(id)"
            >
              <span class="font-medium">{{ THEME_LABELS[id] }}</span>
              <span class="block text-xs opacity-60">{{ THEME_DESCRIPTIONS[id] }}</span>
            </button>
          </li>
        </ul>
      </Dropdown>

      <a
        href="/"
        class="rounded-full px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-offset-2"
      >
        Work
      </a>

      <a
        href="https://www.linkedin.com/in/timea-konya-a3543284/"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded-full px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-offset-2"
      >
        LinkedIn
      </a>

      <a
        href="https://drive.google.com/file/d/1aeNwj4QkRwouV0SgZ-m-c1h9_PUWALsb/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded-full px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-offset-2"
      >
        Resume
      </a>

      <!-- Accessibility options -->
      <Dropdown
        label="Accessibility"
        trigger-aria-label="Accessibility options"
        haspopup="dialog"
        panel-class="right-0 top-full mt-4 w-[322px]"
        panel-role="dialog"
        panel-aria-label="Accessibility options"
      >
        <template #trigger="{ open, toggle }">
          <button
            type="button"
            @click="toggle"
            :class="['rounded-full p-2 focus-visible:outline-offset-2', open ? 'text-[var(--color-brand-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)]']"
            :aria-expanded="open"
            aria-haspopup="dialog"
            aria-label="Accessibility options"
          >
            <IconAccessible class="h-4 w-4" />
          </button>
        </template>

        <label class="flex cursor-pointer items-center px-4 py-3 hover:bg-[var(--color-highlight)]">
          <div class="flex-1 min-w-0">
            <span class="block text-sm font-medium text-[var(--color-text-secondary)]">Reduce motion</span>
            <span class="block text-xs opacity-60">No transitions or animations</span>
          </div>
          <input
            type="checkbox"
            :checked="a11y.reduceMotion"
            @change="a11y.update({ reduceMotion: ($event.target as HTMLInputElement).checked })"
            class="ml-4 shrink-0 h-4 w-4 rounded border-[var(--color-border)] accent-[var(--color-brand-primary)]"
          />
        </label>

        <label class="flex cursor-pointer items-center px-4 py-3 hover:bg-[var(--color-highlight)]">
          <div class="flex-1 min-w-0">
            <span class="block text-sm font-medium text-[var(--color-text-secondary)]">Dyslexia-friendly</span>
            <span class="block text-xs opacity-60">OpenDyslexic font, wider spacing</span>
          </div>
          <input
            type="checkbox"
            :checked="a11y.dyslexia"
            @change="a11y.update({ dyslexia: ($event.target as HTMLInputElement).checked })"
            class="ml-4 shrink-0 h-4 w-4 rounded border-[var(--color-border)] accent-[var(--color-brand-primary)]"
          />
        </label>
      </Dropdown>
    </nav>
  </header>
</template>
