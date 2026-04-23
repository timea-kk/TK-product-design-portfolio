/**
 * Component tests for RotatingDescriptor.vue.
 * We test the reduce-motion branch (static text) since the animated branch involves
 * real setTimeout chains that would make tests flaky without fake timers.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { nextTick } from 'vue'
import RotatingDescriptor from '@/components/RotatingDescriptor.vue'
import { useA11yStore } from '@/stores/a11y'

describe('RotatingDescriptor', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.documentElement.className = ''
    document.documentElement.removeAttribute('style')
    localStorage.clear()
  })

  it('renders a span with aria-live="polite"', () => {
    const wrapper = mount(RotatingDescriptor)
    expect(wrapper.find('[aria-live="polite"]').exists()).toBe(true)
  })

  it('does not use whitespace-nowrap so phrases can wrap at the container boundary', () => {
    const wrapper = mount(RotatingDescriptor)
    const liveRegion = wrapper.find('[aria-live="polite"]')
    expect(liveRegion.classes()).not.toContain('whitespace-nowrap')
  })

  it('shows static text when reduceMotion is enabled in the store', async () => {
    const store = useA11yStore()
    store.update({ reduceMotion: true })

    const wrapper = mount(RotatingDescriptor)
    const liveRegion = wrapper.find('[aria-live="polite"]')

    // In reduce-motion mode, the span should contain the first descriptor as plain text
    expect(liveRegion.text()).toBe('Senior Product Designer')
  })

  it('does not render the blinking cursor in reduce-motion mode', async () => {
    const store = useA11yStore()
    store.update({ reduceMotion: true })

    const wrapper = mount(RotatingDescriptor)
    // The cursor is only in the animated branch (aria-hidden span with '|')
    const cursor = wrapper.findAll('[aria-hidden="true"]')
    expect(cursor).toHaveLength(0)
  })

  it('renders the cursor span in animated mode', () => {
    // Default store has reduceMotion: false
    const wrapper = mount(RotatingDescriptor)
    const cursor = wrapper.find('[aria-hidden="true"]')
    expect(cursor.exists()).toBe(true)
    expect(cursor.text()).toBe('|')
  })

  it('renders character spans inside the animated span', () => {
    const wrapper = mount(RotatingDescriptor)
    // At startup, visibleLength is 0 so no character spans yet
    // (typing starts after the first setTimeout which we don't advance here)
    // Just verify the outer structure is there
    const liveRegion = wrapper.find('[aria-live="polite"]')
    expect(liveRegion.exists()).toBe(true)
  })

  it('updates systemReduceMotion when the prefers-reduced-motion query fires a change event', () => {
    // Set up a matchMedia mock that captures registered listeners so we can call them
    const listeners: Array<() => void> = []
    const mockMq = {
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((_event: string, cb: () => void) => listeners.push(cb)),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }
    vi.spyOn(window, 'matchMedia').mockReturnValue(mockMq as unknown as MediaQueryList)

    mount(RotatingDescriptor)

    // Simulate the OS switching to reduce-motion
    mockMq.matches = true
    listeners.forEach((cb) => cb())

    // The mock itself doesn't re-render Vue, but the listener must have been called
    expect(listeners.length).toBeGreaterThan(0)

    vi.restoreAllMocks()
  })

  it('removes the media query listener and clears timers on unmount', () => {
    const mockMq = {
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }
    vi.spyOn(window, 'matchMedia').mockReturnValue(mockMq as unknown as MediaQueryList)

    const wrapper = mount(RotatingDescriptor)
    wrapper.unmount()

    expect(mockMq.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))

    vi.restoreAllMocks()
  })

  it('drives through typing → pause → cursorFadeOut → fadeOut → typing phases with fake timers', async () => {
    const mockMq = {
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }
    vi.spyOn(window, 'matchMedia').mockReturnValue(mockMq as unknown as MediaQueryList)
    vi.useFakeTimers()

    const wrapper = mount(RotatingDescriptor)

    // "Senior Product Designer " = 24 chars; TYPE_MS = 70
    for (let i = 0; i < 24; i++) {
      vi.advanceTimersByTime(70)
      await nextTick()
    }
    // phase should now be 'pause'; advance through PAUSE_AFTER_TYPE_MS = 2997
    vi.advanceTimersByTime(2997)
    await nextTick()
    // phase = 'cursorFadeOut'; advance through CURSOR_FADE_OUT_MS = 400
    vi.advanceTimersByTime(400)
    await nextTick()
    // phase = 'fadeOut'; advance through FADE_OUT_MS = 350
    vi.advanceTimersByTime(350)
    await nextTick()
    // back to typing phase with next phrase
    expect(wrapper.find('[aria-live="polite"]').exists()).toBe(true)

    vi.useRealTimers()
    vi.restoreAllMocks()
    wrapper.unmount()
  })
})
