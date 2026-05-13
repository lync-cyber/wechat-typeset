/**
 * ESLint 配置 —— 范围有意收窄
 *
 * 本项目只把 ESLint 用作"核心层纯化"的校验机：核对 src/core/** 是否守住
 * "框架无关、jsdom-可跑"的边界。其它层（ui/app/infra/domain）的代码风格由
 * vue-tsc + 评审兜底，不在这里管，避免给每次本地开发引入大面积 lint 噪音。
 *
 * 校验内容：
 *   1. core/ 不得 import 任何 vue 相关包（vue 主框架、vue 子路径、@vue/*）
 *   2. core/ 不得引用浏览器专属全局（window / localStorage / fetch 等）
 *      —— DOM 类型（Document / HTMLElement / DOMParser）允许保留，因为 wxPatch
 *         本质就是 HTML 片段处理；Node 侧通过 jsdom 注入这些 API。R7 目标里的
 *         "理论上能 node 跑"指的是后者，不是"零 DOM"。
 *
 * 配套：tsconfig.core.json 在类型层做独立检查（剔除 vite/client、vitest/globals
 * 等构建/测试专属类型），与本配置形成"导入侧 + 类型侧"双闸。
 */
import tseslint from 'typescript-eslint'

const FORBIDDEN_BROWSER_GLOBALS = [
  'window',
  'localStorage',
  'sessionStorage',
  'navigator',
  'location',
  'history',
  'fetch',
  'XMLHttpRequest',
  'alert',
  'confirm',
  'prompt',
  'requestAnimationFrame',
  'cancelAnimationFrame',
]

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'src/domain/samples/_generated.ts'],
  },
  {
    files: ['src/core/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      // 注册 @typescript-eslint 让已有的 eslint-disable 指令（如 no-explicit-any）
      // 能解析到规则定义；本配置不开启这些规则——R7 范围只管隔离，不管代码风格。
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['vue', 'vue/*', '@vue/*'],
              message: 'core/** 必须保持框架无关：禁止导入 vue。需要响应式或组件，请放到 ui/ 或 app/ 层。',
            },
          ],
        },
      ],
      'no-restricted-globals': [
        'error',
        ...FORBIDDEN_BROWSER_GLOBALS.map((name) => ({
          name,
          message: `core/** 禁止引用浏览器全局 \`${name}\`。需要的话，把数据从调用方作为参数传入，或迁移到 infra/ 层。`,
        })),
      ],
    },
  },
)
