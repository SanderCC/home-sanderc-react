import { defineConfig, devices } from '@playwright/test';

const out = process.env.DEMO_OUT ?? '.demo/latest';
const port = Number(process.env.DEMO_PORT ?? 3100);

export default defineConfig({
  testDir: './e2e-demo',
  outputDir: `${out}/test-results`,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  expect: { timeout: 15_000 },
  reporter: [['list'], ['json', { outputFile: `${out}/report.json` }]],
  use: {
    baseURL: process.env.BASE_URL ?? `http://localhost:${port}`,
    viewport: { width: 1280, height: 720 },
    video: { mode: 'on', size: { width: 1280, height: 720 } },
    screenshot: 'on',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `npm run dev -- -p ${port}`,
        url: `http://localhost:${port}`,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
