/**
 * share/shareLink.ts 契约
 *
 * 锁：
 *   - 编/解码对中文 / emoji / markdown fence 透明
 *   - URL 形如 `#share=<base64url>`，不含 `+/=`
 *   - 非法 / 错 version / 缺字段 → null，不抛
 */

import { describe, it, expect } from 'vitest'
import {
  encodeShare,
  decodeShare,
  buildShareUrl,
  parseShareHash,
} from '../../src/share/shareLink'

describe('encodeShare / decodeShare · 往返', () => {
  it('英文 ASCII', () => {
    const p = { v: 1 as const, md: '# Hello\n\nWorld.', themeId: 'default' }
    const encoded = encodeShare(p)
    expect(decodeShare(encoded)).toEqual(p)
  })

  it('中文 + 容器 + emoji', () => {
    const p = {
      v: 1 as const,
      md: '# 标题\n\n::: warn 提示\n内容\n:::\n\n你好 🎉 世界',
      themeId: 'tech-geek',
    }
    expect(decodeShare(encodeShare(p))).toEqual(p)
  })

  it('代码块里的 fence 不会破坏编码', () => {
    const p = {
      v: 1 as const,
      md: '```js\nconst x = `template`\n```\n\n## next',
      themeId: 'academic',
    }
    expect(decodeShare(encodeShare(p))).toEqual(p)
  })

  it('空 md', () => {
    const p = { v: 1 as const, md: '', themeId: 'default' }
    expect(decodeShare(encodeShare(p))).toEqual(p)
  })
})

describe('encodeShare · URL 安全', () => {
  it('输出只含 base64url 字符集（a-zA-Z0-9-_）', () => {
    const p = { v: 1 as const, md: '全是中文的测试'.repeat(20), themeId: 'default' }
    expect(encodeShare(p)).toMatch(/^[A-Za-z0-9_-]+$/)
  })
})

describe('decodeShare · 鲁棒性', () => {
  it('非法 base64 → null', () => {
    expect(decodeShare('@@@not-base64@@@')).toBeNull()
  })

  it('合法 base64 但不是 JSON → null', () => {
    // base64url of "hello"
    expect(decodeShare('aGVsbG8')).toBeNull()
  })

  it('JSON 但缺字段 → null', () => {
    const bad = Buffer.from(JSON.stringify({ v: 1, md: 'x' }), 'utf-8').toString('base64')
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    expect(decodeShare(bad)).toBeNull()
  })

  it('JSON 但 version 不匹配 → null', () => {
    const bad = Buffer.from(JSON.stringify({ v: 99, md: '', themeId: 'default' }), 'utf-8').toString('base64')
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    expect(decodeShare(bad)).toBeNull()
  })

  it('空串 → null', () => {
    expect(decodeShare('')).toBeNull()
  })
})

describe('buildShareUrl', () => {
  it('显式 origin / pathname', () => {
    const url = buildShareUrl(
      { v: 1, md: 'hi', themeId: 'default' },
      { origin: 'https://example.com', pathname: '/app/' },
    )
    expect(url).toMatch(/^https:\/\/example\.com\/app\/#share=[A-Za-z0-9_-]+$/)
  })
})

describe('parseShareHash', () => {
  it('带 # 前缀识别', () => {
    const url = buildShareUrl(
      { v: 1, md: '你好', themeId: 'zen-green' },
      { origin: '', pathname: '' },
    )
    const hash = url.slice(url.indexOf('#'))
    expect(parseShareHash(hash)).toEqual({ v: 1, md: '你好', themeId: 'zen-green' })
  })

  it('不带 # 前缀', () => {
    const url = buildShareUrl(
      { v: 1, md: 'x', themeId: 'default' },
      { origin: '', pathname: '' },
    )
    const hash = url.slice(url.indexOf('#') + 1)
    expect(parseShareHash(hash)).toEqual({ v: 1, md: 'x', themeId: 'default' })
  })

  it('其他 hash 段 → null', () => {
    expect(parseShareHash('#foo=bar')).toBeNull()
    expect(parseShareHash('')).toBeNull()
    expect(parseShareHash('#share=')).toBeNull()
  })

  it('损坏的 payload → null（不抛）', () => {
    expect(parseShareHash('#share=@@broken@@')).toBeNull()
  })
})
