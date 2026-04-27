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
import ButtonOutline from '@/components/ButtonOutline.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import { IconExternalLink } from '@tabler/icons-vue'

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
  hideCta?: boolean
  primaryCta?: boolean
  imageRounded?: boolean
  imageOutline?: boolean
  transparent?: boolean
  noHover?: boolean
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
      'group/card overflow-hidden rounded-2xl transition-transform duration-300 flex',
      !noHover && 'hover:-translate-y-1',
      vertical
        ? (imageTop ? 'flex-col-reverse' : 'flex-col')
        : (imageTop ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row')
    ]"
    :style="transparent ? {} : { backgroundColor: 'var(--color-surface-card)' }"
  >
    <!-- Text area -->
    <div :class="['flex flex-col justify-between gap-8', imageRounded ? 'px-3 py-6' : 'p-8', vertical ? '' : 'lg:p-12 lg:w-[38%] lg:min-h-[420px]', noHover && 'cursor-default']">
      <div class="flex flex-col gap-4">
        <h2 :class="['font-heading font-black leading-tight tracking-tight text-[var(--color-text-primary)]', vertical ? 'text-xl sm:text-2xl' : 'text-xl sm:text-2xl lg:text-4xl']">
          <span :class="['inline-flex items-center gap-[6px] transition-colors duration-200 group-active/card:opacity-70', !noHover && 'group-hover/card:underline group-hover/card:text-[var(--color-brand-primary)]']">
            {{ title }}
            <IconExternalLink v-if="isExternal" style="width: calc(1em - 2px); height: calc(1em - 2px); flex-shrink: 0" />
          </span>
        </h2>
        <p v-if="description" class="text-base text-[var(--color-text-primary)]">{{ description }}</p>
        <div v-if="tags?.length" class="flex flex-wrap gap-2">
          <TagPill v-for="tag in tags" :key="tag" :label="tag" />
        </div>
      </div>
      <component
        :is="primaryCta ? ButtonPrimary : ButtonOutline"
        v-if="!hideCta"
        tag="span"
        :class="['self-start', noHover && 'cursor-pointer']"
      >{{ ctaLabel ?? 'Read case study' }} &rarr;</component>
    </div>

    <!-- Image / video area -->
    <div :class="['overflow-hidden', imageRounded ? 'p-3' : '', vertical ? 'aspect-video' : 'aspect-video lg:aspect-auto lg:flex-1 lg:rounded-l-2xl']">
      <div :class="['group/img h-full w-full overflow-hidden', imageRounded ? 'rounded-xl' : '', imageOutline ? 'ring-2 ring-[var(--color-deep-maroon-700)]' : '']">
        <video
          v-if="video"
          :src="video"
          autoplay
          loop
          muted
          playsinline
          class="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.03]"
          :style="{ ...(zoom ? { transform: `scale(${1 + zoom})`, transformOrigin: 'top' } : {}), objectPosition: effectivePosition }"
        />
        <img
          v-else
          :src="image"
          :alt="imageAlt"
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.03]"
          :style="{ ...(zoom ? { transform: `scale(${1 + zoom})`, transformOrigin: 'top' } : {}), objectPosition: effectivePosition }"
        />
      </div>
    </div>
  </component>
</template>
