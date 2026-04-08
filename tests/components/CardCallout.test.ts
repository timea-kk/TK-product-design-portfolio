import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardCallout from '@/components/CardCallout.vue'

describe('CardCallout', () => {
  it('renders the label', () => {
    const wrapper = mount(CardCallout, { props: { label: 'Key insight' }, slots: { default: '<p>content</p>' } })
    expect(wrapper.text()).toContain('Key insight')
  })

  it('renders slot content when no items prop is provided', () => {
    const wrapper = mount(CardCallout, { props: { label: 'Label' }, slots: { default: '<p>slot content</p>' } })
    expect(wrapper.html()).toContain('slot content')
  })

  it('renders items when items prop is provided', () => {
    const items = [
      { title: 'First', description: 'First desc' },
      { title: 'Second', description: 'Second desc' },
    ]
    const wrapper = mount(CardCallout, { props: { label: 'List', items } })
    expect(wrapper.text()).toContain('First')
    expect(wrapper.text()).toContain('Second desc')
  })

  it('applies divide classes by default when items are provided', () => {
    const items = [{ title: 'A', description: 'B' }]
    const wrapper = mount(CardCallout, { props: { label: 'L', items } })
    expect(wrapper.html()).toContain('divide-y')
  })

  it('omits divide classes when divided is false', () => {
    const items = [{ title: 'A', description: 'B' }]
    const wrapper = mount(CardCallout, { props: { label: 'L', items, divided: false } })
    expect(wrapper.html()).not.toContain('divide-y')
  })
})
