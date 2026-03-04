<!--
  TimeaAgent.vue – Sticky chat widget at the bottom of the page.
  A single rounded input bar that expands into a chat thread when the user sends a message.
  Answers come from the Gemini API (api/chat.js). The "thinking" state shows animated dots
  while waiting; the avatar and name header only appear once a response has arrived.
-->

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { getAnswerForQuestion } from '@/data/timeaAgentKnowledge'

const PLACEHOLDER = 'Ask about my experience, work at Ecosia, or how to reach me'

/** Shape of a single chat message. */
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

/** Ref to the scrollable message list so we can auto-scroll to the latest message. */
const panelRef = ref<HTMLElement | null>(null)

// Scroll to the bottom of the message list whenever messages or thinking state changes
watch([messages, isThinking], async () => {
  await nextTick()
  if (panelRef.value) {
    panelRef.value.scrollTop = panelRef.value.scrollHeight
  }
})

/** Send a message: add it to the thread, show thinking dots, then fetch the reply from Gemini. */
async function handleSubmit(e: Event) {
  e.preventDefault()
  const text = input.value.trim()
  if (!text || isThinking.value) return

  input.value = ''
  messages.value = [...messages.value, { role: 'user', text }]
  expanded.value = true
  isThinking.value = true

  // Fetch the reply and enforce a minimum loading time — both must finish before showing the answer
  const minDelay = new Promise(resolve => setTimeout(resolve, 1500))

  let reply = ''
  try {
    // Send prior messages as history so Gemini has conversation context
    const history = messages.value.slice(0, -1)
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history }),
    })
    const data = await res.json()
    if (data.reply) {
      reply = data.reply
    } else {
      console.error('API error:', data.error)
      reply = getAnswerForQuestion(text)
    }
  } catch {
    reply = getAnswerForQuestion(text)
  } finally {
    await minDelay
    messages.value = [...messages.value, { role: 'assistant', text: reply }]
    isThinking.value = false
    startTyping(reply, messages.value.length - 1)
  }
}
</script>

<template>
  <!-- Fixed bar pinned to the bottom of the viewport; expands into a panel on first message -->
  <div class="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-2 pb-2 md:px-4 md:pb-4">
    <div
      :class="[
        'relative flex w-full max-w-2xl flex-col overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-lg transition-[box-shadow] focus-within:ring-2 focus-within:ring-[var(--color-brand)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--color-surface)]',
        expanded ? 'rounded-3xl' : 'rounded-full',
      ]"
      aria-label="Chat with Timea"
    >
      <!-- Chat header: avatar, name, subtitle, and close — only when expanded -->
      <div
        v-if="expanded"
        class="flex items-center gap-3 bg-[var(--color-brand)] px-4 py-3"
      >
        <img
          src="/timeaAgent.jpg"
          alt=""
          aria-hidden="true"
          class="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-[var(--color-cta-text)]"
        />
        <div class="flex flex-col leading-tight">
          <span class="text-base font-semibold text-[var(--color-cta-text)]">TimeaAgent</span>
          <span class="text-sm text-[var(--color-cta-text)] opacity-75">AI assistant · Powered by Gemini</span>
        </div>
        <button
          type="button"
          @click="expanded = false"
          class="ml-auto rounded-full border border-[var(--color-cta-text)] px-3 py-1 text-sm text-[var(--color-cta-text)] hover:bg-[var(--color-cta-text)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cta-text)]"
          aria-label="Close chat"
        >
          Close
        </button>
      </div>

      <!-- Message thread: visible only when the panel is expanded -->
      <div
        v-if="expanded"
        ref="panelRef"
        class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-2"
        style="max-height: min(40vh, 280px)"
      >
        <template v-for="(m, i) in messages" :key="i">
          <!-- User message -->
          <div
            v-if="m.role === 'user'"
            class="ml-auto max-w-[85%] rounded-lg bg-[var(--color-brand)] px-3 py-2 text-sm text-[var(--color-cta-text)]"
          >
            {{ m.text }}
          </div>

          <!-- Assistant message bubble -->
          <div
            v-else
            class="mr-auto max-w-[85%] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-muted)]"
          >
            {{ typingIndex === i ? typingText : m.text }}
          </div>
        </template>

        <!-- Thinking dots appear while waiting -->
        <div
          v-if="isThinking"
          class="mr-auto flex items-center gap-0.5 text-xl text-[var(--color-muted)]"
          aria-hidden="true"
        >
          <span class="timea-agent-dot">.</span>
          <span class="timea-agent-dot">.</span>
          <span class="timea-agent-dot">.</span>
        </div>
      </div>

      <!-- Input row: always visible; styled as a nested rounded field when the panel is expanded -->
      <form
        @submit="handleSubmit"
        :class="[
          'flex items-center gap-2 p-2',
          expanded ? 'mx-2 mb-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]' : '',
        ]"
      >
<label for="timea-agent-input" class="sr-only">
          Ask Timea about her work and experience
        </label>
        <input
          id="timea-agent-input"
          v-model="input"
          type="text"
          :placeholder="PLACEHOLDER"
          class="min-w-0 flex-1 border-0 bg-transparent px-4 py-2.5 text-sm text-[var(--color-headline)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-0"
          autocomplete="off"
          aria-label="Ask Timea about her work and experience"
        />
        <button
          type="submit"
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-[var(--color-cta-text)] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] disabled:opacity-50"
          aria-label="Send message"
          :disabled="!input.trim() || isThinking"
        >
          <span aria-hidden="true">↑</span>
        </button>
      </form>
    </div>
  </div>
</template>
