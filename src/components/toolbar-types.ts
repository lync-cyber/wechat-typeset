/**
 * Toolbar 命令总线契约。
 *
 * 为什么搞总线：原来 18 个 emit 事件一对一触发，App.vue ↔ Toolbar 每加一个菜单项
 * 都要同时改两端。收敛为 4 个事件后，新增"无参动作"只要往 ToolbarAction 联合
 * 加一个成员，Toolbar 模板里 emit('action', 'newThing')，App.vue 在 onAction switch
 * 里补一个 case 即可——接口压缩到 4 条管道，变更扩散范围更小。
 *
 * 约束：
 *   - toggle 专用于"同侧互斥的抽屉切换"，保留单独事件是因为 target 枚举在未来可能还会变
 *   - action 仅承载无载荷的纯动作；任何需要载荷的交互仍走自己的 update:* 事件
 */

export type ToolbarToggleTarget = 'drafts' | 'components' | 'customizer' | 'checklist'

export type ToolbarAction =
  | 'copy'
  | 'clear'
  | 'loadSample'
  | 'saveSelection'
  | 'fixZhTypo'
  | 'exportHtml'
  | 'exportMd'
  | 'exportImage'
  | 'copyShareLink'
  | 'openCommand'
  | 'openHelp'
  | 'dismissError'
