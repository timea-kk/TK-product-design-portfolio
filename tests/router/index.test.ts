/**
 * Tests for src/router/index.ts.
 * Covers: route definitions.
 */

import { describe, it, expect } from 'vitest'
import router from '@/router/index'

describe('router', () => {
  it('includes all expected routes', () => {
    const paths = router.getRoutes().map(r => r.path)
    expect(paths).toContain('/')
    expect(paths).toContain('/work/ecosia-onboarding')
    expect(paths).toContain('/work/ecosia-browser')
    expect(paths).toContain('/work/flora-design-system')
    expect(paths).toContain('/work/lolsumo')
    expect(paths).toContain('/design-system')
  })
})
