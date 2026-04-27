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
      'inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-200 bg-[var(--color-button-bg-primary)] shadow-sm whitespace-nowrap underline-offset-2',
      iconOnly ? 'p-2.5' : 'px-5 py-2.5 text-sm font-medium',
      'text-[var(--color-button-text-primary)] hover:opacity-90 hover:underline active:underline',
      active ? 'opacity-75 underline' : '',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 focus-visible:underline',
      'disabled:opacity-30 disabled:cursor-not-allowed',
    ]"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>
