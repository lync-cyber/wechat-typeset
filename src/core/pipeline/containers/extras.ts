/**
 * 第二批 base 容器渲染器：announcement / author-bio / image-caption / timeline
 *
 * 与 admonition / signature / data-brief 家族的边界：
 *   - announcement: 文章级强警示横幅（比 tip/warning 强势）；走 ctx.containers.announcement
 *     兜底（danger soft + 左条）。attrs.tone 切换 status 色（primary / accent / danger）。
 *   - author-bio: 多行作者简介卡。与 author 单行署名行正交。attrs.avatar 触发头像渲染。
 *   - image-caption: 图 + 居中小字灰说明。attrs.src 触发 img 自动渲染；body 接续描述。
 *   - timeline: 年份 + 事件的时序列表；外层 4 个冒号，内部 timeline-item 列条目。
 *     与 steps 的边界：steps 是动作序列，timeline 是历史时序。
 */

import type { ContainerRenderer } from './types'
import { escAttr, escText } from './_shared/escape'
import { inlineCss as inline } from './_shared/cssInline'

export const announcementContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim()
    const tone = ctx.attrs.tone ?? 'danger'
    const statusKey: 'tip' | 'info' | 'warning' | 'danger' =
      tone === 'primary' ? 'info' : tone === 'accent' ? 'tip' : 'danger'
    const status = ctx.tokens.colors.status[statusKey]
    // tone 非默认时覆盖 wrapper bg / border 色（默认 wrapper 已经走 danger 兜底）
    const wrapperCSS =
      inline(ctx.containers.announcement) +
      (tone !== 'danger'
        ? `;background-color:${status.soft};border-left:4px solid ${status.accent}`
        : '')
    const titleCSS = `font-weight:700;color:${status.accent};font-size:14px;letter-spacing:0.5px;margin-bottom:6px`
    const titleRow = title
      ? `<section class="container-announcement__title" style="${titleCSS}">${escText(title)}</section>\n`
      : ''
    return `<section class="container-announcement" style="${wrapperCSS}">\n${titleRow}`
  },
  close: '</section>\n',
}

export const authorBioContainer: ContainerRenderer = {
  open: (ctx) => {
    const name = ctx.attrs.name ?? ctx.info.trim()
    const role = ctx.attrs.role ?? ''
    const avatar = ctx.attrs.avatar ?? ''
    const wrapperCSS = inline(ctx.containers.authorBio)
    const nameCSS = `font-weight:700;font-size:15px;color:${ctx.tokens.colors.text};margin-bottom:2px`
    const roleCSS = `font-size:12px;color:${ctx.tokens.colors.textMuted};letter-spacing:0.5px;margin-bottom:8px`
    const avatarHtml = avatar
      ? `<img src="${escAttr(avatar)}" alt="${escAttr(name || 'author')}" style="display:inline-block;width:48px;height:48px;border-radius:24px;vertical-align:middle;margin-right:12px;object-fit:cover" />`
      : ''
    const nameRow = name
      ? `<section class="container-author-bio__name" style="${nameCSS}">${escText(name)}</section>\n`
      : ''
    const roleRow = role
      ? `<section class="container-author-bio__role" style="${roleCSS}">${escText(role)}</section>\n`
      : ''
    const headRow =
      avatarHtml || nameRow || roleRow
        ? `<section style="margin-bottom:8px">${avatarHtml}<section style="display:inline-block;vertical-align:middle">${nameRow}${roleRow}</section></section>\n`
        : ''
    return `<section class="container-author-bio" style="${wrapperCSS}">\n${headRow}`
  },
  close: '</section>\n',
}

export const imageCaptionContainer: ContainerRenderer = {
  open: (ctx) => {
    const caption = ctx.info.trim()
    const src = ctx.attrs.src ?? ''
    const alt = ctx.attrs.alt ?? caption
    const wrapperCSS = inline(ctx.containers.imageCaption)
    const imgHtml = src
      ? `<img src="${escAttr(src)}" alt="${escAttr(alt)}" style="max-width:100%;display:block;margin:0 auto 6px;border-radius:4px" />\n`
      : ''
    const captionCSS = `font-size:12px;color:${ctx.tokens.colors.textMuted};letter-spacing:0.5px;line-height:1.6;text-align:center;margin-bottom:6px`
    const captionRow = caption
      ? `<section class="container-image-caption__caption" style="${captionCSS}">${escText(caption)}</section>\n`
      : ''
    return `<section class="container-image-caption" style="${wrapperCSS}">\n${imgHtml}${captionRow}`
  },
  close: '</section>\n',
}

// timeline 外框：上下分隔线 + 内部由 timeline-item 自摆 row（display:table 双栏）
export const timelineContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim()
    const wrapperCSS = inline(ctx.containers.timeline)
    const titleCSS = `font-weight:700;font-size:14px;color:${ctx.tokens.colors.text};letter-spacing:0.5px;margin-bottom:10px`
    const titleRow = title
      ? `<section class="container-timeline__title" style="${titleCSS}">${escText(title)}</section>\n`
      : ''
    return `<section class="container-timeline" style="${wrapperCSS}">\n${titleRow}`
  },
  close: '</section>\n',
}

export const timelineItemContainer: ContainerRenderer = {
  open: (ctx) => {
    const year = ctx.attrs.year ?? ''
    const title = ctx.info.trim()
    // 双栏 table-cell：左侧年份 monospace 主色 / 右侧事件
    const rowCSS = `display:table;width:100%;table-layout:fixed;margin-bottom:10px`
    const yearCSS = [
      'display:table-cell',
      'vertical-align:top',
      'width:64px',
      'font-family:Menlo,Monaco,monospace',
      `color:${ctx.tokens.colors.primary}`,
      'font-size:12px',
      'font-weight:700',
      'letter-spacing:0.5px',
      'padding-right:12px',
    ].join(';')
    const bodyCSS = `display:table-cell;vertical-align:top`
    const titleCSS = `font-weight:600;font-size:14px;color:${ctx.tokens.colors.text};margin-bottom:4px;line-height:1.5`
    const titleRow = title
      ? `<section class="container-timeline-item__title" style="${titleCSS}">${escText(title)}</section>\n`
      : ''
    return (
      `<section class="container-timeline-item" style="${rowCSS}">\n` +
      `<span style="${yearCSS}">${escText(year)}</span>` +
      `<span style="${bodyCSS}">${titleRow}`
    )
  },
  close: '</span></section>\n',
}
