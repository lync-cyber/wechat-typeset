/**
 * Theme template 组件源 —— 把 theme.templates 的 7 个可选 markdown 字段
 * 摊平成 ComponentEntry[]，让组件库面板能与 builtin / user 同一抽象消费。
 *
 * P0 抽出（之前内嵌在 ComponentPalette.vue 的 themeTemplateList computed + themeSwatchSvg）：
 *   - "主题模板" tab 的数据派生逻辑归 domain，不再让 UI 层手撸
 *   - kind 仍是 'none'（自由组件桶），与 builtin 的 free 自由组件共桶
 *
 * 不直接消费 ComponentEntry 类型而是 BuiltinEntry —— template 也来自"已注册的设计资产"，
 * 不属于 user，纳入 builtin source 标记即可。UI 层 facade 再投影到 ComponentEntry。
 */

import type { Theme } from '../../../core/themes/types'
import type { BuiltinEntry } from '../types'

interface TemplateDef {
  id: string
  name: string
  hint: string
  md?: string
}

export function getThemeTemplateEntries(theme: Theme): BuiltinEntry[] {
  const t = theme.templates ?? {}
  const defs: TemplateDef[] = [
    { id: 'cover', name: '封面卡', md: t.cover, hint: '文首封面' },
    { id: 'authorBar', name: '作者栏', md: t.authorBar, hint: '作者+日期' },
    { id: 'tip', name: '小贴士', md: t.tip, hint: 'tip 容器' },
    { id: 'compare', name: '对比两列', md: t.compare, hint: '左右两栏' },
    { id: 'steps', name: '步骤流程', md: t.steps, hint: '分步推进' },
    { id: 'footerCTA', name: '文末引导', md: t.footerCTA, hint: '关注/收藏' },
    { id: 'recommend', name: '推荐阅读', md: t.recommend, hint: '文末链接' },
  ]

  return defs
    .filter((d): d is TemplateDef & { md: string } => !!d.md)
    .map<BuiltinEntry>((d) => ({
      source: 'builtin',
      id: `tpl-${theme.id}-${d.id}`,
      name: d.name,
      description: d.hint,
      kind: 'none',
      markdownSnippet: d.md,
      thumbnailSvg: themeSwatchSvg(d.id, theme),
    }))
}

/** 75×75 主题色块：用当前主题色画一张占位卡，用作"主题模板"分类的缩略图。 */
function themeSwatchSvg(key: string, theme: Theme): string {
  const c = theme.tokens.colors
  const fill = key === 'compare' || key === 'steps' ? c.secondary : c.primary
  const label = key.slice(0, 1).toUpperCase()
  return (
    '<svg viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg">' +
    `<rect x="1" y="1" width="73" height="73" rx="6" fill="${c.bg}" stroke="${c.border}" stroke-width="1"/>` +
    `<rect x="10" y="14" width="55" height="4" rx="2" fill="${fill}"/>` +
    `<rect x="10" y="24" width="42" height="2.5" rx="1.25" fill="${c.textMuted}" opacity="0.6"/>` +
    `<rect x="10" y="31" width="50" height="2.5" rx="1.25" fill="${c.textMuted}" opacity="0.4"/>` +
    `<rect x="10" y="38" width="38" height="2.5" rx="1.25" fill="${c.textMuted}" opacity="0.4"/>` +
    `<text x="58" y="62" font-family="ui-monospace,monospace" font-size="16" font-weight="700" fill="${fill}" opacity="0.7">${label}</text>` +
    '</svg>'
  )
}
