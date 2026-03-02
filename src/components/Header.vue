<!--
  Header.vue – Floating pill navigation bar (Option 1: centered panel).
  Panel state is owned here so the panel can be positioned as an absolute child of the
  header element — letting left-1/2 / -translate-x-1/2 center it under the pill regardless
  of which icon triggered it. ThemeSwitcher.vue and A11yPanel.vue are unused in this variant.
-->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { IconPalette, IconAccessible } from '@tabler/icons-vue'
import { useThemeStore } from '@/stores/theme'
import { useA11yStore } from '@/stores/a11y'

const themeStore = useThemeStore()
const a11y = useA11yStore()

const activePanel = ref<'theme' | 'a11y' | null>(null)
const headerRef = ref<HTMLElement | null>(null)

function toggle(panel: 'theme' | 'a11y') {
  activePanel.value = activePanel.value === panel ? null : panel
}

function handleOutsideClick(e: MouseEvent) {
  if (headerRef.value && !headerRef.value.contains(e.target as Node)) {
    activePanel.value = null
  }
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))

const THEME_LABELS: Record<string, string> = {
  default: 'Default',
  bauhaus: 'Bauhaus',
  terminal: 'Terminal',
  'neo-brutalism': 'Neo-brutalism',
  sketch: 'Sketch',
  retro: 'Retro',
  material: 'Material Design',
}

const THEME_DESCRIPTIONS: Record<string, string> = {
  default: 'Warm, violet, editorial serif',
  bauhaus: 'Bold, geometric, primary palette',
  terminal: 'Dark, monospace, hacker green',
  'neo-brutalism': 'Raw, loud, hard shadows',
  sketch: 'Soft, paper, dotted grid',
  retro: 'Silver, beveled, 90s nostalgia',
  material: 'Clean, elevated, corporate blue',
}

function selectTheme(id: string) {
  themeStore.setTheme(id)
  activePanel.value = null
}
</script>

<template>
  <header ref="headerRef" class="fixed top-4 left-1/2 z-50 -translate-x-1/2" role="banner">
    <nav
      class="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-2 py-2 shadow-lg"
      aria-label="Main"
    >
      <button
        type="button"
        @click="toggle('theme')"
        :class="['rounded-full p-2 focus-visible:outline-offset-2', activePanel === 'theme' ? 'text-[var(--color-brand)]' : 'text-[var(--color-muted)] hover:text-[var(--color-brand)]']"
        :aria-expanded="activePanel === 'theme'"
        aria-haspopup="listbox"
        aria-label="Choose theme"
      >
        <IconPalette class="h-4 w-4" />
      </button>

      <a
        href="/"
        class="rounded-full px-4 py-1.5 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-brand)] focus-visible:outline-offset-2"
      >
        Work
      </a>

      <a
        href="/about"
        class="rounded-full px-4 py-1.5 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-brand)] focus-visible:outline-offset-2"
      >
        About Me
      </a>

      <a
        href="/resume"
        class="rounded-full px-4 py-1.5 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-brand)] focus-visible:outline-offset-2"
      >
        Resume
      </a>

      <button
        type="button"
        @click="toggle('a11y')"
        :class="['rounded-full p-2 focus-visible:outline-offset-2', activePanel === 'a11y' ? 'text-[var(--color-brand)]' : 'text-[var(--color-muted)] hover:text-[var(--color-brand)]']"
        :aria-expanded="activePanel === 'a11y'"
        aria-haspopup="dialog"
        aria-label="Accessibility options"
      >
        <IconAccessible class="h-4 w-4" />
      </button>
    </nav>

    <!--
      Panel is an absolute child of <header>, not of the icon button.
      left-1/2 + -translate-x-1/2 centers it under the pill (header width = pill width).
    -->
    <div
      v-if="activePanel"
      class="absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 min-w-[16rem] rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] py-1 shadow-lg"
    >
      <!-- Theme list -->
      <ul v-if="activePanel === 'theme'" role="listbox" aria-label="Theme options">
        <li
          v-for="id in themeStore.themes"
          :key="id"
          role="option"
          :aria-selected="themeStore.theme === id"
        >
          <button
            type="button"
            class="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-surface)] hover:text-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:outline-none"
            @click="selectTheme(id)"
          >
            <span class="font-medium">{{ THEME_LABELS[id] ?? id }}</span>
            <span v-if="THEME_DESCRIPTIONS[id]" class="block text-xs opacity-60">{{ THEME_DESCRIPTIONS[id] }}</span>
          </button>
        </li>
      </ul>

      <!-- A11y controls -->
      <div v-if="activePanel === 'a11y'" role="dialog" aria-label="Accessibility options">
        <label class="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-[var(--color-surface)]">
          <div>
            <span class="block text-sm font-medium text-[var(--color-muted)]">Reduce motion</span>
            <span class="block text-xs opacity-60">No transitions or animations</span>
          </div>
          <input
            type="checkbox"
            :checked="a11y.reduceMotion"
            @change="a11y.update({ reduceMotion: ($event.target as HTMLInputElement).checked })"
            class="h-4 w-4 rounded border-[var(--color-border)] accent-[var(--color-brand)]"
          />
        </label>

        <label class="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-[var(--color-surface)]">
          <div>
            <span class="block text-sm font-medium text-[var(--color-muted)]">High contrast</span>
            <span class="block text-xs opacity-60">Stronger borders and focus ring</span>
          </div>
          <input
            type="checkbox"
            :checked="a11y.highContrast"
            @change="a11y.update({ highContrast: ($event.target as HTMLInputElement).checked })"
            class="h-4 w-4 rounded border-[var(--color-border)] accent-[var(--color-brand)]"
          />
        </label>

        <label class="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-[var(--color-surface)]">
          <div>
            <span class="block text-sm font-medium text-[var(--color-muted)]">Dyslexia-friendly</span>
            <span class="block text-xs opacity-60">OpenDyslexic font, wider spacing</span>
          </div>
          <input
            type="checkbox"
            :checked="a11y.dyslexia"
            @change="a11y.update({ dyslexia: ($event.target as HTMLInputElement).checked })"
            class="h-4 w-4 rounded border-[var(--color-border)] accent-[var(--color-brand)]"
          />
        </label>

        <div class="flex items-center justify-between px-4 py-3 hover:bg-[var(--color-surface)]">
          <div>
            <span class="block text-sm font-medium text-[var(--color-muted)]">Text size</span>
            <span class="block text-xs opacity-60">Scale from 90% to 130%</span>
          </div>
          <select
            :value="a11y.textScale"
            @change="a11y.update({ textScale: Number(($event.target as HTMLSelectElement).value) })"
            class="rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-sm text-[var(--color-muted)]"
            aria-label="Text size"
          >
            <option :value="0.9">90%</option>
            <option :value="1">100%</option>
            <option :value="1.1">110%</option>
            <option :value="1.2">120%</option>
            <option :value="1.3">130%</option>
          </select>
        </div>
      </div>
    </div>
  </header>
</template>
