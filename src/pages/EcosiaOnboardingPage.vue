<!--
  EcosiaOnboardingPage.vue – Case study: Building Ecosia's Onboarding Experience.
  Layout: sticky left nav (scroll spy) + white section cards on the dotted whiteboard.
  Images are placeholder rectangles until real assets are added.
-->

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const NAV_SECTIONS = [
  { id: 'overview',        label: 'Overview' },
  { id: 'problem',         label: 'The Problem' },
  { id: 'challenge',       label: 'The Approach' },
  { id: 'research',        label: 'Research' },
  { id: 'opportunities',   label: 'Opportunities' },
  { id: 'experimentation', label: 'Experimentation' },
  { id: 'strategy',        label: 'Strategy' },
  { id: 'execution',       label: 'Execution' },
  { id: 'results',         label: 'Results' },
]

const activeSection = ref('overview')
const panelRef = ref<HTMLElement | null>(null)
const activeStrategyStep = ref(0)
const activeExecutionStep = ref(0)
const beforeAfterStep = ref(0)
const serpStep = ref(0)

const serpFrontRef = ref<HTMLImageElement | null>(null)
const serpBackRef = ref<HTMLImageElement | null>(null)
const serpFrontSrc = ref('/project-pages/ecosia-onboarding/ecosia-onboarding-7.png')

const strategyFrontRef = ref<HTMLImageElement | null>(null)
const strategyBackRef = ref<HTMLImageElement | null>(null)
const strategyFrontSrc = ref('/project-pages/ecosia-onboarding/ecosia-onboarding-10.png')

const executionFrontRef = ref<HTMLImageElement | null>(null)
const executionBackRef = ref<HTMLImageElement | null>(null)
const executionFrontSrc = ref('/project-pages/ecosia-onboarding/ecosia-onboarding-13.png')

const beforeAfterFrontRef = ref<HTMLImageElement | null>(null)
const beforeAfterBackRef = ref<HTMLImageElement | null>(null)
const beforeAfterFrontSrc = ref('/project-pages/ecosia-onboarding/ecosia-onboarding-5.png')

const SERP_SRCS = [
  '/project-pages/ecosia-onboarding/ecosia-onboarding-7.png',
  '/project-pages/ecosia-onboarding/ecosia-onboarding-8.png',
  '/project-pages/ecosia-onboarding/ecosia-onboarding-9.png',
]
const STRATEGY_SRCS = [
  '/project-pages/ecosia-onboarding/ecosia-onboarding-10.png',
  '/project-pages/ecosia-onboarding/ecosia-onboarding-11.png',
  '/project-pages/ecosia-onboarding/ecosia-onboarding-12.png',
]
const EXECUTION_SRCS = [
  '/project-pages/ecosia-onboarding/ecosia-onboarding-13.png',
  '/project-pages/ecosia-onboarding/ecosia-onboarding-15.png',
  '/project-pages/ecosia-onboarding/ecosia-onboarding-14.png',
]

function dissolve(
  front: HTMLImageElement | null,
  back: HTMLImageElement | null,
  newSrc: string,
  onComplete: () => void
) {
  if (!front || !back) {
    onComplete()
    return
  }
  back.src = newSrc
  gsap.set(back, { opacity: 0 })
  const tl = gsap.timeline()
  tl.to(front, { opacity: 0, duration: 0.25 }, 0)
  tl.to(back, { opacity: 1, duration: 0.25 }, 0)
  tl.add(() => {
    onComplete()
    gsap.set(front, { opacity: 1 })
    gsap.set(back, { opacity: 0 })
  })
}

function serpDissolveStep(newStep: number) {
  serpStep.value = newStep
  dissolve(serpFrontRef.value, serpBackRef.value, SERP_SRCS[newStep], () => {
    serpFrontSrc.value = SERP_SRCS[newStep]
  })
}

function strategyDissolveStep(newStep: number) {
  activeStrategyStep.value = newStep
  dissolve(strategyFrontRef.value, strategyBackRef.value, STRATEGY_SRCS[newStep], () => {
    strategyFrontSrc.value = STRATEGY_SRCS[newStep]
  })
}

function executionDissolveStep(newStep: number) {
  activeExecutionStep.value = newStep
  dissolve(executionFrontRef.value, executionBackRef.value, EXECUTION_SRCS[newStep], () => {
    executionFrontSrc.value = EXECUTION_SRCS[newStep]
  })
}

function beforeAfterDissolve(newSrc: string, newStep: number) {
  beforeAfterStep.value = newStep
  dissolve(beforeAfterFrontRef.value, beforeAfterBackRef.value, newSrc, () => {
    beforeAfterFrontSrc.value = newSrc
  })
}

const navHoverIndicatorRef = ref<HTMLElement | null>(null)
const navActiveIndicatorRef = ref<HTMLElement | null>(null)
const navClickLock = ref(false)
const navItemRefs: (HTMLElement | null)[] = []

function setNavItemRef(el: unknown, i: number) {
  navItemRefs[i] = el as HTMLElement | null
}

function getIndicatorTop(id: string): number | null {
  const index = NAV_SECTIONS.findIndex(s => s.id === id)
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
  gsap.to(indicator, { top, duration: 0.25, ease: 'power1.inOut' })
}

function updateNavActiveIndicator(id: string) {
  const top = getIndicatorTop(id)
  const indicator = navActiveIndicatorRef.value
  if (top === null || !indicator) return
  gsap.to(indicator, { top, duration: 0.25, ease: 'power1.inOut' })
}

function scrollToSection(id: string) {
  /* c8 ignore next */
  if (!panelRef.value) return
  const el = document.getElementById(id)
  if (el) {
    const panelRect = panelRef.value.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    const labelAboveCard = 35
    const navStickyTop = 40
    const target = Math.max(0, panelRef.value.scrollTop + elRect.top - panelRect.top - labelAboveCard - navStickyTop)
    panelRef.value.scrollTo({ top: target, behavior: 'smooth' })
  }
}

function updateActiveSection() {
  const panel = panelRef.value
  /* c8 ignore next */
  if (!panel) return
  const threshold = panel.getBoundingClientRect().top + panel.clientHeight * 0.4
  let active = NAV_SECTIONS[0].id
  for (const { id } of NAV_SECTIONS) {
    const el = document.getElementById(id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= threshold) active = id
  }
  activeSection.value = active
}

onMounted(() => {
  panelRef.value?.addEventListener('scroll', updateActiveSection, { passive: true })
  updateActiveSection()
  nextTick(() => {
    updateNavIndicator(activeSection.value)
    updateNavActiveIndicator(activeSection.value)
  })
})

onUnmounted(() => {
  /* c8 ignore next */
  panelRef.value?.removeEventListener('scroll', updateActiveSection)
})

function navClick(id: string) {
  updateNavActiveIndicator(id)
  navClickLock.value = true
  scrollToSection(id)
  setTimeout(() => { navClickLock.value = false }, 800)
}

watch(activeSection, (id) => {
  if (!navClickLock.value) updateNavActiveIndicator(id)
})
</script>

<template>
  <section
    class="h-screen p-0 sm:p-6 lg:p-[40px] flex flex-col"
    aria-labelledby="project-heading"
  >
    <!-- Whiteboard panel: fixed to viewport with 60px inset, content scrolls inside -->
    <div
      ref="panelRef"
      class="h-full w-full overflow-y-auto sm:rounded-3xl sm:border sm:border-black/[0.06]"
      style="
        background-color: #f7f6f2;
        background-image: radial-gradient(circle, rgba(0,0,0,0.13) 1.2px, transparent 1.2px);
        background-size: 22px 22px;
      "
    >
      <!-- Inner: sidebar + content -->
      <div class="flex gap-8 px-4 sm:px-8 lg:px-14 justify-center pt-20 pb-14 sm:pt-10 sm:pb-14">

        <!-- ── Left nav (desktop only) — floating white card ── -->
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
                    style="top:0; background:#c7abd1"
                  ></div>
                  <div
                    ref="navActiveIndicatorRef"
                    class="absolute w-1 h-5 bg-[var(--color-brand)] rounded-full left-1/2 -translate-x-1/2"
                    style="top:0"
                  ></div>
                </div>
                <ul class="flex-1 space-y-0.5">
                  <li v-for="(s, i) in NAV_SECTIONS" :key="s.id">
                    <button
                      type="button"
                      :ref="(el) => setNavItemRef(el, i)"
                      @click="navClick(s.id)"
                      @mouseenter="updateNavIndicator(s.id)"
                      :class="[
                        'w-full text-left px-3 py-1.5 rounded-lg text-sm leading-tight transition-all duration-200',
                        activeSection === s.id
                          ? 'font-semibold text-[var(--color-headline)]'
                          : 'text-[var(--color-muted)] hover:text-[var(--color-headline)] hover:translate-x-1'
                      ]"
                    >{{ s.label }}</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <!-- ── Main content ── -->
        <div class="w-full min-w-0 max-w-4xl space-y-24">

          <!-- ── Hero + TL;DR (merged) ── -->
          <!-- mt-[35px]: first child gets no space-y gap, so we add 35px manually -->
          <!-- 40px flex padding-top + 35px margin-top = 75px from panel top -->
          <!-- label is 35px above card → label lands at 40px = nav sticky top ✓ -->
          <div id="overview" class="mt-[35px] scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-5 py-8 sm:px-10 sm:py-14 space-y-8">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">Overview</p>

            <!-- Title block -->
            <div class="space-y-4">
              <h1
                id="project-heading"
                class="font-heading text-3xl sm:text-4xl font-black leading-tight tracking-tight text-[var(--color-headline)] lg:text-6xl"
              >
                Building Ecosia's Onboarding Experience
              </h1>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in ['Generative Research', 'Ideation Workshop', 'A/B Testing', 'Strategy']"
                  :key="tag"
                  class="rounded-full border border-black/10 bg-black/[0.04] px-4 py-1 text-sm text-[var(--color-muted)]"
                >{{ tag }}</span>
              </div>
              <div class="flex flex-wrap gap-6 sm:gap-12 pt-2">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] opacity-60">Timeline</p>
                  <p class="mt-1 text-[var(--color-muted)]">2024 → 2025</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] opacity-60">My role</p>
                  <p class="mt-1 text-[var(--color-muted)]">Product Designer</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] opacity-60">Collaborated with</p>
                  <p class="mt-1 text-[var(--color-muted)]">Engineers, Product Manager, UX Researcher</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] opacity-60">Company</p>
                  <p class="mt-1 text-[var(--color-muted)]">Ecosia</p>
                </div>
              </div>
            </div>

            <hr class="border-black/[0.06]" />

            <!-- TL;DR -->
            <div class="space-y-3">
              <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">TL;DR</h2>
              <p class="text-[var(--color-muted)] leading-relaxed">
                I built Ecosia's first web onboarding experience, defining how the product introduced itself and communicated its value to new users. Through research and iterative experimentation, I helped users understand the mission, build trust, and return after their first search, resulting in a <strong>20–25% conversion increase</strong> and a <strong>3% lift in D1 retention</strong>.
              </p>
            </div>

            <figure>
              <img src="/project-pages/ecosia-onboarding/ecosia-onboarding-1.png" alt="Ecosia onboarding screen" class="w-full rounded-xl border-2 border-[#275243]" />
              <figcaption class="mt-2 text-xs text-center text-[var(--color-muted)]">Ecosia Landing Page snapshot</figcaption>
            </figure>

          </div>

          <!-- ── Context ── -->

          <!-- ── The Problem ── -->
          <div id="problem" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-5 py-8 sm:px-10 sm:py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">The Problem</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">Users left before understanding what Ecosia was</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              Ecosia is a search engine that dedicates 100% of its profits to planting trees all over the world. Like other search engines, it generates revenue through ads, but this revenue goes towards a unique and sustainable mission. After switching to Google as a search partner, Ecosia needed to improve retention by helping users make it their default search engine. Despite strong awareness, many <strong>new users left after their first search</strong>, often before understanding its mission or impact.
            </p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              I joined Ecosia in 2020 as a Product Designer in a cross functional team focused on user engagement. The onboarding project was part of a broader effort to reduce early drop off and build a scalable way to introduce new users to Ecosia.
            </p>
            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">Business and user problems</p>
            <!-- Mobile: bullet list -->
            <ul class="sm:hidden space-y-2 pt-2 text-sm text-[var(--color-muted)] leading-relaxed list-none">
              <li class="flex gap-2"><span class="text-[var(--color-brand)] shrink-0">•</span><span><strong class="text-[var(--color-headline)]">Low conversion and retention</strong> with limited insight into why users dropped off</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand)] shrink-0">•</span><span><strong class="text-[var(--color-headline)]">Unclear value</strong> as users didn't understand what Ecosia was or how it worked</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand)] shrink-0">•</span><span><strong class="text-[var(--color-headline)]">No install guidance</strong> on how to set Ecosia as the default search engine</span></li>
            </ul>
            <!-- Desktop: sticky notes -->
            <div class="hidden sm:block pt-5">
            <div class="flex gap-3">
              <div class="relative flex-1" style="transform: rotate(-1deg)">
                <div class="absolute z-10" style="width: 4rem; height: 1.6rem; top: -0.8rem; left: 50%; transform: translateX(-50%) rotate(2deg); background: rgba(210, 228, 255, 0.68); box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.10);"></div>
                <div class="flex flex-col items-center gap-3 px-3 py-5 text-xs leading-relaxed text-center text-[var(--color-headline)] sm:px-5 sm:py-6 sm:text-sm" style="background: #f2c96c; box-shadow: 1px 2px 3px rgba(0,0,0,0.08), 4px 10px 20px rgba(0,0,0,0.18);"><span class="text-sm font-bold rounded-md px-2 py-0.5 sm:text-base" style="background: #d4a017;">1</span>Low conversion and retention rates with limited insight into why users dropped off</div>
              </div>
              <div class="relative flex-1" style="transform: rotate(1deg)">
                <div class="absolute z-10" style="width: 4rem; height: 1.6rem; top: -0.8rem; left: 50%; transform: translateX(-50%) rotate(-2deg); background: rgba(210, 228, 255, 0.68); box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.10);"></div>
                <div class="flex flex-col items-center gap-3 px-3 py-5 text-xs leading-relaxed text-center text-[var(--color-headline)] sm:px-5 sm:py-6 sm:text-sm" style="background: #f2c96c; box-shadow: 1px 2px 3px rgba(0,0,0,0.08), 4px 10px 20px rgba(0,0,0,0.18);"><span class="text-sm font-bold rounded-md px-2 py-0.5 sm:text-base" style="background: #d4a017;">2</span>Unclear value as users didn't understand what Ecosia was or how it worked</div>
              </div>
              <div class="relative flex-1" style="transform: rotate(-0.5deg)">
                <div class="absolute z-10" style="width: 4rem; height: 1.6rem; top: -0.8rem; left: 50%; transform: translateX(-50%) rotate(1.5deg); background: rgba(210, 228, 255, 0.68); box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.10);"></div>
                <div class="flex flex-col items-center gap-3 px-3 py-5 text-xs leading-relaxed text-center text-[var(--color-headline)] sm:px-5 sm:py-6 sm:text-sm" style="background: #f2c96c; box-shadow: 1px 2px 3px rgba(0,0,0,0.08), 4px 10px 20px rgba(0,0,0,0.18);"><span class="text-sm font-bold rounded-md px-2 py-0.5 sm:text-base" style="background: #d4a017;">3</span>No guidance on how to install or set Ecosia as the default search engine</div>
              </div>
            </div>
            </div>
            <figure class="pt-4 space-y-3">
              <img src="/project-pages/ecosia-onboarding/ecosia-onboarding-2.png" alt="Ecosia onboarding screen" class="w-full rounded-xl border-2 border-[#275243]" />
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">Product landscape</figcaption>
            </figure>
          </div>

          <!-- ── The Challenge ── -->
          <div id="challenge" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-5 py-8 sm:px-10 sm:py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">The Approach</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">Injecting tool evaluation insights into the product</h2>
            <div class="flex flex-col sm:flex-row gap-8 items-start">
              <div class="flex flex-col gap-4 flex-1 text-[var(--color-muted)] leading-relaxed">
                <p>We realized that users arrived curious, but left before realizing how Ecosia worked and what made it different.</p>
                <p>The <strong>challenge</strong> was to design an onboarding experience that built trust, encouraged action, and fit naturally into existing user behavior.</p>
                <p>To make this possible, I defined a clear research and experimentation track that aligned product, design, and growth goals across multiple teams.</p>
              </div>
              <div class="relative w-1/2 mx-auto sm:w-56 sm:mx-0 sm:shrink-0 sm:mt-4" style="transform: rotate(-1deg)">
                <div class="absolute z-10" style="width: 4rem; height: 1.6rem; top: -0.8rem; left: 50%; transform: translateX(-50%) rotate(2deg); background: rgba(210, 228, 255, 0.68); box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.10);"></div>
                <div class="flex flex-col items-center justify-center gap-3 px-4 py-4 text-sm leading-relaxed text-center aspect-square sm:aspect-auto text-[var(--color-headline)]" style="background: #f2c96c; box-shadow: 1px 2px 3px rgba(0,0,0,0.08), 4px 10px 20px rgba(0,0,0,0.18);"><span class="text-base font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">How might we</span>help new users quickly understand and trust Ecosia while keeping their experience familiar</div>
              </div>
            </div>
            <figure class="pt-2 space-y-3">
              <img src="/project-pages/ecosia-onboarding/ecosia-onboarding-3.png" alt="Ecosia onboarding approach" class="w-full rounded-xl border-2 border-[#275243]" />
            </figure>
          </div>

          <!-- ── Research ── -->
          <div id="research" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-5 py-8 sm:px-10 sm:py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">Research</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">Switching to Ecosia was functional, not just emotional</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              I started by reviewing existing user knowledge, then went deeper with <strong>unstructured interviews</strong> where participants <strong>retraced their real experiences</strong> with Ecosia. Combined with funnel and retention data, this shaped a User Journey Map and surfaced two key insights.
            </p>

            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">1 – Emotional &amp; functional forces shaped the decision</p>

            <div class="flex flex-col sm:flex-row gap-4">

              <!-- Left column: drives -->
              <div class="flex flex-col gap-4 flex-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[#826520]">What drives the switch</p>

                <!-- Push -->
                <div class="rounded-xl bg-black/[0.03] p-5 space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full shrink-0" style="background:#EDB73B"></span>
                    <span class="font-semibold text-[var(--color-headline)]">Push</span>
                  </div>
                  <p class="text-sm text-[var(--color-muted)]">Frustration with Google's data policies and curiosity for alternatives</p>
                  <blockquote class="border-l-2 border-black/10 pl-3 text-sm italic text-[var(--color-muted)] opacity-80">
                    "People I know and trust are using it" · "I'm frustrated with Google's data policy"
                  </blockquote>
                  <span class="inline-block text-xs font-medium px-2.5 py-1 rounded" style="background:#fae9c4; color:#826520">Emotional</span>
                </div>

                <!-- Pull -->
                <div class="rounded-xl bg-black/[0.03] p-5 space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full shrink-0" style="background:#EDB73B"></span>
                    <span class="font-semibold text-[var(--color-headline)]">Pull</span>
                  </div>
                  <p class="text-sm text-[var(--color-muted)]">Motivation from Ecosia's tree-planting mission and ease of switching</p>
                  <blockquote class="border-l-2 border-black/10 pl-3 text-sm italic text-[var(--color-muted)] opacity-80">
                    "Tree planting impact is impressive" · "Switching sounded easy to do"
                  </blockquote>
                  <span class="inline-block text-xs font-medium px-2.5 py-1 rounded" style="background:#fae9c4; color:#826520">Emotional</span>
                </div>
              </div>

              <!-- Right column: holds back -->
              <div class="flex flex-col gap-4 flex-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[#2A6864]">What holds them back</p>

                <!-- Inertia -->
                <div class="rounded-xl bg-black/[0.03] p-5 space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full shrink-0" style="background:#47B1AB"></span>
                    <span class="font-semibold text-[var(--color-headline)]">Inertia</span>
                  </div>
                  <p class="text-sm text-[var(--color-muted)]">Reluctance to change habits or risk losing bookmarks and convenience</p>
                  <blockquote class="border-l-2 border-black/10 pl-3 text-sm italic text-[var(--color-muted)] opacity-80">
                    "I need easy access to my emails and drive" · "Don't want to lose my bookmarks"
                  </blockquote>
                  <span class="inline-block text-xs font-medium px-2.5 py-1 rounded" style="background:#D5EFED; color:#2A6864">Functional</span>
                </div>

                <!-- Anxiety -->
                <div class="rounded-xl bg-black/[0.03] p-5 space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full shrink-0" style="background:#47B1AB"></span>
                    <span class="font-semibold text-[var(--color-headline)]">Anxiety</span>
                  </div>
                  <p class="text-sm text-[var(--color-muted)]">Uncertainty about search quality, privacy, and performance</p>
                  <blockquote class="border-l-2 border-black/10 pl-3 text-sm italic text-[var(--color-muted)] opacity-80">
                    "I want to know how it compares to Google" · "I need fast answers without disruptions"
                  </blockquote>
                  <span class="inline-block text-xs font-medium px-2.5 py-1 rounded" style="background:#D5EFED; color:#2A6864">Functional</span>
                </div>
              </div>

            </div>

            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">2 – Users made two separate decisions</p>

            <div class="flex flex-col sm:flex-row gap-4">

              <!-- Left column: try it -->
              <div class="flex flex-col gap-4 flex-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[#9966AA]">Decision 1: try Ecosia out</p>

                <div class="rounded-xl bg-black/[0.03] p-5 space-y-3">
                  <p class="font-semibold text-[var(--color-headline)]">I'll give it a try if...</p>
                  <ul class="space-y-2">
                    <li class="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                      <span class="w-5 h-5 rounded shrink-0 flex items-center justify-center" style="background:#9966AA">
                        <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" stroke-width="2.5"><polyline points="2,6 5,9 10,3"/></svg>
                      </span>
                      Someone I trust recommended it
                    </li>
                    <li class="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                      <span class="w-5 h-5 rounded shrink-0 flex items-center justify-center" style="background:#9966AA">
                        <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" stroke-width="2.5"><polyline points="2,6 5,9 10,3"/></svg>
                      </span>
                      The climate impact feels real and clear
                    </li>
                    <li class="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                      <span class="w-5 h-5 rounded shrink-0 flex items-center justify-center" style="background:#9966AA">
                        <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" stroke-width="2.5"><polyline points="2,6 5,9 10,3"/></svg>
                      </span>
                      Switching looks easy and low effort
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Right column: stay -->
              <div class="flex flex-col gap-4 flex-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">Decision 2: keep using Ecosia</p>

                <div class="rounded-xl bg-black/[0.03] p-5 space-y-3">
                  <p class="font-semibold text-[var(--color-headline)]">I'll stick with it if...</p>
                  <ul class="space-y-2">
                    <li class="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                      <span class="w-5 h-5 rounded shrink-0 border-2 border-black/20"></span>
                      Search results are relevant and fast
                    </li>
                    <li class="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                      <span class="w-5 h-5 rounded shrink-0 border-2 border-black/20"></span>
                      Setup works smoothly with Chrome
                    </li>
                    <li class="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                      <span class="w-5 h-5 rounded shrink-0 border-2 border-black/20"></span>
                      My bookmarks and workflow stay intact
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            <div class="flex justify-center py-4">
              <img src="/project-pages/ecosia-onboarding/arrow.svg" alt="" aria-hidden="true" width="108" height="143" />
            </div>

            <!-- Trade-off and impact -->
            <div class="rounded-xl bg-black/[0.03] px-5 py-4 space-y-2">
              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Trade-off and impact</p>
              <p class="text-[var(--color-muted)] leading-relaxed">Research showed emotional messaging was already working. The real <strong>retention gap</strong> was <strong>functional</strong>. We made a deliberate call to shift onboarding focus toward reducing switching friction rather than reinforcing the mission.</p>
            </div>
            <!-- Mobile: bullet list -->
            <ul class="sm:hidden space-y-2 pt-2 text-sm text-[var(--color-muted)] leading-relaxed list-none">
              <li class="flex gap-2"><span class="text-[var(--color-brand)] shrink-0">•</span><span>This reframing directly shaped <strong class="text-[var(--color-headline)]">12 onboarding experiments</strong> that followed</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand)] shrink-0">•</span><span>It introduced a shared push/pull framework that <strong class="text-[var(--color-headline)]">2 other teams</strong> used for their own experiments</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand)] shrink-0">•</span><span>It shifted team thinking toward <strong class="text-[var(--color-headline)]">"how do we reduce the cost of switching"</strong></span></li>
            </ul>
            <!-- Desktop: sticky notes -->
            <div class="hidden sm:flex gap-3 pt-2 items-start">
              <div class="relative flex-1 mt-3" style="transform: rotate(-1deg)">
                <div class="absolute z-10" style="width: 3.5rem; height: 1.4rem; top: -0.7rem; left: 50%; transform: translateX(-50%) rotate(1deg); background: rgba(210, 228, 255, 0.68); box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.10);"></div>
                <div class="px-3 py-4 text-xs leading-relaxed text-center text-[var(--color-headline)] sm:px-5 sm:py-5 sm:text-sm" style="background: #f2c96c; box-shadow: 1px 2px 3px rgba(0,0,0,0.08), 4px 10px 20px rgba(0,0,0,0.18);">This reframing directly shaped <strong>12 onboarding experiments</strong> that followed</div>
              </div>
              <div class="relative flex-1 mt-3" style="transform: rotate(1deg)">
                <div class="absolute z-10" style="width: 3.5rem; height: 1.4rem; top: -0.7rem; left: 50%; transform: translateX(-50%) rotate(-1deg); background: rgba(210, 228, 255, 0.68); box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.10);"></div>
                <div class="px-3 py-4 text-xs leading-relaxed text-center text-[var(--color-headline)] sm:px-5 sm:py-5 sm:text-sm" style="background: #f2c96c; box-shadow: 1px 2px 3px rgba(0,0,0,0.08), 4px 10px 20px rgba(0,0,0,0.18);">It introduced a shared push/pull framework that <strong>2 other teams</strong> used for their own experiments</div>
              </div>
              <div class="relative flex-1 mt-3" style="transform: rotate(-0.5deg)">
                <div class="absolute z-10" style="width: 3.5rem; height: 1.4rem; top: -0.7rem; left: 50%; transform: translateX(-50%) rotate(2deg); background: rgba(210, 228, 255, 0.68); box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.10);"></div>
                <div class="px-3 py-4 text-xs leading-relaxed text-center text-[var(--color-headline)] sm:px-5 sm:py-5 sm:text-sm" style="background: #f2c96c; box-shadow: 1px 2px 3px rgba(0,0,0,0.08), 4px 10px 20px rgba(0,0,0,0.18);">It shifted team thinking toward <strong>"how do we reduce the cost of switching"</strong></div>
              </div>
            </div>

          </div>

          <!-- ── Opportunities ── -->
          <div id="opportunities" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-5 py-8 sm:px-10 sm:py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">Opportunities</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">Small calculated changes built our strategy</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              In order to build confidence in my decisions, I created an <strong>Opportunity Solution Tree (OST)</strong> where I connected user problems with measurable product outcomes. This helped my team prioritize opportunities around clarity, familiarity, and confidence, and link them directly to design experiments such as clearer messaging, contextual prompts, and trust building visuals.
            </p>
            <figure class="pt-2 space-y-3">
              <img src="/project-pages/ecosia-onboarding/ecosia-onboarding-4.png" alt="Opportunity Solution Tree condensed snapshot" class="w-full rounded-xl border-2 border-[#275243]" />
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">Opportunity Solution Tree condensed snapshot</figcaption>
            </figure>
            <div class="rounded-xl bg-black/[0.03] px-5 py-4 space-y-2">
              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Timing was everything</p>
              <p class="text-[var(--color-muted)] leading-relaxed">Most users decided whether to <strong>stay or leave within a few searches</strong>. I only had a very short window of time to work with, so spending time on finding the right thing to show at the right time was incredibly important.</p>
            </div>
          </div>

          <!-- ── Experimentation ── -->
          <div id="experimentation" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-5 py-8 sm:px-10 sm:py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">Experimentation</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">Constrained by volume, structured by design</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              With limited A/B testing volume, running experiments sequentially would have been too slow. I split the work into two parallel tracks so we could cover more ground without losing focus. Each experiment fed into the next, building on real learnings as we went.
            </p>
            <p class="pt-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">Track 1: Conversion</p>
            <p class="text-[var(--color-muted)] leading-relaxed">The conversion track tested whether small changes to messaging, visuals, and setup guidance could lower the barrier to installing Ecosia as a default browser.</p>
            <div class="grid grid-cols-2 sm:flex gap-3">
              <div class="flex-1 rounded-xl bg-black/[0.03] px-5 py-4 text-center">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Headline copy</p>
                <p class="text-2xl font-extrabold text-[var(--color-headline)] my-2">+3.2%</p>
                <p class="text-sm text-[var(--color-muted)]">conversion</p>
              </div>
              <div class="flex-1 rounded-xl bg-black/[0.03] px-5 py-4 text-center">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Product image</p>
                <p class="text-2xl font-extrabold text-[var(--color-headline)] my-2">+5.4%</p>
                <p class="text-sm text-[var(--color-muted)]">CTA clicks</p>
              </div>
              <div class="flex-1 rounded-xl bg-black/[0.03] px-5 py-4 text-center">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Install guide</p>
                <p class="text-2xl font-extrabold text-[var(--color-headline)] my-2">+25%</p>
                <p class="text-sm text-[var(--color-muted)]">conversion</p>
              </div>
              <div class="flex-1 rounded-xl bg-black/[0.03] px-5 py-4 text-center">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Action CTA</p>
                <p class="text-2xl font-extrabold text-[var(--color-headline)] my-2">+19.69%</p>
                <p class="text-sm text-[var(--color-muted)]">conversion</p>
              </div>
            </div>
            <div class="rounded-xl bg-black/[0.03] px-5 py-4 space-y-2">
              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Outcomes &amp; trade-offs</p>
              <p class="text-[var(--color-muted)] leading-relaxed">Three of four experiments shipped fully, one was pulled after a partner objection. The action-focused CTA revealed a clear trade-off: clearer wording meant fewer clicks, but better conversion. <strong>Clarity cost us clicks, but it earned better intent.</strong> The copy couldn't be fully translated, but action-focused language became our standard going forward.</p>
            </div>
            <figure class="pt-2 space-y-3">
              <div class="flex justify-center mb-2">
                <div class="relative inline-grid grid-cols-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-1">
                  <div
                    class="absolute left-1 top-1 bottom-1 w-[calc(50%_-_4px)] rounded-full bg-[var(--color-brand)] transition-transform duration-300 ease-in-out"
                    :style="{ transform: beforeAfterStep === 0 ? 'translateX(0)' : 'translateX(100%)' }"
                  ></div>
                  <button
                    class="relative z-10 text-center px-6 py-1.5 text-sm font-medium transition-colors duration-200"
                    :class="beforeAfterStep === 0 ? 'text-white' : 'text-[var(--color-muted)]'"
                    @click="beforeAfterDissolve('/project-pages/ecosia-onboarding/ecosia-onboarding-5.png', 0)"
                  >Before</button>
                  <button
                    class="relative z-10 text-center px-6 py-1.5 text-sm font-medium transition-colors duration-200"
                    :class="beforeAfterStep === 1 ? 'text-white' : 'text-[var(--color-muted)]'"
                    @click="beforeAfterDissolve('/project-pages/ecosia-onboarding/ecosia-onboarding-6.png', 1)"
                  >After</button>
                </div>
              </div>
              <div class="relative w-full rounded-xl border-2 border-[#275243] overflow-hidden" style="background:#275243">
                <img
                  ref="beforeAfterFrontRef"
                  :src="beforeAfterFrontSrc"
                  :alt="beforeAfterStep === 0 ? 'Before' : 'After'"
                  width="2400"
                  height="1300"
                  class="w-full rounded-xl"
                />
                <img
                  ref="beforeAfterBackRef"
                  src=""
                  :alt="beforeAfterStep === 0 ? 'Before' : 'After'"
                  width="2400"
                  height="1300"
                  class="w-full h-full rounded-xl absolute inset-0 object-cover"
                  style="opacity:0"
                />
              </div>
            </figure>
            <p class="pt-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">Track 2: SERP Education</p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              This track focused on helping users understand Ecosia's purpose directly in the search experience.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="flex-1 rounded-xl bg-black/[0.03] px-5 py-4 text-center">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">How it works</p>
                <p class="text-2xl font-extrabold text-[var(--color-headline)] my-2">+3%</p>
                <p class="text-sm text-[var(--color-muted)]">D1 retention</p>
              </div>
              <div class="flex-1 rounded-xl bg-black/[0.03] px-5 py-4 text-center">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">With illustration</p>
                <p class="text-2xl font-extrabold text-[var(--color-headline)] my-2">-5%</p>
                <p class="text-sm text-[var(--color-muted)]">retention in DE</p>
              </div>
              <div class="flex-1 rounded-xl bg-black/[0.03] px-5 py-4 text-center">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Privacy messaging</p>
                <p class="text-2xl font-extrabold text-[var(--color-headline)] my-2">-2%</p>
                <p class="text-sm text-[var(--color-muted)]">D1 retention</p>
              </div>
            </div>
            <div class="rounded-xl bg-black/[0.03] px-5 py-4 space-y-2">
              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Outcomes &amp; trade-offs</p>
              <p class="text-[var(--color-muted)] leading-relaxed">Conversion delivered clear gains. SERP education was mixed, and follow up user tests did not explain the retention drop. The results showed that <strong>small content tweaks were not enough</strong>, and we needed a broader redesign to move our success metrics further.</p>
            </div>
            <figure class="pt-2">
              <div class="relative">
                <div class="relative w-full rounded-xl border-2 border-[#275243] overflow-hidden" style="background:#275243">
                  <img
                    ref="serpFrontRef"
                    :src="serpFrontSrc"
                    :alt="['Experiment 1', 'Experiment 2', 'Experiment 3'][serpStep]"
                    width="2400"
                    height="1300"
                    class="w-full rounded-xl"
                  />
                  <img
                    ref="serpBackRef"
                    src=""
                    alt=""
                    width="2400"
                    height="1300"
                    class="w-full h-full rounded-xl absolute inset-0 object-cover"
                    style="opacity:0"
                  />
                </div>
                <button
                  v-if="serpStep > 0"
                  class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white border border-black/[0.08] shadow-sm w-9 h-9 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors duration-200"
                  @click="serpDissolveStep(serpStep - 1)"
                >&#8592;</button>
                <button
                  v-if="serpStep < 2"
                  class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white border border-black/[0.08] shadow-sm w-9 h-9 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors duration-200"
                  @click="serpDissolveStep(serpStep + 1)"
                >&#8594;</button>
              </div>
            </figure>
          </div>

          <!-- ── Strategy ── -->
          <div id="strategy" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-5 py-8 sm:px-10 sm:py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">Strategy</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">Three connected phases built on what we learned</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              After several successful experiments that improved conversion and a bit of D1 retention, I realized that we needed a more holistic approach. I structured onboarding around three connected phases that aligned user behavior with Ecosia's mission:
            </p>
            <!-- Horizontal step cards -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                class="flex flex-col justify-start flex-1 text-left rounded-xl border-2 overflow-hidden transition-colors duration-200"
                :class="activeStrategyStep === 0 ? 'border-[var(--color-brand)] bg-[var(--color-brand)]/[0.04]' : 'border-black/[0.08] bg-transparent hover:border-black/20'"
                @click="strategyDissolveStep(0)"
              >
                <div class="flex flex-col flex-1 w-full px-5 py-4 space-y-1">
                  <p class="text-xs font-semibold uppercase tracking-widest" :class="activeStrategyStep === 0 ? 'text-[var(--color-brand)]' : 'text-[var(--color-muted)]'">Step 1</p>
                  <p class="font-semibold text-[var(--color-headline)]">Value Perception</p>
                  <p class="text-sm text-[var(--color-muted)] leading-relaxed">See the product's value in context of their situation, enough to get them to try it.</p>
                  <p class="text-xs text-[var(--color-brand)] font-medium !mt-auto pt-3">Goal: make a search</p>
                </div>
                <img v-show="activeStrategyStep === 0" src="/project-pages/ecosia-onboarding/ecosia-onboarding-10.png" alt="Value Perception" width="2400" height="1300" class="sm:hidden w-full block mt-4" />
              </button>
              <button
                class="flex flex-col justify-start flex-1 text-left rounded-xl border-2 overflow-hidden transition-colors duration-200"
                :class="activeStrategyStep === 1 ? 'border-[var(--color-brand)] bg-[var(--color-brand)]/[0.04]' : 'border-black/[0.08] bg-transparent hover:border-black/20'"
                @click="strategyDissolveStep(1)"
              >
                <div class="flex flex-col flex-1 w-full px-5 py-4 space-y-1">
                  <p class="text-xs font-semibold uppercase tracking-widest" :class="activeStrategyStep === 1 ? 'text-[var(--color-brand)]' : 'text-[var(--color-muted)]'">Step 2</p>
                  <p class="font-semibold text-[var(--color-headline)]">Value Experience</p>
                  <p class="text-sm text-[var(--color-muted)] leading-relaxed">Experience how Ecosia helps them reach their goals and builds confidence.</p>
                  <p class="text-xs text-[var(--color-brand)] font-medium !mt-auto pt-3">Goal: return for a second session</p>
                </div>
                <img v-show="activeStrategyStep === 1" src="/project-pages/ecosia-onboarding/ecosia-onboarding-11.png" alt="Value Experience" width="2400" height="1300" class="sm:hidden w-full block mt-4" />
              </button>
              <button
                class="flex flex-col justify-start flex-1 text-left rounded-xl border-2 overflow-hidden transition-colors duration-200"
                :class="activeStrategyStep === 2 ? 'border-[var(--color-brand)] bg-[var(--color-brand)]/[0.04]' : 'border-black/[0.08] bg-transparent hover:border-black/20'"
                @click="strategyDissolveStep(2)"
              >
                <div class="flex flex-col flex-1 w-full px-5 py-4 space-y-1">
                  <p class="text-xs font-semibold uppercase tracking-widest" :class="activeStrategyStep === 2 ? 'text-[var(--color-brand)]' : 'text-[var(--color-muted)]'">Step 3</p>
                  <p class="font-semibold text-[var(--color-headline)]">Value Adoption</p>
                  <p class="text-sm text-[var(--color-muted)] leading-relaxed">Adopt Ecosia into their daily life and start forming lasting habits.</p>
                  <p class="text-xs text-[var(--color-brand)] font-medium !mt-auto pt-3">Goal: activate and convert</p>
                </div>
                <img v-show="activeStrategyStep === 2" src="/project-pages/ecosia-onboarding/ecosia-onboarding-12.png" alt="Value Adoption" width="2400" height="1300" class="sm:hidden w-full block mt-4" />
              </button>
            </div>

            <!-- Active step image — desktop only -->
            <figure class="hidden sm:block pt-2 space-y-3">
              <div class="relative w-full rounded-xl border-2 border-[#275243]">
                <img
                  ref="strategyFrontRef"
                  :src="strategyFrontSrc"
                  :alt="['Value Perception', 'Value Experience', 'Value Adoption'][activeStrategyStep]"
                  width="2400"
                  height="1300"
                  class="w-full rounded-xl"
                />
                <img
                  ref="strategyBackRef"
                  src=""
                  alt=""
                  width="2400"
                  height="1300"
                  class="w-full rounded-xl absolute inset-0"
                  style="opacity:0"
                />
              </div>
            </figure>
          </div>

          <!-- ── Execution ── -->
          <div id="execution" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-5 py-8 sm:px-10 sm:py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">Execution</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">Three experiments: two launched, one ready to go</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              Using the strategic framework as a guide, <strong>I translated each phase into a focused experiment.</strong> Two shipped and generated results. A third was fully scoped and asset-ready but never launched. The team was reassigned before it could run, leaving a clean handoff for whoever picks it up next.
            </p>
            <!-- Horizontal step cards -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                class="flex flex-col justify-start flex-1 text-left rounded-xl border-2 overflow-hidden transition-colors duration-200"
                :class="activeExecutionStep === 0 ? 'border-[var(--color-brand)] bg-[var(--color-brand)]/[0.04]' : 'border-black/[0.08] bg-transparent hover:border-black/20'"
                @click="executionDissolveStep(0)"
              >
                <div class="flex flex-col flex-1 w-full px-5 py-4 space-y-1">
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Value perception</p>
                  <p class="font-semibold text-[var(--color-headline)]">Experiment: Flip the funnel</p>
                  <p class="text-sm text-[var(--color-muted)] leading-relaxed">A search-focused and Google-like layout which sets a new baseline for conversion tracking.</p>
                  <p class="text-xs text-[var(--color-brand)] font-medium !mt-auto pt-3">Goal: make a search</p>
                </div>
                <img v-show="activeExecutionStep === 0" src="/project-pages/ecosia-onboarding/ecosia-onboarding-13.png" alt="Flip the funnel" width="2400" height="1300" class="sm:hidden w-full block mt-4" />
              </button>
              <button
                class="flex flex-col justify-start flex-1 text-left rounded-xl border-2 overflow-hidden transition-colors duration-200"
                :class="activeExecutionStep === 1 ? 'border-[var(--color-brand)] bg-[var(--color-brand)]/[0.04]' : 'border-black/[0.08] bg-transparent hover:border-black/20'"
                @click="executionDissolveStep(1)"
              >
                <div class="flex flex-col flex-1 w-full px-5 py-4 space-y-1">
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Value experience</p>
                  <p class="font-semibold text-[var(--color-headline)]">Experiment: Before / After</p>
                  <p class="text-sm text-[var(--color-muted)] leading-relaxed">A high-impact mission-focused showcase of a planting site as the entry point to the product.</p>
                  <p class="text-xs text-[var(--color-brand)] font-medium !mt-auto pt-3">Goal: return for a second session</p>
                </div>
                <img v-show="activeExecutionStep === 1" src="/project-pages/ecosia-onboarding/ecosia-onboarding-15.png" alt="Before / After" width="2400" height="1300" class="sm:hidden w-full block mt-4" />
              </button>
              <button
                class="flex flex-col justify-start flex-1 text-left rounded-xl border-2 overflow-hidden transition-colors duration-200"
                :class="activeExecutionStep === 2 ? 'border-[var(--color-brand)] bg-[var(--color-brand)]/[0.04]' : 'border-black/[0.08] bg-transparent hover:border-black/20'"
                @click="executionDissolveStep(2)"
              >
                <div class="flex flex-col flex-1 w-full px-5 py-4 space-y-1">
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Value adoption</p>
                  <p class="font-semibold text-[var(--color-headline)]">Experiment: Prompt install</p>
                  <p class="text-sm text-[var(--color-muted)] leading-relaxed">An intervention during the 1st search where we ask new users to switch to Ecosia.</p>
                  <p class="text-xs text-[var(--color-brand)] font-medium !mt-auto pt-3">Goal: activate and convert</p>
                </div>
                <img v-show="activeExecutionStep === 2" src="/project-pages/ecosia-onboarding/ecosia-onboarding-14.png" alt="Prompt install" width="2400" height="1300" class="sm:hidden w-full block mt-4" />
              </button>
            </div>

            <!-- Active step image — desktop only -->
            <figure class="hidden sm:block pt-2 space-y-3">
              <div class="relative w-full rounded-xl border-2 border-[#275243]" style="background:#275243">
                <img
                  ref="executionFrontRef"
                  :src="executionFrontSrc"
                  :alt="['Value Perception', 'Value Experience', 'Value Adoption'][activeExecutionStep]"
                  width="2400"
                  height="1300"
                  class="w-full rounded-xl"
                />
                <img
                  ref="executionBackRef"
                  src=""
                  alt=""
                  width="2400"
                  height="1300"
                  class="w-full rounded-xl absolute inset-0"
                  style="opacity:0"
                />
              </div>
            </figure>
          </div>

          <!-- ── Results ── -->
          <div id="results" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-5 py-8 sm:px-10 sm:py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">Results</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">Results that shaped what comes next</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              The work delivered measurable growth and a foundation for future experimentation. Every conversion became both a product win and an environmental one, turning onboarding into a direct expression of Ecosia's mission.
            </p>

            <!-- Stat cards -->
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="flex-1 rounded-xl bg-black/[0.03] px-5 py-4 text-center">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Conversion</p>
                <p class="text-2xl font-extrabold text-[var(--color-headline)] my-2">+20–25%</p>
                <p class="text-sm text-[var(--color-muted)]">increase</p>
              </div>
              <div class="flex-1 rounded-xl bg-black/[0.03] px-5 py-4 text-center">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">D1 retention</p>
                <p class="text-2xl font-extrabold text-[var(--color-headline)] my-2">+3%</p>
                <p class="text-sm text-[var(--color-muted)]">improvement</p>
              </div>
              <div class="flex-1 rounded-xl bg-black/[0.03] px-5 py-4 text-center">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Experiments</p>
                <p class="text-2xl font-extrabold text-[var(--color-headline)] my-2">9 of 12</p>
                <p class="text-sm text-[var(--color-muted)]">shipped to 100%</p>
              </div>
            </div>

            <!-- What I learned + What I'd do differently -->
            <div class="flex flex-col sm:flex-row gap-3 items-start">
              <div class="flex-1 rounded-xl bg-black/[0.03] px-5 py-4 space-y-4">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">What I learned</p>
                <div class="space-y-3 divide-y divide-black/[0.06]">
                  <div class="pt-3 first:pt-0">
                    <p class="font-semibold text-[var(--color-headline)] text-sm">Parallel tracks accelerate learning</p>
                    <p class="text-sm text-[var(--color-muted)] mt-1">Running two tracks simultaneously let us cover more ground without waiting for sequential results. Limited volume stopped being a blocker.</p>
                  </div>
                  <div class="pt-3">
                    <p class="font-semibold text-[var(--color-headline)] text-sm">User language shapes stronger messaging</p>
                    <p class="text-sm text-[var(--color-muted)] mt-1">Listening to how users talked about Ecosia, not how we described it internally, led directly to copy that converted better.</p>
                  </div>
                  <div class="pt-3">
                    <p class="font-semibold text-[var(--color-headline)] text-sm">Regional differences need their own lens</p>
                    <p class="text-sm text-[var(--color-muted)] mt-1">Germany consistently behaved differently. Our best monetized market needed closer observation and investigation.</p>
                  </div>
                </div>
              </div>
              <div class="flex-1 rounded-xl bg-black/[0.03] px-5 py-4 space-y-4">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">What I'd do differently</p>
                <div class="space-y-3 divide-y divide-black/[0.06]">
                  <div class="pt-3 first:pt-0">
                    <p class="font-semibold text-[var(--color-headline)] text-sm">Start with the strategic framework</p>
                    <p class="text-sm text-[var(--color-muted)] mt-1">Our three-phase strategy was the right framework, but it came too late to shape the experiments that informed it.</p>
                  </div>
                  <div class="pt-3">
                    <p class="font-semibold text-[var(--color-headline)] text-sm">Learn about conflicting results</p>
                    <p class="text-sm text-[var(--color-muted)] mt-1">Next time, I'd seek more experienced support early when experiments start producing conflicting results across markets.</p>
                  </div>
                  <div class="pt-3">
                    <p class="font-semibold text-[var(--color-headline)] text-sm">Design for the full journey</p>
                    <p class="text-sm text-[var(--color-muted)] mt-1">The experiments tested discrete touchpoints. Designing for the connected arc earlier might have moved the bigger retention metrics faster.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div><!-- /content -->

        <!-- Balances the left nav so content stays centered -->
        <div class="hidden lg:block w-52 shrink-0"></div>

      </div><!-- /sidebar + content -->
    </div><!-- /whiteboard panel -->
  </section>
</template>
