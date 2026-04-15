<!--
  EcosiaBrowserPage.vue – Case study: Ecosia Browser Install Funnel.
  Layout: sticky left nav (scroll spy) + white section cards on the dotted whiteboard.
-->

<script setup lang="ts">
import { ref } from 'vue'
import CaseStudyNav from '@/components/CaseStudyNav.vue'
import CaseStudySection from '@/components/CaseStudySection.vue'
import StickyNote from '@/components/StickyNote.vue'
import CardStat from '@/components/CardStat.vue'
import CardCallout from '@/components/CardCallout.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'

const NAV_SECTIONS = [
  { id: 'overview',       label: 'Overview' },
  { id: 'context',        label: 'Context' },
  { id: 'problem',        label: 'The Problem' },
  { id: 'challenge',      label: 'My Approach' },
  { id: 'research',       label: 'Research' },
  { id: 'features',       label: 'Features' },
  { id: 'concept',        label: 'Concept' },
  { id: 'refinement',     label: 'Refinement' },
  { id: 'launch',         label: 'Launch' },
  { id: 'design-system',  label: 'Design System' },
  { id: 'results',        label: 'Results' },
]

const panelRef = ref<HTMLElement | null>(null)
</script>

<template>
  <section
    class="h-screen p-0 sm:p-6 lg:p-[40px] flex flex-col"
    aria-labelledby="project-heading"
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
      <div class="flex gap-8 justify-center pt-20 pb-14 sm:pt-10 sm:pb-14" style="padding-left: clamp(2rem, 4vw, 3.5rem); padding-right: clamp(2rem, 4vw, 3.5rem);">

        <!-- ── Left nav (desktop only) ── -->
        <CaseStudyNav :sections="NAV_SECTIONS" :panel="panelRef" />

        <!-- ── Main content ── -->
        <div class="w-full min-w-0 max-w-4xl space-y-24">

          <!-- ── Overview ── -->
          <CaseStudySection id="overview" label="Overview" first>

            <div class="space-y-4">
              <h1
                id="project-heading"
                class="font-heading text-3xl sm:text-4xl font-black leading-tight tracking-tight text-[var(--color-text-primary)] lg:text-6xl"
              >
                Install Funnel for the Ecosia Browser
              </h1>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in ['Evaluative Research', 'Stakeholder Management', 'Prototyping', 'Design System']"
                  :key="tag"
                  class="rounded-full border border-black/10 bg-black/[0.04] px-4 py-1 text-sm text-[var(--color-text-secondary)]"
                >{{ tag }}</span>
              </div>
              <div class="flex flex-wrap gap-6 sm:gap-12 pt-2">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">Timeline</p>
                  <p class="mt-1 text-[var(--color-text-secondary)]">2 months, 2024</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">My role</p>
                  <p class="mt-1 text-[var(--color-text-secondary)]">Product Designer</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">Collaborated with</p>
                  <p class="mt-1 text-[var(--color-text-secondary)]">Marketing, Engineers, Leadership</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">Company</p>
                  <p class="mt-1 text-[var(--color-text-secondary)]">Ecosia</p>
                </div>
              </div>
            </div>

            <hr class="border-black/[0.06]" />

            <div class="space-y-3">
              <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">TL;DR</h2>
              <p class="text-[var(--color-text-secondary)] leading-relaxed">
                I led the creation of the install funnel for the Ecosia Browser, designing an experience that made switching simple while communicating Ecosia's environmental mission. Working under a tight two-month deadline, I shaped the UX from research to launch. The funnel launched across platforms with <strong>100K DAU</strong>, generated over <strong>€1M+ in revenue</strong>, and improved first-time user understanding of Ecosia's purpose-driven brand.
              </p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <CardStat label="DAU" value="100K" description="daily active users" />
              <CardStat label="Revenue" value="€1M+" description="early stage" />
              <CardStat label="Launched in" value="2 months" description="from research to launch" />
            </div>

            <figure>
              <img src="/project-pages/ecosia-browser/ecosia-browser-1.png" alt="Ecosia Browser landing page" class="w-full rounded-xl border-2 border-[#275243]" />
              <figcaption class="mt-2 text-xs text-center text-[var(--color-text-secondary)]">Ecosia Browser landing page</figcaption>
            </figure>

          </CaseStudySection>

          <!-- ── Context ── -->
          <CaseStudySection id="context" label="Context">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">A browser that turns everyday browsing into climate action</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Ecosia is a search engine that dedicates <strong>100% of its profits to planting trees</strong> all over the world. Like other search engines, it generates revenue through ads, but this revenue goes towards a unique and sustainable mission.
            </p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              I joined Ecosia in <strong>2020</strong> as a Product Designer, working in a cross-functional team focused on user engagement. In <strong>2024</strong>, the company decided to take a step beyond search by creating the <strong>Ecosia Browser</strong>: a privacy-friendly, <strong>Chromium-based</strong> browser that could serve as a <strong>new, independent product line</strong>.
            </p>
            <CardCallout label="My role">
              I owned the browser install funnel end to end, designing an experience to help users discover, understand, and adopt Ecosia's new browser.
            </CardCallout>
            <figure>
              <img src="/project-pages/ecosia-browser/ecosia-browser-2.png" alt="Ecosia product offering: Extensions, native apps, Default Search and Desktop browser" class="w-full rounded-xl border-2 border-[#275243]" />
              <figcaption class="mt-2 text-xs text-center text-[var(--color-text-secondary)]">Ecosia product offering: Extensions, native apps, Default Search &amp; Desktop browser</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── The Problem ── -->
          <CaseStudySection id="problem" label="The Problem">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">We had to build stability in a rocky search landscape</h2>

            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-primary)]">Business problem</p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Ecosia's search engine relied entirely on <strong>partnerships with Google and Bing</strong> to deliver results and generate revenue. These agreements were <strong>short-lived and often renegotiated</strong>, making any long-term planning unpredictable.
            </p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">This led us to identify <strong>three</strong> core business challenges that shaped the project from the start :</p>
            <div class="flex gap-3 py-6">
              <StickyNote :rotate="-1" class="flex-1">
                <span class="text-sm font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">1</span>
                Volatile deals with Google and Bing <strong>threatened long-term planning</strong>
              </StickyNote>
              <StickyNote :rotate="1" class="flex-1">
                <span class="text-sm font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">2</span>
                Building a browser meant <strong>full UX control</strong> and an <strong>independent revenue stream</strong>
              </StickyNote>
              <StickyNote :rotate="-0.5" class="flex-1">
                <span class="text-sm font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">3</span>
                <strong>Earth Day launch</strong>: a meaningful date tied to global climate activism
              </StickyNote>
            </div>

            <figure>
              <img src="/project-pages/ecosia-browser/ecosia-browser-3.png" alt="Partnership landscape and deadline" class="w-full rounded-xl border-2 border-[#275243]" />
              <figcaption class="mt-2 text-xs text-center text-[var(--color-text-secondary)]">Partnership landscape &amp; deadline</figcaption>
            </figure>

            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-primary)]">User problem</p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Switching browsers is one of the <strong>hardest behaviors to change</strong>. Most users rely on Chrome every day and rarely consider alternatives. Their data, extensions, and habits are <strong>already deeply integrated</strong>, making switching feel <strong>inconvenient and risky</strong>.
            </p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">This shaped <strong>three</strong> key user needs we had to address:</p>
            <div class="flex gap-3 py-6">
              <StickyNote :rotate="-1" class="flex-1">
                <span class="text-sm font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">1</span>
                The browser had to feel <strong>instantly familiar</strong> to everyday Chrome users
              </StickyNote>
              <StickyNote :rotate="1" class="flex-1">
                <span class="text-sm font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">2</span>
                It had to <strong>clearly communicate</strong> Ecosia's unique environmental purpose
              </StickyNote>
              <StickyNote :rotate="-0.5" class="flex-1">
                <span class="text-sm font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">3</span>
                <strong>Ryan</strong> values positive impact but doesn't see browsing as meaningful
              </StickyNote>
            </div>

            <figure>
              <img src="/project-pages/ecosia-browser/ecosia-browser-4.png" alt="New user persona" class="w-full rounded-xl border-2 border-[#275243]" />
              <figcaption class="mt-2 text-xs text-center text-[var(--color-text-secondary)]">New user persona</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── The Challenge ── -->
          <CaseStudySection id="challenge" label="My Approach">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Two months to design, prototype, and ship</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              The project came with a <strong>strict two-month deadline</strong> to design, prototype, and deliver a complete install funnel for the new Ecosia Browser. With limited time and multiple teams involved, efficiency and consistency became the top priorities.
            </p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              I focused on quick validation and fast iteration while keeping the experience aligned with Ecosia's visual language. Using existing UI patterns wherever possible allowed my team to move quickly, and <strong>contributing new components to the design system</strong> ensured our work remained scalable and maintainable after launch.
            </p>
            <CardCallout label="Systematic speed">
              I skipped a long discovery phase by building on <strong>existing Ecosia knowledge and competitive research</strong>. I ran <strong>stakeholder and user feedback in parallel</strong>, kept engineers in the loop from day one, and fed every new pattern back into the <strong>design system</strong>.
            </CardCallout>
            <figure>
              <img src="/project-pages/ecosia-browser/ecosia-browser-5.png" alt="Project timeline" class="w-full rounded-xl border-2 border-[#275243]" />
              <figcaption class="mt-2 text-xs text-center text-[var(--color-text-secondary)]">Project timeline</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── Research ── -->
          <CaseStudySection id="research" label="Research">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Understanding the competitive landscape</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Before defining the Ecosia Browser experience, I explored <strong>how major browsers positioned themselves in the market</strong>. This helped identify where Ecosia could stand out and what users already valued across browsers like Chrome, Brave, and Vivaldi.
            </p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Most browsers fell into four main groups: performance-driven, privacy-focused, flexible and customizable, or purpose-led. <strong>Ecosia uniquely bridged the last two</strong>, balancing usability with an environmental mission.
            </p>
            <div class="py-6">
              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] mb-6">Key takeaways:</p>
              <!-- Mobile: bullet list -->
              <ul class="sm:hidden space-y-2 text-sm text-[var(--color-text-secondary)] leading-relaxed list-none">
                <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span><strong class="text-[var(--color-text-primary)]">Chrome-level performance:</strong> users expect speed and familiarity as the baseline</span></li>
                <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span><strong class="text-[var(--color-text-primary)]">Privacy without emotion:</strong> strong selling point but lacks an emotional hook</span></li>
                <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span><strong class="text-[var(--color-text-primary)]">Mission needs clarity:</strong> distinctive but needed stronger articulation</span></li>
              </ul>
              <!-- Desktop: sticky notes -->
              <div class="hidden sm:flex gap-8">
                <StickyNote :rotate="-1" class="flex-1">
                  <span class="text-sm font-bold rounded-md px-2 py-0.5" style="background: var(--color-surface-sticky-label);">Chrome-level performance</span>
                  Users expect speed and familiarity. Performance is the baseline, not a differentiator.
                </StickyNote>
                <StickyNote :rotate="1" class="flex-1">
                  <span class="text-sm font-bold rounded-md px-2 py-0.5" style="background: var(--color-surface-sticky-label);">Privacy without emotion</span>
                  Privacy and independence resonate, but lack an emotional hook to drive switching.
                </StickyNote>
                <StickyNote :rotate="-0.5" class="flex-1">
                  <span class="text-sm font-bold rounded-md px-2 py-0.5" style="background: var(--color-surface-sticky-label);">Mission needs clarity</span>
                  Ecosia's purpose-driven value was distinctive but needed stronger articulation.
                </StickyNote>
              </div>
            </div>
            <figure>
              <img src="/project-pages/ecosia-browser/ecosia-browser-6.png" alt="Competitor map" class="w-full rounded-xl border-2 border-[#275243]" />
              <figcaption class="mt-2 text-xs text-center text-[var(--color-text-secondary)]">Competitor map</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── Features ── -->
          <CaseStudySection id="features" label="Features">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Deciding which features to lead with</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              I analyzed both the browser and Ecosia's search engine to decide which features best communicated Ecosia's purpose while keeping the experience familiar for Chrome users. The goal was to show how everyday browsing could have a positive impact without compromising on usability or performance.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <CardCallout
                label="Search features"
                class="flex-1"
                :items="[
                  { title: 'Climate Pledge Ratings', description: 'Shows companies\' climate progress directly in results.' },
                  { title: 'Highlighted answers', description: 'Marks sustainable or harmful brands to guide.' },
                  { title: 'AI Chat', description: 'Conversational assistant for sustainability topics.' }
                ]"
              />
              <CardCallout
                label="Browser features"
                class="flex-1"
                :items="[
                  { title: 'Easy switching', description: 'Importing browser settings directly from Chrome.' },
                  { title: 'Customization', description: 'Wallpapers, themes, and flexible new tab layouts.' },
                  { title: 'Privacy panel', description: 'Built-in tracker and ad blocking with cookie controls.' }
                ]"
              />
            </div>
            <figure>
              <ImageCarousel
                :images="[
                  '/project-pages/ecosia-browser/ecosia-browser-7.png',
                  '/project-pages/ecosia-browser/ecosia-browser-8.png',
                  '/project-pages/ecosia-browser/ecosia-browser-9.png',
                  '/project-pages/ecosia-browser/ecosia-browser-10.png',
                  '/project-pages/ecosia-browser/ecosia-browser-11.png',
                  '/project-pages/ecosia-browser/ecosia-browser-12.png',
                ]"
                :alts="[
                  'Ecosia Browser features 7',
                  'Ecosia Browser features 8',
                  'Ecosia Browser features 9',
                  'Ecosia Browser features 10',
                  'Ecosia Browser features 11',
                  'Ecosia Browser features 12',
                ]"
              />
              <figcaption class="mt-2 text-xs text-center text-[var(--color-text-secondary)]">Ecosia Search Engine &amp; Browser features</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── Concept ── -->
          <CaseStudySection id="concept" label="Concept">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Validating early concepts with real users</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              After exploring the competitive landscape and defining the Ecosia Browser's focus, I shaped a concept that combined performance, familiarity, and purpose. The goal was to make Ecosia's mission visible from the first interaction while showing that everyday browsing would still be fast and intuitive.
            </p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              To validate this direction, I created an interactive prototype and ran an unmoderated user test with 10 participants who cared about sustainability but had never heard of Ecosia. They explored the prototype freely and responded to prompts about their expectations, first impressions, and the features they found most appealing.
            </p>
            <figure>
              <div class="w-full rounded-xl border-2 border-[#275243] bg-[#275243]/10 aspect-video flex items-center justify-center text-xs text-[var(--color-text-secondary)]">ecosia-browser-8.png</div>
              <figcaption class="mt-2 text-xs text-center text-[var(--color-text-secondary)]">First concept snapshot and user test questions</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── Refinement ── -->
          <CaseStudySection id="refinement" label="Refinement">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Sharpening the message based on what users told us</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              The concept test highlighted what worked and what still felt unclear. Using these insights, I refined the prototype to make Ecosia's message, features, and mission easier to understand at a glance.
            </p>

            <div class="flex flex-col sm:flex-row gap-3">
              <CardCallout label="Working well" class="flex-1">
                <ul class="space-y-2 text-sm text-[var(--color-text-secondary)] leading-relaxed list-none">
                  <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span>The "green browser" message stood out as unique and interesting</span></li>
                  <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span>Users liked the range of features, especially shopping and search</span></li>
                  <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span>Installation and navigation were seen as easy and intuitive</span></li>
                  <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span>Visuals and USPs above the fold helped users understand the value</span></li>
                </ul>
              </CardCallout>
              <CardCallout label="To improve" class="flex-1">
                <ul class="space-y-2 text-sm text-[var(--color-text-secondary)] leading-relaxed list-none">
                  <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span>Performance was mentioned as a key reason to switch but wasn't communicated</span></li>
                  <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span>Customization features were not fully understood</span></li>
                  <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span>Climate and green search features were appreciated but felt buried</span></li>
                  <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span>The mission and climate impact needed to be more visible</span></li>
                </ul>
              </CardCallout>
            </div>

            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              These learnings led to clearer messaging and a stronger visual hierarchy. The final version introduced a renewable energy claim, simplified performance messaging, and more distinct sections for customization, green search, and mission impact. The result felt cohesive and instantly recognizable as Ecosia.
            </p>

            <figure>
              <div class="w-full rounded-xl border-2 border-[#275243] bg-[#275243]/10 aspect-video flex items-center justify-center text-xs text-[var(--color-text-secondary)]">ecosia-browser-9.png</div>
              <figcaption class="mt-2 text-xs text-center text-[var(--color-text-secondary)]">First concept and final versions of the Ecosia Browser landing page</figcaption>
            </figure>
            <figure>
              <div class="w-full rounded-xl border-2 border-[#275243] bg-[#275243]/10 aspect-video flex items-center justify-center text-xs text-[var(--color-text-secondary)]">ecosia-browser-10.png</div>
              <figcaption class="mt-2 text-xs text-center text-[var(--color-text-secondary)]">Ecosia Browser final landing page</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── Launch ── -->
          <CaseStudySection id="launch" label="Launch">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Launched globally on Earth Day 2024</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              The Ecosia Browser launched globally on Earth Day 2024, marking a major milestone for Ecosia by expanding its impact beyond search into a fully independent browsing experience. The release was featured in major publications and on Ecosia's official channels.
            </p>
            <div class="space-y-3">
              <CardCallout label="Ecosia Blog">Designed for you, built for the planet</CardCallout>
              <CardCallout label="Euronews">Ecosia launches an eco-friendly web browser</CardCallout>
              <CardCallout label="TechCrunch">Ecosia launches a cross-platform browser</CardCallout>
            </div>
          </CaseStudySection>

          <!-- ── Design System ── -->
          <CaseStudySection id="design-system" label="Design System">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Contributing to a scalable, shared design language</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              As the browser evolved, I contributed to Ecosia's design system to make future projects faster and more consistent. At the time, there was no unified way to build content cards. Each designer created them from scratch, which slowed us down and led to visual inconsistencies.
            </p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              I designed a flexible card component with adjustable padding, border, and surface options so it could be reused across different contexts while keeping layouts consistent. This standardized one of our most frequently used elements, improved alignment between design and development, and reduced design time for future product pages.
            </p>
            <ul class="space-y-2 text-sm text-[var(--color-text-secondary)] leading-relaxed list-none">
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span><strong class="text-[var(--color-text-primary)]">Created a modular card structure</strong> with multiple display variants</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span><strong class="text-[var(--color-text-primary)]">Simplified the workflow</strong> between designers and developers</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span><strong class="text-[var(--color-text-primary)]">Increased consistency</strong> across browser and search projects</span></li>
            </ul>
            <figure>
              <div class="w-full rounded-xl border-2 border-[#275243] bg-[#275243]/10 aspect-video flex items-center justify-center text-xs text-[var(--color-text-secondary)]">ecosia-browser-11.png</div>
              <figcaption class="mt-2 text-xs text-center text-[var(--color-text-secondary)]">Card component contribution</figcaption>
            </figure>
            <figure>
              <div class="w-full rounded-xl border-2 border-[#275243] bg-[#275243]/10 aspect-video flex items-center justify-center text-xs text-[var(--color-text-secondary)]">ecosia-browser-12.png</div>
              <figcaption class="mt-2 text-xs text-center text-[var(--color-text-secondary)]">Card component options in use</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── Results ── -->
          <CaseStudySection id="results" label="Results">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">A new product line with real traction</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              The Ecosia Browser helped extend Ecosia's mission beyond search by giving users a purpose-driven alternative for everyday browsing. Our experiments and iterations built a clearer value story, showing that sustainability can live inside a familiar experience.
            </p>

            <div class="flex flex-col sm:flex-row gap-3">
              <CardStat label="DAU" value="100K" description="daily active users" />
              <CardStat label="Revenue" value="€1M+" description="generated" />
              <CardStat label="Launched in" value="2 months" description="from research to launch" />
            </div>

            <div class="flex flex-col sm:flex-row gap-3 items-start">
              <CardCallout
                label="What I learned"
                class="flex-1"
                :items="[
                  { title: 'An inspirational USP convinces users to switch', description: 'Even with minor friction in the install flow, a clear and purpose-driven value proposition was enough to motivate action.' },
                  { title: 'Early cross-team collaboration is critical', description: 'Getting engineers and marketing involved from the start helped us balance speed with quality and avoid costly late-stage changes.' },
                  { title: 'Design system contributions compound over time', description: 'The card component I contributed reduced design time on follow-up projects and improved consistency across the browser and search experiences.' }
                ]"
              />
              <CardCallout
                label="What I'd do differently"
                class="flex-1"
                :items="[
                  { title: 'Start with a clearer success definition', description: 'DAU and revenue were tracked post-launch, but defining those targets earlier would have shaped design decisions more directly.' },
                  { title: 'Build in more user testing time', description: 'The two-month deadline compressed the research phase. A second round of testing after refinements would have validated the direction more confidently.' },
                  { title: 'Document decisions as they happen', description: 'Working at speed meant some rationale was lost. Better documentation during the project would have helped onboard the team faster post-launch.' }
                ]"
              />
            </div>
          </CaseStudySection>

        </div><!-- /content -->

        <!-- Balances the left nav so content stays centered -->
        <div class="hidden min-[1568px]:block w-52 shrink-0"></div>

      </div><!-- /sidebar + content -->
    </div><!-- /whiteboard panel -->
  </section>
</template>
