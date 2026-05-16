#!/usr/bin/env tsx
import { ORDERED_SPECS } from '../src/core/themes/registry'
import { DEFAULT_VARIANTS } from '../src/core/themes/types'

const slots = Object.keys(DEFAULT_VARIANTS) as (keyof typeof DEFAULT_VARIANTS)[]
const rows: string[] = []
rows.push(['theme'.padEnd(22), ...slots.map((s) => s.padEnd(13))].join(' '))
rows.push(''.padEnd(22 + slots.length * 14, '-'))

const counts: Record<string, number> = {}
for (const s of slots) counts[s] = 0

for (const spec of ORDERED_SPECS) {
  const cells: string[] = [spec.id.padEnd(22)]
  let nonDefault = 0
  for (const s of slots) {
    const v = spec.variants[s]
    const d = DEFAULT_VARIANTS[s]
    if (v === d) {
      cells.push('·'.padEnd(13))
    } else {
      cells.push(v.padEnd(13))
      nonDefault++
      counts[s]++
    }
  }
  rows.push(cells.join(' ') + '  [' + nonDefault + '/9]')
}
rows.push('')
rows.push(['SIGNED:'.padEnd(22), ...slots.map((s) => String(counts[s]).padEnd(13))].join(' '))
console.log(rows.join('\n'))
