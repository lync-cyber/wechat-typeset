/**
 * table-card · key-value（双栏规格 spec sheet）
 *
 * 人格：spec sheet / `<dl>` 风。强制 2 列：左 key 35% 右 value 65%。
 * 视觉骨架：每行下 1px hairline；左列 bgSoft + monospace + 右对齐 + textMuted 加粗；
 *   右列透明底 + 左对齐 + text 色。header 行（如有）跨两列居中。
 *
 * cells 解析约定：作者写 `cells="key | value"`——非 header 行 cells.length ≠ 2 时
 *   触发一次 dev warn（renderer 仍按 fallback 渲染：少列补空、多列截断）；
 *   header=true 时整行 join 后跨两列居中（少见，key-value 通常无 header）。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { soft, text, accent } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="22" height="47" fill="${soft}"/>` +
      `<path d="M6 24H69M6 34H69M6 44H69M6 54H69" stroke="${text}"/>` +
      `<g fill="${text}">` +
      `<rect x="14" y="18" width="11" height="2"/>` +
      `<rect x="14" y="28" width="11" height="2"/>` +
      `<rect x="14" y="38" width="11" height="2"/>` +
      `<rect x="14" y="48" width="11" height="2"/></g>` +
      `<g fill="${accent}">` +
      `<rect x="32" y="18" width="22" height="2"/>` +
      `<rect x="32" y="28" width="28" height="2"/>` +
      `<rect x="32" y="38" width="18" height="2"/>` +
      `<rect x="32" y="48" width="24" height="2"/></g>`,
  )
}

const keyValue: VariantDef = {
  meta: {
    id: 'key-value',
    kind: 'tableCard',
    name: '规格表',
    description: '双栏 key-value，spec sheet 风',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'table-card-key-value',
      name: '表格 · 规格',
      description: '左 key 右 value，行间 hairline',
      markdown:
        ':::: table-card 产品规格 variant=key-value\n' +
        '::: table-row cells="处理器 | M4 Pro 12 核"\n:::\n' +
        '::: table-row cells="内存 | 24GB 统一内存"\n:::\n' +
        '::: table-row cells="存储 | 512GB SSD"\n:::\n' +
        '::: table-row cells="售价 | ￥14999"\n:::\n' +
        '::::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        `border-top:1px solid ${c.border}`,
        'margin:18px 0',
      ].join(';'),
    }
  },
}

export default keyValue
