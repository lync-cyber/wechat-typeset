#!/usr/bin/env tsx
/**
 * 生成 PersonaSpec 的 JSON Schema 到 dist/schema/persona-spec.schema.json。
 * 供外部消费者（LLM skill、编辑器插件等）下载引用。
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { PERSONA_SPEC_SCHEMA } from '../src/themes/_shared/spec/schema'

const OUT = resolve(process.cwd(), 'dist/schema/persona-spec.schema.json')
mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(PERSONA_SPEC_SCHEMA, null, 2) + '\n', 'utf8')
console.log(`wrote ${OUT}`)
