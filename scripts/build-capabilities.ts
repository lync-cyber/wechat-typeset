#!/usr/bin/env tsx
/**
 * 生成 dist/api/capabilities.json —— 外部集成方（如 InkFlow）读取此文件
 * 来发现 wechat-typeset 当前支持的主题、容器、变体、硬约束、CLI 命令、错误码。
 *
 * schemaVersion 语义：major 变更 = 破坏性 → 下游必须改代码；minor 变更 = 新增字段；
 * patch 变更 = 非契约修正。破坏前先把旧字段登记进 `deprecations[]` 给下游窗口。
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

import { buildCapabilitiesV3 } from '../src/core/capabilities/build'
import { COMMANDS } from '../packages/cli/src/commands'

function pkgJson(): {
  name: string
  version: string
  homepage?: string
  repository?: string | { type?: string; url?: string }
} {
  const raw = readFileSync(resolve(process.cwd(), 'package.json'), 'utf8')
  return JSON.parse(raw)
}

/**
 * 从 package.json.homepage / repository.url 提取 GitHub 的 owner/repo。
 * 用于构造 jsDelivr URL `cdn.jsdelivr.net/gh/{owner}/{repo}@{ref}/...`。
 * 非 GitHub 仓库返回 null —— 私有镜像的 selfUri 需要 fork 自己改 build 脚本。
 */
function parseGithubSlug(pkg: ReturnType<typeof pkgJson>): { owner: string; repo: string } | null {
  const candidates: string[] = []
  if (pkg.homepage) candidates.push(pkg.homepage)
  if (typeof pkg.repository === 'string') {
    candidates.push(pkg.repository)
  } else if (pkg.repository?.url) {
    candidates.push(pkg.repository.url)
  }
  for (const raw of candidates) {
    const httpsMatch = raw.match(/github\.com[/:]([^/]+)\/([^/?#.]+)(?:\.git)?/i)
    if (httpsMatch) {
      return { owner: httpsMatch[1], repo: httpsMatch[2] }
    }
  }
  return null
}

const CAPABILITIES_REL_PATH = 'dist/api/capabilities.json'
const COVERS_REL_DIR = 'dist/api/covers'

function buildSelfUris(pkg: ReturnType<typeof pkgJson>): {
  selfUri: string
  versionedSelfUri: string
  coverUriPattern: string
  coverUriPatternVersioned: string
} {
  const slug = parseGithubSlug(pkg)
  if (!slug) {
    return { selfUri: '', versionedSelfUri: '', coverUriPattern: '', coverUriPatternVersioned: '' }
  }
  const base = `https://cdn.jsdelivr.net/gh/${slug.owner}/${slug.repo}`
  return {
    selfUri: `${base}@main/${CAPABILITIES_REL_PATH}`,
    versionedSelfUri: `${base}@v${pkg.version}/${CAPABILITIES_REL_PATH}`,
    coverUriPattern: `${base}@main/${COVERS_REL_DIR}/{personaId}.svg`,
    coverUriPatternVersioned: `${base}@v${pkg.version}/${COVERS_REL_DIR}/{personaId}.svg`,
  }
}

const pkg = pkgJson()
const { selfUri, versionedSelfUri, coverUriPattern, coverUriPatternVersioned } = buildSelfUris(pkg)

const result = buildCapabilitiesV3({
  toolName: pkg.name,
  toolVersion: pkg.version,
  toolRepo: pkg.homepage,
  selfUri,
  versionedSelfUri,
  coverUriPattern,
  coverUriPatternVersioned,
  cliCommands: COMMANDS.map((c) => ({
    name: c.name,
    description: c.description,
    inputSchema: c.inputSchema as Record<string, unknown>,
    outputSchema: c.outputSchema as Record<string, unknown>,
  })),
})

const OUT = resolve(process.cwd(), 'dist/api/capabilities.json')
mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(result, null, 2) + '\n', 'utf8')
console.log(`wrote ${OUT}`)
