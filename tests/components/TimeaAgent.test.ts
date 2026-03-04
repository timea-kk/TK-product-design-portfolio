/**
 * Component tests for TimeaAgent.vue.
 * Covers the collapsed/expanded states, form behaviour, message rendering,
 * and the fallback path when the API call fails.
 *
 * fetch is stubbed globally so tests don't make real HTTP calls.
 * vi.useFakeTimers() is used where the 1 500 ms minimum-delay timer must
 * be advanced to observe the assistant's reply appearing.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import TimeaAgent from '@/components/TimeaAgent.vue'

function mockFetch(reply: string) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ reply }),
    }),
  )
}

describe('TimeaAgent', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  // ── Collapsed state ────────────────────────────────────────────────────────

  it('renders the input field', () => {
    const wrapper = mount(TimeaAgent)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  })

  it('renders the send button', () => {
    const wrapper = mount(TimeaAgent)
    expect(wrapper.find('button[aria-label="Send message"]').exists()).toBe(true)
  })

  it('send button is disabled when the input is empty', () => {
    const wrapper = mount(TimeaAgent)
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined()
  })

  it('send button becomes enabled when the input has text', async () => {
    const wrapper = mount(TimeaAgent)
    await wrapper.find('input').setValue('Hello')
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeUndefined()
  })

  it('does not show the chat header before any message is sent', () => {
    const wrapper = mount(TimeaAgent)
    expect(wrapper.find('button[aria-label="Close chat"]').exists()).toBe(false)
  })

  it('does not show the message thread before any message is sent', () => {
    const wrapper = mount(TimeaAgent)
    // No message bubbles visible in the collapsed state
    expect(wrapper.findAll('.rounded-lg').length).toBe(0)
  })

  // ── Submitting a message ───────────────────────────────────────────────────

  it('expands the panel immediately after submission', async () => {
    mockFetch('Hi there!')
    const wrapper = mount(TimeaAgent)
    await wrapper.find('input').setValue('Hello')
    await wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('button[aria-label="Close chat"]').exists()).toBe(true)
  })

  it('adds the user message to the thread immediately', async () => {
    mockFetch('Hi there!')
    const wrapper = mount(TimeaAgent)
    await wrapper.find('input').setValue('Tell me about Ecosia')
    await wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('Tell me about Ecosia')
  })

  it('clears the input after submission', async () => {
    mockFetch('Hi there!')
    const wrapper = mount(TimeaAgent)
    await wrapper.find('input').setValue('Hello')
    await wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')
  })

  it('shows the thinking dots while waiting for a reply', async () => {
    vi.useFakeTimers()
    mockFetch('Hi there!')
    const wrapper = mount(TimeaAgent)
    await wrapper.find('input').setValue('Hello')
    await wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.timea-agent-dot').exists()).toBe(true)
  })

  it('shows the assistant reply after the minimum delay elapses', async () => {
    vi.useFakeTimers()
    mockFetch('I worked at Ecosia.')
    const wrapper = mount(TimeaAgent)
    await wrapper.find('input').setValue('Where did you work?')
    await wrapper.find('form').trigger('submit')
    // Let fetch resolve, then advance past the 1 500 ms minimum delay,
    // then past the typewriter animation (18 ms × reply length)
    await flushPromises()
    await vi.advanceTimersByTimeAsync(1500)
    await flushPromises()
    await vi.advanceTimersByTimeAsync(500) // covers typing animation
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('I worked at Ecosia.')
  })

  it('hides the thinking dots after the reply arrives', async () => {
    vi.useFakeTimers()
    mockFetch('Done!')
    const wrapper = mount(TimeaAgent)
    await wrapper.find('input').setValue('Hello')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    await vi.advanceTimersByTimeAsync(1500)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.timea-agent-dot').exists()).toBe(false)
  })

  it('falls back to local knowledge when the API returns no reply', async () => {
    vi.useFakeTimers()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ error: 'unavailable' }),
      }),
    )
    const wrapper = mount(TimeaAgent)
    await wrapper.find('input').setValue('What is your name?')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    await vi.advanceTimersByTimeAsync(1500)
    await wrapper.vm.$nextTick()
    // A fallback reply (non-empty string from getAnswerForQuestion) must appear
    const bubbles = wrapper.findAll('.rounded-lg')
    expect(bubbles.some((b) => b.text().length > 0)).toBe(true)
  })

  it('falls back to local knowledge when fetch throws', async () => {
    vi.useFakeTimers()
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
    const wrapper = mount(TimeaAgent)
    await wrapper.find('input').setValue('Who are you?')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    await vi.advanceTimersByTimeAsync(1500)
    await wrapper.vm.$nextTick()
    const bubbles = wrapper.findAll('.rounded-lg')
    expect(bubbles.some((b) => b.text().length > 0)).toBe(true)
  })

  // ── Collapsing the panel ───────────────────────────────────────────────────

  it('collapses the panel when the Close button is clicked', async () => {
    mockFetch('Hi!')
    const wrapper = mount(TimeaAgent)
    await wrapper.find('input').setValue('Hello')
    await wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()

    await wrapper.find('button[aria-label="Close chat"]').trigger('click')
    expect(wrapper.find('button[aria-label="Close chat"]').exists()).toBe(false)
  })

  it('does not submit while a reply is already loading', async () => {
    vi.useFakeTimers()
    const fetchSpy = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ reply: 'hello' }),
    })
    vi.stubGlobal('fetch', fetchSpy)

    const wrapper = mount(TimeaAgent)
    await wrapper.find('input').setValue('First')
    await wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()

    // Attempt second submission while still loading
    await wrapper.find('input').setValue('Second')
    await wrapper.find('form').trigger('submit')

    // fetch should only have been called once
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })
})
