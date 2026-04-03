<!-- Section card wrapper used on all case study pages. Renders a white rounded card with a floating brand label above it. -->

<script setup lang="ts">
defineProps<{
  id: string
  label: string
  first?: boolean  // hero section: adds top margin, taller padding, looser spacing
  loose?: boolean  // content-heavy non-hero sections: looser internal spacing
}>()
</script>

<template>
  <div
    :id="id"
    :class="[
      'scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-5 py-8 sm:px-10',
      first  ? 'mt-[35px] sm:py-14 space-y-8' :
      loose  ? 'sm:py-10 space-y-8' :
               'sm:py-10 space-y-4',
    ]"
  >
    <p
      class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
      style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);"
    >{{ label }}</p>
    <slot />
  </div>
</template>
