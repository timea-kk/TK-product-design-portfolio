import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CarouselNav from '@/components/CarouselNav.vue'

describe('CarouselNav', () => {
  it('renders step count correctly', () => {
    const wrapper = mount(CarouselNav, { props: { step: 0, total: 5 } })
    expect(wrapper.text()).toContain('1 / 5')
  })

  it('disables prev button on first slide', () => {
    const wrapper = mount(CarouselNav, { props: { step: 0, total: 3 } })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('disabled')).toBeDefined()
  })

  it('disables next button on last slide', () => {
    const wrapper = mount(CarouselNav, { props: { step: 2, total: 3 } })
    const buttons = wrapper.findAll('button')
    expect(buttons[1].attributes('disabled')).toBeDefined()
  })

  it('emits prev when previous button is clicked', async () => {
    const wrapper = mount(CarouselNav, { props: { step: 1, total: 3 } })
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('prev')).toHaveLength(1)
  })

  it('emits next when next button is clicked', async () => {
    const wrapper = mount(CarouselNav, { props: { step: 0, total: 3 } })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('next')).toHaveLength(1)
  })

  it('never disables buttons when infinite is true', () => {
    const first = mount(CarouselNav, { props: { step: 0, total: 4, infinite: true } })
    expect(first.findAll('button')[0].attributes('disabled')).toBeUndefined()

    const last = mount(CarouselNav, { props: { step: 3, total: 4, infinite: true } })
    expect(last.findAll('button')[1].attributes('disabled')).toBeUndefined()
  })
})
