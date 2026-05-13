/**
 * admonition · marginalia（无框书页批注）
 *
 * 专为 literary-humanism 主题设计：**真正无框**——无背景、无边线、无圆角。
 * 承袭宋版书"墨围、天头、地脚"的批注传统：靠字体处理 + CJK 标点符号区分类型，
 * 而非交通灯色彩语言。
 *
 * 四态的视觉区分**不靠颜色**，而靠**符号**：
 *   - tip     → 【按】 按语（作者点评、延伸想法）
 *   - warning → 【疑】 存疑（存而待考、提醒读者）
 *   - info    → 【注】 注释（背景知识、出处交代）
 *   - danger  → 【辨】 辨误（纠正常见误解）
 *
 * 颜色统一为 secondary 墨色，不做 accent/soft 配对。差异化责任交给符号与语序。
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { escText } from '../../pipeline/containers/types'
import { mergeThumb, svg } from '../_thumb'

const KIND_MARK: Record<string, string> = {
  tip: '按',
  warning: '疑',
  info: '注',
  danger: '辨',
}

const DEFAULT_TITLE: Record<string, string> = {
  tip: '按语',
  warning: '存疑',
  info: '注释',
  danger: '辨误',
}

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    // 无边框无底——只有行首【按】方框 + 几行文本
    `<rect x="10" y="20" width="3" height="12" fill="${accent}"/>` +
      `<rect x="10" y="20" width="14" height="3" fill="${accent}"/>` +
      `<rect x="21" y="20" width="3" height="12" fill="${accent}"/>` +
      `<rect x="10" y="29" width="14" height="3" fill="${accent}"/>` +
      `<rect x="28" y="22" width="20" height="3" fill="${accent}"/>` +
      `<rect x="10" y="40" width="54" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="47" width="46" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="54" width="50" height="2" fill="#c0c6cf"/>`,
  )
}

const marginalia: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'marginalia',
    kind: 'admonition',
    name: '书页批注',
    description: '无框、墨色一色；靠【按】【疑】【注】【辨】符号区分类型',
    themeCompat: ['literary-humanism'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-marginalia',
      name: '批注【按】',
      description: '按语体—作者点评延伸',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#4a4a42' },
      markdown: '::: tip 此处另有一解 variant=marginalia\n顾千里批云：此说出于误读，当另辨之。\n:::\n',
    },
    {
      presetId: 'ad-info-marginalia',
      name: '批注【注】',
      description: '注释体—背景出处',
      admonitionKind: 'info',
      thumbArgs: { accent: '#4a4a42' },
      markdown: '::: info 原文出处 variant=marginalia\n语见《庄子·秋水》，郭象注。\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    // 墨色一色：全部用 secondary（文人墨），不拉交通灯
    const ink = ctx.tokens.colors.secondary
    const muted = ctx.tokens.colors.textMuted
    const mark = KIND_MARK[kind] ?? '按'
    const title = ctx.info.trim() || DEFAULT_TITLE[kind] || ''
    // 标题以【X】开头，inline 承接可选文案。无分隔线、无图标。
    const labelHtml =
      `<section style="color:${ink};font-size:15px;line-height:1.7;` +
      `margin-bottom:4px;letter-spacing:1px;font-weight:600">` +
      `【${escText(mark)}】` +
      `<span style="color:${muted};font-weight:500;letter-spacing:0.6px;` +
      `margin-left:6px">` + escText(title) + '</span>' +
      '</section>'
    return {
      wrapperCSS:
        `background-color:transparent;` +
        `padding:4px 0 4px 28px;` +
        `margin:16px 0;` +
        `border:none;` +
        `border-radius:0`,
      titleCSS: '',
      bodyCSS:
        `color:${muted};` +
        `font-size:14px;line-height:1.8;letter-spacing:0.4px`,
      svgSlot: labelHtml,
    }
  },
}

export default marginalia
