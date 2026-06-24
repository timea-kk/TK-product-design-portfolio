<script setup lang="ts">
import Button from '@/components/Button.vue'

defineProps<{
  step: number
  total: number
  infinite?: boolean
}>()

defineEmits<{
  prev: []
  next: []
}>()
</script>

<template>
  <div class="flex items-center gap-3">
    <div class="flex-1 flex justify-start">
      <Button variant="outline" :disabled="step === 0 && !infinite" @click="$emit('prev')">&#8592; Previous</Button>
    </div>
    <span class="px-5 py-2.5 rounded-full bg-[var(--color-surface-elevation-1)] border border-[var(--color-border)] shadow-sm text-sm font-medium text-[var(--color-button-text-outline)] tabular-nums">
      {{ step + 1 }} / {{ total }}
    </span>
    <div class="flex-1 flex justify-end">
      <Button variant="outline" :disabled="step === total - 1 && !infinite" @click="$emit('next')">Next &#8594;</Button>
    </div>
  </div>
</template>
