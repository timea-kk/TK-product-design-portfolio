import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/visual',
  snapshotPathTemplate: '{testDir}/__snapshots__/{arg}{ext}',
  use: {
    baseURL: 'http://localhost:5175',
    // Disable animations so screenshots are deterministic
    reducedMotion: 'reduce',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5175',
    reuseExistingServer: true,
    timeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
})
