/**
 * 组件库 mutations —— "写" 路径的统一入口（P1）。
 *
 * 与直接调 storage/userComponents.repo 的差别:在 commit 前跑一次 validateSnippet,
 * 把"未注册容器 / 未注册 variant"硬阻断在 domain 层,storage 永远只接到合法 markdown。
 *
 * 为什么要有这一层（而非让调用方各自 validate + repo.create）:
 *   - "保存野组件" 是反复出现的需求场景(Studio 表单 / 导入冲突修复 / API 集成),
 *     每个调用方独立校验容易漂移
 *   - 错误形态收敛到 ValidateResult 一种,UI 不用为不同 mutation 写不同 error branch
 *
 * 为什么不在 repo 层做 validate:
 *   - 测试需要 fixture 直接构造非法 entry 模拟"旧数据 / 导入劣化"路径,domain 校验会拦
 *   - validate 依赖 core/vocabulary + variants 注册表,把它扎进 infra/ 反层
 *
 * 三类返回:
 *   - ok=true,带新 entry → 调用方可立即更新 UI
 *   - ok=false reason='validation' → ValidateResult 详情,UI 显示 inline error
 *   - ok=false reason='not-found' → updateComponent 时 id 不存在,UI 提示 "组件已被删除"
 */

import type { UserComponent } from './types'
import { validateSnippet, type ValidateResult } from './validate'
import {
  createUserComponent as repoCreate,
  updateUserComponent as repoUpdate,
  deleteUserComponent as repoDelete,
  getUserComponent as repoGet,
  listUserComponents as repoList,
  type CreateUserComponentInput,
} from '../../infra/storage/userComponents.repo'
import { deleteUserVariant } from '../../infra/storage/userVariants.repo'

export type MutationFailure =
  | { ok: false; reason: 'validation'; result: ValidateResult }
  | { ok: false; reason: 'not-found' }

export type CreateResult =
  | { ok: true; entry: UserComponent }
  | MutationFailure

export type UpdateResult =
  | { ok: true; entry: UserComponent }
  | MutationFailure

/**
 * 创建 user 组件,先校验 markdown。
 *
 * 失败路径不写 storage; 调用方只需检查 res.ok。
 * 成功后返回 storage 里实际落地的 entry(含自动生成的 id / createdAt)。
 */
export function createComponent(input: CreateUserComponentInput): CreateResult {
  const result = validateSnippet(input.markdownSnippet)
  if (!result.ok) {
    return { ok: false, reason: 'validation', result }
  }
  const entry = repoCreate(input)
  return { ok: true, entry }
}

export interface UpdateComponentPatch {
  name?: string
  description?: string
  markdownSnippet?: string
  thumbnailSvg?: string
  /** 关联 UserVariant id；null = 显式清空（解除链接），undefined = 不动 */
  linkedUserVariantId?: string | null
}

/**
 * 更新 user 组件。只在 patch 含 markdownSnippet 时跑 validate(其他字段改名/描述无需校验)。
 * id 未命中返回 not-found,不抛异常 —— UI 通常需要 "组件已被删除" 友好提示。
 */
export function updateComponent(id: string, patch: UpdateComponentPatch): UpdateResult {
  if (patch.markdownSnippet !== undefined) {
    const result = validateSnippet(patch.markdownSnippet)
    if (!result.ok) {
      return { ok: false, reason: 'validation', result }
    }
  }
  const entry = repoUpdate(id, patch)
  if (!entry) return { ok: false, reason: 'not-found' }
  return { ok: true, entry }
}

/**
 * 删除 user 组件 + 级联清理孤儿 UserVariant（步骤 4.4）。
 *
 * 级联规则：
 *   - 读组件 entry 拿 linkedUserVariantId
 *   - 删组件
 *   - 检查删除后是否还有 *其它* 组件引用同一 UV；无则连带删 UV
 *
 * 为什么先读后检查后删：linkedUserVariantId 是关联编码（实际上每次 ComponentStudio 保存都
 * createUserVariant 生成新 UV，理论上不共享），但用户可能通过 transfer JSON 导入复用了同一
 * UV 的组件——保守路径：先确认无第二引用再删，避免删一份组件让另一份"渲染为基底"。
 *
 * 同名导出保留：UI / Studio 只 import 这一个域，不必同时 import mutations + 两个 repo。
 */
export function removeComponent(id: string): void {
  const entry = repoGet(id)
  const linkedId = entry?.linkedUserVariantId
  repoDelete(id)
  if (!linkedId) return
  const stillReferenced = repoList().some((c) => c.linkedUserVariantId === linkedId)
  if (!stillReferenced) {
    deleteUserVariant(linkedId)
  }
}
