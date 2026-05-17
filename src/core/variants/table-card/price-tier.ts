/**
 * table-card · price-tier（价格档位对比卡）
 *
 * 人格：每列一张独立"档位卡"。cell 间 border-spacing 形成间隙，每列顶 3px
 *   primary 色条；推荐列（cells 文本以 `*` 前缀）顶条走 accent。
 * 视觉骨架：wrapper border-spacing:3px 0 + transparent 底；header bgSoft + 居中粗体；
 *   body 白底居中。所有文本居中，区别于其它 variant 左对齐。
 *
 * 推荐高亮契约：作者在 cells 任一格写 `*高级` 标记该列推荐；price-tier 渲染时把列号记下，
 *   后续每行同列顶条着 accent 色——按列 index 一致触发，不依赖行间状态。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<g fill="${soft}">` +
      `<rect x="6" y="14" width="18" height="49"/>` +
      `<rect x="50" y="14" width="19" height="49"/></g>` +
      `<rect x="28" y="14" width="18" height="49" fill="#fff"/>` +
      `<g fill="${text}">` +
      `<rect x="6" y="14" width="18" height="3"/>` +
      `<rect x="50" y="14" width="19" height="3"/>` +
      `<rect x="10" y="22" width="10" height="3"/>` +
      `<rect x="54" y="22" width="11" height="3"/>` +
      `<rect x="11" y="36" width="8" height="5"/>` +
      `<rect x="55" y="36" width="9" height="5"/></g>` +
      `<g fill="${accent}">` +
      `<rect x="28" y="14" width="18" height="3"/>` +
      `<rect x="32" y="22" width="10" height="3"/>` +
      `<rect x="33" y="36" width="8" height="5"/></g>`,
  )
}

const priceTier: VariantDef = {
  meta: {
    id: 'price-tier',
    kind: 'tableCard',
    name: '档位卡',
    description: '每列独立 + 顶色条 + 推荐高亮，pricing tier',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'table-card-price-tier',
      name: '表格 · 价格档位',
      description: '每列独立卡片，星号标推荐档',
      markdown:
        ':::: table-card 套餐价格 variant=price-tier\n' +
        '::: table-row header=true cells="标准 | *高级 | 旗舰"\n:::\n' +
        '::: table-row cells="￥99 | ￥199 | ￥399"\n:::\n' +
        '::: table-row cells="基础功能 | 全部功能 | 含定制"\n:::\n' +
        '::::\n',
    },
  ],
  render: () => {
    return {
      wrapperCSS: ['margin:18px 0'].join(';'),
    }
  },
}

export default priceTier
