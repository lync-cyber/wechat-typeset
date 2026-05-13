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
  type CreateUserComponentInput,
} from '../../infra/storage/userComponents.repo'

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
 * 删除 user 组件。
 *
 * 删除不需要 validate(永远合法), 也不会返回 not-found —— 已删除的 id 重复删等价 no-op,
 * 暴露 not-found 反而要求 UI 写防御代码。直接代理给 repo.delete。
 *
 * 保留 mutations 这一层 export 是为了让 UI / Studio 只 import 一个域(mutations),
 * 不必同时 import mutations + repo.deleteUserComponent。
 */
export function removeComponent(id: string): void {
  repoDelete(id)
}
