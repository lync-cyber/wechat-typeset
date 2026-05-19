import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'
import { escText } from '../../pipeline/containers/_shared/escape'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/>` +
      `<rect x="6" y="14" width="12" height="47" fill="${accent}" opacity="0.35"/>` +
      `<rect x="22" y="24" width="40" height="2" fill="#5a6068"/>` +
      `<rect x="22" y="32" width="38" height="2" fill="#5a6068"/>` +
      `<rect x="22" y="40" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="22" y="48" width="32" height="2" fill="#c0c6cf"/>` +
      `<rect x="22" y="60" width="47" height="1" fill="${accent}" opacity="0.5"/>`,
  )
}

const variantDef: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'paper-slip',
    kind: 'admonition',
    name: '黄签条',
    description: '左竖排黄签条 + 底 1px border',
    designedFor: ['literary-humanism'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-paper-slip',
      name: '黄签条',
      description: '左竖排黄签条 + 底 1px border',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#6b4a2a', soft: '#f3eada' },
      markdown: '::: tip 告示 variant=paper-slip\n正文示例\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const bg = c.bg
    const text = c.text
    const textMuted = c.textMuted
    const slipBg = c.bgMuted
    // 竖签条文字可由 attrs.slip 覆盖（让非文人主题作者改成 INFO / NB / NOTE 等
    // 符合自家语境的短串）；缺省维持宋本"示·告"汉字气质。
    const slipText = (ctx.attrs.slip ?? '示·告').trim()
    // 横排"竖签条 + 正文"必须走 display:table + table-cell——public-account 粘贴会
    // 把 display:flex/grid 剥成空，flex:1/gap/justify-* 全部失效。table 系列在
    // wxPatch 白名单里，与 qa-block.hanging-qa / databrief.metrics 同一手法。
    // table-layout:fixed + box-sizing:border-box 是签条贴文字的关键：默认 auto
    // 算法会按 cell 内容 max-content 撑宽，竖排文字 max-content 又随 font-size /
    // letter-spacing 浮动，结果签条远宽于文字（实测顶到 40+px）。fixed 让 width:32px
    // 被忠实采用，border-box 让 padding 计入这个 32 内。
    return {
      wrapperCSS: [
        `font-family:'Noto Serif SC',serif`,
        `background-color:${bg}`,
        `display:table`,
        `table-layout:fixed`,
        `width:100%`,
        `padding:6px 0`,
      ].join(';'),
      titleCSS: '',
      // line-height 必须显式压回——继承自 .stage 的 1.75 在 vertical-rl 里会把
      // 行盒（block direction = 物理宽）撑到 28px，远宽于 20px 的 content area，
      // glyph 因此偏左居中失败。设 1.25 让行盒 ≈ 20px 与 content area 等宽，
      // glyph 在行盒中心，视觉上水平居中。
      svgSlot:
        `<div style="display:table-cell;vertical-align:top;width:32px;box-sizing:border-box;` +
        `writing-mode:vertical-rl;background:${slipBg};` +
        `color:${textMuted};font-size:16px;line-height:1.25;letter-spacing:.4em;` +
        `padding:12px 6px;font-weight:500;">${escText(slipText)}</div>`,
      bodyCSS: [
        `display:table-cell`,
        `vertical-align:top`,
        `padding:8px 4px 8px 16px`,
        `border-bottom:1px solid ${textMuted}`,
        `font-size:15px`,
        `line-height:2`,
        `color:${text}`,
        `margin:0`,
      ].join(';'),
      suppressIcon: true,
    }
  },
}

export default variantDef
