import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

describe.each(['primary', 'outline'] as const)('Button (variant=%s)', (variant) => {
  it('renders slot content', () => {
    const wrapper = mount(Button, { props: { variant }, slots: { default: 'Save' } })
    expect(wrapper.text()).toBe('Save')
  })

  it('is disabled when disabled prop is set', () => {
    const wrapper = mount(Button, { props: { variant, disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('emits click when clicked', async () => {
    const wrapper = mount(Button, { props: { variant } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('applies icon-only padding when iconOnly is set', () => {
    const wrapper = mount(Button, { props: { variant, iconOnly: true } })
    expect(wrapper.classes()).toContain('p-2.5')
  })

  it('includes hover, active, and focus-visible underline classes', () => {
    const wrapper = mount(Button, { props: { variant } })
    expect(wrapper.html()).toContain('hover:underline')
    expect(wrapper.html()).toContain('active:underline')
    expect(wrapper.html()).toContain('focus-visible:underline')
  })

  it('includes underline when active prop is set', () => {
    const wrapper = mount(Button, { props: { variant, active: true } })
    expect(wrapper.html()).toContain('underline')
  })

  it('renders as span when tag is span', () => {
    const wrapper = mount(Button, { props: { variant, tag: 'span' } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('span')
  })

  it('renders as button by default', () => {
    const wrapper = mount(Button, { props: { variant } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('button')
  })
})

describe('Button variant', () => {
  it('defaults to primary styling', () => {
    const wrapper = mount(Button)
    expect(wrapper.html()).toContain('--color-button-bg-primary')
  })

  it('applies outline styling when variant is outline', () => {
    const wrapper = mount(Button, { props: { variant: 'outline' } })
    expect(wrapper.html()).toContain('--color-button-bg-outline')
    expect(wrapper.html()).toContain('--color-border')
  })
})
