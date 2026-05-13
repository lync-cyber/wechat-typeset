/**
 * 用户组件导入 / 导出（JSON 形态）。
 *
 * 与 repo 解耦：transfer 仅依赖 readList / writeList 这对底层访问点 + 类型守卫,
 * 不重复处理 createdAt / defaultThumb / 兜底等业务字段。
 *
 * 文件格式 v1:
 *   { "version": 1, "components": UserComponent[] }
 *
 * 导入策略:
 *   - id 冲突跳过(保留现有,不覆盖)——避免 import 误覆盖用户当前组件
 *   - 非数组 / 解析失败 → 返回 0
 *   - 不做 validate.ts 校验:导入是 "把别处导出的合法数据搬过来",原则上应已合法;
 *     真要拦野组件,在 mutations 层暴露另一个 importValidated 接口(P2 视需要再加)
 */

import type { UserComponent } from '../../domain/components-lib/types'
import { readList, writeList } from './userComponents.repo'

function isUserComponent(v: unknown): v is UserComponent {
  if (!v || typeof v !== 'object') return false
  const o = v as Record<string, unknown>
  return (
    typeof o.id === 'string' &&
    typeof o.name === 'string' &&
    typeof o.markdownSnippet === 'string' &&
    typeof o.thumbnailSvg === 'string'
  )
}

export function exportUserComponentsJSON(): string {
  return JSON.stringify({ version: 1, components: readList() }, null, 2)
}

export function importUserComponentsJSON(json: string): number {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    return 0
  }
  const arr =
    parsed && typeof parsed === 'object' && 'components' in parsed
      ? (parsed as { components: unknown }).components
      : parsed
  if (!Array.isArray(arr)) return 0
  const list = readList()
  let added = 0
  for (const raw of arr) {
    if (!isUserComponent(raw)) continue
    if (list.some((c) => c.id === raw.id)) continue
    list.push(raw)
    added += 1
  }
  writeList(list)
  return added
}
