<!--
  CardProject.vue – Project card for the home page grid.
  Desktop: flex row, text left, image right.
  Below desktop: flex col, text top, image bottom (2-col grid handled by parent).
-->

<script setup lang="ts">
import TagPill from '@/components/TagPill.vue'

defineProps<{
  title: string
  description?: string
  image: string
  imageAlt: string
  video?: string
  zoom?: number
  mediaPosition?: string
  to: string
  tags?: string[]
}>()
</script>

<template>
  <RouterLink
    :to="to"
    class="group flex flex-col lg:flex-row overflow-hidden rounded-2xl transition-shadow duration-200 hover:shadow-xl"
    style="background-color: var(--color-surface-card)"
  >
    <!-- Text area -->
    <div class="flex flex-col justify-between gap-8 p-8 lg:p-12 lg:w-[38%] lg:min-h-[420px]">
      <div class="flex flex-col gap-4">
        <h2 class="font-heading text-xl sm:text-2xl lg:text-4xl font-black leading-tight tracking-tight text-[var(--color-text-primary)]">
          {{ title }}
        </h2>
        <p v-if="description" class="text-base lg:text-lg text-[var(--color-text-primary)]">{{ description }}</p>
        <div v-if="tags?.length" class="flex flex-wrap gap-2">
          <TagPill v-for="tag in tags" :key="tag" :label="tag" />
        </div>
      </div>
      <span class="self-start inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-button)] px-5 py-2.5 text-sm font-medium shadow-sm whitespace-nowrap text-[var(--color-button-text)]">
        Read case study &rarr;
      </span>
    </div>

    <!-- Image / video area -->
    <div class="aspect-video lg:aspect-auto lg:flex-1 overflow-hidden lg:rounded-l-2xl">
      <video
        v-if="video"
        :src="video"
        autoplay
        loop
        muted
        playsinline
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        :style="{ ...(zoom ? { transform: `scale(${1 + zoom})`, transformOrigin: 'top' } : {}), objectPosition: mediaPosition ?? 'top' }"
      />
      <img
        v-else
        :src="image"
        :alt="imageAlt"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        :style="{ ...(zoom ? { transform: `scale(${1 + zoom})`, transformOrigin: 'top' } : {}), objectPosition: mediaPosition ?? 'top' }"
      />
    </div>
  </RouterLink>
</template>
