/**
 * _template · 新主题骨架 · PersonaSpec
 *
 * 定位：复制本目录 → 改 id/name/palette/motifs/variants → 起步可用的最小主题。
 * 受众：写新 persona 的工程师 / LLM。
 * Voice：刻意中性——所有 palette/typography 取通用兜底值，不携带任何风格倾向。
 *        视觉签名（accent 取色、motif 形状、variant 选型）由复制后的主题自己决定。
 *
 * 使用：
 *   1. `cp -r src/core/themes/_template src/core/themes/<your-id>`
 *   2. 把本文件里的 id 改为目录名（kebab-case），同步改 name/description/audience
 *   3. 调 palette / status / typography / motifs（最少留一个 motif，schema 不允许空集）
 *   4. 选择 variants（DEFAULT_VARIANTS 是兜底，若不改即得到 default 主题的骨架）
 *   5. 解开下面 `// optional:` 段里需要用的字段，按 JSDoc 提示填充
 *   6. 在 src/core/themes/registry.ts 追加 import + DISPLAY_ORDER
 *   7. 跑 `npx tsx scripts/validate-spec.ts src/core/themes/<your-id>/persona.data.ts`
 *
 * 本文件被 registry / generator / test glob 显式排除（dir 名以 `_` 开头），
 * 不进运行时 themeList、不上 gallery、不参与 conformance 校验。
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: '_template',
  name: '骨架模板',
  description: '新主题起步骨架——复制本目录后改 id/name/palette/motifs/variants 即可',
  audience: '工程师 / LLM 起手参考',

  palette: {
    primary: '#5B6470',
    secondary: '#9aa0aa',
    accent: '#5B6470',
    bg: '#ffffff',
    bgSoft: '#f4f5f7',
    bgMuted: '#e6e7eb',
    text: '#1a1d22',
    textMuted: '#6b7280',
    textInverse: '#fefefe',
    border: '#d8dadf',
    code: '#1a1d22',
  },

  status: {
    tip: { accent: '#1f8a4c', soft: '#eef6ef' },
    info: { accent: '#2558b0', soft: '#eef2f9' },
    warning: { accent: '#9a6b1a', soft: '#f7f0df' },
    danger: { accent: '#b42318', soft: '#fbecea' },
  },

  typography: {
    baseSize: 15,
    lineHeight: 1.75,
    h1Size: 22,
    h2Size: 19,
    h3Size: 16,
    letterSpacing: 0.3,
  },

  spacing: {
    paragraph: 18,
    section: 28,
    listItem: 8,
    containerPadding: 16,
  },

  radius: { sm: 4, md: 6, lg: 8 },

  // schema 要求 motifs 非空——至少留一个 dividerDots 作为最低门槛
  motifs: {
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: 'circle', cx: 96, cy: 4, r: 2, fill: '#d8d8d4' },
        { type: 'circle', cx: 120, cy: 4, r: 2, fill: '#5B6470' },
        { type: 'circle', cx: 144, cy: 4, r: 2, fill: '#d8d8d4' },
      ],
    },
  },

  // DEFAULT_VARIANTS 显式写出——复制后改任一槽位都能立即看到骨架变化
  variants: {
    admonition: 'accent-bar',
    quote: 'classic',
    compare: 'column-card',
    steps: 'number-circle',
    divider: 'rule',
    sectionTitle: 'bordered',
    codeBlock: 'bare',
    note: 'minimal-callout',
    footnotes: 'lined',
    recommend: 'card-list',
    qrcode: 'bare',
  },

  // ------------------------------------------------------------
  // optional: 以下字段全部可选；按需解开注释
  // ------------------------------------------------------------

  // optional · elements (StylePatch<ThemeElements>)
  // 覆盖 baseElements 的 h1-h6/p/blockquote/list/code/kbd/pre/table 等元素 CSS。
  // 深合并，`__reset: true` sentinel 表示整段替换而非合并。
  // elements: {
  //   h1: { 'font-size': '24px', 'font-weight': '700' },
  //   p: { 'line-height': '1.75' },
  // },

  // optional · containers (StylePatch<ThemeContainers>)
  // 容器 wrapper CSS 覆盖（intro / quoteCard / tip / sectionTitle 等的最外层 style）。
  // containers: {
  //   intro: { 'background-color': '#f4f5f7', padding: '14px 16px' },
  // },

  // optional · innerStyles (StylePatch<ThemeInnerStyles>)
  // abstract kicker / key-number 数字 / see-also 标题等容器内层子元素 inline style。
  // innerStyles: {
  //   keyNumber: { number: { 'font-size': '40px', 'font-weight': '700' } },
  // },

  // optional · inline (StylePatch<ThemeInline>)
  // 内联强调样式：highlight / wavy / emphasis / del / ins。
  // inline: {
  //   highlight: { 'background-color': '#fff4c8' },
  //   wavy: { 'text-decoration': 'underline wavy', 'text-decoration-color': '#5B6470' },
  // },

  // optional · kickers (Partial<ThemeKickers>)
  // renderer 默认 kicker 文案的主题级覆盖；作者侧 markdown 不写 info 即可拿到主题母语 kicker。
  // kickers: {
  //   tip: '小贴士',
  //   warning: '注意',
  // },

  // optional · decorations
  // 标题前缀编号 / intro 首字下沉等声明式装饰；视觉签名一律走这里而非 markdown.ts if 分支。
  // decorations: {
  //   h2Numbering: { format: 'roman', kind: 'prefix' },
  // },

  // optional · templates
  // 封面 / author / footer-cta / recommend / compare / steps / tip 的 markdown 片段示例。
  // templates: {
  //   cover: '::: cover\n# {title}\n:::',
  // },

  // optional · signatureContainers
  // 登记本主题必须具备的签名容器 id；conformance 测试守"声称 vs 实现"对齐。
  // signatureContainers: ['intro', 'imageCaption'],

  // optional · capabilities
  // 白名单 + variant 推荐 + 排除清单，用于 LLM 推荐与 API 查询（不影响渲染）。
  // capabilities: {
  //   containers: ['intro', 'quote-card', 'tip'],
  //   variantOverrides: { admonition: 'terminal' },
  //   excluded: ['tilted-sticker'],
  // },

  // optional · svgVariant
  // applyPalette runtime 路径的工厂选型（用户改配色时的 fallback）：
  // 'geometric' | 'soft' | 'serif' | 'playful'，缺省 = 'geometric'。
  // svgVariant: 'geometric',

  meta: {
    createdAt: '2026-05-16',
    ownerNotes:
      '骨架模板：复制此目录 → 改 id/name/palette/motifs/variants 即可起步。所有可选字段以注释形态保留，复制后按需启用。',
  },
}

export default spec
