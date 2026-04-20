# 手动验收清单

自动化测试（`npm test`）覆盖单元契约与渲染快照。本清单覆盖**端到端的交互与视觉**——跨浏览器剪贴板、微信真机粘贴、主题切换一致性。发版前跑一遍，打勾即合格。

> 自动化失手的地方几乎都在"粘贴进微信后才暴露"这一步。所以**真机粘贴验收**（本文末节）是最不可跳过的部分。

---

## 环境准备

```bash
npm ci
npm run build
node serve.mjs            # 或双击 ./launcher.{bat,command}
```

浏览器打开 `http://127.0.0.1:7788`。开发模式 `npm run dev` 走 `:5173`，两个端口的预览应完全一致。

## Step 1 · 最小链路

- [ ] 左侧 CodeMirror 能正常编辑，中文输入法不抢光标
- [ ] 右侧 375 px 预览实时刷新
- [ ] 点击「一键复制」—— Console 无报错，toolbar 显示 `已复制（富文本）` 或 `已复制（降级模式）`

## Step 2 · 预览保真 & 防抖

- [ ] 连续 2 秒快速敲键，预览不卡顿，最大延迟 ≤ 400 ms
- [ ] 滚动预览时内容不重排 / 不抖动
- [ ] 缩放浏览器窗口，预览 iframe **始终锁死 375 px**（硬约束）

## Step 3 · 兼容性补丁（wxPatch）

粘贴到公众号后台「编辑文章」页，用 DevTools 查源码：

- [ ] 无 `id=` 属性
- [ ] 无 `font-family` 属性（包括 SVG `<text>`）
- [ ] 无 `<style>` / `<script>` / `class=`
- [ ] SVG `url(...)` 无引号
- [ ] 打开 `business-finance` 主题（SVG 密度最高），公众号移动端预览里 SVG 白底区域无穿透

## Step 4 · 容器语法

依次切换 3 套风格差异最大的主题（推荐 `tech-geek` / `literary-humanism` / `business-finance`），22 个容器全部渲染无异常：

**文章结构**

- [ ] `intro` / `cover` / `author` / `section-title` / `abstract`

**提示（五态）**

- [ ] `tip` / `warning` / `info` / `danger` / `note`

**金句与强调**

- [ ] `quote-card` / `highlight` / `key-number`

**对比与列表**

- [ ] `compare`（内嵌 `pros` + `cons`）/ `steps`

**装饰**

- [ ] `divider` 五种 variant（`line` / `wave` / `dots` / `flower` / `glyph`）

**文末引导**

- [ ] `footer-cta` / `recommend` / `qrcode` / `see-also`

**媒体**

- [ ] `mpvoice`（占位）/ `mpvideo`（`vid=` 占位 / `qqvid=` 渲染 iframe）

**兜底**

- [ ] `free` 不施加任何主题样式，与正文段落边距对齐

**内联扩展**

- [ ] `==高亮==` / `~~删除线~~` / `++插入++` / `[.着重.]` / `[~波浪~]` 各自样式正确

## Step 5 · 主题注册表

- [ ] `import { themeList } from '@/themes'` 返回 **≥ 9 个主题**
- [ ] 切换主题：CSS 变量、内联 style、SVG 资产**同步刷新**（一次切换不漏）
- [ ] 主题 spec 的 `palette.primary` 正确透传到容器渲染器

## Step 6 · 9 套人格抽查

每套主题至少肉眼过一遍，确认签名动作不漂移（详见 `docs/design/personas/<slug>.md`）：

- [ ] `default` —— 有意识的中立，蓝色 primary（非 Bootstrap 蓝）
- [ ] `tech-geek` —— VT220 琥珀深底，`§` h2 前缀，`[n]` 脚注号
- [ ] `tech-explainer` —— Stripe Docs 蓝清凉白，`codeBlock` 走 `header-bar` 变体
- [ ] `life-aesthetic` —— 暖米底 + 圆角柔和，波浪分割线
- [ ] `business-finance` —— 深栗墨直角，`<strong>` 600（非 800）
- [ ] `literary-humanism` —— 宋椠褐 + 藏经朱，方版心 radius = 0
- [ ] `industry-observer` —— Stratechery 米底 + Issue 印章
- [ ] `people-story` —— 冷米 + 深墨靛，drop cap + 巨号 serif 引号
- [ ] `academic-frontier` —— 白底 + 深靛，`<strong>` 几乎不用（走 `<em>`）

任何一套**违背了自己设计笔记里声明的签名动作**都算回归 bug。

## Step 7 · 配色生成器

- [ ] 打开「配色」抽屉（`Ctrl/⌘ + Shift + C`）
- [ ] 10 个预设点一遍，每次切换容器同步刷新
- [ ] 手动输入 `primary`，`secondary` / `accent` 自动补全
- [ ] 切换 dark 模式，背景变暗、前景变浅，语义四色保持形状冗余
- [ ] 低对比度输入（如 `#dddddd` on `#ffffff`）显示 `fail` 红标
- [ ] 关闭面板后自定义配色**保留当前会话**；刷新页面丢失（预期）

## Step 8 · 草稿 / 模板 / 导出 / 快捷键

### 草稿

- [ ] 「草稿」抽屉（`Ctrl/⌘ + Shift + D`）
- [ ] 新建 / 切换 / 删除草稿正常
- [ ] 刷新页面后自动打开最近使用的那篇
- [ ] 导出 JSON → 清空 localStorage → 导入 JSON，条目全恢复
- [ ] 旧版 `wx-md:draft:single` key 自动迁移为一篇

### 模板

- [ ] 「模板」抽屉 4 个卡片（`cover` / `author` / `footer-cta` / `recommend`）
- [ ] 「插入」把模板 Markdown 写到光标处

### 导出

- [ ] `Ctrl/⌘ + Shift + H` 导出 HTML 文件，打开浏览器样式完整
- [ ] `Ctrl/⌘ + Shift + M` 导出 Markdown，源文本无损
- [ ] 「长图」按钮：
  - [ ] 装了 `html2canvas`：下载完整 PNG
  - [ ] 未装：toolbar 提示 `需要 html2canvas`，不崩

### 快捷键

- [ ] `Ctrl/⌘ + S` 保存当前草稿（视觉反馈）
- [ ] `Ctrl/⌘ + K` 一键复制富文本
- [ ] `Ctrl/⌘ + Shift + {C,D,H,M}` 分别触发配色 / 草稿 / HTML / MD

---

## 真机粘贴验收（最关键）

Chrome / Edge / Safari 各**复制一次**，分别粘贴到公众号后台：

- [ ] 粘贴结果是**富文本**（不是纯文本——部分浏览器对 `ClipboardItem` 的 secure context 要求不同）
- [ ] SVG 可见、在移动端预览无白色穿透
- [ ] 段落间距合理，无首行缩进（微信默认行为）
- [ ] 代码块配色保留
- [ ] 手机预览 SVG `<text>` 字号 ≥ 14 px（光栅化后不糊）

---

## 出现问题时的排查顺序

1. DevTools Console 有无红字
2. 预览 iframe 的 `srcdoc` 看 HTML 结构——`class` 是否全被剥净
3. `npm test` 确认契约未破
4. `npm run typecheck` 确认类型未破
5. 对照 [`src/pipeline/rules.ts`](../src/pipeline/rules.ts) 确认微信平台约束未破
6. 对照 [`src/themes/_shared/spec/validate.ts`](../src/themes/_shared/spec/validate.ts) 确认 spec 硬约束未破

自动化对照入口：`tests/` 下一跑 `npm test` 全绿即契约未破。
