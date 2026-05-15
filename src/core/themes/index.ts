/**
 * 主题注册表。每个主题 `./<slug>/index.ts` 导出 `<camelSlug>Theme`，这里显式 import
 * 后按 `theme.id` 装入 registry。
 *
 * 不用 `import.meta.glob`：scripts/verify-sample-full.ts 通过 tsx 在 Node 下直接跑
 * pipeline，tsx 没有 Vite 的 glob 转换会 TypeError。core/ 必须保持框架无关、
 * jsdom 可跑。新增主题在本文件加一行 import + 塞进 ALL_THEMES 即可。
 */

import type { Theme } from './types'
import { defaultTheme } from './default'
import { techGeekTheme } from './tech-geek'
import { techExplainerTheme } from './tech-explainer'
import { lifeAestheticTheme } from './life-aesthetic'
import { businessFinanceTheme } from './business-finance'
import { dataBriefTheme } from './data-brief'
import { literaryHumanismTheme } from './literary-humanism'
import { industryObserverTheme } from './industry-observer'
import { peopleStoryTheme } from './people-story'
import { academicFrontierTheme } from './academic-frontier'
import { editorialMookTheme } from './editorial-mook'
import { swissGridTheme } from './swiss-grid'
import { brutalistTheme } from './brutalist'

/**
 * 主题展示顺序。与 import 顺序解耦：改这里不影响 import 列表，反之亦然。
 * 未在这里列出的主题仍会被加载（追加到末尾，按 id 字典序）。
 */
const DISPLAY_ORDER: readonly string[] = [
  'default',
  'tech-geek',
  'tech-explainer',
  'life-aesthetic',
  'business-finance',
  'data-brief',
  'literary-humanism',
  'industry-observer',
  'people-story',
  'academic-frontier',
  'editorial-mook',
  'swiss-grid',
  'brutalist',
]

const ALL_THEMES: Theme[] = [
  defaultTheme,
  techGeekTheme,
  techExplainerTheme,
  lifeAestheticTheme,
  businessFinanceTheme,
  dataBriefTheme,
  literaryHumanismTheme,
  industryObserverTheme,
  peopleStoryTheme,
  academicFrontierTheme,
  editorialMookTheme,
  swissGridTheme,
  brutalistTheme,
]

function collect(): Record<string, Theme> {
  const raw: Record<string, Theme> = {}
  for (const t of ALL_THEMES) raw[t.id] = t
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

export { defaultTheme } from './default'
