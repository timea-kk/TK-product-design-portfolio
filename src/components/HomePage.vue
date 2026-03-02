<!--
  HomePage.vue – Main landing page.
  Renders the hero section (greeting, logo, typewriter headline, bio), a featured projects
  grid, a footer, and the sticky chat widget. Uses theme CSS variables for all colours so
  every theme looks consistent without any JavaScript.
-->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Header from '@/components/Header.vue'
import Logo from '@/components/Logo.vue'
import RotatingDescriptor from '@/components/RotatingDescriptor.vue'
import TimeaAgent from '@/components/TimeaAgent.vue'

const hasScrolled = ref(false)
function onScroll() { hasScrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

/** Placeholder project data until real case studies and routes exist. */
const PLACEHOLDER_PROJECTS = [
  {
    title: "Building Ecosia's Onboarding Experience",
    tagline: 'A smooth first-time experience that boosted conversion by 25%.',
    slug: 'ecosia-onboarding',
  },
  {
    title: 'Scaling Design Operations at Ecosia',
    tagline: "Establishing a shared ownership model for Ecosia's Design System – Flora.",
    slug: 'ecosia-ops',
  },
  {
    title: 'Install Funnel for the Ecosia Browser',
    tagline: "Launched Ecosia's browser in just two months, reaching 100k DAU.",
    slug: 'ecosia-browser',
  },
]
</script>

<template>
  <div class="min-h-screen bg-[var(--color-surface)]">
    <Header />

    <main>
      <!-- Hero: greeting row, typewriter headline, and bio paragraph -->
      <section
        class="relative flex min-h-screen items-center"
        aria-labelledby="hero-heading"
      >
        <div class="mx-auto w-full max-w-6xl px-4 py-24 flex flex-col-reverse items-center gap-10 md:flex-row md:items-center md:gap-16 -translate-y-10">
          <!-- Left: text -->
          <div class="flex-1">
            <!-- "Hi, I'm" + logo mark (aria-hidden since the logo is decorative here) -->
            <div class="flex flex-wrap items-center gap-2">
              <p class="text-lg font-semibold text-[var(--color-muted)] md:text-xl">Hi, I'm</p>
              <Logo class="h-7 w-auto md:h-8" />
              <span class="sr-only">Timea</span>
            </div>

            <h1
              id="hero-heading"
              class="font-heading mt-2 text-4xl font-bold leading-tight tracking-tight text-[var(--color-headline)] md:text-5xl"
            >
              I'm a <RotatingDescriptor /> who creates with clarity and purpose.
            </h1>

            <p class="mt-6 text-lg text-[var(--color-muted)]">
              People describe me as
              <strong class="font-semibold text-[var(--color-brand)]"
                >thoughtful, analytical, and structured</strong
              >. I enjoy connecting dots others miss and bringing clarity to ambiguity through deep
              thinking and systematic problem solving. I care about making design inclusive and
              accessible, and about using it for something genuinely good.
            </p>
          </div>

          <!--
            Right: portrait with outline frame overlaid.
            Container matches the full SVG canvas (747×948 aspect ratio).
            Photo is inset by the 31-unit frame margin so it sits inside the frame rect.
            SVG fills the container exactly — frame rect aligns with photo edges.
          -->
          <div class="relative shrink-0 w-56 md:w-72" style="aspect-ratio: 747 / 948">
            <img
              src="/timea.jpg"
              alt="Timea Konya"
              class="absolute object-cover"
              :style="{
                left: 'calc(100% * 31 / 747)',
                top: 'calc(100% * 31 / 948)',
                width: 'calc(100% * 685 / 747)',
                height: 'calc(100% * 886 / 948)',
              }"
            />
            <!-- Inlined so stroke/fill can use theme CSS variables instead of hardcoded purple -->
            <svg
              viewBox="0 0 747 948"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              class="absolute inset-0 h-full w-full"
            >
              <rect x="31" y="31" width="685" height="886" stroke="var(--color-brand)" stroke-width="10"/>
              <rect x="692" y="893" width="50" height="50" fill="white" stroke="var(--color-brand)" stroke-width="10"/>
              <rect x="5"   y="893" width="50" height="50" fill="white" stroke="var(--color-brand)" stroke-width="10"/>
              <rect x="692" y="5"   width="50" height="50" fill="white" stroke="var(--color-brand)" stroke-width="10"/>
              <rect x="5"   y="5"   width="50" height="50" fill="white" stroke="var(--color-brand)" stroke-width="10"/>
            </svg>
          </div>
        </div>

        <!-- Scroll indicator: fades out once the user starts scrolling -->
        <a
          href="#projects"
          :class="[
            'absolute bottom-24 left-1/2 -translate-x-1/2 transition-opacity duration-500',
            hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
          ]"
          aria-label="Scroll to projects"
        >
          <svg
            width="22"
            height="36"
            viewBox="0 0 22 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="text-[var(--color-muted)]"
            aria-hidden="true"
          >
            <rect x="1" y="1" width="20" height="34" rx="10" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="11" cy="9" r="2.5" fill="currentColor" class="scroll-dot"/>
          </svg>
        </a>
      </section>

      <!-- Featured projects grid -->
      <section
        id="projects"
        class="mx-auto max-w-6xl px-4 py-12"
        aria-labelledby="projects-heading"
      >
        <h2
          id="projects-heading"
          class="font-heading text-2xl font-bold text-[var(--color-brand)]"
        >
          Recent Projects
        </h2>
        <p class="mt-2 text-[var(--color-muted)]">
          Here are some examples of how I work with cross-functional teams, and how I blend
          research, evaluation and execution.
        </p>

        <ul class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="p in PLACEHOLDER_PROJECTS" :key="p.slug">
            <article
              class="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] transition-[var(--a11y-motion)] hover:shadow-md"
            >
              <!-- Placeholder image — replace with real image when case study pages exist -->
              <div class="h-40 w-full bg-[var(--color-border)]" aria-hidden="true" />
              <div class="p-4">
                <h3 class="font-heading font-semibold text-[var(--color-brand)]">{{ p.title }}</h3>
                <p class="mt-1 text-sm text-[var(--color-muted)]">{{ p.tagline }}</p>
                <span class="mt-3 inline-block text-sm font-medium text-[var(--color-brand)]">
                  Read case study →
                </span>
              </div>
            </article>
          </li>
        </ul>
      </section>
    </main>

    <!-- Footer: copyright and external links -->
    <footer class="border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 pt-6 pb-24">
      <div class="mx-auto flex max-w-6xl justify-between text-sm text-[var(--color-muted)]">
        <span>© Timea Konya</span>
        <div class="flex gap-4">
          <a href="#" class="hover:text-[var(--color-brand)]">LinkedIn</a>
          <a href="#" class="hover:text-[var(--color-brand)]">Download CV</a>
        </div>
      </div>
    </footer>

    <!-- Sticky chat bar: visitors can ask about Timea's experience -->
    <TimeaAgent />
  </div>
</template>

<style scoped>
.scroll-dot {
  transform-box: fill-box;
  transform-origin: center top;
  animation: scroll-wheel 2s ease-in-out infinite;
}

@keyframes scroll-wheel {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(14px); }
  100% { transform: translateY(0); }
}
</style>
