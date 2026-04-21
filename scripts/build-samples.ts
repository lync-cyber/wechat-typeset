#!/usr/bin/env tsx
/**
 * 样稿生成器：docs/samples/sample-{themeId}.md → src/samples/generated.ts
 *
 * 历史：src/samples/*.ts 与 docs/samples/*.md 曾是两套独立硬编码，随容器
 * 增删必须双写、容易漂移。现在 docs/samples 是权威单一来源，本脚本把所有
 * sample-*.md 打包到一个 generated.ts 里，让 src/samples/index.ts 直接消费
 * 静态字符串字典；Vite / tsx / Node 三种运行时都无差别。
 *
 * 映射规则：
 *   docs/samples/sample-{themeId}.md  →  SAMPLE_BY_THEME[themeId]
 *   特殊：sample-full.md 不映射到任何 themeId，只作为 tests/verify-sample-full.ts
 *        的全量回归 fixture；也会导出为 FULL_SAMPLE 便于按需使用。
 *
 * 产物规则：
 *   - generated.ts 是派生文件，纳入 git（像 capabilities.json 一样），
 *     避免开发启动阶段依赖生成器；CI 可额外校验 `npm run build:samples` 后
 *     工作区无 diff。
 *   - 生成内容头部加 `@generated` 标签，便于 IDE / linter 识别。
 *
 * 运行：`npm run build:samples`（也会串进 build 链）
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'

const SAMPLES_DIR = resolve(process.cwd(), 'docs/samples')
const OUT = resolve(process.cwd(), 'src/samples/generated.ts')

const FILE_RE = /^sample-(.+)\.md$/
const FULL_SAMPLE_THEMEID = 'full' // sample-full.md 是专用 fixture，不是主题样本

function buildOutput(): string {
  const entries: Array<[string, string]> = []
  let fullSample: string | undefined

  for (const file of readdirSync(SAMPLES_DIR).sort()) {
    const m = FILE_RE.exec(file)
    if (!m) continue
    const id = m[1]
    const content = readFileSync(resolve(SAMPLES_DIR, file), 'utf8')
    if (id === FULL_SAMPLE_THEMEID) {
      fullSample = content
    } else {
      entries.push([id, content])
    }
  }

  if (!fullSample) {
    throw new Error(
      `[build-samples] docs/samples/sample-full.md 缺失——这是 verify-sample-full 测试的 fixture，必须存在。`,
    )
  }
  if (entries.length === 0) {
    throw new Error(
      `[build-samples] docs/samples/ 下没有 sample-{theme}.md 文件。`,
    )
  }

  const lines: string[] = []
  lines.push(`/* eslint-disable */`)
  lines.push(`// @generated — 由 scripts/build-samples.ts 从 docs/samples/sample-*.md 生成。`)
  lines.push(`// 手工修改会在下一次 \`npm run build:samples\` 被覆盖。`)
  lines.push(``)
  lines.push(`/** 各主题 id 对应的 Markdown 样稿（沿袭 docs/samples 目录）。 */`)
  lines.push(`export const SAMPLE_BY_THEME: Record<string, string> = {`)
  for (const [id, content] of entries) {
    lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(content)},`)
  }
  lines.push(`}`)
  lines.push(``)
  lines.push(`/** 全量容器回归 fixture（对应 docs/samples/sample-full.md）；`)
  lines.push(` *  tests/verify-sample-full.ts 与 scripts/wechat-typeset-cli.ts 消费。 */`)
  lines.push(`export const FULL_SAMPLE: string = ${JSON.stringify(fullSample)}`)
  lines.push(``)
  return lines.join('\n')
}

const output = buildOutput()
writeFileSync(OUT, output, 'utf8')
console.log(`wrote ${OUT} (${output.length} chars)`)
