<!--
  FloraDesignSystemPage.vue – Case study: Scaling Design Operations at Ecosia.
  Layout: sticky left nav (scroll spy) + white section cards on the dotted whiteboard.
  Images are placeholder slots, to be added later.
-->

<script setup lang="ts">
import CaseStudyLayout from '@/components/CaseStudyLayout.vue'
import CaseStudySection from '@/components/CaseStudySection.vue'
import StickyNote from '@/components/StickyNote.vue'
import CardCallout from '@/components/CardCallout.vue'
import CardTimeline from '@/components/CardTimeline.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import TagPill from '@/components/TagPill.vue'
import CardProject from '@/components/CardProject.vue'
import FooterSection from '@/components/FooterSection.vue'

const NAV_SECTIONS = [
  { id: 'overview',     label: 'Overview' },
  { id: 'context',      label: 'Context' },
  { id: 'problem',      label: 'The Problem' },
  { id: 'process',      label: 'My Approach' },
  { id: 'establishing-ownership', label: 'Ownership' },
  { id: 'contribution-model',    label: 'Contribution' },
  { id: 'ds-health',             label: 'DS Health' },
  { id: 'evolving-system',       label: 'Evolution' },
  { id: 'contribution', label: 'Highlight' },
  { id: 'results',      label: 'Results' },
]
</script>

<template>
  <CaseStudyLayout :nav-sections="NAV_SECTIONS">

          <!-- Overview -->
          <CaseStudySection id="overview" label="Overview" class="mt-20 lg:mt-8">

            <div class="space-y-4">
              <h1
                id="project-heading"
                class="font-heading text-3xl sm:text-4xl font-black leading-tight tracking-tight text-[var(--color-text-primary)] lg:text-6xl"
              >
                Scaling Design Operations at Ecosia
              </h1>
              <div class="flex flex-wrap gap-2">
                <TagPill
                  v-for="tag in ['Design System', 'Documentation', 'Design Operations', 'Workflows &amp; Processes']"
                  :key="tag"
                  :label="tag"
                />
              </div>
              <div class="flex flex-wrap gap-6 sm:gap-12 pt-2">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">Timeline</p>
                  <p class="mt-1 text-[var(--color-text-secondary)]">2025 – ongoing</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">My role</p>
                  <p class="mt-1 text-[var(--color-text-secondary)]">Product Designer</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">Collaborated with</p>
                  <p class="mt-1 text-[var(--color-text-secondary)]">Product Designers, Engineers</p>
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
                I led the transition of Ecosia's Flora Design System from single-lead ownership to a <strong>shared ownership model</strong> across six product designers. I introduced contribution workflows, health tracking, governance processes, and documentation that kept Flora self-sustaining throughout 2025. Within six months, designers were contributing independently and component knowledge was spread across at least three people per component.
              </p>
            </div>

            <figure>
              <img loading="lazy" src="/project-pages/flora-design-system/flora-design-system-1.webp" alt="Flora Design System structure" class="w-full rounded-xl border-2 border-[var(--color-deep-maroon-700)]" />
              <figcaption>Flora Design System structure</figcaption>
            </figure>
          </CaseStudySection>

          <!-- Context -->
          <CaseStudySection id="context" label="Context">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">From one owner to six</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              At the start of 2025, Ecosia's Design System, Flora, lost its dedicated team and lead. Responsibility shifted to the six product designers across our product areas, each of us balancing DS work alongside our own roadmaps.
            </p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Without a single owner, we needed a new way to keep Flora moving. <strong>I stepped in to structure and coordinate the transition to a shared ownership model.</strong>
            </p>
            <figure class="pt-2">
              <img loading="lazy" src="/project-pages/flora-design-system/flora-design-system-2.webp" alt="DS Ownership transition: old vs. new" class="w-full rounded-xl border-2 border-[var(--color-deep-maroon-700)]" />
              <figcaption>DS Ownership transition: old vs. new</figcaption>
            </figure>
          </CaseStudySection>

          <!-- The Problem -->
          <CaseStudySection id="problem" label="The Problem">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Ownership became everyone's problem</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Our Design System lead had been the single source of truth for how to contribute, build, and maintain components, and most designers relied on working directly with him. He also mentored and guided us in times of uncertainty, so navigating through DS work on our own seemed scary at first.
            </p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Without this structure, we suddenly had <strong>no clear process or ownership to fall back on.</strong> Each designer approached contributions differently and used different accessibility plugins, naming conventions, and review steps. Knowledge about best practices was scattered, and quality varied from one library to another.
            </p>
            <!-- Mobile: bullet list -->
            <ul class="sm:hidden space-y-2 pt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed list-none">
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span><strong class="text-[var(--color-text-primary)]">How might we</strong> create a shared process for contributing to Flora?</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span><strong class="text-[var(--color-text-primary)]">How might we</strong> align six designers on the same standards and tools?</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span><strong class="text-[var(--color-text-primary)]">How might we</strong> turn scattered knowledge into something shared?</span></li>
            </ul>
            <!-- Desktop: sticky notes -->
            <div class="hidden sm:block pt-5">
              <div class="flex gap-3">
                <StickyNote :rotate="-1" class="flex-1">
                  <span class="text-sm font-bold rounded-md px-2 py-0.5 sm:text-base" style="background: var(--color-surface-sticky-label);">How might we</span>
                  create a shared process for contributing to Flora?
                </StickyNote>
                <StickyNote :rotate="1" class="flex-1">
                  <span class="text-sm font-bold rounded-md px-2 py-0.5 sm:text-base" style="background: var(--color-surface-sticky-label);">How might we</span>
                  align six designers on the same standards and tools?
                </StickyNote>
                <StickyNote :rotate="-0.5" class="flex-1">
                  <span class="text-sm font-bold rounded-md px-2 py-0.5 sm:text-base" style="background: var(--color-surface-sticky-label);">How might we</span>
                  turn scattered knowledge into something shared?
                </StickyNote>
              </div>
            </div>
            <CardCallout label="Shared goal">
              <p class="text-[var(--color-text-secondary)] leading-relaxed">Keep <strong>Flora running as a shared system</strong> where every designer can contribute confidently, review each other's work, and maintain consistent quality. Clear documentation, defined ownership, and shared standards across all libraries would make that possible.</p>
            </CardCallout>
          </CaseStudySection>

          <!-- My Approach -->
          <CaseStudySection id="process" label="My Approach">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Systematic by design</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              When defining our new ways of working, I covered how we would collaborate, document, and measure success. At the same time, I made sure that everyone felt equipped to contribute, even without a dedicated Design System team.
            </p>
            <CardTimeline
              :steps="[
                { label: 'Establish structure', description: 'I set up the <strong>Flora Jira board, workflows, and review process</strong> so we could track, prioritize, and assign DS tasks clearly.' },
                { label: 'Document everything', description: 'I wrote and organized guidelines in Confluence, including <strong>ownership rules, contribution checklists</strong>, and detailed guides for naming, accessibility, and component decisions.' },
                { label: 'Create visibility', description: 'I built a <strong>Design System health dashboard</strong> in Google Sheets to track quality across all libraries and visualize monthly progress.' },
                { label: 'Support collaboration', description: 'I facilitated <strong>retrospectives, shared monthly updates, and clarified ownership</strong> by mapping who was most experienced with specific components.' },
              ]"
              class="pt-2"
            />
            <figure>
              <img
                src="/project-pages/flora-design-system/flora-design-system-3.webp"
                alt="Detailed new process without a DS Lead"
                class="w-full rounded-xl"
              />
              <figcaption>Detailed new process without a DS Lead</figcaption>
            </figure>
          </CaseStudySection>

          <!-- Establishing ownership -->
          <CaseStudySection id="establishing-ownership" label="Ownership">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Every designer knew their role</h2>
            <div class="space-y-4">
              <p class="text-[var(--color-text-secondary)] leading-relaxed">
                To replace the missing single point of contact, I <strong>clarified responsibilities</strong> across the design team. Each designer took ownership of specific component areas, and we discussed the intricacies of reviews and how we would handle bigger contributions.
              </p>
              <p class="text-[var(--color-text-secondary)] leading-relaxed">
                I also set up a bi-weekly <strong>Design System planning meeting</strong> where we could align priorities, review contributions, and keep Flora's work transparent across teams.
              </p>
            </div>
            <CardCallout label="Outcomes">
              <p class="text-[var(--color-text-secondary)] leading-relaxed">With ownership mapped and recurring planning sessions in place:</p>
              <div class="grid grid-cols-2 sm:flex gap-x-3 gap-y-6 sm:gap-3 pt-3">
                <StickyNote :rotate="-1" small class="sm:flex-1">
                  <span class="font-bold rounded-md px-2 py-0.5" style="background: var(--color-surface-sticky-label);">✅</span>
                  <span>Designers knew exactly <strong>what to work on</strong></span>
                </StickyNote>
                <StickyNote :rotate="1" small class="sm:flex-1">
                  <span class="font-bold rounded-md px-2 py-0.5" style="background: var(--color-surface-sticky-label);">✅</span>
                  <span>Everyone was aligned on what our <strong>priorities</strong> were</span>
                </StickyNote>
                <StickyNote :rotate="-0.5" small class="sm:flex-1">
                  <span class="font-bold rounded-md px-2 py-0.5" style="background: var(--color-surface-sticky-label);">✅</span>
                  <span>Always clear who to reach out to for <strong>reviews</strong></span>
                </StickyNote>
                <StickyNote :rotate="0.75" small class="sm:flex-1">
                  <span class="font-bold rounded-md px-2 py-0.5" style="background: var(--color-surface-sticky-label);">✅</span>
                  <span>Nothing needing <strong>collective attention</strong> fell through</span>
                </StickyNote>
              </div>
            </CardCallout>
            <figure>
              <figcaption>DS Ownership discussion &amp; Jira board setup</figcaption>
              <ImageCarousel
                :images="[
                  '/project-pages/flora-design-system/flora-design-system-4.webp',
                  '/project-pages/flora-design-system/flora-design-system-5.webp',
                  '/project-pages/flora-design-system/flora-design-system-6.webp',
                ]"
                :alts="['Flora Design System screenshot 4', 'Flora Design System screenshot 5', 'Flora Design System screenshot 6']"
              />
            </figure>
          </CaseStudySection>

          <!-- Contribution model -->
          <CaseStudySection id="contribution-model" label="Contribution">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Consistent, higher-quality contributions</h2>
            <div class="space-y-4">
              <p class="text-[var(--color-text-secondary)] leading-relaxed">
                Designers were contributing components in <strong>inconsistent ways</strong> and using different plugins to follow <strong>scattered rules</strong>. I created a detailed <strong>contribution checklist</strong> that broke down every step, including naming conventions, accessibility considerations, variable usage, and much more.
              </p>
              <p class="text-[var(--color-text-secondary)] leading-relaxed">
                It became the <strong>shared playbook for contributions</strong> and helped everyone work with the same standards, while also making reviews quicker and more efficient.
              </p>
            </div>
            <CardCallout
              label="Outcomes"
              :items="[
                { title: 'Faster reviews', description: 'Gaps were caught before submissions reached review, reducing back-and-forth.' },
                { title: 'Consistent quality', description: 'Shared standards meant contributions were held to the same bar regardless of who built them.' },
                { title: 'A shared definition of done', description: 'Contributors knew exactly what to check before submitting, which reduced ambiguity across the team.' },
              ]"
            />
            <figure>
              <figcaption>Flora Contribution checklist snapshot</figcaption>
              <ImageCarousel
                :images="[
                  '/project-pages/flora-design-system/flora-design-system-7.webp',
                  '/project-pages/flora-design-system/flora-design-system-8.webp',
                  '/project-pages/flora-design-system/flora-design-system-9.webp',
                ]"
                :alts="['Flora contribution checklist screenshot 1', 'Flora contribution checklist screenshot 2', 'Flora contribution checklist screenshot 3']"
              />
            </figure>
          </CaseStudySection>

          <!-- DS health -->
          <CaseStudySection id="ds-health" label="DS Health">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Progress tied to real numbers</h2>
            <div class="space-y-4">
              <p class="text-[var(--color-text-secondary)] leading-relaxed">
                I built a <strong>Google Sheets dashboard</strong> that tracked the <strong>health status</strong> of all our global and domain-specific libraries. Each library had its own sheet with criteria for what made a component <strong>"healthy,"</strong> aligned with the contribution checklist.
              </p>
              <p class="text-[var(--color-text-secondary)] leading-relaxed">
                The tracker measured progress <strong>month by month</strong> and linked directly to <strong>OKRs</strong>, so we could quantify improvements and keep ourselves accountable.
              </p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <CardCallout value="+44%" label="Overall health" description="Jun '24 to Nov '25" />
              <CardCallout value="+20%" label="Flora Figma Global" description="Jun '24 to Nov '25" />
              <CardCallout value="+97%" label="Figma Touchpoints" description="Jun '24 to Nov '25" />
            </div>
            <figure>
              <figcaption>Flora Health Check spreadsheet</figcaption>
              <ImageCarousel
                :images="[
                  '/project-pages/flora-design-system/flora-design-system-10.webp',
                  '/project-pages/flora-design-system/flora-design-system-11.webp',
                ]"
                :alts="['Flora health tracker overview', 'Flora health tracker monthly breakdown']"
              />
            </figure>
          </CaseStudySection>

          <!-- Evolving the system -->
          <CaseStudySection id="evolving-system" label="Evolution">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Practices that compounded over time</h2>
            <div class="space-y-4">
              <p class="text-[var(--color-text-secondary)] leading-relaxed">
                I documented every new process in <strong>Confluence</strong>: how to contribute, how to use the health tracker, and even how to write documentation itself. I also shared <strong>regular updates in Slack</strong> to keep the org informed, clarify expectations, and make our progress visible. This made our roles clear to everyone and ensured <strong>no knowledge lived in just one person's head</strong> again.
              </p>
              <p class="text-[var(--color-text-secondary)] leading-relaxed">
                <strong>Design System retros</strong> became regular rituals so we could continuously improve these new practices. We uncovered ways of working with engineers, planned how to handle bigger contributions, and identified topics to learn about as a group: <strong>accessibility, AI tools, color system builds,</strong> and more.
              </p>
            </div>
            <CardCallout
              label="Outcomes"
              :items="[
                { title: 'No single point of failure', description: 'Every process was documented so knowledge was never tied to one person.' },
                { title: 'Org-wide transparency', description: 'Regular Slack updates kept the wider team aligned on Flora\'s direction and progress.' },
                { title: 'A culture of continuous improvement', description: 'Retros surfaced friction early and turned it into shared decisions rather than individual workarounds.' },
              ]"
            />
            <figure>
              <figcaption>New processes in Confluence</figcaption>
              <ImageCarousel
                :images="[
                  '/project-pages/flora-design-system/flora-design-system-12.webp',
                  '/project-pages/flora-design-system/flora-design-system-13.webp',
                ]"
                :alts="['Flora evolution process documentation', 'Flora evolution Confluence overview']"
              />
            </figure>
          </CaseStudySection>

          <!-- Card Component -->
          <CaseStudySection id="contribution" label="Highlight">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Standardized cards across every product</h2>
            <div class="space-y-4">
              <p class="text-[var(--color-text-secondary)] leading-relaxed">
                As our group evolved, we contributed bigger and more complex components to Flora. At the time, there was <strong>no unified way to build content cards</strong>, and each designer had to create them from scratch, which slowed us down and led to <strong>visual inconsistencies</strong>.
              </p>
              <p class="text-[var(--color-text-secondary)] leading-relaxed">
                I designed a <strong>flexible card component</strong> with adjustable padding, border, and surface options so it could be reused across different contexts while keeping layouts consistent. This standardized one of our <strong>most frequently used elements</strong>, improved alignment between design and development, and reduced design time for future product pages.
              </p>
            </div>
            <CardCallout
              label="Outcomes"
              :items="[
                { title: 'One source of truth for cards', description: 'Designers stopped building from scratch and adapted a single, documented component across all product surfaces.' },
                { title: 'Faster design-to-dev handoff', description: 'Shared language and defined variants reduced back-and-forth between design and engineering.' },
                { title: 'Fewer visual inconsistencies', description: 'Card layouts became predictable and aligned across browser and search projects.' },
              ]"
            />
            <div class="pt-2 space-y-4">
              <figure>
                <img
                  src="/project-pages/flora-design-system/flora-design-system-14.webp"
                  alt="Card component contribution in Flora"
                  class="w-full rounded-xl"
                />
                <figcaption>Card component contribution</figcaption>
              </figure>
              <figure>
                <video
                  src="/project-pages/flora-design-system/Default card.mp4"
                  controls
                  preload="none"
                  muted
                  playsinline
                  class="w-full rounded-xl"
                ></video>
                <figcaption>Card component options in use</figcaption>
              </figure>
            </div>
          </CaseStudySection>

          <!-- Results -->
          <CaseStudySection id="results" label="Results">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">A stronger, more resilient design system</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              The shift to shared ownership transformed Flora. Designers gained confidence as contributors and used shared documentation and the checklist to maintain consistency. With clearer structure and healthier habits, Flora became easier to maintain, scale, and evolve across teams.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <CardCallout value="+44%" label="Overall health" description="Jun '24 to Nov '25" />
              <CardCallout value="+20%" label="Flora Figma Global" description="Jun '24 to Nov '25" />
              <CardCallout value="+97%" label="Figma Touchpoints" description="Jun '24 to Nov '25" />
            </div>
            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <CardCallout
                label="What I learned"
                class="flex-1"
                :items="[
                  { title: 'Documentation reduces friction', description: 'Writing things down ensured no knowledge was locked in one person\'s head, which made the system far more resilient.' },
                  { title: 'Lightweight governance works', description: 'Just enough process was the right call. Heavy governance would have created more drag than value for a small team.' },
                  { title: 'Transparency drives accountability', description: 'Regular updates and visible health scores made the whole team feel invested in the outcome.' }
                ]"
              />
              <CardCallout
                label="What I'd do differently"
                class="flex-1"
                :items="[
                  { title: 'Establish contribution guidelines earlier', description: 'The checklist and review process came mid-project. Setting those expectations from the start would have improved consistency in the early contributions.' },
                  { title: 'Quantify impact sooner', description: 'Health tracking started later than it should have. Earlier baselines would have made the story clearer and easier to communicate to stakeholders.' },
                  { title: 'Involve more voices in token decisions', description: 'Token naming and structure decisions were made quickly. More input from engineers and other designers early on would have reduced rework later.' }
                ]"
              />
            </div>
          </CaseStudySection>

          <!-- See also -->
          <div class="flex flex-col gap-6">
            <h2 class="section-heading">See also</h2>
            <CardProject
              title="Install Funnel for the Ecosia Browser"
              description="Launched Ecosia's browser in just two months, reaching 100k DAU."
              image="/main-page/browser.webp"
              image-alt="Ecosia Browser landing page"
              video="/main-page/browser.mp4"
              to="/work/ecosia-browser"
              :text-min-height="320"
              wide-breakpoint
              no-hover
            />
          </div>
          <FooterSection />
  </CaseStudyLayout>
</template>
