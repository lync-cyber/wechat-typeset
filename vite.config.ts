import { spawn } from 'node:child_process'
import { resolve, sep } from 'node:path'
import { defineConfig, type Plugin, type ViteDevServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { fileURLToPath, URL } from 'node:url'

// public-path 配置：
//   - 默认 '/'（根域名部署：Vercel / Cloudflare Pages / 自建域名）
//   - 部署到 GitHub Pages 项目页（repo 名为子路径）时设 VITE_BASE=/<repo>/
//   - 需以 '/' 开头与结尾；本地 dev 不读此变量，始终从 '/' 提供
const BASE = process.env.VITE_BASE ?? '/'

/**
 * samplesDevPlugin · dev 模式自动同步样本 → 浏览器
 *
 * 解决的问题：
 *   作者编辑 src/samples-md/sample-*.md 后，浏览器侧仍展示旧 sample（localStorage
 *   草稿缓存的就是旧版本）。原本要手动 `npm run build:samples` + 刷新页面 + 在 UI
 *   上点"载入当前主题示例"才能看到新内容。
 *
 * 这个插件把这条链路打通：
 *   ① 监听 src/samples-md/sample-*.md 变更 → 自动 spawn `tsx scripts/build-samples.ts`
 *     重写 src/samples/generated.ts（其中含 SAMPLE_BUILD_ID 哈希）
 *   ② 监听 src/samples/generated.ts 自身的变更（hot update）→ 直接 send full-reload，
 *     让浏览器整页刷一次。整页刷期间 useDraftLifecycle.initActiveDraft 会比对
 *     localStorage 里存的 SAMPLE_BUILD_ID 与刚加载的新 id，不一致即把活跃草稿
 *     正文重置为该草稿对应主题的最新 sample 内容。
 *
 * 只在 dev / serve 启用；生产构建（vite build）走单次 `build:samples` 即可，不需要
 * watcher。
 */
function samplesDevPlugin(): Plugin {
  let building = false
  let pending = false
  let server: ViteDevServer | undefined
  const SAMPLE_MD_RE = /[\\/]src[\\/]samples-md[\\/]sample-.+\.md$/i
  const GENERATED_TS = resolve(__dirname, 'src', 'samples', 'generated.ts')

  function rebuild() {
    if (building) {
      pending = true
      return
    }
    building = true
    const child = spawn('npx', ['tsx', 'scripts/build-samples.ts'], {
      stdio: 'inherit',
      shell: true,
      cwd: __dirname,
    })
    child.on('exit', (code) => {
      building = false
      if (code !== 0) {
        // eslint-disable-next-line no-console
        console.error(`[samples-dev] build:samples 退出码 ${code}`)
      }
      // generated.ts 更新会触发我们的 handleHotUpdate → full-reload；
      // 这里不主动 send，避免 reload 比 build 输出还早造成竞态。
      if (pending) {
        pending = false
        rebuild()
      }
    })
  }

  return {
    name: 'wechat-typeset:samples-dev',
    apply: 'serve',
    configureServer(devServer) {
      server = devServer
      devServer.watcher.on('change', (path) => {
        if (SAMPLE_MD_RE.test(path)) {
          // eslint-disable-next-line no-console
          console.log(`[samples-dev] ${path.split(sep).slice(-3).join('/')} 变更，重建样本...`)
          rebuild()
        }
      })
    },
    handleHotUpdate({ file, server: hot }) {
      // generated.ts 变更（来自 build:samples 写盘，或作者手动 npm run build:samples）：
      // 不走 HMR 部分模块热更，直接整页刷——因为 SAMPLE_BUILD_ID 比对发生在 mount 时。
      if (resolve(file) === GENERATED_TS) {
        hot.ws.send({ type: 'full-reload' })
        return []
      }
      return undefined
    },
    buildStart() {
      // 仅 dev 启动时做一次初始打包，避免 generated.ts 与 src/samples-md 漂移
      if (server && !building) rebuild()
    },
  }
}

export default defineConfig({
  base: BASE,
  plugins: [
    vue(),
    samplesDevPlugin(),
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
