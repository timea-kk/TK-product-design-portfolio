import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InteractiveCard from '@/components/InteractiveCard.vue'

const baseProps = {
  label: 'Step 1',
  title: 'Card title',
  description: 'Card description',
  goal: 'Goal text',
  active: false,
}

describe('InteractiveCard', () => {
  it('renders the label, title, description, and goal', () => {
    const wrapper = mount(InteractiveCard, { props: baseProps })
    expect(wrapper.text()).toContain('Step 1')
    expect(wrapper.text()).toContain('Card title')
    expect(wrapper.text()).toContain('Card description')
    expect(wrapper.text()).toContain('Goal text')
  })

  it('applies active border class when active is true', () => {
    const wrapper = mount(InteractiveCard, { props: { ...baseProps, active: true } })
    expect(wrapper.classes().join(' ')).toContain('border-[var(--color-brand)]')
  })

  it('applies inactive border class when active is false', () => {
    const wrapper = mount(InteractiveCard, { props: baseProps })
    expect(wrapper.classes().join(' ')).toContain('border-black/[0.08]')
  })

  it('emits click when the button is clicked', async () => {
    const wrapper = mount(InteractiveCard, { props: baseProps })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not render an image when image prop is not provided', () => {
    const wrapper = mount(InteractiveCard, { props: baseProps })
    expect(wrapper.find('img').exists()).toBe(false)
  })
})
