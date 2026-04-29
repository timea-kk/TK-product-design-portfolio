<!--
  RotatingDescriptor.vue – Typewriter effect in the hero headline.
  Types one phrase character by character, blinks the cursor twice, fades it out,
  then fades the whole block and types the next phrase. Cycle repeats indefinitely.

  Respects reduce-motion (both from the a11y store and the OS prefers-reduced-motion
  media query): when either is active, shows only the first phrase with no animation.

  Phrases wrap naturally. The parent h1 uses a fluid clamp() font-size so text never
  overflows its container at any breakpoint.
-->

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useA11yStore } from '@/stores/a11y'

/** All phrases that rotate in the headline. */
const DESCRIPTORS = [
  'Senior Product Designer',
  'Design systems fan',
  'Designer who codes',
  'Accessibility advocate',
  'Systems thinker',
]

// Timing constants (milliseconds)
const TYPE_MS = 70 // delay between revealing each character
const PAUSE_AFTER_TYPE_MS = 2997 // how long the cursor blinks before fading
const CURSOR_FADE_OUT_MS = 400 // duration of the cursor fade-out animation
const FADE_OUT_MS = 350 // duration of the whole-block fade before the next phrase

/** The text we type: phrase plus one trailing space before the cursor. */
const textToType = (phrase: string) => phrase + ' '

// ---- Store access ----
const a11y = useA11yStore()

// ---- Reactive state ----
const phraseIndex = ref(0)
const visibleLength = ref(0)

/** Lifecycle of the animation: typing → pause (cursor blinks) → cursorFadeOut → fadeOut → typing */
const phase = ref<'typing' | 'pause' | 'cursorFadeOut' | 'fadeOut'>('typing')

/** Set to true when the OS prefers-reduced-motion media query matches. */
const systemReduceMotion = ref(false)

// ---- Derived values ----
/** True if either the user's a11y setting OR the OS setting requests reduced motion. */
const reduceMotion = computed(() => a11y.reduceMotion || systemReduceMotion.value)

const phrase = computed(() => DESCRIPTORS[phraseIndex.value])
const fullText = computed(() => textToType(phrase.value))
const visible = computed(() => fullText.value.slice(0, visibleLength.value))

/** CSS class applied to the cursor span based on the current animation phase. */
const cursorClass = computed(() => {
  if (phase.value === 'pause') return 'cursor-blink-twice'
  if (phase.value === 'cursorFadeOut' || phase.value === 'fadeOut') return 'cursor-fade-out'
  return ''
})

/** Applied to every revealed character: themed highlight background + brand colour. */
const highlightClass = 'bg-[var(--color-highlight)] py-0.5 text-[var(--color-brand-primary)]'

// ---- Timer ----
let timeoutId: ReturnType<typeof setTimeout> | null = null

function clearTimer() {
  if (timeoutId !== null) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}

/**
 * Advance the state machine by one step.
 * Called immediately and whenever any watched reactive dependency changes.
 *
 * State machine:
 *   typing       → increments visibleLength each TYPE_MS until the phrase is fully typed,
 *                  then transitions to pause
 *   pause        → waits PAUSE_AFTER_TYPE_MS (cursor blinks twice), then cursorFadeOut
 *   cursorFadeOut → waits CURSOR_FADE_OUT_MS for the cursor CSS fade, then fadeOut
 *   fadeOut      → waits FADE_OUT_MS for the block CSS fade, then resets to the next phrase
 */
function schedule() {
  clearTimer()

  // When reduce-motion is on, show the full phrase with a static cursor; no timers
  if (reduceMotion.value) {
    visibleLength.value = phrase.value.length
    phase.value = 'pause'
    return
  }

  if (phase.value === 'typing') {
    if (visibleLength.value < fullText.value.length) {
      // Reveal the next character after TYPE_MS
      timeoutId = setTimeout(() => {
        visibleLength.value++
      }, TYPE_MS)
    } else {
      // All characters revealed; move to the pause/blink phase
      phase.value = 'pause'
    }
  } else if (phase.value === 'pause') {
    timeoutId = setTimeout(() => {
      phase.value = 'cursorFadeOut'
    }, PAUSE_AFTER_TYPE_MS)
  } else if (phase.value === 'cursorFadeOut') {
    timeoutId = setTimeout(() => {
      phase.value = 'fadeOut'
    }, CURSOR_FADE_OUT_MS)
  } else if (phase.value === 'fadeOut') {
    timeoutId = setTimeout(() => {
      // Move to next phrase and restart
      phraseIndex.value = (phraseIndex.value + 1) % DESCRIPTORS.length
      visibleLength.value = 0
      phase.value = 'typing'
    }, FADE_OUT_MS)
  }
}

// Re-run the state machine whenever any of its inputs change
watch([reduceMotion, phase, visibleLength, phraseIndex], schedule, { immediate: true })

// ---- Media query for OS-level prefers-reduced-motion ----
let mq: MediaQueryList | null = null
let mqListener: (() => void) | null = null

onMounted(() => {
  mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  systemReduceMotion.value = mq.matches
  mqListener = () => {
    systemReduceMotion.value = mq!.matches
  }
  mq.addEventListener('change', mqListener)
})

onUnmounted(() => {
  clearTimer()
  if (mq && mqListener) mq.removeEventListener('change', mqListener)
})
</script>

<template>
  <span class="relative block">
    <!-- Ghost: invisible, reserves the exact height the current full phrase needs.
         Prevents layout shift during typing. Height only shifts at phrase transitions (during fade). -->
    <span class="opacity-0 pointer-events-none select-none" aria-hidden="true">{{ phrase }}</span>

    <!-- Content: absolutely positioned over the ghost -->
    <span class="absolute inset-0">
      <!-- Reduce-motion: static first phrase, no cursor or animation -->
      <span
        v-if="reduceMotion"
        aria-live="polite"
        aria-atomic="true"
      >
        {{ DESCRIPTORS[0] }}
      </span>

      <!-- Animated typewriter -->
      <span
        v-else
        :class="[
          'transition-opacity duration-300',
          phase === 'fadeOut' ? 'opacity-0' : 'opacity-100',
        ]"
        aria-live="polite"
        aria-atomic="true"
      >
        <!-- Each character gets the highlight background; rendered one span per char -->
        <span
          v-for="(char, i) in Array.from(visible)"
          :key="i"
          :class="highlightClass"
          >{{ char }}</span
        >
        <!-- Blinking cursor; hidden from screen readers since it's purely decorative -->
        <span
          :class="['select-none inline-block text-[var(--color-brand-primary)]', cursorClass]"
          aria-hidden="true"
          data-testid="cursor"
          >|</span
        >
      </span>
    </span>
  </span>
</template>
