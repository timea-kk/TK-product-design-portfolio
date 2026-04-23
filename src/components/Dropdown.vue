<!--
  Dropdown.vue – Shared trigger-and-panel shell.
  Handles open/close toggle, outside-click dismissal, and ARIA wiring.
  Default slot: panel content. Named slot #trigger (scoped: { open, toggle }): custom trigger.
  If #trigger is not provided, renders a default styled text button using the label prop.
-->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  label: string
  triggerAriaLabel?: string
  haspopup?: string
  panelClass?: string
  panelRole?: string
  panelAriaLabel?: string
}>(), {
  haspopup: 'true',
  panelClass: 'right-0 top-full mt-1',
})

const open = ref(false)
const containerRef = ref<HTMLElement | null>(null)

function handleOutsideClick(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

function toggle() { open.value = !open.value }
function close() { open.value = false }

onMounted(() => document.addEventListener('click', handleOutsideClick, { passive: true }))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))

defineExpose({ close })
</script>

<template>
  <div class="relative" ref="containerRef">
    <slot name="trigger" :open="open" :toggle="toggle">
      <button
        type="button"
        @click="toggle"
        class="flex items-center gap-1 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevation-1)] px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] focus-visible:outline-offset-2"
        :aria-haspopup="haspopup"
        :aria-expanded="open"
        :aria-label="props.triggerAriaLabel ?? props.label"
      >
        {{ label }}
      </button>
    </slot>
    <div
      v-if="open"
      :class="['absolute z-10 min-w-[300px] rounded border border-[var(--color-border)] bg-[var(--color-surface-elevation-1)] py-1 shadow-lg', panelClass]"
      :role="panelRole"
      :aria-label="panelAriaLabel"
    >
      <slot />
    </div>
  </div>
</template>
