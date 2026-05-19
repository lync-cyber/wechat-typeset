import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

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
    description: '左竖排黄签条 + 底 1px border（宋本 v2）',
    signatureOf: 'literary-humanism',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-paper-slip',
      name: '黄签条',
      description: '左竖排黄签条 + 底 1px border（宋本 v2）',
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
    // 黄签底色：使用 bgMuted（米黄纸感），朱字用 accentClassical
    const slipBg = c.bgMuted
    return {
      wrapperCSS: [
        `font-family:'Noto Serif SC',serif`,
        `background-color:${bg}`,
        `display:flex`,
        `gap:0`,
        `padding:6px 0`,
      ].join(';'),
      titleCSS: '',
      // 左竖排签条：writing-mode:vertical-rl 在公众号可用
      svgSlot:
        `<div style="writing-mode:vertical-rl;background:${slipBg};` +
        `color:${textMuted};font-size:14px;letter-spacing:.4em;` +
        `padding:10px 6px;font-weight:500;">示·告</div>`,
      bodyCSS: [
        `flex:1`,
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
