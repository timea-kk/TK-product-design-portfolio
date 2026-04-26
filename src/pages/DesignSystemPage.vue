<!--
  DesignSystemPage.vue – Portfolio design system documentation.
  Layout: sticky left nav (scroll spy) + white section cards on the dotted whiteboard.
  Documents foundations (color tokens, typography) and all shared components.
-->

<script setup lang="ts">
import { ref, computed } from 'vue'
import CaseStudyNav from '@/components/CaseStudyNav.vue'
import CaseStudySection from '@/components/CaseStudySection.vue'
import CardCallout from '@/components/CardCallout.vue'
import CardInteractive from '@/components/CardInteractive.vue'
import CardTimeline from '@/components/CardTimeline.vue'
import StickyNote from '@/components/StickyNote.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import CarouselNav from '@/components/CarouselNav.vue'
import SegmentedControl from '@/components/SegmentedControl.vue'
import TagPill from '@/components/TagPill.vue'
import CardProject from '@/components/CardProject.vue'
import ButtonOutline from '@/components/ButtonOutline.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import Dropdown from '@/components/Dropdown.vue'
import { IconPalette, IconAccessible } from '@tabler/icons-vue'

const NAV_SECTIONS = [
  { id: 'colors',             label: 'Colors',           group: 'Foundations' },
  { id: 'typography',         label: 'Typography',       group: 'Foundations' },
  { id: 'button',             label: 'Button',           group: 'Components' },
  { id: 'card-callout',        label: 'CardCallout',      group: 'Components' },
  { id: 'card-interactive',   label: 'CardInteractive',  group: 'Components' },
  { id: 'card-project',       label: 'CardProject',      group: 'Components' },
  { id: 'card-timeline',      label: 'CardTimeline',     group: 'Components' },
  { id: 'carousel-nav',       label: 'CarouselNav',      group: 'Components' },
  { id: 'case-study-nav',     label: 'CaseStudyNav',     group: 'Components' },
  { id: 'case-study-section', label: 'CaseStudySection', group: 'Components' },
  { id: 'dropdown',           label: 'Dropdown',         group: 'Components' },
  { id: 'header',             label: 'Header',           group: 'Components' },
  { id: 'image-carousel',     label: 'ImageCarousel',    group: 'Components' },
  { id: 'sticky-note',        label: 'StickyNote',       group: 'Components' },
  { id: 'segmented-control',  label: 'SegmentedControl', group: 'Components' },
  { id: 'tag-pill',           label: 'TagPill',          group: 'Components' },
  { id: 'timea-agent',        label: 'TimeaAgent',       group: 'Components' },
]

const panelRef = ref<HTMLElement | null>(null)

// CardCallout demo state
const calloutStatMode = ref(false)
const calloutDivided = ref(true)
const calloutUseItems = ref(false)

// CardInteractive demo state
const activeInteractiveStep = ref(0)

// StickyNote demo state
const stickySquare = ref(false)
const stickyTitle = ref(false)

// CaseStudySection demo state
const sectionFirst = ref(false)

// CarouselNav demo state
const carouselNavStep = ref(2)

// SegmentedControl demo state
const segmentedValue = ref(0)
// CaseStudyNav demo state
const navDemoPanelRef = ref<HTMLElement | null>(null)
const NAV_DEMO_SECTIONS = [
  { id: 'nav-demo-overview', label: 'Overview' },
  { id: 'nav-demo-problem',  label: 'The Problem' },
  { id: 'nav-demo-process',  label: 'My Approach' },
  { id: 'nav-demo-results',  label: 'Results' },
]

const PRIMITIVE_COLORS = [
  {
    group: 'Neutrals',
    prefix: '--color',
    colors: [
      { hex: '#ffffff', label: 'white' },
      { hex: '#000000', label: 'black' },
    ],
  },
  {
    group: 'Dusty Violet',
    prefix: '--color-dusty-violet',
    colors: [
      { hex: '#f0e9f3', label: '50' },
      { hex: '#e7dbeb', label: '100' },
      { hex: '#d9c7e0', label: '200' },
      { hex: '#c7abd1', label: '300' },
      { hex: '#b089bd', label: '400' },
      { hex: '#9966AA', label: '500' },
      { hex: '#7b5288', label: '600' },
      { hex: '#62416d', label: '700' },
      { hex: '#4a3152', label: '800' },
      { hex: '#312036', label: '900' },
    ],
  },
  {
    group: 'Deep Maroon',
    prefix: '--color-deep-maroon',
    colors: [
      { hex: '#F9F7F7', label: '50' },
      { hex: '#EEE8E8', label: '100' },
      { hex: '#D9CACA', label: '200' },
      { hex: '#C4ACAC', label: '300' },
      { hex: '#AE8F8F', label: '400' },
      { hex: '#997171', label: '500' },
      { hex: '#7D5A5A', label: '600' },
      { hex: '#604444', label: '700' },
      { hex: '#422F2F', label: '800' },
      { hex: '#241A1A', label: '900' },
    ],
  },
  {
    group: 'Golden Honey',
    prefix: '--color-golden-honey',
    colors: [
      { hex: '#fefbf5', label: '50' },
      { hex: '#fcf4e2', label: '100' },
      { hex: '#fae9c4', label: '200' },
      { hex: '#f6db9d', label: '300' },
      { hex: '#f2c96c', label: '400' },
      { hex: '#EDB73B', label: '500' },
      { hex: '#b2892c', label: '600' },
      { hex: '#826520', label: '700' },
      { hex: '#534015', label: '800' },
      { hex: '#241b09', label: '900' },
    ],
  },
]

// Color map visualization state
const mapContainer = ref<HTMLElement | null>(null)
const primitiveEls: Record<string, HTMLElement> = {}
const tokenEls: Record<string, HTMLElement> = {}
const componentEls: Record<string, HTMLElement> = {}

type Line = { id: string; d: string; x1: number; y1: number; x2: number; y2: number }
const activeLines = ref<Line[]>([])
const highlightedPrimitives = ref<Set<string>>(new Set())
const highlightedTokens = ref<Set<string>>(new Set())
const highlightedComponents = ref<Set<string>>(new Set())
const hoveredId = ref<string | null>(null)

function primKey(p: { group: string; step: string }) {
  return `${p.group}|${p.step}`
}

function getAnchor(el: HTMLElement | undefined, container: HTMLElement, side: 'left' | 'right') {
  if (!el) return null
  const cr = container.getBoundingClientRect()
  const er = el.getBoundingClientRect()
  return {
    x: side === 'right' ? er.right - cr.left : er.left - cr.left,
    y: er.top + er.height / 2 - cr.top,
  }
}

function makeCurveLine(a: { x: number; y: number }, b: { x: number; y: number }, id: string): Line {
  const cx = (b.x - a.x) * 0.45
  return {
    id,
    d: `M ${a.x} ${a.y} C ${a.x + cx} ${a.y}, ${b.x - cx} ${b.y}, ${b.x} ${b.y}`,
    x1: a.x, y1: a.y, x2: b.x, y2: b.y,
  }
}

function clearHover() {
  activeLines.value = []
  highlightedPrimitives.value = new Set()
  highlightedTokens.value = new Set()
  highlightedComponents.value = new Set()
  hoveredId.value = null
}

function hoverPrimitive(p: { group: string; step: string; hex: string }) {
  const container = mapContainer.value
  if (!container) return
  const key = primKey(p)
  hoveredId.value = `prim:${key}`
  const from = getAnchor(primitiveEls[key], container, 'right')
  if (!from) return
  const lines: Line[] = []
  const hp = new Set([key])
  const ht = new Set<string>()
  SEMANTIC_MAP.forEach(entry => {
    if (primKey(entry.primitive) !== key) return
    const to = getAnchor(tokenEls[entry.token.name], container, 'left')
    if (to) lines.push(makeCurveLine(from, to, `${key}>${entry.token.name}`))
    ht.add(entry.token.name)
  })
  activeLines.value = lines
  highlightedPrimitives.value = hp
  highlightedTokens.value = ht
  highlightedComponents.value = new Set()
}

function hoverToken(entry: (typeof SEMANTIC_MAP)[0]) {
  const container = mapContainer.value
  if (!container) return
  const tName = entry.token.name
  hoveredId.value = `token:${tName}`
  const tLeft  = getAnchor(tokenEls[tName], container, 'left')
  const tRight = getAnchor(tokenEls[tName], container, 'right')
  const lines: Line[] = []
  const hp = new Set([primKey(entry.primitive)])
  const ht = new Set([tName])
  const hc = new Set<string>()
  const pRight = getAnchor(primitiveEls[primKey(entry.primitive)], container, 'right')
  if (pRight && tLeft) lines.push(makeCurveLine(pRight, tLeft, `prim>${tName}`))
  entry.usedIn.forEach(comp => {
    const to = getAnchor(componentEls[comp], container, 'left')
    if (tRight && to) lines.push(makeCurveLine(tRight, to, `${tName}>${comp}`))
    hc.add(comp)
  })
  activeLines.value = lines
  highlightedPrimitives.value = hp
  highlightedTokens.value = ht
  highlightedComponents.value = hc
}

function hoverComponent(comp: string) {
  const container = mapContainer.value
  if (!container) return
  hoveredId.value = `comp:${comp}`
  const cLeft = getAnchor(componentEls[comp], container, 'left')
  const lines: Line[] = []
  const hp = new Set<string>()
  const ht = new Set<string>()
  const hc = new Set([comp])
  SEMANTIC_MAP.filter(e => e.usedIn.includes(comp)).forEach(entry => {
    const tName = entry.token.name
    const tRight = getAnchor(tokenEls[tName], container, 'right')
    const tLeft  = getAnchor(tokenEls[tName], container, 'left')
    if (tRight && cLeft) lines.push(makeCurveLine(tRight, cLeft, `${tName}>${comp}`))
    const pKey = primKey(entry.primitive)
    const pRight = getAnchor(primitiveEls[pKey], container, 'right')
    if (pRight && tLeft) lines.push(makeCurveLine(pRight, tLeft, `${pKey}>${tName}(${comp})`))
    hp.add(pKey)
    ht.add(tName)
  })
  activeLines.value = lines
  highlightedPrimitives.value = hp
  highlightedTokens.value = ht
  highlightedComponents.value = hc
}

const SEMANTIC_MAP = [
  // ── Neutrals / white ─────────────────────────────────────────────────────
  {
    primitive: { group: 'Neutrals', step: 'white', hex: '#ffffff', varName: '--color-white' },
    token:     { name: '--color-button-text-primary', hex: '#ffffff',               label: 'Button Text Primary', group: 'Button' },
    usedIn:    ['ButtonPrimary', 'TimeaAgent'],
  },
  {
    primitive: { group: 'Neutrals', step: 'white', hex: '#ffffff', varName: '--color-white' },
    token:     { name: '--color-surface-button',      hex: '#ffffff',               label: 'Surface Button', group: 'Surface' },
    usedIn:    ['ButtonOutline', 'CardProject', 'CarouselNav'],
  },
  {
    primitive: { group: 'Neutrals', step: 'overlay', hex: 'rgba(0,0,0,0.03)', varName: '--color-surface-subtle' },
    token:     { name: '--color-surface-subtle', hex: 'rgba(0,0,0,0.03)', label: 'Surface Subtle', group: 'Surface' },
    usedIn:    ['CardCallout'],
  },
  // ── Dusty Violet ─────────────────────────────────────────────────────────
  {
    primitive: { group: 'Dusty Violet', step: '50',  hex: '#f0e9f3', varName: '--color-dusty-violet-50' },
    token:     { name: '--color-highlight',  hex: 'rgba(153,102,170,0.1)', label: 'Highlight', group: 'Brand' },
    usedIn:    ['RotatingDescriptor', 'Header'],
  },
  {
    primitive: { group: 'Dusty Violet', step: '200', hex: '#d9c7e0', varName: '--color-dusty-violet-200' },
    token:     { name: '--color-surface-decorative',             hex: 'var(--color-dusty-violet-200)', label: 'Surface Decorative', group: 'Surface' },
    usedIn:    ['Dropdown', 'Header', 'TimeaAgent', 'all pages'],
  },
  {
    primitive: { group: 'Dusty Violet', step: '500', hex: '#9966AA', varName: '--color-dusty-violet-500' },
    token:     { name: '--color-brand-primary',       hex: 'var(--color-dusty-violet-500)', label: 'Brand Primary', group: 'Brand' },
    usedIn:    ['ButtonOutline', 'ButtonPrimary', 'CardCallout', 'CardInteractive', 'CardTimeline', 'CaseStudyNav', 'CaseStudySection', 'Dropdown', 'Header', 'Logo', 'RotatingDescriptor', 'SegmentedControl', 'TimeaAgent'],
  },
  {
    primitive: { group: 'Dusty Violet', step: '500', hex: '#9966AA', varName: '--color-dusty-violet-500' },
    token:     { name: '--color-button-bg-primary',     hex: 'var(--color-dusty-violet-500)', label: 'Button BG Primary', group: 'Button' },
    usedIn:    ['ButtonPrimary'],
  },
  {
    primitive: { group: 'Dusty Violet', step: '900', hex: '#312036', varName: '--color-dusty-violet-900' },
    token:     { name: '--color-text-primary',        hex: 'var(--color-dusty-violet-900)', label: 'Text Primary', group: 'Text' },
    usedIn:    ['CardCallout', 'CardInteractive', 'CardProject', 'StickyNote', 'CaseStudyNav', 'TimeaAgent'],
  },
  {
    primitive: { group: 'Dusty Violet', step: '900', hex: '#312036', varName: '--color-dusty-violet-900' },
    token:     { name: '--color-button-text',         hex: 'var(--color-dusty-violet-900)', label: 'Button Text', group: 'Button' },
    usedIn:    ['ButtonOutline', 'ButtonPrimary', 'CardProject', 'CarouselNav', 'TimeaAgent'],
  },
  // ── Golden Honey ─────────────────────────────────────────────────────────
  {
    primitive: { group: 'Golden Honey', step: '50',  hex: '#fefbf5', varName: '--color-golden-honey-50' },
    token:     { name: '--color-surface-elevation-1',    hex: 'var(--color-golden-honey-50)',  label: 'Surface Elevation 1', group: 'Surface' },
    usedIn:    ['Dropdown', 'Header', 'SegmentedControl', 'TimeaAgent'],
  },
  {
    primitive: { group: 'Golden Honey', step: '200', hex: '#fae9c4', varName: '--color-golden-honey-200' },
    token:     { name: '--color-border',              hex: 'var(--color-golden-honey-200)', label: 'Border', group: 'Border' },
    usedIn:    ['ButtonOutline', 'CardProject', 'CarouselNav', 'Dropdown', 'Header', 'SegmentedControl', 'TimeaAgent'],
  },
  {
    primitive: { group: 'Golden Honey', step: '400', hex: '#f2c96c', varName: '--color-golden-honey-400' },
    token:     { name: '--color-surface-sticky',      hex: 'var(--color-golden-honey-400)', label: 'Sticky Surface', group: 'Surface' },
    usedIn:    ['StickyNote'],
  },
  {
    primitive: { group: 'Golden Honey', step: '500', hex: '#EDB73B', varName: '--color-golden-honey-500' },
    token:     { name: '--color-surface-sticky-label', hex: 'var(--color-golden-honey-500)', label: 'Sticky Label', group: 'Surface' },
    usedIn:    ['StickyNote'],
  },
  // ── Deep Maroon ──────────────────────────────────────────────────────────
  {
    primitive: { group: 'Deep Maroon', step: '50',  hex: '#F9F7F7', varName: '--color-deep-maroon-50' },
    token:     { name: '--color-surface-canvas',    hex: 'var(--color-deep-maroon-50)', label: 'Surface Canvas', group: 'Surface' },
    usedIn:    ['all pages'],
  },
  {
    primitive: { group: 'Deep Maroon', step: '100', hex: '#EEE8E8', varName: '--color-deep-maroon-100' },
    token:     { name: '--color-surface-card',        hex: 'var(--color-deep-maroon-100)', label: 'Surface Card', group: 'Surface' },
    usedIn:    ['CardProject'],
  },
  {
    primitive: { group: 'Deep Maroon', step: '600', hex: '#7D5A5A', varName: '--color-deep-maroon-600' },
    token:     { name: '--color-text-secondary',               hex: 'var(--color-deep-maroon-600)',  label: 'Text Secondary', group: 'Text' },
    usedIn:    ['CardCallout', 'CardInteractive', 'CardTimeline', 'CaseStudyNav', 'Dropdown', 'Header', 'SegmentedControl', 'TagPill', 'TimeaAgent'],
  },
]

const TOKEN_GROUP_ORDER = ['Brand', 'Surface', 'Text', 'Border', 'Button']

const groupedTokens = computed(() => {
  const map = new Map<string, (typeof SEMANTIC_MAP)>()
  for (const g of TOKEN_GROUP_ORDER) map.set(g, [])
  for (const e of SEMANTIC_MAP) {
    const g = e.token.group ?? 'Other'
    if (!map.has(g)) map.set(g, [])
    map.get(g)!.push(e)
  }
  return [...map.entries()].filter(([, entries]) => entries.length > 0).map(([group, entries]) => ({ group, entries }))
})

const GROUP_ORDER = ['Neutrals', 'Dusty Violet', 'Golden Honey', 'Deep Maroon', '']
const STEP_ORDER  = ['white', 'black', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900']

const uniquePrimitives = computed(() => {
  const seen = new Set<string>()
  const result: (typeof SEMANTIC_MAP)[0]['primitive'][] = []
  for (const e of SEMANTIC_MAP) {
    const k = primKey(e.primitive)
    if (!seen.has(k)) { seen.add(k); result.push(e.primitive) }
  }
  return result.sort((a, b) => {
    const gi = GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group)
    if (gi !== 0) return gi
    return STEP_ORDER.indexOf(a.step) - STEP_ORDER.indexOf(b.step)
  })
})

const groupedPrimitives = computed(() => {
  const map = new Map<string, (typeof SEMANTIC_MAP)[0]['primitive'][]>()
  for (const g of GROUP_ORDER.filter(g => g !== '')) map.set(g, [])
  for (const p of uniquePrimitives.value) {
    if (!map.has(p.group)) map.set(p.group, [])
    map.get(p.group)!.push(p)
  }
  return [...map.entries()].filter(([, entries]) => entries.length > 0).map(([group, entries]) => ({ group, entries }))
})

const COMPONENT_GROUP_MAP: Record<string, string> = {
  ButtonOutline:     'Buttons',
  ButtonPrimary:     'Buttons',
  CardCallout:       'Cards',
  CardInteractive:   'Cards',
  CardProject:       'Cards',
  CardTimeline:      'Cards',
  CarouselNav:       'Navigation',
  CaseStudyNav:      'Navigation',
  CaseStudySection:  'Navigation',
  Dropdown:          'Overlays',
  Header:            'Navigation',
  Logo:              'Decorative',
  RotatingDescriptor:'Decorative',
  SegmentedControl:  'Navigation',
  StickyNote:        'Decorative',
  TagPill:           'Cards',
  TimeaAgent:        'Agent',
}

const uniqueComponents = computed(() => {
  const seen = new Set<string>()
  const result: string[] = []
  for (const entry of SEMANTIC_MAP) {
    for (const comp of entry.usedIn) {
      if (!seen.has(comp)) { seen.add(comp); result.push(comp) }
    }
  }
  return result.sort((a, b) => a.localeCompare(b))
})

const groupedComponents = computed(() => {
  const map = new Map<string, string[]>()
  for (const comp of uniqueComponents.value) {
    const g = COMPONENT_GROUP_MAP[comp] ?? 'Other'
    if (!map.has(g)) map.set(g, [])
    map.get(g)!.push(comp)
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([group, comps]) => ({ group, comps: comps.sort((a, b) => a.localeCompare(b)) }))
})
</script>

<template>
  <section
    class="h-screen p-0 sm:p-6 lg:p-[40px] flex flex-col"
    aria-labelledby="ds-heading"
  >
    <div
      ref="panelRef"
      class="h-full w-full overflow-y-auto sm:rounded-3xl sm:border sm:border-[var(--color-surface-subtle)]"
      style="
        background-color: var(--color-surface-canvas);
        background-image: radial-gradient(circle, var(--color-dot-grid) 1.2px, transparent 1.2px);
        background-size: 22px 22px;
      "
    >
      <!-- Inner: sidebar + content -->
      <div class="flex gap-8 justify-center pt-20 pb-14 sm:pt-10 sm:pb-14" style="padding-left: clamp(2rem, 4vw, 3.5rem); padding-right: clamp(2rem, 4vw, 3.5rem);">

        <CaseStudyNav :sections="NAV_SECTIONS" :panel="panelRef" />

        <div class="w-full min-w-0 max-w-4xl space-y-24">

          <!-- ── Foundations ── -->
          <CaseStudySection id="colors" label="Colors" first>
            <div class="space-y-10">
              <div class="space-y-6">
                <div>
                  <h2 class="font-heading text-xl font-bold text-[var(--color-text-primary)]">Primitive Colors</h2>
                  <p class="text-sm text-[var(--color-text-secondary)] mt-1">Raw color palette values. Use semantic tokens in components, not these directly.</p>
                </div>
                <div class="space-y-6">
                  <div v-for="group in PRIMITIVE_COLORS" :key="group.group" class="space-y-2">
                    <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">{{ group.group }}</p>
                    <div class="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                      <div
                        v-for="color in group.colors"
                        :key="color.label"
                        class="rounded-lg border border-[var(--color-surface-subtle)] overflow-hidden min-w-0"
                      >
                        <div class="h-10 w-full" :style="{ background: color.hex }"></div>
                        <div class="px-2 py-1.5 bg-[var(--color-white)] space-y-0.5">
                          <p class="text-xs font-semibold text-[var(--color-text-primary)] leading-tight">{{ color.label }}</p>
                          <p class="font-mono text-[10px] text-[var(--color-text-secondary)] opacity-70 truncate">{{ color.hex }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <h2 class="font-heading text-xl font-bold text-[var(--color-text-primary)]">Semantic Tokens</h2>
                  <p class="text-sm text-[var(--color-text-secondary)] mt-1">Hover or tap any item to trace its connections.</p>
                </div>

                <!-- 3-column graph -->
                <div class="overflow-x-auto">
                <div ref="mapContainer" data-testid="token-map" class="relative select-none min-w-[520px]">

                  <!-- SVG lines overlay -->
                  <svg class="absolute inset-0 w-full h-full pointer-events-none" style="overflow: visible;">
                    <g v-for="line in activeLines" :key="line.id">
                      <path
                        :d="line.d"
                        fill="none"
                        stroke="var(--color-brand-primary)"
                        stroke-width="1.5"
                        stroke-opacity="0.5"
                        stroke-linecap="round"
                      />
                      <circle :cx="line.x1" :cy="line.y1" r="3" fill="var(--color-brand-primary)" fill-opacity="0.6" />
                      <circle :cx="line.x2" :cy="line.y2" r="3" fill="var(--color-brand-primary)" fill-opacity="0.6" />
                    </g>
                  </svg>

                  <!-- columns -->
                  <div class="grid gap-6" style="grid-template-columns: 1fr 1fr auto">

                    <!-- primitives -->
                    <div data-testid="prim-col" class="space-y-4">
                      <p class="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] pb-2">Primitive</p>
                      <div v-for="primGroup in groupedPrimitives" :key="primGroup.group" class="space-y-1">
                        <p class="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-50 pb-1">{{ primGroup.group }}</p>
                        <div
                          v-for="p in primGroup.entries"
                          :key="primKey(p)"
                          :ref="(el) => { if (el) primitiveEls[primKey(p)] = el as HTMLElement }"
                          class="flex items-center gap-2 px-2 py-2 rounded-lg cursor-default transition-colors duration-100 ring-inset w-fit"
                          :class="hoveredId === `prim:${primKey(p)}`
                            ? 'bg-[var(--color-brand-primary)]/[0.12] ring-1 ring-[var(--color-brand-primary)]/50'
                            : highlightedPrimitives.has(primKey(p))
                              ? 'bg-[var(--color-brand-primary)]/[0.07] ring-1 ring-[var(--color-brand-primary)]/20'
                              : 'hover:bg-[var(--color-surface-subtle)]'"
                          @mouseenter="hoverPrimitive(p)"
                          @mouseleave="clearHover()"
                          @click.stop="hoveredId === `prim:${primKey(p)}` ? clearHover() : hoverPrimitive(p)"
                        >
                          <div class="w-5 h-5 rounded shrink-0 border border-black/[0.10]" :style="{ background: p.hex }"></div>
                          <p class="font-mono text-[10px] text-[var(--color-text-primary)] leading-tight truncate">{{ p.varName || '#ffffff' }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- tokens -->
                    <div data-testid="token-col" class="space-y-4">
                      <p class="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] pb-2">Token</p>
                      <div v-for="tokenGroup in groupedTokens" :key="tokenGroup.group" class="space-y-1">
                        <p class="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-50 pb-1">{{ tokenGroup.group }}</p>
                        <div
                          v-for="entry in tokenGroup.entries"
                          :key="entry.token.name"
                          :ref="(el) => { if (el) tokenEls[entry.token.name] = el as HTMLElement }"
                          class="flex items-center gap-2 px-2 py-2 rounded-lg cursor-default transition-colors duration-100 ring-inset w-fit"
                          :class="hoveredId === `token:${entry.token.name}`
                            ? 'bg-[var(--color-brand-primary)]/[0.12] ring-1 ring-[var(--color-brand-primary)]/50'
                            : highlightedTokens.has(entry.token.name)
                              ? 'bg-[var(--color-brand-primary)]/[0.07] ring-1 ring-[var(--color-brand-primary)]/20'
                              : 'hover:bg-[var(--color-surface-subtle)]'"
                          @mouseenter="hoverToken(entry)"
                          @mouseleave="clearHover()"
                          @click.stop="hoveredId === `token:${entry.token.name}` ? clearHover() : hoverToken(entry)"
                        >
                          <div class="w-5 h-5 rounded shrink-0 border border-black/[0.10]" :style="{ background: entry.token.hex }"></div>
                          <p class="font-mono text-[10px] text-[var(--color-text-secondary)] truncate">{{ entry.token.name }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- components -->
                    <div data-testid="comp-col" class="space-y-4">
                      <p class="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] pb-2">Used in</p>
                      <div v-for="compGroup in groupedComponents" :key="compGroup.group" class="space-y-1">
                        <p class="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-50 pb-1">{{ compGroup.group }}</p>
                        <div
                          v-for="comp in compGroup.comps"
                          :key="comp"
                          :ref="(el) => { if (el) componentEls[comp] = el as HTMLElement }"
                          class="flex items-center px-2 py-2 rounded-lg cursor-default transition-colors duration-100 ring-inset w-fit"
                          :class="hoveredId === `comp:${comp}`
                            ? 'bg-[var(--color-brand-primary)]/[0.12] ring-1 ring-[var(--color-brand-primary)]/50'
                            : highlightedComponents.has(comp)
                              ? 'bg-[var(--color-brand-primary)]/[0.07] ring-1 ring-[var(--color-brand-primary)]/20'
                              : 'hover:bg-[var(--color-surface-subtle)]'"
                          @mouseenter="hoverComponent(comp)"
                          @mouseleave="clearHover()"
                          @click.stop="hoveredId === `comp:${comp}` ? clearHover() : hoverComponent(comp)"
                        >
                          <p class="text-xs font-semibold text-[var(--color-text-primary)]">{{ comp }}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                </div><!-- /overflow-x-auto -->
              </div>

            </div>
          </CaseStudySection>

          <!-- ── Typography ── -->
          <CaseStudySection id="typography" label="Typography">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Typography</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">Two font families. <code class="font-mono bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded text-xs">font-heading</code> (Bricolage Grotesque) is used for all display and section headings. <code class="font-mono bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded text-xs">font-sans</code> (system-ui) handles all body copy. Both resolve through CSS variables so themes can override the typeface without touching components.</p>

            <!-- Heading scale demo -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-6 space-y-5">
              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Heading: Bricolage Grotesque</p>
              <div class="space-y-4">
                <div class="flex items-baseline gap-4">
                  <span class="w-24 shrink-0 text-xs text-[var(--color-text-secondary)] font-mono">Hero</span>
                  <p class="font-heading text-5xl font-black leading-tight tracking-tight text-[var(--color-text-primary)]">The quick brown fox</p>
                </div>
                <div class="flex items-baseline gap-4">
                  <span class="w-24 shrink-0 text-xs text-[var(--color-text-secondary)] font-mono">Page title</span>
                  <p class="font-heading text-4xl font-black leading-tight tracking-tight text-[var(--color-text-primary)]">The quick brown fox</p>
                </div>
                <div class="flex items-baseline gap-4">
                  <span class="w-24 shrink-0 text-xs text-[var(--color-text-secondary)] font-mono">Section h2</span>
                  <p class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">The quick brown fox</p>
                </div>
                <div class="flex items-baseline gap-4">
                  <span class="w-24 shrink-0 text-xs text-[var(--color-text-secondary)] font-mono">Card title</span>
                  <p class="font-heading text-xl font-black leading-tight tracking-tight text-[var(--color-text-primary)]">The quick brown fox</p>
                </div>
              </div>
            </div>

            <!-- Heading code -->
            <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;h1 class="font-heading text-5xl font-black leading-tight tracking-tight"&gt;Hero&lt;/h1&gt;
&lt;h2 class="font-heading text-2xl font-bold"&gt;Section heading&lt;/h2&gt;</pre>
            </div>

            <!-- Body scale demo -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-6 space-y-5">
              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Body: system-ui</p>
              <div class="space-y-4">
                <div class="flex items-baseline gap-4">
                  <span class="w-24 shrink-0 text-xs text-[var(--color-text-secondary)] font-mono">Body</span>
                  <p class="text-base leading-relaxed text-[var(--color-text-primary)]">The quick brown fox jumps over the lazy dog.</p>
                </div>
                <div class="flex items-baseline gap-4">
                  <span class="w-24 shrink-0 text-xs text-[var(--color-text-secondary)] font-mono">Small</span>
                  <p class="text-sm text-[var(--color-text-secondary)]">The quick brown fox jumps over the lazy dog.</p>
                </div>
                <div class="flex items-baseline gap-4">
                  <span class="w-24 shrink-0 text-xs text-[var(--color-text-secondary)] font-mono">Label</span>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Section label</p>
                </div>

              </div>
            </div>

            <!-- Body code -->
            <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;p class="text-base leading-relaxed text-[var(--color-text-primary)]"&gt;Body&lt;/p&gt;
&lt;p class="text-sm text-[var(--color-text-secondary)]"&gt;Small / muted&lt;/p&gt;
&lt;p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]"&gt;Label&lt;/p&gt;</pre>
            </div>

            <!-- Scale reference table -->
            <div class="rounded-xl bg-[var(--color-surface-subtle)] overflow-hidden overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-[var(--color-surface-subtle)]">
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Role</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Classes</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Where used</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.04]">
                  <tr><td class="px-4 py-3 text-xs text-[var(--color-text-primary)]">Hero</td><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-secondary)]">font-heading text-5xl lg:text-7xl font-black</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">HomePage hero</td></tr>
                  <tr><td class="px-4 py-3 text-xs text-[var(--color-text-primary)]">Page title</td><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-secondary)]">font-heading text-4xl lg:text-6xl font-black</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Case study overview h1</td></tr>
                  <tr><td class="px-4 py-3 text-xs text-[var(--color-text-primary)]">Section h2</td><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-secondary)]">font-heading text-2xl font-bold</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">All case study section headings</td></tr>
                  <tr><td class="px-4 py-3 text-xs text-[var(--color-text-primary)]">Card title</td><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-secondary)]">font-heading text-xl font-black</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">CardProject, CardInteractive</td></tr>
                  <tr><td class="px-4 py-3 text-xs text-[var(--color-text-primary)]">Body</td><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-secondary)]">text-base leading-relaxed</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Paragraphs, descriptions</td></tr>
                  <tr><td class="px-4 py-3 text-xs text-[var(--color-text-primary)]">Small</td><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-secondary)]">text-sm text-[var(--color-text-secondary)]</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Supporting text, card metadata</td></tr>
                  <tr><td class="px-4 py-3 text-xs text-[var(--color-text-primary)]">Label</td><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-secondary)]">text-xs font-semibold uppercase tracking-widest</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Section labels, card eyebrows</td></tr>

                </tbody>
              </table>
            </div>
          </CaseStudySection>

          <!-- ── Button ── -->
          <CaseStudySection id="button" label="Button">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Button</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">The shared button component used across the portfolio. Supports text-only, icon+text, and icon-only layouts, with default, hover, active, and disabled states.</p>

            <!-- ButtonPrimary -->
            <h3 class="text-base font-semibold text-[var(--color-text-primary)]">ButtonPrimary</h3>
            <div class="overflow-x-auto">
            <div class="rounded-xl border border-[var(--color-surface-subtle)] overflow-hidden min-w-[700px]">
              <div class="grid grid-cols-5 bg-[var(--color-surface-subtle)] border-b border-[var(--color-surface-subtle)]">
                <span class="px-5 py-2 text-xs font-semibold text-[var(--color-text-primary)]">Default</span>
                <span class="px-5 py-2 text-xs font-semibold text-[var(--color-text-primary)]">Hover</span>
                <span class="px-5 py-2 text-xs font-semibold text-[var(--color-text-primary)]">Active</span>
                <span class="px-5 py-2 text-xs font-semibold text-[var(--color-text-primary)]">Focus</span>
                <span class="px-5 py-2 text-xs font-semibold text-[var(--color-text-primary)]">Disabled</span>
              </div>
              <div class="grid grid-cols-5">
                <div class="px-5 py-6 flex flex-col gap-5 items-start">
                  <ButtonPrimary>Label</ButtonPrimary>
                  <ButtonPrimary>&#8592; Previous</ButtonPrimary>
                  <ButtonPrimary icon-only aria-label="Default"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></ButtonPrimary>
                </div>
                <div class="px-5 py-6 flex flex-col gap-5 items-start [&_button]:opacity-90">
                  <ButtonPrimary>Label</ButtonPrimary>
                  <ButtonPrimary>&#8592; Previous</ButtonPrimary>
                  <ButtonPrimary icon-only aria-label="Hover"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></ButtonPrimary>
                </div>
                <div class="px-5 py-6 flex flex-col gap-5 items-start">
                  <ButtonPrimary active>Label</ButtonPrimary>
                  <ButtonPrimary active>&#8592; Previous</ButtonPrimary>
                  <ButtonPrimary icon-only active aria-label="Active"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></ButtonPrimary>
                </div>
                <div class="px-5 py-6 flex flex-col gap-5 items-start [&_button]:ring-2 [&_button]:ring-[var(--color-brand-primary)] [&_button]:ring-offset-2">
                  <ButtonPrimary>Label</ButtonPrimary>
                  <ButtonPrimary>&#8592; Previous</ButtonPrimary>
                  <ButtonPrimary icon-only aria-label="Focus"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></ButtonPrimary>
                </div>
                <div class="px-5 py-6 flex flex-col gap-5 items-start">
                  <ButtonPrimary disabled>Label</ButtonPrimary>
                  <ButtonPrimary disabled>&#8592; Previous</ButtonPrimary>
                  <ButtonPrimary icon-only disabled aria-label="Disabled"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></ButtonPrimary>
                </div>
              </div>
            </div>
            </div><!-- /overflow-x-auto -->

            <!-- Props -->
            <div class="overflow-x-auto">
            <div class="rounded-xl border border-[var(--color-surface-subtle)] overflow-hidden">
              <table class="w-full text-left border-collapse">
                <thead class="bg-[var(--color-surface-subtle)]">
                  <tr>
                    <th class="px-4 py-3 text-xs font-semibold text-[var(--color-text-primary)]">Prop</th>
                    <th class="px-4 py-3 text-xs font-semibold text-[var(--color-text-primary)]">Type</th>
                    <th class="px-4 py-3 text-xs font-semibold text-[var(--color-text-primary)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--color-surface-subtle)]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">icon-only</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">boolean</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Square padding (p-2.5) for icon-only layout.</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">active</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">boolean</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Reduces opacity to indicate a selected/pressed state.</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">disabled</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">boolean</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Reduces opacity and blocks interaction.</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">type</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">'button' | 'submit' | 'reset'</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">HTML button type attribute. Defaults to 'button'.</td></tr>
                </tbody>
              </table>
            </div>
            </div><!-- /overflow-x-auto -->

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;ButtonPrimary&gt;Label&lt;/ButtonPrimary&gt;
&lt;ButtonPrimary icon-only aria-label="..."&gt;&lt;IconSvg /&gt;&lt;/ButtonPrimary&gt;
&lt;ButtonPrimary :active="true"&gt;Label&lt;/ButtonPrimary&gt;
&lt;ButtonPrimary :disabled="true"&gt;Label&lt;/ButtonPrimary&gt;</pre>
            </div>

            <!-- ButtonOutline -->
            <h3 class="text-base font-semibold text-[var(--color-text-primary)]">ButtonOutline</h3>
            <div class="overflow-x-auto">
            <div class="rounded-xl border border-[var(--color-surface-subtle)] overflow-hidden min-w-[700px]">
              <div class="grid grid-cols-5 bg-[var(--color-surface-subtle)] border-b border-[var(--color-surface-subtle)]">
                <span class="px-5 py-2 text-xs font-semibold text-[var(--color-text-primary)]">Default</span>
                <span class="px-5 py-2 text-xs font-semibold text-[var(--color-text-primary)]">Hover</span>
                <span class="px-5 py-2 text-xs font-semibold text-[var(--color-text-primary)]">Active</span>
                <span class="px-5 py-2 text-xs font-semibold text-[var(--color-text-primary)]">Focus</span>
                <span class="px-5 py-2 text-xs font-semibold text-[var(--color-text-primary)]">Disabled</span>
              </div>
              <div class="grid grid-cols-5">
                <div class="px-5 py-6 flex flex-col gap-5 items-start">
                  <ButtonOutline>Label</ButtonOutline>
                  <ButtonOutline>&#8592; Previous</ButtonOutline>
                  <ButtonOutline icon-only aria-label="Default"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></ButtonOutline>
                </div>
                <div class="px-5 py-6 flex flex-col gap-5 items-start [&_button]:text-[var(--color-brand-primary)]">
                  <ButtonOutline>Label</ButtonOutline>
                  <ButtonOutline>&#8592; Previous</ButtonOutline>
                  <ButtonOutline icon-only aria-label="Hover"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></ButtonOutline>
                </div>
                <div class="px-5 py-6 flex flex-col gap-5 items-start">
                  <ButtonOutline active>Label</ButtonOutline>
                  <ButtonOutline active>&#8592; Previous</ButtonOutline>
                  <ButtonOutline icon-only active aria-label="Active"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></ButtonOutline>
                </div>
                <div class="px-5 py-6 flex flex-col gap-5 items-start [&_button]:ring-2 [&_button]:ring-[var(--color-brand-primary)] [&_button]:ring-offset-2">
                  <ButtonOutline>Label</ButtonOutline>
                  <ButtonOutline>&#8592; Previous</ButtonOutline>
                  <ButtonOutline icon-only aria-label="Focus"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></ButtonOutline>
                </div>
                <div class="px-5 py-6 flex flex-col gap-5 items-start">
                  <ButtonOutline disabled>Label</ButtonOutline>
                  <ButtonOutline disabled>&#8592; Previous</ButtonOutline>
                  <ButtonOutline icon-only disabled aria-label="Disabled"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></ButtonOutline>
                </div>
              </div>
            </div>

            <!-- Props -->
            <div class="rounded-xl border border-[var(--color-surface-subtle)] overflow-hidden">
              <table class="w-full text-left border-collapse">
                <thead class="bg-[var(--color-surface-subtle)]">
                  <tr>
                    <th class="px-4 py-3 text-xs font-semibold text-[var(--color-text-primary)]">Prop</th>
                    <th class="px-4 py-3 text-xs font-semibold text-[var(--color-text-primary)]">Type</th>
                    <th class="px-4 py-3 text-xs font-semibold text-[var(--color-text-primary)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--color-surface-subtle)]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">icon-only</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">boolean</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Square padding (p-2.5) for icon-only layout.</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">active</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">boolean</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Forces brand color on the text to indicate a selected state.</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">disabled</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">boolean</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Reduces opacity and blocks interaction.</td></tr>
                </tbody>
              </table>
            </div>
            </div><!-- /overflow-x-auto ButtonOutline state -->

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;ButtonOutline&gt;Label&lt;/ButtonOutline&gt;
&lt;ButtonOutline icon-only aria-label="..."&gt;&lt;IconSvg /&gt;&lt;/ButtonOutline&gt;
&lt;ButtonOutline :active="true"&gt;Label&lt;/ButtonOutline&gt;
&lt;ButtonOutline :disabled="true"&gt;Label&lt;/ButtonOutline&gt;</pre>
            </div>
          </CaseStudySection>

          <!-- ── CardCallout ── -->
          <CaseStudySection id="card-callout" label="CardCallout">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">CardCallout</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">A labeled content card with two modes. In callout mode (default): renders freeform slot content or a structured <code class="font-mono bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded text-xs">items</code> list, with an optional divider. In stat mode: pass a <code class="font-mono bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded text-xs">value</code> prop to render a centered metric with a large number and a muted description line.</p>

            <!-- Controls -->
            <div class="flex flex-wrap gap-6 pt-2">
              <label class="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] cursor-pointer select-none">
                <code class="font-mono bg-[var(--color-surface-subtle)] px-1 rounded text-xs">stat</code>
                <button
                  type="button"
                  role="switch"
                  :aria-checked="calloutStatMode"
                  @click="calloutStatMode = !calloutStatMode"
                  :class="['relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200', calloutStatMode ? 'bg-[var(--color-brand-primary)]' : 'bg-[var(--color-surface-subtle)]']"
                >
                  <span :class="['pointer-events-none block h-4 w-4 rounded-full bg-[var(--color-surface-decorative)] shadow transition-transform duration-200', calloutStatMode ? 'translate-x-4' : 'translate-x-0']" />
                </button>
              </label>
              <label class="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] cursor-pointer select-none" :class="calloutStatMode && 'opacity-40 pointer-events-none'">
                <code class="font-mono bg-[var(--color-surface-subtle)] px-1 rounded text-xs">items</code>
                <button
                  type="button"
                  role="switch"
                  :aria-checked="calloutUseItems"
                  :disabled="calloutStatMode"
                  @click="calloutUseItems = !calloutUseItems"
                  :class="['relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200', calloutUseItems ? 'bg-[var(--color-brand-primary)]' : 'bg-[var(--color-surface-subtle)]']"
                >
                  <span :class="['pointer-events-none block h-4 w-4 rounded-full bg-[var(--color-surface-decorative)] shadow transition-transform duration-200', calloutUseItems ? 'translate-x-4' : 'translate-x-0']" />
                </button>
              </label>
              <label class="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] cursor-pointer select-none" :class="(calloutStatMode || !calloutUseItems) && 'opacity-40 pointer-events-none'">
                <code class="font-mono bg-[var(--color-surface-subtle)] px-1 rounded text-xs">divided</code>
                <button
                  type="button"
                  role="switch"
                  :aria-checked="calloutDivided"
                  :disabled="calloutStatMode || !calloutUseItems"
                  @click="calloutDivided = !calloutDivided"
                  :class="['relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200', calloutDivided ? 'bg-[var(--color-brand-primary)]' : 'bg-[var(--color-surface-subtle)]']"
                >
                  <span :class="['pointer-events-none block h-4 w-4 rounded-full bg-[var(--color-surface-decorative)] shadow transition-transform duration-200', calloutDivided ? 'translate-x-4' : 'translate-x-0']" />
                </button>
              </label>
            </div>

            <!-- Demo -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-5">
              <template v-if="calloutStatMode">
                <div class="flex flex-wrap gap-3">
                  <CardCallout label="Conversion" value="+20–25%" description="increase" />
                  <CardCallout label="D1 retention" value="+3%" description="improvement" />
                  <CardCallout label="Experiments" value="9 of 12" description="shipped to 100%" />
                </div>
              </template>
              <template v-else-if="calloutUseItems">
                <CardCallout
                  label="What I learned"
                  :divided="calloutDivided"
                  :items="[
                    { title: 'Parallel tracks accelerate learning', description: 'Running two tracks simultaneously let us cover more ground without waiting for sequential results.' },
                    { title: 'User language shapes stronger messaging', description: 'Listening to how users talked about Ecosia led directly to copy that converted better.' },
                    { title: 'Regional differences need their own lens', description: 'Germany consistently behaved differently and needed closer observation.' }
                  ]"
                />
              </template>
              <template v-else>
                <CardCallout label="Trade-off and impact">
                  <p class="text-[var(--color-text-secondary)] leading-relaxed">Research showed emotional messaging was already working. The real <strong>retention gap</strong> was <strong>functional</strong>.</p>
                </CardCallout>
              </template>
            </div>

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-4 overflow-x-auto">
              <pre v-if="calloutStatMode" class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;CardCallout label="Conversion" value="+20-25%" description="increase" /&gt;</pre>
              <pre v-else-if="calloutUseItems" class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;CardCallout
  label="What I learned"
  :divided="{{ calloutDivided }}"
  :items="[
    { title: 'Item title', description: 'Item description.' },
  ]"
/&gt;</pre>
              <pre v-else class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;CardCallout label="Trade-off and impact"&gt;
  &lt;p&gt;Content goes here.&lt;/p&gt;
&lt;/CardCallout&gt;</pre>
            </div>

            <!-- Props table -->
            <div class="rounded-xl bg-[var(--color-surface-subtle)] overflow-hidden overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-[var(--color-surface-subtle)]">
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Prop</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Type</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Default</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.04]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">label</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">required</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Uppercase label shown above content in both modes</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">value</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string (optional)</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">undefined</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Providing this activates stat mode: renders a centered large metric</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">description</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string (optional)</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">undefined</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Muted label below the metric value (stat mode only)</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">gap</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">'sm' | 'lg'</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">'sm'</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Internal spacing in callout mode. Auto-set to 'lg' when items is provided</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">items</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">&#123; title, description &#125;[]</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">undefined</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Renders a structured list instead of the slot (callout mode only)</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">divided</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">boolean</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">true</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Shows divider lines between items (callout mode with items only)</td></tr>
                </tbody>
              </table>
            </div>
          </CaseStudySection>

          <!-- ── CardInteractive ── -->
          <CaseStudySection id="card-interactive" label="CardInteractive">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">CardInteractive</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">A selectable button card used to represent steps or options. Shows active state with brand border and tinted background. Click a card below to toggle it.</p>

            <!-- Demo -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-5">
              <div class="flex flex-col sm:flex-row gap-3">
                <CardInteractive
                  v-for="(step, i) in [
                    { label: 'Step 1', title: 'Value Perception', description: 'See the product value in context of their situation.', goal: 'Goal: make a search' },
                    { label: 'Step 2', title: 'Value Experience', description: 'Experience how the product helps them reach their goals.', goal: 'Goal: return for a second session' },
                    { label: 'Step 3', title: 'Value Adoption', description: 'Adopt the product into their daily life and form habits.', goal: 'Goal: activate and convert' },
                  ]"
                  :key="i"
                  :label="step.label"
                  :title="step.title"
                  :description="step.description"
                  :goal="step.goal"
                  :active="activeInteractiveStep === i"
                  @click="activeInteractiveStep = i"
                />
              </div>
            </div>

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;CardInteractive
  label="Step 1"
  title="Value Perception"
  description="See the product value in context."
  goal="Goal: make a search"
  :active="activeStep === 0"
  image="/path/to/image.webp"
  image-alt="Description"
  @click="activeStep = 0"
/&gt;</pre>
            </div>

            <!-- Props table -->
            <div class="rounded-xl bg-[var(--color-surface-subtle)] overflow-hidden overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-[var(--color-surface-subtle)]">
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Prop</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Type</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.04]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">label</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Small label at the top of the card</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">title</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Bold headline inside the card</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">description</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Body text below the title</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">goal</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Small brand-colored goal line at the bottom</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">active</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">boolean</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Whether the card is currently selected</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">image</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string (optional)</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Image shown on mobile when card is active</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">imageAlt</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string (optional)</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Alt text for the mobile image</td></tr>
                </tbody>
              </table>
            </div>
          </CaseStudySection>

          <!-- ── CardProject ── -->
          <CaseStudySection id="card-project" label="CardProject">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">CardProject</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">A full-width project card used on the home page. Desktop: text left, image right. Below desktop: stacked, displayed in a 2-column grid. The whole card is a <code class="font-mono bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded text-xs">RouterLink</code>. Tags are optional.</p>

            <!-- Demo -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-5">
              <CardProject
                title="Install Funnel for the Ecosia Browser"
                image="/project-pages/ecosia-browser/ecosia-browser-1.webp"
                imageAlt="Ecosia Browser landing page"
                to="/work/ecosia-browser"
                :tags="['Evaluative Research', 'Prototyping', 'Design System']"
              />
            </div>

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;CardProject
  title="Install Funnel for the Ecosia Browser"
  image="/project-pages/ecosia-browser/ecosia-browser-1.webp"
  imageAlt="Ecosia Browser landing page"
  to="/work/ecosia-browser"
  :tags="['Evaluative Research', 'Prototyping']"
/&gt;</pre>
            </div>

            <!-- Props table -->
            <div class="rounded-xl bg-[var(--color-surface-subtle)] overflow-hidden overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-[var(--color-surface-subtle)]">
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Prop</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Type</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.04]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">title</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Project headline displayed on the card</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">image</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Path to the cover image</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">imageAlt</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Alt text for the cover image</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">to</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Vue Router path the card links to</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">tags</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string[] (optional)</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Skill/method pills rendered below the title</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">description</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string (optional)</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Short summary text rendered below the title</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">video</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string (optional)</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Path to a video file; shown instead of image when provided</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">zoom</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">number (optional)</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Scale factor applied to the cover image/video (e.g. 0.2 = 120%)</td></tr>
                </tbody>
              </table>
            </div>
          </CaseStudySection>

          <!-- ── CardTimeline ── -->
          <CaseStudySection id="card-timeline" label="CardTimeline">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">CardTimeline</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">A numbered vertical timeline. Used for process and initiative sections to show sequential steps with labels and descriptions. Accepts HTML in descriptions via <code class="font-mono bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded text-xs">v-html</code>.</p>

            <!-- Demo -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-5">
              <CardTimeline :steps="[
                { label: 'Discovery', description: 'Map the problem space and identify the key constraints.' },
                { label: 'Define', description: 'Set clear goals and success criteria with stakeholders.' },
                { label: 'Deliver', description: 'Ship iteratively and measure against defined outcomes.' },
              ]" />
            </div>

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;CardTimeline :steps="[
  { label: 'Discovery', description: 'Map the problem space.' },
  { label: 'Define',    description: 'Set goals and criteria.' },
  { label: 'Deliver',   description: 'Ship and measure.' },
]" /&gt;</pre>
            </div>

            <!-- Props table -->
            <div class="rounded-xl bg-[var(--color-surface-subtle)] overflow-hidden overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-[var(--color-surface-subtle)]">
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Prop</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Type</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.04]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">steps</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">&#123; label: string; description: string &#125;[]</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Ordered list of steps. Descriptions support HTML via v-html.</td></tr>
                </tbody>
              </table>
            </div>
          </CaseStudySection>

          <!-- ── CarouselNav ── -->
          <CaseStudySection id="carousel-nav" label="CarouselNav">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">CarouselNav</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">Pagination navigation for the ImageCarousel component. Renders a Previous button, a current/total count pill, and a Next button. Previous disables on the first slide, Next disables on the last.</p>

            <!-- Demo -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-5">
              <CarouselNav
                :step="carouselNavStep"
                :total="5"
                @prev="carouselNavStep--"
                @next="carouselNavStep++"
              />
            </div>

            <!-- Props -->
            <div class="rounded-xl border border-black/[0.08] overflow-hidden overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead class="bg-[var(--color-surface-subtle)]">
                  <tr>
                    <th class="px-4 py-3 text-xs font-semibold text-[var(--color-text-primary)]">Prop</th>
                    <th class="px-4 py-3 text-xs font-semibold text-[var(--color-text-primary)]">Type</th>
                    <th class="px-4 py-3 text-xs font-semibold text-[var(--color-text-primary)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.05]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">step</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">number</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Current zero-indexed slide position.</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">total</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">number</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Total number of slides.</td></tr>
                </tbody>
              </table>
            </div>

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;CarouselNav
  :step="step"
  :total="images.length"
  @prev="goTo(step - 1)"
  @next="goTo(step + 1)"
/&gt;</pre>
            </div>
          </CaseStudySection>

          <!-- ── CaseStudyNav ── -->
          <CaseStudySection id="case-study-nav" label="CaseStudyNav">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">CaseStudyNav</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">The sticky left navigation panel used on all case study pages. Handles scroll spy via a scroll listener on the scrollable panel element, and animates the active and hover indicators with GSAP. Only visible on desktop (lg and above).</p>

            <!-- Demo -->
            <div class="rounded-xl border border-[var(--color-surface-subtle)] px-6 py-6 flex justify-center">
              <CaseStudyNav :sections="NAV_DEMO_SECTIONS" :panel="null" />
            </div>

            <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">const NAV_SECTIONS = [
  &#123; id: 'overview', label: 'Overview' &#125;,
  &#123; id: 'problem',  label: 'The Problem' &#125;,
]
const panelRef = ref&lt;HTMLElement | null&gt;(null)

&lt;div ref="panelRef" class="overflow-y-auto"&gt;
  &lt;CaseStudyNav :sections="NAV_SECTIONS" :panel="panelRef" /&gt;
&lt;/div&gt;</pre>
            </div>

            <!-- Props table -->
            <div class="rounded-xl bg-[var(--color-surface-subtle)] overflow-hidden overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-[var(--color-surface-subtle)]">
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Prop</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Type</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.04]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">sections</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">&#123; id: string; label: string &#125;[]</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">List of sections to render as nav items</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">panel</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">HTMLElement | null</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">The scrollable container element. The scroll listener attaches to this.</td></tr>
                </tbody>
              </table>
            </div>
          </CaseStudySection>

          <!-- ── CaseStudySection ── -->
          <CaseStudySection id="case-study-section" label="CaseStudySection">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">CaseStudySection</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">The white rounded card wrapper used for every section on case study pages. Has a floating brand label above it and supports three layout modes.</p>

            <!-- Controls -->
            <div class="flex flex-wrap gap-4 pt-2">
              <label class="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] cursor-pointer select-none">
                <code class="font-mono bg-[var(--color-surface-subtle)] px-1 rounded text-xs">first</code>
                <button
                  type="button"
                  role="switch"
                  :aria-checked="sectionFirst"
                  @click="sectionFirst = !sectionFirst"
                  :class="['relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200', sectionFirst ? 'bg-[var(--color-brand-primary)]' : 'bg-[var(--color-surface-subtle)]']"
                >
                  <span :class="['pointer-events-none block h-4 w-4 rounded-full bg-[var(--color-surface-decorative)] shadow transition-transform duration-200', sectionFirst ? 'translate-x-4' : 'translate-x-0']" />
                </button>
              </label>
            </div>

            <!-- Demo -->
            <div class="rounded-xl p-5 pt-12" style="background-color: var(--color-surface-canvas); background-image: radial-gradient(circle, var(--color-dot-grid) 1.2px, transparent 1.2px); background-size: 22px 22px;">
              <CaseStudySection
                id="ds-section-demo"
                label="Demo Section"
                :first="sectionFirst"
              >
                <h3 class="font-heading text-xl font-bold text-[var(--color-text-primary)]">Section title goes here</h3>
                <p class="text-[var(--color-text-secondary)] leading-relaxed">This is a live demo of CaseStudySection. Toggle <code class="font-mono bg-[var(--color-surface-subtle)] px-1 rounded text-xs">first</code> above to see how spacing changes.</p>
                <p class="text-[var(--color-text-secondary)] leading-relaxed">A second paragraph showing internal spacing.</p>
              </CaseStudySection>
            </div>

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;CaseStudySection
  id="overview"
  label="Overview"
  :first="{{ sectionFirst }}"
&gt;
  &lt;!-- section content --&gt;
&lt;/CaseStudySection&gt;</pre>
            </div>

            <!-- Props table -->
            <div class="rounded-xl bg-[var(--color-surface-subtle)] overflow-hidden overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-[var(--color-surface-subtle)]">
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Prop</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Type</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.04]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">id</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Used for scroll spy and anchor linking</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">label</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Floating brand label above the card</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">first</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">boolean</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Hero section: adds top margin, taller padding, looser internal spacing</td></tr>
                </tbody>
              </table>
            </div>
          </CaseStudySection>

          <!-- ── Dropdown ── -->
          <CaseStudySection id="dropdown" label="Dropdown">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Dropdown</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">A reusable trigger-and-panel shell. Handles open/close toggle, outside-click dismissal, and ARIA attributes. Used directly in the Header for the theme picker and accessibility panel. Panel position, role, and content are fully configurable.</p>

            <!-- Demo: static open-state mockup -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] pt-5 px-5 pb-52 flex justify-center items-start">
              <div class="relative pointer-events-none select-none">
                <button
                  type="button"
                  class="flex items-center gap-1 rounded border border-[var(--color-border)] bg-[var(--color-surface-elevation-1)] px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)]"
                  aria-haspopup="listbox"
                  aria-expanded="true"
                  aria-label="Choose theme"
                >
                  Themes
                </button>
                <div class="absolute right-0 top-full mt-1 z-10 min-w-[16rem] rounded border border-[var(--color-border)] bg-[var(--color-surface-elevation-1)] py-1 shadow-lg">
                  <ul>
                    <li>
                      <div class="w-full px-4 py-2 text-left text-sm">
                        <span class="font-medium">Default</span>
                        <span class="block text-xs opacity-60">Light and minimal</span>
                      </div>
                    </li>
                    <li>
                      <div class="w-full px-4 py-2 text-left text-sm bg-[var(--color-surface-decorative)] text-[var(--color-brand-primary)]">
                        <span class="font-medium">Bauhaus</span>
                        <span class="block text-xs opacity-60">High contrast, geometric</span>
                      </div>
                    </li>
                    <li>
                      <div class="w-full px-4 py-2 text-left text-sm">
                        <span class="font-medium">Nocturne</span>
                        <span class="block text-xs opacity-60">Dark and moody</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Props -->
            <div class="rounded-xl border border-black/[0.08] overflow-hidden overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead class="bg-[var(--color-surface-subtle)]">
                  <tr>
                    <th class="px-4 py-3 text-xs font-semibold text-[var(--color-text-primary)]">Prop</th>
                    <th class="px-4 py-3 text-xs font-semibold text-[var(--color-text-primary)]">Type</th>
                    <th class="px-4 py-3 text-xs font-semibold text-[var(--color-text-primary)]">Default</th>
                    <th class="px-4 py-3 text-xs font-semibold text-[var(--color-text-primary)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.05]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">label</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]"></td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Button label text. Required.</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">triggerAriaLabel</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">label</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">aria-label for the trigger button. Defaults to label.</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">haspopup</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">"true"</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">aria-haspopup value for the trigger. Use "listbox" or "dialog" as appropriate.</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">panelClass</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">"right-0 top-full mt-1"</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Positioning classes appended to the panel div.</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">panelRole</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]"></td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">role attribute on the panel div. Omit for generic panels.</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">panelAriaLabel</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]"></td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">aria-label for the panel div.</td></tr>
                </tbody>
              </table>
            </div>

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;Dropdown label="Options" haspopup="listbox"&gt;
  &lt;ul role="listbox"&gt;
    &lt;li role="option"&gt;
      &lt;button @click="select(id)"&gt;Label&lt;/button&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/Dropdown&gt;</pre>
            </div>
          </CaseStudySection>

          <!-- ── Header ── -->
          <CaseStudySection id="header" label="Header">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Header</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">The sticky site header rendered globally via <code class="font-mono bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded text-xs">AppLayout.vue</code>. Contains the logo, navigation links, theme switcher, and accessibility panel. No props. Connects to <code class="font-mono bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded text-xs">useThemeStore</code> and <code class="font-mono bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded text-xs">useA11yStore</code> directly.</p>

            <!-- Static mockup -->
            <div class="rounded-xl border border-[var(--color-surface-subtle)] p-8 flex justify-center">
              <nav class="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevation-1)] px-2 py-2 shadow-lg pointer-events-none select-none" aria-hidden="true">
                <span class="rounded-full p-2 text-[var(--color-text-secondary)]"><IconPalette class="h-4 w-4" /></span>
                <span class="rounded-full px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]">Work</span>
                <span class="rounded-full px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]">LinkedIn</span>
                <span class="rounded-full px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]">Resume</span>
                <span class="rounded-full p-2 text-[var(--color-text-secondary)]"><IconAccessible class="h-4 w-4" /></span>
              </nav>
            </div>

            <CardCallout
              label="Key internals"
              :items="[
                { title: 'Theme switcher', description: 'Opens a dropdown that lists all available themes. Calls useThemeStore().setTheme(id) on selection.' },
                { title: 'Accessibility panel', description: 'Toggles reduced motion, high contrast, dyslexia-friendly font, and text scale. Persisted to localStorage.' },
                { title: 'Active panel management', description: 'Only one panel (theme or a11y) can be open at a time. Clicking outside closes both.' },
              ]"
            />
          </CaseStudySection>

          <!-- ── ImageCarousel ── -->
          <CaseStudySection id="image-carousel" label="ImageCarousel">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">ImageCarousel</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">A crossfade image carousel with GSAP dissolve transitions. Uses CarouselNav for pagination. Used in case study sections to show sequences of screenshots.</p>

            <!-- Demo -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-5">
              <figure>
                <figcaption>Example caption</figcaption>
                <ImageCarousel
                  :images="[
                    '/project-pages/flora-design-system/flora-design-system-4.webp',
                    '/project-pages/flora-design-system/flora-design-system-5.webp',
                    '/project-pages/flora-design-system/flora-design-system-6.webp',
                  ]"
                  :alts="['Flora Design System screenshot 4', 'Flora Design System screenshot 5', 'Flora Design System screenshot 6']"
                />
              </figure>
            </div>

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;ImageCarousel
  :images="['/img-1.webp', '/img-2.webp', '/img-3.webp']"
  :alts="['Alt 1', 'Alt 2', 'Alt 3']"
/&gt;</pre>
            </div>

            <!-- Props table -->
            <div class="rounded-xl bg-[var(--color-surface-subtle)] overflow-hidden overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-[var(--color-surface-subtle)]">
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Prop</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Type</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.04]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">images</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string[]</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Required. Array of image paths to cycle through.</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">alts</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string[] (optional)</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Alt text per slide, indexed to match images. Defaults to empty string.</td></tr>
                </tbody>
              </table>
            </div>
          </CaseStudySection>

          <!-- ── StickyNote ── -->
          <CaseStudySection id="sticky-note" label="StickyNote">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">StickyNote</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">A yellow post-it note with a tape element. Used for highlights, HMW prompts, and key takeaways. Outer layout classes pass through via class fallthrough.</p>

            <!-- Controls -->
            <div class="flex flex-wrap gap-6 pt-2">
              <label class="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] cursor-pointer select-none">
                <code class="font-mono bg-[var(--color-surface-subtle)] px-1 rounded text-xs">title</code>
                <button
                  type="button"
                  role="switch"
                  :aria-checked="stickyTitle"
                  @click="stickyTitle = !stickyTitle"
                  :class="['relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200', stickyTitle ? 'bg-[var(--color-brand-primary)]' : 'bg-[var(--color-surface-subtle)]']"
                >
                  <span :class="['pointer-events-none block h-4 w-4 rounded-full bg-[var(--color-surface-decorative)] shadow transition-transform duration-200', stickyTitle ? 'translate-x-4' : 'translate-x-0']" />
                </button>
              </label>
              <label class="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] cursor-pointer select-none">
                <code class="font-mono bg-[var(--color-surface-subtle)] px-1 rounded text-xs">square</code>
                <button
                  type="button"
                  role="switch"
                  :aria-checked="stickySquare"
                  @click="stickySquare = !stickySquare"
                  :class="['relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200', stickySquare ? 'bg-[var(--color-brand-primary)]' : 'bg-[var(--color-surface-subtle)]']"
                >
                  <span :class="['pointer-events-none block h-4 w-4 rounded-full bg-[var(--color-surface-decorative)] shadow transition-transform duration-200', stickySquare ? 'translate-x-4' : 'translate-x-0']" />
                </button>
              </label>
            </div>

            <!-- Demo -->
            <div class="rounded-xl border border-[var(--color-surface-subtle)] p-8 flex justify-center">
              <StickyNote :rotate="-1" :square="stickySquare" class="w-40">
                <span v-if="stickyTitle" class="text-sm font-bold rounded-md px-2 py-0.5" style="background: var(--color-surface-sticky-label);">How might we</span>
                Keep Flora self-sustaining throughout 2025.
              </StickyNote>
            </div>

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;StickyNote :rotate="-1" :square="{{ stickySquare }}" class="flex-1"&gt;
  &lt;span class="..."&gt;How might we&lt;/span&gt;
  Note content goes here.
&lt;/StickyNote&gt;</pre>
            </div>

            <!-- Props table -->
            <div class="rounded-xl bg-[var(--color-surface-subtle)] overflow-hidden overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-[var(--color-surface-subtle)]">
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Prop</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Type</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--color-surface-subtle)]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">rotate</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">number</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Rotation in degrees (e.g. -1, 1, -0.5). Also controls tape angle.</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">square</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">boolean</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Forces aspect-square layout, used for HMW prompt notes.</td></tr>
                </tbody>
              </table>
            </div>
          </CaseStudySection>

          <!-- ── SegmentedControl ── -->
          <CaseStudySection id="segmented-control" label="SegmentedControl">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">SegmentedControl</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">A pill-shaped toggle with a sliding brand-colored indicator. Used to switch between two labeled states, such as Before and After. Supports any number of options via the <code class="font-mono bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded text-xs">options</code> prop and works with <code class="font-mono bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded text-xs">v-model</code>.</p>

            <!-- Demo -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-5 flex justify-center">
              <SegmentedControl
                :options="['Before', 'After']"
                v-model="segmentedValue"
              />
            </div>

            <!-- Props -->
            <div class="rounded-xl border border-black/[0.08] overflow-hidden overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead class="bg-[var(--color-surface-subtle)]">
                  <tr>
                    <th class="px-4 py-3 text-xs font-semibold text-[var(--color-text-primary)]">Prop</th>
                    <th class="px-4 py-3 text-xs font-semibold text-[var(--color-text-primary)]">Type</th>
                    <th class="px-4 py-3 text-xs font-semibold text-[var(--color-text-primary)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.05]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">options</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string[]</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Labels for each segment.</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">modelValue</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">number</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Zero-indexed active segment. Use with v-model.</td></tr>
                </tbody>
              </table>
            </div>

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;SegmentedControl
  :options="['Before', 'After']"
  v-model="activeStep"
/&gt;</pre>
            </div>
          </CaseStudySection>

          <!-- ── TagPill ── -->
          <CaseStudySection id="tag-pill" label="TagPill">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">TagPill</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">An inline label pill for categorising work. Used in project page headers and project cards to surface skills, methods, and disciplines at a glance.</p>

            <!-- Demo -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-5">
              <div class="flex flex-wrap gap-2">
                <TagPill label="Design System" />
                <TagPill label="User Testing" />
                <TagPill label="A/B Testing" />
                <TagPill label="Strategy" />
              </div>
            </div>

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-text-primary)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-[var(--color-text-white)] leading-relaxed font-mono whitespace-pre">&lt;TagPill label="Design System" /&gt;</pre>
            </div>

            <!-- Props table -->
            <div class="rounded-xl bg-[var(--color-surface-subtle)] overflow-hidden overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-[var(--color-surface-subtle)]">
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Prop</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Type</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.04]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-text-primary)]">label</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-text-secondary)]">Text displayed inside the pill</td></tr>
                </tbody>
              </table>
            </div>
          </CaseStudySection>

          <!-- ── TimeaAgent ── -->
          <CaseStudySection id="timea-agent" label="TimeaAgent">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">TimeaAgent</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">A sticky chat widget rendered globally via <code class="font-mono bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded text-xs">AppLayout.vue</code>. Sends questions to the Gemini API via <code class="font-mono bg-[var(--color-surface-subtle)] px-1.5 py-0.5 rounded text-xs">api/chat.js</code> and falls back to a local scoring-based knowledge base when the API is unavailable. No props.</p>

            <!-- Static visual mockup -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-8 flex flex-col gap-6 items-center pointer-events-none select-none">
              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Collapsed</p>
              <button class="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevation-1)] px-5 py-3 text-sm font-medium text-[var(--color-text-secondary)] shadow-lg">
                <img src="/main-page/timeaAgent.webp" alt="" aria-hidden="true" class="h-6 w-6 rounded-full object-cover" />
                Get to know Timea
              </button>

              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">Expanded</p>
              <div class="w-full max-w-md flex flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevation-1)] shadow-xl">
                <div class="flex items-center gap-3 bg-[var(--color-brand-primary)] px-4 py-3">
                  <img src="/main-page/timeaAgent.webp" alt="" class="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[var(--color-button-text-primary)]" />
                  <div class="flex flex-col leading-tight">
                    <span class="text-base font-semibold text-[var(--color-button-text-primary)]">TimeaAgent</span>
                    <span class="text-sm text-[var(--color-button-text-primary)] opacity-75">AI assistant · Powered by Gemini</span>
                  </div>
                  <span class="ml-auto rounded-full border border-[var(--color-button-text-primary)] px-3 py-1 text-sm text-[var(--color-button-text-primary)]">Close</span>
                </div>
                <div class="flex flex-col gap-3 px-4 pt-5 pb-3">
                  <p class="text-base font-semibold text-[var(--color-text-primary)]">Curious about Timea? Start here.</p>
                  <div class="rounded-2xl border border-[var(--color-border)] px-4 py-3 text-left text-sm text-[var(--color-text-primary)]" style="background-color: var(--color-dusty-violet-100);">What has Timea been working on?</div>
                  <div class="rounded-2xl border border-[var(--color-border)] px-4 py-3 text-left text-sm text-[var(--color-text-primary)]" style="background-color: var(--color-dusty-violet-100);">What is Timea's design process?</div>
                </div>
                <div class="flex items-center gap-2 px-2 py-1 mx-2 mb-2 rounded-full border bg-[var(--color-surface-decorative)] border-[var(--color-border)]">
                  <span class="min-w-0 flex-1 px-3 py-1.5 text-sm text-[var(--color-text-secondary)]">Type your question...</span>
                </div>
              </div>
            </div>

            <CardCallout
              label="Key internals"
              :items="[
                { title: 'API + local fallback', description: 'Sends to Gemini API first. On failure or unavailability, scores the query against KNOWLEDGE entries in timeaAgentKnowledge.ts.' },
                { title: 'Knowledge base', description: 'Add or update Q&A content by editing the KNOWLEDGE array in src/data/timeaAgentKnowledge.ts.' },
                { title: 'Persistent position', description: 'Fixed to bottom-center. Expands into a chat panel on click. Collapses back when clicking outside.' },
              ]"
            />
          </CaseStudySection>


        </div><!-- /content -->

        <!-- Balances the left nav so content stays centered -->
        <div class="hidden lg:block w-52 shrink-0"></div>

      </div><!-- /sidebar + content -->
    </div><!-- /whiteboard panel -->
  </section>
</template>
