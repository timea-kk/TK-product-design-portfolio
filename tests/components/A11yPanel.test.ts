/**
 * Component tests for A11yPanel.vue.
 * Verifies the dropdown open/close behaviour and that toggling options updates the store.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import A11yPanel from '@/components/A11yPanel.vue'
import { useA11yStore } from '@/stores/a11y'

describe('A11yPanel', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.documentElement.className = ''
    document.documentElement.removeAttribute('style')
    localStorage.clear()
  })

  it('renders a button labelled "Accessibility"', () => {
    const wrapper = mount(A11yPanel)
    expect(wrapper.find('button').text()).toBe('Accessibility')
  })

  it('does not show the panel by default', () => {
    const wrapper = mount(A11yPanel)
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('opens the panel when the button is clicked', async () => {
    const wrapper = mount(A11yPanel)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
  })

  it('shows four option rows in the panel', async () => {
    const wrapper = mount(A11yPanel)
    await wrapper.find('button').trigger('click')
    // Three checkboxes + one select = four controls
    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    const selects = wrapper.findAll('select')
    expect(checkboxes).toHaveLength(3)
    expect(selects).toHaveLength(1)
  })

  it('toggling reduce motion checkbox updates the store', async () => {
    const wrapper = mount(A11yPanel)
    const store = useA11yStore()
    await wrapper.find('button').trigger('click')

    // Find the reduce-motion checkbox and simulate checking it
    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    await checkboxes[0].setValue(true)
    await nextTick()

    expect(store.reduceMotion).toBe(true)
  })

  it('toggling dyslexia checkbox updates the store', async () => {
    const wrapper = mount(A11yPanel)
    const store = useA11yStore()
    await wrapper.find('button').trigger('click')

    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    // dyslexia is the third checkbox (index 2)
    await checkboxes[2].setValue(true)
    await nextTick()

    expect(store.dyslexia).toBe(true)
  })

  it('changing text scale select updates the store', async () => {
    const wrapper = mount(A11yPanel)
    const store = useA11yStore()
    await wrapper.find('button').trigger('click')

    await wrapper.find('select').setValue('1.2')
    await nextTick()

    expect(store.textScale).toBe(1.2)
  })
})
