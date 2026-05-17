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
 *     重写 src/domain/samples/_generated.ts（其中含 SAMPLE_BUILD_ID 哈希）
 *   ② 监听 src/domain/samples/_generated.ts 自身的变更（hot update）→ 直接 send full-reload，
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
  const GENERATED_TS = resolve(__dirname, 'src', 'domain', 'samples', '_generated.ts')

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
      // 仅 dev 启动时做一次初始打包，避免 _generated.ts 与 src/samples-md 漂移
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
        // 函数形式：除了把第三方按生态成块之外，再把 themes/variants 源码单独成块。
        // 主题资产是独立增长维度（新增主题 / variant 不应反复挤压 app 骨架预算），
        // 拆开后主 bundle 的 size budget 只服务 app 骨架，主题侧自己的 budget 服务主题侧。
        manualChunks(id) {
          const n = id.replace(/\\/g, '/')
          if (n.includes('/src/core/themes/') || n.includes('/src/core/variants/')) {
            return 'themes'
          }
          if (!n.includes('/node_modules/')) return undefined
          // 取**最后一个** /node_modules/ 之后的包名——兼容 pnpm 的
          // `node_modules/.pnpm/<pkg>@<ver>/node_modules/<pkg>` 嵌套；
          // 用第一个 match 会捕获 `.pnpm` 而漏拆 codemirror/juice/markdown。
          const idx = n.lastIndexOf('/node_modules/')
          const after = n.slice(idx + '/node_modules/'.length)
          const m = after.match(/^((?:@[^/]+\/)?[^/]+)/)
          if (!m) return undefined
          const pkg = m[1]
          if (
            pkg === 'codemirror' ||
            pkg.startsWith('@codemirror/') ||
            pkg.startsWith('@lezer/') ||
            pkg.startsWith('@marijn/') ||
            pkg === 'crelt' ||
            pkg === 'style-mod' ||
            pkg === 'w3c-keyname'
          ) {
            return 'codemirror'
          }
          if (pkg.startsWith('markdown-it')) {
            return 'markdown'
          }
          if (
            pkg === 'juice' ||
            pkg.startsWith('cheerio') ||
            pkg.startsWith('parse5') ||
            pkg === 'htmlparser2' ||
            pkg === 'domhandler' ||
            pkg === 'domutils' ||
            pkg === 'dom-serializer' ||
            pkg === 'css-select' ||
            pkg === 'css-what' ||
            pkg === 'nth-check' ||
            pkg === 'boolbase' ||
            pkg === 'mensch' ||
            pkg === 'web-resource-inliner' ||
            pkg === 'slick'
          ) {
            return 'juice'
          }
          return undefined
        },
      },
    },
  },
  test: {
    // 默认 node：jsdom 启动每文件 ~1.5-2s。65 spec 里约一半（含 transitive）拉到
    // src/core/pipeline 的 DOMParser / src/infra/clipboard 的 navigator —— 这些必须
    // 跑 jsdom；其余跑 node。
    //
    // 维护：列表来源 `node scripts/_audit-jsdom.mjs`（按导入闭包内是否触达
    // DOMParser / requestAnimationFrame / document.* / navigator.* 判断）。
    // 新增 spec 后跑一次脚本更新本列表。
    environment: 'node',
    environmentMatchGlobs: [
      ['tests/unit/actions.spec.ts', 'jsdom'],
      ['tests/unit/cli-commands.spec.ts', 'jsdom'],
      ['tests/unit/component-lib.spec.ts', 'jsdom'],
      ['tests/unit/container-api.spec.ts', 'jsdom'],
      ['tests/unit/containers.spec.ts', 'jsdom'],
      ['tests/unit/copyHints.spec.ts', 'jsdom'],
      ['tests/unit/copyHtml.spec.ts', 'jsdom'],
      ['tests/unit/coverPlaceholder.spec.ts', 'jsdom'],
      ['tests/unit/debounce.spec.ts', 'jsdom'],
      ['tests/unit/exportFile.spec.ts', 'jsdom'],
      ['tests/unit/heading-autonumber.spec.ts', 'jsdom'],
      ['tests/unit/imageIntake.spec.ts', 'jsdom'],
      ['tests/unit/inline.spec.ts', 'jsdom'],
      ['tests/unit/inspect.spec.ts', 'jsdom'],
      ['tests/unit/mpInsertHints.spec.ts', 'jsdom'],
      ['tests/unit/outlinkDegrade.spec.ts', 'jsdom'],
      ['tests/unit/page-variants.spec.ts', 'jsdom'],
      ['tests/unit/pipeline.spec.ts', 'jsdom'],
      ['tests/unit/preview.spec.ts', 'jsdom'],
      ['tests/unit/public-api.spec.ts', 'jsdom'],
      ['tests/unit/quota.spec.ts', 'jsdom'],
      ['tests/unit/showcase-generator.spec.ts', 'jsdom'],
      ['tests/unit/theme-capabilities.spec.ts', 'jsdom'],
      ['tests/unit/theme-rendered-snapshot.spec.ts', 'jsdom'],
      ['tests/unit/theme-signature-coverage.spec.ts', 'jsdom'],
      ['tests/unit/themeOrchestrator.spec.ts', 'jsdom'],
      ['tests/unit/themes.spec.ts', 'jsdom'],
      ['tests/unit/tokenSchema.spec.ts', 'jsdom'],
      ['tests/unit/useClipboardCopy.spec.ts', 'jsdom'],
      ['tests/unit/useDraftLifecycle.spec.ts', 'jsdom'],
      ['tests/unit/useExportActions.spec.ts', 'jsdom'],
      ['tests/unit/usePersonaDraft.spec.ts', 'jsdom'],
      ['tests/unit/userVariant-resolve.spec.ts', 'jsdom'],
      ['tests/unit/variant-sanity.spec.ts', 'jsdom'],
      ['tests/unit/variant-sanity-codeblock.spec.ts', 'jsdom'],
      ['tests/unit/variant-sanity-matrix.spec.ts', 'jsdom'],
      ['tests/unit/variant-sanity-matrix-tail.spec.ts', 'jsdom'],
      ['tests/unit/wxPatch.spec.ts', 'jsdom'],
    ],
    // threads + isolate:false：worker 内复用模块缓存，砍掉 collect 阶段的重复 parse。
    // 全局 afterEach（tests/setup.ts）清理 localStorage + state，spec 间不串台。
    pool: 'threads',
    poolOptions: { threads: { isolate: false, useAtomics: true } },
    globals: true,
    // 只抓 tests/unit/；tests/e2e/ 是 Playwright 专属，跑 vitest 会炸
    include: ['tests/unit/**/*.spec.ts'],
    // Node 24+ 的原生退化 localStorage 会影子掉 jsdom 的实现；setup 里强制替换
    setupFiles: ['tests/setup.ts'],
    // 覆盖率聚焦"应用层"：core/pipeline 已被 themes/conformance/variant-sanity 等
    // spec 覆盖良好；这里只盯 app/composable/infra 的回归网，50% lines 是初始门槛。
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/app/**', 'src/ui/composables/**', 'src/infra/**'],
      exclude: ['**/*.d.ts', '**/__snapshots__/**'],
      thresholds: { lines: 50 },
    },
  },
})
