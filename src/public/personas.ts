/**
 * 公共 API 专用的 persona 注册表。
 *
 * 为什么不复用 src/themes/index.ts：那个模块走 `import.meta.glob`，仅在 Vite 构建时生效；
 * 公共 API 的首要消费者是 LLM / 外部脚本（tsx / Node），在原生 Node 里 glob 语法会直接报错。
 * 这里用 9 份 persona.spec.ts 的静态 import 做冗余注册表——增删主题时两处都要改，
 * 但换回来的是"任何 JS 运行时都能用"。
 */

import { spec as defaultSpec } from '../themes/default/persona.spec'
import { spec as techGeekSpec } from '../themes/tech-geek/persona.spec'
import { spec as techExplainerSpec } from '../themes/tech-explainer/persona.spec'
import { spec as lifeAestheticSpec } from '../themes/life-aesthetic/persona.spec'
import { spec as businessFinanceSpec } from '../themes/business-finance/persona.spec'
import { spec as literaryHumanismSpec } from '../themes/literary-humanism/persona.spec'
import { spec as industryObserverSpec } from '../themes/industry-observer/persona.spec'
import { spec as peopleStorySpec } from '../themes/people-story/persona.spec'
import { spec as academicFrontierSpec } from '../themes/academic-frontier/persona.spec'
import type { PersonaSpec } from '../themes/_shared/spec'

/**
 * 展示顺序（与 src/themes/index.ts 的 DISPLAY_ORDER 一致）。
 * 非字典序：default 排第一，其余按"面向专业写作场景"的从易到难排。
 */
export const PERSONA_SPECS: readonly PersonaSpec[] = [
  defaultSpec,
  techGeekSpec,
  techExplainerSpec,
  lifeAestheticSpec,
  businessFinanceSpec,
  literaryHumanismSpec,
  industryObserverSpec,
  peopleStorySpec,
  academicFrontierSpec,
]

export const PERSONA_REGISTRY: Readonly<Record<string, PersonaSpec>> = Object.freeze(
  Object.fromEntries(PERSONA_SPECS.map((s) => [s.id, s])),
)
