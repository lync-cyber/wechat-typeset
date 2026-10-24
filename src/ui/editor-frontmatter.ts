import { codeFolding, foldService } from '@codemirror/language'
import type { Text } from '@codemirror/state'

/** 只识别文首闭合的 frontmatter，正文中的分隔线仍由 Markdown 处理。 */
export function frontmatterRange(doc: Text): { from: number; to: number } | null {
  if (!/^\uFEFF?---[ \t]*$/.test(doc.line(1).text)) return null
  for (let number = 2; number <= doc.lines; number++) {
    if (/^---[ \t]*$/.test(doc.line(number).text)) return { from: 0, to: doc.line(number).to }
  }
  return null
}

export const frontmatterFolding = [
  foldService.of((state, lineStart) => lineStart === 0 ? frontmatterRange(state.doc) : null),
  codeFolding({
    preparePlaceholder: (state, range) => range.from === 0 && frontmatterRange(state.doc)?.to === range.to,
    placeholderDOM: (_view, unfold, publicationInfo: boolean) => {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'cm-foldPlaceholder'
      button.textContent = publicationInfo ? '发布信息 · 展开' : '…'
      button.setAttribute('aria-label', publicationInfo ? '展开发布信息源码' : '展开折叠内容')
      button.addEventListener('click', unfold)
      return button
    },
  }),
]
