/**
 * 平台适配契约
 *
 * 一个 PlatformAdapter 描述 "把通用 HTML 适配到某发布平台" 的完整能力：
 *   - patch(html, opts)   渲染管线最后一步调用的 html → html 纯函数链
 *   - inspect(html)?      可选：扫描即将命中的修补点，供透明度面板展示
 *
 * 渲染管线（pipeline/index.ts）按 RenderInput.platform 经 registry 查表派发；
 * 各平台自管 patch 链与示例集，互不依赖。新增平台只需在本 platforms/ 下新建一个目录，
 * 实现一个 adapter，并在 registry.ts 登记，**不修改管线主流程**。
 *
 * 设计纪律：
 *   1. adapter.patch 必须幂等（连续调用两次结果一致）；现有 wechat 8 patches 已满足。
 *   2. opts 形态由各平台自行决定。当前管线只把 wxPatch 字段透传给 wechat；其它平台
 *      若需配置项，建议在自家 opts 上加字段并在 RenderInput 上同步暴露。
 *   3. adapter.id 必须与目录名一致（registry 用它做 key）。
 *   4. status:
 *        - 'stable'      契约稳定可发版（wechat）
 *        - 'placeholder' 仅占位，patch 为 identity；fork / PR 补完前不暴露 UI 选项
 *        - 'beta'        基础 patch 已有但未覆盖所有边缘情况
 */

import type { PatchLog, PatchLogEntry, PatchLogSample } from './wechat/inspect'

export type PlatformStatus = 'stable' | 'beta' | 'placeholder'

export interface PlatformAdapter {
  /** 与目录名 / registry key 一致的稳定 id（kebab-case，全小写） */
  readonly id: string
  /** 中文显示名（UI 与 capabilities.json 展示用） */
  readonly name: string
  /** 契约成熟度，详见 PlatformStatus */
  readonly status: PlatformStatus
  /**
   * 把通用 HTML 适配为该平台粘贴友好的 HTML。
   *
   * opts 形态因平台而异；调用方只需保证传入的 opts 与该平台契约匹配。
   * 不识别的字段 adapter 应静默忽略，不抛错。
   */
  patch(html: string, opts?: unknown): string
  /**
   * 可选：扫描尚未修补的 HTML 列出即将命中的修补条目。
   * 仅 wechat 当前实现；其它平台缺省时 UI 透明度面板按 entries:[] / total:0 处理。
   */
  inspect?(html: string): PatchLog
}

export type { PatchLog, PatchLogEntry, PatchLogSample }
