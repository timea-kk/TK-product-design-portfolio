<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'outline'
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
      'inline-flex items-center justify-center gap-2 rounded-full border transition-colors duration-200 shadow-sm whitespace-nowrap underline-offset-2',
      iconOnly ? 'p-2.5' : 'px-5 py-2.5 text-sm font-medium',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 focus-visible:underline',
      'active:underline disabled:opacity-30 disabled:cursor-not-allowed',
      variant === 'outline'
        ? [
            'bg-[var(--color-button-bg-outline)] border-[var(--color-border)]',
            active ? 'text-[var(--color-brand-primary)] underline' : 'text-[var(--color-button-text-outline)] hover:text-[var(--color-brand-primary)] hover:underline',
          ]
        : [
            'bg-[var(--color-button-bg-primary)] border-transparent text-[var(--color-button-text-primary)] hover:opacity-90 hover:underline',
            active ? 'opacity-75 underline' : '',
          ],
    ]"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>
