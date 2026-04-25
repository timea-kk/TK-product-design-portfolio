/**
 * Component tests for CardProject.vue.
 * Covers: title rendering, description (optional), image, video (optional), CTA text, tags (optional), mediaPosition.
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

  it('does not render a description paragraph when description prop is omitted', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('renders the description when provided', () => {
    const wrapper = mount(CardProject, {
      props: { ...BASE_PROPS, description: 'A smooth first-time experience.' },
    })
    expect(wrapper.find('p').text()).toBe('A smooth first-time experience.')
  })

  it('renders an img when no video prop is provided', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('video').exists()).toBe(false)
  })

  it('applies zoom transform style to img when zoom prop is provided', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, zoom: 0.05 } })
    const img = wrapper.find('img')
    expect(img.attributes('style')).toContain('scale(1.05)')
  })

  it('renders a video and no img when video prop is provided', () => {
    const wrapper = mount(CardProject, {
      props: { ...BASE_PROPS, video: '/main-page/Lolsumo.mp4' },
    })
    expect(wrapper.find('video').exists()).toBe(true)
    expect(wrapper.find('video').attributes('src')).toBe('/main-page/Lolsumo.mp4')
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('applies zoom transform style to video when zoom and video props are provided', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, video: '/main-page/Lolsumo.mp4', zoom: 0.05 } })
    expect(wrapper.find('video').attributes('style')).toContain('scale(1.05)')
  })

  it('applies mediaPosition to img style', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, mediaPosition: 'right top' } })
    expect(wrapper.find('img').attributes('style')).toContain('right top')
  })

  it('applies mediaPosition to video style', () => {
    const wrapper = mount(CardProject, {
      props: { ...BASE_PROPS, video: '/main-page/Lolsumo.mp4', mediaPosition: 'right top' },
    })
    expect(wrapper.find('video').attributes('style')).toContain('right top')
  })

  it('defaults object position to top when mediaPosition is omitted', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.find('img').attributes('style')).toContain('top')
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
