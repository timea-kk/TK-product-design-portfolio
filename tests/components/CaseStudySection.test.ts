/**
 * Component tests for CaseStudySection.vue.
 * Covers: rendering, label, id, slot content.
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CaseStudySection from '@/components/CaseStudySection.vue'

describe('CaseStudySection', () => {
  it('renders the label badge', () => {
    const wrapper = mount(CaseStudySection, {
      props: { id: 'overview', label: 'Overview' },
    })
    expect(wrapper.text()).toContain('Overview')
  })

  it('sets the id attribute on the root element', () => {
    const wrapper = mount(CaseStudySection, {
      props: { id: 'my-section', label: 'Test' },
    })
    expect(wrapper.attributes('id')).toBe('my-section')
  })

  it('renders slot content', () => {
    const wrapper = mount(CaseStudySection, {
      props: { id: 'test', label: 'Test' },
      slots: { default: '<p>Hello world</p>' },
    })
    expect(wrapper.text()).toContain('Hello world')
  })

  it('applies standard spacing classes', () => {
    const wrapper = mount(CaseStudySection, {
      props: { id: 'problem', label: 'The Problem' },
    })
    expect(wrapper.classes()).toContain('space-y-4')
    expect(wrapper.classes()).toContain('sm:py-10')
  })
})
