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
import {
  containersInPack,
  namespaceOf,
  packOf,
  CONTAINER_VOCABULARY,
} from '../../../vocabulary/vocabulary'
import { buildTheme } from '../buildTheme'
import { commonTemplates } from '../defaultTemplates'
import { renderMotifTemplate, shapeToSvg } from './render-motif'
import type { MotifSpec, PersonaSpec, ThemeCapabilities } from './types'

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
    'editorNoteKickerIcon',
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
 * 自动派生主题 capabilities（spec.capabilities 缺省时使用）。
 *
 * 派生规则（与 isContainerEnabledForTheme 平行，但 capabilities 是显式白名单语义）：
 *   - base pack 容器：始终启用（全主题共享的核心契约）
 *   - pack:* 容器：当该容器 styleKey 出现在 signatureContainers 时启用
 *                  （主题"显式承认"自己想演这套刊物形态）
 *   - theme:<spec.id> 容器：本主题独有命名空间，始终启用
 *
 * 不与 spec.capabilities 合并：调用方显式声明 = 全权接管，避免"我以为是覆盖结果是叠加"的歧义。
 */
function deriveCapabilities(spec: PersonaSpec): ThemeCapabilities {
  const sigSet: ReadonlySet<string> = new Set(spec.signatureContainers ?? [])
  const fenceNames = new Set<string>()

  // base 全集
  for (const c of containersInPack('base')) fenceNames.add(c.name)

  // 主题自家 theme:<id> 全集
  const themePack: `theme:${string}` = `theme:${spec.id}`
  for (const c of containersInPack(themePack)) fenceNames.add(c.name)

  // pack:* 中被本主题签名登记的（按 styleKey 命中）
  for (const c of CONTAINER_VOCABULARY) {
    if (!c.styleKey) continue
    const pack = packOf(c)
    const ns = namespaceOf(pack)
    if (ns !== 'pack') continue
    if (sigSet.has(c.styleKey)) {
      // 借用整个 pack：作者既然签名了 pack:editorial 中的某容器，作者会在该刊物
      // 语境下用得顺手 —— LLM 推荐时一并曝光同 pack 兄弟容器，比"只白名单签名那一个"更友好
      for (const sibling of containersInPack(pack)) fenceNames.add(sibling.name)
    }
  }

  return {
    containers: [...fenceNames].sort(),
    variantOverrides: spec.variants,
    excluded: [],
  }
}

/**
 * PersonaSpec → Theme 的投影函数。内部委托给已扁平化的 buildTheme。
 *
 * 顺序：tokens → assets（由 motifs AST 渲染）→ buildTheme 负责 elements/containers/inline
 * 的属性级深合并 + DEFAULT_VARIANTS 补全。
 *
 * capabilities：spec 未声明时由 deriveCapabilities 派生（让运行时 Theme.capabilities 始终非空，
 * LLM / 推荐 API 不需在调用点再做"未声明则全集"的兜底分支）。
 */
export function specToTheme(spec: PersonaSpec): Theme {
  const tokens = toThemeTokens(spec)
  const assets = motifsToAssets(spec.motifs)
  // commonTemplates 作为隐式基线：spec.templates 覆盖同 key，否则继承。
  // 这样 spec 写"Partial<ThemeTemplates>"就够——通用容器语法来自 infra，不用 LLM 重复。
  const templates = { ...commonTemplates, ...(spec.templates ?? {}) } as ThemeTemplates
  const capabilities = spec.capabilities ?? deriveCapabilities(spec)
  return buildTheme({
    id: spec.id,
    name: spec.name,
    description: spec.description,
    tokens,
    assets,
    elements: spec.elements,
    containers: spec.containers,
    innerStyles: spec.innerStyles,
    inline: spec.inline,
    templates,
    variants: spec.variants,
    kickers: spec.kickers,
    // opts.variant 不透传：会触发 buildAssets 工厂覆盖 motifs 直接渲染的 assets。
    // opts.svgVariant 仅写到 Theme.svgVariant（metadata），供 applyPalette fallback 路径消费。
    svgVariant: spec.svgVariant,
    decorations: spec.decorations,
    capabilities,
  })
}
