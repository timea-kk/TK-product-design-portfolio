/**
 * Component tests for TagPill.vue.
 * Covers: label rendering.
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TagPill from '@/components/TagPill.vue'

describe('TagPill', () => {
  it('renders the label', () => {
    const wrapper = mount(TagPill, { props: { label: 'Design System' } })
    expect(wrapper.text()).toContain('Design System')
  })

  it('renders as a span element', () => {
    const wrapper = mount(TagPill, { props: { label: 'Strategy' } })
    expect(wrapper.element.tagName).toBe('SPAN')
  })
})
