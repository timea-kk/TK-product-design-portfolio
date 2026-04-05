<!--
  FloraDesignSystemPage.vue – Case study: Scaling Design Operations at Ecosia.
  Layout: sticky left nav (scroll spy) + white section cards on the dotted whiteboard.
  Images are placeholder slots, to be added later.
-->

<script setup lang="ts">
import { ref } from 'vue'
import CaseStudyNav from '@/components/CaseStudyNav.vue'
import CaseStudySection from '@/components/CaseStudySection.vue'
import StickyNote from '@/components/StickyNote.vue'
import CalloutCard from '@/components/CalloutCard.vue'

const NAV_SECTIONS = [
  { id: 'overview',     label: 'Overview' },
  { id: 'context',      label: 'Context' },
  { id: 'problem',      label: 'The Problem' },
  { id: 'process',      label: 'My Approach' },
  { id: 'initiatives',  label: 'Key Initiatives' },
  { id: 'contribution', label: 'Card Component' },
  { id: 'results',      label: 'Results' },
]

const panelRef = ref<HTMLElement | null>(null)
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

        <!-- Left nav (desktop only) -->
        <CaseStudyNav :sections="NAV_SECTIONS" :panel="panelRef" />

        <!-- Main content -->
        <div class="w-full min-w-0 max-w-4xl space-y-24">

          <!-- Overview -->
          <CaseStudySection id="overview" label="Overview" first>

            <div class="space-y-4">
              <h1
                id="project-heading"
                class="font-heading text-3xl sm:text-4xl font-black leading-tight tracking-tight text-[var(--color-headline)] lg:text-6xl"
              >
                Scaling Design Operations at Ecosia
              </h1>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in ['Design System', 'Documentation', 'Design Operations', 'Workflows &amp; Processes']"
                  :key="tag"
                  class="rounded-full border border-black/10 bg-black/[0.04] px-4 py-1 text-sm text-[var(--color-muted)]"
                  v-html="tag"
                ></span>
              </div>
              <div class="flex flex-wrap gap-6 sm:gap-12 pt-2">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] opacity-60">Timeline</p>
                  <p class="mt-1 text-[var(--color-muted)]">2025 – ongoing</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] opacity-60">My role</p>
                  <p class="mt-1 text-[var(--color-muted)]">Product Designer</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] opacity-60">Collaborated with</p>
                  <p class="mt-1 text-[var(--color-muted)]">Product Designers, Engineers</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] opacity-60">Company</p>
                  <p class="mt-1 text-[var(--color-muted)]">Ecosia</p>
                </div>
              </div>
            </div>

            <hr class="border-black/[0.06]" />

            <div class="space-y-3">
              <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">TL;DR</h2>
              <p class="text-[var(--color-muted)] leading-relaxed">
                I led the transition of Ecosia's Flora Design System from single-lead ownership to a <strong>shared ownership model</strong> across six product designers. I introduced contribution workflows, health tracking, governance processes, and documentation that kept Flora self-sustaining throughout 2025. Within six months, designers were contributing independently and component knowledge was spread across at least three people per component.
              </p>
            </div>

            <figure>
              <img src="/project-pages/flora-design-system/flora-design-system-1.png" alt="Flora Design System structure" class="w-full rounded-xl border-2 border-[#275243]" />
              <figcaption class="mt-2 text-xs text-center text-[var(--color-muted)]">Flora Design System structure</figcaption>
            </figure>
          </CaseStudySection>

          <!-- Context -->
          <CaseStudySection id="context" label="Context">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">From one owner to six</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              At the start of 2025, Ecosia's Design System, Flora, lost its dedicated team and lead. Responsibility shifted to the six product designers across our product areas, each of us balancing DS work alongside our own roadmaps.
            </p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              Without a single owner, we needed a new way to keep Flora moving. <strong>I stepped in to structure and coordinate the transition to a shared ownership model.</strong>
            </p>
            <figure class="pt-2">
              <img src="/project-pages/flora-design-system/flora-design-system-2.png" alt="DS Ownership transition: old vs. new" class="w-full rounded-xl border-2 border-[#275243]" />
              <figcaption class="mt-2 text-xs text-center text-[var(--color-muted)]">DS Ownership transition: old vs. new</figcaption>
            </figure>
          </CaseStudySection>

          <!-- The Problem -->
          <CaseStudySection id="problem" label="The Problem">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">Ownership became everyone's problem</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              Our Design System lead had been the single source of truth for how to contribute, build, and maintain components, and most designers relied on working directly with him. He also mentored and guided us in times of uncertainty, so navigating through DS work on our own seemed scary at first.
            </p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              Without this structure, we suddenly had <strong>no clear process or ownership to fall back on.</strong> Each designer approached contributions differently and used different accessibility plugins, naming conventions, and review steps. Knowledge about best practices was scattered, and quality varied from one library to another.
            </p>
            <!-- Mobile: bullet list -->
            <ul class="sm:hidden space-y-2 pt-2 text-sm text-[var(--color-muted)] leading-relaxed list-none">
              <li class="flex gap-2"><span class="text-[var(--color-brand)] shrink-0">•</span><span><strong class="text-[var(--color-headline)]">How might we</strong> create a shared process for contributing to Flora?</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand)] shrink-0">•</span><span><strong class="text-[var(--color-headline)]">How might we</strong> align six designers on the same standards and tools?</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand)] shrink-0">•</span><span><strong class="text-[var(--color-headline)]">How might we</strong> turn scattered knowledge into something shared?</span></li>
            </ul>
            <!-- Desktop: sticky notes -->
            <div class="hidden sm:block pt-5">
              <div class="flex gap-3">
                <StickyNote :rotate="-1" class="flex-1">
                  <span class="text-sm font-bold rounded-md px-2 py-0.5 sm:text-base" style="background: #d4a017;">How might we</span>
                  create a shared process for contributing to Flora?
                </StickyNote>
                <StickyNote :rotate="1" class="flex-1">
                  <span class="text-sm font-bold rounded-md px-2 py-0.5 sm:text-base" style="background: #d4a017;">How might we</span>
                  align six designers on the same standards and tools?
                </StickyNote>
                <StickyNote :rotate="-0.5" class="flex-1">
                  <span class="text-sm font-bold rounded-md px-2 py-0.5 sm:text-base" style="background: #d4a017;">How might we</span>
                  turn scattered knowledge into something shared?
                </StickyNote>
              </div>
            </div>
            <CalloutCard label="Shared goal">
              <p class="text-[var(--color-muted)] leading-relaxed">Keep Flora running as a shared system where every designer can contribute confidently, review each other's work, and maintain consistent quality. Clear documentation, defined ownership, and shared standards across all libraries would make that possible.</p>
            </CalloutCard>
          </CaseStudySection>

          <!-- My Approach -->
          <CaseStudySection id="process" label="My Approach">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">Systematic by design</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              When defining our new ways of working, I covered how we would collaborate, document, and measure success. At the same time, I made sure that everyone felt equipped to contribute, even without a dedicated Design System team.
            </p>
            <div class="flex flex-col gap-3 pt-2">
              <CalloutCard label="Establish structure">
                <p class="text-[var(--color-muted)] leading-relaxed">I set up the Flora Jira board, workflows, and review process so we could track, prioritize, and assign DS tasks clearly.</p>
              </CalloutCard>
              <CalloutCard label="Document everything">
                <p class="text-[var(--color-muted)] leading-relaxed">I wrote and organized guidelines in Confluence, including ownership rules, contribution checklists, and detailed guides for naming, accessibility, and component decisions.</p>
              </CalloutCard>
              <CalloutCard label="Create visibility">
                <p class="text-[var(--color-muted)] leading-relaxed">I built a Design System health dashboard in Google Sheets to track quality across all libraries and visualize monthly progress.</p>
              </CalloutCard>
              <CalloutCard label="Support collaboration">
                <p class="text-[var(--color-muted)] leading-relaxed">I facilitated retrospectives, shared monthly updates, and clarified ownership by mapping who was most experienced with specific components.</p>
              </CalloutCard>
            </div>
          </CaseStudySection>

          <!-- Key Initiatives -->
          <CaseStudySection id="initiatives" label="Key Initiatives" loose>
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">Five initiatives that rebuilt Flora</h2>

            <div class="space-y-3">
              <p class="text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">1. Establishing shared ownership</p>
              <p class="text-[var(--color-muted)] leading-relaxed">
                To replace the missing single point of contact, I clarified responsibilities across the design team. Each designer took ownership of specific component areas, and we discussed the intricacies of reviews and how we would handle bigger contributions. I also set up a bi-weekly Design System meeting where we could align priorities, review contributions, and keep Flora's work transparent across teams.
              </p>
              <figure>
                <div class="w-full rounded-xl border-2 border-[#275243] bg-black/[0.03] aspect-video flex items-center justify-center">
                  <p class="text-sm text-[var(--color-muted)] opacity-50">Image coming soon</p>
                </div>
                <figcaption class="mt-2 text-xs text-center text-[var(--color-muted)]">DS Ownership discussion &amp; Jira board setup</figcaption>
              </figure>
            </div>

            <div class="space-y-3">
              <p class="text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">2. Creating the Flora checklist</p>
              <p class="text-[var(--color-muted)] leading-relaxed">
                Designers were contributing components in inconsistent ways and using different plugins to follow scattered rules. I created a detailed contribution checklist that broke down every step, including naming conventions, accessibility considerations, variable usage, and much more. It became the shared playbook for contributions and helped everyone work with the same standards, while also making reviews quicker and more efficient.
              </p>
              <figure>
                <div class="w-full rounded-xl border-2 border-[#275243] bg-black/[0.03] aspect-video flex items-center justify-center">
                  <p class="text-sm text-[var(--color-muted)] opacity-50">Image coming soon</p>
                </div>
                <figcaption class="mt-2 text-xs text-center text-[var(--color-muted)]">Flora Contribution checklist snapshot</figcaption>
              </figure>
            </div>

            <div class="space-y-3">
              <p class="text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">3. Tracking Design System health</p>
              <p class="text-[var(--color-muted)] leading-relaxed">
                I built a Google Sheets dashboard that tracked the health status of all our global and domain-specific libraries. Each library had its own sheet with criteria for what made a component "healthy," aligned with the contribution checklist. The tracker measured progress month by month and linked directly to OKRs, so we could quantify improvements and keep ourselves accountable.
              </p>
              <figure>
                <div class="w-full rounded-xl border-2 border-[#275243] bg-black/[0.03] aspect-video flex items-center justify-center">
                  <p class="text-sm text-[var(--color-muted)] opacity-50">Image coming soon</p>
                </div>
                <figcaption class="mt-2 text-xs text-center text-[var(--color-muted)]">Flora Health Check spreadsheet</figcaption>
              </figure>
            </div>

            <div class="space-y-3">
              <p class="text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">4. Strengthening documentation</p>
              <p class="text-[var(--color-muted)] leading-relaxed">
                I documented every new process in Confluence: how to contribute, how to use the health tracker, and even how to write documentation itself. I also shared regular updates in Slack to keep the org informed, clarify expectations, and make our progress visible. This made our roles clear to everyone and ensured no knowledge lived in just one person's head again.
              </p>
              <figure>
                <div class="w-full rounded-xl border-2 border-[#275243] bg-black/[0.03] aspect-video flex items-center justify-center">
                  <p class="text-sm text-[var(--color-muted)] opacity-50">Image coming soon</p>
                </div>
                <figcaption class="mt-2 text-xs text-center text-[var(--color-muted)]">New processes in Confluence</figcaption>
              </figure>
            </div>

            <div class="space-y-3">
              <p class="text-sm font-semibold uppercase tracking-widest text-[var(--color-headline)]">5. Improving on new processes over time</p>
              <p class="text-[var(--color-muted)] leading-relaxed">
                Design System retros became regular rituals so we could continuously improve these new practices. We uncovered ways of working with engineers, planned how to handle bigger contributions, and identified topics to learn about as a group: accessibility, AI tools, color system builds, and more.
              </p>
            </div>
          </CaseStudySection>

          <!-- Card Component -->
          <CaseStudySection id="contribution" label="Card Component">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">One component, many fewer snowflakes</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              As our group evolved, we contributed bigger and more complex components to Flora. At the time, there was no unified way to build content cards, and each designer had to create them from scratch, which slowed us down and led to visual inconsistencies.
            </p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              I designed a flexible card component with adjustable padding, border, and surface options so it could be reused across different contexts while keeping layouts consistent. This standardized one of our most frequently used elements, improved alignment between design and development, and reduced design time for future product pages.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <CalloutCard label="Structure">
                <p class="text-[var(--color-muted)] leading-relaxed">Modular card with multiple display variants</p>
              </CalloutCard>
              <CalloutCard label="Workflow">
                <p class="text-[var(--color-muted)] leading-relaxed">Simplified handoff between designers and developers</p>
              </CalloutCard>
              <CalloutCard label="Consistency">
                <p class="text-[var(--color-muted)] leading-relaxed">Increased across browser and search projects</p>
              </CalloutCard>
            </div>
            <div class="pt-2 space-y-4">
              <figure>
                <div class="w-full rounded-xl border-2 border-[#275243] bg-black/[0.03] aspect-video flex items-center justify-center">
                  <p class="text-sm text-[var(--color-muted)] opacity-50">Image coming soon</p>
                </div>
                <figcaption class="mt-2 text-xs text-center text-[var(--color-muted)]">Card component contribution</figcaption>
              </figure>
              <figure>
                <div class="w-full rounded-xl border-2 border-[#275243] bg-black/[0.03] aspect-video flex items-center justify-center">
                  <p class="text-sm text-[var(--color-muted)] opacity-50">Image coming soon</p>
                </div>
                <figcaption class="mt-2 text-xs text-center text-[var(--color-muted)]">Card component options in use</figcaption>
              </figure>
            </div>
          </CaseStudySection>

          <!-- Results -->
          <CaseStudySection id="results" label="Results">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">A stronger, more resilient design system</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              The shift to shared ownership transformed Flora. Designers gained confidence as contributors and used shared documentation and the checklist to maintain consistency. With clearer structure and healthier habits, Flora became easier to maintain, scale, and evolve across teams.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <CalloutCard
                label="Results"
                class="flex-1"
                :items="[
                  { title: 'Confident, independent contributors', description: 'Designers became comfortable contributing without needing a dedicated DS lead.' },
                  { title: 'DS health scores improved quarter over quarter', description: 'Tracked monthly, health scores across all libraries improved consistently throughout 2025.' },
                  { title: 'Stronger decision-making', description: 'Clear prioritization and tracking gave the team a shared framework for making calls.' },
                  { title: 'Higher contribution quality', description: 'Shared standards and reviews raised the bar across all contributions.' }
                ]"
              />
              <CalloutCard
                label="Learnings"
                class="flex-1"
                :items="[
                  { title: 'Shared ownership builds stronger culture than centralization', description: 'Distributed responsibility improved org-wide resilience without sacrificing quality.' },
                  { title: 'Clear documentation reduces friction and dependency', description: 'Writing things down meant no knowledge was locked in one person\'s head.' },
                  { title: 'Lightweight governance keeps consistency without slowing teams', description: 'Just enough process was the right call; heavy governance would have created more drag than value.' },
                  { title: 'Transparency improves collective responsibility', description: 'Regular updates and visible progress made the whole team feel accountable and motivated.' }
                ]"
              />
            </div>
          </CaseStudySection>

        </div><!-- /content -->

        <!-- Balances the left nav so content stays centered -->
        <div class="hidden lg:block w-52 shrink-0"></div>

      </div><!-- /sidebar + content -->
    </div><!-- /whiteboard panel -->
  </section>
</template>
