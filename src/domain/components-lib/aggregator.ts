/**
 * 组件库聚合器 —— 三源（builtin / themeTemplate / user）→ 统一快照。
 *
 * P0 雏形：纯函数 `buildLibrarySnapshot(theme)` 一次性读三源, 返回分桶数组。
 * UI 层与测试都对此一个入口取数,杜绝"散点取数 + 自己合并"再现的野组件局面。
 *
 * 后续 P3 在此基础上加 Vue composable 包装（订阅 user 列表变化、theme 切换响应）;
 * P0 不引入 Vue 依赖,让本文件在 Node / 测试 / Vue 三种环境都可消费。
 *
 * 注意：buildLibrarySnapshot 返回的 builtin 数组与 BUILTIN_COMPONENTS 是同一个引用,
 * 不要在调用方就地修改; UserComponent 数组是 storage 一次性 read 的拷贝,改之无副作用。
 */

import type { Theme } from '../../core/themes/types'
import type { BuiltinEntry, ComponentEntry, UserComponent } from './types'
import { BUILTIN_COMPONENTS } from './sources/builtin-source'
import { getThemeTemplateEntries } from './sources/theme-template-source'
import { listUserEntries } from './sources/user-source'

export interface LibrarySnapshot {
  /** 内置 variant snippets（含 codeBlock，与其他 variant 同源）。 */
  builtin: ReadonlyArray<BuiltinEntry>
  /** 当前主题的 templates 字段派生条目。主题不声明任何 template 时为空数组。 */
  themeTemplates: ReadonlyArray<BuiltinEntry>
  /** 用户在 localStorage 里自建/导入的组件（按 createdAt 降序）。 */
  user: ReadonlyArray<UserComponent>
}

export function buildLibrarySnapshot(theme: Theme): LibrarySnapshot {
  return {
    builtin: BUILTIN_COMPONENTS,
    themeTemplates: getThemeTemplateEntries(theme),
    user: listUserEntries(),
  }
}

/**
 * 把快照摊平成单一 ComponentEntry[] —— 不分源, 按"主题模板优先, 内置次之, 用户最后"次序。
 * 给"搜索 / 全局 id 查找"这类不关心来源的消费方用。需要按 tab 分类时直接读 snapshot 字段更稳。
 */
export function flattenSnapshot(snap: LibrarySnapshot): ComponentEntry[] {
  return [...snap.themeTemplates, ...snap.builtin, ...snap.user]
}
