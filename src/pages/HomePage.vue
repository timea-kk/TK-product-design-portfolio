<!--
  HomePage.vue – Main landing page content.
  Renders the hero section: greeting row, typewriter headline, bio paragraph.
  The outer shell (background, header, chat widget) is provided by AppLayout.vue.
-->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import RotatingDescriptor from '@/components/RotatingDescriptor.vue'
import CardProject from '@/components/CardProject.vue'
import InfiniteCardSlider from '@/components/InfiniteCardSlider.vue'

const isLg = ref(false)
let mql: MediaQueryList | null = null
function onMqlChange(e: MediaQueryListEvent) { isLg.value = e.matches }
onMounted(() => {
  mql = window.matchMedia('(min-width: 1024px)')
  isLg.value = mql.matches
  mql.addEventListener('change', onMqlChange)
})
onUnmounted(() => mql?.removeEventListener('change', onMqlChange))

interface CardDecoration { src: string; style: string }
const CARD_DECORATIONS: CardDecoration[][] = [
  // 0 – Ecosia Onboarding
  [
    { src: '/main-page/paperclip-2.svg', style: 'position:absolute;top:50px;left:calc(36% - 40px);width:36px;pointer-events:none;z-index:10;transform:rotate(1deg);' },
    { src: '/main-page/squiggle-1.svg',  style: 'position:absolute;bottom:-95px;left:calc(24% - 60px);width:118px;pointer-events:none;transform:rotate(-15deg);' },
    { src: '/main-page/Star%203.svg',    style: 'position:absolute;bottom:-188px;right:7%;width:84px;pointer-events:none;' },
  ],
  // 1 – Flora / Design Ops
  [
    { src: '/main-page/pin.svg',         style: 'position:absolute;top:-5px;left:calc(33% - 70px);width:88px;pointer-events:none;z-index:10;' },
    { src: '/main-page/thumbs-up.svg',   style: 'position:absolute;bottom:-198px;left:calc(11% - 80px);width:109px;pointer-events:none;transform:rotate(3deg);' },
    { src: '/main-page/squiggle-2.svg',  style: 'position:absolute;bottom:-224px;right:calc(16% + 365px);width:187px;pointer-events:none;transform:rotate(-50deg);' },
    { src: '/main-page/fire.svg',        style: 'position:absolute;bottom:-144px;right:calc(16% + 100px);width:100px;pointer-events:none;transform:rotate(-10deg);' },
  ],
  // 2 – Ecosia Browser
  [
    { src: '/main-page/Star%202.svg',    style: 'position:absolute;bottom:-142px;left:24%;width:108px;pointer-events:none;' },
    { src: '/main-page/paperclip-1.svg', style: 'position:absolute;bottom:-195px;right:calc(8% - 70px);width:52px;pointer-events:none;transform:rotate(28deg);' },
  ],
  // 3 – Lolsumo
  [
    { src: '/main-page/paperclip-2.svg', style: 'position:absolute;top:50px;left:calc(41% - 90px);width:36px;pointer-events:none;z-index:10;transform:rotate(-1deg);' },
  ],
]

const PROJECTS = [
  {
    id: 'project-onboarding',
    year: '2025',
    title: "Building Ecosia's Onboarding Experience",
    description: 'A smooth first-time experience that boosted conversion by 25%.',
    image: '/project-pages/ecosia-onboarding/ecosia-onboarding-1.webp',
    imageAlt: 'Ecosia onboarding screen',
    video: '/main-page/ecosia-page.mp4',
    to: '/work/ecosia-onboarding',
    tags: ['Generative Research', 'Ideation Workshop', 'A/B Testing', 'Strategy'],
  },
  {
    id: 'project-flora',
    year: '2025',
    title: 'Scaling Design Operations at Ecosia',
    description: 'Establishing a shared ownership model for Flora, Ecosia\'s Design System.',
    image: '/project-pages/flora-design-system/flora-design-system-1.webp',
    imageAlt: 'Flora Design System structure',
    video: '/main-page/flora.mp4',
    to: '/work/flora-design-system',
    tags: ['Design System', 'Documentation', 'Design Operations', 'Workflows & Processes'],
  },
  {
    id: 'project-browser',
    year: '2024',
    title: 'Install Funnel for the Ecosia Browser',
    description: 'Launched Ecosia\'s browser in just two months, reaching 100k DAU.',
    image: '/main-page/browser.webp',
    imageAlt: 'Ecosia Browser landing page',
    video: '/main-page/browser.mp4',
    zoom: 0.11,
    to: '/work/ecosia-browser',
    tags: ['Evaluative Research', 'Prototyping', 'Stakeholder Management', 'Design System'],
  },
  {
    id: 'project-lolsumo',
    year: '2020',
    title: 'Lolsumo: a coaching app for League of Legends',
    description: 'Real-time gaming support for competitive League of Legends players.',
    image: '/project-pages/lolsumo/lolsumo-1.webp',
    video: '/main-page/Lolsumo.mp4',
    imageAlt: 'Lolsumo Android and iOS apps',
    mediaPosition: '-20px top',
    to: '/work/lolsumo',
    tags: ['Community Engagement', 'Design System', 'User Testing'],
  },
]
</script>

<template>
  <!-- Hero: greeting row, typewriter headline, and bio paragraph -->
  <section
    class="relative h-screen p-0 sm:p-6 lg:p-[40px]"
    aria-labelledby="hero-heading"
  >
    <!-- Whiteboard panel: fills the viewport minus 80px on all sides -->
    <div
      class="w-full h-full sm:rounded-3xl sm:border sm:border-black/[0.06] overflow-y-auto px-10 lg:px-20 flex flex-col"
      style="
        background-color: var(--color-surface-canvas);
        background-image: radial-gradient(circle, rgba(0,0,0,0.13) 1.2px, transparent 1.2px);
        background-size: 22px 22px;
      "
    >
      <div class="min-h-dvh sm:min-h-[calc(100dvh-48px)] lg:min-h-[calc(100dvh-80px)] flex flex-col">
      <div class="flex-1 flex flex-col justify-center">
      <div class="w-full max-w-[1220px] mx-auto flex flex-col gap-8 py-16">
      <div class="flex flex-col-reverse items-center justify-center gap-10 lg:flex-row lg:items-center lg:gap-0">
      <!-- Left: headline -->
      <div class="flex-1 w-full lg:w-auto lg:max-w-[780px] min-w-0">
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
            <img src="/main-page/timea.webp" alt="Timea Konya" class="w-full h-full object-cover object-top" />
            <div class="absolute inset-0 border-4 border-white pointer-events-none"></div>
          </div>
        </div>
        <!-- Pointer: X and Y on separate elements with coprime durations (7s/5s) -->
        <!-- so the combined path is a curved Lissajous that doesn't repeat for 35s -->
        <div class="absolute pointer-events-none pointer-float-x" style="width: 7rem; bottom: calc(-2rem + 15px); right: calc(1rem - 30px);">
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
      </div>
      </div>
      <!-- Scroll indicator -->
      <div class="flex justify-center pb-8" aria-hidden="true">
        <svg width="26" height="42" viewBox="0 0 26 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="24" height="40" rx="12" stroke="var(--color-brand-primary)" stroke-opacity="0.6" stroke-width="1.5"/>
          <circle class="scroll-dot" cx="13" cy="10" r="3" fill="var(--color-brand-primary)"/>
        </svg>
      </div>
      </div>

      <!-- Recent work section label -->
      <div class="w-full max-w-[1100px] mx-auto text-center lg:text-left lg:pl-[16px] pt-16">
        <h2 class="font-heading text-[clamp(1.5rem,5vw,4.5rem)] font-black leading-none tracking-tight text-[var(--color-text-primary)]">Recent work</h2>
        <p class="mt-2 text-lg text-[var(--color-text-secondary)]">Projects spanning research, experimentation, and strategy that show what I do best.</p>
      </div>

      <!-- Scattered project cards -->
      <div class="scattered-cards relative w-full max-w-[1100px] mx-auto pb-32">

        <!-- Dotted bezier line behind all cards, desktop only -->
        <svg
          class="hidden lg:block absolute left-1/2 -translate-x-1/2 pointer-events-none"
          viewBox="0 0 776 3064"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style="top: 9.87%; height: 74.75%; width: 776px; z-index: 0;"
        >
          <path
            d="M310.556 1.36328C249.056 96.0299 208.8 397.063 376 479.863C585 583.363 658.216 483.363 642 433.863C625.784 384.363 370.056 476.863 485.556 699.863C601.056 922.863 858.556 893.863 744.556 1128.86C630.556 1363.86 516.556 1163.36 350.556 1175.36C184.556 1187.36 -209.944 1988.86 148.056 2303.86C506.056 2618.86 702.93 2395.9 625 2349.36C555.5 2307.86 501.047 2518.87 669.5 2661.36C835 2801.36 744.556 2966.86 633.557 3061.86"
            stroke="var(--color-dusty-violet-500)"
            stroke-opacity="0.7"
            stroke-width="3"
            stroke-dasharray="12 15"
            stroke-linecap="round"
            fill="none"
            vector-effect="non-scaling-stroke"
          />
        </svg>

        <!-- Cards -->
        <div
          v-for="(project, i) in PROJECTS"
          :key="project.to"
          :class="['card-scattered', `card-scattered-${i + 1}`]"
        >
          <template v-if="isLg">
            <div :id="project.id" class="relative scroll-mt-24">
              <p
                class="absolute -top-[60px] left-0 text-2xl font-medium text-white bg-[var(--color-brand-primary)] rounded-2xl px-5 py-2 select-none"
                style="box-shadow: 0 1px 4px rgba(0,0,0,0.06); border: 5px solid var(--color-dusty-violet-100);"
              >{{ project.year }}</p>
              <CardProject
                :title="project.title"
                :description="project.description"
                :image="project.image"
                :image-alt="project.imageAlt"
                :video="project.video"
                :zoom="project.zoom"
                :media-position="project.mediaPosition"
                :to="project.to"
                :tags="project.tags"
                no-hover
              />
            </div>
            <img
              v-for="(dec, di) in CARD_DECORATIONS[i]"
              :key="di"
              :src="dec.src"
              :style="dec.style"
              alt=""
              aria-hidden="true"
            />
            <div
              v-if="i === 0"
              class="absolute pointer-events-none"
              style="width:calc(16.5rem - 20px);height:calc(4.2rem - 20px);top:85px;right:calc(6% - 110px);transform:rotate(32deg);background:rgba(210,228,255,0.68);box-shadow:inset 0 1px 0 rgba(255,255,255,0.4),0 1px 2px rgba(0,0,0,0.10);z-index:10;clip-path:polygon(0% 0%,100% 0%,96% 17%,100% 33%,96% 50%,100% 67%,96% 83%,100% 100%,0% 100%,4% 83%,0% 67%,4% 50%,0% 33%,4% 17%,0% 0%);"
              aria-hidden="true"
            />
            <div
              v-if="i === 3"
              class="absolute pointer-events-none"
              style="width:calc(16.5rem - 20px);height:calc(4.2rem - 20px);bottom:5px;right:calc(6% - 110px);transform:rotate(-32deg);background:rgba(210,228,255,0.68);box-shadow:inset 0 1px 0 rgba(255,255,255,0.4),0 1px 2px rgba(0,0,0,0.10);z-index:10;clip-path:polygon(0% 0%,100% 0%,96% 17%,100% 33%,96% 50%,100% 67%,96% 83%,100% 100%,0% 100%,4% 83%,0% 67%,4% 50%,0% 33%,4% 17%,0% 0%);"
              aria-hidden="true"
            />
          </template>
          <CardProject
            v-else
            :title="project.title"
            :description="project.description"
            :image="project.image"
            :image-alt="project.imageAlt"
            :video="project.video"
            :zoom="project.zoom"
            :media-position="project.mediaPosition"
            :to="project.to"
            :tags="project.tags"
          />
        </div>

      </div>

      <!-- Side projects section -->
      <div class="w-full max-w-[1100px] mx-auto mt-[-100px] pb-[200px]">
        <div class="relative rounded-2xl bg-white border border-black/[0.06] p-8 sm:p-10 space-y-8 isolate">
          <!-- Dotted bezier line, desktop only -->
          <svg
            class="hidden lg:block absolute pointer-events-none"
            viewBox="0 0 510 254"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style="z-index: -1; top: 0; right: 0; width: 50%; height: auto;"
          >
            <path
              d="M1.43164 0.445312C30.4316 92.9453 109.832 89.4453 185.432 61.4453C239.932 41.2601 259.932 74.4453 234.932 132.445C209.932 190.445 253.432 280.445 345.932 242.445C438.432 204.445 409.432 107.445 375.432 132.445C339.723 158.702 444.932 217.445 508.432 148.445"
              stroke="var(--color-dusty-violet-500)"
              stroke-opacity="0.7"
              stroke-width="3"
              stroke-dasharray="12 15"
              stroke-linecap="round"
              fill="none"
              vector-effect="non-scaling-stroke"
            />
          </svg>
          <img
            src="/main-page/paperclip-3.svg"
            alt=""
            aria-hidden="true"
            class="hidden lg:block"
            style="position:absolute;top:-55px;right:50px;width:44px;pointer-events:none;z-index:10;transform:none;"
          />
          <div class="pl-3 pt-5 text-center lg:text-left">
            <div class="inline-flex items-center gap-3">
              <h2 class="font-heading text-[clamp(1.5rem,5vw,4.5rem)] font-black leading-none tracking-tight text-[var(--color-text-primary)]">Side projects</h2>
              <img
                src="/main-page/heart.svg"
                alt=""
                aria-hidden="true"
                class="hidden lg:block"
                style="width:49px;margin-left:0px;margin-top:5px;filter:drop-shadow(0 8px 16px rgba(0,0,0,0.18));pointer-events:none;flex-shrink:0;"
              />
            </div>
            <p class="mt-2 text-lg text-[var(--color-text-secondary)]">Ideas that I worked on for fun or to solve a real issue I was having.</p>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CardProject
              title="Portfolio Design System"
              description="The design system I built to power this portfolio: tokens, components, and live documentation in one place."
              image="/main-page/portfolio-design-system-950.webp"
              image-alt="Portfolio Design System"
              to="https://tk-product-design-portfolio.vercel.app/design-system"
              :tags="['Design System', 'Vue 3', 'Documentation']"
              :image-top="true"
              :vertical="true"
              :hide-cta="true"
              :image-rounded="true"
              :image-outline="true"
              :transparent="true"
            />
            <CardProject
              title="Arctic Scapes"
              description="A Chrome extension I built that turns every new tab into a rotating gallery of 150 curated arctic landscape photographs."
              image="/main-page/arctic-scapes-950.webp"
              image-alt="Arctic Scapes"
              to="https://chromewebstore.google.com/detail/arctic-scapes/pombmjljnopplgkmpaikgjkheokpgaae?authuser=0&hl=en"
              :tags="['Chrome Extension', 'JavaScript', 'Photography']"
              :image-top="true"
              :vertical="true"
              :hide-cta="true"
              :image-rounded="true"
              :image-outline="true"
              :transparent="true"
            />
          </div>
        </div>
      </div>
      <div class="w-full max-w-[1100px] mx-auto pb-[200px]">
        <div class="relative rounded-2xl bg-white border border-black/[0.06] p-8 sm:p-10 space-y-8 isolate">
          <div class="pl-3 pt-5 text-center lg:text-left">
            <h2 class="font-heading text-[clamp(1.5rem,5vw,4.5rem)] font-black leading-none tracking-tight text-[var(--color-text-primary)]">What do others say?</h2>
            <p class="mt-2 text-lg text-[var(--color-text-secondary)]">I've had the chance to work with people who've seen me at my best and challenged me to grow. Here are a few things they've said about how I work and the impact I've had.</p>
          </div>
          <InfiniteCardSlider />
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
            <img src="/main-page/timea.webp" alt="Timea Konya" class="w-full h-full object-cover object-top" />
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

/* Scattered card layout */
.card-scattered {
  position: relative;
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  .card-scattered { margin-bottom: 11rem; padding-top: 5rem; }
  .card-scattered-1 { transform: rotate(-2deg) translateX(-3%); z-index: 1; }
  .card-scattered-2 { transform: rotate(1deg)  translateX(3%);  z-index: 2; }
  .card-scattered-3 { transform: rotate(-1deg) translateX(-4%); z-index: 3; }
  .card-scattered-4 { transform: rotate(2deg)  translateX(4%);  z-index: 4; }
}
</style>
