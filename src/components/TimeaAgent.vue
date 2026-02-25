<!--
  TimeaAgent.vue – Sticky chat widget at the bottom of the page.
  A single rounded input bar that expands into a chat thread when the user sends a message.
  Answers come from the Gemini API (api/chat.js). The "thinking" state shows animated dots
  while waiting; the avatar and name header only appear once a response has arrived.
-->

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { X } from 'lucide-vue-next'

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

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    })
    const data = await res.json()
    const reply = data.reply || "I'm not sure how to answer that—please email me at work@timea.cc!"
    messages.value = [...messages.value, { role: 'assistant', text: reply }]
  } catch {
    messages.value = [...messages.value, { role: 'assistant', text: "Something went wrong. Please try again or email work@timea.cc." }]
  } finally {
    isThinking.value = false
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
      <!-- Floating close button (only when the panel is expanded) -->
      <button
        v-if="expanded"
        type="button"
        @click="expanded = false"
        class="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-surface-elevated)]/90 text-[var(--color-muted)] shadow-sm backdrop-blur-sm hover:bg-[var(--color-surface)] hover:text-[var(--color-headline)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
        aria-label="Close chat"
      >
        <X class="h-4 w-4" aria-hidden="true" />
      </button>

      <!-- Message thread: visible only when the panel is expanded -->
      <div
        v-if="expanded"
        ref="panelRef"
        class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-12 pb-2"
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

          <!-- Assistant message: avatar + name header above the bubble -->
          <div v-else class="mr-auto flex max-w-[85%] flex-col gap-1.5">
            <div class="flex items-center gap-2">
              <img
                src="/timea.jpeg"
                alt=""
                aria-hidden="true"
                class="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-[var(--color-brand)]"
              />
              <div class="flex flex-col leading-tight">
                <span class="text-xs font-semibold text-[var(--color-headline)]">TimeaAgent</span>
                <span class="text-[10px] text-[var(--color-muted)]">Powered by Gemini</span>
              </div>
            </div>
            <div class="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-muted)]">
              {{ m.text }}
            </div>
          </div>
        </template>

        <!-- Thinking dots appear alone while waiting — no avatar during loading -->
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
