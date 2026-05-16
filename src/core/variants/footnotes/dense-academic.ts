/**
 * footnotes · dense-academic（论文 bibliography）
 *
 * 设计语言：学术期刊 / 论文末尾的参考文献章。
 *   - 深 hanging indent（2.4em）—— 编号 [1][2] 视觉上"挂"在文段左侧，正文整齐回缩
 *   - 11px 字号 + 1.4 line-height —— 信息密度推到接近"参考列表"的极限
 *   - 顶部细栏一道 2px primary 实线（不同于 top-rule 的 hairline；这里是"章节级"分割）
 *   - kicker 走粗体 + 中等 letter-spacing，承载"参考文献 / REFERENCES"这样的标题
 *
 * 适合主题：academic-frontier / business-finance / industry-observer
 * ——任何作者会写 [Author 2023] 或 [^citation] 序号挂载的研究 / 内参家族。
 *
 * 与 lined / top-rule 的分工：
 *   - lined          = 1.6em hanging + 13px（默认，5-10 条短引用）
 *   - top-rule       = hairline 顶栏 + 11px（报纸尾注）
 *   - dense-academic = 2.4em hanging + 11px + 顶部 2px 章节线（**本文件**）
 *
 * 视觉抓点：左 24px 编号缩进 + 顶部彩色章节杆 —— 远离另外两档"克制"路径，
 * 主动承担"这一段是被引用的"识别功能。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="62" height="2" fill="${accent}"/>` +
      `<text x="6" y="26" font-size="5" fill="${accent}" font-weight="700">REFERENCES</text>` +
      `<text x="6" y="36" font-size="4" fill="#7a8389" font-family="monospace">[1]</text>` +
      `<rect x="13" y="32" width="50" height="1.2" fill="#9aa1aa"/>` +
      `<rect x="13" y="36" width="42" height="1.2" fill="#9aa1aa"/>` +
      `<text x="6" y="46" font-size="4" fill="#7a8389" font-family="monospace">[2]</text>` +
      `<rect x="13" y="42" width="54" height="1.2" fill="#9aa1aa"/>` +
      `<rect x="13" y="46" width="40" height="1.2" fill="#9aa1aa"/>` +
      `<text x="6" y="56" font-size="4" fill="#7a8389" font-family="monospace">[3]</text>` +
      `<rect x="13" y="52" width="46" height="1.2" fill="#9aa1aa"/>` +
      `<rect x="13" y="56" width="38" height="1.2" fill="#9aa1aa"/>`,
  )
}

const denseAcademic: VariantDef = {
  meta: {
    id: 'dense-academic',
    kind: 'footnotes',
    name: '论文 bibliography',
    description: '2px 章节杆 + 2.4em 深 hanging + 11px',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'footnotes-dense-academic',
      name: '脚注 · 论文 bibliography',
      description: '2px 章节杆 + 深 hanging + 11px；研究/内参的参考文献章',
      markdown:
        '::: footnotes REFERENCES variant=dense-academic\n' +
        '[1] Chen, Y., & Wang, L. (2024). Representation collapse under low temperature. *NeurIPS Proceedings*, 38, 1124-1138.\n' +
        '[2] He, K., et al. (2020). Momentum contrast for unsupervised visual representation learning. *CVPR*, 9729-9738.\n' +
        ':::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        // 顶部 2px primary 章节杆——与 top-rule 的 1px hairline 视觉等级不同
        `border-top:2px solid ${c.primary}`,
        `padding:14px 0 4px 2.4em`,
        `text-indent:-2.4em`,
        `font-size:11px`,
        `line-height:1.45`,
        `color:${c.text}`,
      ].join(';'),
      titleCSS: [
        `font-size:11px`,
        `font-weight:700`,
        `letter-spacing:0.12em`,
        `text-transform:uppercase`,
        `color:${c.primary}`,
        `margin:0 0 12px 0`,
        `text-indent:0`,
      ].join(';'),
    }
  },
}

export default denseAcademic
