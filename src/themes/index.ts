/**
 * 主题注册表（glob 自动发现版）
 *
 * 每个主题目录下 `./<slug>/index.ts` 导出一个 Theme 对象（命名通常是 `<camelSlug>Theme`）。
 * 这里通过 `import.meta.glob` 一次吃掉所有主题，按 `theme.id` 装入 registry —— 新增/删除
 * 主题只需增删目录，这个文件不用改。
 *
 * 兼容备注：`defaultTheme` 作为命名导出保留，有测试直接 `import { defaultTheme } from '../src/themes'`。
 */

import type { Theme } from './types'

/**
 * 主题展示顺序。与文件系统顺序解耦：想调位置改这里，不碰目录名。
 * 未在这里列出的主题仍会被加载（追加到末尾，按 id 字典序），
 * 保证"新建目录即生效"的零配置体验。
 */
const DISPLAY_ORDER: readonly string[] = [
  'default',
  'tech-geek',
  'tech-explainer',
  'life-aesthetic',
  'business-finance',
  'literary-humanism',
  'industry-observer',
  'people-story',
  'academic-frontier',
]

const modules = import.meta.glob<Record<string, unknown>>('./*/index.ts', { eager: true })

function isTheme(value: unknown): value is Theme {
  return (
    !!value &&
    typeof value === 'object' &&
    'id' in (value as object) &&
    'tokens' in (value as object) &&
    'elements' in (value as object)
  )
}

function collect(): Record<string, Theme> {
  const raw: Record<string, Theme> = {}
  for (const mod of Object.values(modules)) {
    for (const value of Object.values(mod)) {
      if (isTheme(value)) raw[value.id] = value
    }
  }
  const ordered: Record<string, Theme> = {}
  for (const id of DISPLAY_ORDER) if (raw[id]) ordered[id] = raw[id]
  for (const id of Object.keys(raw).sort()) if (!(id in ordered)) ordered[id] = raw[id]
  return ordered
}

export const themeRegistry: Record<string, Theme> = collect()
export const themeList: Theme[] = Object.values(themeRegistry)

export function getTheme(id: string): Theme {
  return themeRegistry[id] ?? themeRegistry.default
}

// 兼容旧命名导入（tests/variant-sanity.spec.ts 等）
export { defaultTheme } from './default'
