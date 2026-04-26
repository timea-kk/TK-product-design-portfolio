<!--
  CardProject.vue – Project card for the home page grid.
  Default: flex row on desktop (text left, image right), flex col on mobile.
  imageTop: reverses column order so image appears above text on mobile.
  vertical: locks the card in column layout at all breakpoints (for grid contexts).
  ctaLabel: overrides the default "Read case study" button text.
  External URLs (starting with http) render as <a target="_blank"> instead of RouterLink.
-->

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, resolveComponent } from 'vue'
import TagPill from '@/components/TagPill.vue'

const props = defineProps<{
  title: string
  description?: string
  image: string
  imageAlt: string
  video?: string
  zoom?: number
  mediaPosition?: string
  imageTop?: boolean
  vertical?: boolean
  ctaLabel?: string
  to: string
  tags?: string[]
}>()

const isLg = ref(false)
let mql: MediaQueryList | null = null
function onMqlChange(e: MediaQueryListEvent) { isLg.value = e.matches }
onMounted(() => {
  mql = window.matchMedia('(min-width: 1024px)')
  isLg.value = mql.matches
  mql.addEventListener('change', onMqlChange)
})
onUnmounted(() => { mql?.removeEventListener('change', onMqlChange) })

const isExternal = computed(() => props.to.startsWith('http'))
const routerLink = resolveComponent('RouterLink')

const effectivePosition = computed(() =>
  isLg.value ? (props.mediaPosition ?? 'top') : 'center'
)
</script>

<template>
  <component
    :is="isExternal ? 'a' : routerLink"
    v-bind="isExternal ? { href: to, target: '_blank', rel: 'noopener noreferrer' } : { to }"
    :class="[
      'group overflow-hidden rounded-2xl transition-shadow duration-200 hover:shadow-xl flex',
      vertical
        ? (imageTop ? 'flex-col-reverse' : 'flex-col')
        : (imageTop ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row')
    ]"
    style="background-color: var(--color-surface-card)"
  >
    <!-- Text area -->
    <div :class="['flex flex-col justify-between gap-8 p-8', vertical ? '' : 'lg:p-12 lg:w-[38%] lg:min-h-[420px]']">
      <div class="flex flex-col gap-4">
        <h2 :class="['font-heading font-black leading-tight tracking-tight text-[var(--color-text-primary)]', vertical ? 'text-xl sm:text-2xl' : 'text-xl sm:text-2xl lg:text-4xl']">
          {{ title }}
        </h2>
        <p v-if="description" class="text-base text-[var(--color-text-primary)]">{{ description }}</p>
        <div v-if="tags?.length" class="flex flex-wrap gap-2">
          <TagPill v-for="tag in tags" :key="tag" :label="tag" />
        </div>
      </div>
      <span class="self-start inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-button)] px-5 py-2.5 text-sm font-medium shadow-sm whitespace-nowrap text-[var(--color-button-text)]">
        {{ ctaLabel ?? 'Read case study' }} &rarr;
      </span>
    </div>

    <!-- Image / video area -->
    <div :class="['overflow-hidden', vertical ? 'aspect-video' : 'aspect-video lg:aspect-auto lg:flex-1 lg:rounded-l-2xl']">
      <video
        v-if="video"
        :src="video"
        autoplay
        loop
        muted
        playsinline
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        :style="{ ...(zoom ? { transform: `scale(${1 + zoom})`, transformOrigin: 'top' } : {}), objectPosition: effectivePosition }"
      />
      <img
        v-else
        :src="image"
        :alt="imageAlt"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        :style="{ ...(zoom ? { transform: `scale(${1 + zoom})`, transformOrigin: 'top' } : {}), objectPosition: effectivePosition }"
      />
    </div>
  </component>
</template>
