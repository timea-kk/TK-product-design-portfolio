<!-- Metric/stat card: brand label, large value, muted description. Used in experimentation and results sections. -->

<script setup lang="ts">
defineProps<{
  label: string
  value: string
  description: string
}>()
</script>

<template>
  <div class="flex-1 rounded-xl bg-black/[0.03] px-5 py-4 text-center">
    <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">{{ label }}</p>
    <p class="text-2xl font-extrabold text-[var(--color-headline)] my-2">{{ value }}</p>
    <p class="text-sm text-[var(--color-muted)]">{{ description }}</p>
  </div>
</template>
