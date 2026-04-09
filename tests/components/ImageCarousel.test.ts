import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ImageCarousel from '@/components/ImageCarousel.vue'

vi.mock('gsap', () => {
  const tl = { to: vi.fn().mockReturnThis(), add: vi.fn((fn: () => void) => { fn(); return tl }) }
  return {
    default: {
      to: vi.fn(),
      set: vi.fn(),
      timeline: vi.fn(() => tl),
    },
  }
})

const IMAGES = ['/img-1.png', '/img-2.png', '/img-3.png']
const ALTS = ['First', 'Second', 'Third']

describe('ImageCarousel', () => {
  it('renders the first image on mount', () => {
    const wrapper = mount(ImageCarousel, { props: { images: IMAGES, alts: ALTS } })
    expect(wrapper.find('img').attributes('src')).toBe('/img-1.png')
    expect(wrapper.find('img').attributes('alt')).toBe('First')
  })

  it('hides prev button on first slide', () => {
    const wrapper = mount(ImageCarousel, { props: { images: IMAGES } })
    const buttons = wrapper.findAll('button')
    expect(buttons.find(b => b.html().includes('←'))).toBeUndefined()
    expect(buttons.find(b => b.html().includes('→'))).toBeDefined()
  })

  it('hides next button on last slide', async () => {
    const wrapper = mount(ImageCarousel, { props: { images: IMAGES } })
    await wrapper.findAll('button').find(b => b.html().includes('→'))!.trigger('click')
    await wrapper.findAll('button').find(b => b.html().includes('→'))!.trigger('click')
    const buttons = wrapper.findAll('button')
    expect(buttons.find(b => b.html().includes('→'))).toBeUndefined()
    expect(buttons.find(b => b.html().includes('←'))).toBeDefined()
  })

  it('navigates forward and back with arrows', async () => {
    const wrapper = mount(ImageCarousel, { props: { images: IMAGES, alts: ALTS } })

    await wrapper.findAll('button').find(b => b.html().includes('→'))!.trigger('click')
    expect(wrapper.find('img').attributes('src')).toBe('/img-2.png')

    await wrapper.findAll('button').find(b => b.html().includes('→'))!.trigger('click')
    expect(wrapper.find('img').attributes('src')).toBe('/img-3.png')

    await wrapper.findAll('button').find(b => b.html().includes('←'))!.trigger('click')
    expect(wrapper.find('img').attributes('src')).toBe('/img-2.png')
  })

  it('works without alts prop', () => {
    const wrapper = mount(ImageCarousel, { props: { images: IMAGES } })
    expect(wrapper.find('img').attributes('alt')).toBe('')
  })

  it('locks aspect ratio on first image load', async () => {
    const wrapper = mount(ImageCarousel, { props: { images: IMAGES } })
    const frontImg = wrapper.findAll('img')[0]
    Object.defineProperty(frontImg.element, 'naturalWidth', { value: 2198, configurable: true })
    Object.defineProperty(frontImg.element, 'naturalHeight', { value: 1713, configurable: true })
    await frontImg.trigger('load')
    const container = wrapper.find('.overflow-hidden')
    expect(container.attributes('style')).toContain('2198 / 1713')
  })

  it('does not overwrite locked ratio on subsequent loads', async () => {
    const wrapper = mount(ImageCarousel, { props: { images: IMAGES } })
    const frontImg = wrapper.findAll('img')[0]
    Object.defineProperty(frontImg.element, 'naturalWidth', { value: 2198, configurable: true })
    Object.defineProperty(frontImg.element, 'naturalHeight', { value: 1713, configurable: true })
    await frontImg.trigger('load')
    Object.defineProperty(frontImg.element, 'naturalWidth', { value: 999, configurable: true })
    Object.defineProperty(frontImg.element, 'naturalHeight', { value: 999, configurable: true })
    await frontImg.trigger('load')
    const container = wrapper.find('.overflow-hidden')
    expect(container.attributes('style')).toContain('2198 / 1713')
  })
})
