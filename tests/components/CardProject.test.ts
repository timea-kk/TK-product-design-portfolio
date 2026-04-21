/**
 * Component tests for CardProject.vue.
 * Covers: title rendering, image, CTA text, tags (optional).
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardProject from '@/components/CardProject.vue'

const BASE_PROPS = {
  title: 'Install Funnel for the Ecosia Browser',
  image: '/project-pages/ecosia-browser/ecosia-browser-1.png',
  imageAlt: 'Ecosia Browser landing page',
  to: '/work/ecosia-browser',
}

describe('CardProject', () => {
  it('renders the title', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.find('h2').text()).toContain(BASE_PROPS.title)
  })

  it('renders the image with correct alt text', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    const img = wrapper.find('img')
    expect(img.attributes('alt')).toBe(BASE_PROPS.imageAlt)
    expect(img.attributes('src')).toBe(BASE_PROPS.image)
  })

  it('renders the CTA text', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.text()).toContain('Read case study')
  })

  it('does not render tag pills when tags prop is omitted', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.findAllComponents({ name: 'TagPill' })).toHaveLength(0)
  })

  it('renders a pill for each tag when tags are provided', () => {
    const wrapper = mount(CardProject, {
      props: { ...BASE_PROPS, tags: ['A/B Testing', 'Strategy'] },
    })
    expect(wrapper.findAllComponents({ name: 'TagPill' })).toHaveLength(2)
  })
})
