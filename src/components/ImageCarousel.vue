<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
  images: string[]
  alts?: string[]
}>()

const step = ref(0)
const frontRef = ref<HTMLImageElement | null>(null)
const backRef = ref<HTMLImageElement | null>(null)
const frontSrc = ref(props.images[0])
const lockedRatio = ref('')

function lockRatio(e: Event) {
  if (lockedRatio.value) return
  const img = e.target as HTMLImageElement
  lockedRatio.value = `${img.naturalWidth} / ${img.naturalHeight}`
}

function dissolve(newSrc: string, onComplete: () => void) {
  if (!frontRef.value || !backRef.value) { onComplete(); return }
  backRef.value.src = newSrc
  gsap.set(backRef.value, { opacity: 0 })
  const tl = gsap.timeline()
  tl.to(frontRef.value, { opacity: 0, duration: 0.25 }, 0)
  tl.to(backRef.value, { opacity: 1, duration: 0.25 }, 0)
  tl.add(() => {
    onComplete()
    gsap.set(frontRef.value!, { opacity: 1 })
    gsap.set(backRef.value!, { opacity: 0 })
  })
}

function goTo(newStep: number) {
  step.value = newStep
  dissolve(props.images[newStep], () => {
    frontSrc.value = props.images[newStep]
  })
}
</script>

<template>
  <div class="relative">
    <div
      class="relative w-full rounded-xl border-2 border-[#275243] overflow-hidden"
      :style="{ background: '#275243', aspectRatio: lockedRatio || undefined }"
    >
      <img
        ref="frontRef"
        :src="frontSrc"
        :alt="alts?.[step] ?? ''"
        class="w-full h-full object-cover rounded-xl"
        @load="lockRatio"
      />
      <img
        ref="backRef"
        src=""
        alt=""
        class="w-full h-full rounded-xl absolute inset-0 object-cover"
        style="opacity:0"
      />
    </div>
    <button
      v-if="step > 0"
      class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white border border-black/[0.08] shadow-sm w-9 h-9 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors duration-200"
      aria-label="Previous image"
      @click="goTo(step - 1)"
    >&#8592;</button>
    <button
      v-if="step < images.length - 1"
      class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white border border-black/[0.08] shadow-sm w-9 h-9 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors duration-200"
      aria-label="Next image"
      @click="goTo(step + 1)"
    >&#8594;</button>
  </div>
</template>
