/**
 * 主题工厂：给 tokens 就能得到完整 Theme。
 *
 * 分层定位（**故意保持两个包装器共用同一底层工厂**）：
 *   - buildTheme（本文件）——底层：tokens + 补丁 → Theme。不感知 spec / palette 概念
 *   - specToTheme（./spec/spec-to-theme.ts）——包装器 1：PersonaSpec → buildTheme args
 *   - applyPalette（../../color/applyPalette.ts）——包装器 2：既有 Theme + 新 palette → buildTheme args
 *   前者编译期从作者文件生成主题，后者运行时响应用户调色——两条路径共享同一份 mergeStyle
 *   与 DEFAULT_VARIANTS 兜底逻辑。不要因为"specToTheme 是主要调用点"就把 buildTheme
 *   内联进去，会把 applyPalette 的 delta 路径也搅进 spec 语义。
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
  Decorations,
  SvgVariant,
  Theme,
  ThemeAssets,
  ThemeContainers,
  ThemeElements,
  ThemeInline,
  ThemeInnerStyles,
  ThemeTemplates,
  ThemeTokens,
  ThemeVariants,
} from '../types'
import { DEFAULT_VARIANTS } from '../types'
import { buildAssets } from './svgAssets'

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
   * 参数化 SVG 工厂变体。声明则触发 `buildAssets({tokens, variant})` 生成基线 assets,
   * 再由 `assets` 字段（如提供）做浅合并。**用于 applyPalette 的 runtime 路径**。
   *
   * 与 `svgVariant` 的关系：
   *   - `variant` 显式声明 = "调工厂生成 assets" + "写入 Theme.svgVariant" 双重副作用
   *   - `svgVariant` 仅写入 Theme.svgVariant（metadata-only）；用于 spec-to-theme 路径,
   *     该路径 assets 直接来自 motifs AST 渲染, 不需要触发工厂
   *   - 两者并存且 `variant` 优先（同时透出到 Theme.svgVariant）
   */
  variant?: SvgVariant
  /**
   * 仅作为 Theme.svgVariant 的 metadata 透传, 不触发 buildAssets。spec-to-theme 在此
   * 字段透传 spec.svgVariant；applyPalette 不读此字段（它显式传 variant）。
   */
  svgVariant?: SvgVariant
  /**
   * 元素级样式：属性级深合并到 baseElements(tokens) 之上。
   * `__reset: true` sentinel 可在某 key 上切换为整段替换。
   * 包含 pre / code（v1 的顶层 pre/code 字段已并入此处）。
   */
  elements?: StylePatch<ThemeElements>
  /** 容器级样式（同 elements 语义） */
  containers?: StylePatch<ThemeContainers>
  /**
   * 容器内层元素样式（同 elements 语义）。承载 abstract kicker / key-number 数字 /
   * see-also 标题等"renderer 内部子元素"样式槽位; renderer 通过 ctx.innerStyles 消费,
   * 不进 themeCSS 生成器。
   */
  innerStyles?: StylePatch<ThemeInnerStyles>
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
   * 声明式装饰规则。所有主题专属视觉签名（标题前缀编号 / intro 首字下沉等）走这里——
   * R8 后 `ThemeBehavior` 接口已删除, decorations 是唯一承载点。
   */
  decorations?: Decorations
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
    // R8：note 走独立 variantKind='note'；wrapper CSS 由 variants/note/<id>.ts
    // 提供（minimal-callout 即原本的"顶端短线 + textMuted"骨架）。这里只留 margin
    // 兜底，主题 voice 可在 spec.containers.note 里追加 border / padding 等。
    note: { margin: '16px 0' },
    mpvoice: { margin: '20px 0' },
    mpvideo: { margin: '20px 0' },
    // R3 + R4：abstract / keyNumber / seeAlso 的 wrapper CSS 兜底从 renderer 下沉到这里。
    // 渲染器只读 ctx.containers.<x>，不再 substring 检测、不再硬涂底色——主题 voice 通过
    // spec.containers 深合并接管即可。
    abstract: {
      'background-color': tokens.colors.bgSoft,
      'border-left': `4px solid ${tokens.colors.primary}`,
      padding: '14px 16px 14px 18px',
      margin: '18px 0 24px',
      'border-radius': `${tokens.radius.sm}px`,
    },
    keyNumber: {
      'background-color': tokens.colors.bgSoft,
      padding: '16px 18px',
      margin: '18px 0',
      'border-radius': `${tokens.radius.md}px`,
      'border-top': `3px solid ${tokens.colors.primary}`,
    },
    seeAlso: {
      'background-color': tokens.colors.bgSoft,
      padding: '14px 16px',
      margin: '20px 0',
      'border-radius': `${tokens.radius.md}px`,
      'border-left': `3px solid ${tokens.colors.secondary}`,
    },
    // R4：data-brief 家族 wrapper CSS 兜底从 renderer 下沉到这里。
    // 非 data-brief 主题不主动声明时，得到 token 驱动的中性兜底（bgSoft / border 色），
    // 不再继承 renderer 里的"数据简报几何审美"——遵守 packs/data-brief.md 的可移植性承诺。
    //
    // 注意：display:grid / display:flex 不能进 ThemeContainers 槽位——themeCSS guard 会
    // 拒绝（公众号粘贴后剥成空值，子项孤样式必塌）。结构性布局（grid / table）由 renderer
    // 在 inline style 里合成；ThemeContainers 只承载 padding / border / bg / margin 这类
    // "装饰位"——主题 voice 可深合并覆盖。
    masthead: {
      'padding-bottom': '10px',
      'border-bottom': `1px solid ${tokens.colors.text}`,
      margin: '0 0 20px 0',
    },
    sectionTag: { margin: '0 0 14px 0' },
    toc: {
      'background-color': tokens.colors.bgSoft,
      padding: '12px 14px',
      margin: '0 0 24px 0',
    },
    kpiDashboard: {
      'background-color': tokens.colors.bgSoft,
      'border-top': `1px solid ${tokens.colors.text}`,
      'border-bottom': `1px solid ${tokens.colors.text}`,
      padding: '18px 16px 16px',
      margin: '0 0 28px 0',
    },
    barChart: {
      'background-color': tokens.colors.bgSoft,
      border: `1px solid ${tokens.colors.border}`,
      padding: '16px 14px',
      margin: '20px 0 24px',
    },
    qaBlock: {
      'border-top': `1px solid ${tokens.colors.border}`,
      'border-bottom': `1px solid ${tokens.colors.border}`,
      padding: '14px 0',
      margin: '22px 0',
    },
    footnotes: {
      'border-top': `1px solid ${tokens.colors.border}`,
      'padding-top': '8px',
      margin: '14px 0',
      'font-size': '10px',
      'line-height': '1.75',
      color: tokens.colors.textMuted,
    },
    ctaBar: { margin: '22px 0' },
    qrFollow: {
      'background-color': tokens.colors.bgSoft,
      'border-left': `3px solid ${tokens.colors.primary}`,
      padding: '14px',
      margin: '22px 0',
    },
    // editor-note / methodology / colophon：R3+R4 下沉模式——wrapper CSS 兜底由 token
    // 驱动放在 baseContainers，renderer 只在 ctx.containers.<x> 之上做 inline 合并。
    // 非 data-brief 主题不主动声明时也能得到一个克制的中性骨架。
    editorNote: {
      'border-left': `3px solid ${tokens.colors.primary}`,
      'background-color': tokens.colors.bgSoft,
      padding: '14px 16px 14px 18px',
      margin: '22px 0',
      'border-radius': `${tokens.radius.sm}px`,
    },
    methodology: {
      'background-color': tokens.colors.bgSoft,
      border: `1px solid ${tokens.colors.border}`,
      padding: '10px 12px',
      margin: '16px 0',
      'border-radius': `${tokens.radius.sm}px`,
      'font-size': '10px',
      'line-height': '1.75',
      color: tokens.colors.textMuted,
    },
    colophon: {
      'border-top': `1px solid ${tokens.colors.text}`,
      'padding-top': '12px',
      margin: '20px 0 0',
    },
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
 * 容器内层元素 inline-style 兜底。R8 把 signature renderer 内硬编码的子元素样式提到这里,
 * 让主题作者可通过 spec.innerStyles 深合并接管（如把 keyNumber 数字字号从 32px 调到 28px）。
 *
 * 兜底值与 R8 前 signature.ts hardcoded 字面值字节等价——所有现有主题渲染输出不变,
 * 仅扩展了"主题作者可调"的覆盖空间。
 */
export function baseInnerStyles(tokens: ThemeTokens): ThemeInnerStyles {
  const c = tokens.colors
  return {
    abstractKicker: {
      color: c.primary,
      'font-size': '11px',
      'font-weight': '700',
      'letter-spacing': '2px',
      'text-transform': 'uppercase',
      'margin-bottom': '6px',
    },
    keyNumberValue: {
      color: c.primary,
      'font-size': '32px',
      'font-weight': '700',
      'line-height': '1.1',
      'letter-spacing': '-0.5px',
      'margin-bottom': '4px',
    },
    keyNumberKicker: {
      color: c.textMuted,
      'font-size': '12px',
      'font-weight': '600',
      'letter-spacing': '1px',
      'text-transform': 'uppercase',
      'margin-bottom': '8px',
    },
    seeAlsoTitle: {
      color: c.textMuted,
      'font-size': '11px',
      'font-weight': '700',
      'letter-spacing': '2px',
      'text-transform': 'uppercase',
      'margin-bottom': '8px',
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
  const innerStyles = mergeStyle(baseInnerStyles(opts.tokens), opts.innerStyles)
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
    innerStyles,
    assets,
    templates: opts.templates ?? {},
    inline,
    variants,
    // Theme.svgVariant 透传：
    //   - applyPalette 路径走 opts.variant（既触发工厂又写到 Theme）
    //   - spec-to-theme 路径走 opts.svgVariant（仅写到 Theme,不触发工厂——assets 已由 motifs 渲染）
    // 显式透传到 Theme.svgVariant —— 删除 applyPalette.BASE_VARIANT 查表的关键。
    ...(opts.variant ?? opts.svgVariant
      ? { svgVariant: opts.variant ?? opts.svgVariant }
      : {}),
    ...(opts.decorations ? { decorations: opts.decorations } : {}),
  }
}
