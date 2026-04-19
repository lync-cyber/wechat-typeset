# wx-md

**纯前端 Markdown → 微信公众号富文本编辑器。**

左边写 Markdown，右边 375 px 移动端实时预览，点一下把整篇文章当富文本复制出去——不跑后端、不登账号、不发任何数据到外部。

- 🎨 5 套内置主题 + 设计令牌体系 + 内置配色生成器
- 🧩 20+ 容器扩展语法（`::: tip` / `::: compare` / `::: steps` …）× 23 个视觉骨架
- 📋 一键 Clipboard API 复制（`execCommand` 降级）——粘到公众号后台即可
- 💾 多草稿 CRUD + 模板市场 + 导出（HTML / Markdown / 长图）
- ⌨️ 内置快捷键（Ctrl/⌘ + K 复制、Ctrl/⌘ + S 保存……）
- 🔒 100% 浏览器端运行：草稿不离开本机

> _首屏截图占位 —— 首次构建后把图放在 `docs/screenshot.png` 再更新这段。_

## 在线体验

**托管地址：** _部署完成后替换这一行。_

项目产物是纯静态 SPA，任何静态托管都能跑：

| 托管环境 | 构建命令 |
| --- | --- |
| GitHub Pages（项目页 / 子路径） | `VITE_BASE=/<repo>/ npm run build`，把 `dist/` 发布出去 |
| GitHub Pages（用户 / 组织主页） | `npm run build`，把 `dist/` 发布出去 |
| Vercel / Netlify / Cloudflare Pages | 构建命令 `npm run build`，输出目录 `dist/`，无需任何环境变量 |
| S3 / OSS / COS 等对象存储 | `npm run build` 后把 `dist/` 里的文件整体上传 |

> Clipboard API 需要 **secure context**。`https://` 以及 `http://127.0.0.1` / `localhost` 都算；`file://` 不算——复制会退化成 `execCommand`，富文本格式在部分浏览器里会丢。

## 本地运行

环境要求：**Node 18 +**（推荐 Node 20）。

```bash
npm install
npm run dev         # 开发服务器，热更新，http://127.0.0.1:5173
```

想跑生产构建 + 本地 secure-context 服务：

```bash
npm run build
node serve.mjs      # 127.0.0.1:7788 提供 dist/
```

也可以双击 `launcher.bat`（Windows）或 `launcher.command`（macOS / Linux）——脚本会自动装依赖、构建一次、然后启服务并打开浏览器。

## 为什么必须走 127.0.0.1，而不是 `file://`

`navigator.clipboard.write(ClipboardItem)` 要求 secure context。`file://` 协议下 `window.isSecureContext === false`，Clipboard API 不可用，复制路径会降级到 `document.execCommand('copy')`——在某些浏览器上会丢富文本，粘到公众号只剩纯文本。`127.0.0.1` / `localhost` 被浏览器规范视作 secure，Clipboard API 完整可用。这是浏览器规则，不是工具的限制。

## 架构

```
src/
├── App.vue                # 三栏：Toolbar / Editor / Preview
├── components/            # Editor（CodeMirror 6）/ Preview（375px iframe）/ Toolbar / 各抽屉
├── pipeline/              # Markdown → HTML 渲染管线（见下）
│   ├── rules.ts           # 微信粘贴约束的单一事实来源
│   ├── markdown.ts        # markdown-it + 容器 + 行内插件
│   ├── themeCSS.ts        # 主题 tokens → <style> 字符串，含 font-family 等守卫
│   ├── highlight.ts       # highlight.js 包装（已剔除 font-family）
│   ├── juiceInline.ts     # juice/client 封装，<style> 内联到元素 style
│   ├── wxPatch/           # 8 个 DOM 后处理器（剥 forbidden / flex fallback / SVG 修补）
│   └── containers/        # 19 个容器渲染器 + 23 个视觉骨架
├── themes/                # 5 套内置主题 + 共享工厂
├── samples/               # 每套主题的演示 Markdown
├── storage/               # localStorage 封装（草稿、用户组件）
├── clipboard/             # 复制 / 导出（HTML / Markdown / 长图）
└── color/                 # 配色生成器（chroma-js LCH + WCAG 对比度）
```

单向渲染管线：

```
md 源文本
  └─► [1] markdown-it（容器 / mark / ins / footnote / task-lists）
        └─► [2] 容器渲染器：容器节点 → 带 SVG 装饰的 section 结构
              └─► [3] 包 <section class="markdown-body"> + 注入主题 <style>
                    └─► [4] highlight.js 处理 <pre><code>
                          └─► [5] juice/client：<style> → 元素 style
                                └─► [6] wxPatch 兼容性补丁层
                                      └─► [7] 最终 HTML
                                            ├─► 预览 iframe srcdoc
                                            └─► 剪贴板 text/html + text/plain
```

**不变量**

1. 预览与剪贴板共享同一份 HTML——所见即所得是硬契约。
2. 视觉质感依托内联 SVG + 设计令牌；不加载外部字体，也不用 `::before` / `::after`。
3. 容器扩展语法是一等公民——复杂版式都走容器系统，不写零散 HTML。

## 开发文档

- [容器语法参考](docs/container-syntax.md)
- [第三方主题开发指南](docs/theme-authoring.md)
- [手动验收清单](docs/TESTING.md)

## 已知限制

- **微信语音 `<mpvoice>`**：只能在公众号后台素材库插入，粘贴富文本无法保留。`::: mpvoice` 渲染为占位提示卡。
- **微信视频 `<mpvideo>`**：原生视频同上；腾讯视频（`qqvid`）走 `v.qq.com` iframe，粘贴后可保留。
- **外链 `<a>`**：公众号对外链有限制，不建议作为视觉关键元素。
- **Safari 剪贴板**：`ClipboardItem` 必须在用户手势的同步路径内构造，异步路径会失败。
- **`file://` 协议**：Clipboard API 不可用，必须走 `127.0.0.1`（见上）。
- **自定义字体**：微信客户端会用系统字体覆盖 `font-family`；主题层声明 `font-family` 会被 `themeCSS` 生成器直接 throw。

## License

[MIT](LICENSE) © 2026 lync-cyber
