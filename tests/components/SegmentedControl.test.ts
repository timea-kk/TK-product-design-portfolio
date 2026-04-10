import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SegmentedControl from '@/components/SegmentedControl.vue'

describe('SegmentedControl', () => {
  const options = ['Light', 'Dark', 'System']

  it('renders a button for each option', () => {
    const wrapper = mount(SegmentedControl, { props: { options, modelValue: 0 } })
    expect(wrapper.findAll('button')).toHaveLength(3)
    expect(wrapper.text()).toContain('Light')
    expect(wrapper.text()).toContain('Dark')
    expect(wrapper.text()).toContain('System')
  })

  it('emits update:modelValue with the clicked index', async () => {
    const wrapper = mount(SegmentedControl, { props: { options, modelValue: 0 } })
    await wrapper.findAll('button')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })

  it('applies active text style to the selected option', () => {
    const wrapper = mount(SegmentedControl, { props: { options, modelValue: 1 } })
    const buttons = wrapper.findAll('button')
    expect(buttons[1].classes()).toContain('text-white')
    expect(buttons[0].classes()).not.toContain('text-white')
  })
})
