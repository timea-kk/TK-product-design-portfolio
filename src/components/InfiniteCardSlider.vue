<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StickyNote from '@/components/StickyNote.vue'

interface Pill {
  name: string
  role: string
  image: string
  ringColor: string
  pillOffsetX?: number
  pillOffsetY?: number
}

interface DesktopNote {
  text: string
  rotate: number
  color: string
  x: number
  y: number
  z: number
  maxW?: number
  noSquare?: boolean
  pill?: Pill
}

interface MobileSlip {
  text: string
  rotate: number
}

interface Person {
  name: string
  role: string
  image: string
  ringColor: string
  noteColor: string
  slips: MobileSlip[]
}

const MAX_NOTE_W = 221
const CANVAS_W   = 1026
const CANVAS_H   = 680

const notes: DesktopNote[] = [
  // Abhishek Juneja
  { text: 'Timea has been <strong>pivotal</strong> in helping me understand key concepts from design thinking and <strong>systems thinking</strong> in a way that these skills can be transferred to an engineering domain.', rotate: 0.8, color: '#c4d0cd', x: 43, y: 64, z: 4, maxW: 190, noSquare: true, pill: { name: 'Abhishek Juneja', role: 'Engineering Manager', image: '/main-page/quotes-Abhishek.webp', ringColor: '#3a655a' } },
  { text: 'She is <strong>data driven</strong> and has the ability to break down opaque problems into tangible product solutions.', rotate: -3, color: '#c4d0cd', x: 254, y: 33, z: 1, maxW: 150 },
  { text: 'Her <strong>communication</strong> and <strong>stakeholder management</strong> ensured that all entities were on the same page and moved towards a common objective.', rotate: -1, color: '#c4d0cd', x: 48, y: 272, z: 2, maxW: 180, noSquare: true },
  // Ina Arnaoudova
  { text: 'Timea continuously drives <strong>Design System</strong> topics for her team and wider Design Org.', rotate: -0.5, color: '#B1E0DD', x: 463, y: 24, z: 2, maxW: 150, pill: { name: 'Ina Arnaoudova', role: 'Head of Design', image: '/main-page/quotes-Ina.png', ringColor: '#47B1AC', pillOffsetX: 0, pillOffsetY: 215 } },
  { text: 'She has a true talent for <strong>systems thinking</strong> and thrives on <strong>order</strong>.', rotate: -1.5, color: '#B1E0DD', x: 605, y: 60, z: 3, maxW: 150 },
  { text: 'She co-leads major projects, organizes collaboration within Miro, and bridges stakeholders, all while delivering <strong>high-quality design work</strong>.', rotate: 3, color: '#B1E0DD', x: 259, y: 206, z: 4 },
  { text: 'She consistently examines issues from <strong>multiple perspectives</strong>, ensuring a thorough understanding of project requirements.', rotate: -3, color: '#B1E0DD', x: 631, y: 232, z: 1 },
  { text: 'Her proactiveness, process, and <strong>dedication</strong> make her <strong>stand out</strong>, and she excels beyond her designer duties.', rotate: 1.2, color: '#B1E0DD', x: 459, y: 239, z: 3, maxW: 160 },
  // Barbara Borges
  { text: 'Timea always tackles <strong>design problems</strong> thoroughly and backs them up with <strong>research</strong>.', rotate: 1.2, color: '#CED4B8', x: 794, y: 56, z: 5, pill: { name: 'Barbara Borges', role: 'Frontend Engineer', image: '/main-page/quotes-Barbara.png', ringColor: '#A2AE78' } },
  { text: "She's very organised, with <strong>impeccable Figma files</strong>, and she helps us stay organised in Confluence as well.", rotate: -0.5, color: '#CED4B8', x: 829, y: 228, z: 1 },
  // Sofia Tiira
  { text: "One of Timea's absolute strengths is breaking down complex topics into <strong>actionable steps</strong>.", rotate: 5, color: '#EEAF90', x: 228, y: 463, z: 5 },
  { text: "She approaches every problem <strong>analytically</strong> and has a lot of skill in connecting team or design level projects to <strong>company goals</strong>.", rotate: 1, color: '#EEAF90', x: 402, y: 462, z: 2, pill: { name: 'Sofia Tiira', role: 'Senior Content Designer', image: '/main-page/quotes-Sofia.webp', ringColor: '#CC7B78' } },
  { text: "In OKR plannings, I've witnessed Timea help the team maintain a focus on <strong>long-term goals</strong> while staying aligned with business priorities.", rotate: -1.2, color: '#EEAF90', x: 586, y: 454, z: 4 },
]

const people: Person[] = [
  { name: 'Ina Arnaoudova', role: 'Head of Design @ Ecosia', image: '/main-page/quotes-Ina.png', ringColor: '#47B1AC', noteColor: '#B1E0DD',
    slips: [
      { text: 'Timea continuously drives Design System topics for her team and wider Design Org.', rotate: -0.5 },
      { text: 'She has a true talent for <strong>systems thinking</strong> and thrives on <strong>order</strong>.', rotate: -1.5 },
    ] },
  { name: 'Abhishek Juneja', role: 'Engineering Manager @ Ecosia', image: '/main-page/quotes-Abhishek.webp', ringColor: '#3a655a', noteColor: '#c4d0cd',
    slips: [
      { text: 'Timea has been pivotal in helping me understand key concepts from design thinking and systems thinking in a way that these skills can be transferred to an engineering domain.', rotate: 0.8 },
      { text: 'She is data driven and has the ability to break down opaque problems into tangible product solutions.', rotate: 1.5 },
    ] },
  { name: 'Sofia Tiira', role: 'Senior Content Designer @ Ecosia', image: '/main-page/quotes-Sofia.webp', ringColor: '#CC7B78', noteColor: '#EEAF90',
    slips: [
      { text: "One of Timea's absolute strengths is breaking down complex topics into <strong>actionable steps</strong>.", rotate: -0.7 },
      { text: "She approaches every problem <strong>analytically</strong> and has a lot of skill in connecting team or design level projects to <strong>company goals</strong>.", rotate: 1 },
    ] },
  { name: 'Barbara Borges', role: 'Frontend Engineer @ Ecosia', image: '/main-page/quotes-Barbara.png', ringColor: '#A2AE78', noteColor: '#CED4B8',
    slips: [
      { text: 'Timea always tackles <strong>design problems</strong> thoroughly and backs them up with <strong>research</strong>.', rotate: 1.2 },
      { text: "She's very organised, with <strong>impeccable Figma files</strong>, and she helps us stay organised in Confluence as well.", rotate: -0.5 },
    ] },
]

const noteRefs = ref<HTMLElement[]>([])

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
  const run = () => noteRefs.value.forEach((el, i) => {
    if (!notes[i]?.noSquare) squareNote(el)
  })
  document.fonts?.ready ? document.fonts.ready.then(run) : run()
})
</script>

<template>
  <!-- Desktop: each note is independently absolute-positioned; moving or removing one never affects any other -->
  <div class="isolate hidden xl:flex justify-center xl:-mb-10">
    <div class="relative" :style="{ width: CANVAS_W + 'px', height: CANVAS_H + 'px' }">
      <div
        v-for="(note, i) in notes"
        :key="i"
        ref="noteRefs"
        class="absolute overflow-visible"
        :style="{
          left: note.x + 'px',
          top: note.y + 'px',
          width: (note.maxW ?? MAX_NOTE_W) + 'px',
          zIndex: note.pill ? 999 : note.z,
        }"
      >
        <div
          v-if="note.pill"
          class="absolute left-1/2 bottom-full z-10 flex flex-row items-center gap-3 rounded-full pl-2 pr-6 py-2 min-w-max"
          :style="{ backgroundColor: note.pill.ringColor, transform: `translateX(calc(-50% + ${note.pill.pillOffsetX ?? 0}px)) translateY(calc(1.25rem + ${note.pill.pillOffsetY ?? 0}px))` }"
        >
          <img :src="note.pill.image" :alt="note.pill.name" class="w-16 h-16 rounded-full object-cover" width="64" height="64" />
          <div>
            <p class="font-heading font-bold text-[19px] leading-tight text-white">{{ note.pill.name }}</p>
            <p class="text-[15px] leading-tight text-white/80">{{ note.pill.role }}</p>
          </div>
        </div>
        <StickyNote :rotate="note.rotate" :color="note.color" class="w-full">
          <div class="text-center" v-html="note.text"></div>
        </StickyNote>
      </div>
      <img src="/main-page/sparkles.svg"  alt="" aria-hidden="true" style="position:absolute;left:590px;top:20px;width:52px;pointer-events:none;z-index:1000;transform:rotate(-15deg);" />
      <img src="/main-page/thumbs-up.svg" alt="" aria-hidden="true" style="position:absolute;left:190px;top:220px;width:68px;pointer-events:none;z-index:1000;transform:rotate(-8deg);" />
      <img src="/main-page/heart.svg"     alt="" aria-hidden="true" style="position:absolute;left:415px;top:340px;width:53px;pointer-events:none;z-index:1000;transform:rotate(-6deg);" />
      <img src="/main-page/+1.svg"        alt="" aria-hidden="true" style="position:absolute;left:555px;top:590px;width:50px;pointer-events:none;z-index:1000;transform:rotate(10deg);" />
      <img src="/main-page/fire.svg"      alt="" aria-hidden="true" style="position:absolute;left:940px;top:190px;width:58px;pointer-events:none;z-index:1000;transform:rotate(8deg);" />
    </div>
  </div>

  <!-- Mobile: one column, pill + 2 stickies per person -->
  <div class="xl:hidden flex flex-col items-center gap-12 py-8 px-6">
    <div v-for="person in people" :key="person.name" class="w-full flex flex-col items-center gap-5">
      <div class="flex items-center gap-3 rounded-full pl-2 pr-6 py-2" :style="{ backgroundColor: person.ringColor }">
        <img :src="person.image" :alt="person.name" class="w-14 h-14 rounded-full object-cover" width="56" height="56" />
        <div>
          <p class="font-heading font-bold text-[17px] leading-tight text-white">{{ person.name }}</p>
          <p class="text-[13px] leading-tight text-white/80">{{ person.role.split(' @ ')[0] }}</p>
        </div>
      </div>
      <div class="flex gap-3 justify-center w-full">
        <div v-for="slip in person.slips" :key="slip.text" class="w-[182px]">
          <StickyNote :rotate="slip.rotate" :color="person.noteColor" class="w-full">
            <div class="text-center" v-html="slip.text"></div>
          </StickyNote>
        </div>
      </div>
    </div>
  </div>
</template>
