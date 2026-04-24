<script setup lang="ts">
defineProps<{
  steps: { label: string; description: string }[]
}>()
</script>

<template>
  <div class="rounded-xl bg-black/[0.03] px-5 pt-6 pb-4">
    <div v-for="(step, i) in steps" :key="i" class="flex gap-4">
      <!-- Line + circle -->
      <div class="flex flex-col items-center shrink-0">
        <div class="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-brand-primary)] text-white text-xs font-bold shrink-0">
          {{ i + 1 }}
        </div>
        <div v-if="i < steps.length - 1" class="w-0.5 flex-1 bg-black/[0.08] rounded-full my-1"></div>
      </div>
      <!-- Content -->
      <div :class="['min-w-0', i < steps.length - 1 ? 'pb-5' : '']">
        <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)] mb-1">{{ step.label }}</p>
        <!-- step.description must be compile-time static strings; never pass user input or API data here -->
        <p class="text-[var(--color-text-secondary)] leading-relaxed" v-html="step.description"></p>
      </div>
    </div>
  </div>
</template>
