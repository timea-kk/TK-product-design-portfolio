<!-- Yellow post-it note with a translucent tape piece at the top. Outer layout classes (flex-1, w-1/2, etc.) are passed from the parent via class fallthrough. -->

<script setup lang="ts">
const props = defineProps<{
  rotate: number    // degrees, e.g. -1, 1, -0.5
  small?: boolean   // smaller tape (3.5rem vs 4rem) for text-only notes
  square?: boolean  // aspect-square layout for "How might we" notes
}>()

const tapeW = props.small ? '3.5rem' : '4rem'
const tapeH = props.small ? '1.4rem' : '1.6rem'
const tapeTop = props.small ? '-0.7rem' : '-0.8rem'
const tapeRotate = `${-props.rotate * 2}deg`
</script>

<template>
  <div class="relative" :style="{ transform: `rotate(${rotate}deg)` }">
    <div
      class="absolute z-10"
      :style="{
        width: tapeW,
        height: tapeH,
        top: tapeTop,
        left: '50%',
        transform: `translateX(-50%) rotate(${tapeRotate})`,
        background: 'rgba(210, 228, 255, 0.68)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.10)',
      }"
    ></div>
    <div
      :class="[
        'flex flex-col items-center gap-3 px-3 py-5 text-xs leading-relaxed text-center text-[var(--color-headline)] sm:px-5 sm:text-sm',
        square ? 'justify-center aspect-square sm:aspect-auto sm:py-5' : 'sm:py-6',
      ]"
      style="background: #f2c96c; box-shadow: 1px 2px 3px rgba(0,0,0,0.08), 4px 10px 20px rgba(0,0,0,0.18);"
    >
      <slot />
    </div>
  </div>
</template>
