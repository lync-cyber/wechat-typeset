/**
 * admonition · slab-corner（粗野板块 / brutalist callout）
 *
 * 专为 brutalist 主题设计：punk-zine / mook 编辑 / data-brief 的"硬边块"信号。
 * 与 news-row 的差异：news-row 是横向 table-cell 单行（紧凑罗列），slab-corner
 * 是带 padding 的纵向卡片（一态一块，承担更长正文），两者各取一种"硬色块"母语。
 *
 * 视觉骨架（四态同构，仅 accent 色 + 徽章字不同）：
 *   - 顶部 6px accent 实条（粗野"色块边界"，与 brutalist radius=0 纪律统一）
 *   - 顶端右对齐 accent fill 大写徽章（INFO/TIP/WARN/STOP，square block，零圆角）
 *   - 内容区 pair.soft 软底 + 大 padding，让大字号正文呼吸
 *   - radius:0 全局硬边
 *
 * 设计纪律：
 *   - titleCSS='' 暗号：renderer 跳过默认 title 行；徽章直接走 svgSlot 渲染
 *   - 徽章块走 `text-align:right` + inline-block 实现"右上锚点"；不走 float / absolute
 *     （前者被微信剥，后者 wxPatch 删 position）
 *   - 不渲染 status icon：slab-corner 的语义信号靠**色相 + 大写徽章字**，icon 反而成噪音
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { escText } from '../../pipeline/containers/_shared/escape'
import { svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const accent = args?.accent ?? '#ebff00'
  const soft = args?.soft ?? '#1a1a1a'
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/>` +
      // 顶 6px accent 实条
      `<rect x="6" y="14" width="63" height="5" fill="${accent}"/>` +
      // 右上角徽章方块
      `<rect x="50" y="22" width="16" height="10" fill="${accent}"/>` +
      `<rect x="53" y="26" width="10" height="2" fill="${soft}"/>` +
      // 正文密栏
      `<rect x="11" y="36" width="36" height="2" fill="#5a6068"/>` +
      `<rect x="11" y="42" width="44" height="2" fill="#5a6068"/>` +
      `<rect x="11" y="48" width="38" height="2" fill="#5a6068"/>` +
      `<rect x="11" y="54" width="28" height="2" fill="#5a6068"/>`,
  )
}

/** 数据新闻惯例徽章文字。作者写 ctx.info 时直接覆盖。 */
const DEFAULT_BADGE: Record<string, string> = {
  tip: 'TIP',
  info: 'INFO',
  warning: 'WARN',
  danger: 'STOP',
}

const slabCorner: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'slab-corner',
    kind: 'admonition',
    name: '粗野板块',
    description: '顶部 6px 硬条 + 右上 accent 徽章方块 + zero-radius',
    signatureOf: 'brutalist',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-info-slab-corner',
      name: '粗野板块 INFO',
      description: '顶 6px 蓝条 + 右上方块徽章',
      admonitionKind: 'info',
      thumbArgs: { accent: '#ebff00', soft: '#1a1a1a' },
      markdown: '::: info INFO variant=slab-corner\n所有时长以分钟计，四舍五入。\n:::\n',
    },
    {
      presetId: 'ad-tip-slab-corner',
      name: '粗野板块 TIP',
      description: '顶 6px 绿条 + 右上方块徽章',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#ebff00', soft: '#1a1a1a' },
      markdown: '::: tip TIP variant=slab-corner\n睡前 15 分钟是回升的最低成本入口。\n:::\n',
    },
    {
      presetId: 'ad-warning-slab-corner',
      name: '粗野板块 WARN',
      description: '顶 6px 橙条 + 右上方块徽章',
      admonitionKind: 'warning',
      thumbArgs: { accent: '#ebff00', soft: '#1a1a1a' },
      markdown: '::: warning WARN variant=slab-corner\n样本量较小，结论仅供参考。\n:::\n',
    },
    {
      presetId: 'ad-danger-slab-corner',
      name: '粗野板块 STOP',
      description: '顶 6px 红条 + 右上方块徽章',
      admonitionKind: 'danger',
      thumbArgs: { accent: '#ebff00', soft: '#1a1a1a' },
      markdown: '::: danger STOP variant=slab-corner\n勿将"平均值"误读为"大多数人"。\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const c = ctx.tokens.colors
    const pair = c.status[kind]
    const padY = ctx.tokens.spacing.containerPadding
    const padX = ctx.tokens.spacing.containerPadding
    const badgeText = ctx.info.trim() || DEFAULT_BADGE[kind] || kind.toUpperCase()
    // 外壳 wrapperCSS：top accent 硬条 + soft 底 + 大 padding。
    // padding-top 多留 6px 给顶条让位（顶条已占 6px，文字内容应距其再下 8-10px）
    return {
      wrapperCSS:
        `background-color:${pair.soft};` +
        `border-top:6px solid ${pair.accent};` +
        `padding:${padY + 6}px ${padX}px ${padY}px;` +
        `margin:18px 0;border-radius:0`,
      titleCSS: '',
      bodyCSS: `font-size:13px;line-height:1.65;color:${c.text}`,
      // 徽章块走 svgSlot：包裹一层 text-align:right 让 inline-block 徽章靠右上对齐。
      // 不用 float / absolute（前者被微信剥，后者 wxPatch 删 position）；
      // margin-bottom 8px 让徽章与正文分层。
      svgSlot:
        `<section style="text-align:right;line-height:0;margin-bottom:8px">` +
        `<span style="display:inline-block;` +
        `background-color:${pair.accent};color:${c.textInverse};` +
        `padding:4px 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;` +
        `line-height:1.4;text-align:center;border-radius:0">${escText(badgeText)}</span>` +
        `</section>`,
    }
  },
}

export default slabCorner
