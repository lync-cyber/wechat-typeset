import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

const BODY3 =
  '### 1\n第一步正文说明\n\n### 2\n第二步正文说明\n\n### 3\n第三步正文说明\n'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="14" width="2" height="48" fill="${text}"/>` +
      `<circle cx="11" cy="22" r="5" fill="none" stroke="${accent}" stroke-width="1.5"/>` +
      `<polygon points="11,37 7,44 15,44" fill="none" stroke="${accent}" stroke-width="1.5"/>` +
      `<circle cx="11" cy="57" r="4" fill="${accent}"/>` +
      `<rect x="22" y="21" width="34" height="2" fill="#c0c6cf"/>` +
      `<rect x="22" y="39" width="28" height="2" fill="#c0c6cf"/>` +
      `<rect x="22" y="56" width="30" height="2" fill="#c0c6cf"/>`,
  )
}

const geometricChain: VariantDef = {
  meta: {
    id: 'geometric-chain',
    kind: 'steps',
    name: '几何链式步骤',
    description: '左侧实线主轴，序号由作者写入 h3，包豪斯风格',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'st-geometric-chain',
      name: '几何链式步骤',
      description: '左侧 2px 实线主轴，包豪斯风格',
      markdown: '::: steps 流程 variant=geometric-chain\n' + BODY3 + ':::\n',
    },
    {
      presetId: 'st-geometric-chain-symbol',
      name: '几何链 · 符号序号',
      description: '几何符号充当步骤序号',
      markdown:
        '::: steps 设计流程 variant=geometric-chain\n' +
        '### ○ 调研\n收集用户反馈与数据。\n\n' +
        '### △ 定义\n明确问题与目标。\n\n' +
        '### ■ 交付\n输出可用原型与规范。\n' +
        ':::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        'margin:20px 0',
        'padding-left:32px',
        `border-left:2px solid ${c.text}`,
      ].join(';'),
      titleCSS: [
        'font-weight:700',
        'font-size:12px',
        `color:${c.text}`,
        'letter-spacing:0.15em',
        'text-transform:uppercase',
        'margin-bottom:14px',
      ].join(';'),
    }
  },
}

export default geometricChain
