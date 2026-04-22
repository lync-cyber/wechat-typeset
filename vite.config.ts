import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { fileURLToPath, URL } from 'node:url'

// public-path 配置：
//   - 默认 '/'（根域名部署：Vercel / Cloudflare Pages / 自建域名）
//   - 部署到 GitHub Pages 项目页（repo 名为子路径）时设 VITE_BASE=/<repo>/
//   - 需以 '/' 开头与结尾；本地 dev 不读此变量，始终从 '/' 提供
const BASE = process.env.VITE_BASE ?? '/'

export default defineConfig({
  base: BASE,
  plugins: [
    vue(),
    // juice 的浏览器入口 juice/client 依赖 cheerio → 需要 node polyfill
    nodePolyfills({
      include: ['buffer', 'events', 'stream', 'util', 'process'],
      globals: { Buffer: true, process: true },
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // 强制 juice 解析到浏览器入口（避免 Node 主入口引入 fs）
      juice: 'juice/client',
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
  build: {
    target: 'es2022',
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks: {
          'codemirror': ['codemirror', '@codemirror/lang-markdown', '@codemirror/theme-one-dark', '@codemirror/state', '@codemirror/view'],
          'markdown': ['markdown-it', 'markdown-it-container', 'markdown-it-mark', 'markdown-it-ins', 'markdown-it-footnote', 'markdown-it-task-lists'],
          'juice': ['juice'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    // 只抓 tests/unit/；tests/e2e/ 是 Playwright 专属，在 jsdom 下跑会炸
    include: ['tests/unit/**/*.spec.ts'],
    // Node 24+ 的原生退化 localStorage 会影子掉 jsdom 的实现；setup 里强制替换
    setupFiles: ['tests/setup.ts'],
  },
})
