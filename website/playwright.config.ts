import { defineConfig } from '@playwright/test'
const port = Number(process.env.PLAYWRIGHT_PORT ?? 8792)
export default defineConfig({
  testDir: './tests',
  testMatch: '**/website.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  use: { baseURL: `http://127.0.0.1:${port}`, browserName: 'chromium', trace: 'retain-on-failure' },
  webServer: {
    cwd: '..',
    command: `npx wrangler dev website/tests/worker.ts --config website/wrangler.jsonc --ip 127.0.0.1 --port ${port} --inspector-port 9233`,
    url: `http://127.0.0.1:${port}/fixture`,
    reuseExistingServer: false,
    timeout: 120000,
    env: { WEBSITE_TEST: 'true' },
  },
})
