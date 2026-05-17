#!/usr/bin/env node
/**
 * 把 scripts/git-hooks/* 安装到 .git/hooks/。
 *
 * 由 package.json 的 `prepare` 触发，作者第一次 `npm install` 后自动激活；
 * 也可以 `node scripts/install-git-hooks.mjs` 手动跑。
 *
 * 安装策略：
 *   - 优先用 symlink（Linux/macOS）：脚本本体变更后 hook 自动同步，不需要重装
 *   - symlink 不可用时（Windows 非管理员且未开启 Developer Mode）回退到 copy；
 *     由 `prepare` 钩子每次 install 重跑，源码变更下次 install 时同步过去
 *   - 不存在 .git/ 时安静退出（npm pack / CI 工件场景不应失败）
 *   - 已存在的同名 hook：
 *       · 若是指向源码的 symlink → 视为已就位，跳过
 *       · 若是与源码内容一致的副本 → 视为已就位，跳过
 *       · 否则保留作者自定义 + 警告
 */
import {
  copyFileSync,
  chmodSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readlinkSync,
  symlinkSync,
  unlinkSync,
} from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const ROOT = resolve(dirname(__filename), '..')
const GIT_PATH = resolve(ROOT, '.git')
const HOOKS_SRC = resolve(ROOT, 'scripts', 'git-hooks')

// 解析 hooks 目标目录：常规仓库 = .git/hooks；worktree 的 .git 是文件，需要先跳到 commondir
function resolveHooksDst() {
  const stat = lstatSync(GIT_PATH, { throwIfNoEntry: false })
  if (!stat) return null
  if (stat.isDirectory()) return resolve(GIT_PATH, 'hooks')
  if (stat.isFile()) {
    // worktree 入口：.git 文件内容形如 `gitdir: <path-to-worktree-gitdir>`
    const m = readFileSync(GIT_PATH, 'utf8').match(/^gitdir:\s*(.+)$/m)
    if (!m) return null
    const worktreeGitDir = resolve(ROOT, m[1].trim())
    const commonDirFile = resolve(worktreeGitDir, 'commondir')
    const commonDir = existsSync(commonDirFile)
      ? resolve(worktreeGitDir, readFileSync(commonDirFile, 'utf8').trim())
      : worktreeGitDir
    return resolve(commonDir, 'hooks')
  }
  return null
}

const HOOKS_DST = resolveHooksDst()
if (!HOOKS_DST) {
  // 非 git 仓库（npm pack / tarball 解出 / CI 工件） —— 静默跳过
  process.exit(0)
}

if (!existsSync(HOOKS_SRC)) {
  console.error(`[install-git-hooks] 源目录缺失：${HOOKS_SRC}`)
  process.exit(0)
}

mkdirSync(HOOKS_DST, { recursive: true })

function contentsMatch(a, b) {
  try {
    return readFileSync(a).equals(readFileSync(b))
  } catch {
    return false
  }
}

function installHook(name, src, dst, rel) {
  try {
    symlinkSync(rel, dst, 'file')
    console.log(`[install-git-hooks] ${name} → ${rel} (symlink)`)
    return
  } catch (err) {
    if (err.code !== 'EPERM' && err.code !== 'EACCES') throw err
    // Windows 非管理员且未开 Developer Mode 时 symlink 被禁，回退到 copy
  }
  copyFileSync(src, dst)
  try {
    chmodSync(dst, 0o755)
  } catch {
    // Windows 上 chmod 是 no-op，失败也无所谓
  }
  console.log(`[install-git-hooks] ${name} ← ${rel} (copy; symlink 不可用)`)
}

const HOOKS = ['pre-commit']
for (const name of HOOKS) {
  const src = resolve(HOOKS_SRC, name)
  if (!existsSync(src)) continue
  const dst = resolve(HOOKS_DST, name)
  const rel = relative(HOOKS_DST, src)

  const stat = lstatSync(dst, { throwIfNoEntry: false })
  if (stat) {
    if (stat.isSymbolicLink()) {
      const cur = readlinkSync(dst)
      const resolved = resolve(HOOKS_DST, cur)
      if (resolved === src) continue // 已是指向我们源码的链接
      unlinkSync(dst) // 旧链接指向别处，重建
    } else if (contentsMatch(src, dst)) {
      continue // copy 模式下已是最新内容
    } else {
      console.warn(
        `[install-git-hooks] ${name} 已存在且内容与源码不一致，保留作者自定义（手动 rm 后再跑可覆盖）`,
      )
      continue
    }
  }

  installHook(name, src, dst, rel)
}
