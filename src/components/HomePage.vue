<!--
  HomePage.vue – Main landing page.
  Renders the hero section (greeting, logo, typewriter headline, bio), a featured projects
  grid, a footer, and the sticky chat widget. Uses theme CSS variables for all colours so
  every theme looks consistent without any JavaScript.
-->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Header from '@/components/Header.vue'
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
        class="relative h-screen p-[40px]"
        aria-labelledby="hero-heading"
      >
        <!-- Whiteboard panel: fills the viewport minus 80px on all sides -->
        <div
          class="w-full h-full rounded-3xl flex items-start overflow-y-auto px-10 lg:px-20"
          style="
            background-color: #f7f6f2;
            background-image: radial-gradient(circle, rgba(0,0,0,0.13) 1.2px, transparent 1.2px);
            background-size: 22px 22px;
            border: 1px solid rgba(0,0,0,0.06);
          "
        >
          <div class="w-full flex flex-col gap-8 pt-16 mt-20">
          <div class="flex flex-col-reverse items-center justify-center gap-10 lg:flex-row lg:items-center lg:gap-[102px]">
          <!-- Left: headline -->
          <div class="flex-1 w-full lg:w-auto lg:max-w-[720px] min-w-0">
            <h1
              id="hero-heading"
              class="font-heading mt-2 text-5xl font-black leading-tight tracking-tight text-[var(--color-headline)] lg:text-7xl"
            >
              <span class="block">I'm a</span>
              <span class="block"><RotatingDescriptor /></span>
              <span class="block">who creates with clarity and purpose.</span>
            </h1>
          </div>

          <!-- OPTION A — STICKY NOTE (active) -->
          <div class="relative shrink-0 w-64 lg:w-80" style="aspect-ratio: 1 / 1; transform: rotate(2deg)">
            <div class="absolute z-10" style="width: 5.5rem; height: 2.1rem; top: -1rem; left: 50%; transform: translateX(-50%) rotate(-3deg); background: rgba(210, 228, 255, 0.68); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 2px rgba(0, 0, 0, 0.10);"></div>
            <div class="absolute inset-0 flex flex-col" style="background: #f2c96c; box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.08), 4px 10px 20px rgba(0, 0, 0, 0.18), 8px 24px 48px rgba(0, 0, 0, 0.12);">
              <div class="relative flex-1 overflow-hidden mx-9 mt-9 mb-9">
                <img src="/timea.png" alt="Timea Konya" class="w-full h-full object-cover object-top" />
                <div class="absolute inset-0 border-4 border-white pointer-events-none"></div>
              </div>
            </div>
            <!-- Pointer: X and Y on separate elements with coprime durations (7s/5s) -->
            <!-- so the combined path is a curved Lissajous that doesn't repeat for 35s -->
            <div class="absolute pointer-events-none pointer-float-x" style="width: 7rem; bottom: calc(-2rem + 5px); right: calc(1rem - 30px);">
              <img src="/pointer.svg" alt="" aria-hidden="true" class="pointer-float-y w-full" />
            </div>
          </div>
          </div>

          <!-- Description: sits below the headline + image row -->
          <p class="mt-20 text-lg text-[var(--color-muted)] max-w-2xl mx-auto text-center">
            People describe me as
            <strong class="font-semibold text-[var(--color-brand)]"
              >thoughtful, analytical, and structured</strong
            > – someone who cuts through ambiguity and connects dots others miss. I care about making design inclusive, accessible, and used for something genuinely good.
          </p>


          </div>

          <!-- =====================================================================
            OPTION B — POLAROID (parked, may revisit)
            Square polaroid frame, white border thicker at bottom, tape on top.
            To restore: uncomment the block below and remove the sticky note block.
          ======================================================================
          <div class="relative shrink-0 w-64 lg:w-80" style="aspect-ratio: 1 / 1; transform: rotate(-2deg)">
            <div class="absolute z-10" style="width: 5.5rem; height: 2.1rem; top: -1rem; left: 50%; transform: translateX(-50%) rotate(3deg); background: rgba(210, 228, 255, 0.68); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 2px rgba(0, 0, 0, 0.10);"></div>
            <div class="absolute inset-0 flex flex-col" style="background: #ffffff; padding: 0.6rem 0.6rem 2rem 0.6rem; box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.08), 4px 10px 20px rgba(0, 0, 0, 0.18), 8px 24px 48px rgba(0, 0, 0, 0.12);">
              <div class="flex-1 overflow-hidden">
                <img src="/timea.png" alt="Timea Konya" class="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>
          ===================================================================== -->
        </div>

      </section>

    </main>


    <!-- Sticky chat bar: visitors can ask about Timea's experience -->
    <TimeaAgent />
  </div>
</template>

<style scoped>
/*
  Natural float via Lissajous with coprime periods: X=7s, Y=5s.
  The path doesn't repeat for 35s, and ease-in-out on each axis keeps transitions curved.
*/
.pointer-float-x {
  animation: pointer-float-x 7s ease-in-out infinite;
}
.pointer-float-y {
  animation: pointer-float-y 5s ease-in-out infinite;
}

@keyframes pointer-float-x {
  0%   { transform: translateX(0px); }
  50%  { transform: translateX(16px); }
  100% { transform: translateX(0px); }
}

@keyframes pointer-float-y {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(12px); }
  100% { transform: translateY(0px); }
}

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
