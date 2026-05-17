import fs from 'node:fs'
import path from 'node:path'

function walk(d, out) {
  for (const f of fs.readdirSync(d)) {
    const fp = path.join(d, f)
    const s = fs.statSync(fp)
    if (s.isDirectory()) walk(fp, out)
    else if (/\.(ts|vue)$/.test(f)) out.push(fp)
  }
}

const src = []
walk('src', src)
const domRe = /\b(DOMParser|requestAnimationFrame|HTMLElement|HTMLDivElement|MutationObserver|getBoundingClientRect|document\.|window\.|navigator\.|cancelAnimationFrame|customElements|FileReader|Blob\.|URL\.createObjectURL)\b/

const domUsing = new Set()
for (const f of src) {
  if (domRe.test(fs.readFileSync(f, 'utf8'))) domUsing.add(path.resolve(f))
}
console.log('SRC files touching DOM API:', domUsing.size)

const specs = fs.readdirSync('tests/unit').filter((f) => f.endsWith('.spec.ts'))

function resolveImport(from, imp) {
  let base = path.resolve(path.dirname(from), imp)
  for (const ext of ['', '.ts', '.vue', '/index.ts']) {
    if (fs.existsSync(base + ext) && fs.statSync(base + ext).isFile()) return path.resolve(base + ext)
  }
  return null
}

function imports(file) {
  const src = fs.readFileSync(file, 'utf8')
  const out = []
  const re = /from\s+['"]([^'"]+)['"]/g
  let m
  while ((m = re.exec(src))) {
    if (m[1].startsWith('.')) {
      const r = resolveImport(file, m[1])
      if (r) out.push(r)
    }
  }
  return out
}

function transClosure(spec) {
  const seen = new Set([path.resolve(spec)])
  const q = [path.resolve(spec)]
  while (q.length) {
    const cur = q.shift()
    for (const im of imports(cur)) {
      if (!seen.has(im)) {
        seen.add(im)
        q.push(im)
      }
    }
  }
  return seen
}

const needJsdom = []
const pure = []
for (const s of specs) {
  const full = path.join('tests/unit', s)
  const closure = transClosure(full)
  let touched = false
  let touchedBy = null
  // spec 自身用 DOM API
  if (domRe.test(fs.readFileSync(full, 'utf8'))) {
    touched = true
    touchedBy = full
  }
  // 或者 SUT 闭包里有
  if (!touched) {
    for (const f of closure) {
      if (domUsing.has(f)) {
        touched = true
        touchedBy = f
        break
      }
    }
  }
  if (touched) needJsdom.push([s, touchedBy])
  else pure.push(s)
}
console.log('NEED JSDOM (transitive):', needJsdom.length)
needJsdom.forEach(([f, by]) => console.log(' ', f, '←', path.relative('.', by)))
console.log('\nPURE (safe for node):', pure.length)
pure.forEach((f) => console.log(' ', f))
