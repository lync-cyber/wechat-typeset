/**
 * specToTheme：PersonaSpec → Theme 的投影函数（spec 分支的包装器）。
 *
 * 分层定位：本文件是 `buildTheme` 工厂的**包装器之一**——负责把 PersonaSpec 翻译为
 * BuildThemeOptions。另一包装器是 `src/color/applyPalette.ts`，走 palette delta 路径。
 * 两者共享同一份 buildTheme（深合并 + DEFAULT_VARIANTS 兜底），接缝只在"输入域不同"。
 *
 * 这是 spec-first 架构的核心：一份 PersonaSpec 通过这条函数产出运行时 Theme，
 * gallery HTML 也从同一份 spec 派生，conformance 测试据此断言 specToTheme(spec) = Theme。
 *
 * 纯函数、无副作用；不做 spec 合法性检查（校验走 validateSpec）。
 */

import type { Theme, ThemeAssets, ThemeTemplates, ThemeTokens } from '../../types'
import { buildTheme } from '../buildTheme'
import { commonTemplates } from '../defaultTemplates'
import { renderMotifTemplate, shapeToSvg } from './render-motif'
import type { MotifSpec, PersonaSpec } from './types'

/** PersonaSpec.palette + status + typography + spacing + radius → ThemeTokens */
function toThemeTokens(spec: PersonaSpec): ThemeTokens {
  return {
    colors: {
      ...spec.palette,
      status: spec.status,
    },
    typography: spec.typography,
    spacing: spec.spacing,
    radius: spec.radius,
  }
}

/** MotifSpec → ThemeAssets（AST 渲染为 SVG 字符串 / 带参模板渲染为函数） */
export function motifsToAssets(motifs: MotifSpec): ThemeAssets {
  const out: ThemeAssets = {}
  // 无参 motifs（MotifShape）
  const shapeKeys: Array<keyof MotifSpec> = [
    'h2Prefix',
    'h3Prefix',
    'dividerFlower',
    'dividerWave',
    'dividerDots',
    'quoteMark',
    'listBullet',
    'sectionCorner',
    'tipIcon',
    'warningIcon',
    'infoIcon',
    'dangerIcon',
    'noteIcon',
    'copyIcon',
    'externalLinkIcon',
    'terminalPrompt',
    'sealMark',
  ]
  for (const k of shapeKeys) {
    const shape = motifs[k]
    if (!shape || !('primitives' in shape)) continue
    ;(out as Record<string, string>)[k] = shapeToSvg(shape)
  }
  // stepBadge: (n: number) => SVG —— 占位符 `{N}`
  if (motifs.stepBadge) {
    const tpl = motifs.stepBadge
    out.stepBadge = (n: number) => renderMotifTemplate(tpl, { N: n })
  }
  // issueStamp: (issue, date, kind) => SVG —— 占位符 `{issue}` `{date}` `{kind}`
  if (motifs.issueStamp) {
    const tpl = motifs.issueStamp
    out.issueStamp = (issue: string, date: string, kind: string) =>
      renderMotifTemplate(tpl, { issue, date, kind })
  }
  return out
}

/**
 * PersonaSpec → Theme 的投影函数。内部委托给已扁平化的 buildTheme。
 *
 * 顺序：tokens → assets（由 motifs AST 渲染）→ buildTheme 负责 elements/containers/inline
 * 的属性级深合并 + DEFAULT_VARIANTS 补全。
 */
export function specToTheme(spec: PersonaSpec): Theme {
  const tokens = toThemeTokens(spec)
  const assets = motifsToAssets(spec.motifs)
  // commonTemplates 作为隐式基线：spec.templates 覆盖同 key，否则继承。
  // 这样 spec 写"Partial<ThemeTemplates>"就够——通用容器语法来自 infra，不用 LLM 重复。
  const templates = { ...commonTemplates, ...(spec.templates ?? {}) } as ThemeTemplates
  return buildTheme({
    id: spec.id,
    name: spec.name,
    description: spec.description,
    tokens,
    assets,
    elements: spec.elements,
    containers: spec.containers,
    inline: spec.inline,
    templates,
    variants: spec.variants,
    behavior: spec.behavior,
  })
}
