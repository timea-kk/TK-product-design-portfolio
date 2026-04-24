<!-- Shared sticky left nav for case study pages. Handles scroll spy, GSAP indicators, and nav click scrolling. -->

<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
  sections: { id: string; label: string; group?: string }[]
  panel: HTMLElement | null
}>()

const activeSection = ref(props.sections[0]?.id ?? '')
const navHoverIndicatorRef = ref<HTMLElement | null>(null)
const navActiveIndicatorRef = ref<HTMLElement | null>(null)
const navClickLock = ref(false)
const navItemRefs: (HTMLElement | null)[] = []

function setNavItemRef(el: unknown, i: number) {
  navItemRefs[i] = el as HTMLElement | null
}

function getIndicatorTop(id: string): number | null {
  const index = props.sections.findIndex(s => s.id === id)
  const el = navItemRefs[index]
  const indicator = navHoverIndicatorRef.value
  if (!el || !indicator) return null
  const track = indicator.parentElement
  if (!track) return null
  const trackRect = track.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()
  return elRect.top - trackRect.top + (elRect.height - 20) / 2
}

function updateNavIndicator(id: string) {
  const top = getIndicatorTop(id)
  const indicator = navHoverIndicatorRef.value
  if (top === null || !indicator) return
  gsap.killTweensOf(indicator)
  gsap.to(indicator, { top, opacity: 1, duration: 0.25, ease: 'power1.inOut' })
}

function hideNavIndicator() {
  const indicator = navHoverIndicatorRef.value
  if (!indicator) return
  gsap.killTweensOf(indicator)
  gsap.to(indicator, { opacity: 0, duration: 0.15 })
}

function updateNavActiveIndicator(id: string) {
  const top = getIndicatorTop(id)
  const indicator = navActiveIndicatorRef.value
  if (top === null || !indicator) return
  gsap.to(indicator, { top, duration: 0.25, ease: 'power1.inOut' })
}

function scrollToSection(id: string) {
  /* c8 ignore next */
  if (!props.panel) return
  const el = document.getElementById(id)
  if (el) {
    const panelRect = props.panel.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    const labelAboveCard = 35
    const navStickyTop = 40
    const target = Math.max(0, props.panel.scrollTop + elRect.top - panelRect.top - labelAboveCard - navStickyTop)
    props.panel.scrollTo({ top: target, behavior: 'smooth' })
  }
}

function updateActiveSection() {
  const panel = props.panel
  /* c8 ignore next */
  if (!panel) return
  const threshold = panel.getBoundingClientRect().top + panel.clientHeight * 0.4
  let active = props.sections[0].id
  for (const { id } of props.sections) {
    const el = document.getElementById(id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= threshold) active = id
  }
  activeSection.value = active
}

function navClick(id: string) {
  updateNavActiveIndicator(id)
  navClickLock.value = true
  scrollToSection(id)
  setTimeout(() => { navClickLock.value = false }, 800)
}

watch(activeSection, (id) => {
  if (!navClickLock.value) updateNavActiveIndicator(id)
})

watch(() => props.panel, (panel, oldPanel) => {
  if (oldPanel) oldPanel.removeEventListener('scroll', updateActiveSection)
  if (panel) {
    panel.addEventListener('scroll', updateActiveSection, { passive: true })
    updateActiveSection()
    nextTick(() => {
      updateNavIndicator(activeSection.value)
      updateNavActiveIndicator(activeSection.value)
    })
  }
}, { immediate: true })

onUnmounted(() => {
  /* c8 ignore next */
  props.panel?.removeEventListener('scroll', updateActiveSection)
})
</script>

<template>
  <nav class="hidden lg:block w-52 shrink-0" aria-label="Page sections">
    <div class="sticky top-10">
      <div
        class="rounded-2xl px-3 py-4"
        style="
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.07);
        "
      >
        <div class="flex gap-2">
          <div class="relative w-0.5 bg-black/[0.08] rounded-full my-1 shrink-0">
            <div
              ref="navHoverIndicatorRef"
              class="absolute w-1 h-5 rounded-full left-1/2 -translate-x-1/2"
              style="top:0; background:var(--color-dusty-violet-300); opacity:0"
            ></div>
            <div
              ref="navActiveIndicatorRef"
              class="absolute w-1 h-5 bg-[var(--color-brand-primary)] rounded-full left-1/2 -translate-x-1/2"
              style="top:0"
            ></div>
          </div>
          <ul class="flex-1 space-y-0.5" @mouseleave="hideNavIndicator">
            <template v-for="(s, i) in sections" :key="s.id">
              <li v-if="s.group && s.group !== sections[i - 1]?.group" class="px-3 pb-1" :class="i === 0 ? 'pt-0' : 'pt-3'">
                <span class="text-xs font-semibold uppercase tracking-wider opacity-50 text-[var(--color-text-primary)]">{{ s.group }}</span>
              </li>
              <li>
                <button
                  type="button"
                  :ref="(el) => setNavItemRef(el, i)"
                  @click="navClick(s.id)"
                  @mouseenter="updateNavIndicator(s.id)"
                  :class="[
                    'w-full text-left px-3 py-1.5 rounded-lg text-sm leading-tight transition-all duration-200',
                    activeSection === s.id
                      ? 'font-semibold text-[var(--color-text-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:translate-x-1 focus-visible:translate-x-1 focus-visible:text-[var(--color-text-primary)] focus-visible:outline-none'
                  ]"
                >{{ s.label }}</button>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
