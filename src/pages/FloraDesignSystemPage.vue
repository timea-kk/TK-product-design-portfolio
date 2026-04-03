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

const NAV_SECTIONS = [
  { id: 'overview',     label: 'Overview' },
  { id: 'context',      label: 'Context' },
  { id: 'problem',      label: 'The Problem' },
  { id: 'challenge',    label: 'The Challenge' },
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
                I led the transition of Ecosia's Flora Design System from single-lead ownership to a shared model across five product designers. I introduced contribution workflows, health tracking, governance processes, and documentation that kept Flora consistent, scalable, and transparent throughout 2025.
              </p>
            </div>

            <figure>
              <div class="w-full rounded-xl border-2 border-[#275243] bg-black/[0.03] aspect-video flex items-center justify-center">
                <p class="text-sm text-[var(--color-muted)] opacity-50">Image coming soon</p>
              </div>
              <figcaption class="mt-2 text-xs text-center text-[var(--color-muted)]">Flora Design System structure</figcaption>
            </figure>
          </CaseStudySection>

          <!-- Context -->
          <CaseStudySection id="context" label="Context">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">A design system without a home</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              At the start of 2025, Ecosia entered a transitional period: our Design System, Flora, no longer had a dedicated team or lead. The responsibility for maintaining and evolving it shifted to the five product designers across different product areas.
            </p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              Without a single owner, we needed to find new ways to keep Flora consistent, efficient, and transparent, while also balancing DS work with our individual product responsibilities. At first, this seemed like an intimidating and uncertain path, but I took on the role of leading the coordination and structure of this new shared ownership model.
            </p>
            <figure class="pt-2">
              <div class="w-full rounded-xl border-2 border-[#275243] bg-black/[0.03] aspect-video flex items-center justify-center">
                <p class="text-sm text-[var(--color-muted)] opacity-50">Image coming soon</p>
              </div>
              <figcaption class="mt-2 text-xs text-center text-[var(--color-muted)]">DS Ownership transition: old vs. new</figcaption>
            </figure>
          </CaseStudySection>

          <!-- The Problem -->
          <CaseStudySection id="problem" label="The Problem">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">No process, no ownership, no consistency</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              Our Design System lead had been the single source of truth for how to contribute, build, and maintain components, and most designers relied on working directly with him. He also mentored and guided us in times of uncertainty, so navigating DS work on our own seemed scary at first.
            </p>
            <p class="text-[var(--color-muted)] leading-relaxed">
              Without this structure, we suddenly had no clear process or ownership to fall back on. Each designer approached contributions differently and used different accessibility plugins, naming conventions, and review steps. Knowledge about best practices was scattered, and quality varied from one library to another.
            </p>
            <!-- Mobile: bullet list -->
            <ul class="sm:hidden space-y-2 pt-2 text-sm text-[var(--color-muted)] leading-relaxed list-none">
              <li class="flex gap-2"><span class="text-[var(--color-brand)] shrink-0">•</span><span><strong class="text-[var(--color-headline)]">No clear process</strong> or ownership to fall back on</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand)] shrink-0">•</span><span><strong class="text-[var(--color-headline)]">Inconsistent contributions</strong> with different plugins, naming, and review steps per designer</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand)] shrink-0">•</span><span><strong class="text-[var(--color-headline)]">Scattered knowledge</strong> and variable quality across libraries</span></li>
            </ul>
            <!-- Desktop: sticky notes -->
            <div class="hidden sm:block pt-5">
              <div class="flex gap-3">
                <StickyNote :rotate="-1" class="flex-1">
                  <span class="text-sm font-bold rounded-md px-2 py-0.5 sm:text-base" style="background: #d4a017;">1</span>
                  No clear process or ownership to fall back on
                </StickyNote>
                <StickyNote :rotate="1" class="flex-1">
                  <span class="text-sm font-bold rounded-md px-2 py-0.5 sm:text-base" style="background: #d4a017;">2</span>
                  Inconsistent contributions across designers with different plugins, naming, and review steps
                </StickyNote>
                <StickyNote :rotate="-0.5" class="flex-1">
                  <span class="text-sm font-bold rounded-md px-2 py-0.5 sm:text-base" style="background: #d4a017;">3</span>
                  Scattered knowledge and variable quality across design libraries
                </StickyNote>
              </div>
            </div>
          </CaseStudySection>

          <!-- The Challenge -->
          <CaseStudySection id="challenge" label="The Challenge">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">Rebuilding clarity without a central owner</h2>
            <div class="flex flex-col sm:flex-row gap-8 items-start">
              <div class="flex flex-col gap-4 flex-1 text-[var(--color-muted)] leading-relaxed">
                <p>The goal was to keep Flora running while creating a structure that allowed every designer to contribute confidently, review each other's work, and maintain shared standards, all while balancing their own product responsibilities.</p>
                <p>The biggest challenge was turning fragmented, individual knowledge into a scalable, transparent system. We needed clear documentation, defined ownership, and a way to measure quality across all design libraries.</p>
              </div>
              <StickyNote :rotate="-1" square class="w-1/2 mx-auto sm:w-56 sm:mx-0 sm:shrink-0 sm:mt-4">
                <span class="text-base font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">How might we</span>
                turn fragmented individual knowledge into a scalable, transparent design system
              </StickyNote>
            </div>
          </CaseStudySection>

          <!-- My Approach -->
          <CaseStudySection id="process" label="My Approach">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">Systematic by design</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              When defining our new ways of working, I covered how we would collaborate, document, and measure success. At the same time, I made sure that everyone felt equipped to contribute, even without a dedicated Design System team.
            </p>
            <div class="flex flex-col gap-3 pt-2">
              <div class="rounded-xl bg-black/[0.03] px-5 py-4 space-y-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Establish structure</p>
                <p class="text-sm text-[var(--color-muted)]">I set up the Flora Jira board, workflows, and review process so we could track, prioritize, and assign DS tasks clearly.</p>
              </div>
              <div class="rounded-xl bg-black/[0.03] px-5 py-4 space-y-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Document everything</p>
                <p class="text-sm text-[var(--color-muted)]">I wrote and organized guidelines in Confluence, including ownership rules, contribution checklists, and detailed guides for naming, accessibility, and component decisions.</p>
              </div>
              <div class="rounded-xl bg-black/[0.03] px-5 py-4 space-y-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Create visibility</p>
                <p class="text-sm text-[var(--color-muted)]">I built a Design System health dashboard in Google Sheets to track quality across all libraries and visualize monthly progress.</p>
              </div>
              <div class="rounded-xl bg-black/[0.03] px-5 py-4 space-y-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Support collaboration</p>
                <p class="text-sm text-[var(--color-muted)]">I facilitated retrospectives, shared monthly updates, and clarified ownership by mapping who was most experienced with specific components.</p>
              </div>
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
              <div class="rounded-xl bg-black/[0.03] px-5 py-4 space-y-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Structure</p>
                <p class="text-sm text-[var(--color-muted)]">Modular card with multiple display variants</p>
              </div>
              <div class="rounded-xl bg-black/[0.03] px-5 py-4 space-y-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Workflow</p>
                <p class="text-sm text-[var(--color-muted)]">Simplified handoff between designers and developers</p>
              </div>
              <div class="rounded-xl bg-black/[0.03] px-5 py-4 space-y-1">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Consistency</p>
                <p class="text-sm text-[var(--color-muted)]">Increased across browser and search projects</p>
              </div>
            </div>
            <figure class="pt-2 space-y-4">
              <div>
                <div class="w-full rounded-xl border-2 border-[#275243] bg-black/[0.03] aspect-video flex items-center justify-center">
                  <p class="text-sm text-[var(--color-muted)] opacity-50">Image coming soon</p>
                </div>
                <figcaption class="mt-2 text-xs text-center text-[var(--color-muted)]">Card component contribution</figcaption>
              </div>
              <div>
                <div class="w-full rounded-xl border-2 border-[#275243] bg-black/[0.03] aspect-video flex items-center justify-center">
                  <p class="text-sm text-[var(--color-muted)] opacity-50">Image coming soon</p>
                </div>
                <figcaption class="mt-2 text-xs text-center text-[var(--color-muted)]">Card component options in use</figcaption>
              </div>
            </figure>
          </CaseStudySection>

          <!-- Results -->
          <CaseStudySection id="results" label="Results">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-headline)]">A stronger, more resilient design system</h2>
            <p class="text-[var(--color-muted)] leading-relaxed">
              The shift to shared ownership transformed Flora. Designers gained confidence as contributors and used shared documentation and the checklist to maintain consistency. With clearer structure and healthier habits, Flora became easier to maintain, scale, and evolve across teams.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <div class="flex-1 rounded-xl bg-black/[0.03] px-5 py-4 space-y-4">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Results</p>
                <div class="space-y-3 divide-y divide-black/[0.06]">
                  <div class="pt-3 first:pt-0">
                    <p class="font-semibold text-[var(--color-headline)] text-sm">Confident, independent contributors</p>
                    <p class="text-sm text-[var(--color-muted)] mt-1">Designers became comfortable contributing without needing a dedicated DS lead.</p>
                  </div>
                  <div class="pt-3">
                    <p class="font-semibold text-[var(--color-headline)] text-sm">DS health scores improved quarter over quarter</p>
                    <p class="text-sm text-[var(--color-muted)] mt-1">Tracked monthly, health scores across all libraries improved consistently throughout 2025.</p>
                  </div>
                  <div class="pt-3">
                    <p class="font-semibold text-[var(--color-headline)] text-sm">Stronger decision-making</p>
                    <p class="text-sm text-[var(--color-muted)] mt-1">Clear prioritization and tracking gave the team a shared framework for making calls.</p>
                  </div>
                  <div class="pt-3">
                    <p class="font-semibold text-[var(--color-headline)] text-sm">Higher contribution quality</p>
                    <p class="text-sm text-[var(--color-muted)] mt-1">Shared standards and reviews raised the bar across all contributions.</p>
                  </div>
                </div>
              </div>
              <div class="flex-1 rounded-xl bg-black/[0.03] px-5 py-4 space-y-4">
                <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Learnings</p>
                <div class="space-y-3 divide-y divide-black/[0.06]">
                  <div class="pt-3 first:pt-0">
                    <p class="font-semibold text-[var(--color-headline)] text-sm">Shared ownership builds stronger culture than centralization</p>
                    <p class="text-sm text-[var(--color-muted)] mt-1">Distributed responsibility improved org-wide resilience without sacrificing quality.</p>
                  </div>
                  <div class="pt-3">
                    <p class="font-semibold text-[var(--color-headline)] text-sm">Clear documentation reduces friction and dependency</p>
                    <p class="text-sm text-[var(--color-muted)] mt-1">Writing things down meant no knowledge was locked in one person's head.</p>
                  </div>
                  <div class="pt-3">
                    <p class="font-semibold text-[var(--color-headline)] text-sm">Lightweight governance keeps consistency without slowing teams</p>
                    <p class="text-sm text-[var(--color-muted)] mt-1">Just enough process was the right call; heavy governance would have created more drag than value.</p>
                  </div>
                  <div class="pt-3">
                    <p class="font-semibold text-[var(--color-headline)] text-sm">Transparency improves collective responsibility</p>
                    <p class="text-sm text-[var(--color-muted)] mt-1">Regular updates and visible progress made the whole team feel accountable and motivated.</p>
                  </div>
                </div>
              </div>
            </div>
          </CaseStudySection>

        </div><!-- /content -->

        <!-- Balances the left nav so content stays centered -->
        <div class="hidden lg:block w-52 shrink-0"></div>

      </div><!-- /sidebar + content -->
    </div><!-- /whiteboard panel -->
  </section>
</template>
