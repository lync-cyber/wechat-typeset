/**
 * scripts/_lib.ts —— 仅供 scripts/ 内部脚本共享的工具函数。
 *
 * 放本目录而非 src/ 的理由：
 *   - 不是运行时代码，不参与 bundle / 不在 capabilities 表面
 *   - 仅 build / check / gen 类脚本之间复用
 */

import { globSync } from 'node:fs'
import { resolve, basename, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'

import type { PersonaSpec } from '../src/core/themes/_shared/spec'

export interface LoadedSpec {
  dir: string
  spec: PersonaSpec
}

/** 扫描 src/core/themes/*\/persona.data.ts，按目录名字典序返回所有内置 persona spec。 */
export async function loadAllSpecs(): Promise<LoadedSpec[]> {
  const paths = globSync('src/core/themes/*/persona.data.ts', { cwd: process.cwd() })
    .map((p) => resolve(process.cwd(), p))
    .sort()
  const out: LoadedSpec[] = []
  for (const p of paths) {
    const mod = await import(pathToFileURL(p).href)
    const spec = (mod.spec ?? mod.default) as PersonaSpec | undefined
    if (!spec) throw new Error(`No "spec" export in ${p}`)
    out.push({ dir: basename(dirname(p)), spec })
  }
  return out
}

/** 跨平台行尾归一化：CRLF → LF，用于派生产物 drift 比对。 */
export function normalizeEol(source: string): string {
  return source.replace(/\r\n/g, '\n')
}
