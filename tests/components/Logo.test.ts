/**
 * Component tests for Logo.vue.
 * Verifies the SVG renders correctly and that the parent-supplied class
 * is forwarded to the wrapper span (via inheritAttrs: false + $attrs.class).
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Logo from '@/components/Logo.vue'

describe('Logo', () => {
  it('renders an SVG element', () => {
    const wrapper = mount(Logo)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('marks the wrapper as aria-hidden (decorative)', () => {
    const wrapper = mount(Logo)
    expect(wrapper.find('span').attributes('aria-hidden')).toBe('true')
  })

  it('renders the logo path and dot circle', () => {
    const wrapper = mount(Logo)
    expect(wrapper.find('path').exists()).toBe(true)
    expect(wrapper.find('circle').exists()).toBe(true)
  })

  it('forwards a size class from the parent to the wrapper span', () => {
    const wrapper = mount(Logo, { attrs: { class: 'h-8 w-auto' } })
    expect(wrapper.find('span').classes()).toContain('h-8')
    expect(wrapper.find('span').classes()).toContain('w-auto')
  })
})
