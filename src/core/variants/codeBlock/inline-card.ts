/**
 * codeBlock · inline-card（编辑随文嵌入式）
 *
 * 设计语言：随文嵌入的引用片段。tinted 软底 + 左主色窄竖条 + 紧凑 padding，
 * 没有顶栏、没有 copy 图标、字号比常规 pre 小 1px——让代码视觉重量"贴回正文"。
 *
 * 与 bare / header-bar 的语义分工：
 *   - bare         = "代码是讲解主体"（默认 pre）
 *   - header-bar   = "代码段落是文档化的"（语言徽章 + copy）
 *   - terminal-frame = "代码是被 run 起来的"（终端腔）
 *   - line-numbers = "代码会被按行号引用"（IDE gutter）
 *   - inline-card  = "代码是文中一笔"（嵌入式短片段）
 *
 * 适合主题：editorial-mook / literary-humanism / life-aesthetic / people-story
 * ——任何代码只在偶尔出现、且作者不愿让它喧宾夺主的文学/生活向稿件家族。
 *
 * 颜色策略：bg = bgSoft、border-left = primary、文字色继承主题 preText/text；
 * 不写死中性灰——这样浅色温润主题 + 暖橙主题切换时背景与左条都会跟随 voice。
 */

import type { CodeBlockDef } from '../_core'
import type { Theme } from '../../themes/types'
import { svg } from '../_thumb'

function thumb(): string {
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="2" fill="#f4f1ec"/>` +
      `<rect x="6" y="14" width="3" height="47" fill="#c09060"/>` +
      `<rect x="14" y="22" width="42" height="2" fill="#7a8389"/>` +
      `<rect x="14" y="30" width="34" height="2" fill="#a3a8ad"/>` +
      `<rect x="14" y="38" width="46" height="2" fill="#7a8389"/>` +
      `<rect x="14" y="46" width="26" height="2" fill="#a3a8ad"/>` +
      `<rect x="14" y="54" width="38" height="2" fill="#7a8389"/>`,
  )
}

interface Styles {
  wrapper: string
  preReset: string
}

function styles(theme: Theme): Styles {
  const { colors, radius } = theme.tokens
  // primary 在浅底主题里能承担"窄竖条"语义；暗底主题 preBg 已是深色，
  // 此 variant 的"嵌入感"在视觉对比上仍然成立（左竖条用 accent 也可——
  // 这里取 primary 保持与 quote 元素一致的视觉签名）
  const wrapper = [
    `margin:12px 0`,
    `border-radius:${radius.sm}px`,
    `overflow:hidden`,
    `background-color:${colors.bgSoft}`,
    `border-left:3px solid ${colors.primary}`,
  ].join(';')
  // 内部 pre 重置：透明背景让 wrapper 的 tint 透出；padding 收紧；字号 -1px
  const preReset = [
    `margin:0`,
    `border:none`,
    `border-radius:0`,
    `background:transparent`,
    `color:${colors.preText ?? colors.text}`,
    `padding:10px 14px`,
    `font-size:12px`,
    `line-height:1.6`,
  ].join(';')
  return { wrapper, preReset }
}

const inlineCard: CodeBlockDef = {
  meta: {
    id: 'inline-card',
    kind: 'codeBlock',
    name: '嵌入代码片段',
    description: '左竖条 + tinted 软底 + 紧凑字号，随文引用',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'cb-inline-card',
      name: '嵌入代码片段',
      description: '左竖条 + 软底 + 紧凑字号；文学/生活向稿件随文引用代码',
      markdown:
        '```javascript variant=inline-card\n' +
        "const greet = (name) => `Hello, ${name}`\n" +
        '```\n',
    },
  ],
  render: (theme, { language, codeInnerHtml }) => {
    const { wrapper, preReset } = styles(theme)
    const langClass = language ? `language-${language} hljs` : 'hljs'
    return [
      `<section class="wx-code-block wx-code-block--inline-card" style="${wrapper}">`,
      `<pre class="wx-code-block__pre" style="${preReset}"><code class="${langClass}">${codeInnerHtml}</code></pre>`,
      `</section>`,
    ].join('')
  },
}

export default inlineCard
