import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonOutline from '@/components/ButtonOutline.vue'

describe('ButtonOutline', () => {
  it('renders slot content', () => {
    const wrapper = mount(ButtonOutline, { slots: { default: 'Cancel' } })
    expect(wrapper.text()).toBe('Cancel')
  })

  it('is disabled when disabled prop is set', () => {
    const wrapper = mount(ButtonOutline, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('emits click when clicked', async () => {
    const wrapper = mount(ButtonOutline)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('applies icon-only padding when iconOnly is set', () => {
    const wrapper = mount(ButtonOutline, { props: { iconOnly: true } })
    expect(wrapper.classes()).toContain('p-2.5')
  })
})
