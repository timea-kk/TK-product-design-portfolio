import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonPrimary from '@/components/ButtonPrimary.vue'

describe('ButtonPrimary', () => {
  it('renders slot content', () => {
    const wrapper = mount(ButtonPrimary, { slots: { default: 'Save' } })
    expect(wrapper.text()).toBe('Save')
  })

  it('is disabled when disabled prop is set', () => {
    const wrapper = mount(ButtonPrimary, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('emits click when clicked', async () => {
    const wrapper = mount(ButtonPrimary)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('applies icon-only padding when iconOnly is set', () => {
    const wrapper = mount(ButtonPrimary, { props: { iconOnly: true } })
    expect(wrapper.classes()).toContain('p-2.5')
  })
})
