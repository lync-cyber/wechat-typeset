/**
 * compare · column-card（默认）
 *
 * 两栏 CSS table 等高卡片：display:table + table-cell。flex 不行、inline-block 阶梯，
 * table 是微信粘贴后唯一稳定的等高多栏。border-spacing 吸收列间隙。
 */

import type { VariantDef, CompareRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

const COL_FONT_SIZE = 13
const COL_INNER_PAD = 10

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="16" width="29" height="45" rx="3" fill="${soft}"/>` +
      `<rect x="40" y="16" width="29" height="45" rx="3" fill="${soft}"/>` +
      `<rect x="12" y="22" width="15" height="2" fill="#1a8450"/>` +
      `<rect x="12" y="30" width="18" height="2" fill="#c0c6cf"/>` +
      `<rect x="12" y="36" width="14" height="2" fill="#c0c6cf"/>` +
      `<rect x="46" y="22" width="15" height="2" fill="#b42318"/>` +
      `<rect x="46" y="30" width="18" height="2" fill="#c0c6cf"/>` +
      `<rect x="46" y="36" width="14" height="2" fill="#c0c6cf"/>`,
  )
}

const columnCard: VariantDef<CompareRenderArgs> = {
  meta: {
    id: 'column-card',
    kind: 'compare',
    name: '两栏卡片对比',
    description: '等高 table-cell 两栏（默认）',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'cmp-column-card',
      name: '两栏卡片对比',
      description: '等高 table-cell 两栏（默认）',
      markdown:
        ':::: compare\n' +
        '::: pros 优点\n- 要点 1\n- 要点 2\n:::\n' +
        '::: cons 缺点\n- 要点 1\n- 要点 2\n:::\n' +
        '::::\n',
    },
    {
      presetId: 'cmp-column-rich',
      name: '两栏 + 标题',
      description: '每栏带自定义标题',
      markdown:
        ':::: compare\n' +
        '::: pros 方案 A\n适合场景 / 成本 / 时效\n:::\n' +
        '::: cons 方案 B\n适合场景 / 成本 / 时效\n:::\n' +
        '::::\n',
    },
  ],
  render: (ctx, { slot }) => {
    if (slot === 'wrapper') {
      return {
        wrapperCSS:
          `display:table;width:100%;table-layout:fixed;` +
          `border-spacing:4px 0;border-collapse:separate;margin:16px 0`,
      }
    }
    const pair =
      slot === 'pros'
        ? ctx.tokens.colors.status.tip.accent
        : ctx.tokens.colors.status.danger.accent
    return {
      wrapperCSS:
        `display:table-cell;vertical-align:top;width:50%;box-sizing:border-box;` +
        `padding:${COL_INNER_PAD}px;` +
        `background-color:${ctx.tokens.colors.bgSoft};` +
        `border-radius:${ctx.tokens.radius.md}px;` +
        `font-size:${COL_FONT_SIZE}px;letter-spacing:0`,
      titleCSS:
        `font-size:${COL_FONT_SIZE + 1}px;font-weight:700;` +
        `color:${pair};margin-bottom:8px;letter-spacing:0;line-height:1.4`,
    }
  },
}

export default columnCard
