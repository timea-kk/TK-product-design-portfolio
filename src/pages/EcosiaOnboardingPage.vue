<!--
  EcosiaOnboardingPage.vue – Case study: Building Ecosia's Onboarding Experience.
  Layout: sticky left nav (scroll spy) + white section cards on the dotted whiteboard.
  Images are placeholder rectangles until real assets are added.
-->

<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'
import CaseStudyNav from '@/components/CaseStudyNav.vue'
import CaseStudySection from '@/components/CaseStudySection.vue'
import StickyNote from '@/components/StickyNote.vue'
import CardCallout from '@/components/CardCallout.vue'
import CardInteractive from '@/components/CardInteractive.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import SegmentedControl from '@/components/SegmentedControl.vue'
import TagPill from '@/components/TagPill.vue'
import CardProject from '@/components/CardProject.vue'
import FooterSection from '@/components/FooterSection.vue'

const NAV_SECTIONS = [
  { id: 'overview',        label: 'Overview' },
  { id: 'problem',         label: 'The Problem' },
  { id: 'challenge',       label: 'My Approach' },
  { id: 'research',        label: 'Research' },
  { id: 'opportunities',   label: 'Opportunities' },
  { id: 'experimentation', label: 'Experimentation' },
  { id: 'strategy',        label: 'Strategy' },
  { id: 'execution',       label: 'Execution' },
  { id: 'results',         label: 'Results' },
]

const panelRef = ref<HTMLElement | null>(null)
const activeStrategyStep = ref(0)
const activeExecutionStep = ref(0)
const beforeAfterStep = ref(0)
const strategyFrontRef = ref<HTMLImageElement | null>(null)
const strategyBackRef = ref<HTMLImageElement | null>(null)
const strategyFrontSrc = ref('/project-pages/ecosia-onboarding/ecosia-onboarding-10.webp')

const executionFrontRef = ref<HTMLImageElement | null>(null)
const executionBackRef = ref<HTMLImageElement | null>(null)
const executionFrontSrc = ref('/project-pages/ecosia-onboarding/ecosia-onboarding-13.webp')

const beforeAfterFrontRef = ref<HTMLImageElement | null>(null)
const beforeAfterBackRef = ref<HTMLImageElement | null>(null)
const beforeAfterFrontSrc = ref('/project-pages/ecosia-onboarding/ecosia-onboarding-5.webp')

const SERP_SRCS = [
  '/project-pages/ecosia-onboarding/ecosia-onboarding-7.webp',
  '/project-pages/ecosia-onboarding/ecosia-onboarding-8.webp',
  '/project-pages/ecosia-onboarding/ecosia-onboarding-9.webp',
]
const STRATEGY_SRCS = [
  '/project-pages/ecosia-onboarding/ecosia-onboarding-10.webp',
  '/project-pages/ecosia-onboarding/ecosia-onboarding-11.webp',
  '/project-pages/ecosia-onboarding/ecosia-onboarding-12.webp',
]
const EXECUTION_SRCS = [
  '/project-pages/ecosia-onboarding/ecosia-onboarding-13.webp',
  '/project-pages/ecosia-onboarding/ecosia-onboarding-15.webp',
  '/project-pages/ecosia-onboarding/ecosia-onboarding-14.webp',
]

function dissolve(
  front: HTMLImageElement | null,
  back: HTMLImageElement | null,
  newSrc: string,
  onComplete: () => void
) {
  /* v8 ignore next 4 */
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
        background-color: var(--color-surface-canvas);
        background-image: radial-gradient(circle, rgba(0,0,0,0.13) 1.2px, transparent 1.2px);
        background-size: 22px 22px;
      "
    >
      <!-- Inner: sidebar + content -->
      <div class="flex gap-8 justify-center pt-20 pb-14 sm:pt-10 sm:pb-14" style="padding-left: clamp(2rem, 4vw, 3.5rem); padding-right: clamp(2rem, 4vw, 3.5rem);">

        <!-- ── Left nav (desktop only) ── -->
        <CaseStudyNav :sections="NAV_SECTIONS" :panel="panelRef" />

        <!-- ── Main content ── -->
        <div class="w-full min-w-0 max-w-4xl space-y-24">

          <!-- ── Hero + TL;DR (merged) ── -->
          <!-- mt-[35px]: first child gets no space-y gap, so we add 35px manually -->
          <!-- 40px flex padding-top + 35px margin-top = 75px from panel top -->
          <!-- label is 35px above card → label lands at 40px = nav sticky top ✓ -->
          <CaseStudySection id="overview" label="Overview" first>

            <!-- Title block -->
            <div class="space-y-4">
              <h1
                id="project-heading"
                class="font-heading text-3xl sm:text-4xl font-black leading-tight tracking-tight text-[var(--color-text-primary)] lg:text-6xl"
              >
                Building Ecosia's Onboarding Experience
              </h1>
              <div class="flex flex-wrap gap-2">
                <TagPill
                  v-for="tag in ['Generative Research', 'Ideation Workshop', 'A/B Testing', 'Strategy']"
                  :key="tag"
                  :label="tag"
                />
              </div>
              <div class="flex flex-wrap gap-6 sm:gap-12 pt-2">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">Timeline</p>
                  <p class="mt-1 text-[var(--color-text-secondary)]">2024 → 2025</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">My role</p>
                  <p class="mt-1 text-[var(--color-text-secondary)]">Product Designer</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">Collaborated with</p>
                  <p class="mt-1 text-[var(--color-text-secondary)]">Engineers, Product Manager, UX Researcher</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">Company</p>
                  <p class="mt-1 text-[var(--color-text-secondary)]">Ecosia</p>
                </div>
              </div>
            </div>

            <hr class="border-black/[0.06]" />

            <!-- TL;DR -->
            <div class="space-y-3">
              <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">TL;DR</h2>
              <p class="text-[var(--color-text-secondary)] leading-relaxed">
                I built Ecosia's first web onboarding experience, defining how the product introduced itself and communicated its value to new users. Through research and iterative experimentation, I helped users understand the mission, build trust, and return after their first search, resulting in a <strong>20–25% conversion increase</strong> and a <strong>3% lift in D1 retention</strong>.
              </p>
            </div>

            <figure>
              <img loading="lazy" src="/project-pages/ecosia-onboarding/ecosia-onboarding-1.webp" alt="Ecosia onboarding screen" class="w-full rounded-xl border-2 border-[var(--color-deep-maroon-700)]" />
              <figcaption>Ecosia Landing Page snapshot</figcaption>
            </figure>

          </CaseStudySection>

          <!-- ── Context ── -->

          <!-- ── The Problem ── -->
          <CaseStudySection id="problem" label="The Problem">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Users left before understanding what Ecosia was</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Ecosia is a search engine that dedicates 100% of its profits to planting trees all over the world. Like other search engines, it generates revenue through ads, but this revenue goes towards a unique and sustainable mission. After switching to Google as a search partner, Ecosia needed to improve retention by helping users make it their default search engine. Despite strong awareness, many <strong>new users left after their first search</strong>, often before understanding its mission or impact.
            </p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              I joined Ecosia in 2020 as a Product Designer in a cross functional team focused on user engagement. The onboarding project was part of a broader effort to reduce early drop off and build a scalable way to introduce new users to Ecosia.
            </p>
            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-primary)]">Business and user problems</p>
            <!-- Mobile: bullet list -->
            <ul class="sm:hidden space-y-2 pt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed list-none">
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span><strong class="text-[var(--color-text-primary)]">Low conversion and retention</strong> with limited insight into why users dropped off</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span><strong class="text-[var(--color-text-primary)]">Unclear value</strong> as users didn't understand what Ecosia was or how it worked</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span><strong class="text-[var(--color-text-primary)]">No install guidance</strong> on how to set Ecosia as the default search engine</span></li>
            </ul>
            <!-- Desktop: sticky notes -->
            <div class="hidden sm:block pt-5">
              <div class="flex gap-3">
                <StickyNote :rotate="-1" class="flex-1">
                  <span class="text-sm font-bold rounded-md px-2 py-0.5 sm:text-base" style="background: var(--color-surface-sticky-label);">1</span>
                  Low conversion and retention rates with limited insight into why users dropped off
                </StickyNote>
                <StickyNote :rotate="1" class="flex-1">
                  <span class="text-sm font-bold rounded-md px-2 py-0.5 sm:text-base" style="background: var(--color-surface-sticky-label);">2</span>
                  Unclear value as users didn't understand what Ecosia was or how it worked
                </StickyNote>
                <StickyNote :rotate="-0.5" class="flex-1">
                  <span class="text-sm font-bold rounded-md px-2 py-0.5 sm:text-base" style="background: var(--color-surface-sticky-label);">3</span>
                  No guidance on how to install or set Ecosia as the default search engine
                </StickyNote>
              </div>
            </div>
            <figure class="pt-4 space-y-3">
              <img loading="lazy" src="/project-pages/ecosia-onboarding/ecosia-onboarding-2.webp" alt="Ecosia onboarding screen" class="w-full rounded-xl border-2 border-[var(--color-deep-maroon-700)]" />
              <figcaption>Product landscape</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── The Challenge ── -->
          <CaseStudySection id="challenge" label="My Approach">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Injecting tool evaluation insights into the product</h2>
            <div class="flex flex-col sm:flex-row gap-8 items-start">
              <div class="flex flex-col gap-4 flex-1 text-[var(--color-text-secondary)] leading-relaxed">
                <p>We realized that users arrived curious, but left before realizing how Ecosia worked and what made it different.</p>
                <p>The <strong>challenge</strong> was to design an onboarding experience that built trust, encouraged action, and fit naturally into existing user behavior.</p>
                <p>To make this possible, I defined a clear research and experimentation track that aligned product, design, and growth goals across multiple teams.</p>
              </div>
              <StickyNote :rotate="-1" square class="w-1/2 mx-auto sm:w-56 sm:mx-0 sm:shrink-0 sm:mt-4">
                <span class="text-base font-bold rounded-md px-2 py-0.5" style="background: var(--color-surface-sticky-label);">How might we</span>
                help new users quickly understand and trust Ecosia while keeping their experience familiar
              </StickyNote>
            </div>
            <figure class="pt-2 space-y-3">
              <img loading="lazy" src="/project-pages/ecosia-onboarding/ecosia-onboarding-3.webp" alt="Ecosia onboarding approach" class="w-full rounded-xl border-2 border-[var(--color-deep-maroon-700)]" />
              <figcaption>Onboarding approach overview</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── Research ── -->
          <CaseStudySection id="research" label="Research">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Switching to Ecosia was functional, not just emotional</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              I started by reviewing existing user knowledge, then went deeper with <strong>unstructured interviews</strong> where participants <strong>retraced their real experiences</strong> with Ecosia. Combined with funnel and retention data, this shaped a User Journey Map and surfaced two key insights.
            </p>

            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-primary)]">1 – Emotional &amp; functional forces shaped the decision</p>

            <div class="flex flex-col sm:flex-row gap-4">

              <!-- Left column: drives -->
              <div class="flex flex-col gap-4 flex-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-golden-honey-700)]">What drives the switch</p>

                <!-- Push -->
                <div class="rounded-xl bg-black/[0.03] p-5 space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full shrink-0" style="background:var(--color-golden-honey-500)"></span>
                    <span class="font-semibold text-[var(--color-text-primary)]">Push</span>
                  </div>
                  <p class="text-sm text-[var(--color-text-secondary)]">Frustration with Google's data policies and curiosity for alternatives</p>
                  <blockquote class="border-l-2 border-black/10 pl-3 text-sm italic text-[var(--color-text-secondary)] opacity-80">
                    "People I know and trust are using it" · "I'm frustrated with Google's data policy"
                  </blockquote>
                  <span class="inline-block text-xs font-medium px-2.5 py-1 rounded" style="background:var(--color-golden-honey-200); color:var(--color-golden-honey-700)">Emotional</span>
                </div>

                <!-- Pull -->
                <div class="rounded-xl bg-black/[0.03] p-5 space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full shrink-0" style="background:var(--color-golden-honey-500)"></span>
                    <span class="font-semibold text-[var(--color-text-primary)]">Pull</span>
                  </div>
                  <p class="text-sm text-[var(--color-text-secondary)]">Motivation from Ecosia's tree-planting mission and ease of switching</p>
                  <blockquote class="border-l-2 border-black/10 pl-3 text-sm italic text-[var(--color-text-secondary)] opacity-80">
                    "Tree planting impact is impressive" · "Switching sounded easy to do"
                  </blockquote>
                  <span class="inline-block text-xs font-medium px-2.5 py-1 rounded" style="background:var(--color-golden-honey-200); color:var(--color-golden-honey-700)">Emotional</span>
                </div>
              </div>

              <!-- Right column: holds back -->
              <div class="flex flex-col gap-4 flex-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-dusty-violet-700)]">What holds them back</p>

                <!-- Inertia -->
                <div class="rounded-xl bg-black/[0.03] p-5 space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full shrink-0" style="background:var(--color-dusty-violet-400)"></span>
                    <span class="font-semibold text-[var(--color-text-primary)]">Inertia</span>
                  </div>
                  <p class="text-sm text-[var(--color-text-secondary)]">Reluctance to change habits or risk losing bookmarks and convenience</p>
                  <blockquote class="border-l-2 border-black/10 pl-3 text-sm italic text-[var(--color-text-secondary)] opacity-80">
                    "I need easy access to my emails and drive" · "Don't want to lose my bookmarks"
                  </blockquote>
                  <span class="inline-block text-xs font-medium px-2.5 py-1 rounded" style="background:var(--color-dusty-violet-100); color:var(--color-dusty-violet-700)">Functional</span>
                </div>

                <!-- Anxiety -->
                <div class="rounded-xl bg-black/[0.03] p-5 space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full shrink-0" style="background:var(--color-dusty-violet-400)"></span>
                    <span class="font-semibold text-[var(--color-text-primary)]">Anxiety</span>
                  </div>
                  <p class="text-sm text-[var(--color-text-secondary)]">Uncertainty about search quality, privacy, and performance</p>
                  <blockquote class="border-l-2 border-black/10 pl-3 text-sm italic text-[var(--color-text-secondary)] opacity-80">
                    "I want to know how it compares to Google" · "I need fast answers without disruptions"
                  </blockquote>
                  <span class="inline-block text-xs font-medium px-2.5 py-1 rounded" style="background:var(--color-dusty-violet-100); color:var(--color-dusty-violet-700)">Functional</span>
                </div>
              </div>

            </div>

            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-primary)]">2 – Users made two separate decisions</p>

            <div class="flex flex-col sm:flex-row gap-4">

              <!-- Left column: try it -->
              <div class="flex flex-col gap-4 flex-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-dusty-violet-500)]">Decision 1: try Ecosia out</p>

                <div class="rounded-xl bg-black/[0.03] p-5 space-y-3">
                  <p class="font-semibold text-[var(--color-text-primary)]">I'll give it a try if...</p>
                  <ul class="space-y-2">
                    <li class="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                      <span class="w-5 h-5 rounded shrink-0 flex items-center justify-center" style="background:var(--color-dusty-violet-500)">
                        <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" stroke-width="2.5"><polyline points="2,6 5,9 10,3"/></svg>
                      </span>
                      Someone I trust recommended it
                    </li>
                    <li class="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                      <span class="w-5 h-5 rounded shrink-0 flex items-center justify-center" style="background:var(--color-dusty-violet-500)">
                        <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" stroke-width="2.5"><polyline points="2,6 5,9 10,3"/></svg>
                      </span>
                      The climate impact feels real and clear
                    </li>
                    <li class="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                      <span class="w-5 h-5 rounded shrink-0 flex items-center justify-center" style="background:var(--color-dusty-violet-500)">
                        <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" stroke-width="2.5"><polyline points="2,6 5,9 10,3"/></svg>
                      </span>
                      Switching looks easy and low effort
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Right column: stay -->
              <div class="flex flex-col gap-4 flex-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">Decision 2: keep using Ecosia</p>

                <div class="rounded-xl bg-black/[0.03] p-5 space-y-3">
                  <p class="font-semibold text-[var(--color-text-primary)]">I'll stick with it if...</p>
                  <ul class="space-y-2">
                    <li class="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                      <span class="w-5 h-5 rounded shrink-0 border-2 border-black/20"></span>
                      Search results are relevant and fast
                    </li>
                    <li class="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                      <span class="w-5 h-5 rounded shrink-0 border-2 border-black/20"></span>
                      Setup works smoothly with Chrome
                    </li>
                    <li class="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                      <span class="w-5 h-5 rounded shrink-0 border-2 border-black/20"></span>
                      My bookmarks and workflow stay intact
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            <div class="flex justify-center py-4">
              <img loading="lazy" src="/project-pages/ecosia-onboarding/arrow.svg" alt="" aria-hidden="true" width="108" height="143" />
            </div>

            <!-- Trade-off and impact -->
            <CardCallout label="Trade-off and impact">
              <p class="text-[var(--color-text-secondary)] leading-relaxed">Research showed emotional messaging was already working. The real <strong>retention gap</strong> was <strong>functional</strong>. We made a deliberate call to shift onboarding focus toward reducing switching friction rather than reinforcing the mission.</p>
            </CardCallout>
            <!-- Mobile: bullet list -->
            <ul class="sm:hidden space-y-2 pt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed list-none">
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span>This reframing directly shaped <strong class="text-[var(--color-text-primary)]">12 onboarding experiments</strong> that followed</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span>It introduced a shared push/pull framework that <strong class="text-[var(--color-text-primary)]">2 other teams</strong> used for their own experiments</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span>It shifted team thinking toward <strong class="text-[var(--color-text-primary)]">"how do we reduce the cost of switching"</strong></span></li>
            </ul>
            <!-- Desktop: sticky notes -->
            <div class="hidden sm:flex gap-3 pt-2 items-start">
              <StickyNote :rotate="-1" small class="flex-1 mt-3">
                This reframing directly shaped <strong>12 onboarding experiments</strong> that followed
              </StickyNote>
              <StickyNote :rotate="1" small class="flex-1 mt-3">
                It introduced a shared push/pull framework that <strong>2 other teams</strong> used for their own experiments
              </StickyNote>
              <StickyNote :rotate="-0.5" small class="flex-1 mt-3">
                It shifted team thinking toward <strong>"how do we reduce the cost of switching"</strong>
              </StickyNote>
            </div>

          </CaseStudySection>

          <!-- ── Opportunities ── -->
          <CaseStudySection id="opportunities" label="Opportunities">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Small calculated changes built our strategy</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              In order to build confidence in my decisions, I created an <strong>Opportunity Solution Tree (OST)</strong> where I connected user problems with measurable product outcomes. This helped my team prioritize opportunities around clarity, familiarity, and confidence, and link them directly to design experiments such as clearer messaging, contextual prompts, and trust building visuals.
            </p>
            <figure class="pt-2 space-y-3">
              <img loading="lazy" src="/project-pages/ecosia-onboarding/ecosia-onboarding-4.webp" alt="Opportunity Solution Tree condensed snapshot" class="w-full rounded-xl border-2 border-[var(--color-deep-maroon-700)]" />
              <figcaption>Opportunity Solution Tree condensed snapshot</figcaption>
            </figure>
            <CardCallout label="Timing was everything">
              <p class="text-[var(--color-text-secondary)] leading-relaxed">Most users decided whether to <strong>stay or leave within a few searches</strong>. I only had a very short window of time to work with, so spending time on finding the right thing to show at the right time was incredibly important.</p>
            </CardCallout>
          </CaseStudySection>

          <!-- ── Experimentation ── -->
          <CaseStudySection id="experimentation" label="Experimentation">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Constrained by volume, structured by design</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              With limited A/B testing volume, running experiments sequentially would have been too slow. I split the work into two parallel tracks so we could cover more ground without losing focus. Each experiment fed into the next, building on real learnings as we went.
            </p>
            <p class="pt-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-primary)]">Track 1: Conversion</p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">The conversion track tested whether small changes to messaging, visuals, and setup guidance could lower the barrier to installing Ecosia as a default browser.</p>
            <div class="grid grid-cols-2 sm:flex gap-3">
              <CardCallout label="Headline copy" value="+3.2%" description="conversion" />
              <CardCallout label="Product image" value="+5.4%" description="CTA clicks" />
              <CardCallout label="Install guide" value="+25%" description="conversion" />
              <CardCallout label="Action CTA" value="+19.69%" description="conversion" />
            </div>
            <CardCallout label="Outcomes &amp; trade-offs">
              <p class="text-[var(--color-text-secondary)] leading-relaxed">Three of four experiments shipped fully, one was pulled after a partner objection. The action-focused CTA revealed a clear trade-off: clearer wording meant fewer clicks, but better conversion. <strong>Clarity cost us clicks, but it earned better intent.</strong> The copy couldn't be fully translated, but action-focused language became our standard going forward.</p>
            </CardCallout>
            <figure class="pt-2 space-y-3">
              <div class="flex justify-center mb-2">
                <SegmentedControl
                  :options="['Before', 'After']"
                  :model-value="beforeAfterStep"
                  @update:model-value="(i) => beforeAfterDissolve(
                    i === 0
                      ? '/project-pages/ecosia-onboarding/ecosia-onboarding-5.webp'
                      : '/project-pages/ecosia-onboarding/ecosia-onboarding-6.webp',
                    i
                  )"
                />
              </div>
              <div class="relative w-full rounded-xl border-2 border-[var(--color-deep-maroon-700)] overflow-hidden" style="background:var(--color-deep-maroon-700)">
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
              <figcaption>Action CTA: before and after</figcaption>
            </figure>
            <p class="pt-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-primary)]">Track 2: SERP Education</p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              This track focused on helping users understand Ecosia's purpose directly in the search experience.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <CardCallout label="How it works" value="+3%" description="D1 retention" />
              <CardCallout label="With illustration" value="-5%" description="retention in DE" />
              <CardCallout label="Privacy messaging" value="-2%" description="D1 retention" />
            </div>
            <CardCallout label="Outcomes &amp; trade-offs">
              <p class="text-[var(--color-text-secondary)] leading-relaxed">Conversion delivered clear gains. SERP education was mixed, and follow up user tests did not explain the retention drop. The results showed that <strong>small content tweaks were not enough</strong>, and we needed a broader redesign to move our success metrics further.</p>
            </CardCallout>
            <figure class="pt-2">
              <figcaption>SERP education experiments</figcaption>
              <ImageCarousel
                :images="SERP_SRCS"
                :alts="['Experiment 1', 'Experiment 2', 'Experiment 3']"
              />
            </figure>
          </CaseStudySection>

          <!-- ── Strategy ── -->
          <CaseStudySection id="strategy" label="Strategy">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Three connected phases built on what we learned</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              After several successful experiments that improved conversion and a bit of D1 retention, I realized that we needed a more holistic approach. I structured onboarding around three connected phases that aligned user behavior with Ecosia's mission:
            </p>
            <!-- Horizontal step cards -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              <CardInteractive
                label="Step 1"
                title="Value Perception"
                description="See the product's value in context of their situation, enough to get them to try it."
                goal="Goal: make a search"
                :active="activeStrategyStep === 0"
                image="/project-pages/ecosia-onboarding/ecosia-onboarding-10.webp"
                image-alt="Value Perception"
                @click="strategyDissolveStep(0)"
              />
              <CardInteractive
                label="Step 2"
                title="Value Experience"
                description="Experience how Ecosia helps them reach their goals and builds confidence."
                goal="Goal: return for a second session"
                :active="activeStrategyStep === 1"
                image="/project-pages/ecosia-onboarding/ecosia-onboarding-11.webp"
                image-alt="Value Experience"
                @click="strategyDissolveStep(1)"
              />
              <CardInteractive
                label="Step 3"
                title="Value Adoption"
                description="Adopt Ecosia into their daily life and start forming lasting habits."
                goal="Goal: activate and convert"
                :active="activeStrategyStep === 2"
                image="/project-pages/ecosia-onboarding/ecosia-onboarding-12.webp"
                image-alt="Value Adoption"
                @click="strategyDissolveStep(2)"
              />
            </div>

            <!-- Active step image (desktop only) -->
            <figure class="hidden sm:block pt-2 space-y-3">
              <div class="relative w-full rounded-xl border-2 border-[var(--color-deep-maroon-700)]">
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
              <figcaption>Three-phase onboarding strategy</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── Execution ── -->
          <CaseStudySection id="execution" label="Execution">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Three experiments: two launched, one ready to go</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Using the strategic framework as a guide, <strong>I translated each phase into a focused experiment.</strong> Two shipped and generated results. A third was fully scoped and asset-ready but never launched. The team was reassigned before it could run, leaving a clean handoff for whoever picks it up next.
            </p>
            <!-- Horizontal step cards -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              <CardInteractive
                label="Value perception"
                title="Experiment: Flip the funnel"
                description="A search-focused and Google-like layout which sets a new baseline for conversion tracking."
                goal="Goal: make a search"
                :active="activeExecutionStep === 0"
                image="/project-pages/ecosia-onboarding/ecosia-onboarding-13.webp"
                image-alt="Flip the funnel"
                @click="executionDissolveStep(0)"
              />
              <CardInteractive
                label="Value experience"
                title="Experiment: Before / After"
                description="A high-impact mission-focused showcase of a planting site as the entry point to the product."
                goal="Goal: return for a second session"
                :active="activeExecutionStep === 1"
                image="/project-pages/ecosia-onboarding/ecosia-onboarding-15.webp"
                image-alt="Before / After"
                @click="executionDissolveStep(1)"
              />
              <CardInteractive
                label="Value adoption"
                title="Experiment: Prompt install"
                description="An intervention during the 1st search where we ask new users to switch to Ecosia."
                goal="Goal: activate and convert"
                :active="activeExecutionStep === 2"
                image="/project-pages/ecosia-onboarding/ecosia-onboarding-14.webp"
                image-alt="Prompt install"
                @click="executionDissolveStep(2)"
              />
            </div>

            <!-- Active step image (desktop only) -->
            <figure class="hidden sm:block pt-2 space-y-3">
              <div class="relative w-full rounded-xl border-2 border-[var(--color-deep-maroon-700)]" style="background:var(--color-deep-maroon-700)">
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
              <figcaption>Experiment designs per phase</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── Results ── -->
          <CaseStudySection id="results" label="Results">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Results that shaped what comes next</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              The work delivered measurable growth and a foundation for future experimentation. Every conversion became both a product win and an environmental one, turning onboarding into a direct expression of Ecosia's mission.
            </p>

            <!-- Stat cards -->
            <div class="flex flex-col sm:flex-row gap-3">
              <CardCallout label="Conversion" value="+20–25%" description="increase" />
              <CardCallout label="D1 retention" value="+3%" description="improvement" />
              <CardCallout label="Experiments" value="9 of 12" description="shipped to 100%" />
            </div>

            <!-- What I learned + What I'd do differently -->
            <div class="flex flex-col sm:flex-row gap-3 items-start">
              <CardCallout
                label="What I learned"
                class="flex-1"
                :items="[
                  { title: 'Parallel tracks accelerate learning', description: 'Running two tracks simultaneously let us cover more ground without waiting for sequential results. Limited volume stopped being a blocker.' },
                  { title: 'User language shapes stronger messaging', description: 'Listening to how users talked about Ecosia, not how we described it internally, led directly to copy that converted better.' },
                  { title: 'Regional differences need their own lens', description: 'Germany consistently behaved differently. Our best monetized market needed closer observation and investigation.' }
                ]"
              />
              <CardCallout
                label="What I'd do differently"
                class="flex-1"
                :items="[
                  { title: 'Start with the strategic framework', description: 'Our three-phase strategy was the right framework, but it came too late to shape the experiments that informed it.' },
                  { title: 'Learn about conflicting results', description: 'Next time, I\'d seek more experienced support early when experiments start producing conflicting results across markets.' },
                  { title: 'Design for the full journey', description: 'The experiments tested discrete touchpoints. Designing for the connected arc earlier might have moved the bigger retention metrics faster.' }
                ]"
              />
            </div>
          </CaseStudySection>

          <!-- See also -->
          <div class="flex flex-col gap-6">
            <h2 class="font-heading text-[clamp(3rem,5vw,4.5rem)] font-black leading-none tracking-tight text-[var(--color-text-primary)]">See also</h2>
            <CardProject
              title="Scaling Design Operations at Ecosia"
              description="Establishing a shared ownership model for Flora, Ecosia's Design System."
              image="/project-pages/flora-design-system/flora-design-system-1.webp"
              image-alt="Flora Design System structure"
              video="/main-page/flora.mp4"
              to="/work/flora-design-system"
              :text-min-height="320"
              wide-breakpoint
              no-hover
            />
          </div>
          <FooterSection />
        </div><!-- /content -->

        <!-- Balances the left nav so content stays centered -->
        <div class="hidden lg:block w-52 shrink-0"></div>

      </div><!-- /sidebar + content -->

    </div><!-- /whiteboard panel -->
  </section>
</template>
