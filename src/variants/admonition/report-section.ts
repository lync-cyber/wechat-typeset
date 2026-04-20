/**
 * admonition · report-section（研究报告 §）
 *
 * 专为 industry-observer 主题设计：在 pill-tag 基础上加强"内参/周刊"气质——
 *   - 顶部 3px accent 实线 + 底部 1px accent 实线（报告章节双规格线）
 *   - 标题前置条款编号 `§` + 可选用户文案（像研究报告的 §01 / §2.3 结构）
 *   - 胶囊标签从 pill-tag 的圆角胶囊 → **方角 tag**（更"报告"而非"Web"）
 *   - 无圆角，数据感
 *   - 标题使用 accent 色填充背景 + textInverse 文字 + 全大写 + 明确的章节序号符
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { escText } from '../../pipeline/containers/types'
import { mergeThumb, svg } from '../_thumb'

const KIND_TAG: Record<string, string> = {
  tip: '要点',
  warning: '风险',
  info: '背景',
  danger: '警示',
}

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/>` +
      `<rect x="6" y="14" width="63" height="3" fill="${accent}"/>` +
      `<rect x="6" y="59" width="63" height="1.5" fill="${accent}"/>` +
      `<rect x="12" y="22" width="22" height="10" fill="${accent}"/>` +
      `<rect x="15" y="25" width="16" height="3" fill="#fefefe"/>` +
      `<rect x="12" y="38" width="52" height="2" fill="#c0c6cf"/>` +
      `<rect x="12" y="45" width="44" height="2" fill="#c0c6cf"/>` +
      `<rect x="12" y="52" width="48" height="2" fill="#c0c6cf"/>`,
  )
}

const reportSection: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'report-section',
    kind: 'admonition',
    name: '报告条款',
    description: '顶 3px 底 1px + § 方角标签，内参报告条款感',
    themeCompat: ['industry-observer'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-report-section',
      name: '报告 · 要点',
      description: 'analyst §01 · KEY POINT',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#2d6a5a', soft: '#dceae4' },
      markdown: '::: tip Q3 关键指标 variant=report-section\n净利同比 +18%，驱动来自 ASP。\n:::\n',
    },
    {
      presetId: 'ad-warning-report-section',
      name: '报告 · 风险',
      description: 'analyst §02 · RISK',
      admonitionKind: 'warning',
      thumbArgs: { accent: '#8a5a1a', soft: '#ece0c5' },
      markdown: '::: warning 需要警惕 variant=report-section\n供应链集中度过高。\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind]
    const padX = ctx.tokens.spacing.containerPadding
    const tag = KIND_TAG[kind] ?? kind
    const title = ctx.info.trim()
    // 方角标签：accent 底 + textInverse 白字；§ 前缀 + kind 标签，
    // 可选空格拼接用户 title 作为"子条款"
    const tagHtml =
      `<span style="display:inline-block;` +
      `background-color:${pair.accent};` +
      `color:${ctx.tokens.colors.textInverse};` +
      `padding:3px 10px;` +
      `font-size:12px;font-weight:700;letter-spacing:2px;` +
      `border-radius:0;line-height:1.4">` +
      `§ ${escText(tag)}</span>`
    const titleLine =
      `<section style="padding:10px ${padX}px 0;line-height:1.5">` +
      tagHtml +
      (title ? `<span style="margin-left:10px;color:${ctx.tokens.colors.text};` +
        `font-size:14px;font-weight:600;letter-spacing:0.3px">` +
        escText(title) + '</span>' : '') +
      '</section>'
    return {
      wrapperCSS:
        `background-color:${pair.soft};` +
        `border-top:3px solid ${pair.accent};` +
        `border-bottom:1px solid ${pair.accent};` +
        `padding:0 0 12px;` +
        `margin:20px 0;` +
        `border-radius:0`,
      titleCSS: '',
      bodyCSS:
        `color:${ctx.tokens.colors.text};` +
        `padding:8px ${padX}px 0;` +
        `font-size:14px;line-height:1.75;letter-spacing:0.3px`,
      svgSlot: titleLine,
    }
  },
}

export default reportSection
