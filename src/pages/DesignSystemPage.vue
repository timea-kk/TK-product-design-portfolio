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
import StickyNote from '@/components/StickyNote.vue'
import CardStat from '@/components/CardStat.vue'

const NAV_SECTIONS = [
  { id: 'colors',             label: 'Colors',           group: 'Foundations' },
  { id: 'typography',         label: 'Typography',       group: 'Foundations' },
  { id: 'card-callout',        label: 'CardCallout',      group: 'Components' },
  { id: 'card-interactive',   label: 'CardInteractive',  group: 'Components' },
  { id: 'card-stat',          label: 'CardStat',         group: 'Components' },
  { id: 'case-study-nav',     label: 'CaseStudyNav',     group: 'Components' },
  { id: 'case-study-section', label: 'CaseStudySection', group: 'Components' },
  { id: 'header',             label: 'Header',           group: 'Components' },
  { id: 'sticky-note',        label: 'StickyNote',       group: 'Components' },
  { id: 'timea-agent',        label: 'TimeaAgent',       group: 'Components' },
]

const panelRef = ref<HTMLElement | null>(null)

// CardCallout demo state
const calloutDivided = ref(true)
const calloutUseItems = ref(false)

// CardInteractive demo state
const activeInteractiveStep = ref(0)

// StickyNote demo state
const stickySmall = ref(false)
const stickySquare = ref(false)

// CaseStudySection demo state
const sectionFirst = ref(false)
const sectionLoose = ref(false)

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
  {
    primitive: { group: 'Neutrals', step: 'white', hex: '#ffffff', varName: '--color-white' },
    token:     { name: '--color-cta-text',         hex: '#ffffff',                        label: 'CTA Text' },
    usedIn:    ['TimeaAgent'],
  },
  {
    primitive: { group: 'Dusty Violet', step: '50',  hex: '#f0e9f3', varName: '--color-dusty-violet-50' },
    token:     { name: '--color-descriptor-bg',    hex: 'rgba(153,102,170,0.1)',          label: 'Descriptor BG' },
    usedIn:    ['RotatingDescriptor'],
  },
  {
    primitive: { group: 'Dusty Violet', step: '200', hex: '#d9c7e0', varName: '--color-dusty-violet-200' },
    token:     { name: '--color-surface',          hex: 'var(--color-dusty-violet-200)',  label: 'Surface' },
    usedIn:    ['AppLayout', 'Header', 'TimeaAgent'],
  },
  {
    primitive: { group: 'Dusty Violet', step: '500', hex: '#9966AA', varName: '--color-dusty-violet-500' },
    token:     { name: '--color-brand',            hex: 'var(--color-dusty-violet-500)',  label: 'Brand' },
    usedIn:    ['CardCallout', 'CardInteractive', 'CardStat', 'CaseStudySection', 'CaseStudyNav', 'Header', 'TimeaAgent', 'RotatingDescriptor'],
  },
  {
    primitive: { group: 'Dusty Violet', step: '500', hex: '#9966AA', varName: '--color-dusty-violet-500' },
    token:     { name: '--color-cta-bg',           hex: 'var(--color-dusty-violet-500)',  label: 'CTA Background' },
    usedIn:    ['TimeaAgent'],
  },
  {
    primitive: { group: 'Dusty Violet', step: '500', hex: '#9966AA', varName: '--color-dusty-violet-500' },
    token:     { name: '--color-logo',             hex: 'var(--color-dusty-violet-500)',  label: 'Logo' },
    usedIn:    ['Header'],
  },
  {
    primitive: { group: 'Dusty Violet', step: '600', hex: '#7b5288', varName: '--color-dusty-violet-600' },
    token:     { name: '--color-brand-secondary',  hex: 'var(--color-dusty-violet-600)',  label: 'Brand Secondary' },
    usedIn:    ['Theme'],
  },
  {
    primitive: { group: 'Dusty Violet', step: '900', hex: '#312036', varName: '--color-dusty-violet-900' },
    token:     { name: '--color-headline',         hex: 'var(--color-dusty-violet-900)',  label: 'Headline' },
    usedIn:    ['CardCallout', 'CardInteractive', 'CardStat', 'StickyNote', 'CaseStudyNav', 'TimeaAgent'],
  },
  {
    primitive: { group: 'Golden Honey', step: '50',  hex: '#fefbf5', varName: '--color-golden-honey-50' },
    token:     { name: '--color-surface-elevated', hex: 'var(--color-golden-honey-50)',   label: 'Surface Elevated' },
    usedIn:    ['Header', 'TimeaAgent'],
  },
  {
    primitive: { group: 'Golden Honey', step: '200', hex: '#fae9c4', varName: '--color-golden-honey-200' },
    token:     { name: '--color-border',           hex: 'var(--color-golden-honey-200)',  label: 'Border' },
    usedIn:    ['Header', 'TimeaAgent'],
  },
  {
    primitive: { group: 'Golden Honey', step: '400', hex: '#f2c96c', varName: '--color-golden-honey-400' },
    token:     { name: '--color-sticky-note-bg',   hex: 'var(--color-golden-honey-400)',  label: 'Sticky Note BG' },
    usedIn:    ['StickyNote'],
  },
  {
    primitive: { group: 'Golden Honey', step: '500', hex: '#EDB73B', varName: '--color-golden-honey-500' },
    token:     { name: '--color-sticky-note-label', hex: 'var(--color-golden-honey-500)', label: 'Sticky Note Label' },
    usedIn:    ['StickyNote'],
  },
  {
    primitive: { group: 'Deep Maroon', step: '600', hex: '#7D5A5A', varName: '--color-deep-maroon-600' },
    token:     { name: '--color-muted',            hex: 'var(--color-deep-maroon-600)',   label: 'Muted' },
    usedIn:    ['CardCallout', 'CardInteractive', 'CardStat', 'CaseStudyNav', 'Header', 'TimeaAgent'],
  },
]

const GROUP_ORDER = ['Neutrals', 'Dusty Violet', 'Golden Honey', 'Deep Maroon', '']
const STEP_ORDER  = ['white', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900']

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
</script>

<template>
  <section
    class="h-screen p-0 sm:p-6 lg:p-[40px] flex flex-col"
    aria-labelledby="ds-heading"
  >
    <div
      ref="panelRef"
      class="h-full w-full overflow-y-auto sm:rounded-3xl sm:border sm:border-black/[0.06]"
      style="
        background-color: #f7f6f2;
        background-image: radial-gradient(circle, rgba(0,0,0,0.13) 1.2px, transparent 1.2px);
        background-size: 22px 22px;
      "
    >
      <div class="flex gap-8 px-4 sm:px-8 lg:px-14 justify-center pt-20 pb-14 sm:pt-10 sm:pb-14">

        <CaseStudyNav :sections="NAV_SECTIONS" :panel="panelRef" />

        <div class="w-full min-w-0 max-w-4xl space-y-24">

          <!-- ── Foundations ── -->
          <CaseStudySection id="colors" label="Colors" first>
            <div class="space-y-10">
              <div class="space-y-6">
                <div>
                  <h2 class="font-heading text-xl font-bold text-[var(--color-headline)]">Primitive Colors</h2>
                  <p class="text-sm text-[var(--color-muted)] mt-1">Raw color palette values. Use semantic tokens in components, not these directly.</p>
                </div>
                <div class="space-y-6">
                  <div v-for="group in PRIMITIVE_COLORS" :key="group.group" class="space-y-2">
                    <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">{{ group.group }}</p>
                    <div class="grid grid-cols-10 gap-1.5 overflow-x-auto pb-1">
                      <div
                        v-for="color in group.colors"
                        :key="color.label"
                        class="rounded-lg border border-black/[0.06] overflow-hidden min-w-0"
                      >
                        <div class="h-10 w-full" :style="{ background: color.hex }"></div>
                        <div class="px-2 py-1.5 bg-white space-y-0.5">
                          <p class="text-xs font-semibold text-[var(--color-headline)] leading-tight">{{ color.label }}</p>
                          <p class="font-mono text-[10px] text-[var(--color-muted)] opacity-70 truncate">{{ color.hex }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <h2 class="font-heading text-xl font-bold text-[var(--color-headline)]">Semantic Tokens</h2>
                  <p class="text-sm text-[var(--color-muted)] mt-1">Hover any item to trace its connections.</p>
                </div>

                <!-- 3-column graph -->
                <div ref="mapContainer" class="relative select-none">

                  <!-- SVG lines overlay -->
                  <svg class="absolute inset-0 w-full h-full pointer-events-none" style="overflow: visible;">
                    <g v-for="line in activeLines" :key="line.id">
                      <path
                        :d="line.d"
                        fill="none"
                        stroke="var(--color-brand)"
                        stroke-width="1.5"
                        stroke-opacity="0.5"
                        stroke-linecap="round"
                      />
                      <circle :cx="line.x1" :cy="line.y1" r="3" fill="var(--color-brand)" fill-opacity="0.6" />
                      <circle :cx="line.x2" :cy="line.y2" r="3" fill="var(--color-brand)" fill-opacity="0.6" />
                    </g>
                  </svg>

                  <!-- columns -->
                  <div class="grid grid-cols-3 gap-6">

                    <!-- primitives -->
                    <div class="space-y-1">
                      <p class="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)] pb-2">Primitive</p>
                      <div
                        v-for="p in uniquePrimitives"
                        :key="primKey(p)"
                        :ref="(el) => { if (el) primitiveEls[primKey(p)] = el as HTMLElement }"
                        class="flex items-center gap-2 px-2 py-2 rounded-lg cursor-default transition-colors duration-100 ring-inset w-fit"
                        :class="hoveredId === `prim:${primKey(p)}`
                          ? 'bg-[var(--color-brand)]/[0.12] ring-1 ring-[var(--color-brand)]/50'
                          : highlightedPrimitives.has(primKey(p))
                            ? 'bg-[var(--color-brand)]/[0.07] ring-1 ring-[var(--color-brand)]/20'
                            : 'hover:bg-black/[0.03]'"
                        @mouseenter="hoverPrimitive(p)"
                        @mouseleave="clearHover()"
                      >
                        <div class="w-5 h-5 rounded shrink-0 border border-black/[0.10]" :style="{ background: p.hex }"></div>
                        <div class="min-w-0">
                          <p class="font-mono text-[10px] text-[var(--color-headline)] leading-tight truncate">{{ p.varName || '#ffffff' }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- tokens -->
                    <div class="space-y-1">
                      <p class="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)] pb-2">Token</p>
                      <div
                        v-for="entry in SEMANTIC_MAP"
                        :key="entry.token.name"
                        :ref="(el) => { if (el) tokenEls[entry.token.name] = el as HTMLElement }"
                        class="flex items-center gap-2 px-2 py-2 rounded-lg cursor-default transition-colors duration-100 ring-inset w-fit"
                        :class="hoveredId === `token:${entry.token.name}`
                          ? 'bg-[var(--color-brand)]/[0.12] ring-1 ring-[var(--color-brand)]/50'
                          : highlightedTokens.has(entry.token.name)
                            ? 'bg-[var(--color-brand)]/[0.07] ring-1 ring-[var(--color-brand)]/20'
                            : 'hover:bg-black/[0.03]'"
                        @mouseenter="hoverToken(entry)"
                        @mouseleave="clearHover()"
                      >
                        <div class="w-5 h-5 rounded shrink-0 border border-black/[0.10]" :style="{ background: entry.token.hex }"></div>
                        <div class="min-w-0">
                          <p class="text-xs font-semibold text-[var(--color-headline)] leading-tight">{{ entry.token.label }}</p>
                          <p class="font-mono text-[10px] text-[var(--color-muted)] truncate">{{ entry.token.name }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- components -->
                    <div class="space-y-1">
                      <p class="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)] pb-2">Used in</p>
                      <div
                        v-for="comp in uniqueComponents"
                        :key="comp"
                        :ref="(el) => { if (el) componentEls[comp] = el as HTMLElement }"
                        class="flex items-center px-2 py-2 rounded-lg cursor-default transition-colors duration-100 ring-inset w-fit"
                        :class="hoveredId === `comp:${comp}`
                          ? 'bg-[var(--color-brand)]/[0.12] ring-1 ring-[var(--color-brand)]/50'
                          : highlightedComponents.has(comp)
                            ? 'bg-[var(--color-brand)]/[0.07] ring-1 ring-[var(--color-brand)]/20'
                            : 'hover:bg-black/[0.03]'"
                        @mouseenter="hoverComponent(comp)"
                        @mouseleave="clearHover()"
                      >
                        <p class="text-xs font-semibold text-[var(--color-headline)]">{{ comp }}</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </CaseStudySection>

          <!-- ── Typography ── -->
          <CaseStudySection id="typography" label="Typography">
            <div class="space-y-4">
              <div class="rounded-xl bg-white border border-black/[0.06] px-6 py-5 space-y-4">
                <div class="space-y-1">
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Heading font</p>
                  <p class="font-mono text-xs text-[var(--color-muted)]">--font-heading: 'Bricolage Grotesque', Georgia, serif</p>
                  <p class="font-heading text-4xl font-black text-[var(--color-headline)] mt-2">The quick brown fox</p>
                  <p class="font-heading text-2xl font-bold text-[var(--color-headline)]">The quick brown fox</p>
                  <p class="font-heading text-xl font-semibold text-[var(--color-headline)]">The quick brown fox</p>
                </div>
                <hr class="border-black/[0.06]" />
                <div class="space-y-1">
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Body font</p>
                  <p class="font-mono text-xs text-[var(--color-muted)]">--font-sans: 'Inter', system-ui, sans-serif</p>
                  <p class="text-base text-[var(--color-headline)] mt-2">Body text - regular (16px)</p>
                  <p class="text-sm text-[var(--color-muted)]">Small body text - muted (14px)</p>
                  <p class="text-xs text-[var(--color-muted)]">Caption / label text (12px)</p>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Label uppercase tracking</p>
                </div>
              </div>
            </div>
          </CaseStudySection>

          <!-- ── CardCallout ── -->
          <CaseStudySection id="card-callout" label="CardCallout">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">CardCallout</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">A labeled content card used for callouts, summaries, and structured lists. Accepts a slot for freeform content or an <code class="font-mono bg-black/[0.05] px-1.5 py-0.5 rounded text-xs">items</code> prop for a divider list.</p>

            <!-- Controls -->
            <div class="flex flex-wrap gap-4 pt-2">
              <label class="flex items-center gap-2 text-sm text-[var(--color-muted)] cursor-pointer select-none">
                <input type="checkbox" v-model="calloutUseItems" class="rounded" />
                Use <code class="font-mono bg-black/[0.05] px-1 rounded text-xs">items</code> prop
              </label>
              <label class="flex items-center gap-2 text-sm text-[var(--color-muted)] cursor-pointer select-none" :class="!calloutUseItems && 'opacity-40 pointer-events-none'">
                <input type="checkbox" v-model="calloutDivided" :disabled="!calloutUseItems" class="rounded" />
                <code class="font-mono bg-black/[0.05] px-1 rounded text-xs">:divided</code>
              </label>
            </div>

            <!-- Demo -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-5">
              <CardCallout
                v-if="!calloutUseItems"
                label="Trade-off and impact"
              >
                <p class="text-[var(--color-muted)] leading-relaxed">Research showed emotional messaging was already working. The real <strong>retention gap</strong> was <strong>functional</strong>.</p>
              </CardCallout>
              <CardCallout
                v-else
                label="What I learned"
                :divided="calloutDivided"
                :items="[
                  { title: 'Parallel tracks accelerate learning', description: 'Running two tracks simultaneously let us cover more ground without waiting for sequential results.' },
                  { title: 'User language shapes stronger messaging', description: 'Listening to how users talked about Ecosia led directly to copy that converted better.' },
                  { title: 'Regional differences need their own lens', description: 'Germany consistently behaved differently and needed closer observation.' }
                ]"
              />
            </div>

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-headline)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-white/80 leading-relaxed font-mono whitespace-pre" v-if="!calloutUseItems">&lt;CardCallout label="Trade-off and impact"&gt;
  &lt;p class="text-[var(--color-muted)] leading-relaxed"&gt;
    Content goes here.
  &lt;/p&gt;
&lt;/CardCallout&gt;</pre>
              <pre class="text-xs text-white/80 leading-relaxed font-mono whitespace-pre" v-else>&lt;CardCallout
  label="What I learned"
  :divided="{{ calloutDivided }}"
  :items="[
    { title: 'Item title', description: 'Item description.' },
  ]"
/&gt;</pre>
            </div>

            <!-- Props table -->
            <div class="rounded-xl bg-black/[0.03] overflow-hidden">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-black/[0.06]">
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Prop</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Type</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Default</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.04]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">label</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">required</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Uppercase label shown above content</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">gap</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">'sm' | 'lg'</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">'sm'</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Internal spacing. Auto-set to 'lg' when items is provided</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">items</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">&#123; title, description &#125;[]</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">undefined</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Renders a structured list instead of the slot</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">divided</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">boolean</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">true</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Shows divider lines between items (only applies when items is set)</td></tr>
                </tbody>
              </table>
            </div>
          </CaseStudySection>

          <!-- ── CardInteractive ── -->
          <CaseStudySection id="card-interactive" label="CardInteractive">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">CardInteractive</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">A selectable button card used to represent steps or options. Shows active state with brand border and tinted background. Click a card below to toggle it.</p>

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
            <div class="rounded-xl bg-[var(--color-headline)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-white/80 leading-relaxed font-mono whitespace-pre">&lt;CardInteractive
  label="Step 1"
  title="Value Perception"
  description="See the product value in context."
  goal="Goal: make a search"
  :active="activeStep === 0"
  image="/path/to/image.png"
  image-alt="Description"
  @click="activeStep = 0"
/&gt;</pre>
            </div>

            <!-- Props table -->
            <div class="rounded-xl bg-black/[0.03] overflow-hidden">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-black/[0.06]">
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Prop</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Type</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.04]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">label</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Small label at the top of the card</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">title</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Bold headline inside the card</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">description</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Body text below the title</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">goal</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Small brand-colored goal line at the bottom</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">active</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">boolean</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Whether the card is currently selected</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">image</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">string (optional)</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Image shown on mobile when card is active</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">imageAlt</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">string (optional)</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Alt text for the mobile image</td></tr>
                </tbody>
              </table>
            </div>
          </CaseStudySection>

          <!-- ── CardStat ── -->
          <CaseStudySection id="card-stat" label="CardStat">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">CardStat</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">A metric display card. Used in experimentation and results sections to highlight key numbers. Always renders with <code class="font-mono bg-black/[0.05] px-1.5 py-0.5 rounded text-xs">flex-1</code> built in.</p>

            <!-- Demo -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-5">
              <div class="flex gap-3">
                <CardStat label="Conversion" value="+20–25%" description="increase" />
                <CardStat label="D1 retention" value="+3%" description="improvement" />
                <CardStat label="Experiments" value="9 of 12" description="shipped to 100%" />
              </div>
            </div>

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-headline)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-white/80 leading-relaxed font-mono whitespace-pre">&lt;CardStat
  label="Conversion"
  value="+20-25%"
  description="increase"
/&gt;</pre>
            </div>

            <!-- Props table -->
            <div class="rounded-xl bg-black/[0.03] overflow-hidden">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-black/[0.06]">
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Prop</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Type</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.04]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">label</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Uppercase label above the value</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">value</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Large bold number or metric</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">description</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Small muted label below the value</td></tr>
                </tbody>
              </table>
            </div>
          </CaseStudySection>

          <!-- ── CaseStudyNav ── -->
          <CaseStudySection id="case-study-nav" label="CaseStudyNav">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">CaseStudyNav</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">The sticky left navigation panel used on all case study pages. Handles scroll spy via a scroll listener on the scrollable panel element, and animates the active and hover indicators with GSAP. Only visible on desktop (lg and above).</p>

            <p class="text-sm text-[var(--color-muted)]">Scroll inside the demo box to see the active indicator update.</p>

            <!-- Demo -->
            <div
              ref="navDemoPanelRef"
              class="rounded-xl border-2 border-dashed border-black/[0.10] h-64 overflow-y-auto flex gap-6 px-6 py-6"
            >
              <CaseStudyNav :sections="NAV_DEMO_SECTIONS" :panel="navDemoPanelRef" />
              <div class="flex flex-col gap-8 flex-1 min-w-0">
                <div :id="s.id" v-for="s in NAV_DEMO_SECTIONS" :key="s.id" class="scroll-mt-4 rounded-xl bg-white border border-black/[0.06] px-4 py-5">
                  <p class="font-semibold text-[var(--color-headline)] text-sm">{{ s.label }}</p>
                  <p class="text-sm text-[var(--color-muted)] mt-1">Demo section content for {{ s.label }}.</p>
                </div>
              </div>
            </div>

            <div class="rounded-xl bg-[var(--color-headline)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-white/80 leading-relaxed font-mono whitespace-pre">const NAV_SECTIONS = [
  &#123; id: 'overview', label: 'Overview' &#125;,
  &#123; id: 'problem',  label: 'The Problem' &#125;,
]
const panelRef = ref&lt;HTMLElement | null&gt;(null)

&lt;div ref="panelRef" class="overflow-y-auto"&gt;
  &lt;CaseStudyNav :sections="NAV_SECTIONS" :panel="panelRef" /&gt;
&lt;/div&gt;</pre>
            </div>

            <!-- Props table -->
            <div class="rounded-xl bg-black/[0.03] overflow-hidden">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-black/[0.06]">
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Prop</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Type</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.04]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">sections</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">&#123; id: string; label: string &#125;[]</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">List of sections to render as nav items</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">panel</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">HTMLElement | null</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">The scrollable container element. The scroll listener attaches to this.</td></tr>
                </tbody>
              </table>
            </div>
          </CaseStudySection>

          <!-- ── CaseStudySection ── -->
          <CaseStudySection id="case-study-section" label="CaseStudySection">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">CaseStudySection</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">The white rounded card wrapper used for every section on case study pages. Has a floating brand label above it and supports three layout modes.</p>

            <!-- Controls -->
            <div class="flex flex-wrap gap-4 pt-2">
              <label class="flex items-center gap-2 text-sm text-[var(--color-muted)] cursor-pointer select-none">
                <input type="checkbox" v-model="sectionFirst" class="rounded" @change="sectionLoose = false" />
                <code class="font-mono bg-black/[0.05] px-1 rounded text-xs">first</code>
              </label>
              <label class="flex items-center gap-2 text-sm text-[var(--color-muted)] cursor-pointer select-none">
                <input type="checkbox" v-model="sectionLoose" class="rounded" @change="sectionFirst = false" />
                <code class="font-mono bg-black/[0.05] px-1 rounded text-xs">loose</code>
              </label>
            </div>

            <!-- Demo -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-5 pt-12">
              <CaseStudySection
                id="ds-section-demo"
                label="Demo Section"
                :first="sectionFirst"
                :loose="sectionLoose"
              >
                <h3 class="font-heading text-xl font-bold text-[var(--color-headline)]">Section title goes here</h3>
                <p class="text-[var(--color-muted)] leading-relaxed">This is a live demo of CaseStudySection. Toggle <code class="font-mono bg-black/[0.05] px-1 rounded text-xs">first</code> and <code class="font-mono bg-black/[0.05] px-1 rounded text-xs">loose</code> above to see how spacing changes.</p>
                <p class="text-[var(--color-muted)] leading-relaxed">A second paragraph showing internal spacing.</p>
              </CaseStudySection>
            </div>

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-headline)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-white/80 leading-relaxed font-mono whitespace-pre">&lt;CaseStudySection
  id="overview"
  label="Overview"
  :first="{{ sectionFirst }}"
  :loose="{{ sectionLoose }}"
&gt;
  &lt;!-- section content --&gt;
&lt;/CaseStudySection&gt;</pre>
            </div>

            <!-- Props table -->
            <div class="rounded-xl bg-black/[0.03] overflow-hidden">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-black/[0.06]">
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Prop</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Type</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.04]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">id</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Used for scroll spy and anchor linking</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">label</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">string</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Floating brand label above the card</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">first</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">boolean</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Hero section: adds top margin, taller padding, looser internal spacing</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">loose</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">boolean</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Content-heavy sections: looser internal spacing without hero treatment</td></tr>
                </tbody>
              </table>
            </div>
          </CaseStudySection>

          <!-- ── Header ── -->
          <CaseStudySection id="header" label="Header">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">Header</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">The sticky site header rendered globally via <code class="font-mono bg-black/[0.05] px-1.5 py-0.5 rounded text-xs">AppLayout.vue</code>. Contains the logo, navigation links, theme switcher, and accessibility panel. No props -- connects to <code class="font-mono bg-black/[0.05] px-1.5 py-0.5 rounded text-xs">useThemeStore</code> and <code class="font-mono bg-black/[0.05] px-1.5 py-0.5 rounded text-xs">useA11yStore</code> directly.</p>

            <!-- Static visual mockup -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-8 flex justify-center">
              <div class="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-2 py-2 shadow-lg pointer-events-none select-none">
                <button class="rounded-full p-2 text-[var(--color-muted)]">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                </button>
                <span class="rounded-full px-4 py-1.5 text-sm font-medium text-[var(--color-muted)]">Work</span>
                <span class="rounded-full px-4 py-1.5 text-sm font-medium text-[var(--color-brand)] font-semibold">Design System</span>
                <span class="rounded-full px-4 py-1.5 text-sm font-medium text-[var(--color-muted)]">About</span>
                <button class="rounded-full p-2 text-[var(--color-muted)]">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                </button>
              </div>
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

          <!-- ── StickyNote ── -->
          <CaseStudySection id="sticky-note" label="StickyNote">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">StickyNote</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">A yellow post-it note with a tape element. Used for highlights, HMW prompts, and key takeaways. Outer layout classes pass through via class fallthrough.</p>

            <!-- Controls -->
            <div class="flex flex-wrap gap-4 pt-2">
              <label class="flex items-center gap-2 text-sm text-[var(--color-muted)] cursor-pointer select-none">
                <input type="checkbox" v-model="stickySmall" class="rounded" />
                <code class="font-mono bg-black/[0.05] px-1 rounded text-xs">small</code>
              </label>
              <label class="flex items-center gap-2 text-sm text-[var(--color-muted)] cursor-pointer select-none">
                <input type="checkbox" v-model="stickySquare" class="rounded" />
                <code class="font-mono bg-black/[0.05] px-1 rounded text-xs">square</code>
              </label>
            </div>

            <!-- Demo -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-8 flex justify-center">
              <StickyNote :rotate="-1" :small="stickySmall" :square="stickySquare" class="w-40">
                <span v-if="stickySquare" class="text-sm font-bold rounded-md px-2 py-0.5" style="background: var(--color-sticky-note-label);">How might we</span>
                Keep Flora self-sustaining throughout 2025.
              </StickyNote>
            </div>

            <!-- Code -->
            <div class="rounded-xl bg-[var(--color-headline)] px-5 py-4 overflow-x-auto">
              <pre class="text-xs text-white/80 leading-relaxed font-mono whitespace-pre">&lt;StickyNote
  :rotate="-1"
  :small="{{ stickySmall }}"
  :square="{{ stickySquare }}"
  class="flex-1"
&gt;
  Note content goes here.
&lt;/StickyNote&gt;</pre>
            </div>

            <!-- Props table -->
            <div class="rounded-xl bg-black/[0.03] overflow-hidden">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-black/[0.06]">
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Prop</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Type</th>
                    <th class="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.04]">
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">rotate</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">number</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Rotation in degrees (e.g. -1, 1, -0.5). Also controls tape angle.</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">small</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">boolean</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Smaller tape strip, used for text-only notes</td></tr>
                  <tr><td class="px-4 py-3 font-mono text-xs text-[var(--color-headline)]">square</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">boolean</td><td class="px-4 py-3 text-xs text-[var(--color-muted)]">Forces aspect-square layout on mobile, used for HMW prompt notes</td></tr>
                </tbody>
              </table>
            </div>
          </CaseStudySection>

          <!-- ── TimeaAgent ── -->
          <CaseStudySection id="timea-agent" label="TimeaAgent">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">TimeaAgent</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">A sticky chat widget rendered globally via <code class="font-mono bg-black/[0.05] px-1.5 py-0.5 rounded text-xs">AppLayout.vue</code>. Sends questions to the Gemini API via <code class="font-mono bg-black/[0.05] px-1.5 py-0.5 rounded text-xs">api/chat.js</code> and falls back to a local scoring-based knowledge base when the API is unavailable. No props.</p>

            <!-- Static visual mockup -->
            <div class="rounded-xl border-2 border-dashed border-black/[0.10] p-8 flex flex-col gap-6 items-center pointer-events-none select-none">
              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Collapsed</p>
              <button class="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-5 py-3 text-sm font-medium text-[var(--color-muted)] shadow-lg">
                <img src="/main-page/timeaAgent.jpg" alt="" aria-hidden="true" class="h-6 w-6 rounded-full object-cover" />
                Get to know Timea
              </button>

              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Expanded</p>
              <div class="w-full max-w-md flex flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-xl">
                <div class="flex items-center gap-3 bg-[var(--color-brand)] px-4 py-3">
                  <img src="/main-page/timeaAgent.jpg" alt="" class="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[var(--color-cta-text)]" />
                  <div class="flex flex-col leading-tight">
                    <span class="text-base font-semibold text-[var(--color-cta-text)]">TimeaAgent</span>
                    <span class="text-sm text-[var(--color-cta-text)] opacity-75">AI assistant · Powered by Gemini</span>
                  </div>
                  <span class="ml-auto rounded-full border border-[var(--color-cta-text)] px-3 py-1 text-sm text-[var(--color-cta-text)]">Close</span>
                </div>
                <div class="flex flex-col gap-3 px-4 pt-5 pb-3">
                  <p class="text-base font-semibold text-[var(--color-headline)]">Curious about Timea? Start here.</p>
                  <div class="rounded-2xl border border-[var(--color-border)] px-4 py-3 text-left text-sm text-[var(--color-headline)]" style="background-color: #e7dbeb;">What has Timea been working on?</div>
                  <div class="rounded-2xl border border-[var(--color-border)] px-4 py-3 text-left text-sm text-[var(--color-headline)]" style="background-color: #e7dbeb;">What is Timea's design process?</div>
                </div>
                <div class="flex items-center gap-2 px-2 py-1 mx-2 mb-2 rounded-full border bg-white border-[var(--color-border)]">
                  <span class="min-w-0 flex-1 px-3 py-1.5 text-sm text-[var(--color-muted)]">Type your question...</span>
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
