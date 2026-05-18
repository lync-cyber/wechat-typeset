// .dep-cruiser.js — wechat-typeset 架构边界规则
// 层级约定（见 audit.config.sh）：core → domain → infra → ui → app
//   core   只能被依赖，不能依赖任何 src 子目录
//   domain 可依赖 core
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

    // ── domain：可依赖 core 与 infra/storage（仓储抽象），禁止依赖副作用层（clipboard / share / exporters）与 ui/app ───
    //
    // 设计：infra/storage 是 repository pattern 的实现层——纯函数 CRUD（createUserComponent /
    // listDrafts 等），接口稳定，把它视为 domain 的数据访问端口。其他 infra 子模块（剪贴板写、
    // 文件分享、图片导出）才是真正的浏览器副作用，domain 不应直接触发，得让 ui/app 编排。
    {
      name: 'domain-no-infra-effects',
      severity: 'error',
      comment: 'domain 不应直接依赖 infra 的副作用层（clipboard / share / exporters）；如需通过 ui/app 编排',
      from: { path: '^src/domain' },
      to:   { path: '^src/infra/(clipboard|share|exporters)' }
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

    // ── 过深相对路径（结构信号）──────────────────────
    {
      name: 'no-deep-relative',
      severity: 'warn',
      comment: '超过 3 层的相对路径 import 说明模块边界可能不清晰',
      from: {},
      to:   { path: '^\\.\\.[\\/]\\.\\.[\\/]\\.\\.' }
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
      path: 'node_modules|dist|build|coverage|audit-report|\\.d\\.ts$'
    },
    exclude: {
      path: 'node_modules|dist|build|coverage|audit-report|\\.d\\.ts$|__snapshots__'
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
