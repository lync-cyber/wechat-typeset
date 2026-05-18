#!/usr/bin/env node
/**
 * launcher.bat 调用：若 src/core/themes、src/core/variants、src/domain/gallery
 * 任一文件比 docs/generated/showcase/*.html 新，触发 `npm run gen:showcase` 重生。
 *
 * 设计取舍：
 *   - 不内嵌进 gen-showcase.ts 的 --if-stale：那里有 tsx + jsdom 启动税（~1.5s），
 *     纯 Node mtime 巡检 ~50ms，让 launcher 冷启动几乎无感
 *   - 不在 launcher.bat 里 inline node -e：可读性 & 可维护性优先
 *
 * 退出码：0 = 已最新 / 重生成功；非 0 = 重生失败（透传给 launcher.bat）
 */
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

function maxMtime(dir) {
  let max = 0
  const stack = [dir]
  while (stack.length) {
    const d = stack.pop()
    let entries
    try {
      entries = readdirSync(d, { withFileTypes: true })
    } catch {
      continue
    }
    for (const e of entries) {
      const p = join(d, e.name)
      if (e.isDirectory()) stack.push(p)
      else if (e.isFile()) {
        const m = statSync(p).mtimeMs
        if (m > max) max = m
      }
    }
  }
  return max
}

function minHtmlMtime(dir) {
  let min = Infinity
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return 0
  }
  for (const e of entries) {
    if (e.isFile() && e.name.endsWith('.html')) {
      const m = statSync(join(dir, e.name)).mtimeMs
      if (m < min) min = m
    }
  }
  return min === Infinity ? 0 : min
}

const SRC_DIRS = ['src/core/themes', 'src/core/variants', 'src/domain/gallery']
const src = Math.max(...SRC_DIRS.map(maxMtime))
const dst = minHtmlMtime('docs/generated/showcase')

if (dst > 0 && src <= dst) {
  process.exit(0)
}

process.stdout.write('[sync-showcase] theme/variant 源码较 showcase 产物新，重生中...\n')
// Windows 上 npm 是 .cmd，shell:true 让 spawn 走系统 shell 解析
const r = spawnSync('npm', ['run', '-s', 'gen:showcase'], { stdio: 'inherit', shell: true })
process.exit(r.status ?? 0)
