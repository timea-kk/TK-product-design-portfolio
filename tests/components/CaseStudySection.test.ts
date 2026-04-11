/**
 * Component tests for CaseStudySection.vue.
 * Covers: rendering, label, id, first prop, slot content.
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

  it('applies first variant classes when first prop is set', () => {
    const wrapper = mount(CaseStudySection, {
      props: { id: 'hero', label: 'Hero', first: true },
    })
    expect(wrapper.classes()).toContain('mt-[35px]')
    expect(wrapper.classes()).toContain('space-y-8')
  })

  it('applies standard variant classes when first is not set', () => {
    const wrapper = mount(CaseStudySection, {
      props: { id: 'problem', label: 'The Problem' },
    })
    expect(wrapper.classes()).toContain('space-y-4')
    expect(wrapper.classes()).not.toContain('mt-[35px]')
  })
})
