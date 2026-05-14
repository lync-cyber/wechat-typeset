/**
 * capabilities.json 兼容性 diff
 *
 * 目的：在 PR 阶段比对"主分支基线"与"当前分支"的两份 capabilities.json，
 * 找出未经 deprecations[] 登记的破坏性变更并失败 CI——保护"公开 CDN URL"承诺：
 * 下游集成方拉到稳定 URL 时不会被无声的字段删除卡死。
 *
 * 设计纪律：
 *   - 这是 best-effort 守门，不是穷举所有可能的契约破坏；遵循"显式枚举关心的
 *     维度"原则，避免假阳性。当前覆盖：
 *       · schemaVersion major / minor 倒退
 *       · personas[].id 缺失
 *       · containers[].id 缺失
 *       · 单 container 的 variants[] 元素缺失
 *       · platforms[].id 缺失
 *       · platforms[].status 由 stable → placeholder（"退化"）
 *       · inlineExtensions[].syntax 缺失
 *   - 添加字段一律视为非破坏（minor 兼容）；本工具不报。
 *   - 移除项若已经在 `before.deprecations[]` 里以同 id 登记，则视为合规移除（前
 *     一个 schemaVersion 已给下游窗口）。
 *
 * 用法：作为纯函数被 CLI 与单测共用；CLI 见 check-capabilities-stable.ts。
 */

export interface CapabilitiesShape {
  schemaVersion: string
  personas?: ReadonlyArray<{ id: string }>
  containers?: ReadonlyArray<{ id: string; variants?: readonly string[] }>
  platforms?: ReadonlyArray<{ id: string; status?: string }>
  inlineExtensions?: ReadonlyArray<{ syntax: string }>
  deprecations?: ReadonlyArray<{ id: string }>
}

export interface BreakingChange {
  /** dotted path 形态：如 'personas.tech-geek' / 'containers.qrcode.variants.minimal' */
  path: string
  /** 面向人类的简短说明 */
  reason: string
}

export interface DiffResult {
  breaking: BreakingChange[]
  /** 信息性（contract 成长）；CI 不阻塞，仅展示供 reviewer 参考。 */
  growth: string[]
}

function parseSchemaVersion(v: string): [number, number] {
  const m = v.match(/^(\d+)\.(\d+)$/)
  if (!m) return [0, 0]
  return [Number(m[1]), Number(m[2])]
}

function deprecatedIds(c: CapabilitiesShape): Set<string> {
  return new Set((c.deprecations ?? []).map((d) => d.id))
}

export function diffCapabilities(
  before: CapabilitiesShape,
  after: CapabilitiesShape,
): DiffResult {
  const breaking: BreakingChange[] = []
  const growth: string[] = []
  const deprecated = deprecatedIds(before)

  // schemaVersion：major 倒退 / minor 倒退视为破坏（前者总是破坏；后者意味着回退发布）
  const [bMajor, bMinor] = parseSchemaVersion(before.schemaVersion)
  const [aMajor, aMinor] = parseSchemaVersion(after.schemaVersion)
  if (aMajor < bMajor) {
    breaking.push({
      path: 'schemaVersion',
      reason: `major 倒退：${before.schemaVersion} → ${after.schemaVersion}（不允许）`,
    })
  } else if (aMajor === bMajor && aMinor < bMinor) {
    breaking.push({
      path: 'schemaVersion',
      reason: `minor 倒退：${before.schemaVersion} → ${after.schemaVersion}`,
    })
  } else if (aMajor > bMajor) {
    breaking.push({
      path: 'schemaVersion',
      reason: `major 升级：${before.schemaVersion} → ${after.schemaVersion}（必须在 PR 描述里说明迁移方案）`,
    })
  } else if (aMajor === bMajor && aMinor > bMinor) {
    growth.push(`schemaVersion 提升至 ${after.schemaVersion}（minor，新增字段）`)
  }

  // 通用 "set 缺失" 检查器
  function diffSet<T extends { id?: string; syntax?: string }>(
    bucket: 'personas' | 'containers' | 'platforms' | 'inlineExtensions',
    keyOf: (item: T) => string,
    beforeArr: readonly T[] | undefined,
    afterArr: readonly T[] | undefined,
  ) {
    const beforeIds = new Set((beforeArr ?? []).map(keyOf))
    const afterIds = new Set((afterArr ?? []).map(keyOf))
    for (const id of beforeIds) {
      if (afterIds.has(id)) continue
      const path = `${bucket}.${id}`
      if (deprecated.has(path) || deprecated.has(`${bucket}.${id}`)) continue
      breaking.push({ path, reason: `从 ${bucket}[] 中移除`,    })
    }
    for (const id of afterIds) {
      if (!beforeIds.has(id)) growth.push(`新增 ${bucket}: ${id}`)
    }
  }

  diffSet('personas', (p) => p.id ?? '', before.personas, after.personas)
  diffSet('containers', (c) => c.id ?? '', before.containers, after.containers)
  diffSet('platforms', (p) => p.id ?? '', before.platforms, after.platforms)
  diffSet('inlineExtensions', (e) => e.syntax ?? '', before.inlineExtensions, after.inlineExtensions)

  // containers[].variants：单个容器内 variant 缺失
  if (before.containers && after.containers) {
    const afterById = new Map(after.containers.map((c) => [c.id, c]))
    for (const bc of before.containers) {
      const ac = afterById.get(bc.id)
      if (!ac || !bc.variants) continue
      const afterVariants = new Set(ac.variants ?? [])
      for (const v of bc.variants) {
        if (afterVariants.has(v)) continue
        const path = `containers.${bc.id}.variants.${v}`
        if (deprecated.has(path)) continue
        breaking.push({ path, reason: `容器 ${bc.id} 的 variant ${v} 已移除` })
      }
    }
  }

  // platforms[].status：stable → placeholder 视为退化（beta → stable 是成长）
  if (before.platforms && after.platforms) {
    const afterById = new Map(after.platforms.map((p) => [p.id, p]))
    for (const bp of before.platforms) {
      const ap = afterById.get(bp.id)
      if (!ap) continue
      if (bp.status === 'stable' && ap.status === 'placeholder') {
        breaking.push({
          path: `platforms.${bp.id}.status`,
          reason: `平台 ${bp.id} 从 stable 退化为 placeholder`,
        })
      } else if (bp.status === 'placeholder' && ap.status !== 'placeholder') {
        growth.push(`platforms.${bp.id} 从 placeholder 升级为 ${ap.status}`)
      }
    }
  }

  return { breaking, growth }
}
