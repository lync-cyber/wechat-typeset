# wx-md

**Browser-only Markdown editor that produces WeChat-official-account-ready rich text.**

Write Markdown on the left, preview the 375 px mobile-viewport render on the right, and copy the whole article as rich text — no backend, no account, no tracking.

- 🎨 5 built-in themes + tokenised design system + in-app colour generator
- 🧩 20+ container extensions (`::: tip`, `::: compare`, `::: steps`, …) across 23 visual variants
- 📋 One-click **Clipboard API** copy with `execCommand` fallback — paste straight into the WeChat backend
- 💾 Multi-draft CRUD + template market + export (HTML / Markdown / long image)
- ⌨️ Built-in keyboard shortcuts (Ctrl/⌘ + K to copy, etc.)
- 🔒 Fully client-side: your drafts never leave the browser

> _Screenshot placeholder — drop a PNG at `docs/screenshot.png` after first build._

## Try it

**Hosted preview:** _replace this line with the URL once you deploy it._

The app is a pure static SPA. Any static host works:

| Host | Command |
| --- | --- |
| GitHub Pages (project page) | `VITE_BASE=/<repo>/ npm run build` then publish `dist/` |
| GitHub Pages (user / org page) | `npm run build` then publish `dist/` |
| Vercel / Netlify / Cloudflare Pages | Build command `npm run build`, output `dist/`, no env vars needed |
| Any S3-style bucket | Upload `dist/` contents after `npm run build` |

> WeChat's Clipboard API requires a **secure context**. `https://` and `http://127.0.0.1` / `localhost` both qualify. `file://` does not — the copy path falls back to `execCommand` and may lose rich-text formatting.

## Run locally

Requirements: **Node 18+** (Node 20 recommended).

```bash
npm install
npm run dev         # hot-reload dev server on http://127.0.0.1:5173
```

For the production-style local run used by the double-click launchers:

```bash
npm run build
node serve.mjs      # serves dist/ on http://127.0.0.1:7788
```

Or just double-click `launcher.bat` (Windows) or `launcher.command` (macOS / Linux) — the script installs deps, builds once, and serves.

## Why 127.0.0.1, not `file://`

`navigator.clipboard.write(ClipboardItem)` is gated on a secure context. `file://` is not secure, so copying would silently degrade to `document.execCommand('copy')`, which drops rich-text on several browsers. `127.0.0.1` / `localhost` are considered secure by the spec — this is a browser rule, not a tool limitation.

## Architecture

```
src/
├── App.vue                # three-column layout: toolbar / editor / preview
├── components/            # Editor (CodeMirror 6) · Preview (iframe 375px) · Toolbar · drawers
├── pipeline/              # markdown -> html (see below)
│   ├── rules.ts           # single source of truth for wechat paste constraints
│   ├── markdown.ts        # markdown-it + containers + inline extensions
│   ├── themeCSS.ts        # theme tokens -> <style> string (guards against forbidden css)
│   ├── highlight.ts       # highlight.js wrapper (font-family stripped)
│   ├── juiceInline.ts     # juice/client wrapper for inlining <style> into element style
│   ├── wxPatch/           # 8 DOM post-processors (forbidden tags / attrs / flex fallback / svg fixes)
│   └── containers/        # 19 container renderers + 23 visual variants
├── themes/                # 5 built-in themes + shared factories
├── samples/               # per-theme demo Markdown shown on first run
├── storage/               # localStorage wrappers (drafts, user components)
├── clipboard/             # copy / export to HTML / Markdown / long-image
└── color/                 # palette generator (chroma-js LCH + WCAG contrast)
```

Rendering pipeline (unidirectional):

```
md source
  └─► [1] markdown-it (containers / mark / ins / footnote / task-lists)
        └─► [2] container renderers -> <section> with inline SVG assets
              └─► [3] wrap <section class="markdown-body"> + inject <style>
                    └─► [4] highlight.js over <pre><code>
                          └─► [5] juice/client: <style> -> element style
                                └─► [6] wxPatch DOM passes (strip / rewrite)
                                      └─► [7] final HTML
                                            ├─► preview iframe srcdoc
                                            └─► clipboard text/html + text/plain
```

**Invariants**

1. Preview and clipboard share one HTML string — WYSIWYG is mandatory.
2. Visual polish lives in inline SVG + design tokens; no external fonts, no `::before` / `::after`.
3. Container extensions are first-class — every complex layout goes through the container system, not ad-hoc HTML.

## Dev docs

- [Container syntax reference](docs/container-syntax.md)
- [Theme authoring guide](docs/theme-authoring.md)
- [Manual acceptance checklist](docs/TESTING.md)

## Known limits

- **WeChat voice `<mpvoice>`**: can only be inserted from the WeChat backend media library. Rendered as a placeholder card.
- **WeChat video `<mpvideo>`**: same as voice for the native format. Tencent Video (`qqvid`) renders as a `v.qq.com` iframe and survives paste.
- **External links `<a>`**: WeChat limits their behaviour; do not treat them as visual-critical elements.
- **Safari clipboard**: `ClipboardItem` must be constructed in the synchronous user-gesture path; async copy paths fail silently.
- **`file://` protocol**: Clipboard API disabled — see the note above.
- **Custom fonts**: WeChat client overrides `font-family` with system fonts. Declaring `font-family` in a theme throws `ThemeAuthoringError` at build time.

## License

[MIT](LICENSE) © 2026 lync-cyber
