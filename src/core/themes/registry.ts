/**
 * Persona 注册表单一真源。所有内置主题在此显式 import 一次；
 * Theme（运行时）与 public 层都从这里派生。
 *
 * 新增主题：在 ALL_SPECS 追加 import + 加进 DISPLAY_ORDER（不进 DISPLAY_ORDER 时按 id 字典序落到末尾）。
 * 不用 `import.meta.glob`：tsx/Node 直跑 pipeline 不认 Vite 转换。
 */

import type { PersonaSpec } from './_shared/spec'
import { spec as defaultSpec } from './default/persona.data'
import { spec as techGeekSpec } from './tech-geek/persona.data'
import { spec as techExplainerSpec } from './tech-explainer/persona.data'
import { spec as lifeAestheticSpec } from './life-aesthetic/persona.data'
import { spec as businessFinanceSpec } from './business-finance/persona.data'
import { spec as dataBriefSpec } from './data-brief/persona.data'
import { spec as literaryHumanismSpec } from './literary-humanism/persona.data'
import { spec as industryObserverSpec } from './industry-observer/persona.data'
import { spec as peopleStorySpec } from './people-story/persona.data'
import { spec as academicFrontierSpec } from './academic-frontier/persona.data'
import { spec as editorialMookSpec } from './editorial-mook/persona.data'
import { spec as swissGridSpec } from './swiss-grid/persona.data'
import { spec as brutalistSpec } from './brutalist/persona.data'
import { spec as lateNightVinylSpec } from './late-night-vinyl/persona.data'
// Phase 4 通用性补档：填补"电商 / 青年潮文化 / 政务公告 / 教育亲子"四档场景缺口
import { spec as commercePulseSpec } from './commerce-pulse/persona.data'
import { spec as youthZineSpec } from './youth-zine/persona.data'
import { spec as officialGazetteSpec } from './official-gazette/persona.data'
import { spec as eduClassroomSpec } from './edu-classroom/persona.data'

const ALL_SPECS: readonly PersonaSpec[] = [
  defaultSpec,
  techGeekSpec,
  techExplainerSpec,
  lifeAestheticSpec,
  businessFinanceSpec,
  dataBriefSpec,
  literaryHumanismSpec,
  industryObserverSpec,
  peopleStorySpec,
  academicFrontierSpec,
  editorialMookSpec,
  swissGridSpec,
  brutalistSpec,
  lateNightVinylSpec,
  commercePulseSpec,
  youthZineSpec,
  officialGazetteSpec,
  eduClassroomSpec,
]

export const DISPLAY_ORDER: readonly string[] = [
  'default',
  // 技术档
  'tech-geek',
  'tech-explainer',
  // 商业/数据档
  'business-finance',
  'data-brief',
  'industry-observer',
  'commerce-pulse',
  // 人文档
  'literary-humanism',
  'people-story',
  'editorial-mook',
  'late-night-vinyl',
  // 生活/教育档
  'life-aesthetic',
  'edu-classroom',
  // 学术/严肃档
  'academic-frontier',
  'official-gazette',
  // 设计/实验档
  'swiss-grid',
  'brutalist',
  // 青年/亚文化档
  'youth-zine',
]

function order<T extends { id: string }>(arr: readonly T[], priority: readonly string[]): T[] {
  const raw: Record<string, T> = {}
  for (const x of arr) raw[x.id] = x
  const out: T[] = []
  for (const id of priority) if (raw[id]) out.push(raw[id])
  for (const id of Object.keys(raw).sort()) if (!priority.includes(id)) out.push(raw[id])
  return out
}

export const ORDERED_SPECS: readonly PersonaSpec[] = Object.freeze(order(ALL_SPECS, DISPLAY_ORDER))

export const SPEC_REGISTRY: Readonly<Record<string, PersonaSpec>> = Object.freeze(
  Object.fromEntries(ORDERED_SPECS.map((s) => [s.id, s])),
)
