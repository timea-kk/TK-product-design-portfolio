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
        <div class="mx-auto w-full max-w-6xl px-6 pt-32 pb-16 flex flex-col-reverse items-center gap-10 lg:flex-row lg:items-center lg:gap-12 lg:px-16 xl:px-8 lg:py-32">
          <!-- Left: text -->
          <div class="flex-1 w-full lg:w-auto">
            <!-- "Hi, I'm" + logo mark (aria-hidden since the logo is decorative here) -->
            <div class="flex flex-wrap items-center gap-2">
              <p class="text-lg font-semibold text-[var(--color-muted)] md:text-xl">Hi, I'm</p>
              <Logo class="h-7 w-auto md:h-8" />
              <span class="sr-only">Timea</span>
            </div>

            <h1
              id="hero-heading"
              class="font-heading mt-2 text-4xl font-bold leading-tight tracking-tight text-[var(--color-headline)] lg:text-5xl"
            >
              <span class="block">I'm a</span>
              <span class="block"><RotatingDescriptor /></span>
              <span class="block">who creates with clarity and purpose.</span>
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
          <div class="relative shrink-0 w-56 lg:w-72" style="aspect-ratio: 747 / 948">
            <img
              src="/timea.png"
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

      </section>

    </main>

    <!-- Footer: copyright and external links -->
    <footer class="border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 pt-6 pb-24">
      <div class="mx-auto flex max-w-6xl justify-between text-sm text-[var(--color-muted)]">
        <span>© Timea Konya</span>
        <div class="flex gap-4">
          <a href="https://www.linkedin.com/in/timea-konya-a3543284/" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--color-brand)]">LinkedIn</a>
          <a href="https://drive.google.com/file/d/1aeNwj4QkRwouV0SgZ-m-c1h9_PUWALsb/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--color-brand)]">Resume</a>
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
