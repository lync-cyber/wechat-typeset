#!/usr/bin/env tsx
/**
 * 全功能展示生成器：tests/fixtures/all-containers.md → src/domain/samples/_showcase.ts
 *
 * 把端到端测试 fixture 同步包装成"高级用户的全功能展示稿"——所有 base + pack:* +
 * theme:* 容器、所有 variant、所有 inline 扩展集中在一个稿子里。
 *
 * 三档样张定位：
 *   - 故事样张 (sample-{theme}.md)  = 一篇克制的真文章，5 秒判断主题气质
 *   - 组件参考 (_references.ts)     = 按 category 列举本主题启用容器，单点查阅
 *   - 全功能展示 (本脚本产物)       = 一稿到底覆盖全集容器/变体，高级用户全景看
 *
 * 文件流向：
 *   tests/fixtures/all-containers.md  ←—— 单一真源（测试也直接读它）
 *     → scripts/build-showcase.ts      ←—— 本脚本
 *       → src/domain/samples/_showcase.ts  ←—— 派生产物（git 纳入，避免启动期生成）
 *         → src/domain/samples/index.ts: getShowcase()
 *           → src/app/actions.ts: handleLoadShowcase()
 *             → src/ui/components/OverflowMenu.vue: "载入全功能展示" 按钮
 *
 * 为什么源文件留在 tests/fixtures/：测试需要直接读磁盘（避免 _showcase.ts 漂移后
 * 测试还过得去，本脚本指纹保证产物等价于源文件）；UI 走 bundled 字符串无需文件 IO。
 *
 * 运行：`npm run build:showcase`（也会串进 dev / build 链）
 */

import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const SRC = resolve(process.cwd(), 'tests/fixtures/all-containers.md')
const OUT = resolve(process.cwd(), 'src/domain/samples/_showcase.ts')

function build(): string {
  const raw = readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n')

  const buildId = createHash('sha1').update(raw).digest('hex').slice(0, 12)

  const lines: string[] = []
  lines.push(`/* eslint-disable */`)
  lines.push(`// @generated — 由 scripts/build-showcase.ts 从 tests/fixtures/all-containers.md 生成。`)
  lines.push(`// 手工修改会在下一次 \`npm run build:showcase\` 被覆盖。`)
  lines.push(``)
  lines.push(`/** 全功能展示稿：所有 base + pack:* + theme:* 容器、所有 variant 一稿到底。 */`)
  lines.push(`export const SHOWCASE_MARKDOWN: string = ${JSON.stringify(raw)}`)
  lines.push(``)
  lines.push(`/** 展示稿指纹（sha1 截断 12 字）。 */`)
  lines.push(`export const SHOWCASE_BUILD_ID: string = ${JSON.stringify(buildId)}`)
  lines.push(``)
  return lines.join('\n')
}

const output = build()
writeFileSync(OUT, output, 'utf8')
console.log(`wrote ${OUT} (${output.length} chars)`)
