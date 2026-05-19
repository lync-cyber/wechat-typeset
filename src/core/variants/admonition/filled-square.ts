/**
 * admonition · filled-square（包豪斯 v1 — 实心方块）
 *
 * content-1.html 设计稿 04·A FILLED SQUARE 的实现。顶端一行 header：
 *   [18×18 accent 实心方块] [告 示 大字距标题] [─ 横线 ─] [N° 01 mono 编号]
 * 下面接用户正文段落。signature 是"实心色方块 + 告示文字 + 中线 + 编号"四件并排
 * 单行——与同主题的 triangle-top（包豪斯 v2，框 + 三角顶徽）形成"无边框 vs 有边框"
 * 二分。
 *
 * 实现纪律：
 *   - header 走 display:table —— flex 在 wxPatch 阶段被剥成 block，四件会塌成四行
 *   - "中线"用第三个 table-cell 包一根 height:1px 横线实现，flex 的 `flex:1` 撑伸
 *     在 table-cell 里靠 width:60% + 内部 div 占满；wxPatch 友好
 *   - titleCSS=''：让 renderer 跳过默认 title 行；header 由 svgSlot 自接管
 *   - suppressIcon：本变体的视觉信号是实心方块，icon 反而成噪音
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/>` +
      // header 单行四件
      `<rect x="8" y="20" width="6" height="6" fill="${accent}"/>` +
      `<rect x="18" y="22" width="14" height="2" fill="${text}"/>` +
      `<rect x="36" y="23" width="20" height="1" fill="${text}" opacity="0.6"/>` +
      `<rect x="60" y="22" width="8" height="2" fill="${text}" opacity="0.6"/>` +
      // 正文密栏
      `<rect x="8" y="34" width="55" height="2" fill="#5a6068"/>` +
      `<rect x="8" y="40" width="55" height="2" fill="${accent}" opacity="0.8"/>` +
      `<rect x="8" y="46" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="8" y="52" width="48" height="2" fill="#c0c6cf"/>`,
  )
}

const variantDef: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'filled-square',
    kind: 'admonition',
    name: '实心方块',
    description: '顶 18px accent 方块 + 告示 + 中线 + N° 单行 header（包豪斯 v1）',
    designedFor: ['brutalist'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-filled-square',
      name: '实心方块',
      description: '顶 18px accent 方块 + 告示 + 中线 + N° 单行 header（包豪斯 v1）',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#c8412e', soft: '#efece5', text: '#111' },
      markdown: '::: tip 告示 variant=filled-square\n正文示例\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const bg = c.bg
    const text = c.text
    const textMuted = c.textMuted
    const accent = c.accent
    // header 单行走 display:table —— wxPatch 剥 flex，四件会塌成四行。
    // 中线 cell 给 width:60% 让两侧文字 cell 各自 shrink-to-content；line 占满 cell 宽。
    // 注：font-family 主题作者写在 elements.p / theme tokens，此处不重复设置。
    return {
      wrapperCSS: [
        `background-color:${bg}`,
        `padding:4px 0`,
      ].join(';'),
      titleCSS: '',
      svgSlot:
        `<div style="display:table;width:100%;margin-bottom:14px;">` +
        // ① 18×18 accent 实心方块
        `<div style="display:table-cell;vertical-align:middle;width:18px;padding-right:14px;">` +
        `<span style="display:inline-block;width:18px;height:18px;background-color:${accent};"></span>` +
        `</div>` +
        // ② 告示 大字距标题
        `<div style="display:table-cell;vertical-align:middle;` +
        `font-size:14px;font-weight:700;letter-spacing:.3em;color:${text};` +
        `padding-right:14px;white-space:nowrap;">告　示</div>` +
        // ③ 横线（占满中间剩余宽）
        `<div style="display:table-cell;vertical-align:middle;width:60%;padding:0 14px 0 0;">` +
        `<div style="height:1px;background-color:${text};"></div>` +
        `</div>` +
        // ④ N° 01 mono 编号
        `<div style="display:table-cell;vertical-align:middle;text-align:right;` +
        `font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.16em;` +
        `color:${textMuted};white-space:nowrap;">N° 01</div>` +
        `</div>`,
      bodyCSS: [
        `font-size:15px`,
        `line-height:1.95`,
        `color:${text}`,
        `margin:0`,
      ].join(';'),
      suppressIcon: true,
    }
  },
}

export default variantDef
