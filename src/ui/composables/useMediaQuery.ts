/**
 * 把 window.matchMedia 包成响应式 ref —— 让组件按断点 v-if 挂载子树。
 *
 * 初值在 onMounted 前为 false（避开 SSR / 测试环境无 window 的场景，本仓库目前是纯 CSR，
 * 但保持 onMounted 同步首测，避免任何挂载前的副作用）。挂载后立刻同步一次 matches，
 * 之后 listener 跟踪 change 事件，组件卸载时移除监听。
 */
import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

export function useMediaQuery(query: string): Ref<boolean> {
  const matches = ref(false)
  let mql: MediaQueryList | null = null
  const onChange = (e: MediaQueryListEvent): void => {
    matches.value = e.matches
  }
  onMounted(() => {
    mql = window.matchMedia(query)
    matches.value = mql.matches
    mql.addEventListener('change', onChange)
  })
  onBeforeUnmount(() => {
    mql?.removeEventListener('change', onChange)
    mql = null
  })
  return matches
}
