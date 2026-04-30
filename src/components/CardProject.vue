<!--
  CardProject.vue – Project card for the home page grid.
  Default: flex row on desktop (text left, image right), flex col on mobile.
  imageTop: reverses column order so image appears above text on mobile.
  vertical: locks the card in column layout at all breakpoints (for grid contexts).
  ctaLabel: overrides the default "Read case study" button text.
  External URLs (starting with http) render as <a target="_blank"> instead of RouterLink.
-->

<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
import TagPill from '@/components/TagPill.vue'
import ButtonOutline from '@/components/ButtonOutline.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import { IconExternalLink } from '@tabler/icons-vue'
import { useMediaQuery } from '@/composables/useMediaQuery'

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
  textMinHeight?: number
  hideCta?: boolean
  primaryCta?: boolean
  imageRounded?: boolean
  imageOutline?: boolean
  transparent?: boolean
  noHover?: boolean
  wideBreakpoint?: boolean
  to: string
  tags?: string[]
}>()

const isLg = useMediaQuery('(min-width: 1024px)')
const isWide = useMediaQuery('(min-width: 1440px)')

const isExternal = computed(() => props.to.startsWith('http'))
const routerLink = resolveComponent('RouterLink')
const isDesktop = computed(() => props.wideBreakpoint ? isWide.value : isLg.value)

const effectivePosition = computed(() =>
  isDesktop.value ? (props.mediaPosition ?? 'top') : 'center'
)
</script>

<template>
  <component
    :is="isExternal ? 'a' : routerLink"
    v-bind="isExternal ? { href: to, target: '_blank', rel: 'noopener noreferrer' } : { to }"
    :class="[
      'group/card overflow-hidden rounded-2xl flex',
      vertical
        ? (imageTop ? 'flex-col-reverse' : 'flex-col')
        : wideBreakpoint
          ? (imageTop ? 'flex-col-reverse min-[1440px]:flex-row' : 'flex-col min-[1440px]:flex-row')
          : (imageTop ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row')
    ]"
    :style="transparent ? {} : { backgroundColor: 'var(--color-surface-card)' }"
  >
    <!-- Text area -->
    <div :class="['flex flex-col justify-between gap-8', imageRounded ? 'px-3 py-6' : 'p-8', vertical ? '' : wideBreakpoint ? 'min-[1440px]:p-12 min-[1440px]:w-[38%]' : 'lg:p-12 lg:w-[38%]', noHover && 'cursor-default']" :style="!vertical && isDesktop ? { minHeight: (textMinHeight ?? 420) + 'px' } : {}">
      <div class="flex flex-col gap-4">
        <h2 :class="['font-heading font-black leading-tight tracking-tight text-[var(--color-text-primary)]', vertical ? 'text-xl sm:text-2xl' : wideBreakpoint ? 'text-xl sm:text-2xl min-[1440px]:text-4xl' : 'text-xl sm:text-2xl lg:text-4xl']">
          <span class="inline-flex items-center gap-[6px] group-active/card:opacity-70">
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
    <div :class="['overflow-hidden', imageRounded ? 'p-3' : '', vertical ? 'aspect-video' : wideBreakpoint ? 'aspect-video min-[1440px]:aspect-auto min-[1440px]:flex-1 min-[1440px]:rounded-l-2xl' : 'aspect-video lg:aspect-auto lg:flex-1 lg:rounded-l-2xl']">
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
