/**
 * Component tests for CardProject.vue.
 * Covers: title rendering, description (optional), image, video (optional), CTA text, tags (optional), mediaPosition, imageTop, vertical, ctaLabel, external links.
 */

import { describe, it, expect, vi, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import CardProject from '@/components/CardProject.vue'

const makeMql = (matches: boolean) => ({
  matches, media: '', onchange: null,
  addListener: vi.fn(), removeListener: vi.fn(),
  addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
})

function mockDesktop() {
  vi.stubGlobal('matchMedia', () => makeMql(true))
}

const BASE_PROPS = {
  title: 'Install Funnel for the Ecosia Browser',
  image: '/project-pages/ecosia-browser/ecosia-browser-1.png',
  imageAlt: 'Ecosia Browser landing page',
  to: '/work/ecosia-browser',
}

describe('CardProject', () => {
  afterEach(() => { vi.unstubAllGlobals() })

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

  it('applies mediaPosition to img style on desktop', async () => {
    mockDesktop()
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, mediaPosition: 'right top' } })
    await nextTick()
    expect(wrapper.find('img').attributes('style')).toContain('right top')
  })

  it('applies mediaPosition to video style on desktop', async () => {
    mockDesktop()
    const wrapper = mount(CardProject, {
      props: { ...BASE_PROPS, video: '/main-page/Lolsumo.mp4', mediaPosition: 'right top' },
    })
    await nextTick()
    expect(wrapper.find('video').attributes('style')).toContain('right top')
  })

  it('defaults object position to top on desktop when mediaPosition is omitted', async () => {
    mockDesktop()
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    await nextTick()
    expect(wrapper.find('img').attributes('style')).toContain('top')
  })

  it('uses center object position on mobile regardless of mediaPosition', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, mediaPosition: 'right top' } })
    expect(wrapper.find('img').attributes('style')).toContain('center')
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

  it('uses flex-col-reverse when imageTop is true', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, imageTop: true } })
    expect(wrapper.html()).toContain('flex-col-reverse')
  })

  it('uses flex-col when imageTop is omitted', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.html()).toContain('flex-col')
    expect(wrapper.html()).not.toContain('flex-col-reverse')
  })

  it('omits lg:flex-row when vertical is true', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, vertical: true } })
    expect(wrapper.html()).not.toContain('lg:flex-row')
  })

  it('includes lg:flex-row when vertical is omitted', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.html()).toContain('lg:flex-row')
  })

  it('renders default CTA label when ctaLabel is omitted', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.text()).toContain('Read case study')
  })

  it('renders custom CTA label when ctaLabel is provided', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, ctaLabel: 'Explore' } })
    expect(wrapper.text()).toContain('Explore')
    expect(wrapper.text()).not.toContain('Read case study')
  })

  it('renders an anchor tag for external URLs', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, to: 'https://example.com' } })
    expect(wrapper.html()).toContain('<a ')
    expect(wrapper.html()).toContain('target="_blank"')
  })

  it('does not render an anchor tag for internal URLs', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.html()).not.toContain('target="_blank"')
  })
})
