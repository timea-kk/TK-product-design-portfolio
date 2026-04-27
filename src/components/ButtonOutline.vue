<script setup lang="ts">
defineProps<{
  iconOnly?: boolean
  disabled?: boolean
  active?: boolean
  type?: 'button' | 'submit' | 'reset'
  tag?: string
}>()

defineEmits<{ click: [] }>()
</script>

<template>
  <component
    :is="tag ?? 'button'"
    v-bind="!tag || tag === 'button' ? { type: type ?? 'button', disabled } : {}"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-200 bg-[var(--color-surface-button)] border border-[var(--color-border)] shadow-sm whitespace-nowrap underline-offset-2',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 focus-visible:underline',
      iconOnly ? 'p-2.5' : 'px-5 py-2.5 text-sm font-medium',
      active ? 'text-[var(--color-brand-primary)] underline' : 'text-[var(--color-button-text)] hover:text-[var(--color-brand-primary)] hover:underline',
      'active:underline disabled:opacity-30 disabled:cursor-not-allowed',
    ]"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>
