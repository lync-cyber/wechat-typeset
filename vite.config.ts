/// <reference types="vitest/config" />
import { spawn } from 'node:child_process'
import { sep } from 'node:path'
import { defineConfig, type Plugin, type ViteDevServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { fileURLToPath, URL } from 'node:url'

// public-path 配置：
//   - 默认 '/'（根域名部署：Vercel / Cloudflare Pages / 自建域名）
//   - 部署到 GitHub Pages 项目页（repo 名为子路径）时设 VITE_BASE=/<repo>/
//   - 需以 '/' 开头与结尾；本地 dev 不读此变量，始终从 '/' 提供
const BASE = process.env.VITE_BASE ?? '/'
const IS_VITEST = process.env.VITEST === 'true'

/**
 * 开发时监听样稿源文件并重建模块。正文由草稿管理负责；更新示例不覆盖已保存的草稿，
 * 作者可通过“载入当前主题示例”显式使用新版内容。
 */
function samplesDevPlugin(): Plugin {
  let building = false
  let pending = false
  let server: ViteDevServer | undefined
  const SAMPLE_MD_RE = /[\\/]src[\\/]samples-md[\\/]sample-.+\.md$/i

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
    buildStart() {
      // 仅 dev 启动时做一次初始打包，避免 _generated.ts 与 src/samples-md 漂移
      if (server && !building) rebuild()
    },
  }
}

/**
 * 导入闭包触达 DOMParser / requestAnimationFrame / document.* / navigator.* 的 spec，必须跑 jsdom。
 * 新增 spec 后跑 `node scripts/_audit-jsdom.mjs`，按其 NEED JSDOM 输出更新本列表。
 */
const JSDOM_SPECS = [
  'tests/unit/authored-markdown.spec.ts',
  'tests/unit/actions.spec.ts',
  'tests/unit/cli-commands.spec.ts',
  'tests/unit/component-lib.spec.ts',
  'tests/unit/container-api.spec.ts',
  'tests/unit/containers.spec.ts',
  'tests/unit/copyHints.spec.ts',
  'tests/unit/copyHtml.spec.ts',
  'tests/unit/coverPlaceholder.spec.ts',
  'tests/unit/debounce.spec.ts',
  'tests/unit/exportFile.spec.ts',
  'tests/unit/heading-autonumber.spec.ts',
  'tests/unit/imageIntake.spec.ts',
  'tests/unit/inline.spec.ts',
  'tests/unit/inspect.spec.ts',
  'tests/unit/mpInsertHints.spec.ts',
  'tests/unit/outlinkDegrade.spec.ts',
  'tests/unit/page-variants.spec.ts',
  'tests/unit/pipeline.spec.ts',
  'tests/unit/preview.spec.ts',
  'tests/unit/public-api.spec.ts',
  'tests/unit/quota.spec.ts',
  'tests/unit/showcase-generator.spec.ts',
  'tests/unit/theme-capabilities.spec.ts',
  'tests/unit/theme-rendered-snapshot.spec.ts',
  'tests/unit/theme-signature-coverage.spec.ts',
  'tests/unit/themeOrchestrator.spec.ts',
  'tests/unit/themes.spec.ts',
  'tests/unit/tokenSchema.spec.ts',
  'tests/unit/useClipboardCopy.spec.ts',
  'tests/unit/useDraftLifecycle.spec.ts',
  'tests/unit/useExportActions.spec.ts',
  'tests/unit/usePersonaDraft.spec.ts',
  'tests/unit/userVariant-resolve.spec.ts',
  'tests/unit/userVariantCustom-render.spec.ts',
  'tests/unit/variant-sanity.spec.ts',
  'tests/unit/variant-sanity-codeblock.spec.ts',
  'tests/unit/variant-sanity-matrix.spec.ts',
  'tests/unit/variant-sanity-matrix-tail.spec.ts',
  'tests/unit/visual-parity.spec.ts',
  'tests/unit/wxPatch.spec.ts',
]

export default defineConfig({
  base: BASE,
  plugins: [
    vue(),
    !IS_VITEST && samplesDevPlugin(),
    // juice 的浏览器入口 juice/client 依赖 cheerio → 需要 node polyfill
    // Node/jsdom 测试必须保留原生 process/Buffer，不能注入浏览器 shim。
    !IS_VITEST && nodePolyfills({
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
    // threads + isolate:false：worker 内复用模块缓存，砍掉 collect 阶段的重复 parse。
    // 全局 afterEach（tests/setup.ts）清理 localStorage + state，spec 间不串台。
    pool: 'threads',
    isolate: false,
    globals: true,
    // 默认 node：jsdom 启动每文件 ~1.5-2s，只有导入闭包触达 DOM API 的 spec 才进 jsdom 项目。
    // 只抓 tests/unit/；tests/e2e/ 是 Playwright 专属，跑 vitest 会炸
    projects: [
      {
        extends: true,
        test: {
          name: 'node',
          environment: 'node',
          include: ['tests/unit/**/*.spec.ts'],
          exclude: ['**/node_modules/**', ...JSDOM_SPECS],
        },
      },
      {
        extends: true,
        test: { name: 'jsdom', environment: 'jsdom', include: JSDOM_SPECS },
      },
    ],
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
