/**
 * 公共 API 专用的 persona 注册表。
 *
 * 不复用 src/core/themes/index.ts 的注册流程：公共 API 的首要消费者是 LLM /
 * 外部脚本（tsx / Node），保持纯静态 import 让任何 JS 运行时都能用。增删主题
 * 时本文件与 src/core/themes/index.ts 两处都要改——conformance.spec.ts 的
 * "PERSONA_SPECS ↔ themeList" 断言会守住两处的同步。
 */

import { spec as defaultSpec } from '../core/themes/default/persona.data'
import { spec as techGeekSpec } from '../core/themes/tech-geek/persona.data'
import { spec as techExplainerSpec } from '../core/themes/tech-explainer/persona.data'
import { spec as lifeAestheticSpec } from '../core/themes/life-aesthetic/persona.data'
import { spec as businessFinanceSpec } from '../core/themes/business-finance/persona.data'
import { spec as dataBriefSpec } from '../core/themes/data-brief/persona.data'
import { spec as literaryHumanismSpec } from '../core/themes/literary-humanism/persona.data'
import { spec as industryObserverSpec } from '../core/themes/industry-observer/persona.data'
import { spec as peopleStorySpec } from '../core/themes/people-story/persona.data'
import { spec as academicFrontierSpec } from '../core/themes/academic-frontier/persona.data'
import { spec as editorialMookSpec } from '../core/themes/editorial-mook/persona.data'
import { spec as swissGridSpec } from '../core/themes/swiss-grid/persona.data'
import { spec as brutalistSpec } from '../core/themes/brutalist/persona.data'
import { spec as lateNightVinylSpec } from '../core/themes/late-night-vinyl/persona.data'
import type { PersonaSpec } from '../core/themes/_shared/spec'

/**
 * 展示顺序（与 src/core/themes/index.ts 的 DISPLAY_ORDER 一致）。
 * 非字典序：default 排第一，其余按"面向专业写作场景"的从易到难排。
 */
export const PERSONA_SPECS: readonly PersonaSpec[] = [
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
]

export const PERSONA_REGISTRY: Readonly<Record<string, PersonaSpec>> = Object.freeze(
  Object.fromEntries(PERSONA_SPECS.map((s) => [s.id, s])),
)
