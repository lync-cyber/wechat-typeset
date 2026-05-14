/**
 * 主题注册表
 *
 * 每个主题目录下 `./<slug>/index.ts` 导出一个 Theme 对象（命名为 `<camelSlug>Theme`）。
 * 这里显式 import 全部主题再按 `theme.id` 装入 registry。
 *
 * 为何用显式 import 而非 `import.meta.glob`：和 `core/variants/registry.ts` 同源理由——
 * `scripts/verify-sample-full.ts` 通过 tsx 在 Node 下直接跑 pipeline，tsx 没有 Vite 的
 * glob 转换会 TypeError。R7 阶段把 core/ 钉死为"框架无关、jsdom-可跑"，import.meta.glob
 * 是 Vite 专属语法，必须移除。新增主题需要在本文件加一行 import + 把对象塞进 ALL_THEMES。
 *
 * 兼容备注：`defaultTheme` 作为命名导出保留，有测试直接 `import { defaultTheme } from '../../src/core/themes'`。
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
import { lateNightVinylTheme } from './late-night-vinyl'

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
  'late-night-vinyl',
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
  lateNightVinylTheme,
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

// 兼容旧命名导入（tests/variant-sanity.spec.ts 等）
export { defaultTheme } from './default'
