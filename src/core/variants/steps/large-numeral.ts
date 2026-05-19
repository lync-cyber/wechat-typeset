import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

const BODY3 =
  '### 01\n第一步正文说明\n\n### 02\n第二步正文说明\n\n### 03\n第三步正文说明\n'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<text x="14" y="26" font-size="14" font-weight="700" fill="${accent}">01</text>` +
      `<rect x="14" y="30" width="36" height="1.5" fill="#c0c6cf"/>` +
      `<rect x="14" y="34" width="28" height="1.5" fill="#c0c6cf"/>` +
      `<text x="14" y="49" font-size="14" font-weight="700" fill="${accent}">02</text>` +
      `<rect x="14" y="53" width="32" height="1.5" fill="${text}"/>` +
      `<rect x="14" y="57" width="24" height="1.5" fill="#c0c6cf"/>`,
  )
}

const largeNumeral: VariantDef = {
  meta: {
    id: 'large-numeral',
    kind: 'steps',
    name: '大数字步骤',
    description: '作者以 h3 手写数字序号，容器顶标题走小字 caption 风格',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'st-large-numeral',
      name: '大数字步骤',
      description: 'h3 手写 01/02/03 序号，编辑部风格',
      markdown: '::: steps 流程 variant=large-numeral\n' + BODY3 + ':::\n',
    },
    {
      presetId: 'st-large-numeral-titled',
      name: '大数字 · 带标题',
      description: '序号 + 正文标题合写在 h3',
      markdown:
        '::: steps 上线流程 variant=large-numeral\n' +
        '### 01 准备\n核查依赖与配置。\n\n' +
        '### 02 灰度\n按 5% → 25% → 100% 放量。\n\n' +
        '### 03 验收\n关键指标全绿后关闭发布窗口。\n' +
        ':::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: ['margin:24px 0', 'padding-left:8px'].join(';'),
      titleCSS: [
        'font-weight:700',
        'font-size:11px',
        `color:${c.textMuted}`,
        'letter-spacing:0.15em',
        'text-transform:uppercase',
        'margin-bottom:16px',
      ].join(';'),
    }
  },
}

export default largeNumeral
