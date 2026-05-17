/**
 * dialogue + dialogue-turn 容器（嵌套）
 *
 * 外层 4 冒号 dialogue；内层 3 冒号 dialogue-turn。dialogue-turn.body 是 markdown
 * 渲染的多段内容——必须 open / close 双段输出（参考 timeline-item），不能在
 * open 里吐完整 turn。markdown-it 会把每个 turn 的多段 / 列表渲染插入 open / close 之间。
 *
 * 4 个 variant 通过 DIALOGUE_STACK 栈顶 variantId 分派到独立 render 函数，
 * 让每个 variant 自主决定 turn 的"头/尾"HTML 结构。
 */

import type { ContainerRenderer, ContainerRenderContext } from './types'
import type { DialogueVariantId } from '../../themes/types'
import { DIALOGUE_VARIANTS } from '../../variants/registry'
import { escText } from './_shared/escape'
import { inlineCss as inline } from './_shared/cssInline'
import { resolveVariantId } from './_shared/resolveVariant'

interface DialogueStackEntry {
  variantId: DialogueVariantId
  turnCount: number
}

// dialogue 不允许嵌套自身（同名同 fence 长度）；栈仅服务"父-子"耦合，深度恒 0/1。
const DIALOGUE_STACK: DialogueStackEntry[] = []

export const dialogueContainer: ContainerRenderer = {
  open: (ctx) => {
    const variantId = resolveVariantId<DialogueVariantId>(
      ctx,
      'dialogue',
      DIALOGUE_VARIANTS,
      'qa-rows',
    )
    DIALOGUE_STACK.push({ variantId, turnCount: 0 })
    const entry = DIALOGUE_VARIANTS[variantId] ?? DIALOGUE_VARIANTS['qa-rows']
    const result = entry.render(ctx)
    const wrapperCSS = inline(ctx.containers.dialogue) + ';' + result.wrapperCSS
    const title = ctx.info.trim()
    const c = ctx.tokens.colors
    const titleCSS = [
      'font-weight:700',
      `color:${c.text}`,
      'font-size:14px',
      'letter-spacing:0.5px',
      'margin-bottom:12px',
    ].join(';')
    const titleEl = title
      ? `<section class="container-dialogue__title" style="${titleCSS}">${escText(title)}</section>\n`
      : ''
    return (
      `<section class="container-dialogue container-dialogue--${variantId}" style="${wrapperCSS}">\n` +
      titleEl
    )
  },
  close: () => {
    DIALOGUE_STACK.pop()
    return `</section>\n`
  },
}

export const dialogueTurnContainer: ContainerRenderer = {
  open: (ctx) => {
    const top = DIALOGUE_STACK[DIALOGUE_STACK.length - 1]
    if (!top) return ''
    const name = ctx.attrs.name ?? ''
    const role = ctx.attrs.role ?? ''
    const side = ctx.attrs.side ?? 'left'
    top.turnCount += 1
    const idx = top.turnCount - 1
    switch (top.variantId) {
      case 'chat-bubbles':
        return renderChatBubbleOpen(ctx, name, side)
      case 'name-prefix':
        return renderNamePrefixOpen(ctx, name)
      case 'interview-column':
        return renderInterviewColumnOpen(ctx, name, role)
      case 'qa-rows':
      default:
        return renderQARowOpen(ctx, name, role, idx)
    }
  },
  close: () => {
    const top = DIALOGUE_STACK[DIALOGUE_STACK.length - 1]
    if (!top) return ''
    switch (top.variantId) {
      case 'chat-bubbles':
        return renderChatBubbleClose()
      case 'name-prefix':
        return renderNamePrefixClose()
      case 'interview-column':
        return renderInterviewColumnClose()
      case 'qa-rows':
      default:
        return renderQARowClose()
    }
  },
}

// ============================================================
// qa-rows · Q 强 / A 弱纵向交替
// ============================================================

// role 归一：Q / 主持人 / 提问 视为 Q 侧；其它视为 A 侧。
function isQRole(role: string): boolean {
  const r = role.trim()
  if (!r) return false
  if (r === 'Q' || r === 'q') return true
  if (r === '主持人' || r === '提问' || r === '问') return true
  return false
}

function renderQARowOpen(
  ctx: ContainerRenderContext,
  name: string,
  role: string,
  idx: number,
): string {
  const c = ctx.tokens.colors
  const isQ = isQRole(role)
  const rowCSS = [
    'display:table',
    'width:100%',
    'table-layout:fixed',
    idx === 0 ? 'margin-top:0' : 'margin-top:18px',
  ].join(';')
  const badgeCellCSS = 'display:table-cell;vertical-align:top;width:32px;padding-right:10px'
  const badgeCSS = isQ
    ? [
        'display:inline-block',
        'width:24px',
        'height:24px',
        `background-color:${c.primary}`,
        `color:${c.textInverse}`,
        'text-align:center',
        'line-height:24px',
        'font-size:12px',
        'font-weight:700',
        'letter-spacing:0',
      ].join(';')
    : [
        'display:inline-block',
        'width:24px',
        'height:24px',
        'background-color:transparent',
        `border:1px solid ${c.textMuted}`,
        `color:${c.textMuted}`,
        'text-align:center',
        'line-height:22px',
        'font-size:12px',
        'font-weight:700',
      ].join(';')
  const bodyCellCSS = 'display:table-cell;vertical-align:top'
  const nameCSS = [
    'display:block',
    `color:${c.textMuted}`,
    'font-size:11px',
    'letter-spacing:0.1em',
    'margin-bottom:4px',
    'font-weight:600',
  ].join(';')
  const bodyCSS = `color:${c.text};font-size:14px;line-height:1.7`
  const label = isQ ? 'Q' : 'A'
  const nameRow = name
    ? `<span style="${nameCSS}">${escText(name)}</span>`
    : ''
  return (
    `<section class="container-dialogue-turn" style="${rowCSS}">` +
    `<span style="${badgeCellCSS}"><span style="${badgeCSS}">${label}</span></span>` +
    `<span style="${bodyCellCSS}">${nameRow}<span style="${bodyCSS}">`
  )
}

function renderQARowClose(): string {
  return '</span></span></section>\n'
}

// ============================================================
// chat-bubbles · 左右气泡 + 头像圆 + inline SVG 尾巴
// ============================================================

// chat-bubbles close 需要在 body 之后补"尾巴 + 右 avatar"——但 close 不感知 attrs。
// 栈在 open 时把"close 段所需 HTML"提前算好塞进来，close 直接弹出拼接。
const CHAT_TURN_STATE: Array<{ tailAfter: string; rightAvatarHtml: string }> = []

function renderChatBubbleOpen(
  ctx: ContainerRenderContext,
  name: string,
  side: string,
): string {
  const c = ctx.tokens.colors
  const isRight = side === 'right'
  const initial = (name || '?').slice(0, 1)
  const avatarBg = isRight ? c.primary : c.textMuted
  const bubbleBg = c.bgSoft
  const slotCSS = 'display:table-cell;vertical-align:top;width:36px'
  // 头像：inline SVG circle + 首字母（避开 border-radius 在公众号粘贴里被剥的风险）
  const avatarSvg =
    `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:top">` +
    `<circle cx="14" cy="14" r="14" fill="${avatarBg}"/>` +
    `<text x="14" y="18" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">${escText(initial)}</text>` +
    `</svg>`
  CHAT_TURN_STATE.push({
    tailAfter: isRight ? renderChatTail(bubbleBg, 'right') : '',
    rightAvatarHtml: isRight
      ? `<span style="${slotCSS}">${avatarSvg}</span>`
      : `<span style="${slotCSS}"></span>`,
  })
  const rowCSS = [
    'display:table',
    'width:100%',
    'table-layout:fixed',
    'margin-top:14px',
  ].join(';')
  const bodyCellCSS = [
    'display:table-cell',
    'vertical-align:top',
    'padding:0 8px',
    isRight ? 'text-align:right' : 'text-align:left',
  ].join(';')
  const nameCSS = [
    'display:block',
    `color:${c.textMuted}`,
    'font-size:11px',
    'margin-bottom:3px',
  ].join(';')
  const bubbleCSS = [
    'display:inline-block',
    `background-color:${bubbleBg}`,
    `color:${c.text}`,
    'padding:10px 14px',
    'border-radius:12px',
    'font-size:14px',
    'line-height:1.65',
    'max-width:84%',
    'vertical-align:top',
    'text-align:left',
  ].join(';')
  const nameRow = name ? `<span style="${nameCSS}">${escText(name)}</span>` : ''
  const tailBefore = isRight ? '' : renderChatTail(bubbleBg, 'left')
  const leftCell = isRight
    ? `<span style="${slotCSS}"></span>`
    : `<span style="${slotCSS}">${avatarSvg}</span>`
  return (
    `<section class="container-dialogue-turn" style="${rowCSS}">` +
    leftCell +
    `<span style="${bodyCellCSS}">${nameRow}${tailBefore}<span style="${bubbleCSS}">`
  )
}

function renderChatBubbleClose(): string {
  const state = CHAT_TURN_STATE.pop()
  if (!state) return '</span></span></section>\n'
  return `</span>${state.tailAfter}</span>${state.rightAvatarHtml}</section>\n`
}

function renderChatTail(fill: string, dir: 'left' | 'right'): string {
  // 公众号后台剥 ::before/::after，唯一稳妥是 DOM 真插 inline SVG 画三角
  const path = dir === 'left' ? 'M8,0 L0,5 L8,10 Z' : 'M0,0 L8,5 L0,10 Z'
  return (
    `<svg width="8" height="10" viewBox="0 0 8 10" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:bottom">` +
    `<path d="${path}" fill="${fill}"/>` +
    `</svg>`
  )
}

// ============================================================
// name-prefix · 剧本式 inline "**名字**：内容"
// ============================================================

function renderNamePrefixOpen(ctx: ContainerRenderContext, name: string): string {
  const c = ctx.tokens.colors
  const pCSS = [
    'margin:0 0 12px',
    'font-size:14px',
    'line-height:1.75',
    `color:${c.text}`,
  ].join(';')
  // monospace 在 inline 会被微信剥，本地预览有效；其它装饰最少
  const nameCSS = [
    'display:inline',
    'font-weight:700',
    `color:${c.accent}`,
    'font-size:13px',
    'letter-spacing:0.5px',
    'font-family:Menlo,Monaco,monospace',
    'margin-right:2px',
  ].join(';')
  const nameHtml = name
    ? `<span style="${nameCSS}">${escText(name)}：</span>`
    : ''
  return (
    `<section class="container-dialogue-turn" style="${pCSS}">${nameHtml}<span style="display:inline">`
  )
}

function renderNamePrefixClose(): string {
  return '</span></section>\n'
}

// ============================================================
// interview-column · 杂志栏左姓名 / 右长答 + hairline
// ============================================================

function renderInterviewColumnOpen(
  ctx: ContainerRenderContext,
  name: string,
  role: string,
): string {
  const c = ctx.tokens.colors
  const rowCSS = [
    'display:table',
    'width:100%',
    'table-layout:fixed',
    'margin-bottom:16px',
  ].join(';')
  const nameCellCSS = [
    'display:table-cell',
    'vertical-align:top',
    'width:96px',
    'padding-right:12px',
    'text-align:right',
  ].join(';')
  const nameCSS = [
    'display:block',
    `color:${c.textMuted}`,
    'font-size:11px',
    'letter-spacing:0.15em',
    'text-transform:uppercase',
    'font-weight:700',
    'line-height:1.6',
    'padding-top:4px',
  ].join(';')
  const roleCSS = [
    'display:block',
    `color:${c.textMuted}`,
    'font-size:10px',
    'letter-spacing:0.05em',
    'margin-top:2px',
    'font-weight:400',
  ].join(';')
  const bodyCellCSS = [
    'display:table-cell',
    'vertical-align:top',
    'padding-left:16px',
    `border-left:1px solid ${c.border}`,
  ].join(';')
  const bodyCSS = [
    `color:${c.text}`,
    'font-size:17px',
    'line-height:1.8',
    'text-align:left',
  ].join(';')
  const nameHtml = name ? `<span style="${nameCSS}">${escText(name)}</span>` : ''
  const roleHtml = role ? `<span style="${roleCSS}">${escText(role)}</span>` : ''
  return (
    `<section class="container-dialogue-turn" style="${rowCSS}">` +
    `<span style="${nameCellCSS}">${nameHtml}${roleHtml}</span>` +
    `<span style="${bodyCellCSS}"><span style="${bodyCSS}">`
  )
}

function renderInterviewColumnClose(): string {
  return '</span></span></section>\n'
}
