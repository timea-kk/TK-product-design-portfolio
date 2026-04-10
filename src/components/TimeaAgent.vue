<!--
  TimeaAgent.vue – Sticky chat widget at the bottom of the page.
  Collapsed: a narrow centered pill. Expanded: a panel with 3 prompt questions
  (shown before any messages) and a full chat thread.
-->

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { IconSend } from '@tabler/icons-vue'
import { getAnswerForQuestion } from '@/data/timeaAgentKnowledge'
import gsap from 'gsap'

const PROMPT_QUESTIONS = [
  "What has Timea worked on at Ecosia?",
  "What makes Timea stand out as a designer?",
  "Is Timea available for new opportunities?",
]

interface Message {
  role: 'user' | 'assistant'
  text: string
}

const expanded = ref(false)
const messages = ref<Message[]>([])
const input = ref('')
const isThinking = ref(false)

// Typewriter animation state
const typingIndex = ref<number | null>(null)
const typingText = ref('')
let typingTimer: ReturnType<typeof setInterval> | null = null

function startTyping(fullText: string, messageIndex: number) {
  if (typingTimer) clearInterval(typingTimer)
  typingIndex.value = messageIndex
  typingText.value = ''
  let i = 0
  typingTimer = setInterval(() => {
    i++
    typingText.value = fullText.slice(0, i)
    if (i >= fullText.length) {
      clearInterval(typingTimer!)
      typingTimer = null
      typingIndex.value = null
    }
  }, 18)
}

const panelRef = ref<HTMLElement | null>(null)

watch([messages, isThinking, typingText], async () => {
  await nextTick()
  if (panelRef.value) {
    panelRef.value.scrollTop = panelRef.value.scrollHeight
  }
})

async function sendMessage(text: string) {
  if (!text.trim() || isThinking.value) return

  input.value = ''
  messages.value = [...messages.value, { role: 'user', text }]
  isThinking.value = true

  const minDelay = new Promise(resolve => setTimeout(resolve, 1500))

  let reply = ''
  try {
    const history = messages.value.slice(0, -1)
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history }),
    })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    const data = await res.json()
    reply = data.reply || getAnswerForQuestion(text)
  } catch {
    reply = getAnswerForQuestion(text)
  } finally {
    await minDelay
    messages.value = [...messages.value, { role: 'assistant', text: reply }]
    isThinking.value = false
    startTyping(reply, messages.value.length - 1)
  }
}

function handleSubmit(e: Event) {
  e.preventDefault()
  sendMessage(input.value.trim())
}

function openChat() {
  expanded.value = true
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && expanded.value) expanded.value = false
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

// — Pill transition hooks (simple fade + scale)
function onPillEnter(el: Element, done: () => void) {
  gsap.fromTo(el,
    { opacity: 0, scale: 0.92, y: 6 },
    { opacity: 1, scale: 1, y: 0, duration: 0.22, ease: 'power2.out', onComplete: done }
  )
}
function onPillLeave(el: Element, done: () => void) {
  gsap.to(el, { opacity: 0, scale: 0.92, y: 6, duration: 0.15, ease: 'power2.in', onComplete: done })
}

// — Panel transition hooks (slides up from bottom with a controlled spring)
function onPanelEnter(el: Element, done: () => void) {
  gsap.fromTo(el,
    { opacity: 0, y: 24, scale: 0.96 },
    { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: 'back.out(1.4)', onComplete: done }
  )
}
function onPanelLeave(el: Element, done: () => void) {
  gsap.to(el, { opacity: 0, y: 8, duration: 0.16, ease: 'power2.in', onComplete: done })
}
</script>

<template>
  <!-- Each state gets its own fixed container so they overlap during the transition
       instead of sitting side-by-side inside a shared flex parent. -->

  <!-- Collapsed pill -->
  <Transition @enter="onPillEnter" @leave="onPillLeave" :css="false">
    <div v-if="!expanded" class="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 pb-4">
      <button
        @click="openChat"
        class="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-5 py-3 text-sm font-medium text-[var(--color-muted)] shadow-lg hover:text-[var(--color-brand)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] transition-colors"
      >
        <img src="/main-page/timeaAgent.jpg" alt="" aria-hidden="true" class="h-6 w-6 rounded-full object-cover" />
        Get to know Timea
      </button>
    </div>
  </Transition>

  <!-- Expanded panel -->
  <Transition @enter="onPanelEnter" @leave="onPanelLeave" :css="false">
    <div v-if="expanded" class="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 pb-4">
    <div
      class="flex w-full max-w-md flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-xl"
    >
      <!-- Header -->
      <div class="flex items-center gap-3 bg-[var(--color-brand)] px-4 py-3">
        <img
          src="/main-page/timeaAgent.jpg"
          alt=""
          aria-hidden="true"
          class="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[var(--color-primary-text)]"
        />
        <div class="flex flex-col leading-tight">
          <span class="text-base font-semibold text-[var(--color-primary-text)]">TimeaAgent</span>
          <span class="text-sm text-[var(--color-primary-text)] opacity-75">AI assistant · Powered by Gemini</span>
        </div>
        <button
          type="button"
          @click="expanded = false"
          class="ml-auto rounded-full border border-[var(--color-primary-text)] px-3 py-1 text-sm text-[var(--color-primary-text)] hover:bg-[var(--color-primary-text)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-text)]"
          aria-label="Close chat"
        >
          Close
        </button>
      </div>

      <!-- Prompt questions — shown before any messages are sent -->
      <div v-if="messages.length === 0 && !isThinking" class="flex flex-col gap-3 px-4 pt-5 pb-3">
        <p class="text-base font-semibold text-[var(--color-headline)]">Curious about Timea? Start here.</p>
        <button
          v-for="q in PROMPT_QUESTIONS"
          :key="q"
          @click="sendMessage(q)"
          class="rounded-2xl border border-[var(--color-border)] px-4 py-3 text-left text-sm text-[var(--color-headline)] transition-all duration-200 hover:border-[var(--color-brand)] hover:bg-[var(--color-surface)] hover:-translate-y-1 hover:shadow-md"
          style="background-color: #e7dbeb;"
        >
          {{ q }}
        </button>
      </div>

      <!-- Message thread -->
      <div
        v-if="messages.length > 0 || isThinking"
        ref="panelRef"
        class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-2"
        style="max-height: min(40vh, 280px)"
      >
        <template v-for="(m, i) in messages" :key="i">
          <div
            v-if="m.role === 'user'"
            class="ml-auto max-w-[85%] rounded-lg bg-[var(--color-brand)] px-3 py-2 text-sm text-[var(--color-primary-text)]"
          >
            {{ m.text }}
          </div>
          <div
            v-else
            class="mr-auto max-w-[85%] rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-headline)]"
            style="background-color: #e7dbeb;"
          >
            {{ typingIndex === i ? typingText : m.text }}
          </div>
        </template>
        <div v-if="isThinking" class="mr-auto flex items-center gap-0.5 text-xl text-[var(--color-muted)]" aria-hidden="true">
          <span class="timea-agent-dot">.</span>
          <span class="timea-agent-dot">.</span>
          <span class="timea-agent-dot">.</span>
        </div>
      </div>

      <!-- Input -->
      <form
        @submit="handleSubmit"
        class="group flex items-center gap-2 px-2 py-1 mx-2 mb-2 rounded-full border bg-white transition-colors border-[var(--color-border)] focus-within:border-[var(--color-brand)] focus-within:ring-1 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-0"
      >
        <label for="timea-agent-input" class="sr-only">Ask Timea about her work and experience</label>
        <input
          id="timea-agent-input"
          v-model="input"
          type="text"
          placeholder="Type your question..."
          class="min-w-0 flex-1 border-0 bg-transparent px-3 py-1.5 text-sm text-[var(--color-headline)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-0"
          autocomplete="off"
        />
        <button
          type="submit"
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-brand)] transition-colors group-focus-within:bg-[var(--color-brand)] group-focus-within:text-[var(--color-primary-text)] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] disabled:opacity-40 ml-1 mr-[-2px]"
          aria-label="Send message"
          :disabled="!input.trim() || isThinking"
        >
          <IconSend class="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
    </div>
  </Transition>
</template>

<style scoped>

.timea-agent-dot {
  animation: timea-agent-bounce 1.2s ease-in-out infinite;
}
.timea-agent-dot:nth-child(2) { animation-delay: 0.2s; }
.timea-agent-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes timea-agent-bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40%           { transform: translateY(-6px); }
}
</style>
