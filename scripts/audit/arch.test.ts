// arch.test.ts — 架构约束单测（仅当 ENABLE_TSARCH=true 时由 audit.sh 调用）
//
// 本项目用 vitest 而非 jest；运行方式：
//   npx vitest run scripts/audit/arch.test.ts
//
// 层级约定（见 audit.config.sh / .dep-cruiser.js）：
//   core → domain → infra → ui → app
//
// 默认 ENABLE_TSARCH=false：因为 ts-arch 与 vitest 的整合需要根据项目实际使用情况
// 调整断言风格。本文件提供初版骨架，启用前请先单跑一次确认 API 兼容性。

import { describe, it, expect } from 'vitest'
import { filesOfProject } from 'tsarch'

const allFiles = () => filesOfProject('tsconfig.json')
const filesIn  = (glob: string) => allFiles().withPathMatching(new RegExp(glob))

describe('Architecture constraints', () => {

  // ── core 是最底层 ───────────────────────────────────
  it('core 不能依赖 domain', async () => {
    await expect(filesIn('src/core'))
      .shouldNot.dependOnFiles()
      .withPathMatching(/src\/domain/)
      .check()
  })

  it('core 不能依赖 infra', async () => {
    await expect(filesIn('src/core'))
      .shouldNot.dependOnFiles()
      .withPathMatching(/src\/infra/)
      .check()
  })

  it('core 不能依赖 ui', async () => {
    await expect(filesIn('src/core'))
      .shouldNot.dependOnFiles()
      .withPathMatching(/src\/ui/)
      .check()
  })

  it('core 不能依赖 app', async () => {
    await expect(filesIn('src/core'))
      .shouldNot.dependOnFiles()
      .withPathMatching(/src\/app/)
      .check()
  })

  // ── domain 只能依赖 core ────────────────────────────
  it('domain 不能依赖 infra', async () => {
    await expect(filesIn('src/domain'))
      .shouldNot.dependOnFiles()
      .withPathMatching(/src\/infra/)
      .check()
  })

  it('domain 不能依赖 ui', async () => {
    await expect(filesIn('src/domain'))
      .shouldNot.dependOnFiles()
      .withPathMatching(/src\/ui/)
      .check()
  })

  it('domain 不能依赖 app', async () => {
    await expect(filesIn('src/domain'))
      .shouldNot.dependOnFiles()
      .withPathMatching(/src\/app/)
      .check()
  })

  // ── infra 可依赖 core/domain，不能依赖 ui/app ───────
  it('infra 不能依赖 ui', async () => {
    await expect(filesIn('src/infra'))
      .shouldNot.dependOnFiles()
      .withPathMatching(/src\/ui/)
      .check()
  })

  it('infra 不能依赖 app', async () => {
    await expect(filesIn('src/infra'))
      .shouldNot.dependOnFiles()
      .withPathMatching(/src\/app/)
      .check()
  })

  // ── ui 不能依赖 app（app 是最顶层组装层）────────────
  it('ui 不能依赖 app', async () => {
    await expect(filesIn('src/ui'))
      .shouldNot.dependOnFiles()
      .withPathMatching(/src\/app/)
      .check()
  })

  // ── 全局：禁止循环依赖 ──────────────────────────────
  it('不存在循环依赖', async () => {
    await expect(allFiles())
      .shouldNot.containCycles()
      .check()
  })

  // ── 测试隔离：生产代码不能 import 测试代码 ───────────
  it('src/ 不能 import tests/', async () => {
    await expect(filesIn('src/'))
      .shouldNot.dependOnFiles()
      .withPathMatching(/(^|\/)tests\//)
      .check()
  })
})
