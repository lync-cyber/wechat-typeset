/**
 * admonition · mook-tag（編集附注 · 単字 CJK 标签）
 *
 * 专为 editorial-mook 主题设计：参照 POPEYE / BRUTUS 系 mook 刊"編集メモ"
 * 的母语形态——四态用**单字 CJK 标签** + 米卡纸底 + 主色左竖条 + 标签同色：
 *
 *   - tip     → 参 （参考；推荐做法）
 *   - info    → 編 （編集メモ；编辑注解）
 *   - warning → 注 （注意；轻度提醒）
 *   - danger  → 禁 （禁忌；明确不可做）
 *
 * 视觉与 ledger-cell / marginalia 的差异：
 *   - ledger-cell 走"深色表头条 + 数据感"，强调金融正式；
 *   - marginalia 走"无框墨色一色"，文人手稿气；
 *   - mook-tag 走"米卡纸底 + 单字 inline 标签"，编辑栏目刊感；
 *     用单字而非缩写词 / 大写徽章，承袭日系 mook 编集所附注的紧凑语义。
 *
 * 渲染纪律：
 *   - 用 display:table + display:table-cell 实现"标签 + 正文"横向贴齐
 *     （public-account 不剥 table，剥 flex）
 *   - 标签格 24px 固定宽 + 主色加粗；正文格自适应宽
 *   - titleCSS='' 暗号：renderer 跳过默认标题行，由 svgSlot 承担 label
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { escText } from '../../pipeline/containers/_shared/escape'
import { mergeThumb, svg } from '../_thumb'

/** 四态对应的单字 CJK 标签——mook 编集附注词表。 */
const KIND_LABEL: Record<string, string> = {
  tip: '参',
  info: '編',
  warning: '注',
  danger: '禁',
}

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  // 缩略图：米底 + 左竖条 + 单字
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/>` +
      `<rect x="6" y="14" width="2" height="47" fill="${accent}"/>` +
      `<rect x="13" y="22" width="8" height="8" fill="${accent}"/>` +
      `<rect x="14" y="24" width="6" height="2" fill="${soft}"/>` +
      `<rect x="14" y="27" width="4" height="2" fill="${soft}"/>` +
      `<rect x="26" y="24" width="38" height="2" fill="#5a6068"/>` +
      `<rect x="26" y="30" width="32" height="2" fill="#5a6068"/>` +
      `<rect x="13" y="40" width="50" height="2" fill="#c0c6cf"/>` +
      `<rect x="13" y="47" width="44" height="2" fill="#c0c6cf"/>`,
  )
}

const mookTag: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'mook-tag',
    kind: 'admonition',
    name: '編集附注 単字',
    description: '参/編/注/禁 単字标签 + 米卡纸底 + 主色左条',
    themeCompat: ['editorial-mook'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-info-mook-tag',
      name: '附注 · 編',
      description: '编辑注解（蓝）',
      admonitionKind: 'info',
      thumbArgs: { accent: '#4a7fa8', soft: '#f0ebe0' },
      markdown: '::: info variant=mook-tag\n深夜讀書，光源應在書後側四十五度。\n:::\n',
    },
    {
      presetId: 'ad-tip-mook-tag',
      name: '附注 · 参',
      description: '推荐做法（绿）',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#6b9a5a', soft: '#f0ebe0' },
      markdown: '::: tip variant=mook-tag\n配溫水一盞。茶易醒腦，咖啡斷連續。\n:::\n',
    },
    {
      presetId: 'ad-warning-mook-tag',
      name: '附注 · 注',
      description: '轻度提醒（黄）',
      admonitionKind: 'warning',
      thumbArgs: { accent: '#d4a03a', soft: '#f0ebe0' },
      markdown: '::: warning variant=mook-tag\n手機請於別室充電，不置床頭。\n:::\n',
    },
    {
      presetId: 'ad-danger-mook-tag',
      name: '附注 · 禁',
      description: '明确禁忌（红）',
      admonitionKind: 'danger',
      thumbArgs: { accent: '#e85a3c', soft: '#f0ebe0' },
      markdown: '::: danger variant=mook-tag\n勿在短片畢後方翻書。\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const c = ctx.tokens.colors
    const pair = c.status[kind]
    const label = KIND_LABEL[kind] ?? '注'
    // 设计稿原型：
    //   <div style="background:#f0ebe0; border-left:2px solid <accent>; padding:10px 12px;
    //               font-size:12px; line-height:1.75; color:<text>;">
    //     <b style="color:<accent>">参</b>　body
    //   </div>
    // 用 display:table + 双 cell 让 label 与 body 横向并列；wxPatch 不剥 table。
    return {
      wrapperCSS:
        `display:table;width:100%;table-layout:auto;` +
        `background-color:${pair.soft};` +
        `border-left:2px solid ${pair.accent};` +
        `padding:10px 12px;` +
        `margin:0 0 8px 0;border-radius:0`,
      titleCSS: '',
      bodyCSS:
        `display:table-cell;vertical-align:top;` +
        `font-size:12px;line-height:1.75;color:${c.text}`,
      // 标签格：24px 固定宽 + 主色加粗 + 与 body 同字号 / 行高（避免基线漂移）
      svgSlot:
        `<span style="display:table-cell;vertical-align:top;width:24px;` +
        `font-weight:700;color:${pair.accent};font-size:12px;line-height:1.75">` +
        escText(label) +
        `</span>`,
    }
  },
}

export default mookTag
