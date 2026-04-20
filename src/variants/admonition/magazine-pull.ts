/**
 * admonition · magazine-pull（杂志拉引框）
 *
 * 专为 people-story 主题设计：取《人物》/《纽约客》/《GQ》特稿里的
 * "pull-quote 拉引框"——**上下细线、无左竖线、标题浮在上线之上**。
 *
 * 结构：
 *   - 顶+底各一根 1px 实线（accent 色）
 *   - 上线正中留一处"缺口"，缺口里嵌一条全大写小字标签
 *     （背景色 = 主题 bg，正好盖住上线视觉——手工"剪开再贴标签"的杂志版式）
 *   - 无左右边、无圆角、无填充，克制到留白是主视觉
 *   - 正文字号与行高比正文更舒展（line-height 1.9）
 *   - 底部可选右对齐署名（预留给未来 attr=byline）
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { escText } from '../../pipeline/containers/types'
import { mergeThumb, svg } from '../_thumb'

const KIND_LABEL: Record<string, string> = {
  tip: '采访手记',
  warning: '背景',
  info: '资料',
  danger: '存疑',
}

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="22" width="59" height="1.5" fill="${accent}"/>` +
      `<rect x="8" y="55" width="59" height="1.5" fill="${accent}"/>` +
      `<rect x="20" y="17" width="26" height="11" fill="#fefefe"/>` +
      `<rect x="24" y="21" width="18" height="3" fill="${accent}"/>` +
      `<rect x="12" y="34" width="52" height="2" fill="#c0c6cf"/>` +
      `<rect x="12" y="41" width="46" height="2" fill="#c0c6cf"/>` +
      `<rect x="12" y="48" width="48" height="2" fill="#c0c6cf"/>`,
  )
}

const magazinePull: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'magazine-pull',
    kind: 'admonition',
    name: '杂志拉引框',
    description: '上下细线 + 浮空小字标签，《人物》特稿气质',
    themeCompat: ['people-story'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-magazine-pull',
      name: '拉引 · 采访手记',
      description: '记者第一人称旁白',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#4a6a7a' },
      markdown: '::: tip 采访手记 variant=magazine-pull\n他在说这句话的时候下意识摸了摸左手腕——那里曾戴过一块表。\n:::\n',
    },
    {
      presetId: 'ad-info-magazine-pull',
      name: '拉引 · 背景',
      description: '新闻背景/资料补充',
      admonitionKind: 'info',
      thumbArgs: { accent: '#556170' },
      markdown: '::: info 背景 variant=magazine-pull\n这家公司在 2019 年曾申请破产重整。\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind]
    const padX = ctx.tokens.spacing.containerPadding
    const label = ctx.info.trim() || KIND_LABEL[kind] || ''
    const pageBg = ctx.tokens.colors.bg
    // 浮空小字标签：背景 = 页面 bg，盖住上线，形成"剪开"效果
    // margin-top 负值让它骑在顶线上
    const labelHtml = label
      ? `<section style="text-align:left">` +
        `<span style="display:inline-block;margin-top:-9px;margin-left:${padX}px;` +
        `padding:0 10px;background-color:${pageBg};color:${pair.accent};` +
        `font-size:12px;font-weight:700;letter-spacing:3px;` +
        `text-transform:uppercase;line-height:1.5">` +
        escText(label) + '</span></section>'
      : ''
    return {
      wrapperCSS:
        `background-color:transparent;` +
        `border-top:1px solid ${pair.accent};` +
        `border-bottom:1px solid ${pair.accent};` +
        `padding:0 0 14px;` +
        `margin:24px 0;` +
        `border-radius:0`,
      titleCSS: '',
      bodyCSS:
        `color:${ctx.tokens.colors.text};` +
        `padding:14px ${padX}px 0;` +
        `font-size:15px;line-height:1.9;letter-spacing:0.3px`,
      svgSlot: labelHtml,
    }
  },
}

export default magazinePull
