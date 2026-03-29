<!--
  EcosiaOnboardingPage.vue – Case study: Building Ecosia's Onboarding Experience.
  Layout: sticky left nav (scroll spy) + white section cards on the dotted whiteboard.
  Images are placeholder rectangles until real assets are added.
-->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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
})

onUnmounted(() => {
  /* c8 ignore next */
  panelRef.value?.removeEventListener('scroll', updateActiveSection)
})
</script>

<template>
  <section
    class="h-screen p-[40px] flex flex-col"
    aria-labelledby="project-heading"
  >
    <!-- Whiteboard panel: fixed to viewport with 60px inset, content scrolls inside -->
    <div
      ref="panelRef"
      class="h-full w-full overflow-y-auto rounded-3xl"
      style="
        background-color: #f7f6f2;
        background-image: radial-gradient(circle, rgba(0,0,0,0.13) 1.2px, transparent 1.2px);
        background-size: 22px 22px;
        border: 1px solid rgba(0,0,0,0.06);
      "
    >
      <!-- Inner: sidebar + content -->
      <div class="flex gap-8 px-10 lg:px-14 justify-center" style="padding-top: 40px; padding-bottom: 56px;">

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
              <ul class="space-y-0.5">
                <li v-for="s in NAV_SECTIONS" :key="s.id">
                  <button
                    type="button"
                    @click="scrollToSection(s.id)"
                    :class="[
                      'w-full text-left px-3 py-1.5 rounded-lg text-sm leading-tight transition-all duration-150',
                      activeSection === s.id
                        ? 'font-semibold text-[var(--color-headline)] bg-black/[0.04]'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-headline)] hover:bg-black/[0.03]'
                    ]"
                  >{{ s.label }}</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <!-- ── Main content ── -->
        <div class="w-full min-w-0 max-w-4xl space-y-24">

          <!-- ── Hero + TL;DR (merged) ── -->
          <!-- mt-[35px]: first child gets no space-y gap, so we add 35px manually -->
          <!-- 40px flex padding-top + 35px margin-top = 75px from panel top -->
          <!-- label is 35px above card → label lands at 40px = nav sticky top ✓ -->
          <div id="overview" class="mt-[35px] scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-10 py-14 space-y-8">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">Overview</p>

            <!-- Title block -->
            <div class="space-y-4">
              <h1
                id="project-heading"
                class="font-heading text-5xl font-black leading-tight tracking-tight text-[var(--color-headline)] lg:text-6xl"
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
              <div class="flex flex-wrap gap-12 pt-2">
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
          <div id="problem" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-10 py-10 space-y-4">
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
            <div class="pt-5">
            <div class="flex gap-4">
              <div class="relative flex-1" style="transform: rotate(-1deg)">
                <div class="absolute z-10" style="width: 4rem; height: 1.6rem; top: -0.8rem; left: 50%; transform: translateX(-50%) rotate(2deg); background: rgba(210, 228, 255, 0.68); box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.10);"></div>
                <div class="flex flex-col items-center gap-3 px-5 py-6 text-sm leading-relaxed text-center text-[var(--color-headline)]" style="background: #f2c96c; box-shadow: 1px 2px 3px rgba(0,0,0,0.08), 4px 10px 20px rgba(0,0,0,0.18);"><span class="text-base font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">1</span>Low conversion and retention rates with limited insight into why users dropped off</div>
              </div>
              <div class="relative flex-1" style="transform: rotate(1deg)">
                <div class="absolute z-10" style="width: 4rem; height: 1.6rem; top: -0.8rem; left: 50%; transform: translateX(-50%) rotate(-2deg); background: rgba(210, 228, 255, 0.68); box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.10);"></div>
                <div class="flex flex-col items-center gap-3 px-5 py-6 text-sm leading-relaxed text-center text-[var(--color-headline)]" style="background: #f2c96c; box-shadow: 1px 2px 3px rgba(0,0,0,0.08), 4px 10px 20px rgba(0,0,0,0.18);"><span class="text-base font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">2</span>Unclear value as users didn't understand what Ecosia was or how it worked</div>
              </div>
              <div class="relative flex-1" style="transform: rotate(-0.5deg)">
                <div class="absolute z-10" style="width: 4rem; height: 1.6rem; top: -0.8rem; left: 50%; transform: translateX(-50%) rotate(1.5deg); background: rgba(210, 228, 255, 0.68); box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.10);"></div>
                <div class="flex flex-col items-center gap-3 px-5 py-6 text-sm leading-relaxed text-center text-[var(--color-headline)]" style="background: #f2c96c; box-shadow: 1px 2px 3px rgba(0,0,0,0.08), 4px 10px 20px rgba(0,0,0,0.18);"><span class="text-base font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">3</span>No guidance on how to install or set Ecosia as the default search engine</div>
              </div>
            </div>
            </div>
            <figure class="pt-4 space-y-3">
              <img src="/project-pages/ecosia-onboarding/ecosia-onboarding-2.png" alt="Ecosia onboarding screen" class="w-full rounded-xl border-2 border-[#275243]" />
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">Product landscape</figcaption>
            </figure>
          </div>

          <!-- ── The Challenge ── -->
          <div id="challenge" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-10 py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">The Approach</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">Injecting tool evaluation insights into the product</h2>
            <div class="flex gap-8 items-start">
              <div class="flex flex-col gap-4 flex-1 text-[var(--color-muted)] leading-relaxed">
                <p>We realized that users arrived curious, but left before realizing how Ecosia worked and what made it different.</p>
                <p>The <strong>challenge</strong> was to design an onboarding experience that built trust, encouraged action, and fit naturally into existing user behavior.</p>
                <p>To make this possible, I defined a clear research and experimentation track that aligned product, design, and growth goals across multiple teams.</p>
              </div>
              <div class="relative shrink-0 w-56 mt-4" style="transform: rotate(-1deg)">
                <div class="absolute z-10" style="width: 4rem; height: 1.6rem; top: -0.8rem; left: 50%; transform: translateX(-50%) rotate(2deg); background: rgba(210, 228, 255, 0.68); box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.10);"></div>
                <div class="flex flex-col items-center gap-3 px-5 py-6 text-sm leading-relaxed text-center text-[var(--color-headline)]" style="background: #f2c96c; box-shadow: 1px 2px 3px rgba(0,0,0,0.08), 4px 10px 20px rgba(0,0,0,0.18);"><span class="text-base font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">How might we</span>help new users quickly understand and trust Ecosia while keeping their experience familiar</div>
              </div>
            </div>
            <figure class="pt-2 space-y-3">
              <img src="/project-pages/ecosia-onboarding/ecosia-onboarding-3.png" alt="Ecosia onboarding approach" class="w-full rounded-xl border-2 border-[#275243]" />
            </figure>
          </div>

          <!-- ── Research ── -->
          <div id="research" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-10 py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">Research</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">Research insight: switching was emotional, not just functional</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              I started by reviewing existing user knowledge, then went deeper with <strong>unstructured interviews</strong> where participants <strong>retraced their real experiences</strong> with Ecosia. Combined with funnel and retention data, this shaped a User Journey Map and surfaced two key insights.
            </p>

            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">Insight 1: emotional forces shaped the decision</p>

            <div class="flex flex-col sm:flex-row gap-4">

              <!-- Left column: drives -->
              <div class="flex flex-col gap-4 flex-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[#826520]">What drives the switch</p>

                <!-- Push -->
                <div class="rounded-xl border border-black/[0.06] bg-white p-5 space-y-3">
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
                <div class="rounded-xl border border-black/[0.06] bg-white p-5 space-y-3">
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
                <div class="rounded-xl border border-black/[0.06] bg-white p-5 space-y-3">
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
                <div class="rounded-xl border border-black/[0.06] bg-white p-5 space-y-3">
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

            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">Insight 2: users made two separate decisions</p>

            <div class="flex flex-col sm:flex-row gap-4">

              <!-- Left column: try it -->
              <div class="flex flex-col gap-4 flex-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[#9966AA]">Decision 1: try Ecosia out</p>

                <div class="rounded-xl border border-black/[0.06] bg-white p-5 space-y-3">
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

                <div class="rounded-xl border border-black/[0.06] bg-white p-5 space-y-3">
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

            <!-- Key learning -->
            <div class="rounded-xl border border-black/[0.06] p-5 space-y-2" style="background:#fcf4e2">
              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">Key learning</p>
              <p class="text-[var(--color-muted)] leading-relaxed">Landing pages and product touchpoints covered the emotional side well but never addressed the <strong>functional blockers</strong>. The first checklist was handled. The second was not.</p>
            </div>

          </div>

          <!-- ── Opportunities ── -->
          <div id="opportunities" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-10 py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">Opportunities</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">🧭 Mapping Opportunities</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              The User Journey Map showed that most users decided whether to stay or leave within a few searches. I only had a very short window of time to work with, so spending time on finding the right thing to show at the right time was incredibly important.
            </p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              In order to build confidence in my decisions, I created an Opportunity Solution Tree (OST) where I connected user problems with measurable product outcomes. This helped my team prioritize opportunities around clarity, familiarity, and confidence, and link them directly to design experiments such as clearer messaging, contextual prompts, and trust building visuals.
            </p>
            <figure class="pt-2 space-y-3">
              <div class="w-full rounded-xl bg-black/[0.06] aspect-video"></div>
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">Opportunity Solution Tree condensed snapshot</figcaption>
            </figure>
          </div>

          <!-- ── Experimentation ── -->
          <div id="experimentation" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-10 py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">Experimentation</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">🧪 Experimentation</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              Having a limited A/B testing volume was a major challenge, so I divided experimentation into two parallel tracks to learn faster and cover more ground.
            </p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              One track focused on improving conversion, helping new users make Ecosia their default faster. The other focused on SERP education, using the search results page to explain Ecosia's mission in context.
            </p>
            <figure class="pt-2 space-y-3">
              <div class="w-full rounded-xl bg-black/[0.06] aspect-video"></div>
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">Conversion track</figcaption>
            </figure>
            <p class="text-[var(--color-muted)] leading-relaxed">
              This track focused on reducing friction and clarifying value at the moment of install.
            </p>
            <ul class="space-y-2">
              <li class="text-[var(--color-muted)]">💬 "Familiar search, greener impact" as a headline lifted installs by +3.2%</li>
              <li class="text-[var(--color-muted)]">🖼️ Product imagery increased familiarity and lifted CTA clicks by +5.4%</li>
              <li class="text-[var(--color-muted)]">⚙️ A short visual install guide simplified setup and increased conversion by +25%</li>
            </ul>
            <figure class="pt-2 space-y-3">
              <div class="w-full rounded-xl bg-black/[0.06] aspect-video"></div>
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">Conversion experiment track outcomes</figcaption>
            </figure>
            <h3 class="pt-4 font-heading text-xl font-bold text-[var(--color-headline)]">SERP education track</h3>
            <p class="text-[var(--color-muted)] leading-relaxed">
              This track focused on helping users understand Ecosia's purpose directly in the search experience.
            </p>
            <ul class="space-y-2">
              <li class="text-[var(--color-muted)]">🌍 A "How it works" card improved D1 retention by 3%</li>
              <li class="text-[var(--color-muted)]">🧩 Same card with an extra illustration lifted retention overall but dropped -5% in DE</li>
              <li class="text-[var(--color-muted)]">🔐 Privacy messaging raised engagement but reduced retention by -2%</li>
            </ul>
            <p class="text-[var(--color-muted)] leading-relaxed">
              Conversion delivered clear gains. SERP education was mixed, and follow up user tests did not explain the retention drop. The results showed that small content tweaks were not enough, and we needed a broader redesign to move our success metrics further.
            </p>
            <figure class="pt-2 space-y-3">
              <div class="w-full rounded-xl bg-black/[0.06] aspect-video"></div>
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">SERP education experiment track outcomes</figcaption>
            </figure>
          </div>

          <!-- ── Strategy ── -->
          <div id="strategy" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-10 py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">Strategy</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">🏔️ Strategic Direction</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              After several successful experiments that improved conversion and a bit of D1 retention, I realized that we needed a more holistic approach. I structured onboarding around three connected phases that aligned user behavior with Ecosia's mission:
            </p>
            <div class="space-y-4 pt-2">
              <div class="rounded-xl border border-black/10 bg-black/[0.03] px-8 py-6 space-y-2">
                <p class="font-semibold text-[var(--color-headline)]">1. Value perception</p>
                <p class="text-[var(--color-muted)] leading-relaxed">Focus on helping new users see Ecosia's value in context. Familiar layouts, before-and-after imagery, and clearer navigation made the experience feel both recognizable and impactful.</p>
                <p class="text-sm text-[var(--color-brand)] font-medium">→ Goal: make a search</p>
              </div>
              <div class="rounded-xl border border-black/10 bg-black/[0.03] px-8 py-6 space-y-2">
                <p class="font-semibold text-[var(--color-headline)]">2. Value experience</p>
                <p class="text-[var(--color-muted)] leading-relaxed">Use the search results page as an onboarding tool. Contextual onboarding and curated answers helped users understand where and how Ecosia plants trees, reducing early skepticism.</p>
                <p class="text-sm text-[var(--color-brand)] font-medium">→ Goal: return for a second session</p>
              </div>
              <div class="rounded-xl border border-black/10 bg-black/[0.03] px-8 py-6 space-y-2">
                <p class="font-semibold text-[var(--color-headline)]">3. Value adoption</p>
                <p class="text-[var(--color-muted)] leading-relaxed">Encourage users to integrate Ecosia into their daily routine. High affordance prompts, customization options, and repeated prompting explored how to turn curiosity into a lasting habit.</p>
                <p class="text-sm text-[var(--color-brand)] font-medium">→ Goal: activate and convert</p>
              </div>
            </div>
            <figure class="pt-2 space-y-3">
              <div class="w-full rounded-xl bg-black/[0.06] aspect-video"></div>
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">Strategic direction and ideas to execute it</figcaption>
            </figure>
          </div>

          <!-- ── Execution ── -->
          <div id="execution" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-10 py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">Execution</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">🚧 Executing Strategy</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              By using this strategic framework, I focused on translating the adoption phase into concrete experiments around install prompts. The goal was to understand when and how users would be most open to setting Ecosia as default.
            </p>
            <figure class="pt-2 space-y-3">
              <div class="w-full rounded-xl bg-black/[0.06] aspect-video"></div>
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">Install prompt experiments</figcaption>
            </figure>
            <ul class="space-y-2">
              <li class="text-[var(--color-muted)]">🧠 First session prompt increased CTA clicks by 17% but did not improve install rate</li>
              <li class="text-[var(--color-muted)]">🔁 Second session prompt lifted CTA clicks by 14% and improved retention (+1.5%)</li>
              <li class="text-[var(--color-muted)]">⚙️ Results showed timing and context were key to driving meaningful conversion</li>
            </ul>
            <figure class="pt-2 space-y-3">
              <div class="w-full rounded-xl bg-black/[0.06] aspect-video"></div>
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">First session install prompt experiment</figcaption>
            </figure>
            <p class="text-[var(--color-muted)] leading-relaxed">
              The next planned experiment aimed to test before and after imagery of reforestation projects, shown above the fold. The goal was to strengthen emotional connection and make Ecosia's real world impact instantly visible during setup.
            </p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              This final test was paused when my team was reassigned, so it was never executed. However, the concept and assets were fully prepared, allowing any future team to continue testing and build on the work.
            </p>
            <figure class="pt-2 space-y-3">
              <div class="w-full rounded-xl bg-black/[0.06] aspect-video"></div>
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">Future direction</figcaption>
            </figure>
          </div>

          <!-- ── Results ── -->
          <div id="results" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-10 py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">Results</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">🌱 Results & Learnings</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              The onboarding work delivered measurable growth and created a scalable foundation for future experimentation. Conversion increased by +20–25%, and D1 retention improved by +3%, setting a new baseline for activation across products. More importantly, the project connected design decisions directly to Ecosia's environmental mission, turning every conversion into both a product and impact win.
            </p>
            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">Biggest challenges</p>
            <ul class="space-y-2">
              <li class="text-[var(--color-muted)]">⚙️ Limited A/B testing volume required creative testing methods</li>
              <li class="text-[var(--color-muted)]">🌍 Regional differences, especially in Germany, complicated interpretation of results</li>
              <li class="text-[var(--color-muted)]">⏱️ High early churn meant only seconds to communicate value</li>
              <li class="text-[var(--color-muted)]">🚧 Small scale experiments risked blocking bigger strategic bets</li>
            </ul>
            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">Key learnings</p>
            <ul class="space-y-2">
              <li class="text-[var(--color-muted)]">🧩 Running parallel tracks accelerated learning and validated strategy faster</li>
              <li class="text-[var(--color-muted)]">💬 Listening to how users talked about Ecosia led to stronger messaging</li>
              <li class="text-[var(--color-muted)]">🔍 Monitoring market differences helped us adapt and stay confident amid uncertainty</li>
              <li class="text-[var(--color-muted)]">📘 Establishing a long term onboarding playbook allowed others to build on the work</li>
            </ul>
            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">Future opportunities</p>
            <ul class="space-y-2">
              <li class="text-[var(--color-muted)]">🇩🇪 Analyze core markets individually to uncover regional patterns</li>
              <li class="text-[var(--color-muted)]">💚 Expand use of user insights deeper into the funnel</li>
              <li class="text-[var(--color-muted)]">🪴 Apply the onboarding strategy logic to new product domains</li>
            </ul>
          </div>

        </div><!-- /content -->
      </div><!-- /sidebar + content -->
    </div><!-- /whiteboard panel -->
  </section>
</template>
