/**
 * 主题签名容器渲染契约
 *
 * 已有 conformance.spec.ts (§E) 守"signatureContainers 声明能找到 renderer 注册"；
 * 本文件加一道更硬的：**真的渲染一次**，断言产物 HTML 含 container-{name} class。
 *
 * 验证链路：spec.signatureContainers → STYLE_KEY_TO_CONTAINER_NAME → vocab.example
 * → render({md, theme}) → html.includes('container-<fence>')
 *
 * 只覆盖**扩展命名空间**（pack:* / theme:*）；base 容器已被 theme-rendered-snapshot
 * 在 BASE_FIXTURE_MD 里渲染过，不重复。spec 中声明的"base 容器签名"由快照守。
 *
 * 拦截能力：主题声称演刊物形态（pack:editorial / theme:data-brief）但 markdown
 * fence 在自家 pipeline 里没注册 → 产物缺 class → 立即红。
 */

import { describe, it, expect, beforeAll } from 'vitest'
import { globSync } from 'node:fs'
import { resolve, basename, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'

import { render } from '../../src/core/pipeline'
import { themeList } from '../../src/core/themes'
import type { PersonaSpec } from '../../src/core/themes/_shared/spec'
import { buildSignatureFixtureMd } from '../helpers/baseFixture'

interface Loaded {
  dir: string
  spec: PersonaSpec
}

const LOADED: Loaded[] = []

beforeAll(async () => {
  const paths = globSync('src/core/themes/*/persona.data.ts', { cwd: process.cwd() })
    .map((p) => resolve(process.cwd(), p))
    .filter((p) => !basename(dirname(p)).startsWith('_'))
    .sort()
  for (const p of paths) {
    const mod = await import(pathToFileURL(p).href)
    const spec = (mod.spec ?? mod.default) as PersonaSpec | undefined
    if (!spec) throw new Error(`No "spec" export in ${p}`)
    LOADED.push({ dir: basename(dirname(p)), spec })
  }
})

describe('signatureContainers · 扩展容器渲染落地', () => {
  for (const theme of themeList) {
    it(`${theme.id}：声明的扩展签名容器全部输出对应 class`, () => {
      const spec = LOADED.find((l) => l.spec.id === theme.id)?.spec
      if (!spec) throw new Error(`fixture missing spec for ${theme.id}`)

      const { md, fenceNames } = buildSignatureFixtureMd(spec)
      if (fenceNames.length === 0) {
        // 无扩展签名（如 default / tech-geek）—— 测试不空跑，断言现状
        expect(md).toBe('')
        return
      }

      const { html } = render({ md, theme })

      const missing = fenceNames.filter((name) => !html.includes(`container-${name}`))
      expect(
        missing,
        `${theme.id} 声明了扩展签名容器但产物缺 class：${missing.join(', ')}\n` +
          `渲染 markdown（前 200 字符）：\n${md.slice(0, 200)}`,
      ).toEqual([])
    })
  }
})
