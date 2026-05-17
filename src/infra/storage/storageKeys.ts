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
 *   - 'wechat-typeset:user-variants'      src/infra/storage/userVariants.repo.ts
 *   - 'wechat-typeset:drafts:*'           src/infra/storage/drafts.ts
 *   仅当出现跨文件复用时再迁入此处，避免凑数。
 */

/** 当前锁定的主题 id；bootstrap 启动恢复 + themeOrchestrator 切换写盘共用。 */
export const THEME_STORAGE_KEY = 'wechat-typeset:theme:last'

/** 桌面端编辑栏显式像素宽度；bootstrap 启动恢复 + 同 watcher 持久化。 */
export const EDITOR_WIDTH_STORAGE_KEY = 'wechat-typeset:editor-width'

/**
 * 桌面端右侧抽屉显式像素宽度。两个抽屉各自一份：
 *   - components：ComponentPalette（默认 var(--drawer-w-sm) = 340）
 *   - persona-studio：PersonaStudio（默认 var(--drawer-w-md) = 400）
 *
 * value === null（未存储 / "null" 字面量）= 走 CSS 默认变量；number = 显式像素。
 * 抽屉作为高级用户工作面板，可拖左缘加宽；移动端无此机制（CSS 已让抽屉全屏覆盖）。
 */
export const COMPONENT_PALETTE_WIDTH_KEY = 'wechat-typeset:component-palette-width'
export const PERSONA_STUDIO_WIDTH_KEY = 'wechat-typeset:persona-studio-width'
