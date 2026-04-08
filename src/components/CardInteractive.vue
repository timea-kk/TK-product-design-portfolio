<script setup lang="ts">
defineProps<{
  label: string
  title: string
  description: string
  goal: string
  active: boolean
  image?: string
  imageAlt?: string
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="flex flex-col justify-start flex-1 text-left rounded-xl border-2 overflow-hidden transition-colors duration-200"
    :class="active ? 'border-[var(--color-brand)] bg-[var(--color-brand)]/[0.04]' : 'border-black/[0.08] bg-transparent hover:border-black/20'"
    @click="$emit('click')"
  >
    <div class="flex flex-col flex-1 w-full px-5 py-4 space-y-1">
      <p class="text-xs font-semibold uppercase tracking-widest" :class="active ? 'text-[var(--color-brand)]' : 'text-[var(--color-muted)]'">{{ label }}</p>
      <p class="font-semibold text-[var(--color-headline)]">{{ title }}</p>
      <p class="text-sm text-[var(--color-muted)] leading-relaxed">{{ description }}</p>
      <p class="text-xs text-[var(--color-brand)] font-medium !mt-auto pt-3">{{ goal }}</p>
    </div>
    <img v-if="image" v-show="active" :src="image" :alt="imageAlt ?? ''" width="2400" height="1300" class="sm:hidden w-full block mt-4" />
  </button>
</template>
