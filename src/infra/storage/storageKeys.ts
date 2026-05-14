/**
 * localStorage key 集中地。
 *
 * 单源原则：每个 key 只在此处声明一次。多个文件共用 key（如主题 id 在
 * bootstrap 启动恢复 + themeOrchestrator 切换写盘各用一次）必须从此 import，
 * 不得本地 const 复制。
 *
 * 命名规范：`wechat-typeset:<domain>[:<sub>]`，与 quota.ts 的扫描前缀一致。
 *
 * 暂未迁入的 key（按所属模块就近声明）：
 *   - 'wechat-typeset:ui-theme'           src/app/uiTheme.ts
 *   - 'wechat-typeset:onboard:dismissed'  src/app/App.vue
 *   - 'wechat-typeset:outlink-strategy'   src/ui/composables/useClipboardCopy.ts
 *   - 'wechat-typeset:dev:sampleBuildId'  src/ui/composables/useDraftLifecycle.ts
 *   - 'wechat-typeset:user-components'    src/infra/storage/userComponents.repo.ts
 *   - 'wechat-typeset:drafts:*'           src/infra/storage/drafts.ts
 *   仅当出现跨文件复用时再迁入此处，避免凑数。
 */

/** 当前锁定的主题 id；bootstrap 启动恢复 + themeOrchestrator 切换写盘共用。 */
export const THEME_STORAGE_KEY = 'wechat-typeset:theme:last'

/** 桌面端编辑栏显式像素宽度；bootstrap 启动恢复 + 同 watcher 持久化。 */
export const EDITOR_WIDTH_STORAGE_KEY = 'wechat-typeset:editor-width'
