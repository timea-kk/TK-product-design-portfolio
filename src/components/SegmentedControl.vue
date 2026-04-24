<script setup lang="ts">
defineProps<{
  options: string[]
  modelValue: number
}>()

defineEmits<{
  'update:modelValue': [value: number]
}>()
</script>

<template>
  <div
    role="group"
    class="relative inline-grid rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevation-1)] p-1"
    :style="{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }"
  >
    <div
      class="absolute left-1 top-1 bottom-1 rounded-full bg-[var(--color-brand-primary)] transition-transform duration-300 ease-in-out"
      :style="{
        width: `calc((100% - 8px) / ${options.length})`,
        transform: `translateX(calc(${modelValue} * 100%))`,
      }"
    ></div>
    <button
      v-for="(option, i) in options"
      :key="option"
      class="relative z-10 text-center px-6 py-1.5 text-sm font-medium transition-colors duration-200"
      :class="modelValue === i ? 'text-white' : 'text-[var(--color-text-secondary)]'"
      :aria-pressed="modelValue === i"
      @click="$emit('update:modelValue', i)"
    >{{ option }}</button>
  </div>
</template>
