/**
 * capabilities-diff 守门工具契约
 *
 * 锁：每一条 break 维度都能被识别；deprecations[] 登记后视为合规移除；
 * 添加项不报；status 退化按方向区分。
 */

import { describe, it, expect } from 'vitest'
import { diffCapabilities, type CapabilitiesShape } from '../../scripts/capabilities-diff'

const empty: CapabilitiesShape = { schemaVersion: '2.3' }

describe('diffCapabilities · schemaVersion', () => {
  it('major 升级 → breaking（必须 PR 说明）', () => {
    const r = diffCapabilities({ schemaVersion: '2.3' }, { schemaVersion: '3.0' })
    expect(r.breaking.find((b) => b.path === 'schemaVersion')).toBeTruthy()
  })

  it('minor 提升 → growth，不 break', () => {
    const r = diffCapabilities({ schemaVersion: '2.2' }, { schemaVersion: '2.3' })
    expect(r.breaking).toEqual([])
    expect(r.growth.some((g) => g.includes('2.3'))).toBe(true)
  })

  it('minor 倒退 → breaking', () => {
    const r = diffCapabilities({ schemaVersion: '2.3' }, { schemaVersion: '2.2' })
    expect(r.breaking.find((b) => b.path === 'schemaVersion')).toBeTruthy()
  })

  it('major 倒退 → breaking', () => {
    const r = diffCapabilities({ schemaVersion: '3.0' }, { schemaVersion: '2.9' })
    expect(r.breaking.find((b) => b.path === 'schemaVersion')).toBeTruthy()
  })
})

describe('diffCapabilities · personas / containers / platforms / inlineExtensions 移除', () => {
  it('persona 移除 → breaking', () => {
    const before: CapabilitiesShape = { ...empty, personas: [{ id: 'a' }, { id: 'b' }] }
    const after: CapabilitiesShape = { ...empty, personas: [{ id: 'a' }] }
    const r = diffCapabilities(before, after)
    expect(r.breaking.some((b) => b.path === 'personas.b')).toBe(true)
  })

  it('container 移除 → breaking', () => {
    const before: CapabilitiesShape = { ...empty, containers: [{ id: 'tip' }, { id: 'qrcode' }] }
    const after: CapabilitiesShape = { ...empty, containers: [{ id: 'tip' }] }
    const r = diffCapabilities(before, after)
    expect(r.breaking.some((b) => b.path === 'containers.qrcode')).toBe(true)
  })

  it('platform 移除 → breaking', () => {
    const before: CapabilitiesShape = { ...empty, platforms: [{ id: 'wechat', status: 'stable' }, { id: 'zhihu', status: 'placeholder' }] }
    const after: CapabilitiesShape = { ...empty, platforms: [{ id: 'wechat', status: 'stable' }] }
    const r = diffCapabilities(before, after)
    expect(r.breaking.some((b) => b.path === 'platforms.zhihu')).toBe(true)
  })

  it('inlineExtension 移除 → breaking', () => {
    const before: CapabilitiesShape = { ...empty, inlineExtensions: [{ syntax: '==mark==' }, { syntax: '~~del~~' }] }
    const after: CapabilitiesShape = { ...empty, inlineExtensions: [{ syntax: '==mark==' }] }
    const r = diffCapabilities(before, after)
    expect(r.breaking.some((b) => b.path === 'inlineExtensions.~~del~~')).toBe(true)
  })

  it('container variant 移除 → breaking（按子路径）', () => {
    const before: CapabilitiesShape = { ...empty, containers: [{ id: 'tip', variants: ['accent-bar', 'terminal'] }] }
    const after: CapabilitiesShape = { ...empty, containers: [{ id: 'tip', variants: ['accent-bar'] }] }
    const r = diffCapabilities(before, after)
    expect(r.breaking.some((b) => b.path === 'containers.tip.variants.terminal')).toBe(true)
  })
})

describe('diffCapabilities · platform status 退化', () => {
  it('stable → placeholder 是 breaking', () => {
    const before: CapabilitiesShape = { ...empty, platforms: [{ id: 'wechat', status: 'stable' }] }
    const after: CapabilitiesShape = { ...empty, platforms: [{ id: 'wechat', status: 'placeholder' }] }
    const r = diffCapabilities(before, after)
    expect(r.breaking.some((b) => b.path === 'platforms.wechat.status')).toBe(true)
  })

  it('placeholder → stable 是 growth', () => {
    const before: CapabilitiesShape = { ...empty, platforms: [{ id: 'zhihu', status: 'placeholder' }] }
    const after: CapabilitiesShape = { ...empty, platforms: [{ id: 'zhihu', status: 'stable' }] }
    const r = diffCapabilities(before, after)
    expect(r.breaking).toEqual([])
    expect(r.growth.some((g) => g.includes('zhihu'))).toBe(true)
  })
})

describe('diffCapabilities · deprecations 豁免', () => {
  it('登记的移除不算 breaking', () => {
    const before: CapabilitiesShape = {
      ...empty,
      personas: [{ id: 'a' }, { id: 'b' }],
      deprecations: [{ id: 'personas.b' }],
    }
    const after: CapabilitiesShape = { ...empty, personas: [{ id: 'a' }] }
    const r = diffCapabilities(before, after)
    expect(r.breaking).toEqual([])
  })

  it('未登记的移除照常 breaking', () => {
    const before: CapabilitiesShape = {
      ...empty,
      personas: [{ id: 'a' }, { id: 'b' }],
      deprecations: [{ id: 'personas.c' }], // 登记的不是 b
    }
    const after: CapabilitiesShape = { ...empty, personas: [{ id: 'a' }] }
    const r = diffCapabilities(before, after)
    expect(r.breaking.some((b) => b.path === 'personas.b')).toBe(true)
  })
})

describe('diffCapabilities · 添加项是 growth', () => {
  it('新增 persona → growth，不 break', () => {
    const before: CapabilitiesShape = { ...empty, personas: [{ id: 'a' }] }
    const after: CapabilitiesShape = { ...empty, personas: [{ id: 'a' }, { id: 'b' }] }
    const r = diffCapabilities(before, after)
    expect(r.breaking).toEqual([])
    expect(r.growth.some((g) => g.includes('personas: b'))).toBe(true)
  })
})
