/**
 * useUserComponents —— "我的组件"列表 + 增删的 domain 层 composable。
 * 内化刷新时机：UI 层不再写 `refreshTick.value += 1` 这类 hacky 代码。
 *
 * 范围刻意小——只暴露 list / create / remove 三件事。需要 update / export / import 时再扩。
 */
import { computed, ref, type ComputedRef } from 'vue'
import type { ComponentEntry } from '../../domain/components-lib/types'
import {
  createUserComponent as storageCreate,
  deleteUserComponent as storageRemove,
  listUserComponents,
  type CreateUserComponentInput,
} from '../../infra/storage/userComponents'

export interface UseUserComponents {
  list: ComputedRef<ComponentEntry[]>
  create(input: CreateUserComponentInput): ComponentEntry
  remove(id: string): void
  refresh(): void
}

export function useUserComponents(): UseUserComponents {
  const tick = ref(0)
  const bump = () => { tick.value += 1 }

  return {
    list: computed(() => {
      void tick.value
      return listUserComponents()
    }),
    create(input) {
      const created = storageCreate(input)
      bump()
      return created
    },
    remove(id) {
      storageRemove(id)
      bump()
    },
    refresh: bump,
  }
}
