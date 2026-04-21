/**
 * 主题工厂：给 tokens 就能得到完整 Theme。
 *
 * API 形态（Phase 0 扁平化后）：
 *   - elements / containers / inline / assets 四个**深合并**样式字段
 *   - pre / code / elementOverrides / elementPatches 等双模式字段已移除
 *   - "整段重置某一 key" 极少场景用 sentinel：`elements: { h1: { __reset: true, ... } }`
 *
 * 深合并语义（element/container/inline 三者一致）：
 *   patch[key] 不存在 → 保留 base[key] 原样
 *   patch[key] 存在 → 默认"属性级合并"：{ ...base[key], ...patch[key] }
 *   patch[key].__reset === true → 切换为"整段替换"：仅保留 patch[key] 自身的属性
 *
 * assets 是扁平 key → string/function 的映射，无嵌套 CSS，故走浅合并即可。
 */

import type {
  CSSObject,
  Theme,
  ThemeAssets,
  ThemeBehavior,
  ThemeContainers,
  ThemeElements,
  ThemeInline,
  ThemeTemplates,
  ThemeTokens,
  ThemeVariants,
} from '../types'
import { DEFAULT_VARIANTS } from '../types'
import { buildAssets, type SvgVariant } from './svgAssets'

/**
 * 单 key 样式补丁值：宽于 CSSObject 以容纳 `__reset: true` sentinel。
 * 非 `__reset` key 的值仍应是 `string | number`；类型由消费方通过 CSSObject 收窄。
 */
export type CSSObjectPatch = { __reset?: true; [prop: string]: string | number | true | undefined }

/**
 * 样式补丁类型：每个 key 是 CSSObjectPatch，可选追加 `__reset: true` 触发整段替换。
 * 运行时从对象上剥离 `__reset` 再做合并。
 */
export type StylePatch<T> = {
  [K in keyof T]?: CSSObjectPatch
}

export interface BuildThemeOptions {
  id: string
  name: string
  description: string
  author?: string
  preview?: string
  tokens: ThemeTokens
  /**
   * 参数化 SVG 工厂变体。缺省 `geometric`。
   * `assets` 字段（如提供）在工厂产物上做浅合并。
   */
  variant?: SvgVariant
  /**
   * 元素级样式：属性级深合并到 baseElements(tokens) 之上。
   * `__reset: true` sentinel 可在某 key 上切换为整段替换。
   * 包含 pre / code（v1 的顶层 pre/code 字段已并入此处）。
   */
  elements?: StylePatch<ThemeElements>
  /** 容器级样式（同 elements 语义） */
  containers?: StylePatch<ThemeContainers>
  /** 内联级样式（同 elements 语义） */
  inline?: StylePatch<ThemeInline>
  /**
   * SVG 资产补丁：与工厂产物（buildAssets({variant})）做浅合并。
   * ThemeAssets 是扁平 string/function，无需深合并。
   */
  assets?: Partial<ThemeAssets>
  /** 模板片段（封面卡 / 作者栏 / CTA / 推荐） */
  templates?: ThemeTemplates
  /**
   * 骨架变体。未声明时用 DEFAULT_VARIANTS。
   * Partial 支持"只换一项骨架" —— 比如某主题想 admonition 走 terminal、其余默认。
   */
  variants?: Partial<ThemeVariants>
  /**
   * 渲染器级行为开关。仅 people-story 家族使用（introDropcap + h2RomanNumerals）。
   */
  behavior?: ThemeBehavior
}

export function baseElements(tokens: ThemeTokens): ThemeElements {
  const { colors, typography } = tokens
  return {
    h1: {
      'font-size': `${typography.h1Size}px`,
      'font-weight': '700',
      color: colors.text,
      'margin-top': '28px',
      'margin-bottom': '16px',
      'line-height': '1.4',
    },
    h2: {
      'font-size': `${typography.h2Size}px`,
      'font-weight': '700',
      color: colors.text,
      'margin-top': '28px',
      'margin-bottom': '14px',
      'line-height': '1.4',
      'padding-bottom': '6px',
      'border-bottom': `2px solid ${colors.primary}`,
    },
    h3: {
      'font-size': `${typography.h3Size}px`,
      'font-weight': '700',
      color: colors.text,
      'margin-top': '22px',
      'margin-bottom': '10px',
      'line-height': '1.5',
    },
    // h4 介于 h3 和 p 之间，默认不带装饰、只靠字重拉开。
    // 教程向主题（tech-explainer）会覆盖为主色 + 600 字重的"Step 小标题"。
    h4: {
      'font-size': `${typography.baseSize + 1}px`,
      'font-weight': '600',
      color: colors.text,
      'margin-top': '18px',
      'margin-bottom': '8px',
      'line-height': '1.5',
    },
    p: {
      'font-size': `${typography.baseSize}px`,
      'line-height': String(typography.lineHeight),
      color: colors.text,
      'margin-top': '0',
      'margin-bottom': '18px',
      'letter-spacing': `${typography.letterSpacing}px`,
    },
    blockquote: {
      'border-left': `4px solid ${colors.primary}`,
      'background-color': colors.bgSoft,
      color: colors.textMuted,
      'padding-top': '12px',
      'padding-right': '16px',
      'padding-bottom': '12px',
      'padding-left': '16px',
      'margin-top': '0',
      'margin-bottom': '18px',
      'border-radius': '4px',
    },
    ul: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '18px' },
    ol: { 'padding-left': '24px', 'margin-top': '0', 'margin-bottom': '18px' },
    li: {
      'margin-bottom': '8px',
      'line-height': String(typography.lineHeight),
      color: colors.text,
    },
    code: {
      'background-color': colors.bgMuted,
      color: colors.code,
      padding: '2px 6px',
      'border-radius': '3px',
      'font-size': '14px',
    },
    // 键帽：不对称边框（底边 2px 比其他三边 1px 更深）模拟微小立体感。
    // 微信粘贴剥 box-shadow，只能这样"借边框"实现键帽感。
    kbd: {
      display: 'inline-block',
      'background-color': colors.bgSoft,
      color: colors.text,
      border: `1px solid ${colors.border}`,
      'border-bottom-width': '2px',
      'border-radius': '3px',
      padding: '1px 6px',
      'font-size': '12px',
      'line-height': '1.4',
      'vertical-align': 'middle',
    },
    pre: {
      'background-color': '#282c34',
      color: '#abb2bf',
      'padding-top': '14px',
      'padding-right': '16px',
      'padding-bottom': '14px',
      'padding-left': '16px',
      'border-radius': '6px',
      // 代码块走"横向滚动"而非"强制换行"：
      //   - white-space:pre 保留原始换行，长行不折
      //   - max-width:100% + overflow-x:auto → 超宽时出现横向滑条
      //   WeChat 移动端实测 <pre> 的 overflow-x:auto 会启用原生触摸横滑（同 doocs/md 等）
      //   避免 break-all 把标识符 / 模板字符串在任意字符处剖开
      'overflow-x': 'auto',
      'white-space': 'pre',
      'max-width': '100%',
      'box-sizing': 'border-box',
      // 右侧内阴影：微信移动端 <pre> 横滑没有可见滚动条，用户不知道能滑；
      // inset box-shadow 在暗/亮底色上都能看见，被 border-radius 自然裁圆，
      // 相比 `background-attachment: local` 技巧在微信端稳定得多。
      'box-shadow': 'inset -14px 0 10px -10px rgba(0,0,0,0.28)',
      'margin-top': '0',
      'margin-bottom': '20px',
      'font-size': '13px',
      'line-height': '1.6',
    },
    img: {
      'max-width': '100%',
      display: 'block',
      'margin-top': '10px',
      'margin-right': 'auto',
      'margin-bottom': '10px',
      'margin-left': 'auto',
      'border-radius': '6px',
    },
    a: { color: colors.primary, 'text-decoration': 'underline' },
    hr: {
      border: 'none',
      height: '1px',
      'background-color': colors.border,
      'margin-top': '24px',
      'margin-bottom': '24px',
    },
    table: {
      'border-collapse': 'collapse',
      width: '100%',
      'margin-top': '0',
      'margin-bottom': '18px',
      'font-size': '14px',
    },
    strong: { 'font-weight': '700', color: colors.text },
    em: { 'font-style': 'italic', color: colors.text },
  }
}

export function baseContainers(tokens: ThemeTokens): ThemeContainers {
  return {
    intro: {
      'background-color': tokens.colors.bgSoft,
      'border-radius': '6px',
      padding: '14px 16px',
      margin: '16px 0',
      color: tokens.colors.textMuted,
    },
    author: {
      'background-color': tokens.colors.bgSoft,
      'border-radius': '6px',
      padding: '12px 14px',
      margin: '16px 0',
    },
    cover: { margin: '16px 0' },
    tip: {},
    warning: {},
    info: {},
    danger: {},
    quoteCard: {
      'background-color': tokens.colors.bgSoft,
      padding: '18px 16px',
      margin: '20px 0',
      'border-radius': '8px',
    },
    highlight: {
      'background-color': tokens.colors.bgMuted,
      padding: '12px 14px',
      margin: '16px 0',
      'border-radius': '6px',
    },
    compare: { margin: '16px 0' },
    steps: { margin: '16px 0' },
    sectionTitle: {
      margin: '24px 0 12px',
      'border-bottom': `2px solid ${tokens.colors.primary}`,
      'padding-bottom': '6px',
    },
    footerCTA: {
      margin: '24px 0',
      padding: '16px',
      'background-color': tokens.colors.bgSoft,
      'border-radius': '8px',
    },
    recommend: {
      margin: '20px 0',
      padding: '14px 16px',
      'background-color': tokens.colors.bgSoft,
      'border-radius': '6px',
    },
    qrcode: { margin: '20px 0', padding: '14px 16px' },
    // 第五态 note + 签名块 abstract / key-number / see-also + media 占位。默认值刻意
    // 最小（多为空对象或仅 margin）——这些容器 renderer 本身在
    // pipeline/containers/signature.ts|media.ts 里用 token 直接绘外框，这里的 CSS
    // 槽位留给主题 voice 做微调（加边框色 / 改 padding 节奏）用。
    note: {},
    mpvoice: { margin: '20px 0' },
    mpvideo: { margin: '20px 0' },
    abstract: { margin: '18px 0 24px' },
    keyNumber: { margin: '18px 0' },
    seeAlso: { margin: '20px 0' },
  }
}

export function baseInline(tokens: ThemeTokens): ThemeInline {
  return {
    highlight: {
      'background-color': tokens.colors.accent,
      color: tokens.colors.textInverse,
      padding: '0 3px',
      'border-radius': '2px',
    },
    wavy: {
      'text-decoration': 'underline wavy',
      'text-decoration-color': tokens.colors.accent,
      'text-underline-offset': '3px',
    },
    emphasis: {
      color: tokens.colors.primary,
      'font-weight': '600',
    },
  }
}

/**
 * 属性级深合并：对 patch 里出现的每个 key，把其 CSSObject 属性叠到 base 同 key 上。
 *   - patch[key] 不存在：透传 base[key]
 *   - patch[key].__reset === true：剥离 __reset 后整段替换 base[key]
 *   - 否则：patch 属性在前、base 独有属性在后（生成 CSS 时属性顺序 = 主题作者排版顺序）
 *
 * 顺序纪律：CSS 规则属性顺序是阅读语义的一部分（"先外后内"/"先主后辅"）。主题作者
 * 排版 CSSObject 的顺序代表他的认知模型；deep-merge 必须保留这份意图——把 patch 键
 * 以原序插入，base 独有键补在末尾。这也保证"主题写全所有属性"的常见场景下 merge 输出
 * 字节等价于"整段替换"。
 */
function mergeStyle<T>(base: T, patch: StylePatch<T> | undefined): T {
  if (!patch) return base
  const out: Record<string, CSSObject> = { ...(base as Record<string, CSSObject>) }
  for (const key of Object.keys(patch) as Array<keyof T & string>) {
    const patchVal = patch[key] as CSSObjectPatch | undefined
    if (!patchVal) continue
    const { __reset, ...rest } = patchVal
    const cleanPatch = rest as CSSObject
    if (__reset === true) {
      out[key] = cleanPatch
      continue
    }
    const baseVal = out[key] ?? {}
    const merged: CSSObject = {}
    for (const k of Object.keys(cleanPatch)) merged[k] = cleanPatch[k]
    for (const k of Object.keys(baseVal)) {
      if (!(k in merged)) merged[k] = baseVal[k]
    }
    out[key] = merged
  }
  return out as T
}

export function buildTheme(opts: BuildThemeOptions): Theme {
  const elements = mergeStyle(baseElements(opts.tokens), opts.elements)
  const containers = mergeStyle(baseContainers(opts.tokens), opts.containers)
  const inline = mergeStyle(baseInline(opts.tokens), opts.inline)
  // 资产基线：仅当显式指定 variant 时才调用工厂；否则不引入工厂默认。
  //   这样 assets 里没列出的 key（如 default 故意不导出 quoteMark）不会被"工厂默认值偷偷补回来"。
  //   applyPalette 的 runtime 路径显式传 variant，走 factory + partial merge。
  let assets: ThemeAssets
  if (opts.variant !== undefined) {
    const factoryAssets = buildAssets({ tokens: opts.tokens, variant: opts.variant })
    assets = opts.assets ? { ...factoryAssets, ...opts.assets } : factoryAssets
  } else {
    assets = (opts.assets ?? {}) as ThemeAssets
  }
  const variants: ThemeVariants = { ...DEFAULT_VARIANTS, ...(opts.variants ?? {}) }
  return {
    id: opts.id,
    name: opts.name,
    description: opts.description,
    author: opts.author ?? '',
    preview: opts.preview ?? '',
    tokens: opts.tokens,
    elements,
    containers,
    assets,
    templates: opts.templates ?? {},
    inline,
    variants,
    ...(opts.behavior ? { behavior: opts.behavior } : {}),
  }
}
