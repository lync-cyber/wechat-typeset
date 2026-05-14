/**
 * 公共 API 专用的 persona 注册表。
 *
 * 为什么不复用 src/themes/index.ts：那个模块过去走 `import.meta.glob`（仅 Vite 构建期生效）；
 * 公共 API 的首要消费者是 LLM / 外部脚本（tsx / Node），原生 Node 里 glob 语法会直接报错。
 * 这里用静态 import 做冗余注册表——增删主题时与 src/core/themes/index.ts 两处都要改，
 * 但换回来的是"任何 JS 运行时都能用"。conformance.spec.ts 的"PERSONA_SPECS ↔ themeList"
 * 断言会守住两处的同步：漏注册一处即 CI 红。
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
]

export const PERSONA_REGISTRY: Readonly<Record<string, PersonaSpec>> = Object.freeze(
  Object.fromEntries(PERSONA_SPECS.map((s) => [s.id, s])),
)
