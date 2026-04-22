import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright 端到端配置 —— 专注移动端（375×667）验收。
 *
 * 目录分工：
 *   - `tests/unit/**\/*.spec.ts` —— vitest 在 jsdom 下跑（见 vite.config.ts test.include）
 *   - `tests/e2e/**\/*.spec.ts`  —— Playwright 在真实浏览器下跑（本配置 testDir）
 *   两者共享 tests/helpers / tests/setup.ts 时按需引入，互不越界。
 *
 * webServer：本地与 CI 都用 `npm run dev`（Vite 5.x 开发服），避免先 build 的额外耗时。
 *   真机粘贴验收仍走 docs/release-checklist.md 的手动清单，自动化只覆盖静态交互链路。
 */
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'line' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'on-first-retry',
  },
  // 锁定 375×667（docs/release-checklist.md 移动端验收标准视口，iPhone SE 基线）
  projects: [
    {
      name: 'mobile-chromium',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 375, height: 667 },
      },
    },
    {
      name: 'mobile-webkit',
      use: {
        ...devices['iPhone 13'],
        viewport: { width: 375, height: 667 },
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
