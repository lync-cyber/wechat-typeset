/**
 * shareLink dispatcher + component codec 契约
 *
 * 锁：
 *   - articleCodec / componentCodec 各自有独立 prefix，不互相误识
 *   - parseAnyShareHash 能识别两种 payload
 *   - componentCodec 形状校验：缺字段 / 类型错 / kind 错 → null
 *   - wrapComponentSnapshot 显式重建对象，丢弃额外字段
 */

import { describe, it, expect } from 'vitest'
import {
  buildUrl,
  parseHash,
  articleCodec,
  componentCodec,
  parseAnyShareHash,
  type SharePayloadComponent,
} from '../../src/infra/share/shareLink'
import { wrapComponentSnapshot } from '../../src/infra/share/payloads/component'

const sampleSnapshot = {
  id: 'uc_abc123',
  name: 'Terminal Tip',
  description: '终端风格 tip',
  kind: 'admonition',
  variantId: 'terminal',
  markdownSnippet: '::: tip variant=terminal\nhello\n:::\n',
  thumbnailSvg: '<svg></svg>',
}

describe('codec.prefix 不互相误识', () => {
  it('articleCodec 不解 share-component=', () => {
    const url = buildUrl(componentCodec, wrapComponentSnapshot(sampleSnapshot), {
      origin: '',
      pathname: '',
    })
    const hash = url.slice(url.indexOf('#'))
    expect(parseHash(articleCodec, hash)).toBeNull()
  })

  it('componentCodec 不解 share=', () => {
    const url = buildUrl(articleCodec, { v: 1, md: 'hi', themeId: 'default' }, {
      origin: '',
      pathname: '',
    })
    const hash = url.slice(url.indexOf('#'))
    expect(parseHash(componentCodec, hash)).toBeNull()
  })
})

describe('componentCodec · 形状校验', () => {
  it('完整组件往返', () => {
    const wrapped = wrapComponentSnapshot(sampleSnapshot)
    const url = buildUrl(componentCodec, wrapped, { origin: '', pathname: '' })
    const hash = url.slice(url.indexOf('#'))
    const decoded = parseHash(componentCodec, hash)
    expect(decoded).toEqual(wrapped)
  })

  it('kind 错 → null', () => {
    const wrapped = { v: 1, kind: 'article', component: sampleSnapshot }
    const url = buildUrl(componentCodec as never, wrapped as never, { origin: '', pathname: '' })
    const hash = url.slice(url.indexOf('#'))
    expect(parseHash(componentCodec, hash)).toBeNull()
  })

  it('缺 markdownSnippet → null', () => {
    const broken = { v: 1, kind: 'component', component: { ...sampleSnapshot, markdownSnippet: undefined } }
    const url = buildUrl(componentCodec as never, broken as never, { origin: '', pathname: '' })
    const hash = url.slice(url.indexOf('#'))
    expect(parseHash(componentCodec, hash)).toBeNull()
  })

  it('version 不匹配 → null', () => {
    const broken = { v: 99, kind: 'component', component: sampleSnapshot }
    const url = buildUrl(componentCodec as never, broken as never, { origin: '', pathname: '' })
    const hash = url.slice(url.indexOf('#'))
    expect(parseHash(componentCodec, hash)).toBeNull()
  })
})

describe('wrapComponentSnapshot · 丢弃非契约字段', () => {
  it('额外字段不进 payload', () => {
    const dirty = {
      ...sampleSnapshot,
      // 模拟外部塞进去的 meta / 私有字段
      __secretToken: 'leaked',
      createdAt: 9999,
    } as unknown as typeof sampleSnapshot
    const wrapped = wrapComponentSnapshot(dirty)
    expect(wrapped.component).toEqual(sampleSnapshot)
    expect((wrapped.component as unknown as Record<string, unknown>).__secretToken).toBeUndefined()
    expect((wrapped.component as unknown as Record<string, unknown>).createdAt).toBeUndefined()
  })

  it('variantId 可选；undefined 保留为 undefined', () => {
    const noVariant = { ...sampleSnapshot, variantId: undefined }
    const wrapped = wrapComponentSnapshot(noVariant)
    expect(wrapped.component.variantId).toBeUndefined()
  })
})

describe('parseAnyShareHash · 自动派发', () => {
  it('article hash → article 形状', () => {
    const url = buildUrl(articleCodec, { v: 1, md: 'a', themeId: 'default' }, {
      origin: '',
      pathname: '',
    })
    const hash = url.slice(url.indexOf('#'))
    const decoded = parseAnyShareHash(hash)
    expect(decoded).toEqual({ v: 1, md: 'a', themeId: 'default' })
  })

  it('component hash → component 形状', () => {
    const wrapped = wrapComponentSnapshot(sampleSnapshot)
    const url = buildUrl(componentCodec, wrapped, { origin: '', pathname: '' })
    const hash = url.slice(url.indexOf('#'))
    const decoded = parseAnyShareHash(hash) as SharePayloadComponent
    expect(decoded.kind).toBe('component')
    expect(decoded.component.id).toBe('uc_abc123')
  })

  it('未知 prefix → null', () => {
    expect(parseAnyShareHash('#share-future=anything')).toBeNull()
    expect(parseAnyShareHash('#foo=bar')).toBeNull()
    expect(parseAnyShareHash('')).toBeNull()
  })
})
