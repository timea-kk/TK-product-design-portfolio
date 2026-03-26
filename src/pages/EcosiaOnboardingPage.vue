<!--
  EcosiaOnboardingPage.vue – Case study: Building Ecosia's Onboarding Experience.
  Layout: sticky left nav (scroll spy) + white section cards on the dotted whiteboard.
  Images are placeholder rectangles until real assets are added.
-->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const NAV_SECTIONS = [
  { id: 'overview',        label: 'Overview' },
  { id: 'context',         label: 'Context' },
  { id: 'problem',         label: 'The Problem' },
  { id: 'challenge',       label: 'The Challenge' },
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

let observer: IntersectionObserver | null = null
const visibleSections = new Set<string>()

onMounted(() => {
  if (!panelRef.value) return

  // root must be the scrolling panel, not the viewport
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleSections.add(entry.target.id)
        else visibleSections.delete(entry.target.id)
      }
      // Always highlight the topmost visible section in nav order,
      // so "overview" wins over "context" when both are on screen
      const first = NAV_SECTIONS.find(s => visibleSections.has(s.id))
      if (first) activeSection.value = first.id
    },
    { root: panelRef.value, rootMargin: '0px 0px -75% 0px' }
  )

  NAV_SECTIONS.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) observer!.observe(el)
  })
})

onUnmounted(() => observer?.disconnect())
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
              <img src="/project-pages/ecosia-onboarding/ecosia-onboarding-1.png" alt="Ecosia onboarding screen" class="w-full rounded-xl" />
              <figcaption class="mt-2 text-xs text-center text-[var(--color-muted)]">Ecosia Landing Page snapshot</figcaption>
            </figure>

          </div>

          <!-- ── Context ── -->
          <div id="context" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-10 py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">Context</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">🌎 Context</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              Ecosia is a search engine that dedicates 100% of its profits to planting trees all over the world. Like other search engines, it generates revenue through ads, but this revenue goes towards a unique and sustainable mission.
            </p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              After switching to Google as a search partner, Ecosia needed to improve retention by helping users make it their default search engine. Despite strong awareness, many new users left after their first search, often before understanding its mission or impact.
            </p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              I joined Ecosia in 2020 as a Product Designer in a cross functional team focused on user engagement. The onboarding project was part of a broader effort to reduce early drop off and build a scalable way to introduce new users to Ecosia.
            </p>
            <figure class="pt-2 space-y-3">
              <div class="w-full rounded-xl bg-black/[0.06] aspect-video"></div>
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">
                Ecosia product offering: Extensions, native apps and Default Search
              </figcaption>
            </figure>
          </div>

          <!-- ── The Problem ── -->
          <div id="problem" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-10 py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">The Problem</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">🧠 The Problem</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              Despite having great organic acquisition, Ecosia's growth was limited by activation. Many users installed Ecosia or tried it once but didn't stay. There was no clear onboarding experience to explain what the product was, how to use it, or why it was worth switching from familiar search engines.
            </p>
            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">Business Problem</p>
            <ul class="space-y-2">
              <li class="text-[var(--color-muted)]">📉 Low conversion and retention rates with limited insight into why users dropped off</li>
              <li class="text-[var(--color-muted)]">🧪 Small testing volume made it difficult to reach statistically reliable results</li>
              <li class="text-[var(--color-muted)]">⚙️ Dependence on a new search partner (Google) with strict messaging limitations</li>
            </ul>
            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">User Problem</p>
            <ul class="space-y-2">
              <li class="text-[var(--color-muted)]">❓ Unclear value as users didn't understand what Ecosia was or how it worked</li>
              <li class="text-[var(--color-muted)]">🧭 No guidance on how to install or set Ecosia as the default search engine</li>
              <li class="text-[var(--color-muted)]">💬 Early experience lacked trust or familiarity leading to quick churn</li>
              <li class="text-[var(--color-muted)]">🌍 Skepticism about Ecosia's environmental claims and real world impact</li>
            </ul>
            <figure class="pt-2 space-y-3">
              <div class="w-full rounded-xl bg-black/[0.06] aspect-video"></div>
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">Product landscape</figcaption>
            </figure>
          </div>

          <!-- ── The Challenge ── -->
          <div id="challenge" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-10 py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">The Challenge</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">⚡️ The Challenge</h2>
            <blockquote class="rounded-xl border border-black/10 bg-black/[0.03] px-8 py-6">
              <p class="text-lg font-semibold text-[var(--color-headline)] leading-snug">
                🧠 How might we help new users quickly understand and trust Ecosia while keeping their experience familiar?
              </p>
            </blockquote>
            <p class="text-[var(--color-muted)] leading-relaxed">
              We realized that users arrived curious, but left before realizing how Ecosia worked and what made it different. We needed to communicate value and impact in just a few seconds, with limited space, strict content policies, and small test samples.
            </p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              The challenge was to design an onboarding experience that built trust, encouraged action, and fit naturally into existing user behavior.
            </p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              To make this possible, I defined a clear research and experimentation track that aligned product, design, and growth goals across multiple teams.
            </p>
            <figure class="pt-2 space-y-3">
              <div class="w-full rounded-xl bg-black/[0.06] aspect-video"></div>
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">Project timeline</figcaption>
            </figure>
          </div>

          <!-- ── Research ── -->
          <div id="research" class="scroll-mt-24 relative rounded-2xl bg-white border border-black/[0.06] px-10 py-10 space-y-4">
            <p class="absolute -top-[35px] left-0 text-xs font-medium text-white bg-[var(--color-brand)] rounded-lg px-2.5 py-1 select-none"
              style="box-shadow: 0 1px 4px rgba(0,0,0,0.06);">Research</p>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">🔍 Research Insights</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              I began by reviewing what we already knew about Ecosia users. Most of the new users valued the mission but still compared Ecosia to Google or used both search engines side by side.
            </p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              Search quality and relevance were the main deciding factors, and few people made Ecosia their default search engine.
            </p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              Ryan, a representative user persona already defined within the company, captured this mindset well. He is motivated by purpose, but cares a lot about convenience and finds it difficult to change his habits.
            </p>
            <figure class="pt-2 space-y-3">
              <div class="w-full rounded-xl bg-black/[0.06] aspect-video"></div>
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">New user persona</figcaption>
            </figure>
            <p class="text-[var(--color-muted)] leading-relaxed">
              To go deeper, I led a set of unstructured interviews where I explored how people actually evaluated Ecosia for the first time. Instead of going through scripted questions, I asked participants to retrace their real experiences and describe how they discovered Ecosia, what convinced them to try it, and what made them stay or leave. I combined these stories with funnel and retention data and created a new User Journey Map which guided all of our future experiments.
            </p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              The research revealed two key insights that shaped the onboarding direction: the emotional forces behind user behavior and the criteria they used to evaluate Ecosia.
            </p>
            <figure class="pt-2 space-y-3">
              <div class="w-full rounded-xl bg-black/[0.06] aspect-video"></div>
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">Emotional forces</figcaption>
            </figure>
            <ul class="space-y-2">
              <li class="text-[var(--color-muted)]">🟡 Push: frustration with Google's data policies and curiosity for alternatives</li>
              <li class="text-[var(--color-muted)]">🟡 Pull: motivation from Ecosia's tree-planting mission and its ease of switching</li>
              <li class="text-[var(--color-muted)]">🔵 Inertia: reluctance to change habits or risk losing bookmarks and convenience</li>
              <li class="text-[var(--color-muted)]">🔵 Anxiety: uncertainty about search quality, privacy, and performance</li>
            </ul>
            <figure class="pt-2 space-y-3">
              <div class="w-full rounded-xl bg-black/[0.06] aspect-video"></div>
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">Criteria to evaluate Ecosia</figcaption>
            </figure>
            <ul class="space-y-2">
              <li class="text-[var(--color-muted)]">🌿 To try: trusted recommendations, low effort to start, and clear climate value</li>
              <li class="text-[var(--color-muted)]">⚙️ To stay: relevance, easy setup, Chrome compatibility and minimal disruptions</li>
            </ul>
            <figure class="pt-2 space-y-3">
              <div class="w-full rounded-xl bg-black/[0.06] aspect-video"></div>
              <figcaption class="text-center text-sm text-[var(--color-muted)] opacity-70">Push – Pull – Anxiety – Inertia map</figcaption>
            </figure>
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
