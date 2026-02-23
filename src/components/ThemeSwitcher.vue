<!--
  ThemeSwitcher.vue – Theme selection dropdown.
  Opens a listbox of available themes on button click. Selecting one calls store.setTheme(),
  which swaps the theme-* class on <html> and persists the choice. Closes on outside click
  (document listener added on mount, removed on unmount).
-->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const store = useThemeStore()

/** Whether the dropdown listbox is open. */
const open = ref(false)

/** Ref to the wrapper div so we can detect clicks outside the component. */
const containerRef = ref<HTMLElement | null>(null)

/** Display name for each theme id. */
const LABELS: Record<string, string> = {
  default: 'Default',
  bauhaus: 'Bauhaus',
  terminal: 'Terminal',
  'neo-brutalism': 'Neo-brutalism',
  sketch: 'Sketch',
  retro: 'Retro',
  material: 'Material Design',
}

/** Short adjective-based description shown under each theme name. */
const DESCRIPTIONS: Record<string, string> = {
  default: 'Warm, violet, editorial serif',
  bauhaus: 'Bold, geometric, primary palette',
  terminal: 'Dark, monospace, hacker green',
  'neo-brutalism': 'Raw, loud, hard shadows',
  sketch: 'Soft, paper, dotted grid',
  retro: 'Silver, beveled, 90s nostalgia',
  material: 'Clean, elevated, corporate blue',
}

/** Close if the user clicks anywhere outside the component. */
function handleOutsideClick(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))

/** Select a theme and close the dropdown. */
function selectTheme(id: string) {
  store.setTheme(id)
  open.value = false
}
</script>

<template>
  <div class="relative" ref="containerRef">
    <button
      type="button"
      @click="open = !open"
      class="flex items-center gap-1 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-brand)] focus-visible:outline-offset-2"
      aria-haspopup="listbox"
      :aria-expanded="open"
      aria-label="Choose theme"
    >
      Themes
    </button>

    <ul
      v-if="open"
      role="listbox"
      class="absolute right-0 top-full z-10 mt-1 min-w-[16rem] rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] py-1 shadow-lg"
      aria-label="Theme options"
    >
      <li
        v-for="id in store.themes"
        :key="id"
        role="option"
        :aria-selected="store.theme === id"
      >
        <button
          type="button"
          class="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-surface)] hover:text-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:text-[var(--color-brand)] focus:outline-none"
          @click="selectTheme(id)"
        >
          <span class="font-medium">{{ LABELS[id] ?? id }}</span>
          <span v-if="DESCRIPTIONS[id]" class="block text-xs opacity-60">{{ DESCRIPTIONS[id] }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
