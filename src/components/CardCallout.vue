<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  gap?: 'sm' | 'lg'
  items?: { title: string; description: string }[]
  divided?: boolean
}>(), {
  gap: 'sm',
  divided: true
})
</script>

<template>
  <div :class="['rounded-xl bg-black/[0.03] px-5 py-4', gap === 'lg' || items ? 'space-y-4' : 'space-y-2']">
    <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">{{ label }}</p>
    <template v-if="items">
      <div :class="['space-y-3', divided && 'divide-y divide-black/[0.06]']">
        <div v-for="item in items" :key="item.title" class="pt-3 first:pt-0">
          <p class="font-semibold text-[var(--color-text-primary)] text-sm">{{ item.title }}</p>
          <p class="text-sm text-[var(--color-text-secondary)] mt-1">{{ item.description }}</p>
        </div>
      </div>
    </template>
    <slot v-else />
  </div>
</template>
