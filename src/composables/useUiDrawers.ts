/**
 * 抽屉与浮层状态集中管理。
 *
 * 四个独占槽位：leftSlot（drafts）/ rightSlot（components/customizer/checklist）/
 * commandOpen（命令面板）/ helpOpen（帮助）。同侧同一时刻只显示一个。
 *
 * drawerStates 面向 Toolbar：它只关心每个按钮是否 active，不关心底层槽位枚举。
 */

import { computed, reactive } from 'vue'

export type LeftSlot = null | 'drafts'
export type RightSlot = null | 'components' | 'customizer' | 'checklist'

export function useUiDrawers() {
  const ui = reactive({
    leftSlot: null as LeftSlot,
    rightSlot: null as RightSlot,
    commandOpen: false,
    helpOpen: false,
  })

  const drawerStates = computed(() => ({
    drafts: ui.leftSlot === 'drafts',
    components: ui.rightSlot === 'components',
    customizer: ui.rightSlot === 'customizer',
    checklist: ui.rightSlot === 'checklist',
  }))

  function toggleLeft(slot: 'drafts') {
    ui.leftSlot = ui.leftSlot === slot ? null : slot
  }
  function toggleRight(slot: 'components' | 'customizer' | 'checklist') {
    ui.rightSlot = ui.rightSlot === slot ? null : slot
  }
  function closeAll() {
    ui.leftSlot = null
    ui.rightSlot = null
  }

  return { ui, drawerStates, toggleLeft, toggleRight, closeAll }
}
