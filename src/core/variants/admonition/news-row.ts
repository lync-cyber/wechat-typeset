/**
 * admonition · news-row（数据新闻紧凑单行）
 *
 * data-brief 家族签名：每态左 3px 色条 + 实色徽章（INFO/TIP/WARN/STOP）+ 紧凑单行正文。
 * 区别于 accent-bar 的"四态各自皮肤"——news-row 是"四态同骨架，仅徽章字 + 色不同"，
 * 让作者能在同一栏目里横向罗列多条数据说明（晚点 / 财新数据 / Bloomberg Terminal 惯例）。
 *
 * 实现纪律：
 *   - 布局走 `display:table` + `display:table-cell`，**不用 flex**——wxPatch 会把 flex→block
 *   - titleCSS=''：让 renderer 跳过默认 title 行；徽章直接走 svgSlot 渲染
 *   - 默认徽章文字：tip→TIP / info→INFO / warning→WARN / danger→STOP（采用数据新闻惯例
 *     STOP 而非 DANGER）；作者写 `::: info INFO\n...` 直接覆盖
 *   - 不渲染主题 icon：news-row 的语义信号靠**色相 + 大写徽章字**，icon 反而成噪音
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { escText } from '../../pipeline/containers/_shared/escape'
import { svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const accent = args?.accent ?? '#1756d1'
  return svg(
    `<rect x="6" y="14" width="63" height="3" fill="${accent}" opacity="0"/>` +
      `<rect x="6" y="20" width="2" height="14" fill="${accent}"/>` +
      `<rect x="10" y="22" width="14" height="9" fill="${accent}"/>` +
      `<rect x="13" y="25" width="8" height="3" fill="#fff"/>` +
      `<rect x="28" y="24" width="38" height="2" fill="#5a6068"/>` +
      `<rect x="6" y="38" width="2" height="14" fill="${accent}"/>` +
      `<rect x="10" y="40" width="14" height="9" fill="${accent}"/>` +
      `<rect x="13" y="43" width="8" height="3" fill="#fff"/>` +
      `<rect x="28" y="42" width="34" height="2" fill="#5a6068"/>`,
  )
}

/** 数据新闻惯例徽章文字。作者写 ctx.info 时直接覆盖。 */
const DEFAULT_BADGE: Record<string, string> = {
  tip: 'TIP',
  info: 'INFO',
  warning: 'WARN',
  danger: 'STOP',
}

const newsRow: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'news-row',
    kind: 'admonition',
    name: '数据新闻单行',
    description: '左 3px + 徽章 + 紧凑单行，data-brief 签名',
    signatureOf: 'data-brief',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-info-news-row',
      name: '数据新闻 INFO',
      description: '蓝色徽章 + 单行',
      admonitionKind: 'info',
      thumbArgs: { accent: '#1756d1', soft: '#dfe9fa' },
      markdown: '::: info INFO variant=news-row\n所有时长以分钟计，四舍五入。\n:::\n',
    },
    {
      presetId: 'ad-tip-news-row',
      name: '数据新闻 TIP',
      description: '绿色徽章 + 单行',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#147a44', soft: '#dff1e6' },
      markdown: '::: tip TIP variant=news-row\n睡前 15 分钟是回升的最低成本入口。\n:::\n',
    },
    {
      presetId: 'ad-warning-news-row',
      name: '数据新闻 WARN',
      description: '橙色徽章 + 单行',
      admonitionKind: 'warning',
      thumbArgs: { accent: '#9e5c10', soft: '#faecd9' },
      markdown: '::: warning WARN variant=news-row\n样本量较小，结论仅供参考。\n:::\n',
    },
    {
      presetId: 'ad-danger-news-row',
      name: '数据新闻 STOP',
      description: '红色徽章 + 单行',
      admonitionKind: 'danger',
      thumbArgs: { accent: '#b22d18', soft: '#fbdcd6' },
      markdown: '::: danger STOP variant=news-row\n勿将"平均值"误读为"大多数人"。\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const c = ctx.tokens.colors
    const pair = c.status[kind]
    const badgeText = ctx.info.trim() || DEFAULT_BADGE[kind] || kind.toUpperCase()
    return {
      // 外壳走 display:table —— 两个 table-cell 横向并列（badge 左 / body 右）。
      // 公众号粘贴期 wxPatch 不剥 display:table（仅剥 flex），稳。
      // margin-bottom:4px 让四态紧贴罗列时纵向更紧凑（晚点/财新数据栏目惯例）。
      wrapperCSS:
        `display:table;width:100%;table-layout:auto;` +
        `border-left:3px solid ${pair.accent};` +
        `margin:0 0 4px 0;border-radius:0`,
      titleCSS: '',
      // bodyCSS 让 body 段落作为 table-cell；padding 与设计稿对齐。
      // vertical-align:middle 与 badge 保持同一基线，body 文字短时不会贴顶。
      bodyCSS:
        `display:table-cell;vertical-align:middle;` +
        `padding:2px 12px;font-size:12px;line-height:1.65;color:${c.text}`,
      // svgSlot 承担徽章：第一个 table-cell。
      //   - 宽度：min-width:54px 让 INFO/TIP/WARN/STOP 四态横向对齐，视觉成栏；
      //     纯 nowrap 无 min-width 会让 TIP（3 字符）比 WARN 短约 8px，列不齐
      //   - 内边距：2px 10px —— vertical 走设计稿原值 2px（高度紧贴文字一行），
      //     horizontal 留 10px 保证短词（TIP）也不会贴边
      //   - line-height:1.4 显式锁住徽章高度，避免继承 body 1.65 让胶囊变高
      //   - text-align:center：短徽章如 TIP 居中显眼
      //   - vertical-align:middle：与 body 段在垂直方向贴中线
      svgSlot:
        `<span style="display:table-cell;vertical-align:middle;min-width:54px;` +
        `background-color:${pair.accent};color:${c.textInverse};` +
        `padding:2px 10px;font-size:10px;line-height:1.4;font-weight:700;letter-spacing:0.1em;` +
        `text-align:center;white-space:nowrap">${escText(badgeText)}</span>`,
    }
  },
}

export default newsRow
