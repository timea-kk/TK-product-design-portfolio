/**
 * Component tests for CardStat.vue.
 * Covers: label, value, description rendering.
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardStat from '@/components/CardStat.vue'

describe('CardStat', () => {
  it('renders the label', () => {
    const wrapper = mount(CardStat, {
      props: { label: 'Conversion', value: '+20%', description: 'increase' },
    })
    expect(wrapper.text()).toContain('Conversion')
  })

  it('renders the value', () => {
    const wrapper = mount(CardStat, {
      props: { label: 'Conversion', value: '+20%', description: 'increase' },
    })
    expect(wrapper.text()).toContain('+20%')
  })

  it('renders the description', () => {
    const wrapper = mount(CardStat, {
      props: { label: 'Conversion', value: '+20%', description: 'increase' },
    })
    expect(wrapper.text()).toContain('increase')
  })
})
