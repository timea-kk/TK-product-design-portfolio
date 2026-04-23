/**
 * Component tests for Dropdown.vue.
 * Verifies trigger/panel toggle behaviour, outside-click dismissal, exposed close(),
 * and that all ARIA and positioning props are forwarded correctly.
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Dropdown from '@/components/Dropdown.vue'

const SLOT = '<span data-testid="slot">content</span>'

describe('Dropdown', () => {
  it('renders the trigger button with the label text', () => {
    const wrapper = mount(Dropdown, { props: { label: 'Options' } })
    expect(wrapper.find('button').text()).toBe('Options')
  })

  it('does not show the panel by default', () => {
    const wrapper = mount(Dropdown, { props: { label: 'Options' }, slots: { default: SLOT } })
    expect(wrapper.find('[data-testid="slot"]').exists()).toBe(false)
  })

  it('opens the panel when the trigger is clicked', async () => {
    const wrapper = mount(Dropdown, { props: { label: 'Options' }, slots: { default: SLOT } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[data-testid="slot"]').exists()).toBe(true)
  })

  it('toggles the panel closed when the trigger is clicked again', async () => {
    const wrapper = mount(Dropdown, { props: { label: 'Options' }, slots: { default: SLOT } })
    await wrapper.find('button').trigger('click')
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[data-testid="slot"]').exists()).toBe(false)
  })

  it('closes the panel when clicking outside the component', async () => {
    const wrapper = mount(Dropdown, { props: { label: 'Options' }, slots: { default: SLOT }, attachTo: document.body })
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[data-testid="slot"]').exists()).toBe(true)

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="slot"]').exists()).toBe(false)
    wrapper.unmount()
  })

  it('exposes close() which closes an open panel', async () => {
    const wrapper = mount(Dropdown, { props: { label: 'Options' }, slots: { default: SLOT } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[data-testid="slot"]').exists()).toBe(true)

    ;(wrapper.vm as unknown as { close(): void }).close()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="slot"]').exists()).toBe(false)
  })

  it('uses triggerAriaLabel for the button aria-label when provided', () => {
    const wrapper = mount(Dropdown, { props: { label: 'Options', triggerAriaLabel: 'Custom label' } })
    expect(wrapper.find('button').attributes('aria-label')).toBe('Custom label')
  })

  it('falls back to label for button aria-label when triggerAriaLabel is absent', () => {
    const wrapper = mount(Dropdown, { props: { label: 'Options' } })
    expect(wrapper.find('button').attributes('aria-label')).toBe('Options')
  })

  it('defaults aria-haspopup to "true"', () => {
    const wrapper = mount(Dropdown, { props: { label: 'Options' } })
    expect(wrapper.find('button').attributes('aria-haspopup')).toBe('true')
  })

  it('forwards haspopup prop to the trigger button', () => {
    const wrapper = mount(Dropdown, { props: { label: 'Options', haspopup: 'listbox' } })
    expect(wrapper.find('button').attributes('aria-haspopup')).toBe('listbox')
  })

  it('applies a custom panelClass to the panel', async () => {
    const wrapper = mount(Dropdown, { props: { label: 'Options', panelClass: 'left-0 top-full mt-2' }, slots: { default: SLOT } })
    await wrapper.find('button').trigger('click')
    const panel = wrapper.find('[data-testid="slot"]').element.parentElement!
    expect(panel.className).toContain('left-0')
  })

  it('sets role on the panel when panelRole is provided', async () => {
    const wrapper = mount(Dropdown, { props: { label: 'Options', panelRole: 'dialog' }, slots: { default: SLOT } })
    await wrapper.find('button').trigger('click')
    const panel = wrapper.find('[data-testid="slot"]').element.parentElement!
    expect(panel.getAttribute('role')).toBe('dialog')
  })

  it('does not set role on the panel when panelRole is absent', async () => {
    const wrapper = mount(Dropdown, { props: { label: 'Options' }, slots: { default: SLOT } })
    await wrapper.find('button').trigger('click')
    const panel = wrapper.find('[data-testid="slot"]').element.parentElement!
    expect(panel.getAttribute('role')).toBeNull()
  })

  it('sets aria-label on the panel when panelAriaLabel is provided', async () => {
    const wrapper = mount(Dropdown, { props: { label: 'Options', panelAriaLabel: 'Panel options' }, slots: { default: SLOT } })
    await wrapper.find('button').trigger('click')
    const panel = wrapper.find('[data-testid="slot"]').element.parentElement!
    expect(panel.getAttribute('aria-label')).toBe('Panel options')
  })

  it('renders a custom trigger via the #trigger slot and still opens the panel', async () => {
    const wrapper = mount(Dropdown, {
      props: { label: 'Options' },
      slots: {
        trigger: '<button data-testid="custom-trigger" @click="toggle">Custom</button>',
        default: SLOT,
      },
    })
    expect(wrapper.find('[data-testid="custom-trigger"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="slot"]').exists()).toBe(false)
    await wrapper.find('[data-testid="custom-trigger"]').trigger('click')
    expect(wrapper.find('[data-testid="slot"]').exists()).toBe(true)
  })
})
