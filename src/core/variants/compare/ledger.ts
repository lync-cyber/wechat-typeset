/**
 * compare · ledger（账本双色列）
 *
 * 外框一整块圆角矩形，中间 1px 竖线分隔；左右两列各用 tip.soft / danger.soft 垫底，
 * 像老账本的"收入 / 支出"对账。保留 column-card 的 display:table 骨架，仅底色和边框不同。
 */

import type { VariantDef, CompareRenderArgs } from '../_core'
import { svg } from '../_thumb'

const COL_FONT_SIZE = 13

function thumb(): string {
  return svg(
    `<rect x="8" y="16" width="59" height="43" rx="3" fill="#fff" stroke="#c0c6cf"/>` +
      `<rect x="8" y="16" width="30" height="43" fill="#eef7f0"/>` +
      `<rect x="38" y="16" width="29" height="43" fill="#fdecea"/>` +
      `<rect x="14" y="24" width="16" height="2" fill="#1a8450"/>` +
      `<rect x="14" y="32" width="18" height="2" fill="#c0c6cf"/>` +
      `<rect x="44" y="24" width="16" height="2" fill="#b42318"/>` +
      `<rect x="44" y="32" width="18" height="2" fill="#c0c6cf"/>`,
  )
}

const ledger: VariantDef<CompareRenderArgs> = {
  meta: {
    id: 'ledger',
    kind: 'compare',
    name: '账本双色对比',
    description: '绿/红双色列，账面感',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'cmp-ledger',
      name: '账本双色对比',
      description: '绿/红双色列，账面感',
      markdown:
        ':::: compare variant=ledger\n' +
        '::: pros 优点\n- 要点 1\n- 要点 2\n:::\n' +
        '::: cons 缺点\n- 要点 1\n- 要点 2\n:::\n' +
        '::::\n',
    },
    {
      presetId: 'cmp-ledger-short',
      name: '账本精简',
      description: '单列 ≤3 行场景',
      markdown:
        ':::: compare variant=ledger\n' +
        '::: pros 收入\n- 订阅\n- 广告\n:::\n' +
        '::: cons 支出\n- 服务器\n- 人力\n:::\n' +
        '::::\n',
    },
  ],
  render: (ctx, { slot }) => {
    if (slot === 'wrapper') {
      return {
        wrapperCSS:
          `display:table;width:100%;table-layout:fixed;border-spacing:0;border-collapse:separate;` +
          `margin:16px 0;border:1px solid ${ctx.tokens.colors.border};border-radius:6px`,
      }
    }
    const pair =
      slot === 'pros' ? ctx.tokens.colors.status.tip : ctx.tokens.colors.status.danger
    const borderRight =
      slot === 'pros'
        ? `border-right:1px solid ${ctx.tokens.colors.border}`
        : 'border-right:0'
    const radius =
      slot === 'pros' ? `border-radius:5px 0 0 5px` : `border-radius:0 5px 5px 0`
    return {
      wrapperCSS:
        `display:table-cell;vertical-align:top;width:50%;box-sizing:border-box;` +
        `padding:12px;background-color:${pair.soft};${borderRight};${radius};` +
        `font-size:${COL_FONT_SIZE}px;letter-spacing:0`,
      titleCSS:
        `font-weight:700;color:${pair.accent};margin-bottom:6px;font-size:${COL_FONT_SIZE + 1}px`,
    }
  },
}

export default ledger
