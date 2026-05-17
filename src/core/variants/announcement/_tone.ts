/**
 * tone → status key 映射。tone 与 variant 正交：4 个 variant 都按此规则取色。
 *   tone='primary' → 'info'；tone='accent' → 'tip'；其它（含默认 / 'danger'）→ 'danger'。
 */

import type { AdmonitionKind } from '../_core'

export function toneToStatusKey(tone: string | undefined): AdmonitionKind {
  if (tone === 'primary') return 'info'
  if (tone === 'accent') return 'tip'
  return 'danger'
}
