<script setup lang="ts">
import ButtonOutline from '@/components/ButtonOutline.vue'

defineProps<{
  step: number
  total: number
}>()

defineEmits<{
  prev: []
  next: []
}>()
</script>

<template>
  <div class="flex items-center justify-between gap-3">
    <ButtonOutline :disabled="step === 0" @click="$emit('prev')">&#8592; Previous</ButtonOutline>
    <span class="px-5 py-2.5 rounded-full bg-[var(--color-pill-surface)] border border-[var(--color-border)] shadow-sm text-sm font-medium text-[var(--color-pill-text)] tabular-nums">
      {{ step + 1 }} / {{ total }}
    </span>
    <ButtonOutline :disabled="step === total - 1" @click="$emit('next')">Next &#8594;</ButtonOutline>
  </div>
</template>
