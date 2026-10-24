import { describe, expect, it } from 'vitest'
import { buildChecklist } from '../../src/domain/publish/checklist'
import { updatePublication } from '../../src/core/pipeline/frontmatter'

describe('发文清单读取发布信息', () => {
  it('明确填写的摘要优先于正文首段', () => {
    const md = updatePublication('正文'.repeat(150), { digest: '填写的摘要' })
    expect(buildChecklist(md).items.find((item) => item.id === 'abstract-length')).toMatchObject({
      status: 'pass', label: '摘要段 5 字（≤ 120）',
    })
  })

  it('过长的发布摘要不能被短正文掩盖', () => {
    const md = updatePublication('短正文。', { digest: '摘'.repeat(121) })
    expect(buildChecklist(md).items.find((item) => item.id === 'abstract-length')).toMatchObject({ status: 'warn' })
    expect(buildChecklist(md).items.find((item) => item.id === 'abstract-length')?.label).toContain('121')
  })

  it('空摘要沿用正文推断，frontmatter 不成为推断首段', () => {
    const md = updatePublication('# 标题\n\n真正的摘要。', { title: '标'.repeat(150), digest: '' })
    expect(buildChecklist(md).items.find((item) => item.id === 'abstract-length')).toMatchObject({
      status: 'pass', label: '摘要段 6 字（≤ 120）',
    })
  })

  it('明确填写的封面优先于正文首图', () => {
    const md = updatePublication('![](images/body.webp)\n\n正文。', { cover: 'images/cover.webp' })
    expect(buildChecklist(md).items.find((item) => item.id === 'cover-image')).toMatchObject({
      status: 'pass', hint: 'images/cover.webp',
    })
  })

  it('独立封面不需要重复插入正文', () => {
    const md = updatePublication('纯文字正文。', { cover: 'images/cover.webp' })
    expect(buildChecklist(md).items.find((item) => item.id === 'cover-image')?.status).toBe('pass')
  })

  it('缺失的明确封面不能悄悄退回正文首图', () => {
    const md = updatePublication('![](images/body.webp)\n\n正文。', { cover: 'images/cover.webp' })
    const report = buildChecklist(md, { missingImages: ['images/cover.webp'] })
    expect(report.items.find((item) => item.id === 'cover-image')).toMatchObject({ status: 'fail', hint: 'images/cover.webp' })
    expect(report.items.some((item) => item.id === 'cover-ratio')).toBe(false)
    expect(report.pass).toBe(false)
  })

  it('沿用的正文首图缺失同样不能通过封面检查', () => {
    const report = buildChecklist('![](images/my%20cover.webp)\n\n正文。', { missingImages: ['images/my cover.webp'] })
    expect(report.items.find((item) => item.id === 'cover-image')?.status).toBe('fail')
  })

  it.each(['images/missing.webp', 'images/有 空格.webp', 'images/my%20cover.webp'])('尖括号首图 %s 缺失时不能通过封面检查', (path) => {
    const report = buildChecklist(`![封面](<${path}> "图片标题")\n\n正文。`, { missingImages: [decodeURIComponent(path)] })
    expect(report.items.find((item) => item.id === 'cover-image')).toMatchObject({ status: 'fail', hint: path })
    expect(report.items.some((item) => item.id === 'cover-ratio')).toBe(false)
  })

  it('尖括号首图同样等待本地封面验证', () => {
    const report = buildChecklist('![](<images/有 空格.webp>)\n\n正文。', { coverState: 'loading' })
    expect(report.items.find((item) => item.id === 'cover-image')?.status).toBe('info')
  })

  it('发布信息不计入正文字数', () => {
    const md = updatePublication('短正文', { title: '标题'.repeat(300), digest: '摘要'.repeat(60), author: '作者' })
    expect(buildChecklist(md).items.find((item) => item.id === 'word-count')?.status).toBe('warn')
  })

  it('只有 frontmatter 的文稿依然为空稿', () => {
    const report = buildChecklist(updatePublication('', { title: '待写文章', digest: '有摘要也需要正文' }))
    expect(report.items[0].id).toBe('empty')
    expect(report.pass).toBe(false)
  })

  it.each(['loading', 'error'] as const)('封面列表处于 %s 时不宣称封面通过', (coverState) => {
    const md = updatePublication('正文。', { cover: 'images/cover.webp' })
    const report = buildChecklist(md, { coverState })
    expect(report.items.find((item) => item.id === 'cover-image')?.status).toBe(coverState === 'loading' ? 'info' : 'warn')
    expect(report.items.some((item) => item.id === 'cover-ratio')).toBe(false)
  })

  it('扫描明确缺失的封面为 fail，即使还没有异步渲染缺图结果', () => {
    const md = updatePublication('正文。', { cover: 'images/cover.webp' })
    const report = buildChecklist(md, { coverState: 'missing' })
    expect(report.items.find((item) => item.id === 'cover-image')?.status).toBe('fail')
    expect(report.pass).toBe(false)
  })

  it('确认存在的本地封面通过，站外图片不受本地扫描状态干扰', () => {
    const local = updatePublication('正文。', { cover: 'images/my%20cover.webp' })
    expect(buildChecklist(local, { coverState: 'present' }).items.find((item) => item.id === 'cover-image')?.status).toBe('pass')
    const remote = updatePublication('正文。', { cover: 'https://example.com/cover.webp' })
    expect(buildChecklist(remote, { coverState: 'error' }).items.find((item) => item.id === 'cover-image')?.status).toBe('pass')
  })

  it('摘要长度按 Unicode 字符计数，完整保留 emoji', () => {
    const exact = updatePublication('正文。', { digest: '🙂'.repeat(120) })
    const over = updatePublication('正文。', { digest: '🙂'.repeat(121) })
    expect(buildChecklist(exact).items.find((item) => item.id === 'abstract-length')).toMatchObject({ status: 'pass', label: '摘要段 120 字（≤ 120）' })
    expect(buildChecklist(over).items.find((item) => item.id === 'abstract-length')?.status).toBe('warn')
  })
})
