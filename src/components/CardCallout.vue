<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  // stat mode: providing value activates this mode
  value?: string
  description?: string
  // callout mode
  gap?: 'sm' | 'lg'
  items?: { title: string; description: string }[]
  divided?: boolean
}>(), {
  gap: 'sm',
  divided: true,
})
</script>

<template>
  <!-- Stat mode -->
  <div v-if="value !== undefined" class="flex-1 rounded-xl bg-[var(--color-surface-subtle)] px-5 py-4 text-center">
    <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">{{ label }}</p>
    <p class="text-2xl font-extrabold text-[var(--color-text-primary)] my-2">{{ value }}</p>
    <p class="text-sm text-[var(--color-text-secondary)]">{{ description }}</p>
  </div>

  <!-- Callout mode -->
  <div v-else :class="['rounded-xl bg-[var(--color-surface-subtle)] px-5 py-4', gap === 'lg' || items ? 'space-y-4' : 'space-y-2']">
    <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">{{ label }}</p>
    <template v-if="items">
      <div :class="['space-y-3', divided && 'divide-y divide-black/[0.06]']">
        <div v-for="item in items" :key="item.title" class="pt-3 first:pt-0">
          <p class="font-semibold text-[var(--color-text-primary)] text-sm">{{ item.title }}</p>
          <p class="text-sm text-[var(--color-text-secondary)] mt-1">{{ item.description }}</p>
        </div>
      </div>
    </template>
    <div v-else><slot /></div>
  </div>
</template>
