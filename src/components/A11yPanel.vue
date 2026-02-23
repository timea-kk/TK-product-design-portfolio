<!--
  A11yPanel.vue – Accessibility options dropdown.
  Opens from a button in the header; closes on outside click. Provides four options:
    • Reduce motion – disables CSS transitions/animations
    • High contrast – stronger borders and focus ring
    • Dyslexia-friendly – OpenDyslexic font with wider letter/word spacing
    • Text size – scale from 90% to 130%
  All state lives in the a11y Pinia store, which persists to localStorage and applies
  CSS classes and variables to <html> immediately on change.
-->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useA11yStore } from '@/stores/a11y'

const a11y = useA11yStore()

/** Whether the dropdown panel is visible. */
const open = ref(false)

/** Ref to the container div for outside-click detection. */
const containerRef = ref<HTMLElement | null>(null)

/** Close if the user clicks anywhere outside the component. */
function handleOutsideClick(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))
</script>

<template>
  <div class="relative" ref="containerRef">
    <button
      type="button"
      @click="open = !open"
      class="flex items-center gap-1 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-brand)] focus-visible:outline-offset-2"
      aria-haspopup="dialog"
      :aria-expanded="open"
      aria-label="Accessibility options"
    >
      Accessibility
    </button>

    <div
      v-if="open"
      role="dialog"
      aria-label="Accessibility options"
      class="absolute right-0 top-full z-10 mt-1 min-w-[16rem] rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] py-1 shadow-lg"
    >
      <!-- Reduce motion -->
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

      <!-- High contrast -->
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

      <!-- Dyslexia-friendly -->
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

      <!-- Text size -->
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
</template>
