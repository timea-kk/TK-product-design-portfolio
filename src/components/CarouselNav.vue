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
  <div class="flex items-center gap-3">
    <div class="flex-1 flex justify-start">
      <ButtonOutline :disabled="step === 0" @click="$emit('prev')">&#8592; Previous</ButtonOutline>
    </div>
    <span class="px-5 py-2.5 rounded-full bg-[var(--color-surface-button)] border border-[var(--color-border)] shadow-sm text-sm font-medium text-[var(--color-button-text)] tabular-nums">
      {{ step + 1 }} / {{ total }}
    </span>
    <div class="flex-1 flex justify-end">
      <ButtonOutline :disabled="step === total - 1" @click="$emit('next')">Next &#8594;</ButtonOutline>
    </div>
  </div>
</template>
