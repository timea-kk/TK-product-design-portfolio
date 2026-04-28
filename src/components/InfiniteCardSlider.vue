<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StickyNote from '@/components/StickyNote.vue'

interface StickySlip {
  text: string
  rotate: number
  maxW?: number
  offsetX?: number
  offsetY?: number
  showAuthorPill?: boolean
  pillOffsetX?: number
  pillOffsetY?: number
  noSquare?: boolean
}

interface Testimonial {
  name: string
  role: string
  image: string
  ringColor: string
  noteColor?: string
  slips: StickySlip[]
}

const testimonials: Testimonial[] = [
  {
    name: 'Ina Arnaoudova',
    role: 'Head of Design @ Ecosia',
    image: '/main-page/quotes-Ina.png',
    ringColor: '#47B1AC',
    noteColor: '#B1E0DD',
    slips: [
      { text: 'Timea continuously drives Design System topics for her team and wider Design Org.', rotate: -0.5, maxW: 150, offsetY: 10, offsetX: 242, showAuthorPill: true, pillOffsetX: 0, pillOffsetY: 215 },
      { text: 'She has a true talent for systems thinking and thrives on order.', rotate: -1.5, maxW: 150, offsetY: 46, offsetX: -100 },
      { text: 'She co-leads major projects, organizes collaboration within Miro, and bridges stakeholders, all while delivering high-quality design work.', rotate: -1.0 },
      { text: 'She consistently examines issues from multiple perspectives, ensuring a thorough understanding of project requirements.', rotate: 0.8, offsetX: -180, offsetY: 30 },
      { text: 'Her proactiveness, process, and dedication make her stand out, and she excels beyond her designer duties.', rotate: 1.2, maxW: 160, offsetX: -170, offsetY: 22 },
    ],
  },
  {
    name: 'Abhishek Juneja',
    role: 'Engineering Manager @ Ecosia',
    image: '/main-page/quotes-Abhishek.webp',
    ringColor: '#3a655a',
    noteColor: '#c4d0cd',
    slips: [
      { text: 'Timea has been pivotal in helping me understand key concepts from design thinking and systems thinking in a way that these skills can be transferred to an engineering domain.', rotate: 0.8, showAuthorPill: true, offsetX: 22, offsetY: 50, maxW: 190, noSquare: true },
      { text: 'She is data driven and has the ability to break down opaque problems into tangible product solutions.', rotate: 1.5, maxW: 150, offsetY: 19, offsetX: -285 },
      { text: 'Her communication and stakeholder management ensured that all entities were on the same page and moved towards a common objective.', rotate: -1, offsetX: -32, offsetY: 60, maxW: 180, noSquare: true },
    ],
  },
  {
    name: 'Sofia Tiira',
    role: 'Senior Content Designer @ Ecosia',
    image: '/main-page/quotes-Sofia.webp',
    ringColor: '#CC7B78',
    noteColor: '#EEAF90',
    slips: [
      { text: "One of Timea's absolute strengths is breaking down complex topics into actionable steps.", rotate: -0.7, offsetY: 52, offsetX: -19 },
      { text: "She approaches every problem analytically and has a lot of skill in connecting team or design level projects to company goals.", rotate: 1, offsetY: 70, showAuthorPill: true },
      { text: "In OKR plannings, I've witnessed Timea help the team maintain a focus on long-term goals while staying aligned with business priorities.", rotate: -1.2, offsetY: 62 },
    ],
  },
  {
    name: 'Barbara Borges',
    role: 'Frontend Engineer @ Ecosia',
    image: '/main-page/quotes-Barbara.png',
    ringColor: '#A2AE78',
    noteColor: '#CED4B8',
    slips: [
      { text: "Timea always tackles design problems thoroughly and backs them up with research.", rotate: 1.2, showAuthorPill: true },
      { text: "Her design proposals are always very well delivered, and she cares about good practices, including accessibility.", rotate: 0.8 },
      { text: "She's very organised, with impeccable Figma files, and she helps us stay organised in Confluence as well.", rotate: -0.5, offsetY: 16, offsetX: 378 },
    ],
  },
]

const MAX_NOTE_W = 221

interface FlatSlip {
  text: string
  rotate: number
  maxW?: number
  noteColor?: string
  offsetY: number
  offsetX: number
  zIndex: number
  authorPill?: Testimonial
  pillOffsetX?: number
  pillOffsetY?: number
  noSquare?: boolean
}

const OFFSETS_Y = [0, 12, -8, 6, -14, 4, 10, -6, 16, -10, 2, -4, 8, -12]
const Z_INDICES  = [4,  2,  5,  1,   3, 5,  2,  4,  1,   3, 5,  2, 4,   1]
const X_JITTER   = [-8, 15, -12, 6, -10, 18, -5, 10]

const BASE_X: Record<string, number> = {
  'Abhishek Juneja': -120,
  'Ina Arnaoudova':     0,
  'Barbara Borges':   420,
  'Sofia Tiira':        0,
}

const BASE_Y: Record<string, number> = {
  'Abhishek Juneja':  0,
  'Ina Arnaoudova':   0,
  'Barbara Borges':  50,
  'Sofia Tiira':      0,
}

const interleavedSlips: FlatSlip[] = (() => {
  const result: FlatSlip[] = []
  const abhishek = testimonials.find(t => t.name === 'Abhishek Juneja')!
  const ina      = testimonials.find(t => t.name === 'Ina Arnaoudova')!
  const barbara  = testimonials.find(t => t.name === 'Barbara Borges')!
  const sofia    = testimonials.find(t => t.name === 'Sofia Tiira')!
  const others   = [abhishek, ina, barbara]
  let idx = 0
  const maxLen = Math.max(...others.map(t => t.slips.length))
  for (let round = 0; round < maxLen; round++) {
    for (const t of others) {
      if (round < t.slips.length) {
        const slip = t.slips[round]
        result.push({
          ...slip,
          noteColor: t.noteColor,
          offsetY: slip.offsetY !== undefined ? slip.offsetY : OFFSETS_Y[idx % OFFSETS_Y.length] + BASE_Y[t.name],
          offsetX: slip.offsetX !== undefined ? slip.offsetX : BASE_X[t.name] + X_JITTER[round % X_JITTER.length],
          zIndex: Z_INDICES[idx % Z_INDICES.length],
          authorPill: slip.showAuthorPill ? t : undefined,
        })
        idx++
      }
    }
  }
  for (const slip of sofia.slips) {
    result.push({
      ...slip,
      noteColor: sofia.noteColor,
      /* c8 ignore next */
      offsetY: slip.offsetY ?? OFFSETS_Y[idx % OFFSETS_Y.length],
      offsetX: slip.offsetX !== undefined ? slip.offsetX : X_JITTER[idx % X_JITTER.length],
      zIndex: Z_INDICES[idx % Z_INDICES.length],
      authorPill: slip.showAuthorPill ? sofia : undefined,
    })
    idx++
  }
  return result
})()

const slipWrapRefs = ref<HTMLElement[]>([])

function squareNote(el: HTMLElement) {
  /* c8 ignore next */
  let lo = 60, hi = parseInt(el.style.width) || MAX_NOTE_W
  for (let i = 0; i < 16; i++) {
    const mid = Math.round((lo + hi) / 2)
    el.style.width = `${mid}px`
    const h = el.offsetHeight
    if (Math.abs(h - mid) < 2) return
    if (h > mid) lo = mid
    else hi = mid
  }
}

onMounted(() => {
  const run = () => slipWrapRefs.value.forEach((el, i) => {
    if (!interleavedSlips[i]?.noSquare) squareNote(el)
  })
  document.fonts?.ready ? document.fonts.ready.then(run) : run()
})
</script>

<template>
  <div class="isolate flex flex-wrap justify-center gap-3 items-center pt-4 pb-28 hidden sm:flex">
    <div
      v-for="(slip, i) in interleavedSlips"
      :key="i"
      ref="slipWrapRefs"
      class="relative self-start overflow-visible"
      :style="{
        width: (slip.maxW ?? MAX_NOTE_W) + 'px',
        transform: `translate(${slip.offsetX}px, ${slip.offsetY}px)`,
        zIndex: slip.authorPill ? 999 : slip.zIndex,
      }"
    >
      <div
        v-if="slip.authorPill"
        class="absolute left-1/2 bottom-full z-10 flex flex-row items-center gap-3 rounded-full pl-2 pr-6 py-2 min-w-max"
        :style="{ backgroundColor: slip.authorPill.ringColor, transform: `translateX(calc(-50% + ${slip.pillOffsetX ?? 0}px)) translateY(calc(1.25rem + ${slip.pillOffsetY ?? 0}px))` }"
      >
        <img :src="slip.authorPill.image" :alt="slip.authorPill.name" class="w-16 h-16 rounded-full object-cover" width="64" height="64" />
        <div>
          <p class="font-heading font-bold text-[19px] leading-tight text-white">{{ slip.authorPill.name }}</p>
          <p class="text-[15px] leading-tight text-white/80">{{ slip.authorPill.role.split(' @ ')[0] }}</p>
        </div>
      </div>
      <StickyNote :rotate="slip.rotate" :color="slip.noteColor" class="w-full">
        <div class="text-center">{{ slip.text }}</div>
      </StickyNote>
    </div>
  </div>

  <!-- Mobile: one column, pill + 2 stickies per person -->
  <div class="sm:hidden flex flex-col items-center gap-12 py-8 px-6">
    <div v-for="person in testimonials" :key="person.name" class="w-full flex flex-col items-center gap-5">
      <div class="flex items-center gap-3 rounded-full pl-2 pr-6 py-2" :style="{ backgroundColor: person.ringColor }">
        <img :src="person.image" :alt="person.name" class="w-14 h-14 rounded-full object-cover" width="56" height="56" />
        <div>
          <p class="font-heading font-bold text-[17px] leading-tight text-white">{{ person.name }}</p>
          <p class="text-[13px] leading-tight text-white/80">{{ person.role.split(' @ ')[0] }}</p>
        </div>
      </div>
      <div class="flex gap-3 justify-center w-full">
        <div v-for="slip in person.slips.slice(0, 2)" :key="slip.text" class="w-[140px]">
          <StickyNote :rotate="slip.rotate" :color="person.noteColor" class="w-full">
            <div class="text-center">{{ slip.text }}</div>
          </StickyNote>
        </div>
      </div>
    </div>
  </div>
</template>
