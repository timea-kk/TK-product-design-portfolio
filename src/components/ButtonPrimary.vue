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
      'inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-200 bg-[var(--color-button-bg-primary)] shadow-sm',
      iconOnly ? 'p-2.5' : 'px-5 py-2.5 text-sm font-medium',
      'text-[var(--color-button-text-primary)] hover:opacity-90',
      active ? 'opacity-75' : '',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2',
      'disabled:opacity-30 disabled:cursor-not-allowed',
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
