/**
 * Theme 运行时入口。spec 注册表见 ./registry；本文件只做 spec → Theme 投影 + 索引。
 */

import type { Theme } from './types'
import { specToTheme } from './_shared/spec'
import { ORDERED_SPECS } from './registry'

export const themeList: readonly Theme[] = Object.freeze(ORDERED_SPECS.map((s) => specToTheme(s)))

export const themeRegistry: Readonly<Record<string, Theme>> = Object.freeze(
  Object.fromEntries(themeList.map((t) => [t.id, t])),
)

export function getTheme(id: string): Theme {
  return themeRegistry[id] ?? themeRegistry.default
}

export { defaultTheme } from './default'
