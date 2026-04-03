/**
 * Component tests for StickyNote.vue.
 * Covers: rotation, tape dimensions (small prop), square layout, slot content.
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StickyNote from '@/components/StickyNote.vue'

describe('StickyNote', () => {
  it('applies rotation to the root element', () => {
    const wrapper = mount(StickyNote, {
      props: { rotate: -1 },
    })
    expect(wrapper.attributes('style')).toContain('rotate(-1deg)')
  })

  it('renders slot content', () => {
    const wrapper = mount(StickyNote, {
      props: { rotate: 0 },
      slots: { default: '<span>Test note</span>' },
    })
    expect(wrapper.text()).toContain('Test note')
  })

  it('uses standard tape dimensions when small is not set', () => {
    const wrapper = mount(StickyNote, {
      props: { rotate: 1 },
    })
    const tape = wrapper.find('.absolute.z-10')
    expect(tape.attributes('style')).toContain('width: 4rem')
    expect(tape.attributes('style')).toContain('height: 1.6rem')
    expect(tape.attributes('style')).toContain('top: -0.8rem')
  })

  it('uses smaller tape dimensions when small prop is set', () => {
    const wrapper = mount(StickyNote, {
      props: { rotate: 1, small: true },
    })
    const tape = wrapper.find('.absolute.z-10')
    expect(tape.attributes('style')).toContain('width: 3.5rem')
    expect(tape.attributes('style')).toContain('height: 1.4rem')
    expect(tape.attributes('style')).toContain('top: -0.7rem')
  })

  it('applies aspect-square class when square prop is set', () => {
    const wrapper = mount(StickyNote, {
      props: { rotate: -1, square: true },
    })
    const inner = wrapper.find('.flex.flex-col')
    expect(inner.classes()).toContain('aspect-square')
    expect(inner.classes()).toContain('justify-center')
  })

  it('does not apply aspect-square class when square is not set', () => {
    const wrapper = mount(StickyNote, {
      props: { rotate: 1 },
    })
    const inner = wrapper.find('.flex.flex-col')
    expect(inner.classes()).not.toContain('aspect-square')
  })

  it('counter-rotates tape by twice the negative of rotate', () => {
    const wrapper = mount(StickyNote, {
      props: { rotate: 2 },
    })
    const tape = wrapper.find('.absolute.z-10')
    expect(tape.attributes('style')).toContain('rotate(-4deg)')
  })
})
