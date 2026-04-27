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

  it('includes hover, active, and focus-visible underline classes', () => {
    const wrapper = mount(ButtonPrimary)
    expect(wrapper.html()).toContain('hover:underline')
    expect(wrapper.html()).toContain('active:underline')
    expect(wrapper.html()).toContain('focus-visible:underline')
  })

  it('includes underline when active prop is set', () => {
    const wrapper = mount(ButtonPrimary, { props: { active: true } })
    expect(wrapper.html()).toContain('underline')
  })

  it('renders as span when tag is span', () => {
    const wrapper = mount(ButtonPrimary, { props: { tag: 'span' } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('span')
  })

  it('renders as button by default', () => {
    const wrapper = mount(ButtonPrimary)
    expect(wrapper.element.tagName.toLowerCase()).toBe('button')
  })
})
