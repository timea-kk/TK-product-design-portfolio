/**
 * Component tests for CardProject.vue.
 * Covers: title rendering, description (optional), image, video (optional), CTA text, tags (optional), mediaPosition, imageTop, vertical, ctaLabel, external links, primaryCta, hideCta, imageRounded, imageOutline, transparent, noHover (cursor-default on text area, cursor-pointer on CTA), external link icon, textMinHeight, wideBreakpoint.
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

  it('renders the external link icon for external URLs', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, to: 'https://example.com' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('does not render the external link icon for internal URLs', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.find('svg').exists()).toBe(false)
  })

  it('does not render an anchor tag for internal URLs', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.html()).not.toContain('target="_blank"')
  })

  it('hides the CTA button when hideCta is true', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, hideCta: true } })
    expect(wrapper.text()).not.toContain('Read case study')
  })

  it('shows the CTA button when hideCta is omitted', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.text()).toContain('Read case study')
  })

  it('applies primary button colors when primaryCta is true', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, primaryCta: true } })
    expect(wrapper.html()).toContain('color-button-bg-primary')
    expect(wrapper.html()).toContain('color-button-text-primary')
  })

  it('applies neutral button colors when primaryCta is omitted', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.html()).toContain('color-button-bg-outline')
    expect(wrapper.html()).toContain('color-button-text-outline')
    expect(wrapper.html()).not.toContain('color-button-bg-primary')
  })

  it('adds rounded image container when imageRounded is true', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, imageRounded: true } })
    expect(wrapper.html()).toContain('rounded-xl')
    expect(wrapper.html()).toContain('p-3')
  })

  it('does not add padding or inner rounding when imageRounded is omitted', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.html()).not.toContain('p-3')
  })

  it('removes background color when transparent is true', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, transparent: true } })
    expect(wrapper.html()).not.toContain('surface-strong')
  })

  it('applies surface-strong background when transparent is omitted', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.html()).toContain('surface-strong')
  })

  it('adds ring outline to image container when imageOutline is true', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, imageOutline: true } })
    expect(wrapper.html()).toContain('ring-2')
    expect(wrapper.html()).toContain('color-deep-maroon-700')
  })

  it('does not add ring outline when imageOutline is omitted', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.html()).not.toContain('ring-1')
  })

  it('uses reduced horizontal padding when imageRounded is true', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, imageRounded: true } })
    expect(wrapper.html()).toContain('px-3')
  })

  it('never renders hover translate or title hover classes regardless of noHover', () => {
    const with_ = mount(CardProject, { props: { ...BASE_PROPS, noHover: true } })
    const without = mount(CardProject, { props: BASE_PROPS })
    for (const wrapper of [with_, without]) {
      expect(wrapper.html()).not.toContain('hover:-translate-y-1')
      expect(wrapper.html()).not.toContain('group-hover/card:underline')
    }
  })

  it('applies cursor-default to text area and cursor-pointer to CTA when noHover is true', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, noHover: true } })
    expect(wrapper.html()).toContain('cursor-default')
    expect(wrapper.html()).toContain('cursor-pointer')
  })

  it('renders outline-variant CTA with hover states when noHover is true', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, noHover: true } })
    expect(wrapper.html()).toContain('hover:text-[var(--color-brand-primary)]')
    expect(wrapper.html()).toContain('hover:underline')
  })

  it('does not apply cursor-default or CTA hover color when noHover is omitted', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.html()).not.toContain('cursor-default')
    expect(wrapper.html()).not.toContain('cursor-pointer')
  })

  it('does not include hover translate or title hover classes when noHover is omitted', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.html()).not.toContain('hover:-translate-y-1')
    expect(wrapper.html()).not.toContain('group-hover/card:underline')
  })

  it('applies custom minHeight style to text area when textMinHeight is set and isLg', async () => {
    vi.stubGlobal('matchMedia', () => makeMql(true))
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, textMinHeight: 320 } })
    await nextTick()
    const textArea = wrapper.find('.flex.flex-col.justify-between')
    expect(textArea.attributes('style')).toContain('min-height: 320px')
  })

  it('applies default 420px minHeight when textMinHeight is omitted and isLg', async () => {
    vi.stubGlobal('matchMedia', () => makeMql(true))
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    await nextTick()
    const textArea = wrapper.find('.flex.flex-col.justify-between')
    expect(textArea.attributes('style')).toContain('min-height: 420px')
  })

  it('uses min-[1440px] layout classes when wideBreakpoint is true', () => {
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, wideBreakpoint: true } })
    expect(wrapper.html()).toContain('min-[1440px]:flex-row')
    expect(wrapper.html()).not.toContain('lg:flex-row')
  })

  it('uses lg layout classes when wideBreakpoint is omitted', () => {
    const wrapper = mount(CardProject, { props: BASE_PROPS })
    expect(wrapper.html()).toContain('lg:flex-row')
    expect(wrapper.html()).not.toContain('min-[1440px]:flex-row')
  })

  it('updates objectPosition when breakpoint changes to lg', async () => {
    const listeners: ((e: MediaQueryListEvent) => void)[] = []
    const mql = { ...makeMql(false), addEventListener: vi.fn((_, cb) => listeners.push(cb)) }
    vi.stubGlobal('matchMedia', () => mql)
    const wrapper = mount(CardProject, { props: { ...BASE_PROPS, mediaPosition: 'right top' } })
    expect(wrapper.find('img').attributes('style')).toContain('center')
    listeners.forEach(cb => cb({ matches: true } as MediaQueryListEvent))
    await nextTick()
    expect(wrapper.find('img').attributes('style')).toContain('right top')
  })
})
