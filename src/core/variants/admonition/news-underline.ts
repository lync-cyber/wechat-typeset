/**
 * admonition · news-underline（苏黎世栅格 multi-callout）
 *
 * swiss-grid 家族签名：每态实色徽章（INFO/TIP/WARN/STOP）+ 1px 黑竖线分隔 +
 * 1px 黑底线下划线。区别于 news-row 的"左 3px 色条 + 紧凑罗列"——
 * news-underline 把视觉权交给徽章本身（设计稿 02-swiss-grid.html `multi-callout`
 * 母本）：每条独立 ::: 块在视觉上自然成一条数据栏，下划线串起四态而无需 :::: 外框。
 *
 * 实现纪律：
 *   - 布局 `display:table` + `display:table-cell`（不用 flex —— wxPatch 会 flex→block）
 *   - 徽章 padding 4px 8px / font-size 9px / letter-spacing 0.15em（设计稿值）
 *   - 正文 padding 4px 10px / font-size 12px / line-height 1.45（line-height 不大于 1.5
 *     才能让徽章 cell 不被 stretch 拉成"过高的药丸"）
 *   - WARN 用黑字（橙底配黑字，对比度），其余三态走 textInverse 白字
 *   - 行底 border-bottom:1px solid c.text 提供下划线 —— 四态独立 ::: 块连续罗列时
 *     视觉自然贴合成 multi-callout 列
 *   - 不渲染主题 icon：信号靠色相 + 大写徽章字
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { escText } from '../../pipeline/containers/_shared/escape'
import { svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const accent = args?.accent ?? '#e30613'
  return svg(
    `<rect x="6" y="20" width="14" height="9" fill="${accent}"/>` +
      `<rect x="9" y="23" width="8" height="3" fill="#fff"/>` +
      `<rect x="22" y="22" width="44" height="2" fill="#000"/>` +
      `<rect x="22" y="26" width="36" height="2" fill="#5a6068"/>` +
      `<rect x="6" y="32" width="60" height="1" fill="#000"/>` +
      `<rect x="6" y="38" width="14" height="9" fill="#2e7d32"/>` +
      `<rect x="9" y="41" width="8" height="3" fill="#fff"/>` +
      `<rect x="22" y="40" width="44" height="2" fill="#000"/>` +
      `<rect x="22" y="44" width="36" height="2" fill="#5a6068"/>` +
      `<rect x="6" y="50" width="60" height="1" fill="#000"/>`,
  )
}

/** swiss-grid multi-callout 默认徽章文字。作者写 ctx.info 直接覆盖。 */
const DEFAULT_BADGE: Record<string, string> = {
  tip: 'TIP',
  info: 'INFO',
  warning: 'WARN',
  danger: 'STOP',
}

const newsUnderline: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'news-underline',
    kind: 'admonition',
    name: '苏黎世下划线',
    description: '徽章 + 竖分隔 + 底部下划线，swiss-grid multi-callout',
    designedFor: ['swiss-grid'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-info-news-underline',
      name: 'multi-callout INFO',
      description: '黑色徽章 + 下划线',
      admonitionKind: 'info',
      thumbArgs: { accent: '#000000' },
      markdown: '::: info INFO variant=news-underline\n深夜读书请保持光源在书后侧 45°。\n:::\n',
    },
    {
      presetId: 'ad-tip-news-underline',
      name: 'multi-callout TIP',
      description: '绿色徽章 + 下划线',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#2e7d32' },
      markdown: '::: tip TIP variant=news-underline\n配温水一盏。茶易醒脑，咖啡断连续。\n:::\n',
    },
    {
      presetId: 'ad-warning-news-underline',
      name: 'multi-callout WARN',
      description: '橙色徽章 + 下划线',
      admonitionKind: 'warning',
      thumbArgs: { accent: '#f9a825' },
      markdown: '::: warning WARN variant=news-underline\n手机应在另一房间充电，非床头。\n:::\n',
    },
    {
      presetId: 'ad-danger-news-underline',
      name: 'multi-callout STOP',
      description: '红色徽章 + 下划线',
      admonitionKind: 'danger',
      thumbArgs: { accent: '#e30613' },
      markdown: '::: danger STOP variant=news-underline\n勿在短视频毕后方翻书。\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const c = ctx.tokens.colors
    const pair = c.status[kind]
    const badgeText = ctx.info.trim() || DEFAULT_BADGE[kind] || kind.toUpperCase()
    // WARN 橙底配黑字才有对比度；其余三态实色背景配反白
    const badgeColor = kind === 'warning' ? c.text : c.textInverse
    return {
      // 外壳走 display:table —— 两个 table-cell 横向并列（badge 左 / body 右）。
      // border-bottom:1px solid c.text 提供"下划线"——四态独立 ::: 块连续罗列时
      // 视觉自然贴合成设计稿 multi-callout 列。margin:0 让上下行紧贴。
      wrapperCSS:
        `display:table;width:100%;table-layout:auto;` +
        `border-bottom:1px solid ${c.text};` +
        `margin:0;border-radius:0`,
      titleCSS: '',
      // 正文 cell：左侧 1px 黑竖线（与徽章分隔），line-height 收到 1.45 以免拉高徽章
      bodyCSS:
        `display:table-cell;vertical-align:middle;` +
        `padding:4px 10px;font-size:12px;line-height:1.45;color:${c.text};` +
        `border-left:1px solid ${c.text}`,
      // svgSlot 承担徽章：第一个 table-cell。
      //   - padding:4px 8px / font-size:9px / letter-spacing:0.15em：设计稿原值
      //   - line-height:1.4 显式锁住徽章高度，避免继承 body 行高被 stretch
      //   - 不设 min-width：四态独立 ::: 块各自宽度由徽章字长自然决定
      svgSlot:
        `<span style="display:table-cell;vertical-align:middle;` +
        `background-color:${pair.accent};color:${badgeColor};` +
        `padding:4px 8px;font-size:9px;line-height:1.4;font-weight:700;letter-spacing:0.15em;` +
        `text-align:center;white-space:nowrap">${escText(badgeText)}</span>`,
    }
  },
}

export default newsUnderline
