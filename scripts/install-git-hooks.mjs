#!/usr/bin/env node
/**
 * 把 scripts/git-hooks/* 软链到 .git/hooks/。
 *
 * 由 package.json 的 `prepare` 触发，作者第一次 `npm install` 后自动激活；
 * 也可以 `node scripts/install-git-hooks.mjs` 手动跑。
 *
 * 设计：
 *   - 用 symlink 而非 copy：脚本本体变更后 hook 自动同步，不需要重装
 *   - 不存在 .git/ 时安静退出（npm pack / CI 工件场景不应失败）
 *   - 已存在的同名 hook：若是我们的 symlink 则覆盖；若是别的内容则保留 + 警告（不破坏作者本地 hooks）
 */
import { existsSync, lstatSync, mkdirSync, readlinkSync, symlinkSync, unlinkSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const ROOT = resolve(dirname(__filename), '..')
const GIT_DIR = resolve(ROOT, '.git')
const HOOKS_SRC = resolve(ROOT, 'scripts', 'git-hooks')
const HOOKS_DST = resolve(GIT_DIR, 'hooks')

if (!existsSync(GIT_DIR)) {
  // 非 git 仓库（npm pack / tarball 解出 / CI 工件） —— 静默跳过
  process.exit(0)
}

if (!existsSync(HOOKS_SRC)) {
  console.error(`[install-git-hooks] 源目录缺失：${HOOKS_SRC}`)
  process.exit(0)
}

mkdirSync(HOOKS_DST, { recursive: true })

const HOOKS = ['pre-commit']
for (const name of HOOKS) {
  const src = resolve(HOOKS_SRC, name)
  if (!existsSync(src)) continue
  const dst = resolve(HOOKS_DST, name)

  if (existsSync(dst) || lstatSync(dst, { throwIfNoEntry: false })) {
    // 已是指向我们的链接 → 重建（应对文件移动）；否则保留 + 警告
    const stat = lstatSync(dst)
    if (stat.isSymbolicLink()) {
      const cur = readlinkSync(dst)
      const resolved = resolve(HOOKS_DST, cur)
      if (resolved === src) {
        continue // 已是正确链接
      }
    } else {
      console.warn(
        `[install-git-hooks] ${name} 已存在且非本仓库链接，保留作者自定义（手动 rm 后再跑可覆盖）`,
      )
      continue
    }
    unlinkSync(dst)
  }

  const rel = relative(HOOKS_DST, src)
  symlinkSync(rel, dst, 'file')
  console.log(`[install-git-hooks] ${name} → ${rel}`)
}
