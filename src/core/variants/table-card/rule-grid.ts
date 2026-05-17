/**
 * table-card · rule-grid（default · 全网格规格清单）
 *
 * 人格：数据库 / 规格清单。每格 1px 实线边框，header 行 bgMuted + accent 色加粗。
 * 视觉骨架：wrapper 外框 1px solid border + 圆角 4px；row/cell 边框由 tableRowContainer
 *   按 variantId 分派注入。本文件仅产 wrapperCSS。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="#fff" stroke="${text}"/>` +
      `<rect x="6" y="14" width="63" height="12" fill="${soft}"/>` +
      `<path d="M27 14V61M48 14V61M6 26H69M6 43H69" stroke="${text}"/>` +
      `<rect x="10" y="18" width="14" height="3" fill="${accent}"/>` +
      `<rect x="31" y="18" width="13" height="3" fill="${accent}"/>` +
      `<rect x="52" y="18" width="13" height="3" fill="${accent}"/>`,
  )
}

const ruleGrid: VariantDef = {
  meta: {
    id: 'rule-grid',
    kind: 'tableCard',
    name: '网格表',
    description: '全 1px 边框，规格清单 / 数据表骨架',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'table-card-rule-grid',
      name: '表格 · 网格',
      description: '全网格 1px 边框，header bgMuted 加粗',
      markdown:
        ':::: table-card 规格对比 variant=rule-grid\n' +
        '::: table-row header=true cells="型号 | 容量 | 价格"\n:::\n' +
        '::: table-row cells="A | 256G | ￥6999"\n:::\n' +
        '::: table-row cells="B | 512G | ￥8999"\n:::\n' +
        '::::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        `border:1px solid ${c.border}`,
        'border-radius:4px',
        'overflow:hidden',
        'margin:18px 0',
      ].join(';'),
    }
  },
}

export default ruleGrid
