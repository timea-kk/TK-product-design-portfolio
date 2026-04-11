<script setup lang="ts">
defineProps<{
  iconOnly?: boolean
  disabled?: boolean
  active?: boolean
  type?: 'button' | 'submit' | 'reset'
}>()

defineEmits<{ click: [] }>()
</script>

<template>
  <button
    :type="type ?? 'button'"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-200 bg-[var(--color-surface-button)] border border-[var(--color-border)] shadow-sm whitespace-nowrap',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2',
      iconOnly ? 'p-2.5' : 'px-5 py-2.5 text-sm font-medium',
      active ? 'text-[var(--color-brand-primary)]' : 'text-[var(--color-button-text)] hover:text-[var(--color-brand-primary)]',
      'disabled:opacity-30 disabled:cursor-not-allowed',
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
