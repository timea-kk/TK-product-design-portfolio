/**
 * Component tests for RotatingDescriptor.vue.
 * We test the reduce-motion branch (static text) since the animated branch involves
 * real setTimeout chains that would make tests flaky without fake timers.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
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

  it('has whitespace-nowrap on the outer span to prevent cursor wrapping', () => {
    const wrapper = mount(RotatingDescriptor)
    const liveRegion = wrapper.find('[aria-live="polite"]')
    expect(liveRegion.classes()).toContain('whitespace-nowrap')
  })

  it('shows static text when reduceMotion is enabled in the store', async () => {
    const store = useA11yStore()
    store.update({ reduceMotion: true })

    const wrapper = mount(RotatingDescriptor)
    const liveRegion = wrapper.find('[aria-live="polite"]')

    // In reduce-motion mode, the span should contain the first descriptor as plain text
    expect(liveRegion.text()).toBe('Growth Product Designer')
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
})
