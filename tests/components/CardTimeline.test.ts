import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardTimeline from '@/components/CardTimeline.vue'

const steps = [
  { label: 'Step one', description: 'First description.' },
  { label: 'Step two', description: 'Second description.' },
  { label: 'Step three', description: 'Third description.' },
]

describe('CardTimeline', () => {
  it('renders all steps', () => {
    const wrapper = mount(CardTimeline, { props: { steps } })
    expect(wrapper.findAll('.rounded-full').length).toBeGreaterThanOrEqual(steps.length)
  })

  it('renders numbered circles from 1 to n', () => {
    const wrapper = mount(CardTimeline, { props: { steps } })
    const circles = wrapper.findAll('.bg-\\[var\\(--color-brand\\)\\]')
    circles.forEach((c, i) => expect(c.text()).toBe(String(i + 1)))
  })

  it('renders each label', () => {
    const wrapper = mount(CardTimeline, { props: { steps } })
    for (const step of steps) {
      expect(wrapper.text()).toContain(step.label)
    }
  })

  it('renders connecting lines between steps', () => {
    const wrapper = mount(CardTimeline, { props: { steps } })
    const lines = wrapper.findAll('.bg-black\\/\\[0\\.08\\]')
    expect(lines).toHaveLength(steps.length - 1)
  })
})
