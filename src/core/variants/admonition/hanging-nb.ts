import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/>` +
      `<rect x="22" y="14" width="1" height="47" fill="${text}"/>` +
      `<rect x="6" y="22" width="12" height="3" fill="${text}"/>` +
      `<rect x="6" y="30" width="10" height="2" fill="${text}" opacity="0.4"/>` +
      `<rect x="27" y="20" width="40" height="2" fill="#5a6068"/>` +
      `<rect x="27" y="28" width="35" height="2" fill="#5a6068"/>` +
      `<rect x="27" y="36" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="27" y="44" width="32" height="2" fill="#c0c6cf"/>`,
  )
}

const variantDef: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'hanging-nb',
    kind: 'admonition',
    name: '悬挂 N.B.',
    description: '左侧 N.B. 缩写 + 编号 + 竖分隔（编辑部 v2）',
    designedFor: ['official-gazette'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-hanging-nb',
      name: '悬挂 N.B.',
      description: '左侧 N.B. 缩写 + 编号 + 竖分隔（编辑部 v2）',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#0a0a0a', soft: '#fbfaf7', text: '#0a0a0a' },
      markdown: '::: tip variant=hanging-nb\n读者若对术语之译法有疑问，请径直查阅文末译名对照表。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const bg = c.bg
    const text = c.text
    const textMuted = c.textMuted
    // 走 display:table —— flex 在公众号粘贴时被剥成 block，N.B. 块与正文会上下塌
    // 而非左右并排。table-cell 在白名单（与 paper-slip / specimen-box 同手法）。
    // 取消 gap，改用右 cell 的 padding-left 替代。
    return {
      wrapperCSS: [
        `font-family:'Noto Serif SC',serif`,
        `background-color:${bg}`,
        `display:table`,
        `width:100%`,
        `padding:6px 0`,
      ].join(';'),
      titleCSS: '',
      svgSlot:
        `<div style="display:table-cell;vertical-align:top;width:48px;text-align:right;` +
        `border-right:1px solid ${text};padding-right:10px;padding-top:2px;">` +
        `<div style="font-family:'Lora',serif;font-style:italic;font-size:18px;` +
        `color:${text};line-height:1;">N.B.</div>` +
        `<div style="font-family:'IBM Plex Mono',monospace;font-size:9px;` +
        `color:${textMuted};letter-spacing:.16em;margin-top:6px;">001</div>` +
        `</div>`,
      bodyCSS: [
        `display:table-cell`,
        `vertical-align:top`,
        `padding-left:14px`,
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
