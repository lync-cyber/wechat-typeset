/**
 * footnotes · boxed-aside（编辑随谈卡片）
 *
 * 设计语言：杂志栏目末尾的"编者随谈" / Notion callout 卡片。
 *   - 圆角软底卡 + 1px 边框，把脚注从"末尾附注"提升为"narrative aside"
 *   - kicker 显示为一颗实色 pill 徽章，与 quote-card 的署名行同一手势
 *   - 当脚注承担"主笔评注"而非"引文索引"时使用——读者会逐条读，不只扫一眼
 *
 * 适合主题：literary-humanism / editorial-mook / people-story / life-aesthetic
 * ——任何"末尾还有话要说"的文学叙事家族。
 *
 * 与其他三档脚注的分工：
 *   - lined         = 标准悬挂缩进（"列出引用"）
 *   - inline-flow   = 流式段落 + 内滚动（"长文献列表"）
 *   - boxed-aside   = 卡片化"narrative 旁白"（**本文件**）
 *   - top-rule      = 报纸尾注（精简事实索引）
 *   - dense-academic = 论文级 bibliography（深 hanging + 11px）
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="62" height="48" rx="4" fill="${soft}" stroke="#c0c6cf" stroke-width="0.5"/>` +
      `<rect x="12" y="20" width="16" height="6" rx="1" fill="${accent}"/>` +
      `<text x="14" y="25" font-size="4" fill="#fff" font-weight="700">NOTES</text>` +
      `<rect x="12" y="32" width="48" height="2" fill="#7a8389"/>` +
      `<rect x="12" y="38" width="42" height="2" fill="#7a8389"/>` +
      `<rect x="12" y="46" width="50" height="2" fill="#7a8389"/>` +
      `<rect x="12" y="52" width="36" height="2" fill="#7a8389"/>`,
  )
}

const boxedAside: VariantDef = {
  meta: {
    id: 'boxed-aside',
    kind: 'footnotes',
    name: '随谈卡片',
    description: '软底卡 + pill kicker，narrative aside',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'footnotes-boxed-aside',
      name: '脚注 · 随谈卡片',
      description: '卡片化随谈，文学家族的尾注 callout',
      markdown:
        '::: footnotes 编者随谈 variant=boxed-aside\n' +
        '[1] 关于"慢"的定义，本刊从未试图给出标准答案。\n' +
        '[2] 引文出处见上期目录页 §3。\n' +
        ':::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const r = ctx.tokens.radius
    return {
      wrapperCSS: [
        `padding:14px 16px`,
        `border:1px solid ${c.border}`,
        `border-radius:${r.sm}px`,
        `background-color:${c.bgSoft}`,
        `line-height:1.65`,
        `color:${c.text}`,
      ].join(';'),
      titleCSS: [
        // pill 徽章：与 lined/inline-flow 的纯文字 kicker 完全异质化
        `display:inline-block`,
        `padding:2px 9px`,
        `margin-bottom:10px`,
        `font-size:10px`,
        `font-weight:700`,
        `letter-spacing:0.15em`,
        `background-color:${c.primary}`,
        `color:${c.textInverse}`,
        `border-radius:${r.sm}px`,
        `text-indent:0`,
      ].join(';'),
    }
  },
}

export default boxedAside
