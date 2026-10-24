// wechat-typeset 架构边界规则：pnpm guard:arch / pre-commit / CI 共用
// 层级约定：core → domain → infra → ui → app；packages/* 只经 src/public 消费引擎
//   core   只能被依赖，不能依赖任何 src 子目录
//   domain 可依赖 core，暂允许 infra/storage 仓储适配器
//   infra  可依赖 core / domain
//   ui     可依赖 core / domain / infra
//   app    可依赖任意层（编排层）

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [

    // ── 循环依赖（全局禁止）─────────────────────────
    {
      name: 'no-circular',
      severity: 'error',
      comment: '任何循环依赖都不允许',
      from: {},
      to: { circular: true }
    },

    // ── core 是最底层：不依赖任何业务层 ───────────────
    {
      name: 'core-no-domain',
      severity: 'error',
      comment: 'core 不能依赖 domain（依赖倒置）',
      from: { path: '^src/core' },
      to:   { path: '^src/domain' }
    },
    {
      name: 'core-no-infra',
      severity: 'error',
      comment: 'core 是纯管道，不能依赖 infra 副作用层',
      from: { path: '^src/core' },
      to:   { path: '^src/infra' }
    },
    {
      name: 'core-no-ui',
      severity: 'error',
      comment: 'core 不能依赖 ui',
      from: { path: '^src/core' },
      to:   { path: '^src/ui' }
    },
    {
      name: 'core-no-app',
      severity: 'error',
      comment: 'core 不能依赖 app（编排层）',
      from: { path: '^src/core' },
      to:   { path: '^src/app' }
    },

    // storage 适配器仍直接访问 localStorage；这是明确保留的依赖例外，不是无副作用的领域端口。
    {
      name: 'domain-no-infra-effects',
      severity: 'error',
      comment: 'domain 仅允许依赖 infra/storage；文件、剪贴板、分享与导出由 ui/app 编排',
      from: { path: '^src/domain' },
      to:   { path: '^src/infra/', pathNot: '^src/infra/storage/' }
    },
    {
      name: 'domain-no-ui',
      severity: 'error',
      comment: 'domain 不能依赖 ui',
      from: { path: '^src/domain' },
      to:   { path: '^src/ui' }
    },
    {
      name: 'domain-no-app',
      severity: 'error',
      comment: 'domain 不能依赖 app',
      from: { path: '^src/domain' },
      to:   { path: '^src/app' }
    },

    // ── infra：可依赖 core/domain，不能依赖 ui/app ───
    {
      name: 'infra-no-ui',
      severity: 'error',
      comment: 'infra 不能依赖 ui',
      from: { path: '^src/infra' },
      to:   { path: '^src/ui' }
    },
    {
      name: 'infra-no-app',
      severity: 'error',
      comment: 'infra 不能依赖 app',
      from: { path: '^src/infra' },
      to:   { path: '^src/app' }
    },

    // ── ui：可依赖 core/domain/infra，不能依赖 app ───
    {
      name: 'ui-no-app',
      severity: 'error',
      comment: 'ui 不能依赖 app（app 是组装层）',
      from: { path: '^src/ui' },
      to:   { path: '^src/app' }
    },

    // ── 生产代码不能 import 测试代码 ──────────────────
    {
      name: 'no-test-import-in-prod',
      severity: 'error',
      comment: '生产代码不能 import 测试文件',
      from: { pathNot: '\\.(test|spec)\\.[tj]sx?$' },
      to:   { path:    '\\.(test|spec)\\.[tj]sx?$' }
    },
    {
      name: 'src-no-tests-dir',
      severity: 'error',
      comment: 'src/ 下任何文件都不能 import tests/ 下内容',
      from: { path: '^src/' },
      to:   { path: '^tests/' }
    },

    // ── src/public 是对外出口，内部层不得回头依赖 ─────
    {
      name: 'internal-no-public',
      severity: 'error',
      comment: 'core / domain / infra 依赖 src/public 会形成「出口 → 内部 → 出口」的环',
      from: { path: '^src/(core|domain|infra)/' },
      to:   { path: '^src/public/' }
    },

    // ── src 与周边目录的方向 ─────────────────────────
    {
      name: 'src-no-packages',
      severity: 'error',
      comment: 'packages/* 依赖 src；反向依赖会让 npm 包与 CLI/MCP 互相锁死',
      from: { path: '^src/' },
      to:   { path: '^packages/' }
    },
    {
      name: 'src-no-build-tools',
      severity: 'error',
      comment: 'scripts/ 与 tools/ 是构建期工具，进入运行时会把 Node 依赖带进浏览器 bundle',
      from: { path: '^src/' },
      to:   { path: '^(scripts|tools)/' }
    },
    {
      name: 'packages-via-public-api',
      severity: 'error',
      comment: 'packages/* 只能经 src/public 消费引擎，深引用内部模块会绕开 capabilities 契约',
      from: { path: '^packages/' },
      to:   { path: '^src/', pathNot: '^src/public/' }
    },

    // ── 过深相对路径（结构信号）──────────────────────
    // 规则只能匹配解析后的路径，所以用「目标不在源文件曾祖父目录之内」表达「≥ 4 层 ../」。
    // packages/* → src/public 是唯一放行的跨包入口，深度由 packages-via-public-api 管。
    {
      name: 'no-deep-relative',
      severity: 'warn',
      comment: '相对路径向上超过 3 层说明模块边界可能不清晰：改走 @/ 别名或经该层的 index 出口',
      from: { path: '^(.+)/[^/]+/[^/]+/[^/]+/[^/]+$' },
      to:   {
        dependencyTypes: ['local'],
        pathNot: ['^$1/', '^src/public/']
      }
    },

    // ── 禁止依赖 node_modules 内部嵌套路径 ────────────
    {
      name: 'no-internal-node-modules',
      severity: 'warn',
      from: {},
      to:   { path: 'node_modules/.+/node_modules' }
    },
  ],

  options: {
    doNotFollow: {
      path: 'node_modules|\\.d\\.ts$'
    },
    exclude: {
      path: '(^|/)(node_modules|dist|coverage|audit-report|__snapshots__)/|\\.d\\.ts$'
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json'
    },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.vue'],
    },
    reporterOptions: {
      dot: {
        collapsePattern: '^node_modules/[^/]+',
        theme: {
          graph: { rankdir: 'TB', splines: 'ortho' },
          modules: [
            { criteria: { source: '^src/core'   }, attributes: { fillcolor: '#EEEDFE', color: '#7F77DD' } },
            { criteria: { source: '^src/domain' }, attributes: { fillcolor: '#E1F5EE', color: '#1D9E75' } },
            { criteria: { source: '^src/infra'  }, attributes: { fillcolor: '#FAECE7', color: '#D85A30' } },
            { criteria: { source: '^src/ui'     }, attributes: { fillcolor: '#E6F1FB', color: '#378ADD' } },
            { criteria: { source: '^src/app'    }, attributes: { fillcolor: '#F1EFE8', color: '#888780' } },
          ]
        }
      }
    }
  }
}
