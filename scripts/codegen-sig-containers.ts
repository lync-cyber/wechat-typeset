#!/usr/bin/env tsx
/**
 * 从 vocabulary.STYLED_CONTAINERS 派生 SUPPORTED_SIGNATURE_CONTAINERS，
 * 写入 `src/core/themes/_shared/spec/signature-containers.generated.ts`。
 *
 * 解决"vocabulary 与 SUPPORTED_SIGNATURE_CONTAINERS 双写"的同步负担：
 * vocabulary 是 ContainerSpec 的 SSoT，签名容器清单本就该派生而非手写。
 *
 * 模式：
 *   - 无参 / `--write`           覆写 generated 文件
 *   - `--check`                  仅校验现有文件与 vocabulary 同步；不同则 exit 1
 *
 * 派生顺序：保持 vocabulary 中 STYLED_CONTAINERS 的出现顺序——它已经被人工分组
 * （structure / admonition / content / data-brief / ...），按此顺序输出最便于阅读。
 *
 * `as const` 字面量保留：generated 文件输出 readonly 字面量数组，下游 `SignatureContainerId`
 * 仍能拿到精确联合类型（不退化为 string）。
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { STYLED_CONTAINERS } from '../src/core/vocabulary/vocabulary'

const OUT = resolve(process.cwd(), 'src/core/themes/_shared/spec/signature-containers.generated.ts')

const HEADER = `/**
 * AUTO-GENERATED · 不要手工编辑。
 *
 * 由 \`scripts/codegen-sig-containers.ts\` 从 vocabulary.STYLED_CONTAINERS 派生。
 * 修改流程：改 vocabulary.ts → 跑 \`pnpm codegen:sigcontainers\` → 提交两份变更。
 *
 * CI \`build\` 步骤会以 \`--check\` 模式校验本文件与 vocabulary 同步，不同则失败。
 */
`

function render(): string {
  const lines = STYLED_CONTAINERS.map((s) => `  '${s.styleKey}',`).join('\n')
  return (
    HEADER +
    '\nexport const SUPPORTED_SIGNATURE_CONTAINERS = [\n' +
    lines +
    '\n] as const\n\nexport type SignatureContainerId = (typeof SUPPORTED_SIGNATURE_CONTAINERS)[number]\n'
  )
}

const expected = render()
const mode = process.argv.includes('--check') ? 'check' : 'write'

if (mode === 'check') {
  let actual = ''
  try {
    actual = readFileSync(OUT, 'utf8')
  } catch {
    console.error(
      `[codegen-sig-containers] ${OUT} 不存在；先跑 \`pnpm codegen:sigcontainers\` 生成它。`,
    )
    process.exit(1)
  }
  if (actual !== expected) {
    console.error(
      `[codegen-sig-containers] generated 文件与 vocabulary 不同步。\n` +
        `修复：\`pnpm codegen:sigcontainers\` 重新生成后提交。`,
    )
    process.exit(1)
  }
  console.log(`[codegen-sig-containers] ok (${STYLED_CONTAINERS.length} entries)`)
} else {
  writeFileSync(OUT, expected, 'utf8')
  console.log(`wrote ${OUT} (${STYLED_CONTAINERS.length} entries)`)
}
