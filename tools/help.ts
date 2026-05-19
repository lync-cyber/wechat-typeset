#!/usr/bin/env tsx
/**
 * pnpm 脚本速查。读 package.json + 内嵌 SCRIPT_INFO 描述清单，按用途分组渲染。
 *
 * 用法：
 *   pnpm run help                 分组概览（默认）
 *   pnpm run help <关键字>         过滤名称或描述
 *   pnpm run help --raw           同时打印命令体
 *   pnpm run help --no-color      禁用 ANSI
 *
 * 注：`pnpm help` 会命中 pnpm 自带 help；本脚本必须走 `pnpm run help`。
 * 自检：SCRIPT_INFO 与 package.json.scripts 双向比对，缺漏会在末尾告警。
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const GROUP_ORDER = ['开发', '构建', '测试', '静态检查', '守门', '代码生成', '巡检', '入口', '烟测', '钩子', '发版'] as const
type Group = (typeof GROUP_ORDER)[number]

interface ScriptInfo { group: Group; desc: string }

const SCRIPT_INFO: Record<string, ScriptInfo> = {
  dev:                     { group: '开发',     desc: '启动 vite dev server（前置 samples/references/showcase 预构建）' },
  preview:                 { group: '开发',     desc: 'vite preview 起本地预览（127.0.0.1:7788）' },
  'preview:variant':       { group: '开发',     desc: '单点预览 variant：dump / watch+SSE / list 三档 CLI' },
  help:                    { group: '开发',     desc: '打印本表' },

  build:                   { group: '构建',     desc: '全量闭环：codegen + samples + typecheck + lint + size + schema + smoke' },
  'build:lib':             { group: '构建',     desc: '仅构建发包用 lib bundle + d.ts' },
  'build:samples':         { group: '构建',     desc: '生成 fixture samples → src/domain/samples/' },
  'build:references':      { group: '构建',     desc: '生成 references → src/domain/references/' },
  'build:showcase':        { group: '构建',     desc: '生成主题 showcase HTML 快照' },
  'build:covers':          { group: '构建',     desc: '生成主题封面占位图' },
  'build:capabilities':    { group: '构建',     desc: '生成 api/capabilities.json（外部消费方探嗅）' },
  'build:writer-docs':     { group: '构建',     desc: '生成 writer-docs（--check 仅校验同步）' },
  'build:skill-refs':      { group: '构建',     desc: '生成 skills/_shared/references hard-rules（--check 仅校验）' },

  test:                    { group: '测试',     desc: '单测全量 + e2e fixture verify（CI 默认）' },
  'test:unit':             { group: '测试',     desc: 'vitest 全量单测' },
  'test:unit:fast':        { group: '测试',     desc: '跳过 variant-sanity / rendered-snapshot 等重型矩阵' },
  'test:watch':            { group: '测试',     desc: 'vitest watch 模式' },
  'test:e2e':              { group: '测试',     desc: 'fixture 渲染对照 e2e' },
  'test:e2e:pw':           { group: '测试',     desc: 'Playwright e2e（chromium + webkit）' },
  'test:e2e:pw:install':   { group: '测试',     desc: '装 playwright 浏览器（首次跑 pw 前必跑）' },

  'lint:core':             { group: '静态检查', desc: 'ESLint src/core（--max-warnings 0）' },
  typecheck:               { group: '静态检查', desc: 'vue-tsc 全仓 typecheck' },
  'typecheck:core':        { group: '静态检查', desc: 'tsc src/core（无 Vue SFC 解析，更快）' },

  'check:registry':        { group: '守门',     desc: '校验主题 registry 与 _all.ts 同步' },
  'check:size':            { group: '守门',     desc: '校验 dist bundle 体积在预算内（19 entry）' },
  'check:token-coverage':  { group: '守门',     desc: '校验设计 token 覆盖率' },
  'validate:spec':         { group: '守门',     desc: '按 schema 校验 persona spec' },
  'codegen:sigcontainers': { group: '守门',     desc: '生成 signature container 代码（--check 仅校验）' },

  'gen:schema':            { group: '代码生成', desc: '从 TS 类型生成 persona-spec.schema.json' },
  'gen:gallery':           { group: '代码生成', desc: '生成 variant gallery 索引' },
  'gen:showcase':          { group: '代码生成', desc: '生成 docs/generated/showcase（--check 仅校验同步）' },

  'voice:report':          { group: '巡检',     desc: '主题 voice / 风格画像报告' },
  'variant:usage':         { group: '巡检',     desc: '统计 variant 在 fixture 中的使用面' },

  cli:                     { group: '入口',     desc: '运行 wechat-typeset CLI（packages/cli）' },
  mcp:                     { group: '入口',     desc: '运行 wechat-typeset MCP server（packages/mcp）' },

  'smoke:lib':             { group: '烟测',     desc: '校验发包后的 lib 主入口可被 ESM import' },

  'install:hooks':         { group: '钩子',     desc: '安装 .git/hooks（pre-commit / pre-push 等）' },
  prepare:                 { group: '钩子',     desc: '生命周期：装包时自动装 git hooks' },

  prepublishOnly:          { group: '发版',     desc: '生命周期：npm publish 前跑全量 build' },
}

interface Opts { raw: boolean; color: boolean; filters: string[] }

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function loadScripts(): Record<string, string> {
  const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8')) as { scripts?: Record<string, string> }
  return pkg.scripts ?? {}
}

function parseArgv(argv: string[]): Opts {
  const opts: Opts = {
    raw: false,
    color: Boolean(process.stdout.isTTY) && !process.env.NO_COLOR,
    filters: [],
  }
  for (const a of argv) {
    if (a === '--raw') opts.raw = true
    else if (a === '--no-color') opts.color = false
    else if (a === '--color') opts.color = true
    else if (a === '-h' || a === '--help') { usage(); process.exit(0) }
    else if (a.startsWith('-')) process.stderr.write(`[help] 未知参数 ${a}\n`)
    else opts.filters.push(a)
  }
  return opts
}

function usage(): void {
  process.stdout.write([
    'pnpm run help — 速查项目脚本',
    '',
    '用法：',
    '  pnpm run help                 分组概览',
    '  pnpm run help <关键字> [...]   过滤名称或描述（多关键字 = AND）',
    '  pnpm run help --raw           额外打印命令体',
    '  pnpm run help --no-color      禁用 ANSI 颜色',
    '',
  ].join('\n'))
}

const tint = (s: string, code: string, on: boolean): string => on ? `\x1b[${code}m${s}\x1b[0m` : s

function render(scripts: Record<string, string>, opts: Opts): void {
  const C = (s: string, code: string): string => tint(s, code, opts.color)
  const match = (name: string, desc: string): boolean =>
    opts.filters.length === 0 ||
    opts.filters.every(f =>
      name.toLowerCase().includes(f.toLowerCase()) || desc.toLowerCase().includes(f.toLowerCase()),
    )

  const byGroup: Record<string, string[]> = {}
  const undocumented: string[] = []
  const orphans: string[] = []

  for (const name of Object.keys(scripts)) {
    if (!SCRIPT_INFO[name]) undocumented.push(name)
  }
  for (const [name, info] of Object.entries(SCRIPT_INFO)) {
    if (!scripts[name]) { orphans.push(name); continue }
    ;(byGroup[info.group] ??= []).push(name)
  }

  const visible = Object.entries(SCRIPT_INFO)
    .filter(([n, i]) => scripts[n] && match(n, i.desc))
    .map(([n]) => n)
  const maxName = Math.max(10, ...visible.map(n => n.length))
  const labelW = maxName + 'pnpm '.length + 2

  const out: string[] = []
  out.push(C('wechat-typeset · pnpm 脚本速查', '1;36'))
  out.push('')

  let printed = 0
  for (const g of GROUP_ORDER) {
    const names = (byGroup[g] ?? []).filter(n => match(n, SCRIPT_INFO[n].desc)).sort()
    if (names.length === 0) continue
    out.push('  ' + C(g, '1;33'))
    for (const n of names) {
      const label = `pnpm ${n}`.padEnd(labelW, ' ')
      out.push('    ' + C(label, '32') + C(SCRIPT_INFO[n].desc, '2'))
      if (opts.raw) out.push('      ' + C(scripts[n], '90'))
      printed++
    }
    out.push('')
  }

  if (printed === 0) {
    out.push(C(`没有匹配 "${opts.filters.join(' ')}" 的脚本`, '33'))
    out.push('')
  }

  if (undocumented.length) {
    out.push(C(`[警告] package.json 中以下脚本缺 SCRIPT_INFO 描述：${undocumented.join(', ')}`, '33'))
    out.push('')
  }
  if (orphans.length) {
    out.push(C(`[警告] SCRIPT_INFO 中以下脚本已不在 package.json：${orphans.join(', ')}`, '33'))
    out.push('')
  }

  out.push(C('提示：', '1'))
  out.push('  ' + C('pnpm run help <关键字>', '32') + '   过滤名称或描述')
  out.push('  ' + C('pnpm run help --raw',   '32') + '    额外打印命令体')
  out.push('')

  process.stdout.write(out.join('\n'))
}

render(loadScripts(), parseArgv(process.argv.slice(2)))
