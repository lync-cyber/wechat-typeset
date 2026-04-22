/**
 * publish/checklist.ts 契约
 *
 * 锁"什么内容 → 什么条目 status"；不断言 hint 文案精确字符（可能随版本微调）。
 */

import { describe, it, expect } from 'vitest'
import { buildChecklist } from '../../src/publish/checklist'

describe('buildChecklist · 空稿与边界', () => {
  it('空串产出 fail 条目', () => {
    const r = buildChecklist('')
    expect(r.pass).toBe(false)
    expect(r.items[0].id).toBe('empty')
  })

  it('仅空白等同于空稿', () => {
    expect(buildChecklist('   \n\n  ').pass).toBe(false)
  })
})

describe('buildChecklist · 封面图', () => {
  it('首图存在时 cover-image pass + cover-ratio info', () => {
    const md = '![封面](https://example.com/cover.jpg)\n\n# 标题\n\n正文内容。\n'
    const r = buildChecklist(md)
    const cover = r.items.find((i) => i.id === 'cover-image')!
    const ratio = r.items.find((i) => i.id === 'cover-ratio')!
    expect(cover.status).toBe('pass')
    expect(ratio.status).toBe('info')
  })

  it('无封面图 → cover-image warn', () => {
    const r = buildChecklist('# 标题\n\n正文。\n')
    const cover = r.items.find((i) => i.id === 'cover-image')!
    expect(cover.status).toBe('warn')
  })
})

describe('buildChecklist · 摘要长度', () => {
  it('短摘要 pass', () => {
    const md = '# 题\n\n这是一段短摘要，在 120 字以内。'
    const r = buildChecklist(md)
    const a = r.items.find((i) => i.id === 'abstract-length')!
    expect(a.status).toBe('pass')
    expect(a.label).toMatch(/≤\s*120/)
  })

  it('超过 120 字的摘要 warn', () => {
    const long = '摘'.repeat(130)
    const r = buildChecklist(`# 题\n\n${long}`)
    const a = r.items.find((i) => i.id === 'abstract-length')!
    expect(a.status).toBe('warn')
    expect(a.label).toContain('130')
  })

  it('跳过标题 / 容器 / 代码块定位首段', () => {
    const md = [
      '# 题',
      '',
      '::: cover 封面',
      '这是容器内',
      ':::',
      '',
      '```',
      'code here',
      '```',
      '',
      '这才是真正的首段摘要文本。',
      '',
    ].join('\n')
    const r = buildChecklist(md)
    const a = r.items.find((i) => i.id === 'abstract-length')!
    expect(a.status).toBe('pass')
    // label 里的字数应接近"这才是真正的首段摘要文本。"的 14 字
    expect(a.label).toMatch(/1[34]\s*字/)
  })
})

describe('buildChecklist · 字数', () => {
  it('≥ 400 字 pass', () => {
    const md = '# 题\n\n' + '字'.repeat(500)
    const r = buildChecklist(md)
    const w = r.items.find((i) => i.id === 'word-count')!
    expect(w.status).toBe('pass')
  })

  it('< 400 字 warn', () => {
    const md = '# 题\n\n只有几个字'
    const r = buildChecklist(md)
    const w = r.items.find((i) => i.id === 'word-count')!
    expect(w.status).toBe('warn')
  })
})

describe('buildChecklist · 作者声明', () => {
  it('含 ::: author pass', () => {
    const md = '# 题\n\n::: author 某某\n:::\n\n正文。'
    const r = buildChecklist(md)
    const a = r.items.find((i) => i.id === 'author-declaration')!
    expect(a.status).toBe('pass')
  })

  it('无 ::: author info（未写但不阻断）', () => {
    const r = buildChecklist('# 题\n\n正文。')
    const a = r.items.find((i) => i.id === 'author-declaration')!
    expect(a.status).toBe('info')
  })
})

describe('buildChecklist · 外链数量', () => {
  it('无外链 pass', () => {
    const r = buildChecklist('# 题\n\n正文，无链接。')
    const e = r.items.find((i) => i.id === 'external-links')!
    expect(e.status).toBe('pass')
  })

  it('≤ 10 条外链 info', () => {
    const links = Array.from({ length: 5 }, (_, i) => `[x${i}](https://a.com/${i})`).join(' ')
    const r = buildChecklist(`# 题\n\n${links}`)
    const e = r.items.find((i) => i.id === 'external-links')!
    expect(e.status).toBe('info')
    expect(e.label).toContain('5')
  })

  it('> 10 条外链 warn', () => {
    const links = Array.from({ length: 15 }, (_, i) => `[x${i}](https://a.com/${i})`).join(' ')
    const r = buildChecklist(`# 题\n\n${links}`)
    const e = r.items.find((i) => i.id === 'external-links')!
    expect(e.status).toBe('warn')
    expect(e.label).toContain('15')
  })
})

describe('buildChecklist · 内联图片体积', () => {
  it('无内联 base64 图片 → 不出现该条目（降低噪音）', () => {
    const r = buildChecklist('# 题\n\n![外链图](https://cdn.example.com/a.jpg)')
    expect(r.items.some((i) => i.id === 'inline-image-size')).toBe(false)
  })

  it('小的内联图片 pass', () => {
    const tiny = 'A'.repeat(1000) // ~ 750 bytes
    const r = buildChecklist(`# 题\n\n![x](data:image/png;base64,${tiny})`)
    const s = r.items.find((i) => i.id === 'inline-image-size')!
    expect(s.status).toBe('pass')
  })

  it('> 1MB 内联图片 warn', () => {
    const huge = 'A'.repeat(1024 * 1024 * 2) // ~ 1.5 MB raw
    const r = buildChecklist(`# 题\n\n![x](data:image/png;base64,${huge})`)
    const s = r.items.find((i) => i.id === 'inline-image-size')!
    expect(s.status).toBe('warn')
  })
})

describe('buildChecklist · pass 汇总', () => {
  it('只有 warn/info 没有 fail → report.pass = true', () => {
    const r = buildChecklist('# 题\n\n一小段')
    // warn 项存在但不算阻断
    expect(r.items.some((i) => i.status === 'warn')).toBe(true)
    expect(r.pass).toBe(true)
  })

  it('空稿 fail → report.pass = false', () => {
    expect(buildChecklist('').pass).toBe(false)
  })
})
