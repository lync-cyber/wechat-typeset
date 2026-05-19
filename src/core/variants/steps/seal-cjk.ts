import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

const BODY3 =
  '### 一\n第一步正文说明\n\n### 二\n第二步正文说明\n\n### 三\n第三步正文说明\n'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="14" width="14" height="14" fill="${soft}" stroke="${accent}" stroke-width="1.5"/>` +
      `<text x="15" y="24" text-anchor="middle" font-size="9" font-weight="700" fill="${accent}">一</text>` +
      `<rect x="28" y="19" width="36" height="2" fill="#c0c6cf"/>` +
      `<rect x="8" y="33" width="14" height="14" fill="${soft}" stroke="${accent}" stroke-width="1.5"/>` +
      `<text x="15" y="43" text-anchor="middle" font-size="9" font-weight="700" fill="${accent}">二</text>` +
      `<rect x="28" y="38" width="32" height="2" fill="#c0c6cf"/>` +
      `<rect x="8" y="52" width="14" height="14" fill="${soft}" stroke="${accent}" stroke-width="1.5"/>` +
      `<text x="15" y="62" text-anchor="middle" font-size="9" font-weight="700" fill="${accent}">三</text>` +
      `<rect x="28" y="57" width="28" height="2" fill="#c0c6cf"/>`,
  )
}

const sealCjk: VariantDef = {
  meta: {
    id: 'seal-cjk',
    kind: 'steps',
    name: '汉字印章步骤',
    description: '作者以 h3 手写一/二/三，宋本批注风格',
    experimental: true,
    experimentalSince: '2026-05-19',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'st-seal-cjk',
      name: '汉字印章步骤',
      description: 'h3 手写 一/二/三 CJK 序号，印章感',
      markdown: '::: steps variant=seal-cjk\n' + BODY3 + ':::\n',
    },
    {
      presetId: 'st-seal-cjk-titled',
      name: '汉字印章 · 带标题',
      description: 'CJK 序号 + 正文标题合写',
      markdown:
        '::: steps 操作步骤 variant=seal-cjk\n' +
        '### 一 立项\n明确目标与负责人。\n\n' +
        '### 二 执行\n按计划分工推进。\n\n' +
        '### 三 收尾\n复盘归档，输出文档。\n' +
        ':::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: ['margin:20px 0'].join(';'),
      titleCSS: [
        'font-weight:600',
        'font-size:14px',
        `color:${c.text}`,
        'letter-spacing:0.1em',
        'margin-bottom:14px',
      ].join(';'),
    }
  },
}

export default sealCjk
