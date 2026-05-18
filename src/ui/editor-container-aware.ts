/**
 * 容器感知扩展三件套：视觉分层装饰 + 代码折叠 + 自动闭合 fence。
 *
 * 三者共享同一份"容器栈解析" —— `scanContainerFrames` 单次扫描全文，输出每个容器的
 * (name, colons, openLine, closeLine, depth)。装饰按行染色，折叠按 open→close 区间，
 * 自动闭合按光标行查 stack 决定是否补 fence。把它们集中在一处避免三遍重复扫描。
 *
 * 与 src/ui/editor-extensions.ts 分文件的边界：那里是 autocomplete + linter（"作者写
 * 容器名/属性的辅助"），本文件是 "容器结构本身的可视化与结构化操作"。诊断仍走
 * editor-extensions.ts —— 它的诊断范围更宽（含 zhTypo / list-too-deep 等容器外规则），
 * 不能与本文件耦合。
 */

import { foldService } from '@codemirror/language'
import {
  RangeSetBuilder,
  StateField,
  type Extension,
  type Text,
} from '@codemirror/state'
import { Decoration, EditorView, type DecorationSet } from '@codemirror/view'

// ─────────────────────────────────────────────────────────────
// 共享：容器栈解析
// ─────────────────────────────────────────────────────────────

const OPEN_RE = /^(:{3,})\s+([A-Za-z][\w-]*)/
const CLOSE_RE = /^(:{3,})\s*$/

interface ContainerFrame {
  name: string
  /** 冒号数（3 或 4） */
  colons: number
  /** 1-indexed 开始行号 */
  openLine: number
  /** 1-indexed 结束行号；未闭合时 -1 */
  closeLine: number
  /** 嵌套深度（最外层 = 1） */
  depth: number
}

function scanContainerFrames(doc: Text): ContainerFrame[] {
  const frames: ContainerFrame[] = []
  const stack: Array<{ colons: number; frameIdx: number }> = []
  for (let i = 1; i <= doc.lines; i++) {
    const line = doc.line(i).text
    const closeMatch = CLOSE_RE.exec(line)
    if (closeMatch && stack.length > 0) {
      const colons = closeMatch[1].length
      const top = stack[stack.length - 1]
      if (top.colons === colons) {
        frames[top.frameIdx].closeLine = i
        stack.pop()
        continue
      }
      // 长度不匹配：忽略此 close，让外层等更长 close（与 diagnose.ts 行为对齐）
    }
    const openMatch = OPEN_RE.exec(line)
    if (openMatch) {
      const colons = openMatch[1].length
      const depth = stack.length + 1
      const frameIdx = frames.length
      frames.push({
        name: openMatch[2],
        colons,
        openLine: i,
        closeLine: -1,
        depth,
      })
      stack.push({ colons, frameIdx })
    }
  }
  return frames
}

// ─────────────────────────────────────────────────────────────
// 视觉分层装饰
// ─────────────────────────────────────────────────────────────

const MAX_DEPTH_TONE = 4

function buildDecorations(doc: Text): DecorationSet {
  const frames = scanContainerFrames(doc)
  if (frames.length === 0) return Decoration.none

  // 每行的"最大嵌套深度"（含 open/body/close 行）
  const lineDepth = new Array<number>(doc.lines + 1).fill(0)
  const openLines = new Set<number>()
  const closeLines = new Set<number>()
  for (const f of frames) {
    openLines.add(f.openLine)
    if (f.closeLine !== -1) closeLines.add(f.closeLine)
    const end = f.closeLine === -1 ? doc.lines : f.closeLine
    for (let l = f.openLine; l <= end; l++) {
      if (f.depth > lineDepth[l]) lineDepth[l] = f.depth
    }
  }

  const builder = new RangeSetBuilder<Decoration>()
  for (let i = 1; i <= doc.lines; i++) {
    const depth = lineDepth[i]
    if (depth === 0) continue
    const tone = Math.min(depth, MAX_DEPTH_TONE)
    const classes = [`wt-container-depth-${tone}`]
    if (openLines.has(i)) classes.push('wt-container-open')
    else if (closeLines.has(i)) classes.push('wt-container-close')
    else classes.push('wt-container-body')
    const line = doc.line(i)
    builder.add(line.from, line.from, Decoration.line({ class: classes.join(' ') }))
  }
  return builder.finish()
}

const containerDecorationField = StateField.define<DecorationSet>({
  create(state) {
    return buildDecorations(state.doc)
  },
  update(value, tr) {
    return tr.docChanged ? buildDecorations(tr.state.doc) : value
  },
  provide: (f) => EditorView.decorations.from(f),
})

/**
 * 容器分层着色：在 `--editor-bg` 之上叠半透明蓝紫调，深一层加深一档。
 *
 * 用 rgba 半透明而非固定颜色：alpha 叠加在亮色 / oneDark 暗色背景上效果都自然，
 * 不需要单独写 dark variant（与 zhFixHighlight 同款取色思路）。
 */
const containerDecorationTheme = EditorView.theme({
  '.wt-container-depth-1': {
    backgroundColor: 'rgba(99, 102, 241, 0.06)',
  },
  '.wt-container-depth-2': {
    backgroundColor: 'rgba(99, 102, 241, 0.11)',
  },
  '.wt-container-depth-3': {
    backgroundColor: 'rgba(99, 102, 241, 0.16)',
  },
  '.wt-container-depth-4': {
    backgroundColor: 'rgba(99, 102, 241, 0.21)',
  },
  '.wt-container-open, .wt-container-close': {
    boxShadow: 'inset 2px 0 0 var(--accent, #6366f1)',
    fontWeight: '600',
  },
  '.wt-container-close': {
    opacity: '0.7',
  },
})

export const containerDecorationExtension: Extension = [
  containerDecorationField,
  containerDecorationTheme,
]

// ─────────────────────────────────────────────────────────────
// 折叠
// ─────────────────────────────────────────────────────────────

/**
 * foldService —— 给 open fence 行提供"折叠到匹配 close 行"的范围。
 *
 * CM6 的 foldService 按需调用（gutter 渲染、`foldCode` 命令触发时），不在文档每次变更
 * 时遍历全文，因此本地复用 scanContainerFrames 也可以；但单 open 行查找其闭合通常只
 * 需要扫"从该行往后"，比全文扫便宜一半 —— 这里走"小步长"实现以保持调用开销可控。
 */
export const containerFoldExtension = foldService.of((state, lineStart) => {
  const doc = state.doc
  const startLine = doc.lineAt(lineStart)
  const openMatch = OPEN_RE.exec(startLine.text)
  if (!openMatch) return null
  const openColons = openMatch[1].length

  const stack: number[] = [openColons]
  for (let i = startLine.number + 1; i <= doc.lines; i++) {
    const text = doc.line(i).text
    const close = CLOSE_RE.exec(text)
    if (close) {
      const c = close[1].length
      if (stack[stack.length - 1] === c) {
        stack.pop()
        if (stack.length === 0) {
          // 折叠范围：从 open 行末（line.to，即换行符之前）到 close 行末
          return { from: startLine.to, to: doc.line(i).to }
        }
        continue
      }
    }
    const open = OPEN_RE.exec(text)
    if (open) stack.push(open[1].length)
  }
  return null
})

// ─────────────────────────────────────────────────────────────
// 自动闭合 fence
// ─────────────────────────────────────────────────────────────

/**
 * 在 open fence 行尾按下回车时，自动补一行闭合 fence，光标停在中间空行。
 *
 * 触发条件（缺一即降级到默认换行）：
 *   - 输入文本为 `\n`（避免 IME composition / 粘贴误触）
 *   - 光标位于 open fence 行的行末（不在 open 行中间编辑标题/属性时）
 *   - 当前 open fence 在后续文档中还没有匹配的 close（避免重复补）
 *
 * 与折叠/装饰共用 OPEN_RE / CLOSE_RE 与"栈匹配"算法，行为一致。
 */
function hasMatchingCloseAfter(
  doc: Text,
  openLineNumber: number,
  openColons: number,
): boolean {
  const stack: number[] = [openColons]
  for (let i = openLineNumber + 1; i <= doc.lines; i++) {
    const text = doc.line(i).text
    const close = CLOSE_RE.exec(text)
    if (close) {
      const c = close[1].length
      if (stack[stack.length - 1] === c) {
        stack.pop()
        if (stack.length === 0) return true
        continue
      }
    }
    const open = OPEN_RE.exec(text)
    if (open) stack.push(open[1].length)
  }
  return false
}

export const autoCloseContainerFenceExtension: Extension = EditorView.inputHandler.of(
  (view, from, to, text) => {
    if (text !== '\n') return false
    // 光标必须无选区（避免覆写选中内容时误触）
    if (from !== to) return false
    const doc = view.state.doc
    const line = doc.lineAt(from)
    // 光标必须位于 open fence 行尾
    if (from !== line.to) return false
    const openMatch = OPEN_RE.exec(line.text)
    if (!openMatch) return false
    const colons = openMatch[1]
    if (hasMatchingCloseAfter(doc, line.number, colons.length)) return false

    // 插入：`\n\n${colons}\n`，光标停在第一个 \n 之后（新空行起点）
    view.dispatch({
      changes: { from, to, insert: `\n\n${colons}\n` },
      selection: { anchor: from + 1 },
      userEvent: 'input.type',
    })
    return true
  },
)

// ─────────────────────────────────────────────────────────────
// 聚合导出（供 Editor.vue 一行 spread 进 extensions）
// ─────────────────────────────────────────────────────────────

export const containerAwareExtensions: Extension = [
  containerDecorationExtension,
  containerFoldExtension,
  autoCloseContainerFenceExtension,
]

// 内部工具导出（仅供本文件单测；下游别依赖）
export const __testing__ = {
  scanContainerFrames,
  hasMatchingCloseAfter,
}
