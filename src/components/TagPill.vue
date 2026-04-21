<!--
  TagPill.vue – Inline label pill for categorising work.
  Used in project page headers and CardProject cards.
-->

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <span class="rounded-full border border-black/10 bg-black/[0.04] px-4 py-1 text-sm text-[var(--color-text-secondary)]">{{ label }}</span>
</template>
