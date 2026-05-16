/**
 * codeBlock · terminal-frame（macOS Terminal 窗口腔）
 *
 * 设计语言：终端会话 / SSH / REPL（macOS Terminal、iTerm、tmux）。
 *   - 顶部窗口腔：3 个红/黄/绿圆点（traffic-light）+ 居中等宽窗口标题
 *   - 下方暗色代码区：固定深底 #1d1f23，hljs Atom One Dark 配色直接生效
 *   - 即使在浅色主题下也保持暗腔——"终端"语义胜于"页面 voice"
 *
 * 适合主题：tech-geek（签名）/ brutalist / late-night-vinyl
 * ——任何主打"这段代码是被 run 起来的"的稿件家族。
 *
 * 公众号兼容：
 *   - 3 圆点用 inline SVG 而非 CSS border-radius div（border-radius 在 traffic-light
 *     这种"形状即语义"的位置上 wxPatch 风险更大；SVG 永远是字节级稳定）
 *   - 整段不依赖 flex；用 display:table 横向排列窗口腔
 *   - 标题区写 font-family inline——pipeline 渲染层允许（仅 themeCSS 禁），文档见
 *     databrief/frame.ts 注释
 */

import type { CodeBlockDef } from '../_core'
import { svg } from '../_thumb'

function thumb(): string {
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="#1d1f23"/>` +
      `<rect x="6" y="14" width="63" height="9" rx="3" fill="#2a2d33"/>` +
      `<rect x="6" y="21" width="63" height="2" fill="#1d1f23"/>` +
      `<circle cx="12" cy="18.5" r="1.6" fill="#ff5f57"/>` +
      `<circle cx="17" cy="18.5" r="1.6" fill="#febc2e"/>` +
      `<circle cx="22" cy="18.5" r="1.6" fill="#28c840"/>` +
      `<rect x="32" y="17.5" width="20" height="2.5" rx="0.5" fill="#5c6068"/>` +
      `<text x="11" y="33" font-size="6" fill="#98c379" font-family="monospace">$</text>` +
      `<rect x="17" y="29" width="36" height="2" fill="#abb2bf"/>` +
      `<rect x="11" y="37" width="42" height="2" fill="#56b6c2"/>` +
      `<rect x="11" y="45" width="32" height="2" fill="#c678dd"/>` +
      `<rect x="11" y="53" width="24" height="2" fill="#98c379"/>`,
  )
}

// 终端腔固定配色——脱离主题 voice 是设计意图。
const TERMINAL = {
  body: '#1d1f23',
  chrome: '#2a2d33',
  chromeBorder: '#1d1f23',
  titleText: '#8f9499',
  bodyText: '#d8d8d4',
  light: {
    red: '#ff5f57',
    yellow: '#febc2e',
    green: '#28c840',
  },
} as const

function trafficLights(): string {
  const dot = (color: string) =>
    `<svg viewBox="0 0 12 12" width="12" height="12" style="display:inline-block;vertical-align:middle;margin-right:6px"><circle cx="6" cy="6" r="6" fill="${color}"/></svg>`
  return dot(TERMINAL.light.red) + dot(TERMINAL.light.yellow) + dot(TERMINAL.light.green)
}

function titleFor(language: string): string {
  if (!language) return 'terminal'
  return `${language.toLowerCase()} — bash`
}

const terminalFrame: CodeBlockDef = {
  meta: {
    id: 'terminal-frame',
    kind: 'codeBlock',
    name: '终端代码块',
    description: '窗口腔 + 3 圆点 + 暗底；SSH / REPL 风',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'cb-terminal-frame',
      name: '终端代码块',
      description: '红黄绿圆点 + 标题 + 暗腔；shell / REPL 演示用',
      markdown:
        '```bash variant=terminal-frame\n' +
        '$ git rebase -i HEAD~3\n' +
        '$ git push --force-with-lease\n' +
        '```\n',
    },
  ],
  render: (_theme, { language, codeInnerHtml }) => {
    const wrapper = [
      `margin:20px 0`,
      `border-radius:8px`,
      `overflow:hidden`,
      `background-color:${TERMINAL.body}`,
      `box-shadow:0 1px 0 rgba(0,0,0,0.04)`,
    ].join(';')
    const chrome = [
      `display:table`,
      `width:100%`,
      `padding:8px 12px`,
      `background-color:${TERMINAL.chrome}`,
      `border-bottom:1px solid ${TERMINAL.chromeBorder}`,
    ].join(';')
    const lightsCell = [
      `display:table-cell`,
      `vertical-align:middle`,
      `width:1%`,
      `white-space:nowrap`,
    ].join(';')
    const titleCell = [
      `display:table-cell`,
      `vertical-align:middle`,
      `text-align:center`,
      `font-family:Menlo,Monaco,Consolas,monospace`,
      `font-size:11px`,
      `color:${TERMINAL.titleText}`,
      `letter-spacing:0.04em`,
    ].join(';')
    // 右侧补一个等宽空 cell 保持中线居中（否则 traffic-lights cell 会把 title 推右）
    const spacerCell = [`display:table-cell`, `width:1%`].join(';')
    const preReset = [
      `margin:0`,
      `border-radius:0`,
      `border:none`,
      `background-color:${TERMINAL.body}`,
      `color:${TERMINAL.bodyText}`,
      `padding:14px 16px`,
      `font-size:13px`,
      `line-height:1.6`,
    ].join(';')
    const langClass = language ? `language-${language} hljs` : 'hljs'
    return [
      `<section class="wx-code-block wx-code-block--terminal-frame" style="${wrapper}">`,
      `<section class="wx-code-block__chrome" style="${chrome}">`,
      `<span style="${lightsCell}">${trafficLights()}</span>`,
      `<span style="${titleCell}">${titleFor(language)}</span>`,
      `<span style="${spacerCell}"></span>`,
      `</section>`,
      `<pre class="wx-code-block__pre" style="${preReset}"><code class="${langClass}">${codeInnerHtml}</code></pre>`,
      `</section>`,
    ].join('')
  },
}

export default terminalFrame
