#!/usr/bin/env tsx
/**
 * annotate-md —— 段落 → 容器提议表（不直接改原文）。
 *
 * 启发式扫描规则（与 references/annotation-recipes.md 同步）：
 *   - H1 → 题图 + intro 提议
 *   - 文首 2-4 行总览段 → intro 或 abstract
 *   - 有序列表 ≥3 条 + 动词开头 → steps
 *   - blockquote 单段短句 → quote-card
 *   - 含 "切忌" / "❌" 的段落 → danger
 *   - 含 "注意" / "⚠️" 的段落 → warning
 *   - 含 "小贴士" / "💡" → tip
 *   - 数字 + 短标签段 → key-number
 *   - 优点/缺点结构 → compare
 *
 * 用法：
 *   tsx annotate-md.ts --input <input.md> --persona <id> [--out tmp/patches.json]
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  getContainerVocabulary,
  getPersona,
  getRecommendedVariantsFor,
  getThemeCapabilities,
} from '../../../src/public'

interface CliArgs {
  input: string
  persona: string
  out?: string
}

interface Patch {
  line: number
  end_line: number
  kind:
    | 'wrap_paragraph'
    | 'wrap_blockquote'
    | 'convert_list'
    | 'wrap_first_paragraph'
    | 'wrap_section_title'
    | 'wrap_pros_cons'
  container: string
  variant?: string
  reason: string
  confidence: 'high' | 'medium' | 'low'
  preview: string
}

function parseArgs(argv: string[]): CliArgs {
  const out: Record<string, string> = {}
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i]
    if (!k.startsWith('--')) fail(1, `expected flag, got "${k}"`)
    const v = argv[i + 1]
    if (v === undefined || v.startsWith('--')) fail(1, `flag ${k} expects a value`)
    out[k.slice(2)] = v
    i++
  }
  if (!out.input) fail(1, '--input <md> required')
  if (!out.persona) fail(1, '--persona <id> required')
  return { input: out.input, persona: out.persona, out: out.out }
}

function fail(code: number, msg: string): never {
  process.stderr.write(`[annotate-md] ${msg}\n`)
  process.exit(code)
}

interface Block {
  start: number
  end: number
  type: 'heading1' | 'heading2' | 'paragraph' | 'blockquote' | 'olist' | 'ulist' | 'codeblock' | 'fence' | 'blank'
  lines: string[]
}

/** 把 markdown 按块切分（非 markdown-it 级精度，启发式即可） */
function splitBlocks(md: string): Block[] {
  const lines = md.split(/\r?\n/)
  const blocks: Block[] = []
  let current: Block | null = null
  let inCode = false

  const flush = () => {
    if (current) blocks.push(current)
    current = null
  }

  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i]

    // 代码 fence ```
    if (/^```/.test(ln)) {
      if (inCode) {
        if (current) current.lines.push(ln)
        flush()
        inCode = false
      } else {
        flush()
        current = { start: i, end: i, type: 'codeblock', lines: [ln] }
        inCode = true
      }
      continue
    }
    if (inCode) {
      if (current) {
        current.end = i
        current.lines.push(ln)
      }
      continue
    }

    // 已有 ::: fence ——跳过这一段当作 'fence'
    if (/^:{3,}/.test(ln)) {
      flush()
      current = { start: i, end: i, type: 'fence', lines: [ln] }
      blocks.push(current)
      current = null
      continue
    }

    if (/^\s*$/.test(ln)) {
      flush()
      blocks.push({ start: i, end: i, type: 'blank', lines: [ln] })
      continue
    }
    if (/^# /.test(ln)) {
      flush()
      blocks.push({ start: i, end: i, type: 'heading1', lines: [ln] })
      continue
    }
    if (/^## /.test(ln)) {
      flush()
      blocks.push({ start: i, end: i, type: 'heading2', lines: [ln] })
      continue
    }
    if (/^> /.test(ln)) {
      if (current?.type === 'blockquote') {
        current.end = i
        current.lines.push(ln)
      } else {
        flush()
        current = { start: i, end: i, type: 'blockquote', lines: [ln] }
      }
      continue
    }
    if (/^\d+\. /.test(ln)) {
      if (current?.type === 'olist') {
        current.end = i
        current.lines.push(ln)
      } else {
        flush()
        current = { start: i, end: i, type: 'olist', lines: [ln] }
      }
      continue
    }
    if (/^[-*] /.test(ln)) {
      if (current?.type === 'ulist') {
        current.end = i
        current.lines.push(ln)
      } else {
        flush()
        current = { start: i, end: i, type: 'ulist', lines: [ln] }
      }
      continue
    }
    // 普通段落
    if (current?.type === 'paragraph') {
      current.end = i
      current.lines.push(ln)
    } else {
      flush()
      current = { start: i, end: i, type: 'paragraph', lines: [ln] }
    }
  }
  flush()
  return blocks
}

/** 启发式：是否动词开头（中文动作语义） */
function startsWithVerbCh(s: string): boolean {
  const m = s.replace(/^\d+\.\s*/, '')
  const VERBS = ['打开', '切换', '运行', '复制', '粘贴', '创建', '删除', '安装', '配置', '检查', '点击', '选择', '输入', '关闭', '保存', '重启', '设置', '导入', '导出', '提交', '推送', '拉取', '下载', '上传']
  return VERBS.some((v) => m.startsWith(v))
}

function suggest(blocks: Block[], personaId: string): Patch[] {
  const patches: Patch[] = []
  const caps = getThemeCapabilities(personaId)
  // available[fence-name] = boolean；任何"主题专属未启用"的容器都不入提议
  const availableSet = new Set(caps.containers.filter((c) => c.available).map((c) => c.id))
  // 签名容器（主题主动声明的 voice 容器）。abstract / keyNumber 是签名容器时优先提议；
  // 不是签名容器（即便 available）只在确有内容信号时再用。
  const signatureSet = new Set(caps.containers.filter((c) => c.signature).map((c) => c.id))
  const has = (id: string) => availableSet.has(id)
  const isSig = (id: string) => signatureSet.has(id)

  // 找文首"总览段"——第一个非 H1 非 blank 的 paragraph，长度合理
  const firstHeading = blocks.findIndex((b) => b.type === 'heading1')
  const firstParaAfterH1 = blocks.findIndex(
    (b, i) => i > firstHeading && b.type === 'paragraph',
  )
  if (firstParaAfterH1 >= 0) {
    const b = blocks[firstParaAfterH1]
    const text = b.lines.join(' ')
    if (text.length >= 50 && text.length <= 300) {
      // abstract 优先于 intro：abstract 是签名容器、有 kicker / 主色"摘要"母版；
      // 不在主题签名容器集里时退到 intro（base 容器，所有主题都启用）。
      const container = isSig('abstract') ? 'abstract' : 'intro'
      patches.push({
        line: b.start + 1,
        end_line: b.end + 1,
        kind: 'wrap_first_paragraph',
        container,
        reason: '文首总览段（' + text.length + ' 字符）——典型 ' + container + ' 位置',
        confidence: 'high',
        preview: text.slice(0, 60) + (text.length > 60 ? '…' : ''),
      })
    }
  }

  for (const b of blocks) {
    const text = b.lines.join(' ')

    // 有序列表 → steps
    if (b.type === 'olist' && b.lines.length >= 3) {
      const allVerb = b.lines.filter((l) => /^\d+\. /.test(l)).every(startsWithVerbCh)
      if (allVerb) {
        patches.push({
          line: b.start + 1,
          end_line: b.end + 1,
          kind: 'convert_list',
          container: 'steps',
          reason: '有序列表 ' + b.lines.length + ' 条，每条动词开头——操作流程',
          confidence: 'high',
          preview: b.lines[0].slice(0, 50),
        })
      }
    }

    // blockquote → quote-card（单段短句）
    if (b.type === 'blockquote') {
      const cleanText = b.lines.map((l) => l.replace(/^>\s?/, '')).join('').trim()
      if (cleanText.length >= 15 && cleanText.length <= 200 && /[。.！？!?]$/.test(cleanText)) {
        patches.push({
          line: b.start + 1,
          end_line: b.end + 1,
          kind: 'wrap_blockquote',
          container: 'quote-card',
          reason: 'blockquote 单段短句（' + cleanText.length + ' 字符，句末完整）——典型金句',
          confidence: 'medium',
          preview: cleanText.slice(0, 60),
        })
      }
    }

    // 段落语义触发
    if (b.type === 'paragraph') {
      if (/切忌|千万不要|❌|危险|⚠️\s*严重/.test(text)) {
        patches.push({
          line: b.start + 1,
          end_line: b.end + 1,
          kind: 'wrap_paragraph',
          container: 'danger',
          reason: '段落含"切忌/千万不要/❌"——典型 danger',
          confidence: 'high',
          preview: text.slice(0, 60),
        })
      } else if (/⚠️|注意|留意|需注意/.test(text) && text.length >= 30 && text.length <= 200) {
        patches.push({
          line: b.start + 1,
          end_line: b.end + 1,
          kind: 'wrap_paragraph',
          container: 'warning',
          reason: '段落含"注意/留意/⚠️"——典型 warning',
          confidence: 'medium',
          preview: text.slice(0, 60),
        })
      } else if (/💡|小贴士|顺便|tip:/i.test(text)) {
        patches.push({
          line: b.start + 1,
          end_line: b.end + 1,
          kind: 'wrap_paragraph',
          container: 'tip',
          reason: '段落含"💡/小贴士/顺便"——典型 tip',
          confidence: 'medium',
          preview: text.slice(0, 60),
        })
      } else if (
        /\d+(\.\d+)?\s?[%倍亿万千]/.test(text) &&
        text.length <= 150 &&
        isSig('key-number')
      ) {
        patches.push({
          line: b.start + 1,
          end_line: b.end + 1,
          kind: 'wrap_paragraph',
          container: 'key-number',
          reason: '段落含显著数字（%/倍/亿/万）+ 主题登记了 key-number 签名',
          confidence: 'low',
          preview: text.slice(0, 60),
        })
      }
    }

    // H2 升级为 section-title（仅当 H2 数量 ≥3）
    if (b.type === 'heading2') {
      const h2Count = blocks.filter((bb) => bb.type === 'heading2').length
      if (h2Count >= 3) {
        const title = b.lines[0].replace(/^## /, '')
        patches.push({
          line: b.start + 1,
          end_line: b.end + 1,
          kind: 'wrap_section_title',
          container: 'section-title',
          reason: '文章有 ' + h2Count + ' 个 H2——建议至少前几个升级 section-title 分节',
          confidence: 'low',
          preview: title.slice(0, 60),
        })
      }
    }
  }

  // 防御性过滤：任何"主题未启用"容器（含未来从 base 迁到 theme:* 的）都被剔除。
  // 配合 patches.json 的 capability_snapshot，agent 不会拿到走不通的建议。
  return patches.filter((p) => has(p.container))
}

function main() {
  const args = parseArgs(process.argv)
  // 校验 persona 存在
  try {
    getPersona(args.persona)
  } catch (e) {
    process.stderr.write(`[annotate-md] ${(e as Error).message}\n`)
    process.exit(2)
  }

  const md = readFileSync(resolve(process.cwd(), args.input), 'utf8')
  const blocks = splitBlocks(md)
  const patches = suggest(blocks, args.persona)

  // 主题能力快照——告诉 agent "本主题下哪些容器可用 / 推荐什么 variant / 默认骨架是什么"。
  // agent 应**只在 capability_snapshot.containers 中 available=true 的容器上做改写**，
  // 不依赖 vocabulary_subset 全集——后者保留用于查 example 与 attrs，但不是 available 真源。
  const caps = getThemeCapabilities(args.persona)
  const recommended = getRecommendedVariantsFor(args.persona)
  const capabilitySnapshot = {
    persona_id: args.persona,
    default_variants: caps.defaultVariants,
    recommended_variants: recommended,
    containers: caps.containers,
  }

  // vocabulary：保留全集供 agent 查 example / attrs / fenceLength。
  // available 真源仍在 capability_snapshot.containers——不要从 vocabulary 推断。
  const vocab = getContainerVocabulary().map((v) => ({
    name: v.name,
    category: v.category,
    fenceLength: v.fenceLength,
    description: v.description,
    example: v.example,
  }))

  const result = {
    input: args.input,
    persona: args.persona,
    block_count: blocks.length,
    patch_count: patches.length,
    patches,
    apply_hint:
      'patches 仅是建议；按 confidence high → medium → low 决策。' +
      '应用顺序：结构容器（section-title / intro）→ 内容容器（quote-card / steps）→ 收束容器（footer-cta）。' +
      '**只用 capability_snapshot.containers 中 available=true 的容器**——其余在本主题下没有签名视觉。' +
      'variant 默认走 default_variants；要覆盖时挑 recommended_variants 列表里的 id（不要凭记忆）。',
    capability_snapshot: capabilitySnapshot,
    vocabulary_subset: vocab,
  }

  const json = JSON.stringify(result, null, 2) + '\n'
  if (args.out) {
    writeFileSync(resolve(process.cwd(), args.out), json, 'utf8')
    process.stderr.write(`[annotate-md] wrote ${args.out} (${patches.length} patches)\n`)
  } else {
    process.stdout.write(json)
  }
}

main()
