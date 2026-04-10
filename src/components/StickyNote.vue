<!-- Yellow post-it note with a translucent tape piece at the top. Outer layout classes (flex-1, w-1/2, etc.) are passed from the parent via class fallthrough. -->

<script setup lang="ts">
const props = defineProps<{
  rotate: number    // degrees, e.g. -1, 1, -0.5
  square?: boolean  // aspect-square layout for "How might we" notes
}>()

const tapeRotate = `${-props.rotate * 2}deg`
</script>

<template>
  <div class="relative" :style="{ transform: `rotate(${rotate}deg)` }">
    <div
      class="absolute z-10"
      :style="{
        width: '4rem',
        height: '1.6rem',
        top: '-0.8rem',
        left: '50%',
        transform: `translateX(-50%) rotate(${tapeRotate})`,
        background: 'rgba(210, 228, 255, 0.68)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.10)',
      }"
    ></div>
    <div
      :class="[
        'px-3 py-5 text-xs leading-relaxed text-center text-[var(--color-text-primary)] sm:px-5 sm:text-sm',
        square
          ? 'flex flex-col items-center justify-center gap-3 aspect-square'
          : 'sm:py-6 [&>span:first-child]:block [&>span:first-child]:w-fit [&>span:first-child]:mx-auto [&>span:first-child]:mb-3',
      ]"
      style="background: var(--color-sticky-surface); box-shadow: 1px 2px 3px rgba(0,0,0,0.08), 4px 10px 20px rgba(0,0,0,0.18);"
    >
      <slot />
    </div>
  </div>
</template>
