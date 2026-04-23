<!--
  HomePage.vue – Main landing page content.
  Renders the hero section: greeting row, typewriter headline, bio paragraph.
  The outer shell (background, header, chat widget) is provided by AppLayout.vue.
-->

<script setup lang="ts">
import RotatingDescriptor from '@/components/RotatingDescriptor.vue'
import CardProject from '@/components/CardProject.vue'

const PROJECTS = [
  {
    title: "Building Ecosia's Onboarding Experience",
    image: '/project-pages/ecosia-onboarding/ecosia-onboarding-1.png',
    imageAlt: 'Ecosia onboarding screen',
    to: '/work/ecosia-onboarding',
    tags: ['Generative Research', 'Ideation Workshop', 'A/B Testing', 'Strategy'],
  },
  {
    title: 'Install Funnel for the Ecosia Browser',
    image: '/project-pages/ecosia-browser/ecosia-browser-1.png',
    imageAlt: 'Ecosia Browser landing page',
    to: '/work/ecosia-browser',
    tags: ['Evaluative Research', 'Stakeholder Management', 'Prototyping', 'Design System'],
  },
  {
    title: 'Scaling Design Operations at Ecosia',
    image: '/project-pages/flora-design-system/flora-design-system-1.png',
    imageAlt: 'Flora Design System structure',
    to: '/work/flora-design-system',
    tags: ['Design System', 'Documentation', 'Design Operations', 'Workflows & Processes'],
  },
  {
    title: 'Lolsumo: a coaching app for League of Legends',
    image: '/project-pages/lolsumo/lolsumo-1.png',
    imageAlt: 'Lolsumo Android and iOS apps',
    to: '/work/lolsumo',
    tags: ['Community Engagement', 'Design System', 'User Testing'],
  },
]
</script>

<template>
  <!-- Hero: greeting row, typewriter headline, and bio paragraph -->
  <section
    class="relative h-screen p-[40px]"
    aria-labelledby="hero-heading"
  >
    <!-- Whiteboard panel: fills the viewport minus 80px on all sides -->
    <div
      class="w-full h-full rounded-3xl overflow-y-auto px-10 lg:px-20"
      style="
        background-color: var(--color-surface-canvas);
        background-image: radial-gradient(circle, rgba(0,0,0,0.13) 1.2px, transparent 1.2px);
        background-size: 22px 22px;
        border: 1px solid rgba(0,0,0,0.06);
      "
    >
      <div class="w-full max-w-[1220px] mx-auto flex flex-col gap-8 pt-16 mt-20">
      <div class="flex flex-col-reverse items-center justify-center gap-10 lg:flex-row lg:items-center lg:gap-[102px]">
      <!-- Left: headline -->
      <div class="flex-1 w-full lg:w-auto min-w-0">
        <h1
          id="hero-heading"
          class="font-heading mt-2 text-[clamp(1.5rem,5vw,4.5rem)] font-black leading-none tracking-tight text-[var(--color-text-primary)] text-center lg:text-left"
        >
          <span class="block">I'm a</span>
          <span class="block"><RotatingDescriptor /></span>
          <span class="block">who creates with clarity and purpose.</span>
        </h1>
      </div>

      <!-- OPTION A: STICKY NOTE (active) -->
      <div class="relative shrink-0 w-64 lg:w-80" style="aspect-ratio: 1 / 1; transform: rotate(2deg)">
        <div class="absolute z-10" style="width: 5.5rem; height: 2.1rem; top: -1rem; left: 50%; transform: translateX(-50%) rotate(-3deg); background: rgba(210, 228, 255, 0.68); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 2px rgba(0, 0, 0, 0.10);"></div>
        <div class="absolute inset-0 flex flex-col" style="background: var(--color-golden-honey-400); box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.08), 4px 10px 20px rgba(0, 0, 0, 0.18), 8px 24px 48px rgba(0, 0, 0, 0.12);">
          <div class="relative flex-1 overflow-hidden mx-9 mt-9 mb-9">
            <img src="/main-page/timea.png" alt="Timea Konya" class="w-full h-full object-cover object-top" />
            <div class="absolute inset-0 border-4 border-white pointer-events-none"></div>
          </div>
        </div>
        <!-- Pointer: X and Y on separate elements with coprime durations (7s/5s) -->
        <!-- so the combined path is a curved Lissajous that doesn't repeat for 35s -->
        <div class="absolute pointer-events-none pointer-float-x" style="width: 7rem; bottom: calc(-2rem + 5px); right: calc(1rem - 30px);">
          <img src="/main-page/pointer.svg" alt="" aria-hidden="true" class="pointer-float-y w-full" />
        </div>
      </div>
      </div>

      <!-- Description: sits below the headline + image row -->
      <p class="mt-20 text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto text-center">
        People describe me as
        <strong class="font-semibold text-[var(--color-brand-primary)]"
          >thoughtful, analytical, and structured</strong>. I cut through ambiguity and connect dots others miss. I care about making design inclusive, accessible, and used for something genuinely good.
      </p>



      <!-- Scroll indicator -->
      <div class="flex justify-center pt-[59px] pb-24" aria-hidden="true">
        <svg width="26" height="42" viewBox="0 0 26 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="24" height="40" rx="12" stroke="var(--color-brand-primary)" stroke-opacity="0.6" stroke-width="1.5"/>
          <circle class="scroll-dot" cx="13" cy="10" r="3" fill="var(--color-brand-primary)"/>
        </svg>
      </div>

      <!-- Project cards -->
      <div class="grid grid-cols-1 gap-4 lg:gap-6 pb-16">
        <CardProject
          v-for="project in PROJECTS"
          :key="project.to"
          :title="project.title"
          :image="project.image"
          :image-alt="project.imageAlt"
          :to="project.to"
          :tags="project.tags"
        />
      </div>

      </div>

      <!-- =====================================================================
        OPTION B: POLAROID (parked, may revisit)
        Square polaroid frame, white border thicker at bottom, tape on top.
        To restore: uncomment the block below and remove the sticky note block.
      ======================================================================
      <div class="relative shrink-0 w-64 lg:w-80" style="aspect-ratio: 1 / 1; transform: rotate(-2deg)">
        <div class="absolute z-10" style="width: 5.5rem; height: 2.1rem; top: -1rem; left: 50%; transform: translateX(-50%) rotate(3deg); background: rgba(210, 228, 255, 0.68); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 2px rgba(0, 0, 0, 0.10);"></div>
        <div class="absolute inset-0 flex flex-col" style="background: var(--color-white); padding: 0.6rem 0.6rem 2rem 0.6rem; box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.08), 4px 10px 20px rgba(0, 0, 0, 0.18), 8px 24px 48px rgba(0, 0, 0, 0.12);">
          <div class="flex-1 overflow-hidden">
            <img src="/main-page/timea.png" alt="Timea Konya" class="w-full h-full object-cover object-top" />
          </div>
        </div>
      </div>
      ===================================================================== -->
    </div>

  </section>

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
