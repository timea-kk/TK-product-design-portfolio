import { test, expect } from '@playwright/test'

test('home hero', async ({ page }) => {
  await page.goto('/')
  // Wait for typewriter animation to start and fonts to load
  await page.waitForLoadState('networkidle')
  await expect(page).toHaveScreenshot('home-hero.png', {
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  })
})

test('home full page', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await expect(page).toHaveScreenshot('home-full.png', { fullPage: true })
})
