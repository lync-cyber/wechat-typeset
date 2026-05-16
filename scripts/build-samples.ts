#!/usr/bin/env tsx
/**
 * 样稿生成器：src/samples-md/sample-{themeId}.md → src/domain/samples/_generated.ts
 *
 * src/samples-md/ 是权威单一来源；本脚本把所有 sample-*.md 打包到一个 _generated.ts
 * 里（下划线前缀明示构建产物），让 src/domain/samples/index.ts 直接消费静态字符串
 * 字典；Vite / tsx / Node 三种运行时都无差别。
 *
 * 映射规则：
 *   src/samples-md/sample-{themeId}.md  →  SAMPLE_BY_THEME[themeId]
 *
 * 全量容器回归 fixture（旧 sample-full.md）已迁出 src/samples-md/，现位于
 * tests/fixtures/all-containers.md。tests/verify-sample-full.ts 直接从磁盘读取，
 * 不再走 _generated.ts —— 这样 fixture 只服务测试，不可能误入用户态预览。
 *
 * 产物规则：
 *   - _generated.ts 是派生文件，纳入 git，避免开发启动阶段依赖生成器；CI 额外
 *     校验 `npm run build:samples` 后工作区无 diff。
 *   - 生成内容头部加 `@generated` 标签，便于 IDE / linter 识别。
 *
 * 运行：`npm run build:samples`（也会串进 build 链）
 */

import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const SAMPLES_DIR = resolve(process.cwd(), 'src/samples-md')
const OUT = resolve(process.cwd(), 'src/domain/samples/_generated.ts')

const FILE_RE = /^sample-(.+)\.md$/

function buildOutput(): string {
  const entries: Array<[string, string]> = []

  for (const file of readdirSync(SAMPLES_DIR).sort()) {
    const m = FILE_RE.exec(file)
    if (!m) continue
    const id = m[1]
    // 统一 LF：Windows 的 CRLF 源文件会让 CodeMirror 在编辑后把 md.value
    // 归一为 LF，导致 App.vue 里"是否 pristine sample"的等值比较永远 false，
    // 切主题时不会自动换 sample。生成器规范化为 LF 是最上游的修复点。
    const content = readFileSync(resolve(SAMPLES_DIR, file), 'utf8').replace(/\r\n/g, '\n')
    entries.push([id, content])
  }

  if (entries.length === 0) {
    throw new Error(
      `[build-samples] src/samples-md/ 下没有 sample-{theme}.md 文件。`,
    )
  }

  // SAMPLE_BUILD_ID：所有样本内容的稳定哈希。
  //   - 输入只依赖 entries，与时间无关 —— 相同样本永远是同一个 id（git 可复现）
  //   - 长度 12 字节 hex 足够区分（碰撞概率 1e-14）
  //   - 用途：dev 模式 useDraftLifecycle 在 init 期间对照 localStorage 存的上次值，
  //     不一致即视为"样本已更新"，把活跃草稿正文重置为当前主题最新 sample。
  const fingerprint = createHash('sha1')
  for (const [id, content] of entries) fingerprint.update(`${id}:${content}\n`)
  const buildId = fingerprint.digest('hex').slice(0, 12)

  const lines: string[] = []
  lines.push(`/* eslint-disable */`)
  lines.push(`// @generated — 由 scripts/build-samples.ts 从 src/samples-md/sample-*.md 生成。`)
  lines.push(`// 手工修改会在下一次 \`npm run build:samples\` 被覆盖。`)
  lines.push(``)
  lines.push(`/** 各主题 id 对应的 Markdown 样稿（沿袭 src/samples-md 目录）。 */`)
  lines.push(`export const SAMPLE_BY_THEME: Record<string, string> = {`)
  for (const [id, content] of entries) {
    lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(content)},`)
  }
  lines.push(`}`)
  lines.push(``)
  lines.push(`/** 样本指纹（sha1 截断 12 字）。dev 模式检测样本重建用，详见 useDraftLifecycle。 */`)
  lines.push(`export const SAMPLE_BUILD_ID: string = ${JSON.stringify(buildId)}`)
  lines.push(``)
  return lines.join('\n')
}

const output = buildOutput()
writeFileSync(OUT, output, 'utf8')
console.log(`wrote ${OUT} (${output.length} chars)`)
