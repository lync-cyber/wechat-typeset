import MarkdownIt from "markdown-it";
import markdownItContainer from "markdown-it-container";
import markdownItMark from "markdown-it-mark";
import markdownItIns from "markdown-it-ins";
import markdownItFootnote from "markdown-it-footnote";
import markdownItTaskLists from "markdown-it-task-lists";
import qrcode from "qrcode-generator";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import juice from "juice";
const DEFAULT_VARIANTS = {
  admonition: "accent-bar",
  quote: "classic",
  compare: "column-card",
  steps: "number-circle",
  divider: "rule",
  sectionTitle: "bordered",
  codeBlock: "bare",
  note: "minimal-callout",
  highlight: "plain",
  footnotes: "lined",
  recommend: "card-list",
  qrcode: "bare",
  footerCTA: "button-led",
  pullQuote: "giant-mark",
  announcement: "danger-bar",
  tableCard: "rule-grid",
  gallery: "duo",
  dialogue: "qa-rows",
  qaBlock: "numbered-faq"
};
const DEFAULT_KICKERS = {
  toc: "目录 · CONTENTS",
  qaBlock: "读者问答 · Q&A",
  qrFollowKicker: "SUBSCRIBE",
  qrFollowTitle: "订阅本刊",
  recommend: "推荐阅读",
  footerCTATitle: "关注我",
  colophonNextLabel: "下 期",
  colophonIssueLabel: "卷 · 期",
  mastheadName: "简报"
};
const VARIANT_IDS = {
  admonition: [
    "accent-bar",
    "pill-tag",
    "card-shadow",
    "terminal",
    "dashed-border",
    "top-bottom-rule",
    "manpage-log",
    "sidenote-latex",
    "marginalia",
    "ledger-cell",
    "bubble-organic",
    "magazine-pull",
    "report-section",
    "news-row",
    "news-underline",
    "mook-tag",
    "slab-corner",
    "numbered-rule",
    "hanging-nb",
    "vermilion-seal",
    "paper-slip",
    "field-tag",
    "specimen-box",
    "filled-square",
    "triangle-top"
  ],
  quote: [
    "classic",
    "magazine-dropcap",
    "column-rule",
    "frame-brackets",
    "editorial-block",
    "tilted-sticker",
    "oversized-mark",
    "numbered-lines",
    "seal-kai",
    "double-frame",
    "specimen-quote",
    "binomial-attrib",
    "huge-numeral",
    "ring-device"
  ],
  compare: [
    "column-card",
    "stacked-row",
    "ledger",
    "data-card",
    "paired-specimen",
    "measurement-table",
    "paired-shape",
    "axis-diagram"
  ],
  steps: [
    "number-circle",
    "timeline-dot",
    "step-card",
    "split-row",
    "seal-cjk",
    "ruler-row"
  ],
  divider: [
    "wave",
    "dots",
    "flower",
    "rule",
    "glyph",
    "seal-mark"
  ],
  sectionTitle: [
    "bordered",
    "cornered",
    "number-prefix",
    "kicker-stack",
    "ribbon-stamp"
  ],
  codeBlock: [
    "bare",
    "header-bar",
    "line-numbers",
    "terminal-frame",
    "inline-card"
  ],
  note: [
    "minimal-callout",
    "box-callout",
    "side-bar",
    "dotted-margin",
    "smallcaps-kicker",
    "editorial-stripe",
    "research-dense",
    "ed-signoff",
    "inline-label",
    "interlinear-gloss",
    "vermilion-gloss",
    "ruler-note",
    "latin-subhead",
    "initial-disc",
    "geometric-mark"
  ],
  highlight: [
    "plain",
    "dotted-underline",
    "tracked-emphasis",
    "vermilion-inline",
    "side-dots",
    "wash-ground",
    "bracketed-tick",
    "geometric-flag",
    "single-stroke"
  ],
  footnotes: [
    "lined",
    "inline-flow",
    "boxed-aside",
    "top-rule",
    "dense-academic"
  ],
  recommend: [
    "card-list",
    "academic-refs"
  ],
  qrcode: [
    "bare",
    "follow-card",
    "qr-stack"
  ],
  footerCTA: [
    "button-led",
    "triptych-actions"
  ],
  pullQuote: [
    "giant-mark",
    "centered-rule",
    "stamp-quote",
    "margin-pull",
    "weight-contrast",
    "drop-capital",
    "calligraphic",
    "with-gloss",
    "bilingual-stack",
    "caliper-mark",
    "inverted-plate",
    "grid-block"
  ],
  announcement: [
    "danger-bar",
    "mono-disclaimer",
    "ai-notice",
    "stamped-banner"
  ],
  tableCard: [
    "rule-grid",
    "zebra-rows",
    "key-value",
    "price-tier",
    "three-line-table",
    "index-table",
    "matrix"
  ],
  gallery: [
    "duo",
    "triptych",
    "nine-grid",
    "ribbon-strip"
  ],
  dialogue: [
    "qa-rows",
    "chat-bubbles",
    "name-prefix",
    "interview-column",
    "audio-stamp"
  ],
  qaBlock: [
    "numbered-faq",
    "hanging-qa",
    "seal-stamp",
    "query-annotation",
    "sample-query",
    "field-card",
    "circle-square",
    "typed-block"
  ]
};
class ThemeAuthoringError extends Error {
  constructor(message) {
    super(message);
    this.name = "ThemeAuthoringError";
  }
}
const SUPPORTED_SIGNATURE_CONTAINERS = [
  "intro",
  "cover",
  "author",
  "authorBio",
  "sectionTitle",
  "masthead",
  "sectionTag",
  "byline",
  "editorialHeader",
  "toc",
  "announcement",
  "tip",
  "warning",
  "info",
  "danger",
  "note",
  "quoteCard",
  "highlight",
  "compare",
  "steps",
  "imageCaption",
  "timeline",
  "qaBlock",
  "footerCTA",
  "recommend",
  "qrcode",
  "voiceCard",
  "videoCard",
  "abstract",
  "keyNumber",
  "kpiDashboard",
  "barChart",
  "footnotes",
  "colophon",
  "pullQuote",
  "tableCard",
  "gallery",
  "dialogue"
];
const WCAG_AA_NORMAL = 4.5;
const WCAG_AA_LARGE = 3;
const WCAG_AAA_NORMAL = 7;
function parseHex(hex) {
  if (typeof hex !== "string") return null;
  const m = /^#([0-9a-fA-F]{3,8})$/.exec(hex.trim());
  if (!m) return null;
  const body = m[1];
  let r, g, b;
  if (body.length === 3) {
    r = parseInt(body[0] + body[0], 16);
    g = parseInt(body[1] + body[1], 16);
    b = parseInt(body[2] + body[2], 16);
  } else if (body.length === 6 || body.length === 8) {
    r = parseInt(body.slice(0, 2), 16);
    g = parseInt(body.slice(2, 4), 16);
    b = parseInt(body.slice(4, 6), 16);
  } else {
    return null;
  }
  return { r, g, b };
}
function channelLuminance(c8) {
  const c = c8 / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function relativeLuminance(hex) {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  return 0.2126 * channelLuminance(rgb.r) + 0.7152 * channelLuminance(rgb.g) + 0.0722 * channelLuminance(rgb.b);
}
function wcagRatio(fg, bg) {
  const lf = relativeLuminance(fg);
  const lb = relativeLuminance(bg);
  if (lf === null || lb === null) return NaN;
  const [hi, lo] = lf > lb ? [lf, lb] : [lb, lf];
  return (hi + 0.05) / (lo + 0.05);
}
const PALETTE_CONTRAST_PAIRS = [
  { fg: "text", bg: "bg", where: "p / h1-h5 (baseElements.p)" },
  { fg: "textMuted", bg: "bg", where: "h6 弱标题 (baseElements.h6)" },
  { fg: "textMuted", bg: "bgSoft", where: "blockquote (baseElements.blockquote)" },
  { fg: "text", bg: "bgSoft", where: "kbd 键帽 (baseElements.kbd)" },
  { fg: "code", bg: "bgMuted", where: "inline <code> (baseElements.code)" },
  { fg: "preText", bg: "preBg", where: "<pre> 代码块 (baseElements.pre)" },
  // 大字/装饰：链接、h2 底边、accent strip
  { fg: "primary", bg: "bg", where: "链接 / h2 border / accent strip", largeText: true }
];
const A11Y_TEMPORARY_GRACE = /* @__PURE__ */ new Set([
  // ── swiss-grid · WARN 设计黄 #f9a825 是 swiss-grid 招牌签名色，1.80:1。
  //    Phase 1.5 协商：要么换"WARN 文字色 + soft 强对比"，要么品牌让步加深一档。
  "swiss-grid:status.warning",
  // ── editorial-mook · POPEYE 朱橙 #e85a3c + Japanese mook 整套低反差配色是主题灵魂。
  //    全 7 处入 grace，Phase 1.5 与设计 owner 协商：要么改主题视觉语言，要么接受
  //    "mook 主题不为正文 a11y 兜底，只为大字 / 标题对比"的弱契约。
  "editorial-mook:textMuted/bg",
  "editorial-mook:textMuted/bgSoft",
  "editorial-mook:code/bgMuted",
  "editorial-mook:status.tip",
  "editorial-mook:status.info",
  "editorial-mook:status.warning",
  "editorial-mook:status.danger",
  // ── life-aesthetic · 暖米卡纸"做旧标签纸"配色：饱和度低、明度近，整套是品牌纹理。
  //    7 处入 grace；preText/preBg 已通过修色解决，textMuted / code / primary / 4 态状态色保留。
  "life-aesthetic:textMuted/bgSoft",
  "life-aesthetic:code/bgMuted",
  "life-aesthetic:primary/bg",
  "life-aesthetic:status.tip",
  "life-aesthetic:status.info",
  "life-aesthetic:status.warning",
  "life-aesthetic:status.danger",
  // ── late-night-vinyl · danger 4.20:1（临界 0.3）。暗底主题红色加深会进一步丢失"霓虹"质感,
  //    与 swiss-grid 设计黄同模式：留 grace，Phase 1.5 协商保留度。
  "late-night-vinyl:status.danger"
]);
function emit$1(sink, path, message, inGrace) {
  const entry = {
    path,
    message: inGrace ? `${message} [已登记 A11Y_TEMPORARY_GRACE]` : message,
    severity: inGrace ? "warning" : "error"
  };
  (inGrace ? sink.warnings : sink.errors).push(entry);
}
function checkPair(spec2, effectivePalette, pair, sink) {
  const fg = effectivePalette[pair.fg];
  const bg = effectivePalette[pair.bg];
  if (typeof fg !== "string" || typeof bg !== "string") return;
  const ratio = wcagRatio(fg, bg);
  if (!Number.isFinite(ratio)) return;
  const min = pair.largeText ? WCAG_AA_LARGE : WCAG_AA_NORMAL;
  const path = `palette.${pair.fg}|${pair.bg}`;
  if (ratio < min) {
    const graceKey = `${spec2.id}:${pair.fg}/${pair.bg}`;
    emit$1(
      sink,
      path,
      `${pair.where}: ${fg} on ${bg} = ${ratio.toFixed(2)}:1 < ${min}:1 (WCAG AA ${pair.largeText ? "大字/装饰" : "正文"})`,
      A11Y_TEMPORARY_GRACE.has(graceKey)
    );
  } else if (!pair.largeText && ratio < WCAG_AAA_NORMAL) {
    sink.warnings.push({
      path,
      message: `${pair.where}: ${ratio.toFixed(2)}:1 通过 AA 未达 AAA (${WCAG_AAA_NORMAL}:1)`,
      severity: "warning"
    });
  }
}
function checkStatusPairs(spec2, sink) {
  if (!spec2.status) return;
  for (const key of ["tip", "info", "warning", "danger"]) {
    const pair = spec2.status[key];
    if (!pair) continue;
    const ratio = wcagRatio(pair.accent, pair.soft);
    if (!Number.isFinite(ratio)) continue;
    if (ratio < WCAG_AA_NORMAL) {
      const graceKey = `${spec2.id}:status.${key}`;
      emit$1(
        sink,
        `status.${key}`,
        `admonition.${key} accent on soft: ${pair.accent} on ${pair.soft} = ${ratio.toFixed(2)}:1 < ${WCAG_AA_NORMAL}:1`,
        A11Y_TEMPORARY_GRACE.has(graceKey)
      );
    }
  }
}
function analyzeContrast(spec2) {
  const sink = { errors: [], warnings: [] };
  if (!spec2.palette) return sink;
  const effectivePalette = {
    ...spec2.palette,
    preBg: spec2.palette.preBg ?? "#2a2d32",
    preText: spec2.palette.preText ?? "#d8d8d4"
  };
  for (const p of PALETTE_CONTRAST_PAIRS) checkPair(spec2, effectivePalette, p, sink);
  checkStatusPairs(spec2, sink);
  return sink;
}
const SAFE_MARGIN = 8;
const EXPAND_THRESHOLD = 2;
function substitutePlaceholders$1(s, values) {
  return s.replace(/\{(\w+)\}/g, (_, name) => {
    const v = values[name];
    return v === void 0 ? `{${name}}` : String(v);
  });
}
function measureTextWidth(content, fontSize, letterSpacing = 0) {
  let charWidth = 0;
  for (const ch of content) {
    const cp = ch.codePointAt(0) ?? 0;
    if (cp >= 19968 && cp <= 40959 || // CJK 统一表意
    cp >= 12288 && cp <= 12543 || // CJK 符号 / 假名
    cp >= 65280 && cp <= 65519) {
      charWidth += 1 * fontSize;
    } else if (cp >= 48 && cp <= 57) {
      charWidth += 0.62 * fontSize;
    } else if (cp >= 65 && cp <= 90) {
      charWidth += 0.7 * fontSize;
    } else if (cp >= 97 && cp <= 122) {
      charWidth += 0.6 * fontSize;
    } else if (cp === 35 || cp === 64 || cp === 37) {
      charWidth += 0.65 * fontSize;
    } else {
      charWidth += 0.4 * fontSize;
    }
  }
  const chars = [...content].length;
  const spacing = chars > 0 ? letterSpacing * chars : 0;
  return charWidth + spacing;
}
function textRightEdge(primitive, values) {
  if (primitive.type !== "text") return null;
  const content = substitutePlaceholders$1(primitive.content, values);
  const w = measureTextWidth(content, primitive.fontSize, primitive.letterSpacing ?? 0);
  const anchor = primitive.textAnchor ?? "start";
  if (anchor === "middle") return primitive.x + w / 2;
  if (anchor === "end") return primitive.x;
  return primitive.x + w;
}
function collectMaxTextRight(primitives, values) {
  let max = 0;
  for (const p of primitives) {
    if (p.type === "text") {
      const right = textRightEdge(p, values);
      if (right !== null && right > max) max = right;
    }
  }
  return max;
}
function expandRect(p, origW, deltaW) {
  if (p.type !== "rect") return p;
  const rightEdge = p.x + p.w;
  if (Math.abs(rightEdge - origW) <= 4) {
    return { ...p, w: p.w + deltaW };
  }
  return p;
}
function fitTemplateToText(template, values) {
  const origW = template.viewBox[2];
  const maxRight = collectMaxTextRight(template.primitives, values);
  const needed = maxRight + SAFE_MARGIN;
  if (needed - origW < EXPAND_THRESHOLD) return template;
  const deltaW = Math.ceil(needed - origW);
  const newW = origW + deltaW;
  return {
    ...template,
    viewBox: [template.viewBox[0], template.viewBox[1], newW, template.viewBox[3]],
    width: template.width !== void 0 ? template.width + deltaW : void 0,
    primitives: template.primitives.map((p) => expandRect(p, origW, deltaW))
  };
}
const HEX_RE = /^#[0-9a-fA-F]{3,8}$/;
const MIN_FONT_SIZE = 14;
const MIN_STROKE_WIDTH = 1;
const ALLOWED_FONT_FAMILIES = /* @__PURE__ */ new Set([
  "serif",
  "sans-serif",
  "monospace"
]);
const LINE_HEIGHT_MIN = 1.4;
const LINE_HEIGHT_MAX = 2;
const LETTER_SPACING_MAX = 1;
const TYPOGRAPHY_TEMPORARY_GRACE = /* @__PURE__ */ new Set([
  // 设计稿正文 13px：刻意保留风格，待与作者协商提升到 14px 的稿酬空间
  "editorial-mook:baseSize",
  "swiss-grid:baseSize",
  "brutalist:baseSize",
  // 故意拉宽行高（晚间慢读 / 散文呼吸感）
  "late-night-vinyl:lineHeight"
]);
function emit(sink, themeId, field, path, message) {
  const inGrace = TYPOGRAPHY_TEMPORARY_GRACE.has(`${themeId}:${field}`);
  const entry = {
    path,
    message: inGrace ? `${message} [已登记 TYPOGRAPHY_TEMPORARY_GRACE]` : message,
    severity: inGrace ? "warning" : "error"
  };
  (inGrace ? sink.warnings : sink.errors).push(entry);
}
function validateTypography(spec2) {
  const sink = { errors: [], warnings: [] };
  const t = spec2.typography;
  if (!t) return sink;
  if (typeof t.baseSize === "number" && t.baseSize < MIN_FONT_SIZE) {
    emit(
      sink,
      spec2.id,
      "baseSize",
      "typography.baseSize",
      `${t.baseSize}px < ${MIN_FONT_SIZE}px (WeChat 客户端 < 14px 触发模糊光栅化)`
    );
  }
  if (typeof t.lineHeight === "number" && (t.lineHeight < LINE_HEIGHT_MIN || t.lineHeight > LINE_HEIGHT_MAX)) {
    emit(
      sink,
      spec2.id,
      "lineHeight",
      "typography.lineHeight",
      `${t.lineHeight} ∉ [${LINE_HEIGHT_MIN}, ${LINE_HEIGHT_MAX}] (过紧/过散均损正文可读性)`
    );
  }
  if (typeof t.letterSpacing === "number" && t.letterSpacing > LETTER_SPACING_MAX) {
    emit(
      sink,
      spec2.id,
      "letterSpacing",
      "typography.letterSpacing",
      `${t.letterSpacing}px > ${LETTER_SPACING_MAX}px (中文段落字距 > 1px 拆词感过重)`
    );
  }
  return sink;
}
const STATUS_KEYS = ["tip", "info", "warning", "danger"];
function isHex(v) {
  return typeof v === "string" && HEX_RE.test(v);
}
function validateSpec(spec2) {
  const errors = [];
  const warnings = [];
  const err = (path, message) => errors.push({ path, message, severity: "error" });
  const warn = (path, message) => warnings.push({ path, message, severity: "warning" });
  if (!spec2.id || typeof spec2.id !== "string") err("id", "id must be non-empty string");
  else if (!/^_?[a-z][a-z0-9-]*$/.test(spec2.id))
    err("id", `id must be kebab-case (optional _ prefix for template/example specs): "${spec2.id}"`);
  if (!spec2.name) err("name", "name is required");
  if (!spec2.description) err("description", "description is required");
  if (!spec2.audience) err("audience", "audience is required");
  if (!spec2.palette) {
    err("palette", "palette is required");
  } else {
    const NON_HEX_KEYS = /* @__PURE__ */ new Set(["noteBorderStyle", "noteBorderWidth"]);
    for (const [k, v] of Object.entries(spec2.palette)) {
      if (NON_HEX_KEYS.has(k)) continue;
      if (!isHex(v)) err(`palette.${k}`, `"${v}" is not a valid hex color`);
    }
    const style = spec2.palette.noteBorderStyle;
    if (style !== void 0 && !["solid", "dashed", "double", "dotted"].includes(style)) {
      err("palette.noteBorderStyle", `"${style}" not in {solid|dashed|double|dotted}`);
    }
    const width = spec2.palette.noteBorderWidth;
    if (width !== void 0 && (!Number.isInteger(width) || width < 1 || width > 8)) {
      err("palette.noteBorderWidth", `${width} must be integer in [1, 8]`);
    }
  }
  if (!spec2.status) {
    err("status", "status is required");
  } else {
    for (const key of STATUS_KEYS) {
      const pair = spec2.status[key];
      if (!pair) err(`status.${key}`, `status.${key} missing`);
      else {
        if (!isHex(pair.accent)) err(`status.${key}.accent`, `"${pair.accent}" is not a valid hex`);
        if (!isHex(pair.soft)) err(`status.${key}.soft`, `"${pair.soft}" is not a valid hex`);
      }
    }
  }
  if (!spec2.typography) err("typography", "typography is required");
  if (!spec2.spacing) err("spacing", "spacing is required");
  if (!spec2.radius) err("radius", "radius is required");
  if (!spec2.variants) {
    err("variants", "variants is required");
  } else {
    for (const kind of Object.keys(spec2.variants)) {
      const id = spec2.variants[kind];
      const allowed = VARIANT_IDS[kind];
      if (!allowed) {
        err(`variants.${String(kind)}`, `unknown variant kind`);
      } else if (!allowed.includes(id)) {
        err(`variants.${String(kind)}`, `"${id}" not in VARIANT_IDS.${String(kind)}`);
      }
    }
  }
  if (spec2.signatureContainers) {
    const registry = new Set(SUPPORTED_SIGNATURE_CONTAINERS);
    spec2.signatureContainers.forEach((id, i) => {
      if (!registry.has(id))
        err(`signatureContainers[${i}]`, `"${id}" not in SUPPORTED_SIGNATURE_CONTAINERS`);
    });
  }
  if (spec2.admonitionOverrides) {
    const allowed = new Set(VARIANT_IDS.admonition);
    spec2.admonitionOverrides.forEach((id, i) => {
      if (!allowed.has(id))
        err(
          `admonitionOverrides[${i}]`,
          `"${id}" not in VARIANT_IDS.admonition (legal admonition variant ids)`
        );
    });
  }
  if (spec2.motifs) {
    validateMotifs(spec2.motifs, err, warn);
  }
  if (!spec2.meta || typeof spec2.meta.createdAt !== "string")
    err("meta.createdAt", "meta.createdAt must be an ISO string");
  const typo = validateTypography(spec2);
  errors.push(...typo.errors);
  warnings.push(...typo.warnings);
  const a11y = analyzeContrast(spec2);
  errors.push(...a11y.errors);
  warnings.push(...a11y.warnings);
  return { ok: errors.length === 0, errors, warnings };
}
function validateMotifs(motifs, err, warn) {
  for (const [key, shape] of Object.entries(motifs)) {
    if (!shape) continue;
    const path = `motifs.${key}`;
    if (!Array.isArray(shape.viewBox) || shape.viewBox.length !== 4) {
      err(`${path}.viewBox`, "viewBox must be [minX, minY, width, height]");
      continue;
    }
    if (shape.viewBox.some((n) => typeof n !== "number")) {
      err(`${path}.viewBox`, "viewBox entries must be numbers");
    }
    const prims = "primitives" in shape ? shape.primitives : null;
    if (!Array.isArray(prims)) {
      err(`${path}.primitives`, "primitives must be an array");
      continue;
    }
    prims.forEach((p, i) => validatePrimitive(p, `${path}.primitives[${i}]`, err));
    if ("placeholders" in shape && shape.placeholders) {
      const declared = new Set(shape.placeholders);
      const seen = /* @__PURE__ */ new Set();
      for (const p of prims) collectPlaceholders(p, seen);
      for (const name of seen) {
        if (!declared.has(name))
          err(`${path}`, `primitive uses placeholder "{${name}}" not declared in placeholders`);
      }
      checkMotifTemplateWidth(shape, path, warn);
    }
  }
}
const TYPICAL_PLACEHOLDER_SAMPLES = {
  N: "8",
  issue: "023",
  date: "2025-04-20",
  kind: "周刊"
};
function checkMotifTemplateWidth(template, path, warn) {
  const fitted = fitTemplateToText(template, TYPICAL_PLACEHOLDER_SAMPLES);
  if (fitted === template) return;
  const origW = template.viewBox[2];
  const newW = fitted.viewBox[2];
  warn(
    `${path}.viewBox`,
    `viewBox 宽度 ${origW} 在典型占位样本下不足（需 ${newW}）；runtime 会自动扩展，但建议调整模板 viewBox 与外框 rect 至 ≥ ${newW} 以避免依赖兜底。`
  );
}
function validatePrimitive(p, path, err, warn) {
  if (!p || typeof p !== "object" || !("type" in p)) {
    err(path, "primitive must be a tagged object");
    return;
  }
  if (p.type === "text") {
    if (typeof p.fontSize !== "number" || p.fontSize < MIN_FONT_SIZE)
      err(`${path}.fontSize`, `fontSize ${p.fontSize} < ${MIN_FONT_SIZE} (WeChat rasterization floor)`);
    if (p.fontFamily && !ALLOWED_FONT_FAMILIES.has(p.fontFamily))
      err(
        `${path}.fontFamily`,
        `"${p.fontFamily}" not in whitelist {serif|sans-serif|monospace}`
      );
  }
  if (p.type === "group") {
    if (!Array.isArray(p.children)) {
      err(`${path}.children`, "group.children must be an array");
    } else {
      p.children.forEach((c, i) => validatePrimitive(c, `${path}.children[${i}]`, err));
    }
    return;
  }
  const strokeWidth = p.strokeWidth;
  const hasStroke = p.type === "line" || p.stroke;
  if (hasStroke && typeof strokeWidth === "number" && strokeWidth < MIN_STROKE_WIDTH) {
    err(`${path}.strokeWidth`, `strokeWidth ${strokeWidth} < ${MIN_STROKE_WIDTH}`);
  }
}
function collectPlaceholders(p, into) {
  for (const [k, v] of Object.entries(p)) {
    if (k === "children" && Array.isArray(v)) {
      for (const c of v) collectPlaceholders(c, into);
      continue;
    }
    if (typeof v === "string") {
      const re = /\{(\w+)\}/g;
      let m;
      while (m = re.exec(v)) into.add(m[1]);
    }
  }
}
const INLINE_EXTENSIONS = Object.freeze([
  {
    syntax: "==mark==",
    description: "荧光笔高亮（markdown-it-mark）",
    regex: "==([^=]+)==",
    inputExample: "==重点==",
    outputHtmlExample: "<mark>重点</mark>"
  },
  {
    syntax: "~~del~~",
    description: "GFM 删除线",
    regex: "~~([^~]+)~~",
    inputExample: "~~已废弃~~",
    outputHtmlExample: "<s>已废弃</s>"
  },
  {
    syntax: "++ins++",
    description: "插入（markdown-it-ins）",
    regex: "\\+\\+([^+]+)\\+\\+",
    inputExample: "++新增++",
    outputHtmlExample: "<ins>新增</ins>"
  },
  {
    syntax: "[.text.]",
    description: "中文着重号",
    regex: "\\[\\.([^\\n]+?)\\.\\]",
    inputExample: "[.核心论点.]",
    outputHtmlExample: '<span class="wx-emphasis">核心论点</span>'
  },
  {
    syntax: "[~text~]",
    description: "波浪下划线",
    regex: "\\[~([^\\n]+?)~\\]",
    inputExample: "[~引文出处~]",
    outputHtmlExample: '<span class="wx-wavy">引文出处</span>'
  }
]);
const WT_ERROR_INFO = Object.freeze({
  CONTRACT_VIOLATION: { exitCode: 4, description: "markdown 容器/语法/嵌套错（fence_not_closed 等）" },
  SPEC_INVALID: { exitCode: 3, description: "PersonaSpec 校验失败" },
  INPUT_AMBIGUOUS: { exitCode: 1, description: "render 同时给 persona/theme/spec" },
  RESOURCE_NOT_FOUND: { exitCode: 2, description: "未知 persona / 容器 / variant id" },
  PLATFORM_UNSUPPORTED: { exitCode: 5, description: "未知 publish 平台 id" },
  RENDER_FAILED: { exitCode: 6, description: "管线内部异常（未归类，兜底）。与 CONTRACT_VIOLATION 区分，便于 CI 程序化分支" }
});
Object.freeze(Object.keys(WT_ERROR_INFO));
class WtException extends Error {
  code;
  errors;
  warnings;
  constructor(code, errors, warnings = []) {
    const head = errors[0]?.message ?? code;
    const tail = errors.length > 1 ? ` (+${errors.length - 1} more)` : "";
    super(`${code}: ${head}${tail}`);
    this.name = "WtException";
    this.code = code;
    this.errors = errors;
    this.warnings = warnings;
  }
}
const EXIT_CODES = Object.freeze(
  Object.fromEntries(
    Object.keys(WT_ERROR_INFO).map((k) => [k, WT_ERROR_INFO[k].exitCode])
  )
);
function fail(code, message, opts = {}) {
  throw new WtException(code, [{ message, severity: "error", ...opts }]);
}
const VOCAB_ENTRIES = [
  // ── structure（4 + 4 data-brief 家族） ───────────────────
  {
    name: "intro",
    styleKey: "intro",
    category: "structure",
    fenceLength: 3,
    description: "文首引子／导语卡。独立 bgSoft 底，区别于正文段落。",
    example: "::: intro\n本文探讨 …\n:::\n"
  },
  {
    name: "cover",
    styleKey: "cover",
    category: "structure",
    fenceLength: 3,
    attrs: [
      { key: "issue", description: "期号（newsletter 主题会渲染期号戳）", example: "023" },
      { key: "date", description: "日期", example: "2026-04-20" },
      { key: "kind", description: "刊物类型", example: "周刊" }
    ],
    description: "封面卡（封面图 + 题头 + 可选期号戳）。",
    example: "::: cover\n![](cover.png)\n\n## 主标题\n:::\n"
  },
  {
    name: "author",
    styleKey: "author",
    category: "structure",
    fenceLength: 3,
    attrs: [
      { key: "issue", description: "期号（newsletter 主题可用）", example: "023" },
      { key: "date", description: "日期", example: "2026-04-20" }
    ],
    description: "作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。",
    example: "::: author\n作者 · 日期\n:::\n"
  },
  {
    // author-bio：与 author 的边界：
    //   - author：文首/文末"署名行"，单行紧凑（名字 · 日期 · 期号）
    //   - author-bio：多行作者简介卡（头像 attr + 多行 body 介绍 + 可选社交链接），独立块
    name: "author-bio",
    styleKey: "authorBio",
    category: "structure",
    fenceLength: 3,
    attrs: [
      { key: "avatar", description: "头像图片 URL（声明则 renderer 自动渲染圆形头像）" },
      { key: "name", description: "作者姓名（缺省则取 info）" },
      { key: "role", description: '作者身份（如"专栏作者 · 城市观察"）' }
    ],
    description: '多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。',
    example: '::: author-bio avatar="me.png" name="顾留白" role="专栏作者"\n非虚构写作 8 年，关注城市与日常。\n:::\n'
  },
  {
    name: "section-title",
    styleKey: "sectionTitle",
    category: "structure",
    variantKind: "sectionTitle",
    fenceLength: 3,
    description: "章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。",
    example: "::: section-title\n第一章 · 缘起\n:::\n"
  },
  {
    name: "masthead",
    styleKey: "masthead",
    category: "structure",
    pack: "pack:editorial",
    fenceLength: 3,
    attrs: [
      { key: "issue", description: "期号（monospace 右对齐；默认两栏布局生效）", example: "004" },
      { key: "date", description: "日期（monospace 右对齐）", example: "2026.04.22" },
      {
        key: "kicker",
        description: '左侧前缀（如 "第 04 期"）。提供时切换为三栏 ribbon 布局：左=kicker / 中=name（accent 色） / 右=date —— 报刊期次条骨架。',
        example: "第 04 期"
      }
    ],
    description: "刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。",
    example: '::: masthead 慢读简报 issue="004" date="2026.04.22"\n:::\n'
  },
  {
    name: "section-tag",
    styleKey: "sectionTag",
    category: "structure",
    pack: "pack:editorial",
    fenceLength: 3,
    description: '小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。',
    example: "::: section-tag 深度\n:::\n"
  },
  {
    name: "byline",
    styleKey: "byline",
    category: "structure",
    pack: "pack:editorial",
    fenceLength: 3,
    attrs: [
      {
        key: "cells",
        description: "三栏（或更多）署名单元，竖线 `|` 分隔；每格 `kicker:value` 用半角冒号分隔。例：`AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026`。为零时回退到旧 author 形态（info 作 name + role/issue attrs），但 byline 建议总是声明 cells。",
        example: "AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026"
      },
      {
        key: "monospaceLast",
        description: '末格 value 是否走 monospace 字体（typically "SET" 期次或日期）。',
        enum: ["true", "false"]
      }
    ],
    description: '署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。',
    example: '::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"\n:::\n'
  },
  {
    name: "editorial-header",
    styleKey: "editorialHeader",
    category: "structure",
    pack: "pack:editorial",
    fenceLength: 3,
    attrs: [
      {
        key: "chip",
        description: '装饰小红章文字（如 "ESSAY · 01"）。声明则在大标题上方渲染 primary 实色徽章 + hairline。',
        example: "ESSAY · 01"
      },
      {
        key: "pp",
        description: "右上页码区间（monospace 小字，与 chip 同一行 hairline 居中对齐）。",
        example: "PP.04–19"
      },
      {
        key: "subtitle",
        description: "主标题下方副标题（13px 中粗黑字，无字距）。",
        example: "论慢读在算法时代的价值"
      },
      {
        key: "topRule",
        description: "顶部装饰色条宽度（px 整数，0=不渲染）。Swiss 苏黎世副刊头惯用 6。",
        example: "6"
      },
      {
        key: "titleDot",
        description: '主标题末色实心点（PaletteColorKey）。声明则在 info 末尾追加一个该色 "."。',
        enum: ["primary", "accent", "secondary"]
      },
      {
        key: "br",
        description: '在 info 中作为换行分隔符的字符串（默认 " / "，前后各一空格）。让作者用一行 info 表达多行大标题：`info="在无人深夜， / 重新学习 / 如何阅读一本书"`',
        example: " / "
      }
    ],
    description: "装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。",
    example: '::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"\n:::\n'
  },
  {
    name: "toc",
    styleKey: "toc",
    category: "navigation",
    pack: "pack:editorial",
    fenceLength: 4,
    children: ["toc-item"],
    attrs: [
      {
        key: "layout",
        description: "布局模式：default = 单列（kicker 顶 + items 下）；split = 双栏（左 kicker+meta / 右 toc-items）。Swiss 苏黎世双栏对开页用 split + meta 描述栏位比例。",
        enum: ["default", "split"]
      },
      {
        key: "meta",
        description: 'split 布局时左列副说明（如 "目次排布采用12栏 / 1/3 : 2/3 比例"）。多行用 ` / ` 分隔。default 布局忽略。',
        example: "目次排布采用12栏 / 1/3 : 2/3 比例"
      }
    ],
    description: "目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。",
    example: ':::: toc 目录 · CONTENTS\n::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心\n:::\n::::\n'
  },
  {
    name: "toc-item",
    styleKey: null,
    category: "navigation",
    pack: "pack:editorial",
    parent: "toc",
    fenceLength: 3,
    attrs: [
      { key: "no", description: "序号（monospace 主色）", example: "01" },
      { key: "page", description: "页码（monospace 灰）", example: "p.04" }
    ],
    description: "toc 内单条；info 为条目标题。body 内容会被忽略。",
    example: '::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心\n:::\n'
  },
  // ── admonition（6） ───────────────────────────────────────
  {
    // announcement：通用全宽强警示横幅。与 tip/warning 的边界：
    //   - tip/warning 是段落级（多见于正文内"穿插提示"）
    //   - announcement 是文章级"置顶通告"（活动告知 / 紧急公告 / 改版说明），视觉强度更高
    // tone 与 variant 正交：tone 控色（danger/primary/accent），variant 控骨架（4 种语言）。
    name: "announcement",
    styleKey: "announcement",
    category: "admonition",
    variantKind: "announcement",
    fenceLength: 3,
    attrs: [
      {
        key: "tone",
        description: "语义色调（默认 danger 强警示；可选 primary 中性告知 / accent 喜庆通告）",
        enum: ["danger", "primary", "accent"]
      },
      {
        key: "variant",
        description: "覆盖主题默认的 announcement 骨架。danger-bar（默认）= 左色条 + soft 底；mono-disclaimer = 法律声明监 monospace 边框无填充；ai-notice = AI 生成内容合规告知（含徽章）；stamped-banner = 右侧 SVG 印章戳。",
        enum: VARIANT_IDS.announcement
      }
    ],
    description: '强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。',
    example: "::: announcement tone=danger 重要通知\n本期推送涉及账号迁移说明 …\n:::\n",
    narrativeStrength: 4
  },
  {
    name: "tip",
    styleKey: "tip",
    category: "admonition",
    variantKind: "admonition",
    fenceLength: 3,
    attrs: [
      {
        key: "variant",
        description: "覆盖主题默认的 admonition 骨架",
        enum: VARIANT_IDS.admonition
      }
    ],
    description: "tip：小贴士／正向提示。",
    example: "::: tip 小贴士\n内容 …\n:::\n",
    narrativeStrength: 3
  },
  {
    name: "warning",
    styleKey: "warning",
    category: "admonition",
    variantKind: "admonition",
    fenceLength: 3,
    description: "warning：需要读者注意的提醒。",
    example: "::: warning 注意\n内容 …\n:::\n",
    narrativeStrength: 3
  },
  {
    name: "info",
    styleKey: "info",
    category: "admonition",
    variantKind: "admonition",
    fenceLength: 3,
    description: "info：中性说明／补充信息。",
    example: "::: info 说明\n内容 …\n:::\n",
    narrativeStrength: 3
  },
  {
    name: "danger",
    styleKey: "danger",
    category: "admonition",
    variantKind: "admonition",
    fenceLength: 3,
    description: "danger：高风险警告／错误示范。",
    example: "::: danger 警告\n内容 …\n:::\n",
    narrativeStrength: 3
  },
  {
    name: "note",
    styleKey: "note",
    category: "admonition",
    variantKind: "note",
    fenceLength: 3,
    attrs: [
      {
        key: "variant",
        description: "覆盖主题默认的 note 骨架。variant 覆盖三档语气：中性（minimal-callout / box-callout / side-bar / dotted-margin / smallcaps-kicker）；编辑部按（editorial-stripe，主色左条 + bgSoft）；调研口径（research-dense，10px 紧凑 + bold label）。",
        enum: VARIANT_IDS.note
      }
    ],
    description: 'note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。',
    example: "::: note 补注\n内容 …\n:::\n",
    narrativeStrength: 2
  },
  // ── content（6） ──────────────────────────────────────────
  {
    name: "quote-card",
    styleKey: "quoteCard",
    category: "content",
    variantKind: "quote",
    fenceLength: 3,
    description: "大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。",
    example: "::: quote-card\n一段值得突出的引用 …\n:::\n",
    narrativeStrength: 4
  },
  {
    name: "highlight",
    styleKey: "highlight",
    category: "content",
    variantKind: "highlight",
    fenceLength: 3,
    description: '行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。',
    example: "::: highlight\n需要读者停下来的一段话 …\n:::\n",
    narrativeStrength: 1
  },
  {
    name: "compare",
    styleKey: "compare",
    category: "content",
    variantKind: "compare",
    nestable: true,
    children: ["pros", "cons"],
    fenceLength: 4,
    description: "双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。",
    example: ":::: compare\n::: pros 优点\n- A\n:::\n::: cons 缺点\n- B\n:::\n::::\n"
  },
  {
    name: "pros",
    styleKey: null,
    category: "content",
    parent: "compare",
    fenceLength: 3,
    description: 'compare 的"正面"列（必须嵌在 :::: compare 内）。',
    example: "::: pros 优点\n- A\n- B\n:::\n"
  },
  {
    name: "cons",
    styleKey: null,
    category: "content",
    parent: "compare",
    fenceLength: 3,
    description: 'compare 的"反面"列（必须嵌在 :::: compare 内）。',
    example: "::: cons 缺点\n- A\n- B\n:::\n"
  },
  {
    name: "steps",
    styleKey: "steps",
    category: "content",
    variantKind: "steps",
    fenceLength: 3,
    description: "编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。",
    example: "::: steps\n1. 初始化\n2. 构建\n3. 发布\n:::\n"
  },
  {
    // image-caption：图 + 居中小字灰说明的固定排版。body 是图片 + caption，
    // renderer 把首段当 caption 行渲成 textMuted 小字（不要再用 free 凑）。
    name: "image-caption",
    styleKey: "imageCaption",
    category: "content",
    fenceLength: 3,
    attrs: [
      { key: "src", description: "图片 URL（声明则 renderer 自动渲染 <img>）" },
      { key: "alt", description: "图片替代文本" }
    ],
    description: "图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。",
    example: '::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹\n摄于 2026 年春，北京三里屯。\n:::\n'
  },
  {
    // timeline：年份 + 事件的时序列表。与 steps 的边界：
    //   - steps：动作序列（"先 A 后 B 再 C"，强调可执行）
    //   - timeline：历史时序（"1979 / 2003 / 2024"，强调时间维度）
    name: "timeline",
    styleKey: "timeline",
    category: "content",
    nestable: true,
    children: ["timeline-item"],
    fenceLength: 4,
    description: "时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。",
    example: ':::: timeline 项目里程碑\n::: timeline-item year="2024" 项目立项\n方案确认，团队组建。\n:::\n::: timeline-item year="2025" 公测上线\n首批用户邀请制开放。\n:::\n::::\n'
  },
  {
    name: "timeline-item",
    styleKey: null,
    category: "content",
    parent: "timeline",
    fenceLength: 3,
    attrs: [
      { key: "year", description: "左侧年份 / 日期标签（monospace）", example: "2024" }
    ],
    description: "timeline 内单条；info 为事件标题，body 为详述。",
    example: '::: timeline-item year="2024" 项目立项\n方案确认，团队组建。\n:::\n'
  },
  {
    name: "qa-block",
    styleKey: "qaBlock",
    category: "content",
    pack: "pack:editorial",
    variantKind: "qaBlock",
    fenceLength: 3,
    attrs: [
      {
        key: "q",
        description: "问题文本（visual: 主色 Q 方块头像 + 单行）",
        example: "数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
      },
      {
        key: "variant",
        description: "覆盖主题默认 qa-block 骨架。numbered-faq（默认）= Q.NN 序号 + 底线分隔；hanging-qa = 大号斜体 Q./A. 悬挂；seal-stamp = 问/答 朱印徽章；query-annotation = 設・問 夹线 + 註 hanging；sample-query = QUERY/FINDING 双栏；field-card = 田野卡片外框；circle-square = 圆方代号；typed-block = 反白上下分栏。",
        enum: VARIANT_IDS.qaBlock
      }
    ],
    description: '读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。',
    example: '::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"\n有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。\n:::\n'
  },
  // ── navigation（3） ──────────────────────────────────────
  {
    // divider 是"styleKey=null + variantKind 非空"的唯一一对组合：
    // variant 模块直接产出完整 HTML（含 SVG / line），没有 wrapper CSS 槽位需要 themeCSS 注入。
    // 因此不进 ThemeContainers 字段集，仅按 variantKind 分派。
    name: "divider",
    styleKey: null,
    category: "navigation",
    variantKind: "divider",
    fenceLength: 3,
    description: "装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。",
    example: "::: divider\n:::\n"
  },
  {
    name: "footer-cta",
    styleKey: "footerCTA",
    category: "navigation",
    variantKind: "footerCTA",
    fenceLength: 3,
    attrs: [
      {
        key: "variant",
        description: "覆盖主题默认的 footerCTA 骨架。button-led（默认）= 居中标题 + 主色胶囊按钮；triptych-actions = 三栏 CTA（赞同 / 收藏 / 转发，display:table 等宽）。",
        enum: VARIANT_IDS.footerCTA
      },
      { key: "cta", description: "button-led 按钮文字（visual only）", example: "点此关注" },
      {
        key: "href",
        description: "button-led 按钮跳转 URL。为保证公众号正文可点击，建议用以下几类之一：https://mp.weixin.qq.com/s/*（同域文章）/ weixin://dl/*（小程序协议）/ tel:* / mailto:* / 页内锚点 #*。非白名单 URL 会触发 diagnose warning。",
        example: "https://mp.weixin.qq.com/s/xxx"
      },
      { key: "like", description: "triptych-actions 左格文字（默认 ♡ 赞同）", example: "♡ 赞同" },
      { key: "star", description: "triptych-actions 中格文字（实色，默认 ★ 收藏）", example: "★ 收藏" },
      { key: "share", description: "triptych-actions 右格文字（默认 ↗ 转发）", example: "↗ 转发" }
    ],
    description: "文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。",
    example: "::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx\n如果这篇对你有启发，欢迎关注。\n:::\n"
  },
  {
    name: "recommend",
    styleKey: "recommend",
    category: "navigation",
    variantKind: "recommend",
    fenceLength: 3,
    attrs: [
      {
        key: "variant",
        description: '覆盖主题默认的 recommend 骨架。card-list（默认）= 粗体大标题 + bullet 链接列表，面向"延伸阅读"；academic-refs = uppercase letter-spaced 小字 kicker + textMuted 列表，面向论证"参考引用"。',
        enum: VARIANT_IDS.recommend
      }
    ],
    description: '推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。',
    example: "::: recommend\n- [前作](url)\n- [续篇](url)\n:::\n"
  },
  // ── media（3） ───────────────────────────────────────────
  {
    name: "qrcode",
    styleKey: "qrcode",
    category: "navigation",
    variantKind: "qrcode",
    fenceLength: 3,
    attrs: [
      {
        key: "variant",
        description: "覆盖主题默认的 qrcode 骨架。bare（默认）= 居中 QR + 下方 caption（任意 QR 场景）；follow-card = 左 QR + 右 kicker/title/desc 三行（刊物订阅卡）。",
        enum: VARIANT_IDS.qrcode
      },
      {
        key: "text",
        description: "内置 QR 编码器的目标文本（URL / 任意字符串）。提供时容器内联生成 SVG，主色 fg 取主题 text，bg 取主题 bg；不提供则正文图片或说明文字作为占位。",
        example: "https://mp.weixin.qq.com/s/xxx"
      },
      {
        key: "ecc",
        description: "纠错等级（L/M/Q/H）。默认 M（约 15% 容错；扫码可靠性与码大小折中）",
        enum: ["L", "M", "Q", "H"]
      },
      {
        key: "size",
        description: "SVG 像素尺寸（width=height）。未提供则按 viewBox + CSS 缩放。",
        example: "160"
      },
      {
        key: "kicker",
        description: "follow-card 右上角 kicker 文字（缺省走 ctx.kickers.qrFollowKicker）",
        example: "SUBSCRIBE"
      },
      {
        key: "desc",
        description: "follow-card 右下角描述文字（小字 textMuted）",
        example: "每周四，一封邮件，一组数据"
      },
      {
        key: "qr",
        description: "follow-card 模式下，外链 QR 图 URL（与 attrs.text 互斥；都没有走占位 SVG）",
        example: "https://…/qr.png"
      }
    ],
    description: '二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。',
    example: '::: qrcode text="https://mp.weixin.qq.com/s/xxx"\n扫码关注\n:::\n'
  },
  {
    // 作者面 fence 名走语义命名（voice-card），平台粘贴契约（<!--mpvoice--> HTML 注释、
    // data-wx-mp-kind="voice" 锚点）仍走微信原生标识，由 infra/clipboard/mpInsertHints 注入。
    // 兼容期：旧 ::: mpvoice 仍可识别（见 vocabulary 末尾的 LEGACY_CONTAINER_ALIASES）。
    name: "voice-card",
    styleKey: "voiceCard",
    category: "media",
    fenceLength: 3,
    attrs: [
      { key: "src", description: "音频 URL（公众号素材库链接）" },
      { key: "title", description: "标题" },
      { key: "voice_encode_fileid", description: "微信音频 fileid（粘贴后自动展开）" }
    ],
    description: "公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。",
    example: '::: voice-card title="片头曲" src="..."\n:::\n'
  },
  {
    name: "video-card",
    styleKey: "videoCard",
    category: "media",
    fenceLength: 3,
    attrs: [
      { key: "src", description: "视频 URL（公众号素材库链接）" },
      { key: "title", description: "标题" },
      { key: "qqvid", description: "腾讯视频 vid（提供时渲染 v.qq.com iframe）" }
    ],
    description: "公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。",
    example: '::: video-card title="片段" qqvid="..."\n:::\n'
  },
  // ── signature（3） ───────────────────────────────────────
  {
    name: "abstract",
    styleKey: "abstract",
    category: "signature",
    fenceLength: 3,
    description: "文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。",
    example: "::: abstract 摘要\n本文论点 …\n:::\n",
    narrativeStrength: 3
  },
  {
    name: "key-number",
    styleKey: "keyNumber",
    category: "signature",
    fenceLength: 3,
    attrs: [
      { key: "value", description: "大字号数字本体", example: "42%" },
      {
        key: "meta",
        description: '右侧 monospace 元信息浮动列（如 "VOL.IV / 2026—04—22 / CHF 14.—"）。声明则切到"双栏"布局：左 kicker+value 占主视，右 meta 多行底对齐。条目用 ` / ` 分隔。',
        example: "VOL.IV / 2026—04—22 / CHF 14.—"
      }
    ],
    description: "大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。",
    example: '::: key-number value="42%" 同比涨幅\n占全年营收 12pp …\n:::\n',
    narrativeStrength: 5
  },
  {
    name: "kpi-dashboard",
    styleKey: "kpiDashboard",
    category: "data",
    pack: "pack:data-viz",
    fenceLength: 4,
    children: ["kpi-item"],
    attrs: [
      { key: "period", description: "统计区间/口径", example: "2024 / YoY" },
      { key: "source", description: "数据来源（页脚 monospace 小字）", example: "n=1,432" }
    ],
    description: 'KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。',
    example: `:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
`
  },
  {
    name: "kpi-item",
    styleKey: null,
    category: "data",
    pack: "pack:data-viz",
    parent: "kpi-dashboard",
    fenceLength: 3,
    attrs: [
      { key: "label", description: "指标编号/口径（monospace）", example: "01 · MIN/DAY" },
      { key: "caption", description: "指标中文说明", example: "日均连读时长" },
      { key: "value", description: "数字本体（大字号）", example: "12" },
      { key: "unit", description: "单位（如 分钟 / 次 / 本）", example: "分钟" },
      { key: "delta", description: "同比标签（前缀决定颜色，- 红 + 红 ± 灰）", example: "-68%" },
      { key: "trend", description: "sparkline 颜色方向", enum: ["up", "down", "flat"] },
      {
        key: "series",
        description: "sparkline 折线数据（逗号分隔任意数值，按 min/max 自动缩放）",
        example: "48,51,54,56,58,59,60,61"
      },
      { key: "foot", description: "期端对比小字（monospace 双端）", example: "'15 38分 → '24 12分" }
    ],
    description: "kpi-dashboard 内单指标。一切以 attrs 驱动，body 内容被忽略。",
    example: '::: kpi-item label="01·MIN/DAY" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11"\n:::\n'
  },
  {
    name: "bar-chart",
    styleKey: "barChart",
    category: "data",
    pack: "pack:data-viz",
    fenceLength: 4,
    children: ["bar"],
    attrs: [
      { key: "subtitle", description: "副标题（单位/样本说明）", example: "单位：分钟 · n=1,024" },
      {
        key: "labelWidth",
        description: "标签列宽（CSS 长度，默认 72px / 容下 5 字中文）",
        example: "96px"
      },
      {
        key: "valueWidth",
        description: '数值列宽（CSS 长度，默认 48px / 容下 "9 分钟"）',
        example: "64px"
      }
    ],
    description: "横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。",
    example: ':::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"\n::: bar label="60+" pct="84" value="42 分"\n:::\n::::\n'
  },
  {
    name: "bar",
    styleKey: null,
    category: "data",
    pack: "pack:data-viz",
    parent: "bar-chart",
    fenceLength: 3,
    attrs: [
      { key: "label", description: "类目标签", example: "60+" },
      { key: "pct", description: "柱宽百分比（0–100 整数）", example: "84" },
      { key: "value", description: "数值显示（右对齐）", example: "42 分" },
      { key: "tone", description: "色调；warn 转 danger 红", enum: ["normal", "warn"] },
      {
        key: "labelWidth",
        description: "标签列宽（per-bar 覆盖父 bar-chart；做对齐微调）",
        example: "96px"
      },
      {
        key: "valueWidth",
        description: "数值列宽（per-bar 覆盖父 bar-chart；做对齐微调）",
        example: "64px"
      }
    ],
    description: "bar-chart 内单条；attrs.label/pct/value 必填，tone 决定柱色（normal 走主色）。",
    example: '::: bar label="60+" pct="84" value="42 分"\n:::\n'
  },
  {
    name: "footnotes",
    styleKey: "footnotes",
    category: "signature",
    pack: "pack:editorial",
    variantKind: "footnotes",
    fenceLength: 3,
    attrs: [
      {
        key: "variant",
        description: "覆盖主题默认的 footnotes 骨架（lined = 一条一行；inline-flow = 同段流式）",
        enum: VARIANT_IDS.footnotes
      }
    ],
    description: '脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 `·` / `／` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。',
    example: "::: footnotes\n[1] 数据覆盖 2010–2025。\n[2] 深度理解得分取自 24h 回忆测试。\n:::\n"
  },
  {
    name: "colophon",
    styleKey: "colophon",
    category: "signature",
    pack: "pack:editorial",
    fenceLength: 3,
    attrs: [
      { key: "next", description: "左栏：下期预告标题", example: "纸本之必要：论书脊与手指的记忆" },
      { key: "issue", description: "右栏：期号 / 卷期说明", example: "第 004 期 · 2026" }
    ],
    description: '刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。',
    example: '::: colophon next="纸本之必要" issue="第 004 期 · 2026"\n:::\n'
  },
  // ── 拉引 / 横幅 / 表格 / 多图 / 对话 ───────────────────
  {
    // pull-quote 与 quote-card / highlight 的边界：
    //   - quote-card  外部话语成段引用（attrs.byline 标外部来源）
    //   - highlight   作者自我强调整段（bgMuted 无骨架）
    //   - pull-quote  作者中段把已写过的句子放大重申（与原文同源）
    name: "pull-quote",
    styleKey: "pullQuote",
    category: "content",
    pack: "pack:editorial",
    variantKind: "pullQuote",
    fenceLength: 3,
    attrs: [
      {
        key: "variant",
        description: "覆盖主题默认的 pull-quote 骨架。giant-mark（默认）= 装饰巨号引号；centered-rule = 上下细线居中夹；stamp-quote = 右侧印章 + 大字；margin-pull = 左悬挂 monospace kicker + 大字。",
        enum: VARIANT_IDS.pullQuote
      }
    ],
    description: "拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。",
    example: "::: pull-quote\n我们以为在阅读，其实只是在滑动。\n:::\n",
    narrativeStrength: 5
  },
  {
    name: "table-card",
    styleKey: "tableCard",
    category: "content",
    variantKind: "tableCard",
    nestable: true,
    children: ["table-row"],
    fenceLength: 4,
    attrs: [
      {
        key: "variant",
        description: "骨架：rule-grid（默认 1px 全网格）/ zebra-rows（斑马底）/ key-value（双栏 KV）/ price-tier（价格档位卡）",
        enum: VARIANT_IDS.tableCard
      }
    ],
    description: "结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。",
    example: ':::: table-card 规格对比\n::: table-row header=true cells="型号 | 容量 | 价格"\n:::\n::: table-row cells="A · 256G · ￥6999"\n:::\n::::\n'
  },
  {
    name: "table-row",
    styleKey: null,
    category: "content",
    parent: "table-card",
    fenceLength: 3,
    attrs: [
      {
        key: "cells",
        description: '本行单元格内容，竖线 `|` 分隔；列数由首行决定，后续行多余列被忽略 / 缺失列留空。示例：`cells="型号 | 容量 | 价格"`',
        example: "型号 | 容量 | 价格"
      },
      {
        key: "header",
        description: "是否为表头行（粗体 + 顶部 hairline + monospace label）",
        enum: ["true", "false"]
      }
    ],
    description: "table-card 内单行。attrs.cells 必填，body 内容被忽略。",
    example: '::: table-row header=true cells="型号 | 容量 | 价格"\n:::\n'
  },
  {
    name: "gallery",
    styleKey: "gallery",
    category: "content",
    variantKind: "gallery",
    nestable: true,
    children: ["image-item"],
    fenceLength: 4,
    attrs: [
      {
        key: "variant",
        description: "布局：duo（默认 2 联）/ triptych（3 联）/ nine-grid（3×3 自动换行）/ ribbon-strip（横滚条带 overflow-x:auto）",
        enum: VARIANT_IDS.gallery
      }
    ],
    description: "多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。",
    example: ':::: gallery variant=triptych\n::: image-item src="a.jpg" alt="A" 春\n:::\n::: image-item src="b.jpg" alt="B" 夏\n:::\n::: image-item src="c.jpg" alt="C" 秋\n:::\n::::\n'
  },
  {
    name: "image-item",
    styleKey: null,
    category: "content",
    parent: "gallery",
    fenceLength: 3,
    attrs: [
      { key: "src", description: "图片 URL", example: "cover.jpg" },
      { key: "alt", description: "替代文本（默认取 info）" }
    ],
    description: "gallery 内单图。info 为该图的图注（小字），body 内容被忽略。",
    example: '::: image-item src="cover.jpg" alt="封面" 城市夜景\n:::\n'
  },
  {
    name: "dialogue",
    styleKey: "dialogue",
    category: "content",
    pack: "pack:editorial",
    variantKind: "dialogue",
    nestable: true,
    children: ["dialogue-turn"],
    fenceLength: 4,
    attrs: [
      {
        key: "variant",
        description: '骨架：qa-rows（默认 Q/A 行）/ chat-bubbles（左右气泡）/ name-prefix（"名字：内容"行内）/ interview-column（杂志体 N Yorker 风）',
        enum: VARIANT_IDS.dialogue
      }
    ],
    description: "多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。",
    example: ':::: dialogue 主编访谈\n::: dialogue-turn name="主持人" role="Q"\n你怎么看这次行业转向？\n:::\n::: dialogue-turn name="张三" role="A"\n转向是必然的，但节奏会比想象慢。\n:::\n::::\n'
  },
  {
    name: "dialogue-turn",
    styleKey: null,
    category: "content",
    parent: "dialogue",
    fenceLength: 3,
    attrs: [
      {
        key: "name",
        description: "发言者姓名（与 shape 二选一必填——shape 以形状代号替代姓名时可省）",
        example: "张三"
      },
      { key: "role", description: '角色标识（"Q" / "A" / "主持人" / "嘉宾"）', example: "Q" },
      {
        key: "side",
        description: "chat-bubbles 骨架下的气泡侧（left = textMuted 左气泡 / right = primary 右气泡）。其他骨架忽略此 attr。",
        enum: ["left", "right"]
      },
      {
        key: "shape",
        description: '以形状代号替代姓名（用于"形状即身份"骨架，如 shape-speaker variant）。circle = 圆形徽章 / square = 方形徽章。声明 shape 时 name 可省，不消费此 attr 的骨架忽略。',
        enum: ["circle", "square"]
      },
      {
        key: "timestamp",
        description: '时间戳（用于音频 / 视频访谈整理稿，如 "00:04:21"）。仅 audio-stamp 等显式消费此 attr 的骨架渲染，其他骨架忽略。',
        example: "00:04:21"
      }
    ],
    description: "dialogue 内单轮发言。name 与 shape 二选一必填（shape 以形状代号替代姓名），body 为发言内容。",
    example: '::: dialogue-turn name="张三" role="A"\n你说的没错。\n:::\n'
  },
  // ── free（1） ────────────────────────────────────────────
  {
    name: "free",
    styleKey: null,
    category: "free",
    fenceLength: 3,
    description: "兜底容器：渲染器刻意不施加主题样式，写不归类内容。",
    example: "::: free\n编辑部补注 …\n:::\n"
  }
];
const CONTAINER_VOCABULARY = Object.freeze(VOCAB_ENTRIES);
const BY_NAME = new Map(
  CONTAINER_VOCABULARY.map((s) => [s.name, s])
);
function lookupContainerSpec(name) {
  return BY_NAME.get(name);
}
CONTAINER_VOCABULARY.map((s) => s.name);
const STYLED_CONTAINERS = CONTAINER_VOCABULARY.filter(
  (s) => s.styleKey !== null
);
STYLED_CONTAINERS.map((s) => s.styleKey);
Object.fromEntries(
  STYLED_CONTAINERS.map((s) => [s.name, s.styleKey])
);
Object.fromEntries(
  STYLED_CONTAINERS.map((s) => [s.styleKey, s.name])
);
function packOf(spec2) {
  return spec2.pack ?? "base";
}
function containersInPack(pack) {
  return CONTAINER_VOCABULARY.filter((s) => packOf(s) === pack);
}
function namespaceOf(pack) {
  if (pack === "base") return "base";
  if (pack.startsWith("pack:")) return "pack";
  return "theme";
}
function namespaceIdOf(pack) {
  if (pack === "base") return "";
  return pack.slice(pack.indexOf(":") + 1);
}
function isContainerEnabledForTheme(spec2, themeId) {
  const ns = namespaceOf(packOf(spec2));
  if (ns === "base" || ns === "pack") return true;
  return namespaceIdOf(packOf(spec2)) === themeId;
}
const strip = (s) => s.replace(/\s+/g, " ").trim();
function buildAssets({ tokens, variant }) {
  const primary = tokens.colors.primary;
  const accent = tokens.colors.accent;
  const border = tokens.colors.border;
  return {
    h2Prefix: h2Prefix(variant, primary, accent),
    dividerWave: dividerWave(border),
    dividerDots: dividerDots(border),
    dividerFlower: dividerFlower(border, primary),
    quoteMark: quoteMark(variant, primary),
    sectionCorner: sectionCorner(variant, primary),
    tipIcon: dotIcon(tokens.colors.status.tip.accent),
    warningIcon: triangleIcon(tokens.colors.status.warning.accent),
    infoIcon: iIcon(tokens.colors.status.info.accent),
    dangerIcon: minusIcon(tokens.colors.status.danger.accent),
    stepBadge: (n) => stepBadge(n, primary)
  };
}
function h2Prefix(variant, primary, accent) {
  switch (variant) {
    case "soft":
      return strip(`
        <svg viewBox="0 0 18 18" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:8px">
          <circle cx="6" cy="9" r="5" fill="${primary}"/>
          <circle cx="12" cy="9" r="5" fill="${accent}" opacity="0.55"/>
        </svg>
      `);
    case "serif":
      return strip(`
        <svg viewBox="0 0 14 22" width="11" height="18" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:8px">
          <rect x="0" y="1" width="3" height="20" fill="${primary}"/>
          <rect x="5" y="6" width="3" height="15" fill="${primary}" opacity="0.5"/>
        </svg>
      `);
    case "playful":
      return strip(`
        <svg viewBox="0 0 20 14" width="18" height="12" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:8px">
          <path d="M0,7 L7,0 L14,7 L7,14 Z" fill="${primary}"/>
          <rect x="15" y="4" width="5" height="6" fill="${accent}" opacity="0.7"/>
        </svg>
      `);
    case "geometric":
    default:
      return strip(`
        <svg viewBox="0 0 14 22" width="12" height="18" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:8px">
          <rect x="0" y="0" width="4" height="22" fill="${primary}"/>
          <rect x="7" y="4" width="3" height="14" fill="${primary}" opacity="0.6"/>
        </svg>
      `);
  }
}
function dividerWave(border, _primary) {
  return strip(`
    <svg viewBox="0 0 240 14" width="220" height="14" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,7 Q15,0 30,7 T60,7 T90,7 T120,7 T150,7 T180,7 T210,7 T240,7"
            fill="none" stroke="${border}" stroke-width="1.5"/>
    </svg>
  `);
}
function dividerDots(border) {
  return strip(`
    <svg viewBox="0 0 240 8" width="220" height="8" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="4" r="2" fill="${border}"/>
      <circle cx="100" cy="4" r="2" fill="${border}"/>
      <circle cx="140" cy="4" r="2" fill="${border}"/>
      <circle cx="180" cy="4" r="2" fill="${border}"/>
    </svg>
  `);
}
function dividerFlower(border, primary) {
  return strip(`
    <svg viewBox="0 0 240 18" width="220" height="18" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="9" x2="100" y2="9" stroke="${border}" stroke-width="1"/>
      <line x1="140" y1="9" x2="240" y2="9" stroke="${border}" stroke-width="1"/>
      <path d="M120,2 L124,9 L120,16 L116,9 Z" fill="${primary}"/>
      <circle cx="105" cy="9" r="1.5" fill="${border}"/>
      <circle cx="135" cy="9" r="1.5" fill="${border}"/>
    </svg>
  `);
}
function quoteMark(variant, primary) {
  if (variant === "serif") {
    return strip(`
      <svg viewBox="0 0 48 40" width="36" height="30" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:top;margin-right:4px">
        <text x="0" y="32" font-size="44" font-weight="700" fill="${primary}" opacity="0.3">&#8220;</text>
      </svg>
    `);
  }
  if (variant === "playful") {
    return strip(`
      <svg viewBox="0 0 40 32" width="34" height="28" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:top;margin-right:4px">
        <path d="M4,20 C4,10 12,4 24,4 C34,4 38,10 38,16 C38,24 30,28 18,28 L12,32 L13,26 C7,24 4,22 4,20 Z"
              fill="${primary}" opacity="0.25"/>
      </svg>
    `);
  }
  return strip(`
    <svg viewBox="0 0 40 32" width="34" height="28" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:top;margin-right:4px">
      <path d="M4,26 L4,16 C4,10 8,6 14,4 L14,8 C10,9 8,12 8,16 L12,16 L12,26 Z
               M22,26 L22,16 C22,10 26,6 32,4 L32,8 C28,9 26,12 26,16 L30,16 L30,26 Z"
            fill="${primary}" opacity="${variant === "soft" ? "0.4" : "0.3"}"/>
    </svg>
  `);
}
function sectionCorner(variant, primary) {
  if (variant === "soft") {
    return strip(`
      <svg viewBox="0 0 18 18" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:6px">
        <circle cx="9" cy="9" r="7" fill="${primary}"/>
      </svg>
    `);
  }
  if (variant === "playful") {
    return strip(`
      <svg viewBox="0 0 18 18" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:6px">
        <path d="M9,1 L11,7 L17,9 L11,11 L9,17 L7,11 L1,9 L7,7 Z" fill="${primary}"/>
      </svg>
    `);
  }
  return strip(`
    <svg viewBox="0 0 18 18" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M0,0 L18,0 L18,4 L4,4 L4,18 L0,18 Z" fill="${primary}"/>
    </svg>
  `);
}
function dotIcon(color) {
  return strip(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:6px">
      <circle cx="8" cy="8" r="6" fill="none" stroke="${color}" stroke-width="1.5"/>
      <rect x="7" y="4" width="2" height="5" fill="${color}"/>
      <rect x="7" y="10" width="2" height="2" fill="${color}"/>
    </svg>
  `);
}
function triangleIcon(color) {
  return strip(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M8,1 L15,14 L1,14 Z" fill="none" stroke="${color}" stroke-width="1.5"/>
      <rect x="7" y="5" width="2" height="5" fill="${color}"/>
      <rect x="7" y="11" width="2" height="2" fill="${color}"/>
    </svg>
  `);
}
function iIcon(color) {
  return strip(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:6px">
      <circle cx="8" cy="8" r="6" fill="none" stroke="${color}" stroke-width="1.5"/>
      <rect x="7" y="3" width="2" height="2" fill="${color}"/>
      <rect x="7" y="6" width="2" height="7" fill="${color}"/>
    </svg>
  `);
}
function minusIcon(color) {
  return strip(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:6px">
      <circle cx="8" cy="8" r="6" fill="${color}"/>
      <rect x="3" y="7" width="10" height="2" fill="#fefefe"/>
    </svg>
  `);
}
function stepBadge(n, primary) {
  return strip(`
    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:8px">
      <circle cx="12" cy="12" r="11" fill="${primary}"/>
      <text x="12" y="17" text-anchor="middle" font-size="15" font-weight="700" fill="#fefefe">${n}</text>
    </svg>
  `);
}
function fillTypographyDefaults(t) {
  return {
    ...t,
    h4Size: t.h4Size ?? t.baseSize + 1,
    h5Size: t.h5Size ?? t.baseSize,
    h6Size: t.h6Size ?? t.baseSize,
    monoSize: t.monoSize ?? 14,
    captionSize: t.captionSize ?? 12
  };
}
function baseElements(tokens) {
  const { colors } = tokens;
  const typography = fillTypographyDefaults(tokens.typography);
  const preBg = colors.preBg ?? "#2a2d32";
  const preText = colors.preText ?? "#d8d8d4";
  return {
    h1: {
      "font-size": `${typography.h1Size}px`,
      "font-weight": "700",
      color: colors.text,
      "margin-top": "28px",
      "margin-bottom": "16px",
      "line-height": "1.4"
    },
    h2: {
      "font-size": `${typography.h2Size}px`,
      "font-weight": "700",
      color: colors.text,
      "margin-top": "28px",
      "margin-bottom": "14px",
      "line-height": "1.4",
      "padding-bottom": "6px",
      "border-bottom": `2px solid ${colors.primary}`
    },
    h3: {
      "font-size": `${typography.h3Size}px`,
      "font-weight": "700",
      color: colors.text,
      "margin-top": "22px",
      "margin-bottom": "10px",
      "line-height": "1.5"
    },
    // h4 介于 h3 和 p 之间，默认不带装饰、只靠字重拉开。
    // 教程向主题（tech-explainer）会覆盖为主色 + 600 字重的"Step 小标题"。
    h4: {
      "font-size": `${typography.h4Size}px`,
      "font-weight": "600",
      color: colors.text,
      "margin-top": "18px",
      "margin-bottom": "8px",
      "line-height": "1.5"
    },
    // h5 / h6 比 h4 更弱 —— 公众号正文很少深到 5/6 级,
    // 默认走"与正文同字号 + textMuted + 600/500 字重"克制处理,
    // 给作者一个不至于跌进浏览器默认的兜底。
    h5: {
      "font-size": `${typography.h5Size}px`,
      "font-weight": "600",
      color: colors.text,
      "margin-top": "14px",
      "margin-bottom": "6px",
      "line-height": "1.5"
    },
    h6: {
      "font-size": `${typography.h6Size}px`,
      "font-weight": "500",
      color: colors.textMuted,
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.5"
    },
    p: {
      "font-size": `${typography.baseSize}px`,
      "line-height": String(typography.lineHeight),
      color: colors.text,
      "margin-top": "0",
      "margin-bottom": "18px",
      "letter-spacing": `${typography.letterSpacing}px`
    },
    blockquote: {
      "border-left": `4px solid ${colors.primary}`,
      "background-color": colors.bgSoft,
      color: colors.textMuted,
      "padding-top": "12px",
      "padding-right": "16px",
      "padding-bottom": "12px",
      "padding-left": "16px",
      "margin-top": "0",
      "margin-bottom": "18px",
      "border-radius": "4px"
    },
    ul: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "18px" },
    ol: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "18px" },
    li: {
      "margin-bottom": "8px",
      "line-height": String(typography.lineHeight),
      color: colors.text
    },
    code: {
      "background-color": colors.codeBg ?? colors.bgMuted,
      color: colors.code,
      padding: "2px 6px",
      "border-radius": "3px",
      "font-size": `${typography.monoSize}px`
    },
    // 键帽：不对称边框（底边 2px 比其他三边 1px 更深）模拟微小立体感。
    // 微信粘贴剥 box-shadow，只能这样"借边框"实现键帽感。
    kbd: {
      display: "inline-block",
      "background-color": colors.bgSoft,
      color: colors.text,
      border: `1px solid ${colors.border}`,
      "border-bottom-width": "2px",
      "border-radius": "3px",
      padding: "1px 6px",
      "font-size": `${typography.captionSize}px`,
      "line-height": "1.4",
      "vertical-align": "middle"
    },
    pre: {
      "background-color": preBg,
      color: preText,
      "padding-top": "14px",
      "padding-right": "16px",
      "padding-bottom": "14px",
      "padding-left": "16px",
      "border-radius": "6px",
      // 代码块走"横向滚动"而非"强制换行"：
      //   - white-space:pre 保留原始换行，长行不折
      //   - max-width:100% + overflow-x:auto → 超宽时出现横向滑条
      //   WeChat 移动端实测 <pre> 的 overflow-x:auto 会启用原生触摸横滑（同 doocs/md 等）
      //   避免 break-all 把标识符 / 模板字符串在任意字符处剖开
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      // 右侧内阴影：微信移动端 <pre> 横滑没有可见滚动条，用户不知道能滑；
      // inset box-shadow 在暗/亮底色上都能看见，被 border-radius 自然裁圆，
      // 相比 `background-attachment: local` 技巧在微信端稳定得多。
      "box-shadow": "inset -14px 0 10px -10px rgba(0,0,0,0.28)",
      "margin-top": "0",
      "margin-bottom": "20px",
      // pre 比 inline code 略小一档（设计语言：代码块密度大于内联）。
      "font-size": `${typography.monoSize - 1}px`,
      "line-height": "1.6"
    },
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "10px",
      "margin-right": "auto",
      "margin-bottom": "10px",
      "margin-left": "auto",
      "border-radius": "6px"
    },
    a: { color: colors.primary, "text-decoration": "underline" },
    hr: {
      border: "none",
      height: "1px",
      "background-color": colors.border,
      "margin-top": "24px",
      "margin-bottom": "24px"
    },
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "18px",
      "font-size": `${typography.monoSize}px`
    },
    // th / td 兜底：border 单色 + 6px/10px padding + bgSoft 表头。主题按 voice 覆写。
    th: {
      border: `1px solid ${colors.border}`,
      padding: "6px 10px",
      "background-color": colors.bgSoft,
      "text-align": "left"
    },
    td: {
      border: `1px solid ${colors.border}`,
      padding: "6px 10px"
    },
    strong: { "font-weight": "700", color: colors.text },
    em: { "font-style": "italic", color: colors.text }
  };
}
function darkContainerOverrides(tokens) {
  const c = tokens.colors;
  const r = tokens.radius;
  const hairlineCard = {
    "background-color": "transparent",
    border: `1px solid ${c.border}`,
    "border-radius": `${r.sm}px`
  };
  return {
    intro: {
      ...hairlineCard,
      padding: "14px 16px",
      margin: "16px 0",
      color: c.textMuted
    },
    author: { ...hairlineCard, padding: "12px 14px", margin: "16px 0" },
    quoteCard: { ...hairlineCard, padding: "18px 16px", margin: "20px 0" },
    highlight: {
      "background-color": "transparent",
      border: `1px solid ${c.accent}`,
      "border-radius": `${r.sm}px`,
      padding: "12px 14px",
      margin: "16px 0"
    },
    footerCTA: { ...hairlineCard, margin: "24px 0", padding: "16px" },
    recommend: { ...hairlineCard, margin: "20px 0", padding: "14px 16px" },
    authorBio: { ...hairlineCard, padding: "14px 16px", margin: "20px 0" },
    toc: { ...hairlineCard, padding: "12px 14px", margin: "0 0 24px 0" },
    kpiDashboard: {
      "background-color": "transparent",
      "border-top": `1px solid ${c.text}`,
      "border-bottom": `1px solid ${c.text}`,
      padding: "18px 16px 16px",
      margin: "0 0 28px 0"
    },
    barChart: {
      "background-color": "transparent",
      border: `1px solid ${c.border}`,
      padding: "16px 14px",
      margin: "20px 0 24px"
    },
    voiceCard: {
      "background-color": "transparent",
      border: `1px solid ${c.border}`,
      "border-radius": `${r.md}px`,
      padding: "14px 16px",
      margin: "20px 0"
    },
    videoCard: {
      "background-color": "transparent",
      border: `1px solid ${c.border}`,
      "border-radius": `${r.md}px`,
      padding: "14px 16px",
      margin: "20px 0"
    },
    abstract: {
      "background-color": "transparent",
      "border-left": `4px solid ${c.primary}`,
      padding: "14px 16px 14px 18px",
      margin: "18px 0 24px",
      "border-radius": `${r.sm}px`
    },
    keyNumber: {
      "background-color": "transparent",
      padding: "16px 18px",
      margin: "18px 0",
      "border-radius": `${r.md}px`,
      "border-top": `3px solid ${c.primary}`
    }
  };
}
function darkElementOverrides(tokens) {
  const c = tokens.colors;
  return {
    blockquote: {
      "border-left": "none",
      "border-top": `1px solid ${c.border}`,
      "border-bottom": `1px solid ${c.border}`,
      "background-color": "transparent",
      color: c.textMuted,
      "padding-top": "12px",
      "padding-right": "16px",
      "padding-bottom": "12px",
      "padding-left": "16px",
      "margin-top": "0",
      "margin-bottom": "18px",
      "border-radius": "0"
    }
  };
}
function baseContainers(tokens) {
  return {
    intro: {
      "background-color": tokens.colors.bgSoft,
      "border-radius": "6px",
      padding: "14px 16px",
      margin: "16px 0",
      color: tokens.colors.textMuted
    },
    author: {
      "background-color": tokens.colors.bgSoft,
      "border-radius": "6px",
      padding: "12px 14px",
      margin: "16px 0"
    },
    cover: { margin: "16px 0" },
    tip: {},
    warning: {},
    info: {},
    danger: {},
    quoteCard: {
      "background-color": tokens.colors.bgSoft,
      padding: "18px 16px",
      margin: "20px 0",
      "border-radius": "8px"
    },
    highlight: {
      "background-color": tokens.colors.bgMuted,
      padding: "12px 14px",
      margin: "16px 0",
      "border-radius": "6px"
    },
    compare: { margin: "16px 0" },
    steps: { margin: "16px 0" },
    sectionTitle: {
      margin: "24px 0 12px",
      "border-bottom": `2px solid ${tokens.colors.primary}`,
      "padding-bottom": "6px"
    },
    footerCTA: {
      margin: "24px 0",
      padding: "16px",
      "background-color": tokens.colors.bgSoft,
      "border-radius": "8px"
    },
    recommend: {
      margin: "20px 0",
      padding: "14px 16px",
      "background-color": tokens.colors.bgSoft,
      "border-radius": "6px"
    },
    qrcode: { margin: "20px 0", padding: "14px 16px" },
    // note 走独立 variantKind='note'；wrapper CSS 由 variants/note/<id>.ts 提供。
    // 这里只留 margin 兜底，主题 voice 可在 spec.containers.note 追加 border / padding。
    note: { margin: "16px 0" },
    // voiceCard / videoCard 兜底：单色边框 + 浅底 + 圆角，比旧 `margin:20px 0` 强势。
    // 暗底主题（brutalist / late-night-vinyl）需在 spec.containers 覆写 bg/border。
    voiceCard: {
      "background-color": tokens.colors.bgSoft,
      border: `1px solid ${tokens.colors.border}`,
      "border-radius": `${tokens.radius.md}px`,
      padding: "14px 16px",
      margin: "20px 0"
    },
    videoCard: {
      "background-color": tokens.colors.bgSoft,
      border: `1px solid ${tokens.colors.border}`,
      "border-radius": `${tokens.radius.md}px`,
      padding: "14px 16px",
      margin: "20px 0"
    },
    // announcement 兜底：danger 色左条 + soft 底（视觉强度高于 tip/warning）。
    announcement: {
      "background-color": tokens.colors.status.danger.soft,
      "border-left": `4px solid ${tokens.colors.status.danger.accent}`,
      padding: "14px 16px",
      margin: "18px 0",
      "border-radius": `${tokens.radius.sm}px`
    },
    // author-bio 兜底：bgSoft 卡 + 圆角 + 较紧凑 padding。
    authorBio: {
      "background-color": tokens.colors.bgSoft,
      "border-radius": `${tokens.radius.md}px`,
      padding: "14px 16px",
      margin: "20px 0"
    },
    // image-caption 兜底：仅 margin + 居中（renderer 控制 img + caption 内层）。
    imageCaption: {
      margin: "18px 0",
      "text-align": "center"
    },
    // timeline 兜底：仅外框 margin（renderer 控制 grid 双栏）。
    timeline: {
      margin: "20px 0"
    },
    // abstract / keyNumber / seeAlso 的 wrapper CSS 兜底。
    // renderer 只读 ctx.containers.<x>，不做 substring 检测、不硬涂底色——
    // 主题 voice 通过 spec.containers 深合并接管。
    abstract: {
      "background-color": tokens.colors.bgSoft,
      "border-left": `4px solid ${tokens.colors.primary}`,
      padding: "14px 16px 14px 18px",
      margin: "18px 0 24px",
      "border-radius": `${tokens.radius.sm}px`
    },
    keyNumber: {
      "background-color": tokens.colors.bgSoft,
      padding: "16px 18px",
      margin: "18px 0",
      "border-radius": `${tokens.radius.md}px`,
      "border-top": `3px solid ${tokens.colors.primary}`
    },
    // data-brief 家族 wrapper CSS 兜底。非 data-brief 主题得到 token 驱动的中性兜底
    // （bgSoft / border 色），不继承 renderer 的"数据简报几何审美"——遵守
    // packs/data-brief.md 的可移植性承诺。
    //
    // 注意：display:grid / display:flex 不能进 ThemeContainers 槽位（themeCSS guard
    // 会拒绝，公众号粘贴后剥成空值会让子项孤样式塌）。结构性布局由 renderer 在
    // inline style 里合成；本字段只承载 padding / border / bg / margin。
    masthead: {
      "padding-bottom": "10px",
      "border-bottom": `1px solid ${tokens.colors.text}`,
      margin: "0 0 20px 0"
    },
    sectionTag: { margin: "0 0 14px 0" },
    byline: { margin: "0 0 22px 0" },
    editorialHeader: { margin: "0 0 18px 0" },
    toc: {
      "background-color": tokens.colors.bgSoft,
      padding: "12px 14px",
      margin: "0 0 24px 0"
    },
    kpiDashboard: {
      "background-color": tokens.colors.bgSoft,
      "border-top": `1px solid ${tokens.colors.text}`,
      "border-bottom": `1px solid ${tokens.colors.text}`,
      padding: "18px 16px 16px",
      margin: "0 0 28px 0"
    },
    barChart: {
      "background-color": tokens.colors.bgSoft,
      border: `1px solid ${tokens.colors.border}`,
      padding: "16px 14px",
      margin: "20px 0 24px"
    },
    qaBlock: {
      "border-top": `1px solid ${tokens.colors.border}`,
      "border-bottom": `1px solid ${tokens.colors.border}`,
      padding: "14px 0",
      margin: "22px 0"
    },
    // footnotes：两骨架共用的中性基线（色 / 字号 / 边框）。layout 维度
    // （padding-left / text-indent / max-height / overflow-y）由 variants/footnotes/
    // {lined, inline-flow}.ts 的 inline style 注入——避免外层 themeCSS 把 lined 的
    // padding-left 灌进 inline-flow 骨架。主题 voice 通过 spec.containers.footnotes
    // 深合并继续接管色 / 字号 / 边框宽度。
    footnotes: {
      "border-top": `1px solid ${tokens.colors.border}`,
      margin: "14px 0",
      "font-size": "9px",
      "letter-spacing": "0.01em",
      color: tokens.colors.textMuted
    },
    // colophon：wrapper CSS 兜底由 token 驱动；renderer 只在 ctx.containers.colophon
    // 之上做 inline 合并。非 data-brief 主题不主动声明时也能得到一个克制的中性骨架。
    colophon: {
      "border-top": `1px solid ${tokens.colors.text}`,
      "padding-top": "12px",
      margin: "20px 0 0"
    },
    // pull-quote / table-card / gallery / dialogue：variantKind 容器的 wrapper 兜底。
    // 4 个 variant 内部各自注入差异化 wrapperCSS，这里只承载"主题无关的 margin 框"。
    pullQuote: { margin: "24px 0" },
    tableCard: { margin: "20px 0" },
    gallery: { margin: "20px 0" },
    dialogue: { margin: "20px 0" }
  };
}
function baseInline(tokens) {
  return {
    highlight: {
      "background-color": tokens.colors.accent,
      color: tokens.colors.textInverse,
      padding: "0 3px",
      "border-radius": "2px"
    },
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": tokens.colors.accent,
      "text-underline-offset": "3px"
    },
    emphasis: {
      color: tokens.colors.primary,
      "font-weight": "600"
    },
    // 删除线 / 插入：让 textMuted 承担"已弃用"语义,主色承担"新增"语义。
    // 主题作者通过 spec.inline.del / ins 覆写。
    del: {
      color: tokens.colors.textMuted,
      "text-decoration": "line-through"
    },
    ins: {
      color: tokens.colors.primary,
      "text-decoration": "underline"
    }
  };
}
function baseInnerStyles(tokens) {
  const c = tokens.colors;
  return {
    abstractKicker: {
      color: c.primary,
      "font-size": "11px",
      "font-weight": "700",
      "letter-spacing": "2px",
      "text-transform": "uppercase",
      "margin-bottom": "6px"
    },
    keyNumberValue: {
      color: c.primary,
      "font-size": "32px",
      "font-weight": "700",
      "line-height": "1.1",
      "letter-spacing": "-0.5px",
      "margin-bottom": "4px"
    },
    keyNumberKicker: {
      color: c.textMuted,
      "font-size": "12px",
      "font-weight": "600",
      "letter-spacing": "1px",
      "text-transform": "uppercase",
      "margin-bottom": "8px"
    }
  };
}
function mergeStyle(base, patch) {
  if (!patch) return base;
  const out = { ...base };
  for (const key of Object.keys(patch)) {
    const patchVal = patch[key];
    if (!patchVal) continue;
    const { __reset, ...rest } = patchVal;
    const cleanPatch = rest;
    if (__reset === true) {
      out[key] = cleanPatch;
      continue;
    }
    const baseVal = out[key] ?? {};
    const merged = {};
    for (const k of Object.keys(cleanPatch)) merged[k] = cleanPatch[k];
    for (const k of Object.keys(baseVal)) {
      if (!(k in merged)) merged[k] = baseVal[k];
    }
    out[key] = merged;
  }
  return out;
}
function asResetPatch(p) {
  const out = {};
  const src = p;
  for (const key of Object.keys(src)) {
    const v = src[key];
    if (!v) continue;
    out[key] = { __reset: true, ...v };
  }
  return out;
}
function buildTheme(opts) {
  const baseElems = baseElements(opts.tokens);
  const baseConts = baseContainers(opts.tokens);
  const elementsBaseline = opts.baseTheme === "dark" ? mergeStyle(baseElems, asResetPatch(darkElementOverrides(opts.tokens))) : baseElems;
  const containersBaseline = opts.baseTheme === "dark" ? mergeStyle(baseConts, asResetPatch(darkContainerOverrides(opts.tokens))) : baseConts;
  const elements = mergeStyle(elementsBaseline, opts.elements);
  const containers = mergeStyle(containersBaseline, opts.containers);
  const inline = mergeStyle(baseInline(opts.tokens), opts.inline);
  const innerStyles = mergeStyle(baseInnerStyles(opts.tokens), opts.innerStyles);
  let assets;
  if (opts.variant !== void 0) {
    const factoryAssets = buildAssets({ tokens: opts.tokens, variant: opts.variant });
    assets = opts.assets ? { ...factoryAssets, ...opts.assets } : factoryAssets;
  } else {
    assets = opts.assets ?? {};
  }
  const variants = { ...DEFAULT_VARIANTS, ...opts.variants ?? {} };
  const kickers = { ...DEFAULT_KICKERS, ...opts.kickers ?? {} };
  return {
    id: opts.id,
    name: opts.name,
    description: opts.description,
    author: opts.author ?? "",
    preview: opts.preview ?? "",
    tokens: opts.tokens,
    elements,
    containers,
    innerStyles,
    assets,
    templates: opts.templates ?? {},
    inline,
    variants,
    kickers,
    // applyPalette 路径走 opts.variant（既触发工厂又写到 Theme.svgVariant）；
    // spec-to-theme 路径走 opts.svgVariant（仅写到 Theme.svgVariant，不触发工厂——assets 已由 motifs 渲染）。
    ...opts.variant ?? opts.svgVariant ? { svgVariant: opts.variant ?? opts.svgVariant } : {},
    ...opts.decorations ? { decorations: opts.decorations } : {},
    ...opts.capabilities ? { capabilities: opts.capabilities } : {},
    // baseTheme 透传到 Theme metadata，供下游 LLM / 推荐 API 区分浅底 / 暗底主题。
    // pipeline 渲染不再读该字段（buildTheme 出口时基线已固化进 elements / containers）。
    ...opts.baseTheme ? { baseTheme: opts.baseTheme } : {}
  };
}
const commonTemplates = {
  cover: `::: cover 本期封面
![封面占位图](https://placehold.co/1200x630?text=Cover)

<!-- 一句话立意：让读者 3 秒内知道这篇在讲什么 -->
:::
`,
  authorBar: `::: author 林墨 role=主笔 / 工程师
写于 2026 · 春

长期观察 AI、内容生产与个人化写作工具。
:::
`,
  footerCTA: `::: footer-cta 觉得有用？ cta=关注我
点个"在看"让更多人读到它。
:::
`,
  recommend: `::: recommend 推荐阅读
- [从零开始的 wechat-typeset](https://example.com/a)
- [主题工程的五个误区](https://example.com/b)
- [LCH 色彩生成手册](https://example.com/c)
:::
`,
  // 注意：外层 compare 用 4 个冒号，内层 pros/cons 用 3 个；否则 markdown-it-container
  // 的同长度 fence 匹配会把内层当兄弟，导致两列退化为上下块。
  compare: `:::: compare

::: pros 方案 A
- 优势一
- 优势二
:::

::: cons 方案 B
- 代价一
- 代价二
:::

::::
`,
  steps: `::: steps 实战流程
### 第一步
一句话描述要做什么。

### 第二步
一句话描述要做什么。

### 第三步
一句话描述要做什么。
:::
`,
  tip: `::: tip 小贴士
一句提醒读者的经验法则。
:::
`
};
function resolveColor$1(value, tokens) {
  if (value === void 0) return void 0;
  if (!tokens) return value;
  if (!value.startsWith("token:")) return value;
  const path = value.slice("token:".length).trim();
  const parts = path.split(".");
  let cur = tokens.colors;
  for (const seg of parts) {
    if (cur === null || typeof cur !== "object" || !(seg in cur)) {
      throw new Error(
        `[render-motif] motif token reference 'token:${path}' 未知; 合法路径为 tokens.colors.* 下的 string 字段（如 'primary' / 'status.tip.accent'）。`
      );
    }
    cur = cur[seg];
  }
  if (typeof cur !== "string") {
    throw new Error(
      `[render-motif] motif token reference 'token:${path}' 非字符串色值（解析到 ${typeof cur}）。`
    );
  }
  return cur;
}
function resolvePrimitive(p, tokens) {
  if (p.type === "group") {
    return { ...p, children: p.children.map((c) => resolvePrimitive(c, tokens)) };
  }
  if (p.type === "line") {
    return { ...p, stroke: resolveColor$1(p.stroke, tokens) };
  }
  const out = { ...p };
  if ("fill" in p && p.fill !== void 0) out.fill = resolveColor$1(p.fill, tokens);
  if ("stroke" in p && p.stroke !== void 0) out.stroke = resolveColor$1(p.stroke, tokens);
  return out;
}
function resolveMotifPrimitives(primitives, tokens) {
  return primitives.map((p) => resolvePrimitive(p, tokens));
}
function escAttr$1(v) {
  if (typeof v === "number") return String(v);
  return String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escText$1(v) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function renderAttrs(pairs) {
  const parts = [];
  for (const [k, v] of pairs) {
    if (v === void 0 || v === null || v === "") continue;
    parts.push(`${k}="${escAttr$1(v)}"`);
  }
  return parts.length ? " " + parts.join(" ") : "";
}
function renderPrimitive(p) {
  switch (p.type) {
    case "rect":
      return `<rect${renderAttrs([
        ["x", p.x],
        ["y", p.y],
        ["width", p.w],
        ["height", p.h],
        ["rx", p.rx],
        ["ry", p.ry],
        ["fill", p.fill ?? "none"],
        ["stroke", p.stroke],
        ["stroke-width", p.strokeWidth],
        ["opacity", p.opacity]
      ])}/>`;
    case "circle":
      return `<circle${renderAttrs([
        ["cx", p.cx],
        ["cy", p.cy],
        ["r", p.r],
        ["fill", p.fill ?? "none"],
        ["stroke", p.stroke],
        ["stroke-width", p.strokeWidth],
        ["opacity", p.opacity]
      ])}/>`;
    case "path":
      return `<path${renderAttrs([
        ["d", p.d],
        ["fill", p.fill ?? "none"],
        ["stroke", p.stroke],
        ["stroke-width", p.strokeWidth],
        ["stroke-linecap", p.strokeLinecap],
        ["stroke-linejoin", p.strokeLinejoin],
        ["stroke-dasharray", p.strokeDasharray],
        ["opacity", p.opacity]
      ])}/>`;
    case "line":
      return `<line${renderAttrs([
        ["x1", p.x1],
        ["y1", p.y1],
        ["x2", p.x2],
        ["y2", p.y2],
        ["stroke", p.stroke],
        ["stroke-width", p.strokeWidth],
        ["stroke-linecap", p.strokeLinecap],
        ["stroke-dasharray", p.strokeDasharray],
        ["opacity", p.opacity]
      ])}/>`;
    case "text": {
      const attrs = renderAttrs([
        ["x", p.x],
        ["y", p.y],
        ["font-size", p.fontSize],
        ["font-family", p.fontFamily],
        ["font-weight", p.fontWeight],
        ["fill", p.fill],
        ["text-anchor", p.textAnchor],
        ["dominant-baseline", p.dominantBaseline],
        ["letter-spacing", p.letterSpacing],
        ["opacity", p.opacity]
      ]);
      return `<text${attrs}>${escText$1(p.content)}</text>`;
    }
    case "ellipse":
      return `<ellipse${renderAttrs([
        ["cx", p.cx],
        ["cy", p.cy],
        ["rx", p.rx],
        ["ry", p.ry],
        ["fill", p.fill ?? "none"],
        ["stroke", p.stroke],
        ["stroke-width", p.strokeWidth],
        ["opacity", p.opacity]
      ])}/>`;
    case "group": {
      const inner = p.children.map(renderPrimitive).join("");
      const attrs = renderAttrs([
        ["transform", p.transform],
        ["opacity", p.opacity]
      ]);
      return `<g${attrs}>${inner}</g>`;
    }
  }
}
function viewBoxAttr(vb) {
  return `${vb[0]} ${vb[1]} ${vb[2]} ${vb[3]}`;
}
function inlineStyleToString(s) {
  if (!s) return void 0;
  const parts = [];
  if (s.display) parts.push(`display:${s.display}`);
  if (s.verticalAlign) parts.push(`vertical-align:${s.verticalAlign}`);
  if (typeof s.marginRight === "number") parts.push(`margin-right:${s.marginRight}px`);
  if (typeof s.marginLeft === "number") parts.push(`margin-left:${s.marginLeft}px`);
  return parts.length ? parts.join(";") : void 0;
}
function primitivesToSvg(viewBox, primitives, wrapper = {}) {
  const parts = primitives.map(renderPrimitive);
  const body = parts.length ? " " + parts.join(" ") + " " : "";
  const attrs = renderAttrs([
    ["viewBox", viewBoxAttr(viewBox)],
    ["width", wrapper.width],
    ["height", wrapper.height],
    ["xmlns", "http://www.w3.org/2000/svg"],
    ["style", inlineStyleToString(wrapper.inlineStyle)]
  ]);
  return `<svg${attrs}>${body}</svg>`;
}
function shapeToSvg(shape, tokens) {
  const primitives = tokens ? resolveMotifPrimitives(shape.primitives, tokens) : shape.primitives;
  return primitivesToSvg(shape.viewBox, primitives, {
    width: shape.width,
    height: shape.height,
    inlineStyle: shape.inlineStyle
  });
}
function renderMotifTemplate(template, values, tokens) {
  const fitted = fitTemplateToText(template, values);
  const substituted = fitted.primitives.map((p) => substituteInPrimitive(p, values));
  const resolved = tokens ? resolveMotifPrimitives(substituted, tokens) : substituted;
  return primitivesToSvg(fitted.viewBox, resolved, {
    width: fitted.width,
    height: fitted.height,
    inlineStyle: fitted.inlineStyle
  });
}
function substitutePlaceholders(s, values) {
  return s.replace(/\{(\w+)\}/g, (_, name) => {
    const v = values[name];
    return v === void 0 ? `{${name}}` : String(v);
  });
}
function substituteInPrimitive(p, values) {
  const replaced = { ...p };
  for (const k of Object.keys(replaced)) {
    const v = replaced[k];
    if (typeof v === "string") replaced[k] = substitutePlaceholders(v, values);
    else if (k === "children" && Array.isArray(v)) {
      replaced[k] = v.map((c) => substituteInPrimitive(c, values));
    }
  }
  return replaced;
}
function toThemeTokens(spec2) {
  return {
    colors: {
      ...spec2.palette,
      status: spec2.status
    },
    typography: spec2.typography,
    spacing: spec2.spacing,
    radius: spec2.radius
  };
}
function motifsToAssets(motifs, tokens) {
  const out = {};
  const shapeKeys = [
    "h2Prefix",
    "h3Prefix",
    "dividerFlower",
    "dividerWave",
    "dividerDots",
    "quoteMark",
    "listBullet",
    "sectionCorner",
    "tipIcon",
    "warningIcon",
    "infoIcon",
    "dangerIcon",
    "noteIcon",
    "copyIcon",
    "externalLinkIcon",
    "terminalPrompt",
    "sealMark"
  ];
  for (const k of shapeKeys) {
    const shape = motifs[k];
    if (!shape || !("primitives" in shape)) continue;
    out[k] = shapeToSvg(shape, tokens);
  }
  if (motifs.stepBadge) {
    const tpl = motifs.stepBadge;
    out.stepBadge = (n) => renderMotifTemplate(tpl, { N: n }, tokens);
  }
  if (motifs.issueStamp) {
    const tpl = motifs.issueStamp;
    out.issueStamp = (issue, date, kind) => renderMotifTemplate(tpl, { issue, date, kind }, tokens);
  }
  return out;
}
function deriveCapabilities(spec2) {
  const sigSet = new Set(spec2.signatureContainers ?? []);
  const fenceNames = /* @__PURE__ */ new Set();
  for (const c of containersInPack("base")) fenceNames.add(c.name);
  const themePack = `theme:${spec2.id}`;
  for (const c of containersInPack(themePack)) fenceNames.add(c.name);
  for (const c of CONTAINER_VOCABULARY) {
    if (!c.styleKey) continue;
    const pack = packOf(c);
    const ns = namespaceOf(pack);
    if (ns !== "pack") continue;
    if (sigSet.has(c.styleKey)) {
      for (const sibling of containersInPack(pack)) fenceNames.add(sibling.name);
    }
  }
  return {
    containers: [...fenceNames].sort(),
    variantOverrides: spec2.variants,
    excluded: []
  };
}
function specToTheme(spec2) {
  const tokens = toThemeTokens(spec2);
  const assets = motifsToAssets(spec2.motifs, tokens);
  const templates = { ...commonTemplates, ...spec2.templates ?? {} };
  const capabilities = spec2.capabilities ?? deriveCapabilities(spec2);
  return buildTheme({
    id: spec2.id,
    name: spec2.name,
    description: spec2.description,
    tokens,
    assets,
    elements: spec2.elements,
    containers: spec2.containers,
    innerStyles: spec2.innerStyles,
    inline: spec2.inline,
    templates,
    variants: spec2.variants,
    kickers: spec2.kickers,
    // opts.variant 不透传：会触发 buildAssets 工厂覆盖 motifs 直接渲染的 assets。
    // opts.svgVariant 仅写到 Theme.svgVariant（metadata），供 applyPalette fallback 路径消费。
    svgVariant: spec2.svgVariant,
    decorations: spec2.decorations,
    capabilities,
    // baseTheme 透传：'dark' 时 buildTheme 切到 hairline 卡片基线，让暗底主题作者免写 __reset。
    baseTheme: spec2.baseTheme
  });
}
const HEX_PATTERN = HEX_RE.source;
const FONT_FAMILY_ENUM = [...ALLOWED_FONT_FAMILIES];
const PALETTE_SCHEMA = {
  type: "object",
  description: "主题色板 ground truth。所有值为 hex 字符串。",
  required: [
    "primary",
    "secondary",
    "accent",
    "bg",
    "bgSoft",
    "bgMuted",
    "text",
    "textMuted",
    "textInverse",
    "border",
    "code"
  ],
  properties: {
    primary: { type: "string", pattern: HEX_PATTERN },
    secondary: { type: "string", pattern: HEX_PATTERN },
    accent: { type: "string", pattern: HEX_PATTERN },
    bg: { type: "string", pattern: HEX_PATTERN },
    bgSoft: { type: "string", pattern: HEX_PATTERN },
    bgMuted: { type: "string", pattern: HEX_PATTERN },
    text: { type: "string", pattern: HEX_PATTERN },
    textMuted: { type: "string", pattern: HEX_PATTERN },
    textInverse: { type: "string", pattern: HEX_PATTERN },
    border: { type: "string", pattern: HEX_PATTERN },
    code: { type: "string", pattern: HEX_PATTERN },
    preBg: { type: "string", pattern: HEX_PATTERN },
    preText: { type: "string", pattern: HEX_PATTERN },
    // 语义槽族（详见 Palette 接口）：声明 = 入 ThemeTokens.colors，
    // 下游 baseElements / variants / theme-token-flow lint 据此识别它们是 token 而非裸 hex。
    textCaption: { type: "string", pattern: HEX_PATTERN },
    highlightBg: { type: "string", pattern: HEX_PATTERN },
    codeBg: { type: "string", pattern: HEX_PATTERN },
    quoteCardBg: { type: "string", pattern: HEX_PATTERN },
    noteBorder: { type: "string", pattern: HEX_PATTERN },
    noteBorderStyle: { type: "string", enum: ["solid", "dashed", "double", "dotted"] },
    noteBorderWidth: { type: "integer", minimum: 1, maximum: 8 },
    // 语义槽：朱印 / 博物暖辅。声明 = 主题参与对应 variant 的彩色装饰；
    // 不声明 = variant 回退到 accent / textMuted（容器集成约束见 Palette 注释）。
    accentClassical: { type: "string", pattern: HEX_PATTERN },
    accentNaturalist: { type: "string", pattern: HEX_PATTERN }
  },
  additionalProperties: false
};
const STATUS_PAIR_SCHEMA = {
  type: "object",
  required: ["accent", "soft"],
  properties: {
    accent: { type: "string", pattern: HEX_PATTERN },
    soft: { type: "string", pattern: HEX_PATTERN }
  },
  additionalProperties: false
};
const MOTIF_PRIMITIVE_SCHEMA = {
  oneOf: [
    {
      type: "object",
      required: ["type", "x", "y", "w", "h"],
      properties: {
        type: { const: "rect" },
        x: { type: "number" },
        y: { type: "number" },
        w: { type: "number" },
        h: { type: "number" },
        fill: { type: "string" },
        stroke: { type: "string" },
        strokeWidth: { type: "number", minimum: MIN_STROKE_WIDTH },
        rx: { type: "number" },
        ry: { type: "number" },
        opacity: { type: "number", minimum: 0, maximum: 1 }
      },
      additionalProperties: false
    },
    {
      type: "object",
      required: ["type", "cx", "cy", "r"],
      properties: {
        type: { const: "circle" },
        cx: { type: "number" },
        cy: { type: "number" },
        r: { type: "number" },
        fill: { type: "string" },
        stroke: { type: "string" },
        strokeWidth: { type: "number", minimum: MIN_STROKE_WIDTH },
        opacity: { type: "number", minimum: 0, maximum: 1 }
      },
      additionalProperties: false
    },
    {
      type: "object",
      required: ["type", "d"],
      properties: {
        type: { const: "path" },
        d: { type: "string" },
        fill: { type: "string" },
        stroke: { type: "string" },
        strokeWidth: { type: "number", minimum: MIN_STROKE_WIDTH },
        strokeLinecap: { enum: ["butt", "round", "square"] },
        strokeLinejoin: { enum: ["miter", "round", "bevel"] },
        strokeDasharray: { type: "string" },
        opacity: { type: "number", minimum: 0, maximum: 1 }
      },
      additionalProperties: false
    },
    {
      type: "object",
      required: ["type", "x", "y", "content", "fontSize"],
      properties: {
        type: { const: "text" },
        x: { type: "number" },
        y: { type: "number" },
        content: { type: "string" },
        fontSize: { type: "number", minimum: MIN_FONT_SIZE },
        fontFamily: { enum: FONT_FAMILY_ENUM },
        fontWeight: {},
        fill: { type: "string" },
        textAnchor: { enum: ["start", "middle", "end"] },
        dominantBaseline: {
          enum: ["auto", "middle", "central", "hanging", "alphabetic"]
        },
        letterSpacing: { type: "number" },
        opacity: { type: "number", minimum: 0, maximum: 1 }
      },
      additionalProperties: false
    },
    {
      type: "object",
      required: ["type", "x1", "y1", "x2", "y2", "stroke", "strokeWidth"],
      properties: {
        type: { const: "line" },
        x1: { type: "number" },
        y1: { type: "number" },
        x2: { type: "number" },
        y2: { type: "number" },
        stroke: { type: "string" },
        strokeWidth: { type: "number", minimum: MIN_STROKE_WIDTH },
        strokeLinecap: { enum: ["butt", "round", "square"] },
        strokeDasharray: { type: "string" },
        opacity: { type: "number", minimum: 0, maximum: 1 }
      },
      additionalProperties: false
    },
    {
      type: "object",
      required: ["type", "cx", "cy", "rx", "ry"],
      properties: {
        type: { const: "ellipse" },
        cx: { type: "number" },
        cy: { type: "number" },
        rx: { type: "number" },
        ry: { type: "number" },
        fill: { type: "string" },
        stroke: { type: "string" },
        strokeWidth: { type: "number", minimum: MIN_STROKE_WIDTH },
        opacity: { type: "number", minimum: 0, maximum: 1 }
      },
      additionalProperties: false
    },
    {
      type: "object",
      required: ["type", "transform", "children"],
      properties: {
        type: { const: "group" },
        transform: { type: "string" },
        // 递归嵌套——schema 里用 $ref 需提前命名；这里图简洁直接指回顶层
        // primitive 数组，依赖 additionalProperties:false 防止误写字段。
        children: { type: "array" },
        opacity: { type: "number", minimum: 0, maximum: 1 }
      },
      additionalProperties: false
    }
  ]
};
const SVG_INLINE_STYLE_SCHEMA = {
  type: "object",
  description: "SVG <svg> 标签的语义 inline style 子集",
  properties: {
    display: { enum: ["inline-block", "block", "inline"] },
    verticalAlign: { enum: ["baseline", "middle", "top", "bottom"] },
    marginRight: { type: "number" },
    marginLeft: { type: "number" }
  },
  additionalProperties: false
};
const VIEWBOX_SCHEMA = {
  type: "array",
  items: { type: "number" },
  minItems: 4,
  maxItems: 4
};
const MOTIF_SHAPE_SCHEMA = {
  type: "object",
  required: ["viewBox", "primitives"],
  properties: {
    viewBox: VIEWBOX_SCHEMA,
    width: { type: "number" },
    height: { type: "number" },
    inlineStyle: SVG_INLINE_STYLE_SCHEMA,
    primitives: { type: "array", items: MOTIF_PRIMITIVE_SCHEMA }
  },
  additionalProperties: false
};
const MOTIF_TEMPLATE_SCHEMA = {
  type: "object",
  required: ["viewBox", "primitives", "placeholders"],
  properties: {
    viewBox: VIEWBOX_SCHEMA,
    width: { type: "number" },
    height: { type: "number" },
    inlineStyle: SVG_INLINE_STYLE_SCHEMA,
    primitives: { type: "array", items: MOTIF_PRIMITIVE_SCHEMA },
    placeholders: { type: "array", items: { type: "string" } }
  },
  additionalProperties: false
};
const SHAPE_KEYS = [
  "h2Prefix",
  "h3Prefix",
  "dividerFlower",
  "dividerWave",
  "dividerDots",
  "quoteMark",
  "listBullet",
  "sectionCorner",
  "tipIcon",
  "warningIcon",
  "infoIcon",
  "dangerIcon",
  "noteIcon",
  "copyIcon",
  "externalLinkIcon",
  "terminalPrompt",
  "sealMark"
];
const MOTIF_SPEC_SCHEMA = {
  type: "object",
  properties: {
    ...Object.fromEntries(SHAPE_KEYS.map((k) => [k, MOTIF_SHAPE_SCHEMA])),
    stepBadge: MOTIF_TEMPLATE_SCHEMA,
    issueStamp: MOTIF_TEMPLATE_SCHEMA
  },
  additionalProperties: false
};
const VARIANTS_SCHEMA = {
  type: "object",
  required: Object.keys(VARIANT_IDS).filter((k) => k !== "highlight"),
  properties: Object.fromEntries(
    Object.entries(VARIANT_IDS).map(([kind, ids]) => [
      kind,
      { enum: [...ids] }
    ])
  ),
  additionalProperties: false
};
const CSS_OBJECT_PATCH_SCHEMA = {
  type: "object",
  description: "CSS 属性集合；可选 __reset: true 触发整段替换",
  properties: {
    __reset: { const: true }
  },
  additionalProperties: {
    type: ["string", "number"]
  }
};
const STYLE_PATCH_MAP = {
  type: "object",
  additionalProperties: CSS_OBJECT_PATCH_SCHEMA
};
const PERSONA_SPEC_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://github.com/lync-cyber/wechat-typeset/schema/persona-spec.json",
  title: "PersonaSpec",
  description: '微信公众号排版主题的"人设"合同。一份 spec 投影为 Theme（运行时）、gallery HTML、LLM 输入 schema。',
  type: "object",
  required: [
    "id",
    "name",
    "description",
    "audience",
    "palette",
    "status",
    "typography",
    "spacing",
    "radius",
    "motifs",
    "variants",
    "meta"
  ],
  properties: {
    id: {
      type: "string",
      pattern: "^[a-z][a-z0-9-]*$",
      description: "kebab-case 标识符，与目录名一致"
    },
    name: { type: "string", description: "中文主题名" },
    description: { type: "string", description: "一句自然语言定位，LLM 识别选型信号" },
    audience: {
      type: "string",
      description: '受众标签，如 "技术布道" / "人文非虚构" / "内参 newsletter"'
    },
    palette: PALETTE_SCHEMA,
    status: {
      type: "object",
      required: ["tip", "info", "warning", "danger"],
      properties: {
        tip: STATUS_PAIR_SCHEMA,
        info: STATUS_PAIR_SCHEMA,
        warning: STATUS_PAIR_SCHEMA,
        danger: STATUS_PAIR_SCHEMA
      },
      additionalProperties: false
    },
    typography: {
      type: "object",
      required: [
        "baseSize",
        "lineHeight",
        "h1Size",
        "h2Size",
        "h3Size",
        "letterSpacing"
      ],
      properties: {
        baseSize: { type: "number", minimum: MIN_FONT_SIZE },
        lineHeight: { type: "number", minimum: LINE_HEIGHT_MIN, maximum: LINE_HEIGHT_MAX },
        h1Size: { type: "number", minimum: MIN_FONT_SIZE },
        h2Size: { type: "number", minimum: MIN_FONT_SIZE },
        h3Size: { type: "number", minimum: MIN_FONT_SIZE },
        letterSpacing: { type: "number", maximum: LETTER_SPACING_MAX },
        // 以下五个可选字段：spec 不声明时由 spec-to-theme 派生默认；声明值要 >= 14（h4/h5/h6 同样
        // 受 WeChat 光栅化下限约束）。monoSize / captionSize 是 CSS 字号（不光栅化），仍保留
        // 12 下限避免可读性灾难。
        h4Size: { type: "number", minimum: MIN_FONT_SIZE },
        h5Size: { type: "number", minimum: MIN_FONT_SIZE },
        h6Size: { type: "number", minimum: MIN_FONT_SIZE },
        monoSize: { type: "number", minimum: 12 },
        captionSize: { type: "number", minimum: 11 }
      },
      additionalProperties: false
    },
    spacing: {
      type: "object",
      required: ["paragraph", "section", "listItem", "containerPadding"],
      properties: {
        paragraph: { type: "number" },
        section: { type: "number" },
        listItem: { type: "number" },
        containerPadding: { type: "number" }
      },
      additionalProperties: false
    },
    radius: {
      type: "object",
      required: ["sm", "md", "lg"],
      properties: {
        sm: { type: "number" },
        md: { type: "number" },
        lg: { type: "number" }
      },
      additionalProperties: false
    },
    motifs: MOTIF_SPEC_SCHEMA,
    variants: VARIANTS_SCHEMA,
    svgVariant: {
      enum: ["geometric", "soft", "serif", "playful"],
      description: '参数化 SVG 资产工厂的形状变体。仅在 applyPalette（用户自定义配色）路径作为 fallback 工厂；spec-first 主路径不消费此字段（assets 由 motifs AST 直接渲染）。缺省回退到 "geometric"。'
    },
    decorations: {
      type: "object",
      description: '声明式渲染层装饰规则。所有主题专属视觉签名（标题前缀编号 / intro 首字下沉……）的唯一承载点；共享层一次性实现"如何按声明执行"。',
      properties: {
        introDropcap: {
          type: "object",
          description: "intro 首段首字下沉。声明则启用,样式参数由本结构提供;前导标点跳过 / 数字判定的扫描逻辑由 markdown.ts 共享层实现。",
          required: ["color"],
          properties: {
            color: { enum: ["primary", "secondary", "accent", "text", "textMuted", "textInverse"] },
            fontSize: { type: "number" },
            fontWeight: { enum: [400, 500, 600, 700] },
            marginRight: { type: "number" },
            paddingTop: { type: "number" }
          },
          additionalProperties: false
        },
        headingPrefix: {
          type: "array",
          description: "标题前缀装饰规则数组。",
          items: {
            type: "object",
            required: ["level", "style"],
            properties: {
              level: { enum: [2, 3] },
              pattern: {
                type: "string",
                description: "文本前缀正则（与 autoNumber 二选一）；捕获组 1 是装饰文字，整个匹配从原文本剥掉。"
              },
              autoNumber: {
                enum: [
                  "roman",
                  "arabic",
                  "arabic-padded",
                  "arabic-section",
                  "arabic-section-padded",
                  "circled"
                ],
                description: "按出现顺序自动生成编号（与 pattern 二选一）；per-render 重置。 roman/arabic/arabic-padded 是 level-local 单计数器； arabic-section / arabic-section-padded 是复合编号 `${h2}.${h3InH2}`， 主要用于 level 3 子节。 circled → ❶/❷/❸…⓴（>20 退化 (N)），mook / 杂志感章节签名常用。"
              },
              style: {
                type: "object",
                required: ["color"],
                properties: {
                  color: { enum: ["primary", "secondary", "accent", "text", "textMuted", "textInverse"] },
                  backgroundColor: {
                    enum: ["primary", "secondary", "accent", "text", "textMuted", "textInverse"],
                    description: "装饰前缀底色（token 引用）。声明则把编号渲染成色块徽章——典型例 swiss-grid 主题的 H2「01」红方块前缀。 缺省 = 不设底色。需与 paddingX/paddingY 搭配以撑开方块。"
                  },
                  paddingX: {
                    type: "number",
                    description: "装饰前缀左右内边距 px（仅 backgroundColor 声明时生效），缺省 0。"
                  },
                  paddingY: {
                    type: "number",
                    description: "装饰前缀上下内边距 px（仅 backgroundColor 声明时生效），缺省 0。"
                  },
                  fontFamily: { enum: ["monospace"] },
                  fontWeight: { enum: [400, 500, 600, 700] },
                  fontSize: { type: "number" },
                  letterSpacing: { type: "number" },
                  marginRight: { type: "number" },
                  underline: { type: "boolean" },
                  underlinePad: { type: "number" },
                  display: {
                    enum: ["inline", "block"],
                    description: "装饰 span 显示模式。 inline（默认）→ display:inline-block,编号与标题同行； block → display:block,编号自成 kicker 行,标题文字换行落于下行。"
                  },
                  marginBottom: {
                    type: "number",
                    description: "display='block' 时编号与下方标题文字的间距 px,缺省 6。"
                  },
                  suffix: {
                    type: "string",
                    description: '编号后追加的字面量。占位符: {n} → autoNumber 输出值(如 "❶" / "1")； {cn} → 中文数字 一/二/三…二十(>20 退化阿拉伯数字)。 典型: "  第{cn}章" 与 autoNumber:"circled" 组合产出 "❶  第一章"。'
                  }
                },
                additionalProperties: false
              }
            },
            additionalProperties: false
          }
        }
      },
      additionalProperties: false
    },
    signatureContainers: {
      type: "array",
      items: { type: "string" },
      description: "该主题声称支持的签名容器 id 清单"
    },
    capabilities: {
      type: "object",
      description: "主题能力自描述（白名单/排除/推荐 variant）。仅供 API 查询使用，不影响渲染。",
      properties: {
        containers: {
          type: "array",
          items: { type: "string" },
          description: "本主题启用的容器 fence 名白名单；未声明 = 全集兜底（base + pack:* + 自家 theme:）"
        },
        variantOverrides: {
          type: "object",
          description: "在 spec.variants 默认骨架之外的额外建议 variant（按 slot 部分指定）",
          additionalProperties: { type: "string" }
        },
        excluded: {
          type: "array",
          items: { type: "string" },
          description: "显式排除的容器 fence 名清单"
        }
      },
      additionalProperties: false
    },
    templates: {
      type: "object",
      additionalProperties: { type: "string" }
    },
    elements: STYLE_PATCH_MAP,
    containers: STYLE_PATCH_MAP,
    innerStyles: STYLE_PATCH_MAP,
    inline: STYLE_PATCH_MAP,
    meta: {
      type: "object",
      required: ["createdAt"],
      properties: {
        createdAt: { type: "string", description: "ISO 日期字符串" },
        ownerNotes: { type: "string" }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};
const spec$h = {
  id: "default",
  name: "默认主题",
  description: "有意识的中立——Medium/Notion/Substack 默认家族",
  audience: "通用（全题材公平阅读）",
  // ============================================================
  // 色板（规范 §1.1 色彩表）
  // ============================================================
  palette: {
    primary: "#2558b0",
    secondary: "#8a8f98",
    accent: "#2558b0",
    // = primary：default 视觉语言里删掉 accent 作为独立变量
    bg: "#fdfdfc",
    bgSoft: "#f5f5f3",
    bgMuted: "#eceae4",
    text: "#1c1f24",
    textMuted: "#636870",
    textInverse: "#fefefe",
    // 纯白用 #fefefe 规避 SVG→PNG 透明化
    border: "#d8d8d4",
    code: "#1c1f24",
    // default 拒绝让 code 承担颜色
    preBg: "#2a2d32",
    // 代码块底色（拒绝 Atom One Dark 默认 #282c34）
    preText: "#d8d8d4",
    highlightBg: "#fff4c8",
    // Notion `<mark>` 浅米黄（inline + container 共用，default 主题最克制的"突出"信号）
    noteBorder: "#c8ccd4"
    // note 容器 dashed 边线（比通用 border #d8d8d4 略冷略深一档）
  },
  // 语义四色（规范 §1.1 语义色表）——"最寡淡的那个版本"；accent 守 WCAG AA 4.5:1
  status: {
    tip: { accent: "#147a44", soft: "#eef6ef" },
    // 4.89:1
    info: { accent: "#2558b0", soft: "#eef2f9" },
    // = primary
    warning: { accent: "#825a14", soft: "#f7f0df" },
    // 5.40:1
    danger: { accent: "#b42318", soft: "#fbecea" }
  },
  // ============================================================
  // 字号 / 间距 / 圆角
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.75,
    h1Size: 22,
    // 比 business 26 / literary 26 / life 28 都小
    h2Size: 19,
    // 与 literary 19 同档
    h3Size: 16,
    // 与正文 15 几乎同号
    letterSpacing: 0.3
    // 全部 ≤ 0.3
  },
  spacing: {
    paragraph: 18,
    section: 28,
    listItem: 8,
    containerPadding: 16
  },
  radius: { sm: 4, md: 6, lg: 8 },
  // 禁用 16px+ 圆角
  // ============================================================
  // Motifs（规范 §1.4：default 仅保留 4 装饰 + 4 图标 + stepBadge + sectionCorner）
  //
  // 颜色规范：本主题作为"token 引用"范例，motif fill/stroke 一律走 'token:*' 引用，
  // 让"换 palette 时 motif 自动跟随"成为可能。其它主题渐进迁移（裸 hex 仍受 render-motif 兼容）。
  // ============================================================
  motifs: {
    // h2Prefix：3×16 单竖条（Medium h2 左侧单根色线）
    h2Prefix: {
      viewBox: [0, 0, 3, 20],
      width: 3,
      height: 16,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      primitives: [{ type: "rect", x: 0, y: 0, w: 3, h: 20, fill: "token:primary" }]
    },
    // dividerWave：stroke-width 1.2 的单根正弦
    dividerWave: {
      viewBox: [0, 0, 240, 12],
      width: 220,
      height: 12,
      primitives: [
        {
          type: "path",
          d: "M0,6 Q15,0 30,6 T60,6 T90,6 T120,6 T150,6 T180,6 T210,6 T240,6",
          stroke: "token:border",
          strokeWidth: 1.2
        }
      ]
    },
    // dividerDots：3 颗圆点居中（96/120/144）——比 4 点更疏朗、更中性
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: "circle", cx: 96, cy: 4, r: 2, fill: "token:border" },
        { type: "circle", cx: 120, cy: 4, r: 2, fill: "token:border" },
        { type: "circle", cx: 144, cy: 4, r: 2, fill: "token:border" }
      ]
    },
    // dividerFlower：两线 + 中央单圆点（Medium/Substack 通用 ornamental break）
    dividerFlower: {
      viewBox: [0, 0, 240, 10],
      width: 220,
      height: 10,
      primitives: [
        { type: "line", x1: 0, y1: 5, x2: 110, y2: 5, stroke: "token:border", strokeWidth: 1 },
        { type: "line", x1: 130, y1: 5, x2: 240, y2: 5, stroke: "token:border", strokeWidth: 1 },
        { type: "circle", cx: 120, cy: 5, r: 3, fill: "token:primary" }
      ]
    },
    // sectionCorner：2px 细描边 L（Notion/Substack 可选列表标记）
    sectionCorner: {
      viewBox: [0, 0, 14, 14],
      width: 12,
      height: 12,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M1,1 L13,1 M1,1 L1,13",
          stroke: "token:primary",
          strokeWidth: 2,
          strokeLinecap: "square"
        }
      ]
    },
    // tipIcon：圆圈 + i（四态同骨架，只靠色相区分）
    tipIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "circle", cx: 8, cy: 8, r: 6, stroke: "token:status.tip.accent", strokeWidth: 1.5 },
        { type: "circle", cx: 8, cy: 5, r: 0.9, fill: "token:status.tip.accent" },
        { type: "rect", x: 7.25, y: 7, w: 1.5, h: 5, rx: 0.4, fill: "token:status.tip.accent" }
      ]
    },
    // infoIcon：圆圈 + i（info = primary 色）
    infoIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "circle", cx: 8, cy: 8, r: 6, stroke: "token:primary", strokeWidth: 1.5 },
        { type: "circle", cx: 8, cy: 5, r: 0.9, fill: "token:primary" },
        { type: "rect", x: 7.25, y: 7, w: 1.5, h: 5, rx: 0.4, fill: "token:primary" }
      ]
    },
    // warningIcon：三角形 + !
    warningIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M8,2 L14.5,13.5 L1.5,13.5 Z",
          stroke: "token:status.warning.accent",
          strokeWidth: 1.5,
          strokeLinejoin: "round"
        },
        { type: "rect", x: 7.25, y: 6, w: 1.5, h: 4, rx: 0.4, fill: "token:status.warning.accent" },
        { type: "circle", cx: 8, cy: 11.5, r: 0.9, fill: "token:status.warning.accent" }
      ]
    },
    // dangerIcon：实心圆 + 反色横线（textInverse 在 default = #fefefe，暗底主题会自动跟随）
    dangerIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "circle", cx: 8, cy: 8, r: 6, fill: "token:status.danger.accent" },
        { type: "rect", x: 3, y: 7, w: 10, h: 2, fill: "token:textInverse" }
      ]
    },
    // stepBadge：实心圆 + 反色数字（{N} 占位）
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      placeholders: ["N"],
      primitives: [
        { type: "circle", cx: 12, cy: 12, r: 11, fill: "token:primary" },
        {
          type: "text",
          x: 12,
          y: 17,
          content: "{N}",
          fontSize: 14,
          fontWeight: 700,
          fill: "token:textInverse",
          textAnchor: "middle"
        }
      ]
    }
  },
  // ============================================================
  // 骨架变体（规范 §2 每节的 primary variant）
  // ============================================================
  variants: {
    admonition: "accent-bar",
    // 四态统一左 3px 色条 + 浅底
    quote: "classic",
    // bgSoft + 居中（不导出 quoteMark SVG，走字符回退）
    compare: "column-card",
    // 等宽两栏 table-cell
    steps: "number-circle",
    // 数字圆圈纵向堆叠
    divider: "rule",
    // 单根 border 色细线
    sectionTitle: "bordered",
    // 底部 2px primary 下划线
    codeBlock: "bare",
    // 拒绝 header-bar（那是 tech-explainer 签名）
    note: "minimal-callout",
    // 顶端 1px 短分隔线 + textMuted 标题（保留迁移前视觉）
    footnotes: "lined",
    recommend: "card-list",
    qrcode: "bare",
    footerCTA: "button-led",
    pullQuote: "giant-mark",
    announcement: "danger-bar",
    tableCard: "rule-grid",
    gallery: "duo",
    dialogue: "qa-rows",
    qaBlock: "numbered-faq"
  },
  // ============================================================
  // 元素级样式（规范 §1.2 typographic voice）
  // ============================================================
  elements: {
    h1: {
      "font-size": "22px",
      "font-weight": "700",
      color: "#1c1f24",
      "margin-top": "28px",
      "margin-bottom": "14px",
      "line-height": "1.45",
      "letter-spacing": "0.3px"
    },
    h2: {
      "font-size": "19px",
      "font-weight": "700",
      color: "#1c1f24",
      "margin-top": "28px",
      "margin-bottom": "12px",
      "line-height": "1.5",
      "padding-bottom": "6px",
      "border-bottom": "2px solid #2558b0",
      "letter-spacing": "0.3px"
    },
    h3: {
      "font-size": "16px",
      "font-weight": "700",
      color: "#1c1f24",
      "margin-top": "22px",
      "margin-bottom": "10px",
      "line-height": "1.55",
      "letter-spacing": "0.2px"
    },
    h4: {
      "font-size": "14px",
      "font-weight": "600",
      color: "#1c1f24",
      "margin-top": "16px",
      "margin-bottom": "6px",
      "line-height": "1.5",
      "letter-spacing": "0.2px"
    },
    h5: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#1c1f24",
      "margin-top": "14px",
      "margin-bottom": "6px",
      "line-height": "1.5",
      "letter-spacing": "0.2px"
    },
    h6: {
      "font-size": "15px",
      "font-weight": "500",
      color: "#636870",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.5"
    },
    p: {
      "font-size": "15px",
      "line-height": "1.75",
      color: "#1c1f24",
      "margin-top": "0",
      "margin-bottom": "18px",
      "letter-spacing": "0.3px"
    },
    blockquote: {
      "border-left": "3px solid #2558b0",
      "background-color": "#f5f5f3",
      color: "#636870",
      "padding-top": "12px",
      "padding-right": "16px",
      "padding-bottom": "12px",
      "padding-left": "16px",
      "margin-top": "0",
      "margin-bottom": "18px",
      "border-radius": "4px"
    },
    ul: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "18px" },
    ol: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "18px" },
    li: {
      "margin-bottom": "8px",
      "line-height": "1.75",
      color: "#1c1f24"
    },
    kbd: {
      // Medium/MDN 通用键帽：bgSoft 浅底 + 1/2px 不对称边框，微信无 box-shadow 时靠边框厚度表达立体
      display: "inline-block",
      "background-color": "#f5f5f3",
      color: "#1c1f24",
      border: "1px solid #d8d8d4",
      "border-bottom-width": "2px",
      "border-radius": "3px",
      padding: "1px 6px",
      "font-size": "12px",
      "line-height": "1.4",
      "vertical-align": "middle"
    },
    // Medium/Notion 中性表格：bgSoft th + 适中 padding + border 灰边
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "18px",
      "font-size": "14px"
    },
    th: {
      border: "1px solid #d8d8d4",
      padding: "8px 12px",
      "background-color": "#f5f5f3",
      "text-align": "left",
      "font-weight": "600",
      color: "#1c1f24"
    },
    td: {
      border: "1px solid #d8d8d4",
      padding: "8px 12px",
      color: "#1c1f24"
    },
    a: {
      color: "#2558b0",
      "text-decoration": "underline"
    },
    hr: {
      border: "none",
      height: "1px",
      "background-color": "#d8d8d4",
      "margin-top": "24px",
      "margin-bottom": "24px"
    },
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "10px",
      "margin-right": "auto",
      "margin-bottom": "10px",
      "margin-left": "auto",
      "border-radius": "6px"
    },
    strong: { "font-weight": "700", color: "#1c1f24" },
    em: { "font-style": "italic", color: "#1c1f24" },
    // 代码块（规范 §3.4：拒绝 Atom One Dark / VSCode Dark+ 原值）
    // bg/color 通过 palette.preBg / palette.preText 流到 baseElements.pre，再深合并下方 padding/radius 等。
    pre: {
      "padding-top": "14px",
      "padding-right": "16px",
      "padding-bottom": "14px",
      "padding-left": "16px",
      "border-radius": "6px",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "box-shadow": "inset -14px 0 10px -10px rgba(0,0,0,0.28)",
      "margin-top": "0",
      "margin-bottom": "20px",
      "font-size": "13px",
      "line-height": "1.6"
    },
    code: {
      "background-color": "#eceae4",
      color: "#1c1f24",
      padding: "2px 6px",
      "border-radius": "3px",
      "font-size": "14px"
    }
  },
  // ============================================================
  // 内联强调（规范 §1.3）
  // ============================================================
  inline: {
    highlight: {
      "background-color": "#fff4c8",
      // Notion <mark> 浅米黄
      color: "#1c1f24",
      padding: "0 3px",
      "border-radius": "2px"
    },
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#2558b0",
      "text-underline-offset": "3px"
    },
    emphasis: {
      color: "#2558b0",
      "font-weight": "600"
    },
    del: {
      color: "#636870",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#2558b0",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container）
  // ============================================================
  containers: {
    intro: {
      "background-color": "#f5f5f3",
      "border-radius": "6px",
      padding: "14px 16px",
      margin: "18px 0",
      color: "#636870",
      "line-height": "1.7"
    },
    author: {
      "background-color": "#f5f5f3",
      "border-radius": "6px",
      padding: "12px 14px",
      margin: "16px 0",
      "font-size": "13px",
      color: "#636870"
    },
    cover: {
      margin: "20px 0"
    },
    tip: {},
    warning: {},
    info: {},
    danger: {},
    quoteCard: {
      "background-color": "#f5f5f3",
      padding: "18px 20px",
      margin: "22px 0",
      "border-radius": "6px"
    },
    highlight: {
      "background-color": "#fff4c8",
      padding: "12px 14px",
      margin: "16px 0",
      "border-radius": "4px"
    },
    compare: { margin: "20px 0" },
    steps: { margin: "20px 0" },
    sectionTitle: {
      margin: "24px 0 12px",
      "padding-bottom": "6px",
      "border-bottom": "2px solid #2558b0"
    },
    footerCTA: {
      margin: "28px 0",
      padding: "16px",
      "background-color": "#f5f5f3",
      "border-radius": "8px",
      border: "1px solid #d8d8d4"
    },
    recommend: {
      margin: "22px 0",
      padding: "14px 16px",
      "background-color": "#f5f5f3",
      "border-radius": "6px",
      "border-left": "3px solid #8a8f98"
    },
    qrcode: {
      margin: "22px 0",
      padding: "16px",
      border: "1px solid #d8d8d4",
      "border-radius": "6px"
    },
    // 第五态 note：刻意不走"左条 + 浅底"——顶端 1px 虚线 + 无底色的手写批注感，
    // 低调补充而非视觉抢位。主题想要"框感/左条"可在自家 spec.containers.note 覆写。
    note: {
      "background-color": "transparent",
      "border-top": "1px dashed #c8ccd4",
      padding: "10px 2px 8px",
      margin: "16px 0",
      color: "#636870"
    },
    // Medium/Notion 中性图注：居中 textMuted 小字，默认兜底气质
    imageCaption: {
      margin: "8px 0 18px",
      "text-align": "center",
      "font-size": "12px",
      color: "#636870",
      "line-height": "1.6"
    },
    // 中性警示横幅：status.danger 风，全框 + 左 4px 色条，比 tip 更强势但不越界
    announcement: {
      "background-color": "#fbecea",
      "border-left": "4px solid #b42318",
      border: "1px solid #b42318",
      padding: "12px 16px",
      margin: "18px 0",
      "border-radius": "4px",
      color: "#1c1f24"
    }
  },
  // default 声明 imageCaption / announcement 以计入 voice 覆盖率
  signatureContainers: ["imageCaption", "announcement"],
  meta: {
    createdAt: "2026-04-20",
    ownerNotes: "规范 §0-§3.4 三条不可妥协决策在本文档落实（primary 编辑蓝、accent=primary、删除 quoteMark）。"
  }
};
const spec$g = {
  id: "tech-geek",
  name: "极客夜行",
  description: "VT220 琥珀 + 墨炭暖底 + manpage 印刷传统，成年工程师的工程写作",
  audience: "技术布道 / 工程随笔 / 架构评论（manpage / RFC / TAOCP 脚注风）",
  // ============================================================
  // 色板（规范 §1.1 · VT220 琥珀方向）
  // ============================================================
  palette: {
    primary: "#c89759",
    // VT220 琥珀（提亮以适配新底色对比）
    secondary: "#8a7a54",
    // 旧铜灰 —— divider / border / 脚注号
    accent: "#e06a28",
    // HN 橙 —— 点睛色，只出现在脚注号
    // 底色三档同步抬升：原 #14110d 在公众号纯白背景中上下衔接突兀；
    // 改为"夜读纸"#262019（明度从 5% → ~12%），仍是暖深底，但与白底正文反差降一级
    bg: "#262019",
    bgSoft: "#2f2920",
    bgMuted: "#3a3328",
    // inline code 底
    text: "#ebdfca",
    // 羊皮黄（VT220 amber phosphor 底色，新底色下保持 AA 对比）
    textMuted: "#9a8f7e",
    // 雾色批注
    textInverse: "#262019",
    // = bg
    border: "#4a4034",
    // 暖深棕灰
    code: "#c89759",
    // = primary（签名：inline code 与正文同家族）
    // note side-bar 差异化：1px 琥珀 dashed（manpage / VT220 注释行的 ` --` 笔触）
    noteBorder: "#c89759",
    noteBorderStyle: "dashed",
    noteBorderWidth: 1
  },
  // 语义四色（规范 §1.1）——终端语境里**不走交通灯**：
  //   - warning 不用黄（黄色在终端是 stdout 正常输出）→ 改 HN 橙 #e06a28（accent）
  //     真正的警告是橙红闪烁，不是"黄色请注意"
  //   - tip 灰绿（NOTE 附注感，非 success 绿勾）；info 冷蓝（REF 引用感）
  //   - danger 陶土红（PITFALL 陷阱，非 error 红警）
  status: {
    tip: { accent: "#a8c08a", soft: "#1e1f16" },
    // NOTE 灰绿
    warning: { accent: "#e06a28", soft: "#1e1710" },
    // CAVEAT HN 橙（打破 warning=黄公式）
    info: { accent: "#7a9cb8", soft: "#161b1f" },
    // SEE ALSO 冷蓝
    danger: { accent: "#d97a62", soft: "#1f1612" }
    // PITFALL 陶土红（5.85:1 守 AA）
  },
  // ============================================================
  // 字号 / 间距 / 圆角
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.85,
    // 工程写作的甜点
    h1Size: 25,
    // 稀比粗贵
    h2Size: 19,
    h3Size: 16,
    // 与正文同号，靠字距区分
    letterSpacing: 0.6
    // 等宽美学的灵魂
  },
  spacing: { paragraph: 18, section: 28, listItem: 8, containerPadding: 16 },
  radius: { sm: 2, md: 4, lg: 6 },
  // ============================================================
  // Motifs（规范 §1.3：manpage / RFC / Plan 9 / TAOCP 印刷传统）
  //
  // 平台约束：font-size >= 14（spec validator 硬检测，MIN_FONT_SIZE）。
  // 原 assets.ts 里几处 `<text font-size="12|13">` 被统一拉升到 14，
  // 视觉差异微到难以察觉（光栅后 >= 14 是平台稳妥阈）。
  // ============================================================
  motifs: {
    // ① h2Prefix · "装订孔"竖条（manpage / IBM 穿孔卡气质）
    //   4×16 琥珀竖条中央留 4px 缺口 —— 从纯实线到带缺口，强化"工业打孔"剪影
    h2Prefix: {
      viewBox: [0, 0, 4, 18],
      width: 4,
      height: 16,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 10 },
      primitives: [
        { type: "rect", x: 0, y: 2, w: 4, h: 5, fill: "token:primary" },
        { type: "rect", x: 0, y: 11, w: 4, h: 5, fill: "token:primary" }
      ]
    },
    // ② dividerWave · 长矩形带中央缝（活页纸 / 装订孔体系的水平版）
    //   两根 92×2 实矩形对中央留 16px 缝隙 —— 同"凹槽"语汇的水平表达
    dividerWave: {
      viewBox: [0, 0, 240, 6],
      width: 220,
      height: 6,
      primitives: [
        { type: "rect", x: 20, y: 2, w: 92, h: 2, fill: "token:primary" },
        { type: "rect", x: 128, y: 2, w: 92, h: 2, fill: "token:primary" }
      ]
    },
    // ③ dividerDots · 5 点省略号（降调：9→5，中间 1 点 primary）
    dividerDots: {
      viewBox: [0, 0, 240, 10],
      width: 220,
      height: 10,
      primitives: [
        { type: "circle", cx: 80, cy: 5, r: 1.5, fill: "token:border" },
        { type: "circle", cx: 100, cy: 5, r: 1.5, fill: "token:border" },
        { type: "circle", cx: 120, cy: 5, r: 1.8, fill: "token:primary" },
        { type: "circle", cx: 140, cy: 5, r: 1.5, fill: "token:border" },
        { type: "circle", cx: 160, cy: 5, r: 1.5, fill: "token:border" }
      ]
    },
    // ④ dividerFlower · ruler-double RFC 大分隔（两根平行 1px 实线）
    dividerFlower: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: "line", x1: 12, y1: 3, x2: 228, y2: 3, stroke: "token:border", strokeWidth: 1 },
        { type: "line", x1: 12, y1: 6, x2: 228, y2: 6, stroke: "token:border", strokeWidth: 1 }
      ]
    },
    // ⑤ quoteMark · heredoc `<` `>` 精修（primary 琥珀，stroke 2px）
    quoteMark: {
      viewBox: [0, 0, 40, 24],
      width: 36,
      height: 22,
      inlineStyle: { display: "inline-block", verticalAlign: "top", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M12,4 L4,12 L12,20",
          stroke: "token:primary",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        },
        {
          type: "path",
          d: "M28,4 L36,12 L28,20",
          stroke: "token:primary",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ]
    },
    // ⑥ sectionCorner · 实心方块右下"挖角"（IBM 穿孔卡角缺剪影）
    //   先画 8×8 实心方，再用 bg 色覆盖右下 2×2 形成缺角；强化"装订孔"motif 一致性
    sectionCorner: {
      viewBox: [0, 0, 8, 16],
      width: 7,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      primitives: [
        { type: "rect", x: 0, y: 1, w: 8, h: 8, fill: "token:primary" },
        { type: "rect", x: 6, y: 7, w: 2, h: 2, fill: "token:bg" }
      ]
    },
    // ⑦ tipIcon · 故意不导出 —— 规范 §2.10 "无"
    //    虚线 + 中文标题已足够区分；不再加图标，更不再用 `// NOTE` 注释前缀语。
    // ⑧ warningIcon · 简洁方点（去掉 `[!]` ASCII 字符 —— 在 CJK 标题前像 markdown 训练痕迹）
    warningIcon: {
      viewBox: [0, 0, 12, 12],
      width: 10,
      height: 10,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 2, y: 2, w: 8, h: 8, fill: "token:accent" }
      ]
    },
    // ⑨ infoIcon · 单根 1.5px 横线（"参见"语义；克制到极致）
    infoIcon: {
      viewBox: [0, 0, 14, 12],
      width: 12,
      height: 10,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "line", x1: 1, y1: 6, x2: 13, y2: 6, stroke: "token:status.info.accent", strokeWidth: 1.5 }
      ]
    },
    // ⑩ dangerIcon · 实心方块（去掉 `[X]` ASCII 字符；danger 走唯一陶土红方块）
    dangerIcon: {
      viewBox: [0, 0, 12, 12],
      width: 10,
      height: 10,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 2, y: 2, w: 8, h: 8, fill: "#c85a3a" }
      ]
    },
    // ⑪ stepBadge · 纯数字 + 下方 1px 短线（去掉方括号 ASCII 装饰；
    //    数字本身的稀贵感来自琥珀色 + 1px 下划线，不再借 `[]` 模拟脚注）
    stepBadge: {
      viewBox: [0, 0, 26, 22],
      width: 24,
      height: 20,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      placeholders: ["N"],
      primitives: [
        {
          type: "text",
          x: 13,
          y: 15,
          content: "{N}",
          fontSize: 15,
          fontWeight: 600,
          fill: "token:primary",
          textAnchor: "middle"
        },
        { type: "line", x1: 4, y1: 19, x2: 22, y2: 19, stroke: "token:primary", strokeWidth: 1 }
      ]
    }
  },
  // ============================================================
  // 骨架变体（规范 §2 —— manpage / RFC 工程写作语汇）
  // ============================================================
  variants: {
    admonition: "manpage-log",
    // 全主题签名：manpage 日志输出块（顶底分隔线 + :: TAG :: 状态条）
    quote: "frame-brackets",
    // manpage 四角括号
    compare: "stacked-row",
    // RFC alternatives 垂直堆叠
    steps: "split-row",
    // 左竖条 + 大号编号，与 manpage-log 的"标签栏"同构
    divider: "wave",
    // manpage-rule（§ ——— §）
    sectionTitle: "cornered",
    // § heading prefix
    codeBlock: "terminal-frame",
    // terminal window 腔体，与 manpage 主题语言同源
    note: "side-bar",
    // // NOTE 风：左侧标线 + 缩进
    footnotes: "dense-academic",
    // RFC 风密栏 + 深 hanging，更接近 manpage SEE ALSO 段
    recommend: "card-list",
    qrcode: "bare",
    footerCTA: "button-led",
    pullQuote: "giant-mark",
    announcement: "danger-bar",
    tableCard: "rule-grid",
    gallery: "duo",
    dialogue: "qa-rows",
    qaBlock: "numbered-faq"
  },
  // ============================================================
  // 元素级样式（规范 §1.2 typographic voice）
  // ============================================================
  elements: {
    // h1 25 / 600 / 2px / 1.4 —— 深底大标题不上 700
    h1: {
      "font-size": "25px",
      "font-weight": "600",
      color: "#ebdfca",
      "margin-top": "28px",
      "margin-bottom": "16px",
      "line-height": "1.4",
      "letter-spacing": "2px"
    },
    // h2 19 / 600 / 1.5px / 1.5 + h2Prefix SVG 注入 § + 1px 虚线下划线
    h2: {
      "font-size": "19px",
      "font-weight": "600",
      color: "#ebdfca",
      "margin-top": "30px",
      "margin-bottom": "14px",
      "line-height": "1.5",
      "letter-spacing": "1.5px",
      "padding-bottom": "6px",
      "border-bottom": "1px dashed #4a4034"
    },
    // h3 16 / 600 / 1px / 1.6 —— 与正文同号靠字距区分
    h3: {
      "font-size": "16px",
      "font-weight": "600",
      color: "#ebdfca",
      "margin-top": "22px",
      "margin-bottom": "10px",
      "line-height": "1.6",
      "letter-spacing": "1px"
    },
    // h4：steps 条目标题
    h4: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#ebdfca",
      "margin-top": "18px",
      "margin-bottom": "8px",
      "line-height": "1.55",
      "letter-spacing": "0.8px"
    },
    h5: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#ebdfca",
      "margin-top": "14px",
      "margin-bottom": "6px",
      "line-height": "1.55",
      "letter-spacing": "0.8px"
    },
    h6: {
      "font-size": "13px",
      "font-weight": "600",
      color: "#9a8f7e",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.5",
      "letter-spacing": "1.5px",
      "text-transform": "uppercase"
    },
    // 深底纪律：正文字重 500 / 行高 1.85 / 字距 0.6px
    p: {
      "font-size": "15px",
      "font-weight": "500",
      "line-height": "1.85",
      color: "#ebdfca",
      "margin-top": "0",
      "margin-bottom": "18px",
      "letter-spacing": "0.6px"
    },
    // 裸 blockquote = pull-quote：左 1px border 竖线 + 无底色
    blockquote: {
      "border-left": "1px solid #4a4034",
      "border-right": "none",
      "background-color": "transparent",
      color: "#9a8f7e",
      "padding-top": "6px",
      "padding-right": "0",
      "padding-bottom": "6px",
      "padding-left": "18px",
      "margin-top": "0",
      "margin-bottom": "18px",
      "border-radius": "0",
      "font-style": "normal",
      "letter-spacing": "0.6px"
    },
    ul: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "18px" },
    ol: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "18px" },
    li: {
      "margin-bottom": "8px",
      "font-weight": "500",
      "line-height": "1.85",
      color: "#ebdfca",
      "letter-spacing": "0.6px"
    },
    // strong 600 —— 深底大字号 + 700/800 = 塑料霓虹招牌
    strong: { "font-weight": "600", color: "#c89759" },
    // em 保留 italic 作保底；走 primary 色
    em: { "font-style": "italic", color: "#c89759" },
    // 链接走 accent HN 橙 + 下划线
    a: {
      color: "#e06a28",
      "text-decoration": "underline",
      "text-underline-offset": "3px"
    },
    hr: {
      border: "none",
      height: "1px",
      "background-color": "#4a4034",
      "margin-top": "24px",
      "margin-bottom": "24px"
    },
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "12px",
      "margin-right": "auto",
      "margin-bottom": "12px",
      "margin-left": "auto",
      "border-radius": "4px"
    },
    // 终端数据表：暗底反白表头 + dashed 行间 + monospace 紧凑 padding（Plan 9 manpage 账本风）
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "20px",
      "font-size": "13px",
      "letter-spacing": "0.4px"
    },
    th: {
      "background-color": "#ebdfca",
      // textInverse 反白表头
      color: "#262019",
      border: "1px dashed #4a4034",
      padding: "5px 10px",
      "font-weight": "600",
      "text-align": "left",
      "letter-spacing": "0.8px"
    },
    td: {
      border: "none",
      "border-bottom": "1px dashed #4a4034",
      // hairline 行间，无侧线（manpage 账本）
      padding: "5px 10px",
      color: "#ebdfca"
    },
    // 终端深底键帽：bgMuted 暗底 + 反色字 + 底边 2px 模拟凹陷（不对称键帽感）
    kbd: {
      display: "inline-block",
      "background-color": "#3a3328",
      color: "#ebdfca",
      border: "1px solid #4a4034",
      "border-bottom-width": "2px",
      "border-radius": "2px",
      padding: "1px 6px",
      "font-size": "12px",
      "line-height": "1.4",
      "letter-spacing": "0.6px",
      "vertical-align": "middle"
    },
    // 代码块（规范 §1.3 非割裂设计 —— code 与正文同色系）
    pre: {
      "background-color": "#2f2920",
      color: "#ebdfca",
      "padding-top": "14px",
      "padding-right": "16px",
      "padding-bottom": "14px",
      "padding-left": "16px",
      "border-radius": "4px",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "box-shadow": "inset -14px 0 10px -10px rgba(0,0,0,0.35)",
      "margin-top": "0",
      "margin-bottom": "20px",
      "font-size": "13px",
      "font-weight": "500",
      "line-height": "1.7",
      "letter-spacing": "0.4px"
    },
    // inline code：与正文同号；只靠 letter-spacing +0.2px 和 primary 琥珀色区分
    code: {
      "background-color": "#3a3328",
      color: "#c89759",
      padding: "1px 5px",
      "border-radius": "2px",
      "font-size": "15px",
      "font-weight": "500",
      "letter-spacing": "0.8px"
    }
  },
  // ============================================================
  // 内联强调（规范 §1.2 · §3.7）
  // ============================================================
  inline: {
    // highlight 走 bgMuted 近底色 + primary 字色（"标记"不是"涂鸦"）
    highlight: {
      "background-color": "#3a3328",
      color: "#c89759",
      padding: "0 4px",
      "border-radius": "2px",
      "font-weight": "600"
    },
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#e06a28",
      "text-underline-offset": "3px"
    },
    // 关键词强调：primary + 600 —— 与 strong 同档
    emphasis: {
      color: "#c89759",
      "font-weight": "600"
    },
    del: {
      color: "#9a8f7e",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#c89759",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container 工程写作语汇）
  // ============================================================
  containers: {
    // intro = Abstract：上下 1px 实线 + textMuted + 透明底
    intro: {
      "background-color": "transparent",
      "border-top": "1px solid #4a4034",
      "border-bottom": "1px solid #4a4034",
      "border-radius": "0",
      padding: "16px 0",
      margin: "0 0 24px 0",
      color: "#9a8f7e",
      "font-size": "14px",
      "letter-spacing": "0.5px"
    },
    // author = Colophon：无底色 + 13px textMuted
    author: {
      display: "inline-block",
      "background-color": "transparent",
      border: "none",
      "border-radius": "0",
      padding: "2px 0",
      margin: "0 0 20px 0",
      color: "#9a8f7e",
      "font-size": "13px",
      "letter-spacing": "0.6px"
    },
    // cover = Title Block
    cover: {
      margin: "0 0 28px 0"
    },
    // admonition 四态 variant 接管
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // quoteCard = Footnote Card：bgSoft 底 + 无边框
    // padding ≥ 28px：frame-brackets variant 的顶/底 L 角各占 20px，给文字净空避免压角
    quoteCard: {
      "background-color": "#2f2920",
      padding: "28px 22px",
      margin: "24px 0",
      "border-radius": "4px",
      "letter-spacing": "0.8px"
    },
    // highlight = Key Number
    highlight: {
      "background-color": "#2f2920",
      padding: "18px 20px",
      margin: "20px 0",
      "border-radius": "4px"
    },
    // compare = Trade-off（column-card variant 接管）
    compare: { margin: "24px 0" },
    // steps = Algorithm（number-circle variant 配合 stepBadge `[n]`）
    steps: { margin: "24px 0" },
    // sectionTitle：__reset 不承袭 baseContainers 的 border-bottom 实心主色线
    //   cornered variant 接管装饰
    sectionTitle: {
      __reset: true,
      margin: "36px 0 16px",
      "padding-bottom": "6px"
    },
    // footerCTA = See Also：顶部 1px 实线 + 透明底 + 无圆角
    footerCTA: {
      margin: "32px 0 0 0",
      padding: "18px 0 4px 0",
      "background-color": "transparent",
      "border-top": "1px solid #4a4034",
      "border-radius": "0"
    },
    // recommend = References
    recommend: {
      margin: "24px 0",
      padding: "0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    // qrcode = Address Block（signature block 风，无边框）
    qrcode: {
      margin: "24px auto",
      padding: "0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    // note = manpage aside：左条由 side-bar variant 自 noteBorder* tokens 注入（1px dashed primary）
    // 区别于 admonition 的"边框 + 状态色" —— note 是"工程附注"，不是状态信号
    note: {
      __reset: true,
      "background-color": "transparent",
      margin: "20px 0",
      "border-radius": "0"
    },
    // 终端图注：行首 `>` 提示符风 — monospace 13px + textMuted + 左对齐（manpage 图说）
    imageCaption: {
      margin: "8px 0 18px 0",
      "text-align": "left",
      "font-size": "13px",
      color: "#9a8f7e",
      "letter-spacing": "0.4px",
      "padding-left": "14px",
      "border-left": "2px solid #4a4034"
    }
  },
  // 仅通用容器
  signatureContainers: [],
  // 自定义模板覆盖（commonTemplates 由 specToTheme 隐式合并为基线）
  templates: {
    // cover = Title Block（无图版式，但支持图）
    cover: `::: cover 专题头 · Title
![封面占位](https://placehold.co/1200x630?text=tech-geek)

副标题：一行冷静的立意。工程随笔 Vol.01 · 2026
:::
`,
    // author = Colophon（去掉 ¶ pilcrow —— 在 CJK 名字前像 LaTeX 训练痕迹）
    authorBar: `::: author 某某 · 2026-04-20 · 阅读时长 12 分钟
:::
`,
    // tip = "附注"中文胶囊（去掉 \`// NOTE\` 注释前缀语，回归"工程随笔"语境）
    tip: `::: tip 附注
这是一条工程附注。行内 \`code\` 与正文同色同族。
:::
`,
    // footerCTA = "延伸阅读"（去掉 SEE ALSO 全大写英文标题）
    footerCTA: `::: footer-cta 延伸阅读
- 相关工程随笔 Vol.00（编者按）
- 本篇的数据与实验脚本
:::
`
  },
  meta: {
    createdAt: "2026-04-20",
    ownerNotes: "VT220 琥珀（#c89759）+ manpage 印刷传统；四态 admonition 四重冗余（注释前缀/边框样式/图标形状/位置）；motif 字号 ≥ 14（MIN_FONT_SIZE 硬下限）。"
  }
};
const spec$f = {
  id: "tech-explainer",
  name: "文档白昼",
  description: "Stripe Docs / MDN 家族，手把手跟做的技术产品文档",
  audience: "技术布道 / 产品文档 / 教程",
  // ============================================================
  // 色板（规范 §1.1 的 committed 版）
  // ============================================================
  palette: {
    primary: "#0066cc",
    // 文档蓝（Stripe Docs 家族）
    secondary: "#4a90e2",
    // 链接蓝（primary 的亮化变体）
    accent: "#f59e0b",
    // 琥珀警示（唯一暖色，仅 Warning / Pro Tip 图标）
    bg: "#fafbfc",
    // 文档清凉白（1-2% 蓝灰，OLED 长时阅读友好）
    bgSoft: "#f3f5f8",
    // 侧栏浅底（代码块标签带、author 底、intro 底）
    bgMuted: "#e8ecf1",
    // 表头灰蓝（table th、inline code 底、filePath 底）
    text: "#1a2233",
    // 文档墨（接近黑但偏蓝冷，Stripe Docs 正文精确色）
    textMuted: "#5c6778",
    // 侧注灰（caption / date / 脚注）
    textInverse: "#fefefe",
    // 反白（规避 #fff 透明化）
    border: "#d9dee5",
    // 边框灰蓝（融入主色家族的 1px 实线）
    code: "#0066cc",
    // inline code 字色 = primary（Stripe Docs 标志性）
    preBg: "#1e2533",
    // 代码块深底（冷蓝深灰，与 bg 清凉白形成"夜里发光屏幕"对比）
    preText: "#e8ebf0"
    // 代码块文字（亮蓝灰，在 preBg 上 ~13.4:1 对比，AAA 级）
  },
  // 语义四色（规范 §1.1）——note 在 tech-explainer 里是第五态，走 motifs.noteIcon + textMuted 表达
  status: {
    tip: { accent: "#0a705a", soft: "#e6f5f0" },
    // Mint 绿（5.37:1 守 AA）
    info: { accent: "#0066cc", soft: "#e6f0fb" },
    // = primary（info = "延伸知识点"）
    warning: { accent: "#985a0a", soft: "#fdf4e2" },
    // 琥珀文字色版（5.05:1）
    danger: { accent: "#c8322d", soft: "#fce9e7" }
    // 陶土红
  },
  // ============================================================
  // 字号 / 间距 / 圆角
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.75,
    // 比 tech-geek 的 1.85 略密（教程密度 > 随笔）
    h1Size: 26,
    h2Size: 21,
    h3Size: 17,
    letterSpacing: 0.3
  },
  spacing: {
    paragraph: 18,
    section: 28,
    listItem: 8,
    containerPadding: 16
  },
  // 规范纪律：文档感小圆角（≤ 6px）
  radius: { sm: 3, md: 6, lg: 10 },
  // ============================================================
  // Motifs（规范 §1.3）
  //   - h2Prefix：3×16 primary 短竖条
  //   - 五态图标（tip/note/info/warning/danger）共用 16×16、sw=1.5、stroke 空心
  //   - stepBadge、copyIcon、externalLinkIcon、terminalPrompt、sectionCorner、dividerDots
  // ============================================================
  motifs: {
    // h2Prefix：3px × 16px primary 短竖条（唯一 heading 装饰）
    h2Prefix: {
      viewBox: [0, 0, 3, 16],
      width: 3,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 10 },
      primitives: [{ type: "rect", x: 0, y: 0, w: 3, h: 16, fill: "token:primary" }]
    },
    // tipIcon：灯泡轮廓（圆头 + 2 道灯座横线），mint 绿
    tipIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M8,2 C5.5,2 3.8,4 3.8,6.4 C3.8,8 4.6,9.2 5.6,10 L5.6,11.5 L10.4,11.5 L10.4,10 C11.4,9.2 12.2,8 12.2,6.4 C12.2,4 10.5,2 8,2 Z",
          stroke: "token:status.tip.accent",
          strokeWidth: 1.5,
          strokeLinejoin: "round"
        },
        { type: "line", x1: 6, y1: 12.5, x2: 10, y2: 12.5, stroke: "token:status.tip.accent", strokeWidth: 1.5 },
        { type: "line", x1: 6.5, y1: 14, x2: 9.5, y2: 14, stroke: "token:status.tip.accent", strokeWidth: 1.5 }
      ]
    },
    // noteIcon：空心圆 + 中央 i（note 灰 = textMuted）
    noteIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "circle", cx: 8, cy: 8, r: 6, stroke: "token:textMuted", strokeWidth: 1.5 },
        { type: "circle", cx: 8, cy: 5, r: 0.9, fill: "token:textMuted" },
        { type: "rect", x: 7.25, y: 7, w: 1.5, h: 5, rx: 0.4, fill: "token:textMuted" }
      ]
    },
    // infoIcon：圆角方形 + 中央 i（primary 蓝 = info 色）
    infoIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 2, y: 2, w: 12, h: 12, rx: 2, stroke: "token:primary", strokeWidth: 1.5 },
        { type: "circle", cx: 8, cy: 5, r: 0.9, fill: "token:primary" },
        { type: "rect", x: 7.25, y: 7, w: 1.5, h: 5, rx: 0.4, fill: "token:primary" }
      ]
    },
    // warningIcon：等边三角形 + 中央 !（warning 琥珀）
    warningIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M8,2 L14.5,13.5 L1.5,13.5 Z",
          stroke: "#b87614",
          strokeWidth: 1.5,
          strokeLinejoin: "round"
        },
        { type: "rect", x: 7.25, y: 6, w: 1.5, h: 4, rx: 0.4, fill: "#b87614" },
        { type: "circle", cx: 8, cy: 11.5, r: 0.9, fill: "#b87614" }
      ]
    },
    // dangerIcon：八边形 + 中央 ×（陶土红）
    dangerIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M5.2,1.5 L10.8,1.5 L14.5,5.2 L14.5,10.8 L10.8,14.5 L5.2,14.5 L1.5,10.8 L1.5,5.2 Z",
          stroke: "token:status.danger.accent",
          strokeWidth: 1.5,
          strokeLinejoin: "round"
        },
        {
          type: "line",
          x1: 5.5,
          y1: 5.5,
          x2: 10.5,
          y2: 10.5,
          stroke: "token:status.danger.accent",
          strokeWidth: 1.5,
          strokeLinecap: "round"
        },
        {
          type: "line",
          x1: 10.5,
          y1: 5.5,
          x2: 5.5,
          y2: 10.5,
          stroke: "token:status.danger.accent",
          strokeWidth: 1.5,
          strokeLinecap: "round"
        }
      ]
    },
    // stepBadge：primary 蓝 fill 圆 + 白数字（#fefefe 防透明化）
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      placeholders: ["N"],
      primitives: [
        { type: "circle", cx: 12, cy: 12, r: 11, fill: "token:primary" },
        {
          type: "text",
          x: 12,
          y: 17,
          content: "{N}",
          fontSize: 15,
          fontWeight: 600,
          fill: "token:textInverse",
          textAnchor: "middle"
        }
      ]
    },
    // copyIcon：两叠圆角方形（github/stripe 通用 ⧉ 语汇）
    copyIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle" },
      primitives: [
        { type: "rect", x: 5, y: 2, w: 9, h: 9, rx: 1.5, stroke: "token:textMuted", strokeWidth: 1.5 },
        { type: "rect", x: 2, y: 5, w: 9, h: 9, rx: 1.5, stroke: "token:textMuted", strokeWidth: 1.5 }
      ]
    },
    // externalLinkIcon：45° 箭头 + L 形框（MDN / Stripe Docs 通用外链标识）
    externalLinkIcon: {
      viewBox: [0, 0, 12, 12],
      width: 10,
      height: 10,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginLeft: 3 },
      primitives: [
        {
          type: "path",
          d: "M5.5,1.5 L10.5,1.5 L10.5,6.5",
          stroke: "token:primary",
          strokeWidth: 1.5,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        },
        {
          type: "line",
          x1: 10.5,
          y1: 1.5,
          x2: 5.5,
          y2: 6.5,
          stroke: "token:primary",
          strokeWidth: 1.5,
          strokeLinecap: "round"
        },
        {
          type: "path",
          d: "M8.5,10.5 L1.5,10.5 L1.5,3.5",
          stroke: "token:primary",
          strokeWidth: 1.5,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ]
    },
    // terminalPrompt：$ 前缀（提示"这行是 shell 命令"）
    terminalPrompt: {
      viewBox: [0, 0, 18, 14],
      width: 14,
      height: 12,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 4 },
      primitives: [
        {
          type: "text",
          x: 9,
          y: 11,
          content: "$",
          fontSize: 14,
          fontWeight: 600,
          fill: "token:primary",
          textAnchor: "middle"
        }
      ]
    },
    // sectionCorner：L 形（sectionTitle variant='cornered' 的兜底；默认 bordered 不用）
    sectionCorner: {
      viewBox: [0, 0, 14, 14],
      width: 12,
      height: 12,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "path", d: "M1,1 L13,1 L13,4 L4,4 L4,13 L1,13 Z", fill: "token:primary" }
      ]
    },
    // dividerDots：4 颗 primary 圆点（divider variant='dots' 的兜底；默认 rule 不用）
    dividerDots: {
      viewBox: [0, 0, 120, 6],
      width: 60,
      height: 6,
      primitives: [
        { type: "circle", cx: 30, cy: 3, r: 2, fill: "token:primary" },
        { type: "circle", cx: 50, cy: 3, r: 2, fill: "token:primary" },
        { type: "circle", cx: 70, cy: 3, r: 2.5, fill: "token:primary" },
        { type: "circle", cx: 90, cy: 3, r: 2, fill: "token:primary" }
      ]
    }
  },
  // ============================================================
  // 骨架变体（规范 §2 每节开头的 primary variant）
  // ============================================================
  variants: {
    admonition: "accent-bar",
    // §2.10-2.13 tip/warning/info/danger 全部 accent-bar（保留默认是教程主题的刻意选择）
    quote: "column-rule",
    // §2.5 双侧细竖线夹住段落
    compare: "stacked-row",
    // §2.15 Do/Don't 偏垂直陈述：先 Do 段后 Don't 段，避免移动端双栏挤压
    steps: "step-card",
    // §2.16 教程偏卡片化分步：每步独立浅底卡片 + uppercase kicker
    divider: "dots",
    // §2.17 · · · 圆点分割，比 1px 实线更"文档章节空隙"
    sectionTitle: "number-prefix",
    // §2.4 monospace 章节编号（"1.2 实现"），教程典型版面
    codeBlock: "header-bar",
    // §1.2 signature：顶部语言标签带 + copy icon
    note: "box-callout",
    // 文档式"附注框"，与 accent-bar admonition 互补不抢色
    footnotes: "boxed-aside",
    // 教程文末参考资料：软底卡片 + pill kicker，narrative aside
    recommend: "academic-refs",
    // 学术 / 教程主题：参考引用栏走 uppercase 小字 kicker
    qrcode: "bare",
    footerCTA: "button-led",
    pullQuote: "giant-mark",
    announcement: "danger-bar",
    tableCard: "rule-grid",
    gallery: "duo",
    dialogue: "qa-rows",
    qaBlock: "numbered-faq"
  },
  // ============================================================
  // 元素级样式（规范 §1.2 typographic voice）
  // ============================================================
  elements: {
    // h1：题头唯一 700 字重；字距 0；无装饰前缀
    h1: {
      "font-size": "26px",
      "font-weight": "700",
      color: "#1a2233",
      "margin-top": "28px",
      "margin-bottom": "14px",
      "line-height": "1.35",
      "letter-spacing": "0"
    },
    // h2：底部 1px border 实线分隔；前缀 3px 短竖条由 motifs.h2Prefix 注入
    h2: {
      "font-size": "21px",
      "font-weight": "600",
      color: "#1a2233",
      "margin-top": "32px",
      "margin-bottom": "14px",
      "line-height": "1.4",
      "padding-bottom": "8px",
      "border-bottom": "1px solid #d9dee5",
      "letter-spacing": "0"
    },
    // h3：无底线无前缀，纯靠字号 + 字重与正文区分
    h3: {
      "font-size": "17px",
      "font-weight": "600",
      color: "#1a2233",
      "margin-top": "24px",
      "margin-bottom": "10px",
      "line-height": "1.5",
      "letter-spacing": "0"
    },
    // h4：Step 小标题专属；primary 色 + 字重 600
    h4: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#0066cc",
      "margin-top": "20px",
      "margin-bottom": "8px",
      "line-height": "1.5",
      "letter-spacing": "0.3px"
    },
    h5: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#1a2233",
      "margin-top": "16px",
      "margin-bottom": "6px",
      "line-height": "1.5",
      "letter-spacing": "0.3px"
    },
    h6: {
      "font-size": "13px",
      "font-weight": "600",
      color: "#5c6778",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.5",
      "letter-spacing": "1px",
      "text-transform": "uppercase"
    },
    // 正文：400 字重；行高 1.75
    p: {
      "font-size": "15px",
      "line-height": "1.75",
      color: "#1a2233",
      "margin-top": "0",
      "margin-bottom": "18px",
      "letter-spacing": "0.3px"
    },
    // 教程列表：略紧 padding + 行间收窄，逐字跟做的步骤感
    ul: { "padding-left": "22px", "margin-top": "0", "margin-bottom": "18px" },
    ol: { "padding-left": "22px", "margin-top": "0", "margin-bottom": "18px" },
    li: {
      "margin-bottom": "6px",
      "line-height": "1.65",
      color: "#1a2233",
      "letter-spacing": "0.3px"
    },
    // blockquote：走 column-rule variant；这里保留克制的 base 兜底
    blockquote: {
      "border-left": "3px solid #d9dee5",
      "background-color": "transparent",
      color: "#5c6778",
      "padding-top": "4px",
      "padding-right": "0",
      "padding-bottom": "4px",
      "padding-left": "16px",
      "margin-top": "0",
      "margin-bottom": "18px",
      "border-radius": "0",
      "font-style": "italic"
    },
    // Stripe Docs / MDN API reference 表格：th bgMuted + 主色 1px 下划线 + 中字距
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "20px",
      "font-size": "13px",
      "letter-spacing": "0.2px"
    },
    th: {
      "background-color": "#e8ecf1",
      // bgMuted 灰蓝表头底（API reference 标准）
      color: "#1a2233",
      border: "1px solid #d9dee5",
      "border-bottom": "2px solid #0066cc",
      // 主色下划线：Stripe Docs 签名
      padding: "7px 12px",
      "font-weight": "600",
      "text-align": "left",
      "letter-spacing": "0.3px"
    },
    td: {
      border: "1px solid #d9dee5",
      padding: "7px 12px",
      color: "#1a2233"
    },
    // Stripe / MDN 键帽：白底 + 1px 细边 + 底边 2px 模拟立体凹陷（文档白昼家族）
    kbd: {
      display: "inline-block",
      "background-color": "#fafbfc",
      color: "#1a2233",
      border: "1px solid #d9dee5",
      "border-bottom-width": "2px",
      "border-radius": "3px",
      padding: "2px 6px",
      "font-size": "12px",
      "line-height": "1.4",
      "letter-spacing": "0.2px",
      "vertical-align": "middle"
    },
    // a：primary 色 + 下划线 + 3px 偏移
    a: {
      color: "#0066cc",
      "text-decoration": "underline",
      "text-underline-offset": "3px"
    },
    // hr：极简 1px，28px 上下呼吸
    hr: {
      border: "none",
      height: "1px",
      "background-color": "#d9dee5",
      "margin-top": "28px",
      "margin-bottom": "28px"
    },
    // img：截图必备三件套——1px 淡边框 + 6px 圆角 + 上下呼吸
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "18px",
      "margin-right": "auto",
      "margin-bottom": "18px",
      "margin-left": "auto",
      border: "1px solid #d9dee5",
      "border-radius": "6px"
    },
    strong: { "font-weight": "600", color: "#1a2233" },
    em: { "font-style": "italic", color: "#1a2233" },
    // 代码块（规范 §1.1 冷灰深底 + 冷浅灰字）
    // box-shadow 用浅色 inset：深底上深 rgba 看不见，导致用户以为不能横滑；
    // 改 rgba(255,255,255,0.18) 让右侧"渐变白雾"在深底可见，提示"还能往右滑"。
    pre: {
      "padding-top": "14px",
      "padding-right": "16px",
      "padding-bottom": "14px",
      "padding-left": "16px",
      "border-radius": "6px",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "box-shadow": "inset -16px 0 12px -10px rgba(255,255,255,0.18)",
      "margin-top": "0",
      "margin-bottom": "20px",
      "font-size": "13px",
      "line-height": "1.6"
    },
    // inline code：bgMuted 底 + primary 字（Stripe Docs 标志性）
    code: {
      "background-color": "#e8ecf1",
      color: "#0066cc",
      padding: "1px 4px",
      "border-radius": "3px",
      "font-size": "14px",
      "font-weight": "500",
      "letter-spacing": "0"
    }
  },
  // ============================================================
  // 内联强调（规范 §1.3 / §3.1）
  // ============================================================
  inline: {
    // 规范 §3.1 拒绝 "CSDN 荧光黄"——这里只给克制的浅底 + 主色
    highlight: {
      "background-color": "#e6f0fb",
      color: "#0066cc",
      padding: "0 3px",
      "border-radius": "2px",
      "font-weight": "500"
    },
    // 波浪线：accent 琥珀；技术文档少用，但保留
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#f59e0b",
      "text-underline-offset": "3px"
    },
    // 着重：primary + 600（[.xxx.] 比 strong 更重）
    emphasis: {
      color: "#0066cc",
      "font-weight": "600"
    },
    del: {
      color: "#5c6778",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#0066cc",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container 差异化）
  // ============================================================
  containers: {
    // §2.1 intro → TL;DR 本文要点
    intro: {
      "background-color": "#f3f5f8",
      "border-left": "3px solid #0066cc",
      "border-radius": "0 6px 6px 0",
      padding: "14px 18px",
      margin: "20px 0",
      color: "#5c6778"
    },
    // §2.2 author → 作者 + 最后更新日期；无底色无边框
    //     __reset：不承袭 baseContainers 的 border-radius 6px
    author: {
      __reset: true,
      "background-color": "transparent",
      padding: "8px 0",
      margin: "12px 0",
      color: "#5c6778",
      "border-bottom": "1px solid #d9dee5"
    },
    // §2.3 cover → 背景 bg（不贴纸），底部 1px 分隔
    cover: {
      "background-color": "#fafbfc",
      padding: "20px 0 24px",
      margin: "16px 0",
      "border-bottom": "1px solid #d9dee5"
    },
    // tip/warning/info/danger 走 accent-bar variant；容器外壳保持空
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // §2.6 quoteCard → Key Takeaway 核心要点；mint 绿 border-left + bgSoft 底
    quoteCard: {
      "background-color": "#f3f5f8",
      "border-left": "3px solid #0a705a",
      padding: "16px 18px",
      margin: "20px 0",
      "border-radius": "0 6px 6px 0"
    },
    // §2.14 highlight → Pro Tip 进阶技巧（琥珀 accent）
    highlight: {
      "background-color": "#fdf4e2",
      "border-left": "3px solid #f59e0b",
      padding: "14px 18px",
      margin: "18px 0",
      "border-radius": "0 6px 6px 0"
    },
    compare: { margin: "20px 0" },
    // §2.16 steps → 左侧 1px 细竖线 + padding-left 形成"线上串珠"节律
    steps: {
      margin: "20px 0",
      "border-left": "1px solid #d9dee5",
      "padding-left": "24px"
    },
    // §2.4 sectionTitle → bordered variant；兜底样式
    sectionTitle: {
      margin: "32px 0 14px",
      "padding-bottom": "8px",
      "border-bottom": "1px solid #d9dee5"
    },
    // §2.7 footerCTA → 继续阅读 / 下一篇
    footerCTA: {
      margin: "28px 0",
      padding: "16px 18px",
      "background-color": "#f3f5f8",
      "border-radius": "6px"
    },
    // §2.8 recommend → 延伸阅读 / MDN "See Also"；无底色，仅上下分隔
    //     __reset：不承袭 baseContainers 的 border-radius 6px（MDN 纪律：直角）
    recommend: {
      __reset: true,
      margin: "24px 0",
      padding: "14px 0",
      "background-color": "transparent",
      "border-top": "1px solid #d9dee5",
      "border-bottom": "1px solid #d9dee5"
    },
    // §2.9 qrcode → GitHub 仓库卡片风（浅底 + 6px 圆角）
    qrcode: {
      margin: "24px 0",
      padding: "16px",
      "background-color": "#f3f5f8",
      "border-radius": "6px"
    },
    // note = MDN / Stripe Docs 的 "Note —" 内联 aside：
    // 顶 1px border 短分隔 + 无背景无左条，靠 noteIcon + textMuted 标题承担语义
    note: {
      __reset: true,
      "background-color": "transparent",
      "border-top": "1px solid #d9dee5",
      padding: "10px 0 4px 0",
      margin: "18px 0",
      "border-radius": "0"
    },
    // "Figure N: ..." 数字编号注脚风 — 居中 textMuted + 1px 顶线（Stripe Docs 图说）
    imageCaption: {
      margin: "4px 0 18px 0",
      "text-align": "center",
      "font-size": "12px",
      color: "#5c6778",
      "padding-top": "6px",
      "border-top": "1px solid #d9dee5",
      "letter-spacing": "0.2px"
    }
  },
  // ============================================================
  // Templates：tech-explainer 特化的 tip / cover 片段
  // commonTemplates 由 specToTheme 隐式并入作为基线，这里只声明覆盖。
  // ============================================================
  templates: {
    // tip：英中双语胶囊标题（规范 §2.10）
    tip: `::: tip Tip · 小贴士
一句提醒读者的经验法则。
:::
`,
    // cover：规范 §2.3 要求标题 + 副标题 + 前置知识 + 阅读时长四件套
    cover: `::: cover 标题占位
副标题或一句话立意。

\`前置知识\`：\`HTML\` \`CSS\` \`JavaScript 基础\`

_15 分钟阅读 · 最后更新 2026-04-20_
:::
`
  },
  // note（motifs.noteIcon 承载第五态）。教程文末参考链接块走
  // ::: recommend variant=academic-refs（uppercase 小字 kicker + textMuted 列表）。
  signatureContainers: ["note"],
  meta: {
    createdAt: "2026-04-20",
    ownerNotes: "note 第五态由 motifs.noteIcon + textMuted 承载；codeBlock header-bar + copyIcon 为签名语汇。"
  }
};
const spec$e = {
  id: "life-aesthetic",
  name: "慢生活",
  description: "暖米底 + 圆角柔和，写写饮食、旅行与长日",
  audience: "生活写作 / 非虚构随笔",
  // applyPalette fallback：用户基于本主题自定义配色时，SVG assets 走 `soft` 工厂
  // （圆角更柔和的图形语言）。spec-first 主路径不消费此字段。
  svgVariant: "soft",
  // ============================================================
  // 色板
  // ============================================================
  palette: {
    primary: "#d98141",
    secondary: "#b96234",
    accent: "#efb758",
    bg: "#faf6f0",
    bgSoft: "#f2ead8",
    bgMuted: "#eadfc7",
    text: "#3a2d20",
    textMuted: "#7a6a58",
    textInverse: "#faf6f0",
    border: "#e0d1ba",
    code: "#b96234",
    preBg: "#fffaef",
    // 暖米卡纸的代码块底（比 bg 再亮一档）
    preText: "#3a2d20",
    // 暖底主题必须显式指定 preText：buildTheme 兜底 #d8d8d4 是为暗底设计，落到亮底会浅得读不见（12.8:1 守 AAA）
    codeBg: "#f3e4cc",
    // inline code 暖米底（饱和度低于 bgMuted，配 code 主色 #b96234 形成"做旧标签纸"感）
    quoteCardBg: "#fffaf1"
    // quote-card 引用卡背景（最亮的一层，让 pull-quote 在卡纸底上微"抬"）
  },
  // 语义四色
  status: {
    tip: { accent: "#7ba05b", soft: "#eef3e4" },
    warning: { accent: "#c88e3b", soft: "#fcf1dc" },
    info: { accent: "#5b88a8", soft: "#e6edf3" },
    danger: { accent: "#c05a4e", soft: "#f8e1dc" }
  },
  // ============================================================
  // 字号 / 间距 / 圆角
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.9,
    h1Size: 24,
    h2Size: 20,
    h3Size: 17,
    letterSpacing: 0.6
  },
  spacing: { paragraph: 20, section: 32, listItem: 10, containerPadding: 18 },
  radius: { sm: 6, md: 12, lg: 18 },
  // ============================================================
  // Motifs（来自 assets.ts 的 AST 化改写）
  // ============================================================
  motifs: {
    // H2 Prefix：一片叶子 + 细茎
    h2Prefix: {
      viewBox: [0, 0, 22, 22],
      width: 18,
      height: 18,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      primitives: [
        {
          type: "path",
          d: "M2,20 C8,18 16,12 20,4 C14,6 6,10 2,20 Z",
          fill: "token:primary",
          opacity: 0.85
        },
        {
          type: "path",
          d: "M4,18 C10,14 14,10 18,6",
          stroke: "token:secondary",
          strokeWidth: 1,
          opacity: 0.6
        }
      ]
    },
    // 分割线 · wave：不规则手绘波浪
    dividerWave: {
      viewBox: [0, 0, 240, 16],
      width: 220,
      height: 16,
      primitives: [
        {
          type: "path",
          d: "M0,9 C18,2 36,14 54,8 C72,2 90,14 108,8 C126,2 144,14 162,8 C180,2 198,14 216,8 C228,5 240,9 240,9",
          stroke: "token:primary",
          strokeWidth: 1.4,
          strokeLinecap: "round",
          opacity: 0.7
        }
      ]
    },
    // 分割线 · dots：散落的小花瓣（4 组 rotated group，静态展开）
    // 原 .map([70,100,130,160]) ⇒ cx × 4；rot = i*45 ⇒ 0/45/90/135
    dividerDots: {
      viewBox: [0, 0, 240, 14],
      width: 220,
      height: 14,
      primitives: [
        {
          type: "group",
          transform: "translate(70 7) rotate(0)",
          children: [
            { type: "ellipse", cx: 0, cy: -3, rx: 1.5, ry: 3, fill: "token:primary", opacity: 0.75 },
            { type: "ellipse", cx: 0, cy: 3, rx: 1.5, ry: 3, fill: "token:primary", opacity: 0.5 },
            { type: "circle", cx: 0, cy: 0, r: 1.2, fill: "token:accent" }
          ]
        },
        {
          type: "group",
          transform: "translate(100 7) rotate(45)",
          children: [
            { type: "ellipse", cx: 0, cy: -3, rx: 1.5, ry: 3, fill: "token:primary", opacity: 0.75 },
            { type: "ellipse", cx: 0, cy: 3, rx: 1.5, ry: 3, fill: "token:primary", opacity: 0.5 },
            { type: "circle", cx: 0, cy: 0, r: 1.2, fill: "token:accent" }
          ]
        },
        {
          type: "group",
          transform: "translate(130 7) rotate(90)",
          children: [
            { type: "ellipse", cx: 0, cy: -3, rx: 1.5, ry: 3, fill: "token:primary", opacity: 0.75 },
            { type: "ellipse", cx: 0, cy: 3, rx: 1.5, ry: 3, fill: "token:primary", opacity: 0.5 },
            { type: "circle", cx: 0, cy: 0, r: 1.2, fill: "token:accent" }
          ]
        },
        {
          type: "group",
          transform: "translate(160 7) rotate(135)",
          children: [
            { type: "ellipse", cx: 0, cy: -3, rx: 1.5, ry: 3, fill: "token:primary", opacity: 0.75 },
            { type: "ellipse", cx: 0, cy: 3, rx: 1.5, ry: 3, fill: "token:primary", opacity: 0.5 },
            { type: "circle", cx: 0, cy: 0, r: 1.2, fill: "token:accent" }
          ]
        }
      ]
    },
    // 分割线 · flower：叶脉花枝
    dividerFlower: {
      viewBox: [0, 0, 240, 22],
      width: 220,
      height: 22,
      primitives: [
        {
          type: "path",
          d: "M0,11 C40,11 80,11 95,11",
          stroke: "token:border",
          strokeWidth: 1
        },
        {
          type: "path",
          d: "M145,11 C170,11 200,11 240,11",
          stroke: "token:border",
          strokeWidth: 1
        },
        {
          type: "path",
          d: "M120,2 C118,6 114,8 110,10 M120,2 C122,6 126,8 130,10",
          stroke: "token:primary",
          strokeWidth: 1.2,
          opacity: 0.85
        },
        { type: "ellipse", cx: 120, cy: 14, rx: 4, ry: 2.5, fill: "token:primary", opacity: 0.7 },
        { type: "ellipse", cx: 120, cy: 18, rx: 3, ry: 1.8, fill: "token:accent", opacity: 0.65 }
      ]
    },
    // 金句引号：手绘逗号形双引号
    quoteMark: {
      viewBox: [0, 0, 48, 36],
      width: 40,
      height: 30,
      inlineStyle: { display: "inline-block", verticalAlign: "top", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M4,24 C4,14 10,6 18,4 C14,10 12,16 13,22 C13,28 9,30 4,24 Z",
          fill: "token:primary",
          opacity: 0.42
        },
        {
          type: "path",
          d: "M26,24 C26,14 32,6 40,4 C36,10 34,16 35,22 C35,28 31,30 26,24 Z",
          fill: "token:primary",
          opacity: 0.42
        }
      ]
    },
    // Section 角花：叶片 + 短茎
    sectionCorner: {
      viewBox: [0, 0, 22, 18],
      width: 18,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M1,16 C6,14 14,9 20,2 C15,3 6,6 1,16 Z",
          fill: "token:primary",
          opacity: 0.85
        },
        {
          type: "line",
          x1: 1,
          y1: 16,
          x2: 8,
          y2: 10,
          stroke: "token:secondary",
          strokeWidth: 1,
          opacity: 0.6
        }
      ]
    },
    // tipIcon：iconFrame(tipAccent) + 对勾
    tipIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "circle", cx: 8, cy: 8, r: 7, fill: "token:status.tip.accent", opacity: 0.2 },
        { type: "circle", cx: 8, cy: 8, r: 7, stroke: "token:status.tip.accent", strokeWidth: 1.2 },
        {
          type: "path",
          d: "M5,8 L7.5,10.5 L11,6",
          stroke: "token:status.tip.accent",
          strokeWidth: 1.8,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ]
    },
    // warningIcon：iconFrame(warningAccent) + 感叹号
    warningIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "circle", cx: 8, cy: 8, r: 7, fill: "token:status.warning.accent", opacity: 0.2 },
        { type: "circle", cx: 8, cy: 8, r: 7, stroke: "token:status.warning.accent", strokeWidth: 1.2 },
        { type: "rect", x: 7, y: 4, w: 2, h: 5, rx: 1, fill: "token:status.warning.accent" },
        { type: "circle", cx: 8, cy: 11.5, r: 1, fill: "token:status.warning.accent" }
      ]
    },
    // infoIcon：iconFrame(infoAccent) + i
    infoIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "circle", cx: 8, cy: 8, r: 7, fill: "token:status.info.accent", opacity: 0.2 },
        { type: "circle", cx: 8, cy: 8, r: 7, stroke: "token:status.info.accent", strokeWidth: 1.2 },
        { type: "circle", cx: 8, cy: 4.5, r: 1, fill: "token:status.info.accent" },
        { type: "rect", x: 7, y: 6.5, w: 2, h: 6, rx: 1, fill: "token:status.info.accent" }
      ]
    },
    // dangerIcon：iconFrame(dangerAccent) + X
    dangerIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "circle", cx: 8, cy: 8, r: 7, fill: "token:status.danger.accent", opacity: 0.2 },
        { type: "circle", cx: 8, cy: 8, r: 7, stroke: "token:status.danger.accent", strokeWidth: 1.2 },
        {
          type: "path",
          d: "M5,5 L11,11 M11,5 L5,11",
          stroke: "token:status.danger.accent",
          strokeWidth: 1.8,
          strokeLinecap: "round"
        }
      ]
    },
    // stepBadge：软圆双环 + 数字
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      placeholders: ["N"],
      primitives: [
        { type: "circle", cx: 12, cy: 12, r: 11, fill: "token:primary", opacity: 0.22 },
        { type: "circle", cx: 12, cy: 12, r: 11, stroke: "token:primary", strokeWidth: 1.2 },
        {
          type: "text",
          x: 12,
          y: 17,
          content: "{N}",
          fontSize: 15,
          fontWeight: 700,
          fill: "token:primary",
          textAnchor: "middle"
        }
      ]
    }
  },
  // ============================================================
  // 骨架变体（life-aesthetic 之前未显式声明 → 保持 DEFAULT_VARIANTS）
  // ============================================================
  variants: {
    admonition: "bubble-organic",
    // 全主题签名：大圆角气泡 + 单侧柔软阴影，手绘信笺气质（取代工业网格矩阵的 accent-bar）
    quote: "magazine-dropcap",
    // 散文体首字下沉引号，与生活化叙事节奏匹配
    compare: "stacked-row",
    // 慢生活偏陈述：先 A 再 B，避免双列拥挤
    steps: "step-card",
    // 浅底卡片化分步，手绘信笺式分章
    divider: "flower",
    // 装饰叶片分隔，与 bubble-organic 同手绘语汇
    sectionTitle: "ribbon-stamp",
    // 左侧手绘戳记 + 标题，慢生活刊物章名
    codeBlock: "inline-card",
    // 偶引代码用 tinted 软底卡，与正文同色族
    note: "dotted-margin",
    // dotted 左竖线 + 缩进，散文页边批注，比 minimal-callout 更"手记"
    footnotes: "boxed-aside",
    // 软底卡片 + pill kicker，narrative aside
    recommend: "card-list",
    qrcode: "bare",
    footerCTA: "button-led",
    pullQuote: "giant-mark",
    announcement: "danger-bar",
    tableCard: "rule-grid",
    gallery: "duo",
    dialogue: "qa-rows",
    qaBlock: "numbered-faq"
  },
  // ============================================================
  // 元素级样式
  // ============================================================
  elements: {
    // 展签标题：字重 500（不 700）+ 大字距，杂志页眉的"稀疏克制"感
    h1: {
      "font-size": "24px",
      "font-weight": "500",
      color: "#3a2d20",
      "margin-top": "32px",
      "margin-bottom": "18px",
      "line-height": "1.45",
      "letter-spacing": "3px",
      "text-align": "center"
    },
    h2: {
      "font-size": "20px",
      "font-weight": "600",
      color: "#3a2d20",
      "margin-top": "30px",
      "margin-bottom": "14px",
      "line-height": "1.5",
      "padding-bottom": "6px",
      "border-bottom": "2px dotted #d98141"
    },
    // 条目级：与正文同字号，靠字重 600 + 字距区分，不加装饰
    h3: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#3a2d20",
      "margin-top": "24px",
      "margin-bottom": "10px",
      "line-height": "1.6",
      "letter-spacing": "1.2px"
    },
    // 四级标题：与正文并排、靠字重 600 轻描淡写，不抢戏
    h4: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#7a6a58",
      "margin-top": "18px",
      "margin-bottom": "8px",
      "line-height": "1.6",
      "letter-spacing": "0.8px"
    },
    h5: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#7a6a58",
      "margin-top": "16px",
      "margin-bottom": "6px",
      "line-height": "1.6",
      "letter-spacing": "1px"
    },
    h6: {
      "font-size": "13px",
      "font-weight": "500",
      color: "#7a6a58",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.55",
      "letter-spacing": "1.5px",
      "text-transform": "uppercase"
    },
    // 正文杂志行高 1.85（书斋是 2.0，这里略收紧）+ 字距 0.8px（不拉开）
    p: {
      "font-size": "15px",
      "line-height": "1.85",
      color: "#3a2d20",
      "margin-top": "0",
      "margin-bottom": "22px",
      "letter-spacing": "0.8px"
    },
    blockquote: {
      "border-left": "4px solid #d98141",
      "background-color": "#f2ead8",
      color: "#7a6a58",
      "padding-top": "14px",
      "padding-right": "18px",
      "padding-bottom": "14px",
      "padding-left": "18px",
      "margin-top": "0",
      "margin-bottom": "22px",
      "border-radius": "10px",
      "font-style": "italic",
      "letter-spacing": "0.6px"
    },
    // 列表：行距宽松（生活清单需要呼吸感）
    ul: { "padding-left": "20px", "margin-top": "0", "margin-bottom": "22px" },
    ol: { "padding-left": "20px", "margin-top": "0", "margin-bottom": "22px" },
    li: {
      "margin-bottom": "10px",
      "line-height": "1.85",
      color: "#3a2d20",
      "letter-spacing": "0.6px"
    },
    // 强调：字重 600（不 700）+ 同文字色，克制不广告感
    strong: { "font-weight": "600", color: "#3a2d20" },
    em: { "font-style": "italic", color: "#7a6a58" },
    // 链接：走主色暖橙，下划线保持可识别
    a: { color: "#d98141", "text-decoration": "underline" },
    // 分割线：细发丝、暖边框色，上下留白比 default 大
    hr: {
      border: "none",
      height: "1px",
      "background-color": "#e0d1ba",
      "margin-top": "28px",
      "margin-bottom": "28px"
    },
    // 图片：软圆角（10px，不是 0 直角也不是 6px 教程感）
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "12px",
      "margin-right": "auto",
      "margin-bottom": "12px",
      "margin-left": "auto",
      "border-radius": "10px"
    },
    pre: {
      "background-color": "#fffaef",
      color: "#3a2d20",
      "padding-top": "14px",
      "padding-right": "16px",
      "padding-bottom": "14px",
      "padding-left": "16px",
      "border-radius": "10px",
      border: "1px solid #e0d1ba",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "box-shadow": "inset -14px 0 10px -10px rgba(90,60,30,0.18)",
      "margin-top": "0",
      "margin-bottom": "20px",
      "font-size": "13px",
      "line-height": "1.7"
    },
    code: {
      "background-color": "#f3e4cc",
      color: "#b96234",
      padding: "2px 6px",
      "border-radius": "4px",
      "font-size": "14px"
    },
    // 柔键：bgSoft 暖米底 + 大圆角 (radius.md=12px) + 不对称边框（底边加重代替 box-shadow），手账标签感
    kbd: {
      display: "inline-block",
      "background-color": "#f2ead8",
      color: "#3a2d20",
      "border-top": "1px solid #e0d1ba",
      "border-right": "1px solid #e0d1ba",
      "border-bottom": "2px solid #d98141",
      "border-left": "1px solid #e0d1ba",
      "border-radius": "12px",
      padding: "1px 8px",
      "font-size": "12px",
      "line-height": "1.4",
      "vertical-align": "middle"
    },
    // 慢生活柔表：radius.md 圆角 + textMuted serif 色系 + 弱 border（行间 hairline，无列框）
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "22px",
      "font-size": "14px"
    },
    th: {
      "border-bottom": "1.5px solid #d98141",
      "border-top": "none",
      "border-left": "none",
      "border-right": "none",
      padding: "8px 12px",
      "background-color": "transparent",
      "text-align": "left",
      "font-weight": "600",
      color: "#3a2d20",
      "letter-spacing": "0.5px"
    },
    td: {
      "border-bottom": "1px solid #e0d1ba",
      "border-top": "none",
      "border-left": "none",
      "border-right": "none",
      padding: "8px 12px",
      color: "#3a2d20"
    }
  },
  // ============================================================
  // 内联强调：暖米底 + 主色调，避开 default 的 #fff4c8 黄
  // ============================================================
  inline: {
    // 暖奶油 highlight：复用 warning.soft 米黄，与 bgSoft 同体温不刺眼
    highlight: {
      "background-color": "#fcf1dc",
      color: "#3a2d20",
      padding: "0 4px",
      "border-radius": "3px"
    },
    // 波浪线走 accent 暖黄
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#efb758",
      "text-underline-offset": "3px"
    },
    // 着重：primary 暖橙 + 600 字重，比 strong 更亮但仍不刺眼
    emphasis: {
      color: "#d98141",
      "font-weight": "600"
    },
    del: {
      color: "#7a6a58",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#d98141",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器视觉
  // ============================================================
  containers: {
    // 短札引子：大 padding + 暖底 + 无边框，靠留白定义空间
    intro: {
      "background-color": "#f2ead8",
      "border-radius": "10px",
      padding: "20px 22px",
      margin: "0 0 28px 0",
      color: "#7a6a58",
      "letter-spacing": "0.8px",
      "line-height": "1.85"
    },
    // 署名：左侧 3px 暖橙竖条 + 无底色无圆角
    author: {
      "border-left": "3px solid #d98141",
      "background-color": "transparent",
      "border-radius": "0",
      padding: "6px 0 6px 14px",
      margin: "18px 0",
      color: "#3a2d20",
      "font-size": "14px"
    },
    // 扉页：宽松外边距，图片软圆角由 img 元素接管
    cover: {
      margin: "0 0 32px 0"
    },
    // §章节标题（bordered variant）：variant 接管 2px primary 底线，这里给宽松外边距
    sectionTitle: {
      margin: "32px 0 16px",
      "padding-bottom": "6px"
    },
    // Do/Don't 对照（column-card variant 接管列卡形态）
    compare: { margin: "24px 0" },
    // 步骤（number-circle variant 接管圆圈数字）
    steps: { margin: "24px 0" },
    // 时间线：长日子记账感，留宽外边距让节奏舒缓
    timeline: { margin: "24px 0" },
    // 提示四件套：variant 接管外壳，此处仅声明以计入 voice 覆盖
    // 各自 soft 底色由 status token 驱动，靠 variant 形状差异区分
    tip: {
      "background-color": "#eef3e4",
      "border-radius": "8px",
      padding: "14px 18px",
      margin: "18px 0"
    },
    warning: {
      "background-color": "#fcf1dc",
      "border-radius": "8px",
      padding: "14px 18px",
      margin: "18px 0"
    },
    info: {
      "background-color": "#e6edf3",
      "border-radius": "8px",
      padding: "14px 18px",
      margin: "18px 0"
    },
    danger: {
      "background-color": "#f8e1dc",
      "border-radius": "8px",
      padding: "16px 18px",
      margin: "18px 0"
    },
    // 小记：无框无底色，仅左侧内缩，像书边的铅笔标注
    note: {
      __reset: true,
      "background-color": "transparent",
      padding: "4px 0 4px 20px",
      margin: "16px 0",
      "border-radius": "0"
    },
    quoteCard: {
      "background-color": "#fffaf1",
      padding: "22px 20px",
      margin: "22px 0",
      "border-radius": "12px",
      border: "1px dashed #e0d1ba"
    },
    // 重音段：大内缩 + 字号升 1px + 无底色，靠留白和字距自然"抬头"
    highlight: {
      "background-color": "transparent",
      padding: "8px 28px",
      margin: "22px 0",
      "border-radius": "0",
      "font-size": "16px",
      "font-weight": "500",
      "letter-spacing": "1px"
    },
    // 卷末：宽松上下 padding + 无底色，与正文保持同一"白纸"底
    footerCTA: {
      margin: "32px 0",
      padding: "28px 0 20px 0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    // 书单：暖底 + 内缩，与 intro 同血统但更紧凑
    recommend: {
      margin: "24px 0",
      padding: "18px 22px",
      "background-color": "#f2ead8",
      "border-radius": "10px"
    },
    // 印章位：居中底色 + 细边框内衬，让 QR code 落在暖底上
    qrcode: {
      margin: "28px 0",
      padding: "18px",
      "background-color": "#faf6f0",
      "border-radius": "10px"
    },
    // 柔图注：居中 serif 色系小字 + 字距 0 + textMuted 弱化，暖米底上的轻描淡写
    imageCaption: {
      margin: "6px 0 20px",
      "text-align": "center",
      "font-size": "12px",
      color: "#7a6a58",
      "font-style": "italic",
      "letter-spacing": "0",
      "line-height": "1.6"
    },
    // 慢生活作者卡：圆角软底 + 暖橙顶线，scrapbook 签名感
    authorBio: {
      __reset: true,
      "background-color": "#f2ead8",
      "border-top": "2px solid #d98141",
      "border-radius": "12px",
      padding: "18px 20px",
      margin: "28px 0",
      color: "#3a2d20"
    }
  },
  signatureContainers: [
    "imageCaption",
    // 柔图注（居中 italic textMuted 小字）
    "authorBio"
    // 慢生活作者卡（圆角软底 + 暖橙顶线）
  ],
  // ============================================================
  // 模板覆盖（原 index.ts 的 cover / authorBar）
  // ============================================================
  templates: {
    cover: `::: cover 本期主题
![封面占位](https://placehold.co/1200x630?text=life)

_一盏茶、一扇窗、一些可以慢下来的小事。_
:::
`,
    authorBar: `::: author 如初 role=生活作者
写于一个有风的下午。

记录日常、饭桌与缓慢的季节。
:::
`
  },
  meta: {
    createdAt: "2026-04-20",
    ownerNotes: "11 件 SVG motif 全部 AST 化；dividerDots 的 4 组 rotated group 静态展开；iconFrame helper 已在 4 个图标内联。"
  }
};
const spec$d = {
  id: "business-finance",
  name: "硬核财经",
  description: "深栗墨 + 内参蓝，研究所内参版面，数字与判断优先",
  audience: "财经内参 / 研究所 newsletter（FT 中文、财新周刊、Bloomberg Terminal、HBR）",
  // ============================================================
  // 色板（规范 §1.1 · B 版：深栗墨为主，红留给涨/险）
  // ============================================================
  palette: {
    // 规范 §1.1：深栗墨为主（红只留给"涨/险"），降低整体视觉重量
    primary: "#2a1a14",
    // 规范 §1.1：内参蓝（略降饱和，研究部权威感）
    secondary: "#0e3654",
    // 规范 §1.1：琥珀黄（降饱和避月饼盒金）—— 数字 .num 下划、同比箭头、stepBadge 底条
    accent: "#b8821f",
    // 规范 §1.1：纯白在 SVG 光栅会被微信转透明 —— 平台级纪律用 #fefefe
    bg: "#fefefe",
    // 规范 §1.1：FT 新闻纸米方向但收敛，不走粉走"旧纸米"
    bgSoft: "#f3f1ec",
    // 档案袋灰：bgSoft 深 6%，留给代码底、compare 表头
    bgMuted: "#e6e2d8",
    // 规范 §1.1：内参墨 —— 再压深一档，比所有装饰色都深
    text: "#0f141b",
    // 批注灰（微调偏冷）
    textMuted: "#56606e",
    // 反白：规避 #fff 平台透明化
    textInverse: "#fefefe",
    // 版框线：暖灰与新米底配套
    border: "#d0cec8",
    // 规范 §1.1：**拒绝让红色承担代码色** —— code 走 secondary 内参蓝
    code: "#0e3654"
  },
  // 语义四色（规范 §1.1 纪律：色相距 60°+，warning 脱离红系，对比度全部 ≥ AA）
  status: {
    tip: { accent: "#1f4f6b", soft: "#dfe8ee" },
    // 要点 Key Takeaway（钢青，7.8:1）
    info: { accent: "#3d5a75", soft: "#dde4ec" },
    // 补注 Memo（烟蓝，5.6:1）
    warning: { accent: "#7e5a12", soft: "#f1e8d1" },
    // 风险提示 Risk Note（琥珀，~5.0:1 WCAG AA 正文达标）
    danger: { accent: "#9a1b20", soft: "#f0dadc" }
    // 警报 Alert（深朱，6.8:1）
  },
  // ============================================================
  // 字号 / 间距 / 圆角（规范 §1.2 / §3.9）
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.75,
    h1Size: 26,
    h2Size: 21,
    h3Size: 17,
    letterSpacing: 0.3
  },
  spacing: { paragraph: 16, section: 28, listItem: 6, containerPadding: 14 },
  // 规范 §3.9：硬核财经 0/2/4，radius ≥ 6 直接打回
  radius: { sm: 0, md: 2, lg: 4 },
  // ============================================================
  // Motifs（规范 §1.3 · 11 件：研报图表 & 内参装帧）
  // ============================================================
  motifs: {
    // ---------- ① h2Prefix · legend 色块 + 辅横条 ---------- //
    // 主块 3×13 primary 深栗墨 + 辅块 14×3 secondary opacity 0.75（figure legend）
    h2Prefix: {
      viewBox: [0, 0, 18, 18],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      primitives: [
        { type: "rect", x: 0, y: 2, w: 3, h: 13, fill: "token:primary" },
        { type: "rect", x: 4, y: 7, w: 14, h: 3, fill: "token:secondary", opacity: 0.75 }
      ]
    },
    // ---------- ② dividerWave · K 线 V 型走势（瑰宝） ---------- //
    // 前 5 根下压 + 后 4 根反弹；红蓝交替；柱宽 4px，stroke-width 1.0
    // 基线 stroke-width 按规范原 0.8 提到 1.0（平台光栅化 < 1 会失真）
    dividerWave: {
      viewBox: [0, 0, 240, 20],
      width: 220,
      height: 20,
      primitives: [
        { type: "line", x1: 0, y1: 10, x2: 240, y2: 10, stroke: "token:border", strokeWidth: 1 },
        // bar 1 (x=70, cy=6, danger)
        { type: "line", x1: 72, y1: 2, x2: 72, y2: 10, stroke: "token:status.danger.accent", strokeWidth: 1 },
        { type: "rect", x: 70, y: 4, w: 4, h: 4, fill: "token:status.danger.accent" },
        // bar 2 (x=82, cy=8, secondary)
        { type: "line", x1: 84, y1: 4, x2: 84, y2: 12, stroke: "token:secondary", strokeWidth: 1 },
        { type: "rect", x: 82, y: 6, w: 4, h: 4, fill: "token:secondary" },
        // bar 3 (x=94, cy=10, danger)
        { type: "line", x1: 96, y1: 6, x2: 96, y2: 14, stroke: "token:status.danger.accent", strokeWidth: 1 },
        { type: "rect", x: 94, y: 8, w: 4, h: 4, fill: "token:status.danger.accent" },
        // bar 4 (x=106, cy=12, secondary)
        { type: "line", x1: 108, y1: 8, x2: 108, y2: 16, stroke: "token:secondary", strokeWidth: 1 },
        { type: "rect", x: 106, y: 10, w: 4, h: 4, fill: "token:secondary" },
        // bar 5 (x=118, cy=14, danger)  ← V 底
        { type: "line", x1: 120, y1: 10, x2: 120, y2: 18, stroke: "token:status.danger.accent", strokeWidth: 1 },
        { type: "rect", x: 118, y: 12, w: 4, h: 4, fill: "token:status.danger.accent" },
        // bar 6 (x=130, cy=12, secondary)
        { type: "line", x1: 132, y1: 8, x2: 132, y2: 16, stroke: "token:secondary", strokeWidth: 1 },
        { type: "rect", x: 130, y: 10, w: 4, h: 4, fill: "token:secondary" },
        // bar 7 (x=142, cy=10, danger)
        { type: "line", x1: 144, y1: 6, x2: 144, y2: 14, stroke: "token:status.danger.accent", strokeWidth: 1 },
        { type: "rect", x: 142, y: 8, w: 4, h: 4, fill: "token:status.danger.accent" },
        // bar 8 (x=154, cy=8, secondary)
        { type: "line", x1: 156, y1: 4, x2: 156, y2: 12, stroke: "token:secondary", strokeWidth: 1 },
        { type: "rect", x: 154, y: 6, w: 4, h: 4, fill: "token:secondary" },
        // bar 9 (x=166, cy=6, danger)
        { type: "line", x1: 168, y1: 2, x2: 168, y2: 10, stroke: "token:status.danger.accent", strokeWidth: 1 },
        { type: "rect", x: 166, y: 4, w: 4, h: 4, fill: "token:status.danger.accent" }
      ]
    },
    // ---------- ③ dividerDots · 紧凑 3 方块（红/蓝/红） ---------- //
    dividerDots: {
      viewBox: [0, 0, 240, 10],
      width: 220,
      height: 10,
      primitives: [
        { type: "rect", x: 108, y: 3, w: 4, h: 4, fill: "token:status.danger.accent" },
        { type: "rect", x: 118, y: 3, w: 4, h: 4, fill: "token:secondary" },
        { type: "rect", x: 128, y: 3, w: 4, h: 4, fill: "token:status.danger.accent" }
      ]
    },
    // ---------- ④ dividerFlower · 章节编号 Sec. I ---------- //
    // 双线夹中央 text 标签；font-size 14（光栅下限），letter-spacing 1.5
    dividerFlower: {
      viewBox: [0, 0, 240, 20],
      width: 220,
      height: 16,
      primitives: [
        { type: "line", x1: 4, y1: 10, x2: 96, y2: 10, stroke: "token:border", strokeWidth: 1 },
        { type: "line", x1: 144, y1: 10, x2: 236, y2: 10, stroke: "token:border", strokeWidth: 1 },
        {
          type: "text",
          x: 120,
          y: 14,
          content: "Sec. I",
          fontSize: 14,
          fontWeight: 600,
          fill: "token:textMuted",
          textAnchor: "middle",
          letterSpacing: 1.5
        }
      ]
    },
    // ---------- ⑤ quoteMark · 方头锐利引号（primary 栗墨，opacity 0.5） ---------- //
    quoteMark: {
      viewBox: [0, 0, 40, 32],
      width: 34,
      height: 28,
      inlineStyle: { display: "inline-block", verticalAlign: "top", marginRight: 4 },
      primitives: [
        {
          type: "path",
          d: "M4,6 L4,14 L8,14 L8,20 L14,20 L14,6 Z M22,6 L22,14 L26,14 L26,20 L32,20 L32,6 Z",
          fill: "token:primary",
          opacity: 0.5
        }
      ]
    },
    // ---------- ⑥ sectionCorner · L 形直角 + accent 3×3 方块 ---------- //
    sectionCorner: {
      viewBox: [0, 0, 18, 18],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "path", d: "M0,0 L6,0 L6,3 L3,3 L3,18 L0,18 Z", fill: "token:primary" },
        { type: "rect", x: 9, y: 14, w: 3, h: 3, fill: "token:accent" }
      ]
    },
    // ---------- ⑦ tipIcon · 方框 + ✓（建议采纳） ---------- //
    tipIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 1, y: 1, w: 14, h: 14, stroke: "token:status.tip.accent", strokeWidth: 1.5 },
        {
          type: "path",
          d: "M4,8 L7,11 L12,5",
          stroke: "token:status.tip.accent",
          strokeWidth: 1.8,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ]
    },
    // ---------- ⑧ warningIcon · 方框 + !（上长下短） ---------- //
    warningIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 1, y: 1, w: 14, h: 14, stroke: "token:status.warning.accent", strokeWidth: 1.5 },
        { type: "rect", x: 7, y: 3, w: 2, h: 7, fill: "token:status.warning.accent" },
        { type: "rect", x: 7, y: 11, w: 2, h: 2, fill: "token:status.warning.accent" }
      ]
    },
    // ---------- ⑨ infoIcon · 方框 + i（上短下长 · 与 warning 镜像） ---------- //
    infoIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 1, y: 1, w: 14, h: 14, stroke: "token:status.info.accent", strokeWidth: 1.5 },
        { type: "rect", x: 7, y: 3, w: 2, h: 2, fill: "token:status.info.accent" },
        { type: "rect", x: 7, y: 6, w: 2, h: 7, fill: "token:status.info.accent" }
      ]
    },
    // ---------- ⑩ dangerIcon · 方框 + ×（勘误感） ---------- //
    dangerIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 1, y: 1, w: 14, h: 14, stroke: "token:status.danger.accent", strokeWidth: 1.5 },
        {
          type: "path",
          d: "M4,4 L12,12 M12,4 L4,12",
          stroke: "token:status.danger.accent",
          strokeWidth: 1.8,
          strokeLinecap: "round"
        }
      ]
    },
    // ---------- ⑪ stepBadge · 正方形钤印（primary 底 + accent 底条 + #fefefe 数字） ---------- //
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      placeholders: ["N"],
      primitives: [
        { type: "rect", x: 1, y: 1, w: 22, h: 22, fill: "token:primary" },
        { type: "rect", x: 1, y: 20, w: 22, h: 3, fill: "token:accent" },
        {
          type: "text",
          x: 12,
          y: 16,
          content: "{N}",
          fontSize: 15,
          fontWeight: 700,
          fill: "token:textInverse",
          textAnchor: "middle"
        }
      ]
    }
  },
  // ============================================================
  // 骨架变体（规范 §2）
  // ============================================================
  variants: {
    admonition: "ledger-cell",
    // 全主题签名：Bloomberg Terminal 风表头条 + 硬边框数据单元
    quote: "frame-brackets",
    // 四角 L 形 + attribution 位
    compare: "ledger",
    // 账本双列
    steps: "timeline-dot",
    // 阶段时间轴
    divider: "wave",
    // K 线瑰宝
    sectionTitle: "cornered",
    // 左上 L 形角标
    codeBlock: "bare",
    // 安静处理
    note: "box-callout",
    // 1px 边框的"附注"块，与 ledger-cell 硬边框语言一致
    footnotes: "top-rule",
    // 财新简报式：顶部 hairline + 密栏小字，与 ledger 账本表语言一致
    recommend: "card-list",
    qrcode: "bare",
    footerCTA: "button-led",
    pullQuote: "giant-mark",
    announcement: "danger-bar",
    tableCard: "rule-grid",
    gallery: "duo",
    dialogue: "qa-rows",
    qaBlock: "numbered-faq"
  },
  // ============================================================
  // 元素级样式（规范 §1.2 typographic voice）
  // ============================================================
  elements: {
    // 规范 §1.2：h1 26 / 800 / 0.5 / 1.35
    h1: {
      "font-size": "26px",
      "font-weight": "800",
      color: "#0f141b",
      "margin-top": "28px",
      "margin-bottom": "16px",
      "line-height": "1.35",
      "letter-spacing": "0.5px"
    },
    // 规范 §1.2：h2 21 / 700 / 0.3 / 1.4 + 4px 左 primary 栗墨竖条
    h2: {
      "font-size": "21px",
      "font-weight": "700",
      color: "#0f141b",
      "margin-top": "28px",
      "margin-bottom": "12px",
      "line-height": "1.4",
      "letter-spacing": "0.3px",
      "padding-left": "8px",
      "border-left": "4px solid #2a1a14",
      "border-bottom": "none",
      "padding-bottom": "0"
    },
    h3: {
      "font-size": "17px",
      "font-weight": "700",
      color: "#0f141b",
      "margin-top": "24px",
      "margin-bottom": "10px",
      "line-height": "1.5",
      "letter-spacing": "0.2px"
    },
    h4: {
      "font-size": "15px",
      "font-weight": "700",
      color: "#0f141b",
      "margin-top": "18px",
      "margin-bottom": "8px",
      "line-height": "1.5"
    },
    h5: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#0f141b",
      "margin-top": "16px",
      "margin-bottom": "6px",
      "line-height": "1.5",
      "letter-spacing": "0.2px"
    },
    h6: {
      "font-size": "13px",
      "font-weight": "600",
      color: "#56606e",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.5",
      "letter-spacing": "1px",
      "text-transform": "uppercase"
    },
    p: {
      "font-size": "15px",
      "line-height": "1.75",
      color: "#0f141b",
      "margin-top": "0",
      "margin-bottom": "16px",
      "letter-spacing": "0.3px"
    },
    // 规范 §2.5 quote（裸 blockquote）：column-rule 气质 —— 双侧 1px secondary 竖线
    blockquote: {
      "border-left": "1px solid #0e3654",
      "border-right": "1px solid #0e3654",
      "background-color": "transparent",
      color: "#56606e",
      "padding-top": "8px",
      "padding-right": "20px",
      "padding-bottom": "8px",
      "padding-left": "20px",
      "margin-top": "0",
      "margin-bottom": "16px",
      "border-radius": "0",
      "letter-spacing": "0.5px"
    },
    ul: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "16px" },
    ol: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "16px" },
    li: {
      "margin-bottom": "6px",
      "line-height": "1.75",
      color: "#0f141b",
      "letter-spacing": "0.3px"
    },
    // 规范 §1.2：`<strong>` 字重 600（不是 800）
    strong: { "font-weight": "600", color: "#2a1a14" },
    em: { "font-style": "italic", color: "#0f141b" },
    // 链接走 secondary（不走 primary 标题位）
    a: {
      color: "#0e3654",
      "text-decoration": "underline",
      "text-underline-offset": "3px"
    },
    hr: {
      border: "none",
      height: "1px",
      "background-color": "#d0cec8",
      "margin-top": "24px",
      "margin-bottom": "24px"
    },
    // 规范 §2.3 cover：图片极窄圆角 2px
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "10px",
      "margin-right": "auto",
      "margin-bottom": "10px",
      "margin-left": "auto",
      "border-radius": "2px"
    },
    pre: {
      "background-color": "#e6e2d8",
      color: "#0f141b",
      "padding-top": "14px",
      "padding-right": "16px",
      "padding-bottom": "14px",
      "padding-left": "16px",
      "border-radius": "2px",
      border: "1px solid #d0cec8",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "box-shadow": "inset -14px 0 10px -10px rgba(0,0,0,0.18)",
      "margin-top": "0",
      "margin-bottom": "18px",
      "font-size": "13px",
      "line-height": "1.6"
    },
    // 规范 §1.1：inline code = bgMuted 底 + secondary 内参蓝字（不是红）
    code: {
      "background-color": "#e6e2d8",
      color: "#0e3654",
      padding: "1px 5px",
      "border-radius": "2px",
      "font-size": "14px"
    },
    // Bloomberg Terminal / 财经账本表格：radius 0 直角 + 紧凑 padding + tabular nums 感
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "18px",
      "font-size": "13px",
      "border-radius": "0"
    },
    th: {
      "background-color": "#2a1a14",
      // primary 深栗墨反白表头（账本记账栏）
      color: "#fefefe",
      border: "1px solid #d0cec8",
      "border-bottom": "none",
      padding: "5px 10px",
      "font-weight": "700",
      "text-align": "left",
      "letter-spacing": "0.3px"
    },
    td: {
      border: "none",
      "border-bottom": "1px solid #d0cec8",
      // 行间 hairline + 无侧线（账本紧凑直角）
      padding: "5px 10px",
      color: "#0f141b",
      "font-variant-numeric": "tabular-nums"
    },
    // 财经稿少用 kbd，给"账本表单元格"风 — radius 0 直角 + 等宽紧凑
    kbd: {
      display: "inline-block",
      "background-color": "#e6e2d8",
      color: "#0f141b",
      border: "1px solid #d0cec8",
      "border-radius": "0",
      padding: "1px 5px",
      "font-size": "12px",
      "line-height": "1.4",
      "letter-spacing": "0",
      "vertical-align": "middle"
    }
  },
  // ============================================================
  // 内联强调（规范 §3.7 highlight 纪律 + §1.2 波浪线）
  // ============================================================
  inline: {
    // 规范 §3.7：highlight 从 accent 琥珀 **降饱和** 到 warning.soft 米黄
    highlight: {
      "background-color": "#f1e8d1",
      color: "#0f141b",
      padding: "0 4px",
      "border-radius": "0"
    },
    // 波浪线走 primary 栗墨
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#2a1a14",
      "text-underline-offset": "3px"
    },
    // 关键词强调走 primary + 600
    emphasis: {
      color: "#2a1a14",
      "font-weight": "600"
    },
    del: {
      color: "#56606e",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#2a1a14",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器视觉（规范 §2）
  // ============================================================
  containers: {
    // 规范 §2.1 intro：Abstract 研报摘要 —— 左 3px secondary 竖条 + 左内缩 + bgSoft 底
    intro: {
      "background-color": "#f3f1ec",
      "border-left": "3px solid #0e3654",
      "border-radius": "0",
      padding: "12px 16px 12px 17px",
      margin: "0 0 24px 0",
      color: "#0f141b"
    },
    // 规范 §2.2 author：inline-block 冷方块 + bgMuted 底 + 2px accent 栏目色标竖条
    author: {
      display: "inline-block",
      "background-color": "#e6e2d8",
      "border-left": "2px solid #b8821f",
      "border-radius": "0",
      padding: "4px 10px",
      margin: "0 0 16px 0",
      color: "#56606e",
      "font-size": "13px",
      "letter-spacing": "0.3px"
    },
    // 规范 §2.3 cover：margin 下推 28
    cover: {
      margin: "0 0 28px 0"
    },
    // 四态容器外壳（variant 接管）
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // box-callout variant 接管 border + padding；voice 注入"金条顶端 inset + 微圆角"——
    // 与 ledger-cell admonition 的"Bloomberg Terminal 表头条"语言呼应（accent 钤金线）
    note: { "box-shadow": "inset 0 2px 0 #b8821f", "border-radius": "2px" },
    // 规范 §2.6 quoteCard：核心判断 —— frame-brackets + bgSoft 底 + radius 2
    quoteCard: {
      "background-color": "#f3f1ec",
      padding: "26px 28px",
      margin: "24px 0",
      "border-radius": "2px"
    },
    // 规范 §2 highlight（数据卡 primitive）
    highlight: {
      "background-color": "#fefefe",
      padding: "18px 20px",
      margin: "20px 0",
      "border-radius": "2px",
      border: "1px solid #d0cec8"
    },
    // 规范 §2.15 compare：ledger 账本
    compare: { margin: "24px 0" },
    // 规范 §2.16 steps：阶段时间轴
    steps: { margin: "24px 0" },
    // 规范 §2.4 sectionTitle：cornered variant；__reset 丢弃通栏 border-bottom
    sectionTitle: {
      __reset: true,
      margin: "40px 0 18px"
    },
    // 规范 §2.7 footerCTA：FT 订阅条 —— 上下各 1.5px primary 通栏横线
    footerCTA: {
      margin: "32px 0 0 0",
      padding: "20px",
      "background-color": "transparent",
      "border-top": "1.5px solid #2a1a14",
      "border-bottom": "1.5px solid #2a1a14",
      "border-radius": "0"
    },
    // 规范 §2.8 recommend：延伸阅读 —— bgSoft 底 + radius 2
    recommend: {
      margin: "24px 0",
      padding: "14px 18px",
      "background-color": "#f3f1ec",
      "border-radius": "2px"
    },
    abstract: {
      "background-color": "#f3f1ec",
      "border-left": "4px solid #2a1a14",
      padding: "12px 14px 12px 16px",
      margin: "18px 0 24px",
      "border-radius": "0"
    },
    keyNumber: {
      "background-color": "#f3f1ec",
      "border-top": "3px solid #2a1a14",
      padding: "14px 16px",
      margin: "18px 0",
      "border-radius": "0"
    },
    // 规范 §2.9 qrcode：居中 block，容器无底色无边框
    qrcode: {
      margin: "28px auto",
      padding: "0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    // "Source: 央行 2026Q1 · n=1432" 数据图注风 — textMuted serif 紧凑（FT 图表来源标注）
    imageCaption: {
      margin: "4px 0 16px 0",
      "text-align": "left",
      "font-size": "11px",
      color: "#56606e",
      "letter-spacing": "0.2px",
      "padding-top": "4px",
      "border-top": "1px solid #d0cec8"
    },
    // 宏观政策时间轴：上下 1.5px primary 横线 + 无底色（与 footerCTA 同语汇）
    timeline: {
      margin: "24px 0",
      "border-top": "1.5px solid #2a1a14",
      "border-bottom": "1.5px solid #2a1a14",
      padding: "18px 0",
      "background-color": "transparent"
    }
  },
  // 签名容器：abstract（报告摘要）+ keyNumber（大数字数据栏，财报核心）
  signatureContainers: ["abstract", "keyNumber"],
  // ============================================================
  // Templates（仅声明覆盖键；commonTemplates 被 specToTheme 隐式合并为基线）
  // ============================================================
  templates: {
    // 规范 §2.3 cover：专题头 + 核心判断断言
    cover: `::: cover 本期议题 · 专题标题
![封面占位](https://placehold.co/1200x630?text=business-finance)

**核心判断**：一句话把观点说清楚。正文不含 emoji、不带感叹号、不用荧光色。
:::
`,
    // 规范 §2.2 author：冷署名条
    authorBar: `::: author 研究员 · 张某某
2026Q1 · 阅读时长 8 分钟
:::
`,
    // 规范 §2.10 tip 签名：accent-bar + "要点"中文
    tip: `::: tip 要点
本期核心结论。不吹票、不带节奏、不用感叹号。
:::
`,
    // 规范 §2.7 footerCTA：FT 订阅条
    footerCTA: `::: footer-cta 关注「硬核财经」
不吹票、不带节奏，只讲值得下判断的数据。
:::
`
  },
  meta: {
    createdAt: "2026-04-20",
    ownerNotes: "dividerWave 基线 stroke-width 1.0（平台光栅化与 validator MIN_STROKE_WIDTH 硬下限）。"
  }
};
const spec$c = {
  id: "data-brief",
  name: "数据简报",
  description: "数据蓝 + 黑底代码 + 直角硬边：晚点 / 财新数据 / Morning Brew 感",
  audience: "数据 newsletter / 数据简报 / 行业图表周刊",
  // ============================================================
  // 色板（来源：docs/themes-specs/themes/11-data-brief.html :root tokens）
  // ============================================================
  palette: {
    primary: "#1756d1",
    // 数据蓝（签名色 · kicker / 边框 / 数字下划）
    secondary: "#111418",
    // 近黑（masthead 下划线 / quote 左条 / section-tag bg）
    accent: "#1756d1",
    // = primary（data-brief 视觉里 accent 不独立）
    bg: "#ffffff",
    // 纯白底（外层 body 走 bgMuted）
    bgSoft: "#f5f7fa",
    // 卡片底面（toc / note.research-dense / data-card）
    bgMuted: "#eef0f2",
    // 外层衬底色（bar track / 外层 body bg）
    text: "#111418",
    // 近黑文字
    textMuted: "#5a6068",
    // 辅助文字（monospace 标注 / 副标题）
    textInverse: "#fefefe",
    // 反白（规避 SVG → PNG 透明化）
    border: "#e5e7eb",
    // 分割线
    code: "#1756d1"
    // inline code 蓝字（数据感）
  },
  // 语义四色（与设计稿 multi-callout INFO/TIP/WARN/STOP 同色相，accent 加深至 WCAG AA 4.5:1 达标）
  status: {
    tip: { accent: "#147a44", soft: "#dff1e6" },
    // TIP 绿（4.58:1）
    info: { accent: "#1756d1", soft: "#dfe9fa" },
    // INFO 蓝（= primary，5.5:1）
    warning: { accent: "#9e5c10", soft: "#faecd9" },
    // WARN 橙（4.53:1）
    danger: { accent: "#b22d18", soft: "#fbdcd6" }
    // STOP 红（4.97:1）
  },
  // ============================================================
  // 字号 / 间距 / 圆角（直角是简报的灵魂）
  // ============================================================
  typography: {
    baseSize: 14,
    lineHeight: 1.7,
    h1Size: 22,
    // 微信原生标题已渲 22 加粗黑 —— 本主题不再输出 H1
    h2Size: 16,
    // 章节标题（蓝色序号 + 粗黑）
    h3Size: 13,
    // 子标题
    letterSpacing: 0.3
  },
  spacing: { paragraph: 12, section: 28, listItem: 4, containerPadding: 14 },
  radius: { sm: 0, md: 0, lg: 0 },
  // 全 0 —— radius ≥ 1 直接打回
  // ============================================================
  // Decorations：作者只写 `## 标题` / `### 子标题`，**不写**编号。
  // 渲染层自动按出现顺序生成 "01/02/03" 和 "2.1/2.2" 蓝色 monospace 前缀。
  //   - level 2 → arabic-padded（01, 02, 03…）
  //   - level 3 → arabic-section（与父 h2 序号联动；如父是 02，第一节为 02.1）
  // 想列"附录/方法论"这类非数字段时,用专用容器（::: note variant=research-dense
  // / ::: footnotes / ::: appendix）即可，不要写到 h2——h2 全部走 autoNumber 不留豁免位。
  // ============================================================
  decorations: {
    headingPrefix: [
      {
        level: 2,
        autoNumber: "arabic-padded",
        style: {
          color: "primary",
          fontFamily: "monospace",
          fontWeight: 700,
          marginRight: 8
        }
      },
      {
        level: 3,
        autoNumber: "arabic-section",
        style: {
          color: "primary",
          fontFamily: "monospace",
          fontWeight: 700,
          marginRight: 8
        }
      }
    ]
  },
  // ============================================================
  // Motifs：极简，仅留 dividerFlower（两线 + 中央 6×6 蓝方块）+ 四态图标
  // ============================================================
  motifs: {
    // dividerFlower：设计稿 divider-ornament 原型（两线 + 中央 primary 方块）
    dividerFlower: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: "line", x1: 0, y1: 4, x2: 110, y2: 4, stroke: "token:border", strokeWidth: 1 },
        { type: "rect", x: 117, y: 1, w: 6, h: 6, fill: "token:primary" },
        { type: "line", x1: 130, y1: 4, x2: 240, y2: 4, stroke: "token:border", strokeWidth: 1 }
      ]
    },
    // dividerDots：三个 primary 小方块（备用 divider）
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: "rect", x: 108, y: 2, w: 4, h: 4, fill: "token:primary" },
        { type: "rect", x: 118, y: 2, w: 4, h: 4, fill: "token:primary" },
        { type: "rect", x: 128, y: 2, w: 4, h: 4, fill: "token:primary" }
      ]
    },
    // 四态图标（方框直角风，与 radius=0 纪律统一）
    tipIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 1, y: 1, w: 14, h: 14, stroke: "token:status.tip.accent", strokeWidth: 1.5 },
        {
          type: "path",
          d: "M4,8 L7,11 L12,5",
          stroke: "token:status.tip.accent",
          strokeWidth: 1.8,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ]
    },
    infoIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 1, y: 1, w: 14, h: 14, stroke: "token:primary", strokeWidth: 1.5 },
        { type: "rect", x: 7, y: 3, w: 2, h: 2, fill: "token:primary" },
        { type: "rect", x: 7, y: 6, w: 2, h: 7, fill: "token:primary" }
      ]
    },
    warningIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 1, y: 1, w: 14, h: 14, stroke: "token:status.warning.accent", strokeWidth: 1.5 },
        { type: "rect", x: 7, y: 3, w: 2, h: 7, fill: "token:status.warning.accent" },
        { type: "rect", x: 7, y: 11, w: 2, h: 2, fill: "token:status.warning.accent" }
      ]
    },
    dangerIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 1, y: 1, w: 14, h: 14, stroke: "token:status.danger.accent", strokeWidth: 1.5 },
        {
          type: "path",
          d: "M4,4 L12,12 M12,4 L4,12",
          stroke: "token:status.danger.accent",
          strokeWidth: 1.8,
          strokeLinecap: "round"
        }
      ]
    },
    // stepBadge：直角方形 + primary 底 + 反白数字
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      placeholders: ["N"],
      primitives: [
        { type: "rect", x: 0, y: 0, w: 24, h: 24, fill: "token:primary" },
        {
          type: "text",
          x: 12,
          y: 17,
          content: "{N}",
          fontSize: 14,
          fontWeight: 700,
          fill: "token:textInverse",
          textAnchor: "middle"
        }
      ]
    }
  },
  // ============================================================
  // 骨架变体
  // ============================================================
  variants: {
    admonition: "news-row",
    // 数据新闻紧凑单行（左 3px + INFO/TIP/WARN/STOP 徽章）
    quote: "editorial-block",
    // 编辑部磁砖 pull-quote：左 6px 主色条 + 大号粗体 + uppercase 字距 byline，editorial 签名形态
    compare: "data-card",
    // 顶 3px 色条 + 大号 monospace 数字（"纸 本 +37% / 屏 读 +210%"）
    steps: "step-card",
    // 数据简报偏卡片化分步：浅底卡片 + 顶部 uppercase kicker
    divider: "flower",
    // 用本主题自定义 dividerFlower 的"两线 + 蓝方块"
    sectionTitle: "kicker-stack",
    // 上 uppercase kicker + 主标题，与 byline / masthead 同语汇
    codeBlock: "bare",
    // pre 元素直接走主题 voice（黑底）
    note: "smallcaps-kicker",
    // 顶 2px 主色条 + uppercase kicker，与签名容器同源
    footnotes: "top-rule",
    // 顶部 hairline + 11px 密栏，财新简报底栏语言
    recommend: "card-list",
    qrcode: "qr-stack",
    // 数据简报"先视觉锚后说明"：上 96×96 QR + 下三行居中
    footerCTA: "triptych-actions",
    // 三栏 CTA（赞同/收藏/转发）
    pullQuote: "margin-pull",
    // 数据简报 NYT Sunday 悬挂：左竖 QUOTE + 右大字，与 top-rule 底栏同调
    announcement: "danger-bar",
    tableCard: "rule-grid",
    gallery: "duo",
    dialogue: "qa-rows",
    qaBlock: "numbered-faq"
  },
  // ============================================================
  // 主题级 kicker 文案覆盖（数据简报中英混排母语）
  //
  // 简报刊母语 = 短、克制、栏目化；中英 monospace 双轨呼应 decorations 的 "01/02/03"
  // 序号语言。与 brutalist 的 `// CONTENTS` 终端注释、swiss-grid 的全英 INDEX 形成对比。
  // ============================================================
  kickers: {
    toc: "本期目录 · INDEX",
    qaBlock: "读者来函 · Q&A",
    qrFollowKicker: "SUBSCRIBE",
    qrFollowTitle: "订阅本期简报",
    recommend: "延伸阅读 · FURTHER",
    footerCTATitle: "关注数据简报",
    colophonNextLabel: "下 期 ·",
    colophonIssueLabel: "VOL ·",
    mastheadName: "数据简报"
  },
  // ============================================================
  // 签名容器：声明本主题独有的 7 件 data-brief 家族容器
  // 这些 renderer 在 pipeline/containers/databrief.ts 实现；conformance 测试会校验
  // 注册表里都有对应 markdown 名。
  // ============================================================
  signatureContainers: [
    "abstract",
    // tldr-block · 三句话读完本文
    "masthead",
    // 刊头
    "sectionTag",
    // 黑底白字小栏目标签
    "toc",
    // 三栏目录
    "kpiDashboard",
    // KPI 仪表盘
    "barChart",
    // 条形图
    "qaBlock",
    // 读者问答
    "footnotes",
    // 脚注 / 参考文献（variant=lined 默认；variant=inline-flow 用于长列表）
    "colophon"
    // 刊物收束栏（"下期 / 卷·期"双栏 monospace）
  ],
  // ============================================================
  // 元素级样式（典型设计稿）
  // ============================================================
  elements: {
    h1: {
      "font-size": "22px",
      "font-weight": "700",
      color: "#111418",
      "margin-top": "0",
      "margin-bottom": "8px",
      "line-height": "1.35",
      "letter-spacing": "-0.01em"
    },
    // 章节标题：蓝色 monospace 序号由 spec.decorations.headingPrefix 声明（见上方），
    // 管线统一执行 —— 作者只写 `## 01 章节名`，无需在文本里手写任何 HTML。
    // 字号 + 直角 + 无 border-bottom（区别于 default 主题的下划线）。
    h2: {
      "font-size": "16px",
      "font-weight": "700",
      color: "#111418",
      "margin-top": "28px",
      "margin-bottom": "10px",
      "line-height": "1.4",
      "padding-bottom": "0",
      "border-bottom": "none",
      __reset: true
    },
    h3: {
      "font-size": "13px",
      "font-weight": "700",
      color: "#111418",
      "margin-top": "16px",
      "margin-bottom": "8px",
      "line-height": "1.5"
    },
    h4: {
      "font-size": "13px",
      "font-weight": "600",
      color: "#111418",
      "margin-top": "14px",
      "margin-bottom": "6px",
      "line-height": "1.5"
    },
    h5: {
      "font-size": "14px",
      "font-weight": "600",
      color: "#111418",
      "margin-top": "14px",
      "margin-bottom": "6px",
      "line-height": "1.5",
      "letter-spacing": "0.3px"
    },
    h6: {
      "font-size": "12px",
      "font-weight": "600",
      color: "#5a6068",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.5",
      "letter-spacing": "1px",
      "text-transform": "uppercase"
    },
    p: {
      "font-size": "14px",
      "line-height": "1.7",
      color: "#111418",
      "margin-top": "0",
      "margin-bottom": "12px"
    },
    // 设计稿 pull-quote 走裸 blockquote：左 3px 近黑 + 17px 中等粗 + 微紧字距 + attribution
    // 第二段（"—— 博尔赫斯"）由作者写在 blockquote 内的第二段
    blockquote: {
      __reset: true,
      "border-left": "3px solid #111418",
      "background-color": "transparent",
      color: "#111418",
      padding: "4px 0 4px 14px",
      margin: "24px 0",
      "font-size": "17px",
      "font-weight": "500",
      "line-height": "1.55",
      "letter-spacing": "-0.005em",
      "border-radius": "0"
    },
    ul: { "padding-left": "20px", "margin-top": "0", "margin-bottom": "14px" },
    ol: { "padding-left": "20px", "margin-top": "0", "margin-bottom": "14px" },
    li: { "margin-bottom": "4px", "line-height": "1.7", color: "#111418" },
    strong: { "font-weight": "700", color: "#111418" },
    em: { "font-style": "italic", color: "#111418" },
    a: {
      color: "#1756d1",
      "text-decoration": "none",
      "border-bottom": "1px solid #1756d1"
    },
    hr: {
      border: "none",
      height: "1px",
      "background-color": "#e5e7eb",
      "margin-top": "20px",
      "margin-bottom": "20px"
    },
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "10px",
      "margin-right": "auto",
      "margin-bottom": "10px",
      "margin-left": "auto",
      "border-radius": "0"
    },
    // 代码块：黑底 + 浅字（终端风）；inline-style 走 code 元素
    pre: {
      __reset: true,
      "background-color": "#111418",
      color: "#e5e7eb",
      padding: "12px 14px",
      margin: "12px 0 20px",
      "border-radius": "0",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "box-shadow": "inset -14px 0 10px -10px rgba(0,0,0,0.4)",
      "font-size": "12px",
      "line-height": "1.8"
    },
    // inline code：蓝字 + 浅底（设计稿 inline-code 风格）
    code: {
      "background-color": "#f5f7fa",
      color: "#1756d1",
      padding: "1px 5px",
      "border-radius": "0",
      "font-size": "12px"
    },
    // 苏黎世新闻数据栏：上下 1px 黑实线（无侧边框）+ th 极小字 letter-spacing（图表表头风）
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "18px",
      "font-size": "12px",
      "border-radius": "0"
    },
    th: {
      "background-color": "transparent",
      color: "#5a6068",
      border: "none",
      "border-top": "1px solid #111418",
      "border-bottom": "1px solid #111418",
      padding: "4px 8px",
      "font-weight": "700",
      "text-align": "left",
      "letter-spacing": "0.8px",
      // 极小字宽字距：苏黎世图表表头特征
      "font-size": "10px"
    },
    td: {
      border: "none",
      "border-bottom": "1px solid #e5e7eb",
      padding: "4px 8px",
      color: "#111418"
    },
    // 极简方块键帽：radius 0 直角 + monospace 感 + 紧凑 padding（简报直角纪律）
    kbd: {
      display: "inline-block",
      "background-color": "#eef0f2",
      color: "#111418",
      border: "1px solid #e5e7eb",
      "border-bottom-width": "2px",
      "border-radius": "0",
      padding: "1px 5px",
      "font-size": "11px",
      "line-height": "1.4",
      "letter-spacing": "0",
      "vertical-align": "middle"
    }
  },
  // ============================================================
  // 内联强调
  // ============================================================
  inline: {
    // highlight 走 INFO soft 浅蓝底（保持数据感单色系）
    highlight: {
      "background-color": "#dfe9fa",
      color: "#111418",
      padding: "0 4px",
      "border-radius": "0"
    },
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#1756d1",
      "text-underline-offset": "3px"
    },
    emphasis: {
      color: "#1756d1",
      "font-weight": "600"
    },
    del: {
      color: "#5a6068",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#1756d1",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器视觉（每个签名容器在此微调；renderer 提供 fallback，spec 覆盖优先）
  // ============================================================
  containers: {
    // 通用容器：保持克制
    intro: {
      "background-color": "#f5f7fa",
      "border-left": "3px solid #1756d1",
      "border-radius": "0",
      padding: "12px 14px 12px 17px",
      margin: "0 0 22px 0",
      color: "#111418"
    },
    // author（撰文/编辑横排）：下分割线 + 小字
    author: {
      __reset: true,
      "border-bottom": "1px solid #e5e7eb",
      "padding-bottom": "18px",
      margin: "0 0 22px 0",
      "font-size": "11px",
      color: "#5a6068"
    },
    cover: { margin: "0 0 16px 0" },
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // note 在 data-brief 里映射为"灰底小字补注"：浅底 + 10px 紧凑字号 + textMuted。
    // 主题级 voice。各 variant 在此基础上覆盖：
    //   - research-dense（= 旧 methodology 容器）：标签头走粗体 textPrimary
    //   - editorial-stripe（= 旧 editor-note 容器）：主色左条 + kicker（"编 者 按"）
    note: {
      __reset: true,
      "background-color": "#f5f7fa",
      padding: "10px 12px",
      margin: "16px 0",
      "font-size": "10px",
      "line-height": "1.7",
      color: "#5a6068",
      "border-radius": "0"
    },
    quoteCard: {
      "background-color": "#f5f7fa",
      padding: "22px 24px",
      margin: "20px 0",
      "border-radius": "0"
    },
    highlight: {
      "background-color": "#f5f7fa",
      padding: "14px 16px",
      margin: "16px 0",
      "border-radius": "0",
      border: "1px solid #e5e7eb"
    },
    compare: { margin: "16px 0 20px" },
    steps: { margin: "20px 0" },
    sectionTitle: {
      __reset: true,
      margin: "28px 0 10px",
      "padding-bottom": "0",
      "border-bottom": "none"
    },
    // footer-cta：设计稿三栏（赞同 / 收藏 / 转发）。本主题不依赖 cta=/href=
    // 而是让作者直接用 markdown 写"♡ 赞同 · ★ 收藏 · ↗ 转发"——renderer 自身的
    // 胶囊按钮在数据简报里太"营销"；保持克制即可
    footerCTA: {
      __reset: true,
      margin: "22px 0",
      padding: "0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    recommend: {
      margin: "20px 0",
      padding: "12px 14px",
      "background-color": "#f5f7fa",
      "border-radius": "0",
      "border-left": "3px solid #5a6068"
    },
    qrcode: {
      margin: "22px 0",
      padding: "14px",
      "background-color": "#f5f7fa",
      "border-left": "3px solid #1756d1",
      "border-radius": "0"
    },
    abstract: {
      __reset: true,
      "border-left": "3px solid #1756d1",
      padding: "4px 0 4px 14px",
      margin: "0 0 22px 0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    keyNumber: {
      margin: "18px 0",
      padding: "16px 18px",
      "background-color": "#f5f7fa",
      "border-top": "3px solid #1756d1",
      "border-radius": "0"
    },
    // data-brief 家族 7 件签名容器：renderer 已有 fallback，这里收紧细节
    masthead: {
      margin: "0 0 20px 0",
      "padding-bottom": "10px",
      "border-bottom": "1px solid #111418"
    },
    sectionTag: { margin: "0 0 14px 0" },
    toc: {
      "background-color": "#f5f7fa",
      padding: "12px 14px",
      margin: "0 0 24px 0",
      "border-radius": "0"
    },
    kpiDashboard: {
      "background-color": "#f5f7fa",
      "border-top": "1px solid #111418",
      "border-bottom": "1px solid #111418",
      padding: "18px 16px 16px",
      margin: "0 0 28px 0",
      "border-radius": "0"
    },
    barChart: {
      "background-color": "#f5f7fa",
      border: "1px solid #e5e7eb",
      padding: "16px 14px",
      margin: "20px 0 24px",
      "border-radius": "0"
    },
    qaBlock: {
      "border-top": "1px solid #e5e7eb",
      "border-bottom": "1px solid #e5e7eb",
      padding: "14px 0",
      margin: "22px 0",
      "border-radius": "0"
    },
    // footnotes 两骨架共用（layout 由 variants/footnotes/{lined,inline-flow} 注入）
    footnotes: {
      "border-top": "1px solid #e5e7eb",
      margin: "14px 0",
      "font-size": "10px",
      color: "#5a6068"
    },
    // colophon · 刊物收束栏："下期 / 卷·期"双栏，上分割线 1px 近黑（强分隔）
    // renderer 自带 display:table，spec 这里仅承诺分隔线 + 间距
    colophon: {
      __reset: true,
      "border-top": "1px solid #111418",
      "margin-top": "20px",
      "padding-top": "12px",
      "border-radius": "0"
    },
    // 极小字来源注脚一体感：letter-spacing 宽字距 + textMuted + 无底色（苏黎世简报图注）
    imageCaption: {
      margin: "2px 0 16px 0",
      "text-align": "left",
      "font-size": "10px",
      color: "#5a6068",
      "letter-spacing": "0.5px"
    },
    // 事件 / 期号时间线：左 3px 数据蓝竖条 + bgSoft 底（与 note.editorial-stripe 同语汇）
    timeline: {
      margin: "20px 0",
      "border-left": "3px solid #1756d1",
      "background-color": "#f5f7fa",
      padding: "12px 14px 12px 17px",
      "border-radius": "0"
    }
  },
  // ============================================================
  // 模板片段（作者侧示例 · 不影响 CSS 生成；commonTemplates 隐式合并）
  // ============================================================
  templates: {
    cover: `::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

::: section-tag
深度
:::

# 在无人深夜，重新学习如何阅读一本书
`,
    authorBar: `::: author
撰文 **罗向量**　编辑 **陈栈桥**
:::
`,
    footerCTA: `::: footer-cta
♡ 赞同　·　★ 收藏　·　↗ 转发
:::
`,
    tip: `::: tip 要点
本期核心结论。
:::
`
  },
  meta: {
    createdAt: "2026-05-13",
    ownerNotes: "主题 11 数据简报 · 三条不可妥协：radius=0、primary #1756d1、代码黑底浅字。10 件 data-brief 家族签名容器 renderer 在 pipeline/containers/databrief.ts。蓝色 monospace 章节序号由 decorations.headingPrefix 声明、管线统一注入；作者侧不写任何内联 HTML——内联 HTML 退出写作契约保护。"
  }
};
const spec$b = {
  id: "literary-humanism",
  name: "人文札记",
  description: "宋椠古籍 + 克制留白，给散文、书评、长评留足呼吸",
  audience: "人文非虚构（散文 / 书评 / 长评 / 札记）",
  // applyPalette fallback：用户基于本主题自定义配色时，SVG assets 走 `serif` 工厂
  // （书卷式双竖条等"古籍"形状语言）。spec-first 主路径不消费此字段。
  svgVariant: "serif",
  // ============================================================
  // 色板（规范 §1.1 色彩表）
  // ============================================================
  palette: {
    // 规范 §1.1 核心改动：驼棕 #7a5c3a → 宋椠褐 #5a4a3a（油墨印在黄纸上的墨迹色）
    primary: "#5a4a3a",
    // 松绿 #3c4e3a → 青瓷釉 #3d4a3d（降 5% 饱和度，绿里掺灰）
    secondary: "#3d4a3d",
    // 朱砂 #a94633 → 藏经朱 #9a3b2e（收窄饱和度，稀有出场）
    accent: "#9a3b2e",
    // 宣纸米 #f5f1e8 → #f4efe3（降一点黄味，偏未漂白道林纸）
    bg: "#f4efe3",
    // 旧纸阴影 —— 与主底 8% 明度差
    bgSoft: "#ece5d1",
    // 装帧衬布 —— 仅用于 code / 边栏深底
    bgMuted: "#ddd3bb",
    // 松烟墨 #2b261c → #1f1b14（更深更冷，接近油墨印刷）
    text: "#1f1b14",
    // 墨灰 —— 规范微调保留
    textMuted: "#6b5f4a",
    // 规范纪律：平台 SVG→PNG 把 #fff 透明化，反白统一用 #fefefe
    textInverse: "#fefefe",
    // 版框线 —— 规范微调
    border: "#cfc3a8",
    // 规范 §1.1 关键改动：**拒绝朱砂承担代码色**
    // 人文语境里 code 是"注音符号"，不是"警示"；用墨灰安静处理（5.06:1 守 AA）
    code: "#5e5340"
  },
  // 语义四色（规范 §1.1 语义色表：米底 #f4efe3 上 AA ≥ 4.5:1，色相距离 ≥ 120°）
  status: {
    tip: { accent: "#4a6b3e", soft: "#e3e8d6" },
    // 批注（灰青绿，5.1:1）
    warning: { accent: "#7a5722", soft: "#efe3c9" },
    // 商榷（黄褐，5.13:1 守 AA）
    info: { accent: "#3d5a75", soft: "#dce3ec" },
    // 案语（青，5.4:1）
    danger: { accent: "#8e3a2d", soft: "#ecd6cf" }
    // 校勘（暗朱红，5.3:1）
  },
  // ============================================================
  // 字号 / 间距 / 圆角
  // ============================================================
  typography: {
    // 规范 §1.2 Scale + §3.7 红线：baseSize 16 不许动（人文气质底线）
    baseSize: 16,
    // 唯一敢给 2.0 的主题 —— 人文札记的签名
    lineHeight: 2,
    // 规范 §1.2：h1 26（在 h2 之上拔高 1px）
    h1Size: 26,
    // 规范 §1.2：h2 19（原 20 过于教科书，19 + 2px 字距 = 克制）
    h2Size: 19,
    // 规范 §1.2：h3 16 与正文同号，靠字距区分
    h3Size: 16,
    // 规范 §3.8 红线：字距是人文主题的声带 —— 正文 1px
    letterSpacing: 1
  },
  // 规范 §2 divider：上下 margin 提到 36px（人文更大呼吸）
  spacing: { paragraph: 22, section: 36, listItem: 12, containerPadding: 18 },
  // 规范 §3.5：所有容器默认 radius 0（方版心是书，圆角是卡片）
  radius: { sm: 0, md: 0, lg: 0 },
  // ============================================================
  // Motifs（11 件：h2Prefix / 3 divider / sectionCorner / 4 icon / stepBadge / sealMark）
  // 刻意不导出 quoteMark（规范 §2.6 —— 与 default 同策略）
  // ============================================================
  motifs: {
    // h2Prefix · 版框竖条（规范 §1.3 ①）
    // viewBox 4×22，左侧 rect x=0 y=0 w=2 h=20 fill=primary，仅此而已。
    h2Prefix: {
      viewBox: [0, 0, 4, 22],
      width: 4,
      height: 20,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 10 },
      primitives: [{ type: "rect", x: 0, y: 0, w: 2, h: 20, fill: "token:primary" }]
    },
    // dividerFlower · 如意云头三连（规范 §1.3 ②）
    // 两侧 border 色长线各 100px + 中央三连云头 path + 下方 accent 朱点。
    dividerFlower: {
      viewBox: [0, 0, 240, 18],
      width: 220,
      height: 18,
      primitives: [
        { type: "line", x1: 4, y1: 9, x2: 104, y2: 9, stroke: "token:border", strokeWidth: 1 },
        { type: "line", x1: 136, y1: 9, x2: 236, y2: 9, stroke: "token:border", strokeWidth: 1 },
        {
          type: "path",
          d: "M104,9 A5.33,5.33 0 0 1 114.67,9 A5.33,5.33 0 0 1 125.33,9 A5.33,5.33 0 0 1 136,9 L136,13 L104,13 Z",
          fill: "token:primary",
          opacity: 0.82
        },
        { type: "circle", cx: 120, cy: 16, r: 1.5, fill: "token:accent", opacity: 0.85 }
      ]
    },
    // dividerDots · 版心回纹单枚（规范 §1.3 ③）
    // 中央 10×10 外框 + 内部 L 形双折线；两侧 border 色细线。
    // 注：源 strokeWidth 0.8 → 1（validator 硬下限）。
    dividerDots: {
      viewBox: [0, 0, 240, 12],
      width: 220,
      height: 12,
      primitives: [
        { type: "line", x1: 0, y1: 6, x2: 108, y2: 6, stroke: "token:border", strokeWidth: 1 },
        { type: "line", x1: 132, y1: 6, x2: 240, y2: 6, stroke: "token:border", strokeWidth: 1 },
        {
          type: "rect",
          x: 115,
          y: 1,
          w: 10,
          h: 10,
          stroke: "token:primary",
          strokeWidth: 1,
          opacity: 0.7
        },
        {
          type: "path",
          d: "M117,3 L123,3 L123,9",
          stroke: "token:primary",
          strokeWidth: 1,
          opacity: 0.7
        },
        {
          type: "path",
          d: "M119,5 L121,5 L121,7",
          stroke: "token:primary",
          strokeWidth: 1,
          opacity: 0.7
        }
      ]
    },
    // dividerWave · 缠枝（规范 §2 divider：section 级别超大分隔）
    // S 曲线主干 + 两对 ellipse/circle 花点（primary ellipse + accent circle）。
    dividerWave: {
      viewBox: [0, 0, 240, 20],
      width: 220,
      height: 20,
      primitives: [
        {
          type: "path",
          d: "M20,10 C60,2 100,18 140,10 C170,5 200,14 220,10",
          stroke: "token:primary",
          strokeWidth: 1,
          opacity: 0.6
        },
        { type: "ellipse", cx: 80, cy: 6, rx: 3, ry: 1.4, fill: "token:primary", opacity: 0.55 },
        { type: "circle", cx: 80, cy: 6, r: 1.1, fill: "token:accent", opacity: 0.75 },
        { type: "ellipse", cx: 160, cy: 14, rx: 3, ry: 1.4, fill: "token:primary", opacity: 0.55 },
        { type: "circle", cx: 160, cy: 14, r: 1.1, fill: "token:accent", opacity: 0.75 }
      ]
    },
    // sectionCorner · 书角折页（规范 §2.4）
    // 双折边外框 + 内部 L 折线，去掉朱点（稀缺纪律）。
    sectionCorner: {
      viewBox: [0, 0, 20, 20],
      width: 16,
      height: 16,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      primitives: [
        {
          type: "path",
          d: "M2,2 L14,2 L18,6 L18,18 L2,18 Z",
          stroke: "token:primary",
          strokeWidth: 1,
          opacity: 0.85
        },
        {
          type: "path",
          d: "M14,2 L14,6 L18,6",
          stroke: "token:primary",
          strokeWidth: 1,
          opacity: 0.85
        }
      ]
    },
    // tipIcon · 夹注双鱼尾（开口朝右）
    tipIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M4,2 L2,4 L2,10 L4,12",
          stroke: "token:status.tip.accent",
          strokeWidth: 1.4,
          strokeLinejoin: "round",
          strokeLinecap: "round"
        },
        {
          type: "path",
          d: "M8,2 L10,4 L10,10 L8,12",
          stroke: "token:status.tip.accent",
          strokeWidth: 1.4,
          strokeLinejoin: "round",
          strokeLinecap: "round"
        }
      ]
    },
    // infoIcon · "按"字几何化（居中单点 + 下划线，最低调）
    infoIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "circle", cx: 7, cy: 5, r: 1, fill: "token:status.info.accent", opacity: 0.9 },
        {
          type: "line",
          x1: 3,
          y1: 10,
          x2: 11,
          y2: 10,
          stroke: "token:status.info.accent",
          strokeWidth: 1.2,
          opacity: 0.85
        }
      ]
    },
    // warningIcon · 双鱼尾开口朝上（倒 U）
    warningIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M2,4 L4,2 L10,2 L12,4",
          stroke: "#8a6428",
          strokeWidth: 1.4,
          strokeLinejoin: "round",
          strokeLinecap: "round"
        },
        {
          type: "path",
          d: "M2,8 L4,6 L10,6 L12,8",
          stroke: "#8a6428",
          strokeWidth: 1.4,
          strokeLinejoin: "round",
          strokeLinecap: "round"
        }
      ]
    },
    // dangerIcon · 双鱼尾开口朝左
    dangerIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M10,2 L12,4 L12,10 L10,12",
          stroke: "token:status.danger.accent",
          strokeWidth: 1.4,
          strokeLinejoin: "round",
          strokeLinecap: "round"
        },
        {
          type: "path",
          d: "M6,2 L4,4 L4,10 L6,12",
          stroke: "token:status.danger.accent",
          strokeWidth: 1.4,
          strokeLinejoin: "round",
          strokeLinecap: "round"
        }
      ]
    },
    // stepBadge · 钤印（规范 §1.3 ④）
    // 外圈 r=11 stroke 1.2 + 内圈 r=8.5 opacity 0.55 + 数字 primary 墨褐。
    // 注：源内圈 strokeWidth 0.6 → 1（validator 硬下限）。
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      placeholders: ["N"],
      primitives: [
        { type: "circle", cx: 12, cy: 12, r: 11, fill: "token:primary", opacity: 0.08 },
        { type: "circle", cx: 12, cy: 12, r: 11, stroke: "token:primary", strokeWidth: 1.2 },
        {
          type: "circle",
          cx: 12,
          cy: 12,
          r: 8.5,
          stroke: "token:primary",
          strokeWidth: 1,
          opacity: 0.55
        },
        {
          type: "text",
          x: 12,
          y: 17,
          content: "{N}",
          fontSize: 15,
          fontWeight: 700,
          fill: "token:primary",
          textAnchor: "middle"
        }
      ]
    },
    // sealMark · 大钤印（规范 §1.3 ④ · 规范 §2 footerCTA）
    // 整篇文章仅卷尾出现一次；24×24 外框 + 两字留位的几何化十字笔画。
    // 此处使用 accent（藏经朱）—— 全文朱砂稀缺出场的第二处。
    sealMark: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: "inline-block", verticalAlign: "middle" },
      primitives: [
        {
          type: "rect",
          x: 1,
          y: 1,
          w: 22,
          h: 22,
          stroke: "token:accent",
          strokeWidth: 1.4,
          opacity: 0.92
        },
        {
          type: "line",
          x1: 3,
          y1: 12,
          x2: 21,
          y2: 12,
          stroke: "token:accent",
          strokeWidth: 1,
          opacity: 0.5
        },
        {
          type: "line",
          x1: 7,
          y1: 6.5,
          x2: 17,
          y2: 6.5,
          stroke: "token:accent",
          strokeWidth: 1.1,
          opacity: 0.85
        },
        {
          type: "line",
          x1: 12,
          y1: 4,
          x2: 12,
          y2: 9,
          stroke: "token:accent",
          strokeWidth: 1.1,
          opacity: 0.85
        },
        {
          type: "line",
          x1: 7,
          y1: 17.5,
          x2: 17,
          y2: 17.5,
          stroke: "token:accent",
          strokeWidth: 1.1,
          opacity: 0.85
        },
        {
          type: "line",
          x1: 12,
          y1: 15,
          x2: 12,
          y2: 20,
          stroke: "token:accent",
          strokeWidth: 1.1,
          opacity: 0.85
        }
      ]
    }
  },
  // ============================================================
  // 骨架变体（规范 §2 每节 primary variant）
  // ============================================================
  variants: {
    // 真正的无框书页批注：无底、无边；靠 CJK 符号【按/疑/注/辨】区分四态，墨色一色
    // 取代 minimal-underline（仍有左竖线 + 色差），回归宋版书批注传统
    admonition: "marginalia",
    // 规范 §2.6：quoteCard 走 magazine-dropcap —— 题辞签名
    quote: "magazine-dropcap",
    // 规范 §2.12：compare 走 column-card（甲说/乙说）
    compare: "column-card",
    // 规范 §2.13：steps 走 timeline-dot（卷一/卷二/卷三）
    steps: "timeline-dot",
    // 规范 §2 divider：默认 flower（单云头）—— 人文主题 logo
    divider: "flower",
    // 规范 §2.4：sectionTitle 走 cornered —— 左上书角折页
    sectionTitle: "cornered",
    // 文学主题代码偏古书内嵌式：tinted 软底 + 左主色窄竖条
    codeBlock: "inline-card",
    // 散文式页边批注：dotted 左竖线 + 缩进，比 minimal-callout 更"页边书"
    note: "dotted-margin",
    // 书后注："boxed-aside" 软底卡片 + pill kicker，narrative aside
    footnotes: "boxed-aside",
    recommend: "card-list",
    qrcode: "bare",
    footerCTA: "button-led",
    pullQuote: "giant-mark",
    announcement: "danger-bar",
    tableCard: "rule-grid",
    gallery: "duo",
    dialogue: "qa-rows",
    qaBlock: "numbered-faq"
  },
  // ============================================================
  // 元素级样式（规范 §1.2 typographic voice）
  // ============================================================
  elements: {
    // 规范 §1.2：h1 26 / 700 / 字距 3px —— 稀比粗更贵气（古籍大字题签）
    h1: {
      "font-size": "26px",
      "font-weight": "700",
      color: "#1f1b14",
      "margin-top": "30px",
      "margin-bottom": "18px",
      "line-height": "1.5",
      "letter-spacing": "3px",
      "text-align": "center"
    },
    // 规范 §1.3①：h2 前缀 = 2px×20px primary 竖条（assets.h2Prefix 注入）
    //         h2 下方 1px border 横线
    h2: {
      "font-size": "19px",
      "font-weight": "600",
      // 规范 §1.2：600 而非 700（700 太硬）
      color: "#1f1b14",
      "margin-top": "32px",
      "margin-bottom": "14px",
      "line-height": "1.6",
      "letter-spacing": "2px",
      "padding-bottom": "8px",
      "border-bottom": "1px solid #cfc3a8"
    },
    // 规范 §1.2：h3 16 / 600 / 与正文同号 —— 靠字距识别的高级手法
    h3: {
      "font-size": "16px",
      "font-weight": "600",
      color: "#1f1b14",
      "margin-top": "22px",
      "margin-bottom": "10px",
      "line-height": "1.7",
      "letter-spacing": "1.2px"
    },
    // h4：介于 h3 与正文之间
    h4: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#1f1b14",
      "margin-top": "18px",
      "margin-bottom": "8px",
      "line-height": "1.6",
      "letter-spacing": "1px"
    },
    h5: {
      "font-size": "16px",
      "font-weight": "600",
      color: "#1f1b14",
      "margin-top": "16px",
      "margin-bottom": "6px",
      "line-height": "1.7",
      "letter-spacing": "1px"
    },
    h6: {
      "font-size": "16px",
      "font-weight": "500",
      color: "#6b5f4a",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.65",
      "letter-spacing": "1px"
    },
    // 规范 §1.2：正文 16 / 400 / 字距 1px / 行高 2.0（签名）
    p: {
      "font-size": "16px",
      "line-height": "2.0",
      color: "#1f1b14",
      "margin-top": "0",
      "margin-bottom": "22px",
      "letter-spacing": "1px"
    },
    // 规范 §2.5 quote（裸 blockquote）：column-rule 气质的双侧细竖线
    // __reset：不承袭 baseElements 的 border-radius 4px（人文主题 blockquote 直角纪律）
    blockquote: {
      __reset: true,
      "border-left": "1px solid #5a4a3a",
      "border-right": "1px solid #5a4a3a",
      "background-color": "transparent",
      color: "#6b5f4a",
      "padding-top": "8px",
      "padding-right": "22px",
      "padding-bottom": "8px",
      "padding-left": "22px",
      "margin-top": "0",
      "margin-bottom": "22px",
      "letter-spacing": "1.2px"
    },
    ul: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "22px" },
    ol: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "22px" },
    li: {
      "margin-bottom": "12px",
      "line-height": "2.0",
      color: "#1f1b14",
      "letter-spacing": "1px"
    },
    a: {
      color: "#5a4a3a",
      "text-decoration": "underline"
    },
    // 规范 §2 divider：上下 margin 36px（比默认大一档，人文更大呼吸）
    hr: {
      border: "none",
      height: "1px",
      "background-color": "#cfc3a8",
      "margin-top": "36px",
      "margin-bottom": "36px"
    },
    // 规范 §2.3 cover：图片不圆角（出版物封面纪律）
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "10px",
      "margin-right": "auto",
      "margin-bottom": "10px",
      "margin-left": "auto",
      "border-radius": "0"
    },
    // 规范 §1.2 字重对比：强调 500 不是 700（700 太硬）
    strong: { "font-weight": "500", color: "#1f1b14" },
    em: { "font-style": "italic", color: "#1f1b14" },
    pre: {
      "background-color": "#ece5d1",
      color: "#1f1b14",
      "padding-top": "14px",
      "padding-right": "16px",
      "padding-bottom": "14px",
      "padding-left": "16px",
      "border-radius": "0",
      // 规范 §3.5：方版心，不圆角
      border: "1px solid #cfc3a8",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "box-shadow": "inset -14px 0 10px -10px rgba(0,0,0,0.15)",
      "margin-top": "0",
      "margin-bottom": "22px",
      "font-size": "13px",
      "line-height": "1.7"
    },
    // 规范 §1.1：inline code 走 bgMuted 底 + textMuted 墨灰字（不是朱）
    code: {
      "background-color": "#ddd3bb",
      color: "#6b5f4a",
      padding: "2px 6px",
      "border-radius": "0",
      "font-size": "14px"
    },
    // 藏经感旧书表格：骨架以上下 1px 实线限定，无外框，无圆角——
    // 对应 06-dushu.html figure-main 的"版心规制"纪律：框只在内容边界出现，不做装饰围合。
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "28px",
      "font-size": "14px",
      "border-top": "1px solid #cfc3a8",
      "border-bottom": "1px solid #cfc3a8"
    },
    // th 走 textMuted 墨灰 + 极小字 + 字距放宽——仿古籍"栏目小字"行款，无底色无外框。
    th: {
      "text-align": "left",
      "font-weight": "500",
      color: "#6b5f4a",
      "font-size": "13px",
      "letter-spacing": "1.5px",
      "padding-top": "6px",
      "padding-right": "12px",
      "padding-bottom": "6px",
      "padding-left": "0",
      "border-bottom": "1px solid #cfc3a8",
      "background-color": "transparent"
    },
    // td 与 th 同节奏：无外框，仅靠行间纸感 padding 区分数据格。
    td: {
      "text-align": "left",
      color: "#1f1b14",
      "font-size": "14px",
      "letter-spacing": "1px",
      "padding-top": "6px",
      "padding-right": "12px",
      "padding-bottom": "6px",
      "padding-left": "0",
      "border-bottom": "1px solid #ece5d1",
      "vertical-align": "top"
    },
    // 印章感 kbd：bgSoft 旧纸底 + textMuted 墨灰字 + 偏方边框（radius 1px 不圆）——
    // 人文主题极少用 kbd；出现时走"注音符号"路线，不抢 code 块的视觉位。
    // 对应 persona 规范："code 是注音符号，不是警示"。
    kbd: {
      display: "inline-block",
      "background-color": "#ece5d1",
      color: "#6b5f4a",
      border: "1px solid #cfc3a8",
      "border-radius": "1px",
      padding: "1px 5px",
      "font-size": "13px",
      "line-height": "1.5",
      "vertical-align": "middle"
    }
  },
  // ============================================================
  // Inline 强调（规范 §1.2 字重对比 + §1.3 朱砂稀缺纪律）
  // ============================================================
  inline: {
    // 规范 §1.3：朱砂全文只出现"两处"（quoteCard 首字 + footer 钤印）
    // highlight 不能走 accent；改走 bgSoft 底 + text 色（保持"纸感"）
    highlight: {
      "background-color": "#ece5d1",
      color: "#1f1b14",
      padding: "0 3px",
      "border-radius": "0"
    },
    // 规范 §1.2：波浪线用 primary 墨褐，不引入第三色
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#5a4a3a",
      "text-underline-offset": "3px"
    },
    // 规范 §1.2：关键词强调走 primary + 500（不是 700）
    emphasis: {
      color: "#5a4a3a",
      "font-weight": "500"
    },
    del: {
      color: "#6b5f4a",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#5a4a3a",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container）
  // ============================================================
  containers: {
    // 规范 §2.1 intro：题解 —— 左 2px primary 竖条 + bgSoft 底 + 两侧 20px 内缩
    intro: {
      "background-color": "#ece5d1",
      "border-left": "2px solid #5a4a3a",
      "border-radius": "0",
      padding: "14px 20px 14px 22px",
      margin: "0 0 28px 0",
      color: "#6b5f4a",
      "letter-spacing": "1.5px"
    },
    // 规范 §2.2 author：书末小字落款 —— inline-block 胶囊
    author: {
      display: "inline-block",
      "background-color": "#ece5d1",
      "border-radius": "0",
      padding: "6px 14px",
      margin: "16px 0",
      color: "#5a4a3a",
      "font-size": "14px",
      "letter-spacing": "1px"
    },
    // 规范 §2.3 cover：扉页 —— 图下紧跟 13px textMuted 居中题记，margin 36
    cover: {
      margin: "0 0 36px 0"
    },
    // admonition 四件套：variant 接管外壳；container 留空等 variant 注入
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // 规范 §2.6 quoteCard：题辞，走 magazine-dropcap variant
    quoteCard: {
      "background-color": "#ece5d1",
      padding: "28px 24px",
      margin: "24px 0",
      "border-radius": "0",
      border: "1px solid #cfc3a8"
    },
    // 规范 §2 highlight：着重段 —— bgSoft + 两侧 24px 内缩 + 无边框
    highlight: {
      "background-color": "#ece5d1",
      padding: "14px 24px",
      margin: "24px 0",
      "border-radius": "0",
      "letter-spacing": "1.5px"
    },
    // 规范 §2 compare：夹注（column-card）
    compare: { margin: "24px 0" },
    // 规范 §2 steps：卷次（timeline-dot）
    steps: { margin: "24px 0" },
    // 规范 §2.4 sectionTitle：cornered variant —— 左上书角折页 + 1px border 通栏
    sectionTitle: {
      margin: "40px 0 18px",
      "padding-bottom": "8px",
      "border-bottom": "1px solid #cfc3a8"
    },
    // 规范 §2 footerCTA：卷尾 —— 顶部 dividerFlower + 中间 13px textMuted + 右下 sealMark
    footerCTA: {
      margin: "36px 0",
      padding: "28px 0 20px 0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    // 规范 §2 recommend：卷末书单
    recommend: {
      margin: "28px 0",
      padding: "16px 20px",
      "background-color": "#ece5d1",
      "border-radius": "0"
    },
    // 规范 §2 qrcode：钤印衬托 —— 容器本身无底色无边框
    qrcode: {
      margin: "28px 0",
      padding: "16px",
      "background-color": "transparent",
      "border-radius": "0"
    },
    // note：marginalia 兄弟容器——无框无底，仅左 28px 缩进 + 标题 textMuted。
    // 与 admonition 的【按】【疑】【注】【辨】保持视觉血统：宋版书"墨围、天头、地脚"
    // 体系下的"按语"，不是西式 callout box。
    note: {
      __reset: true,
      "background-color": "transparent",
      padding: "4px 0 4px 28px",
      margin: "20px 0",
      "border-radius": "0"
    },
    // 传统"图说"：居中 textMuted 小字，letter-spacing 放宽造出"版权行"沉静感——
    // 对应 06-dushu.html figure-main 的图版图注："图版一　八十年代后海一带旧书店内景"
    // 全居中、11px 小字、略宽字距是《读书》杂志图说的典型排法。
    imageCaption: {
      margin: "10px 0 28px",
      "text-align": "center",
      color: "#6b5f4a",
      "font-size": "13px",
      "letter-spacing": "1.5px",
      "border-radius": "0"
    },
    // 朱印感作者名片：left 2px primary 竖条 + bgSoft 旧纸底 + 无圆角——
    // 与 intro 容器同母型（"题解内缩行款"），在书末出现即"落款"；
    // renderer 的 nameCSS / roleCSS 走 token 兜底，本主题只接管 wrapper 层。
    authorBio: {
      __reset: true,
      "background-color": "#ece5d1",
      "border-left": "2px solid #5a4a3a",
      "border-radius": "0",
      padding: "12px 18px 12px 20px",
      margin: "20px 0"
    }
  },
  signatureContainers: ["imageCaption", "authorBio"],
  // ============================================================
  // Templates（主题特化的 markdown 片段；commonTemplates 由 specToTheme 隐式并入）
  // ============================================================
  templates: {
    // 规范 §2.3 cover：扉页 + 13px 题记
    cover: `::: cover 卷首语
![封面占位](https://placehold.co/1200x630?text=humanism)

_写于春分后第二日，时雨初歇。_
:::
`,
    // 规范 §2.2 author：书末小字落款
    authorBar: `::: author 钟山 role=主笔
长读深耕，短评不妄。
:::
`,
    // 规范 §2.10 tip：minimal-underline 签名（主题默认），中文前缀"批注"
    tip: `::: tip 批注
旁批·眉批 —— 最轻的一档提示，无边框，仅标题下方一道短线。
:::
`
  },
  meta: {
    createdAt: "2026-04-20",
    ownerNotes: "三件 motif 的 strokeWidth 全部 ≥ 1（validator 硬下限，公众号光栅化友好）。"
  }
};
const spec$a = {
  id: "industry-observer",
  name: "行业观察",
  description: "Stratechery / Benedict Evans 家族，业内人写给业内人的周刊深度稿",
  audience: "内参 newsletter / 行业周报 / analyst essay 读者",
  // ============================================================
  // 色板（规范 §1.1）
  // ============================================================
  palette: {
    primary: "#24364f",
    // 冷黑主色，Benedict Evans 路径
    secondary: "#3d5063",
    // 雾蓝，primary 浅 18%，用于 h3 / byline / 矩阵表头
    accent: "#b86f2a",
    // 晚点橙金，稀缺信号色（issueStamp / .num / strong 信号位）
    bg: "#fbf8f1",
    // Stratechery 米 —— 3% 黄度，微暖不甜
    bgSoft: "#f5efe1",
    // 档案米深一级（quoteCard / recommend / footer）
    bgMuted: "#ece3cf",
    // 期号卡背（issueStamp 底 / compare 表头 / code 底）
    text: "#1a2332",
    // 观察者墨 —— 比 primary 再深一档，压过所有装饰
    textMuted: "#5a6778",
    // 批注灰蓝 —— 带蓝调避免与暖米底打架
    textInverse: "#fefefe",
    // 反白：胶囊字色，规避 #fff 平台透明化
    border: "#e0d6c0",
    // 米纸边：暖灰，与米底同族
    code: "#24364f",
    // inline code 字色 = primary（observer 稿里 code 极少，冷静即可）
    // note side-bar 差异化：晚点橙金 double 双线，archival 卡纸的"双栏栏注"质感
    noteBorder: "#b86f2a",
    noteBorderStyle: "double",
    noteBorderWidth: 4
  },
  // 语义四色（规范 §1.1）：色相均匀分布在色轮，newsletter 胶囊语言本就轻
  status: {
    tip: { accent: "#2d6a5a", soft: "#dceae4" },
    // 墨绿（要点 TL;DR）
    info: { accent: "#3d5a75", soft: "#dce4ec" },
    // 烟蓝（背景 Context）
    warning: { accent: "#8a5a1a", soft: "#ece0c5" },
    // 琥珀褐（存疑 Questioned）
    danger: { accent: "#8a2a1c", soft: "#ecd4cf" }
    // 铁锈红（错判 Flawed）
  },
  // ============================================================
  // 字号 / 间距 / 圆角（规范 §1.2 / §2 / §3.12）
  // ============================================================
  typography: {
    baseSize: 16,
    // 比 academic 的 15/1.75 更松 —— 长读感是 industry 核心
    lineHeight: 1.85,
    h1Size: 26,
    // 可读性优先，不压阵
    h2Size: 20,
    // newsletter 不做章节通栏线
    h3Size: 17,
    // 降到 600 避免和 h2 抢
    letterSpacing: 0.3
    // 比 academic 紧，比 people-story 更 neutral
  },
  spacing: {
    paragraph: 18,
    section: 32,
    // glyph 菱形 ornament 上下呼吸
    listItem: 10,
    containerPadding: 18
  },
  radius: { sm: 2, md: 3, lg: 4 },
  // 比 business 的 0/2/4 略松一档，保留 newsletter 温度
  // ============================================================
  // Motifs（规范 §1.3 · 五件互不撞车）
  // ============================================================
  motifs: {
    // h2Prefix · 3×13 primary 竖条 + 3×3 accent 橙金小方块
    h2Prefix: {
      viewBox: [0, 0, 11, 14],
      width: 11,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 10 },
      primitives: [
        { type: "rect", x: 0, y: 0, w: 3, h: 13, fill: "token:primary" },
        { type: "rect", x: 7, y: 5, w: 3, h: 3, fill: "token:accent" }
      ]
    },
    // sectionCorner · 3×3 accent 橙金小方块（非 L 形 —— L 形是 business 专属）
    sectionCorner: {
      viewBox: [0, 0, 6, 6],
      width: 5,
      height: 5,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 7 },
      primitives: [{ type: "rect", x: 0, y: 0, w: 3, h: 3, fill: "token:accent" }]
    },
    // quoteMark · 方头双引号（28×22，primary 实心），比 business 更矮更粗
    quoteMark: {
      viewBox: [0, 0, 32, 24],
      width: 28,
      height: 22,
      inlineStyle: { display: "inline-block", verticalAlign: "top", marginRight: 4 },
      primitives: [
        {
          type: "path",
          d: "M2,4 L10,4 L10,8 L6,8 L6,14 L10,14 L10,18 L2,18 Z M16,4 L24,4 L24,8 L20,8 L20,14 L24,14 L24,18 L16,18 Z",
          fill: "token:primary"
        }
      ]
    },
    // dividerFlower · 中央菱形 ornament（规范 §1.3 ④）
    // 简单实心菱形 8×8，primary 填充；与 literary 的 ❦ 花饰刻意区分
    dividerFlower: {
      viewBox: [0, 0, 24, 12],
      width: 18,
      height: 10,
      primitives: [
        { type: "path", d: "M12,2 L16,6 L12,10 L8,6 Z", fill: "token:primary" }
      ]
    },
    // dividerDots · 三点横排（极淡，border 米纸边色，克制）
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: "circle", cx: 108, cy: 4, r: 1.6, fill: "token:border" },
        { type: "circle", cx: 120, cy: 4, r: 1.6, fill: "token:border" },
        { type: "circle", cx: 132, cy: 4, r: 1.6, fill: "token:border" }
      ]
    },
    // dividerWave · 保留但本主题默认走 glyph variant（规范 §1.3 禁用 K 线语义 wave）
    // 中性 3 段短 dash，作为资产契约兜底
    dividerWave: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: "line", x1: 60, y1: 4, x2: 90, y2: 4, stroke: "token:border", strokeWidth: 1.2 },
        { type: "line", x1: 105, y1: 4, x2: 135, y2: 4, stroke: "token:border", strokeWidth: 1.2 },
        { type: "line", x1: 150, y1: 4, x2: 180, y2: 4, stroke: "token:border", strokeWidth: 1.2 }
      ]
    },
    // tipIcon（要点 TL;DR）：列表三横线 —— "要点摘要"语义
    tipIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "line", x1: 3, y1: 4, x2: 11, y2: 4, stroke: "token:status.tip.accent", strokeWidth: 1.4, strokeLinecap: "round" },
        { type: "line", x1: 3, y1: 7, x2: 11, y2: 7, stroke: "token:status.tip.accent", strokeWidth: 1.4, strokeLinecap: "round" },
        { type: "line", x1: 3, y1: 10, x2: 8, y2: 10, stroke: "token:status.tip.accent", strokeWidth: 1.4, strokeLinecap: "round" }
      ]
    },
    // infoIcon（背景 Context）：圆框 + i 柱 —— 经典"信息"
    infoIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "circle", cx: 7, cy: 7, r: 5.5, stroke: "token:status.info.accent", strokeWidth: 1.2 },
        { type: "rect", x: 6.4, y: 3.4, w: 1.2, h: 1.2, fill: "token:status.info.accent" },
        { type: "rect", x: 6.4, y: 5.6, w: 1.2, h: 5, fill: "token:status.info.accent" }
      ]
    },
    // warningIcon（存疑 Questioned）：问号 —— 与传统"三角警告"区分（那是 business 专属）
    warningIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "circle", cx: 7, cy: 7, r: 5.5, stroke: "token:status.warning.accent", strokeWidth: 1.2 },
        {
          type: "path",
          d: "M5.2,5.2 C5.2,4 6,3.2 7,3.2 C8,3.2 8.8,4 8.8,5 C8.8,5.8 8.2,6.2 7.5,6.8 L7,7.5 L7,8.5",
          stroke: "token:status.warning.accent",
          strokeWidth: 1.2,
          strokeLinecap: "round"
        },
        { type: "rect", x: 6.4, y: 10, w: 1.2, h: 1.2, fill: "token:status.warning.accent" }
      ]
    },
    // dangerIcon（错判 Flawed）：交叉（×）—— 勘误条审美，比 business 的火警色更冷
    dangerIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "circle", cx: 7, cy: 7, r: 5.5, stroke: "token:status.danger.accent", strokeWidth: 1.2 },
        { type: "line", x1: 4.5, y1: 4.5, x2: 9.5, y2: 9.5, stroke: "token:status.danger.accent", strokeWidth: 1.4, strokeLinecap: "round" },
        { type: "line", x1: 9.5, y1: 4.5, x2: 4.5, y2: 9.5, stroke: "token:status.danger.accent", strokeWidth: 1.4, strokeLinecap: "round" }
      ]
    },
    // stepBadge(N) · 24×24 实心圆 + 白数字印章（timeline-dot variant 不消费，但保留作 variant 切换兜底）
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      placeholders: ["N"],
      primitives: [
        { type: "circle", cx: 12, cy: 12, r: 11, fill: "token:primary" },
        {
          type: "text",
          x: 12,
          y: 17,
          content: "{N}",
          fontSize: 15,
          fontWeight: 700,
          fill: "token:textInverse",
          textAnchor: "middle"
        }
      ]
    },
    // issueStamp(issue,date,kind) · 期号戳（industry 的 DNA）
    // 双线矩形框 + 中英混排。由 cover/author/footerCTA 共享注入。
    // 模板固定 `ISSUE #{issue} · {date} · {kind}`；内框 stroke-width ≥ 1（validateSpec 硬下限）。
    // viewBox 320：覆盖 `ISSUE #023 · 2025-04-20 · 周刊` 等真实值（28 字混排约 270px），
    // 留 50px 兜底，避免触发 motif-fit 自动扩张并保证 WeChat 粘贴后 CJK kind 不被裁。
    // letterSpacing 1.0：与 official-gazette 同步，1.5 在 28 字混排下累计 40+px、是宽度溢出大头。
    issueStamp: {
      viewBox: [0, 0, 320, 24],
      width: 320,
      height: 24,
      inlineStyle: { display: "inline-block", verticalAlign: "middle" },
      placeholders: ["issue", "date", "kind"],
      primitives: [
        { type: "rect", x: 0.5, y: 0.5, w: 319, h: 23, stroke: "token:accent", strokeWidth: 1 },
        { type: "rect", x: 3, y: 3, w: 314, h: 18, stroke: "token:accent", strokeWidth: 1, opacity: 0.55 },
        {
          // textAnchor=middle + x=viewBox 中线：内容居中，左右留白对称。
          // motif-fit 已正确处理 middle 锚点（right = x + w/2），超长 kind 仍可触发扩张。
          type: "text",
          x: 160,
          y: 16,
          content: "ISSUE #{issue} · {date} · {kind}",
          fontSize: 14,
          fontWeight: 600,
          fill: "token:accent",
          textAnchor: "middle",
          letterSpacing: 1
        }
      ]
    }
  },
  // ============================================================
  // 骨架变体（规范 §2）
  // ============================================================
  variants: {
    admonition: "report-section",
    // 全主题签名：顶 3px 底 1px + § 方角标签，研究报告条款感（从圆角胶囊升级到方角标签）
    quote: "column-rule",
    // quoteCard：左右双竖线，Benedict Evans 风 pull-quote
    compare: "data-card",
    // 数据卡：与 report-section 的研究报告骨架同源（顶色条 + 大号数字）
    steps: "timeline-dot",
    // 拒绝 number-circle / ribbon-chain
    divider: "glyph",
    // 中央菱形 ◆
    sectionTitle: "cornered",
    // 左上 3×3 accent 方块
    codeBlock: "bare",
    // code 安静处理；不做 header-bar 语言标签带
    note: "side-bar",
    // 左 2px 标线 + 缩进，与 report-section 条款感呼应
    footnotes: "top-rule",
    // 顶部 hairline + 密栏小字，研究报告参考文献条款感
    recommend: "card-list",
    qrcode: "bare",
    footerCTA: "button-led",
    pullQuote: "giant-mark",
    announcement: "danger-bar",
    tableCard: "rule-grid",
    gallery: "duo",
    dialogue: "qa-rows",
    qaBlock: "numbered-faq"
  },
  signatureContainers: [
    "cover",
    "author",
    "footerCTA",
    "abstract",
    "keyNumber",
    "imageCaption",
    // italic 居左图注，Stratechery 风
    "authorBio",
    // newsletter 作者卡（作者 + bio + 期号）
    "timeline"
    // newsletter 期号时间线
  ],
  // ============================================================
  // 元素级样式（规范 §1.2）
  // ============================================================
  elements: {
    h1: {
      "font-size": "26px",
      "font-weight": "700",
      color: "#1a2332",
      "margin-top": "28px",
      "margin-bottom": "16px",
      "line-height": "1.4",
      "letter-spacing": "0.4px"
    },
    h2: {
      "font-size": "20px",
      "font-weight": "700",
      color: "#1a2332",
      "margin-top": "32px",
      "margin-bottom": "14px",
      "line-height": "1.45",
      "letter-spacing": "0.3px",
      "border-bottom": "none",
      "padding-bottom": "0"
    },
    h3: {
      "font-size": "17px",
      "font-weight": "600",
      color: "#1a2332",
      "margin-top": "24px",
      "margin-bottom": "10px",
      "line-height": "1.55",
      "letter-spacing": "0.2px"
    },
    h4: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#1a2332",
      "margin-top": "20px",
      "margin-bottom": "8px",
      "line-height": "1.5",
      "letter-spacing": "0.2px"
    },
    h5: {
      "font-size": "16px",
      "font-weight": "600",
      color: "#1a2332",
      "margin-top": "16px",
      "margin-bottom": "6px",
      "line-height": "1.55",
      "letter-spacing": "0.2px"
    },
    h6: {
      "font-size": "13px",
      "font-weight": "600",
      color: "#5a6778",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.5",
      "letter-spacing": "1px",
      "text-transform": "uppercase"
    },
    p: {
      "font-size": "16px",
      "line-height": "1.85",
      color: "#1a2332",
      "margin-top": "0",
      "margin-bottom": "18px",
      "letter-spacing": "0.3px"
    },
    blockquote: {
      "border-left": "1px solid #e0d6c0",
      "border-right": "none",
      "background-color": "transparent",
      color: "#5a6778",
      "padding-top": "6px",
      "padding-right": "0",
      "padding-bottom": "6px",
      "padding-left": "16px",
      "margin-top": "0",
      "margin-bottom": "18px",
      "border-radius": "0",
      "font-size": "15px",
      "line-height": "1.8"
    },
    ul: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "18px" },
    ol: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "18px" },
    li: {
      "margin-bottom": "10px",
      "line-height": "1.85",
      color: "#1a2332",
      "letter-spacing": "0.3px"
    },
    strong: {
      "font-weight": "600",
      color: "#24364f"
    },
    em: { "font-style": "italic", color: "#1a2332" },
    a: {
      color: "#24364f",
      "text-decoration": "underline",
      "text-underline-offset": "3px"
    },
    hr: {
      border: "none",
      height: "1px",
      "background-color": "#e0d6c0",
      "margin-top": "32px",
      "margin-bottom": "32px"
    },
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "12px",
      "margin-right": "auto",
      "margin-bottom": "12px",
      "margin-left": "auto",
      "border-radius": "3px"
    },
    pre: {
      "background-color": "#ece3cf",
      color: "#1a2332",
      "padding-top": "14px",
      "padding-right": "16px",
      "padding-bottom": "14px",
      "padding-left": "16px",
      "border-radius": "3px",
      border: "1px solid #e0d6c0",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "box-shadow": "inset -14px 0 10px -10px rgba(0,0,0,0.15)",
      "margin-top": "0",
      "margin-bottom": "20px",
      "font-size": "13px",
      "line-height": "1.7"
    },
    code: {
      "background-color": "#ece3cf",
      color: "#24364f",
      padding: "1px 5px",
      "border-radius": "2px",
      "font-size": "14px",
      "font-weight": "500"
    },
    // 米黄 newsletter 键：bgSoft 米底 + 暖墨蓝边（primary 色，无立体夸张感）
    kbd: {
      display: "inline-block",
      "background-color": "#f5efe1",
      color: "#1a2332",
      border: "1px solid #24364f",
      "border-bottom-width": "2px",
      "border-radius": "2px",
      padding: "1px 6px",
      "font-size": "12px",
      "line-height": "1.4",
      "vertical-align": "middle"
    },
    // Stratechery 米黄 newsletter 表：极简 hairline + serif 小字 + 数据栏感（无左右边框）
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "20px",
      "font-size": "14px"
    },
    th: {
      "border-bottom": "1.5px solid #24364f",
      "border-top": "none",
      "border-left": "none",
      "border-right": "none",
      padding: "6px 10px",
      "background-color": "transparent",
      "text-align": "left",
      "font-weight": "600",
      color: "#24364f",
      "font-size": "13px"
    },
    td: {
      "border-bottom": "1px solid #e0d6c0",
      "border-top": "none",
      "border-left": "none",
      "border-right": "none",
      padding: "7px 10px",
      color: "#1a2332",
      "font-size": "14px"
    }
  },
  // ============================================================
  // 内联强调（规范 §1.2 / §3.1）
  // ============================================================
  inline: {
    highlight: {
      "background-color": "#f5efe1",
      color: "#1a2332",
      padding: "0 3px",
      "border-radius": "2px"
    },
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#b86f2a",
      "text-underline-offset": "3px"
    },
    emphasis: {
      color: "#24364f",
      "font-weight": "600"
    },
    del: {
      color: "#5a6778",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#24364f",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器视觉（规范 §2）
  // ============================================================
  containers: {
    intro: {
      "background-color": "transparent",
      "border-left": "3px solid #b86f2a",
      "border-radius": "0",
      padding: "14px 16px 14px 17px",
      margin: "0 0 24px 0",
      color: "#1a2332"
    },
    author: {
      "background-color": "transparent",
      "border-bottom": "1px solid #e0d6c0",
      "border-radius": "0",
      padding: "10px 0",
      margin: "0 0 24px 0"
    },
    cover: {
      margin: "0 0 32px 0"
    },
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // side-bar variant 完整接管外壳；空 slot 是与 variants.note 的契约同步
    note: {},
    quoteCard: {
      "background-color": "#f5efe1",
      padding: "20px 28px",
      margin: "28px 0",
      "border-radius": "3px"
    },
    highlight: {
      "background-color": "#f5efe1",
      "border-left": "3px solid #b86f2a",
      padding: "8px 14px 8px 16px",
      margin: "20px 0",
      "border-radius": "2px"
    },
    compare: { margin: "24px 0" },
    steps: { margin: "24px 0" },
    sectionTitle: {
      __reset: true,
      margin: "36px 0 16px",
      "padding-bottom": "8px"
    },
    footerCTA: {
      margin: "40px 0 0 0",
      padding: "18px 20px",
      "background-color": "transparent",
      "border-top": "1.5px solid #24364f",
      "border-bottom": "1.5px solid #24364f",
      "border-radius": "0"
    },
    recommend: {
      margin: "24px 0",
      padding: "16px 18px",
      "background-color": "#f5efe1",
      "border-radius": "3px"
    },
    abstract: {
      "background-color": "#f5efe1",
      "border-left": "3px solid #24364f",
      padding: "14px 16px 14px 18px",
      margin: "18px 0 24px",
      "border-radius": "2px"
    },
    keyNumber: {
      "background-color": "#f5efe1",
      "border-top": "3px solid #b86f2a",
      padding: "14px 16px",
      margin: "18px 0",
      "border-radius": "2px"
    },
    qrcode: {
      margin: "24px auto",
      padding: "0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    // Stratechery 图注：italic + 居左 textMuted，分析稿图注克制不喧宾
    imageCaption: {
      margin: "8px 0 20px",
      "text-align": "left",
      "font-size": "13px",
      color: "#5a6778",
      "font-style": "italic",
      "line-height": "1.6"
    },
    // newsletter 作者卡：Stratechery 风"作者 + bio + 期号"卡，暖米底 + primary 顶线
    authorBio: {
      __reset: true,
      "background-color": "#f5efe1",
      "border-top": "2px solid #24364f",
      "border-radius": "2px",
      padding: "16px 18px",
      margin: "28px 0"
    },
    // newsletter 期号时间线：左侧 primary 竖线 + accent 橙金点，报告演进感
    timeline: {
      __reset: true,
      "border-left": "2px solid #24364f",
      padding: "0 0 0 20px",
      margin: "24px 0"
    }
  },
  // ============================================================
  // Templates —— 仅声明对 commonTemplates 的覆盖
  // ============================================================
  templates: {
    // 规范 §2.3 cover：标题 + 导语 + Issue stamp（attrs 驱动）
    cover: `::: cover 专题头 · 本期主标题 issue=023 date=2025-04-20 kind=周刊
![封面占位](https://placehold.co/1200x630?text=industry-observer)

副标题或一句话立意 —— 模拟 newsletter 的"本期导读"，可两到三行。
:::
`,
    // 规范 §2.2 author：撰文条（attrs 携带 issue 信息）
    authorBar: `::: author 林磊 role=深响编辑 date=2025-04-20 issue=023 kind=周刊
\`\`\`
`,
    // 规范 §2.10 tip 签名：pill-tag + "要点"中文胶囊
    tip: `::: tip 要点
- 本期核心观察一
- 本期核心观察二
- 本期核心观察三
:::
`,
    // 规范 §2.7 footerCTA：Newsletter 订阅（非 business 投资号语境）
    footerCTA: `::: footer-cta 订阅「某某观察」 cta=扫码订阅 ▸ issue=023 date=2025-04-20 kind=周刊
每周二清晨送到，30 分钟读完。不追热点，不发快讯，只讲值得下判断的行业变化。
:::
`
  },
  meta: {
    createdAt: "2026-04-20",
    ownerNotes: 'issueStamp 走模板渲染（固定 ISSUE #{issue} · {date} · {kind}），不再做"空参数跳过"条件分支。SVG strokeWidth 全员 ≥ 1（validateSpec 硬下限）。'
  }
};
const spec$9 = {
  id: "people-story",
  name: "人物特稿",
  description: '《人物》杂志 / New Yorker Profiles 家族，特稿的"肖像感"排版',
  audience: "人物特稿 / 人文非虚构 / 杂志 Profile",
  // ============================================================
  // 色板（规范 §1.1）
  // ============================================================
  palette: {
    primary: "#1b2330",
    // 深墨靛
    secondary: "#4a5260",
    // 靛灰
    accent: "#8a3f2b",
    // 深铁锈（旧照片里的红）
    bg: "#f2efe7",
    // 冷米
    bgSoft: "#e9e5db",
    bgMuted: "#dcd7c9",
    text: "#17171a",
    textMuted: "#5d5d63",
    // 版权灰
    textInverse: "#f2efe7",
    // = bg（规避 #fff 透明化陷阱）
    border: "#c8c2b3",
    code: "#5d5d63"
    // = textMuted
  },
  // 语义四色（规范 §1.1）
  status: {
    tip: { accent: "#3f5e6e", soft: "#d9dfe2" },
    // 钢笔蓝灰（采访手记，5.14:1）
    info: { accent: "#4d5868", soft: "#d6d9dd" },
    // 灰铅笔（背景说明，5.09:1）
    warning: { accent: "#6c5e30", soft: "#e2ddc8" },
    // 档案黄（FACT CHECK，4.70:1）
    danger: { accent: "#6b3a32", soft: "#dccdc7" }
    // 暗铁锈浅（官方回应）
  },
  // ============================================================
  // 字号 / 间距 / 圆角
  // ============================================================
  typography: {
    baseSize: 16,
    lineHeight: 1.75,
    h1Size: 28,
    h2Size: 20,
    h3Size: 16,
    letterSpacing: 0.5
  },
  spacing: {
    paragraph: 20,
    section: 36,
    listItem: 10,
    containerPadding: 20
  },
  // 规范 §3.9：方版心是杂志，圆角是 App —— 全员 radius 0/0/2
  radius: { sm: 0, md: 0, lg: 2 },
  // ============================================================
  // Motifs（规范 §1.3：巨号 serif 引号 + 瘦细 column rule + 罗马数字 + 肖像 silhouette）
  // ============================================================
  motifs: {
    // sectionCorner：肖像 silhouette —— 头（圆）+ 肩（梯形），border 色让它退后
    sectionCorner: {
      viewBox: [0, 0, 24, 24],
      width: 18,
      height: 18,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      primitives: [
        { type: "circle", cx: 12, cy: 7, r: 4.5, fill: "token:border" },
        { type: "path", d: "M8,16 L16,16 L19,22 L5,22 Z", fill: "token:border" }
      ]
    },
    // quoteMark：巨号 serif 左双引号（48×42 accent）—— 主题第一装饰
    quoteMark: {
      viewBox: [0, 0, 60, 52],
      width: 48,
      height: 42,
      inlineStyle: { display: "inline-block", verticalAlign: "top", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M10,4 C4,10 4,24 10,34 C14,40 22,38 22,30 C22,24 16,22 14,22 C14,14 16,10 22,6 L22,4 Z M36,4 C30,10 30,24 36,34 C40,40 48,38 48,30 C48,24 42,22 40,22 C40,14 42,10 48,6 L48,4 Z",
          fill: "token:accent",
          opacity: 0.92
        }
      ]
    },
    // dividerFlower：菱形 + 两侧瘦细横线（章节分隔）
    dividerFlower: {
      viewBox: [0, 0, 240, 12],
      width: 220,
      height: 12,
      primitives: [
        { type: "line", x1: 30, y1: 6, x2: 110, y2: 6, stroke: "token:border", strokeWidth: 1 },
        { type: "line", x1: 130, y1: 6, x2: 210, y2: 6, stroke: "token:border", strokeWidth: 1 },
        {
          type: "path",
          d: "M120,2 L124,6 L120,10 L116,6 Z",
          fill: "token:primary",
          opacity: 0.7
        }
      ]
    },
    // dividerDots：—— · —— byline 分隔
    dividerDots: {
      viewBox: [0, 0, 100, 8],
      width: 100,
      height: 8,
      primitives: [
        { type: "line", x1: 6, y1: 4, x2: 46, y2: 4, stroke: "token:border", strokeWidth: 1 },
        { type: "circle", cx: 50, cy: 4, r: 1.8, fill: "token:textMuted" },
        { type: "line", x1: 54, y1: 4, x2: 94, y2: 4, stroke: "token:border", strokeWidth: 1 }
      ]
    },
    // dividerWave：本主题不使用但保留契约（3 段短 dash 替代 wave）
    dividerWave: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: "line", x1: 60, y1: 4, x2: 90, y2: 4, stroke: "token:border", strokeWidth: 1 },
        { type: "line", x1: 105, y1: 4, x2: 135, y2: 4, stroke: "token:border", strokeWidth: 1 },
        { type: "line", x1: 150, y1: 4, x2: 180, y2: 4, stroke: "token:border", strokeWidth: 1 }
      ]
    },
    // tipIcon（采访手记）：铅笔划小点 + 短横线
    tipIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "circle", cx: 7, cy: 7, r: 1.2, fill: "#4a6a7a", opacity: 0.7 },
        {
          type: "line",
          x1: 3,
          y1: 10.5,
          x2: 11,
          y2: 10.5,
          stroke: "#4a6a7a",
          strokeWidth: 1,
          opacity: 0.7
        }
      ]
    },
    // infoIcon（背景说明）：极简 i 柱
    infoIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 6.5, y: 3, w: 1, h: 1.5, fill: "#556170", opacity: 0.7 },
        { type: "rect", x: 6.5, y: 6, w: 1, h: 5, fill: "#556170", opacity: 0.7 }
      ]
    },
    // warningIcon（FACT CHECK 事实核查）：打勾
    warningIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M3,7 L6,10 L11,4",
          stroke: "#7a6b3a",
          strokeWidth: 1,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          opacity: 0.7
        }
      ]
    },
    // dangerIcon（官方回应）：短竖杠 —— 法律意见书封口
    dangerIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [{ type: "rect", x: 6.4, y: 3, w: 1.2, h: 8, fill: "token:status.danger.accent", opacity: 0.7 }]
    },
    // stepBadge：大号数字 + 下横线（24×24）。
    // `{N}` 占位符在运行时由渲染器替换为罗马数字（替换发生在 spec 层之外）。
    stepBadge: {
      viewBox: [0, 0, 40, 40],
      width: 24,
      height: 24,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 10 },
      placeholders: ["N"],
      primitives: [
        {
          type: "text",
          x: 20,
          y: 26,
          content: "{N}",
          fontSize: 24,
          fontWeight: 700,
          fill: "token:accent",
          textAnchor: "middle"
        },
        { type: "line", x1: 8, y1: 32, x2: 32, y2: 32, stroke: "token:accent", strokeWidth: 1.2 }
      ]
    }
  },
  // ============================================================
  // 骨架变体（规范 §2）
  // ============================================================
  variants: {
    admonition: "magazine-pull",
    // 全主题签名：上下细线 + 浮空小字标签，《人物》拉引框（取代左竖线的 minimal-underline）
    quote: "magazine-dropcap",
    // quoteCard：巨号 serif 引号 + 金句 + byline
    compare: "stacked-row",
    // 人物特稿对比偏陈述式：先一段 A 再一段 B，避免双列拥挤
    steps: "timeline-dot",
    // stepBadge 走本主题罗马徽章
    divider: "glyph",
    // 中性 ◆ glyph，与 magazine-pull 的"刊物体"装饰语言一致
    sectionTitle: "number-prefix",
    // 大号 monospace 编号，《人物》刊号风
    codeBlock: "inline-card",
    // 人物特稿偶引代码（采访技术人物），inline-card 不抢正文
    note: "minimal-callout",
    // 与 magazine-pull 的"细线 + 空气感"语言一致
    footnotes: "boxed-aside",
    // 软底卡片 + pill kicker，narrative aside 适合刊物体
    recommend: "card-list",
    qrcode: "bare",
    footerCTA: "button-led",
    pullQuote: "giant-mark",
    announcement: "danger-bar",
    tableCard: "rule-grid",
    gallery: "duo",
    dialogue: "qa-rows",
    qaBlock: "numbered-faq"
  },
  // Decorations（规范 §1.2 / §1.3 ③ / §3.7：intro 首字下沉 + h2 自动罗马数字前缀）。
  // 渲染逻辑由 pipeline/markdown.ts 统一执行；本 spec 只描述"长什么样"。
  decorations: {
    // 规范 §1.2：intro 首段首字 48px / 700 / accent / inline-block。
    // 前导标点跳过 / 数字判定的扫描逻辑无法声明式表达, 由 markdown.ts 共享层实现；
    // 主题只声明色 / 字号 / 字重等样式参数。
    introDropcap: {
      color: "accent",
      // 铁锈色
      fontSize: 48,
      fontWeight: 700,
      marginRight: 8,
      paddingTop: 4
    },
    headingPrefix: [
      {
        level: 2,
        autoNumber: "roman",
        style: {
          color: "accent",
          // 铁锈色（与 quoteMark / sectionCorner 同色系）
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: 2,
          marginRight: 10,
          underline: true,
          underlinePad: 2
        }
      }
    ]
  },
  // ============================================================
  // 元素级样式（规范 §1.2）
  // ============================================================
  elements: {
    // h1 28/700/1.2px/1.35 —— 左对齐（杂志封面大名字顶格左对齐）
    h1: {
      "font-size": "28px",
      "font-weight": "700",
      color: "#17171a",
      "margin-top": "28px",
      "margin-bottom": "16px",
      "line-height": "1.35",
      "letter-spacing": "1.2px",
      "text-align": "left"
    },
    // h2 20/600/1px/1.5 —— 章节前挂罗马数字 span；不做通栏横线
    h2: {
      "font-size": "20px",
      "font-weight": "600",
      color: "#17171a",
      "margin-top": "30px",
      "margin-bottom": "12px",
      "line-height": "1.5",
      "letter-spacing": "1px",
      "border-bottom": "none",
      "padding-bottom": "0"
    },
    // h3 16/600/0.8px/1.7 —— 与正文同号，靠字重跳一档
    h3: {
      "font-size": "16px",
      "font-weight": "600",
      color: "#17171a",
      "margin-top": "22px",
      "margin-bottom": "10px",
      "line-height": "1.7",
      "letter-spacing": "0.8px"
    },
    // h4：小节引导，介于 h3 与正文之间
    h4: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#17171a",
      "margin-top": "18px",
      "margin-bottom": "8px",
      "line-height": "1.6",
      "letter-spacing": "0.5px"
    },
    h5: {
      "font-size": "16px",
      "font-weight": "600",
      color: "#17171a",
      "margin-top": "16px",
      "margin-bottom": "6px",
      "line-height": "1.65",
      "letter-spacing": "0.5px"
    },
    h6: {
      "font-size": "16px",
      "font-weight": "500",
      color: "#5d5d63",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.6",
      "letter-spacing": "0.5px"
    },
    // p 16/400/0.5px/1.75 —— 红线行高 1.75
    p: {
      "font-size": "16px",
      "line-height": "1.75",
      color: "#17171a",
      "margin-top": "0",
      "margin-bottom": "20px",
      "letter-spacing": "0.5px"
    },
    // blockquote：双侧 1px textMuted 竖线（column-rule 气质）
    blockquote: {
      "border-left": "1px solid #5d5d63",
      "border-right": "1px solid #5d5d63",
      "background-color": "transparent",
      color: "#5d5d63",
      "padding-top": "8px",
      "padding-right": "20px",
      "padding-bottom": "8px",
      "padding-left": "20px",
      "margin-top": "0",
      "margin-bottom": "18px",
      "border-radius": "0",
      "font-size": "16px",
      "letter-spacing": "0.8px"
    },
    ul: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "20px" },
    ol: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "20px" },
    li: {
      "margin-bottom": "10px",
      "line-height": "1.75",
      color: "#17171a",
      "letter-spacing": "0.5px"
    },
    // strong 500 —— 杂志正文加粗克制
    strong: { "font-weight": "500", color: "#17171a" },
    em: { "font-style": "italic", color: "#17171a" },
    // 链接走 primary 深墨靛（accent 是稀缺色）
    a: {
      color: "#1b2330",
      "text-decoration": "underline"
    },
    // divider rule：1px border 色横线 + 36px 上下 margin
    hr: {
      border: "none",
      height: "1px",
      "background-color": "#c8c2b3",
      "margin-top": "36px",
      "margin-bottom": "36px"
    },
    // cover：图片 radius 0（杂志封面从不圆角）
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "12px",
      "margin-right": "auto",
      "margin-bottom": "12px",
      "margin-left": "auto",
      "border-radius": "0"
    },
    pre: {
      "background-color": "#dcd7c9",
      color: "#17171a",
      "padding-top": "14px",
      "padding-right": "16px",
      "padding-bottom": "14px",
      "padding-left": "16px",
      "border-radius": "0",
      border: "1px solid #c8c2b3",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "box-shadow": "inset -14px 0 10px -10px rgba(0,0,0,0.12)",
      "margin-top": "0",
      "margin-bottom": "20px",
      "font-size": "13px",
      "line-height": "1.7"
    },
    code: {
      "background-color": "#dcd7c9",
      color: "#5d5d63",
      // = textMuted
      padding: "1px 5px",
      "border-radius": "0",
      "font-size": "14px"
    },
    // 杂志数据表 / 索引表骨架：th 走 hairline 下划线 + uppercase 小字 + tabular nums——
    // 对应 people-story 规范 §1.2 byline 字距策略（大字距 + 小字号 = 版权行身份证），
    // 表格字段名借用这套语言，让"数据栏"有档案索引感而非电子表格感。无外框无外底。
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "24px",
      "font-size": "14px"
    },
    // th：uppercase 小字 + 大字距 + hairline 下划线——杂志年表索引的"栏目行"写法。
    th: {
      "text-align": "left",
      "font-weight": "600",
      color: "#5d5d63",
      "font-size": "12px",
      "letter-spacing": "1.5px",
      "text-transform": "uppercase",
      "padding-top": "4px",
      "padding-right": "14px",
      "padding-bottom": "8px",
      "padding-left": "0",
      "border-bottom": "1px solid #c8c2b3",
      "background-color": "transparent"
    },
    // td：tabular nums 感（monospace 数字感，letter-spacing 0 贴紧数据）+ hairline 分隔。
    td: {
      "text-align": "left",
      color: "#17171a",
      "font-size": "14px",
      "letter-spacing": "0.3px",
      "padding-top": "8px",
      "padding-right": "14px",
      "padding-bottom": "8px",
      "padding-left": "0",
      "border-bottom": "1px solid #e9e5db",
      "vertical-align": "top"
    },
    // 杂志感 kbd：细 1px border + primary 深墨靛色 + 小字号——
    // 人物稿里 kbd 偶尔出现在引用"某某说过的术语"场景，走版面感而非技术感。
    // 对应 people-story 规范"瘦细线是杂志的分隔语言"。
    kbd: {
      display: "inline-block",
      "background-color": "transparent",
      color: "#1b2330",
      border: "1px solid #c8c2b3",
      "border-radius": "0",
      padding: "1px 5px",
      "font-size": "13px",
      "line-height": "1.5",
      "vertical-align": "middle",
      "letter-spacing": "0.5px"
    }
  },
  // ============================================================
  // Inline 强调（规范 §1.3）
  // ============================================================
  inline: {
    // highlight 走 bgSoft 底 + text 色 —— 不做荧光黄，不染 accent
    highlight: {
      "background-color": "#e9e5db",
      color: "#17171a",
      padding: "0 3px",
      "border-radius": "0"
    },
    // 波浪线走 primary 深墨靛（accent 是稀缺色）
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#1b2330",
      "text-underline-offset": "3px"
    },
    // emphasis：primary + 500（字重克制）
    emphasis: {
      color: "#1b2330",
      "font-weight": "500"
    },
    del: {
      color: "#5d5d63",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#1b2330",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器视觉（规范 §2）
  // ============================================================
  containers: {
    // intro：人物卡 / 导语 —— bgSoft 底 + 20×24 padding + radius 0
    intro: {
      "background-color": "#e9e5db",
      "border-radius": "0",
      padding: "20px 24px",
      margin: "0 0 32px 0",
      color: "#17171a"
    },
    // author：记者 / 摄影条 —— 单行横排，无底色无边框无圆角
    author: {
      "background-color": "transparent",
      "border-radius": "0",
      padding: "10px 0",
      margin: "0 0 24px 0"
    },
    // cover：杂志封面一体化 —— radius 0，大 margin
    cover: {
      margin: "0 0 40px 0"
    },
    // 四态容器外壳（variant 接管）
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // quoteCard：特稿心脏 —— 无底色、无边框、无圆角
    quoteCard: {
      "background-color": "transparent",
      "border-radius": "0",
      border: "none",
      padding: "24px 24px 20px 36px",
      margin: "32px 0"
    },
    // highlight：年表片段 / 生平要点 —— 无底色无边框
    highlight: {
      "background-color": "transparent",
      "border-radius": "0",
      padding: "16px 0",
      margin: "20px 0"
    },
    compare: { margin: "24px 0" },
    steps: { margin: "28px 0" },
    // sectionTitle：章节封面 —— 左上肖像 silhouette + 通栏 1px 横线
    sectionTitle: {
      margin: "48px 0 20px",
      "padding-bottom": "10px",
      "border-bottom": "1px solid #c8c2b3"
    },
    // footerCTA：卷尾致谢 —— 无底色无边框，居中文字块
    footerCTA: {
      margin: "40px 0 0 0",
      padding: "32px 0 24px 0",
      "background-color": "transparent",
      "border-radius": "0",
      "text-align": "center"
    },
    // recommend：延伸阅读 —— bgSoft 底 + radius 0
    recommend: {
      margin: "28px 0",
      padding: "18px 22px",
      "background-color": "#e9e5db",
      "border-radius": "0"
    },
    // qrcode：订阅入口 —— 居中 block，无边框无圆角
    qrcode: {
      margin: "24px auto",
      padding: "0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    // note：杂志批注 / 边注 —— 上下 1px hairline + 左缩进，与 magazine-pull admonition 同语调
    note: {
      __reset: true,
      "background-color": "transparent",
      "border-top": "1px solid #c8c2b3",
      "border-bottom": "1px solid #c8c2b3",
      padding: "10px 0 10px 20px",
      margin: "20px 0",
      color: "#5d5d63",
      "font-size": "14px",
      "line-height": "1.75",
      "letter-spacing": "0.3px",
      "border-radius": "0"
    },
    // 杂志图注：左对齐 byline 格式感，textMuted 小字 + 大字距——
    // 对应 people-story 规范 §1.2 byline："13px / textMuted / 2px 字距"的版权行身份证，
    // 图注用同款语言表达"图N | 摄影：XX | 来源"等多段式图说，区别于 literary 的居中"图说"。
    imageCaption: {
      margin: "8px 0 24px",
      "text-align": "left",
      color: "#5d5d63",
      "font-size": "12px",
      "letter-spacing": "1.2px",
      "border-radius": "0"
    },
    // 杂志感作者卡：无底色无边框（人物稿 byline 就是一行小字不加任何装饰）+
    // 仅靠 padding + border-top hairline 与正文分隔——
    // 对应 people-story 规范 author 容器："无底色、无边框、无圆角——杂志 byline 就是一行小字"。
    // wrapper 层不做 display:flex，renderer 的 nameCSS / roleCSS 走 token 兜底。
    authorBio: {
      __reset: true,
      "background-color": "transparent",
      "border-top": "1px solid #c8c2b3",
      "border-radius": "0",
      padding: "12px 0 12px 0",
      margin: "20px 0"
    },
    // 新刊预告 announcement：上下双 1px primary 线 + 无底色——
    // 对应 people-story 规范"新刊预告"场景（特稿刊物偶尔有"下期主题"横幅）；
    // 走 primary 深墨靛双线而非 danger 红，传达"刊物通告"而非"警告"语义。
    announcement: {
      __reset: true,
      "background-color": "transparent",
      "border-top": "2px solid #1b2330",
      "border-bottom": "1px solid #1b2330",
      "border-radius": "0",
      padding: "12px 0",
      margin: "24px 0",
      color: "#17171a",
      "font-size": "14px",
      "letter-spacing": "0.5px"
    }
  },
  signatureContainers: [
    "cover",
    "author",
    "intro",
    "quoteCard",
    "sectionTitle",
    "footerCTA",
    "recommend",
    "qrcode",
    "imageCaption",
    "authorBio",
    "announcement"
  ],
  // ============================================================
  // Templates（只声明覆盖项；commonTemplates 隐式作为基线）
  // ============================================================
  templates: {
    cover: `::: cover 张某某
![封面肖像](https://placehold.co/1200x1400?text=portrait)

**作家、翻译家，1967 年生于上海**

他曾在一封给编辑的信里写过：关于写作这件事，最难的从来不是开头。
:::
`,
    authorBar: `::: author 文 / 某记者
摄影 / 某摄影师  ·  2026 年 4 月刊
:::
`,
    tip: `::: tip 采访手记
记者笔记本里的旁注 —— 最轻的一档，无边框，仅标题下方一道短线。
:::
`,
    footerCTA: `::: footer-cta 卷尾致谢
本文基于 2026 年 3 月至 6 月多次采访整理而成。

感谢受访者及所有提供帮助的朋友。
:::
`
  },
  meta: {
    createdAt: "2026-04-20",
    ownerNotes: "accent #8a3f2b 稀缺纪律 —— drop cap + pull-quote + roman 三处封顶。stepBadge {N} 占位符在运行时替换为罗马数字（替换发生在 spec 层之外）。"
  }
};
const spec$8 = {
  id: "academic-frontier",
  name: "学术前沿",
  description: "Nature / arXiv / LaTeX article 家族，研究者写给同行评审的严谨陈述",
  audience: "学术研究者 / 同行评审向的论文化陈述",
  // ============================================================
  // 色板（规范 §1.1 色彩表）
  // ============================================================
  palette: {
    primary: "#1e2c4a",
    secondary: "#4a5670",
    accent: "#8a2a2a",
    bg: "#fefefe",
    bgSoft: "#f6f6f4",
    bgMuted: "#ececea",
    text: "#16181d",
    textMuted: "#5a5d64",
    textInverse: "#fefefe",
    border: "#d8d8d4",
    code: "#1a1a1a"
  },
  // 语义四色（规范 §1.1 语义色表）
  //
  // 学术语境**不走交通灯**——Nature/arXiv 里 "Caveat" 不用红色警示，
  // 而是用"更灰、更轻"的存疑标识：读者注意到的不是"危险"而是"学者的犹豫"。
  //   - danger 改 **墨灰** #3a3e48（不再是深酒红）——视觉比正文更轻而非更重
  //   - 其余保持：tip=primary 深靛 / info=secondary 靛灰 / warning=古土黄
  status: {
    // tip = Definition；与 primary 共色
    tip: { accent: "#1e2c4a", soft: "#f3f4f7" },
    // info = Methods；= secondary 引文靛灰
    info: { accent: "#4a5670", soft: "#f1f2f4" },
    // warning = Limitations；古文献土黄
    warning: { accent: "#5a4a18", soft: "#f5f2e8" },
    // danger = Caveat；墨灰（打破 danger=红公式 —— 学术语境要"轻"）
    danger: { accent: "#3a3e48", soft: "#eeeff2" }
  },
  // ============================================================
  // 字号 / 间距 / 圆角
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.75,
    h1Size: 24,
    h2Size: 18,
    h3Size: 16,
    letterSpacing: 0.3
  },
  spacing: {
    paragraph: 18,
    section: 36,
    listItem: 8,
    containerPadding: 18
  },
  // 规范 §2.6 / §3.5：所有容器 radius ≤ 2px
  radius: { sm: 2, md: 2, lg: 2 },
  // ============================================================
  // Motifs（规范 §1.3 "无装饰是纪律"）
  // ============================================================
  motifs: {
    // h2Prefix · 1px 深靛竖线（规范 §1.3 ①）
    h2Prefix: {
      viewBox: [0, 0, 2, 16],
      width: 2,
      height: 16,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 10 },
      primitives: [{ type: "rect", x: 0, y: 1, w: 2, h: 14, fill: "token:primary" }]
    },
    // sectionCorner · 极简 L 形直角（规范 §1.3 ③ figureCorner）
    sectionCorner: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M1,1 L1,8 M1,1 L8,1",
          stroke: "token:border",
          strokeWidth: 1
        }
      ]
    },
    // stepBadge(n) · 极简文字徽章（规范 §2.16 steps）——本主题 steps 走 timeline-dot，
    //   此处保留字号 14 的文字占位作契约兜底（作者切 variant=number-circle 仍可用）
    stepBadge: {
      viewBox: [0, 0, 20, 20],
      width: 20,
      height: 20,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      placeholders: ["N"],
      primitives: [
        {
          type: "text",
          x: 10,
          y: 15,
          content: "{N}",
          fontSize: 14,
          fontWeight: 500,
          fill: "token:primary",
          textAnchor: "middle"
        }
      ]
    },
    // dividerDots · 三点（次选 fallback）
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: "circle", cx: 108, cy: 4, r: 1.2, fill: "token:border" },
        { type: "circle", cx: 120, cy: 4, r: 1.2, fill: "token:border" },
        { type: "circle", cx: 132, cy: 4, r: 1.2, fill: "token:border" }
      ]
    },
    // dividerFlower · 退化为 ⁂ 三星号 glyph（规范 §2.17 scene break，每篇 ≤ 1 次）
    dividerFlower: {
      viewBox: [0, 0, 240, 16],
      width: 220,
      height: 16,
      primitives: [
        {
          type: "text",
          x: 120,
          y: 13,
          content: "⁂",
          fontSize: 14,
          fill: "token:textMuted",
          textAnchor: "middle",
          letterSpacing: 4
        }
      ]
    },
    // dividerWave · 退化到平直 rule（规范 §1.3 "必删 wave"）——给纯直线兜底
    dividerWave: {
      viewBox: [0, 0, 240, 4],
      width: 220,
      height: 4,
      primitives: [
        { type: "line", x1: 20, y1: 2, x2: 220, y2: 2, stroke: "token:border", strokeWidth: 1 }
      ]
    },
    // tipIcon（Definition）：实心小方块——呼应 theoremMark 的边界语义
    tipIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [{ type: "rect", x: 4, y: 4, w: 6, h: 6, fill: "token:primary" }]
    },
    // infoIcon（Methods）：短下横线——呼应 minimal-underline 形状
    infoIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "line", x1: 3, y1: 10, x2: 11, y2: 10, stroke: "token:secondary", strokeWidth: 1.4 }
      ]
    },
    // warningIcon（Limitations）：四点虚框——呼应 warning 容器 dashed border
    //   原 rect + stroke-dasharray；MotifPrimitive rect 无 dasharray 字段，转写为 path
    warningIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M3,3 L11,3 L11,11 L3,11 Z",
          stroke: "token:status.warning.accent",
          strokeWidth: 1,
          strokeDasharray: "1.5 1.5"
        }
      ]
    },
    // dangerIcon（Fallacy）：L 形双线——呼应 danger 容器的 L 形缺角
    dangerIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "path", d: "M2,2 L2,7 M2,2 L7,2", stroke: "token:accent", strokeWidth: 1.2 },
        { type: "path", d: "M12,12 L12,7 M12,12 L7,12", stroke: "token:accent", strokeWidth: 1.2 }
      ]
    }
    // 规范 §1.3 "必删 quoteMark"——故意不导出，classic variant 走 FALLBACK_OPEN_MARK 字符回退
  },
  // ============================================================
  // 骨架变体（规范 §2 每节的 primary variant）
  // ============================================================
  variants: {
    // 全主题签名：LaTeX 定理框（细 1px 边框 + DEFINITION./REMARK./LEMMA./CAVEAT. 小型大写标题）
    // 取代泛用 accent-bar——academic-frontier 真正承继的是 Nature/arXiv 的 \begin{theorem} 视觉
    admonition: "sidenote-latex",
    quote: "frame-brackets",
    compare: "stacked-row",
    // 学术陈述偏垂直对照：先述 A 再述 B，避免双列拥挤
    steps: "timeline-dot",
    divider: "dots",
    // 极简 · · · 圆点分隔，与 sidenote-latex 的克制语言同源
    sectionTitle: "number-prefix",
    // monospace 章节编号，符合论文 §1 / §2 排印
    codeBlock: "line-numbers",
    // 学术代码偏好行号，便于正文引用"见 line 12"
    note: "box-callout",
    // 学术风：1px 边框包裹的 "Remark" 框，与 sidenote-latex 同语调
    footnotes: "dense-academic",
    // 2px 章节杆 + 深 hanging，论文 bibliography 章
    recommend: "academic-refs",
    // 学术 / 教程主题：参考引用栏走 uppercase 小字 kicker
    qrcode: "bare",
    footerCTA: "button-led",
    pullQuote: "giant-mark",
    announcement: "danger-bar",
    tableCard: "rule-grid",
    gallery: "duo",
    dialogue: "qa-rows",
    qaBlock: "numbered-faq"
  },
  // ============================================================
  // 元素级样式（规范 §1.2 typographic voice）
  // ============================================================
  elements: {
    h1: {
      "font-size": "24px",
      "font-weight": "600",
      color: "#16181d",
      "margin-top": "28px",
      "margin-bottom": "14px",
      "line-height": "1.4",
      "letter-spacing": "0.2px"
    },
    h2: {
      "font-size": "18px",
      "font-weight": "600",
      color: "#16181d",
      "margin-top": "32px",
      "margin-bottom": "12px",
      "line-height": "1.45",
      "letter-spacing": "0.1px",
      "border-bottom": "none",
      "padding-bottom": "0"
    },
    h3: {
      "font-size": "16px",
      "font-weight": "600",
      color: "#16181d",
      "margin-top": "22px",
      "margin-bottom": "10px",
      "line-height": "1.55",
      "letter-spacing": "0"
    },
    h4: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#16181d",
      "margin-top": "18px",
      "margin-bottom": "8px",
      "line-height": "1.6",
      "letter-spacing": "0"
    },
    h5: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#16181d",
      "margin-top": "16px",
      "margin-bottom": "6px",
      "line-height": "1.55",
      "letter-spacing": "0.5px"
    },
    h6: {
      "font-size": "15px",
      "font-weight": "500",
      color: "#5a5d64",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.5",
      "letter-spacing": "0.5px"
    },
    p: {
      "font-size": "15px",
      "line-height": "1.75",
      color: "#16181d",
      "margin-top": "0",
      "margin-bottom": "18px",
      "letter-spacing": "0.3px"
    },
    blockquote: {
      "border-left": "3px solid #d8d8d4",
      "background-color": "transparent",
      color: "#5a5d64",
      "padding-top": "4px",
      "padding-right": "0",
      "padding-bottom": "4px",
      "padding-left": "16px",
      "margin-top": "0",
      "margin-bottom": "18px",
      "border-radius": "0",
      "font-size": "14px",
      "line-height": "1.7"
    },
    ul: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "18px" },
    ol: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "18px" },
    li: {
      "margin-bottom": "8px",
      "line-height": "1.75",
      color: "#16181d",
      "letter-spacing": "0.3px"
    },
    strong: {
      "font-weight": "600",
      color: "#16181d"
    },
    em: {
      "font-style": "italic",
      "font-weight": "500",
      color: "#16181d"
    },
    a: {
      color: "#4a5670",
      "text-decoration": "underline",
      "text-underline-offset": "3px"
    },
    hr: {
      border: "none",
      height: "1px",
      "background-color": "#d8d8d4",
      "margin-top": "24px",
      "margin-bottom": "24px"
    },
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "12px",
      "margin-right": "auto",
      "margin-bottom": "8px",
      "margin-left": "auto",
      "border-radius": "2px"
    },
    // LaTeX booktabs 风三线表：top heavy / midrule / bottom heavy + th 无侧线 + serif 小字
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "20px",
      "font-size": "13px",
      "border-top": "2px solid #16181d",
      // booktabs \toprule（heavy line）
      "border-bottom": "2px solid #16181d"
      // booktabs \bottomrule（heavy line）
    },
    th: {
      "background-color": "transparent",
      color: "#5a5d64",
      border: "none",
      "border-bottom": "1px solid #16181d",
      // booktabs \midrule（single line）
      padding: "5px 10px",
      "font-weight": "600",
      "text-align": "center",
      // LaTeX tabular 默认居中对齐
      "font-size": "12px",
      "letter-spacing": "0.2px"
    },
    td: {
      border: "none",
      padding: "5px 10px",
      color: "#16181d",
      "text-align": "center"
    },
    // LaTeX \texttt{} 风键帽：极简 + 无 box-shadow + bgSoft 浅底（论文行内等宽代码感）
    kbd: {
      display: "inline-block",
      "background-color": "#f6f6f4",
      color: "#16181d",
      border: "1px solid #d8d8d4",
      "border-radius": "2px",
      padding: "1px 4px",
      "font-size": "12px",
      "line-height": "1.4",
      "letter-spacing": "0",
      "vertical-align": "middle"
    },
    // 代码块（规范 §1.1 code = 中性深墨 + 灰底，不染 primary）
    pre: {
      "background-color": "#ececea",
      color: "#1a1a1a",
      "padding-top": "12px",
      "padding-right": "14px",
      "padding-bottom": "12px",
      "padding-left": "14px",
      "border-radius": "2px",
      border: "1px solid #d8d8d4",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "box-shadow": "inset -14px 0 10px -10px rgba(0,0,0,0.12)",
      "margin-top": "0",
      "margin-bottom": "20px",
      "font-size": "13px",
      "line-height": "1.65"
    },
    code: {
      "background-color": "#f6f6f4",
      color: "#1a1a1a",
      padding: "1px 4px",
      "border-radius": "2px",
      "font-size": "14px",
      "font-weight": "500"
    }
  },
  // ============================================================
  // 内联强调（规范 §1.3）
  // ============================================================
  inline: {
    // 规范 §1.3 "拒绝荧光黄 highlight"——改走 bgSoft 超浅底
    highlight: {
      "background-color": "#f6f6f4",
      color: "#16181d",
      padding: "0 3px",
      "border-radius": "2px"
    },
    // 波浪线走 secondary 引文靛灰（accent 预算稀缺）
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#4a5670",
      "text-underline-offset": "3px"
    },
    // emphasis（`[.xxx.]`）走 italic + 500——与 <em> 同策略，不染色
    emphasis: {
      "font-style": "italic",
      "font-weight": "500",
      color: "#16181d"
    },
    del: {
      color: "#5a5d64",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#1e2c4a",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器视觉（规范 §2 的 19 个 container）
  // ============================================================
  containers: {
    // 规范 §2.1 intro = 摘要（Abstract）：上下 1px border 横线夹住
    intro: {
      "background-color": "transparent",
      "border-top": "1px solid #d8d8d4",
      "border-bottom": "1px solid #d8d8d4",
      "border-radius": "0",
      padding: "16px 0",
      margin: "0 0 28px 0",
      color: "#5a5d64",
      "line-height": "1.75"
    },
    // 规范 §2.2 author = 通讯作者：冷、静、不居中
    author: {
      "background-color": "transparent",
      "border-radius": "0",
      padding: "0",
      margin: "0 0 20px 0",
      "font-size": "13px",
      color: "#5a5d64",
      "line-height": "1.7"
    },
    // 规范 §2.3 cover = 标题块：无图版式
    cover: {
      margin: "0 0 24px 0"
    },
    // 四态容器外壳（variant 接管 wrapperCSS）
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // box-callout variant 接管 border + padding；voice 注入"学术零圆角"——与
    // sidenote-latex admonition 的硬边定理框同语言（论文 / LaTeX 母语：直角）
    note: { "border-radius": "0" },
    // 规范 §2.6 quoteCard = 定理声明框（本主题签名）
    quoteCard: {
      "background-color": "#fefefe",
      padding: "0",
      margin: "20px 0",
      "border-radius": "2px",
      border: "1px solid #d8d8d4"
    },
    // 规范 §2.14 highlight = Key Finding：左 2px accent 深酒红细竖条
    highlight: {
      "background-color": "#f6f6f4",
      "border-left": "2px solid #8a2a2a",
      padding: "12px 16px 12px 18px",
      margin: "20px 0",
      "border-radius": "2px"
    },
    // 规范 §2.15 compare = ablation table
    compare: { margin: "22px 0" },
    // 规范 §2.16 steps = 方法流程
    steps: { margin: "22px 0" },
    // 规范 §2.4 sectionTitle = § Heading：下方 1px secondary 通栏短线
    sectionTitle: {
      margin: "36px 0 16px",
      "padding-bottom": "6px",
      "border-bottom": "1px solid #4a5670"
    },
    // 规范 §2.7 footerCTA = 致谢 + Cite As（拒绝订阅钩子）
    footerCTA: {
      margin: "40px 0 24px 0",
      padding: "18px 0",
      "background-color": "transparent",
      "border-top": "1px solid #d8d8d4",
      "border-bottom": "1px solid #d8d8d4",
      "border-radius": "0"
    },
    // 规范 §2.8 recommend = References：悬挂缩进 APA/Vancouver 格式
    recommend: {
      margin: "24px 0",
      padding: "14px 0",
      "background-color": "transparent",
      "border-radius": "0",
      "border-top": "1px solid #d8d8d4"
    },
    abstract: {
      "background-color": "#f6f6f4",
      border: "1px solid #d8d8d4",
      padding: "14px 16px",
      margin: "18px 0 24px",
      "border-radius": "2px"
    },
    // 规范 §2.9 qrcode = 通讯地址块（Correspondence）
    qrcode: {
      margin: "32px 0 0 0",
      padding: "0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    // LaTeX figure caption：serif italic + "Figure 1. ..." 编号注脚风（textMuted 居中）
    imageCaption: {
      margin: "4px 0 20px 0",
      "text-align": "center",
      "font-size": "12px",
      "font-style": "italic",
      color: "#5a5d64",
      "letter-spacing": "0.1px"
    },
    // 论文研究阶段时间线：左 1px secondary 细竖线 + 透明底（与 blockquote 语汇一致）
    timeline: {
      margin: "24px 0",
      "border-left": "1px solid #4a5670",
      "padding-left": "18px",
      "background-color": "transparent"
    }
  },
  // 签名容器：abstract（文首 tl;dr，学术综述自然入口）。参考文献块走
  // ::: recommend variant=academic-refs（uppercase 小字 kicker + textMuted 列表）。
  signatureContainers: ["abstract"],
  // ============================================================
  // 模板片段（仅声明相对 commonTemplates 的覆盖键）
  // ============================================================
  templates: {
    // 规范 §2.3 cover：标题块——无图版式，只做"论文头部"风的文字排印
    cover: `::: cover 论文标题
一句话摘要或研究问题——模拟 arXiv preprint 的"标题 + 导语"双层

张三¹, 李四², 王五¹*  ·  ¹某某大学  ·  ²某某研究所  ·  * 通讯作者

关键词：XXX · YYY · ZZZ
:::
`,
    // 规范 §2.2 author：通讯作者——冷静一行文本，不居中无装饰
    authorBar: `::: author 张三¹, 李四²
¹某某大学 计算机系  ·  ²某某研究所  ·  通讯邮箱：zhang@university.edu.cn  ·  投稿日期：2026-04-20
:::
`,
    // 规范 §2.10 tip = Definition：英文术语 label 是第一识别信号
    tip: `::: tip Definition.
设 *X* 为满足 ... 的集合。若存在映射 *f*: *X* → *Y* 使得 ... 恒成立，则称 *f* 为 ...
:::
`,
    // 规范 §2.7 footerCTA = 致谢 + Cite As（拒绝订阅钩子）
    footerCTA: `::: footer-cta ACKNOWLEDGEMENTS
感谢 XX 对本文的审阅，感谢 YY 提供数据。本研究得到 NSFC 资助 (No. xxx)。

CITE AS — 张三, 李四. (2026). 论文标题. 公众号名, 第 N 期. DOI: 10.xxxx/xxxxx
:::
`,
    // 规范 §2.8 recommend = References：悬挂缩进 APA 格式
    recommend: `::: recommend REFERENCES
- [1] Smith, J., & Doe, A. (2024). Title of paper. Journal of Something, 12(3), 345–360.
- [2] Wang, X., Li, Y., & Zhang, Z. (2025). Another title. Nature, 600, 123–130.
- [3] Liu, M. (2026). Preprint title. arXiv: 2601.12345.
:::
`
  },
  meta: {
    createdAt: "2026-04-20",
    ownerNotes: "学术论文感——Nature/arXiv/LaTeX 家族；无装饰纪律：仅 theoremMark ■ + 1px h2 竖线 + 极细 rule。accent 预算 ≤ 5 次/篇。"
  }
};
const spec$7 = {
  id: "editorial-mook",
  name: "编辑刊",
  description: "米白底 + 朱橙单点缀 + 极小字号 · POPEYE / BRUTUS 系慢读编辑刊",
  audience: "慢读 newsletter / 文化随笔季刊 / 编辑型 mook 刊物",
  // ============================================================
  // 色板（来源：docs/themes-specs/themes/04-japanese-mook.html :root tokens）
  // ============================================================
  palette: {
    primary: "#e85a3c",
    // POPEYE 朱橙——本主题唯一 accent，全篇稀缺
    secondary: "#2d3a4a",
    // 深蓝灰，与 text 同族，承担"次级强调"如标题边线
    accent: "#e85a3c",
    // = primary（mook 视觉里只跑一支 accent）
    bg: "#faf6ef",
    // 米白底
    bgSoft: "#f0ebe0",
    // 信息卡底（米卡纸感）
    bgMuted: "#e8e2d4",
    // 外层衬底（设计稿 body 背景）
    text: "#2d3a4a",
    // 深蓝灰文字
    textMuted: "#6b7885",
    // 灰蓝辅助
    textInverse: "#faf6ef",
    // 反白（用米白替代 #fff——SVG→PNG 时不会透明化）
    border: "#c7bfb0",
    // 点线分隔
    code: "#e85a3c"
    // inline code 字色 = accent（mook 里 code 极稀缺）
  },
  // 语义四色（multi-callout 设计稿四态色）
  //
  // 注意：四态 soft 全部使用 #f0ebe0（米卡纸）——mook 设计稿的 multi-callout
  // 视觉签名是"统一米底 + 仅左条与单字标签换色"，不走传统四色 soft 浅底族谱。
  status: {
    tip: { accent: "#6b9a5a", soft: "#f0ebe0" },
    // 参（参考）—— 苔绿
    info: { accent: "#4a7fa8", soft: "#f0ebe0" },
    // 編（编辑注解）—— 砚蓝
    warning: { accent: "#d4a03a", soft: "#f0ebe0" },
    // 注（轻度提醒）—— 古土黄
    danger: { accent: "#e85a3c", soft: "#f0ebe0" }
    // 禁（明确禁忌）—— 朱橙（= primary）
  },
  // ============================================================
  // 字号 / 间距 / 圆角
  //   - base 13/2.0 是 mook 的标志性"小字宽行距"组合
  //   - section 48 让 H2 之间有充足"余白"
  //   - radius 全 0
  // ============================================================
  typography: {
    baseSize: 13,
    lineHeight: 2,
    h1Size: 22,
    // 公众号原生标题约 22px，本主题不输出 H1
    h2Size: 14,
    // 节标题极小（"章序在上"的层级把视觉位让给 kicker 装饰）
    h3Size: 11,
    // 子标题更小，accent 色担纲（i. ii. iii. lowercase roman 由作者手写）
    letterSpacing: 0.3
  },
  spacing: {
    paragraph: 22,
    section: 48,
    // h2 上方的"大块呼吸"
    listItem: 6,
    containerPadding: 20
  },
  radius: { sm: 0, md: 0, lg: 0 },
  // 直角硬边——半径 ≥ 1 即破
  // ============================================================
  // Decorations：自动给 h2 / h3 加章节编号前缀。
  //
  //   - level 2 → circled + display:'block' + suffix:'  第{cn}章'
  //     ❶❷❸ 圆圈数字 + 中文章号,作为 10px accent kicker **自成一行**,
  //     标题文字换行落于下一行。这是 mook / POPEYE 系刊物的"❶  第一章 / 章节标题"
  //     两行节标题签名（对位 docs/themes-specs/themes/04-japanese-mook.html 设计稿）。
  //   - level 3 → circled + display:'inline'（默认）,作为 11px accent 行首小字,
  //     与标题文字同行;给小节加可识别的"次级序号"信号但不抢 h2 的视觉位。
  //
  // 设计 trade-off：本主题刻意保持"作者写正文，编号由系统加"——避免作者手抄编号
  // 与正文之间漂移；圆圈数字 1–20 覆盖 99% mook 期刊章节体量,>20 退化为 (N)。
  // ============================================================
  decorations: {
    headingPrefix: [
      {
        level: 2,
        autoNumber: "circled",
        style: {
          color: "accent",
          display: "block",
          marginBottom: 6,
          suffix: "  第{cn}章",
          fontWeight: 500,
          fontSize: 10,
          letterSpacing: 2
        }
      },
      {
        level: 3,
        autoNumber: "circled",
        style: {
          color: "accent",
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: 1,
          marginRight: 8
        }
      }
    ]
  },
  // Motifs：极简——本主题章节序号靠 decorations.headingPrefix autoNumber，
  // pull-quote 用裸 blockquote + 左 1px 细线，故意不声明 h2Prefix / quoteMark /
  // sectionCorner（pipeline 检测到 theme.assets.h2Prefix 会自动注入 SVG）。
  motifs: {
    // dividerFlower · ❋ 单字符（divider variant=glyph 时通过 attrs.glyph 覆盖；
    //   不通过 motif 暴露字符，保留 motif 仅为缩略图兼容）
    dividerFlower: {
      viewBox: [0, 0, 240, 16],
      width: 220,
      height: 16,
      primitives: [
        { type: "line", x1: 0, y1: 8, x2: 100, y2: 8, stroke: "token:secondary", strokeWidth: 1 },
        {
          type: "text",
          x: 120,
          y: 13,
          content: "❋",
          // ❋ heavy eight teardrop-spoked asterisk
          fontSize: 14,
          fill: "token:primary",
          textAnchor: "middle"
        },
        { type: "line", x1: 140, y1: 8, x2: 240, y2: 8, stroke: "token:secondary", strokeWidth: 1 }
      ]
    },
    // dividerWave · 退化为单根细线（mook 不接受波浪）
    dividerWave: {
      viewBox: [0, 0, 240, 2],
      width: 220,
      height: 2,
      primitives: [
        { type: "line", x1: 0, y1: 1, x2: 240, y2: 1, stroke: "token:border", strokeWidth: 1 }
      ]
    },
    // dividerDots · 三朱橙小方块（应急 fallback）
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: "rect", x: 108, y: 2, w: 4, h: 4, fill: "token:primary" },
        { type: "rect", x: 118, y: 2, w: 4, h: 4, fill: "token:primary" },
        { type: "rect", x: 128, y: 2, w: 4, h: 4, fill: "token:primary" }
      ]
    },
    // 四态图标——mook 的"参/編/注/禁"语义由 admonition mook-tag variant 的
    //   svgSlot CJK 字 inline 承担；这里的 icon 仅在主题切到非 mook-tag variant
    //   时作 fallback。直角小方块呼应 radius=0 纪律。
    tipIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [{ type: "rect", x: 3, y: 3, w: 8, h: 8, fill: "token:status.tip.accent" }]
    },
    infoIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [{ type: "rect", x: 3, y: 3, w: 8, h: 8, fill: "token:status.info.accent" }]
    },
    warningIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [{ type: "rect", x: 3, y: 3, w: 8, h: 8, fill: "token:status.warning.accent" }]
    },
    dangerIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [{ type: "rect", x: 3, y: 3, w: 8, h: 8, fill: "token:primary" }]
    },
    // stepBadge · 编号方块（与 radius=0 一致）
    stepBadge: {
      viewBox: [0, 0, 22, 22],
      width: 22,
      height: 22,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      placeholders: ["N"],
      primitives: [
        { type: "rect", x: 0, y: 0, w: 22, h: 22, fill: "token:primary" },
        {
          type: "text",
          x: 11,
          y: 16,
          content: "{N}",
          fontSize: 14,
          fontWeight: 700,
          fill: "token:textInverse",
          textAnchor: "middle"
        }
      ]
    }
  },
  // ============================================================
  // 骨架变体：mook-tag 是核心签名；其余取克制 / 文学倾向的 variant
  // ============================================================
  variants: {
    admonition: "mook-tag",
    // 本主题签名——参/編/注/禁 単字 CJK 标签
    quote: "editorial-block",
    // 编辑部磁砖 pull-quote：左 6px 主色条 + 大号粗体 + uppercase byline
    compare: "stacked-row",
    // mook 偏纵贯陈述：先述 A 再述 B，避免双列拥挤
    steps: "timeline-dot",
    // 慢节奏 mook 偏时序点阵，stepBadge 单列点珠
    divider: "glyph",
    // 默认 ❦；作者写 attrs.glyph="❋"/"章末" 切换
    sectionTitle: "ribbon-stamp",
    // 左侧 CJK 戳记（章/節）+ 主标题，与 mook-tag 同 CJK 语汇
    codeBlock: "inline-card",
    // 米卡纸底 + 左主色窄竖条，与 mook 内嵌排印一致
    note: "dotted-margin",
    // 散文式页边批注：dotted 左竖线 + 缩进，比 minimal-callout 更"手记"
    footnotes: "boxed-aside",
    // 软底卡片 + pill kicker，narrative aside
    recommend: "card-list",
    qrcode: "follow-card",
    // 刊物订阅卡：左 QR + 右 kicker/title/desc 三行
    footerCTA: "triptych-actions",
    // 三栏 CTA（赞同/收藏/转发）
    pullQuote: "giant-mark",
    announcement: "danger-bar",
    tableCard: "rule-grid",
    gallery: "duo",
    dialogue: "qa-rows",
    // 编集所读者通信走 hanging-qa：大号斜体 Q./A. 与 mook 慢读杂志的 magazine pull-quote 语言一致
    qaBlock: "hanging-qa"
  },
  // ============================================================
  // 主题级 kicker 文案覆盖（编集所母语）
  //
  // 单字 CJK + 中点的"編集所手感"：与 admonition.mook-tag variant 的"参/編/注/禁"
  // 单字标签同源。letter-spacing 视觉效果由 innerStyles.*Kicker 撑开；本表只承诺字面值。
  // 与 data-brief 的"本期目录 · INDEX"中英对仗形成对比——mook 母语不混英文短语。
  // ============================================================
  kickers: {
    toc: "目 · 次",
    qaBlock: "读 · 者 · 通 · 信",
    qrFollowKicker: "訂 · 閱",
    qrFollowTitle: "订阅这份慢读季刊",
    recommend: "同 · 期 · 选 · 读",
    footerCTATitle: "关注 · 慢读编集",
    colophonNextLabel: "下 · 期 · 预 告",
    colophonIssueLabel: "卷 · 期",
    mastheadName: "编 · 集 · 慢 · 读"
  },
  // ============================================================
  // 签名容器：复用 data-brief 包 + 跨主题通用 abstract
  // ============================================================
  signatureContainers: [
    "abstract",
    // 文首 tl;dr / 导语
    "masthead",
    // 刊头（slow reading / issue 04）
    "toc",
    // 目录（圈号 + 标题 + 页码）
    "qaBlock",
    // 读者问答
    "footnotes",
    // 脚注
    "colophon",
    // 下期预告
    "imageCaption",
    // mook 图注（极小字 + letter-spacing）
    "authorBio",
    // mook 番外编辑栏（极简 hairline）
    "announcement"
    // 特辑预告（上下 text 双线）
  ],
  // ============================================================
  // 元素样式
  // ============================================================
  elements: {
    // H1：公众号原生头部已渲文章标题，本主题不主推自渲 H1，
    //   仅保留极简兜底（中等粗细 + 微大字距）
    h1: {
      "font-size": "22px",
      "font-weight": "500",
      color: "#2d3a4a",
      "margin-top": "0",
      "margin-bottom": "14px",
      "line-height": "1.5",
      "letter-spacing": "0.2px"
    },
    // H2：14px 600 + 极宽 section 上边距 + 无 border-bottom（mook 不画通栏线）
    //   编号前缀 "01 / 02 / 03" 由 decorations.headingPrefix 自动注入
    h2: {
      __reset: true,
      "font-size": "14px",
      "font-weight": "600",
      color: "#2d3a4a",
      "margin-top": "48px",
      "margin-bottom": "20px",
      "line-height": "1.6",
      "letter-spacing": "0.2px",
      "padding-bottom": "0",
      "border-bottom": "none"
    },
    // H3：11px 600 accent + 紧字距——子标题完全交给主色担纲
    //   编号前缀 "❶/❷/❸…" 由 decorations.headingPrefix circled inline 注入,
    //   与 H2 的 block kicker 形成"块 / 行"两档视觉层级
    h3: {
      __reset: true,
      "font-size": "11px",
      "font-weight": "600",
      color: "#e85a3c",
      "margin-top": "20px",
      "margin-bottom": "8px",
      "line-height": "1.6",
      "letter-spacing": "1px"
    },
    h4: {
      "font-size": "12px",
      "font-weight": "600",
      color: "#2d3a4a",
      "margin-top": "14px",
      "margin-bottom": "6px",
      "line-height": "1.5"
    },
    h5: {
      "font-size": "13px",
      "font-weight": "600",
      color: "#2d3a4a",
      "margin-top": "14px",
      "margin-bottom": "6px",
      "line-height": "1.55",
      "letter-spacing": "0.5px"
    },
    h6: {
      "font-size": "11px",
      "font-weight": "600",
      color: "#6b7885",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.5",
      "letter-spacing": "2px",
      "text-transform": "uppercase"
    },
    // 正文：13/2.0 是 mook 的灵魂——小字 + 宽行距，让阅读慢下来
    p: {
      "font-size": "13px",
      "line-height": "2.0",
      color: "#2d3a4a",
      "margin-top": "0",
      "margin-bottom": "22px",
      "letter-spacing": "0.3px"
    },
    // Pull-quote · 设计稿原型：左 1px text 色细竖线 + 60px 缩进 + 18px 大字 +
    //                         300 字重 + attribution 第二段 10px muted
    //   作者写：> "凡我所是，皆因我读。"
    //          >
    //          > —— 博尔赫斯
    blockquote: {
      __reset: true,
      "border-left": "1px solid #2d3a4a",
      "background-color": "transparent",
      color: "#2d3a4a",
      padding: "0 0 0 60px",
      margin: "40px 0",
      "font-size": "18px",
      "font-weight": "500",
      "line-height": "1.7",
      "letter-spacing": "0.2px",
      "border-radius": "0"
    },
    // 列表 · 设计稿用 ❶❷❸ / — 等装饰前缀；本主题取消默认 marker，
    //   作者在每条 item 前手写圈号 / 破折号，让前缀色与 inline 文本贴合
    //   （CSS::marker 在公众号粘贴层不稳，inline 字符是稳定路径）
    ul: {
      "list-style": "none",
      "padding-left": "0",
      "margin-top": "0",
      "margin-bottom": "22px"
    },
    ol: {
      "list-style": "none",
      "padding-left": "0",
      "margin-top": "0",
      "margin-bottom": "22px"
    },
    li: {
      "font-size": "13px",
      "line-height": "1.9",
      color: "#2d3a4a",
      "margin-bottom": "6px",
      "letter-spacing": "0.3px"
    },
    // strong/em 仍走主色（mook 鼓励 inline 强调，不用 highlight 荧光）
    strong: { "font-weight": "700", color: "#e85a3c" },
    em: { "font-style": "italic", color: "#2d3a4a" },
    // 链接：accent + 下方 1px 实线 underline（设计稿原型）
    a: {
      color: "#e85a3c",
      "text-decoration": "none",
      "border-bottom": "1px solid #e85a3c"
    },
    // hr · mook 取细 0.5px 但公众号最小渲染 1px——退化为 1px
    hr: {
      border: "none",
      height: "1px",
      "background-color": "#2d3a4a",
      "margin-top": "20px",
      "margin-bottom": "20px"
    },
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "10px",
      "margin-right": "auto",
      "margin-bottom": "10px",
      "margin-left": "auto",
      "border-radius": "0"
    },
    // 代码块 · 米卡纸底 + 11px monospace（设计稿原型）
    pre: {
      __reset: true,
      "background-color": "#f0ebe0",
      color: "#2d3a4a",
      padding: "14px 16px",
      margin: "22px 0",
      "border-radius": "0",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "box-shadow": "inset -14px 0 10px -10px rgba(45,58,74,0.18)",
      "font-size": "11px",
      "line-height": "1.9"
    },
    // 行内 code · 朱橙字 + 米卡纸底 + 11px（设计稿 inline-code 原型）
    code: {
      "background-color": "#f0ebe0",
      color: "#e85a3c",
      padding: "1px 4px",
      "border-radius": "0",
      "font-size": "11px"
    },
    // mook 番外栏表：th 极小字 + letter-spacing 极大 + accent 1px 下划线 + 极疏 padding——
    // 对应 04-japanese-mook.html toc "contents · 目次" kicker 的排印语言：
    // 10px / letter-spacing:0.2em / accent 色是全篇 kicker 母型，表头借用此型。
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "22px",
      "font-size": "12px"
    },
    // th：极小字 + letter-spacing 极大 + accent 1px 下划线——mook kicker 母型的"栏头"写法，
    // 与 abstractKicker 同系（10px / letter-spacing:0.2em / accent 色），让表头成为"栏眉"而非表格标题。
    th: {
      "text-align": "left",
      "font-weight": "600",
      color: "#e85a3c",
      "font-size": "10px",
      "letter-spacing": "0.2em",
      "text-transform": "uppercase",
      "padding-top": "3px",
      "padding-right": "10px",
      "padding-bottom": "8px",
      "padding-left": "0",
      "border-bottom": "1px solid #e85a3c",
      "background-color": "transparent"
    },
    // td：13px 正文同字号 + 极疏 padding + 仅底部 border 色分隔——mook 慢读节奏。
    td: {
      "text-align": "left",
      color: "#2d3a4a",
      "font-size": "12px",
      "letter-spacing": "0.02em",
      "padding-top": "6px",
      "padding-right": "10px",
      "padding-bottom": "6px",
      "padding-left": "0",
      "border-bottom": "1px solid #c7bfb0",
      "vertical-align": "top"
    },
    // mook 番外栏 inline kbd：极小 monospace + 字距 0 + 米卡纸底——
    // 对应 04-japanese-mook.html inline-code 的"11px / Menlo / #f0ebe0 底"写法；
    // kbd 在 mook 语境里等同于 code 的"符号注释"，走同款极小字号不加边框立体感。
    kbd: {
      display: "inline-block",
      "background-color": "#f0ebe0",
      color: "#2d3a4a",
      border: "1px solid #c7bfb0",
      "border-radius": "0",
      padding: "0px 4px",
      "font-size": "10px",
      "line-height": "1.6",
      "vertical-align": "middle",
      "letter-spacing": "0"
    }
  },
  // ============================================================
  // 内联强调
  // ============================================================
  inline: {
    // mook 不走荧光底——highlight 退化为 bgSoft 米卡纸 + 朱橙字
    highlight: {
      "background-color": "#f0ebe0",
      color: "#e85a3c",
      padding: "0 4px",
      "border-radius": "0"
    },
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#e85a3c",
      "text-underline-offset": "3px"
    },
    emphasis: {
      color: "#e85a3c",
      "font-weight": "600"
    },
    del: {
      color: "#6b7885",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#e85a3c",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器视觉
  // ============================================================
  containers: {
    // intro · 导语段右留白（设计稿 padding-right:40px）
    intro: {
      __reset: true,
      "background-color": "transparent",
      "border-radius": "0",
      padding: "0 40px 0 0",
      margin: "0 0 48px 0",
      "font-size": "14px",
      "line-height": "2.0",
      color: "#2d3a4a",
      "letter-spacing": "0.3px"
    },
    // author · byline · 灰蓝小字横排
    author: {
      __reset: true,
      "background-color": "transparent",
      padding: "0",
      margin: "0 0 36px 0",
      "font-size": "10px",
      color: "#6b7885",
      "letter-spacing": "0.3px"
    },
    cover: {
      margin: "0 0 36px 0"
    },
    // 四态：仅承载 margin；wrapperCSS 由 mook-tag variant 全权接管
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // note · 中性补注（不抢色）
    note: {
      __reset: true,
      "background-color": "transparent",
      padding: "10px 0 10px 16px",
      margin: "16px 0",
      "border-left": "1px solid #c7bfb0",
      "font-size": "12px",
      "line-height": "1.8",
      color: "#6b7885",
      "border-radius": "0"
    },
    // quote-card · 给 classic variant 一个克制底（实际正文倾向走裸 blockquote）
    quoteCard: {
      "background-color": "#f0ebe0",
      padding: "22px 24px",
      margin: "32px 0",
      "border-radius": "0"
    },
    highlight: {
      "background-color": "#f0ebe0",
      padding: "14px 16px",
      margin: "22px 0",
      "border-radius": "0",
      border: "none"
    },
    compare: { margin: "22px 0" },
    steps: { margin: "22px 0" },
    sectionTitle: {
      __reset: true,
      margin: "48px 0 20px",
      "padding-bottom": "6px",
      "border-bottom": "1px solid #2d3a4a"
    },
    // footer-cta · 不走"营销按钮"路径，给最小化背景兜底
    //   （本主题主推 colophon 当作"下期预告"承载，参见 templates.footerCTA）
    footerCTA: {
      __reset: true,
      margin: "36px 0",
      padding: "16px 0",
      "background-color": "transparent",
      "border-top": "1px solid #2d3a4a",
      "border-bottom": "1px solid #2d3a4a",
      "border-radius": "0",
      "text-align": "left"
      // 覆盖 renderer 的 center 默认
    },
    recommend: {
      margin: "24px 0",
      padding: "14px 0",
      "background-color": "transparent",
      "border-top": "1px solid #c7bfb0",
      "border-radius": "0"
    },
    qrcode: {
      margin: "24px 0",
      padding: "14px",
      "background-color": "transparent",
      border: "1px solid #2d3a4a",
      "border-radius": "0"
    },
    abstract: {
      __reset: true,
      "background-color": "transparent",
      "border-left": "1px solid #2d3a4a",
      padding: "4px 0 4px 16px",
      margin: "0 0 32px 0",
      "border-radius": "0"
    },
    keyNumber: {
      margin: "22px 0",
      padding: "16px 18px",
      "background-color": "#f0ebe0",
      "border-top": "2px solid #e85a3c",
      "border-radius": "0"
    },
    // ── data-brief 家族签名容器（设计稿对位） ──────────────────
    // masthead · 设计稿"slow reading" + "issue 04" 双栏
    //   note: renderer 内 nameCSS / metaCSS 是硬编码（data-brief 视觉契约），本主题
    //   只能在 wrapper 层调整 padding / border / margin / 字距，name 与 meta 的字号
    //   会维持 data-brief 13px/11px——视觉接近但不完全等同于设计稿 10px。
    masthead: {
      __reset: true,
      margin: "0 0 36px 0",
      "padding-bottom": "0",
      "border-bottom": "none",
      "letter-spacing": "0.2px"
    },
    sectionTag: { margin: "0 0 14px 0" },
    // toc · 米白底无 bg，仅靠 kicker + 序号 + 页码三栏 grid（renderer 强制）
    toc: {
      __reset: true,
      "background-color": "transparent",
      padding: "0",
      margin: "0 0 40px 0",
      "border-radius": "0"
    },
    kpiDashboard: {
      "background-color": "#f0ebe0",
      "border-top": "1px solid #2d3a4a",
      "border-bottom": "1px solid #2d3a4a",
      padding: "18px 16px 16px",
      margin: "0 0 28px 0",
      "border-radius": "0"
    },
    barChart: {
      "background-color": "#f0ebe0",
      border: "1px solid #c7bfb0",
      padding: "16px 14px",
      margin: "22px 0",
      "border-radius": "0"
    },
    // qa-block · wrapper-level：transparent + 40px 上下空气；视觉骨架由 variant hanging-qa 自管
    qaBlock: {
      __reset: true,
      "background-color": "transparent",
      padding: "0",
      margin: "40px 0",
      "border-radius": "0"
    },
    footnotes: {
      __reset: true,
      "border-top": "1px solid #2d3a4a",
      "padding-top": "10px",
      margin: "24px 0",
      "font-size": "10px",
      "line-height": "1.8",
      color: "#6b7885",
      "letter-spacing": "0.2px"
    },
    // qr-follow · 1px text 色实线包裹（设计稿原型，非常克制）
    // mook 图注极小字 + letter-spacing + textMuted——
    // 对应 04-japanese-mook.html image-with-caption 图注："10px / textMuted / letter-spacing:0.05em"，
    // 圈号 ❶ 前导由 renderer 内层控制，wrapper 只管字号 / 颜色 / 字距 / 对齐。
    imageCaption: {
      margin: "8px 0 22px",
      "text-align": "left",
      color: "#6b7885",
      "font-size": "10px",
      "letter-spacing": "0.05em",
      "line-height": "1.6",
      "border-radius": "0"
    },
    // mook 番外编辑栏 authorBio：极简，无底色无边框，仅上下 hairline + 紧凑 padding——
    // 对应 04-japanese-mook.html byline 行："10px / textMuted / letter-spacing:0.05em"，
    // mook 编辑署名像脚注小字，不是卡片，不做色块。
    authorBio: {
      __reset: true,
      "background-color": "transparent",
      "border-top": "1px solid #c7bfb0",
      "border-radius": "0",
      padding: "8px 0",
      margin: "16px 0",
      "font-size": "10px",
      color: "#6b7885",
      "letter-spacing": "0.05em"
    },
    // 特辑预告 announcement：上下 text 色双线 + 无底色 + accent kicker 感——
    // 对应 04-japanese-mook.html footer "下期预告" 结构（上 1px text 线 + accent 标签）；
    // mook 的"特辑预告"是编集后记的一部分，不是"危险警示"，所以不走 danger 红。
    announcement: {
      __reset: true,
      "background-color": "transparent",
      "border-top": "1px solid #2d3a4a",
      "border-bottom": "1px solid #2d3a4a",
      "border-radius": "0",
      padding: "12px 0",
      margin: "22px 0",
      color: "#2d3a4a",
      "font-size": "12px",
      "letter-spacing": "0.05em",
      "line-height": "1.8"
    },
    // colophon · 下期预告（设计稿 footer #23）
    //   renderer 走"上边线 + 双栏 monospace"；本主题用 next 单独一栏，
    //   issue 可留空让右栏空 kicker 也无妨——视觉与设计稿"上下边线 + accent kicker"接近
    colophon: {
      __reset: true,
      "border-top": "1px solid #2d3a4a",
      "border-bottom": "1px solid #2d3a4a",
      "margin-top": "36px",
      "padding-top": "16px",
      "padding-bottom": "16px",
      "border-radius": "0"
    }
  },
  // ============================================================
  // 内层元素 inline style 槽位（renderer 不硬编码，主题通过 spec.innerStyles 接管）
  // ============================================================
  innerStyles: {
    // abstract 导读 kicker · 文首最强势的"栏头"信号
    // 对位设计稿 component 02（toc kicker）& 15（callout kicker）：
    //   font-size:10px / letter-spacing:0.2em / color:#e85a3c 是 mook 全篇 kicker 母型。
    // 在此基础上加 border-bottom 1px hairline + padding-bottom 让 kicker 自成"栏头"——
    // 区别于其余 kicker（其余不加 border），作为"文首导读"给最强的形式感。
    abstractKicker: {
      color: "#e85a3c",
      "font-size": "10px",
      "font-weight": "600",
      "letter-spacing": "0.2em",
      "text-transform": "uppercase",
      "padding-bottom": "5px",
      "border-bottom": "1px solid #c7bfb0",
      "margin-bottom": "10px",
      display: "block"
    },
    // key-number 大数字本体 · "杂志大字"气质
    // mook 用非典型字号（28px，不是 32px 标准值）+ italic 拉出"印刷大字"的动态感；
    // 对位设计稿 cover-header 的"56px 300 weight #e85a3c"大数字精神，
    // 在 key-number 容器里以克制比例（28px）复现"数字主导版面"的签名张力。
    keyNumberValue: {
      color: "#e85a3c",
      "font-size": "28px",
      "font-weight": "300",
      "font-style": "italic",
      "line-height": "1.1",
      "letter-spacing": "-0.03em",
      "margin-bottom": "6px"
    },
    // key-number 上方 kicker · 弱于 abstractKicker，无 border，纯小字字距撑开
    // letter-spacing 0.18em（比 abstractKicker 的 0.2em 略窄）——细微层级差避免公式感。
    keyNumberKicker: {
      color: "#6b7885",
      "font-size": "10px",
      "font-weight": "400",
      "letter-spacing": "0.18em",
      "text-transform": "uppercase",
      "margin-bottom": "4px"
    }
  },
  // ============================================================
  // 模板片段（commonTemplates 隐式合并，本处仅覆盖需要 mook voice 的项）
  // ============================================================
  templates: {
    cover: `::: masthead slow reading issue="04" date="2026.04.22"
:::

::: section-tag
特集 · 关于阅读
:::

# 在无人深夜，重新学习如何阅读一本书
`,
    authorBar: `::: author
沈听雨 · 2026.04.22
:::
`,
    // 下期预告 · 走 colophon（mook 不走"营销按钮"footer）
    footerCTA: `::: colophon next="纸本之必要：论书脊与手指的记忆" issue="第 05 期 · 2026"
:::
`,
    tip: `::: tip variant=mook-tag
配溫水一盞。茶易醒腦，咖啡斷連續。
:::
`
  },
  meta: {
    createdAt: "2026-05-14",
    ownerNotes: '编辑刊 · 米白 + 朱橙 + 极小字号 · POPEYE / BRUTUS 系慢读 mook。三条不可妥协：radius=0、primary=accent=#e85a3c 单 accent、四态附注用单字 CJK 标签（mook-tag variant）。复用 data-brief 包容器（masthead / toc / qa-block / footnotes / cta-bar / qr-follow / editor-note / colophon）+ 新增 admonition variant `mook-tag` 承载"参/編/注/禁"四态。章节自动编号 "01 / 02 / 03 + I / II / III" 由 decorations.headingPrefix 注入，作者写 `## 章节名` / `### 子标题`。'
  }
};
const spec$6 = {
  id: "swiss-grid",
  name: "苏黎世栅格",
  description: "国际红 + 12 栏铁律 + 直角硬边：1958 Neue Grafik 苏黎世对开页",
  audience: "设计评论 / 编辑刊 / 视觉栅格杂志 / Neue Grafik 系排印随笔",
  // ============================================================
  // 色板（来源：docs/themes-specs/themes/02-swiss-grid.html :root tokens）
  // ============================================================
  palette: {
    primary: "#e30613",
    // 国际红（期号 / H2 红章 / pull-quote 左条 / dropcap）
    secondary: "#000000",
    // 纯黑（hairline / 文字 / cta 描边）
    accent: "#e30613",
    // = primary（swiss-grid 视觉里 accent 不独立）
    bg: "#ffffff",
    // 纯白底
    bgSoft: "#f0f0f0",
    // 浅灰（图表轨道 / bar 背景 / 栏位浅底）
    bgMuted: "#e8e8e8",
    // 外层衬底（略深的浅灰）
    text: "#000000",
    // 纯黑文字
    textMuted: "#6b6b6b",
    // 中灰辅助文字（章节页码 / kicker meta，5.3:1 守 AA）
    textInverse: "#ffffff",
    // 反白（红章上的白色数字 / cta 中格）
    border: "#000000",
    // hairline 黑实线（Swiss 风的核心分隔语言）
    code: "#000000",
    // inline code 黑字
    textCaption: "#333333",
    // 脚注 / 方法论小字（比 text 弱、比 textMuted 重的过渡灰）
    highlightBg: "#ffeb3c",
    // Swiss 设计黄高亮（inline `==xx==` 的招牌饱和色）
    // note side-bar 差异化：1px 黑 hairline 实线（直角栅格的"最细分隔"系统语言）
    noteBorder: "#000000",
    noteBorderStyle: "solid",
    noteBorderWidth: 1
  },
  // 语义四色（与设计稿 multi-callout INFO/TIP/WARN/STOP 一致，accent 加深以守 WCAG AA）
  status: {
    tip: { accent: "#256e29", soft: "#e8f0e9" },
    // TIP 绿（5.41:1）
    info: { accent: "#000000", soft: "#f0f0f0" },
    // INFO 黑（设计稿 INFO 是黑底白字）
    // WARN 设计黄 #f9a825 是 swiss-grid 招牌签名色——已登记 A11Y_TEMPORARY_GRACE，
    // 待 Phase 1.5 协商：要么"WARN 用文字色 + soft 强对比"，要么接受品牌让步加深一档。
    warning: { accent: "#f9a825", soft: "#fdf5d6" },
    danger: { accent: "#c1050f", soft: "#fde0e2" }
    // STOP 红（5.14:1）
  },
  // ============================================================
  // 字号 / 间距 / 圆角（"直角是 Swiss 的灵魂"）
  // ============================================================
  typography: {
    baseSize: 13,
    // 正文 13px（设计稿原值）
    lineHeight: 1.6,
    h1Size: 22,
    // 微信原生标题约 22px,本主题不输出 H1
    h2Size: 16,
    // 章节标题（与红章徽章 13px 错位排列）
    h3Size: 12,
    // 子节标题 "2.1 / 2.2 / 2.3"
    letterSpacing: 0
  },
  spacing: { paragraph: 12, section: 32, listItem: 4, containerPadding: 14 },
  radius: { sm: 0, md: 0, lg: 0 },
  // 全 0——半径 ≥ 1 即破
  // ============================================================
  // Decorations：H2 红章徽章 + H3 复合编号 + intro 红色 dropcap
  //
  //   - H2 → arabic-padded + backgroundColor='primary' + paddingX=8 paddingY=2:
  //     红方块「01」「02」「03」白字章号——本主题最强烈的视觉签名,
  //     对位 docs/themes-specs/themes/02-swiss-grid.html `section-heading` 组件。
  //   - H3 → arabic-section（与父 h2 联动）:「2.1 / 2.2 / 2.3」黑色粗体行首小字。
  //   - introDropcap：红色「W」首字下沉（44px / 700 / accent）。
  // ============================================================
  decorations: {
    headingPrefix: [
      {
        level: 2,
        autoNumber: "arabic-padded",
        style: {
          color: "textInverse",
          backgroundColor: "primary",
          paddingX: 8,
          paddingY: 2,
          fontWeight: 700,
          fontSize: 13,
          marginRight: 10
        }
      },
      {
        level: 3,
        autoNumber: "arabic-section",
        style: {
          color: "text",
          fontWeight: 700,
          fontSize: 12,
          marginRight: 8,
          suffix: "  "
        }
      }
    ],
    introDropcap: {
      color: "accent",
      fontSize: 44,
      fontWeight: 700,
      marginRight: 6,
      paddingTop: 3
    }
  },
  // ============================================================
  // Motifs：极简——仅 dividerFlower（设计稿 signoff 红方块右对齐的视觉记号）+
  //           四态徽章图标（news-row variant 不消费 icon,这里留作主题资产）
  //
  // 注意 MIN_FONT_SIZE=14 / MIN_STROKE_WIDTH=1 硬约束:
  //   所有 motif text 字号必须 ≥ 14,stroke-width ≥ 1。本主题装饰偏几何,
  //   不出现文字 motif；条形 / 方块 stroke 全部 ≥ 1。
  // ============================================================
  motifs: {
    // dividerFlower：两线 + 中央红方块（与 data-brief 同骨架，仅换色）
    dividerFlower: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: "line", x1: 0, y1: 4, x2: 110, y2: 4, stroke: "token:secondary", strokeWidth: 1 },
        { type: "rect", x: 117, y: 1, w: 6, h: 6, fill: "token:primary" },
        { type: "line", x1: 130, y1: 4, x2: 240, y2: 4, stroke: "token:secondary", strokeWidth: 1 }
      ]
    },
    // dividerDots：三个红方块（备用 divider · Swiss 几何）
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: "rect", x: 108, y: 2, w: 4, h: 4, fill: "token:primary" },
        { type: "rect", x: 118, y: 2, w: 4, h: 4, fill: "token:primary" },
        { type: "rect", x: 128, y: 2, w: 4, h: 4, fill: "token:primary" }
      ]
    },
    // sealMark：20×20 国际红方块,footerCTA 的"全文收束"签名印
    //   （对位设计稿 #21 signoff "大红方块结束符 · 右对齐"）
    sealMark: {
      viewBox: [0, 0, 20, 20],
      width: 20,
      height: 20,
      primitives: [{ type: "rect", x: 0, y: 0, w: 20, h: 20, fill: "token:primary" }]
    }
  },
  // ============================================================
  // 骨架变体
  // ============================================================
  variants: {
    admonition: "news-underline",
    // ★ 设计稿 multi-callout 母本：实色徽章 + 1px 竖分隔 + 1px 底线（四态独立 ::: 块连续罗列即成一栏，无需 :::: callout-group）
    quote: "editorial-block",
    // 国际排印 editorial pull-quote：左 6px 主色条 + 大号粗体 + uppercase byline
    compare: "data-card",
    // 数据卡（顶 3px 色条 + 大号数字）—— 设计稿少见,保留备用
    steps: "split-row",
    // 左竖条 + 大号编号，与 Neue Grafik 网格分栏语汇同源
    divider: "flower",
    // Swiss 居中分隔：1px 黑 hairline + 中央 6×6 红方块 + 1px hairline（消费 dividerFlower motif）。原 seal-mark 右对齐保留为"全文收束"语义，由作者按 ::: divider variant=seal-mark 显式触发
    sectionTitle: "kicker-stack",
    // 上 uppercase letterspaced kicker + 主标题，Swiss 排印典范
    codeBlock: "inline-card",
    // pre 元素走主题 voice（黑底白字）+ inline-card tinted 软底
    note: "side-bar",
    // 左 2px 中性线 + 缩进
    footnotes: "top-rule",
    // 顶 hairline + 11px 密栏，国际排印底栏
    recommend: "academic-refs",
    // 学术 / 教程主题：参考引用栏走 uppercase 小字 kicker
    qrcode: "qr-stack",
    // Neue Grafik 收尾语序：上 QR 视觉锚 + 下三行 monospace kicker
    footerCTA: "triptych-actions",
    // 三栏 CTA（赞同/收藏/转发）
    pullQuote: "centered-rule",
    // Neue Grafik placard：上下 1px 实线居中夹 + uppercase kicker
    announcement: "danger-bar",
    tableCard: "rule-grid",
    gallery: "duo",
    dialogue: "qa-rows",
    // Swiss grid 取 typed-block：黑底反白 Q + 白底 A 双段，国际排印的强对照
    qaBlock: "typed-block"
  },
  // ============================================================
  // 主题级 kicker 文案覆盖（Neue Grafik 国际排印母语）
  //
  // Swiss grid 的栏目标签全走英文大写短语——国际版面设计的母语形态。
  // toc 的 INDEX 对位设计稿 #03；colophon 的 NEXT / VOL 对位设计稿 #24。
  // ============================================================
  kickers: {
    toc: "INDEX",
    qaBlock: "Q & A",
    qrFollowKicker: "SUBSCRIBE",
    qrFollowTitle: "NEUE LESE GRAFIK",
    recommend: "FURTHER READING",
    footerCTATitle: "FOLLOW THE PUBLICATION",
    colophonNextLabel: "NEXT ·",
    colophonIssueLabel: "VOL ·",
    mastheadName: "NEUE LESE GRAFIK"
  },
  // ============================================================
  // 签名容器：声明本主题需要的所有签名容器（renderer 在 pipeline/containers/databrief
  // / signature 已实现）。conformance 测试会校验注册表对齐。
  // ============================================================
  signatureContainers: [
    "abstract",
    // 摘要块（tl;dr）
    "sectionTag",
    // ESSAY · 01 小标签
    "editorialHeader",
    // 装饰副刊头（红章 + 大字 + subtitle + topRule）
    "byline",
    // 三栏 newspaper 署名（AUTHOR / EDITOR / SET）
    "toc",
    // 目录（layout=split 双栏）
    "keyNumber",
    // 期号横幅（Nº04 全幅红，attrs.meta 切到双栏 issue-banner）
    "qaBlock",
    // 读者 Q&A
    "footnotes",
    // 脚注 / 参考文献（variant=lined 默认；variant=inline-flow 承担"NOTES"长文献列表）
    "colophon",
    // 刊物收束栏（NEXT · VOL 双栏）
    "barChart",
    // 条形图（FIG.01 按年龄）
    "imageCaption",
    // 图注（居左 monospace 极小字 + letter-spacing）
    "announcement"
    // 强警示横幅（国际红块 + 黑实线全框）
  ],
  // 内层元素 inline style 槽位（renderer 不硬编码，主题通过 spec.innerStyles 接管）。
  // - abstractKicker：红色 9px letter-spacing 0.2em（INDEX 风的栏位标签）
  // - keyNumberValue：56px 白色巨号 Nº04（issue-banner 主视觉）
  // - keyNumberKicker：9px 白色全大写 letter-spacing 0.3em（NEUE LESE GRAFIK）
  innerStyles: {
    abstractKicker: {
      color: "#e30613",
      "font-size": "9px",
      "font-weight": "700",
      "letter-spacing": "0.2em",
      "text-transform": "uppercase",
      "margin-bottom": "8px"
    },
    // key-number 承担 issue-banner：满幅红底 + 巨号 Nº04 + 顶部小 kicker + 底部 meta body
    keyNumberValue: {
      color: "#ffffff",
      "font-size": "56px",
      "font-weight": "700",
      "line-height": "0.85",
      "letter-spacing": "-0.04em",
      "margin-bottom": "4px"
    },
    keyNumberKicker: {
      color: "#ffffff",
      "font-size": "9px",
      "font-weight": "400",
      "letter-spacing": "0.3em",
      "text-transform": "uppercase",
      "margin-bottom": "4px",
      opacity: "0.85"
    }
  },
  // ============================================================
  // 元素级样式
  // ============================================================
  elements: {
    h1: {
      "font-size": "22px",
      "font-weight": "700",
      color: "#000000",
      "margin-top": "0",
      "margin-bottom": "8px",
      "line-height": "1.35",
      "letter-spacing": "-0.01em"
    },
    // h2：红章徽章由 decorations.headingPrefix 自动注入；本规则只管标题文字本体
    // 直角 + border-bottom 模拟设计稿"标题文字 + 独立分隔 div"两段结构
    h2: {
      __reset: true,
      "font-size": "16px",
      "font-weight": "700",
      color: "#000000",
      "margin-top": "32px",
      "margin-bottom": "12px",
      "line-height": "1.2",
      // padding-bottom:10px → 文字与分隔线之间留呼吸,复刻设计稿"标题 div"和"分隔 div"两段间的间距
      "padding-bottom": "10px",
      "border-bottom": "1px solid #000000",
      "padding-top": "0",
      "letter-spacing": "-0.01em"
    },
    h3: {
      "font-size": "12px",
      "font-weight": "700",
      color: "#000000",
      "margin-top": "14px",
      "margin-bottom": "6px",
      "line-height": "1.5"
    },
    h4: {
      "font-size": "12px",
      "font-weight": "600",
      color: "#000000",
      "margin-top": "12px",
      "margin-bottom": "6px",
      "line-height": "1.5"
    },
    h5: {
      "font-size": "13px",
      "font-weight": "600",
      color: "#000000",
      "margin-top": "14px",
      "margin-bottom": "6px",
      "line-height": "1.5",
      "letter-spacing": "0.3px"
    },
    h6: {
      "font-size": "11px",
      "font-weight": "700",
      color: "#6b6b6b",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.5",
      "letter-spacing": "1.5px",
      "text-transform": "uppercase"
    },
    p: {
      "font-size": "13px",
      "line-height": "1.6",
      color: "#000000",
      "margin-top": "0",
      "margin-bottom": "12px"
    },
    // pull-quote：设计稿"3 栏偏移 + 12px 红左条 + 18px 中粗 + 行间紧"。
    // __reset 把 default 的浅底卡彻底洗掉,只留 Swiss 极简硬边
    blockquote: {
      __reset: true,
      "border-left": "12px solid #e30613",
      "background-color": "transparent",
      color: "#000000",
      padding: "0 0 0 14px",
      // 25% 左 margin = 12 栏制下偏移 3/12（设计稿 pull-quote `flex:3 / flex:9` 比例）
      "margin-top": "26px",
      "margin-right": "0",
      "margin-bottom": "26px",
      "margin-left": "25%",
      "font-size": "18px",
      "font-weight": "500",
      "line-height": "1.35",
      "letter-spacing": "-0.02em",
      "border-radius": "0"
    },
    // ordered-list：保留 OL marker 走系统默认（公众号兼容性最高）。
    // 设计稿"01 / 02 / 03 红色 monospace"通过 li::marker 难以稳定生效（公众号沙箱剥），
    // 退而求其次：marker 颜色不强求,正文 list-style:decimal-leading-zero 体现"01/02"零填充
    ol: {
      "padding-left": "24px",
      "margin-top": "0",
      "margin-bottom": "14px",
      "list-style": "decimal-leading-zero"
    },
    ul: { "padding-left": "20px", "margin-top": "0", "margin-bottom": "14px" },
    li: { "margin-bottom": "4px", "line-height": "1.6", color: "#000000" },
    strong: { "font-weight": "700", color: "#000000" },
    em: { "font-style": "italic", color: "#000000" },
    // 链接：红字 + 红下划线（设计稿 `<a>` 风格）
    a: {
      color: "#e30613",
      "text-decoration": "none",
      "border-bottom": "1px solid #e30613"
    },
    // hr：1px 黑实线（与 dividers 共构 Swiss 分隔语言）
    hr: {
      border: "none",
      height: "1px",
      "background-color": "#000000",
      "margin-top": "24px",
      "margin-bottom": "24px"
    },
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "10px",
      "margin-right": "auto",
      "margin-bottom": "10px",
      "margin-left": "auto",
      "border-radius": "0"
    },
    // 代码块：设计稿"黑底白字 + 顶部红色 // READING.JS 注释"
    // 顶部红注释由作者在代码块首行写 `// READING.JS` 实现（highlight.js 自动着色为 comment-red）
    pre: {
      __reset: true,
      "background-color": "#000000",
      color: "#ffffff",
      padding: "12px 14px",
      margin: "12px 0 18px",
      "border-radius": "0",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "box-shadow": "inset -14px 0 10px -10px rgba(0,0,0,0.4)",
      "font-size": "11px",
      "line-height": "1.7"
    },
    // 行内代码：黑边框 + 等宽（设计稿 inline-code"黑边框等宽"）
    code: {
      "background-color": "#ffffff",
      color: "#000000",
      padding: "0 4px",
      border: "1px solid #000000",
      "border-radius": "0",
      "font-size": "12px"
    },
    // 极简方键：radius 0 + 不对称黑边（底 2px/右 1px，Swiss 不对称排印语言）
    kbd: {
      display: "inline-block",
      "background-color": "#f0f0f0",
      color: "#000000",
      "border-top": "1px solid #000000",
      "border-right": "1px solid #000000",
      "border-bottom": "2px solid #000000",
      "border-left": "1px solid #000000",
      "border-radius": "0",
      padding: "0 5px",
      "font-size": "11px",
      "line-height": "1.5",
      "vertical-align": "middle"
    },
    // 苏黎世数据栏：radius 0 + 上下 1px 黑实线 + th 全大写 letter-spacing 拉开，无左右竖边框
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "16px",
      "font-size": "13px"
    },
    th: {
      "border-top": "1px solid #000000",
      "border-bottom": "1px solid #000000",
      "border-left": "none",
      "border-right": "none",
      padding: "6px 10px",
      "background-color": "transparent",
      "text-align": "left",
      "font-weight": "700",
      "font-size": "10px",
      "letter-spacing": "0.15em",
      "text-transform": "uppercase",
      color: "#000000"
    },
    td: {
      "border-top": "none",
      "border-bottom": "1px solid #e8e8e8",
      "border-left": "none",
      "border-right": "none",
      padding: "6px 10px",
      color: "#000000"
    }
  },
  // ============================================================
  // 内联强调
  // ============================================================
  inline: {
    // highlight：荧光黄底（设计稿 `<b style="background:#ffeb3c">` 原型）
    highlight: {
      "background-color": "#ffeb3c",
      color: "#000000",
      padding: "0 2px",
      "border-radius": "0"
    },
    // wavy：红波浪下划线（默认 textEmphasis 替代——公众号 sandbox 不一定支持 text-emphasis）
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#e30613",
      "text-underline-offset": "3px"
    },
    // emphasis：红色 + 600 字重 + text-emphasis dot（作者用 ==text== 触发的语义着重）
    //   text-emphasis 在 wechat Chrome 86+ 与 Safari 15.4+ 上呈红点旁注; 较老客户端
    //   降级为红色 + 粗体。-webkit- 前缀被 FORBIDDEN_VALUE_PATTERNS 拦截,不写。
    emphasis: {
      color: "#e30613",
      "font-weight": "600",
      "text-emphasis": "dot #e30613",
      "text-emphasis-position": "under"
    },
    del: {
      color: "#6b6b6b",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#e30613",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器视觉（每个签名容器在此微调；renderer 提供 fallback,spec 覆盖优先）
  // ============================================================
  containers: {
    // intro：导语大字（18px / 中粗 / 红 ■ 由作者在 markdown 里手写 `**■**` 或字符
    // 实际由后端 escText —— 改走 紧凑 padding + 大字号 + 0 边框
    intro: {
      __reset: true,
      "background-color": "transparent",
      padding: "0",
      margin: "0 0 18px 0",
      color: "#000000",
      "font-size": "18px",
      "font-weight": "500",
      "line-height": "1.4",
      "letter-spacing": "-0.01em"
    },
    // author：三栏分隔（AUTHOR / EDITOR / SET）—— 上下 hairline 黑线 + 小字 kicker
    // renderer 默认"作者名 + role"两段；用 author markdown body 内的纯文本承载三段
    author: {
      __reset: true,
      "border-top": "1px solid #000000",
      "border-bottom": "1px solid #000000",
      padding: "8px 0",
      margin: "0 0 28px 0",
      "background-color": "transparent",
      "border-radius": "0",
      "font-size": "11px"
    },
    // cover：作者用 keyNumber 当 issue-banner; cover 容器保留备用但样式中性
    cover: {
      __reset: true,
      margin: "0 0 12px 0",
      padding: "0"
    },
    // admonition 四态 wrapper 由 news-row variant 自渲染（左 3px 色条 + 实色徽章）
    // 这里只声明微小覆盖,不打断 variant 输出
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // note：side-bar variant（左 2px 中性线 + textMuted 缩进）+ 不再加额外底色
    note: {
      __reset: true,
      "background-color": "transparent",
      margin: "16px 0",
      "border-radius": "0"
    },
    // quote-card：弃用——pull-quote 走原生 blockquote element 样式。保留中性 fallback
    quoteCard: {
      __reset: true,
      "background-color": "#f0f0f0",
      padding: "18px 16px",
      margin: "20px 0",
      "border-radius": "0"
    },
    highlight: {
      __reset: true,
      "background-color": "#f0f0f0",
      padding: "14px 16px",
      margin: "16px 0",
      "border-radius": "0",
      border: "1px solid #000000"
    },
    compare: { margin: "16px 0 20px" },
    steps: { margin: "20px 0" },
    sectionTitle: {
      __reset: true,
      margin: "32px 0 10px",
      "padding-bottom": "0",
      "border-bottom": "none"
    },
    // footer-cta：设计稿 cta-bar (三栏:♡LIKE / ◎SEEN / →SHARE) 走 ctaBar 容器
    // footerCTA 是文末"关注我"块,这里克制成"右下角红方块 sealMark + 居中按钮"
    footerCTA: {
      __reset: true,
      margin: "24px 0",
      padding: "0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    recommend: {
      __reset: true,
      margin: "20px 0",
      padding: "12px 14px",
      "background-color": "#f0f0f0",
      "border-radius": "0",
      "border-left": "3px solid #000000"
    },
    qrcode: {
      __reset: true,
      margin: "22px 0",
      padding: "14px",
      "background-color": "#ffffff",
      border: "1px solid #000000",
      "border-radius": "0"
    },
    // abstract：tl;dr 摘要,设计稿没有专门组件,克制成"左 3px 红条 + hairline 上下"
    abstract: {
      __reset: true,
      "border-top": "1px solid #000000",
      "border-bottom": "1px solid #000000",
      padding: "12px 0 12px 0",
      margin: "0 0 22px 0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    // key-number 承担 issue-banner：满幅红底 + 大号 Nº04 + kicker / body 上下夹住。
    // 渲染顺序：kicker(info) → value(attrs.value) → body markdown。
    // wrapper 上设 color:white，内部 p 通过 CSS color inheritance 继承反白文字色，
    // 避免 spec.elements.p 跨容器染色。
    keyNumber: {
      __reset: true,
      "background-color": "#e30613",
      color: "#ffffff",
      padding: "18px 16px 16px",
      margin: "0 0 0 0",
      "border-top": "none",
      "border-radius": "0"
    },
    // ── data-brief 家族容器：spec 仅做"Swiss 化"细节调整 ──────
    masthead: {
      __reset: true,
      margin: "0 0 14px 0",
      "padding-bottom": "4px",
      "border-bottom": "1px solid #000000"
    },
    sectionTag: { margin: "0 0 12px 0" },
    // byline：三栏 AUTHOR / EDITOR / SET，上下 hairline 黑分隔
    byline: {
      __reset: true,
      "border-top": "1px solid #000000",
      "border-bottom": "1px solid #000000",
      margin: "0 0 28px 0",
      padding: "0"
    },
    // editorial-header：装饰副刊头。renderer 已承担 topRule + chip + title + subtitle
    // 全部 inline 装饰；wrapper 只留下与 byline 之间的呼吸
    editorialHeader: {
      __reset: true,
      margin: "0 0 14px 0",
      padding: "0"
    },
    // toc：设计稿"双栏压满 · INDEX 标签 + 带页码"; toc-item renderer 固定 30px/1fr/auto 三栏
    // 这里 wrapper 走 hairline 上下分隔 + 直角硬边
    toc: {
      __reset: true,
      "border-top": "1px solid #000000",
      "border-bottom": "2px solid #000000",
      padding: "12px 14px",
      margin: "0 0 24px 0",
      "background-color": "#ffffff",
      "border-radius": "0"
    },
    kpiDashboard: {
      __reset: true,
      "background-color": "#ffffff",
      "border-top": "1px solid #000000",
      "border-bottom": "1px solid #000000",
      padding: "14px 12px 12px",
      margin: "0 0 24px 0",
      "border-radius": "0"
    },
    // bar-chart：设计稿"FIG.01 黑底头 + 浅灰轨道 + 黑色填充 + 末项红色"
    // wrapper 走 1px 黑全边框 + 无内底色（FIG 头条由 renderer 内置 inline 样式承担）
    barChart: {
      __reset: true,
      border: "1px solid #000000",
      padding: "16px 14px",
      margin: "20px 0",
      "background-color": "#ffffff",
      "border-radius": "0"
    },
    // qa-block：典型 wrapper-level 微调——margin 留 26px 与上下文断开；
    // 视觉骨架（黑底 Q + 白底 A）由 variant typed-block 自行承担。
    qaBlock: {
      __reset: true,
      "background-color": "transparent",
      padding: "0",
      margin: "26px 0",
      "border-radius": "0"
    },
    // footnotes：两骨架共用的色 / 字号 / 边框；padding-left / text-indent / max-height
    // 由 variants/footnotes/{lined, inline-flow}.ts inline 注入。
    // "NOTES" kicker 由作者写 info: `::: footnotes variant=inline-flow NOTES`。
    footnotes: {
      __reset: true,
      "border-top": "1px solid #000000",
      margin: "20px 0",
      "font-size": "10px",
      "line-height": "1.7",
      "letter-spacing": "0.01em",
      color: "#333333"
    },
    // cta-bar：设计稿"IF YOU LIKED THIS 黑底头 + 三栏 (描边/实色/描边)"
    // renderer 固定 table 三栏: 描边 / fill / 描边; fill 走 primary=red, 与设计稿一致
    // qr-follow：设计稿"左 QR + 右三行文字 (SUBSCRIBE/标题/说明)" hairline 全边框 + 直角
    // colophon：设计稿"NEXT · VOL 双栏 monospace, 上 3px 黑分隔" —— renderer 走 display:table
    colophon: {
      __reset: true,
      "border-top": "3px solid #000000",
      "margin-top": "24px",
      "padding-top": "10px",
      "border-radius": "0"
    },
    // 苏黎世图注：居左极小字 + letter-spacing 0.2em 拉开，数据图说栏感（font-family 被平台剥，靠字距代偿 monospace 气质）
    imageCaption: {
      __reset: true,
      margin: "6px 0 16px",
      "text-align": "left",
      "font-size": "10px",
      color: "#6b6b6b",
      "letter-spacing": "0.2em",
      "line-height": "1.5"
    },
    // 直角硬边强警示横幅：国际红块 + 白字 + 全框黑线，Swiss 的"STOP"信号
    announcement: {
      __reset: true,
      "background-color": "#e30613",
      color: "#ffffff",
      padding: "12px 16px",
      margin: "18px 0",
      "border-radius": "0",
      border: "1px solid #000000",
      "font-weight": "700",
      "letter-spacing": "0.05em"
    }
  },
  // ============================================================
  // 模板片段（作者侧示例 · 不影响 CSS 生成；commonTemplates 隐式合并）
  // ============================================================
  templates: {
    cover: `::: key-number NEUE LESE GRAFIK value="Nº04"
VOL.IV · 2026—04—22 · CHF 14.—
:::

::: section-tag ESSAY · 01
:::

# 在无人深夜，重新学习如何阅读一本书
`,
    authorBar: `::: author
撰文 **顾留白**　·　编辑 **徐稍后读**　·　SET **04·2026**
:::
`,
    footerCTA: `::: cta-bar like="♡  LIKE" star="◎  SEEN" share="→  SHARE"
:::
`,
    tip: `::: tip TIP
本期核心建议。
:::
`
  },
  meta: {
    createdAt: "2026-05-14",
    ownerNotes: '主题 02 苏黎世栅格 · 三条不可妥协：radius=0、primary #e30613、H2 红章徽章。\n架构复用：admonition `news-row` variant 直接复刻设计稿 multi-callout；\nissue-banner 复用 key-number 容器（kicker/value/body 三段 vertical stack）；\nNOTES 脚注用 footnotes variant=inline-flow（自带 kicker）；编辑部按 / 方法论\n走 note variant=editorial-stripe / research-dense。\nqa-block：P3.3 升级 variant=typed-block（黑底反白 Q + 白底 A 双段），与设计稿 02·B "Q/A 三线表" 同骨架。\nissue-banner 取消右侧 VOL/CHF 浮动列，改 body 单段堆叠（375px 移动端更稳）。\n新增架构：HeadingPrefixDecoration.style 增 backgroundColor/paddingX/paddingY（H2 红章核心）。'
  }
};
const spec$5 = {
  id: "brutalist",
  name: "粗野主义报刊",
  description: "近黑底 + 荧光黄 + 直角硬边：punk-zine / 终端 / 凌晨三点印刷厂",
  audience: "夜读简报 / 文化批评 / 实验栏目",
  // 暗底基线：buildTheme 切到 hairline 卡片兜底。本主题历史上 28 处 __reset 主要
  // 是为了把浅底基线的"软底卡 + 圆角"覆盖成"透明底 + hairline + 直角"——dark 基线
  // 出现后,后续重构可逐项删除这些 __reset 直接消费基线。当前保留 __reset 保证快照稳定。
  baseTheme: "dark",
  // ============================================================
  // 色板（来源：docs/themes-specs/themes/07-brutalist.html :root tokens）
  // ============================================================
  palette: {
    primary: "#ebff00",
    // 荧光黄（唯一强调色）
    secondary: "#a0a0a0",
    // 灰辅助（textMuted 同源）
    accent: "#ebff00",
    // = primary
    bg: "#0a0a0a",
    // 近黑底
    bgSoft: "#1a1a1a",
    // 略提一档（用于次级深色块）
    bgMuted: "#2a2a2a",
    // 再提一档（图片占位斜纹底）
    text: "#f0f0f0",
    // 近白字
    textMuted: "#a0a0a0",
    // 灰辅助
    // 反色文字：在荧光黄底 / 反色贴纸上的文字色 = 近黑（与 bg 同）
    // tilted-sticker / highlight inline / news-row 徽章统一消费这个 token
    textInverse: "#0a0a0a",
    border: "#f0f0f0",
    // 双粗线刊头 / 横分割线（与 text 同源，强对比）
    code: "#ebff00",
    // inline code 黄字
    // note side-bar 差异化：黄色虚线左条（与暗底直角语言一致，零圆角硬边气质）
    noteBorder: "#ebff00",
    noteBorderStyle: "dashed",
    noteBorderWidth: 2
  },
  // 语义四色（设计稿 multi-callout 四联词表 NOTE / TIP / WARN / HALT）
  status: {
    info: { accent: "#4488dd", soft: "#11151c" },
    // NOTE 蓝
    tip: { accent: "#66cc66", soft: "#0f1810" },
    // TIP 绿
    warning: { accent: "#ebff00", soft: "#1a1a08" },
    // WARN 黄（= primary）
    danger: { accent: "#ff3355", soft: "#1c0a0d" }
    // HALT 红
  },
  // ============================================================
  // 字号 / 间距 / 圆角（直角硬边）
  // ============================================================
  typography: {
    baseSize: 13,
    // 设计稿正文 13px
    lineHeight: 1.6,
    h1Size: 30,
    // 出血副刊头大字（实际 36px 由 spec.elements.h1 直接覆盖）
    h2Size: 16,
    // 章节标题（顶横线 + 黄色序号）
    h3Size: 13,
    // 子标题（黄色等宽）
    letterSpacing: 0
  },
  spacing: { paragraph: 14, section: 28, listItem: 4, containerPadding: 14 },
  radius: { sm: 0, md: 0, lg: 0 },
  // 全 0 —— 圆角即软
  // ============================================================
  // Decorations：作者只写 `## 标题` / `### 子标题`,管线统一注入"01/02/03"与"2.1/2.2"
  // 荧光黄序号。粗野主义不写英文章节大写，序号是数字直给。
  // ============================================================
  decorations: {
    headingPrefix: [
      {
        level: 2,
        autoNumber: "arabic-padded",
        style: {
          color: "primary",
          fontWeight: 700,
          marginRight: 8
        }
      },
      {
        level: 3,
        autoNumber: "arabic-section",
        style: {
          color: "primary",
          fontWeight: 700,
          marginRight: 8
        }
      }
    ]
  },
  // ============================================================
  // Motifs：极简,只留 dividerFlower（两线 + 中央 primary 方块）+ stepBadge
  // 四态图标刻意不导出 —— news-row 不渲染 icon（语义信号靠色相 + 大写徽章字）。
  // 设计稿的"图片占位"用 spec.elements.img 的黄色边框承担,不通过 motif。
  // ============================================================
  motifs: {
    // dividerFlower：两根 horizontal rule + 中央 primary 黄方块（设计稿 divider-ornament
    // 的"等宽破折"原型几何化呈现 —— 真 ━━━━ 文本太靠 font-family,故同位语义改用 SVG）
    dividerFlower: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: "line", x1: 0, y1: 4, x2: 110, y2: 4, stroke: "token:text", strokeWidth: 1 },
        { type: "rect", x: 115, y: 1, w: 10, h: 6, fill: "token:primary" },
        { type: "line", x1: 130, y1: 4, x2: 240, y2: 4, stroke: "token:text", strokeWidth: 1 }
      ]
    },
    // dividerWave：等宽破折近似（一长矩形 + 中央断口）—— 备用 divider
    dividerWave: {
      viewBox: [0, 0, 240, 4],
      width: 220,
      height: 4,
      primitives: [
        { type: "rect", x: 0, y: 1, w: 240, h: 2, fill: "token:primary" }
      ]
    },
    // dividerDots：三个 primary 黄色小方块（备用 divider）
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: "rect", x: 108, y: 2, w: 4, h: 4, fill: "token:primary" },
        { type: "rect", x: 118, y: 2, w: 4, h: 4, fill: "token:primary" },
        { type: "rect", x: 128, y: 2, w: 4, h: 4, fill: "token:primary" }
      ]
    },
    // stepBadge：荧光黄方块 + 反色数字（直角,与 radius=0 纪律统一）
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      placeholders: ["N"],
      primitives: [
        { type: "rect", x: 0, y: 0, w: 24, h: 24, fill: "token:primary" },
        {
          type: "text",
          x: 12,
          y: 17,
          content: "{N}",
          fontSize: 14,
          fontWeight: 700,
          fill: "token:textInverse",
          textAnchor: "middle"
        }
      ]
    }
  },
  // ============================================================
  // 骨架变体
  // ============================================================
  variants: {
    // 四态多框（multi-callout）共骨架 + 大写徽章 + 色相 —— 与 data-brief 同源。
    // 作者写 `::: info NOTE` / `::: tip TIP` / `::: warning WARN` / `::: danger HALT`,
    // ctx.info 覆盖 news-row 默认 TIP/INFO/WARN/STOP。
    admonition: "slab-corner",
    // brutalist 专属：顶 6px accent 硬条 + 右上方块徽章 + zero-radius
    quote: "tilted-sticker",
    // 粗野主义签名：反色 + transform:rotate(-1deg) + 大字 sans 粗体
    compare: "stacked-row",
    // 粗野主义偏竖叠陈述：先 A 段后 B 段，硬边对照
    steps: "split-row",
    // 左 4px 主色实线 + 左编号，硬边骨架与 news-row 同源
    divider: "flower",
    // 用本主题 dividerFlower 的"两线 + primary 方块"
    sectionTitle: "ribbon-stamp",
    // 左侧实色印章戳 + 主标题，punk-zine 标题语汇
    codeBlock: "inline-card",
    // tinted 软底 + 左主色窄竖条，与 news-row 同色块语言
    note: "side-bar",
    // 左 2px 短线 + 缩进,与"批注"语义一致
    footnotes: "top-rule",
    // 顶部 hairline + 11px 密栏，punk zine 底栏
    recommend: "card-list",
    qrcode: "follow-card",
    // 刊物订阅卡：左 QR + 右 kicker/title/desc 三行
    footerCTA: "triptych-actions",
    // 三栏 CTA（赞同/收藏/转发）
    pullQuote: "stamp-quote",
    // brutalist DNA：印章压字 + 顶底 2px 硬条，拒绝装饰巨号
    announcement: "danger-bar",
    tableCard: "rule-grid",
    gallery: "duo",
    dialogue: "qa-rows",
    // brutalist 取 typed-block：硬反白 Q / 透明 A 双段，与终端 // 注释语境一致
    qaBlock: "typed-block"
  },
  // ============================================================
  // 主题级 kicker 文案覆盖（UNIX 终端注释 + punk-zine 母语）
  //
  // 结构性导航标签走 `//` 注释前缀（终端/程序员美学）；
  // 编辑声音走方括号 `[TAG]`（punk-zine 的 ASCII 标签气质）；
  // 刊物元数据混用中英，与 colophon 设计稿的"下期 / ISSUE"双轨一致。
  // ============================================================
  kickers: {
    toc: "// CONTENTS",
    qaBlock: "// Q&A",
    qrFollowKicker: "// SCAN & FOLLOW",
    qrFollowTitle: "慢读 // slow.read",
    recommend: "[READ_NEXT]",
    footerCTATitle: "[FOLLOW]",
    colophonNextLabel: "下期",
    colophonIssueLabel: "ISSUE",
    mastheadName: "慢读"
  },
  // ============================================================
  // 签名容器：复用 data-brief 家族（masthead / toc / footnotes / qa-block /
  // colophon）。粗野主义不引入新签名容器。
  // ============================================================
  signatureContainers: [
    "masthead",
    // 三栏 ribbon 刊头（kicker / 期名 / 日期）
    "toc",
    // 目录（虚线框 + // CONTENTS kicker）
    "qaBlock",
    // 终端 Q&A 风
    "footnotes",
    // fn[] 等宽脚注
    "colophon",
    // 下期预告 + 卷·期
    "imageCaption",
    // 图注（// CAPTION 注释风 + 荧光黄）
    "announcement"
    // 强警示横幅（荧光黄整块反色）
  ],
  // ============================================================
  // 元素级样式
  // ============================================================
  elements: {
    // h1：装饰性副刊头（出血大字）。微信原生头部上方渲染原题；本 h1 承担
    // "再次强化主题"的视觉重量（30px+ 黑体不上 letter-spacing 收紧）。
    h1: {
      __reset: true,
      "font-size": "30px",
      "font-weight": "900",
      color: "#f0f0f0",
      "margin-top": "8px",
      "margin-bottom": "14px",
      "line-height": "1.05",
      "letter-spacing": "-0.04em"
    },
    // h2：章节顶线 + 荧光黄序号（序号由 decorations.headingPrefix 注入）
    h2: {
      __reset: true,
      "font-size": "16px",
      "font-weight": "700",
      color: "#f0f0f0",
      "margin-top": "28px",
      "margin-bottom": "12px",
      "line-height": "1.4",
      "letter-spacing": "0.02em",
      "border-top": "1px solid #f0f0f0",
      "padding-top": "10px"
    },
    // h3：黄色子标题（序号 + 文字）
    h3: {
      "font-size": "13px",
      "font-weight": "700",
      color: "#ebff00",
      "margin-top": "16px",
      "margin-bottom": "6px",
      "line-height": "1.5"
    },
    h4: {
      "font-size": "13px",
      "font-weight": "600",
      color: "#f0f0f0",
      "margin-top": "14px",
      "margin-bottom": "6px",
      "line-height": "1.5"
    },
    h5: {
      "font-size": "13px",
      "font-weight": "700",
      color: "#f0f0f0",
      "margin-top": "14px",
      "margin-bottom": "6px",
      "line-height": "1.5",
      "letter-spacing": "1px",
      "text-transform": "uppercase"
    },
    h6: {
      "font-size": "13px",
      "font-weight": "600",
      color: "#a0a0a0",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.5",
      "letter-spacing": "2px",
      "text-transform": "uppercase"
    },
    p: {
      "font-size": "13px",
      "line-height": "1.6",
      color: "#f0f0f0",
      "margin-top": "0",
      "margin-bottom": "14px"
    },
    // 裸 blockquote：上下双线 + 缩进（粗野主义不走"软底色卡片"）
    blockquote: {
      __reset: true,
      "border-left": "none",
      "border-top": "1px solid #f0f0f0",
      "border-bottom": "1px solid #f0f0f0",
      "background-color": "transparent",
      color: "#f0f0f0",
      padding: "10px 0",
      margin: "18px 0",
      "font-size": "13px",
      "line-height": "1.6",
      "border-radius": "0"
    },
    ul: { "padding-left": "20px", "margin-top": "0", "margin-bottom": "14px" },
    ol: { "padding-left": "20px", "margin-top": "0", "margin-bottom": "14px" },
    li: { "margin-bottom": "4px", "line-height": "1.9", color: "#f0f0f0" },
    strong: { "font-weight": "700", color: "#ebff00" },
    // 粗体 = 黄高亮
    em: { "font-style": "italic", color: "#a0a0a0" },
    // 斜体 = 灰副本
    a: { color: "#ebff00", "text-decoration": "underline" },
    // hr：荧光黄横条（设计稿 divider-ornament ━━━ 等宽破折的"光栅化"对应物）
    hr: {
      border: "none",
      height: "2px",
      "background-color": "#ebff00",
      "margin-top": "28px",
      "margin-bottom": "28px"
    },
    // img：荧光黄边框（设计稿 image-placeholder 的"黄框"语汇）
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "24px",
      "margin-right": "auto",
      "margin-bottom": "8px",
      "margin-left": "auto",
      border: "2px solid #ebff00",
      "border-radius": "0"
    },
    // 代码块：白底反色 + 左侧黄色 6px 实线（设计稿 code-block 原型）
    pre: {
      __reset: true,
      "background-color": "#f0f0f0",
      color: "#0a0a0a",
      padding: "14px 16px",
      margin: "14px 0",
      "border-left": "6px solid #ebff00",
      "border-radius": "0",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "box-shadow": "inset -14px 0 10px -10px rgba(0,0,0,0.25)",
      "font-size": "12px",
      "line-height": "1.8"
    },
    // inline code：荧光黄底 + 反色字（设计稿 inline-code 原型）
    code: {
      "background-color": "#ebff00",
      color: "#0a0a0a",
      padding: "1px 4px",
      "border-radius": "0",
      "font-size": "13px",
      "font-weight": "700"
    },
    // 撕贴纸键：荧光黄底 + 黑实色边（全 1px 等粗）+ 字距 0，粗野徽章感
    kbd: {
      display: "inline-block",
      "background-color": "#ebff00",
      color: "#0a0a0a",
      border: "1px solid #f0f0f0",
      "border-radius": "0",
      padding: "0 5px",
      "font-size": "12px",
      "font-weight": "700",
      "letter-spacing": "0",
      "line-height": "1.5",
      "vertical-align": "middle"
    },
    // 粗野黄黑表：radius 0 + 荧光黄 th 反色 + 全大写 + 1px 黑实色边
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "16px",
      "font-size": "13px"
    },
    th: {
      border: "1px solid #f0f0f0",
      padding: "6px 10px",
      "background-color": "#ebff00",
      color: "#0a0a0a",
      "text-align": "left",
      "font-weight": "700",
      "text-transform": "uppercase",
      "letter-spacing": "0.05em"
    },
    td: {
      border: "1px solid #f0f0f0",
      padding: "6px 10px",
      color: "#f0f0f0"
    }
  },
  // ============================================================
  // 内联强调
  // ============================================================
  inline: {
    // highlight：荧光黄底 + 反色字（设计稿 intro-para 关键词高亮）
    highlight: {
      "background-color": "#ebff00",
      color: "#0a0a0a",
      padding: "1px 3px",
      "border-radius": "0"
    },
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#ebff00",
      "text-underline-offset": "3px"
    },
    emphasis: {
      color: "#ebff00",
      "font-weight": "700"
    },
    del: {
      color: "#a0a0a0",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#ebff00",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器视觉（每个签名容器在此微调；renderer 提供 fallback，spec 覆盖优先）
  // ============================================================
  containers: {
    // intro：导语区域（默认透明,正文级 14px）
    intro: {
      __reset: true,
      "background-color": "transparent",
      "border-left": "none",
      "border-radius": "0",
      padding: "0",
      margin: "0 0 24px 0",
      color: "#f0f0f0",
      "font-size": "14px",
      "line-height": "1.55"
    },
    // author：作者日期灰小字（与设计稿 byline 对应）
    author: {
      __reset: true,
      "background-color": "transparent",
      border: "none",
      "border-radius": "0",
      padding: "0",
      margin: "0 0 28px 0",
      color: "#a0a0a0",
      "font-size": "11px",
      "line-height": "1.7",
      "letter-spacing": "0.02em"
    },
    // cover：刊物副刊头容器（margin 兜底,内部 h1 由 spec.elements.h1 接管）
    cover: { margin: "0 0 14px 0" },
    // admonition 四态由 news-row variant 接管；spec.containers 留空让 variant 自治
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // note：side-bar variant 自取 noteBorder* tokens（黄色 2px dashed）。
    // baseTheme:'dark' 已提供 margin:'16px 0' 兜底；这里只覆盖 radius 直角。
    note: {
      "background-color": "transparent",
      "border-radius": "0"
    },
    // quote-card：tilted-sticker variant 已注入旋转 + 反色,这里追加 margin 不重复样式
    quoteCard: { margin: "24px 0" },
    // highlight：通用高亮块（中性,与 editor-note 的"被点名"区别）
    highlight: {
      __reset: true,
      "background-color": "#1a1a1a",
      padding: "12px 14px",
      margin: "16px 0",
      "border-radius": "0",
      "border-left": "3px solid #ebff00"
    },
    compare: { margin: "16px 0" },
    steps: { margin: "20px 0" },
    // sectionTitle：dark 基线提供 margin/padding-bottom；本主题覆盖 border-bottom
    // 为 1px 实线（base 是 2px primary，粗野主义用 hairline 不抢色）。
    sectionTitle: {
      margin: "28px 0 12px",
      "padding-bottom": "6px",
      "border-bottom": "1px solid #f0f0f0"
    },
    // footer-cta：备用（粗野主义主要用 ctaBar 签名容器）
    footerCTA: {
      __reset: true,
      margin: "24px 0",
      padding: "0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    recommend: {
      __reset: true,
      margin: "20px 0",
      padding: "12px 14px",
      "background-color": "#1a1a1a",
      "border-left": "3px solid #ebff00",
      "border-radius": "0"
    },
    // qrcode：light/dark base 都只给 margin+padding 兜底，本主题加 1px 黑边框 + 直角。
    qrcode: {
      margin: "22px 0",
      padding: "12px",
      border: "1px solid #f0f0f0",
      "border-radius": "0"
    },
    // signature 容器
    // abstract：dark 基线已提供 border-left/bg/padding/margin/radius；本主题覆盖
    // border-left 收紧 (4→3px)、padding 紧凑、margin 顶部 0、radius 直角。
    abstract: {
      "border-left": "3px solid #ebff00",
      padding: "4px 0 4px 14px",
      margin: "0 0 22px 0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    // keyNumber：dark 基线已提供 bg transparent / border-top primary / radius；
    // 本主题加 bg #1a1a1a 让大数字落在次级深色块上 + radius 直角。
    keyNumber: {
      margin: "18px 0",
      padding: "16px",
      "background-color": "#1a1a1a",
      "border-top": "3px solid #ebff00",
      "border-radius": "0"
    },
    // ── data-brief 家族签名容器：粗野主义版本的视觉收紧 ──
    // masthead：上下双 2px 实线 + 三栏 ribbon（attrs.kicker 触发）
    masthead: {
      __reset: true,
      "border-top": "2px solid #f0f0f0",
      "border-bottom": "2px solid #f0f0f0",
      padding: "6px 0",
      margin: "0 0 20px 0",
      "border-radius": "0"
    },
    sectionTag: { margin: "0 0 14px 0" },
    // toc：dark 基线给 hairline + transparent + sm radius；本主题覆盖 border 为
    // dashed 灰 + 直角，与终端命令行的"// CONTENTS"语汇配套。
    toc: {
      "background-color": "transparent",
      border: "1px dashed #a0a0a0",
      padding: "10px 12px",
      margin: "0 0 24px 0",
      "border-radius": "0"
    },
    // kpiDashboard：dark 基线给上下 hairline + transparent；本主题加 bg #1a1a1a
    // 让数据卡落在次级深色块上 + radius 直角。
    kpiDashboard: {
      "background-color": "#1a1a1a",
      "border-top": "1px solid #f0f0f0",
      "border-bottom": "1px solid #f0f0f0",
      padding: "18px 16px 16px",
      margin: "0 0 28px 0",
      "border-radius": "0"
    },
    // barChart：dark 基线给 hairline border + transparent；本主题加 bg + radius 直角。
    barChart: {
      "background-color": "#1a1a1a",
      border: "1px solid #f0f0f0",
      padding: "16px 14px",
      margin: "20px 0 24px",
      "border-radius": "0"
    },
    // qa-block · wrapper-level 微调：transparent + margin；视觉骨架（外框 / 反白 Q 段）
    //   由 variant typed-block 自管，无需主题 CSS 再开一道边框
    qaBlock: {
      __reset: true,
      "background-color": "transparent",
      padding: "0",
      margin: "24px 0",
      "border-radius": "0"
    },
    // footnotes：上虚线 + 灰小字（两骨架共用；长列表写 variant=inline-flow 内滚动）
    footnotes: {
      __reset: true,
      "border-top": "1px dashed #f0f0f0",
      margin: "20px 0",
      "font-size": "10px",
      "line-height": "1.75",
      color: "#a0a0a0"
    },
    // cta-bar：三栏（LIKE / STAR / FWD）—— renderer 已提供 display:table 骨架
    // qr-follow：左 QR + 右 SUBSCRIBE / 标题 / 说明（黄边框 + 黑底）
    // colophon：上 2px 双粗线 + "下期 / 卷·期"（与 masthead 头尾呼应）
    colophon: {
      __reset: true,
      "border-top": "2px solid #f0f0f0",
      "margin-top": "24px",
      "padding-top": "12px",
      "border-radius": "0"
    },
    // 粗野图注：`// CAPTION` 注释风 + 荧光黄 + 等宽，终端输出感
    imageCaption: {
      __reset: true,
      margin: "4px 0 16px",
      "text-align": "left",
      "font-size": "11px",
      color: "#ebff00",
      "font-weight": "700",
      "letter-spacing": "0.1em"
    },
    // 撕贴纸反色横幅：荧光黄整块 + 反色黑字 + 全大写，强势 punk-zine 通告
    announcement: {
      __reset: true,
      "background-color": "#ebff00",
      color: "#0a0a0a",
      padding: "12px 16px",
      margin: "18px 0",
      "border-radius": "0",
      "font-weight": "700",
      "letter-spacing": "0.05em"
    },
    // voice / video 卡：dark 基线给 transparent + 1px border + md radius；本主题加粗到
    // 2px + 直角，与刊头双粗线、masthead 同语汇（粗野铁皮箱形态）。
    voiceCard: {
      "background-color": "transparent",
      border: "2px solid #f0f0f0",
      "border-radius": "0",
      padding: "14px 16px",
      margin: "22px 0"
    },
    videoCard: {
      "background-color": "transparent",
      border: "2px solid #f0f0f0",
      "border-radius": "0",
      padding: "14px 16px",
      margin: "22px 0"
    }
  },
  // ============================================================
  // 容器内层 inline-style 覆盖
  // ============================================================
  innerStyles: {
    // abstract 容器透明底 = 落在近黑页底（#0a0a0a）上，kicker 走荧光黄 primary 保持可见
    abstractKicker: {
      __reset: true,
      color: "#ebff00",
      "font-size": "11px",
      "font-weight": "700",
      "letter-spacing": "0.2em",
      "text-transform": "uppercase",
      "margin-bottom": "6px"
    },
    // keyNumber 容器底色 #1a1a1a（暗底），大数字走荧光黄 primary 承担视觉重量
    keyNumberValue: {
      __reset: true,
      color: "#ebff00",
      "font-size": "34px",
      "font-weight": "900",
      "line-height": "1.0",
      "letter-spacing": "-0.5px",
      "margin-bottom": "4px"
    },
    // keyNumber 暗底上的小 kicker 走荧光黄 primary，与 abstractKicker 语言统一
    keyNumberKicker: {
      __reset: true,
      color: "#ebff00",
      "font-size": "11px",
      "font-weight": "700",
      "letter-spacing": "0.2em",
      "text-transform": "uppercase",
      "margin-bottom": "8px"
    }
  },
  // ============================================================
  // 模板片段（作者侧示例；commonTemplates 隐式合并）
  // ============================================================
  templates: {
    cover: `::: masthead 慢读 issue="04" date="2026.04.22" kicker="第 04 期"
:::

# 出血副刊头大字
`,
    authorBar: `::: author
撰文　何已阅
日期　2026.04.22
:::
`,
    footerCTA: `::: cta-bar like="LIKE" star="STAR ★" share="FWD →"
:::
`,
    tip: `::: tip TIP
要点正文。
:::
`
  },
  meta: {
    createdAt: "2026-05-14",
    ownerNotes: "主题 07 粗野主义报刊：荧光黄 + 暗底 + 直角硬边。复用现有 admonition.news-row、data-brief 家族签名容器（masthead 增 kicker 三栏 ribbon 模式）；唯一新增 variant 为 quote.tilted-sticker（punk-zine 撕贴纸语义,可复用）。编辑部按 / 调研口径走 note variant=editorial-stripe / research-dense。"
  }
};
const spec$4 = {
  id: "late-night-vinyl",
  name: "深夜电台",
  description: "深夜蓝 + 暖米白 + 橙色唱针 · 03:41 AM 黑胶播客慢读感",
  audience: "电台 newsletter / 夜读慢读 / 播客文化随笔 / 长夜散文",
  // 暗底基线：buildTheme 切到 hairline 卡片兜底（透明底 + 1px border 代替 light 的 bgSoft 卡）。
  // 当前 22 处 __reset 仍优先于基线生效——快照不变；未来重构可逐项消费基线，删除 __reset。
  baseTheme: "dark",
  // ============================================================
  // 色板（来源：docs/themes-specs/themes/09-late-night-vinyl.html :root tokens）
  // ============================================================
  palette: {
    primary: "#d97a3c",
    // 橙（唱针暖光）—— 本主题唯一 accent
    secondary: "#a89070",
    // 老金辅助（元数据 / 二级文字）
    accent: "#d97a3c",
    // = primary（视觉里只跑一支 accent）
    bg: "#0e1a2b",
    // 深夜蓝黑（文章底）
    bgSoft: "#14263d",
    // 深蓝信息卡底（callout / qa-block / quote-card）
    bgMuted: "#060d18",
    // 外层衬底 / pre 代码块底（更深一档）
    text: "#d9c9a8",
    // 暖米白字
    textMuted: "#a89070",
    // 老金辅助（同 secondary）
    textInverse: "#0e1a2b",
    // 反白 = bg（橙底胶囊上的深色字）
    border: "#4a6080",
    // 暗夜冷蓝灰分割线（footer 收束色）
    code: "#d97a3c",
    // inline code 橙字
    // note side-bar 差异化：老金 dotted 点线，深夜电台"低频小播报"的柔光质感
    noteBorder: "#a89070",
    noteBorderStyle: "dotted",
    noteBorderWidth: 2
  },
  // 语义四色：对位电台广播母语 cue / b-side / static / off-air —— 与设计稿
  // multi-callout 完全一致。所有 soft 走同一深蓝卡底 bgSoft，体现"统一暗卡 + 仅
  // 标签换色"的暗夜信号系统（与 editorial-mook 的"统一米卡 + 标签换色"同源纪律）。
  status: {
    tip: { accent: "#7fb069", soft: "#14263d" },
    // b-side · B 面推荐 —— 苔绿
    info: { accent: "#5fa0c8", soft: "#14263d" },
    // cue · 提示音 —— 冷蓝（5.35:1 守 AA）
    warning: { accent: "#d97a3c", soft: "#14263d" },
    // static · 静电干扰 —— 橙（= primary）
    danger: { accent: "#d36464", soft: "#14263d" }
    // off-air · 停播 —— 警示红（4.20:1 临界，登记 grace）
  },
  // ============================================================
  // 字号 / 间距 / 圆角
  //   - base 14 / line-height 2.1 是"夜读慢读"的标志组合（同设计稿 :root）
  //   - h2 14px normal（不加粗）：章节序号靠 primary kicker 而非粗体担纲
  //   - h3 13px primary 整行变橙：小节标题本身就是"次级 accent"
  //   - radius 全 0：黑胶 / 老式收音机几何语言
  // ============================================================
  typography: {
    baseSize: 14,
    lineHeight: 2.1,
    h1Size: 22,
    // 公众号原生标题约 22px；本主题不再输出 H1（cover 容器走 div 副刊头）
    h2Size: 14,
    // 节标题字号与正文同；区分靠 letter-spacing + 橙色序号前缀
    h3Size: 13,
    // 小节标题（橙色整行）
    letterSpacing: 0.4
  },
  spacing: {
    paragraph: 16,
    section: 28,
    listItem: 4,
    containerPadding: 16
  },
  radius: { sm: 0, md: 0, lg: 0 },
  // 直角硬边 —— 半径 ≥ 1 即破
  // ============================================================
  // Decorations：自动给 h2 / h3 加章节编号前缀（橙色 monospace）。
  //
  //   - level 2 → arabic-padded（01, 02, 03）+ display:'inline' + marginRight:10
  //     橙色 monospace 序号前缀。设计稿 section-heading 原型。
  //   - level 3 → arabic-section（${h2}.${h3InH2}，如 2.1 / 2.2）
  //     标题整行已经是 primary 色（见 elements.h3），序号同色 monospace。
  //
  // 设计 trade-off：作者只写 `## 章节名` / `### 小节名`，编号由系统按出现顺序生成；
  // 想要"附录 / 终章"等非数字段时用专用容器（colophon / footnotes / editor-note 等）,
  // 不要写到 h2 ——h2 全部走 autoNumber 不留豁免位（与 data-brief 同纪律）。
  // ============================================================
  decorations: {
    headingPrefix: [
      {
        level: 2,
        autoNumber: "arabic-padded",
        style: {
          color: "primary",
          fontFamily: "monospace",
          fontWeight: 500,
          marginRight: 10
        }
      },
      {
        level: 3,
        autoNumber: "arabic-section",
        style: {
          color: "primary",
          fontFamily: "monospace",
          fontWeight: 500,
          marginRight: 8
        }
      }
    ]
  },
  // ============================================================
  // Motifs：极简——仅 dividerDots（设计稿 · · · 圆点分割）+ 四态图标。
  //
  // 为什么没有 h2Prefix / h3Prefix / quoteMark / sectionCorner：
  //   - 章节序号靠 decorations.headingPrefix 跑 autoNumber，无 SVG 介入
  //   - pull-quote 用裸 blockquote + 上下橙线（设计稿原型，见 elements.blockquote）
  //   - section-title 不参与（本主题用 h2 + autoNumber kicker 担纲章节信号）
  // ============================================================
  motifs: {
    // dividerDots · 设计稿 divider-ornament 原型（· · · 三个橙色圆点 · 间距大）
    // 仅声明 variants.divider='dots' 实际消费的 motif；wave / flower 走 variant 自带回退,
    // 不在 spec 里冗余声明。news-row admonition 不消费 icon（徽章靠色 + 大写字），
    // 也不导出 tip/info/warning/danger icon —— 保持 motif 集合最小。
    dividerDots: {
      viewBox: [0, 0, 240, 12],
      width: 220,
      height: 12,
      primitives: [
        { type: "circle", cx: 100, cy: 6, r: 2, fill: "token:primary" },
        { type: "circle", cx: 120, cy: 6, r: 2, fill: "token:primary" },
        { type: "circle", cx: 140, cy: 6, r: 2, fill: "token:primary" }
      ]
    },
    // stepBadge · 直角方形 + primary 底 + 反白数字（::: steps 容器消费）
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      placeholders: ["N"],
      primitives: [
        { type: "rect", x: 0, y: 0, w: 24, h: 24, fill: "token:primary" },
        {
          type: "text",
          x: 12,
          y: 17,
          content: "{N}",
          fontSize: 14,
          fontWeight: 700,
          fill: "token:textInverse",
          textAnchor: "middle"
        }
      ]
    }
  },
  // ============================================================
  // 主题级 kicker 文案覆盖（电台母语）
  //
  // 让作者侧 markdown 不必把"听 · 众 · 连 · 线" / "播 · 后 · 札记" / "tune · in"
  // 这些主题装饰文案写在 info 里——renderer 缺省读 ctx.kickers.<key>。
  // 单稿仍可用 info 个性化覆盖：`::: editor-note 这一期特别的"播后随感"`。
  // 未声明的 key 从 DEFAULT_KICKERS（types.ts）继承。
  // ============================================================
  kickers: {
    toc: "— tracklist · 节目单 —",
    qaBlock: "听 · 众 · 连 · 线",
    qrFollowKicker: "tune · in",
    qrFollowTitle: "夜读电台",
    recommend: "深 夜 选 听",
    footerCTATitle: "长夜收听",
    colophonNextLabel: "下期",
    colophonIssueLabel: "EP ·",
    mastheadName: "夜读电台"
  },
  // ============================================================
  // 骨架变体
  // ============================================================
  variants: {
    // news-row：data-brief 家族的"左 3px + 徽章 + 紧凑单行"骨架。
    // 与设计稿 multi-callout（cue/b-side/static/off-air）的视觉高度对齐：
    // 仅徽章字 + 色不同，正文紧凑同色族；徽章文字由作者写 `::: info cue` 直接覆盖。
    admonition: "pill-tag",
    // 顶部胶囊标签 + 外框（深夜电台栏目"小播报"语义，比 news-row 单行更松弛）
    // tilted-sticker：punk-zine 反色贴纸（白底深蓝字 + 微旋）—— 与 elements.blockquote 的橙线卡底协同
    quote: "tilted-sticker",
    // stacked-row：竖叠陈述，符合 vinyl zine 单列纵贯叙事节奏
    compare: "stacked-row",
    // split-row：左 4px 实色 + 大号编号，硬边节奏
    steps: "split-row",
    // dots：设计稿 divider-ornament 原型（· · · 圆点分割）
    divider: "dots",
    // ribbon-stamp：左侧实色戳记 + 主标题，与 news-row 同色块语言
    sectionTitle: "ribbon-stamp",
    // terminal-frame：暗调 vinyl 与 terminal 窗口腔语言匹配
    codeBlock: "terminal-frame",
    // side-bar：左 2px 实线 + 缩进 —— 与 editor-note callout 形态错开
    note: "side-bar",
    // boxed-aside：narrative aside 软底卡片，与 zine 内附注同源
    footnotes: "boxed-aside",
    recommend: "card-list",
    qrcode: "follow-card",
    // 刊物订阅卡：左 QR + 右 kicker/title/desc 三行
    footerCTA: "triptych-actions",
    // 三栏 CTA（赞同/收藏/转发）
    pullQuote: "margin-pull",
    // NYT Sunday 悬挂式：左竖 QUOTE kicker + 右大字，深夜电台栏目感
    announcement: "danger-bar",
    tableCard: "rule-grid",
    gallery: "duo",
    dialogue: "qa-rows",
    qaBlock: "numbered-faq"
  },
  // ============================================================
  // 签名容器：声明本主题"必须可用"的容器集（conformance 测试校验注册表里都有实现）
  //
  // 设计稿 21 个组件 → 全部映射到现有 container / element / variant：
  //   01 masthead       → masthead 容器
  //   02 tracklist      → toc + toc-item（A1 / A2 / B1 / B2 走 attrs.no）
  //   03 cover-header   → cover 容器（包裹副刊头 + 副题 + 主播信息）
  //   04 byline         → cover 内 markdown（作者侧自由排印）—— author 容器仅 1 行不够用
  //   05 intro-para     → intro 容器（左橙竖线）
  //   06 section-h (h2) → markdown ## + decorations.headingPrefix arabic-padded
  //   07 body-para      → markdown p
  //   08 vinyl-image    → markdown ![](url) —— 装饰可视化由作者提供封面图，本主题不造组件
  //   09 sub-heading h3 → markdown ### + decorations.headingPrefix arabic-section
  //   10 pull-quote     → markdown blockquote（elements.blockquote 上下橙线 + 深蓝底）
  //   11 ordered-list   → markdown 1. 2. 3.（li 元素样式）
  //   12 unordered-list → markdown -（li 元素样式）
  //   13 inline-code    → markdown `code`（code 元素样式：橙字 monospace）
  //   14 code-block     → markdown ``` block（pre 元素样式：黑底橙框）
  //   15 callout 播后札记 → ::: note variant=editorial-stripe（kicker 走 info 行）
  //   16 qa-block       → qa-block 容器（kicker 由 spec.kickers.qaBlock 提供）
  //   17 multi-callout  → tip / info / warning / danger × news-row variant；徽章文字 cue/b-side/static/off-air
  //                       由作者写在 info 位（作者侧的"语义标注 + 视觉徽章合一"，仍是写作契约的一部分）
  //   18 cta-bar        → cta-bar 容器（三栏文字由 attrs.like/star/share，作者完全主控）
  //   19 qr-follow      → qr-follow 容器（kicker + title 默认由 spec.kickers 提供）
  //   20 footnotes      → footnotes 容器（虚线分隔 + 老金小字）
  //   21 divider-ornament → divider variant=dots
  //   22 side-b-end     → divider variant=rule（hr 单线 + 标注由 colophon 承担）
  //   23 footer         → colophon 容器（左右栏 kicker 走 DEFAULT_KICKERS "下 期"/"卷 · 期"）
  // ============================================================
  signatureContainers: [
    "intro",
    "cover",
    "author",
    "masthead",
    "toc",
    "qaBlock",
    "footnotes",
    "colophon",
    "imageCaption",
    // monospace 橙金时间戳图注
    "authorBio",
    // 电台主播卡（深蓝卡底 + 橙顶线）
    "timeline"
    // 节目时序线（橙竖线 + 内缩）
  ],
  // ============================================================
  // 元素级样式（设计稿主体节奏）
  // ============================================================
  elements: {
    // H1：公众号原生头部已渲 22 加粗黑；本主题不主动输出 H1（cover 容器承担副刊头）
    h1: {
      "font-size": "22px",
      "font-weight": "700",
      color: "#d9c9a8",
      "margin-top": "0",
      "margin-bottom": "10px",
      "line-height": "1.4",
      "letter-spacing": "0.04em"
    },
    // H2：14px normal weight + 0.1em 字距 + 橙色 monospace 数字前缀（由 decorations 注入）
    // __reset：把 baseElements.h2 的 padding-bottom / border-bottom 等"下划线骨架"清空,
    //   本主题 h2 视觉签名是"小字 + 橙色序号前缀"，不要 default 的橙下划线。
    h2: {
      __reset: true,
      "font-size": "14px",
      "font-weight": "400",
      color: "#d9c9a8",
      "margin-top": "28px",
      "margin-bottom": "14px",
      "line-height": "1.5",
      "letter-spacing": "0.1em"
    },
    // H3：橙色整行 + 13px + 0.05em 字距（设计稿 sub-heading 原型）
    h3: {
      __reset: true,
      "font-size": "13px",
      "font-weight": "400",
      color: "#d97a3c",
      "margin-top": "16px",
      "margin-bottom": "8px",
      "line-height": "1.6",
      "letter-spacing": "0.05em"
    },
    h4: {
      "font-size": "13px",
      "font-weight": "600",
      color: "#d9c9a8",
      "margin-top": "14px",
      "margin-bottom": "6px",
      "line-height": "1.6",
      "letter-spacing": "0.04em"
    },
    h5: {
      "font-size": "14px",
      "font-weight": "600",
      color: "#d9c9a8",
      "margin-top": "14px",
      "margin-bottom": "6px",
      "line-height": "1.6",
      "letter-spacing": "0.05em"
    },
    h6: {
      "font-size": "13px",
      "font-weight": "500",
      color: "#a89070",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.55",
      "letter-spacing": "1.2px"
    },
    // P：line-height 2.1 + 0.04em 字距（夜读"慢"的标志组合）
    p: {
      "font-size": "14px",
      "line-height": "2.1",
      color: "#d9c9a8",
      "margin-top": "0",
      "margin-bottom": "16px",
      "letter-spacing": "0.04em"
    },
    // BLOCKQUOTE = pull-quote 主形态：上下橙色细线 + 深蓝卡底 + 18px 大字 + 宽字距
    // __reset 清除 baseElements 的 border-left / radius / muted 色 —— 本主题 pull-quote
    //   是"上下线夹住一段"的电台引语形态，不接受 default 主题的"左竖条"。
    // 微信兼容性：text-align 左对齐（设计稿 attribution 走右对齐，本主题接受小幅折损 —— 用
    //   markdown 的两段写法保证语义清晰，attribution 段视觉退到与 quote body 同样式）。
    blockquote: {
      __reset: true,
      "border-top": "1px solid #d97a3c",
      "border-bottom": "1px solid #d97a3c",
      "background-color": "#14263d",
      color: "#d9c9a8",
      "padding-top": "18px",
      "padding-right": "20px",
      "padding-bottom": "14px",
      "padding-left": "20px",
      "margin-top": "24px",
      "margin-bottom": "24px",
      "font-size": "17px",
      "line-height": "1.85",
      "letter-spacing": "0.08em",
      "border-radius": "0"
    },
    ul: {
      "padding-left": "20px",
      "margin-top": "0",
      "margin-bottom": "14px"
    },
    ol: {
      "padding-left": "20px",
      "margin-top": "0",
      "margin-bottom": "14px"
    },
    li: {
      "margin-bottom": "4px",
      "line-height": "2.1",
      color: "#d9c9a8",
      "letter-spacing": "0.04em"
    },
    // 行内 code：橙字 + 透明底（设计稿 inline-code 原型）+ 字号小一档
    code: {
      "background-color": "transparent",
      color: "#d97a3c",
      padding: "0",
      "border-radius": "0",
      "font-size": "12px"
    },
    // 暗夜键：accent 1px 冷蓝灰边 + 深蓝底 + 暖米白字 + radius 0，老式收音机按键感
    kbd: {
      display: "inline-block",
      "background-color": "#14263d",
      color: "#d9c9a8",
      border: "1px solid #4a6080",
      "border-bottom-width": "2px",
      "border-radius": "0",
      padding: "1px 6px",
      "font-size": "12px",
      "line-height": "1.4",
      "vertical-align": "middle"
    },
    // PRE：黑底（bgMuted #060d18 比文章底更深一档）+ 橙色 1px 边框 + 米白字
    // __reset 清除 baseElements 的 atom-one-dark 配色 + radius:6（本主题 radius=0）
    pre: {
      __reset: true,
      "background-color": "#060d18",
      color: "#d9c9a8",
      border: "1px solid #d97a3c",
      "padding-top": "14px",
      "padding-right": "16px",
      "padding-bottom": "14px",
      "padding-left": "16px",
      margin: "16px 0",
      "border-radius": "0",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "box-shadow": "inset -14px 0 10px -10px rgba(0,0,0,0.4)",
      "font-size": "12px",
      "line-height": "1.9"
    },
    // 图片：直角无圆 + max-width 100%（vinyl-image / 封面图共用）
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "12px",
      "margin-right": "auto",
      "margin-bottom": "12px",
      "margin-left": "auto",
      "border-radius": "0"
    },
    // 链接：橙字 + 虚线下划（设计稿 a tag dotted underline）
    a: {
      color: "#d97a3c",
      "text-decoration": "underline",
      "text-decoration-style": "dotted",
      "text-underline-offset": "3px"
    },
    hr: {
      border: "none",
      height: "1px",
      "background-color": "#4a6080",
      "margin-top": "20px",
      "margin-bottom": "20px"
    },
    // 电台数据栏：暗底 + th 走 monospace + accent 橙金 1px 下划线，无全框黑边
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "16px",
      "font-size": "13px"
    },
    th: {
      "border-bottom": "1px solid #d97a3c",
      "border-top": "none",
      "border-left": "none",
      "border-right": "none",
      padding: "6px 10px",
      "background-color": "transparent",
      "text-align": "left",
      "font-weight": "600",
      color: "#d97a3c",
      "font-size": "11px",
      "letter-spacing": "0.08em"
    },
    td: {
      "border-bottom": "1px solid #4a6080",
      "border-top": "none",
      "border-left": "none",
      "border-right": "none",
      padding: "7px 10px",
      color: "#d9c9a8"
    },
    // strong：橙色强调（设计稿 b style="color:#d97a3c" 原型）
    strong: { "font-weight": "700", color: "#d97a3c" },
    em: { "font-style": "italic", color: "#d9c9a8" }
  },
  // ============================================================
  // 内联强调
  // ============================================================
  inline: {
    // highlight = primary 底 + textInverse 字（深底主题里 mark 的标准对比）
    highlight: {
      "background-color": "#d97a3c",
      color: "#0e1a2b",
      padding: "0 4px",
      "border-radius": "0"
    },
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#d97a3c",
      "text-underline-offset": "3px"
    },
    emphasis: {
      color: "#d97a3c",
      "font-weight": "600"
    },
    del: {
      color: "#a89070",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#d97a3c",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器视觉（每个签名容器在此微调；renderer 提供 fallback，spec 覆盖优先）
  // ============================================================
  containers: {
    // intro · 导语：左 1px 橙竖线 + 0 padding-left=14px（设计稿 intro-para 原型）
    intro: {
      __reset: true,
      "border-left": "1px solid #d97a3c",
      "background-color": "transparent",
      padding: "0 0 0 14px",
      margin: "0 0 30px 0",
      color: "#d9c9a8",
      "font-size": "15px",
      "line-height": "2.1",
      "letter-spacing": "0.05em",
      "border-radius": "0"
    },
    // cover · 副刊头容器（设计稿 cover-header）：包裹副题 + 主播信息
    // 设计稿 cover-header 是非 H1 的"装饰性副刊头"，作者在 body 里写副题 + byline
    cover: {
      margin: "0 0 28px 0"
    },
    // author · byline 元数据（备用：本主题主力路径是把 byline 写进 cover body，
    // 仍保留 author 容器一份克制兜底——选哪个看作者侧）
    author: {
      __reset: true,
      "background-color": "transparent",
      padding: "0",
      margin: "0 0 22px 0",
      color: "#a89070",
      "font-size": "11px",
      "line-height": "1.8",
      "letter-spacing": "0.05em",
      "border-radius": "0"
    },
    // masthead · 刊头：下方 1px text 色分隔线 + monospace（设计稿 masthead 原型）
    masthead: {
      __reset: true,
      "padding-bottom": "12px",
      "border-bottom": "1px solid #d9c9a8",
      margin: "0 0 22px 0"
    },
    // toc · 节目单：无 bgSoft（设计稿 tracklist 原型 = 透明底 + 仅 kicker + 条目 list）
    // 与 data-brief 的灰底 toc 形态错开，体现"夜读电台"的电台节目单气质
    toc: {
      __reset: true,
      "background-color": "transparent",
      padding: "0",
      margin: "0 0 28px 0",
      "border-radius": "0"
    },
    sectionTag: {
      margin: "0 0 14px 0"
    },
    // 四态 admonition 走 news-row variant，wrapperCSS 由 variant 提供（左 3px 色条），
    // 这里仅留 margin 协调。
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // note · 第五态补注：side-bar variant 已给出"左 2px + 缩进"骨架
    note: {
      margin: "16px 0"
    },
    // quote-card · 设计稿 pull-quote 走裸 blockquote（见 elements.blockquote）；
    //   本容器作为可选"署名金句卡"保留 token 驱动兜底。
    quoteCard: {
      "background-color": "#14263d",
      padding: "18px 20px",
      margin: "24px 0",
      "border-radius": "0"
    },
    highlight: {
      "background-color": "#14263d",
      padding: "14px 16px",
      margin: "16px 0",
      "border-radius": "0",
      border: "1px solid #4a6080"
    },
    compare: { margin: "16px 0 20px" },
    steps: { margin: "20px 0" },
    // sectionTitle：light base 给 margin + 2px primary 下划线；本主题覆盖三字段把
    // 下划线收为 0 / 取消（本主题章节通过 ribbon-stamp variant 注入印章戳，不要 base 下划线）。
    sectionTitle: {
      margin: "24px 0 12px",
      "padding-bottom": "0",
      "border-bottom": "none"
    },
    // footer-cta · 设计稿用 cta-bar 三栏；本字段留 token 兜底，作者侧主用 cta-bar 容器
    footerCTA: {
      __reset: true,
      margin: "22px 0",
      padding: "0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    recommend: {
      margin: "20px 0",
      padding: "12px 14px",
      "background-color": "#14263d",
      "border-radius": "0",
      "border-left": "3px solid #d97a3c"
    },
    qrcode: {
      margin: "20px 0",
      padding: "12px 14px"
    },
    // abstract：dark 基线已提供 border-left/padding/margin/bg/radius；本主题覆盖
    // border-left 收紧 (4→1px)、padding 紧凑 (仅左 14px)、margin 顶部 0、保持透明 + 直角。
    abstract: {
      "border-left": "1px solid #d97a3c",
      padding: "0 0 0 14px",
      margin: "0 0 22px 0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    keyNumber: {
      margin: "18px 0",
      padding: "16px 18px",
      "background-color": "#14263d",
      "border-top": "3px solid #d97a3c",
      "border-radius": "0"
    },
    // qa-block · 听众连线 wrapper：左 2px 橙竖线 + 深蓝卡底（电台连线气质包裹），
    // 内部 Q/A 节奏由 variant numbered-faq 渲染
    qaBlock: {
      __reset: true,
      "background-color": "#14263d",
      "border-left": "2px solid #d97a3c",
      padding: "16px 18px",
      margin: "28px 0",
      "border-radius": "0"
    },
    // footnotes · 两骨架（lined / inline-flow）共用：虚线分隔 + 老金小字。
    // 替换 baseContainers 的 1px solid border-top（本主题走 dashed）。
    // 长文献列表写 `::: footnotes variant=inline-flow` 自动获得内滚动。
    footnotes: {
      __reset: true,
      "border-top": "1px dashed #a89070",
      margin: "20px 0",
      "font-size": "10px",
      "line-height": "1.85",
      "letter-spacing": "0.03em",
      color: "#a89070"
    },
    // qr-follow · tune·in 牌：1px 橙边框 + 深蓝卡底（设计稿 qr-follow 原型）
    // colophon · 刊物收束栏（设计稿 footer 原型）：上方 1px text 实色分隔线 +
    // 双栏 monospace（"下期 ｜ 卷·期"）。renderer 强制 display:table。
    colophon: {
      __reset: true,
      "border-top": "1px solid #d9c9a8",
      "margin-top": "24px",
      "padding-top": "12px"
    },
    // 电台图注：monospace 橙金小字 + 时间戳风（"FIG. · 03:41"），暗底上低调精准
    // 电台图注：橙金小字 + 时间戳风字距（"FIG. · 03:41"），暗底上低调精准
    imageCaption: {
      __reset: true,
      margin: "4px 0 14px",
      "text-align": "left",
      "font-size": "11px",
      color: "#d97a3c",
      "letter-spacing": "0.1em",
      "line-height": "1.5"
    },
    // 电台主播卡：深蓝卡底 + 顶端橙线，monospace 排版元数据气质
    authorBio: {
      __reset: true,
      "background-color": "#14263d",
      "border-top": "2px solid #d97a3c",
      "border-radius": "0",
      padding: "16px 18px",
      margin: "24px 0",
      color: "#d9c9a8"
    },
    // 时间线：暗底 + 左侧橙竖线 + 暖米内缩，节目时序感
    timeline: {
      __reset: true,
      "border-left": "1px solid #d97a3c",
      padding: "0 0 0 18px",
      margin: "20px 0",
      "background-color": "transparent"
    },
    // voice / video 卡：暗底主题不走 baseContainers 浅卡兜底；
    // 深蓝卡底 + 1px 冷蓝灰边 + 左 3px 橙竖条，与唱针 / cue 同源
    voiceCard: {
      __reset: true,
      "background-color": "#14263d",
      border: "1px solid #4a6080",
      "border-left": "3px solid #d97a3c",
      "border-radius": "0",
      padding: "14px 16px",
      margin: "22px 0"
    },
    videoCard: {
      __reset: true,
      "background-color": "#14263d",
      border: "1px solid #4a6080",
      "border-left": "3px solid #d97a3c",
      "border-radius": "0",
      padding: "14px 16px",
      margin: "22px 0"
    }
  },
  // ============================================================
  // 容器内层 inline-style 覆盖（暗底专属）
  //
  // 兜底 baseInnerStyles 假设浅底（textMuted 灰色在浅底可见，primary 在浅底够亮）。
  // 本主题 bg=#0e1a2b / containers bg=#14263d，textMuted=#a89070 在暗底对比度不足——
  // 所有 kicker/title 改走 accent 橙金或 textInverse 白，保证暗底上可读。
  // ============================================================
  innerStyles: {
    // abstract 容器：透明底落在文章底 #0e1a2b 上。kicker 走 accent 橙金 + monospace 电台信号感
    abstractKicker: {
      __reset: true,
      color: "#d97a3c",
      "font-size": "10px",
      "font-weight": "700",
      "letter-spacing": "2px",
      "text-transform": "uppercase",
      "margin-bottom": "6px"
    },
    // keyNumber 容器：bg=#14263d 暗底，大数字走 accent 橙金 + monospace 电台数据气质
    keyNumberValue: {
      __reset: true,
      color: "#d97a3c",
      "font-size": "34px",
      "font-weight": "700",
      "line-height": "1.1",
      "letter-spacing": "-0.5px",
      "margin-bottom": "4px"
    },
    // keyNumber 暗底上小 kicker（"KEY METRIC"）：textMuted 在 #14263d 几乎不可见，改 accent
    keyNumberKicker: {
      __reset: true,
      color: "#d97a3c",
      "font-size": "11px",
      "font-weight": "600",
      "letter-spacing": "1.5px",
      "text-transform": "uppercase",
      "margin-bottom": "8px"
    }
  },
  // ============================================================
  // 模板片段（作者侧示例 · 不影响 CSS 生成；commonTemplates 隐式合并）
  // ============================================================
  templates: {
    cover: `::: masthead 夜读电台 · EP.04 date="ON AIR · 03:41"
:::

::: cover 在无人深夜，重新学习如何阅读一本书
论慢读在算法时代的价值

主播　·　**罗离线**

录音　·　2026.04.22　·　03:41
:::
`,
    footerCTA: `::: cta-bar like="♡ 喜欢" star="★ 收藏" share="↗ 分享"
:::
`,
    tip: `::: tip b-side
本期播后随想。
:::
`
  },
  meta: {
    createdAt: "2026-05-14",
    ownerNotes: "三条不可妥协：暗底纪律 / radius=0 / accent 稀缺（橙 #d97a3c 单色担当）。零新容器零新 variant；章节序号走 decorations.headingPrefix。电台母语 kicker 全部走 spec.kickers，作者侧 markdown 不写主题装饰。"
  }
};
const spec$3 = {
  id: "commerce-pulse",
  name: "电商脉动",
  description: "朱红 + 金色 + 炭灰：促销 / 价格优势 / 限时紧迫 / KOL 推荐的高密度带货排版",
  audience: "B2C 电商 / 直播带货 / 双 11 大促 / 美妆服饰 KOC / 抖音电商",
  // ============================================================
  // 色板（朱红家族；白底高对比；金色 accent 稀缺点缀）
  // ============================================================
  palette: {
    primary: "#c4310e",
    // 朱红（签名色：标题线 / 价格高亮 / 核心 CTA）
    secondary: "#2a2a2a",
    // 炭灰（副标题 / 正文粗体 / 边框压色）
    accent: "#c89759",
    // 金色（稀缺：VIP 徽章 / 限量价格标 / 推荐角标）
    bg: "#ffffff",
    // 纯白底
    bgSoft: "#fff8f8",
    // 极浅暖粉（促销卡片底 / intro 区底色）
    bgMuted: "#f5f0f0",
    // 浅暖灰（recommend 卡背景 / note 底色）
    text: "#1a1a1a",
    // 近黑正文
    textMuted: "#595959",
    // 中灰辅助文字（价格说明 / 规格小字）
    textInverse: "#fefefe",
    // 反白（CTA 按钮文字 / 限时标签反底）
    border: "#e0d0d0",
    // 浅暖粉边框（卡片分割线）
    code: "#8b1a1a",
    // 深朱红 inline 代码（价格代码 / SKU 标识）
    preBg: "#1e1a1a",
    // 代码块暗底（不可妥协的终端黑底）
    preText: "#f0e8e8",
    // 代码块浅字（暖白，与正文区分）
    highlightBg: "#fff0c0",
    // 高亮底（暖黄，价格划线强调）
    codeBg: "#fdf0f0"
    // inline code 底色（浅朱红底）
  },
  // ============================================================
  // 语义四色（全部 WCAG AA 4.5:1 达标）
  // ============================================================
  status: {
    tip: { accent: "#1a7a3c", soft: "#e8f5ed" },
    // 绿（4.81:1）：限时优惠 / 活动进行中
    info: { accent: "#1a5cb0", soft: "#e6effa" },
    // 蓝（5.65:1）：品牌信息 / 正品说明
    warning: { accent: "#8a5c0a", soft: "#faf0dc" },
    // 琥珀（5.13:1）：库存警告 / 活动即将结束
    danger: { accent: "#b22018", soft: "#fde8e6" }
    // 深朱红（5.74:1）：限量清仓 / 秒杀倒计时
  },
  // ============================================================
  // 字号（大字号电商范式：h1 ≥ 26、h2 ≥ 22）
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.7,
    h1Size: 28,
    h2Size: 22,
    h3Size: 17,
    letterSpacing: 0.3,
    h4Size: 16,
    captionSize: 12
  },
  spacing: {
    paragraph: 16,
    section: 28,
    listItem: 8,
    containerPadding: 16
  },
  radius: { sm: 4, md: 8, lg: 12 },
  // ============================================================
  // Decorations：h2 前缀序号，强化"章节 = 卖点模块"感
  // ============================================================
  decorations: {
    headingPrefix: [
      {
        level: 2,
        autoNumber: "arabic-padded",
        style: {
          color: "primary",
          fontWeight: 700,
          marginRight: 8
        }
      }
    ]
  },
  // ============================================================
  // Motifs：朱红主色调 SVG 装饰
  // ============================================================
  motifs: {
    // h2Prefix：朱红菱形标记（促销章节感）
    h2Prefix: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      primitives: [
        {
          type: "path",
          d: "M8,1 L15,8 L8,15 L1,8 Z",
          fill: "token:primary"
        }
      ]
    },
    // dividerDots：朱红 + 金色三圆点（品牌分隔符）
    dividerDots: {
      viewBox: [0, 0, 240, 10],
      width: 220,
      height: 10,
      primitives: [
        { type: "line", x1: 0, y1: 5, x2: 100, y2: 5, stroke: "token:border", strokeWidth: 1 },
        { type: "circle", cx: 108, cy: 5, r: 3, fill: "token:primary" },
        { type: "circle", cx: 120, cy: 5, r: 3, fill: "token:accent" },
        { type: "circle", cx: 132, cy: 5, r: 3, fill: "token:primary" },
        { type: "line", x1: 140, y1: 5, x2: 240, y2: 5, stroke: "token:border", strokeWidth: 1 }
      ]
    },
    // dividerWave：朱红波浪（促销节奏感）
    dividerWave: {
      viewBox: [0, 0, 240, 12],
      width: 220,
      height: 12,
      primitives: [
        {
          type: "path",
          d: "M0,6 Q20,1 40,6 Q60,11 80,6 Q100,1 120,6 Q140,11 160,6 Q180,1 200,6 Q220,11 240,6",
          stroke: "token:primary",
          strokeWidth: 1.5,
          fill: "none",
          strokeLinecap: "round"
        }
      ]
    },
    // tipIcon：朱红圆角方框 + 勾（限时优惠确认）
    tipIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 1, y: 1, w: 14, h: 14, fill: "token:status.tip.accent", rx: 3, ry: 3 },
        {
          type: "path",
          d: "M4,8 L7,11 L12,5",
          stroke: "token:textInverse",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ]
    },
    // warningIcon：琥珀色感叹号（库存告急）
    warningIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M8,1 L15,14 L1,14 Z",
          fill: "token:status.warning.accent"
        },
        { type: "rect", x: 7, y: 5, w: 2, h: 5, fill: "token:textInverse" },
        { type: "rect", x: 7, y: 11, w: 2, h: 2, fill: "token:textInverse" }
      ]
    },
    // listBullet：朱红小菱形（商品列表要点）
    listBullet: {
      viewBox: [0, 0, 10, 10],
      width: 8,
      height: 8,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M5,1 L9,5 L5,9 L1,5 Z",
          fill: "token:primary"
        }
      ]
    },
    // stepBadge：朱红实心圆 + 白外环 + 白数字（CTA"按键浮起"感）。
    // 外圈 1.5px 白 stroke 让徽章从背景"切出"，与 button-led footerCTA 的胶囊按键
    // 同语言；区别于 default 单层实心圆（无外环）。
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      placeholders: ["N"],
      primitives: [
        { type: "circle", cx: 12, cy: 12, r: 11, fill: "token:primary" },
        { type: "circle", cx: 12, cy: 12, r: 9, stroke: "token:textInverse", strokeWidth: 1, fill: "none", opacity: 0.55 },
        {
          type: "text",
          x: 12,
          y: 17,
          content: "{N}",
          fontSize: 14,
          fontWeight: 700,
          fill: "token:textInverse",
          textAnchor: "middle"
        }
      ]
    }
  },
  // ============================================================
  // 骨架变体（电商语汇优先选型）
  // ============================================================
  variants: {
    admonition: "accent-bar",
    // 强 CTA 左色条，适合"限时 / 注意"
    quote: "frame-brackets",
    // 四角括号：KOL 口碑引用感
    compare: "data-card",
    // 价格对比卡：顶 3px 色条 + 大号数字
    steps: "number-circle",
    // 圆圈编号：购买步骤 / 使用教程
    divider: "dots",
    // 朱红 + 金点分隔（消费本主题 dividerDots）
    sectionTitle: "kicker-stack",
    // 上 kicker + 主标题：促销章节双层感
    codeBlock: "bare",
    // 裸 pre（SKU / 优惠码展示）
    note: "box-callout",
    // 边框角标卡片：补注 / 规格说明
    footnotes: "lined",
    // 单行脚注：参考链接 / 使用说明
    recommend: "card-list",
    // 商品推荐卡列表（核心签名）
    qrcode: "bare",
    // 居中 QR（小程序 / 直播间）
    footerCTA: "triptych-actions",
    // 买 / 收藏 / 分享三联（核心 CTA）
    pullQuote: "stamp-quote",
    // 旋转印章 + 粗体大字：促销盖章感（带货语境优于 giant-mark 的文学开引号）
    announcement: "danger-bar",
    // 限时警示横幅（秒杀 / 清仓告急）
    tableCard: "key-value",
    // orphan 升级：键值对档式（规格 / SKU 参数列表）
    gallery: "triptych",
    // orphan 升级：三联图（产品三视图 / 三档位展示）
    dialogue: "qa-rows",
    // Q&A 行：买家问 / 商家答
    qaBlock: "numbered-faq"
  },
  // ============================================================
  // 主题级 kicker 文案（带货语境本土化）。注意：ThemeKickers 是**容器**级 kicker
  // （toc/qaBlock/recommend/footerCTATitle/colophon），不含 admonition kind 标签——
  // admonition tip/warning 的文案是 markdown 作者侧 `::: warning <text>` 现写,
  // 不走主题级覆盖路径。
  // ============================================================
  kickers: {
    recommend: "为你推荐",
    footerCTATitle: "立即抢购"
  },
  // ============================================================
  // 签名容器声明
  // ============================================================
  signatureContainers: [
    "recommend",
    "footerCTA",
    "announcement",
    "pullQuote",
    "tableCard",
    "compare",
    "steps",
    "quoteCard"
  ],
  // ============================================================
  // 元素级样式（大字号 + 朱红标题下划线）
  // ============================================================
  elements: {
    h1: {
      "font-size": "28px",
      "font-weight": "800",
      color: "#1a1a1a",
      "margin-top": "0",
      "margin-bottom": "10px",
      "line-height": "1.3",
      "letter-spacing": "0.3px"
    },
    h2: {
      __reset: true,
      "font-size": "22px",
      "font-weight": "700",
      color: "#1a1a1a",
      "margin-top": "28px",
      "margin-bottom": "10px",
      "line-height": "1.35",
      "letter-spacing": "0.3px",
      "padding-bottom": "6px",
      "border-bottom": "2px solid #c4310e"
    },
    h3: {
      "font-size": "17px",
      "font-weight": "700",
      color: "#2a2a2a",
      "margin-top": "20px",
      "margin-bottom": "8px",
      "line-height": "1.45",
      "letter-spacing": "0.2px"
    },
    h4: {
      "font-size": "16px",
      "font-weight": "600",
      color: "#2a2a2a",
      "margin-top": "16px",
      "margin-bottom": "6px",
      "line-height": "1.5"
    },
    h5: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#2a2a2a",
      "margin-top": "14px",
      "margin-bottom": "6px",
      "line-height": "1.5"
    },
    h6: {
      "font-size": "13px",
      "font-weight": "600",
      color: "#595959",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.5",
      "letter-spacing": "0.5px"
    },
    p: {
      "font-size": "15px",
      "line-height": "1.7",
      color: "#1a1a1a",
      "margin-top": "0",
      "margin-bottom": "16px"
    },
    // blockquote：KOL 引用框，朱红左条 + 暖粉底
    blockquote: {
      __reset: true,
      "border-left": "4px solid #c4310e",
      "background-color": "#fff8f8",
      color: "#1a1a1a",
      padding: "10px 14px 10px 18px",
      margin: "20px 0",
      "font-size": "15px",
      "font-weight": "500",
      "line-height": "1.65",
      "border-radius": "0 8px 8px 0"
    },
    ul: { "padding-left": "20px", "margin-top": "0", "margin-bottom": "14px" },
    ol: { "padding-left": "20px", "margin-top": "0", "margin-bottom": "14px" },
    li: { "margin-bottom": "8px", "line-height": "1.7", color: "#1a1a1a" },
    strong: { "font-weight": "700", color: "#c4310e" },
    em: { "font-style": "italic", color: "#2a2a2a" },
    a: {
      color: "#c4310e",
      "text-decoration": "none",
      "border-bottom": "1px solid #c4310e"
    },
    hr: {
      border: "none",
      height: "1px",
      "background-color": "#e0d0d0",
      "margin-top": "20px",
      "margin-bottom": "20px"
    },
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "10px",
      "margin-right": "auto",
      "margin-bottom": "10px",
      "margin-left": "auto",
      "border-radius": "8px"
    },
    // pre：暗底代码块（SKU 列表 / 优惠码）
    pre: {
      __reset: true,
      "background-color": "#1e1a1a",
      color: "#f0e8e8",
      padding: "12px 16px",
      margin: "12px 0 18px",
      "border-radius": "8px",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "font-size": "13px",
      "line-height": "1.8"
    },
    // inline code：朱红文字 + 浅暖底
    code: {
      "background-color": "#fdf0f0",
      color: "#8b1a1a",
      padding: "1px 5px",
      "border-radius": "4px",
      "font-size": "13px"
    },
    // 表格：价格对比清单风格
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "18px",
      "font-size": "14px",
      "border-radius": "0"
    },
    th: {
      "background-color": "#c4310e",
      color: "#fefefe",
      border: "1px solid #c4310e",
      padding: "8px 10px",
      "font-weight": "700",
      "text-align": "left",
      "letter-spacing": "0.3px",
      "font-size": "13px"
    },
    td: {
      border: "1px solid #e0d0d0",
      "border-bottom": "1px solid #e0d0d0",
      padding: "8px 10px",
      color: "#1a1a1a"
    },
    kbd: {
      display: "inline-block",
      "background-color": "#f5f0f0",
      color: "#1a1a1a",
      border: "1px solid #e0d0d0",
      "border-bottom-width": "2px",
      "border-radius": "4px",
      padding: "1px 5px",
      "font-size": "12px",
      "line-height": "1.4",
      "letter-spacing": "0",
      "vertical-align": "middle"
    }
  },
  // ============================================================
  // 内联强调（促销 / 价格 / 好评高亮）
  // ============================================================
  inline: {
    highlight: {
      "background-color": "#fff0c0",
      color: "#1a1a1a",
      padding: "0 4px",
      "border-radius": "2px"
    },
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#c4310e",
      "text-underline-offset": "3px"
    },
    emphasis: {
      color: "#c4310e",
      "font-weight": "700"
    },
    del: {
      color: "#595959",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#1a7a3c",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器视觉（电商卡片化语言）
  // ============================================================
  containers: {
    // intro：文章前置摘要，浅暖粉底 + 朱红左条
    intro: {
      "background-color": "#fff8f8",
      "border-left": "4px solid #c4310e",
      "border-radius": "0 8px 8px 0",
      padding: "12px 16px 12px 18px",
      margin: "0 0 22px 0",
      color: "#1a1a1a"
    },
    // author：署名栏，极简下边框
    author: {
      __reset: true,
      "border-bottom": "1px solid #e0d0d0",
      "padding-bottom": "16px",
      margin: "0 0 20px 0",
      "font-size": "13px",
      color: "#595959"
    },
    cover: { margin: "0 0 16px 0" },
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // note：补注卡片，浅底 + 边框
    note: {
      "background-color": "#f5f0f0",
      padding: "10px 14px",
      margin: "16px 0",
      "font-size": "13px",
      "line-height": "1.6",
      color: "#595959",
      "border-radius": "6px",
      border: "1px solid #e0d0d0"
    },
    // quoteCard：KOL 推荐语 / 买家好评引用
    // 删 border-left:4px：commerce-pulse 默认 quote variant 是 frame-brackets
    // （左上 / 左下 L 形角标），再叠 4px 实线会和 SVG 四角语义重叠。仅留软底 +
    // 圆角作 voice override；左侧锚饰交由 variant 的四角 L 形承担。
    quoteCard: {
      "background-color": "#fff8f8",
      "border-radius": "8px",
      padding: "16px 20px",
      margin: "18px 0"
    },
    highlight: {
      "background-color": "#fff8f8",
      padding: "12px 16px",
      margin: "14px 0",
      "border-radius": "8px",
      border: "1px solid #e0d0d0"
    },
    // compare：价格对比 / 规格 vs 规格
    compare: { margin: "16px 0 20px" },
    // steps：购买流程 / 使用步骤
    steps: { margin: "18px 0" },
    sectionTitle: {
      __reset: true,
      margin: "28px 0 10px",
      "padding-bottom": "0",
      "border-bottom": "none"
    },
    // footerCTA：买 / 收藏 / 分享三联（朱红实色格 + 描边格）
    footerCTA: {
      __reset: true,
      margin: "24px 0 0",
      padding: "0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    // recommend：商品推荐核心卡（朱红顶条 + 卡片底色）
    recommend: {
      "background-color": "#fff8f8",
      "border-top": "3px solid #c4310e",
      "border-radius": "0 0 8px 8px",
      padding: "14px 16px",
      margin: "20px 0"
    },
    // qrcode：小程序 / 直播间 QR
    qrcode: {
      margin: "20px 0",
      padding: "16px",
      "background-color": "#fff8f8",
      "border-top": "3px solid #c4310e",
      "border-radius": "0 0 8px 8px",
      "text-align": "center"
    },
    voiceCard: { margin: "16px 0" },
    videoCard: { margin: "16px 0" },
    // announcement：限时秒杀横幅（朱红全底 + 反白文字）
    announcement: {
      "background-color": "#fff8f8",
      "border-left": "5px solid #c4310e",
      "border-radius": "0 8px 8px 0",
      padding: "12px 16px 12px 18px",
      margin: "20px 0",
      "font-weight": "700"
    },
    authorBio: {
      "background-color": "#fff8f8",
      "border-radius": "8px",
      padding: "16px",
      margin: "18px 0",
      border: "1px solid #e0d0d0"
    },
    imageCaption: {
      margin: "2px 0 16px 0",
      "text-align": "center",
      "font-size": "12px",
      color: "#595959"
    },
    timeline: {
      margin: "18px 0",
      "border-left": "3px solid #c4310e",
      "background-color": "#fff8f8",
      padding: "12px 14px 12px 18px",
      "border-radius": "0 8px 8px 0"
    },
    abstract: {
      __reset: true,
      "border-left": "4px solid #c4310e",
      padding: "6px 14px 6px 18px",
      margin: "0 0 20px 0",
      "background-color": "#fff8f8",
      "border-radius": "0 8px 8px 0"
    },
    keyNumber: {
      margin: "18px 0",
      padding: "16px 18px",
      "background-color": "#fff8f8",
      "border-top": "3px solid #c4310e",
      "border-radius": "0 0 8px 8px"
    },
    // data-brief 家族（兼容，保持中性）
    masthead: { margin: "0 0 20px 0", "padding-bottom": "10px", "border-bottom": "1px solid #e0d0d0" },
    sectionTag: { margin: "0 0 14px 0" },
    byline: { margin: "0 0 16px 0", color: "#595959", "font-size": "13px" },
    editorialHeader: { margin: "0 0 20px 0" },
    toc: { "background-color": "#fff8f8", padding: "12px 16px", margin: "0 0 24px 0", "border-radius": "8px" },
    kpiDashboard: { "background-color": "#fff8f8", "border-top": "3px solid #c4310e", padding: "16px", margin: "0 0 24px 0", "border-radius": "0 0 8px 8px" },
    barChart: { "background-color": "#fff8f8", border: "1px solid #e0d0d0", padding: "16px", margin: "18px 0", "border-radius": "8px" },
    qaBlock: { "border-top": "1px solid #e0d0d0", "border-bottom": "1px solid #e0d0d0", padding: "14px 0", margin: "18px 0" },
    footnotes: { "border-top": "1px solid #e0d0d0", margin: "14px 0", "font-size": "12px", color: "#595959" },
    colophon: { __reset: true, "border-top": "1px solid #e0d0d0", "margin-top": "20px", "padding-top": "12px" },
    // pullQuote：爆款话术 / KOL 金句放大
    pullQuote: {
      margin: "24px 0",
      padding: "0",
      "background-color": "transparent"
    },
    // tableCard：价格档位 / 规格清单
    tableCard: {
      margin: "18px 0 22px",
      "border-radius": "8px",
      overflow: "hidden",
      border: "1px solid #e0d0d0"
    },
    gallery: { margin: "16px 0" },
    dialogue: { margin: "16px 0" }
  },
  // ============================================================
  // 模板片段（带货文写作参考）
  // ============================================================
  templates: {
    cover: `::: announcement 限时特卖 · 仅剩最后 12 小时
**双 11 年度最低价**——错过等一年！
:::

# 2026 年最值得买的 10 款美妆好物

::: author
测评 **陈美仪**　编辑 **林晓颖**
:::
`,
    footerCTA: `::: footer-cta variant=triptych-actions
:::
`,
    tip: `::: tip 限时活动
本期所有推荐商品享专属折扣，点击链接直达优惠。
:::
`
  },
  meta: {
    createdAt: "2026-05-17",
    ownerNotes: "电商脉动主题 · 朱红 #c4310e（非纯红非国际红）+ 金色 #c89759 + 炭灰 #2a2a2a。h1=28px、h2=22px 大字号；recommend/footerCTA/announcement 三件签名容器定义带货版面。全部 WCAG AA 对比度 4.5:1 已过验证。"
  }
};
const spec$2 = {
  id: "youth-zine",
  name: "青年潮志",
  description: "鲜玫粉主色 + 圆角胶囊 + 高行距 · 服务青年潮流文体（短段落 / 标签云 / 高饱和）",
  audience: "青年文化 / Gen-Z / 小红书博主 / B 站 UP 主 / 潮流安利 / 二次元周边",
  // ============================================================
  // 色板
  //   - primary: #e91e63 玫粉（色相 333°，严格 320°–340° 区间）
  //   - secondary: #26c6da 青蓝（互补对比，不全上——避免视觉密度过高）
  //   - accent: #ffd54f 亮黄（稀缺点睛，每篇控制用量）
  //   - bg 纯白 / bgSoft 微粉调——拒绝 mook 的暖米
  // ============================================================
  palette: {
    primary: "#e91e63",
    secondary: "#26c6da",
    accent: "#ffd54f",
    bg: "#ffffff",
    bgSoft: "#fdf6f8",
    bgMuted: "#fce4ec",
    text: "#1a0a12",
    textMuted: "#6d4c5e",
    textInverse: "#ffffff",
    border: "#e0b4c4",
    code: "#ad1457",
    preBg: "#2a2d32",
    preText: "#d8d8d4",
    highlightBg: "#ffd54f",
    codeBg: "#fce4ec",
    // note side-bar 差异化：3px 粉色实色条（青年感招贴语言，比成人主题的 2px 更醒目）
    noteBorder: "#e91e63",
    noteBorderStyle: "solid",
    noteBorderWidth: 3
  },
  // 语义四色——全部 accent/soft 对比 ≥ 4.5:1（已自查）
  status: {
    tip: { accent: "#2e7d32", soft: "#f1f8f1" },
    info: { accent: "#01579b", soft: "#e3f2fd" },
    warning: { accent: "#bf360c", soft: "#fff3e0" },
    danger: { accent: "#b71c1c", soft: "#ffebee" }
  },
  // ============================================================
  // 字号 / 间距 / 圆角
  //   - baseSize 15：确保正文 AA 级可读
  //   - lineHeight 1.85：青年文体短段落标志性呼吸感
  //   - paragraph 22：段落间距偏宽，短段落不显拥挤
  //   - radius.lg 14：显著圆于 default(8) / mook(0)
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.85,
    h1Size: 24,
    h2Size: 20,
    h3Size: 17,
    letterSpacing: 0.3,
    captionSize: 12
  },
  spacing: {
    paragraph: 22,
    section: 36,
    listItem: 10,
    containerPadding: 18
  },
  radius: { sm: 6, md: 10, lg: 14 },
  // ============================================================
  // Motifs：圆形气泡 + 粉色圆点分隔，区别于方块（mook）
  // ============================================================
  motifs: {
    // 分隔点：三颗玫粉圆点，间距均匀——youth 的"呼吸感分隔"
    dividerDots: {
      viewBox: [0, 0, 240, 10],
      width: 220,
      height: 10,
      primitives: [
        { type: "circle", cx: 100, cy: 5, r: 3, fill: "token:bgMuted" },
        { type: "circle", cx: 120, cy: 5, r: 4, fill: "token:primary" },
        { type: "circle", cx: 140, cy: 5, r: 3, fill: "token:bgMuted" }
      ]
    },
    // 花式分隔：粉点 + 两侧细线——潮志"间章"感
    dividerFlower: {
      viewBox: [0, 0, 240, 14],
      width: 220,
      height: 14,
      primitives: [
        { type: "line", x1: 0, y1: 7, x2: 90, y2: 7, stroke: "token:border", strokeWidth: 1 },
        { type: "circle", cx: 105, cy: 7, r: 4, fill: "token:primary" },
        { type: "circle", cx: 120, cy: 7, r: 6, fill: "token:primary", opacity: 0.25 },
        { type: "circle", cx: 135, cy: 7, r: 4, fill: "token:primary" },
        { type: "line", x1: 150, y1: 7, x2: 240, y2: 7, stroke: "token:border", strokeWidth: 1 }
      ]
    },
    // 波浪分隔：轻柔 S 曲线，柔和区隔章节
    dividerWave: {
      viewBox: [0, 0, 240, 12],
      width: 220,
      height: 12,
      primitives: [
        {
          type: "path",
          d: "M0 6 Q30 1 60 6 Q90 11 120 6 Q150 1 180 6 Q210 11 240 6",
          fill: "none",
          stroke: "token:primary",
          strokeWidth: 1.5,
          opacity: 0.5
        }
      ]
    },
    // 状态图标：圆形填充（呼应圆角主题）
    tipIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [{ type: "circle", cx: 7, cy: 7, r: 5, fill: "token:status.tip.accent" }]
    },
    infoIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [{ type: "circle", cx: 7, cy: 7, r: 5, fill: "token:status.info.accent" }]
    },
    warningIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [{ type: "circle", cx: 7, cy: 7, r: 5, fill: "token:status.warning.accent" }]
    },
    dangerIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [{ type: "circle", cx: 7, cy: 7, r: 5, fill: "token:status.danger.accent" }]
    },
    // 步骤徽章：实心粉圆 + 外圈同色光晕（青年贴纸 sticker 双层圆）。
    // 外圈 r=11 stroke 同色 opacity 0.35，给视觉"贴纸毛边"质感；中心实心 r=8.5
    // 让数字更聚焦——与 default 单层实心 / edu-classroom 双圆环 / commerce-pulse
    // 白外环按键拉开第四种形态。
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      placeholders: ["N"],
      primitives: [
        { type: "circle", cx: 12, cy: 12, r: 11, fill: "token:primary", opacity: 0.28 },
        { type: "circle", cx: 12, cy: 12, r: 8.5, fill: "token:primary" },
        {
          type: "text",
          x: 12,
          y: 17,
          content: "{N}",
          fontSize: 14,
          fontWeight: 700,
          fill: "token:textInverse",
          textAnchor: "middle"
        }
      ]
    },
    // quoteMark：大号引号，玫粉，用于 stamp-quote pullQuote 的背景装饰
    quoteMark: {
      viewBox: [0, 0, 60, 50],
      width: 56,
      height: 46,
      primitives: [
        {
          type: "text",
          x: 4,
          y: 44,
          content: "“",
          fontSize: 72,
          fontWeight: 700,
          fill: "token:primary",
          opacity: 0.15,
          textAnchor: "start"
        }
      ]
    }
  },
  // ============================================================
  // 骨架变体
  //   5 个 orphan variant 升级为本主题首采：
  //     pill-tag / chat-bubbles / triptych / stamp-quote / ai-notice
  // ============================================================
  variants: {
    admonition: "pill-tag",
    // orphan 首采：青年感胶囊标签
    quote: "column-rule",
    // 左侧彩色竖线引用，简洁
    compare: "column-card",
    // 双列卡片对比
    steps: "number-circle",
    // 圆形序号步骤
    divider: "dots",
    // 三点分隔，轻盈
    sectionTitle: "kicker-stack",
    // kicker + 大标题叠排，杂志感
    codeBlock: "bare",
    // 干净代码块
    note: "side-bar",
    // 左侧竖条补注
    footnotes: "lined",
    // 横线脚注
    recommend: "card-list",
    // 卡片推荐列表
    qrcode: "bare",
    // 裸二维码
    footerCTA: "button-led",
    // 按钮引导 CTA
    pullQuote: "stamp-quote",
    // orphan 首采：盖戳印章感引用
    announcement: "ai-notice",
    // orphan 首采：AI 注释卡感
    tableCard: "rule-grid",
    // 规则网格表格
    gallery: "triptych",
    // orphan 首采：三宫格安利
    dialogue: "chat-bubbles",
    // orphan 首采：IM 风气泡对话
    // orphan 首采：包豪斯圆方代号——粉丝问答的圆环 Q 与实心方 A 几何对照,与 zine 几何拼贴语言一致
    qaBlock: "circle-square"
  },
  // 允许作者在单稿里按需切换 admonition variant（pill-tag 是默认，不重复登记）
  admonitionOverrides: ["accent-bar", "card-shadow", "dashed-border"],
  // ============================================================
  // 签名容器：youth-zine 的视觉核心
  // ============================================================
  signatureContainers: [
    "intro",
    "highlight",
    "pullQuote",
    "gallery",
    "dialogue",
    "recommend",
    "tip",
    "warning",
    "info",
    "danger",
    "announcement"
  ],
  // ============================================================
  // 主题级 kicker 文案——青年潮流母语
  // ============================================================
  kickers: {
    recommend: "你可能还喜欢",
    footerCTATitle: "关注我的潮流频道",
    toc: "本期目录",
    qaBlock: "粉丝问答"
  },
  // ============================================================
  // 元素样式
  // ============================================================
  elements: {
    h1: {
      "font-size": "24px",
      "font-weight": "800",
      color: "#1a0a12",
      "margin-top": "0",
      "margin-bottom": "16px",
      "line-height": "1.4",
      "letter-spacing": "0.5px"
    },
    h2: {
      "font-size": "20px",
      "font-weight": "700",
      color: "#e91e63",
      "margin-top": "36px",
      "margin-bottom": "12px",
      "line-height": "1.45",
      "letter-spacing": "0.3px"
    },
    h3: {
      "font-size": "17px",
      "font-weight": "700",
      color: "#1a0a12",
      "margin-top": "24px",
      "margin-bottom": "8px",
      "line-height": "1.5",
      "letter-spacing": "0.2px"
    },
    h4: {
      "font-size": "16px",
      "font-weight": "600",
      color: "#ad1457",
      "margin-top": "18px",
      "margin-bottom": "6px",
      "line-height": "1.5"
    },
    h5: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#6d4c5e",
      "margin-top": "14px",
      "margin-bottom": "6px",
      "line-height": "1.5",
      "letter-spacing": "0.3px"
    },
    h6: {
      "font-size": "13px",
      "font-weight": "600",
      color: "#6d4c5e",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.5",
      "letter-spacing": "1px",
      "text-transform": "uppercase"
    },
    // 正文：15/1.85 的宽行距，短段落风格
    p: {
      "font-size": "15px",
      "line-height": "1.85",
      color: "#1a0a12",
      "margin-top": "0",
      "margin-bottom": "22px",
      "letter-spacing": "0.3px"
    },
    // blockquote：左侧玫粉竖线 + 微粉底——突出引用，柔而不硬
    blockquote: {
      __reset: true,
      "border-left": "4px solid #e91e63",
      "background-color": "#fdf6f8",
      color: "#1a0a12",
      padding: "14px 18px",
      margin: "24px 0",
      "font-size": "15px",
      "font-weight": "400",
      "line-height": "1.85",
      "border-radius": "0 10px 10px 0"
    },
    ul: {
      "list-style": "disc",
      "padding-left": "20px",
      "margin-top": "0",
      "margin-bottom": "22px"
    },
    ol: {
      "list-style": "decimal",
      "padding-left": "20px",
      "margin-top": "0",
      "margin-bottom": "22px"
    },
    li: {
      "font-size": "15px",
      "line-height": "1.85",
      color: "#1a0a12",
      "margin-bottom": "10px",
      "letter-spacing": "0.3px"
    },
    // strong：玫粉高亮——青年文体强调不走黑底，走色彩
    strong: { "font-weight": "700", color: "#e91e63" },
    em: { "font-style": "italic", color: "#ad1457" },
    // 链接：玫粉 + 细下划线——无 border-bottom（微信粘贴后 border-bottom 稳定性不如 text-decoration）
    a: {
      color: "#e91e63",
      "text-decoration": "underline",
      "text-underline-offset": "2px"
    },
    hr: {
      border: "none",
      height: "2px",
      "background-color": "#fce4ec",
      "margin-top": "24px",
      "margin-bottom": "24px",
      "border-radius": "2px"
    },
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "12px",
      "margin-right": "auto",
      "margin-bottom": "12px",
      "margin-left": "auto",
      "border-radius": "10px"
    },
    // pre：暗底代码块，对比度 9.67（preText/preBg 已自查）
    pre: {
      __reset: true,
      "background-color": "#2a2d32",
      color: "#d8d8d4",
      padding: "16px 18px",
      margin: "22px 0",
      "border-radius": "10px",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "font-size": "13px",
      "line-height": "1.7"
    },
    // code：深玫粉字 + 浅粉底，对比度 5.79（已自查）
    code: {
      "background-color": "#fce4ec",
      color: "#ad1457",
      padding: "2px 6px",
      "border-radius": "6px",
      "font-size": "13px"
    },
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "22px",
      "font-size": "14px"
    },
    th: {
      "text-align": "left",
      "font-weight": "700",
      color: "#ffffff",
      "background-color": "#e91e63",
      "font-size": "13px",
      "letter-spacing": "0.5px",
      "padding-top": "8px",
      "padding-right": "12px",
      "padding-bottom": "8px",
      "padding-left": "12px",
      "border-radius": "0"
    },
    td: {
      "text-align": "left",
      color: "#1a0a12",
      "font-size": "14px",
      "padding-top": "8px",
      "padding-right": "12px",
      "padding-bottom": "8px",
      "padding-left": "12px",
      "border-bottom": "1px solid #e0b4c4",
      "vertical-align": "top"
    },
    kbd: {
      display: "inline-block",
      "background-color": "#fdf6f8",
      color: "#1a0a12",
      border: "1px solid #e0b4c4",
      "border-bottom": "2px solid #e0b4c4",
      "border-radius": "6px",
      padding: "1px 6px",
      "font-size": "12px",
      "line-height": "1.6",
      "vertical-align": "middle",
      "letter-spacing": "0.2px"
    }
  },
  // ============================================================
  // 内联强调
  //   highlight 是 youth-zine 核心 voice：圆角胶囊感（标签化）
  // ============================================================
  inline: {
    // 公众号后台剥离 ::before/::after，唯一稳妥是 DOM 真插 inline-block
    highlight: {
      "background-color": "#ffd54f",
      color: "#1a0a12",
      padding: "1px 7px",
      "border-radius": "10px",
      "font-weight": "600"
    },
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#e91e63",
      "text-underline-offset": "3px"
    },
    emphasis: {
      color: "#e91e63",
      "font-weight": "700"
    },
    del: {
      color: "#6d4c5e",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#2e7d32",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器样式
  // ============================================================
  containers: {
    // intro：微粉背景 + 圆角 + 左边装饰线——导语开门见山
    intro: {
      __reset: true,
      "background-color": "#fdf6f8",
      "border-radius": "14px",
      "border-left": "4px solid #e91e63",
      padding: "18px 20px",
      margin: "0 0 32px 0",
      "font-size": "15px",
      "line-height": "1.85",
      color: "#1a0a12",
      "letter-spacing": "0.3px"
    },
    // author：轻量署名栏
    author: {
      __reset: true,
      "background-color": "transparent",
      padding: "0",
      margin: "0 0 28px 0",
      "font-size": "13px",
      color: "#6d4c5e",
      "letter-spacing": "0.3px"
    },
    cover: {
      margin: "0 0 32px 0"
    },
    // 四态 callout：pill-tag variant 接管外观，容器只给 margin
    tip: { margin: "16px 0" },
    warning: { margin: "16px 0" },
    info: { margin: "16px 0" },
    danger: { margin: "16px 0" },
    // note：侧竖条补注，低调不抢色
    // 左条由 side-bar variant 自 noteBorder*=粉色 3px solid 注入；此处只携带 bg/padding/字号等"非边线"voice
    note: {
      __reset: true,
      "background-color": "#fdf6f8",
      padding: "10px 14px",
      margin: "16px 0",
      "font-size": "13px",
      "line-height": "1.75",
      color: "#6d4c5e",
      "border-radius": "0 8px 8px 0"
    },
    // quoteCard：轻微粉底浮起
    quoteCard: {
      "background-color": "#fdf6f8",
      border: "1px solid #e0b4c4",
      padding: "20px 22px",
      margin: "28px 0",
      "border-radius": "14px"
    },
    // highlight：亮黄底胶囊感色块
    highlight: {
      "background-color": "#ffd54f",
      padding: "14px 18px",
      margin: "20px 0",
      "border-radius": "14px",
      border: "none"
    },
    compare: {
      margin: "22px 0",
      "border-radius": "10px"
    },
    steps: {
      margin: "22px 0"
    },
    sectionTitle: {
      __reset: true,
      margin: "36px 0 16px",
      "padding-bottom": "8px",
      "border-bottom": "2px solid #e91e63"
    },
    // footerCTA：玫粉背景 + 圆角——强召唤感
    footerCTA: {
      __reset: true,
      margin: "32px 0",
      padding: "20px 22px",
      "background-color": "#fce4ec",
      "border-radius": "14px",
      "text-align": "center"
    },
    // recommend：卡片列表外壳
    recommend: {
      margin: "24px 0",
      padding: "16px 18px",
      "background-color": "#fdf6f8",
      "border-radius": "14px",
      border: "1px solid #e0b4c4"
    },
    // qrcode：居中简洁
    qrcode: {
      margin: "24px 0",
      padding: "16px",
      "background-color": "#fdf6f8",
      border: "1px solid #e0b4c4",
      "border-radius": "14px",
      "text-align": "center"
    },
    // voiceCard / videoCard：媒体占位，保持轻量
    voiceCard: {
      "background-color": "#fdf6f8",
      border: "1px solid #e0b4c4",
      "border-radius": "10px",
      padding: "12px 16px",
      margin: "16px 0"
    },
    videoCard: {
      "background-color": "#fdf6f8",
      border: "1px solid #e0b4c4",
      "border-radius": "10px",
      padding: "12px 16px",
      margin: "16px 0"
    },
    // announcement：ai-notice variant 接管，容器给圆角基调
    announcement: {
      __reset: true,
      margin: "22px 0",
      "border-radius": "14px",
      "background-color": "#fce4ec",
      border: "1px solid #e0b4c4",
      padding: "14px 18px",
      color: "#1a0a12",
      "font-size": "14px",
      "line-height": "1.8"
    },
    // authorBio：多行作者卡
    authorBio: {
      __reset: true,
      "background-color": "#fdf6f8",
      "border-radius": "14px",
      border: "1px solid #e0b4c4",
      padding: "14px 16px",
      margin: "16px 0",
      "font-size": "13px",
      color: "#6d4c5e"
    },
    // imageCaption：图注小字
    imageCaption: {
      margin: "8px 0 20px",
      "text-align": "center",
      color: "#6d4c5e",
      "font-size": "12px",
      "letter-spacing": "0.05em",
      "line-height": "1.6",
      "border-radius": "0"
    },
    // timeline：时间轴外框
    timeline: {
      margin: "22px 0",
      "padding-left": "8px",
      "border-left": "3px solid #e91e63"
    },
    // abstract：tl;dr 摘要
    abstract: {
      __reset: true,
      "background-color": "#fdf6f8",
      "border-left": "4px solid #e91e63",
      "border-radius": "0 14px 14px 0",
      padding: "14px 18px",
      margin: "0 0 28px 0"
    },
    // keyNumber：大数字卡
    keyNumber: {
      margin: "22px 0",
      padding: "18px 20px",
      "background-color": "#fdf6f8",
      "border-top": "3px solid #e91e63",
      "border-radius": "14px"
    },
    // data-brief 家族
    masthead: {
      __reset: true,
      margin: "0 0 32px 0",
      "padding-bottom": "10px",
      "border-bottom": "2px solid #e91e63"
    },
    sectionTag: {
      margin: "0 0 14px 0",
      "border-radius": "10px"
    },
    byline: {
      "font-size": "13px",
      color: "#6d4c5e",
      "letter-spacing": "0.3px"
    },
    editorialHeader: {
      margin: "0 0 28px 0",
      "border-radius": "14px"
    },
    toc: {
      __reset: true,
      "background-color": "#fdf6f8",
      "border-radius": "14px",
      padding: "16px 18px",
      margin: "0 0 32px 0"
    },
    kpiDashboard: {
      "background-color": "#fdf6f8",
      "border-top": "2px solid #e91e63",
      "border-radius": "0 0 14px 14px",
      padding: "18px 18px 16px",
      margin: "0 0 28px 0"
    },
    barChart: {
      "background-color": "#fdf6f8",
      border: "1px solid #e0b4c4",
      "border-radius": "10px",
      padding: "16px 14px",
      margin: "22px 0"
    },
    qaBlock: {
      __reset: true,
      "background-color": "transparent",
      padding: "0",
      margin: "32px 0"
    },
    footnotes: {
      __reset: true,
      "border-top": "1px solid #e0b4c4",
      "padding-top": "12px",
      margin: "24px 0",
      "font-size": "12px",
      "line-height": "1.75",
      color: "#6d4c5e"
    },
    colophon: {
      __reset: true,
      "border-top": "2px solid #e91e63",
      "margin-top": "36px",
      "padding-top": "16px",
      "padding-bottom": "16px",
      "border-radius": "0"
    },
    // pullQuote：stamp-quote variant 接管，容器给圆角基调
    pullQuote: {
      margin: "28px 0",
      "border-radius": "14px"
    },
    // tableCard：网格表格外框
    tableCard: {
      margin: "22px 0",
      "border-radius": "10px",
      overflow: "hidden"
    },
    // gallery：三宫格安利
    gallery: {
      margin: "22px 0",
      "border-radius": "10px"
    },
    // dialogue：气泡对话
    dialogue: {
      margin: "22px 0"
    }
  },
  // ============================================================
  // 内层子元素 inline style 槽位
  // ============================================================
  innerStyles: {
    // abstract kicker：玫粉标签感
    abstractKicker: {
      color: "#e91e63",
      "font-size": "11px",
      "font-weight": "700",
      "letter-spacing": "0.15em",
      "text-transform": "uppercase",
      "padding-bottom": "4px",
      "margin-bottom": "8px",
      display: "block"
    },
    // key-number 大数字：玫粉 + 粗体
    keyNumberValue: {
      color: "#e91e63",
      "font-size": "36px",
      "font-weight": "800",
      "line-height": "1.1",
      "letter-spacing": "-0.02em",
      "margin-bottom": "6px"
    },
    // key-number kicker：小字灰提示
    keyNumberKicker: {
      color: "#6d4c5e",
      "font-size": "11px",
      "font-weight": "500",
      "letter-spacing": "0.12em",
      "text-transform": "uppercase",
      "margin-bottom": "4px"
    }
  },
  // ============================================================
  // 主题模板片段
  // ============================================================
  templates: {
    cover: `::: cover
# 本周潮流安利清单 ✦
:::
`,
    authorBar: `::: author
@潮流小编 · 2026.05.17
:::
`,
    tip: `::: tip
这款真的绝了！姐妹们一定要冲！
:::
`,
    footerCTA: `::: footer-cta
关注我，每周更新最新潮流安利 ✨
:::
`
  },
  svgVariant: "soft",
  meta: {
    createdAt: "2026-05-17",
    ownerNotes: "青年潮志 · 鲜玫粉 #e91e63（色相 333°）+ 纯白底 + 圆角 14px + 行高 1.85。5 个 orphan variant 升级为首采：pill-tag / chat-bubbles / triptych / stamp-quote / ai-notice。核心 voice：inline.highlight 做成亮黄圆角胶囊标签（#ffd54f + borderRadius:10px）。全部对比度对已自查：status 四态 ≥ 4.5:1，text/bg=19.16，textMuted/bg=7.38，code/bg=6.97，primary/bg=4.35（大字装饰 ≥ 3:1）。"
  }
};
const spec$1 = {
  id: "official-gazette",
  name: "公文公报",
  description: "中央人民政府公报 / 上市公司公告 / 监管文件，服务政务通告、企业公告、监管声明等严肃文体",
  audience: "政务通告 / 企业公告 / 监管声明 / 招股说明书 / 严肃通报 / 公开信",
  // ============================================================
  // 色板（色相严格 215°–225°；底色铜版纸；三档差值 ≤ 5%）
  // ============================================================
  palette: {
    primary: "#1c3a6e",
    // 普鲁士蓝 HSL(219°, 59%, 27%)；比 default #2558b0 更深更饱和
    secondary: "#2e507a",
    // primary 浅一档，h3 / byline / 表头色
    accent: "#8a6a14",
    // 暗金——公文烫金记忆；稀缺：印章 / issueStamp / 分节线
    bg: "#faf8f3",
    // 铜版纸微米色（3% 暖调）
    bgSoft: "#f5f3ec",
    // 档案米深一级（与 bg 差 ~3%）
    bgMuted: "#efece3",
    // 卷宗底（与 bgSoft 差 ~3%，三档总差 ≤ 5%）
    text: "#1a1e28",
    // 公文墨——比 primary 更深，压住所有装饰
    textMuted: "#52586a",
    // 批注灰蓝——稍带蓝调避免与铜版纸底打架
    textInverse: "#fefefe",
    // 反白字色（印章 / 反色标签）
    border: "#d4d0c4",
    // 米纸边——暖灰，公文分栏线
    code: "#1c3a6e"
    // inline code 字色 = primary（公文稿里 code 极少）
  },
  // ============================================================
  // 语义四色（公文"严肃灰系"——不走交通灯；不滥用红绿）
  // ============================================================
  status: {
    tip: { accent: "#1c3a6e", soft: "#eaecf4" },
    // 正文附注——primary 同系
    info: { accent: "#2e507a", soft: "#e8edf4" },
    // 背景说明——secondary 蓝灰
    warning: { accent: "#7a5510", soft: "#f0e9d8" },
    // 注意事项——暗金同族深棕
    danger: { accent: "#8a2218", soft: "#f0e8e6" }
    // 严肃警示——深暗红克制
  },
  // ============================================================
  // 字号 / 间距 / 圆角（公文密度高；letterSpacing 偏小；行高不宜过松）
  // ============================================================
  typography: { baseSize: 15, lineHeight: 1.65, h1Size: 22, h2Size: 18, h3Size: 16, letterSpacing: 0.2 },
  spacing: { paragraph: 16, section: 28, listItem: 7, containerPadding: 16 },
  radius: { sm: 0, md: 1, lg: 2 },
  // ============================================================
  // Motifs（仪式感三件套：sealMark 印章 + issueStamp 期号戳 + h2Prefix 章节标）
  // ============================================================
  motifs: {
    // h2Prefix · 普鲁士蓝实心竖条（3×14），传达"公文条款分节"感
    h2Prefix: {
      viewBox: [0, 0, 10, 16],
      width: 10,
      height: 16,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 10 },
      primitives: [
        { type: "rect", x: 0, y: 1, w: 3, h: 14, fill: "token:primary" }
      ]
    },
    // sealMark · 朱红印章感 SVG，用普鲁士蓝版本（公文蓝印章）
    // 双线方框 + "公" 字占位文字——呼应公文印章仪式感
    sealMark: {
      viewBox: [0, 0, 48, 48],
      width: 44,
      height: 44,
      inlineStyle: { display: "inline-block", verticalAlign: "middle" },
      primitives: [
        // 外框
        { type: "rect", x: 1, y: 1, w: 46, h: 46, stroke: "token:primary", strokeWidth: 1.5 },
        // 内框（双线印章感）
        { type: "rect", x: 4, y: 4, w: 40, h: 40, stroke: "token:primary", strokeWidth: 1, opacity: 0.55 },
        // "公" 印章文字
        {
          type: "text",
          x: 24,
          y: 30,
          content: "公",
          fontSize: 20,
          fontWeight: 600,
          fill: "token:primary",
          textAnchor: "middle"
        }
      ]
    },
    // issueStamp · 期号 / 文号印章（公文文号戳）
    // 双线矩形 + 文号 ISSUE/文号 混排；与 industry-observer 形制相同但用普鲁士蓝。
    // viewBox 320：覆盖 `〔023〕第2025-04-20号 · 周刊` 等真实值（CJK + 数字混排约 240px），
    // 留出足够余量以兼容更长 kind（"特别公告"/"上市公司年报公告"）。
    issueStamp: {
      viewBox: [0, 0, 320, 26],
      width: 320,
      height: 26,
      inlineStyle: { display: "inline-block", verticalAlign: "middle" },
      placeholders: ["issue", "date", "kind"],
      primitives: [
        { type: "rect", x: 0.5, y: 0.5, w: 319, h: 25, stroke: "token:primary", strokeWidth: 1 },
        { type: "rect", x: 3, y: 3, w: 314, h: 20, stroke: "token:primary", strokeWidth: 1, opacity: 0.4 },
        {
          // textAnchor=middle：文号居中，公文戳的对称感更稳；与 industry-observer 同步
          type: "text",
          x: 160,
          y: 19,
          content: "〔{issue}〕第{date}号 · {kind}",
          fontSize: 14,
          fontWeight: 600,
          fill: "token:primary",
          textAnchor: "middle",
          letterSpacing: 1
        }
      ]
    },
    // dividerDots · 三点分割（印章底部间隔感）
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: "circle", cx: 108, cy: 4, r: 1.2, fill: "token:border" },
        { type: "circle", cx: 120, cy: 4, r: 1.2, fill: "token:accent" },
        { type: "circle", cx: 132, cy: 4, r: 1.2, fill: "token:border" }
      ]
    },
    // dividerWave · 公文不用 wave，退化为细 rule（单直线）
    dividerWave: {
      viewBox: [0, 0, 240, 4],
      width: 220,
      height: 4,
      primitives: [
        { type: "line", x1: 20, y1: 2, x2: 220, y2: 2, stroke: "token:border", strokeWidth: 1 }
      ]
    },
    // stepBadge(N) · 方角编号徽章（公文步骤序号）
    // 普鲁士蓝小方块 + 白数字，与圆形徽章区分（公文走方正）
    stepBadge: {
      viewBox: [0, 0, 22, 22],
      width: 22,
      height: 22,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      placeholders: ["N"],
      primitives: [
        { type: "rect", x: 1, y: 1, w: 20, h: 20, fill: "token:primary" },
        {
          type: "text",
          x: 11,
          y: 17,
          content: "{N}",
          fontSize: 14,
          fontWeight: 700,
          fill: "token:textInverse",
          textAnchor: "middle"
        }
      ]
    },
    // tipIcon（正文附注）：竖排三横线 + 短线组合——"条款"语义
    tipIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 2, y: 3, w: 10, h: 1.5, fill: "token:primary" },
        { type: "rect", x: 2, y: 6.5, w: 10, h: 1.5, fill: "token:primary" },
        { type: "rect", x: 2, y: 10, w: 6, h: 1.5, fill: "token:primary" }
      ]
    },
    // infoIcon（背景说明）：空心方框——"参见"说明框
    infoIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 2, y: 2, w: 10, h: 10, stroke: "token:status.info.accent", strokeWidth: 1.2 },
        { type: "line", x1: 7, y1: 5, x2: 7, y2: 10, stroke: "token:status.info.accent", strokeWidth: 1.2, strokeLinecap: "round" },
        { type: "rect", x: 6.2, y: 3.5, w: 1.6, h: 1.6, fill: "token:status.info.accent" }
      ]
    },
    // warningIcon（注意事项）：暗金三角框——"注意"符号
    warningIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M7,2 L13,12 L1,12 Z",
          stroke: "token:status.warning.accent",
          strokeWidth: 1.2
        },
        { type: "line", x1: 7, y1: 6, x2: 7, y2: 9.5, stroke: "token:status.warning.accent", strokeWidth: 1.2, strokeLinecap: "round" },
        { type: "rect", x: 6.2, y: 10.5, w: 1.6, h: 1.6, fill: "token:status.warning.accent" }
      ]
    },
    // dangerIcon（严肃警示）：双线矩形带叉——"禁止 / 警告"
    dangerIcon: {
      viewBox: [0, 0, 14, 14],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 1.5, y: 1.5, w: 11, h: 11, stroke: "token:status.danger.accent", strokeWidth: 1.2 },
        { type: "line", x1: 4, y1: 4, x2: 10, y2: 10, stroke: "token:status.danger.accent", strokeWidth: 1.2, strokeLinecap: "round" },
        { type: "line", x1: 10, y1: 4, x2: 4, y2: 10, stroke: "token:status.danger.accent", strokeWidth: 1.2, strokeLinecap: "round" }
      ]
    },
    // sectionCorner · 暗金小方块（章节角标，区分 h2Prefix 蓝竖条）
    sectionCorner: {
      viewBox: [0, 0, 8, 8],
      width: 6,
      height: 6,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      primitives: [
        { type: "rect", x: 0, y: 0, w: 6, h: 6, fill: "token:accent" }
      ]
    }
  },
  // ============================================================
  // 骨架变体（★ 标 orphan variant 升级；公文优先选方正框线骨架）
  // ============================================================
  variants: {
    admonition: "top-bottom-rule",
    // ★ orphan：上下 1px 实线，公文框线感
    quote: "frame-brackets",
    // 四角括号框——公文引用 / 定义框
    compare: "ledger",
    // 账本双色列——政策前 / 政策后对比
    steps: "number-circle",
    divider: "rule",
    sectionTitle: "bordered",
    codeBlock: "bare",
    note: "editorial-stripe",
    // ★ orphan：左 3px 主色条 + bgSoft，公文编注
    footnotes: "dense-academic",
    // 密集脚注——条款注释 / 参考文件
    recommend: "academic-refs",
    // 学术引用风——参考文件列表
    qrcode: "bare",
    footerCTA: "button-led",
    pullQuote: "centered-rule",
    // ★ orphan：上下线居中夹，公文拉引正式感
    announcement: "stamped-banner",
    // ★ orphan：印章式公告，公告主题完美匹配
    tableCard: "rule-grid",
    gallery: "duo",
    dialogue: "qa-rows",
    qaBlock: "numbered-faq"
  },
  // ============================================================
  // 装饰（h2 中文章节序号编号 + 不做 intro dropcap）
  // ============================================================
  decorations: {
    headingPrefix: [
      {
        level: 2,
        autoNumber: "arabic",
        style: {
          color: "primary",
          fontWeight: 600,
          fontSize: 16,
          letterSpacing: 0,
          suffix: "{cn}、",
          marginRight: 6
        }
      }
    ]
  },
  signatureContainers: ["announcement", "footnotes", "sectionTitle", "colophon", "byline"],
  // ============================================================
  // 元素级样式（公文 voice：克制、密度、方正）
  // ============================================================
  elements: {
    h1: {
      "font-size": "22px",
      "font-weight": "700",
      color: "#1a1e28",
      "margin-top": "24px",
      "margin-bottom": "12px",
      "line-height": "1.4",
      "letter-spacing": "0.2px",
      "text-align": "center"
      // 公文标题居中
    },
    h2: {
      "font-size": "18px",
      "font-weight": "700",
      color: "#1a1e28",
      "margin-top": "28px",
      "margin-bottom": "10px",
      "line-height": "1.4",
      "letter-spacing": "0.2px",
      "border-bottom": "none",
      "padding-bottom": "0"
    },
    h3: {
      "font-size": "16px",
      "font-weight": "600",
      color: "#1a1e28",
      "margin-top": "20px",
      "margin-bottom": "8px",
      "line-height": "1.45",
      "letter-spacing": "0.1px"
    },
    h4: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#1a1e28",
      "margin-top": "16px",
      "margin-bottom": "6px",
      "line-height": "1.5",
      "letter-spacing": "0.1px"
    },
    h5: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#1a1e28",
      "margin-top": "14px",
      "margin-bottom": "5px",
      "line-height": "1.5",
      "letter-spacing": "0.2px"
    },
    h6: {
      "font-size": "14px",
      "font-weight": "500",
      color: "#52586a",
      "margin-top": "10px",
      "margin-bottom": "4px",
      "line-height": "1.5",
      "letter-spacing": "0.5px"
    },
    p: {
      "font-size": "15px",
      "line-height": "1.65",
      color: "#1a1e28",
      "margin-top": "0",
      "margin-bottom": "16px",
      "letter-spacing": "0.2px",
      "text-indent": "2em"
      // 公文正文首行缩进两字
    },
    blockquote: {
      "border-left": "3px solid #d4d0c4",
      "background-color": "transparent",
      color: "#52586a",
      "padding-top": "4px",
      "padding-right": "0",
      "padding-bottom": "4px",
      "padding-left": "14px",
      "margin-top": "0",
      "margin-bottom": "16px",
      "border-radius": "0",
      "font-size": "14px",
      "line-height": "1.65"
    },
    ul: { "padding-left": "22px", "margin-top": "0", "margin-bottom": "16px" },
    ol: { "padding-left": "22px", "margin-top": "0", "margin-bottom": "16px" },
    li: {
      "margin-bottom": "7px",
      "line-height": "1.65",
      color: "#1a1e28",
      "letter-spacing": "0.2px"
    },
    strong: {
      "font-weight": "700",
      color: "#1a1e28"
    },
    em: {
      "font-style": "italic",
      "font-weight": "500",
      color: "#1a1e28"
    },
    a: {
      color: "#1c3a6e",
      "text-decoration": "underline",
      "text-underline-offset": "3px"
    },
    hr: {
      border: "none",
      height: "1px",
      "background-color": "#d4d0c4",
      "margin-top": "20px",
      "margin-bottom": "20px"
    },
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "10px",
      "margin-right": "auto",
      "margin-bottom": "8px",
      "margin-left": "auto",
      "border-radius": "1px"
    },
    // 公文表：booktabs 风三线 + 全边框，规范感强
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "18px",
      "font-size": "14px",
      "border-top": "2px solid #1c3a6e",
      "border-bottom": "2px solid #1c3a6e"
    },
    th: {
      "background-color": "#eaecf4",
      color: "#1c3a6e",
      border: "1px solid #d4d0c4",
      "border-bottom": "1.5px solid #1c3a6e",
      padding: "5px 10px",
      "font-weight": "700",
      "text-align": "center",
      "font-size": "13px",
      "letter-spacing": "0.2px"
    },
    td: {
      border: "1px solid #d4d0c4",
      padding: "5px 10px",
      color: "#1a1e28",
      "text-align": "left",
      "font-size": "14px"
    },
    // 公文键帽：直角 + 普鲁士蓝边
    kbd: {
      display: "inline-block",
      "background-color": "#f5f3ec",
      color: "#1a1e28",
      border: "1px solid #1c3a6e",
      "border-radius": "1px",
      padding: "1px 5px",
      "font-size": "12px",
      "line-height": "1.4",
      "vertical-align": "middle"
    },
    pre: {
      "background-color": "#efece3",
      color: "#1a1e28",
      "padding-top": "12px",
      "padding-right": "14px",
      "padding-bottom": "12px",
      "padding-left": "14px",
      "border-radius": "1px",
      border: "1px solid #d4d0c4",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "margin-top": "0",
      "margin-bottom": "18px",
      "font-size": "13px",
      "line-height": "1.6"
    },
    code: {
      "background-color": "#efece3",
      color: "#1c3a6e",
      padding: "1px 4px",
      "border-radius": "1px",
      "font-size": "13px",
      "font-weight": "500"
    }
  },
  // ============================================================
  // 内联强调（公文克制：无彩色高亮，走 bgMuted 浅底）
  // ============================================================
  inline: {
    // 公文不用荧光高亮——走 bgMuted 铜版纸底
    highlight: {
      "background-color": "#efece3",
      color: "#1a1e28",
      padding: "0 3px",
      "border-radius": "1px"
    },
    // 波浪线走 accent 暗金（稀缺用法，每篇 ≤ 3 次）
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#8a6a14",
      "text-underline-offset": "3px"
    },
    // 着重号走 primary 蓝 + 加粗
    emphasis: {
      color: "#1c3a6e",
      "font-weight": "700"
    },
    del: {
      color: "#52586a",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#1c3a6e",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 容器视觉（全 radius ≈ 0；border 框线主导；无鲜艳底色）
  // ============================================================
  containers: {
    intro: {
      "background-color": "transparent",
      "border-top": "1px solid #1c3a6e",
      "border-bottom": "1px solid #1c3a6e",
      "border-radius": "0",
      padding: "14px 0",
      margin: "0 0 24px 0",
      color: "#52586a",
      "line-height": "1.65"
    },
    author: {
      "background-color": "transparent",
      "border-bottom": "1px solid #d4d0c4",
      "border-radius": "0",
      padding: "8px 0",
      margin: "0 0 20px 0",
      "font-size": "13px",
      color: "#52586a"
    },
    cover: {
      margin: "0 0 28px 0",
      "text-align": "center"
    },
    // top-bottom-rule variant 接管 wrapperCSS；空 slot 是与 variants 的契约同步
    tip: {},
    warning: {},
    info: {},
    danger: {},
    note: {},
    quoteCard: {
      "background-color": "#f5f3ec",
      padding: "16px 20px",
      margin: "20px 0",
      "border-radius": "1px",
      border: "1px solid #d4d0c4"
    },
    highlight: {
      "background-color": "#f5f3ec",
      "border-left": "2px solid #1c3a6e",
      padding: "10px 14px 10px 16px",
      margin: "18px 0",
      "border-radius": "0"
    },
    compare: { margin: "20px 0" },
    steps: { margin: "20px 0" },
    sectionTitle: {
      margin: "32px 0 14px",
      "padding-bottom": "6px",
      "border-bottom": "2px solid #1c3a6e"
    },
    footerCTA: {
      margin: "36px 0 20px 0",
      padding: "16px 0",
      "background-color": "transparent",
      "border-top": "1.5px solid #1c3a6e",
      "border-bottom": "1.5px solid #1c3a6e",
      "border-radius": "0"
    },
    recommend: {
      margin: "22px 0",
      padding: "12px 0",
      "background-color": "transparent",
      "border-radius": "0",
      "border-top": "1px solid #d4d0c4"
    },
    abstract: {
      "background-color": "#f5f3ec",
      border: "1px solid #d4d0c4",
      "border-left": "3px solid #1c3a6e",
      padding: "12px 16px",
      margin: "16px 0 22px",
      "border-radius": "0"
    },
    qrcode: {
      margin: "28px auto",
      padding: "0",
      "background-color": "transparent",
      "border-radius": "0"
    },
    imageCaption: {
      margin: "4px 0 18px 0",
      "text-align": "center",
      "font-size": "12px",
      "font-style": "italic",
      color: "#52586a",
      "letter-spacing": "0.1px"
    },
    timeline: {
      margin: "22px 0",
      "border-left": "1px solid #1c3a6e",
      "padding-left": "16px",
      "background-color": "transparent"
    },
    voiceCard: { "background-color": "#f5f3ec", border: "1px solid #d4d0c4", "border-radius": "1px", padding: "10px 14px", margin: "12px 0" },
    videoCard: { "background-color": "#f5f3ec", border: "1px solid #d4d0c4", "border-radius": "1px", padding: "10px 14px", margin: "12px 0" },
    // stamped-banner variant 接管细节
    announcement: {
      margin: "0 0 24px 0",
      "background-color": "#eaecf4",
      border: "1px solid #1c3a6e",
      "border-radius": "0"
    },
    authorBio: {
      __reset: true,
      "background-color": "#f5f3ec",
      "border-top": "2px solid #1c3a6e",
      "border-radius": "0",
      padding: "14px 16px",
      margin: "24px 0"
    },
    footnotes: {
      margin: "20px 0 0 0",
      padding: "12px 0 0 0",
      "border-top": "1px solid #d4d0c4",
      "background-color": "transparent"
    },
    colophon: {
      "border-top": "1px solid #1c3a6e",
      padding: "12px 0",
      margin: "32px 0 0 0",
      "background-color": "transparent"
    },
    byline: {
      "border-bottom": "1px solid #d4d0c4",
      padding: "8px 0",
      margin: "0 0 20px 0",
      "background-color": "transparent"
    },
    pullQuote: { margin: "24px 0" },
    tableCard: { margin: "20px 0" },
    gallery: { margin: "20px 0" },
    dialogue: { margin: "20px 0" },
    masthead: { "background-color": "#f5f3ec", "border-bottom": "2px solid #1c3a6e", padding: "12px 0", margin: "0 0 24px 0" },
    sectionTag: { display: "inline-block", "background-color": "#1c3a6e", color: "#fefefe", padding: "2px 8px", "border-radius": "0", "font-size": "12px" },
    editorialHeader: { margin: "0 0 24px 0" },
    toc: { margin: "20px 0", "background-color": "#f5f3ec", border: "1px solid #d4d0c4", padding: "14px 16px", "border-radius": "0" },
    kpiDashboard: { margin: "20px 0" },
    barChart: { margin: "20px 0" },
    qaBlock: { margin: "20px 0", "background-color": "transparent" },
    keyNumber: { "background-color": "#f5f3ec", "border-top": "2px solid #1c3a6e", padding: "12px 14px", margin: "16px 0", "border-radius": "0" }
  },
  kickers: { recommend: "参考文件", footerCTATitle: "联系我们", toc: "目　录" },
  // ============================================================
  // 模板片段（公文格式标准示例）
  // ============================================================
  templates: {
    // 公文封面：标题 + 文号 + 发文机关（issueStamp 驱动）
    cover: `::: cover 通知标题 issue=2026 date=01 kind=通知
关于印发《某某办法》的通知

某某〔2026〕1号

各省、自治区、直辖市及新疆生产建设兵团相关部门：

:::
`,
    // 作者栏：发文机关 + 日期
    authorBar: `::: author 某某部门
发文日期：二〇二六年一月一日
:::
`,
    // 附注（tip = 正文附注）
    tip: `::: tip 附注
本通知自发布之日起施行，原相关规定同时废止。
:::
`,
    // 落款 CTA
    footerCTA: `::: footer-cta 联系我们 cta=下载全文 ▸
如有疑问，请联系相关部门办公室。联系电话：010-XXXXXXXX。
:::
`,
    // 参考文件
    recommend: `::: recommend 参考文件
- [1] 《某某法》（2024年修订版）
- [2] 《某某实施细则》（国务院令第XXX号）
- [3] 《某某管理办法》（部令第XX号）
:::
`
  },
  meta: {
    createdAt: "2026-05-17",
    ownerNotes: "公文公报主题：普鲁士蓝 #1c3a6e（HSL 219° / 59% / 27%）+ 暗金 #8a6a14；四个 orphan variant 升级（top-bottom-rule / editorial-stripe / centered-rule / stamped-banner）；h2 中文章节序号；公文首行缩进 2em；三档底色差值 ≤ 5%。"
  }
};
const spec = {
  id: "edu-classroom",
  name: "教室课堂",
  description: "耐心讲解 / 步骤分解 / 友好亲切的教育内容，不卡通化",
  audience: "K-12 教育 / 亲子科普 / 童书推荐 / 兴趣启蒙 / 知识自习 / 家长读物",
  // ============================================================
  // 色板
  // ============================================================
  palette: {
    primary: "#2e7d32",
    // 森林绿（HSL 123° 49% 31%），黑板/草地联想
    secondary: "#4caf50",
    // 草地亮绿（primary 的提亮变体，链接/次要强调）
    accent: "#f57c00",
    // 暖橙（教师标红/启发感，accent 稀缺纪律：pull-quote/drop-cap）
    bg: "#fdfcf7",
    // 教科书铜版纸（微暖，不纯白）
    bgSoft: "#f5f2ea",
    // 浅卡纸底（容器内底、intro、author）
    bgMuted: "#e8e4d8",
    // 暖灰（表头、inline code 底、分隔）
    text: "#1c2b1e",
    // 墨绿深色正文（偏绿的近黑，与 primary 家族和谐）
    textMuted: "#5c6b5e",
    // 灰绿（caption / note / 脚注）
    textInverse: "#fefefe",
    // 反白（色块徽章/stepBadge 白字）
    border: "#c8d5c9",
    // 浅绿边框（与 primary 同家族，1px 实线）
    code: "#1b5e20",
    // inline code 字色（深森林绿，在 bgMuted 上 7.5:1）
    highlightBg: "#fff3c4",
    // 马克笔暖黄底（==xx== 用，不走 bgSoft）
    codeBg: "#e8e4d8"
    // inline code 底色 = bgMuted
  },
  // 语义四色——教育主题 tip/info 最高频
  status: {
    tip: { accent: "#2e7d32", soft: "#eef6ef" },
    // 森林绿（=primary，小贴士是主色家族）
    info: { accent: "#1565c0", soft: "#e8f0fb" },
    // 深蓝（延伸知识，区别于 primary）
    warning: { accent: "#b34500", soft: "#fdf0e6" },
    // 深橙棕（#b34500 on #fdf0e6 = 4.98:1 ≥ 4.5 AA）
    danger: { accent: "#b71c1c", soft: "#fce8e8" }
    // 深红（危险提示，学习陷阱）
  },
  // ============================================================
  // 字号 / 间距 / 圆角
  // ============================================================
  typography: {
    baseSize: 15,
    lineHeight: 1.8,
    // 教育内容宽松易读（∈ [1.6, 1.85]）
    h1Size: 24,
    h2Size: 20,
    h3Size: 17,
    letterSpacing: 0.5
    // 比技术主题略宽，友好易读
  },
  spacing: {
    paragraph: 20,
    // 比技术主题略宽，步骤之间留气口
    section: 32,
    listItem: 10,
    // 列表条目间距稍宽（K-12 阅读节奏）
    containerPadding: 18
  },
  // 教育主题：圆润友好（lg ≥ 12）
  radius: { sm: 6, md: 10, lg: 14 },
  // ============================================================
  // Motifs
  // ============================================================
  motifs: {
    // tipIcon：圆形灯泡轮廓（圆头 + 灯座横线），primary 森林绿
    tipIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "circle",
          cx: 8,
          cy: 6.5,
          r: 4.5,
          stroke: "token:primary",
          strokeWidth: 1.5
        },
        { type: "line", x1: 5.5, y1: 11.5, x2: 10.5, y2: 11.5, stroke: "token:primary", strokeWidth: 1.5 },
        { type: "line", x1: 6, y1: 13, x2: 10, y2: 13, stroke: "token:primary", strokeWidth: 1.5 }
      ]
    },
    // warningIcon：等边三角形 + 中央 !（warning 深橙）
    warningIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        {
          type: "path",
          d: "M8,2 L14.5,13.5 L1.5,13.5 Z",
          stroke: "token:status.warning.accent",
          strokeWidth: 1.5,
          strokeLinejoin: "round"
        },
        { type: "rect", x: 7.25, y: 6, w: 1.5, h: 4, rx: 0.5, fill: "token:status.warning.accent" },
        { type: "circle", cx: 8, cy: 11.5, r: 0.9, fill: "token:status.warning.accent" }
      ]
    },
    // infoIcon：圆角方形 + 中央 i（info 深蓝）
    infoIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "rect", x: 2, y: 2, w: 12, h: 12, rx: 3, stroke: "token:status.info.accent", strokeWidth: 1.5 },
        { type: "circle", cx: 8, cy: 5.5, r: 0.9, fill: "token:status.info.accent" },
        { type: "rect", x: 7.25, y: 7.5, w: 1.5, h: 4.5, rx: 0.5, fill: "token:status.info.accent" }
      ]
    },
    // noteIcon：空心圆 + 中央 i（note 中性灰绿）
    noteIcon: {
      viewBox: [0, 0, 16, 16],
      width: 14,
      height: 14,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 6 },
      primitives: [
        { type: "circle", cx: 8, cy: 8, r: 6, stroke: "token:textMuted", strokeWidth: 1.5 },
        { type: "circle", cx: 8, cy: 5, r: 0.9, fill: "token:textMuted" },
        { type: "rect", x: 7.25, y: 7, w: 1.5, h: 5, rx: 0.4, fill: "token:textMuted" }
      ]
    },
    // stepBadge：双圆环（外深绿描边 + 内浅绿淡底）+ 主色数字。
    // 教育"圈圈钢笔重描"语言：教科书 / 黑板上常用的双层圈编号，与单色实心圆
    // （default / commerce-pulse / youth-zine 母语）拉开形态差异。
    stepBadge: {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      inlineStyle: { display: "inline-block", verticalAlign: "middle", marginRight: 8 },
      placeholders: ["N"],
      primitives: [
        { type: "circle", cx: 12, cy: 12, r: 11, stroke: "token:primary", strokeWidth: 1.8, fill: "#e8f3e9" },
        { type: "circle", cx: 12, cy: 12, r: 8, stroke: "token:primary", strokeWidth: 1, fill: "none" },
        {
          type: "text",
          x: 12,
          y: 17,
          content: "{N}",
          fontSize: 14,
          fontWeight: 700,
          fill: "token:primary",
          textAnchor: "middle"
        }
      ]
    },
    // dividerWave：柔和波浪线（三段起伏，primary 绿，匹配教育温和气质）
    dividerWave: {
      viewBox: [0, 0, 240, 16],
      width: 220,
      height: 16,
      primitives: [
        {
          type: "path",
          d: "M0,8 C20,2 40,14 60,8 C80,2 100,14 120,8 C140,2 160,14 180,8 C200,2 220,14 240,8",
          stroke: "token:primary",
          strokeWidth: 1.5,
          strokeLinecap: "round"
        }
      ]
    },
    // dividerDots：三点（primary 绿调，温和分章感）
    dividerDots: {
      viewBox: [0, 0, 240, 8],
      width: 220,
      height: 8,
      primitives: [
        { type: "circle", cx: 106, cy: 4, r: 2.5, fill: "token:border" },
        { type: "circle", cx: 120, cy: 4, r: 3, fill: "token:primary" },
        { type: "circle", cx: 134, cy: 4, r: 2.5, fill: "token:border" }
      ]
    }
  },
  // ============================================================
  // 骨架变体
  // ============================================================
  variants: {
    // orphan 升级：card-shadow（柔和卡片感，友好教育气质，无硬边框）
    admonition: "card-shadow",
    quote: "classic",
    compare: "column-card",
    steps: "number-circle",
    // wave：柔和波浪，与 dividerWave motif 呼应
    divider: "wave",
    // kicker-stack："今日课题"感（kicker 上行 + 大标题下行）
    sectionTitle: "kicker-stack",
    codeBlock: "bare",
    // smallcaps-kicker 的 hanging 形态由 sample-md 显式 layout=hanging 承担
    note: "smallcaps-kicker",
    footnotes: "lined",
    recommend: "card-list",
    qrcode: "bare",
    // triptych-actions：学/练/问三联，匹配教育内容 CTA
    footerCTA: "triptych-actions",
    pullQuote: "giant-mark",
    // mono-disclaimer（orphan 升级）：等宽免责说明气质，适配教育"知识范围声明 / 安全提醒"
    announcement: "mono-disclaimer",
    // zebra-rows（orphan 升级）：斑马纹易读，教学表格
    tableCard: "zebra-rows",
    gallery: "duo",
    // interview-column（orphan 升级）：师生访谈双栏（vs qa-rows 的紧凑问答行），让正式课堂对话感更强
    dialogue: "interview-column",
    qaBlock: "numbered-faq"
  },
  // ============================================================
  // 声明式装饰（intro 首字下沉轻量化）
  // ============================================================
  decorations: {
    introDropcap: {
      color: "primary",
      fontSize: 42,
      fontWeight: 700,
      marginRight: 6,
      paddingTop: 3
    }
  },
  // ============================================================
  // 内联强调
  // ============================================================
  inline: {
    // 马克笔划线（暖黄底）——教育主题 ==xx== 的核心语汇
    highlight: {
      "background-color": "#fff3c4",
      color: "#1c2b1e",
      padding: "0 3px",
      "border-radius": "3px"
    },
    // 波浪下划线：accent 暖橙（教师"这里注意"的感觉）
    wavy: {
      "text-decoration": "underline wavy",
      "text-decoration-color": "#f57c00",
      "text-underline-offset": "3px"
    },
    // 着重：primary 绿 + 600（关键词）
    emphasis: {
      color: "#2e7d32",
      "font-weight": "600"
    },
    del: {
      color: "#5c6b5e",
      "text-decoration": "line-through"
    },
    ins: {
      color: "#2e7d32",
      "text-decoration": "underline"
    }
  },
  // ============================================================
  // 元素级样式
  // ============================================================
  elements: {
    h1: {
      "font-size": "24px",
      "font-weight": "700",
      color: "#1c2b1e",
      "margin-top": "28px",
      "margin-bottom": "16px",
      "line-height": "1.35",
      "letter-spacing": "0"
    },
    h2: {
      "font-size": "20px",
      "font-weight": "600",
      color: "#1c2b1e",
      "margin-top": "36px",
      "margin-bottom": "14px",
      "line-height": "1.4",
      "padding-bottom": "8px",
      "border-bottom": "2px solid #2e7d32",
      "letter-spacing": "0"
    },
    h3: {
      "font-size": "17px",
      "font-weight": "600",
      color: "#2e7d32",
      "margin-top": "26px",
      "margin-bottom": "10px",
      "line-height": "1.5",
      "letter-spacing": "0.3px"
    },
    h4: {
      "font-size": "15px",
      "font-weight": "600",
      color: "#1c2b1e",
      "margin-top": "20px",
      "margin-bottom": "8px",
      "line-height": "1.5",
      "letter-spacing": "0.3px"
    },
    h5: {
      "font-size": "15px",
      "font-weight": "500",
      color: "#5c6b5e",
      "margin-top": "16px",
      "margin-bottom": "6px",
      "line-height": "1.5",
      "letter-spacing": "0.3px"
    },
    h6: {
      "font-size": "13px",
      "font-weight": "500",
      color: "#5c6b5e",
      "margin-top": "12px",
      "margin-bottom": "4px",
      "line-height": "1.5",
      "letter-spacing": "1px",
      "text-transform": "uppercase"
    },
    p: {
      "font-size": "15px",
      "line-height": "1.8",
      color: "#1c2b1e",
      "margin-top": "0",
      "margin-bottom": "20px",
      "letter-spacing": "0.5px"
    },
    // 有序列表增强：教育内容步骤感
    ul: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "20px" },
    ol: { "padding-left": "24px", "margin-top": "0", "margin-bottom": "20px" },
    li: {
      "margin-bottom": "10px",
      "line-height": "1.75",
      color: "#1c2b1e",
      "letter-spacing": "0.5px"
    },
    blockquote: {
      "border-left": "4px solid #c8d5c9",
      "background-color": "#f5f2ea",
      color: "#5c6b5e",
      "padding-top": "8px",
      "padding-right": "16px",
      "padding-bottom": "8px",
      "padding-left": "16px",
      "margin-top": "0",
      "margin-bottom": "20px",
      "border-radius": "0 10px 10px 0",
      "font-style": "italic"
    },
    table: {
      "border-collapse": "collapse",
      width: "100%",
      "margin-top": "0",
      "margin-bottom": "24px",
      "font-size": "14px",
      "letter-spacing": "0.3px"
    },
    th: {
      "background-color": "#e8e4d8",
      color: "#1c2b1e",
      border: "1px solid #c8d5c9",
      "border-bottom": "2px solid #2e7d32",
      padding: "8px 14px",
      "font-weight": "600",
      "text-align": "left",
      "letter-spacing": "0.3px"
    },
    td: {
      border: "1px solid #c8d5c9",
      padding: "8px 14px",
      color: "#1c2b1e"
    },
    kbd: {
      display: "inline-block",
      "background-color": "#fdfcf7",
      color: "#1c2b1e",
      border: "1px solid #c8d5c9",
      "border-bottom-width": "2px",
      "border-radius": "6px",
      padding: "2px 6px",
      "font-size": "12px",
      "line-height": "1.4",
      "letter-spacing": "0.2px",
      "vertical-align": "middle"
    },
    pre: {
      "padding-top": "14px",
      "padding-right": "16px",
      "padding-bottom": "14px",
      "padding-left": "16px",
      "border-radius": "10px",
      "overflow-x": "auto",
      "white-space": "pre",
      "max-width": "100%",
      "box-sizing": "border-box",
      "margin-top": "0",
      "margin-bottom": "22px",
      "font-size": "13px",
      "line-height": "1.65"
    },
    code: {
      "background-color": "#e8e4d8",
      color: "#1b5e20",
      padding: "1px 5px",
      "border-radius": "5px",
      "font-size": "14px",
      "font-weight": "500",
      "letter-spacing": "0"
    },
    a: {
      color: "#2e7d32",
      "text-decoration": "underline",
      "text-underline-offset": "3px"
    },
    hr: {
      border: "none",
      height: "1px",
      "background-color": "#c8d5c9",
      "margin-top": "28px",
      "margin-bottom": "28px"
    },
    img: {
      "max-width": "100%",
      display: "block",
      "margin-top": "18px",
      "margin-right": "auto",
      "margin-bottom": "18px",
      "margin-left": "auto",
      border: "1px solid #c8d5c9",
      "border-radius": "10px"
    },
    strong: { "font-weight": "700", color: "#1c2b1e" },
    em: { "font-style": "italic", color: "#1c2b1e" }
  },
  // ============================================================
  // 容器视觉
  // ============================================================
  containers: {
    // intro：铜版纸底 + 左 4px 森林绿条 + 大圆角（本文要点/学习目标）
    intro: {
      "background-color": "#f5f2ea",
      "border-left": "4px solid #2e7d32",
      "border-radius": "0 14px 14px 0",
      padding: "16px 20px",
      margin: "22px 0",
      color: "#5c6b5e"
    },
    // author：无底色，底部细线分隔，轻量
    author: {
      __reset: true,
      "background-color": "transparent",
      padding: "8px 0",
      margin: "12px 0",
      color: "#5c6b5e",
      "border-bottom": "1px solid #c8d5c9"
    },
    // cover：温暖铜版纸底，底部浅绿分隔
    cover: {
      "background-color": "#f5f2ea",
      padding: "22px 0 26px",
      margin: "16px 0",
      "border-bottom": "2px solid #2e7d32"
    },
    // 四态 admonition 走 card-shadow variant，外壳样式由 variant 承担
    tip: {},
    warning: {},
    info: {},
    danger: {},
    // quoteCard："今日名言 / 知识要点"，森林绿左条 + 暖底
    quoteCard: {
      "background-color": "#f5f2ea",
      "border-left": "4px solid #2e7d32",
      padding: "16px 20px",
      margin: "22px 0",
      "border-radius": "0 14px 14px 0"
    },
    // highlight："重点提醒"，暖橙左条 + 浅橙底
    highlight: {
      "background-color": "#fdf0e6",
      "border-left": "4px solid #f57c00",
      padding: "14px 20px",
      margin: "20px 0",
      "border-radius": "0 14px 14px 0"
    },
    compare: { margin: "22px 0" },
    // steps：左侧绿色竖线 + 宽 padding（步骤流水线感）
    steps: {
      margin: "22px 0",
      "border-left": "2px solid #2e7d32",
      "padding-left": "24px"
    },
    // sectionTitle：kicker-stack variant 的外壳
    sectionTitle: {
      margin: "36px 0 16px",
      "padding-bottom": "8px",
      "border-bottom": "2px solid #2e7d32"
    },
    // footerCTA：三联 CTA（学/练/问），暖底 + 大圆角
    footerCTA: {
      margin: "28px 0",
      padding: "18px 20px",
      "background-color": "#f5f2ea",
      "border-radius": "14px"
    },
    // recommend：书单推荐，上下绿线分隔
    recommend: {
      __reset: true,
      margin: "26px 0",
      padding: "16px 0",
      "background-color": "transparent",
      "border-top": "2px solid #2e7d32",
      "border-bottom": "1px solid #c8d5c9"
    },
    qrcode: {
      margin: "24px 0",
      padding: "18px",
      "background-color": "#f5f2ea",
      "border-radius": "14px"
    },
    voiceCard: {
      margin: "20px 0",
      padding: "14px 18px",
      "background-color": "#f5f2ea",
      "border-radius": "10px",
      "border": "1px solid #c8d5c9"
    },
    videoCard: {
      margin: "20px 0",
      "border-radius": "10px",
      overflow: "hidden"
    },
    announcement: {
      margin: "20px 0",
      padding: "14px 18px",
      "background-color": "#fce8e8",
      "border-left": "4px solid #b71c1c",
      "border-radius": "0 10px 10px 0"
    },
    authorBio: {
      margin: "20px 0",
      padding: "18px",
      "background-color": "#f5f2ea",
      "border-radius": "14px",
      border: "1px solid #c8d5c9"
    },
    imageCaption: {
      margin: "4px 0 20px 0",
      "text-align": "center",
      "font-size": "12px",
      color: "#5c6b5e",
      "padding-top": "6px",
      "border-top": "1px solid #c8d5c9",
      "letter-spacing": "0.3px"
    },
    timeline: {
      margin: "22px 0",
      "border-left": "2px solid #2e7d32",
      "padding-left": "20px"
    },
    // note：悬挂缩进，中性低调
    note: {
      __reset: true,
      "background-color": "transparent",
      "border-top": "1px dashed #c8d5c9",
      padding: "10px 0 4px 0",
      margin: "20px 0",
      "border-radius": "0"
    },
    abstract: {
      "background-color": "#f5f2ea",
      "border-left": "4px solid #2e7d32",
      "border-radius": "0 14px 14px 0",
      padding: "16px 20px",
      margin: "22px 0"
    },
    keyNumber: {
      margin: "22px 0",
      padding: "18px 20px",
      "background-color": "#f5f2ea",
      "border-radius": "14px",
      "text-align": "center"
    },
    // dialogue：问答课堂核心，轻底色区分问与答
    dialogue: {
      margin: "22px 0"
    },
    pullQuote: {
      margin: "28px 0",
      "text-align": "center"
    },
    tableCard: {
      margin: "22px 0",
      "border-radius": "10px",
      overflow: "hidden"
    },
    gallery: {
      margin: "22px 0"
    },
    footnotes: {
      margin: "24px 0",
      padding: "14px 0",
      "border-top": "1px solid #c8d5c9",
      "font-size": "13px",
      color: "#5c6b5e"
    },
    colophon: {
      margin: "24px 0",
      padding: "14px 0",
      "border-top": "2px solid #2e7d32",
      color: "#5c6b5e",
      "font-size": "12px"
    },
    // data-brief 家族（教育内容偶尔用到）
    masthead: {
      margin: "0 0 24px 0",
      padding: "14px 0",
      "border-bottom": "2px solid #2e7d32"
    },
    sectionTag: {
      display: "inline-block",
      "background-color": "#2e7d32",
      color: "#fefefe",
      padding: "2px 10px",
      "border-radius": "12px",
      "font-size": "12px",
      "letter-spacing": "0.5px"
    },
    byline: {
      margin: "12px 0",
      padding: "8px 0",
      "border-bottom": "1px solid #c8d5c9",
      color: "#5c6b5e",
      "font-size": "13px"
    },
    editorialHeader: {
      margin: "20px 0",
      padding: "20px 0"
    },
    toc: {
      margin: "20px 0",
      padding: "16px 18px",
      "background-color": "#f5f2ea",
      "border-radius": "14px",
      border: "1px solid #c8d5c9"
    },
    kpiDashboard: {
      margin: "20px 0",
      padding: "16px",
      "background-color": "#f5f2ea",
      "border-radius": "14px"
    },
    barChart: {
      margin: "20px 0"
    },
    qaBlock: {
      margin: "20px 0",
      padding: "16px 18px",
      "background-color": "#f5f2ea",
      // P3.3：去掉课堂主题原本的 14px 大圆角——variant 派发后 numbered-faq
      // 的视觉骨架（Q.NN 序号 + 底线分隔）属"教辅卡片"语境，圆角会冲淡严肃感
      "border-radius": "0"
    }
  },
  // ============================================================
  // 主题 kicker 覆盖（教育友好语言）。ThemeKickers 是**容器**级 kicker
  // （toc/qaBlock/recommend/footerCTATitle/colophon），不含 admonition kind 标签。
  // admonition tip/warning 文案由作者侧 `::: tip <text>` 现写决定。
  // 本主题暂无容器级 kicker 需要覆盖；保留空对象做 voice 占位。
  // ============================================================
  kickers: {},
  // ============================================================
  // 模板片段
  // ============================================================
  templates: {
    tip: `::: tip 小贴士
在这里写一句提醒读者的经验法则或记忆方法。
:::
`,
    cover: `::: cover 课题名称
本节核心问题或一句立意。

**适合年龄：** \`8岁以上\` **难度：** \`★★☆\`

_预计阅读 8 分钟 · 家长可与孩子共读_
:::
`,
    steps: `::: steps 操作步骤
### 第一步

写清楚要做什么。

### 第二步

继续下一个动作。
:::
`
  },
  // ============================================================
  // 签名容器（教育核心）
  // ============================================================
  signatureContainers: ["steps", "tip", "info", "recommend", "dialogue", "announcement", "intro"],
  svgVariant: "soft",
  meta: {
    createdAt: "2026-05-17",
    ownerNotes: "orphan 升级：admonition=card-shadow / tableCard=zebra-rows / note=smallcaps-kicker(layout=hanging)。primary #2e7d32 森林绿，accent #f57c00 暖橙，bg #fdfcf7 铜版纸。introDropcap 轻量化（primary 42px），steps 绿色竖线，highlight 马克笔暖黄底。"
  }
};
const ALL_SPECS = [
  spec$h,
  spec$g,
  spec$f,
  spec$e,
  spec$d,
  spec$c,
  spec$b,
  spec$a,
  spec$9,
  spec$8,
  spec$7,
  spec$6,
  spec$5,
  spec$4,
  spec$3,
  spec$2,
  spec$1,
  spec
];
const DISPLAY_ORDER = [
  "default",
  // 技术档
  "tech-geek",
  "tech-explainer",
  // 商业/数据档
  "business-finance",
  "data-brief",
  "industry-observer",
  "commerce-pulse",
  // 人文档
  "literary-humanism",
  "people-story",
  "editorial-mook",
  "late-night-vinyl",
  // 生活/教育档
  "life-aesthetic",
  "edu-classroom",
  // 学术/严肃档
  "academic-frontier",
  "official-gazette",
  // 设计/实验档
  "swiss-grid",
  "brutalist",
  // 青年/亚文化档
  "youth-zine"
];
function order(arr, priority) {
  const raw = {};
  for (const x of arr) raw[x.id] = x;
  const out = [];
  for (const id of priority) if (raw[id]) out.push(raw[id]);
  for (const id of Object.keys(raw).sort()) if (!priority.includes(id)) out.push(raw[id]);
  return out;
}
const ORDERED_SPECS = Object.freeze(order(ALL_SPECS, DISPLAY_ORDER));
const SPEC_REGISTRY = Object.freeze(
  Object.fromEntries(ORDERED_SPECS.map((s) => [s.id, s]))
);
const themeList = Object.freeze(ORDERED_SPECS.map((s) => specToTheme(s)));
const themeRegistry = Object.freeze(
  Object.fromEntries(themeList.map((t) => [t.id, t]))
);
function orderDefsByKind(defs, kind, order2) {
  const bucket = defs.filter((d) => d.meta.kind === kind);
  const byId = new Map(bucket.map((d) => [d.meta.id, d]));
  const ordered = [];
  for (const id of order2) {
    const def = byId.get(id);
    if (def) {
      ordered.push(def);
      byId.delete(id);
    }
  }
  for (const id of [...byId.keys()].sort()) ordered.push(byId.get(id));
  return ordered;
}
const THUMB_DEFAULTS = {
  accent: "#2d6fdd",
  soft: "#eef4ff",
  text: "#6a737d"
};
function mergeThumb(a) {
  return { ...THUMB_DEFAULTS, ...a };
}
function svg(inner) {
  return '<svg viewBox="0 0 75 75" width="75" height="75" xmlns="http://www.w3.org/2000/svg">' + inner + "</svg>";
}
const tokenSchema$3 = {
  "accent-color": {
    type: "color",
    label: "主色",
    default: "inherit",
    hint: "默认跟随主题的 status 色对（四态各异）"
  },
  "soft-bg": {
    type: "color",
    label: "浅底色",
    default: "inherit",
    hint: "默认跟随主题的 status 浅底（四态各异）"
  }
};
function thumb$2g(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="12" fill="${soft}"/><rect x="59" y="51" width="10" height="10" fill="${soft}"/><rect x="6" y="14" width="63" height="3" fill="${accent}"/><rect x="16" y="24" width="30" height="3" fill="${accent}"/><rect x="16" y="34" width="46" height="2" fill="#c0c6cf"/><rect x="16" y="41" width="40" height="2" fill="#c0c6cf"/><rect x="16" y="48" width="32" height="2" fill="#c0c6cf"/>`
  );
}
function renderForKind(kind, pair, bg, padY, padX, radius) {
  const accentVar = `var(--uv-accent-color, ${pair.accent})`;
  const softVar = `var(--uv-soft-bg, ${pair.soft})`;
  if (kind === "tip") {
    return {
      wrapperCSS: `background-color:${softVar};padding:${padY}px ${padX}px;border-radius:${radius * 4}px ${radius}px ${radius * 4}px ${radius}px;box-shadow:0 2px 6px rgba(0,0,0,0.04);margin:16px 0`,
      titleCSS: `font-size:14px;font-weight:700;color:${accentVar};margin-bottom:6px;letter-spacing:0.3px`
    };
  }
  if (kind === "warning") {
    return {
      wrapperCSS: `background-color:${softVar};border-top:1px dashed ${accentVar};border-bottom:2px solid ${accentVar};padding:${padY}px ${padX}px;border-radius:0 ${radius * 3}px 0 ${radius * 3}px;margin:16px 0`,
      titleCSS: `font-size:14px;font-weight:700;color:${accentVar};margin-bottom:6px;letter-spacing:1px`
    };
  }
  if (kind === "info") {
    return {
      wrapperCSS: `background-color:${bg};border:1px solid ${softVar};box-shadow:inset 0 2px 0 ${accentVar}, 0 1px 3px rgba(0,0,0,0.03);padding:${padY + 2}px ${padX}px ${padY}px;border-radius:${radius * 2}px;margin:18px 0`,
      titleCSS: `font-size:14px;font-weight:700;color:${accentVar};margin-bottom:6px;letter-spacing:0.3px`
    };
  }
  return {
    wrapperCSS: `background-color:${softVar};border:1px solid ${accentVar};border-top:8px solid ${accentVar};padding:${padY}px ${padX}px;border-radius:0;margin:18px 0`,
    titleCSS: `font-size:14px;font-weight:800;color:${accentVar};margin-bottom:6px;letter-spacing:1.5px;text-transform:uppercase`
  };
}
const accentBar = {
  meta: {
    id: "accent-bar",
    kind: "admonition",
    name: "差异皮肤",
    description: "四态各具形态：气泡/警戒带/卡片浮起/硬边紧迫"
  },
  thumbnail: thumb$2g,
  tokenSchema: tokenSchema$3,
  snippets: [
    {
      presetId: "ad-tip-accent-bar",
      name: "差异皮肤 Tip",
      description: "气泡式不对称圆角 + soft 底，轻盈引导",
      admonitionKind: "tip",
      thumbArgs: { accent: "#1a8450", soft: "#eef7f0" },
      markdown: "::: tip 小贴士 variant=accent-bar\n正文内容\n:::\n"
    },
    {
      presetId: "ad-warning-accent-bar",
      name: "差异皮肤 Warning",
      description: "上虚下实双警戒带 + 斜切圆角",
      admonitionKind: "warning",
      thumbArgs: { accent: "#b7791f", soft: "#fdf6e3" },
      markdown: "::: warning 注意 variant=accent-bar\n正文内容\n:::\n"
    },
    {
      presetId: "ad-info-accent-bar",
      name: "差异皮肤 Info",
      description: "白底卡片 + 顶端 inset 主色 + 柔阴影",
      admonitionKind: "info",
      thumbArgs: { accent: "#1a73e8", soft: "#eef4ff" },
      markdown: "::: info 说明 variant=accent-bar\n正文内容\n:::\n"
    },
    {
      presetId: "ad-danger-accent-bar",
      name: "差异皮肤 Danger",
      description: "顶 8px 实条 + 全边框零圆角，硬紧迫",
      admonitionKind: "danger",
      thumbArgs: { accent: "#b42318", soft: "#fdecea" },
      markdown: "::: danger 警告 variant=accent-bar\n正文内容\n:::\n"
    }
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind];
    const bg = ctx.tokens.colors.bg;
    const radius = ctx.tokens.radius.sm;
    const padY = Math.max(10, Math.round(ctx.tokens.spacing.containerPadding * 0.75));
    const padX = ctx.tokens.spacing.containerPadding;
    return renderForKind(kind, pair, bg, padY, padX, radius);
  }
};
function thumb$2f(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="20" width="63" height="45" rx="4" fill="${soft}" stroke="${accent}" stroke-width="1"/><rect x="14" y="14" width="28" height="14" rx="7" fill="${accent}"/><rect x="14" y="38" width="46" height="2" fill="#c0c6cf"/><rect x="14" y="46" width="40" height="2" fill="#c0c6cf"/><rect x="14" y="54" width="32" height="2" fill="#c0c6cf"/>`
  );
}
const pillTag = {
  meta: {
    id: "pill-tag",
    kind: "admonition",
    name: "悬浮胶囊",
    description: "顶部胶囊标签 + 外框，文字有视觉重心"
  },
  thumbnail: thumb$2f,
  snippets: [
    {
      presetId: "ad-tip-pill-tag",
      name: "悬浮胶囊 Tip",
      description: "顶部胶囊标签，文字有视觉重心",
      admonitionKind: "tip",
      thumbArgs: { accent: "#1a8450", soft: "#eef7f0" },
      markdown: "::: tip 核心提示 variant=pill-tag\n正文内容\n:::\n"
    },
    {
      presetId: "ad-info-pill-tag",
      name: "悬浮胶囊 Info",
      description: "浅底 + 深色描边，告示板感",
      admonitionKind: "info",
      thumbArgs: { accent: "#1a73e8", soft: "#eef4ff" },
      markdown: "::: info 背景说明 variant=pill-tag\n正文内容\n:::\n"
    }
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind];
    const padY = ctx.tokens.spacing.containerPadding;
    const padX = ctx.tokens.spacing.containerPadding;
    return {
      wrapperCSS: `background-color:${pair.soft};border:1px solid ${pair.accent};padding:${padY + 8}px ${padX}px ${padY}px;border-radius:6px;margin:24px 0 16px`,
      // 胶囊保持靠左悬浮（不动 wrapper text-align）；text-align:center 让胶囊内
      // 的文字居中——胶囊的 padding 是水平对称的，text 也就视觉居中。
      // suppressIcon=true：admonition kindIcon 与胶囊底色同为 accent，渲染出来不可见
      // 却把文字向右挤偏；这里抑制掉，让胶囊纯粹是"底色 + 居中文字"。
      titleCSS: `display:inline-block;padding:3px 14px;background-color:${pair.accent};color:${ctx.tokens.colors.textInverse};border-radius:12px;font-size:13px;font-weight:700;margin-top:-${padY + 18}px;margin-bottom:10px;letter-spacing:0.4px;text-align:center`,
      suppressIcon: true
    };
  }
};
function thumb$2e(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="16" width="59" height="47" rx="4" fill="#fafafa"/><rect x="8" y="16" width="59" height="2" fill="${accent}"/><rect x="8" y="63" width="59" height="2" fill="rgba(0,0,0,0.08)"/><rect x="16" y="26" width="30" height="3" fill="${accent}"/><rect x="16" y="36" width="42" height="2" fill="#c0c6cf"/><rect x="16" y="44" width="36" height="2" fill="#c0c6cf"/>`
  );
}
const cardShadow = {
  meta: {
    id: "card-shadow",
    kind: "admonition",
    name: "悬浮卡",
    description: "白底 + 顶部色条 + 单层柔和阴影"
  },
  thumbnail: thumb$2e,
  snippets: [
    {
      presetId: "ad-info-card-shadow",
      name: "悬浮卡 Info",
      description: "白底 + 顶部色条 + 柔阴影",
      admonitionKind: "info",
      thumbArgs: { accent: "#1a73e8" },
      markdown: "::: info 提示 variant=card-shadow\n正文内容\n:::\n"
    },
    {
      presetId: "ad-tip-card-shadow",
      name: "悬浮卡 Tip",
      description: "卡片化，适合重点提示",
      admonitionKind: "tip",
      thumbArgs: { accent: "#1a8450" },
      markdown: "::: tip 核心观点 variant=card-shadow\n正文内容\n:::\n"
    }
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind];
    const pad = ctx.tokens.spacing.containerPadding;
    return {
      wrapperCSS: `background-color:${ctx.tokens.colors.bg};border-top:2px solid ${pair.accent};padding:${pad}px;margin:18px 0;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.06)`,
      titleCSS: `font-weight:700;color:${pair.accent};margin-bottom:8px;font-size:15px`
    };
  }
};
function escAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escText(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function thumb$2d() {
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="4" fill="#1f2937"/><rect x="6" y="14" width="63" height="11" fill="#2d3748"/><circle cx="12" cy="20" r="1.8" fill="#ff5f56"/><circle cx="18" cy="20" r="1.8" fill="#ffbd2e"/><circle cx="24" cy="20" r="1.8" fill="#27c93f"/><rect x="12" y="34" width="36" height="2" fill="#9ca3af"/><rect x="12" y="42" width="46" height="2" fill="#9ca3af"/><rect x="12" y="50" width="28" height="2" fill="#9ca3af"/>`
  );
}
const TRAFFIC_LIGHTS = '<svg viewBox="0 0 54 14" width="42" height="11" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:10px"><circle cx="7" cy="7" r="5" fill="#ff5f56"/><circle cx="22" cy="7" r="5" fill="#ffbd2e"/><circle cx="37" cy="7" r="5" fill="#27c93f"/></svg>';
const DEFAULT_TITLES$1 = {
  tip: "tip",
  warning: "warning",
  info: "info",
  danger: "error"
};
const terminal = {
  meta: {
    id: "terminal",
    kind: "admonition",
    name: "终端窗口",
    description: "黑底 + 三色圆点，代码讲解专用",
    designedFor: ["tech-geek", "default"]
  },
  thumbnail: thumb$2d,
  snippets: [
    {
      presetId: "ad-tip-terminal",
      name: "终端 Tip",
      description: "黑底 + 三色圆点，代码讲解专用",
      admonitionKind: "tip",
      designedFor: ["tech-geek", "default"],
      markdown: "::: tip $ 执行这行 variant=terminal\n内容会渲染成终端风格\n:::\n"
    },
    {
      presetId: "ad-info-terminal",
      name: "终端 Info",
      description: "命令日志类信息",
      admonitionKind: "info",
      designedFor: ["tech-geek"],
      markdown: "::: info $ deploy.sh variant=terminal\n2026-04-19 success\n:::\n"
    }
  ],
  render: (ctx, { kind }) => {
    const title = ctx.info.trim() || DEFAULT_TITLES$1[kind] || kind;
    return {
      wrapperCSS: `background-color:#1f2937;padding:0;margin:18px 0;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.18)`,
      titleCSS: "",
      bodyCSS: `color:#e5e7eb;padding:14px 16px;font-size:14px;line-height:1.7;border-radius:0 0 6px 6px`,
      svgSlot: '<section style="background-color:#2d3748;padding:8px 14px;border-bottom:1px solid #111827;border-radius:6px 6px 0 0;color:#e5e7eb;font-weight:600;font-size:13px;letter-spacing:0.4px">' + TRAFFIC_LIGHTS + escText(title) + "</section>"
    };
  }
};
function thumb$2c(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/><line x1="7" y1="15" x2="7" y2="60" stroke="${accent}" stroke-width="2" stroke-dasharray="3 2"/><rect x="16" y="22" width="30" height="3" fill="${accent}"/><rect x="16" y="32" width="46" height="2" fill="#c0c6cf"/><rect x="16" y="39" width="40" height="2" fill="#c0c6cf"/><rect x="16" y="46" width="32" height="2" fill="#c0c6cf"/>`
  );
}
const dashedBorder = {
  meta: {
    id: "dashed-border",
    kind: "admonition",
    name: "虚线框",
    description: '左 2px 虚线 + 浅底，工程写作"附注"感',
    designedFor: ["tech-geek"]
  },
  thumbnail: thumb$2c,
  snippets: [
    {
      presetId: "ad-tip-dashed-border",
      name: "虚线框 Tip",
      description: '左 2px 虚线 + 浅底，工程写作"附注"感',
      admonitionKind: "tip",
      thumbArgs: { accent: "#a8c08a", soft: "#1e1f16" },
      markdown: "::: tip // NOTE variant=dashed-border\n这是一条工程附注。\n:::\n"
    }
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind];
    const radius = ctx.tokens.radius.sm;
    const padY = Math.max(10, Math.round(ctx.tokens.spacing.containerPadding * 0.75));
    const padX = ctx.tokens.spacing.containerPadding;
    return {
      wrapperCSS: `background-color:${pair.soft};border-left:2px dashed ${pair.accent};padding:${padY}px ${padX}px;border-radius:0 ${radius}px ${radius}px 0;margin:16px 0`,
      titleCSS: `font-size:14px;font-weight:600;color:${pair.accent};margin-bottom:6px;letter-spacing:1px`
    };
  }
};
function thumb$2b(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="16" width="63" height="43" fill="${soft}"/><rect x="6" y="16" width="63" height="1.5" fill="${accent}"/><rect x="6" y="57.5" width="63" height="1.5" fill="${accent}"/><rect x="14" y="24" width="30" height="3" fill="${accent}"/><rect x="14" y="34" width="46" height="2" fill="#c0c6cf"/><rect x="14" y="42" width="38" height="2" fill="#c0c6cf"/><rect x="14" y="50" width="32" height="2" fill="#c0c6cf"/>`
  );
}
const topBottomRule = {
  meta: {
    id: "top-bottom-rule",
    kind: "admonition",
    name: "上下线",
    description: "顶底 1px 实线，像报纸 errata 勘误条",
    designedFor: ["tech-geek", "official-gazette"]
  },
  thumbnail: thumb$2b,
  snippets: [
    {
      presetId: "ad-danger-top-bottom-rule",
      name: "上下线 Danger",
      description: "顶底 1px 实线，像报纸 errata 勘误条",
      admonitionKind: "danger",
      thumbArgs: { accent: "#c85a3a", soft: "#1f1612" },
      markdown: "::: danger // PITFALL variant=top-bottom-rule\n这是一个典型陷阱。\n:::\n"
    }
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind];
    const padX = ctx.tokens.spacing.containerPadding;
    return {
      wrapperCSS: `background-color:${pair.soft};border-top:1px solid ${pair.accent};border-bottom:1px solid ${pair.accent};padding:14px ${padX}px;margin:18px 0`,
      titleCSS: `font-size:14px;font-weight:600;color:${pair.accent};margin-bottom:8px;letter-spacing:1.2px`
    };
  }
};
const KIND_TAG$1 = {
  tip: "NOTE",
  warning: "CAVEAT",
  info: "SEE ALSO",
  danger: "PITFALL"
};
function thumb$2a(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="4" y="14" width="67" height="47" fill="${soft}"/><rect x="4" y="14" width="67" height="1.5" fill="${accent}"/><rect x="4" y="59.5" width="67" height="1.5" fill="${accent}"/><rect x="4" y="20" width="67" height="9" fill="#0a0807"/><rect x="10" y="23" width="18" height="3" fill="${accent}"/><rect x="10" y="36" width="48" height="2" fill="#c0c6cf"/><rect x="10" y="43" width="42" height="2" fill="#c0c6cf"/><rect x="10" y="50" width="36" height="2" fill="#c0c6cf"/>`
  );
}
const manpageLog = {
  meta: {
    id: "manpage-log",
    kind: "admonition",
    name: "manpage 输出",
    description: "顶底分隔线 + 状态标签条，终端日志输出感",
    designedFor: ["tech-geek"]
  },
  thumbnail: thumb$2a,
  snippets: [
    {
      presetId: "ad-tip-manpage-log",
      name: "manpage NOTE",
      description: "工程附注，日志输出块",
      admonitionKind: "tip",
      thumbArgs: { accent: "#a8c08a", soft: "#1e1f16" },
      markdown: "::: tip 这是一条工程附注 variant=manpage-log\n正文会以日志输出的形式贴在状态条下方。\n:::\n"
    },
    {
      presetId: "ad-warning-manpage-log",
      name: "manpage CAVEAT",
      description: "告诫，橙色状态条",
      admonitionKind: "warning",
      thumbArgs: { accent: "#e06a28", soft: "#1e1a14" },
      markdown: "::: warning 这行会改全局状态 variant=manpage-log\n谨慎使用。\n:::\n"
    },
    {
      presetId: "ad-danger-manpage-log",
      name: "manpage PITFALL",
      description: "典型陷阱",
      admonitionKind: "danger",
      thumbArgs: { accent: "#c85a3a", soft: "#1f1612" },
      markdown: "::: danger 典型陷阱 variant=manpage-log\n某个 edge case 下会炸栈。\n:::\n"
    }
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind];
    const padX = ctx.tokens.spacing.containerPadding;
    const tag = KIND_TAG$1[kind] ?? kind.toUpperCase();
    const title = ctx.info.trim();
    const labelHtml = `<section style="background-color:${ctx.tokens.colors.bg};padding:6px ${padX}px;color:${pair.accent};font-size:13px;font-weight:600;letter-spacing:2px;border-bottom:1px solid ${ctx.tokens.colors.border}">:: ${escText(tag)} ::` + (title ? `<span style="color:${ctx.tokens.colors.textMuted};font-weight:500;letter-spacing:0.6px;margin-left:10px;text-transform:none">` + escText(title) + "</span>" : "") + "</section>";
    return {
      wrapperCSS: `background-color:${pair.soft};border-top:1px solid ${pair.accent};border-bottom:1px solid ${pair.accent};padding:0;margin:20px 0;border-radius:0;box-shadow:inset -14px 0 10px -10px rgba(0,0,0,0.35)`,
      titleCSS: "",
      bodyCSS: `color:${ctx.tokens.colors.text};padding:12px ${padX}px 14px;font-size:14px;line-height:1.8;letter-spacing:0.6px`,
      svgSlot: labelHtml
    };
  }
};
const KIND_LABEL$3 = {
  tip: "DEFINITION",
  warning: "REMARK",
  info: "LEMMA",
  danger: "CAVEAT"
};
function thumb$29(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="none" stroke="${accent}" stroke-width="1"/><rect x="12" y="20" width="34" height="3" fill="${accent}"/><rect x="12" y="30" width="46" height="2" fill="#c0c6cf"/><rect x="12" y="37" width="40" height="2" fill="#c0c6cf"/><rect x="12" y="44" width="44" height="2" fill="#c0c6cf"/><rect x="12" y="51" width="36" height="2" fill="#c0c6cf"/>`
  );
}
const sidenoteLatex = {
  meta: {
    id: "sidenote-latex",
    kind: "admonition",
    name: "LaTeX 旁注",
    description: "细边框 + 小型大写标题，LaTeX 定理框语汇",
    designedFor: ["academic-frontier"]
  },
  thumbnail: thumb$29,
  snippets: [
    {
      presetId: "ad-tip-sidenote-latex",
      name: "旁注 Definition",
      description: "\\begin{definition} 风格",
      admonitionKind: "tip",
      thumbArgs: { accent: "#1e2c4a", soft: "#f3f4f7" },
      markdown: "::: tip 最小生成树 variant=sidenote-latex\n连通图中权和最小的生成子树。\n:::\n"
    },
    {
      presetId: "ad-info-sidenote-latex",
      name: "旁注 Lemma",
      description: "\\begin{lemma} 风格",
      admonitionKind: "info",
      thumbArgs: { accent: "#4a5670", soft: "#f1f2f4" },
      markdown: "::: info 引理 variant=sidenote-latex\n若 A 则 B。\n:::\n"
    }
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind];
    const padX = ctx.tokens.spacing.containerPadding;
    const label = KIND_LABEL$3[kind] ?? kind.toUpperCase();
    const title = ctx.info.trim();
    const labelHtml = `<section style="padding:10px ${padX}px 0;font-size:13px;color:${pair.accent};letter-spacing:2px;font-weight:700;text-transform:uppercase;line-height:1.6">` + escText(label) + "." + (title ? `<span style="color:${ctx.tokens.colors.text};text-transform:none;letter-spacing:0.3px;font-weight:600;margin-left:10px">` + escText(title) + "</span>" : "") + "</section>";
    return {
      wrapperCSS: `border:1px solid ${pair.accent};padding:0 0 10px;margin:18px 0;border-radius:0;background-color:transparent`,
      titleCSS: "",
      bodyCSS: `padding:6px ${padX}px 0;color:${ctx.tokens.colors.text};font-size:14px;line-height:1.75`,
      svgSlot: labelHtml
    };
  }
};
const KIND_MARK = {
  tip: "按",
  warning: "疑",
  info: "注",
  danger: "辨"
};
function thumb$28(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    // 无边框无底——只有行首【按】方框 + 几行文本
    `<rect x="10" y="20" width="3" height="12" fill="${accent}"/><rect x="10" y="20" width="14" height="3" fill="${accent}"/><rect x="21" y="20" width="3" height="12" fill="${accent}"/><rect x="10" y="29" width="14" height="3" fill="${accent}"/><rect x="28" y="22" width="20" height="3" fill="${accent}"/><rect x="10" y="40" width="54" height="2" fill="#c0c6cf"/><rect x="10" y="47" width="46" height="2" fill="#c0c6cf"/><rect x="10" y="54" width="50" height="2" fill="#c0c6cf"/>`
  );
}
const marginalia = {
  meta: {
    id: "marginalia",
    kind: "admonition",
    name: "书页批注",
    description: "无框、墨色一色；靠【按】【疑】【注】【辨】符号区分类型",
    designedFor: ["literary-humanism"]
  },
  thumbnail: thumb$28,
  snippets: [
    {
      presetId: "ad-tip-marginalia",
      name: "批注【按】",
      description: "按语体—作者点评延伸",
      admonitionKind: "tip",
      thumbArgs: { accent: "#4a4a42" },
      markdown: "::: tip 此处另有一解 variant=marginalia\n顾千里批云：此说出于误读，当另辨之。\n:::\n"
    },
    {
      presetId: "ad-info-marginalia",
      name: "批注【注】",
      description: "注释体—背景出处",
      admonitionKind: "info",
      thumbArgs: { accent: "#4a4a42" },
      markdown: "::: info 原文出处 variant=marginalia\n语见《庄子·秋水》，郭象注。\n:::\n"
    }
  ],
  render: (ctx, { kind }) => {
    const ink = ctx.tokens.colors.secondary;
    const muted = ctx.tokens.colors.textMuted;
    const mark = KIND_MARK[kind] ?? "按";
    const userTitle = ctx.info.trim();
    const titleSpan = userTitle.length > 0 ? `<span style="color:${muted};font-weight:500;letter-spacing:0.6px;margin-left:6px">` + escText(userTitle) + "</span>" : "";
    const labelHtml = `<section style="color:${ink};font-size:15px;line-height:1.7;margin-bottom:4px;letter-spacing:1px;font-weight:600">【${escText(mark)}】` + titleSpan + "</section>";
    return {
      wrapperCSS: `background-color:transparent;padding:4px 0 4px 28px;margin:16px 0;border:none;border-radius:0`,
      titleCSS: "",
      bodyCSS: `color:${muted};font-size:14px;line-height:1.8;letter-spacing:0.4px`,
      svgSlot: labelHtml
    };
  }
};
const KIND_LABEL$2 = {
  tip: "要点 · KEY",
  warning: "风险 · RISK",
  info: "披露 · DISCLOSURE",
  danger: "异常 · ALERT"
};
function thumb$27(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="5" y="14" width="65" height="47" fill="${soft}" stroke="${accent}" stroke-width="1"/><rect x="5" y="14" width="65" height="11" fill="${accent}"/><rect x="11" y="18" width="24" height="3" fill="#fefefe"/><rect x="44" y="18" width="20" height="3" fill="#fefefe"/><rect x="11" y="32" width="52" height="2" fill="#4a5a6a"/><rect x="11" y="39" width="44" height="2" fill="#4a5a6a"/><rect x="11" y="46" width="50" height="2" fill="#4a5a6a"/><rect x="11" y="53" width="38" height="2" fill="#4a5a6a"/>`
  );
}
const ledgerCell = {
  meta: {
    id: "ledger-cell",
    kind: "admonition",
    name: "账本单元",
    description: "深色表头条 + 硬边框，Bloomberg Terminal 数据感",
    designedFor: ["business-finance"]
  },
  thumbnail: thumb$27,
  snippets: [
    {
      presetId: "ad-tip-ledger-cell",
      name: "账本 · 要点",
      description: "研究所 KEY 行",
      admonitionKind: "tip",
      thumbArgs: { accent: "#1f4f6b", soft: "#dfe8ee" },
      markdown: "::: tip Q3 净利同比 +18% variant=ledger-cell\n主要由高端机型 ASP 抬升驱动。\n:::\n"
    },
    {
      presetId: "ad-warning-ledger-cell",
      name: "账本 · 风险",
      description: "研究所 RISK 行",
      admonitionKind: "warning",
      thumbArgs: { accent: "#7e5a12", soft: "#f1e8d1" },
      markdown: "::: warning 供应链集中度 variant=ledger-cell\n前五大供应商占比超 60%。\n:::\n"
    }
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind];
    const padX = ctx.tokens.spacing.containerPadding;
    const labelPrefix = KIND_LABEL$2[kind] ?? kind.toUpperCase();
    const title = ctx.info.trim();
    const headerHtml = `<section style="background-color:${pair.accent};color:${ctx.tokens.colors.textInverse};padding:6px ${padX}px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;line-height:1.4">` + escText(labelPrefix) + (title ? `<span style="margin-left:10px;letter-spacing:0.4px;text-transform:none;font-weight:600;opacity:0.92">· ` + escText(title) + "</span>" : "") + "</section>";
    return {
      wrapperCSS: `background-color:${pair.soft};border:1px solid ${pair.accent};padding:0;margin:20px 0;border-radius:0`,
      titleCSS: "",
      bodyCSS: `color:${ctx.tokens.colors.text};padding:10px ${padX}px 12px;font-size:14px;line-height:1.7;letter-spacing:0.3px`,
      svgSlot: headerHtml
    };
  }
};
function thumb$26(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="14" fill="${soft}"/><rect x="9" y="20" width="3" height="36" rx="1.5" fill="${accent}"/><circle cx="18" cy="24" r="2.4" fill="${accent}"/><rect x="24" y="22" width="22" height="3" rx="1" fill="${accent}"/><rect x="16" y="34" width="44" height="2" rx="1" fill="#c0c6cf"/><rect x="16" y="42" width="38" height="2" rx="1" fill="#c0c6cf"/><rect x="16" y="50" width="30" height="2" rx="1" fill="#c0c6cf"/>`
  );
}
const bubbleOrganic = {
  meta: {
    id: "bubble-organic",
    kind: "admonition",
    name: "有机气泡",
    description: "大圆角 + 软阴影侧边，手绘信笺气质",
    designedFor: ["life-aesthetic"]
  },
  thumbnail: thumb$26,
  snippets: [
    {
      presetId: "ad-tip-bubble-organic",
      name: "气泡 · 心得",
      description: "圆角柔暖，生活笔记口吻",
      admonitionKind: "tip",
      thumbArgs: { accent: "#7ba05b", soft: "#eef3e4" },
      markdown: "::: tip 今日小发现 variant=bubble-organic\n换用陶壶冲茶，水温下降更慢。\n:::\n"
    },
    {
      presetId: "ad-info-bubble-organic",
      name: "气泡 · 拾遗",
      description: "补注 / 参考",
      admonitionKind: "info",
      thumbArgs: { accent: "#5b88a8", soft: "#e6edf3" },
      markdown: "::: info 配乐推荐 variant=bubble-organic\n坂本龙一·Async。\n:::\n"
    }
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind];
    const padX = ctx.tokens.spacing.containerPadding + 2;
    const padY = Math.max(14, ctx.tokens.spacing.containerPadding);
    return {
      wrapperCSS: `background-color:${pair.soft};padding:${padY}px ${padX}px;margin:20px 0;border-radius:18px;box-shadow:inset 4px 0 0 ${pair.accent}, 0 4px 14px rgba(0,0,0,0.05)`,
      titleCSS: `font-size:15px;font-weight:700;color:${pair.accent};margin-bottom:8px;letter-spacing:0.4px`
    };
  }
};
const KIND_LABEL$1 = {
  tip: "采访手记",
  warning: "背景",
  info: "资料",
  danger: "存疑"
};
function thumb$25(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="22" width="59" height="1.5" fill="${accent}"/><rect x="8" y="55" width="59" height="1.5" fill="${accent}"/><rect x="20" y="17" width="26" height="11" fill="#fefefe"/><rect x="24" y="21" width="18" height="3" fill="${accent}"/><rect x="12" y="34" width="52" height="2" fill="#c0c6cf"/><rect x="12" y="41" width="46" height="2" fill="#c0c6cf"/><rect x="12" y="48" width="48" height="2" fill="#c0c6cf"/>`
  );
}
const magazinePull = {
  meta: {
    id: "magazine-pull",
    kind: "admonition",
    name: "杂志拉引框",
    description: "上下细线 + 浮空小字标签，《人物》特稿气质",
    designedFor: ["people-story"]
  },
  thumbnail: thumb$25,
  snippets: [
    {
      presetId: "ad-tip-magazine-pull",
      name: "拉引 · 采访手记",
      description: "记者第一人称旁白",
      admonitionKind: "tip",
      thumbArgs: { accent: "#4a6a7a" },
      markdown: "::: tip 采访手记 variant=magazine-pull\n他在说这句话的时候下意识摸了摸左手腕——那里曾戴过一块表。\n:::\n"
    },
    {
      presetId: "ad-info-magazine-pull",
      name: "拉引 · 背景",
      description: "新闻背景/资料补充",
      admonitionKind: "info",
      thumbArgs: { accent: "#556170" },
      markdown: "::: info 背景 variant=magazine-pull\n这家公司在 2019 年曾申请破产重整。\n:::\n"
    }
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind];
    const padX = ctx.tokens.spacing.containerPadding;
    const label = ctx.info.trim() || KIND_LABEL$1[kind] || "";
    const pageBg = ctx.tokens.colors.bg;
    const labelHtml = label ? `<section style="text-align:left"><span style="display:inline-block;margin-top:-9px;margin-left:${padX}px;padding:0 10px;background-color:${pageBg};color:${pair.accent};font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;line-height:1.5">` + escText(label) + "</span></section>" : "";
    return {
      wrapperCSS: `background-color:transparent;border-top:1px solid ${pair.accent};border-bottom:1px solid ${pair.accent};padding:0 0 14px;margin:24px 0;border-radius:0`,
      titleCSS: "",
      bodyCSS: `color:${ctx.tokens.colors.text};padding:14px ${padX}px 0;font-size:15px;line-height:1.9;letter-spacing:0.3px`,
      svgSlot: labelHtml
    };
  }
};
const KIND_TAG = {
  tip: "要点",
  warning: "风险",
  info: "背景",
  danger: "警示"
};
function thumb$24(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/><rect x="6" y="14" width="63" height="3" fill="${accent}"/><rect x="6" y="59" width="63" height="1.5" fill="${accent}"/><rect x="12" y="22" width="22" height="10" fill="${accent}"/><rect x="15" y="25" width="16" height="3" fill="#fefefe"/><rect x="12" y="38" width="52" height="2" fill="#c0c6cf"/><rect x="12" y="45" width="44" height="2" fill="#c0c6cf"/><rect x="12" y="52" width="48" height="2" fill="#c0c6cf"/>`
  );
}
const reportSection = {
  meta: {
    id: "report-section",
    kind: "admonition",
    name: "报告条款",
    description: "顶 3px 底 1px + § 方角标签，内参报告条款感",
    designedFor: ["industry-observer"]
  },
  thumbnail: thumb$24,
  snippets: [
    {
      presetId: "ad-tip-report-section",
      name: "报告 · 要点",
      description: "analyst §01 · KEY POINT",
      admonitionKind: "tip",
      thumbArgs: { accent: "#2d6a5a", soft: "#dceae4" },
      markdown: "::: tip Q3 关键指标 variant=report-section\n净利同比 +18%，驱动来自 ASP。\n:::\n"
    },
    {
      presetId: "ad-warning-report-section",
      name: "报告 · 风险",
      description: "analyst §02 · RISK",
      admonitionKind: "warning",
      thumbArgs: { accent: "#8a5a1a", soft: "#ece0c5" },
      markdown: "::: warning 需要警惕 variant=report-section\n供应链集中度过高。\n:::\n"
    }
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind];
    const padX = ctx.tokens.spacing.containerPadding;
    const tag = KIND_TAG[kind] ?? kind;
    const title = ctx.info.trim();
    const tagHtml = `<span style="display:inline-block;background-color:${pair.accent};color:${ctx.tokens.colors.textInverse};padding:3px 10px;font-size:12px;font-weight:700;letter-spacing:2px;border-radius:0;line-height:1.4">§ ${escText(tag)}</span>`;
    const titleLine = `<section style="padding:10px ${padX}px 0;line-height:1.5">` + tagHtml + (title ? `<span style="margin-left:10px;color:${ctx.tokens.colors.text};font-size:14px;font-weight:600;letter-spacing:0.3px">` + escText(title) + "</span>" : "") + "</section>";
    return {
      wrapperCSS: `background-color:${pair.soft};border-top:3px solid ${pair.accent};border-bottom:1px solid ${pair.accent};padding:0 0 12px;margin:20px 0;border-radius:0`,
      titleCSS: "",
      bodyCSS: `color:${ctx.tokens.colors.text};padding:8px ${padX}px 0;font-size:14px;line-height:1.75;letter-spacing:0.3px`,
      svgSlot: titleLine
    };
  }
};
function thumb$23(args) {
  const accent = args?.accent ?? "#1756d1";
  return svg(
    `<rect x="6" y="14" width="63" height="3" fill="${accent}" opacity="0"/><rect x="6" y="20" width="2" height="14" fill="${accent}"/><rect x="10" y="22" width="14" height="9" fill="${accent}"/><rect x="13" y="25" width="8" height="3" fill="#fff"/><rect x="28" y="24" width="38" height="2" fill="#5a6068"/><rect x="6" y="38" width="2" height="14" fill="${accent}"/><rect x="10" y="40" width="14" height="9" fill="${accent}"/><rect x="13" y="43" width="8" height="3" fill="#fff"/><rect x="28" y="42" width="34" height="2" fill="#5a6068"/>`
  );
}
const DEFAULT_BADGE$2 = {
  tip: "TIP",
  info: "INFO",
  warning: "WARN",
  danger: "STOP"
};
const newsRow = {
  meta: {
    id: "news-row",
    kind: "admonition",
    name: "数据新闻单行",
    description: "左 3px + 徽章 + 紧凑单行，data-brief 签名",
    designedFor: ["data-brief"]
  },
  thumbnail: thumb$23,
  snippets: [
    {
      presetId: "ad-info-news-row",
      name: "数据新闻 INFO",
      description: "蓝色徽章 + 单行",
      admonitionKind: "info",
      thumbArgs: { accent: "#1756d1", soft: "#dfe9fa" },
      markdown: "::: info INFO variant=news-row\n所有时长以分钟计，四舍五入。\n:::\n"
    },
    {
      presetId: "ad-tip-news-row",
      name: "数据新闻 TIP",
      description: "绿色徽章 + 单行",
      admonitionKind: "tip",
      thumbArgs: { accent: "#147a44", soft: "#dff1e6" },
      markdown: "::: tip TIP variant=news-row\n睡前 15 分钟是回升的最低成本入口。\n:::\n"
    },
    {
      presetId: "ad-warning-news-row",
      name: "数据新闻 WARN",
      description: "橙色徽章 + 单行",
      admonitionKind: "warning",
      thumbArgs: { accent: "#9e5c10", soft: "#faecd9" },
      markdown: "::: warning WARN variant=news-row\n样本量较小，结论仅供参考。\n:::\n"
    },
    {
      presetId: "ad-danger-news-row",
      name: "数据新闻 STOP",
      description: "红色徽章 + 单行",
      admonitionKind: "danger",
      thumbArgs: { accent: "#b22d18", soft: "#fbdcd6" },
      markdown: '::: danger STOP variant=news-row\n勿将"平均值"误读为"大多数人"。\n:::\n'
    }
  ],
  render: (ctx, { kind }) => {
    const c = ctx.tokens.colors;
    const pair = c.status[kind];
    const badgeText = ctx.info.trim() || DEFAULT_BADGE$2[kind] || kind.toUpperCase();
    return {
      // 外壳走 display:table —— 两个 table-cell 横向并列（badge 左 / body 右）。
      // 公众号粘贴期 wxPatch 不剥 display:table（仅剥 flex），稳。
      // margin-bottom:4px 让四态紧贴罗列时纵向更紧凑（晚点/财新数据栏目惯例）。
      wrapperCSS: `display:table;width:100%;table-layout:auto;border-left:3px solid ${pair.accent};margin:0 0 4px 0;border-radius:0`,
      titleCSS: "",
      // bodyCSS 让 body 段落作为 table-cell；padding 与设计稿对齐。
      // vertical-align:middle 与 badge 保持同一基线，body 文字短时不会贴顶。
      bodyCSS: `display:table-cell;vertical-align:middle;padding:2px 12px;font-size:12px;line-height:1.65;color:${c.text}`,
      // svgSlot 承担徽章：第一个 table-cell。
      //   - 宽度：min-width:54px 让 INFO/TIP/WARN/STOP 四态横向对齐，视觉成栏；
      //     纯 nowrap 无 min-width 会让 TIP（3 字符）比 WARN 短约 8px，列不齐
      //   - 内边距：2px 10px —— vertical 走设计稿原值 2px（高度紧贴文字一行），
      //     horizontal 留 10px 保证短词（TIP）也不会贴边
      //   - line-height:1.4 显式锁住徽章高度，避免继承 body 1.65 让胶囊变高
      //   - text-align:center：短徽章如 TIP 居中显眼
      //   - vertical-align:middle：与 body 段在垂直方向贴中线
      svgSlot: `<span style="display:table-cell;vertical-align:middle;min-width:54px;background-color:${pair.accent};color:${c.textInverse};padding:2px 10px;font-size:10px;line-height:1.4;font-weight:700;letter-spacing:0.1em;text-align:center;white-space:nowrap">${escText(badgeText)}</span>`
    };
  }
};
function thumb$22(args) {
  const accent = args?.accent ?? "#e30613";
  return svg(
    `<rect x="6" y="20" width="14" height="9" fill="${accent}"/><rect x="9" y="23" width="8" height="3" fill="#fff"/><rect x="22" y="22" width="44" height="2" fill="#000"/><rect x="22" y="26" width="36" height="2" fill="#5a6068"/><rect x="6" y="32" width="60" height="1" fill="#000"/><rect x="6" y="38" width="14" height="9" fill="#2e7d32"/><rect x="9" y="41" width="8" height="3" fill="#fff"/><rect x="22" y="40" width="44" height="2" fill="#000"/><rect x="22" y="44" width="36" height="2" fill="#5a6068"/><rect x="6" y="50" width="60" height="1" fill="#000"/>`
  );
}
const DEFAULT_BADGE$1 = {
  tip: "TIP",
  info: "INFO",
  warning: "WARN",
  danger: "STOP"
};
const newsUnderline = {
  meta: {
    id: "news-underline",
    kind: "admonition",
    name: "苏黎世下划线",
    description: "徽章 + 竖分隔 + 底部下划线，swiss-grid multi-callout",
    designedFor: ["swiss-grid"]
  },
  thumbnail: thumb$22,
  snippets: [
    {
      presetId: "ad-info-news-underline",
      name: "multi-callout INFO",
      description: "黑色徽章 + 下划线",
      admonitionKind: "info",
      thumbArgs: { accent: "#000000" },
      markdown: "::: info INFO variant=news-underline\n深夜读书请保持光源在书后侧 45°。\n:::\n"
    },
    {
      presetId: "ad-tip-news-underline",
      name: "multi-callout TIP",
      description: "绿色徽章 + 下划线",
      admonitionKind: "tip",
      thumbArgs: { accent: "#2e7d32" },
      markdown: "::: tip TIP variant=news-underline\n配温水一盏。茶易醒脑，咖啡断连续。\n:::\n"
    },
    {
      presetId: "ad-warning-news-underline",
      name: "multi-callout WARN",
      description: "橙色徽章 + 下划线",
      admonitionKind: "warning",
      thumbArgs: { accent: "#f9a825" },
      markdown: "::: warning WARN variant=news-underline\n手机应在另一房间充电，非床头。\n:::\n"
    },
    {
      presetId: "ad-danger-news-underline",
      name: "multi-callout STOP",
      description: "红色徽章 + 下划线",
      admonitionKind: "danger",
      thumbArgs: { accent: "#e30613" },
      markdown: "::: danger STOP variant=news-underline\n勿在短视频毕后方翻书。\n:::\n"
    }
  ],
  render: (ctx, { kind }) => {
    const c = ctx.tokens.colors;
    const pair = c.status[kind];
    const badgeText = ctx.info.trim() || DEFAULT_BADGE$1[kind] || kind.toUpperCase();
    const badgeColor = kind === "warning" ? c.text : c.textInverse;
    return {
      // 外壳走 display:table —— 两个 table-cell 横向并列（badge 左 / body 右）。
      // border-bottom:1px solid c.text 提供"下划线"——四态独立 ::: 块连续罗列时
      // 视觉自然贴合成设计稿 multi-callout 列。margin:0 让上下行紧贴。
      wrapperCSS: `display:table;width:100%;table-layout:auto;border-bottom:1px solid ${c.text};margin:0;border-radius:0`,
      titleCSS: "",
      // 正文 cell：左侧 1px 黑竖线（与徽章分隔），line-height 收到 1.45 以免拉高徽章
      bodyCSS: `display:table-cell;vertical-align:middle;padding:4px 10px;font-size:12px;line-height:1.45;color:${c.text};border-left:1px solid ${c.text}`,
      // svgSlot 承担徽章：第一个 table-cell。
      //   - padding:4px 8px / font-size:9px / letter-spacing:0.15em：设计稿原值
      //   - line-height:1.4 显式锁住徽章高度，避免继承 body 行高被 stretch
      //   - 不设 min-width：四态独立 ::: 块各自宽度由徽章字长自然决定
      svgSlot: `<span style="display:table-cell;vertical-align:middle;background-color:${pair.accent};color:${badgeColor};padding:4px 8px;font-size:9px;line-height:1.4;font-weight:700;letter-spacing:0.15em;text-align:center;white-space:nowrap">${escText(badgeText)}</span>`
    };
  }
};
const KIND_LABEL = {
  tip: "参",
  info: "編",
  warning: "注",
  danger: "禁"
};
function thumb$21(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/><rect x="6" y="14" width="2" height="47" fill="${accent}"/><rect x="13" y="22" width="8" height="8" fill="${accent}"/><rect x="14" y="24" width="6" height="2" fill="${soft}"/><rect x="14" y="27" width="4" height="2" fill="${soft}"/><rect x="26" y="24" width="38" height="2" fill="#5a6068"/><rect x="26" y="30" width="32" height="2" fill="#5a6068"/><rect x="13" y="40" width="50" height="2" fill="#c0c6cf"/><rect x="13" y="47" width="44" height="2" fill="#c0c6cf"/>`
  );
}
const mookTag = {
  meta: {
    id: "mook-tag",
    kind: "admonition",
    name: "編集附注 単字",
    description: "参/編/注/禁 単字标签 + 米卡纸底 + 主色左条",
    designedFor: ["editorial-mook"]
  },
  thumbnail: thumb$21,
  snippets: [
    {
      presetId: "ad-info-mook-tag",
      name: "附注 · 編",
      description: "编辑注解（蓝）",
      admonitionKind: "info",
      thumbArgs: { accent: "#4a7fa8", soft: "#f0ebe0" },
      markdown: "::: info variant=mook-tag\n深夜讀書，光源應在書後側四十五度。\n:::\n"
    },
    {
      presetId: "ad-tip-mook-tag",
      name: "附注 · 参",
      description: "推荐做法（绿）",
      admonitionKind: "tip",
      thumbArgs: { accent: "#6b9a5a", soft: "#f0ebe0" },
      markdown: "::: tip variant=mook-tag\n配溫水一盞。茶易醒腦，咖啡斷連續。\n:::\n"
    },
    {
      presetId: "ad-warning-mook-tag",
      name: "附注 · 注",
      description: "轻度提醒（黄）",
      admonitionKind: "warning",
      thumbArgs: { accent: "#d4a03a", soft: "#f0ebe0" },
      markdown: "::: warning variant=mook-tag\n手機請於別室充電，不置床頭。\n:::\n"
    },
    {
      presetId: "ad-danger-mook-tag",
      name: "附注 · 禁",
      description: "明确禁忌（红）",
      admonitionKind: "danger",
      thumbArgs: { accent: "#e85a3c", soft: "#f0ebe0" },
      markdown: "::: danger variant=mook-tag\n勿在短片畢後方翻書。\n:::\n"
    }
  ],
  render: (ctx, { kind }) => {
    const c = ctx.tokens.colors;
    const pair = c.status[kind];
    const label = KIND_LABEL[kind] ?? "注";
    return {
      wrapperCSS: `display:table;width:100%;table-layout:auto;background-color:${pair.soft};border-left:2px solid ${pair.accent};padding:10px 12px;margin:0 0 8px 0;border-radius:0`,
      titleCSS: "",
      bodyCSS: `display:table-cell;vertical-align:top;font-size:12px;line-height:1.75;color:${c.text}`,
      // 标签格：24px 固定宽 + 主色加粗 + 与 body 同字号 / 行高（避免基线漂移）
      svgSlot: `<span style="display:table-cell;vertical-align:top;width:24px;font-weight:700;color:${pair.accent};font-size:12px;line-height:1.75">` + escText(label) + `</span>`
    };
  }
};
function thumb$20(args) {
  const accent = args?.accent ?? "#ebff00";
  const soft = args?.soft ?? "#1a1a1a";
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/><rect x="6" y="14" width="63" height="5" fill="${accent}"/><rect x="50" y="22" width="16" height="10" fill="${accent}"/><rect x="53" y="26" width="10" height="2" fill="${soft}"/><rect x="11" y="36" width="36" height="2" fill="#5a6068"/><rect x="11" y="42" width="44" height="2" fill="#5a6068"/><rect x="11" y="48" width="38" height="2" fill="#5a6068"/><rect x="11" y="54" width="28" height="2" fill="#5a6068"/>`
  );
}
const DEFAULT_BADGE = {
  tip: "TIP",
  info: "INFO",
  warning: "WARN",
  danger: "STOP"
};
const slabCorner = {
  meta: {
    id: "slab-corner",
    kind: "admonition",
    name: "粗野板块",
    description: "顶部 6px 硬条 + 右上 accent 徽章方块 + zero-radius",
    designedFor: ["brutalist"]
  },
  thumbnail: thumb$20,
  snippets: [
    {
      presetId: "ad-info-slab-corner",
      name: "粗野板块 INFO",
      description: "顶 6px 蓝条 + 右上方块徽章",
      admonitionKind: "info",
      thumbArgs: { accent: "#ebff00", soft: "#1a1a1a" },
      markdown: "::: info INFO variant=slab-corner\n所有时长以分钟计，四舍五入。\n:::\n"
    },
    {
      presetId: "ad-tip-slab-corner",
      name: "粗野板块 TIP",
      description: "顶 6px 绿条 + 右上方块徽章",
      admonitionKind: "tip",
      thumbArgs: { accent: "#ebff00", soft: "#1a1a1a" },
      markdown: "::: tip TIP variant=slab-corner\n睡前 15 分钟是回升的最低成本入口。\n:::\n"
    },
    {
      presetId: "ad-warning-slab-corner",
      name: "粗野板块 WARN",
      description: "顶 6px 橙条 + 右上方块徽章",
      admonitionKind: "warning",
      thumbArgs: { accent: "#ebff00", soft: "#1a1a1a" },
      markdown: "::: warning WARN variant=slab-corner\n样本量较小，结论仅供参考。\n:::\n"
    },
    {
      presetId: "ad-danger-slab-corner",
      name: "粗野板块 STOP",
      description: "顶 6px 红条 + 右上方块徽章",
      admonitionKind: "danger",
      thumbArgs: { accent: "#ebff00", soft: "#1a1a1a" },
      markdown: '::: danger STOP variant=slab-corner\n勿将"平均值"误读为"大多数人"。\n:::\n'
    }
  ],
  render: (ctx, { kind }) => {
    const c = ctx.tokens.colors;
    const pair = c.status[kind];
    const padY = ctx.tokens.spacing.containerPadding;
    const padX = ctx.tokens.spacing.containerPadding;
    const badgeText = ctx.info.trim() || DEFAULT_BADGE[kind] || kind.toUpperCase();
    return {
      wrapperCSS: `background-color:${pair.soft};border-top:6px solid ${pair.accent};padding:${padY + 6}px ${padX}px ${padY}px;margin:18px 0;border-radius:0`,
      titleCSS: "",
      bodyCSS: `font-size:13px;line-height:1.65;color:${c.text}`,
      // 徽章块走 svgSlot：包裹一层 text-align:right 让 inline-block 徽章靠右上对齐。
      // 不用 float / absolute（前者被微信剥，后者 wxPatch 删 position）；
      // margin-bottom 8px 让徽章与正文分层。
      svgSlot: `<section style="text-align:right;line-height:0;margin-bottom:8px"><span style="display:inline-block;background-color:${pair.accent};color:${c.textInverse};padding:4px 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;line-height:1.4;text-align:center;border-radius:0">${escText(badgeText)}</span></section>`
    };
  }
};
function thumb$1$(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/><rect x="6" y="14" width="63" height="2" fill="${text}"/><rect x="6" y="60" width="63" height="1" fill="${text}" opacity="0.5"/><rect x="6" y="24" width="24" height="2" fill="${text}"/><rect x="6" y="32" width="55" height="2" fill="#c0c6cf"/><rect x="6" y="40" width="48" height="2" fill="#c0c6cf"/><rect x="6" y="48" width="36" height="2" fill="#c0c6cf"/><rect x="46" y="21" width="23" height="2" fill="${accent}" opacity="0.7"/>`
  );
}
const variantDef$D = {
  meta: {
    id: "numbered-rule",
    kind: "admonition",
    name: "编号横线",
    description: "顶2px+底1px大字距 NOTICE·N°（编辑部 v1）",
    designedFor: ["official-gazette"]
  },
  thumbnail: thumb$1$,
  snippets: [
    {
      presetId: "ad-tip-numbered-rule",
      name: "编号横线",
      description: "顶2px+底1px大字距 NOTICE·N°（编辑部 v1）",
      admonitionKind: "tip",
      thumbArgs: { accent: "#0a0a0a", soft: "#fbfaf7", text: "#0a0a0a" },
      markdown: "::: tip 告示 variant=numbered-rule\n正文示例\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const bg = c.bg;
    const text = c.text;
    const textMuted = c.textMuted;
    return {
      wrapperCSS: [
        `font-family:'Noto Serif SC',serif`,
        `background-color:${bg}`,
        `padding:4px 0`
      ].join(";"),
      titleCSS: "",
      // header 走 display:table —— wxPatch 会把 display:flex 改成 block，
      // 导致 NOTICE·N°01 塌到第二行。table-cell 在白名单内稳保横向布局。
      // 右侧 text-align:right 替代 justify-content:space-between。
      svgSlot: `<div style="border-top:2px solid ${text};border-bottom:1px solid ${text};padding:14px 0 12px;margin-bottom:14px;display:table;width:100%;"><span style="display:table-cell;vertical-align:baseline;font-size:13px;font-weight:600;letter-spacing:.3em;color:${text};">告　示</span><span style="display:table-cell;vertical-align:baseline;text-align:right;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.18em;color:${textMuted};">NOTICE · N°01</span></div>`,
      bodyCSS: [
        `font-size:15px`,
        `line-height:1.95`,
        `color:${text}`,
        `margin:0`
      ].join(";"),
      suppressIcon: true
    };
  }
};
function thumb$1_(args) {
  const { soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/><rect x="22" y="14" width="1" height="47" fill="${text}"/><rect x="6" y="22" width="12" height="3" fill="${text}"/><rect x="6" y="30" width="10" height="2" fill="${text}" opacity="0.4"/><rect x="27" y="20" width="40" height="2" fill="#5a6068"/><rect x="27" y="28" width="35" height="2" fill="#5a6068"/><rect x="27" y="36" width="40" height="2" fill="#c0c6cf"/><rect x="27" y="44" width="32" height="2" fill="#c0c6cf"/>`
  );
}
const variantDef$C = {
  meta: {
    id: "hanging-nb",
    kind: "admonition",
    name: "悬挂 N.B.",
    description: "左侧 N.B. 缩写 + 编号 + 竖分隔（编辑部 v2）",
    designedFor: ["official-gazette"]
  },
  thumbnail: thumb$1_,
  snippets: [
    {
      presetId: "ad-tip-hanging-nb",
      name: "悬挂 N.B.",
      description: "左侧 N.B. 缩写 + 编号 + 竖分隔（编辑部 v2）",
      admonitionKind: "tip",
      thumbArgs: { accent: "#0a0a0a", soft: "#fbfaf7", text: "#0a0a0a" },
      markdown: "::: tip variant=hanging-nb\n读者若对术语之译法有疑问，请径直查阅文末译名对照表。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const bg = c.bg;
    const text = c.text;
    const textMuted = c.textMuted;
    return {
      wrapperCSS: [
        `font-family:'Noto Serif SC',serif`,
        `background-color:${bg}`,
        `display:table`,
        `width:100%`,
        `padding:6px 0`
      ].join(";"),
      titleCSS: "",
      svgSlot: `<div style="display:table-cell;vertical-align:top;width:48px;text-align:right;border-right:1px solid ${text};padding-right:10px;padding-top:2px;"><div style="font-family:'Lora',serif;font-style:italic;font-size:18px;color:${text};line-height:1;">N.B.</div><div style="font-family:'IBM Plex Mono',monospace;font-size:9px;color:${textMuted};letter-spacing:.16em;margin-top:6px;">001</div></div>`,
      bodyCSS: [
        `display:table-cell`,
        `vertical-align:top`,
        `padding-left:14px`,
        `font-size:15px`,
        `line-height:1.95`,
        `color:${text}`,
        `margin:0`
      ].join(";"),
      suppressIcon: true
    };
  }
};
function thumb$1Z(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/><rect x="48" y="16" width="18" height="18" fill="none" stroke="${accent}" stroke-width="1.5" transform="rotate(-3 57 25)"/><rect x="10" y="22" width="34" height="2" fill="#5a6068" opacity="0.5"/><rect x="10" y="32" width="34" height="2" fill="#5a6068"/><rect x="10" y="40" width="32" height="2" fill="#c0c6cf"/><rect x="10" y="48" width="28" height="2" fill="#c0c6cf"/>`
  );
}
const variantDef$B = {
  meta: {
    id: "vermilion-seal",
    kind: "admonition",
    name: "朱印告示",
    description: "右上 -3° 旋转方框朱印（宋本 v1）",
    designedFor: ["literary-humanism"]
  },
  thumbnail: thumb$1Z,
  snippets: [
    {
      presetId: "ad-tip-vermilion-seal",
      name: "朱印告示",
      description: "右上 -3° 旋转方框朱印（宋本 v1）",
      admonitionKind: "tip",
      thumbArgs: { accent: "#a03a2a", soft: "#f3eada" },
      markdown: "::: tip 告示 variant=vermilion-seal\n正文示例\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const bg = c.bg;
    const text = c.text;
    const seal = c.accentClassical ?? c.accent;
    return {
      wrapperCSS: [
        `font-family:'Noto Serif SC',serif`,
        `background-color:${bg}`,
        `padding:6px 4px`
      ].join(";"),
      titleCSS: "",
      svgSlot: `<div style="text-align:right;line-height:0;margin-bottom:6px;"><span style="display:inline-block;width:42px;height:42px;border:2.5px solid ${seal};color:${seal};font-size:22px;font-weight:600;text-align:center;line-height:38px;font-family:'Noto Serif SC',serif;transform:rotate(-3deg);">告</span></div><div style="font-family:'Noto Serif SC',serif;font-size:11px;letter-spacing:.4em;color:${seal};font-weight:500;margin-bottom:8px;">　示</div>`,
      bodyCSS: [
        `font-size:15px`,
        `line-height:2`,
        `color:${text}`,
        `margin:0`
      ].join(";"),
      suppressIcon: true
    };
  }
};
function thumb$1Y(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/><rect x="6" y="14" width="12" height="47" fill="${accent}" opacity="0.35"/><rect x="22" y="24" width="40" height="2" fill="#5a6068"/><rect x="22" y="32" width="38" height="2" fill="#5a6068"/><rect x="22" y="40" width="40" height="2" fill="#c0c6cf"/><rect x="22" y="48" width="32" height="2" fill="#c0c6cf"/><rect x="22" y="60" width="47" height="1" fill="${accent}" opacity="0.5"/>`
  );
}
const variantDef$A = {
  meta: {
    id: "paper-slip",
    kind: "admonition",
    name: "黄签条",
    description: "左竖排黄签条 + 底 1px border",
    designedFor: ["literary-humanism"]
  },
  thumbnail: thumb$1Y,
  snippets: [
    {
      presetId: "ad-tip-paper-slip",
      name: "黄签条",
      description: "左竖排黄签条 + 底 1px border",
      admonitionKind: "tip",
      thumbArgs: { accent: "#6b4a2a", soft: "#f3eada" },
      markdown: "::: tip 告示 variant=paper-slip\n正文示例\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const bg = c.bg;
    const text = c.text;
    const textMuted = c.textMuted;
    const slipBg = c.bgMuted;
    const slipText = (ctx.attrs.slip ?? "示·告").trim();
    return {
      wrapperCSS: [
        `font-family:'Noto Serif SC',serif`,
        `background-color:${bg}`,
        `display:table`,
        `table-layout:fixed`,
        `width:100%`,
        `padding:6px 0`
      ].join(";"),
      titleCSS: "",
      // line-height 必须显式压回——继承自 .stage 的 1.75 在 vertical-rl 里会把
      // 行盒（block direction = 物理宽）撑到 28px，远宽于 20px 的 content area，
      // glyph 因此偏左居中失败。设 1.25 让行盒 ≈ 20px 与 content area 等宽，
      // glyph 在行盒中心，视觉上水平居中。
      svgSlot: `<div style="display:table-cell;vertical-align:top;width:32px;box-sizing:border-box;writing-mode:vertical-rl;background:${slipBg};color:${textMuted};font-size:16px;line-height:1.25;letter-spacing:.4em;padding:12px 6px;font-weight:500;">${escText(slipText)}</div>`,
      bodyCSS: [
        `display:table-cell`,
        `vertical-align:top`,
        `padding:8px 4px 8px 16px`,
        `border-bottom:1px solid ${textMuted}`,
        `font-size:15px`,
        `line-height:2`,
        `color:${text}`,
        `margin:0`
      ].join(";"),
      suppressIcon: true
    };
  }
};
function thumb$1X(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/><rect x="6" y="34" width="63" height="1" fill="${text}"/><rect x="6" y="20" width="28" height="2" fill="${text}" opacity="0.5"/><rect x="6" y="26" width="22" height="2" fill="${accent}" opacity="0.7"/><rect x="50" y="26" width="1" height="6" fill="${text}" opacity="0.5"/><rect x="54" y="24" width="1" height="10" fill="${text}" opacity="0.5"/><rect x="58" y="26" width="1" height="6" fill="${text}" opacity="0.5"/><rect x="62" y="24" width="1" height="10" fill="${text}" opacity="0.5"/><rect x="66" y="26" width="1" height="6" fill="${text}" opacity="0.5"/><rect x="6" y="42" width="55" height="2" fill="#c0c6cf"/><rect x="6" y="50" width="48" height="2" fill="#c0c6cf"/>`
  );
}
const variantDef$z = {
  meta: {
    id: "field-tag",
    kind: "admonition",
    name: "刻度学名",
    description: "FIG.CAVE + Notabene + 短刻度（博物 v1）",
    designedFor: ["life-aesthetic"]
  },
  thumbnail: thumb$1X,
  snippets: [
    {
      presetId: "ad-tip-field-tag",
      name: "刻度学名",
      description: "FIG.CAVE + Notabene + 短刻度（博物 v1）",
      admonitionKind: "tip",
      thumbArgs: { accent: "#5e6f6a", soft: "#ece4d2", text: "#1f2a2a" },
      markdown: "::: tip 告示 variant=field-tag\n正文示例\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const bg = c.bg;
    const text = c.text;
    const textMuted = c.textMuted;
    return {
      wrapperCSS: [
        `font-family:'Noto Serif SC',serif`,
        `background-color:${bg}`,
        `padding:4px 0`
      ].join(";"),
      titleCSS: "",
      // header 走 display:table —— flex 在 wxPatch 阶段被剥成 block，刻度尺会塌到
      // FIG.CAVE 下方而非右对齐。table-cell + text-align:right 保住左右两端布局。
      // 刻度尺：7 根短/长交替的 hairline（短 8 / 长 13），间距 5px。"短刻度" 是设计意图，
      // 但 5 根 + 3px 间距实测过紧、像短横线团；7 根 + 5px 让 ruler 视觉信号成立。
      svgSlot: `<div style="display:table;width:100%;border-bottom:1px solid ${text};padding-bottom:6px;margin-bottom:14px;"><div style="display:table-cell;vertical-align:bottom;"><div style="font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.2em;color:${textMuted};">FIG. CAVE — 04</div><div style="font-family:'Lora',serif;font-style:italic;font-size:13px;color:${text};margin-top:2px;">Notabene · 告示</div></div><div style="display:table-cell;vertical-align:bottom;text-align:right;font-family:'IBM Plex Mono',monospace;font-size:9px;color:${textMuted};letter-spacing:.2em;line-height:1;">` + [8, 13, 8, 13, 8, 13, 8].map(
        (h) => `<span style="display:inline-block;border-left:1px solid ${textMuted};height:${h}px;margin-right:5px;vertical-align:bottom;"></span>`
      ).join("") + `</div></div>`,
      bodyCSS: [
        `font-size:15px`,
        `line-height:1.95`,
        `color:${text}`,
        `margin:0`
      ].join(";"),
      suppressIcon: true
    };
  }
};
function thumb$1W(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/><rect x="6" y="14" width="18" height="47" fill="none" stroke="${text}" stroke-width="1"/><rect x="8" y="22" width="14" height="2" fill="${text}" opacity="0.4"/><rect x="10" y="28" width="10" height="5" fill="${text}"/><rect x="11" y="38" width="8" height="2" fill="${accent}"/><rect x="28" y="22" width="36" height="2" fill="#5a6068"/><rect x="28" y="30" width="36" height="2" fill="#5a6068"/><rect x="28" y="38" width="36" height="2" fill="#c0c6cf"/><rect x="28" y="46" width="30" height="2" fill="#c0c6cf"/>`
  );
}
const variantDef$y = {
  meta: {
    id: "specimen-box",
    kind: "admonition",
    name: "编号方格",
    description: "左 1px border 方格 N°（博物 v2）",
    designedFor: ["life-aesthetic"]
  },
  thumbnail: thumb$1W,
  snippets: [
    {
      presetId: "ad-tip-specimen-box",
      name: "编号方格",
      description: "左 1px border 方格 N°（博物 v2）",
      admonitionKind: "tip",
      thumbArgs: { accent: "#8b4a3a", soft: "#ece4d2", text: "#1f2a2a" },
      markdown: "::: tip 告示 variant=specimen-box\n正文示例\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const bg = c.bg;
    const text = c.text;
    const textMuted = c.textMuted;
    const warm = c.accentNaturalist ?? c.textMuted;
    const numLabel = (ctx.attrs.numlabel ?? "N°").trim();
    const numValue = (ctx.attrs.num ?? "04").trim();
    const kicker = (ctx.attrs.kicker ?? "告示").trim();
    return {
      wrapperCSS: [
        `font-family:'Noto Serif SC',serif`,
        `background-color:${bg}`,
        `display:table`,
        `width:100%`,
        `padding:4px 0`
      ].join(";"),
      titleCSS: "",
      svgSlot: `<div style="display:table-cell;vertical-align:top;width:48px;border:1px solid ${text};padding:6px 0;text-align:center;"><div style="font-family:'IBM Plex Mono',monospace;font-size:9px;color:${textMuted};letter-spacing:.16em;">${escText(numLabel)}</div><div style="font-family:'Lora',serif;font-size:22px;color:${text};font-weight:500;line-height:1;margin-top:2px;">${escText(numValue)}</div><div style="font-size:9px;color:${warm};letter-spacing:.18em;margin-top:4px;font-weight:500;">${escText(kicker)}</div></div>`,
      bodyCSS: [
        `display:table-cell`,
        `vertical-align:top`,
        `padding:0 0 0 14px`,
        `font-size:15px`,
        `line-height:1.95`,
        `color:${text}`,
        `margin:0`
      ].join(";"),
      suppressIcon: true
    };
  }
};
function thumb$1V(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/><rect x="8" y="20" width="6" height="6" fill="${accent}"/><rect x="18" y="22" width="14" height="2" fill="${text}"/><rect x="36" y="23" width="20" height="1" fill="${text}" opacity="0.6"/><rect x="60" y="22" width="8" height="2" fill="${text}" opacity="0.6"/><rect x="8" y="34" width="55" height="2" fill="#5a6068"/><rect x="8" y="40" width="55" height="2" fill="${accent}" opacity="0.8"/><rect x="8" y="46" width="40" height="2" fill="#c0c6cf"/><rect x="8" y="52" width="48" height="2" fill="#c0c6cf"/>`
  );
}
const variantDef$x = {
  meta: {
    id: "filled-square",
    kind: "admonition",
    name: "实心方块",
    description: "顶 18px accent 方块 + 告示 + 中线 + N° 单行 header（包豪斯 v1）",
    designedFor: ["brutalist"]
  },
  thumbnail: thumb$1V,
  snippets: [
    {
      presetId: "ad-tip-filled-square",
      name: "实心方块",
      description: "顶 18px accent 方块 + 告示 + 中线 + N° 单行 header（包豪斯 v1）",
      admonitionKind: "tip",
      thumbArgs: { accent: "#c8412e", soft: "#efece5", text: "#111" },
      markdown: "::: tip 告示 variant=filled-square\n正文示例\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const bg = c.bg;
    const text = c.text;
    const textMuted = c.textMuted;
    const accent = c.accent;
    return {
      wrapperCSS: [
        `background-color:${bg}`,
        `padding:4px 0`
      ].join(";"),
      titleCSS: "",
      svgSlot: `<div style="display:table;width:100%;margin-bottom:14px;"><div style="display:table-cell;vertical-align:middle;width:18px;padding-right:14px;"><span style="display:inline-block;width:18px;height:18px;background-color:${accent};"></span></div><div style="display:table-cell;vertical-align:middle;font-size:14px;font-weight:700;letter-spacing:.3em;color:${text};padding-right:14px;white-space:nowrap;">告　示</div><div style="display:table-cell;vertical-align:middle;width:60%;padding:0 14px 0 0;"><div style="height:1px;background-color:${text};"></div></div><div style="display:table-cell;vertical-align:middle;text-align:right;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.16em;color:${textMuted};white-space:nowrap;">N° 01</div></div>`,
      bodyCSS: [
        `font-size:15px`,
        `line-height:1.95`,
        `color:${text}`,
        `margin:0`
      ].join(";"),
      suppressIcon: true
    };
  }
};
function thumb$1U(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="18" width="63" height="47" fill="${soft}" stroke="${text}" stroke-width="1"/><polygon points="20,18 29,9 38,18" fill="${accent}"/><rect x="6" y="28" width="55" height="2" fill="${text}" opacity="0.4"/><rect x="6" y="38" width="55" height="2" fill="#c0c6cf"/><rect x="6" y="46" width="48" height="2" fill="#c0c6cf"/><rect x="6" y="54" width="36" height="2" fill="#c0c6cf"/>`
  );
}
const variantDef$w = {
  meta: {
    id: "triangle-top",
    kind: "admonition",
    name: "三角顶",
    description: "顶 -9px 三角徽 + 1px 边框（包豪斯 v2）",
    designedFor: ["brutalist"]
  },
  thumbnail: thumb$1U,
  snippets: [
    {
      presetId: "ad-tip-triangle-top",
      name: "三角顶",
      description: "顶 -9px 三角徽 + 1px 边框（包豪斯 v2）",
      admonitionKind: "tip",
      thumbArgs: { accent: "#c8412e", soft: "#efece5", text: "#111" },
      markdown: "::: tip 告示 variant=triangle-top\n正文示例\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const bg = c.bg;
    const text = c.text;
    const textMuted = c.textMuted;
    const accent = c.accent;
    const triangleSvg = `<svg width="18" height="9" viewBox="0 0 18 9" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-top:-23px;margin-bottom:14px;"><polygon points="0,9 9,0 18,9" fill="${accent}"/><polygon points="1.4,9 9,1.4 16.6,9" fill="${bg}"/></svg>`;
    return {
      wrapperCSS: [
        `font-family:'Noto Sans SC',sans-serif`,
        `background-color:${bg}`,
        `padding:14px 14px 16px`,
        `border:1px solid ${text}`
      ].join(";"),
      titleCSS: "",
      svgSlot: triangleSvg + `<div style="font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.24em;color:${textMuted};margin-bottom:8px;">ADMONITION · 告示</div>`,
      bodyCSS: [
        `font-family:'Noto Serif SC',serif`,
        `font-size:15px`,
        `line-height:1.95`,
        `color:${text}`,
        `margin:0`
      ].join(";"),
      suppressIcon: true
    };
  }
};
const admonitionAll = [
  accentBar,
  pillTag,
  cardShadow,
  terminal,
  dashedBorder,
  topBottomRule,
  manpageLog,
  sidenoteLatex,
  marginalia,
  ledgerCell,
  bubbleOrganic,
  magazinePull,
  reportSection,
  newsRow,
  newsUnderline,
  mookTag,
  slabCorner,
  variantDef$D,
  variantDef$C,
  variantDef$B,
  variantDef$A,
  variantDef$z,
  variantDef$y,
  variantDef$x,
  variantDef$w
];
const tokenSchema$2 = {
  "quote-bg": {
    type: "color",
    label: "卡片底色",
    default: "inherit",
    hint: "默认跟随主题的 bgSoft"
  },
  "quote-size": {
    type: "size",
    label: "正文字号",
    default: "17px"
  }
};
const FALLBACK_OPEN_MARK = `<section style="text-align:left;line-height:1;padding:6px 0 8px 6px"><span style="display:inline-block;font-size:28px;opacity:0.35">「</span></section>`;
const FALLBACK_CLOSE_MARK = `<section style="text-align:right;line-height:1;padding:8px 6px 6px 0"><span style="display:inline-block;font-size:28px;opacity:0.35">」</span></section>`;
function thumb$1T(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="5" fill="${soft}"/><text x="14" y="35" font-size="22" fill="${accent}" opacity="0.4">&#8220;</text><rect x="16" y="40" width="42" height="2" fill="#c0c6cf"/><rect x="16" y="48" width="34" height="2" fill="#c0c6cf"/>`
  );
}
const classic = {
  meta: {
    id: "classic",
    kind: "quote",
    name: "大引号金句",
    description: "浅底 + 装饰引号，居中大号"
  },
  thumbnail: thumb$1T,
  tokenSchema: tokenSchema$2,
  snippets: [
    {
      presetId: "q-classic",
      name: "大引号金句",
      description: "浅底 + 装饰引号，居中大号",
      markdown: "::: quote-card 作者名\n此处填写金句正文\n:::\n"
    },
    {
      presetId: "q-classic-no-byline",
      name: "无署名金句",
      description: "纯金句不署名",
      markdown: "::: quote-card\n此处填写金句正文\n:::\n"
    }
  ],
  render: (ctx) => {
    const themeMark = ctx.assets.quoteMark;
    const mark = themeMark ?? FALLBACK_OPEN_MARK;
    const pad = ctx.tokens.spacing.containerPadding;
    return {
      wrapperCSS: `background-color:var(--uv-quote-bg, ${ctx.tokens.colors.bgSoft});padding:0;margin:20px 0;border-radius:8px`,
      // 横向 padding 落在 body 自身:正文文字距 wrapper 左右各 (pad+4) 的呼吸,
      // 与 「」 的 6px 角位形成"角 < 正文边距"的层次,角标贴边、正文居中悬浮。
      bodyCSS: `font-size:var(--uv-quote-size, 17px);line-height:1.65;text-align:center;padding:0 ${pad + 4}px`,
      svgSlot: mark,
      // 仅 fallback 字符路径配对闭合；主题自带 SVG 引号时不强行加。
      closeSlot: themeMark ? void 0 : FALLBACK_CLOSE_MARK
    };
  }
};
const DROPCAP_QUOTE = '<span style="display:inline-block;font-size:48px;line-height:1;color:inherit;opacity:0.25;margin-right:8px;font-style:italic">&ldquo;</span>';
function thumb$1S(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="16" width="59" height="2" fill="${accent}"/><rect x="8" y="20" width="59" height="2" fill="${accent}"/><rect x="8" y="58" width="59" height="2" fill="${accent}"/><rect x="8" y="62" width="59" height="2" fill="${accent}"/><text x="16" y="42" font-size="20" font-style="italic" fill="${accent}" opacity="0.3">A</text><rect x="28" y="32" width="32" height="2" fill="#c0c6cf"/><rect x="28" y="40" width="26" height="2" fill="#c0c6cf"/><rect x="28" y="48" width="30" height="2" fill="#c0c6cf"/>`
  );
}
const magazineDropcap = {
  meta: {
    id: "magazine-dropcap",
    kind: "quote",
    name: "杂志风金句",
    description: "上下双粗线 + 大号斜体引号",
    designedFor: ["literary-humanism"]
  },
  thumbnail: thumb$1S,
  snippets: [
    {
      presetId: "q-magazine",
      name: "杂志风金句",
      description: "上下双粗线 + 大号斜体引号",
      designedFor: ["literary-humanism"],
      markdown: "::: quote-card 出处 variant=magazine-dropcap\n此处填写金句正文\n:::\n"
    },
    {
      presetId: "q-magazine-2",
      name: "杂志风无署名",
      description: "杂志气质极简版",
      designedFor: ["literary-humanism"],
      markdown: "::: quote-card variant=magazine-dropcap\n此处填写金句正文\n:::\n"
    }
  ],
  render: (ctx) => {
    const pad = ctx.tokens.spacing.containerPadding;
    const accent = ctx.tokens.colors.primary;
    return {
      wrapperCSS: `background-color:${ctx.tokens.colors.bg};padding:${pad + 6}px ${pad + 2}px;margin:24px 0;border-top:3px double ${accent};border-bottom:3px double ${accent}`,
      bodyCSS: `font-size:17px;line-height:1.85;color:${ctx.tokens.colors.text}`,
      svgSlot: DROPCAP_QUOTE
    };
  }
};
function thumb$1R(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<rect x="12" y="18" width="2" height="40" fill="${accent}"/><rect x="61" y="18" width="2" height="40" fill="${accent}"/><rect x="22" y="30" width="32" height="2" fill="#c0c6cf"/><rect x="22" y="38" width="30" height="2" fill="#c0c6cf"/><rect x="22" y="46" width="26" height="2" fill="#c0c6cf"/>`
  );
}
const columnRule = {
  meta: {
    id: "column-rule",
    kind: "quote",
    name: "双竖线引用",
    description: "左右各一根细竖线夹正文"
  },
  thumbnail: thumb$1R,
  snippets: [
    {
      presetId: "q-column",
      name: "双竖线引用",
      description: "左右各一根细竖线夹正文",
      markdown: "::: quote-card 作者 variant=column-rule\n此处填写正文\n:::\n"
    },
    {
      presetId: "q-column-2",
      name: "双竖线精简",
      description: "留白多，正文呼吸感强",
      markdown: "::: quote-card variant=column-rule\n此处填写正文\n:::\n"
    }
  ],
  render: (ctx) => {
    const accent = ctx.tokens.colors.primary;
    return {
      wrapperCSS: `padding:18px 28px;margin:22px 12px;border-left:3px solid ${accent};border-right:3px solid ${accent}`,
      bodyCSS: `font-size:16px;line-height:1.85;text-align:center;color:${ctx.tokens.colors.text}`
    };
  }
};
function topBracketsSvg(accent) {
  return `<svg viewBox="0 0 320 20" width="100%" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="display:block;margin-bottom:-20px"><path d="M0,20 L0,0 L20,0 M300,0 L320,0 L320,20" stroke="${accent}" stroke-width="2" fill="none"/></svg>`;
}
function bottomBracketsSvg(accent) {
  return `<svg viewBox="0 0 320 20" width="100%" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="display:block;margin-top:-20px"><path d="M0,0 L0,20 L20,20 M300,20 L320,20 L320,0" stroke="${accent}" stroke-width="2" fill="none"/></svg>`;
}
function thumb$1Q(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<path d="M10,14 L10,10 L16,10 M59,10 L65,10 L65,14 M10,61 L10,65 L16,65 M59,65 L65,65 L65,61" stroke="${accent}" stroke-width="1.5" fill="none"/><rect x="22" y="30" width="32" height="2" fill="#c0c6cf"/><rect x="22" y="38" width="30" height="2" fill="#c0c6cf"/><rect x="22" y="46" width="26" height="2" fill="#c0c6cf"/>`
  );
}
const frameBrackets = {
  meta: {
    id: "frame-brackets",
    kind: "quote",
    name: "四角括号框",
    description: "四角 L 形装饰，中间全留白"
  },
  thumbnail: thumb$1Q,
  snippets: [
    {
      presetId: "q-brackets",
      name: "四角括号框",
      description: "四角 L 形装饰，中间全留白",
      markdown: "::: quote-card 作者 variant=frame-brackets\n此处填写正文\n:::\n"
    },
    {
      presetId: "q-brackets-2",
      name: "四角括号无署名",
      description: "最克制的引用",
      markdown: "::: quote-card variant=frame-brackets\n此处填写正文\n:::\n"
    }
  ],
  render: (ctx) => {
    const accent = ctx.tokens.colors.primary;
    return {
      // 几何：top/bottom SVG 用 margin-bottom:-20 / margin-top:-20 "悬浮"不占布局流，
      // body 流仍从 wrapper 顶 / 底起——这意味着 **wrapper padding 控制不了 L 角到正文的距离**，
      // 只控制 L 角到 wrapper 边的距离。早期版本误把 padding-y 当净空，正文首行仍被 L 竖边压。
      // 正确分工：wrapper padding-y = L 角与 wrapper 边的小间距（16）；body 自己加 padding
      // 让正文与 L 角保持视觉净空（36 = 20 SVG 高 + 16 净空）。
      wrapperCSS: `padding:16px 24px;margin:22px 0`,
      bodyCSS: `padding:36px 0;font-size:16px;line-height:1.85;text-align:center;color:${ctx.tokens.colors.text}`,
      svgSlot: topBracketsSvg(accent),
      closeSlot: bottomBracketsSvg(accent)
    };
  }
};
function thumb$1P(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<g transform="rotate(-2 37 37)"><rect x="9" y="20" width="56" height="34" fill="#f0f0f0"/><rect x="14" y="26" width="36" height="3" fill="#0a0a0a"/><rect x="14" y="32" width="44" height="3" fill="#0a0a0a"/><rect x="14" y="38" width="28" height="3" fill="#0a0a0a"/><rect x="14" y="46" width="20" height="2" fill="${accent}"/></g>`
  );
}
const tiltedSticker = {
  meta: {
    id: "tilted-sticker",
    kind: "quote",
    name: "旋转贴纸金句",
    description: "反色 + 微旋转 -1deg，punk-zine 撕贴纸感",
    designedFor: ["brutalist", "late-night-vinyl"]
  },
  thumbnail: thumb$1P,
  snippets: [
    {
      presetId: "q-tilted-sticker",
      name: "旋转贴纸金句",
      description: "反色 + 微旋转，punk-zine 撕贴纸感",
      designedFor: ["brutalist", "late-night-vinyl"],
      markdown: '::: quote-card BORGES, J.L. variant=tilted-sticker\n"凡我所是，皆因我读。"\n:::\n'
    },
    {
      presetId: "q-tilted-sticker-no-byline",
      name: "旋转贴纸无署名",
      description: "反色 + 微旋转，无作者",
      designedFor: ["brutalist", "late-night-vinyl"],
      markdown: "::: quote-card variant=tilted-sticker\n大字号金句正文\n:::\n"
    }
  ],
  render: (ctx) => {
    const pad = ctx.tokens.spacing.containerPadding;
    return {
      wrapperCSS: `background-color:${ctx.tokens.colors.bgSoft};padding:${pad}px ${pad + 2}px;margin:24px 0;transform:rotate(-1deg);border-radius:0`,
      // text-align 故意 left；body 文字主导 punk-zine 的视觉重量。
      // 不写 color：让 `<p>` 走 baseElements 默认 tokens.text，与 bgSoft 自然成对比。
      bodyCSS: `font-size:20px;font-weight:700;line-height:1.3;text-align:left;letter-spacing:-0.005em`
    };
  }
};
function thumb$1O(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/><rect x="6" y="14" width="5" height="47" fill="${accent}"/><rect x="16" y="22" width="38" height="4" fill="#1a1a1a"/><rect x="16" y="30" width="34" height="4" fill="#1a1a1a"/><rect x="16" y="48" width="22" height="2" fill="#9aa0a6"/>`
  );
}
const editorialBlock = {
  meta: {
    id: "editorial-block",
    kind: "quote",
    name: "编辑部磁砖引用",
    description: "左 6px 实色条 + 浅底 + 大写字距 byline",
    designedFor: ["data-brief", "editorial-mook", "business-finance", "industry-observer"]
  },
  thumbnail: thumb$1O,
  snippets: [
    {
      presetId: "q-editorial-block",
      name: "编辑部磁砖引用",
      description: "左色条 + 大号粗体 + 印刷体 byline",
      designedFor: ["data-brief", "editorial-mook", "business-finance", "industry-observer"],
      markdown: "::: quote-card J. L. BORGES · 1960 variant=editorial-block\n凡我所是，皆因我读。\n:::\n"
    },
    {
      presetId: "q-editorial-block-no-byline",
      name: "磁砖引用无署名",
      description: "纯重点段落，作版面节奏",
      designedFor: ["data-brief", "editorial-mook", "business-finance", "industry-observer"],
      markdown: "::: quote-card variant=editorial-block\n此处填写重点段落正文\n:::\n"
    }
  ],
  render: (ctx) => {
    const pad = ctx.tokens.spacing.containerPadding;
    const accent = ctx.tokens.colors.primary;
    return {
      wrapperCSS: `background-color:${ctx.tokens.colors.bgSoft};padding:${pad + 2}px ${pad + 4}px;margin:22px 0;border-left:6px solid ${accent}`,
      bodyCSS: `font-size:20px;font-weight:700;line-height:1.45;text-align:left;color:${ctx.tokens.colors.text};letter-spacing:-0.005em`,
      bylineCSS: `text-align:left;color:${ctx.tokens.colors.textMuted};margin-top:14px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase`,
      bylinePrefix: "— "
    };
  }
};
function thumb$1N(args) {
  const { text, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/><text x="10" y="38" font-size="28" fill="${text}" opacity="0.5" font-style="italic">&#8220;</text><rect x="18" y="42" width="38" height="2" fill="${text}" opacity="0.25"/><rect x="28" y="50" width="28" height="2" fill="${text}" opacity="0.18"/>`
  );
}
const variantDef$v = {
  meta: {
    id: "oversized-mark",
    kind: "quote",
    name: "巨号引号",
    description: '左上巨号 Cormorant " + italic Lora 正文 + 右下编辑部署名',
    designedFor: ["editorial-mook", "data-brief"]
  },
  thumbnail: thumb$1N,
  snippets: [
    {
      presetId: "q-oversized-mark",
      name: "巨号引号",
      description: "左上巨号引号 + italic Lora 正文（编辑部 v1）",
      markdown: "::: quote-card 韩少功《马桥词典》 variant=oversized-mark\n沉默是一种回答，只是我们经常听不见。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const pad = ctx.tokens.spacing.containerPadding;
    const svgSlot = `<section style="line-height:.8;padding:${pad - 2}px ${pad}px 0"><span style="font-family:'Cormorant Garamond',serif;font-size:72px;color:${c.text};font-weight:500;font-style:italic;display:block;height:36px;overflow:hidden;">&#8220;</span></section>`;
    return {
      wrapperCSS: [
        `background-color:${c.bg}`,
        `padding:0 0 ${pad}px`,
        `margin:20px 0`
      ].join(";"),
      bodyCSS: [
        `font-family:'Lora','Noto Serif SC',serif`,
        `font-size:21px`,
        `font-style:italic`,
        `line-height:1.6`,
        `color:${c.text}`,
        `font-weight:500`,
        `margin:6px 0 12px`,
        `padding:0 ${pad}px`,
        `letter-spacing:.01em`
      ].join(";"),
      svgSlot,
      bylineCSS: [
        `display:flex`,
        `justify-content:space-between`,
        `align-items:baseline`,
        `border-top:1px solid ${c.text}`,
        `padding:8px ${pad}px 0`,
        `font-size:12px`,
        `color:${c.textMuted}`
      ].join(";"),
      bylinePrefix: ""
    };
  }
};
function thumb$1M(args) {
  const { text, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/><rect x="18" y="22" width="1" height="31" fill="${text}" opacity="0.2"/><text x="10" y="32" font-size="7" fill="${text}" opacity="0.4" font-family="monospace">01</text><text x="10" y="44" font-size="7" fill="${text}" opacity="0.4" font-family="monospace">02</text><rect x="22" y="26" width="32" height="2" fill="${text}" opacity="0.3"/><rect x="22" y="34" width="36" height="2" fill="${text}" opacity="0.3"/><rect x="22" y="42" width="28" height="2" fill="${text}" opacity="0.3"/>`
  );
}
const HEADER_SLOT = `<section style="font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.24em;margin-bottom:10px;">— EXCERPT 003 —</section>`;
const variantDef$u = {
  meta: {
    id: "numbered-lines",
    kind: "quote",
    name: "编号竖列",
    description: "左 IBM Plex 编号竖列 + 1px 竖分隔（编辑部 v2）",
    designedFor: ["editorial-mook", "data-brief"]
  },
  thumbnail: thumb$1M,
  snippets: [
    {
      presetId: "q-numbered-lines",
      name: "编号竖列",
      description: "左行号列 + 引文分行（编辑部 v2）",
      markdown: "::: quote-card 黑塞·《德米安》 variant=numbered-lines\n我们终其一生，是为了摆脱\n\n他人的期待，找到真正的自己。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const pad = ctx.tokens.spacing.containerPadding;
    return {
      wrapperCSS: [
        `background-color:${c.bg ?? "#fbfaf7"}`,
        `padding:${pad - 2}px ${pad}px ${pad}px`,
        `margin:20px 0`
      ].join(";"),
      bodyCSS: [
        `font-family:'Lora','Noto Serif SC',serif`,
        `font-size:18px`,
        `line-height:1.75`,
        `color:${c.text}`
      ].join(";"),
      svgSlot: HEADER_SLOT,
      bylineCSS: [
        `font-family:'Noto Serif SC',serif`,
        `font-size:12px`,
        `color:${c.textMuted}`,
        `margin-top:14px`,
        `letter-spacing:.06em`
      ].join(";"),
      bylinePrefix: "— "
    };
  }
};
function thumb$1L(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/><rect x="29" y="20" width="17" height="17" fill="${accent}"/><text x="37" y="32" font-size="10" fill="${soft}" text-anchor="middle" font-weight="600">引</text><rect x="14" y="44" width="47" height="2" fill="${text}" opacity="0.2"/><rect x="18" y="50" width="39" height="2" fill="${text}" opacity="0.2"/>`
  );
}
function buildSealSlot(accentColor, bgColor) {
  return `<section style="display:flex;justify-content:center;margin-bottom:14px;"><span style="width:30px;height:30px;background:${accentColor};color:${bgColor};font-family:'Noto Serif SC',serif;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;letter-spacing:0;">句</span></section>`;
}
const variantDef$t = {
  meta: {
    id: "seal-kai",
    kind: "quote",
    name: "楷字朱印",
    description: "居中朱印楷字 + 引文居中 + 朱破折号 byline（宋本 v1）",
    designedFor: ["literary-humanism", "life-aesthetic"]
  },
  thumbnail: thumb$1L,
  snippets: [
    {
      presetId: "q-seal-kai",
      name: "楷字朱印",
      description: "居中朱印 + 楷体引文（宋本 v1）",
      markdown: "::: quote-card 纳兰性德 variant=seal-kai\n人生若只如初见，何事秋风悲画扇。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const pad = ctx.tokens.spacing.containerPadding;
    const accent = c.accentClassical ?? c.accent;
    const bg = c.bg;
    return {
      wrapperCSS: [
        `background-color:${bg}`,
        `padding:18px ${pad}px 14px`,
        `margin:20px 0`
      ].join(";"),
      bodyCSS: [
        `font-size:19px`,
        `line-height:1.85`,
        `color:${c.text}`,
        `text-align:center`,
        `font-weight:500`,
        `margin:0 0 14px`,
        `letter-spacing:.04em`
      ].join(";"),
      svgSlot: buildSealSlot(accent, bg),
      bylineCSS: [
        `text-align:center`,
        `font-size:12px`,
        `color:${accent}`,
        `letter-spacing:.2em`
      ].join(";"),
      bylinePrefix: "— "
    };
  }
};
function thumb$1K(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="12" width="63" height="51" rx="2" fill="${soft}" stroke="${accent}" stroke-width="1"/><rect x="11" y="17" width="53" height="41" rx="1" fill="none" stroke="${accent}" stroke-width="1"/><rect x="16" y="26" width="38" height="2" fill="${text}" opacity="0.3"/><rect x="16" y="33" width="33" height="2" fill="${text}" opacity="0.3"/><rect x="33" y="44" width="18" height="2" fill="${accent}" opacity="0.6"/>`
  );
}
const variantDef$s = {
  meta: {
    id: "double-frame",
    kind: "quote",
    name: "双层边框",
    description: "双层朱字边框 + 引文 italic Lora + 朱色 byline（宋本 v2）",
    designedFor: ["literary-humanism", "life-aesthetic"]
  },
  thumbnail: thumb$1K,
  snippets: [
    {
      presetId: "q-double-frame",
      name: "双层边框",
      description: "双层朱字边框 + italic 正文（宋本 v2）",
      markdown: "::: quote-card 黄庭坚 variant=double-frame\n念念不忘，必有回响；\n\n有灯，就有人。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const pad = ctx.tokens.spacing.containerPadding;
    const accent = c.accentClassical ?? c.accent;
    const bg = c.bg;
    const borderMuted = c.textMuted;
    const innerSlot = `<section style="border:1px solid ${borderMuted};padding:18px ${pad - 2}px 16px;">`;
    const closeSlot = `</section>`;
    return {
      wrapperCSS: [
        `background-color:${bg}`,
        `padding:10px`,
        `margin:20px 0`,
        `border:1px solid ${borderMuted}`
      ].join(";"),
      bodyCSS: [
        `font-family:'Lora','Noto Serif SC',serif`,
        `font-size:18px`,
        `line-height:1.85`,
        `color:${c.text}`,
        `margin:0 0 12px`,
        `font-weight:500`
      ].join(";"),
      svgSlot: innerSlot,
      bylineCSS: [
        `display:flex`,
        `justify-content:flex-end`,
        `align-items:center`,
        `gap:8px`,
        `font-family:'Noto Serif SC',serif`,
        `font-size:11px`,
        `color:${accent}`,
        `letter-spacing:.2em`
      ].join(";"),
      bylinePrefix: "",
      closeSlot
    };
  }
};
function thumb$1J(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/><rect x="10" y="20" width="8" height="1" fill="${text}" opacity="0.5"/><rect x="57" y="20" width="8" height="1" fill="${text}" opacity="0.5"/><text x="37" y="20" font-size="6" fill="${text}" opacity="0.5" text-anchor="middle" font-family="monospace">SPEC.</text><rect x="12" y="28" width="51" height="2" fill="${text}" opacity="0.25"/><rect x="12" y="35" width="45" height="2" fill="${text}" opacity="0.25"/><rect x="12" y="42" width="36" height="2" fill="${text}" opacity="0.25"/><rect x="12" y="52" width="22" height="2" fill="${accent}" opacity="0.6"/>`
  );
}
const SPEC_SLOT = `<section style="display:flex;align-items:stretch;gap:8px;">`;
const variantDef$r = {
  meta: {
    id: "specimen-quote",
    kind: "quote",
    name: "标本引文",
    description: "SPEC.NO 测量括弧 + 学名样 byline（博物 v1）",
    designedFor: ["academic-frontier", "tech-explainer"]
  },
  thumbnail: thumb$1J,
  snippets: [
    {
      presetId: "q-specimen-quote",
      name: "标本引文",
      description: "测量括弧 + 引文 + 学名样出处（博物 v1）",
      markdown: "::: quote-card Fragment IX variant=specimen-quote\n所有过往的失败，都是为了让今天的失败显得不那么不可承受。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const pad = ctx.tokens.spacing.containerPadding;
    const accent = c.accentNaturalist ?? c.accent;
    const bg = c.bg;
    const borderColor = c.text;
    const leftBracket = `<section style="width:8px;border-top:1px solid ${borderColor};border-bottom:1px solid ${borderColor};border-left:1px solid ${borderColor};flex-shrink:0;"></section>`;
    const rightBracket = `<section style="width:8px;border-top:1px solid ${borderColor};border-bottom:1px solid ${borderColor};border-right:1px solid ${borderColor};flex-shrink:0;"></section>`;
    const bracketWrapper = SPEC_SLOT + leftBracket + `<section style="flex:1;padding:6px 0 8px;">`;
    const closeSlot = `</section>` + rightBracket + `</section>`;
    return {
      wrapperCSS: [
        `background-color:${bg}`,
        `padding:${pad - 2}px ${pad}px ${pad}px`,
        `margin:20px 0`
      ].join(";"),
      bodyCSS: [
        `font-size:17px`,
        `line-height:1.85`,
        `color:${c.text}`,
        `margin:0`,
        `font-weight:500`
      ].join(";"),
      svgSlot: bracketWrapper,
      bylineCSS: [
        `display:flex`,
        `justify-content:space-between`,
        `align-items:baseline`,
        `margin-top:10px`,
        `font-size:12px`
      ].join(";"),
      bylinePrefix: `<span style="font-family:'Lora',serif;font-style:italic;color:${accent};">— </span>`,
      closeSlot
    };
  }
};
function thumb$1I(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/><rect x="10" y="25" width="55" height="1" fill="${text}" opacity="0.4"/><text x="10" y="23" font-size="7" fill="${accent}" opacity="0.8" font-style="italic" font-family="serif">Sententia · 句</text><rect x="10" y="32" width="50" height="2" fill="${text}" opacity="0.3"/><rect x="10" y="39" width="44" height="2" fill="${text}" opacity="0.3"/><rect x="10" y="52" width="30" height="2" fill="${text}" opacity="0.2"/><rect x="43" y="52" width="23" height="2" fill="${text}" opacity="0.2"/>`
  );
}
const variantDef$q = {
  meta: {
    id: "binomial-attrib",
    kind: "quote",
    name: "双名法 byline",
    description: "学名 + 命名人式 byline + 朱字 italic（博物 v2）",
    designedFor: ["academic-frontier", "tech-explainer"]
  },
  thumbnail: thumb$1I,
  snippets: [
    {
      presetId: "q-binomial-attrib",
      name: "双名法 byline",
      description: "学名分隔线 + 引文 + 双名法出处（博物 v2）",
      markdown: "::: quote-card M. PROUST · 1923 variant=binomial-attrib\n真正的旅行不在于看到新的风景，而在于换一双新的眼睛。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const pad = ctx.tokens.spacing.containerPadding;
    const accent = c.accentNaturalist ?? c.accent;
    const bg = c.bg;
    const headerSlot = `<section style="font-family:'Lora',serif;font-style:italic;font-size:13px;color:${accent};letter-spacing:.02em;border-bottom:1px solid ${c.text};padding-bottom:4px;margin-bottom:14px;">Sententia · 句</section>`;
    return {
      wrapperCSS: [
        `background-color:${bg}`,
        `padding:8px ${pad}px`,
        `margin:20px 0`
      ].join(";"),
      bodyCSS: [
        `font-size:18px`,
        `line-height:1.78`,
        `color:${c.text}`,
        `margin:0 0 16px`,
        `font-weight:500`
      ].join(";"),
      svgSlot: headerSlot,
      bylineCSS: [
        `display:flex`,
        `justify-content:space-between`,
        `align-items:baseline`,
        `font-size:11px`,
        `font-family:'IBM Plex Mono',monospace`,
        `color:${c.textMuted}`,
        `letter-spacing:.16em`
      ].join(";"),
      bylinePrefix: ""
    };
  }
};
function thumb$1H(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/><text x="10" y="48" font-size="34" fill="${accent}" opacity="0.85" font-style="italic" font-family="serif">07</text><rect x="36" y="26" width="27" height="2" fill="${text}" opacity="0.3"/><rect x="36" y="33" width="23" height="2" fill="${text}" opacity="0.3"/><rect x="36" y="43" width="27" height="1" fill="${text}" opacity="0.5"/><rect x="36" y="49" width="22" height="2" fill="${text}" opacity="0.2"/>`
  );
}
const variantDef$p = {
  meta: {
    id: "huge-numeral",
    kind: "quote",
    name: "巨号编号",
    description: "左 Lora 72px 编号 + 右大字 sans 引文 + accent 短线 byline（包豪斯 v1）",
    designedFor: ["swiss-grid", "brutalist"]
  },
  thumbnail: thumb$1H,
  snippets: [
    {
      presetId: "q-huge-numeral",
      name: "巨号编号",
      description: "左 Lora 巨号 + 右引文 + monospace byline（包豪斯 v1）",
      markdown: "::: quote-card SHAKESPEARE · TEMPEST variant=huge-numeral\n凡是过往，皆为序章。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const pad = ctx.tokens.spacing.containerPadding;
    const accent = c.accent;
    const bg = c.bg;
    const numeralSlot = `<section style="display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:start;"><section style="font-family:'Lora',serif;font-size:72px;line-height:.85;color:${accent};font-weight:400;letter-spacing:-.04em;">07</section><section style="padding-top:6px;">`;
    const closeSlot = `</section></section>`;
    return {
      wrapperCSS: [
        `background-color:${bg}`,
        `padding:${pad - 2}px ${pad}px ${pad}px`,
        `margin:20px 0`
      ].join(";"),
      bodyCSS: [
        `font-family:'Noto Serif SC',serif`,
        `font-size:16.5px`,
        `line-height:1.75`,
        `color:${c.text}`,
        `margin:0 0 10px`,
        `font-weight:500`
      ].join(";"),
      svgSlot: numeralSlot,
      bylineCSS: [
        `font-family:'IBM Plex Mono',monospace`,
        `font-size:10px`,
        `color:${c.textMuted}`,
        `letter-spacing:.16em`,
        `border-top:1px solid ${c.text}`,
        `padding-top:6px`,
        `margin-top:0`
      ].join(";"),
      bylinePrefix: "",
      closeSlot
    };
  }
};
function thumb$1G(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/><circle cx="16" cy="24" r="5" fill="none" stroke="${text}" stroke-width="1.5"/><circle cx="38" cy="24" r="4" fill="${accent}"/><polygon points="58,20 68,20 63,28" fill="${text}"/><rect x="10" y="35" width="55" height="2" fill="${text}" opacity="0.3"/><rect x="10" y="42" width="47" height="2" fill="${text}" opacity="0.3"/><rect x="10" y="54" width="32" height="2" fill="${text}" opacity="0.2"/>`
  );
}
const variantDef$o = {
  meta: {
    id: "ring-device",
    kind: "quote",
    name: "圆环 device",
    description: "上方圆环 device + 大字 sans 引文 + Plex Mono byline（包豪斯 v2）",
    designedFor: ["swiss-grid", "brutalist"]
  },
  thumbnail: thumb$1G,
  snippets: [
    {
      presetId: "q-ring-device",
      name: "圆环 device",
      description: "几何 device + 引文 + mono byline（包豪斯 v2）",
      markdown: "::: quote-card D. RAMS, 1976 variant=ring-device\n设计不是装饰，而是某种秩序的可视化。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const pad = ctx.tokens.spacing.containerPadding;
    const accent = c.accent;
    const bg = c.bg;
    const deviceSlot = `<section style="display:flex;gap:10px;align-items:center;margin-bottom:14px;color:${c.text};"><span style="width:22px;height:22px;border:2px solid ${c.text};border-radius:50%;display:inline-block;flex-shrink:0;"></span><span style="flex:1;height:1px;background:${c.text};"></span><span style="width:14px;height:14px;background:${accent};border-radius:50%;display:inline-block;flex-shrink:0;"></span><span style="flex:1;height:1px;background:${c.text};"></span><span style="width:0;height:0;border-left:11px solid transparent;border-right:11px solid transparent;border-bottom:18px solid ${c.text};display:inline-block;flex-shrink:0;"></span></section>`;
    return {
      wrapperCSS: [
        `background-color:${bg}`,
        `padding:14px ${pad}px ${pad}px`,
        `margin:20px 0`
      ].join(";"),
      bodyCSS: [
        `font-family:'Noto Serif SC',serif`,
        `font-size:18px`,
        `line-height:1.7`,
        `color:${c.text}`,
        `margin:0 0 8px`,
        `font-weight:500`,
        `letter-spacing:.01em`
      ].join(";"),
      svgSlot: deviceSlot,
      bylineCSS: [
        `font-family:'IBM Plex Mono',monospace`,
        `font-size:10px`,
        `color:${c.textMuted}`,
        `letter-spacing:.2em`,
        `text-transform:uppercase`
      ].join(";"),
      bylinePrefix: "— "
    };
  }
};
const quoteAll = [
  classic,
  magazineDropcap,
  columnRule,
  frameBrackets,
  tiltedSticker,
  editorialBlock,
  variantDef$v,
  variantDef$u,
  variantDef$t,
  variantDef$s,
  variantDef$r,
  variantDef$q,
  variantDef$p,
  variantDef$o
];
const COL_FONT_SIZE$1 = 13;
const COL_INNER_PAD = 8;
function thumb$1F(args) {
  const { soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="16" width="29" height="45" rx="3" fill="${soft}"/><rect x="40" y="16" width="29" height="45" rx="3" fill="${soft}"/><rect x="12" y="22" width="15" height="2" fill="#1a8450"/><rect x="12" y="30" width="18" height="2" fill="#c0c6cf"/><rect x="12" y="36" width="14" height="2" fill="#c0c6cf"/><rect x="46" y="22" width="15" height="2" fill="#b42318"/><rect x="46" y="30" width="18" height="2" fill="#c0c6cf"/><rect x="46" y="36" width="14" height="2" fill="#c0c6cf"/>`
  );
}
const columnCard = {
  meta: {
    id: "column-card",
    kind: "compare",
    name: "两栏卡片对比",
    description: "等高 table-cell 两栏（默认）"
  },
  thumbnail: thumb$1F,
  snippets: [
    {
      presetId: "cmp-column-card",
      name: "两栏卡片对比",
      description: "等高 table-cell 两栏（默认）",
      markdown: ":::: compare\n::: pros 优点\n- 要点 1\n- 要点 2\n:::\n::: cons 缺点\n- 要点 1\n- 要点 2\n:::\n::::\n"
    },
    {
      presetId: "cmp-column-rich",
      name: "两栏 + 标题",
      description: "每栏带自定义标题",
      markdown: ":::: compare\n::: pros 方案 A\n适合场景 / 成本 / 时效\n:::\n::: cons 方案 B\n适合场景 / 成本 / 时效\n:::\n::::\n"
    }
  ],
  render: (ctx, { slot }) => {
    if (slot === "wrapper") {
      return {
        wrapperCSS: `display:table;width:100%;table-layout:fixed;border-spacing:4px 0;border-collapse:separate;margin:16px 0`
      };
    }
    const pair = slot === "pros" ? ctx.tokens.colors.status.tip.accent : ctx.tokens.colors.status.danger.accent;
    return {
      wrapperCSS: `display:table-cell;vertical-align:top;width:50%;box-sizing:border-box;padding:${COL_INNER_PAD}px;background-color:${ctx.tokens.colors.bgSoft};border-radius:${ctx.tokens.radius.md}px;font-size:${COL_FONT_SIZE$1}px;letter-spacing:0`,
      titleCSS: `font-size:${COL_FONT_SIZE$1 + 1}px;font-weight:700;color:${pair};margin-bottom:8px;letter-spacing:0;line-height:1.4`
    };
  }
};
function thumb$1E() {
  return svg(
    `<rect x="6" y="14" width="63" height="20" rx="3" fill="#eef7f0"/><rect x="6" y="14" width="3" height="20" fill="#1a8450"/><rect x="14" y="20" width="28" height="2" fill="#1a8450"/><rect x="14" y="26" width="40" height="2" fill="#c0c6cf"/><rect x="6" y="41" width="63" height="20" rx="3" fill="#fdecea"/><rect x="6" y="41" width="3" height="20" fill="#b42318"/><rect x="14" y="47" width="28" height="2" fill="#b42318"/><rect x="14" y="53" width="36" height="2" fill="#c0c6cf"/>`
  );
}
const stackedRow = {
  meta: {
    id: "stacked-row",
    kind: "compare",
    name: "上下堆叠对比",
    description: "两行全宽，小屏可读性高"
  },
  thumbnail: thumb$1E,
  snippets: [
    {
      presetId: "cmp-stacked",
      name: "上下堆叠对比",
      description: "两行全宽，小屏可读性高",
      markdown: ":::: compare variant=stacked-row\n::: pros 优点\n- 要点 1\n- 要点 2\n:::\n::: cons 缺点\n- 要点 1\n- 要点 2\n:::\n::::\n"
    },
    {
      presetId: "cmp-stacked-rich",
      name: "上下堆叠 + 段落",
      description: "每栏多段正文时推荐",
      markdown: ":::: compare variant=stacked-row\n::: pros 方案 A\n一段说明。\n\n- 要点一\n- 要点二\n:::\n::: cons 方案 B\n一段说明。\n\n- 要点一\n- 要点二\n:::\n::::\n"
    }
  ],
  render: (ctx, { slot }) => {
    if (slot === "wrapper") {
      return { wrapperCSS: `margin:16px 0` };
    }
    const pair = slot === "pros" ? ctx.tokens.colors.status.tip : ctx.tokens.colors.status.danger;
    return {
      wrapperCSS: `display:block;padding:12px 14px;margin-bottom:8px;background-color:${pair.soft};border-left:3px solid ${pair.accent};border-radius:0 4px 4px 0`,
      titleCSS: `font-weight:700;color:${pair.accent};margin-bottom:6px;font-size:14px`
    };
  }
};
const COL_FONT_SIZE = 13;
function thumb$1D() {
  return svg(
    `<rect x="8" y="16" width="59" height="43" rx="3" fill="#fff" stroke="#c0c6cf"/><rect x="8" y="16" width="30" height="43" fill="#eef7f0"/><rect x="38" y="16" width="29" height="43" fill="#fdecea"/><rect x="14" y="24" width="16" height="2" fill="#1a8450"/><rect x="14" y="32" width="18" height="2" fill="#c0c6cf"/><rect x="44" y="24" width="16" height="2" fill="#b42318"/><rect x="44" y="32" width="18" height="2" fill="#c0c6cf"/>`
  );
}
const ledger = {
  meta: {
    id: "ledger",
    kind: "compare",
    name: "账本双色对比",
    description: "绿/红双色列，账面感"
  },
  thumbnail: thumb$1D,
  snippets: [
    {
      presetId: "cmp-ledger",
      name: "账本双色对比",
      description: "绿/红双色列，账面感",
      markdown: ":::: compare variant=ledger\n::: pros 优点\n- 要点 1\n- 要点 2\n:::\n::: cons 缺点\n- 要点 1\n- 要点 2\n:::\n::::\n"
    },
    {
      presetId: "cmp-ledger-short",
      name: "账本精简",
      description: "单列 ≤3 行场景",
      markdown: ":::: compare variant=ledger\n::: pros 收入\n- 订阅\n- 广告\n:::\n::: cons 支出\n- 服务器\n- 人力\n:::\n::::\n"
    }
  ],
  render: (ctx, { slot }) => {
    if (slot === "wrapper") {
      return {
        wrapperCSS: `display:table;width:100%;table-layout:fixed;border-spacing:0;border-collapse:separate;margin:16px 0;border:1px solid ${ctx.tokens.colors.border};border-radius:6px`
      };
    }
    const pair = slot === "pros" ? ctx.tokens.colors.status.tip : ctx.tokens.colors.status.danger;
    const borderRight = slot === "pros" ? `border-right:1px solid ${ctx.tokens.colors.border}` : "border-right:0";
    const radius = slot === "pros" ? `border-radius:5px 0 0 5px` : `border-radius:0 5px 5px 0`;
    return {
      wrapperCSS: `display:table-cell;vertical-align:top;width:50%;box-sizing:border-box;padding:12px;background-color:${pair.soft};${borderRight};${radius};font-size:${COL_FONT_SIZE}px;letter-spacing:0`,
      titleCSS: `font-weight:700;color:${pair.accent};margin-bottom:6px;font-size:${COL_FONT_SIZE + 1}px`
    };
  }
};
function thumb$1C() {
  return svg(
    `<rect x="6" y="14" width="29" height="46" fill="#f5f7fa"/><rect x="38" y="14" width="29" height="46" fill="#f5f7fa"/><rect x="6" y="14" width="29" height="3" fill="#1756d1"/><rect x="38" y="14" width="29" height="3" fill="#b22d18"/><rect x="11" y="22" width="10" height="2" fill="#5a6068"/><rect x="43" y="22" width="10" height="2" fill="#5a6068"/><rect x="11" y="32" width="18" height="6" fill="#111418"/><rect x="43" y="32" width="18" height="6" fill="#111418"/><rect x="11" y="48" width="20" height="2" fill="#5a6068"/><rect x="43" y="48" width="20" height="2" fill="#5a6068"/>`
  );
}
const dataCard = {
  meta: {
    id: "data-card",
    kind: "compare",
    name: "数据卡对比",
    description: "顶 3px 色条 + 大号数字，data-brief 签名"
  },
  thumbnail: thumb$1C,
  snippets: [
    {
      presetId: "cmp-data-card",
      name: "数据卡对比",
      description: "data-brief 数据卡：顶蓝/红色条 + 大号数字",
      markdown: ':::: compare variant=data-card\n::: pros 纸 本 value="+37%" caption="深度理解得分"\n:::\n::: cons 屏 读 value="+210%" caption="跳读切换次数"\n:::\n::::\n'
    }
  ],
  render: (ctx, { slot }) => {
    if (slot === "wrapper") {
      return {
        wrapperCSS: `display:table;width:100%;table-layout:fixed;border-spacing:8px 0;border-collapse:separate;margin:16px 0`
      };
    }
    const c = ctx.tokens.colors;
    const topColor = slot === "pros" ? c.primary : c.status.danger.accent;
    const value = (ctx.attrs.value ?? "").trim();
    const caption = (ctx.attrs.caption ?? "").trim();
    const title = ctx.info.trim();
    if (value || caption) {
      const titleEl = title ? `<section class="container-${slot}__title" style="font-size:10px;font-weight:400;color:${c.textMuted};letter-spacing:0.1em;margin-bottom:6px">${escText(title)}</section>` : "";
      const valueEl = value ? `<section class="container-${slot}__value" style="font-size:22px;font-weight:700;color:${c.text};line-height:1;margin-bottom:4px;letter-spacing:-0.01em">${escText(value)}</section>` : "";
      const captionEl = caption ? `<section class="container-${slot}__caption" style="font-size:10px;color:${c.textMuted};line-height:1.5">${escText(caption)}</section>` : "";
      return {
        wrapperCSS: `display:table-cell;vertical-align:top;width:50%;box-sizing:border-box;padding:12px 12px 10px;background-color:${c.bgSoft};border-top:3px solid ${topColor};border-radius:0`,
        titleCSS: "",
        svgSlot: titleEl + valueEl + captionEl
      };
    }
    return {
      wrapperCSS: `display:table-cell;vertical-align:top;width:50%;box-sizing:border-box;padding:12px 12px 10px;background-color:${c.bgSoft};border-top:3px solid ${topColor};border-radius:0`,
      titleCSS: (
        // 小字 kicker（"纸 本"/"屏 读" 类标签）：textMuted + 字距宽 + 间距小
        `font-size:10px;font-weight:400;color:${c.textMuted};letter-spacing:0.1em;margin-bottom:6px`
      )
    };
  }
};
function thumb$1B(args) {
  const { text, accent } = mergeThumb(args ?? {});
  return svg(
    `<line x1="6" y1="14" x2="6" y2="62" stroke="${text}" stroke-width="0.5"/><line x1="40" y1="14" x2="40" y2="62" stroke="${text}" stroke-width="0.5"/><rect x="8" y="14" width="28" height="2" fill="${accent}"/><rect x="42" y="14" width="28" height="2" fill="${accent}"/><rect x="10" y="20" width="22" height="2" fill="${text}"/><rect x="44" y="20" width="22" height="2" fill="${text}"/><rect x="10" y="30" width="18" height="2" fill="#c0c6cf"/><rect x="10" y="36" width="20" height="2" fill="#c0c6cf"/><rect x="44" y="30" width="16" height="2" fill="#c0c6cf"/><rect x="44" y="36" width="20" height="2" fill="#c0c6cf"/>`
  );
}
const pairedSpecimen = {
  meta: {
    id: "paired-specimen",
    kind: "compare",
    name: "标本卡对照",
    description: "博物笔记：双栏分割线 + 学术标本标签",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$1B,
  snippets: [
    {
      presetId: "cmp-paired-specimen",
      name: "标本卡对照",
      description: "学术标本气质：SPEC. A / SPEC. B 标签 + 分割线",
      markdown: ":::: compare variant=paired-specimen\n::: pros Spec. A\n*学名：Quercus robur*\n\n- 特征 1\n- 特征 2\n:::\n::: cons Spec. B\n*学名：Quercus petraea*\n\n- 特征 1\n- 特征 2\n:::\n::::\n"
    }
  ],
  render: (ctx, { slot }) => {
    const c = ctx.tokens.colors;
    if (slot === "wrapper") {
      return {
        wrapperCSS: `display:table;width:100%;table-layout:fixed;border-spacing:14px 0;border-collapse:separate;margin:18px 0`
      };
    }
    return {
      wrapperCSS: `display:table-cell;vertical-align:top;width:50%;box-sizing:border-box;padding:0`,
      titleCSS: `font-size:11px;font-weight:400;color:${c.textMuted};letter-spacing:0.15em;text-transform:uppercase;border-bottom:1px solid ${c.border};margin-bottom:6px;padding-bottom:4px`
    };
  }
};
function thumb$1A(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="16" width="63" height="1" fill="${text}"/><rect x="6" y="16" width="18" height="16" fill="none"/><rect x="10" y="22" width="10" height="2" fill="${accent}"/><rect x="28" y="22" width="36" height="2" fill="#c0c6cf"/><rect x="6" y="34" width="63" height="1" fill="#c0c6cf"/><rect x="10" y="40" width="10" height="2" fill="${text}"/><rect x="28" y="40" width="36" height="2" fill="#c0c6cf"/><rect x="6" y="50" width="63" height="1" fill="#c0c6cf"/>`
  );
}
const measurementTable = {
  meta: {
    id: "measurement-table",
    kind: "compare",
    name: "测量数据对照",
    description: "纵向双行 block，标签固定宽 + 数据跟排，数据并列感",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$1A,
  snippets: [
    {
      presetId: "cmp-measurement-table",
      name: "测量数据对照",
      description: "两行数据对比，适合结构参数、规格对照",
      markdown: ":::: compare variant=measurement-table\n::: pros 砖木结构\n承重墙体：370mm 实心砖，层高 3.2m，抗震 6 度。\n:::\n::: cons 钢混结构\n框架柱：600×600mm，层高 3.6m，抗震 8 度。\n:::\n::::\n"
    },
    {
      presetId: "cmp-measurement-table-specs",
      name: "规格参数对比",
      description: "两项规格参数横向对照",
      markdown: ":::: compare variant=measurement-table\n::: pros 方案 A\n材料：橡木实木；厚度：18mm；表面处理：哑光漆。\n:::\n::: cons 方案 B\n材料：多层复合板；厚度：12mm；表面处理：UV 涂层。\n:::\n::::\n"
    }
  ],
  render: (ctx, { slot }) => {
    const c = ctx.tokens.colors;
    if (slot === "wrapper") {
      return {
        wrapperCSS: `display:block;margin:16px 0;border-top:1px solid ${c.border}`
      };
    }
    const isFirst = slot === "pros";
    return {
      wrapperCSS: `display:block;padding:8px 0;border-bottom:1px solid ${c.border}`,
      titleCSS: `display:inline-block;width:80px;vertical-align:top;font-size:11px;font-weight:600;color:${isFirst ? c.primary : c.textMuted};letter-spacing:0.05em;line-height:1.6`
    };
  }
};
function thumb$1z(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="16" width="29" height="45" rx="2" fill="none" stroke="#c0c6cf"/><rect x="40" y="16" width="29" height="45" rx="2" fill="none" stroke="#c0c6cf"/><circle cx="21" cy="30" r="9" fill="none" stroke="${accent}" stroke-width="2"/><rect x="49" y="23" width="12" height="12" fill="${accent}"/><rect x="13" y="46" width="14" height="2" fill="${text}"/><rect x="47" y="46" width="14" height="2" fill="${text}"/>`
  );
}
const pairedShape = {
  meta: {
    id: "paired-shape",
    kind: "compare",
    name: "圆方几何对照",
    description: "包豪斯：圆环描边 vs 实心方块，几何符号作视觉代号",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$1z,
  snippets: [
    {
      presetId: "cmp-paired-shape",
      name: "圆方几何对照",
      description: "圆=描边/方=实心，包豪斯几何对比风",
      markdown: ":::: compare variant=paired-shape\n::: pros CIRCLE\n有机、循环、无起点终点的运动。\n:::\n::: cons SQUARE\n秩序、稳定、以角定界的结构。\n:::\n::::\n"
    },
    {
      presetId: "cmp-paired-shape-alt",
      name: "圆方代号对比",
      description: "适合对立概念的几何隐喻",
      markdown: ":::: compare variant=paired-shape\n::: pros 感性\n流动、直觉、开放边界。\n:::\n::: cons 理性\n逻辑、归纳、封闭系统。\n:::\n::::\n"
    }
  ],
  render: (ctx, { slot }) => {
    const c = ctx.tokens.colors;
    if (slot === "wrapper") {
      return {
        wrapperCSS: `display:table;width:100%;table-layout:fixed;border-spacing:14px 0;border-collapse:separate;margin:16px 0`
      };
    }
    const title = (ctx.info ?? "").trim();
    const isCircle = slot === "pros";
    const badge = isCircle ? `<span style="display:inline-block;width:22px;height:22px;border-radius:50%;border:2px solid ${c.accent};vertical-align:middle;margin-right:8px"></span>` : `<span style="display:inline-block;width:22px;height:22px;background-color:${c.accent};vertical-align:middle;margin-right:8px"></span>`;
    const titleEl = title ? `<section style="font-size:13px;font-weight:700;color:${c.text};margin-bottom:8px;line-height:1.4">${badge}${escText(title)}</section>` : badge;
    return {
      wrapperCSS: `display:table-cell;vertical-align:top;width:50%;box-sizing:border-box;padding:14px;background-color:transparent`,
      titleCSS: "",
      svgSlot: titleEl
    };
  }
};
function thumb$1y(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<line x1="8" y1="24" x2="67" y2="24" stroke="${text}" stroke-width="1.5"/><circle cx="37" cy="24" r="4" fill="${accent}"/><rect x="8" y="30" width="24" height="2" fill="${text}"/><rect x="43" y="30" width="24" height="2" fill="${text}"/><rect x="8" y="42" width="28" height="2" fill="#c0c6cf"/><rect x="8" y="48" width="22" height="2" fill="#c0c6cf"/><rect x="43" y="42" width="26" height="2" fill="#c0c6cf"/><rect x="43" y="48" width="20" height="2" fill="#c0c6cf"/>`
  );
}
const axisDiagram = {
  meta: {
    id: "axis-diagram",
    kind: "compare",
    name: "轴线对立图",
    description: "水平轴 SVG + 左右对立标签，包豪斯风格概念对比",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$1y,
  snippets: [
    {
      presetId: "cmp-axis-diagram",
      name: "轴线对立图",
      description: "适合两端对立的概念：现代主义 vs 后现代主义",
      markdown: ":::: compare variant=axis-diagram\n::: pros 现代主义\n形式服从功能；理性秩序；以少胜多。\n:::\n::: cons 后现代主义\n形式即内容；反讽引用；以多为多。\n:::\n::::\n"
    },
    {
      presetId: "cmp-axis-diagram-alt",
      name: "轴线对比（哲学/观念）",
      description: "任意两端对立概念的轴线可视化",
      markdown: ":::: compare variant=axis-diagram\n::: pros 个体\n私人记忆、主观经验、不可通约的感受。\n:::\n::: cons 集体\n共同历史、公共叙事、可共享的符号系统。\n:::\n::::\n"
    }
  ],
  render: (ctx, { slot }) => {
    const c = ctx.tokens.colors;
    if (slot === "wrapper") {
      return {
        wrapperCSS: `margin:16px 0`
      };
    }
    const title = (ctx.info ?? "").trim();
    const isLeft = slot === "pros";
    const axisEl = isLeft ? `<svg viewBox="0 0 320 40" width="100%" style="display:block;margin-bottom:10px" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="20" x2="320" y2="20" stroke="${c.text}" stroke-width="2"/><circle cx="160" cy="20" r="5" fill="${c.accent}"/></svg>` : "";
    const titleEl = title ? `<section style="font-size:13px;font-weight:700;color:${c.text};margin-bottom:6px;text-align:${isLeft ? "left" : "right"}">${escText(title)}</section>` : "";
    return {
      wrapperCSS: `display:inline-block;width:50%;box-sizing:border-box;vertical-align:top;padding:${isLeft ? "0 10px 0 0" : "0 0 0 10px"}`,
      titleCSS: "",
      svgSlot: axisEl + titleEl
    };
  }
};
const compareAll = [columnCard, stackedRow, ledger, dataCard, pairedSpecimen, measurementTable, pairedShape, axisDiagram];
const BODY3$5 = "### 01 第一步\n正文说明\n\n### 02 第二步\n正文说明\n\n### 03 第三步\n正文说明\n";
function thumb$1x(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<circle cx="14" cy="22" r="5" fill="${accent}"/><text x="14" y="25" text-anchor="middle" font-size="7" font-weight="700" fill="#fff">1</text><rect x="24" y="21" width="34" height="2" fill="#c0c6cf"/><circle cx="14" cy="42" r="5" fill="${accent}"/><text x="14" y="45" text-anchor="middle" font-size="7" font-weight="700" fill="#fff">2</text><rect x="24" y="41" width="30" height="2" fill="#c0c6cf"/>`
  );
}
const numberCircle = {
  meta: {
    id: "number-circle",
    kind: "steps",
    name: "编号圆圈步骤",
    description: "h3 手写编号，标题加粗"
  },
  thumbnail: thumb$1x,
  snippets: [
    {
      presetId: "st-number-circle",
      name: "编号圆圈步骤",
      description: "h3 手写编号，标题加粗",
      markdown: "::: steps 流程\n" + BODY3$5 + ":::\n"
    },
    {
      presetId: "st-number-circle-short",
      name: "两步精简",
      description: "轻量版双步骤",
      markdown: "::: steps\n### 01 准备\n描述\n\n### 02 执行\n描述\n:::\n"
    }
  ],
  render: () => ({
    wrapperCSS: `margin:16px 0`,
    titleCSS: `font-weight:700;margin-bottom:12px`
  })
};
const BODY3$4 = "### 01 第一步\n正文说明\n\n### 02 第二步\n正文说明\n\n### 03 第三步\n正文说明\n";
function thumb$1w(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<line x1="14" y1="14" x2="14" y2="61" stroke="${accent}" stroke-width="2" stroke-dasharray="2 2"/><circle cx="14" cy="22" r="3" fill="${accent}"/><circle cx="14" cy="42" r="3" fill="${accent}"/><rect x="22" y="21" width="36" height="2" fill="#c0c6cf"/><rect x="22" y="41" width="32" height="2" fill="#c0c6cf"/>`
  );
}
const timelineDot = {
  meta: {
    id: "timeline-dot",
    kind: "steps",
    name: "时间轴步骤",
    description: "左侧点线 + 主色小圆点"
  },
  thumbnail: thumb$1w,
  snippets: [
    {
      presetId: "st-timeline",
      name: "时间轴步骤",
      description: "左侧点线 + 主色小圆点",
      markdown: "::: steps 变更轨迹 variant=timeline-dot\n" + BODY3$4 + ":::\n"
    },
    {
      presetId: "st-timeline-log",
      name: "时间轴日志",
      description: "日期 + 事件的日志流",
      markdown: "::: steps 更新日志 variant=timeline-dot\n### 2026-04-01 初版上线\n说明\n\n### 2026-04-10 修复若干\n说明\n:::\n"
    }
  ],
  render: (ctx) => {
    const dot = `<svg viewBox="0 0 10 10" width="10" height="10" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:-16px"><circle cx="5" cy="5" r="4" fill="${ctx.tokens.colors.primary}"/></svg>`;
    return {
      wrapperCSS: `margin:18px 0;padding:4px 0 4px 20px;border-left:2px dotted ${ctx.tokens.colors.primary}`,
      titleCSS: `font-weight:700;color:${ctx.tokens.colors.primary};margin-bottom:10px`,
      svgSlot: dot
    };
  }
};
const BODY3$3 = "### 准备阶段\n收集材料与团队节奏。\n\n### 执行阶段\n按 SOP 推进，每步验收。\n\n### 复盘阶段\n输出 retrospective 文档。\n";
function thumb$1v(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="14" width="59" height="14" fill="${soft}" stroke="${accent}" stroke-width="1"/><rect x="14" y="19" width="22" height="2" fill="${accent}"/><rect x="14" y="24" width="34" height="1.5" fill="#c0c6cf"/><rect x="8" y="32" width="59" height="14" fill="${soft}" stroke="${accent}" stroke-width="1"/><rect x="14" y="37" width="22" height="2" fill="${accent}"/><rect x="14" y="42" width="34" height="1.5" fill="#c0c6cf"/><rect x="8" y="50" width="59" height="14" fill="${soft}" stroke="${accent}" stroke-width="1"/><rect x="14" y="55" width="22" height="2" fill="${accent}"/>`
  );
}
const stepCard = {
  meta: {
    id: "step-card",
    kind: "steps",
    name: "卡片化分步",
    description: "每步独立浅底卡片，长说明步骤"
  },
  thumbnail: thumb$1v,
  snippets: [
    {
      presetId: "st-step-card",
      name: "卡片化分步",
      description: "每步独立浅底卡片，适合长说明 / SOP",
      markdown: "::: steps 执行流程 variant=step-card\n" + BODY3$3 + ":::\n"
    },
    {
      presetId: "st-step-card-checklist",
      name: "卡片化 · 上线清单",
      description: "上线 SOP 卡片式清单",
      markdown: "::: steps 上线清单 variant=step-card\n### 灰度发布\n按 5% / 25% / 100% 三档放量。\n\n### 监控告警\n关键指标接告警，p95 延迟与错误率双指标。\n\n### 应急预案\n备好回滚脚本与值班联系人。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const radius = ctx.tokens.radius.sm;
    return {
      wrapperCSS: [
        "margin:18px 0",
        `padding:14px 0 4px`,
        `border-top:1px solid ${c.border}`
      ].join(";"),
      titleCSS: [
        "font-weight:700",
        "font-size:14px",
        `color:${c.textMuted}`,
        "letter-spacing:0.5px",
        "text-transform:uppercase",
        "margin-bottom:10px"
      ].join(";"),
      bodyCSS: [
        `background:${c.bgSoft}`,
        `border-radius:${radius}px`,
        "padding:12px 16px"
      ].join(";")
    };
  }
};
const BODY3$2 = "### 01 收集背景\n阅读 5 篇文献，提炼共识与争议点。\n\n### 02 提出假设\n基于共识与争议点形成可验证假设。\n\n### 03 设计实验\n选择对照组、自变量与样本量。\n";
function thumb$1u(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="14" width="3" height="48" fill="${accent}"/><text x="18" y="24" font-size="6" font-weight="700" fill="${text}">01</text><rect x="30" y="20" width="35" height="2" fill="${text}"/><rect x="30" y="26" width="28" height="1.5" fill="#c0c6cf"/><text x="18" y="40" font-size="6" font-weight="700" fill="${text}">02</text><rect x="30" y="36" width="32" height="2" fill="${text}"/><rect x="30" y="42" width="26" height="1.5" fill="#c0c6cf"/><text x="18" y="56" font-size="6" font-weight="700" fill="${text}">03</text><rect x="30" y="52" width="30" height="2" fill="${text}"/>`
  );
}
const splitRow = {
  meta: {
    id: "split-row",
    kind: "steps",
    name: "左右分栏分步",
    description: "左竖条 + 左编号 / 右正文两栏感"
  },
  thumbnail: thumb$1u,
  snippets: [
    {
      presetId: "st-split-row",
      name: "左右分栏分步",
      description: "左侧主色实线 + 左编号 / 右正文，学术调研骨架",
      markdown: "::: steps 研究流程 variant=split-row\n" + BODY3$2 + ":::\n"
    },
    {
      presetId: "st-split-row-checklist",
      name: "分栏 · 任务清单",
      description: "编号 + 描述的任务清单",
      markdown: "::: steps 项目任务 variant=split-row\n### 01 立项\n输出 RFC 与负责人。\n\n### 02 开发\n按 milestone 推进，2 周一节点。\n\n### 03 上线\n灰度 + 监控 + 应急。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        "margin:18px 0",
        `padding:8px 0 8px 16px`,
        `border-left:4px solid ${c.primary}`,
        `box-shadow:inset 1px 0 0 ${c.border}`
      ].join(";"),
      titleCSS: [
        "font-weight:700",
        "font-size:14px",
        `color:${c.textMuted}`,
        "text-transform:uppercase",
        "letter-spacing:1px",
        "margin-bottom:8px"
      ].join(";")
    };
  }
};
const BODY3$1 = "### 一\n第一步正文说明\n\n### 二\n第二步正文说明\n\n### 三\n第三步正文说明\n";
function thumb$1t(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="14" width="14" height="14" fill="${soft}" stroke="${accent}" stroke-width="1.5"/><text x="15" y="24" text-anchor="middle" font-size="9" font-weight="700" fill="${accent}">一</text><rect x="28" y="19" width="36" height="2" fill="#c0c6cf"/><rect x="8" y="33" width="14" height="14" fill="${soft}" stroke="${accent}" stroke-width="1.5"/><text x="15" y="43" text-anchor="middle" font-size="9" font-weight="700" fill="${accent}">二</text><rect x="28" y="38" width="32" height="2" fill="#c0c6cf"/><rect x="8" y="52" width="14" height="14" fill="${soft}" stroke="${accent}" stroke-width="1.5"/><text x="15" y="62" text-anchor="middle" font-size="9" font-weight="700" fill="${accent}">三</text><rect x="28" y="57" width="28" height="2" fill="#c0c6cf"/>`
  );
}
const sealCjk = {
  meta: {
    id: "seal-cjk",
    kind: "steps",
    name: "汉字印章步骤",
    description: "作者以 h3 手写一/二/三，宋本批注风格",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$1t,
  snippets: [
    {
      presetId: "st-seal-cjk",
      name: "汉字印章步骤",
      description: "h3 手写 一/二/三 CJK 序号，印章感",
      markdown: "::: steps variant=seal-cjk\n" + BODY3$1 + ":::\n"
    },
    {
      presetId: "st-seal-cjk-titled",
      name: "汉字印章 · 带标题",
      description: "CJK 序号 + 正文标题合写",
      markdown: "::: steps 操作步骤 variant=seal-cjk\n### 一 立项\n明确目标与负责人。\n\n### 二 执行\n按计划分工推进。\n\n### 三 收尾\n复盘归档，输出文档。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: ["margin:20px 0"].join(";"),
      titleCSS: [
        "font-weight:600",
        "font-size:14px",
        `color:${c.text}`,
        "letter-spacing:0.1em",
        "margin-bottom:14px"
      ].join(";")
    };
  }
};
const BODY3 = "### 0KM\n出发点描述\n\n### 30KM\n途经点描述\n\n### 72KM\n终点描述\n";
function thumb$1s(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="18" width="59" height="1.5" fill="${text}"/><rect x="10" y="14" width="1.5" height="6" fill="${text}"/><rect x="30" y="14" width="1.5" height="6" fill="${text}"/><rect x="50" y="14" width="1.5" height="6" fill="${text}"/><text x="8" y="28" font-size="5" fill="${accent}">0KM</text><rect x="8" y="31" width="20" height="1.5" fill="#c0c6cf"/><text x="28" y="28" font-size="5" fill="${accent}">30KM</text><rect x="28" y="31" width="16" height="1.5" fill="#c0c6cf"/><text x="48" y="28" font-size="5" fill="${accent}">72KM</text><rect x="48" y="31" width="16" height="1.5" fill="#c0c6cf"/>`
  );
}
const rulerRow = {
  meta: {
    id: "ruler-row",
    kind: "steps",
    name: "刻度尺步骤",
    description: "顶部一根实线作主轴，h3 充当刻度标签，博物笔记风格",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$1s,
  snippets: [
    {
      presetId: "st-ruler-row",
      name: "刻度尺步骤",
      description: "顶部实线主轴 + h3 刻度标签，博物笔记感",
      markdown: "::: steps 旅程 variant=ruler-row\n" + BODY3 + ":::\n"
    },
    {
      presetId: "st-ruler-row-time",
      name: "刻度尺 · 时间轴",
      description: "时间刻度标签版本",
      markdown: "::: steps 项目时间线 variant=ruler-row\n### W1\n启动会，确认目标与分工。\n\n### W4\n完成原型评审。\n\n### W8\n灰度上线，开始数据收集。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        "margin:24px 0",
        `border-top:1px solid ${c.text}`,
        "padding-top:18px"
      ].join(";"),
      titleCSS: [
        "font-weight:600",
        "font-size:11px",
        `color:${c.textMuted}`,
        "letter-spacing:0.2em",
        "text-transform:uppercase",
        "margin-bottom:14px"
      ].join(";")
    };
  }
};
const stepsAll = [numberCircle, timelineDot, stepCard, splitRow, sealCjk, rulerRow];
const tokenSchema$1 = {
  "gap-y": {
    type: "size",
    label: "上下留白",
    default: "24px",
    hint: "换场前后的节奏间距"
  }
};
const FALLBACK$2 = '<svg viewBox="0 0 120 12" width="120" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M0,6 Q15,0 30,6 T60,6 T90,6 T120,6" fill="none" stroke="#c0c6cf" stroke-width="1.5"/></svg>';
function thumb$1r() {
  return svg(
    `<path d="M4,38 Q12,30 22,38 T40,38 T58,38 T72,38" fill="none" stroke="#c0c6cf" stroke-width="1.5"/>`
  );
}
const wave = {
  meta: {
    id: "wave",
    kind: "divider",
    name: "波浪线",
    description: "柔和波形，叙事换场"
  },
  thumbnail: thumb$1r,
  tokenSchema: tokenSchema$1,
  snippets: [
    {
      presetId: "dv-wave",
      name: "波浪线",
      description: "柔和波形，叙事换场",
      markdown: "::: divider variant=wave\n:::\n"
    }
  ],
  render: (ctx) => ({
    wrapperCSS: `text-align:center;margin:var(--uv-gap-y, 24px) 0`,
    svgSlot: ctx.assets.dividerWave ?? FALLBACK$2
  })
};
const FALLBACK$1 = '<svg viewBox="0 0 120 8" width="120" height="8" xmlns="http://www.w3.org/2000/svg">' + [20, 40, 60, 80, 100].map((cx) => `<circle cx="${cx}" cy="4" r="2" fill="#c0c6cf"/>`).join("") + "</svg>";
function thumb$1q() {
  return svg(
    [18, 30, 42, 54].map((cx) => `<circle cx="${cx}" cy="37" r="2" fill="#c0c6cf"/>`).join("")
  );
}
const dots = {
  meta: {
    id: "dots",
    kind: "divider",
    name: "点阵",
    description: "等距 4 点，现代克制"
  },
  thumbnail: thumb$1q,
  snippets: [
    {
      presetId: "dv-dots",
      name: "点阵",
      description: "等距 4 点，现代克制",
      markdown: "::: divider variant=dots\n:::\n"
    }
  ],
  render: (ctx) => ({
    wrapperCSS: `text-align:center;margin:24px 0`,
    svgSlot: ctx.assets.dividerDots ?? FALLBACK$1
  })
};
const FALLBACK = '<svg viewBox="0 0 120 16" width="120" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0,8 L50,8" stroke="#c0c6cf" stroke-width="1"/><path d="M70,8 L120,8" stroke="#c0c6cf" stroke-width="1"/><path d="M60,2 L63,8 L60,14 L57,8 Z" fill="#c0c6cf"/></svg>';
function thumb$1p() {
  return svg(
    `<line x1="6" y1="37" x2="28" y2="37" stroke="#c0c6cf"/><line x1="46" y1="37" x2="68" y2="37" stroke="#c0c6cf"/><path d="M37,30 L41,37 L37,44 L33,37 Z" fill="#c0c6cf"/>`
  );
}
const flower = {
  meta: {
    id: "flower",
    kind: "divider",
    name: "菱形纹章",
    description: "中央菱形 + 两侧短线"
  },
  thumbnail: thumb$1p,
  snippets: [
    {
      presetId: "dv-flower",
      name: "菱形纹章",
      description: "中央菱形 + 两侧短线",
      markdown: "::: divider variant=flower\n:::\n"
    }
  ],
  render: (ctx) => ({
    wrapperCSS: `text-align:center;margin:24px 0`,
    svgSlot: ctx.assets.dividerFlower ?? FALLBACK
  })
};
function thumb$1o() {
  return svg(`<rect x="6" y="36" width="63" height="1" fill="#c0c6cf"/>`);
}
const rule$1 = {
  meta: {
    id: "rule",
    kind: "divider",
    name: "细线",
    description: "最克制的 1px 灰线"
  },
  thumbnail: thumb$1o,
  snippets: [
    {
      presetId: "dv-rule",
      name: "细线",
      description: "最克制的 1px 灰线",
      markdown: "::: divider\n:::\n"
    }
  ],
  render: (ctx) => ({
    wrapperCSS: `margin:24px 0`,
    svgSlot: `<hr style="border:none;height:1px;background-color:${ctx.tokens.colors.border};margin:0"/>`
  })
};
function thumb$1n(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<line x1="6" y1="37" x2="28" y2="37" stroke="#c0c6cf"/><line x1="46" y1="37" x2="68" y2="37" stroke="#c0c6cf"/><text x="37" y="42" text-anchor="middle" font-size="11" fill="${accent}">&#10086;</text>`
  );
}
const glyph = {
  meta: {
    id: "glyph",
    kind: "divider",
    name: "单字符装饰",
    description: "文学气质，换场分隔"
  },
  thumbnail: thumb$1n,
  snippets: [
    {
      presetId: "dv-glyph-fleuron",
      name: "Fleuron 花饰",
      description: "文学气质，换场分隔",
      markdown: "::: divider variant=glyph\n:::\n"
    },
    {
      presetId: "dv-glyph-section",
      name: "Section §",
      description: "法条/章节感",
      markdown: '::: divider variant=glyph glyph="§"\n:::\n'
    },
    {
      presetId: "dv-glyph-diamond",
      name: "菱形 ◆",
      description: "现代分隔",
      markdown: '::: divider variant=glyph glyph="◆"\n:::\n'
    }
  ],
  render: (ctx) => {
    const char = ctx.attrs.glyph || "❦";
    const color = ctx.tokens.colors.primary;
    const line = ctx.tokens.colors.border;
    return {
      wrapperCSS: `text-align:center;margin:26px 0;color:${color};font-size:18px`,
      svgSlot: `<span style="display:inline-block;width:60px;height:1px;background-color:${line};vertical-align:middle;margin-right:12px"></span><span style="display:inline-block;vertical-align:middle">${char}</span><span style="display:inline-block;width:60px;height:1px;background-color:${line};vertical-align:middle;margin-left:12px"></span>`
    };
  }
};
function thumb$1m(args) {
  const accent = args?.accent ?? "#e30613";
  return svg(
    `<rect x="48" y="48" width="20" height="20" fill="${accent}"/><line x1="6" y1="58" x2="42" y2="58" stroke="#c0c6cf" stroke-width="1"/>`
  );
}
const sealMark = {
  meta: {
    id: "seal-mark",
    kind: "divider",
    name: "收束印章",
    description: "右对齐大色块印章 · 全文收束签名",
    designedFor: ["swiss-grid"]
  },
  thumbnail: thumb$1m,
  snippets: [
    {
      presetId: "dv-seal-mark",
      name: "收束印章",
      description: "右对齐大色块（消费 sealMark motif）",
      markdown: "::: divider variant=seal-mark\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const fallback = `<span style="display:inline-block;width:12px;height:12px;background-color:${c.primary}">&nbsp;</span>`;
    return {
      wrapperCSS: `text-align:right;margin:32px 0 20px`,
      svgSlot: ctx.assets.sealMark ?? fallback
    };
  }
};
const dividerAll = [wave, dots, flower, rule$1, glyph, sealMark];
function thumb$1l(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="20" width="30" height="5" fill="${accent}"/><rect x="10" y="30" width="55" height="2" fill="${accent}"/><rect x="10" y="40" width="40" height="2" fill="#c0c6cf"/><rect x="10" y="48" width="48" height="2" fill="#c0c6cf"/>`
  );
}
const bordered = {
  meta: {
    id: "bordered",
    kind: "sectionTitle",
    name: "下划线章标题",
    description: "2px 主色底线 + 角饰（默认）"
  },
  thumbnail: thumb$1l,
  snippets: [
    {
      presetId: "sec-bordered",
      name: "下划线章标题",
      description: "2px 主色底线 + 角饰（默认）",
      markdown: "::: section-title 第一章\n:::\n"
    },
    {
      presetId: "sec-bordered-long",
      name: "下划线 · 长标题",
      description: "多字章标题下划线节奏",
      markdown: "::: section-title 第二部分 · 深入骨架\n:::\n"
    }
  ],
  render: (ctx) => ({
    wrapperCSS: `margin:24px 0 12px;padding-bottom:6px;border-bottom:2px solid ${ctx.tokens.colors.primary}`,
    titleCSS: `font-weight:700;font-size:20px;color:${ctx.tokens.colors.text}`,
    svgSlot: ctx.assets.sectionCorner ?? void 0
  })
};
function thumb$1k(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<path d="M8,8 L26,8 L26,14 L14,14 L14,28 L8,28 Z" fill="${accent}"/><rect x="30" y="16" width="35" height="5" fill="${accent}"/><rect x="10" y="38" width="55" height="2" fill="#c0c6cf"/><rect x="10" y="48" width="48" height="2" fill="#c0c6cf"/>`
  );
}
const cornered = {
  meta: {
    id: "cornered",
    kind: "sectionTitle",
    name: "左上角装饰",
    description: "只留角饰不画线，更克制"
  },
  thumbnail: thumb$1k,
  snippets: [
    {
      presetId: "sec-cornered",
      name: "左上角装饰",
      description: "只留角饰不画线，更克制",
      markdown: "::: section-title 第三章 variant=cornered\n:::\n"
    },
    {
      presetId: "sec-cornered-long",
      name: "角饰 · 长标题",
      description: "标题长时更显角饰作用",
      markdown: "::: section-title 第四部分 · 组件库手册 variant=cornered\n:::\n"
    }
  ],
  render: (ctx) => ({
    wrapperCSS: `margin:24px 0 12px`,
    titleCSS: `font-weight:700;font-size:20px;color:${ctx.tokens.colors.text}`,
    svgSlot: ctx.assets.sectionCorner ?? ""
  })
};
function thumb$1j(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<text x="10" y="34" font-family="ui-monospace,Menlo,monospace" font-size="18" font-weight="700" fill="${accent}">01</text><text x="34" y="34" font-family="ui-monospace,Menlo,monospace" font-size="13" font-weight="600" fill="${text}">缘起</text><rect x="10" y="42" width="22" height="2" fill="${accent}"/><rect x="10" y="52" width="55" height="2" fill="#c0c6cf"/><rect x="10" y="60" width="42" height="2" fill="#c0c6cf"/>`
  );
}
const numberPrefix = {
  meta: {
    id: "number-prefix",
    kind: "sectionTitle",
    name: "编号前缀章标题",
    description: "monospace 编号 + 标题，序章排印"
  },
  thumbnail: thumb$1j,
  snippets: [
    {
      presetId: "sec-number-prefix",
      name: "编号前缀章标题",
      description: "monospace 大编号 + 标题，作者把编号写进 info",
      markdown: "::: section-title 01 · 缘起 variant=number-prefix\n:::\n"
    },
    {
      presetId: "sec-number-prefix-long",
      name: "编号前缀 · 长标题",
      description: "编号 + 描述性长标题",
      markdown: "::: section-title 02 · 阅读为何成为奢侈 variant=number-prefix\n:::\n"
    }
  ],
  render: (ctx) => ({
    wrapperCSS: `margin:28px 0 14px;padding:0 0 6px;border-bottom:1px solid ${ctx.tokens.colors.border}`,
    titleCSS: `font-family:ui-monospace,Menlo,Consolas,monospace;font-weight:700;font-size:21px;color:${ctx.tokens.colors.text};letter-spacing:-0.2px`
  })
};
function thumb$1i(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="16" width="20" height="2" fill="${accent}"/><text x="10" y="28" font-size="6" font-weight="600" letter-spacing="1" fill="${accent}">CHAPTER ONE</text><text x="10" y="44" font-size="13" font-weight="700" fill="${text}">缘起</text><rect x="10" y="54" width="55" height="2" fill="#c0c6cf"/><rect x="10" y="62" width="42" height="2" fill="#c0c6cf"/>`
  );
}
const kickerStack = {
  meta: {
    id: "kicker-stack",
    kind: "sectionTitle",
    name: "kicker 叠层章标题",
    description: "上小字 kicker + 下主标题"
  },
  thumbnail: thumb$1i,
  snippets: [
    {
      presetId: "sec-kicker-stack",
      name: "kicker 叠层章标题",
      description: "上 letter-spaced uppercase kicker + 下主标题",
      markdown: '::: section-title 缘起 kicker="CHAPTER ONE" variant=kicker-stack\n:::\n'
    },
    {
      presetId: "sec-kicker-stack-cn",
      name: "kicker · 中文章名",
      description: "中文 kicker（第 一 章）的叠层骨架",
      markdown: '::: section-title 在算法时代重新阅读 kicker="第 一 章" variant=kicker-stack\n:::\n'
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const kicker = ctx.attrs.kicker;
    const slot = kicker ? `<span style="display:block;font-size:11px;font-weight:600;letter-spacing:2px;color:${c.primary};margin-bottom:6px;text-transform:uppercase">${escText(kicker)}</span>` : `<span style="display:block;width:24px;height:2px;background:${c.primary};margin-bottom:8px"></span>`;
    return {
      wrapperCSS: `margin:26px 0 12px;padding:0`,
      titleCSS: `font-weight:700;font-size:20px;color:${c.text};line-height:1.35`,
      svgSlot: slot
    };
  }
};
function thumb$1h(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="18" width="14" height="14" fill="${accent}"/><text x="17" y="29" text-anchor="middle" font-size="8" font-weight="700" fill="#fff">章</text><text x="30" y="30" font-size="14" font-weight="700" fill="${text}">缘起</text><rect x="10" y="50" width="55" height="2" fill="#c0c6cf"/><rect x="10" y="58" width="42" height="2" fill="#c0c6cf"/>`
  );
}
const ribbonStamp = {
  meta: {
    id: "ribbon-stamp",
    kind: "sectionTitle",
    name: "印章 + 标题",
    description: "左侧实色戳记 + 主标题"
  },
  thumbnail: thumb$1h,
  snippets: [
    {
      presetId: "sec-ribbon-stamp",
      name: "印章 + 标题",
      description: "CJK 实色戳记（章 / 节 / §）+ 主标题",
      markdown: "::: section-title 缘起 stamp=章 variant=ribbon-stamp\n:::\n"
    },
    {
      presetId: "sec-ribbon-stamp-section",
      name: "印章 · 西文章节",
      description: "§ 戳记的西式章节",
      markdown: "::: section-title On Slow Reading stamp=§ variant=ribbon-stamp\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const stamp = ctx.attrs.stamp || "§";
    const slot = `<span style="display:inline-block;min-width:20px;padding:1px 6px;margin-right:10px;background:${c.primary};color:${c.textInverse};font-weight:700;font-size:14px;text-align:center;vertical-align:middle">${escText(stamp)}</span>`;
    return {
      wrapperCSS: `margin:24px 0 12px;padding:0`,
      titleCSS: `font-weight:700;font-size:20px;color:${c.text};vertical-align:middle;line-height:1.4`,
      svgSlot: slot
    };
  }
};
const sectionTitleAll = [bordered, cornered, numberPrefix, kickerStack, ribbonStamp];
function thumb$1g() {
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="#282c34"/><rect x="12" y="22" width="32" height="2" fill="#98c379"/><rect x="12" y="30" width="44" height="2" fill="#abb2bf"/><rect x="12" y="38" width="26" height="2" fill="#c678dd"/><rect x="12" y="46" width="40" height="2" fill="#abb2bf"/><rect x="12" y="54" width="18" height="2" fill="#56b6c2"/>`
  );
}
const bare$1 = {
  meta: {
    id: "bare",
    kind: "codeBlock",
    name: "默认代码块",
    description: "无外框，纯 pre/code"
  },
  thumbnail: thumb$1g,
  snippets: [
    {
      presetId: "cb-bare",
      name: "默认代码块",
      description: "无外框，纯 pre/code 高亮",
      markdown: "```javascript variant=bare\nconst greet = (name) => `Hello, ${name}`\nconsole.log(greet('world'))\n```\n"
    }
  ],
  render: (_theme, { language, codeInnerHtml }) => {
    const langClass = language ? `language-${language} hljs` : "hljs";
    return `<pre><code class="${langClass}">${codeInnerHtml}</code></pre>`;
  }
};
function thumb$1f() {
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="#fff" stroke="#d0d4da"/><rect x="6" y="14" width="63" height="10" rx="3" fill="#f5f5f3"/><rect x="6" y="22" width="63" height="2" fill="#d0d4da"/><rect x="12" y="17" width="26" height="3.5" rx="1" fill="#6a737d"/><rect x="12" y="30" width="38" height="2" fill="#c678dd"/><rect x="12" y="38" width="48" height="2" fill="#abb2bf"/><rect x="12" y="46" width="32" height="2" fill="#98c379"/><rect x="12" y="54" width="22" height="2" fill="#56b6c2"/>`
  );
}
const LANG_LABEL = {
  javascript: "JAVASCRIPT",
  js: "JAVASCRIPT",
  typescript: "TYPESCRIPT",
  ts: "TYPESCRIPT",
  python: "PYTHON",
  py: "PYTHON",
  bash: "BASH",
  sh: "BASH",
  shell: "BASH",
  json: "JSON",
  yaml: "YAML",
  yml: "YAML",
  sql: "SQL",
  html: "HTML",
  css: "CSS",
  xml: "XML",
  markdown: "MARKDOWN",
  md: "MARKDOWN"
};
function labelFor(language) {
  if (!language) return "";
  return LANG_LABEL[language.toLowerCase()] ?? language.toUpperCase();
}
function styles$2(theme) {
  const { colors, radius } = theme.tokens;
  const wrapper = [
    `margin:20px 0`,
    `border-radius:${radius.md}px`,
    `overflow:hidden`,
    `border:1px solid ${colors.border}`
  ].join(";");
  const header = [
    `background-color:${colors.bgSoft}`,
    `color:${colors.textMuted}`,
    `padding:8px 14px`,
    `font-size:11px`,
    `font-weight:500`,
    `letter-spacing:0.5px`,
    `line-height:1.4`,
    `border-bottom:1px solid ${colors.border}`
  ].join(";");
  const lang = `text-transform:uppercase`;
  const copy = `margin-left:8px;vertical-align:middle`;
  return { wrapper, header, lang, copy };
}
const headerBar = {
  meta: {
    id: "header-bar",
    kind: "codeBlock",
    name: "带头部代码块",
    description: "顶栏显示语言 + copy 图标"
  },
  thumbnail: thumb$1f,
  snippets: [
    {
      presetId: "cb-header-bar",
      name: "带头部代码块",
      description: "顶栏显示语言名，Stripe Docs / MDN 家族",
      markdown: "```typescript variant=header-bar\ninterface User { id: string; name: string }\nconst u: User = { id: 'u1', name: 'Ada' }\n```\n"
    }
  ],
  render: (theme, { language, codeInnerHtml }) => {
    const label = labelFor(language);
    const { wrapper, header, lang, copy } = styles$2(theme);
    const copyIconHtml = theme.assets.copyIcon ? `<span class="wx-code-block__copy" style="${copy}">${theme.assets.copyIcon}</span>` : "";
    const langClass = language ? `language-${language} hljs` : "hljs";
    const preInlineReset = `margin:0;border-radius:0`;
    return [
      `<section class="wx-code-block wx-code-block--header-bar" style="${wrapper}">`,
      `<section class="wx-code-block__header" style="${header}">`,
      `<span class="wx-code-block__lang" style="${lang}">${label}</span>`,
      copyIconHtml,
      `</section>`,
      `<pre class="wx-code-block__pre" style="${preInlineReset}"><code class="${langClass}">${codeInnerHtml}</code></pre>`,
      `</section>`
    ].join("");
  }
};
function thumb$1e() {
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="#fff" stroke="#d0d4da"/><rect x="6" y="14" width="14" height="47" rx="3 0 0 3" fill="#f5f5f3"/><rect x="20" y="14" width="0.7" height="47" fill="#d0d4da"/><text x="16" y="24" font-size="6" fill="#9aa1aa" font-family="monospace" text-anchor="end">1</text><text x="16" y="33" font-size="6" fill="#9aa1aa" font-family="monospace" text-anchor="end">2</text><text x="16" y="42" font-size="6" fill="#9aa1aa" font-family="monospace" text-anchor="end">3</text><text x="16" y="51" font-size="6" fill="#9aa1aa" font-family="monospace" text-anchor="end">4</text><text x="16" y="60" font-size="6" fill="#9aa1aa" font-family="monospace" text-anchor="end">5</text><rect x="26" y="22" width="34" height="2" fill="#c678dd"/><rect x="26" y="30" width="40" height="2" fill="#abb2bf"/><rect x="26" y="38" width="22" height="2" fill="#98c379"/><rect x="26" y="46" width="38" height="2" fill="#abb2bf"/><rect x="26" y="54" width="28" height="2" fill="#56b6c2"/>`
  );
}
function styles$1(theme) {
  const { colors, radius } = theme.tokens;
  const wrapper = [
    `margin:20px 0`,
    `border-radius:${radius.md}px`,
    `overflow:hidden`,
    `border:1px solid ${colors.border}`,
    `background-color:${colors.preBg ?? "#2a2d32"}`
  ].join(";");
  const gutter = [
    `display:table-cell`,
    `vertical-align:top`,
    `width:1%`,
    `white-space:nowrap`,
    `padding:14px 12px 14px 14px`,
    `border-right:1px solid ${colors.border}`,
    `text-align:right`
  ].join(";");
  const gutterPre = [
    `margin:0`,
    `padding:0`,
    `background:transparent`,
    `border:none`,
    `font-family:Menlo,Monaco,Consolas,monospace`,
    `font-size:12px`,
    `line-height:1.55`,
    `color:${colors.textMuted}`
  ].join(";");
  const codeCell = [
    `display:table-cell`,
    `vertical-align:top`
  ].join(";");
  const preReset = [
    `margin:0`,
    `border-radius:0`,
    `border:none`,
    `font-size:12px`,
    `line-height:1.55`
  ].join(";");
  return { wrapper, gutter, gutterPre, codeCell, preReset };
}
const lineNumbers = {
  meta: {
    id: "line-numbers",
    kind: "codeBlock",
    name: "行号代码块",
    description: "左侧行号列 + 分隔线，IDE / 技术书风"
  },
  thumbnail: thumb$1e,
  snippets: [
    {
      presetId: "cb-line-numbers",
      name: "行号代码块",
      description: "左 gutter 行号 + 分隔线，可在正文按行号引用",
      markdown: "```python variant=line-numbers\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n```\n"
    }
  ],
  render: (theme, { language, codeInnerHtml }) => {
    const { wrapper, gutter, gutterPre, codeCell, preReset } = styles$1(theme);
    const parts = codeInnerHtml.split("\n");
    if (parts.length > 1 && parts[parts.length - 1] === "") parts.pop();
    const totalLines = Math.max(parts.length, 1);
    const nums = Array.from({ length: totalLines }, (_, i) => String(i + 1)).join("\n");
    const langClass = language ? `language-${language} hljs` : "hljs";
    return [
      `<section class="wx-code-block wx-code-block--line-numbers" style="${wrapper}">`,
      `<section style="display:table;width:100%;table-layout:auto">`,
      `<section class="wx-code-block__gutter" style="${gutter}">`,
      `<pre style="${gutterPre}">${nums}</pre>`,
      `</section>`,
      `<section class="wx-code-block__code" style="${codeCell}">`,
      `<pre class="wx-code-block__pre" style="${preReset}"><code class="${langClass}">${codeInnerHtml}</code></pre>`,
      `</section>`,
      `</section>`,
      `</section>`
    ].join("");
  }
};
function thumb$1d() {
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="#1d1f23"/><rect x="6" y="14" width="63" height="9" rx="3" fill="#2a2d33"/><rect x="6" y="21" width="63" height="2" fill="#1d1f23"/><circle cx="12" cy="18.5" r="1.6" fill="#ff5f57"/><circle cx="17" cy="18.5" r="1.6" fill="#febc2e"/><circle cx="22" cy="18.5" r="1.6" fill="#28c840"/><rect x="32" y="17.5" width="20" height="2.5" rx="0.5" fill="#5c6068"/><text x="11" y="33" font-size="6" fill="#98c379" font-family="monospace">$</text><rect x="17" y="29" width="36" height="2" fill="#abb2bf"/><rect x="11" y="37" width="42" height="2" fill="#56b6c2"/><rect x="11" y="45" width="32" height="2" fill="#c678dd"/><rect x="11" y="53" width="24" height="2" fill="#98c379"/>`
  );
}
const TERMINAL = {
  body: "#1d1f23",
  chrome: "#2a2d33",
  chromeBorder: "#1d1f23",
  titleText: "#8f9499",
  bodyText: "#d8d8d4",
  light: {
    red: "#ff5f57",
    yellow: "#febc2e",
    green: "#28c840"
  }
};
function trafficLights() {
  const dot = (color) => `<svg viewBox="0 0 12 12" width="12" height="12" style="display:inline-block;vertical-align:middle;margin-right:6px"><circle cx="6" cy="6" r="6" fill="${color}"/></svg>`;
  return dot(TERMINAL.light.red) + dot(TERMINAL.light.yellow) + dot(TERMINAL.light.green);
}
function titleFor(language) {
  return language ? language.toLowerCase() : "terminal";
}
const terminalFrame = {
  meta: {
    id: "terminal-frame",
    kind: "codeBlock",
    name: "终端代码块",
    description: "窗口腔 + 3 圆点 + 暗底；SSH / REPL 风"
  },
  thumbnail: thumb$1d,
  snippets: [
    {
      presetId: "cb-terminal-frame",
      name: "终端代码块",
      description: "红黄绿圆点 + 标题 + 暗腔；shell / REPL 演示用",
      markdown: "```bash variant=terminal-frame\n$ git rebase -i HEAD~3\n$ git push --force-with-lease\n```\n"
    }
  ],
  render: (_theme, { language, codeInnerHtml }) => {
    const wrapper = [
      `margin:20px 0`,
      `border-radius:8px`,
      `overflow:hidden`,
      `background-color:${TERMINAL.body}`,
      `box-shadow:0 1px 0 rgba(0,0,0,0.04)`
    ].join(";");
    const chrome = [
      `display:table`,
      `width:100%`,
      `padding:8px 12px`,
      `background-color:${TERMINAL.chrome}`,
      `border-bottom:1px solid ${TERMINAL.chromeBorder}`
    ].join(";");
    const lightsCell = [
      `display:table-cell`,
      `vertical-align:middle`,
      `width:1%`,
      `white-space:nowrap`
    ].join(";");
    const titleCell = [
      `display:table-cell`,
      `vertical-align:middle`,
      `text-align:left`,
      `padding-left:10px`,
      `font-family:Menlo,Monaco,Consolas,monospace`,
      `font-size:11px`,
      `color:${TERMINAL.titleText}`,
      `letter-spacing:0.04em`
    ].join(";");
    const preReset = [
      `margin:0`,
      `border-radius:0`,
      `border:none`,
      `background-color:${TERMINAL.body}`,
      `color:${TERMINAL.bodyText}`,
      `padding:14px 16px`,
      `font-size:13px`,
      `line-height:1.6`
    ].join(";");
    const langClass = language ? `language-${language} hljs` : "hljs";
    return [
      `<section class="wx-code-block wx-code-block--terminal-frame" style="${wrapper}">`,
      `<section class="wx-code-block__chrome" style="${chrome}">`,
      `<span style="${lightsCell}">${trafficLights()}</span>`,
      `<span style="${titleCell}">${titleFor(language)}</span>`,
      `</section>`,
      `<pre class="wx-code-block__pre" style="${preReset}"><code class="${langClass}">${codeInnerHtml}</code></pre>`,
      `</section>`
    ].join("");
  }
};
function thumb$1c() {
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="2" fill="#f4f1ec"/><rect x="6" y="14" width="3" height="47" fill="#c09060"/><rect x="14" y="22" width="42" height="2" fill="#7a8389"/><rect x="14" y="30" width="34" height="2" fill="#a3a8ad"/><rect x="14" y="38" width="46" height="2" fill="#7a8389"/><rect x="14" y="46" width="26" height="2" fill="#a3a8ad"/><rect x="14" y="54" width="38" height="2" fill="#7a8389"/>`
  );
}
function styles(theme) {
  const { colors, radius } = theme.tokens;
  const wrapper = [
    `margin:12px 0`,
    `border-radius:${radius.sm}px`,
    `overflow:hidden`,
    `background-color:${colors.bgSoft}`,
    `border-left:3px solid ${colors.primary}`
  ].join(";");
  const preReset = [
    `margin:0`,
    `border:none`,
    `border-radius:0`,
    `background:transparent`,
    `color:${colors.preText ?? colors.text}`,
    `padding:10px 14px`,
    `font-size:12px`,
    `line-height:1.6`
  ].join(";");
  return { wrapper, preReset };
}
const inlineCard = {
  meta: {
    id: "inline-card",
    kind: "codeBlock",
    name: "嵌入代码片段",
    description: "左竖条 + tinted 软底 + 紧凑字号，随文引用"
  },
  thumbnail: thumb$1c,
  snippets: [
    {
      presetId: "cb-inline-card",
      name: "嵌入代码片段",
      description: "左竖条 + 软底 + 紧凑字号；文学/生活向稿件随文引用代码",
      markdown: "```javascript variant=inline-card\nconst greet = (name) => `Hello, ${name}`\n```\n"
    }
  ],
  render: (theme, { language, codeInnerHtml }) => {
    const { wrapper, preReset } = styles(theme);
    const langClass = language ? `language-${language} hljs` : "hljs";
    return [
      `<section class="wx-code-block wx-code-block--inline-card" style="${wrapper}">`,
      `<pre class="wx-code-block__pre" style="${preReset}"><code class="${langClass}">${codeInnerHtml}</code></pre>`,
      `</section>`
    ].join("");
  }
};
const codeBlockAll = [bare$1, headerBar, lineNumbers, terminalFrame, inlineCard];
function thumb$1b(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="18" width="20" height="1" fill="${text}"/><rect x="10" y="26" width="18" height="2" fill="${text}"/><rect x="10" y="36" width="55" height="2" fill="#c0c6cf"/><rect x="10" y="44" width="48" height="2" fill="#c0c6cf"/><rect x="10" y="52" width="40" height="2" fill="#c0c6cf"/>`
  );
}
const minimalCallout = {
  meta: {
    id: "minimal-callout",
    kind: "note",
    name: "极简短线",
    description: "顶端 1px 短分隔 + textMuted 标题，低调批注"
  },
  thumbnail: thumb$1b,
  snippets: [
    {
      presetId: "note-minimal-callout",
      name: "极简短线 Note",
      description: "不抢色的低调补注，顶端短线分隔",
      markdown: "::: note 补注\n中性补充说明 …\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: `margin:16px 0;padding:0`,
      titleCSS: [
        `color:${c.textMuted}`,
        "font-weight:600",
        "font-size:13px",
        "margin-bottom:4px",
        "letter-spacing:0.3px"
      ].join(";")
    };
  }
};
function thumb$1a(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="14" width="59" height="47" fill="none" stroke="${text}" stroke-width="1" opacity="0.4"/><rect x="14" y="22" width="22" height="2" fill="${text}"/><rect x="14" y="32" width="48" height="2" fill="#c0c6cf"/><rect x="14" y="40" width="40" height="2" fill="#c0c6cf"/><rect x="14" y="48" width="34" height="2" fill="#c0c6cf"/>`
  );
}
const boxCallout = {
  meta: {
    id: "box-callout",
    kind: "note",
    name: "边框补注",
    description: "1px 全边框 + textMuted 标题，明确块界"
  },
  thumbnail: thumb$1a,
  snippets: [
    {
      presetId: "note-box-callout",
      name: "边框补注",
      description: "清晰外框包裹的中性 Note",
      markdown: "::: note variant=box-callout 参考资料\n注释内容 …\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const pad = ctx.tokens.spacing.containerPadding;
    return {
      wrapperCSS: [
        `border:1px solid ${c.border}`,
        `padding:${Math.max(10, pad - 4)}px ${pad}px`,
        "margin:16px 0",
        `border-radius:${ctx.tokens.radius.sm}px`
      ].join(";"),
      titleCSS: [
        `color:${c.textMuted}`,
        "font-weight:600",
        "font-size:13px",
        "margin-bottom:6px",
        "letter-spacing:0.3px"
      ].join(";")
    };
  }
};
function thumb$19(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="16" width="2" height="42" fill="${text}"/><rect x="18" y="22" width="20" height="2" fill="${text}"/><rect x="18" y="32" width="44" height="2" fill="#c0c6cf"/><rect x="18" y="40" width="38" height="2" fill="#c0c6cf"/><rect x="18" y="48" width="32" height="2" fill="#c0c6cf"/>`
  );
}
const sideBar = {
  meta: {
    id: "side-bar",
    kind: "note",
    name: "左侧标线",
    description: "左 2px 中性线 + 左缩进，经典批注式"
  },
  thumbnail: thumb$19,
  snippets: [
    {
      presetId: "note-side-bar",
      name: "左侧标线 Note",
      description: '中性左条 + 缩进，"此处有补充"批注感',
      markdown: "::: note variant=side-bar 旁注\n附属说明 …\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const borderColor = c.noteBorder ?? c.border;
    const borderStyle = c.noteBorderStyle ?? "solid";
    const declaredWidth = c.noteBorderWidth ?? 2;
    const borderWidth = borderStyle === "double" ? Math.max(3, declaredWidth) : declaredWidth;
    const padLeft = Math.max(12, borderWidth + 10);
    return {
      wrapperCSS: [
        `border-left:${borderWidth}px ${borderStyle} ${borderColor}`,
        `padding:4px 0 4px ${padLeft}px`,
        "margin:16px 0"
      ].join(";"),
      titleCSS: [
        `color:${c.textMuted}`,
        "font-weight:600",
        "font-size:13px",
        "margin-bottom:4px",
        "letter-spacing:0.3px"
      ].join(";")
    };
  }
};
function thumb$18(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<circle cx="11" cy="20" r="1" fill="${text}"/><circle cx="11" cy="28" r="1" fill="${text}"/><circle cx="11" cy="36" r="1" fill="${text}"/><circle cx="11" cy="44" r="1" fill="${text}"/><circle cx="11" cy="52" r="1" fill="${text}"/><rect x="18" y="22" width="22" height="2" fill="${text}"/><rect x="18" y="32" width="44" height="2" fill="#c0c6cf"/><rect x="18" y="40" width="38" height="2" fill="#c0c6cf"/><rect x="18" y="48" width="32" height="2" fill="#c0c6cf"/>`
  );
}
const dottedMargin = {
  meta: {
    id: "dotted-margin",
    kind: "note",
    name: "左侧虚点",
    description: "左 dotted rule + 缩进，散文页边批注"
  },
  thumbnail: thumb$18,
  snippets: [
    {
      presetId: "note-dotted-margin",
      name: "左侧虚点 Note",
      description: "左 dotted rule + 缩进，比 side-bar 更轻",
      markdown: "::: note variant=dotted-margin 旁批\n这里是页边的手记，作者随文补一句。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        "margin:16px 0",
        "padding:4px 0 4px 14px",
        `border-left:2px dotted ${c.border}`
      ].join(";"),
      titleCSS: [
        `color:${c.textMuted}`,
        "font-weight:600",
        "font-size:13px",
        "font-style:italic",
        "margin-bottom:4px"
      ].join(";")
    };
  }
};
function thumb$17(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<text x="10" y="22" font-size="6" font-weight="700" letter-spacing="2" fill="${accent}">NOTE</text><rect x="10" y="28" width="55" height="2" fill="${accent}"/><rect x="10" y="38" width="48" height="2" fill="${text}"/><rect x="10" y="46" width="55" height="2" fill="#c0c6cf"/><rect x="10" y="54" width="42" height="2" fill="#c0c6cf"/>`
  );
}
const smallcapsKicker = {
  meta: {
    id: "smallcaps-kicker",
    kind: "note",
    name: "小字 kicker + hairline",
    description: "letter-spaced kicker + 主色 hairline"
  },
  thumbnail: thumb$17,
  snippets: [
    {
      presetId: "note-smallcaps-kicker",
      name: "小字 kicker Note",
      description: "uppercase 小字 kicker + 主色 hairline",
      markdown: "::: note variant=smallcaps-kicker NOTE\n模块化短注，适配数据简报与栏目化深度文。\n:::\n"
    },
    {
      presetId: "note-smallcaps-kicker-hanging",
      name: "小字 kicker · 悬挂缩进",
      description: "uppercase 小字 kicker，悬挂缩进无顶线",
      markdown: "::: note variant=smallcaps-kicker layout=hanging 注\n说明文字 …\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    if (ctx.attrs.layout === "hanging") {
      return {
        wrapperCSS: [
          "margin:16px 0",
          "padding:8px 0 4px 12px",
          "text-indent:-12px"
        ].join(";"),
        titleCSS: [
          `color:${c.primary}`,
          "font-weight:700",
          "font-size:11px",
          "letter-spacing:1.5px",
          "text-transform:uppercase",
          "margin-bottom:6px",
          "display:inline-block",
          "margin-right:6px"
        ].join(";")
      };
    }
    return {
      wrapperCSS: [
        "margin:16px 0",
        "padding:6px 0 0",
        `border-top:2px solid ${c.primary}`
      ].join(";"),
      titleCSS: [
        `color:${c.primary}`,
        "font-weight:700",
        "font-size:11px",
        "letter-spacing:2px",
        "text-transform:uppercase",
        "margin:8px 0 6px"
      ].join(";")
    };
  }
};
function thumb$16(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="14" width="59" height="47" fill="${soft}"/><rect x="8" y="14" width="3" height="47" fill="${accent}"/><text x="16" y="24" font-size="6" font-weight="700" letter-spacing="1" fill="${accent}">编 者 按</text><rect x="16" y="32" width="48" height="2" fill="${text}"/><rect x="16" y="40" width="44" height="2" fill="#c0c6cf"/><rect x="16" y="48" width="40" height="2" fill="#c0c6cf"/><rect x="16" y="56" width="32" height="2" fill="#c0c6cf"/>`
  );
}
const editorialStripe = {
  meta: {
    id: "editorial-stripe",
    kind: "note",
    name: "编辑部按",
    description: "左 3px 主色条 + bgSoft + kicker"
  },
  thumbnail: thumb$16,
  snippets: [
    {
      presetId: "note-editorial-stripe",
      name: "编辑部按",
      description: "主色左竖条 + 浅底 + kicker，编辑部发声块",
      markdown: "::: note variant=editorial-stripe 编 者 按\n本期编辑部就读者反馈做几点说明 …\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        `background-color:${c.bgSoft}`,
        `border-left:3px solid ${c.primary}`,
        "padding:14px 16px",
        "margin:22px 0"
      ].join(";"),
      titleCSS: [
        `color:${c.primary}`,
        "font-weight:700",
        "font-size:13px",
        "letter-spacing:0.1em",
        "margin-bottom:8px"
      ].join(";")
    };
  }
};
function thumb$15(args) {
  const { soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="14" width="59" height="47" fill="${soft}"/><text x="14" y="24" font-size="6" font-weight="700" fill="${text}">方 法 论</text><rect x="14" y="32" width="48" height="1.5" fill="${text}" opacity="0.7"/><rect x="14" y="38" width="50" height="1.5" fill="#a0a8b3"/><rect x="14" y="44" width="46" height="1.5" fill="#a0a8b3"/><rect x="14" y="50" width="42" height="1.5" fill="#a0a8b3"/><rect x="14" y="56" width="38" height="1.5" fill="#a0a8b3"/>`
  );
}
const researchDense = {
  meta: {
    id: "research-dense",
    kind: "note",
    name: "方法论小字",
    description: "紧凑 10px + 粗体 label + bgSoft",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$15,
  snippets: [
    {
      presetId: "note-research-dense",
      name: "方法论 Note",
      description: "调研口径栏：浅底 + 10px 紧凑 + 粗体 label 顶头",
      markdown: "::: note variant=research-dense 方法论\n样本 n=1,024，覆盖 18–72 岁都市读者；置信区间 95%，整体误差 ±0.87pp。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        `background-color:${c.bgSoft}`,
        "padding:10px 12px",
        "margin:16px 0",
        "font-size:10px",
        "line-height:1.7",
        `color:${c.textMuted}`
      ].join(";"),
      titleCSS: [
        `color:${c.text}`,
        "font-weight:700",
        "font-size:10px",
        "margin-bottom:4px"
      ].join(";")
    };
  }
};
function thumb$14(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="22" width="55" height="2" fill="#c0c6cf"/><rect x="10" y="30" width="48" height="2" fill="#c0c6cf"/><rect x="10" y="38" width="40" height="2" fill="#c0c6cf"/><rect x="32" y="52" width="33" height="1" fill="${text}" opacity="0.4"/><rect x="32" y="58" width="20" height="2" fill="${text}" opacity="0.3"/>`
  );
}
const variantDef$n = {
  meta: {
    id: "ed-signoff",
    kind: "note",
    name: "ed. 落款",
    description: "右下 ed. + 首字母 monospace（编辑部 v1）",
    designedFor: ["editorial-mook"]
  },
  thumbnail: thumb$14,
  snippets: [
    {
      presetId: "note-ed-signoff",
      name: "ed. 落款",
      description: "右下 ed. + 首字母 monospace（编辑部 v1）",
      markdown: "::: note variant=ed-signoff\n按语正文\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const footer = [
      `<div style="display:flex;justify-content:flex-end;align-items:center;`,
      `gap:8px;border-top:1px solid ${c.text};padding-top:6px;`,
      `width:62%;margin-left:38%;margin-bottom:8px;">`,
      `<span style="font-family:'Lora',serif;font-style:italic;font-size:12px;color:${c.textMuted};">— ed.</span>`,
      `<span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:${c.textMuted};letter-spacing:.16em;">L.Z.</span>`,
      `</div>`
    ].join("");
    return {
      wrapperCSS: [`background:${c.bg}`, "padding:6px 0"].join(";"),
      titleCSS: "",
      suppressIcon: true,
      svgSlot: footer,
      bodyCSS: [
        `font-size:15px`,
        `line-height:1.95`,
        `color:${c.text}`,
        `font-style:italic`,
        `font-family:'Lora','Noto Serif SC',serif`
      ].join(";")
    };
  }
};
function thumb$13(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="22" width="22" height="10" rx="1" fill="${text}"/><rect x="36" y="24" width="30" height="2" fill="#c0c6cf"/><rect x="10" y="38" width="55" height="2" fill="#c0c6cf"/><rect x="10" y="46" width="48" height="2" fill="#c0c6cf"/><rect x="10" y="54" width="40" height="2" fill="#c0c6cf"/>`
  );
}
const variantDef$m = {
  meta: {
    id: "inline-label",
    kind: "note",
    name: "段首胶囊",
    description: "段首反白胶囊编者按 + inline 流（编辑部 v2）",
    designedFor: ["editorial-mook"]
  },
  thumbnail: thumb$13,
  snippets: [
    {
      presetId: "note-inline-label",
      name: "段首胶囊",
      description: "段首反白胶囊编者按 + inline 流（编辑部 v2）",
      markdown: "::: note variant=inline-label\n按语正文\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const capsule = [
      `<div style="margin-bottom:4px;">`,
      `<span style="display:inline-block;font-family:'IBM Plex Mono',monospace;`,
      `font-size:10px;letter-spacing:.2em;background:${c.text};color:${c.bg};`,
      `padding:2px 8px;vertical-align:1px;margin-right:8px;">编者按</span>`,
      `</div>`
    ].join("");
    return {
      wrapperCSS: [`background:${c.bg}`, "padding:6px 0"].join(";"),
      titleCSS: "",
      suppressIcon: true,
      svgSlot: capsule,
      bodyCSS: [
        `font-size:15px`,
        `line-height:1.95`,
        `color:${c.text}`,
        `font-family:'Noto Serif SC',serif`,
        `text-indent:0`,
        `margin:0`
      ].join(";")
    };
  }
};
function thumb$12(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="28" width="55" height="2" fill="${text}" opacity="0.8"/><rect x="26" y="20" width="1" height="16" fill="${accent}" opacity="0.5"/><rect x="10" y="36" width="16" height="2" fill="#c0c6cf"/><rect x="30" y="36" width="35" height="2" fill="#c0c6cf"/><rect x="10" y="44" width="55" height="2" fill="#c0c6cf"/><rect x="10" y="52" width="44" height="2" fill="#c0c6cf"/>`
  );
}
const variantDef$l = {
  meta: {
    id: "interlinear-gloss",
    kind: "note",
    name: "双行夹注",
    description: "上下 1px border + 朱色双行小字（宋本 v1）",
    designedFor: ["literary-humanism"]
  },
  thumbnail: thumb$12,
  snippets: [
    {
      presetId: "note-interlinear-gloss",
      name: "双行夹注",
      description: "上下 1px border + 朱色双行小字（宋本 v1）",
      markdown: "::: note variant=interlinear-gloss\n按语正文\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const accent = c.accentClassical ?? c.accent;
    const muted = c.textMuted;
    const gloss = [
      `<div style="margin-bottom:6px;text-align:center;">`,
      `<span style="display:inline-block;vertical-align:middle;font-size:10px;`,
      `line-height:1.2;color:${accent};padding:0 6px;text-align:center;`,
      `border-top:1px solid ${muted};border-bottom:1px solid ${muted};">`,
      `黄庭坚《寄黄几复》<br>之颔联也`,
      `</span>`,
      `</div>`
    ].join("");
    return {
      wrapperCSS: [`background:${c.bg}`, "padding:6px 0"].join(";"),
      titleCSS: "",
      suppressIcon: true,
      svgSlot: gloss,
      bodyCSS: [
        `font-size:15px`,
        `line-height:2`,
        `color:${c.text}`,
        `font-family:'Noto Serif SC',serif`,
        `margin:0`
      ].join(";")
    };
  }
};
function thumb$11(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<text x="10" y="42" font-size="16" font-weight="500" fill="${accent}" font-family="serif">注</text><rect x="28" y="28" width="37" height="2" fill="${text}" opacity="0.6"/><rect x="28" y="36" width="37" height="2" fill="#c0c6cf"/><rect x="28" y="44" width="30" height="2" fill="#c0c6cf"/>`
  );
}
const variantDef$k = {
  meta: {
    id: "vermilion-gloss",
    kind: "note",
    name: "朱字小注",
    description: "左大字「注」+ 右朱褐正文（宋本 v2）",
    designedFor: ["literary-humanism"]
  },
  thumbnail: thumb$11,
  snippets: [
    {
      presetId: "note-vermilion-gloss",
      name: "朱字小注",
      description: "左大字「注」+ 右朱褐正文（宋本 v2）",
      markdown: "::: note variant=vermilion-gloss\n按语正文\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const accent = c.accentClassical ?? c.accent;
    const label = [
      `<div style="font-family:'Noto Serif SC',serif;color:${accent};`,
      `font-size:22px;font-weight:500;line-height:1;margin-bottom:4px;">注</div>`
    ].join("");
    return {
      wrapperCSS: [`background:${c.bg}`, "padding:6px 0"].join(";"),
      titleCSS: "",
      suppressIcon: true,
      svgSlot: label,
      bodyCSS: [
        `font-size:14.5px`,
        `line-height:1.95`,
        `color:${c.textMuted}`,
        `font-family:'Noto Serif SC',serif`,
        `margin:0`
      ].join(";")
    };
  }
};
function thumb$10(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="20" width="10" height="2" fill="${text}" opacity="0.5"/><rect x="22" y="21" width="28" height="1" fill="${text}" opacity="0.3" stroke-dasharray="2,2"/><rect x="52" y="19" width="13" height="3" fill="${accent}" opacity="0.5"/><rect x="10" y="32" width="55" height="2" fill="#c0c6cf"/><rect x="10" y="40" width="48" height="2" fill="#c0c6cf"/><rect x="10" y="48" width="40" height="2" fill="#c0c6cf"/>`
  );
}
const variantDef$j = {
  meta: {
    id: "ruler-note",
    kind: "note",
    name: "测量条注",
    description: "NOTE + 虚线测量条 + ed. 2025（博物 v1）",
    designedFor: ["academic-frontier"]
  },
  thumbnail: thumb$10,
  snippets: [
    {
      presetId: "note-ruler-note",
      name: "测量条注",
      description: "NOTE + 虚线测量条 + ed. 2025（博物 v1）",
      markdown: "::: note variant=ruler-note\n按语正文\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const naturalist = c.accentNaturalist ?? c.textMuted;
    const header = [
      `<div style="display:flex;align-items:flex-end;gap:6px;margin-bottom:6px;">`,
      `<div style="font-family:'IBM Plex Mono',monospace;font-size:9px;`,
      `color:${c.textMuted};letter-spacing:.16em;">NOTE</div>`,
      `<div style="flex:1;border-bottom:1px dashed ${c.textMuted};height:8px;"></div>`,
      `<div style="font-family:'Lora',serif;font-style:italic;font-size:11px;color:${naturalist};">ed. 2025</div>`,
      `</div>`
    ].join("");
    return {
      wrapperCSS: [`background:${c.bg}`, "padding:6px 0"].join(";"),
      titleCSS: "",
      suppressIcon: true,
      svgSlot: header,
      bodyCSS: [
        `font-size:14.5px`,
        `line-height:1.95`,
        `color:${c.text}`,
        `font-family:'Noto Serif SC',serif`,
        `margin:0`
      ].join(";")
    };
  }
};
function thumb$$(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<text x="10" y="24" font-size="7" font-style="italic" fill="${accent}" font-family="serif">Annotatio</text><text x="10" y="34" font-size="6" letter-spacing="3" fill="${text}" opacity="0.5">编 者 按</text><rect x="10" y="44" width="55" height="2" fill="#c0c6cf"/><rect x="10" y="52" width="48" height="2" fill="#c0c6cf"/><rect x="10" y="60" width="40" height="2" fill="#c0c6cf"/>`
  );
}
const variantDef$i = {
  meta: {
    id: "latin-subhead",
    kind: "note",
    name: "学名上标",
    description: "Annotatio redactoris 拉丁 italic（博物 v2）",
    designedFor: ["academic-frontier"]
  },
  thumbnail: thumb$$,
  snippets: [
    {
      presetId: "note-latin-subhead",
      name: "学名上标",
      description: "Annotatio redactoris 拉丁 italic（博物 v2）",
      markdown: "::: note variant=latin-subhead\n按语正文\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const naturalist = c.accentNaturalist ?? c.textMuted;
    const header = [
      `<div style="font-family:'Lora',serif;font-style:italic;font-size:12px;`,
      `color:${naturalist};letter-spacing:.04em;line-height:1.2;">Annotatio redactoris</div>`,
      `<div style="font-family:'Noto Serif SC',serif;font-size:11px;color:${c.textMuted};`,
      `letter-spacing:.3em;margin-top:1px;margin-bottom:10px;">编 者 按 语</div>`
    ].join("");
    return {
      wrapperCSS: [`background:${c.bg}`, "padding:6px 0"].join(";"),
      titleCSS: "",
      suppressIcon: true,
      svgSlot: header,
      bodyCSS: [
        `font-size:14.5px`,
        `line-height:1.95`,
        `color:${c.text}`,
        `font-family:'Noto Serif SC',serif`,
        `margin:0`
      ].join(";")
    };
  }
};
function thumb$_(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<circle cx="22" cy="32" r="12" fill="${text}"/><text x="22" y="37" font-size="10" font-weight="500" fill="#ffffff" text-anchor="middle" font-family="serif">L</text><rect x="40" y="20" width="25" height="2" fill="${text}" opacity="0.4"/><rect x="40" y="28" width="25" height="2" fill="#c0c6cf"/><rect x="40" y="36" width="25" height="2" fill="#c0c6cf"/><rect x="40" y="44" width="20" height="2" fill="#c0c6cf"/>`
  );
}
const variantDef$h = {
  meta: {
    id: "initial-disc",
    kind: "note",
    name: "首字母圆盘",
    description: "左 34×34 圆形深底 + EDITOR monospace（包豪斯 v1）",
    designedFor: ["swiss-grid"]
  },
  thumbnail: thumb$_,
  snippets: [
    {
      presetId: "note-initial-disc",
      name: "首字母圆盘",
      description: "左 34×34 圆形深底 + EDITOR monospace（包豪斯 v1）",
      markdown: "::: note variant=initial-disc\n按语正文\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const header = [
      `<div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:4px;">`,
      `<div style="flex-shrink:0;width:34px;height:34px;border-radius:50%;`,
      `background:${c.text};color:${c.bg};display:flex;align-items:center;`,
      `justify-content:center;font-family:'Lora',serif;font-size:15px;font-weight:500;">L</div>`,
      `<div style="padding-top:4px;font-family:'IBM Plex Mono',monospace;font-size:9px;`,
      `letter-spacing:.2em;color:${c.textMuted};">EDITOR · 刘震</div>`,
      `</div>`
    ].join("");
    return {
      wrapperCSS: [`background:${c.bg}`, "padding:6px 0"].join(";"),
      titleCSS: "",
      suppressIcon: true,
      svgSlot: header,
      bodyCSS: [
        `font-size:14.5px`,
        `line-height:1.85`,
        `color:${c.text}`,
        `font-family:'Noto Serif SC',serif`,
        `margin:0`
      ].join(";")
    };
  }
};
function thumb$Z(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<polygon points="10,28 18,22 18,34" fill="${text}"/><rect x="22" y="25" width="33" height="2" fill="${text}"/><rect x="10" y="42" width="55" height="2" fill="#c0c6cf"/><rect x="10" y="50" width="48" height="2" fill="#c0c6cf"/><rect x="10" y="58" width="40" height="2" fill="#c0c6cf"/>`
  );
}
const variantDef$g = {
  meta: {
    id: "geometric-mark",
    kind: "note",
    name: "几何引号",
    description: "三角引号 + EDITORIAL·NOTE 标题（包豪斯 v2）",
    designedFor: ["brutalist"]
  },
  thumbnail: thumb$Z,
  snippets: [
    {
      presetId: "note-geometric-mark",
      name: "几何引号",
      description: "三角引号 + EDITORIAL·NOTE 标题（包豪斯 v2）",
      markdown: "::: note variant=geometric-mark\n按语正文\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const header = [
      `<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">`,
      `<span style="width:0;height:0;border-top:6px solid transparent;`,
      `border-bottom:6px solid transparent;border-left:9px solid ${c.text};`,
      `display:inline-block;"></span>`,
      `<span style="font-family:'IBM Plex Mono',monospace;font-size:10px;`,
      `letter-spacing:.24em;color:${c.text};font-weight:600;">EDITORIAL · NOTE</span>`,
      `</div>`
    ].join("");
    return {
      wrapperCSS: [`background:${c.bg}`, "padding:6px 0"].join(";"),
      titleCSS: "",
      suppressIcon: true,
      svgSlot: header,
      bodyCSS: [
        `font-size:14.5px`,
        `line-height:1.9`,
        `color:${c.text}`,
        `font-family:'Noto Serif SC',serif`,
        `margin:0`,
        `padding-left:17px`
      ].join(";")
    };
  }
};
const noteAll = [
  minimalCallout,
  boxCallout,
  sideBar,
  dottedMargin,
  smallcapsKicker,
  editorialStripe,
  researchDense,
  variantDef$n,
  variantDef$m,
  variantDef$l,
  variantDef$k,
  variantDef$j,
  variantDef$i,
  variantDef$h,
  variantDef$g
];
function thumb$Y(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="22" width="55" height="30" fill="${text}" opacity="0.08"/><rect x="14" y="30" width="40" height="2" fill="${text}"/><rect x="14" y="38" width="44" height="2" fill="${text}"/><rect x="14" y="46" width="32" height="2" fill="${text}"/>`
  );
}
const plain = {
  meta: {
    id: "plain",
    kind: "highlight",
    name: "默认高亮",
    description: "外壳样式由 ThemeContainers.highlight 主题级 CSS 接管,变体不发 wrapperCSS",
    // 实验性骨架: highlight 池刚启用,21 主题暂未显式声明 variants.highlight。
    // 任一主题显式声明 'plain' 或为本变体加 designedFor 后,可移除本字段。
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$Y,
  snippets: [
    {
      presetId: "highlight-plain",
      name: "高亮块",
      description: "作者自我强调的整段",
      markdown: "::: highlight\n这是被强调的整段。\n:::\n"
    }
  ],
  render: () => ({ wrapperCSS: "" })
};
function thumb$X(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="18" width="55" height="38" fill="${text}" opacity="0.06"/><rect x="14" y="30" width="47" height="2" fill="${text}"/><rect x="14" y="38" width="40" height="2" fill="${text}" opacity="0.45"/><rect x="14" y="46" width="28" height="2" fill="${text}" opacity="0.45"/><line x1="10" y1="56" x2="65" y2="56" stroke="${text}" stroke-width="1.5" stroke-dasharray="2 2"/>`
  );
}
const variantDef$f = {
  meta: {
    id: "dotted-underline",
    kind: "highlight",
    name: "点状下划线",
    description: "整段底部点状线 + 中性底色，编辑部轻强调",
    designedFor: ["editorial-mook"]
  },
  thumbnail: thumb$X,
  snippets: [
    {
      presetId: "highlight-dotted-underline",
      name: "点状下划线",
      description: "整段底部点状线 + 中性底色",
      markdown: "::: highlight\n强调短句\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        `background-color:${c.bg}`,
        `color:${c.text}`,
        `border-bottom:2px dotted ${c.text}`,
        "padding:10px 0 8px",
        "margin:16px 0"
      ].join(";")
    };
  }
};
function thumb$W(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="18" width="55" height="38" fill="${text}" opacity="0.06"/><text x="14" y="34" font-size="7" font-weight="700" letter-spacing="4" fill="${text}">字 距 强 调</text><rect x="14" y="42" width="44" height="1.5" fill="${text}" opacity="0.35"/><rect x="14" y="49" width="32" height="1.5" fill="${text}" opacity="0.35"/>`
  );
}
const variantDef$e = {
  meta: {
    id: "tracked-emphasis",
    kind: "highlight",
    name: "字距强调",
    description: "整段 letter-spacing 加大 + bold + textMuted，编辑部印刷感",
    designedFor: ["editorial-mook"]
  },
  thumbnail: thumb$W,
  snippets: [
    {
      presetId: "highlight-tracked-emphasis",
      name: "字距强调",
      description: "整段 letter-spacing + bold + textMuted 底色",
      markdown: "::: highlight\n强调短句\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        `background-color:${c.bg}`,
        `color:${c.text}`,
        "letter-spacing:0.12em",
        "font-weight:600",
        `border-left:2px solid ${c.textMuted}`,
        `padding:8px 0 8px 12px`,
        "margin:16px 0"
      ].join(";")
    };
  }
};
function thumb$V(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="18" width="55" height="38" fill="${accent}" opacity="0.12"/><rect x="10" y="18" width="3" height="38" fill="${accent}" opacity="0.7"/><rect x="18" y="28" width="42" height="2" fill="${accent}"/><rect x="18" y="36" width="36" height="2" fill="${text}" opacity="0.5"/><rect x="18" y="44" width="28" height="2" fill="${text}" opacity="0.5"/>`
  );
}
const variantDef$d = {
  meta: {
    id: "vermilion-inline",
    kind: "highlight",
    name: "朱色强调",
    description: "整段朱色文字 + 朱色左侧点线，宋本批注语境",
    designedFor: ["literary-humanism"]
  },
  thumbnail: thumb$V,
  snippets: [
    {
      presetId: "highlight-vermilion-inline",
      name: "朱色强调",
      description: "整段朱字 + 朱色左侧线，宋本批注",
      markdown: "::: highlight\n强调短句\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const vermilion = c.accentClassical ?? c.accent;
    return {
      wrapperCSS: [
        `background-color:${c.bgSoft}`,
        `color:${vermilion}`,
        `border-left:3px dotted ${vermilion}`,
        "padding:8px 0 8px 12px",
        "margin:16px 0",
        "font-weight:500"
      ].join(";")
    };
  }
};
function thumb$U(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="18" width="55" height="38" fill="${accent}" opacity="0.1"/><rect x="18" y="28" width="42" height="2" fill="${text}"/><circle cx="15" cy="29" r="2" fill="${accent}"/><rect x="18" y="36" width="38" height="2" fill="${text}" opacity="0.5"/><circle cx="15" cy="37" r="2" fill="${accent}" opacity="0.6"/><rect x="18" y="44" width="28" height="2" fill="${text}" opacity="0.5"/><circle cx="15" cy="45" r="2" fill="${accent}" opacity="0.6"/>`
  );
}
const variantDef$c = {
  meta: {
    id: "side-dots",
    kind: "highlight",
    name: "字旁着重点",
    description: "整段左侧朱色圆点列（中文着重号传统），宋本批注",
    designedFor: ["literary-humanism"]
  },
  thumbnail: thumb$U,
  snippets: [
    {
      presetId: "highlight-side-dots",
      name: "字旁着重点",
      description: "整段左侧朱色圆点 + 古典底色",
      markdown: "::: highlight\n强调短句\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const vermilion = c.accentClassical ?? c.accent;
    return {
      wrapperCSS: [
        `background-color:${c.bgSoft}`,
        `color:${c.text}`,
        `border-left:4px solid ${vermilion}`,
        "padding:8px 0 8px 14px",
        "margin:16px 0",
        "line-height:2.1"
      ].join(";")
    };
  }
};
function thumb$T(args) {
  const { soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="18" width="55" height="38" fill="${soft}"/><rect x="14" y="28" width="47" height="2" fill="${text}"/><rect x="14" y="36" width="43" height="2" fill="${text}" opacity="0.55"/><rect x="14" y="44" width="34" height="2" fill="${text}" opacity="0.55"/>`
  );
}
const variantDef$b = {
  meta: {
    id: "wash-ground",
    kind: "highlight",
    name: "米黄色块底",
    description: "整段米黄色块底色 + 略大行高，博物笔记观察段",
    designedFor: ["academic-frontier"]
  },
  thumbnail: thumb$T,
  snippets: [
    {
      presetId: "highlight-wash-ground",
      name: "米黄色块底",
      description: "整段米黄底 + 大行高，博物笔记",
      markdown: "::: highlight\n强调短句\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const washBg = c.highlightBg ?? c.bgSoft;
    return {
      wrapperCSS: [
        `background-color:${washBg}`,
        `color:${c.text}`,
        "padding:12px 14px",
        "margin:16px 0",
        "line-height:2",
        "font-size:14.5px"
      ].join(";")
    };
  }
};
function thumb$S(args) {
  const { soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="18" width="55" height="38" fill="${soft}"/><rect x="10" y="18" width="55" height="2" fill="${text}" opacity="0.5"/><rect x="10" y="54" width="55" height="2" fill="${text}" opacity="0.5"/><text x="13" y="33" font-size="9" font-family="monospace" fill="${text}">〔</text><text x="56" y="33" font-size="9" font-family="monospace" fill="${text}">〕</text><rect x="22" y="30" width="30" height="2" fill="${text}"/><rect x="22" y="38" width="26" height="2" fill="${text}" opacity="0.5"/>`
  );
}
const variantDef$a = {
  meta: {
    id: "bracketed-tick",
    kind: "highlight",
    name: "方括号刻度",
    description: "整段上下细线框 + 博物学名 monospace 风，博物笔记",
    designedFor: ["academic-frontier"]
  },
  thumbnail: thumb$S,
  snippets: [
    {
      presetId: "highlight-bracketed-tick",
      name: "方括号刻度",
      description: "整段上下细线框，博物标本标注感",
      markdown: "::: highlight\n强调短句\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const natColor = c.accentNaturalist ?? c.textMuted;
    return {
      wrapperCSS: [
        `background-color:${c.bgSoft}`,
        `color:${c.text}`,
        `border-top:1px solid ${natColor}`,
        `border-bottom:1px solid ${natColor}`,
        "padding:10px 12px",
        "margin:16px 0",
        "font-size:14px"
      ].join(";")
    };
  }
};
function thumb$R(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="18" width="55" height="38" fill="${text}" opacity="0.06"/><rect x="10" y="18" width="4" height="38" fill="${text}"/><rect x="61" y="18" width="4" height="38" fill="${text}"/><rect x="18" y="29" width="39" height="2" fill="${text}"/><rect x="18" y="37" width="34" height="2" fill="${accent}" opacity="0.7"/><rect x="18" y="45" width="24" height="2" fill="${text}" opacity="0.4"/>`
  );
}
const variantDef$9 = {
  meta: {
    id: "geometric-flag",
    kind: "highlight",
    name: "几何旗标",
    description: "整段左右实色方块旗 + 大字距，包豪斯构成感",
    designedFor: ["brutalist"]
  },
  thumbnail: thumb$R,
  snippets: [
    {
      presetId: "highlight-geometric-flag",
      name: "几何旗标",
      description: "整段左右方块旗 + 大字距，包豪斯风",
      markdown: "::: highlight\n强调短句\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        `background-color:${c.bgSoft}`,
        `color:${c.text}`,
        `border-left:5px solid ${c.text}`,
        `border-right:5px solid ${c.text}`,
        "padding:8px 14px",
        "margin:16px 0",
        "letter-spacing:0.15em"
      ].join(";")
    };
  }
};
function thumb$Q(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="18" width="55" height="38" fill="${text}" opacity="0.05"/><rect x="14" y="28" width="47" height="2" fill="${text}"/><rect x="14" y="36" width="42" height="2" fill="${text}" opacity="0.45"/><rect x="14" y="44" width="30" height="2" fill="${text}" opacity="0.45"/><rect x="10" y="56" width="55" height="3" fill="${accent}"/>`
  );
}
const variantDef$8 = {
  meta: {
    id: "single-stroke",
    kind: "highlight",
    name: "单划重笔",
    description: "整段底部 3px accent 实线 + 浅底，包豪斯克制感",
    designedFor: ["swiss-grid"]
  },
  thumbnail: thumb$Q,
  snippets: [
    {
      presetId: "highlight-single-stroke",
      name: "单划重笔",
      description: "整段底部 3px accent 线，包豪斯风",
      markdown: "::: highlight\n强调短句\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        `background-color:${c.bgSoft}`,
        `color:${c.text}`,
        `border-bottom:3px solid ${c.accent}`,
        "padding:10px 0 8px",
        "margin:16px 0",
        "font-weight:500"
      ].join(";")
    };
  }
};
const highlightAll = [
  plain,
  variantDef$f,
  variantDef$e,
  variantDef$d,
  variantDef$c,
  variantDef$b,
  variantDef$a,
  variantDef$9,
  variantDef$8
];
function thumb$P(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="14" width="55" height="1" fill="${text}"/><text x="10" y="28" font-size="10" fill="${accent}" font-family="monospace">[1]</text><rect x="22" y="24" width="38" height="2" fill="#c0c6cf"/><text x="10" y="42" font-size="10" fill="${accent}" font-family="monospace">[2]</text><rect x="22" y="38" width="32" height="2" fill="#c0c6cf"/><text x="10" y="56" font-size="10" fill="${accent}" font-family="monospace">[3]</text><rect x="22" y="52" width="42" height="2" fill="#c0c6cf"/>`
  );
}
const lined = {
  meta: {
    id: "lined",
    kind: "footnotes",
    name: "逐条",
    description: "一条一行 + hanging indent，编号悬挂"
  },
  thumbnail: thumb$P,
  snippets: [
    {
      presetId: "footnotes-lined",
      name: "脚注 · 逐条",
      description: "一行一条 + hanging indent，5~10 条短引用",
      markdown: "::: footnotes\n[1] 数据覆盖 2010–2025。\n[2] 深度理解得分取自 24h 回忆测试。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        "padding-top:6px",
        "padding-left:1.6em",
        "text-indent:-1.6em",
        "line-height:1.5"
      ].join(";"),
      titleCSS: [
        `color:${c.primary}`,
        "font-size:10px",
        "font-weight:700",
        "letter-spacing:0.15em",
        "margin-bottom:6px",
        // 抵消 wrapperCSS 的 padding-left:1.6em，让标题左缘与 [1] [2] 列表项对齐。
        // 不动 wrapper 是因为 hanging indent 必须靠 padding-left + 负 text-indent 实现。
        "text-indent:0",
        "margin-left:-1.6em"
      ].join(";")
    };
  }
};
function thumb$O(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="12" width="62" height="51" rx="2" fill="${soft}"/><rect x="10" y="16" width="55" height="1" fill="${accent}"/><rect x="10" y="24" width="55" height="1.5" fill="#c0c6cf"/><rect x="10" y="30" width="55" height="1.5" fill="#c0c6cf"/><rect x="10" y="36" width="55" height="1.5" fill="#c0c6cf"/><rect x="10" y="42" width="55" height="1.5" fill="#c0c6cf"/><rect x="10" y="48" width="40" height="1.5" fill="#c0c6cf"/>`
  );
}
const inlineFlow = {
  meta: {
    id: "inline-flow",
    kind: "footnotes",
    name: "流式",
    description: "同段流式排列 + 内滚动，长引用列表",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$O,
  snippets: [
    {
      presetId: "footnotes-inline-flow",
      name: "脚注 · 流式",
      description: "同段流式 + 内滚，长文献列表用",
      markdown: "::: footnotes variant=inline-flow 参考文献\n[1] 全国国民阅读调查 2015–2024 · [2] 样本 n=1,432，CI=95% · [3] 详见方法论 §3.2\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        "padding-top:6px",
        "padding-right:4px",
        "line-height:1.6",
        "max-height:320px",
        "overflow-y:auto",
        "-webkit-overflow-scrolling:touch"
      ].join(";"),
      titleCSS: [
        `color:${c.primary}`,
        "font-size:10px",
        "font-weight:700",
        "letter-spacing:0.15em",
        "margin-bottom:6px"
      ].join(";")
    };
  }
};
function thumb$N(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="62" height="48" rx="4" fill="${soft}" stroke="#c0c6cf" stroke-width="0.5"/><rect x="12" y="20" width="16" height="6" rx="1" fill="${accent}"/><text x="14" y="25" font-size="4" fill="#fff" font-weight="700">NOTES</text><rect x="12" y="32" width="48" height="2" fill="#7a8389"/><rect x="12" y="38" width="42" height="2" fill="#7a8389"/><rect x="12" y="46" width="50" height="2" fill="#7a8389"/><rect x="12" y="52" width="36" height="2" fill="#7a8389"/>`
  );
}
const boxedAside = {
  meta: {
    id: "boxed-aside",
    kind: "footnotes",
    name: "随谈卡片",
    description: "软底卡 + pill kicker，narrative aside"
  },
  thumbnail: thumb$N,
  snippets: [
    {
      presetId: "footnotes-boxed-aside",
      name: "脚注 · 随谈卡片",
      description: "卡片化随谈，文学家族的尾注 callout",
      markdown: '::: footnotes 编者随谈 variant=boxed-aside\n[1] 关于"慢"的定义，本刊从未试图给出标准答案。\n[2] 引文出处见上期目录页 §3。\n:::\n'
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const r = ctx.tokens.radius;
    return {
      wrapperCSS: [
        `padding:14px 16px`,
        `border:1px solid ${c.border}`,
        `border-radius:${r.sm}px`,
        `background-color:${c.bgSoft}`,
        `line-height:1.65`,
        `color:${c.text}`
      ].join(";"),
      titleCSS: [
        // pill 徽章：与 lined/inline-flow 的纯文字 kicker 完全异质化
        `display:inline-block`,
        `padding:2px 9px`,
        `margin-bottom:10px`,
        `font-size:10px`,
        `font-weight:700`,
        `letter-spacing:0.15em`,
        `background-color:${c.primary}`,
        `color:${c.textInverse}`,
        `border-radius:${r.sm}px`,
        `text-indent:0`
      ].join(";")
    };
  }
};
function thumb$M(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="20" width="62" height="0.7" fill="#7a8389"/><text x="6" y="29" font-size="5" fill="${accent}" font-weight="700" letter-spacing="0.8">END NOTES</text><rect x="6" y="34" width="60" height="1.4" fill="#9aa1aa"/><rect x="6" y="40" width="56" height="1.4" fill="#9aa1aa"/><rect x="6" y="46" width="62" height="1.4" fill="#9aa1aa"/><rect x="6" y="52" width="48" height="1.4" fill="#9aa1aa"/><rect x="6" y="58" width="58" height="1.4" fill="#9aa1aa"/>`
  );
}
const topRule = {
  meta: {
    id: "top-rule",
    kind: "footnotes",
    name: "报纸尾注",
    description: "顶部 hairline + 11px 灰字密栏，财新风"
  },
  thumbnail: thumb$M,
  snippets: [
    {
      presetId: "footnotes-top-rule",
      name: "脚注 · 报纸尾注",
      description: "顶部 hairline 收束 + 紧凑灰字，内参/财经简报底栏",
      markdown: '::: footnotes END NOTES variant=top-rule\n[1] 数据采集 2023Q4-2024Q3，覆盖一线 + 新一线 32 城。\n[2] "30 岁以下"定义见样本说明 §1.2，含 18-29 岁段。\n:::\n'
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        // 顶部 hairline——本 variant 的唯一硬装饰
        `border-top:1px solid ${c.border}`,
        `padding:12px 0 4px 0`,
        // 报纸密栏字号
        `font-size:11px`,
        `line-height:1.55`,
        `color:${c.textMuted}`
      ].join(";"),
      titleCSS: [
        // 小尾注题：左对齐 + uppercase + wide-letter
        // "参考文献" / "参考来源 · References" 在中文阅读习惯里期望左对齐；
        // 早期 variant 作者写 text-align:right 是局部审美选择，与作者文案不匹配，已移除。
        `display:block`,
        `font-size:10px`,
        `font-weight:700`,
        `letter-spacing:0.22em`,
        `text-transform:uppercase`,
        `color:${c.primary}`,
        `margin:0 0 10px 0`,
        `text-indent:0`
      ].join(";")
    };
  }
};
function thumb$L(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="62" height="2" fill="${accent}"/><text x="6" y="26" font-size="5" fill="${accent}" font-weight="700">REFERENCES</text><text x="6" y="36" font-size="4" fill="#7a8389" font-family="monospace">[1]</text><rect x="13" y="32" width="50" height="1.2" fill="#9aa1aa"/><rect x="13" y="36" width="42" height="1.2" fill="#9aa1aa"/><text x="6" y="46" font-size="4" fill="#7a8389" font-family="monospace">[2]</text><rect x="13" y="42" width="54" height="1.2" fill="#9aa1aa"/><rect x="13" y="46" width="40" height="1.2" fill="#9aa1aa"/><text x="6" y="56" font-size="4" fill="#7a8389" font-family="monospace">[3]</text><rect x="13" y="52" width="46" height="1.2" fill="#9aa1aa"/><rect x="13" y="56" width="38" height="1.2" fill="#9aa1aa"/>`
  );
}
const denseAcademic = {
  meta: {
    id: "dense-academic",
    kind: "footnotes",
    name: "论文 bibliography",
    description: "2px 章节杆 + 2.4em 深 hanging + 11px"
  },
  thumbnail: thumb$L,
  snippets: [
    {
      presetId: "footnotes-dense-academic",
      name: "脚注 · 论文 bibliography",
      description: "2px 章节杆 + 深 hanging + 11px；研究/内参的参考文献章",
      markdown: "::: footnotes REFERENCES variant=dense-academic\n[1] Chen, Y., & Wang, L. (2024). Representation collapse under low temperature. *NeurIPS Proceedings*, 38, 1124-1138.\n[2] He, K., et al. (2020). Momentum contrast for unsupervised visual representation learning. *CVPR*, 9729-9738.\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        // 顶部 2px primary 章节杆——与 top-rule 的 1px hairline 视觉等级不同
        `border-top:2px solid ${c.primary}`,
        `padding:14px 0 4px 2.4em`,
        `text-indent:-2.4em`,
        `font-size:11px`,
        `line-height:1.45`,
        `color:${c.text}`
      ].join(";"),
      titleCSS: [
        `font-size:11px`,
        `font-weight:700`,
        `letter-spacing:0.12em`,
        `text-transform:uppercase`,
        `color:${c.primary}`,
        `margin:0 0 12px 0`,
        `text-indent:0`
      ].join(";")
    };
  }
};
const footnotesAll = [lined, inlineFlow, boxedAside, topRule, denseAcademic];
function thumb$K(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="16" width="32" height="3" fill="${text}"/><rect x="10" y="28" width="6" height="2" fill="${accent}"/><rect x="20" y="28" width="42" height="2" fill="${text}"/><rect x="10" y="38" width="6" height="2" fill="${accent}"/><rect x="20" y="38" width="40" height="2" fill="${text}"/><rect x="10" y="48" width="6" height="2" fill="${accent}"/><rect x="20" y="48" width="36" height="2" fill="${text}"/>`
  );
}
const cardList = {
  meta: {
    id: "card-list",
    kind: "recommend",
    name: "推荐列表",
    description: "粗体标题 + bullet 链接列表"
  },
  thumbnail: thumb$K,
  snippets: [
    {
      presetId: "rec-card-list",
      name: "推荐列表",
      description: "面向读者的延伸阅读：粗体标题 + bullet 链接",
      markdown: "::: recommend 推荐阅读\n- [前作](#)\n- [续篇](#)\n:::\n"
    }
  ],
  render: () => ({
    wrapperCSS: "",
    titleCSS: "font-weight:700;margin-bottom:10px"
  })
};
function thumb$J(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<text x="10" y="22" font-size="6" font-weight="700" letter-spacing="1.5" fill="${text}">SEE ALSO</text><rect x="10" y="30" width="55" height="1" fill="${text}" opacity="0.5"/><rect x="10" y="38" width="50" height="1.5" fill="#a0a8b3"/><rect x="10" y="46" width="46" height="1.5" fill="#a0a8b3"/><rect x="10" y="54" width="42" height="1.5" fill="#a0a8b3"/><rect x="10" y="62" width="38" height="1.5" fill="#a0a8b3"/>`
  );
}
const academicRefs = {
  meta: {
    id: "academic-refs",
    kind: "recommend",
    name: "学术参考",
    description: "uppercase 小字 kicker + textMuted 列表"
  },
  thumbnail: thumb$J,
  snippets: [
    {
      presetId: "rec-academic-refs",
      name: "学术参考",
      description: '面向论证的"参考引用"：克制小字 + uppercase kicker',
      markdown: "::: recommend variant=academic-refs 延伸阅读\n- [相关论文](#)\n- [原始数据](#)\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: "",
      titleCSS: [
        `color:${c.textMuted}`,
        "font-weight:700",
        "font-size:11px",
        "letter-spacing:2px",
        "text-transform:uppercase",
        "margin-bottom:8px"
      ].join(";")
    };
  }
};
const recommendAll = [cardList, academicRefs];
function thumb$I(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="22" y="14" width="32" height="32" fill="${text}"/><rect x="26" y="18" width="8" height="8" fill="#fefefe"/><rect x="42" y="18" width="8" height="8" fill="#fefefe"/><rect x="26" y="34" width="8" height="8" fill="#fefefe"/><rect x="38" y="34" width="4" height="4" fill="#fefefe"/><rect x="16" y="54" width="44" height="2" fill="#a0a8b3"/><rect x="22" y="60" width="32" height="2" fill="#c0c6cf"/>`
  );
}
const bare = {
  meta: {
    id: "bare",
    kind: "qrcode",
    name: "居中 QR",
    description: "居中 QR + 下方 caption（默认）"
  },
  thumbnail: thumb$I,
  snippets: [
    {
      presetId: "qr-bare",
      name: "居中 QR",
      description: "通用扫码块：居中 QR + 说明文案",
      markdown: '::: qrcode text="https://mp.weixin.qq.com/s/xxx"\n扫码关注\n:::\n'
    }
  ],
  // bare 不接管 wrapper / caption layout；qrcode renderer 自己处理。
  render: () => ({ wrapperCSS: "" })
};
function thumb$H(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="14" width="59" height="47" fill="#fefefe" stroke="${text}" stroke-width="1"/><rect x="13" y="20" width="20" height="20" fill="${text}"/><rect x="16" y="23" width="4" height="4" fill="#fefefe"/><rect x="26" y="23" width="4" height="4" fill="#fefefe"/><rect x="16" y="33" width="4" height="4" fill="#fefefe"/><text x="38" y="24" font-size="5" font-weight="700" letter-spacing="0.5" fill="${accent}">SUBSCRIBE</text><rect x="38" y="29" width="24" height="3" fill="${text}"/><rect x="38" y="36" width="22" height="2" fill="#a0a8b3"/>`
  );
}
const followCard = {
  meta: {
    id: "follow-card",
    kind: "qrcode",
    name: "订阅二维码卡",
    description: "左 QR + 右 kicker/标题/说明三行"
  },
  thumbnail: thumb$H,
  snippets: [
    {
      presetId: "qr-follow-card",
      name: "订阅二维码卡",
      description: "刊物收束栏：左 64×64 QR + 右 SUBSCRIBE/标题/说明",
      markdown: '::: qrcode variant=follow-card 慢读简报 desc="每周四，一封邮件，一组数据"\n:::\n'
    }
  ],
  render: () => ({ wrapperCSS: "" })
};
function thumb$G(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    // 上半：居中 QR（32×32）
    `<rect x="22" y="10" width="32" height="32" fill="${text}"/><rect x="26" y="14" width="8" height="8" fill="#fefefe"/><rect x="42" y="14" width="8" height="8" fill="#fefefe"/><rect x="26" y="30" width="8" height="8" fill="#fefefe"/><text x="38" y="50" font-size="5" font-weight="700" letter-spacing="0.5" text-anchor="middle" fill="${accent}">SUBSCRIBE</text><rect x="22" y="54" width="32" height="3" fill="${text}"/><rect x="26" y="60" width="24" height="2" fill="#a0a8b3"/>`
  );
}
const qrStack = {
  meta: {
    id: "qr-stack",
    kind: "qrcode",
    name: "垂直堆叠二维码",
    description: "上 QR + 下 kicker/标题/说明，先视觉锚后说明（Neue Grafik 收尾）"
  },
  thumbnail: thumb$G,
  snippets: [
    {
      presetId: "qr-stack",
      name: "垂直堆叠二维码",
      description: "上 96×96 QR 居中 + 下三行（kicker / title / desc），数据简报收束语序",
      markdown: '::: qrcode variant=qr-stack 慢读简报 desc="每周四，一封邮件，一组数据"\n:::\n'
    }
  ],
  render: () => ({ wrapperCSS: "" })
};
const qrcodeAll = [bare, followCard, qrStack];
function thumb$F(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="14" y="18" width="47" height="3" fill="${text}"/><rect x="20" y="26" width="35" height="2" fill="#a0a8b3"/><rect x="22" y="42" width="31" height="14" rx="7" fill="${accent}"/><text x="37" y="52" text-anchor="middle" font-size="8" font-weight="700" fill="#fff">关注我</text>`
  );
}
const buttonLed = {
  meta: {
    id: "button-led",
    kind: "footerCTA",
    name: "单按钮 CTA",
    description: "居中标题 + 主色胶囊按钮（默认）"
  },
  thumbnail: thumb$F,
  snippets: [
    {
      presetId: "fc-button-led",
      name: "单按钮 CTA",
      description: "居中粗体标题 + 主色胶囊按钮，文末关注卡",
      markdown: "::: footer-cta 觉得有用？ cta=关注我 href=https://mp.weixin.qq.com/s/xxx\n如果这篇对你有启发，欢迎关注。\n:::\n"
    }
  ],
  render: () => ({ wrapperCSS: "" })
};
function thumb$E(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="20" width="63" height="14" fill="none" stroke="${text}" stroke-width="1"/><line x1="27" y1="20" x2="27" y2="34" stroke="${text}" stroke-width="1"/><line x1="48" y1="20" x2="48" y2="34" stroke="${text}" stroke-width="1"/><rect x="27" y="20" width="21" height="14" fill="${accent}"/><text x="17" y="30" text-anchor="middle" font-size="6" fill="${text}">♡ LIKE</text><text x="37" y="30" text-anchor="middle" font-size="6" fill="#fff" font-weight="700">★</text><text x="58" y="30" text-anchor="middle" font-size="6" fill="${text}">↗ FWD</text><rect x="6" y="44" width="63" height="2" fill="#c0c6cf"/><rect x="6" y="52" width="50" height="2" fill="#c0c6cf"/>`
  );
}
const triptychActions = {
  meta: {
    id: "triptych-actions",
    kind: "footerCTA",
    name: "三栏动作 CTA",
    description: "赞同 / 收藏 / 转发三栏（左右描边 + 中实色）"
  },
  thumbnail: thumb$E,
  snippets: [
    {
      presetId: "fc-triptych-actions",
      name: "三栏动作 CTA",
      description: "display:table 三栏：赞同 / 收藏 / 转发，data-brief 家族签名",
      markdown: '::: footer-cta variant=triptych-actions like="♡ 赞同" star="★ 收藏" share="↗ 转发"\n:::\n'
    },
    {
      presetId: "fc-triptych-actions-header",
      name: "三栏 CTA · 顶部 kicker",
      description: "info 触发顶部黑底白字 header bar",
      markdown: '::: footer-cta variant=triptych-actions IF YOU LIKED THIS like="♡ LIKE" star="◎ SEEN" share="→ SHARE"\n:::\n'
    }
  ],
  render: () => ({ wrapperCSS: "" })
};
const footerCTAAll = [buttonLed, triptychActions];
function thumb$D(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<text x="10" y="34" font-size="32" font-weight="700" fill="${accent}">“</text><rect x="22" y="38" width="44" height="2.5" fill="#c0c6cf"/><rect x="22" y="46" width="40" height="2.5" fill="#c0c6cf"/><rect x="22" y="54" width="32" height="2.5" fill="#c0c6cf"/>`
  );
}
const tokenSchema = {
  "quote-color": {
    type: "color",
    label: "引文颜色",
    default: "inherit",
    hint: "默认跟随主题正文色"
  },
  "quote-size": {
    type: "size",
    label: "引文字号",
    default: "19px"
  },
  "byline-color": {
    type: "color",
    label: "副注颜色",
    default: "inherit",
    hint: "默认跟随主题次要文字色"
  },
  "byline-size": {
    type: "size",
    label: "副注字号",
    default: "13px"
  }
};
const giantMark = {
  meta: {
    id: "giant-mark",
    kind: "pullQuote",
    name: "装饰巨号",
    description: "巨号 SVG 引号 + 大字左对齐（人物特稿母本）"
  },
  thumbnail: thumb$D,
  tokenSchema,
  snippets: [
    {
      presetId: "pull-quote-giant-mark",
      name: "拉引 · 装饰巨号",
      description: "巨号 SVG 引号 + 大字左对齐",
      markdown: "::: pull-quote\n我们以为在阅读，其实只是在滑动。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const quoteSvg = `<section style="line-height:0;margin-bottom:4px"><svg width="64" height="48" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 40 C14 22 22 14 32 12 M14 40 L14 50 L26 50 L26 36 L18 36 L18 40 Z"/><path d="M44 40 C44 22 52 14 62 12 M44 40 L44 50 L56 50 L56 36 L48 36 L48 40 Z"/></svg></section>`;
    return {
      wrapperCSS: [
        "margin:28px 0",
        `padding:8px 4px 8px ${ctx.tokens.spacing.containerPadding}px`,
        "text-align:left"
      ].join(";"),
      bodyCSS: "text-align:left",
      quoteCSS: [
        `color:var(--uv-quote-color, ${c.text})`,
        "font-size:var(--uv-quote-size, 19px)",
        "line-height:1.8",
        "font-weight:600",
        "letter-spacing:0.3px",
        "margin-top:0",
        "margin-bottom:0"
      ].join(";"),
      bylineCSS: [
        `color:var(--uv-byline-color, ${c.textMuted})`,
        "font-size:var(--uv-byline-size, 13px)",
        "line-height:1.6",
        "margin-top:10px",
        "text-align:left"
      ].join(";"),
      svgSlot: quoteSvg
    };
  }
};
function thumb$C(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="18" width="59" height="1.5" fill="${accent}"/><rect x="8" y="58" width="59" height="1.5" fill="${accent}"/><rect x="26" y="28" width="22" height="2" fill="${accent}"/><rect x="14" y="38" width="47" height="2.5" fill="#c0c6cf"/><rect x="18" y="46" width="39" height="2.5" fill="#c0c6cf"/>`
  );
}
const KICKER_LABEL = "QUOTE · 引言";
const centeredRule = {
  meta: {
    id: "centered-rule",
    kind: "pullQuote",
    name: "居中夹线",
    description: "上下细线 + 居中 kicker，gallery placard 体"
  },
  thumbnail: thumb$C,
  snippets: [
    {
      presetId: "pull-quote-centered-rule",
      name: "拉引 · 居中夹线",
      description: "上下 1px 线居中夹 + 引言 kicker",
      markdown: "::: pull-quote variant=centered-rule\n真正改变一个人的，往往是最简单的一句话。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const kickerHtml = `<section style="text-align:center;margin-bottom:10px"><span style="display:inline-block;color:${c.textMuted};font-size:11px;font-weight:700;letter-spacing:0.35em;text-transform:uppercase;line-height:1.4">` + escText(KICKER_LABEL) + `</span></section>`;
    return {
      wrapperCSS: [
        "margin:28px 0",
        `border-top:1px solid ${c.primary}`,
        `border-bottom:1px solid ${c.primary}`,
        "padding:24px 12px",
        "text-align:center",
        "border-radius:0",
        "background-color:transparent"
      ].join(";"),
      bodyCSS: "text-align:center",
      quoteCSS: [
        `color:${c.text}`,
        "font-size:17px",
        "line-height:1.7",
        "font-style:italic",
        "letter-spacing:0.5px",
        "text-align:center",
        "font-weight:500",
        "margin-top:0",
        "margin-bottom:0"
      ].join(";"),
      bylineCSS: [
        `color:${c.textMuted}`,
        "font-size:12px",
        "line-height:1.6",
        "margin-top:8px",
        "text-align:center",
        "letter-spacing:0.3px"
      ].join(";"),
      svgSlot: kickerHtml
    };
  }
};
function thumb$B(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="22" width="38" height="2.5" fill="#c0c6cf"/><rect x="8" y="30" width="42" height="2.5" fill="#c0c6cf"/><rect x="8" y="38" width="32" height="2.5" fill="#c0c6cf"/><g transform="rotate(-10 56 50)"><rect x="46" y="40" width="20" height="20" fill="none" stroke="${accent}" stroke-width="2"/><text x="56" y="54" font-size="9" font-weight="700" text-anchor="middle" fill="${accent}">QT</text></g>`
  );
}
const stampQuote = {
  meta: {
    id: "stamp-quote",
    kind: "pullQuote",
    name: "印章压字",
    description: "右上旋转印章 + 大字粗体（brutalist）"
  },
  thumbnail: thumb$B,
  snippets: [
    {
      presetId: "pull-quote-stamp-quote",
      name: "拉引 · 印章压字",
      description: "右上旋转印章 + 粗体大字",
      markdown: "::: pull-quote variant=stamp-quote\n承诺是免费的，兑现才有价钱。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const stamp = `<section style="text-align:right;line-height:0;margin-bottom:6px"><svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linejoin="round" style="display:inline-block;vertical-align:top"><g transform="rotate(-9 26 26)"><rect x="4" y="4" width="44" height="44"/><rect x="9" y="9" width="34" height="34" stroke-width="1"/><text x="26" y="31" font-size="11" font-weight="700" text-anchor="middle" fill="${c.accent}" stroke="none" font-family="monospace">QUOTE</text></g></svg></section>`;
    return {
      wrapperCSS: [
        "margin:28px 0",
        `border-top:2px solid ${c.text}`,
        `border-bottom:2px solid ${c.text}`,
        "padding:14px 4px 18px",
        "background-color:transparent"
      ].join(";"),
      bodyCSS: "text-align:left",
      quoteCSS: [
        `color:${c.text}`,
        "font-size:19px",
        "line-height:1.5",
        "font-weight:700",
        "letter-spacing:0.2px",
        "text-align:left",
        "margin-top:0",
        "margin-bottom:0"
      ].join(";"),
      bylineCSS: [
        `color:${c.textMuted}`,
        "font-size:13px",
        "line-height:1.6",
        "margin-top:10px",
        "font-weight:500",
        "text-align:left"
      ].join(";"),
      svgSlot: stamp
    };
  }
};
function thumb$A(args) {
  const { accent } = mergeThumb(args ?? {});
  return svg(
    `<text x="14" y="56" font-size="9" font-weight="700" fill="${accent}" transform="rotate(-90 14 56)" font-family="monospace" letter-spacing="2">QUOTE</text><rect x="24" y="20" width="42" height="2.5" fill="#c0c6cf"/><rect x="24" y="28" width="44" height="2.5" fill="#c0c6cf"/><rect x="24" y="36" width="38" height="2.5" fill="#c0c6cf"/><rect x="24" y="44" width="32" height="2.5" fill="#c0c6cf"/>`
  );
}
const KICKER_TEXT = "QUOTE";
const marginPull = {
  meta: {
    id: "margin-pull",
    kind: "pullQuote",
    name: "悬挂拉引",
    description: "左侧竖向 monospace kicker + 右大字（NYT Sunday）"
  },
  thumbnail: thumb$A,
  snippets: [
    {
      presetId: "pull-quote-margin-pull",
      name: "拉引 · 悬挂",
      description: "左竖向 QUOTE kicker + 右大字引文",
      markdown: "::: pull-quote variant=margin-pull\n时代变得太快，慢的人反而成了风景。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const verticalKicker = `<svg width="24" height="72" viewBox="0 0 24 72" xmlns="http://www.w3.org/2000/svg"><text x="12" y="64" font-size="11" font-weight="700" fill="${c.accent}" text-anchor="start" transform="rotate(-90 12 64)" font-family="monospace" letter-spacing="3">${escText(KICKER_TEXT)}</text></svg>`;
    const kickerCell = `<section style="display:table-cell;vertical-align:top;width:56px;padding-top:2px">` + verticalKicker + `</section>`;
    return {
      // wrapper 自身就是 2 列 table：svgSlot 是左 cell，bodyCSS 把 __body 设为右 cell。
      // 引文 `<p>` 由 markdown-it 渲染在右 cell 内，quoteCSS 通过 descendant selector 盖样式。
      wrapperCSS: [
        "display:table",
        "width:100%",
        "table-layout:fixed",
        "margin:28px 0",
        "padding:14px 4px 14px 0",
        `border-left:1px solid ${c.border}`,
        "background-color:transparent"
      ].join(";"),
      bodyCSS: [
        "display:table-cell",
        "vertical-align:top",
        "padding-left:4px",
        "text-align:left"
      ].join(";"),
      quoteCSS: [
        `color:${c.text}`,
        "font-size:17px",
        "line-height:1.55",
        "font-weight:600",
        "letter-spacing:0.2px",
        "text-align:left",
        "margin-top:0",
        "margin-bottom:0"
      ].join(";"),
      bylineCSS: [
        `color:${c.textMuted}`,
        "font-size:13px",
        "line-height:1.6",
        "margin-top:8px",
        "text-align:left",
        "letter-spacing:0.2px"
      ].join(";"),
      svgSlot: kickerCell
    };
  }
};
function thumb$z(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="16" width="59" height="1" fill="${text}" opacity="0.4"/><rect x="8" y="58" width="59" height="1" fill="${text}" opacity="0.4"/><rect x="8" y="26" width="59" height="4" fill="${text}" opacity="0.7" font-weight="800"/><rect x="8" y="35" width="50" height="2.5" fill="${text}" opacity="0.25"/><rect x="8" y="44" width="44" height="4" fill="${text}" opacity="0.7"/>`
  );
}
const variantDef$7 = {
  meta: {
    id: "weight-contrast",
    kind: "pullQuote",
    name: "字重对比",
    description: "100/400 字重对比 + 上下 hairline（编辑部 v1）",
    designedFor: ["people-story"]
  },
  thumbnail: thumb$z,
  snippets: [
    {
      presetId: "pull-quote-weight-contrast",
      name: "字重对比",
      description: "100/400 字重对比 + 上下 hairline",
      markdown: "::: pull-quote variant=weight-contrast\n我们活在一个越来越快，却越来越慢的时代。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        "margin:28px 0",
        `border-top:1px solid ${c.text}`,
        `border-bottom:1px solid ${c.text}`,
        "padding:18px 0",
        "text-align:center",
        "background-color:transparent"
      ].join(";"),
      bodyCSS: "text-align:center",
      quoteCSS: [
        `color:${c.text}`,
        "font-size:22px",
        "line-height:1.55",
        "font-weight:600",
        "letter-spacing:0.01em",
        "text-align:center",
        "margin-top:0",
        "margin-bottom:0",
        `font-family:'Noto Serif SC',serif`
      ].join(";"),
      bylineCSS: [
        `color:${c.textMuted}`,
        "font-size:12px",
        "line-height:1.6",
        "margin-top:10px",
        "text-align:center",
        "letter-spacing:0.3px"
      ].join(";")
    };
  }
};
function thumb$y(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<text x="8" y="56" font-size="44" font-weight="400" fill="${text}" opacity="0.8" font-family="serif">凡</text><rect x="28" y="20" width="40" height="2.5" fill="${text}" opacity="0.35"/><rect x="28" y="28" width="42" height="2.5" fill="${text}" opacity="0.35"/><rect x="28" y="36" width="36" height="2.5" fill="${text}" opacity="0.35"/><rect x="28" y="44" width="30" height="2.5" fill="${text}" opacity="0.35"/>`
  );
}
const variantDef$6 = {
  meta: {
    id: "drop-capital",
    kind: "pullQuote",
    name: "首字下沉",
    description: "drop capital + 段右 Cormorant italic（编辑部 v2）",
    designedFor: ["people-story"]
  },
  thumbnail: thumb$y,
  snippets: [
    {
      presetId: "pull-quote-drop-capital",
      name: "首字下沉",
      description: "段首大号衬线 capital + Lora 衬线拉引",
      markdown: "::: pull-quote variant=drop-capital\n凡人生大半的烦恼，都来自把别人的剧本当成自己的人生。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const dropCapSlot = `<section style="line-height:0.85;margin:0 0 6px;text-align:left"><span style="font-family:'Lora','Noto Serif SC',serif;font-size:64px;font-weight:400;color:${c.text};display:inline-block">凡</span></section>`;
    return {
      wrapperCSS: [
        "margin:28px 0",
        `background:${c.bg}`,
        "padding:14px 0"
      ].join(";"),
      bodyCSS: "text-align:left",
      quoteCSS: [
        `color:${c.text}`,
        "font-size:20px",
        "line-height:1.6",
        "font-weight:500",
        "letter-spacing:0.02em",
        "text-align:left",
        "margin-top:0",
        "margin-bottom:0",
        `font-family:'Noto Serif SC',serif`
      ].join(";"),
      bylineCSS: [
        `color:${c.textMuted}`,
        "font-size:12px",
        "line-height:1.6",
        "margin-top:10px",
        "text-align:left",
        "letter-spacing:0.3px"
      ].join(";"),
      svgSlot: dropCapSlot
    };
  }
};
function thumb$x(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="62" width="59" height="1.5" fill="${accent}" opacity="0.6"/><path d="M10 20 Q14 10 18 18" stroke="${accent}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M14 14 L22 30" stroke="${accent}" stroke-width="1.5" fill="none" stroke-linecap="round"/><rect x="20" y="18" width="46" height="3" fill="${text}" opacity="0.7"/><rect x="20" y="28" width="42" height="3" fill="${text}" opacity="0.7"/><rect x="20" y="38" width="38" height="2.5" fill="${text}" opacity="0.5"/><rect x="20" y="47" width="34" height="2.5" fill="${text}" opacity="0.5"/>`
  );
}
const variantDef$5 = {
  meta: {
    id: "calligraphic",
    kind: "pullQuote",
    name: "楷草装饰",
    description: "Cormorant italic 大字 + 朱色撇捺装饰（宋本 v1）",
    designedFor: ["literary-humanism"]
  },
  thumbnail: thumb$x,
  snippets: [
    {
      presetId: "pull-quote-calligraphic",
      name: "楷草装饰",
      description: "Cormorant italic 大字 + 朱色撇捺 SVG",
      markdown: "::: pull-quote variant=calligraphic\n行 到 水 穷 处\n坐 看 云 起 时\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const accentClassical = c.accentClassical ?? c.accent;
    const brushSlot = `<section style="line-height:0;margin-bottom:6px"><svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${accentClassical}" stroke-width="2" stroke-linecap="round"><path d="M6 6 Q10 4 16 20"/><path d="M18 6 Q14 4 8 20"/></svg></section>`;
    return {
      wrapperCSS: [
        "margin:28px 0",
        `background:${c.bg}`,
        "padding:14px 0",
        "text-align:left"
      ].join(";"),
      bodyCSS: "text-align:left",
      quoteCSS: [
        `color:${c.text}`,
        "font-size:28px",
        "line-height:1.5",
        "font-weight:500",
        "letter-spacing:0.06em",
        "text-align:left",
        "margin-top:0",
        "margin-bottom:0",
        `font-family:'Noto Serif SC',serif`
      ].join(";"),
      bylineCSS: [
        `color:${c.textCaption ?? c.textMuted}`,
        "font-size:12px",
        "line-height:1.6",
        "margin-top:12px",
        "text-align:left",
        "letter-spacing:0.3em"
      ].join(";"),
      svgSlot: brushSlot
    };
  }
};
function thumb$w(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="14" width="59" height="1" fill="${accent}" opacity="0.7"/><rect x="8" y="60" width="59" height="1" fill="${accent}" opacity="0.7"/><rect x="8" y="24" width="44" height="3" fill="${text}" opacity="0.7"/><rect x="8" y="33" width="40" height="3" fill="${text}" opacity="0.7"/><rect x="55" y="22" width="10" height="2" fill="${accent}" opacity="0.6"/><rect x="55" y="30" width="10" height="2" fill="${accent}" opacity="0.6"/><rect x="55" y="38" width="10" height="2" fill="${accent}" opacity="0.6"/><rect x="55" y="46" width="10" height="2" fill="${accent}" opacity="0.4"/>`
  );
}
const variantDef$4 = {
  meta: {
    id: "with-gloss",
    kind: "pullQuote",
    name: "夹注式拉引",
    description: "双行夹注 + 上下朱色细线（宋本 v2）",
    designedFor: ["literary-humanism"]
  },
  thumbnail: thumb$w,
  snippets: [
    {
      presetId: "pull-quote-with-gloss",
      name: "夹注式拉引",
      description: "大字拉引 + 右侧竖排夹注 + 朱色细线",
      markdown: "::: pull-quote variant=with-gloss\n花 未 全 开\n月 未 圆\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const accentClassical = c.accentClassical ?? c.accent;
    const glossSlot = `<section style="display:table;width:100%;margin-bottom:0"><section style="display:table-cell;vertical-align:top"></section><section style="display:table-cell;vertical-align:top;width:22px;padding-top:4px;writing-mode:vertical-rl;font-size:10px;line-height:1.7;color:${accentClassical};letter-spacing:0.12em">曾国藩家书有此句言事不可过盛</section></section>`;
    return {
      wrapperCSS: [
        "margin:28px 0",
        `border-top:1px solid ${accentClassical}`,
        `border-bottom:1px solid ${accentClassical}`,
        "padding:16px 0",
        `background:${c.bg}`
      ].join(";"),
      bodyCSS: [
        "display:table-cell",
        "vertical-align:top",
        "text-align:left"
      ].join(";"),
      quoteCSS: [
        `color:${c.text}`,
        "font-size:28px",
        "line-height:1.4",
        "font-weight:500",
        "letter-spacing:0.04em",
        "text-align:left",
        "margin-top:0",
        "margin-bottom:0",
        `font-family:'Noto Serif SC',serif`
      ].join(";"),
      bylineCSS: [
        `color:${c.textMuted}`,
        "font-size:12px",
        "line-height:1.6",
        "margin-top:10px",
        "text-align:left",
        "letter-spacing:0.2em"
      ].join(";"),
      svgSlot: glossSlot
    };
  }
};
function thumb$v(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="16" width="44" height="2" fill="${accent}" opacity="0.5"/><rect x="8" y="24" width="52" height="2" fill="${accent}" opacity="0.5"/><rect x="8" y="35" width="59" height="1" fill="${text}" opacity="0.25"/><rect x="8" y="43" width="52" height="3.5" fill="${text}" opacity="0.7"/><rect x="8" y="53" width="48" height="3.5" fill="${text}" opacity="0.7"/>`
  );
}
const variantDef$3 = {
  meta: {
    id: "bilingual-stack",
    kind: "pullQuote",
    name: "双语堆叠",
    description: "中英双语堆叠：上拉丁 italic + 下中文大字（博物 v1）",
    designedFor: ["academic-frontier"]
  },
  thumbnail: thumb$v,
  snippets: [
    {
      presetId: "pull-quote-bilingual-stack",
      name: "双语堆叠",
      description: "上 Lora italic 英文 + 下中文大字 + mono 分隔",
      markdown: "::: pull-quote variant=bilingual-stack\n荒野之中，\n蕴藏世界。\n:::\nIn wildness is the preservation of the world.\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const accentNaturalist = c.accentNaturalist ?? c.accent;
    const latinSlot = `<section style="font-family:'Lora',serif;font-style:italic;font-size:13px;color:${accentNaturalist};letter-spacing:0.04em;line-height:1.5;margin-bottom:8px">In wildness is the preservation of the world.</section>`;
    return {
      wrapperCSS: [
        "margin:28px 0",
        `background:${c.bg}`,
        "padding:14px 0",
        "text-align:left"
      ].join(";"),
      bodyCSS: "text-align:left",
      quoteCSS: [
        `color:${c.text}`,
        "font-size:26px",
        "line-height:1.45",
        "font-weight:500",
        "letter-spacing:0.02em",
        "text-align:left",
        "margin-top:0",
        "margin-bottom:0",
        `font-family:'Noto Serif SC',serif`
      ].join(";"),
      bylineCSS: [
        `color:${c.textMuted}`,
        `border-top:1px solid ${c.text}`,
        "padding-top:8px",
        "margin-top:10px",
        "font-size:10px",
        "line-height:1.6",
        "letter-spacing:0.16em",
        `font-family:'IBM Plex Mono',monospace`,
        "text-align:left",
        "display:block"
      ].join(";"),
      svgSlot: latinSlot
    };
  }
};
function thumb$u(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="10" y="10" width="8" height="1.5" fill="${accent}" opacity="0.7"/><rect x="13.5" y="10" width="1.5" height="55" fill="${accent}" opacity="0.7"/><rect x="10" y="63.5" width="8" height="1.5" fill="${accent}" opacity="0.7"/><rect x="57" y="10" width="8" height="1.5" fill="${accent}" opacity="0.7"/><rect x="60.5" y="10" width="1.5" height="55" fill="${accent}" opacity="0.7"/><rect x="57" y="63.5" width="8" height="1.5" fill="${accent}" opacity="0.7"/><rect x="22" y="24" width="31" height="3" fill="${text}" opacity="0.7"/><rect x="22" y="33" width="31" height="3" fill="${text}" opacity="0.7"/><rect x="22" y="44" width="24" height="2" fill="${text}" opacity="0.4"/>`
  );
}
const variantDef$2 = {
  meta: {
    id: "caliper-mark",
    kind: "pullQuote",
    name: "卡尺拉引",
    description: "左右测量卡尺刻度 + 居中拉引（博物 v2）",
    designedFor: ["academic-frontier"]
  },
  thumbnail: thumb$u,
  snippets: [
    {
      presetId: "pull-quote-caliper-mark",
      name: "卡尺拉引",
      description: "左侧卡尺 SVG 竖线 + 引文 + mono attribution",
      markdown: "::: pull-quote variant=caliper-mark\n山是凝固的水，\n水是流动的山。\n:::\nFIELD JOURNAL, FOL.211\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const accentNaturalist = c.accentNaturalist ?? c.accent;
    const caliperCell = `<section style="display:table-cell;vertical-align:top;width:22px;padding-top:4px;padding-right:10px"><svg width="14" height="72" viewBox="0 0 14 72" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="14" height="1.5" fill="${accentNaturalist}"/><rect x="6.5" y="0" width="1" height="72" fill="${accentNaturalist}"/><rect x="0" y="70.5" width="14" height="1.5" fill="${accentNaturalist}"/></svg></section>`;
    return {
      wrapperCSS: [
        "display:table",
        "width:100%",
        "table-layout:fixed",
        "margin:28px 0",
        `background:${c.bg}`,
        "padding:14px 0"
      ].join(";"),
      bodyCSS: [
        "display:table-cell",
        "vertical-align:top",
        "text-align:left"
      ].join(";"),
      quoteCSS: [
        `color:${c.text}`,
        "font-size:24px",
        "line-height:1.5",
        "font-weight:500",
        "letter-spacing:0.02em",
        "text-align:left",
        "margin-top:0",
        "margin-bottom:0",
        `font-family:'Noto Serif SC',serif`
      ].join(";"),
      bylineCSS: [
        `color:${c.textMuted}`,
        `font-family:'IBM Plex Mono',monospace`,
        "font-size:10px",
        "line-height:1.6",
        "margin-top:8px",
        "letter-spacing:0.18em",
        "text-align:left"
      ].join(";"),
      bylinePrefix: "— ",
      svgSlot: caliperCell
    };
  }
};
function thumb$t(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="0" y="0" width="75" height="75" fill="${text}" opacity="0.85"/><rect x="8" y="12" width="28" height="2" fill="#ffffff" opacity="0.35"/><rect x="8" y="28" width="59" height="3.5" fill="#ffffff" opacity="0.8"/><rect x="8" y="38" width="52" height="3.5" fill="#ffffff" opacity="0.8"/><rect x="8" y="50" width="44" height="2.5" fill="#ffffff" opacity="0.45"/>`
  );
}
const variantDef$1 = {
  meta: {
    id: "inverted-plate",
    kind: "pullQuote",
    name: "反色板块",
    description: "反色板块 #111 底白字 + 大号 sans 拉引（包豪斯 v1）",
    designedFor: ["brutalist"]
  },
  thumbnail: thumb$t,
  snippets: [
    {
      presetId: "pull-quote-inverted-plate",
      name: "反色板块",
      description: "深底白字 + mono kicker + 大字 sans 引文",
      markdown: "::: pull-quote variant=inverted-plate\n形式追随功能，\n而功能追随真诚。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const bgColor = c.text;
    const fgColor = c.textInverse;
    const mutedColor = c.textMuted;
    const kickerSlot = `<section style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:${mutedColor};letter-spacing:0.24em;margin-bottom:10px;text-transform:uppercase">PULL · 06</section>`;
    return {
      wrapperCSS: [
        "margin:28px 0",
        `background:${bgColor}`,
        "padding:22px 18px",
        "border-radius:0"
      ].join(";"),
      bodyCSS: "text-align:left",
      quoteCSS: [
        `color:${fgColor}`,
        "font-size:24px",
        "line-height:1.45",
        "font-weight:500",
        "letter-spacing:0.01em",
        "text-align:left",
        "margin-top:0",
        "margin-bottom:0",
        `font-family:'Noto Serif SC',serif`
      ].join(";"),
      bylineCSS: [
        `color:${mutedColor}`,
        "font-size:11px",
        "line-height:1.6",
        "margin-top:12px",
        "text-align:right",
        "letter-spacing:0.2em",
        `font-family:'IBM Plex Mono',monospace`
      ].join(";"),
      svgSlot: kickerSlot
    };
  }
};
function thumb$s(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="8" width="22" height="5" fill="${accent}"/><rect x="8" y="19" width="20" height="20" fill="none" stroke="${text}" stroke-width="1" opacity="0.5"/><rect x="9" y="20" width="18" height="18" fill="${text}" opacity="0.06"/><text x="18" y="33" font-size="9" text-anchor="middle" fill="${text}" opacity="0.7" font-weight="600">少</text><rect x="33" y="19" width="34" height="3.5" fill="${text}" opacity="0.7"/><rect x="33" y="28" width="34" height="3.5" fill="${text}" opacity="0.7"/><rect x="33" y="39" width="26" height="2.5" fill="${text}" opacity="0.4"/>`
  );
}
const variantDef = {
  meta: {
    id: "grid-block",
    kind: "pullQuote",
    name: "网格拉引",
    description: "左编号方格 + 右大字 sans + 顶 accent 条（包豪斯 v2）",
    designedFor: ["brutalist"]
  },
  thumbnail: thumb$s,
  snippets: [
    {
      presetId: "pull-quote-grid-block",
      name: "网格拉引",
      description: "顶 accent 短条 + 左方格 + 右大字 sans",
      markdown: "::: pull-quote variant=grid-block\n少即多\n:::\nL. MIES VAN DER ROHE\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const accentBar2 = `<section style="height:5px;background:${c.accent};width:22px;margin-bottom:12px"></section>`;
    const numberCell = `<section style="display:table-cell;vertical-align:top;width:48px;padding-right:12px;padding-top:2px"><section style="width:40px;height:40px;border:1px solid ${c.text};display:flex;align-items:center;justify-content:center;font-size:22px;color:${c.text};font-weight:500;font-family:'Noto Serif SC',serif">少</section></section>`;
    const layoutSlot = accentBar2 + `<section style="display:table;width:100%;table-layout:fixed">` + numberCell;
    return {
      wrapperCSS: [
        "margin:28px 0",
        `background:${c.bg}`,
        "padding:14px 0 14px 0",
        "text-align:left"
      ].join(";"),
      bodyCSS: [
        "display:table-cell",
        "vertical-align:top",
        "text-align:left"
      ].join(";"),
      quoteCSS: [
        `color:${c.text}`,
        "font-size:26px",
        "line-height:1.4",
        "font-weight:500",
        "letter-spacing:0.01em",
        "text-align:left",
        "margin-top:0",
        "margin-bottom:0",
        `font-family:'Noto Serif SC',serif`
      ].join(";"),
      bylineCSS: [
        `color:${c.textMuted}`,
        `font-family:'IBM Plex Mono',monospace`,
        "font-size:10px",
        "line-height:1.6",
        "margin-top:8px",
        "letter-spacing:0.22em",
        "text-align:right"
      ].join(";"),
      bylinePrefix: "— ",
      svgSlot: layoutSlot
    };
  }
};
const pullQuoteAll = [
  giantMark,
  centeredRule,
  stampQuote,
  marginPull,
  variantDef$7,
  variantDef$6,
  variantDef$5,
  variantDef$4,
  variantDef$3,
  variantDef$2,
  variantDef$1,
  variantDef
];
function toneToStatusKey(tone) {
  if (tone === "primary") return "info";
  if (tone === "accent") return "tip";
  return "danger";
}
function thumb$r(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="4" fill="${soft}"/><rect x="6" y="14" width="4" height="47" fill="${accent}"/><rect x="16" y="22" width="34" height="3" fill="${accent}"/><rect x="16" y="32" width="46" height="2" fill="#c0c6cf"/><rect x="16" y="39" width="42" height="2" fill="#c0c6cf"/><rect x="16" y="46" width="38" height="2" fill="#c0c6cf"/>`
  );
}
const dangerBar = {
  meta: {
    id: "danger-bar",
    kind: "announcement",
    name: "左条警示",
    description: "tone 主色左条 + soft 底（强警示横幅默认）"
  },
  thumbnail: thumb$r,
  snippets: [
    {
      presetId: "announcement-danger-bar",
      name: "公告 · 左条警示",
      description: "左色条 + soft 底，文章级强警示",
      markdown: "::: announcement 重要通告 variant=danger-bar tone=danger\n本文涉及高风险操作，执行前请通读全文并备份。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const status = c.status[toneToStatusKey(ctx.attrs.tone)];
    const padX = ctx.tokens.spacing.containerPadding;
    return {
      wrapperCSS: [
        `background-color:${status.soft}`,
        `border-left:4px solid ${status.accent}`,
        "border-radius:6px",
        `padding:14px ${padX}px`,
        "margin:20px 0"
      ].join(";"),
      titleCSS: [
        `color:${status.accent}`,
        "font-weight:700",
        "font-size:15px",
        "letter-spacing:0.5px",
        "margin-bottom:6px"
      ].join(";"),
      bodyCSS: [
        `color:${c.text}`,
        "font-size:14px",
        "line-height:1.7"
      ].join(";")
    };
  }
};
function thumb$q(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="none" stroke="${accent}" stroke-width="1"/><rect x="12" y="22" width="20" height="2" fill="${text}"/><rect x="12" y="28" width="51" height="1" fill="${accent}" opacity="0.5"/><rect x="12" y="34" width="48" height="2" fill="#c0c6cf"/><rect x="12" y="41" width="44" height="2" fill="#c0c6cf"/><rect x="12" y="48" width="40" height="2" fill="#c0c6cf"/>`
  );
}
const monoDisclaimer = {
  meta: {
    id: "mono-disclaimer",
    kind: "announcement",
    name: "免责声明",
    description: "全边框无填充 + uppercase 宽字距标题（法律气质）"
  },
  thumbnail: thumb$q,
  snippets: [
    {
      presetId: "announcement-mono-disclaimer",
      name: "公告 · 免责声明",
      description: "法律 / 用户协议 / 财报披露的免责段",
      markdown: "::: announcement DISCLAIMER variant=mono-disclaimer tone=danger\n本文不构成投资建议；过往表现不代表未来收益，决策请咨询持牌顾问。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const status = c.status[toneToStatusKey(ctx.attrs.tone)];
    const padX = ctx.tokens.spacing.containerPadding;
    return {
      wrapperCSS: [
        "background-color:transparent",
        `border:1px solid ${status.accent}`,
        `padding:${Math.max(10, padX - 4)}px ${padX}px`,
        "margin:18px 0",
        "border-radius:0"
      ].join(";"),
      titleCSS: [
        `color:${c.textMuted}`,
        "font-size:11px",
        "font-weight:700",
        "letter-spacing:0.18em",
        "text-transform:uppercase",
        `border-bottom:1px solid ${c.border}`,
        "padding-bottom:6px",
        "margin-bottom:8px"
      ].join(";"),
      bodyCSS: [
        `color:${c.text}`,
        "font-size:13px",
        "line-height:1.7"
      ].join(";")
    };
  }
};
const DEFAULT_NOTICE = "本文部分内容由 AI 生成";
function thumb$p(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="22" width="63" height="32" rx="8" fill="${soft}" stroke="${accent}" stroke-width="1.5"/><rect x="14" y="30" width="14" height="14" rx="2" fill="none" stroke="${accent}" stroke-width="1.2"/><rect x="18" y="34" width="3" height="3" fill="${accent}"/><rect x="22" y="34" width="3" height="3" fill="${accent}"/><rect x="18" y="38" width="3" height="3" fill="${accent}"/><rect x="22" y="38" width="3" height="3" fill="${accent}"/><rect x="34" y="34" width="28" height="2" fill="${text}"/><rect x="34" y="40" width="24" height="1.5" fill="#c0c6cf"/><rect x="34" y="45" width="20" height="1.5" fill="#c0c6cf"/>`
  );
}
const aiNotice = {
  meta: {
    id: "ai-notice",
    kind: "announcement",
    name: "AI 合规告知",
    description: "pill 形态 + 芯片图标 + 灰字告知（AI 内容披露）"
  },
  thumbnail: thumb$p,
  snippets: [
    {
      presetId: "announcement-ai-notice",
      name: "公告 · AI 告知",
      description: "AI 内容合规告知，pill + 芯片图标",
      markdown: "::: announcement variant=ai-notice tone=primary\n本文图示由模型辅助生成，文字由编辑审校；如发现事实错误请反馈。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const status = c.status[toneToStatusKey(ctx.attrs.tone)];
    const padX = ctx.tokens.spacing.containerPadding;
    const title = ctx.info.trim() || DEFAULT_NOTICE;
    const chip = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${status.accent}" stroke-width="1.5" stroke-linecap="round"><rect x="5" y="5" width="14" height="14" rx="2" fill="${c.bgMuted}"/><rect x="8.5" y="8.5" width="3" height="3" fill="${status.accent}" stroke="none"/><rect x="12.5" y="8.5" width="3" height="3" fill="${status.accent}" stroke="none"/><rect x="8.5" y="12.5" width="3" height="3" fill="${status.accent}" stroke="none"/><rect x="12.5" y="12.5" width="3" height="3" fill="${status.accent}" stroke="none"/><path d="M9 5 V2 M15 5 V2 M9 22 V19 M15 22 V19 M5 9 H2 M5 15 H2 M22 9 H19 M22 15 H19"/></svg>`;
    const iconCell = `<span style="display:table-cell;vertical-align:middle;width:32px;padding-right:10px">${chip}</span>`;
    const titleCSS = `font-weight:700;font-size:13px;color:${c.textMuted};letter-spacing:0.3px;line-height:1.4`;
    const titleRow = `<span style="display:table-cell;vertical-align:middle"><section style="${titleCSS}">${escText(title)}</section></span>`;
    const slot = `<section style="display:table;width:100%">${iconCell}${titleRow}</section>`;
    return {
      wrapperCSS: [
        `background-color:${c.bgMuted}`,
        `border:1.5px solid ${status.accent}`,
        "border-radius:12px",
        `padding:10px ${padX}px`,
        "margin:18px 0"
      ].join(";"),
      titleCSS: "",
      bodyCSS: [
        `color:${c.textMuted}`,
        "font-size:12px",
        "line-height:1.6",
        "margin-top:6px"
      ].join(";"),
      svgSlot: slot
    };
  }
};
const STAMP_TEXT_BY_TONE = {
  danger: "通告",
  primary: "公告",
  accent: "启事"
};
function thumb$o(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/><rect x="6" y="14" width="63" height="3" fill="${accent}"/><rect x="12" y="24" width="28" height="3" fill="${accent}"/><rect x="12" y="33" width="34" height="2" fill="#c0c6cf"/><rect x="12" y="40" width="30" height="2" fill="#c0c6cf"/><rect x="12" y="47" width="26" height="2" fill="#c0c6cf"/><circle cx="56" cy="42" r="10" fill="none" stroke="${accent}" stroke-width="1.5"/><text x="56" y="45" text-anchor="middle" font-size="7" fill="${accent}" font-weight="700">通告</text>`
  );
}
const stampedBanner = {
  meta: {
    id: "stamped-banner",
    kind: "announcement",
    name: "盖章公告",
    description: "顶色条 + 右侧 SVG 印章戳（官方威权感）"
  },
  thumbnail: thumb$o,
  snippets: [
    {
      presetId: "announcement-stamped-banner",
      name: "公告 · 盖章",
      description: "右侧印章戳 + 顶色条，最重的官方告示",
      markdown: "::: announcement 重要通告 variant=stamped-banner tone=danger\n本站将于本周日凌晨 02:00–04:00 进行设备搬迁，期间服务不可用，敬请见谅。\n:::\n"
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const status = c.status[toneToStatusKey(ctx.attrs.tone)];
    const padX = ctx.tokens.spacing.containerPadding;
    const stampText = STAMP_TEXT_BY_TONE[ctx.attrs.tone ?? "danger"] ?? "通告";
    const title = ctx.info.trim();
    const stampSvg = `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="28" fill="none" stroke="${status.accent}" stroke-width="2"/><circle cx="32" cy="32" r="22" fill="none" stroke="${status.accent}" stroke-width="0.8" opacity="0.6"/><text x="32" y="39" text-anchor="middle" font-size="17" font-weight="700" fill="${status.accent}" letter-spacing="2">${stampText}</text></svg>`;
    const titleCSS = `font-weight:700;font-size:16px;color:${status.accent};margin-bottom:6px;line-height:1.4`;
    const bodyCSS = `font-size:14px;line-height:1.7;color:${c.text}`;
    const titleRow = title ? `<section style="${titleCSS}">${escText(title)}</section>` : "";
    const slot = title ? `<section style="display:table;width:100%;table-layout:fixed;margin-bottom:8px"><span style="display:table-cell;vertical-align:middle;width:78%">${titleRow}</span><span style="display:table-cell;vertical-align:middle;width:22%;text-align:right;line-height:0">${stampSvg}</span></section>` : `<section style="text-align:center;line-height:0;margin-bottom:8px">${stampSvg}</section>`;
    return {
      wrapperCSS: [
        `background-color:${status.soft}`,
        `border-top:3px solid ${status.accent}`,
        `padding:14px ${padX}px`,
        "margin:20px 0",
        "border-radius:0 0 4px 4px"
      ].join(";"),
      titleCSS: "",
      bodyCSS,
      svgSlot: slot
    };
  }
};
const announcementAll = [dangerBar, monoDisclaimer, aiNotice, stampedBanner];
function thumb$n(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="#fff" stroke="${text}"/><rect x="6" y="14" width="63" height="12" fill="${soft}"/><path d="M27 14V61M48 14V61M6 26H69M6 43H69" stroke="${text}"/><rect x="10" y="18" width="14" height="3" fill="${accent}"/><rect x="31" y="18" width="13" height="3" fill="${accent}"/><rect x="52" y="18" width="13" height="3" fill="${accent}"/>`
  );
}
const ruleGrid = {
  meta: {
    id: "rule-grid",
    kind: "tableCard",
    name: "网格表",
    description: "全 1px 边框，规格清单 / 数据表骨架"
  },
  thumbnail: thumb$n,
  snippets: [
    {
      presetId: "table-card-rule-grid",
      name: "表格 · 网格",
      description: "全网格 1px 边框，header bgMuted 加粗",
      markdown: ':::: table-card 规格对比 variant=rule-grid\n::: table-row header=true cells="型号 | 容量 | 价格"\n:::\n::: table-row cells="A | 256G | ￥6999"\n:::\n::: table-row cells="B | 512G | ￥8999"\n:::\n::::\n'
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        `border:1px solid ${c.border}`,
        "border-radius:4px",
        "overflow:hidden",
        "margin:18px 0"
      ].join(";")
    };
  }
};
function thumb$m(args) {
  const { soft, text } = mergeThumb(args ?? {});
  return svg(
    `<path d="M6 14H69M6 62H69M6 24H69" stroke="${text}"/><rect x="6" y="24" width="63" height="9" fill="${soft}"/><rect x="6" y="43" width="63" height="9" fill="${soft}"/><g fill="${text}"><rect x="10" y="17" width="14" height="2"/><rect x="33" y="17" width="14" height="2"/><rect x="56" y="17" width="8" height="2"/><rect x="10" y="28" width="20" height="2"/><rect x="10" y="38" width="20" height="2"/><rect x="10" y="47" width="20" height="2"/><rect x="10" y="57" width="20" height="2"/></g>`
  );
}
const zebraRows = {
  meta: {
    id: "zebra-rows",
    kind: "tableCard",
    name: "斑马表",
    description: "奇偶行底色 + 顶底 hairline，无垂直边框"
  },
  thumbnail: thumb$m,
  snippets: [
    {
      presetId: "table-card-zebra-rows",
      name: "表格 · 斑马",
      description: "奇偶行底色，电子表格风",
      markdown: ':::: table-card 销量统计 variant=zebra-rows\n::: table-row header=true cells="月份 | 销量 | 同比"\n:::\n::: table-row cells="1 月 | 1240 | +12%"\n:::\n::: table-row cells="2 月 | 980 | -8%"\n:::\n::: table-row cells="3 月 | 1520 | +24%"\n:::\n::::\n'
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        `border-top:1px solid ${c.text}`,
        `border-bottom:1px solid ${c.text}`,
        "margin:18px 0"
      ].join(";")
    };
  }
};
function thumb$l(args) {
  const { soft, text, accent } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="22" height="47" fill="${soft}"/><path d="M6 24H69M6 34H69M6 44H69M6 54H69" stroke="${text}"/><g fill="${text}"><rect x="14" y="18" width="11" height="2"/><rect x="14" y="28" width="11" height="2"/><rect x="14" y="38" width="11" height="2"/><rect x="14" y="48" width="11" height="2"/></g><g fill="${accent}"><rect x="32" y="18" width="22" height="2"/><rect x="32" y="28" width="28" height="2"/><rect x="32" y="38" width="18" height="2"/><rect x="32" y="48" width="24" height="2"/></g>`
  );
}
const keyValue = {
  meta: {
    id: "key-value",
    kind: "tableCard",
    name: "规格表",
    description: "双栏 key-value，spec sheet 风"
  },
  thumbnail: thumb$l,
  snippets: [
    {
      presetId: "table-card-key-value",
      name: "表格 · 规格",
      description: "左 key 右 value，行间 hairline",
      markdown: ':::: table-card 产品规格 variant=key-value\n::: table-row cells="处理器 | M4 Pro 12 核"\n:::\n::: table-row cells="内存 | 24GB 统一内存"\n:::\n::: table-row cells="存储 | 512GB SSD"\n:::\n::: table-row cells="售价 | ￥14999"\n:::\n::::\n'
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        `border-top:1px solid ${c.border}`,
        "margin:18px 0"
      ].join(";")
    };
  }
};
function thumb$k(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<g fill="${soft}"><rect x="6" y="14" width="18" height="49"/><rect x="50" y="14" width="19" height="49"/></g><rect x="28" y="14" width="18" height="49" fill="#fff"/><g fill="${text}"><rect x="6" y="14" width="18" height="3"/><rect x="50" y="14" width="19" height="3"/><rect x="10" y="22" width="10" height="3"/><rect x="54" y="22" width="11" height="3"/><rect x="11" y="36" width="8" height="5"/><rect x="55" y="36" width="9" height="5"/></g><g fill="${accent}"><rect x="28" y="14" width="18" height="3"/><rect x="32" y="22" width="10" height="3"/><rect x="33" y="36" width="8" height="5"/></g>`
  );
}
const priceTier = {
  meta: {
    id: "price-tier",
    kind: "tableCard",
    name: "档位卡",
    description: "每列独立 + 顶色条 + 推荐高亮，pricing tier",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$k,
  snippets: [
    {
      presetId: "table-card-price-tier",
      name: "表格 · 价格档位",
      description: "每列独立卡片，星号标推荐档",
      markdown: ':::: table-card 套餐价格 variant=price-tier\n::: table-row header=true cells="标准 | *高级 | 旗舰"\n:::\n::: table-row cells="￥99 | ￥199 | ￥399"\n:::\n::: table-row cells="基础功能 | 全部功能 | 含定制"\n:::\n::::\n'
    }
  ],
  render: () => {
    return {
      wrapperCSS: ["margin:18px 0"].join(";")
    };
  }
};
function thumb$j(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<path d="M6 14H69" stroke="${text}" stroke-width="2"/><path d="M6 62H69" stroke="${text}" stroke-width="2"/><path d="M6 26H69" stroke="${text}"/><g fill="${text}"><rect x="10" y="18" width="12" height="2"/><rect x="32" y="18" width="14" height="2"/><rect x="54" y="18" width="11" height="2"/><rect x="10" y="32" width="18" height="2"/><rect x="10" y="42" width="15" height="2"/><rect x="10" y="52" width="20" height="2"/></g>`
  );
}
const threeLineTable = {
  meta: {
    id: "three-line-table",
    kind: "tableCard",
    name: "三线表",
    description: "报刊 booktabs 三线：顶底 2px + header 后 1px，无垂直线",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$j,
  snippets: [
    {
      presetId: "table-card-three-line-table",
      name: "表格 · 三线表",
      description: "传统报刊三线，顶底粗线 + header 细分隔",
      markdown: ':::: table-card 研究结果 variant=three-line-table\n::: table-row header=true cells="变量 | 均值 | 标准差"\n:::\n::: table-row cells="A 组 | 3.42 | 0.81"\n:::\n::: table-row cells="B 组 | 4.17 | 0.63"\n:::\n::: table-row cells="C 组 | 2.98 | 1.05"\n:::\n::::\n'
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        `border-top:2px solid ${c.text}`,
        `border-bottom:2px solid ${c.text}`,
        "margin:18px 0"
      ].join(";")
    };
  }
};
function thumb$i(args) {
  const { text } = mergeThumb(args ?? {});
  return svg(
    `<path d="M6 14H69" stroke="${text}"/><path d="M6 26H69" stroke="${text}"/><path d="M6 38H69" stroke="${text}" stroke-dasharray="3 2"/><path d="M6 50H69" stroke="${text}" stroke-dasharray="3 2"/><g fill="${text}"><rect x="10" y="18" width="5" height="2"/><rect x="22" y="18" width="18" height="2"/><rect x="56" y="18" width="9" height="2"/><rect x="10" y="30" width="5" height="2"/><rect x="22" y="30" width="22" height="2"/><rect x="58" y="30" width="7" height="2"/><rect x="10" y="42" width="5" height="2"/><rect x="22" y="42" width="16" height="2"/><rect x="57" y="42" width="8" height="2"/></g>`
  );
}
const indexTable = {
  meta: {
    id: "index-table",
    kind: "tableCard",
    name: "索引目录",
    description: "三栏索引：序号 / 标题 / 页码，dashed 行分隔",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$i,
  snippets: [
    {
      presetId: "table-card-index-table",
      name: "表格 · 索引目录",
      description: "序号 + 标题 + 页码，dashed 虚线行分隔",
      markdown: ':::: table-card 目录 variant=index-table\n::: table-row header=true cells="No. | 文章 | 页"\n:::\n::: table-row cells="01 | 编辑前言 | 3"\n:::\n::: table-row cells="02 | 年度特别报告 | 12"\n:::\n::: table-row cells="03 | 专题：城市记忆 | 34"\n:::\n::::\n'
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    return {
      wrapperCSS: [
        `border-top:1px solid ${c.text}`,
        "margin:18px 0"
      ].join(";")
    };
  }
};
function thumb$h(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="18" y="14" width="12" height="12" fill="${soft}" stroke="${text}" stroke-width="0.5"/><rect x="30" y="14" width="12" height="12" fill="${soft}" stroke="${text}" stroke-width="0.5"/><rect x="42" y="14" width="12" height="12" fill="${soft}" stroke="${text}" stroke-width="0.5"/><rect x="54" y="14" width="12" height="12" fill="${soft}" stroke="${text}" stroke-width="0.5"/><rect x="18" y="26" width="12" height="12" fill="${accent}"/><rect x="30" y="26" width="12" height="12" fill="${accent}"/><rect x="42" y="26" width="12" height="12" fill="${accent}"/><rect x="54" y="26" width="12" height="12" fill="${accent}"/><rect x="18" y="38" width="12" height="12" fill="${accent}"/><rect x="30" y="38" width="12" height="12" fill="${accent}"/><rect x="42" y="38" width="12" height="12" fill="${accent}"/><rect x="54" y="38" width="12" height="12" fill="${accent}"/><rect x="18" y="50" width="12" height="12" fill="${accent}"/><rect x="30" y="50" width="12" height="12" fill="${accent}"/><rect x="42" y="50" width="12" height="12" fill="${accent}"/><rect x="54" y="50" width="12" height="12" fill="${accent}"/>`
  );
}
const matrix = {
  meta: {
    id: "matrix",
    kind: "tableCard",
    name: "矩阵热力",
    description: "行列标签 + 色块矩阵，包豪斯网格风（数值简化为统一色块）",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$h,
  snippets: [
    {
      presetId: "table-card-matrix",
      name: "表格 · 矩阵热力",
      description: "包豪斯热力矩阵，行列标签 + 统一色块",
      markdown: ':::: table-card 矩阵评分 variant=matrix\n::: table-row header=true cells=" | A | B | C"\n:::\n::: table-row cells="高 | 9 | 7 | 5"\n:::\n::: table-row cells="中 | 6 | 8 | 4"\n:::\n::: table-row cells="低 | 3 | 4 | 6"\n:::\n::::\n'
    }
  ],
  render: () => {
    return {
      wrapperCSS: "margin:18px 0"
    };
  }
};
const tableCardAll = [ruleGrid, zebraRows, keyValue, priceTier, threeLineTable, indexTable, matrix];
function thumb$g(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="29" height="47" rx="2" fill="${soft}"/><rect x="40" y="14" width="29" height="47" rx="2" fill="${soft}"/><circle cx="14" cy="24" r="3" fill="${accent}"/><circle cx="48" cy="24" r="3" fill="${accent}"/>`
  );
}
const duo = {
  meta: {
    id: "duo",
    kind: "gallery",
    name: "双联",
    description: "左右双图对照（默认）"
  },
  thumbnail: thumb$g,
  snippets: [
    {
      presetId: "gallery-duo",
      name: "相册 · 双联",
      description: "左右双图对照（before/after）",
      markdown: ':::: gallery 春夏 variant=duo\n::: image-item src="https://placehold.co/400" alt="春" 春\n:::\n::: image-item src="https://placehold.co/400" alt="夏" 夏\n:::\n::::\n'
    }
  ],
  render: () => {
    return {
      wrapperCSS: "",
      bodyCSS: "display:table;width:100%;table-layout:fixed;border-spacing:8px 0;border-collapse:separate"
    };
  }
};
function thumb$f(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="4" y="20" width="20" height="35" rx="2" fill="${soft}"/><rect x="27" y="20" width="20" height="35" rx="2" fill="${soft}"/><rect x="50" y="20" width="20" height="35" rx="2" fill="${soft}"/><circle cx="14" cy="30" r="2.5" fill="${accent}"/><circle cx="37" cy="30" r="2.5" fill="${accent}"/><circle cx="60" cy="30" r="2.5" fill="${accent}"/>`
  );
}
const triptych = {
  meta: {
    id: "triptych",
    kind: "gallery",
    name: "三联",
    description: "三联横排等高（panorama）"
  },
  thumbnail: thumb$f,
  snippets: [
    {
      presetId: "gallery-triptych",
      name: "相册 · 三联",
      description: "三联横排等高（panorama / 三幕）",
      markdown: ':::: gallery 旅行三幕 variant=triptych\n::: image-item src="https://placehold.co/400" alt="晨" 晨\n:::\n::: image-item src="https://placehold.co/400" alt="午" 午\n:::\n::: image-item src="https://placehold.co/400" alt="夜" 夜\n:::\n::::\n'
    }
  ],
  render: () => {
    return {
      wrapperCSS: "",
      bodyCSS: "display:table;width:100%;table-layout:fixed;border-spacing:6px 0;border-collapse:separate"
    };
  }
};
function thumb$e(args) {
  const { soft } = mergeThumb(args ?? {});
  const cells = [];
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      cells.push(`<rect x="${8 + c * 21}" y="${8 + r * 21}" width="18" height="18" fill="${soft}"/>`);
    }
  }
  return svg(cells.join(""));
}
const nineGrid = {
  meta: {
    id: "nine-grid",
    kind: "gallery",
    name: "九宫格",
    description: "3×3 强制方形（Instagram 体）",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$e,
  snippets: [
    {
      presetId: "gallery-nine-grid",
      name: "相册 · 九宫格",
      description: "3×3 方形流式（旅行回忆 / 作品集）",
      markdown: ':::: gallery 旅行回忆 variant=nine-grid\n::: image-item src="https://placehold.co/400" alt="1"\n:::\n::: image-item src="https://placehold.co/400" alt="2"\n:::\n::: image-item src="https://placehold.co/400" alt="3"\n:::\n::: image-item src="https://placehold.co/400" alt="4"\n:::\n::: image-item src="https://placehold.co/400" alt="5"\n:::\n::: image-item src="https://placehold.co/400" alt="6"\n:::\n::: image-item src="https://placehold.co/400" alt="7"\n:::\n::: image-item src="https://placehold.co/400" alt="8"\n:::\n::: image-item src="https://placehold.co/400" alt="9"\n:::\n::::\n'
    }
  ],
  render: () => {
    return {
      wrapperCSS: "",
      bodyCSS: "display:block;font-size:0;line-height:0"
    };
  }
};
function thumb$d(args) {
  const { accent, soft } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="20" width="28" height="35" rx="2" fill="${soft}"/><rect x="38" y="20" width="28" height="35" rx="2" fill="${soft}"/><rect x="70" y="20" width="20" height="35" rx="2" fill="${soft}"/><circle cx="20" cy="37" r="3" fill="${accent}"/><circle cx="52" cy="37" r="3" fill="${accent}"/><rect x="60" y="20" width="15" height="35" fill="#000" opacity="0.18"/>`
  );
}
const ribbonStrip = {
  meta: {
    id: "ribbon-strip",
    kind: "gallery",
    name: "横滚条带",
    description: "横向滚动 + 滑动提示阴影",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$d,
  snippets: [
    {
      presetId: "gallery-ribbon-strip",
      name: "相册 · 横滚条带",
      description: "移动端 carousel / 封面组合",
      markdown: ':::: gallery 封面组合 variant=ribbon-strip\n::: image-item src="https://placehold.co/600x400" alt="封面 1" 一\n:::\n::: image-item src="https://placehold.co/600x400" alt="封面 2" 二\n:::\n::: image-item src="https://placehold.co/600x400" alt="封面 3" 三\n:::\n::: image-item src="https://placehold.co/600x400" alt="封面 4" 四\n:::\n::::\n'
    }
  ],
  render: () => {
    return {
      wrapperCSS: "overflow-x:auto;white-space:nowrap;-webkit-overflow-scrolling:touch;box-shadow:inset -14px 0 10px -10px rgba(0,0,0,0.28);border-radius:4px",
      bodyCSS: "display:block;font-size:0;line-height:0;white-space:nowrap"
    };
  }
};
const galleryAll = [duo, triptych, nineGrid, ribbonStrip];
function thumb$c(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="14" width="9" height="9" fill="${accent}"/><rect x="21" y="16" width="40" height="2" fill="${text}"/><rect x="21" y="20" width="30" height="2" fill="${text}"/><rect x="8" y="34" width="9" height="9" fill="none" stroke="${text}"/><rect x="21" y="36" width="44" height="2" fill="${text}"/><rect x="21" y="40" width="36" height="2" fill="${text}"/><rect x="8" y="54" width="9" height="9" fill="${accent}"/><rect x="21" y="56" width="38" height="2" fill="${text}"/>`
  );
}
const qaRows = {
  meta: {
    id: "qa-rows",
    kind: "dialogue",
    name: "Q/A 行",
    description: "Q 方块强 / A 描边弱，访谈纵向交替堆叠"
  },
  thumbnail: thumb$c,
  snippets: [
    {
      presetId: "dialogue-qa-rows",
      name: "对谈 · Q/A 行",
      description: "Q 强 A 弱纵向交替访谈稿",
      markdown: ':::: dialogue 主编访谈 variant=qa-rows\n::: dialogue-turn name="主持人" role="Q"\n你怎么看这次行业转向？\n:::\n::: dialogue-turn name="张三" role="A"\n转向是必然的，但节奏会比想象慢。\n:::\n::: dialogue-turn name="主持人" role="Q"\n"慢"是相对什么参照？\n:::\n::: dialogue-turn name="张三" role="A"\n相对 2020 年的 AI hype。\n:::\n::::\n'
    }
  ],
  render: () => ({
    wrapperCSS: "margin:20px 0;padding:14px 16px;background-color:transparent"
  })
};
function thumb$b(args) {
  const { accent, soft, text } = mergeThumb(args ?? {});
  return svg(
    `<circle cx="12" cy="22" r="6" fill="${text}"/><rect x="22" y="16" width="40" height="13" rx="4" fill="${soft}"/><path d="M22,22 L18,25 L22,28 Z" fill="${soft}"/><rect x="14" y="42" width="40" height="13" rx="4" fill="${accent}"/><path d="M54,48 L58,51 L54,54 Z" fill="${accent}"/><circle cx="64" cy="48" r="6" fill="${accent}"/>`
  );
}
const chatBubbles = {
  meta: {
    id: "chat-bubbles",
    kind: "dialogue",
    name: "聊天气泡",
    description: "左右交替气泡 + 头像，IM 风"
  },
  thumbnail: thumb$b,
  snippets: [
    {
      presetId: "dialogue-chat-bubbles",
      name: "对谈 · 聊天气泡",
      description: "左右交替气泡 + 头像圆，IM 体",
      markdown: ':::: dialogue 群聊讨论 variant=chat-bubbles\n::: dialogue-turn name="主持人" side="left"\n你怎么看这次行业转向？\n:::\n::: dialogue-turn name="张三" side="right"\n转向是必然的，但节奏会比想象慢。\n:::\n::: dialogue-turn name="主持人" side="left"\n"慢"是相对什么参照？\n:::\n::: dialogue-turn name="张三" side="right"\n相对 2020 年的 AI hype。\n:::\n::::\n'
    }
  ],
  render: () => ({
    wrapperCSS: "margin:20px 0;padding:14px 16px;background-color:transparent"
  })
};
function thumb$a(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="16" width="14" height="3" fill="${accent}"/><rect x="24" y="16" width="42" height="3" fill="${text}"/><rect x="8" y="24" width="50" height="3" fill="${text}"/><rect x="8" y="38" width="12" height="3" fill="${accent}"/><rect x="22" y="38" width="44" height="3" fill="${text}"/><rect x="8" y="46" width="40" height="3" fill="${text}"/><rect x="8" y="58" width="14" height="3" fill="${accent}"/><rect x="24" y="58" width="38" height="3" fill="${text}"/>`
  );
}
const namePrefix = {
  meta: {
    id: "name-prefix",
    kind: "dialogue",
    name: "名字前缀",
    description: '"**名字**：内容" 行内排版，剧本 / 对谈最 dense',
    designedFor: ["tech-explainer", "academic-frontier", "literary-humanism"]
  },
  thumbnail: thumb$a,
  snippets: [
    {
      presetId: "dialogue-name-prefix",
      name: "对谈 · 名字前缀",
      description: "剧本式 inline 排版，无装饰",
      markdown: ':::: dialogue 创作谈 variant=name-prefix\n::: dialogue-turn name="主持人"\n你怎么看这次行业转向？\n:::\n::: dialogue-turn name="张三"\n转向是必然的，但节奏会比想象慢。\n:::\n::: dialogue-turn name="主持人"\n"慢"是相对什么参照？\n:::\n::: dialogue-turn name="张三"\n相对 2020 年的 AI hype。\n:::\n::::\n'
    }
  ],
  render: () => ({
    wrapperCSS: "margin:20px 0;background-color:transparent"
  })
};
function thumb$9(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="14" width="14" height="2" fill="${accent}"/><line x1="28" y1="12" x2="28" y2="62" stroke="${text}"/><rect x="32" y="14" width="34" height="2" fill="${text}"/><rect x="32" y="20" width="30" height="2" fill="${text}"/><rect x="32" y="26" width="26" height="2" fill="${text}"/><rect x="8" y="38" width="14" height="2" fill="${accent}"/><rect x="32" y="38" width="32" height="2" fill="${text}"/><rect x="32" y="44" width="34" height="2" fill="${text}"/><rect x="32" y="50" width="22" height="2" fill="${text}"/>`
  );
}
const interviewColumn = {
  meta: {
    id: "interview-column",
    kind: "dialogue",
    name: "杂志访谈栏",
    description: "左列大写姓名 + 右列长答 + hairline 沟槽"
  },
  thumbnail: thumb$9,
  snippets: [
    {
      presetId: "dialogue-interview-column",
      name: "对谈 · 杂志栏",
      description: "New Yorker 长访谈双栏",
      markdown: ':::: dialogue 长访谈 variant=interview-column\n::: dialogue-turn name="王某" role="主持人"\n你怎么看这次行业转向？这次转向是真正的产业重构，还是只是一次资本叙事的更替？\n:::\n::: dialogue-turn name="张三" role="嘉宾"\n转向是必然的，但节奏会比想象慢得多。底层逻辑是算力供给端在 2026 年才真正进入工程化阶段。\n:::\n::: dialogue-turn name="王某" role="主持人"\n那"慢"是相对什么参照？\n:::\n::: dialogue-turn name="张三" role="嘉宾"\n相对 2020 年的 AI hype。那时大家把推理成本算错了一个数量级。\n:::\n::::\n'
    }
  ],
  render: () => ({
    wrapperCSS: "margin:24px 0;padding:0;background-color:transparent"
  })
};
function thumb$8(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="10" width="24" height="2" fill="${accent}"/><rect x="8" y="18" width="18" height="2" fill="${text}"/><rect x="30" y="18" width="20" height="2" fill="${text}" opacity="0.4"/><rect x="8" y="26" width="52" height="2" fill="${text}"/><rect x="8" y="32" width="44" height="2" fill="${text}"/><rect x="8" y="50" width="20" height="2" fill="${accent}"/><rect x="8" y="58" width="16" height="2" fill="${text}"/><rect x="28" y="58" width="22" height="2" fill="${text}" opacity="0.4"/><rect x="8" y="66" width="48" height="2" fill="${text}"/>`
  );
}
const audioStamp = {
  meta: {
    id: "audio-stamp",
    kind: "dialogue",
    name: "音频时间戳",
    description: "顶行 mono 时间码 + name/role 次行，博物笔记 / 田野录音风",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$8,
  snippets: [
    {
      presetId: "dialogue-audio-stamp",
      name: "对谈 · 音频时间戳",
      description: "时间码顶行 + 说话人/角色 + 正文，田野访谈风",
      markdown: ':::: dialogue 田野访谈 variant=audio-stamp\n::: dialogue-turn name="访员" role="interviewer" timestamp="00:04:21"\n你能描述当时的场景吗？\n:::\n::: dialogue-turn name="老李" role="villager" timestamp="00:04:38"\n那天清晨雾很大，能见度不到 10 米。\n:::\n::: dialogue-turn name="访员" role="interviewer" timestamp="00:05:02"\n后来怎么确认方向的？\n:::\n::::\n'
    }
  ],
  render: () => ({
    wrapperCSS: "margin:20px 0;padding:0"
  })
};
const dialogueAll = [qaRows, chatBubbles, namePrefix, interviewColumn, audioStamp];
function thumb$7(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="14" width="14" height="2" fill="${accent}"/><rect x="26" y="14" width="40" height="2" fill="${text}"/><rect x="8" y="20" width="58" height="1" fill="${text}"/><rect x="8" y="26" width="50" height="2" fill="${text}" opacity="0.5"/><rect x="8" y="46" width="14" height="2" fill="${accent}"/><rect x="26" y="46" width="36" height="2" fill="${text}"/><rect x="8" y="52" width="58" height="1" fill="${text}"/><rect x="8" y="58" width="46" height="2" fill="${text}" opacity="0.5"/>`
  );
}
const numberedFaq = {
  meta: {
    id: "numbered-faq",
    kind: "qaBlock",
    name: "编号 FAQ",
    description: "Q.NN 序号 + 加粗设问 + 底线分隔 + 下方答复段"
  },
  thumbnail: thumb$7,
  snippets: [
    {
      presetId: "qa-block-numbered-faq",
      name: "问答 · 编号 FAQ",
      description: "Q.01 序号 + 设问 + 底线分隔，编辑部 FAQ 风",
      markdown: '::: qa-block 读者问答 · Q&A variant=numbered-faq q="订阅是否包含纸质刊？"\n不含。本刊数字订阅与纸刊为独立产品，需分别购买。\n:::\n'
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const kickerText = ctx.info.trim() || ctx.kickers.qaBlock;
    const q = (ctx.attrs.q ?? "").trim();
    const kickerCSS = [
      `color:${c.primary}`,
      "font-size:11px",
      "font-weight:700",
      "letter-spacing:0.1em",
      "margin-bottom:10px"
    ].join(";");
    const qRowCSS = [
      "display:table",
      "width:100%",
      `border-bottom:1px solid ${c.text}`,
      "padding-bottom:6px",
      "margin-bottom:8px"
    ].join(";");
    const qLabelCSS = [
      "display:table-cell",
      "vertical-align:baseline",
      "width:40px",
      'font-family:"IBM Plex Mono",monospace',
      "font-size:10px",
      `color:${c.textMuted}`,
      "letter-spacing:0.16em"
    ].join(";");
    const qTextCSS = [
      "display:table-cell",
      "vertical-align:baseline",
      "font-size:14px",
      "font-weight:600",
      `color:${c.text}`
    ].join(";");
    const aBodyCSS = [
      "font-size:13.5px",
      "line-height:1.85",
      `color:${c.textMuted}`
    ].join(";");
    return {
      wrapperCSS: "margin:18px 0;padding:6px 0;background-color:transparent",
      qaBlock: {
        kickerHtml: kickerText ? `<section class="container-qa-block__kicker" style="${kickerCSS}">${escText(kickerText)}</section>
` : "",
        qHtml: q ? `<section class="container-qa-block__q" style="${qRowCSS}"><span style="${qLabelCSS}">Q.01</span><span style="${qTextCSS}">${escText(q)}</span></section>
` : "",
        aOpenHtml: `<section class="container-qa-block__a" style="${aBodyCSS}"><span class="container-qa-block__answer">
`,
        aCloseHtml: "</span></section>\n"
      }
    };
  }
};
function thumb$6(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<text x="8" y="24" font-family="serif" font-size="18" font-style="italic" fill="${text}">Q.</text><rect x="28" y="14" width="42" height="2" fill="${text}"/><rect x="28" y="20" width="36" height="2" fill="${text}" opacity="0.6"/><rect x="8" y="38" width="58" height="1" fill="${text}" opacity="0.5"/><text x="8" y="56" font-family="serif" font-size="18" font-style="italic" fill="${accent}">A.</text><rect x="28" y="46" width="44" height="2" fill="${text}" opacity="0.6"/><rect x="28" y="52" width="32" height="2" fill="${text}" opacity="0.6"/>`
  );
}
const hangingQa = {
  meta: {
    id: "hanging-qa",
    kind: "qaBlock",
    name: "悬挂 Q./A.",
    description: "左侧大号斜体 Q./A. 标签 + 右侧设问回答悬挂缩进"
  },
  thumbnail: thumb$6,
  snippets: [
    {
      presetId: "qa-block-hanging-qa",
      name: "问答 · 悬挂 Q./A.",
      description: "大号斜体 Q. 起头 + A. 行顶线分隔，杂志 FAQ 母本",
      markdown: '::: qa-block 读者问答 variant=hanging-qa q="我是否需要先具备写作基础才能加入这个写作社群？"\n不需要。我们更欢迎尚未形成"写作惯性"的初学者。\n:::\n'
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const kickerText = ctx.info.trim() || ctx.kickers.qaBlock;
    const q = (ctx.attrs.q ?? "").trim();
    const kickerCSS = [
      `color:${c.primary}`,
      "font-size:11px",
      "font-weight:700",
      "letter-spacing:0.1em",
      "margin-bottom:10px"
    ].join(";");
    const qRowCSS = [
      "display:table",
      "width:100%",
      "margin-bottom:14px"
    ].join(";");
    const qLabelCSS = [
      "display:table-cell",
      "vertical-align:top",
      "width:32px",
      "font-size:24px",
      "font-style:italic",
      `color:${c.text}`,
      "line-height:1",
      "font-weight:500"
    ].join(";");
    const qTextCSS = [
      "display:table-cell",
      "vertical-align:top",
      "font-size:14.5px",
      "line-height:1.85",
      `color:${c.text}`,
      "font-weight:500"
    ].join(";");
    const aRowCSS = [
      "display:table",
      "width:100%",
      `border-top:1px solid ${c.textMuted}`,
      "padding-top:12px"
    ].join(";");
    const aLabelCSS = [
      "display:table-cell",
      "vertical-align:top",
      "width:32px",
      "font-size:24px",
      "font-style:italic",
      `color:${c.textMuted}`,
      "line-height:1",
      "font-weight:500"
    ].join(";");
    const aBodyCSS = [
      "display:table-cell",
      "vertical-align:top",
      "font-size:14.5px",
      "line-height:1.85",
      `color:${c.textMuted}`
    ].join(";");
    return {
      wrapperCSS: "margin:18px 0;padding:6px 0;background-color:transparent",
      qaBlock: {
        kickerHtml: kickerText ? `<section class="container-qa-block__kicker" style="${kickerCSS}">${escText(kickerText)}</section>
` : "",
        qHtml: q ? `<section class="container-qa-block__q" style="${qRowCSS}"><span style="${qLabelCSS}">Q.</span><span style="${qTextCSS}">${escText(q)}</span></section>
` : "",
        aOpenHtml: `<section class="container-qa-block__a" style="${aRowCSS}"><span style="${aLabelCSS}">A.</span><span style="${aBodyCSS}">
`,
        aCloseHtml: "</span></section>\n"
      }
    };
  }
};
function thumb$5(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="8" y="12" width="16" height="16" fill="${accent}"/><text x="16" y="24" font-family="serif" font-size="11" fill="#fff" text-anchor="middle">问</text><rect x="30" y="16" width="38" height="2" fill="${text}"/><rect x="30" y="22" width="32" height="2" fill="${text}" opacity="0.6"/><rect x="8" y="46" width="16" height="16" fill="none" stroke="${accent}" stroke-width="1.5"/><text x="16" y="58" font-family="serif" font-size="11" fill="${accent}" text-anchor="middle">答</text><rect x="30" y="50" width="40" height="2" fill="${text}" opacity="0.8"/><rect x="30" y="56" width="28" height="2" fill="${text}" opacity="0.6"/>`
  );
}
const sealStamp = {
  meta: {
    id: "seal-stamp",
    kind: "qaBlock",
    name: "问答朱印",
    description: "CJK 问 / 答 朱印徽章：实心 vs 描边，宋本批注语言",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$5,
  snippets: [
    {
      presetId: "qa-block-seal-stamp",
      name: "问答 · 问答朱印",
      description: "中文 问 / 答 朱印徽章对齐设问与回答",
      markdown: '::: qa-block 读者问答 variant=seal-stamp q="读古书是否一定要懂训诂之学？"\n未必。能读懂大意已属可贵，训诂之学，可俟后日积累。\n:::\n'
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const kickerText = ctx.info.trim() || ctx.kickers.qaBlock;
    const q = (ctx.attrs.q ?? "").trim();
    const kickerCSS = [
      `color:${c.primary}`,
      "font-size:11px",
      "font-weight:700",
      "letter-spacing:0.1em",
      "margin-bottom:10px"
    ].join(";");
    const rowCSS = [
      "display:table",
      "width:100%",
      "margin-bottom:10px"
    ].join(";");
    const qBadgeCSS = [
      "display:table-cell",
      "vertical-align:top",
      "width:28px",
      "padding-right:10px"
    ].join(";");
    const qBadgeInnerCSS = [
      "display:inline-block",
      "width:26px",
      "height:26px",
      `background-color:${c.primary}`,
      `color:${c.textInverse}`,
      "font-size:13px",
      "text-align:center",
      "line-height:26px"
    ].join(";");
    const aBadgeInnerCSS = [
      "display:inline-block",
      "width:26px",
      "height:26px",
      "background-color:transparent",
      `border:1.5px solid ${c.primary}`,
      `color:${c.primary}`,
      "font-size:13px",
      "text-align:center",
      "line-height:23px"
    ].join(";");
    const bodyCSS = [
      "display:table-cell",
      "vertical-align:top",
      "font-size:14px",
      "line-height:1.85",
      `color:${c.text}`
    ].join(";");
    return {
      wrapperCSS: "margin:18px 0;padding:6px 0;background-color:transparent",
      qaBlock: {
        kickerHtml: kickerText ? `<section class="container-qa-block__kicker" style="${kickerCSS}">${escText(kickerText)}</section>
` : "",
        qHtml: q ? `<section class="container-qa-block__q" style="${rowCSS}"><span style="${qBadgeCSS}"><span style="${qBadgeInnerCSS}">问</span></span><span style="${bodyCSS}">${escText(q)}</span></section>
` : "",
        aOpenHtml: `<section class="container-qa-block__a" style="${rowCSS}"><span style="${qBadgeCSS}"><span style="${aBadgeInnerCSS}">答</span></span><span style="${bodyCSS}">
`,
        aCloseHtml: "</span></section>\n"
      }
    };
  }
};
function thumb$4(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="14" width="64" height="1" fill="${text}"/><rect x="8" y="20" width="24" height="2" fill="${accent}"/><rect x="8" y="28" width="56" height="2" fill="${text}"/><rect x="6" y="34" width="64" height="1" fill="${text}"/><rect x="14" y="48" width="6" height="2" fill="${accent}"/><rect x="22" y="48" width="42" height="2" fill="${text}" opacity="0.7"/><rect x="22" y="54" width="36" height="2" fill="${text}" opacity="0.7"/><rect x="22" y="60" width="40" height="2" fill="${text}" opacity="0.7"/>`
  );
}
const queryAnnotation = {
  meta: {
    id: "query-annotation",
    kind: "qaBlock",
    name: "设问注",
    description: "上下夹线设问 + 左 hanging 注解，宋本批注体",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$4,
  snippets: [
    {
      presetId: "qa-block-query-annotation",
      name: "问答 · 设问注",
      description: "設・問 上下夹线 + 註 hanging 缩进，文言批注感",
      markdown: '::: qa-block 读者问答 variant=query-annotation q="何谓\\"诗境\\"？"\n境者，意中之境也。情景交融而非情景相加，所谓"以我观物，物皆著我之色彩"。\n:::\n'
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const kickerText = ctx.info.trim() || ctx.kickers.qaBlock;
    const q = (ctx.attrs.q ?? "").trim();
    const kickerCSS = [
      `color:${c.primary}`,
      "font-size:11px",
      "font-weight:700",
      "letter-spacing:0.1em",
      "margin-bottom:10px"
    ].join(";");
    const qSectionCSS = [
      `border-top:1px solid ${c.textMuted}`,
      `border-bottom:1px solid ${c.textMuted}`,
      "padding:10px 0",
      "margin-bottom:12px"
    ].join(";");
    const qInlineKickerCSS = [
      "display:inline-block",
      "font-size:11px",
      `color:${c.primary}`,
      "letter-spacing:0.3em",
      "margin-bottom:6px"
    ].join(";");
    const qTextCSS = [
      "display:block",
      "font-size:14.5px",
      "line-height:1.95",
      `color:${c.text}`,
      "font-weight:500"
    ].join(";");
    const aRowCSS = [
      "display:table",
      "width:100%"
    ].join(";");
    const aLabelCellCSS = [
      "display:table-cell",
      "vertical-align:top",
      "width:20px",
      "font-size:11px",
      `color:${c.primary}`
    ].join(";");
    const aBodyCellCSS = [
      "display:table-cell",
      "vertical-align:top",
      "font-size:14px",
      "line-height:1.85",
      `color:${c.text}`
    ].join(";");
    return {
      wrapperCSS: "margin:18px 0;padding:6px 0;background-color:transparent",
      qaBlock: {
        kickerHtml: kickerText ? `<section class="container-qa-block__kicker" style="${kickerCSS}">${escText(kickerText)}</section>
` : "",
        qHtml: q ? `<section class="container-qa-block__q" style="${qSectionCSS}"><span style="${qInlineKickerCSS}">設・問</span><span style="${qTextCSS}">${escText(q)}</span></section>
` : "",
        aOpenHtml: `<section class="container-qa-block__a" style="${aRowCSS}"><span style="${aLabelCellCSS}">註</span><span style="${aBodyCellCSS}">
`,
        aCloseHtml: "</span></section>\n"
      }
    };
  }
};
function thumb$3(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="12" width="20" height="2" fill="${text}" opacity="0.6"/><rect x="6" y="18" width="14" height="2" fill="${accent}" opacity="0.7"/><rect x="30" y="12" width="40" height="2" fill="${text}"/><rect x="30" y="18" width="34" height="2" fill="${text}" opacity="0.7"/><rect x="6" y="28" width="64" height="1" fill="${text}"/><rect x="6" y="40" width="22" height="2" fill="${accent}"/><rect x="6" y="46" width="16" height="2" fill="${accent}" opacity="0.7"/><rect x="30" y="40" width="36" height="2" fill="${text}"/><rect x="30" y="46" width="32" height="2" fill="${text}" opacity="0.7"/>`
  );
}
const sampleQuery = {
  meta: {
    id: "sample-query",
    kind: "qaBlock",
    name: "采样设问",
    description: "QUERY / FINDING 双栏 + 编号 italic 标签，博物笔记体",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$3,
  snippets: [
    {
      presetId: "qa-block-sample-query",
      name: "问答 · 采样设问",
      description: "QUERY N°014 + FINDING obs.014.b，田野调查 Q/A",
      markdown: '::: qa-block 读者问答 variant=sample-query q="山中昼夜温差超过多少时，应当停止野外考察？"\n温差 ≥ 15℃ 且海拔超过 3000m 时，应即刻撤回营地。\n:::\n'
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const kickerText = ctx.info.trim() || ctx.kickers.qaBlock;
    const q = (ctx.attrs.q ?? "").trim();
    const kickerCSS = [
      `color:${c.primary}`,
      "font-size:11px",
      "font-weight:700",
      "letter-spacing:0.1em",
      "margin-bottom:10px"
    ].join(";");
    const rowCSS = [
      "display:table",
      "width:100%"
    ].join(";");
    const qRowCSS = [
      "display:table",
      "width:100%",
      `border-bottom:1px solid ${c.text}`,
      "padding-bottom:8px",
      "margin-bottom:8px"
    ].join(";");
    const labelCellCSS = [
      "display:table-cell",
      "vertical-align:top",
      "width:54px"
    ].join(";");
    const qLabelMainCSS = [
      "display:block",
      "font-size:10px",
      `color:${c.textMuted}`,
      "letter-spacing:0.12em",
      "font-weight:600"
    ].join(";");
    const labelItalicCSS = [
      "display:block",
      "font-size:10px",
      "font-style:italic",
      `color:${c.accent}`,
      "letter-spacing:0.06em"
    ].join(";");
    const bodyCellCSS = [
      "display:table-cell",
      "vertical-align:top",
      "font-size:14px",
      "line-height:1.85",
      `color:${c.text}`,
      "font-weight:500"
    ].join(";");
    const aBodyCellCSS = [
      "display:table-cell",
      "vertical-align:top",
      "font-size:14px",
      "line-height:1.85",
      `color:${c.text}`
    ].join(";");
    const qLabelHtml = `<span style="${labelCellCSS}"><span style="${qLabelMainCSS}">QUERY</span><span style="${labelItalicCSS}">N° 014</span></span>`;
    const aLabelHtml = `<span style="${labelCellCSS}"><span style="${qLabelMainCSS}">FINDING</span><span style="${labelItalicCSS}">obs. 014.b</span></span>`;
    return {
      wrapperCSS: "margin:18px 0;padding:6px 0;background-color:transparent",
      qaBlock: {
        kickerHtml: kickerText ? `<section class="container-qa-block__kicker" style="${kickerCSS}">${escText(kickerText)}</section>
` : "",
        qHtml: q ? `<section class="container-qa-block__q" style="${qRowCSS}">${qLabelHtml}<span style="${bodyCellCSS}">${escText(q)}</span></section>
` : "",
        aOpenHtml: `<section class="container-qa-block__a" style="${rowCSS}">${aLabelHtml}<span style="${aBodyCellCSS}">
`,
        aCloseHtml: "</span></section>\n"
      }
    };
  }
};
function thumb$2(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="10" width="63" height="56" fill="none" stroke="${text}" stroke-width="1"/><text x="10" y="22" font-family="monospace" font-size="8" fill="${accent}" letter-spacing="1">Q</text><text x="56" y="22" font-family="serif" font-size="8" font-style="italic" fill="${text}" opacity="0.6">Card 09</text><line x1="10" y1="26" x2="64" y2="26" stroke="${text}" stroke-dasharray="2 2"/><rect x="10" y="30" width="50" height="2" fill="${text}"/><rect x="10" y="36" width="38" height="2" fill="${text}" opacity="0.7"/><line x1="10" y1="42" x2="64" y2="42" stroke="${text}" stroke-dasharray="2 2"/><text x="10" y="50" font-family="monospace" font-size="8" fill="${accent}" letter-spacing="1">A</text><rect x="10" y="54" width="46" height="2" fill="${text}"/><rect x="10" y="60" width="34" height="2" fill="${text}" opacity="0.7"/>`
  );
}
const fieldCard = {
  meta: {
    id: "field-card",
    kind: "qaBlock",
    name: "田野卡片",
    description: "外框 + dashed 分隔 + Q/A kicker + Card 编号，田野采集卡",
    experimental: true,
    experimentalSince: "2026-05-19"
  },
  thumbnail: thumb$2,
  snippets: [
    {
      presetId: "qa-block-field-card",
      name: "问答 · 田野卡片",
      description: "边框包裹 + dashed 行分隔 + Card NN 编号",
      markdown: '::: qa-block 读者问答 variant=field-card q="为何记录树木胸径而不是树高？"\n胸径稳定可测，树高常因树梢断折而失真。\n:::\n'
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const kickerText = ctx.info.trim() || ctx.kickers.qaBlock;
    const q = (ctx.attrs.q ?? "").trim();
    const kickerCSS = [
      `color:${c.primary}`,
      "font-size:11px",
      "font-weight:700",
      "letter-spacing:0.1em",
      "margin-bottom:10px"
    ].join(";");
    const qHeaderRowCSS = [
      "display:table",
      "width:100%",
      `border-bottom:1px dashed ${c.text}`,
      "padding-bottom:6px",
      "margin-bottom:8px"
    ].join(";");
    const qLabelCellCSS = [
      "display:table-cell",
      "vertical-align:baseline",
      "font-size:10px",
      `color:${c.accent}`,
      "letter-spacing:0.16em",
      "font-weight:600"
    ].join(";");
    const qCardNumCellCSS = [
      "display:table-cell",
      "vertical-align:baseline",
      "text-align:right",
      "font-size:11px",
      "font-style:italic",
      `color:${c.textMuted}`
    ].join(";");
    const qTextCSS = [
      "display:block",
      "font-size:14px",
      "line-height:1.85",
      `color:${c.text}`,
      "margin-bottom:10px"
    ].join(";");
    const aHeaderCSS = [
      "display:block",
      "font-size:10px",
      `color:${c.accent}`,
      "letter-spacing:0.16em",
      "font-weight:600",
      `border-top:1px dashed ${c.text}`,
      "padding-top:6px",
      "margin-bottom:6px"
    ].join(";");
    const aBodyCSS = [
      "display:block",
      "font-size:14px",
      "line-height:1.85",
      `color:${c.text}`
    ].join(";");
    const qHeaderHtml = q ? `<section class="container-qa-block__q-header" style="${qHeaderRowCSS}"><span style="${qLabelCellCSS}">Q</span><span style="${qCardNumCellCSS}">Card 09</span></section>
<span style="${qTextCSS}">${escText(q)}</span>
` : "";
    return {
      wrapperCSS: `margin:18px 0;padding:10px 12px;border:1px solid ${c.text};background-color:transparent`,
      qaBlock: {
        kickerHtml: kickerText ? `<section class="container-qa-block__kicker" style="${kickerCSS}">${escText(kickerText)}</section>
` : "",
        qHtml: qHeaderHtml,
        aOpenHtml: `<span style="${aHeaderCSS}">A</span><span style="${aBodyCSS}">
`,
        aCloseHtml: "</span>\n"
      }
    };
  }
};
function thumb$1(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<circle cx="16" cy="22" r="10" fill="none" stroke="${text}" stroke-width="2"/><text x="16" y="26" font-family="monospace" font-size="9" font-weight="600" fill="${text}" text-anchor="middle">Q</text><rect x="30" y="14" width="40" height="2" fill="${text}"/><rect x="30" y="20" width="34" height="2" fill="${text}" opacity="0.7"/><rect x="30" y="26" width="36" height="2" fill="${text}" opacity="0.7"/><rect x="6" y="46" width="20" height="20" fill="${accent}"/><text x="16" y="60" font-family="monospace" font-size="9" font-weight="600" fill="#fff" text-anchor="middle">A</text><rect x="30" y="48" width="42" height="2" fill="${text}"/><rect x="30" y="54" width="36" height="2" fill="${text}" opacity="0.7"/><rect x="30" y="60" width="32" height="2" fill="${text}" opacity="0.7"/>`
  );
}
const circleSquare = {
  meta: {
    id: "circle-square",
    kind: "qaBlock",
    name: "圆方代号",
    description: "圆环 Q + 实心方 A 几何徽章，包豪斯对照"
  },
  thumbnail: thumb$1,
  snippets: [
    {
      presetId: "qa-block-circle-square",
      name: "问答 · 圆方代号",
      description: "24×24 圆环描问 + 实心方块答，几何对照",
      markdown: '::: qa-block 读者问答 variant=circle-square q="设计师该不该有自己的\\"风格\\"？"\n风格是结果，不是目标。刻意打造的风格，往往变成局限。\n:::\n'
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const kickerText = ctx.info.trim() || ctx.kickers.qaBlock;
    const q = (ctx.attrs.q ?? "").trim();
    const kickerCSS = [
      `color:${c.primary}`,
      "font-size:11px",
      "font-weight:700",
      "letter-spacing:0.1em",
      "margin-bottom:10px"
    ].join(";");
    const rowCSS = [
      "display:table",
      "width:100%"
    ].join(";");
    const qRowCSS = [
      "display:table",
      "width:100%",
      "margin-bottom:14px"
    ].join(";");
    const badgeCellCSS = [
      "display:table-cell",
      "vertical-align:top",
      "width:36px",
      "padding-right:12px"
    ].join(";");
    const qBadgeCSS = [
      "display:inline-block",
      "width:24px",
      "height:24px",
      `border:2px solid ${c.text}`,
      "border-radius:50%",
      "font-size:10px",
      "font-weight:600",
      `color:${c.text}`,
      "text-align:center",
      "line-height:20px"
    ].join(";");
    const aBadgeCSS = [
      "display:inline-block",
      "width:24px",
      "height:24px",
      `background-color:${c.accent}`,
      "font-size:10px",
      "font-weight:600",
      `color:${c.textInverse}`,
      "text-align:center",
      "line-height:24px"
    ].join(";");
    const qBodyCellCSS = [
      "display:table-cell",
      "vertical-align:top",
      "font-size:14.5px",
      "line-height:1.85",
      `color:${c.text}`,
      "font-weight:500"
    ].join(";");
    const aBodyCellCSS = [
      "display:table-cell",
      "vertical-align:top",
      "font-size:14.5px",
      "line-height:1.85",
      `color:${c.text}`
    ].join(";");
    return {
      wrapperCSS: "margin:18px 0;padding:6px 0;background-color:transparent",
      qaBlock: {
        kickerHtml: kickerText ? `<section class="container-qa-block__kicker" style="${kickerCSS}">${escText(kickerText)}</section>
` : "",
        qHtml: q ? `<section class="container-qa-block__q" style="${qRowCSS}"><span style="${badgeCellCSS}"><span style="${qBadgeCSS}">Q</span></span><span style="${qBodyCellCSS}">${escText(q)}</span></section>
` : "",
        aOpenHtml: `<section class="container-qa-block__a" style="${rowCSS}"><span style="${badgeCellCSS}"><span style="${aBadgeCSS}">A</span></span><span style="${aBodyCellCSS}">
`,
        aCloseHtml: "</span></section>\n"
      }
    };
  }
};
function thumb(args) {
  const { accent, text } = mergeThumb(args ?? {});
  return svg(
    `<rect x="6" y="10" width="63" height="56" fill="none" stroke="${text}" stroke-width="1"/><rect x="6" y="10" width="63" height="26" fill="${text}"/><text x="10" y="20" font-family="monospace" font-size="7" fill="${accent}" letter-spacing="1.5">Q · 01</text><rect x="10" y="24" width="50" height="2" fill="#fff"/><rect x="10" y="30" width="38" height="2" fill="#fff" opacity="0.7"/><text x="10" y="46" font-family="monospace" font-size="7" fill="${text}" letter-spacing="1.5">A · 01</text><rect x="10" y="50" width="52" height="2" fill="${text}"/><rect x="10" y="56" width="42" height="2" fill="${text}" opacity="0.7"/><rect x="10" y="62" width="46" height="2" fill="${text}" opacity="0.7"/>`
  );
}
const typedBlock = {
  meta: {
    id: "typed-block",
    kind: "qaBlock",
    name: "反白分栏",
    description: "上半段反白 Q · NN + 下半段正常底 A · NN，包豪斯 typed block"
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: "qa-block-typed-block",
      name: "问答 · 反白分栏",
      description: "反白 Q 段 + 正常 A 段 + mono · 编号，包豪斯反衬",
      markdown: '::: qa-block 读者问答 variant=typed-block q="如何判断一个项目应该被砍掉？"\n当你已经无法回答"为什么是我们来做"时——该砍。\n:::\n'
    }
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors;
    const kickerText = ctx.info.trim() || ctx.kickers.qaBlock;
    const q = (ctx.attrs.q ?? "").trim();
    const kickerCSS = [
      `color:${c.primary}`,
      "font-size:11px",
      "font-weight:700",
      "letter-spacing:0.1em",
      "margin-bottom:10px"
    ].join(";");
    const qSectionCSS = [
      `background-color:${c.text}`,
      "padding:10px 12px"
    ].join(";");
    const qKickerCSS = [
      "display:block",
      "font-size:9px",
      "letter-spacing:0.2em",
      `color:${c.accent}`,
      "margin-bottom:6px"
    ].join(";");
    const qTextCSS = [
      "display:block",
      "font-size:14px",
      "font-weight:500",
      `color:${c.textInverse}`,
      "line-height:1.75"
    ].join(";");
    const aSectionCSS = [
      "padding:10px 12px"
    ].join(";");
    const aKickerCSS = [
      "display:block",
      "font-size:9px",
      "letter-spacing:0.2em",
      `color:${c.textMuted}`,
      "margin-bottom:6px"
    ].join(";");
    const aBodyCSS = [
      "display:block",
      "font-size:14px",
      "line-height:1.85",
      `color:${c.text}`
    ].join(";");
    const qBlockHtml = q ? `<section class="container-qa-block__q" style="${qSectionCSS}"><span style="${qKickerCSS}">Q · 01</span><span style="${qTextCSS}">${escText(q)}</span></section>
` : "";
    return {
      wrapperCSS: `margin:18px 0;padding:0;border:1px solid ${c.text};background-color:transparent`,
      qaBlock: {
        kickerHtml: kickerText ? `<section class="container-qa-block__kicker" style="${kickerCSS}">${escText(kickerText)}</section>
` : "",
        qHtml: qBlockHtml,
        aOpenHtml: `<section class="container-qa-block__a" style="${aSectionCSS}"><span style="${aKickerCSS}">A · 01</span><span style="${aBodyCSS}">
`,
        aCloseHtml: "</span></section>\n"
      }
    };
  }
};
const qaBlockAll = [
  numberedFaq,
  hangingQa,
  sealStamp,
  queryAnnotation,
  sampleQuery,
  fieldCard,
  circleSquare,
  typedBlock
];
const ADMONITION_ORDER = [
  "accent-bar",
  "pill-tag",
  "card-shadow",
  "terminal",
  "dashed-border",
  "top-bottom-rule",
  "manpage-log",
  "sidenote-latex",
  "marginalia",
  "ledger-cell",
  "bubble-organic",
  "magazine-pull",
  "report-section",
  "news-row",
  "news-underline",
  "mook-tag",
  "slab-corner",
  "numbered-rule",
  "hanging-nb",
  "vermilion-seal",
  "paper-slip",
  "field-tag",
  "specimen-box",
  "filled-square",
  "triangle-top"
];
const QUOTE_ORDER = [
  "classic",
  "magazine-dropcap",
  "column-rule",
  "frame-brackets",
  "editorial-block",
  "tilted-sticker",
  "oversized-mark",
  "numbered-lines",
  "seal-kai",
  "double-frame",
  "specimen-quote",
  "binomial-attrib",
  "huge-numeral",
  "ring-device"
];
const COMPARE_ORDER = [
  "column-card",
  "stacked-row",
  "ledger",
  "data-card",
  "paired-specimen",
  "measurement-table",
  "paired-shape",
  "axis-diagram"
];
const STEPS_ORDER = [
  "number-circle",
  "timeline-dot",
  "step-card",
  "split-row",
  "seal-cjk",
  "ruler-row"
];
const DIVIDER_ORDER = ["wave", "dots", "flower", "rule", "glyph", "seal-mark"];
const SECTION_TITLE_ORDER = [
  "bordered",
  "cornered",
  "number-prefix",
  "kicker-stack",
  "ribbon-stamp"
];
const CODE_BLOCK_ORDER = [
  "bare",
  "header-bar",
  "line-numbers",
  "terminal-frame",
  "inline-card"
];
const NOTE_ORDER = [
  "minimal-callout",
  "box-callout",
  "side-bar",
  "dotted-margin",
  "smallcaps-kicker",
  "editorial-stripe",
  "research-dense",
  "ed-signoff",
  "inline-label",
  "interlinear-gloss",
  "vermilion-gloss",
  "ruler-note",
  "latin-subhead",
  "initial-disc",
  "geometric-mark"
];
const HIGHLIGHT_ORDER = [
  "plain",
  "dotted-underline",
  "tracked-emphasis",
  "vermilion-inline",
  "side-dots",
  "wash-ground",
  "bracketed-tick",
  "geometric-flag",
  "single-stroke"
];
const FOOTNOTES_ORDER = [
  "lined",
  "inline-flow",
  "boxed-aside",
  "top-rule",
  "dense-academic"
];
const RECOMMEND_ORDER = ["card-list", "academic-refs"];
const QRCODE_ORDER = ["bare", "follow-card", "qr-stack"];
const FOOTER_CTA_ORDER = ["button-led", "triptych-actions"];
const PULL_QUOTE_ORDER = [
  "giant-mark",
  "centered-rule",
  "stamp-quote",
  "margin-pull",
  "weight-contrast",
  "drop-capital",
  "calligraphic",
  "with-gloss",
  "bilingual-stack",
  "caliper-mark",
  "inverted-plate",
  "grid-block"
];
const ANNOUNCEMENT_ORDER = [
  "danger-bar",
  "mono-disclaimer",
  "ai-notice",
  "stamped-banner"
];
const TABLE_CARD_ORDER = [
  "rule-grid",
  "zebra-rows",
  "key-value",
  "price-tier",
  "three-line-table",
  "index-table",
  "matrix"
];
const GALLERY_ORDER = [
  "duo",
  "triptych",
  "nine-grid",
  "ribbon-strip"
];
const DIALOGUE_ORDER = [
  "qa-rows",
  "chat-bubbles",
  "name-prefix",
  "interview-column",
  "audio-stamp"
];
const QA_BLOCK_ORDER = [
  "numbered-faq",
  "hanging-qa",
  "seal-stamp",
  "query-annotation",
  "sample-query",
  "field-card",
  "circle-square",
  "typed-block"
];
const ORDER_BY_KIND = {
  admonition: ADMONITION_ORDER,
  quote: QUOTE_ORDER,
  compare: COMPARE_ORDER,
  steps: STEPS_ORDER,
  divider: DIVIDER_ORDER,
  sectionTitle: SECTION_TITLE_ORDER,
  codeBlock: CODE_BLOCK_ORDER,
  note: NOTE_ORDER,
  highlight: HIGHLIGHT_ORDER,
  footnotes: FOOTNOTES_ORDER,
  recommend: RECOMMEND_ORDER,
  qrcode: QRCODE_ORDER,
  footerCTA: FOOTER_CTA_ORDER,
  pullQuote: PULL_QUOTE_ORDER,
  announcement: ANNOUNCEMENT_ORDER,
  tableCard: TABLE_CARD_ORDER,
  gallery: GALLERY_ORDER,
  dialogue: DIALOGUE_ORDER,
  qaBlock: QA_BLOCK_ORDER
};
function collectDefs() {
  return [
    ...admonitionAll,
    ...quoteAll,
    ...compareAll,
    ...stepsAll,
    ...dividerAll,
    ...sectionTitleAll,
    ...codeBlockAll,
    ...noteAll,
    ...highlightAll,
    ...footnotesAll,
    ...recommendAll,
    ...qrcodeAll,
    ...footerCTAAll,
    ...pullQuoteAll,
    ...announcementAll,
    ...tableCardAll,
    ...galleryAll,
    ...dialogueAll,
    ...qaBlockAll
  ];
}
const ALL_DEFS = collectDefs();
const ALL_VARIANT_DEFS = ALL_DEFS;
function asRecord(defs, kind) {
  const out = {};
  for (const d of orderDefsByKind(defs, kind, ORDER_BY_KIND[kind])) {
    out[d.meta.id] = d;
  }
  return out;
}
const ADMONITION_VARIANTS = asRecord(
  ALL_DEFS,
  "admonition"
);
const QUOTE_VARIANTS = asRecord(ALL_DEFS, "quote");
const COMPARE_VARIANTS = asRecord(ALL_DEFS, "compare");
const STEPS_VARIANTS = asRecord(ALL_DEFS, "steps");
const DIVIDER_VARIANTS = asRecord(ALL_DEFS, "divider");
const SECTION_TITLE_VARIANTS = asRecord(
  ALL_DEFS,
  "sectionTitle"
);
const NOTE_VARIANTS = asRecord(ALL_DEFS, "note");
const HIGHLIGHT_VARIANTS = asRecord(ALL_DEFS, "highlight");
const FOOTNOTES_VARIANTS = asRecord(ALL_DEFS, "footnotes");
const RECOMMEND_VARIANTS = asRecord(ALL_DEFS, "recommend");
const QRCODE_VARIANTS = asRecord(ALL_DEFS, "qrcode");
const FOOTER_CTA_VARIANTS = asRecord(ALL_DEFS, "footerCTA");
const PULL_QUOTE_VARIANTS = asRecord(ALL_DEFS, "pullQuote");
const ANNOUNCEMENT_VARIANTS = asRecord(ALL_DEFS, "announcement");
const TABLE_CARD_VARIANTS = asRecord(ALL_DEFS, "tableCard");
const GALLERY_VARIANTS = asRecord(ALL_DEFS, "gallery");
const DIALOGUE_VARIANTS = asRecord(ALL_DEFS, "dialogue");
const QA_BLOCK_VARIANTS = asRecord(ALL_DEFS, "qaBlock");
const CODE_BLOCK_VARIANTS = (() => {
  const out = {};
  for (const d of orderDefsByKind(ALL_DEFS, "codeBlock", ORDER_BY_KIND.codeBlock)) out[d.meta.id] = d;
  return out;
})();
function applyUserVariant(uv, base) {
  if (uv.level === "tokens") {
    return {
      ...base,
      wrapperCSS: injectTokens(base.wrapperCSS, uv.tokens)
    };
  }
  return {
    ...base,
    wrapperCSS: appendCss(base.wrapperCSS, uv.cssPatch.wrapperCSS) ?? "",
    titleCSS: appendCss(base.titleCSS, uv.cssPatch.titleCSS),
    bodyCSS: appendCss(base.bodyCSS, uv.cssPatch.bodyCSS)
  };
}
const USER_TOKEN_PREFIX = "--uv-";
function injectTokens(css, tokens) {
  const entries = Object.entries(tokens);
  if (entries.length === 0) return css;
  const decls = entries.map(([k, v]) => `${USER_TOKEN_PREFIX}${k}:${v}`).join(";");
  if (!css) return decls;
  return `${css};${decls}`;
}
function appendCss(base, patch) {
  if (!patch) return base;
  if (base === "") return "";
  if (!base) return patch;
  return `${base};${patch}`;
}
function isAppliableUserVariant(uv) {
  return uv.level === "tokens" || uv.level === "patch";
}
function makeVariantContainer(opts) {
  const { name, themeSlot, table, fallbackId, resolveAlias, args, title, body } = opts;
  function resolveVariant(ctx) {
    const pageId = ctx.pageVariants?.[themeSlot];
    const themeId = ctx.variants[themeSlot];
    const pageValid = pageId && pageId in table ? pageId : void 0;
    const themeValid = themeId && themeId in table ? themeId : void 0;
    const rawOverride = ctx.attrs.variant;
    if (rawOverride) {
      const normalized = rawOverride.toLowerCase().trim();
      if (normalized.startsWith("uv_")) {
        const uv = ctx.userVariants?.get(normalized);
        if (uv && isAppliableUserVariant(uv) && uv.base.kind === themeSlot) {
          const baseEntry = table[uv.base.variantId];
          if (baseEntry?.render) {
            const baseResult = baseEntry.render(ctx, args?.(ctx));
            return { id: uv.id, result: applyUserVariant(uv, baseResult) };
          }
        }
      }
    }
    let id = fallbackId;
    if (rawOverride) {
      const normalized = rawOverride.toLowerCase().trim();
      const aliased = resolveAlias?.(normalized);
      const candidate = aliased ?? rawOverride;
      if (candidate in table) {
        id = candidate;
      } else {
        id = pageValid ?? themeValid ?? fallbackId;
      }
    } else {
      id = pageValid ?? themeValid ?? fallbackId;
    }
    const entry = table[id] ?? table[fallbackId];
    const result = entry.render(ctx, args?.(ctx));
    return { id, result };
  }
  return {
    open: (ctx) => {
      const { id, result } = resolveVariant(ctx);
      const resolveDefaultText = () => {
        if (!title?.defaultText) return "";
        return typeof title.defaultText === "function" ? title.defaultText(ctx) : title.defaultText;
      };
      const titleText = title ? ctx.info.trim() || resolveDefaultText() : "";
      const willEmitTitle = !!title && titleText !== "" && result.titleCSS !== "";
      const parts = [];
      parts.push(
        `<section class="container-${name} container-${name}--${id}" style="${result.wrapperCSS}">`
      );
      if (result.svgSlot) parts.push(result.svgSlot);
      if (willEmitTitle && title) {
        const titleCss = result.titleCSS ?? (typeof title.defaultCSS === "function" ? title.defaultCSS(ctx) : title.defaultCSS);
        const icon = title.iconKey && !result.suppressIcon ? ctx.assets[title.iconKey] ?? "" : "";
        parts.push(
          `<section class="container-${name}__title" style="${titleCss}">${icon}${escText(titleText)}</section>`
        );
      }
      if (body && body.mode === "optional" && result.bodyCSS) {
        parts.push(`<section class="container-${name}__body" style="${result.bodyCSS}">`);
      }
      return parts.join("\n") + "\n";
    },
    close: (ctx) => {
      if (!body) return "</section>\n";
      const { result } = resolveVariant(ctx);
      return (result.bodyCSS ? "</section>\n" : "") + "</section>\n";
    }
  };
}
const DEFAULT_TITLES = {
  tip: "小贴士",
  warning: "注意",
  info: "说明",
  danger: "警告"
};
function build(kind) {
  return makeVariantContainer({
    name: kind,
    themeSlot: "admonition",
    table: ADMONITION_VARIANTS,
    fallbackId: "accent-bar",
    args: () => ({ kind }),
    title: {
      defaultText: DEFAULT_TITLES[kind],
      defaultCSS: (ctx) => `font-weight:700;color:${ctx.tokens.colors.status[kind].accent};margin-bottom:6px;letter-spacing:0.3px`,
      iconKey: `${kind}Icon`
    },
    body: { mode: "optional" }
  });
}
const tipContainer = build("tip");
const warningContainer = build("warning");
const infoContainer = build("info");
const dangerContainer = build("danger");
function resolveVariantId(ctx, slot, table, fallback) {
  const override = ctx.attrs.variant;
  if (override && override in table) return override;
  const themeChoice = ctx.variants[slot];
  if (themeChoice && themeChoice in table) return themeChoice;
  return fallback;
}
function resolveVariantWithUv(ctx, slot, table, fallback, args) {
  const rawOverride = ctx.attrs.variant;
  if (rawOverride) {
    const normalized = rawOverride.toLowerCase().trim();
    if (normalized.startsWith("uv_")) {
      const uv = ctx.userVariants?.get(normalized);
      if (uv && isAppliableUserVariant(uv) && uv.base.kind === slot) {
        const baseEntry = table[uv.base.variantId];
        if (baseEntry?.render) {
          const baseResult = baseEntry.render(ctx, args?.(ctx));
          return { id: uv.base.variantId, result: applyUserVariant(uv, baseResult) };
        }
      }
    }
  }
  const id = resolveVariantId(ctx, slot, table, fallback);
  const result = table[id].render(ctx, args?.(ctx));
  return { id, result };
}
const introContainer = {
  open: (ctx) => {
    const title = ctx.info.trim();
    const head = title ? `<section class="container-intro__title" style="font-weight:700;margin-bottom:10px">${escText(title)}</section>` : "";
    return `<section class="container-intro">
${head}`;
  },
  close: "</section>\n"
};
function resolveIssueStamp(ctx) {
  const stamp = ctx.assets.issueStamp;
  if (!stamp) return "";
  const issue = ctx.attrs.issue ?? "";
  const date = ctx.attrs.date ?? "";
  const kind = ctx.attrs.kind ?? "";
  if (!issue && !date && !kind) return "";
  return stamp(issue, date, kind);
}
const coverContainer = {
  open: (ctx) => {
    const title = ctx.info.trim();
    const head = title ? `<section class="container-cover__title" style="text-align:center;font-weight:700;font-size:18px;margin-bottom:10px">${escText(title)}</section>` : "";
    const stamp = resolveIssueStamp(ctx);
    const stampEl = stamp ? `<section class="container-cover__stamp" style="margin-top:12px;text-align:center">${stamp}</section>` : "";
    return `<section class="container-cover">
${head}${stampEl}`;
  },
  close: "</section>\n"
};
const authorContainer = {
  open: (ctx) => {
    const name = ctx.info.trim() || "作者";
    const role = ctx.attrs.role ? `<span style="color:${ctx.tokens.colors.textMuted};margin-left:8px">${escText(ctx.attrs.role)}</span>` : "";
    const stamp = resolveIssueStamp(ctx);
    const stampEl = stamp ? `<span class="container-author__stamp" style="margin-left:10px;vertical-align:middle">${stamp}</span>` : "";
    return `<section class="container-author">
<section class="container-author__header" style="margin-bottom:8px"><strong>${escText(name)}</strong>${role}${stampEl}</section>
`;
  },
  close: "</section>\n"
};
const sectionTitleContainer = {
  open: (ctx) => {
    const title = ctx.info.trim();
    const id = resolveVariantId(
      ctx,
      "sectionTitle",
      SECTION_TITLE_VARIANTS,
      "bordered"
    );
    const result = SECTION_TITLE_VARIANTS[id].render(ctx);
    const parts = [];
    parts.push(`<section class="container-section-title container-section-title--${id}" style="${result.wrapperCSS}">`);
    if (title) {
      const corner = result.svgSlot ?? "";
      const ts = result.titleCSS ?? "font-weight:700;font-size:20px";
      parts.push(`<section class="container-section-title__label" style="${ts}">${corner}${escText(title)}</section>`);
    }
    return parts.join("\n") + "\n";
  },
  close: "</section>\n"
};
function defaultBylineCSS$1(ctx) {
  return `text-align:center;color:${ctx.tokens.colors.textMuted};margin-top:2px;font-size:13px`;
}
const quoteCardContainer = {
  open: (ctx) => {
    const { id, result } = resolveVariantWithUv(ctx, "quote", QUOTE_VARIANTS, "classic");
    const parts = [];
    parts.push(`<section class="container-quote-card container-quote-card--${id}" style="${result.wrapperCSS}">`);
    if (result.svgSlot) parts.push(result.svgSlot);
    parts.push(`<section class="container-quote-card__body" style="${result.bodyCSS ?? ""}">`);
    return parts.join("\n") + "\n";
  },
  close: (ctx) => {
    const { result } = resolveVariantWithUv(ctx, "quote", QUOTE_VARIANTS, "classic");
    const closeSlot = result.closeSlot ?? "";
    const byline = ctx.info.trim();
    if (!byline) return `</section>
${closeSlot}</section>
`;
    const css = result.bylineCSS ?? defaultBylineCSS$1(ctx);
    const prefix = result.bylinePrefix ?? "— ";
    const sig = `<section class="container-quote-card__byline" style="${css}">${escText(prefix)}${escText(byline)}</section>`;
    return `</section>
${sig}
${closeSlot}</section>
`;
  }
};
const highlightContainer = {
  open: (ctx) => {
    const { id, result } = resolveVariantWithUv(ctx, "highlight", HIGHLIGHT_VARIANTS, "plain");
    const cls = `container-highlight container-highlight--${id}`;
    const style = result.wrapperCSS ? ` style="${result.wrapperCSS}"` : "";
    return `<section class="${cls}"${style}>
`;
  },
  close: "</section>\n"
};
const compareContainer = {
  open: (ctx) => {
    const id = resolveVariantId(ctx, "compare", COMPARE_VARIANTS, "column-card");
    const result = COMPARE_VARIANTS[id].render(ctx, { slot: "wrapper" });
    return `<section class="container-compare container-compare--${id}" style="${result.wrapperCSS}">
`;
  },
  close: "</section>\n"
};
function makeColumn(slot, defaultTitle) {
  return makeVariantContainer({
    name: slot,
    themeSlot: "compare",
    table: COMPARE_VARIANTS,
    fallbackId: "column-card",
    args: () => ({ slot }),
    title: {
      defaultText: defaultTitle,
      defaultCSS: "font-weight:700;margin-bottom:6px"
    }
  });
}
const prosContainer = makeColumn("pros", "优点");
const consContainer = makeColumn("cons", "缺点");
const stepsContainer = makeVariantContainer({
  name: "steps",
  themeSlot: "steps",
  table: STEPS_VARIANTS,
  fallbackId: "number-circle",
  title: {
    // 无 defaultText：steps 标题仅在 markdown info 写了内容时才出现
    defaultCSS: "font-weight:700;margin-bottom:12px"
  },
  // bodyCSS truthy 时（如 step-card 的浅底卡片）包一层 body；其余 variant 留空 bodyCSS 即跳过。
  body: { mode: "optional" }
});
const dividerContainer = makeVariantContainer({
  name: "divider",
  themeSlot: "divider",
  table: DIVIDER_VARIANTS,
  fallbackId: "rule",
  resolveAlias: (raw) => raw === "line" ? "rule" : void 0
  // 无 title / 无 body：divider 的视觉完全由 variant 的 svgSlot 承担
});
function encodeQrSvg(text, opts = {}) {
  const ecc = opts.ecc ?? "M";
  const margin = opts.margin ?? 4;
  const fg = opts.fg ?? "#000";
  const bg = opts.bg ?? "#fff";
  const q = qrcode(0, ecc);
  q.addData(text, "Byte");
  q.make();
  const n = q.getModuleCount();
  const total = n + margin * 2;
  const parts = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (q.isDark(y, x)) parts.push(`M${x + margin} ${y + margin}h1v1h-1z`);
    }
  }
  const sizeAttrs = opts.size ? ` width="${opts.size}" height="${opts.size}"` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}"${sizeAttrs} shape-rendering="crispEdges"><rect width="${total}" height="${total}" fill="${bg}"/><path d="${parts.join("")}" fill="${fg}"/></svg>`;
}
function resolveIssueStampForFooter(ctx) {
  const stamp = ctx.assets.issueStamp;
  if (!stamp) return "";
  const issue = ctx.attrs.issue ?? "";
  const date = ctx.attrs.date ?? "";
  const kind = ctx.attrs.kind ?? "";
  if (!issue && !date && !kind) return "";
  return stamp(issue, date, kind);
}
function renderTriptychActions(ctx) {
  const c = ctx.tokens.colors;
  const like = ctx.attrs.like ?? "♡ 赞同";
  const star = ctx.attrs.star ?? "★ 收藏";
  const share = ctx.attrs.share ?? "↗ 转发";
  const kicker = ctx.info.trim();
  const wrapperLayoutCSS = kicker ? "" : `display:table;width:100%;table-layout:fixed;border-collapse:collapse;`;
  const baseCell = [
    "display:table-cell",
    "padding:12px 0",
    "text-align:center",
    "font-size:11px",
    "letter-spacing:0.1em",
    "box-sizing:border-box"
  ];
  const outlineCellLeftMid = [
    ...baseCell,
    `color:${c.text}`,
    `border-right:1px solid ${c.text}`
  ].join(";");
  const outlineCellRight = [...baseCell, `color:${c.text}`].join(";");
  const fillCell = [
    ...baseCell,
    `background-color:${c.primary}`,
    `color:${c.textInverse}`,
    "font-weight:500",
    `border-right:1px solid ${c.text}`
  ].join(";");
  const cellsCSS = `display:table;width:100%;table-layout:fixed;border-collapse:collapse`;
  const cells = `<span style="${outlineCellLeftMid}">${escText(like)}</span><span style="${fillCell}">${escText(star)}</span><span style="${outlineCellRight}">${escText(share)}</span>`;
  if (kicker) {
    const headerCSS = [
      "display:block",
      `background-color:${c.text}`,
      `color:${c.textInverse}`,
      "padding:5px 10px",
      "font-size:10px",
      "letter-spacing:0.2em",
      "font-weight:700"
    ].join(";");
    return `<section class="container-footer-cta container-footer-cta--triptych-actions"><section class="container-footer-cta__kicker" style="${headerCSS}">${escText(kicker)}</section><section class="container-footer-cta__cells" style="${cellsCSS}">${cells}</section></section>
`;
  }
  return `<section class="container-footer-cta container-footer-cta--triptych-actions" style="${wrapperLayoutCSS}">${cells}</section>
`;
}
const footerCTAContainer = {
  open: (ctx) => {
    const id = resolveVariantId(
      ctx,
      "footerCTA",
      FOOTER_CTA_VARIANTS,
      "button-led"
    );
    if (id === "triptych-actions") {
      return renderTriptychActions(ctx);
    }
    const title = ctx.info.trim() || ctx.kickers.footerCTATitle;
    const cta = ctx.attrs.cta ? escText(ctx.attrs.cta) : "";
    const href = ctx.attrs.href ?? "";
    const pill = `display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:6px 18px;box-sizing:border-box;border-radius:${ctx.tokens.radius.lg}px;background-color:${ctx.tokens.colors.primary};color:${ctx.tokens.colors.textInverse};text-decoration:none`;
    const ctaInner = cta ? href ? `<a href="${escAttr(href)}" data-wx-footer-cta="" style="${pill}">${cta}</a>` : `<span style="${pill}">${cta}</span>` : "";
    const ctaEl = ctaInner ? `<section class="container-footer-cta__cta" style="text-align:center;margin-top:10px">${ctaInner}</section>` : "";
    const stamp = resolveIssueStampForFooter(ctx);
    const stampEl = stamp ? `<section class="container-footer-cta__stamp" style="text-align:center;margin-bottom:10px">${stamp}</section>` : "";
    return `<section class="container-footer-cta container-footer-cta--button-led" style="text-align:center">
` + stampEl + `<section class="container-footer-cta__title" style="font-weight:700;font-size:16px;margin-bottom:8px">${escText(title)}</section>
` + ctaEl + `
`;
  },
  // sealMark 可选注入（literary-humanism 等"稀缺色"主题专用）。
  // 主题不提供时保持原行为；提供时在容器末尾追加一个**居中**的收束印——
  // 朱砂作为文章 closure 的视觉焦点，居中比右下更稳：移动端窄屏右对齐易被
  // 边距裁切；居中又恰好对齐 footer 内的标题/按钮居中节律。
  // triptych-actions variant 已在 open 闭合自身 section，close 返回空串。
  close: (ctx) => {
    const id = resolveVariantId(
      ctx,
      "footerCTA",
      FOOTER_CTA_VARIANTS,
      "button-led"
    );
    if (id === "triptych-actions") return "";
    const seal = ctx.assets.sealMark ? `<section class="container-footer-cta__seal" style="text-align:center;margin-top:18px;line-height:0">${ctx.assets.sealMark}</section>
` : "";
    return seal + "</section>\n";
  }
};
const recommendContainer = makeVariantContainer({
  name: "recommend",
  themeSlot: "recommend",
  table: RECOMMEND_VARIANTS,
  fallbackId: "card-list",
  title: {
    defaultText: (ctx) => ctx.kickers.recommend,
    defaultCSS: "font-weight:700;margin-bottom:10px"
  }
});
function renderInlineQr(ctx) {
  const text = ctx.attrs.text;
  if (!text) return "";
  const ecc = (ctx.attrs.ecc ?? "M").toUpperCase();
  const allowedEcc = ["L", "M", "Q", "H"];
  const eccSafe = allowedEcc.includes(ecc) ? ecc : "M";
  const sizePx = Number(ctx.attrs.size ?? "") || 160;
  let svg2;
  try {
    svg2 = encodeQrSvg(text, {
      ecc: eccSafe,
      fg: ctx.tokens.colors.text,
      bg: ctx.tokens.colors.bg,
      size: sizePx
    });
  } catch (err) {
    return `<section class="container-qrcode__error" style="color:${ctx.tokens.colors.textMuted};font-size:12px">[QR 编码失败：${escText(String(err))}]</section>
`;
  }
  return `<section class="container-qrcode__qr" style="display:inline-block;margin-bottom:8px">${svg2}</section>
`;
}
function renderEmbeddedQr(ctx, size) {
  const c = ctx.tokens.colors;
  const qrUrl = ctx.attrs.qr ?? "";
  const qrImgCSS = `display:block;width:${size}px;height:${size}px`;
  if (ctx.attrs.text) {
    return renderInlineQr(ctx).replace(/margin-bottom:8px/, qrImgCSS);
  }
  if (qrUrl) {
    return `<img src="${escAttr(qrUrl)}" alt="QR" style="${qrImgCSS}"/>`;
  }
  const eyeHole = c.bg;
  return `<svg viewBox="0 0 60 60" width="${size}" height="${size}" style="${qrImgCSS}"><g fill="${c.text}"><rect x="3" y="3" width="16" height="16"/><rect x="6" y="6" width="10" height="10" fill="${eyeHole}"/><rect x="9" y="9" width="4" height="4"/><rect x="41" y="3" width="16" height="16"/><rect x="44" y="6" width="10" height="10" fill="${eyeHole}"/><rect x="47" y="9" width="4" height="4"/><rect x="3" y="41" width="16" height="16"/><rect x="6" y="44" width="10" height="10" fill="${eyeHole}"/><rect x="9" y="47" width="4" height="4"/><rect x="24" y="24" width="3" height="3"/><rect x="30" y="24" width="3" height="3"/><rect x="36" y="27" width="3" height="3"/><rect x="24" y="30" width="3" height="3"/><rect x="33" y="30" width="3" height="3"/><rect x="27" y="36" width="3" height="3"/><rect x="36" y="36" width="3" height="3"/><rect x="42" y="39" width="3" height="3"/><rect x="24" y="42" width="3" height="3"/><rect x="39" y="45" width="3" height="3"/><rect x="27" y="48" width="3" height="3"/></g></svg>`;
}
const qrcodeContainer = {
  open: (ctx) => {
    const id = resolveVariantId(ctx, "qrcode", QRCODE_VARIANTS, "bare");
    if (id === "qr-stack") {
      const c = ctx.tokens.colors;
      const kicker = ctx.attrs.kicker ?? ctx.kickers.qrFollowKicker;
      const title = ctx.info.trim() || ctx.kickers.qrFollowTitle;
      const desc2 = ctx.attrs.desc ?? "";
      const qrEl = renderEmbeddedQr(ctx, 96);
      const qrWrapCSS = "text-align:center;line-height:0;margin-bottom:12px";
      const kickerCSS = [
        "font-family:Menlo,Monaco,monospace",
        "font-size:10px",
        "font-weight:700",
        `color:${c.primary}`,
        "letter-spacing:0.25em",
        "text-align:center"
      ].join(";");
      const titleCSS = [
        "font-size:15px",
        "font-weight:700",
        `color:${c.text}`,
        "margin-top:6px",
        "text-align:center",
        "letter-spacing:-0.01em"
      ].join(";");
      const descCSS = [
        "font-size:11px",
        `color:${c.textMuted}`,
        "margin-top:4px",
        "line-height:1.5",
        "text-align:center"
      ].join(";");
      const descEl2 = desc2 ? `<section style="${descCSS}">${escText(desc2)}</section>` : "";
      return `<section class="container-qrcode container-qrcode--qr-stack" style="text-align:center"><section style="${qrWrapCSS}">${qrEl}</section><section style="${kickerCSS}">${escText(kicker)}</section><section style="${titleCSS}">${escText(title)}</section>` + descEl2 + `</section>
`;
    }
    if (id === "follow-card") {
      const c = ctx.tokens.colors;
      const kicker = ctx.attrs.kicker ?? ctx.kickers.qrFollowKicker;
      const title = ctx.info.trim() || ctx.kickers.qrFollowTitle;
      const desc2 = ctx.attrs.desc ?? "";
      const wrapperCSS = `display:table;width:100%;table-layout:auto;border-collapse:collapse`;
      const qrCellCSS = [
        "display:table-cell",
        "vertical-align:middle",
        "padding:12px",
        `border-right:1px solid ${c.text}`,
        `background-color:${c.bg}`
      ].join(";");
      const textCellCSS = "display:table-cell;vertical-align:middle;padding:10px 14px";
      const kickerCSS = [
        "font-family:Menlo,Monaco,monospace",
        "font-size:9px",
        "font-weight:700",
        `color:${c.primary}`,
        "letter-spacing:0.2em"
      ].join(";");
      const titleCSS = [
        "font-size:14px",
        "font-weight:700",
        `color:${c.text}`,
        "margin-top:4px",
        "letter-spacing:-0.01em"
      ].join(";");
      const descCSS = [
        "font-size:10px",
        `color:${c.textMuted}`,
        "margin-top:4px",
        "line-height:1.5"
      ].join(";");
      const descEl2 = desc2 ? `<section style="${descCSS}">${escText(desc2)}</section>` : "";
      const qrEl = renderEmbeddedQr(ctx, 64);
      return `<section class="container-qrcode container-qrcode--follow-card" style="${wrapperCSS}"><span style="${qrCellCSS}">${qrEl}</span><span style="${textCellCSS}"><section style="${kickerCSS}">${escText(kicker)}</section><section style="${titleCSS}">${escText(title)}</section>` + descEl2 + `</span></section>
`;
    }
    const caption = ctx.info.trim();
    const cap = caption ? `<section class="container-qrcode__caption" style="text-align:center;color:${ctx.tokens.colors.textMuted};margin-bottom:8px">${escText(caption)}</section>` : "";
    const desc = ctx.attrs.desc ?? "";
    const descEl = desc ? `<section class="container-qrcode__desc" style="text-align:center;color:${ctx.tokens.colors.textMuted};font-size:12px;line-height:1.5;margin-top:4px">${escText(desc)}</section>` : "";
    const sizePx = Number(ctx.attrs.size ?? "") || 160;
    const qr = ctx.attrs.text ? renderInlineQr(ctx) : `<section class="container-qrcode__qr" style="display:inline-block;margin-bottom:8px">${renderEmbeddedQr(ctx, sizePx)}</section>
`;
    return `<section class="container-qrcode container-qrcode--bare" style="text-align:center">
${qr}${cap}${descEl}
`;
  },
  close: (ctx) => {
    const id = resolveVariantId(ctx, "qrcode", QRCODE_VARIANTS, "bare");
    return id === "follow-card" || id === "qr-stack" ? "" : "</section>\n";
  }
};
function inlineCss(obj) {
  if (!obj) return "";
  const decls = [];
  for (const [k, raw] of Object.entries(obj)) {
    if (raw === void 0 || raw === null || raw === "") continue;
    const v = typeof raw === "number" ? `${raw}px` : String(raw).trim();
    if (!v) continue;
    decls.push(`${k.trim()}:${v}`);
  }
  return decls.join(";");
}
const voiceCardContainer = {
  open: (ctx) => {
    const title = ctx.info.trim() || "音频";
    const fileid = ctx.attrs.voice_encode_fileid ?? ctx.attrs.fileid;
    const hint = fileid ? `已携带 fileid=${escText(fileid)}，粘贴到公众号后自动展开` : '粘贴到公众号后请手动选择"插入音频"';
    const label = ctx.tokens.colors.primary;
    const fidAttr = fileid ? ` data-wx-mp-fileid="${escAttr(fileid)}"` : "";
    const nameAttr = ` data-wx-mp-name="${escAttr(title)}"`;
    const wrapperCSS = inlineCss(ctx.containers.voiceCard) + ";text-align:center";
    return `<section class="container-voice-card" data-wx-mp-kind="voice"${fidAttr}${nameAttr} style="${wrapperCSS}">
<section style="font-size:12px;letter-spacing:1px;color:${label};margin-bottom:6px">[ 音频 ]</section>
<section style="font-weight:700;margin-bottom:6px">${escText(title)}</section>
<section style="font-size:13px">${hint}</section>
`;
  },
  close: "</section>\n"
};
const videoCardContainer = {
  open: (ctx) => {
    const title = ctx.info.trim() || "视频";
    const qqvid = ctx.attrs.qqvid ?? ctx.attrs.vid;
    if (qqvid) {
      const src = `https://v.qq.com/txp/iframe/player.html?vid=${encodeURIComponent(qqvid)}`;
      return `<section class="container-video-card" data-wx-mp-kind="video" data-wx-mp-vid="${escAttr(qqvid)}">
<iframe src="${escAttr(src)}" frameborder="0" width="100%" height="220" allowfullscreen="true" title="${escAttr(title)}"></iframe>
`;
    }
    const label = ctx.tokens.colors.primary;
    const fileid = ctx.attrs.fileid ?? ctx.attrs.video_encode_fileid;
    const fidAttr = fileid ? ` data-wx-mp-fileid="${escAttr(fileid)}"` : "";
    const nameAttr = ` data-wx-mp-name="${escAttr(title)}"`;
    const wrapperCSS = inlineCss(ctx.containers.videoCard) + ";text-align:center";
    return `<section class="container-video-card" data-wx-mp-kind="video"${fidAttr}${nameAttr} style="${wrapperCSS}">
<section style="font-size:12px;letter-spacing:1px;color:${label};margin-bottom:6px">[ 视频 ]</section>
<section style="font-weight:700;margin-bottom:6px">${escText(title)}</section>
<section style="font-size:13px">粘贴到公众号后请手动选择"插入视频"</section>
`;
  },
  close: "</section>\n"
};
const noteContainer = makeVariantContainer({
  name: "note",
  themeSlot: "note",
  table: NOTE_VARIANTS,
  fallbackId: "minimal-callout",
  title: {
    defaultText: "补注",
    defaultCSS: "font-weight:600;font-size:13px",
    iconKey: "noteIcon"
  },
  body: { mode: "optional" }
});
const announcementContainer = makeVariantContainer({
  name: "announcement",
  themeSlot: "announcement",
  table: ANNOUNCEMENT_VARIANTS,
  fallbackId: "danger-bar",
  title: {
    defaultCSS: "font-weight:700;font-size:14px;letter-spacing:0.5px;margin-bottom:6px"
  },
  body: { mode: "optional" }
});
const authorBioContainer = {
  open: (ctx) => {
    const name = ctx.attrs.name ?? ctx.info.trim();
    const role = ctx.attrs.role ?? "";
    const avatar = ctx.attrs.avatar ?? "";
    const wrapperCSS = inlineCss(ctx.containers.authorBio);
    const nameCSS = `font-weight:700;font-size:15px;color:${ctx.tokens.colors.text};margin-bottom:2px`;
    const roleCSS = `font-size:12px;color:${ctx.tokens.colors.textMuted};letter-spacing:0.5px;margin-bottom:8px`;
    const avatarHtml = avatar ? `<img src="${escAttr(avatar)}" alt="${escAttr(name || "author")}" style="display:inline-block;width:48px;height:48px;border-radius:24px;vertical-align:middle;margin-right:12px;object-fit:cover" />` : "";
    const nameRow = name ? `<section class="container-author-bio__name" style="${nameCSS}">${escText(name)}</section>
` : "";
    const roleRow = role ? `<section class="container-author-bio__role" style="${roleCSS}">${escText(role)}</section>
` : "";
    const headRow = avatarHtml || nameRow || roleRow ? `<section style="margin-bottom:8px">${avatarHtml}<section style="display:inline-block;vertical-align:middle">${nameRow}${roleRow}</section></section>
` : "";
    return `<section class="container-author-bio" style="${wrapperCSS}">
${headRow}`;
  },
  close: "</section>\n"
};
const imageCaptionContainer = {
  open: (ctx) => {
    const caption = ctx.info.trim();
    const src = ctx.attrs.src ?? "";
    const alt = ctx.attrs.alt ?? caption;
    const wrapperCSS = inlineCss(ctx.containers.imageCaption);
    const imgHtml = src ? `<img src="${escAttr(src)}" alt="${escAttr(alt)}" style="max-width:100%;display:block;margin:0 auto 6px;border-radius:4px" />
` : "";
    const captionCSS = `font-size:12px;color:${ctx.tokens.colors.textMuted};letter-spacing:0.5px;line-height:1.6;text-align:center;margin-bottom:6px`;
    const captionRow = caption ? `<section class="container-image-caption__caption" style="${captionCSS}">${escText(caption)}</section>
` : "";
    return `<section class="container-image-caption" style="${wrapperCSS}">
${imgHtml}${captionRow}`;
  },
  close: "</section>\n"
};
const timelineContainer = {
  open: (ctx) => {
    const title = ctx.info.trim();
    const wrapperCSS = inlineCss(ctx.containers.timeline);
    const titleCSS = `font-weight:700;font-size:14px;color:${ctx.tokens.colors.text};letter-spacing:0.5px;margin-bottom:10px`;
    const titleRow = title ? `<section class="container-timeline__title" style="${titleCSS}">${escText(title)}</section>
` : "";
    return `<section class="container-timeline" style="${wrapperCSS}">
${titleRow}`;
  },
  close: "</section>\n"
};
const timelineItemContainer = {
  open: (ctx) => {
    const year = ctx.attrs.year ?? "";
    const title = ctx.info.trim();
    const rowCSS = `display:table;width:100%;table-layout:fixed;margin-bottom:10px`;
    const yearCSS = [
      "display:table-cell",
      "vertical-align:top",
      "width:64px",
      "font-family:Menlo,Monaco,monospace",
      `color:${ctx.tokens.colors.primary}`,
      "font-size:12px",
      "font-weight:700",
      "letter-spacing:0.5px",
      "padding-right:12px"
    ].join(";");
    const bodyCSS = `display:table-cell;vertical-align:top`;
    const titleCSS = `font-weight:600;font-size:14px;color:${ctx.tokens.colors.text};margin-bottom:4px;line-height:1.5`;
    const titleRow = title ? `<section class="container-timeline-item__title" style="${titleCSS}">${escText(title)}</section>
` : "";
    return `<section class="container-timeline-item" style="${rowCSS}">
<span style="${yearCSS}">${escText(year)}</span><span style="${bodyCSS}">${titleRow}`;
  },
  close: "</span></section>\n"
};
const abstractContainer = {
  open: (ctx) => {
    const title = ctx.info.trim() || "摘要";
    const wrapperCSS = inlineCss(ctx.containers.abstract);
    const kickerCSS = inlineCss(ctx.innerStyles.abstractKicker);
    return `<section class="container-abstract" style="${wrapperCSS}">
<section class="container-abstract__kicker" style="${kickerCSS}">${escText(title)}</section>
`;
  },
  close: "</section>\n"
};
const keyNumberContainer = {
  open: (ctx) => {
    const kicker = ctx.info.trim();
    const value = ctx.attrs.value ?? "0";
    const meta = ctx.attrs.meta ?? "";
    const wrapperCSS = inlineCss(ctx.containers.keyNumber);
    const valueCSS = inlineCss(ctx.innerStyles.keyNumberValue);
    const kickerCSS = inlineCss(ctx.innerStyles.keyNumberKicker);
    const kickerRow = kicker ? `<section class="container-key-number__kicker" style="${kickerCSS}">${escText(kicker)}</section>
` : "";
    const valueRow = `<section class="container-key-number__value" style="${valueCSS}">${escText(value)}</section>
`;
    if (meta) {
      const lines = meta.split(" / ").map((s) => s.trim()).filter(Boolean);
      const tableCSS = `display:table;width:100%;table-layout:auto`;
      const leftCellCSS = `display:table-cell;vertical-align:bottom`;
      const rightCellCSS = [
        "display:table-cell",
        "vertical-align:bottom",
        "text-align:right",
        "font-family:Menlo,Monaco,monospace",
        "font-size:9px",
        "line-height:1.6",
        "letter-spacing:0.1em",
        "white-space:nowrap",
        "padding-left:10px"
      ].join(";");
      const metaInner = lines.map((s) => `<span style="display:block">${escText(s)}</span>`).join("");
      return `<section class="container-key-number" style="${wrapperCSS}">
<section class="container-key-number__row" style="${tableCSS}"><span style="${leftCellCSS}">${kickerRow}${valueRow}</span><span class="container-key-number__meta" style="${rightCellCSS}">${metaInner}</span></section>
`;
    }
    return `<section class="container-key-number" style="${wrapperCSS}">
` + kickerRow + valueRow;
  },
  close: "</section>\n"
};
const mastheadContainer = {
  open: (ctx) => {
    const name = ctx.info.trim() || ctx.kickers.mastheadName;
    const issue = ctx.attrs.issue ?? "";
    const date = ctx.attrs.date ?? "";
    const kicker = ctx.attrs.kicker ?? "";
    const c = ctx.tokens.colors;
    const isRibbon = kicker !== "";
    const wrapperCSS = `display:table;width:100%;table-layout:${isRibbon ? "fixed" : "auto"};` + inlineCss(ctx.containers.masthead);
    if (isRibbon) {
      const sideCSS = [
        "display:table-cell",
        "vertical-align:baseline",
        "width:33.33%",
        `color:${c.text}`,
        "font-family:Menlo,Monaco,monospace",
        "font-size:10px",
        "letter-spacing:0.1em"
      ].join(";");
      const sideRightCSS = sideCSS + ";text-align:right";
      const nameCSS2 = [
        "display:table-cell",
        "vertical-align:baseline",
        "width:33.33%",
        `color:${c.primary}`,
        "font-family:Menlo,Monaco,monospace",
        "font-size:10px",
        "font-weight:700",
        "letter-spacing:0.1em",
        "text-align:center"
      ].join(";");
      return `<section class="container-masthead container-masthead--ribbon" style="${wrapperCSS}">
<span class="container-masthead__kicker" style="${sideCSS}">${escText(kicker)}</span><span class="container-masthead__name" style="${nameCSS2}">${escText(name)}</span><span class="container-masthead__date" style="${sideRightCSS}">${escText(date)}</span>
`;
    }
    const nameCSS = [
      "display:table-cell",
      "vertical-align:baseline",
      `color:${c.text}`,
      "font-size:13px",
      "font-weight:700",
      "letter-spacing:-0.01em"
    ].join(";");
    const metaCSS = [
      "display:table-cell",
      "vertical-align:baseline",
      "width:180px",
      `color:${c.textMuted}`,
      "font-family:Menlo,Monaco,monospace",
      "font-size:11px",
      "text-align:right"
    ].join(";");
    const metaText = issue || date ? `${issue ? `第 ${escText(issue)} 期` : ""}${issue && date ? " · " : ""}${date ? escText(date) : ""}` : "";
    return `<section class="container-masthead" style="${wrapperCSS}">
<span class="container-masthead__name" style="${nameCSS}">${escText(name)}</span>` + (metaText ? `<span class="container-masthead__meta" style="${metaCSS}">${metaText}</span>` : `<span style="${metaCSS}"></span>`) + `
`;
  },
  close: "</section>\n"
};
const sectionTagContainer = {
  open: (ctx) => {
    const label = ctx.info.trim() || "标签";
    const c = ctx.tokens.colors;
    const wrapperCSS = inlineCss(ctx.containers.sectionTag);
    const pillCSS = [
      "display:inline-block",
      `background-color:${c.primary}`,
      `color:${c.textInverse}`,
      "font-size:10px",
      "letter-spacing:0.15em",
      "padding:3px 8px"
    ].join(";");
    return `<section class="container-section-tag" style="${wrapperCSS}"><span class="container-section-tag__pill" style="${pillCSS}">${escText(label)}</span></section>
`;
  },
  close: ""
};
const bylineContainer = {
  open: (ctx) => {
    const c = ctx.tokens.colors;
    const cellsRaw = ctx.attrs.cells ?? "";
    const monospaceLast = ctx.attrs.monospaceLast === "true";
    const wrapperCSS = inlineCss(ctx.containers.byline);
    if (!cellsRaw) {
      return `<section class="container-byline" style="${wrapperCSS}">`;
    }
    const cells = cellsRaw.split("|").map((s) => s.trim()).filter(Boolean).map((seg) => {
      const idx = seg.indexOf(":");
      if (idx < 0) return { kicker: "", value: seg };
      return { kicker: seg.slice(0, idx).trim(), value: seg.slice(idx + 1).trim() };
    });
    const tableCSS = `display:table;width:100%;table-layout:fixed`;
    const baseCellCSS = `display:table-cell;vertical-align:top`;
    const kickerCSS = [
      "display:block",
      "font-size:9px",
      "letter-spacing:0.15em",
      `color:${c.textMuted}`,
      "margin-bottom:2px"
    ].join(";");
    const valueCSS = [
      "display:block",
      "font-size:12px",
      "font-weight:700",
      `color:${c.text}`
    ].join(";");
    const monoValueCSS = valueCSS + ";font-family:Menlo,Monaco,monospace";
    const cellHtml2 = cells.map((cell, i) => {
      const isFirst = i === 0;
      const isLast = i === cells.length - 1;
      const padLeft = isFirst ? "0" : "12px";
      const padRight = isLast ? "0" : "12px";
      const borderRight = isLast ? "" : `;border-right:1px solid ${c.text}`;
      const cellCSS = `${baseCellCSS};padding:6px ${padRight} 6px ${padLeft}${borderRight}`;
      const vCSS = monospaceLast && isLast ? monoValueCSS : valueCSS;
      const kickerEl = cell.kicker ? `<span style="${kickerCSS}">${escText(cell.kicker)}</span>` : "";
      return `<span class="container-byline__cell" style="${cellCSS}">` + kickerEl + `<span style="${vCSS}">${escText(cell.value)}</span></span>`;
    }).join("");
    return `<section class="container-byline" style="${wrapperCSS}"><section class="container-byline__row" style="${tableCSS}">${cellHtml2}</section></section>
`;
  },
  close: ""
};
const TITLE_DOT_KEYS = /* @__PURE__ */ new Set(["primary", "accent", "secondary"]);
const editorialHeaderContainer = {
  open: (ctx) => {
    const c = ctx.tokens.colors;
    const chip = ctx.attrs.chip ?? "";
    const pp = ctx.attrs.pp ?? "";
    const subtitle = ctx.attrs.subtitle ?? "";
    const titleDotKey = ctx.attrs.titleDot ?? "";
    const br = ctx.attrs.br ?? " / ";
    const topRulePx = Number(ctx.attrs.topRule ?? "0");
    const topRule2 = Number.isFinite(topRulePx) && topRulePx > 0 ? Math.floor(topRulePx) : 0;
    const dotColor = TITLE_DOT_KEYS.has(titleDotKey) ? c[titleDotKey] : "";
    const wrapperCSS = inlineCss(ctx.containers.editorialHeader);
    const topRuleEl = topRule2 > 0 ? `<section class="container-editorial-header__top-rule" style="border-top:${topRule2}px solid ${c.text};margin-bottom:12px"></section>
` : "";
    let chipRow = "";
    if (chip) {
      const chipRowCSS = `display:table;width:100%;table-layout:fixed;margin-bottom:12px`;
      const chipCellCSS = "display:table-cell;vertical-align:middle;width:80px";
      const chipPillCSS = [
        "display:inline-block",
        `background-color:${c.primary}`,
        `color:${c.textInverse}`,
        "font-size:10px",
        "font-weight:700",
        "padding:3px 8px",
        "line-height:1",
        "letter-spacing:0.05em"
      ].join(";");
      const ruleCellCSS = `display:table-cell;vertical-align:middle;padding:0 10px`;
      const ruleInnerCSS = `border-top:1px solid ${c.text};height:1px;font-size:0;line-height:0`;
      const ppCellCSS = [
        "display:table-cell",
        "vertical-align:middle",
        "width:60px",
        "font-family:Menlo,Monaco,monospace",
        "font-size:9px",
        "letter-spacing:0.2em",
        "text-align:right",
        `color:${c.text}`
      ].join(";");
      const ppCell = pp ? `<span style="${ppCellCSS}">${escText(pp)}</span>` : "";
      chipRow = `<section class="container-editorial-header__chip-row" style="${chipRowCSS}"><span style="${chipCellCSS}"><span style="${chipPillCSS}">${escText(chip)}</span></span><span style="${ruleCellCSS}"><span style="${ruleInnerCSS}">&nbsp;</span></span>` + ppCell + `</section>
`;
    }
    const segments = ctx.info.split(br).map((s) => s.trim()).filter(Boolean);
    const titleCSS = [
      "font-size:32px",
      "font-weight:700",
      "line-height:1.08",
      `color:${c.text}`,
      "letter-spacing:-0.03em",
      "margin:0 0 12px 0"
    ].join(";");
    const escapedSegments = segments.map(escText);
    const dotSuffix = dotColor ? `<span style="color:${dotColor}">.</span>` : "";
    const titleInner = escapedSegments.length > 0 ? escapedSegments.join("<br>") + dotSuffix : dotSuffix;
    const titleEl = titleInner ? `<section class="container-editorial-header__title" style="${titleCSS}">${titleInner}</section>
` : "";
    const subtitleCSS = [
      "font-size:13px",
      "font-weight:500",
      "line-height:1.4",
      `color:${c.text}`,
      "margin:0 0 14px 0"
    ].join(";");
    const subtitleEl = subtitle ? `<section class="container-editorial-header__subtitle" style="${subtitleCSS}">${escText(subtitle)}</section>
` : "";
    return `<section class="container-editorial-header" style="${wrapperCSS}">
` + topRuleEl + chipRow + titleEl + subtitleEl;
  },
  close: "</section>\n"
};
const tocContainer = {
  open: (ctx) => {
    const kicker = ctx.info.trim() || ctx.kickers.toc;
    const layout = ctx.attrs.layout ?? "default";
    const meta = ctx.attrs.meta ?? "";
    const c = ctx.tokens.colors;
    const wrapperCSS = inlineCss(ctx.containers.toc);
    const kickerCSS = [
      `color:${c.primary}`,
      "font-size:10px",
      "font-weight:700",
      "letter-spacing:0.15em",
      "margin-bottom:6px"
    ].join(";");
    if (layout === "split") {
      const tableCSS = `display:table;width:100%;table-layout:fixed`;
      const leftCellCSS = [
        "display:table-cell",
        "vertical-align:top",
        "width:33%",
        "padding:12px 14px 12px 0",
        `border-right:1px solid ${c.text}`
      ].join(";");
      const rightCellCSS = [
        "display:table-cell",
        "vertical-align:top",
        "padding:12px 0 12px 14px",
        "font-size:11px",
        "line-height:1.85"
      ].join(";");
      const metaLines = meta.split(" / ").map((s) => s.trim()).filter(Boolean);
      const metaInner = metaLines.map((s) => `<span style="display:block">${escText(s)}</span>`).join("");
      const metaCSS = [
        "font-size:9px",
        `color:${c.text}`,
        "line-height:1.7"
      ].join(";");
      const metaEl = metaLines.length ? `<section class="container-toc__meta" style="${metaCSS}">${metaInner}</section>` : "";
      return `<section class="container-toc container-toc--split" style="${wrapperCSS}"><section class="container-toc__row" style="${tableCSS}"><span class="container-toc__left" style="${leftCellCSS}"><section class="container-toc__kicker" style="${kickerCSS}">${escText(kicker)}</section>` + metaEl + `</span><span class="container-toc__right" style="${rightCellCSS}">
`;
    }
    return `<section class="container-toc" style="${wrapperCSS}">
<section class="container-toc__kicker" style="${kickerCSS}">${escText(kicker)}</section>
`;
  },
  close: (ctx) => {
    if ((ctx.attrs.layout ?? "default") === "split") {
      return `</span></section></section>
`;
    }
    return `</section>
`;
  }
};
const tocItemContainer = {
  open: (ctx) => {
    const no = ctx.attrs.no ?? "";
    const page = ctx.attrs.page ?? "";
    const title = ctx.info.trim();
    const c = ctx.tokens.colors;
    const wrapperCSS = [
      "display:table",
      "width:100%",
      "table-layout:auto",
      "font-size:12px",
      "line-height:1.75",
      "padding:1px 0"
    ].join(";");
    const noCSS = [
      "display:table-cell",
      "vertical-align:baseline",
      "width:30px",
      "padding-right:10px",
      "font-family:Menlo,Monaco,monospace",
      `color:${c.primary}`,
      "font-size:11px"
    ].join(";");
    const titleCSS = [
      "display:table-cell",
      "vertical-align:baseline",
      `color:${c.text}`
    ].join(";");
    const pageCSS = [
      "display:table-cell",
      "vertical-align:baseline",
      "width:56px",
      "padding-left:10px",
      "font-family:Menlo,Monaco,monospace",
      `color:${c.textMuted}`,
      "font-size:11px",
      "text-align:right"
    ].join(";");
    return `<section class="container-toc-item" style="${wrapperCSS}"><span style="${noCSS}">${escText(no)}</span><span style="${titleCSS}">${escText(title)}</span><span style="${pageCSS}">${escText(page)}</span></section>
`;
  },
  close: ""
};
const colophonContainer = {
  open: (ctx) => {
    const c = ctx.tokens.colors;
    const nextLine = ctx.attrs.next ?? "";
    const issueLine = ctx.attrs.issue ?? "";
    const themeStyle = inlineCss(ctx.containers.colophon);
    const fallback = [
      `border-top:1px solid ${c.text}`,
      "margin-top:20px",
      "padding-top:12px"
    ].join(";");
    const wrapperCSS = `display:table;width:100%;table-layout:fixed;font-size:11px;line-height:1.6;color:${c.text};${themeStyle || fallback}`;
    const cellLeftCSS = "display:table-cell;vertical-align:top";
    const cellRightCSS = "display:table-cell;vertical-align:top;text-align:right";
    const kickerCSS = [
      "display:block",
      `color:${c.textMuted}`,
      "font-size:10px",
      "letter-spacing:0.1em",
      "margin-bottom:3px"
    ].join(";");
    return `<section class="container-colophon" style="${wrapperCSS}"><span style="${cellLeftCSS}"><span style="${kickerCSS}">${escText(ctx.kickers.colophonNextLabel)}</span>${escText(nextLine)}</span><span style="${cellRightCSS}"><span style="${kickerCSS}">${escText(ctx.kickers.colophonIssueLabel)}</span>${escText(issueLine)}</span></section>
`;
  },
  close: ""
};
function parseSeries(raw) {
  if (!raw) return [];
  const out = [];
  for (const seg of raw.split(",")) {
    const n = Number(seg.trim());
    if (Number.isFinite(n)) out.push(n);
  }
  return out;
}
function pointsFromSeries(series, width = 110) {
  if (series.length === 0) return { points: "", lastY: 7 };
  if (series.length === 1) return { points: `0,7 ${width},7`, lastY: 7 };
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min;
  const step = width / (series.length - 1);
  const yMin = 2;
  const ySpan = 10;
  const toY = (v) => range === 0 ? 7 : yMin + (max - v) / range * ySpan;
  const points = series.map((v, i) => `${(i * step).toFixed(1)},${toY(v).toFixed(2)}`).join(" ");
  return { points, lastY: toY(series[series.length - 1]) };
}
function deltaTone(delta, c) {
  if (!delta) return c.textMuted;
  const t = delta.trim();
  if (t.startsWith("-") || t.startsWith("−")) return c.status.danger.accent;
  if (t.startsWith("+")) return c.status.danger.accent;
  return c.textMuted;
}
function trendStroke(trend, c) {
  if (trend === "flat") return c.textMuted;
  if (trend === "up" || trend === "down") return c.status.danger.accent;
  return c.textMuted;
}
const KPI_DASHBOARD_STACK = [];
const kpiDashboardContainer = {
  open: (ctx) => {
    const title = ctx.info.trim() || "KEY METRICS";
    const period = ctx.attrs.period ?? "";
    const source = ctx.attrs.source ?? "";
    KPI_DASHBOARD_STACK.push({ source, itemCount: 0 });
    const c = ctx.tokens.colors;
    const wrapperCSS = inlineCss(ctx.containers.kpiDashboard);
    const headerCSS = [
      "display:table",
      "width:100%",
      "table-layout:auto",
      "margin-bottom:14px",
      "padding-bottom:8px",
      `border-bottom:1px solid ${c.border}`
    ].join(";");
    const titleCSS = [
      "display:table-cell",
      "vertical-align:baseline",
      "font-family:Menlo,Monaco,monospace",
      `color:${c.text}`,
      "font-size:10px",
      "letter-spacing:0.15em"
    ].join(";");
    const periodCSS = [
      "display:table-cell",
      "vertical-align:baseline",
      "width:160px",
      "font-family:Menlo,Monaco,monospace",
      `color:${c.textMuted}`,
      "font-size:9px",
      "letter-spacing:0.05em",
      "text-align:right"
    ].join(";");
    const gridCSS = ["display:table", "width:100%", "table-layout:fixed"].join(";");
    return `<section class="container-kpi-dashboard" style="${wrapperCSS}">
<section class="container-kpi-dashboard__header" style="${headerCSS}"><span style="${titleCSS}">${escText(title)}</span><span style="${periodCSS}">${escText(period)}</span></section>
<section class="container-kpi-dashboard__grid" style="${gridCSS}">
`;
  },
  close: (ctx) => {
    const entry = KPI_DASHBOARD_STACK.pop();
    const source = entry?.source ?? "";
    const c = ctx.tokens.colors;
    const footCSS = [
      "margin-top:12px",
      "padding-top:8px",
      `border-top:1px solid ${c.border}`,
      "font-family:Menlo,Monaco,monospace",
      "font-size:9px",
      `color:${c.textMuted}`,
      "letter-spacing:0.05em"
    ].join(";");
    const footEl = source ? `<section class="container-kpi-dashboard__source" style="${footCSS}">SOURCE · ${escText(source)}</section>
` : "";
    return `</section>
${footEl}</section>
`;
  }
};
const kpiItemContainer = {
  open: (ctx) => {
    const label = ctx.attrs.label ?? "";
    const caption = ctx.attrs.caption ?? "";
    const value = ctx.attrs.value ?? "0";
    const unit = ctx.attrs.unit ?? "";
    const delta = ctx.attrs.delta ?? "";
    const trend = ctx.attrs.trend ?? "flat";
    const series = parseSeries(ctx.attrs.series);
    const foot = ctx.attrs.foot ?? "";
    const c = ctx.tokens.colors;
    const top = KPI_DASHBOARD_STACK[KPI_DASHBOARD_STACK.length - 1];
    const idx = top ? top.itemCount : 0;
    if (top) top.itemCount = idx + 1;
    const isFirst = idx === 0;
    const padLeft = isFirst ? 0 : 8;
    const padRight = 8;
    const wrapperCSS = [
      "display:table-cell",
      "vertical-align:top",
      "width:33.33%",
      `padding:0 ${padRight}px 0 ${padLeft}px`,
      `border-right:1px solid ${c.border}`
    ].join(";");
    const headerCSS = [
      "display:table",
      "width:100%",
      "table-layout:auto",
      "margin-bottom:12px"
    ].join(";");
    const labelCSS = [
      "display:table-cell",
      "vertical-align:baseline",
      "font-family:Menlo,Monaco,monospace",
      "font-size:9px",
      `color:${c.textMuted}`
    ].join(";");
    const deltaCSS = [
      "display:table-cell",
      "vertical-align:baseline",
      "width:60px",
      "font-family:Menlo,Monaco,monospace",
      "font-size:9px",
      `color:${deltaTone(delta, c)}`,
      "text-align:right"
    ].join(";");
    const captionCSS = ["font-size:10px", `color:${c.textMuted}`, "margin-bottom:2px"].join(";");
    const valueRowCSS = [
      "display:inline-block",
      "margin-bottom:10px",
      "vertical-align:baseline",
      "white-space:nowrap"
    ].join(";");
    const valueCSS = [
      "font-size:30px",
      "font-weight:700",
      "line-height:0.9",
      `color:${c.text}`,
      "letter-spacing:-0.03em"
    ].join(";");
    const unitCSS = [
      "font-size:11px",
      "font-weight:500",
      `color:${c.textMuted}`,
      "margin-left:3px"
    ].join(";");
    const footCSS = [
      "display:table",
      "width:100%",
      "table-layout:auto",
      "font-family:Menlo,Monaco,monospace",
      "font-size:9px",
      `color:${c.textMuted}`,
      "line-height:1.4",
      "margin-top:4px"
    ].join(";");
    const footLhsCSS = "display:table-cell;vertical-align:top;word-break:break-all";
    const footRhsCSS = "display:table-cell;vertical-align:top;text-align:right;padding-left:4px;word-break:break-all";
    const stroke = trendStroke(trend, c);
    const { points: pts, lastY } = pointsFromSeries(series);
    const svg2 = pts ? `<svg viewBox="0 0 110 14" width="100%" height="14" preserveAspectRatio="none" style="display:block"><line x1="0" y1="7" x2="110" y2="7" stroke="${c.border}" stroke-width="1"/><polyline points="${pts}" fill="none" stroke="${stroke}" stroke-width="1.2"/><circle cx="110" cy="${lastY.toFixed(2)}" r="2" fill="${stroke}"/></svg>` : "";
    const [lhs, rhs] = foot.includes("→") ? foot.split("→").map((s) => s.trim()) : [foot, ""];
    const footEl = lhs || rhs ? `<section style="${footCSS}"><span style="${footLhsCSS}">${escText(lhs)}</span><span style="${footRhsCSS}">${escText(rhs)}</span></section>` : "";
    return `<section class="container-kpi-item" style="${wrapperCSS}">
<section style="${headerCSS}"><span style="${labelCSS}">${escText(label)}</span><span style="${deltaCSS}">${escText(delta)}</span></section>
<section style="${captionCSS}">${escText(caption)}</section>
<section style="${valueRowCSS}"><span style="${valueCSS}">${escText(value)}</span><span style="${unitCSS}">${escText(unit)}</span></section>
` + svg2 + "\n" + footEl + `
`;
  },
  close: "</section>\n"
};
const BAR_CHART_STACK = [];
const DEFAULT_BAR_LABEL_WIDTH = "72px";
const DEFAULT_BAR_VALUE_WIDTH = "48px";
const CSS_LENGTH_RE = /^\d+(?:px|%|em|rem|ch)?$/;
function sanitizeLength(raw, fallback) {
  if (!raw) return fallback;
  const trimmed = raw.trim();
  if (!CSS_LENGTH_RE.test(trimmed)) return fallback;
  return /^\d+$/.test(trimmed) ? `${trimmed}px` : trimmed;
}
const barChartContainer = {
  open: (ctx) => {
    const title = ctx.info.trim() || "";
    const subtitle = ctx.attrs.subtitle ?? "";
    const labelWidth = sanitizeLength(ctx.attrs.labelWidth, DEFAULT_BAR_LABEL_WIDTH);
    const valueWidth = sanitizeLength(ctx.attrs.valueWidth, DEFAULT_BAR_VALUE_WIDTH);
    BAR_CHART_STACK.push({ labelWidth, valueWidth });
    const c = ctx.tokens.colors;
    const wrapperCSS = inlineCss(ctx.containers.barChart);
    const titleCSS = ["font-size:12px", "font-weight:700", `color:${c.text}`, "margin-bottom:4px"].join(";");
    const subtitleCSS = ["font-size:10px", `color:${c.textMuted}`, "margin-bottom:14px"].join(";");
    const titleEl = title ? `<section class="container-bar-chart__title" style="${titleCSS}">${escText(title)}</section>
` : "";
    const subEl = subtitle ? `<section class="container-bar-chart__subtitle" style="${subtitleCSS}">${escText(subtitle)}</section>
` : "";
    return `<section class="container-bar-chart" style="${wrapperCSS}">
${titleEl}${subEl}`;
  },
  close: () => {
    BAR_CHART_STACK.pop();
    return "</section>\n";
  }
};
const barContainer = {
  open: (ctx) => {
    const label = ctx.attrs.label ?? "";
    const pctRaw = Number(ctx.attrs.pct ?? "0");
    const pct = Number.isFinite(pctRaw) ? Math.max(0, Math.min(100, pctRaw)) : 0;
    const value = ctx.attrs.value ?? "";
    const tone = ctx.attrs.tone ?? "normal";
    const c = ctx.tokens.colors;
    const barColor = tone === "warn" ? c.status.danger.accent : c.primary;
    const parent = BAR_CHART_STACK[BAR_CHART_STACK.length - 1];
    const labelWidth = sanitizeLength(
      ctx.attrs.labelWidth,
      parent?.labelWidth ?? DEFAULT_BAR_LABEL_WIDTH
    );
    const valueWidth = sanitizeLength(
      ctx.attrs.valueWidth,
      parent?.valueWidth ?? DEFAULT_BAR_VALUE_WIDTH
    );
    const wrapperCSS = [
      "display:table",
      "width:100%",
      "table-layout:fixed",
      "font-family:Menlo,Monaco,monospace",
      "font-size:11px",
      "margin-bottom:6px"
    ].join(";");
    const labelCellCSS = [
      "display:table-cell",
      `width:${labelWidth}`,
      "vertical-align:middle",
      `color:${c.text}`
    ].join(";");
    const trackCellCSS = [
      "display:table-cell",
      "padding:0 6px",
      "vertical-align:middle"
    ].join(";");
    const valueCellCSS = [
      "display:table-cell",
      `width:${valueWidth}`,
      "vertical-align:middle",
      "text-align:right",
      `color:${c.text}`
    ].join(";");
    const trackCSS = [
      "display:block",
      "width:100%",
      `background-color:${c.border}`,
      "height:10px"
    ].join(";");
    const fillCSS = [
      "display:block",
      `background-color:${barColor}`,
      "height:10px",
      `width:${pct}%`
    ].join(";");
    return `<section class="container-bar" style="${wrapperCSS}"><span style="${labelCellCSS}">${escText(label)}</span><span style="${trackCellCSS}"><section style="${trackCSS}"><section style="${fillCSS}"></section></section></span><span style="${valueCellCSS}">${escText(value)}</span></section>
`;
  },
  close: ""
};
const qaBlockContainer = {
  open: (ctx) => {
    const { id, result } = resolveVariantWithUv(ctx, "qaBlock", QA_BLOCK_VARIANTS, "numbered-faq");
    const slots = result.qaBlock ?? { kickerHtml: "", qHtml: "", aOpenHtml: "" };
    return `<section class="container-qa-block container-qa-block--${id}" style="${result.wrapperCSS}">
` + slots.kickerHtml + slots.qHtml + slots.aOpenHtml;
  },
  close: (ctx) => {
    const { result } = resolveVariantWithUv(ctx, "qaBlock", QA_BLOCK_VARIANTS, "numbered-faq");
    const slots = result.qaBlock ?? { aCloseHtml: "" };
    return slots.aCloseHtml + "</section>\n";
  }
};
const footnotesContainer = makeVariantContainer({
  name: "footnotes",
  themeSlot: "footnotes",
  table: FOOTNOTES_VARIANTS,
  fallbackId: "lined",
  title: {
    // 不设 defaultText：info 为空时不渲染 kicker。
    defaultCSS: (ctx) => [
      `color:${ctx.tokens.colors.primary}`,
      "font-size:10px",
      "font-weight:700",
      "letter-spacing:0.15em",
      "margin-bottom:6px",
      "text-indent:0"
    ].join(";")
  }
});
function defaultQuoteCSS(ctx) {
  return [
    `color:${ctx.tokens.colors.text}`,
    "font-size:18px",
    "font-weight:600",
    "line-height:1.7",
    "letter-spacing:0.2px",
    "margin-top:0",
    "margin-bottom:0"
  ].join(";");
}
function defaultBylineCSS(ctx) {
  return [
    `color:${ctx.tokens.colors.textMuted}`,
    "font-size:13px",
    "line-height:1.6",
    "margin-top:10px",
    "text-align:left"
  ].join(";");
}
function resolve(ctx) {
  const table = PULL_QUOTE_VARIANTS;
  const raw = ctx.attrs.variant;
  if (raw) {
    const normalized = raw.toLowerCase().trim();
    if (normalized.startsWith("uv_")) {
      const uv = ctx.userVariants?.get(normalized);
      if (uv && isAppliableUserVariant(uv) && uv.base.kind === "pullQuote") {
        const baseEntry = table[uv.base.variantId];
        if (baseEntry?.render) {
          return { id: uv.id, result: applyUserVariant(uv, baseEntry.render(ctx)) };
        }
      }
    }
  }
  const id = resolveVariantId(ctx, "pullQuote", table, "giant-mark");
  return { id, result: table[id].render(ctx) };
}
const pullQuoteContainer = {
  open: (ctx) => {
    const { id, result } = resolve(ctx);
    const quoteCSS = result.quoteCSS ?? defaultQuoteCSS(ctx);
    const styleTag = `<style>.container-pull-quote--${id} > .container-pull-quote__body > p {${quoteCSS}}</style>`;
    const parts = [
      styleTag,
      `<section class="container-pull-quote container-pull-quote--${id}" style="${result.wrapperCSS}">`
    ];
    if (result.svgSlot) parts.push(result.svgSlot);
    parts.push(`<section class="container-pull-quote__body" style="${result.bodyCSS ?? ""}">`);
    return parts.join("\n") + "\n";
  },
  close: (ctx) => {
    const { result } = resolve(ctx);
    const byline = ctx.info.trim();
    if (!byline) return `</section>
</section>
`;
    const bylineCSS = result.bylineCSS ?? defaultBylineCSS(ctx);
    const prefix = result.bylinePrefix ?? "— ";
    const sig = `<section class="container-pull-quote__byline" style="${bylineCSS}">${escText(prefix)}${escText(byline)}</section>`;
    return `${sig}
</section>
</section>
`;
  }
};
const __vite_import_meta_env__ = { "DEV": false };
function isDev() {
  if (typeof import.meta === "undefined") return false;
  const env = __vite_import_meta_env__;
  if (!env) return false;
  return env.DEV === true;
}
function devWarn(scope, message) {
  if (!isDev()) return;
  console.warn(`[${scope}] ${message}`);
}
const TABLE_CARD_STACK = [];
function parseCells(raw) {
  if (!raw) return [];
  return raw.split("|").map((s) => s.trim());
}
function interpretStarPrefix(raw) {
  if (raw.startsWith("\\*")) return { recommend: false, text: raw.slice(1) };
  if (raw.startsWith("*")) return { recommend: true, text: raw.slice(1).trim() };
  return { recommend: false, text: raw };
}
const warnedShapes = /* @__PURE__ */ new Set();
function warnCellShape(variantId, kind, msg) {
  const key = `${variantId}::${kind}`;
  if (warnedShapes.has(key)) return;
  warnedShapes.add(key);
  console.warn(`[wechat-typeset] table-card[${variantId}] ${msg}`);
}
const tableCardContainer = {
  open: (ctx) => {
    const variantId = resolveVariantId(
      ctx,
      "tableCard",
      TABLE_CARD_VARIANTS,
      "rule-grid"
    );
    TABLE_CARD_STACK.push({
      variantId,
      rowCount: 0,
      columnsCount: 0,
      highlightCols: /* @__PURE__ */ new Set(),
      bodyRowsRendered: 0
    });
    const themeCSS = inlineCss(ctx.containers.tableCard);
    const variantResult = TABLE_CARD_VARIANTS[variantId].render(ctx);
    const wrapperCSS = [themeCSS, variantResult.wrapperCSS].filter(Boolean).join(";");
    const title = ctx.info.trim();
    const c = ctx.tokens.colors;
    const titleCSS = [
      "font-weight:700",
      "font-size:13px",
      `color:${c.text}`,
      "letter-spacing:0.5px",
      "margin-bottom:8px"
    ].join(";");
    const titleEl = title ? `<section class="container-table-card__title" style="${titleCSS}">${escText(title)}</section>
` : "";
    const gridSpacing = variantId === "price-tier" ? "3px 0" : "0";
    const gridCSS = [
      "display:table",
      "width:100%",
      "table-layout:fixed",
      "border-collapse:separate",
      `border-spacing:${gridSpacing}`
    ].join(";");
    return `<section class="container-table-card container-table-card--${variantId}" style="${wrapperCSS}">
` + titleEl + `<section class="container-table-card__grid" style="${gridCSS}">
`;
  },
  close: () => {
    TABLE_CARD_STACK.pop();
    return `</section>
</section>
`;
  }
};
const tableRowContainer = {
  open: (ctx) => {
    const top = TABLE_CARD_STACK[TABLE_CARD_STACK.length - 1];
    if (!top) return "";
    const isHeader = ctx.attrs.header === "true";
    const cells = parseCells(ctx.attrs.cells);
    if (top.rowCount === 0) {
      top.columnsCount = cells.length;
      if (top.variantId === "price-tier") {
        cells.forEach((cell, i) => {
          if (interpretStarPrefix(cell).recommend) top.highlightCols.add(i);
        });
      }
    } else if (cells.length !== top.columnsCount) {
      devWarn(
        "table-card:cells",
        `第 ${top.rowCount + 1} 行 cells 列数 ${cells.length} 与首行 ${top.columnsCount} 不一致：多余列被截断、缺失列留空。检查 attrs.cells 的 "|" 分隔符是否漏写或多写。`
      );
    }
    top.rowCount += 1;
    const bodyIdx = isHeader ? -1 : top.bodyRowsRendered;
    if (!isHeader) top.bodyRowsRendered += 1;
    switch (top.variantId) {
      case "zebra-rows":
        return renderZebraRow(ctx, cells, isHeader, bodyIdx);
      case "key-value":
        return renderKeyValueRow(ctx, cells, isHeader);
      case "price-tier":
        return renderPriceTierRow(ctx, cells, isHeader, bodyIdx, top.highlightCols);
      case "three-line-table":
        return renderThreeLineRow(ctx, cells, isHeader);
      case "index-table":
        return renderIndexTableRow(ctx, cells, isHeader);
      case "matrix":
        return renderMatrixRow(ctx, cells, isHeader);
      case "rule-grid":
      default:
        return renderRuleGridRow(ctx, cells, isHeader);
    }
  },
  close: ""
};
function stripStar(s) {
  return interpretStarPrefix(s).text;
}
function renderRuleGridRow(ctx, cells, isHeader) {
  const c = ctx.tokens.colors;
  const n = cells.length || 1;
  const w = (100 / n).toFixed(2);
  const rowCSS = "display:table-row";
  const bg = isHeader ? c.bgMuted : c.bg;
  const color = isHeader ? c.accent : c.text;
  const weight = isHeader ? 700 : 400;
  const cellHtml2 = cells.map((cell, i) => {
    const isLastCol = i === cells.length - 1;
    const cellCSS = [
      "display:table-cell",
      `width:${w}%`,
      "vertical-align:middle",
      `background-color:${bg}`,
      `color:${color}`,
      `font-weight:${weight}`,
      "font-size:13px",
      "line-height:1.5",
      "padding:8px 10px",
      `border-bottom:1px solid ${c.border}`,
      isLastCol ? "" : `border-right:1px solid ${c.border}`
    ].filter(Boolean).join(";");
    return `<span style="${cellCSS}">${escText(cell)}</span>`;
  }).join("");
  return `<section class="container-table-row" style="${rowCSS}">${cellHtml2}</section>
`;
}
function renderZebraRow(ctx, cells, isHeader, bodyIdx) {
  const c = ctx.tokens.colors;
  const n = cells.length || 1;
  const w = (100 / n).toFixed(2);
  const rowCSS = "display:table-row";
  const bg = isHeader ? "transparent" : bodyIdx % 2 === 0 ? c.bgSoft : c.bg;
  const color = isHeader ? c.textMuted : c.text;
  const weight = isHeader ? 700 : 400;
  const fontSize = isHeader ? "11px" : "13px";
  const letterSpacing = isHeader ? "0.1em" : "normal";
  const textTransform = isHeader ? "uppercase" : "none";
  const cellHtml2 = cells.map((cell) => {
    const cellCSS = [
      "display:table-cell",
      `width:${w}%`,
      "vertical-align:middle",
      `background-color:${bg}`,
      `color:${color}`,
      `font-weight:${weight}`,
      `font-size:${fontSize}`,
      `letter-spacing:${letterSpacing}`,
      `text-transform:${textTransform}`,
      "line-height:1.5",
      "padding:10px 12px",
      isHeader ? `border-bottom:1px solid ${c.border}` : ""
    ].filter(Boolean).join(";");
    return `<span style="${cellCSS}">${escText(cell)}</span>`;
  }).join("");
  return `<section class="container-table-row" style="${rowCSS}">${cellHtml2}</section>
`;
}
function renderKeyValueRow(ctx, cells, isHeader) {
  const c = ctx.tokens.colors;
  const rowCSS = "display:table-row";
  if (isHeader) {
    const headerText = cells.join(" · ");
    const cellCSS = [
      "display:table-cell",
      "width:100%",
      "vertical-align:middle",
      `background-color:${c.bgSoft}`,
      `color:${c.text}`,
      "font-weight:700",
      "font-size:12px",
      "letter-spacing:0.1em",
      "text-transform:uppercase",
      "text-align:center",
      "padding:10px 12px",
      `border-bottom:1px solid ${c.border}`
    ].join(";");
    return `<section class="container-table-row" style="${rowCSS}"><span style="${cellCSS}">${escText(headerText)}</span></section>
`;
  }
  if (cells.length !== 2) {
    warnCellShape(
      "key-value",
      "row-arity",
      `row cells.length=${cells.length}，应为 2（左 key / 右 value）；少列补空、多列截断`
    );
  }
  const key = cells[0] ?? "";
  const value = cells[1] ?? "";
  const keyCSS = [
    "display:table-cell",
    "width:35%",
    "vertical-align:middle",
    `background-color:${c.bgSoft}`,
    `color:${c.textMuted}`,
    "font-weight:600",
    "font-family:Menlo,Monaco,monospace",
    "font-size:12px",
    "text-align:right",
    "padding:10px 12px",
    `border-bottom:1px solid ${c.border}`
  ].join(";");
  const valueCSS = [
    "display:table-cell",
    "width:65%",
    "vertical-align:middle",
    `color:${c.text}`,
    "font-size:13px",
    "line-height:1.5",
    "text-align:left",
    "padding:10px 14px",
    `border-bottom:1px solid ${c.border}`
  ].join(";");
  return `<section class="container-table-row" style="${rowCSS}"><span style="${keyCSS}">${escText(key)}</span><span style="${valueCSS}">${escText(value)}</span></section>
`;
}
function renderPriceTierRow(ctx, cells, isHeader, bodyIdx, highlightCols) {
  const c = ctx.tokens.colors;
  const n = cells.length || 1;
  const w = (100 / n).toFixed(2);
  const rowCSS = "display:table-row";
  const isFirstBodyRow = !isHeader && bodyIdx === 0;
  const cellHtml2 = cells.map((cellRaw, i) => {
    const cell = stripStar(cellRaw);
    const isHighlight = highlightCols.has(i);
    const topColor = isHighlight ? c.accent : c.primary;
    const bg = isHeader ? c.bgSoft : c.bg;
    const color = c.text;
    const weight = isHeader || isFirstBodyRow ? 700 : 400;
    const fontSize = isHeader ? "14px" : isFirstBodyRow ? "16px" : "12px";
    const padY = isHeader ? "12px" : "10px";
    const borderTop = isHeader ? `border-top:3px solid ${topColor}` : "";
    const cellCSS = [
      "display:table-cell",
      `width:${w}%`,
      "vertical-align:middle",
      `background-color:${bg}`,
      `color:${color}`,
      `font-weight:${weight}`,
      `font-size:${fontSize}`,
      "line-height:1.4",
      "text-align:center",
      `padding:${padY} 8px`,
      borderTop,
      `border-bottom:1px solid ${c.border}`
    ].filter(Boolean).join(";");
    return `<span style="${cellCSS}">${escText(cell)}</span>`;
  }).join("");
  return `<section class="container-table-row" style="${rowCSS}">${cellHtml2}</section>
`;
}
function renderThreeLineRow(ctx, cells, isHeader) {
  const c = ctx.tokens.colors;
  const n = cells.length || 1;
  const w = (100 / n).toFixed(2);
  const rowCSS = "display:table-row";
  const color = isHeader ? c.textMuted : c.text;
  const weight = isHeader ? 600 : 400;
  const fontSize = isHeader ? "11px" : "13px";
  const letterSpacing = isHeader ? "0.08em" : "normal";
  const textTransform = isHeader ? "uppercase" : "none";
  const cellHtml2 = cells.map((cell) => {
    const cellCSS = [
      "display:table-cell",
      `width:${w}%`,
      "vertical-align:middle",
      `color:${color}`,
      `font-weight:${weight}`,
      `font-size:${fontSize}`,
      `letter-spacing:${letterSpacing}`,
      `text-transform:${textTransform}`,
      "line-height:1.5",
      "padding:10px 12px",
      isHeader ? `border-bottom:1px solid ${c.text}` : ""
    ].filter(Boolean).join(";");
    return `<span style="${cellCSS}">${escText(cell)}</span>`;
  }).join("");
  return `<section class="container-table-row" style="${rowCSS}">${cellHtml2}</section>
`;
}
function renderIndexTableRow(ctx, cells, isHeader) {
  const c = ctx.tokens.colors;
  const n = cells.length || 1;
  const w = (100 / n).toFixed(2);
  const rowCSS = "display:table-row";
  const headerWeight = 600;
  const cellHtml2 = cells.map((cell, i) => {
    const isMonoCol = i === 0 || i === n - 1;
    const isLastCol = i === cells.length - 1;
    const bg = "transparent";
    const color = isHeader ? c.textMuted : isMonoCol ? c.textMuted : c.text;
    const weight = isHeader ? headerWeight : isMonoCol ? 400 : 400;
    const fontSize = isHeader ? "11px" : isMonoCol ? "12px" : "13px";
    const fontFamily = !isHeader && isMonoCol ? "font-family:Menlo,Monaco,monospace" : "";
    const textAlign = !isHeader && isLastCol ? "text-align:right" : "text-align:left";
    const borderBottom = isHeader ? `border-bottom:1px solid ${c.text}` : `border-bottom:1px dashed ${c.border}`;
    const cellCSS = [
      "display:table-cell",
      `width:${w}%`,
      "vertical-align:middle",
      `background-color:${bg}`,
      `color:${color}`,
      `font-weight:${weight}`,
      `font-size:${fontSize}`,
      fontFamily,
      isHeader ? "letter-spacing:0.08em" : "",
      isHeader ? "text-transform:uppercase" : "",
      textAlign,
      "line-height:1.5",
      "padding:10px 12px",
      borderBottom
    ].filter(Boolean).join(";");
    return `<span style="${cellCSS}">${escText(cell)}</span>`;
  }).join("");
  return `<section class="container-table-row" style="${rowCSS}">${cellHtml2}</section>
`;
}
function renderMatrixRow(ctx, cells, isHeader) {
  const c = ctx.tokens.colors;
  const CELL_SIZE = 36;
  const LABEL_WIDTH = 50;
  const rowCSS = "display:table-row";
  if (isHeader) {
    const labelCSS2 = [
      "display:table-cell",
      `width:${LABEL_WIDTH}px`,
      `height:${CELL_SIZE}px`,
      "vertical-align:middle",
      "text-align:right",
      "padding-right:8px",
      `color:${c.textMuted}`,
      "font-size:10px",
      "letter-spacing:0.1em",
      "text-transform:uppercase",
      "font-weight:600"
    ].join(";");
    const headCellCSS = [
      "display:table-cell",
      `width:${CELL_SIZE}px`,
      `height:${CELL_SIZE}px`,
      "vertical-align:middle",
      "text-align:center",
      `color:${c.textMuted}`,
      "font-size:10px",
      "letter-spacing:0.1em",
      "text-transform:uppercase",
      "font-weight:600"
    ].join(";");
    const cellHtml22 = cells.map(
      (cell, i) => i === 0 ? `<span style="${labelCSS2}">${escText(cell)}</span>` : `<span style="${headCellCSS}">${escText(cell)}</span>`
    ).join("");
    return `<section class="container-table-row" style="${rowCSS}">${cellHtml22}</section>
`;
  }
  const labelCSS = [
    "display:table-cell",
    `width:${LABEL_WIDTH}px`,
    `height:${CELL_SIZE}px`,
    "vertical-align:middle",
    "text-align:right",
    "padding-right:8px",
    `color:${c.text}`,
    "font-size:11px",
    "font-weight:600"
  ].join(";");
  const valueCSS = [
    "display:table-cell",
    `width:${CELL_SIZE}px`,
    `height:${CELL_SIZE}px`,
    "vertical-align:middle",
    "text-align:center",
    `background-color:${c.primary}`,
    `color:${c.textInverse}`,
    "font-size:11px",
    "font-weight:700",
    `border:1px solid ${c.bg}`
  ].join(";");
  const cellHtml2 = cells.map(
    (cell, i) => i === 0 ? `<span style="${labelCSS}">${escText(cell)}</span>` : `<span style="${valueCSS}">${escText(cell)}</span>`
  ).join("");
  return `<section class="container-table-row" style="${rowCSS}">${cellHtml2}</section>
`;
}
const GALLERY_STACK = [];
const galleryContainer = {
  open: (ctx) => {
    const variantId = resolveVariantId(ctx, "gallery", GALLERY_VARIANTS, "duo");
    GALLERY_STACK.push({ variantId, itemCount: 0 });
    const entry = GALLERY_VARIANTS[variantId] ?? GALLERY_VARIANTS["duo"];
    const result = entry.render(ctx);
    const themeWrap = inlineCss(ctx.containers.gallery);
    const wrapperCSS = [themeWrap, result.wrapperCSS].filter(Boolean).join(";");
    const gridCSS = result.bodyCSS ?? "display:table;width:100%;table-layout:fixed;border-spacing:8px 0";
    const title = ctx.info.trim();
    const titleCSS = [
      "font-weight:700",
      `color:${ctx.tokens.colors.text}`,
      "font-size:13px",
      "letter-spacing:0.5px",
      "margin-bottom:8px"
    ].join(";");
    const titleEl = title ? `<section class="container-gallery__title" style="${titleCSS}">${escText(title)}</section>
` : "";
    return `<section class="container-gallery container-gallery--${variantId}" style="${wrapperCSS}">
` + titleEl + `<section class="container-gallery__grid" style="${gridCSS}">
`;
  },
  close: () => {
    GALLERY_STACK.pop();
    return `</section>
</section>
`;
  }
};
const imageItemContainer = {
  open: (ctx) => {
    const top = GALLERY_STACK[GALLERY_STACK.length - 1];
    if (!top) return "";
    const src = ctx.attrs.src ?? "";
    const alt = ctx.attrs.alt ?? ctx.info.trim();
    const caption = ctx.info.trim();
    top.itemCount += 1;
    switch (top.variantId) {
      case "triptych":
        return renderTriptychItem(ctx, src, alt, caption);
      case "nine-grid":
        return renderNineGridItem(ctx, src, alt, caption);
      case "ribbon-strip":
        return renderRibbonStripItem(ctx, src, alt, caption);
      case "duo":
      default:
        return renderDuoItem(ctx, src, alt, caption);
    }
  },
  close: ""
};
function renderDuoItem(ctx, src, alt, caption) {
  const cellCSS = "display:table-cell;width:50%;vertical-align:top";
  const imgCSS = "max-width:100%;display:block;border-radius:4px;margin:0 auto";
  const capCSS = `font-size:12px;color:${ctx.tokens.colors.textMuted};text-align:center;margin-top:6px;line-height:1.5`;
  return cellHtml("duo", cellCSS, src, alt, caption, imgCSS, capCSS);
}
function renderTriptychItem(ctx, src, alt, caption) {
  const cellCSS = "display:table-cell;width:33.33%;vertical-align:top";
  const imgCSS = "width:100%;height:140px;object-fit:cover;display:block;border-radius:4px";
  const capCSS = `font-size:12px;color:${ctx.tokens.colors.textMuted};text-align:center;margin-top:6px;line-height:1.5`;
  return cellHtml("triptych", cellCSS, src, alt, caption, imgCSS, capCSS);
}
function renderNineGridItem(ctx, src, alt, caption) {
  const cellCSS = "display:inline-block;width:32%;margin-right:1%;margin-bottom:1%;vertical-align:top";
  const imgCSS = "width:100%;aspect-ratio:1;object-fit:cover;display:block;border-radius:2px";
  const capCSS = `font-size:9px;color:${ctx.tokens.colors.textMuted};text-align:center;margin-top:2px;line-height:1.3`;
  return cellHtml("nine-grid", cellCSS, src, alt, caption, imgCSS, capCSS);
}
function renderRibbonStripItem(ctx, src, alt, caption) {
  const cellCSS = "display:inline-block;width:64%;margin-right:8px;vertical-align:top;white-space:normal";
  const imgCSS = "max-width:100%;height:180px;object-fit:cover;display:block;border-radius:4px";
  const capCSS = `font-size:12px;color:${ctx.tokens.colors.textMuted};text-align:left;margin-top:6px;line-height:1.5`;
  return cellHtml("ribbon-strip", cellCSS, src, alt, caption, imgCSS, capCSS);
}
function cellHtml(variantId, cellCSS, src, alt, caption, imgCSS, capCSS) {
  const imgEl = src ? `<img src="${escAttr(src)}" alt="${escAttr(alt)}" style="${imgCSS}" />` : "";
  const capEl = caption ? `<section style="${capCSS}">${escText(caption)}</section>` : "";
  return `<section class="container-image-item container-image-item--${variantId}" style="${cellCSS}">${imgEl}${capEl}</section>
`;
}
const DIALOGUE_STACK = [];
const dialogueContainer = {
  open: (ctx) => {
    const variantId = resolveVariantId(
      ctx,
      "dialogue",
      DIALOGUE_VARIANTS,
      "qa-rows"
    );
    DIALOGUE_STACK.push({ variantId, turnCount: 0 });
    const entry = DIALOGUE_VARIANTS[variantId] ?? DIALOGUE_VARIANTS["qa-rows"];
    const result = entry.render(ctx);
    const wrapperCSS = inlineCss(ctx.containers.dialogue) + ";" + result.wrapperCSS;
    const title = ctx.info.trim();
    const c = ctx.tokens.colors;
    const titleCSS = [
      "font-weight:700",
      `color:${c.text}`,
      "font-size:14px",
      "letter-spacing:0.5px",
      "margin-bottom:12px"
    ].join(";");
    const titleEl = title ? `<section class="container-dialogue__title" style="${titleCSS}">${escText(title)}</section>
` : "";
    return `<section class="container-dialogue container-dialogue--${variantId}" style="${wrapperCSS}">
` + titleEl;
  },
  close: () => {
    DIALOGUE_STACK.pop();
    return `</section>
`;
  }
};
const dialogueTurnContainer = {
  open: (ctx) => {
    const top = DIALOGUE_STACK[DIALOGUE_STACK.length - 1];
    if (!top) return "";
    const name = ctx.attrs.name ?? ctx.attrs.speaker ?? "";
    const role = ctx.attrs.role ?? "";
    const explicitSide = ctx.attrs.side;
    const side = explicitSide ?? "left";
    if (explicitSide !== void 0 && top.variantId !== "chat-bubbles") {
      devWarn(
        "dialogue:side",
        `side="${explicitSide}" 仅 chat-bubbles 骨架消费，当前 variant="${top.variantId}" 会忽略此 attr。要左右气泡请给 dialogue 加 variant=chat-bubbles。`
      );
    }
    top.turnCount += 1;
    const idx = top.turnCount - 1;
    switch (top.variantId) {
      case "chat-bubbles":
        return renderChatBubbleOpen(ctx, name, side);
      case "name-prefix":
        return renderNamePrefixOpen(ctx, name);
      case "interview-column":
        return renderInterviewColumnOpen(ctx, name, role);
      case "audio-stamp":
        return renderAudioStampOpen(ctx, name, role, ctx.attrs.timestamp ?? "");
      case "qa-rows":
      default:
        return renderQARowOpen(ctx, name, role, idx);
    }
  },
  close: () => {
    const top = DIALOGUE_STACK[DIALOGUE_STACK.length - 1];
    if (!top) return "";
    switch (top.variantId) {
      case "chat-bubbles":
        return renderChatBubbleClose();
      case "name-prefix":
        return renderNamePrefixClose();
      case "interview-column":
        return renderInterviewColumnClose();
      case "audio-stamp":
        return renderAudioStampClose();
      case "qa-rows":
      default:
        return renderQARowClose();
    }
  }
};
function inferIsQ(role, speakerOrName, idx) {
  const r = role.trim();
  if (r === "Q" || r === "q" || r === "主持人" || r === "提问" || r === "问") return true;
  if (r === "A" || r === "a" || r === "答" || r === "回答") return false;
  if (r) return false;
  const s = speakerOrName.trim();
  if (s) {
    if (/[Qq问]|主持人|提问|买家|客户|用户/.test(s)) return true;
    if (/[Aa答]|商家|客服|主播/.test(s)) return false;
  }
  return idx % 2 === 0;
}
function renderQARowOpen(ctx, name, role, idx) {
  const c = ctx.tokens.colors;
  const isQ = inferIsQ(role, name, idx);
  const rowCSS = [
    "display:table",
    "width:100%",
    "table-layout:fixed",
    idx === 0 ? "margin-top:0" : "margin-top:18px"
  ].join(";");
  const badgeCellCSS = "display:table-cell;vertical-align:top;width:32px;padding-right:10px";
  const badgeCSS = isQ ? [
    "display:inline-block",
    "width:24px",
    "height:24px",
    `background-color:${c.primary}`,
    `color:${c.textInverse}`,
    "text-align:center",
    "line-height:24px",
    "font-size:12px",
    "font-weight:700",
    "letter-spacing:0"
  ].join(";") : [
    "display:inline-block",
    "width:24px",
    "height:24px",
    "background-color:transparent",
    `border:1px solid ${c.textMuted}`,
    `color:${c.textMuted}`,
    "text-align:center",
    "line-height:22px",
    "font-size:12px",
    "font-weight:700"
  ].join(";");
  const bodyCellCSS = "display:table-cell;vertical-align:top";
  const nameCSS = [
    "display:block",
    `color:${c.textMuted}`,
    "font-size:11px",
    "letter-spacing:0.1em",
    "margin-bottom:4px",
    "font-weight:600"
  ].join(";");
  const bodyCSS = `color:${c.text};font-size:14px;line-height:1.7`;
  const label = isQ ? "Q" : "A";
  const nameRow = name ? `<span style="${nameCSS}">${escText(name)}</span>` : "";
  return `<section class="container-dialogue-turn" style="${rowCSS}"><span style="${badgeCellCSS}"><span style="${badgeCSS}">${label}</span></span><span style="${bodyCellCSS}">${nameRow}<span style="${bodyCSS}">`;
}
function renderQARowClose() {
  return "</span></span></section>\n";
}
const CHAT_TURN_STATE = [];
function renderChatBubbleOpen(ctx, name, side) {
  const c = ctx.tokens.colors;
  const isRight = side === "right";
  const initial = (name || "?").slice(0, 1);
  const avatarBg = isRight ? c.primary : c.textMuted;
  const bubbleBg = c.bgSoft;
  const slotCSS = "display:table-cell;vertical-align:top;width:36px";
  const avatarSvg = `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:top"><circle cx="14" cy="14" r="14" fill="${avatarBg}"/><text x="14" y="18" text-anchor="middle" font-size="12" font-weight="700" fill="${c.textInverse}">${escText(initial)}</text></svg>`;
  CHAT_TURN_STATE.push({
    tailAfter: isRight ? renderChatTail(bubbleBg, "right") : "",
    rightAvatarHtml: isRight ? `<span style="${slotCSS}">${avatarSvg}</span>` : `<span style="${slotCSS}"></span>`
  });
  const rowCSS = [
    "display:table",
    "width:100%",
    "table-layout:fixed",
    "margin-top:14px"
  ].join(";");
  const bodyCellCSS = [
    "display:table-cell",
    "vertical-align:top",
    "padding:0 8px",
    isRight ? "text-align:right" : "text-align:left"
  ].join(";");
  const nameCSS = [
    "display:block",
    `color:${c.textMuted}`,
    "font-size:11px",
    "margin-bottom:3px"
  ].join(";");
  const bubbleCSS = [
    "display:inline-block",
    `background-color:${bubbleBg}`,
    `color:${c.text}`,
    "padding:10px 14px",
    "border-radius:12px",
    "font-size:14px",
    "line-height:1.65",
    "max-width:84%",
    "vertical-align:top",
    "text-align:left"
  ].join(";");
  const nameRow = name ? `<span style="${nameCSS}">${escText(name)}</span>` : "";
  const tailBefore = isRight ? "" : renderChatTail(bubbleBg, "left");
  const leftCell = isRight ? `<span style="${slotCSS}"></span>` : `<span style="${slotCSS}">${avatarSvg}</span>`;
  return `<section class="container-dialogue-turn" style="${rowCSS}">` + leftCell + `<span style="${bodyCellCSS}">${nameRow}${tailBefore}<span style="${bubbleCSS}">`;
}
function renderChatBubbleClose() {
  const state = CHAT_TURN_STATE.pop();
  if (!state) return "</span></span></section>\n";
  return `</span>${state.tailAfter}</span>${state.rightAvatarHtml}</section>
`;
}
function renderChatTail(fill, dir) {
  const path = dir === "left" ? "M8,0 L0,5 L8,10 Z" : "M0,0 L8,5 L0,10 Z";
  return `<svg width="8" height="10" viewBox="0 0 8 10" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:bottom"><path d="${path}" fill="${fill}"/></svg>`;
}
function renderNamePrefixOpen(ctx, name) {
  const c = ctx.tokens.colors;
  const pCSS = [
    "margin:0 0 12px",
    "font-size:14px",
    "line-height:1.75",
    `color:${c.text}`
  ].join(";");
  const nameCSS = [
    "display:inline",
    "font-weight:700",
    `color:${c.accent}`,
    "font-size:13px",
    "letter-spacing:0.5px",
    "font-family:Menlo,Monaco,monospace",
    "margin-right:2px"
  ].join(";");
  const nameHtml = name ? `<span style="${nameCSS}">${escText(name)}：</span>` : "";
  return `<section class="container-dialogue-turn" style="${pCSS}">${nameHtml}<span style="display:inline">`;
}
function renderNamePrefixClose() {
  return "</span></section>\n";
}
function renderInterviewColumnOpen(ctx, name, role) {
  const c = ctx.tokens.colors;
  const rowCSS = [
    "display:table",
    "width:100%",
    "table-layout:fixed",
    "margin-bottom:16px"
  ].join(";");
  const nameCellCSS = [
    "display:table-cell",
    "vertical-align:top",
    "width:96px",
    "padding-right:12px",
    "text-align:right"
  ].join(";");
  const nameCSS = [
    "display:block",
    `color:${c.textMuted}`,
    "font-size:11px",
    "letter-spacing:0.15em",
    "text-transform:uppercase",
    "font-weight:700",
    "line-height:1.6",
    "padding-top:4px"
  ].join(";");
  const roleCSS = [
    "display:block",
    `color:${c.textMuted}`,
    "font-size:10px",
    "letter-spacing:0.05em",
    "margin-top:2px",
    "font-weight:400"
  ].join(";");
  const bodyCellCSS = [
    "display:table-cell",
    "vertical-align:top",
    "padding-left:16px",
    `border-left:1px solid ${c.border}`
  ].join(";");
  const bodyCSS = [
    `color:${c.text}`,
    "font-size:17px",
    "line-height:1.8",
    "text-align:left"
  ].join(";");
  const nameHtml = name ? `<span style="${nameCSS}">${escText(name)}</span>` : "";
  const roleHtml = role ? `<span style="${roleCSS}">${escText(role)}</span>` : "";
  return `<section class="container-dialogue-turn" style="${rowCSS}"><span style="${nameCellCSS}">${nameHtml}${roleHtml}</span><span style="${bodyCellCSS}"><span style="${bodyCSS}">`;
}
function renderInterviewColumnClose() {
  return "</span></span></section>\n";
}
function renderAudioStampOpen(ctx, name, role, timestamp) {
  const c = ctx.tokens.colors;
  const sectionCSS = "display:block;margin-top:16px";
  const timestampCSS = [
    "display:block",
    "font-family:Menlo,Monaco,monospace",
    "font-size:10px",
    "letter-spacing:0.1em",
    `color:${c.primary}`,
    "margin-bottom:2px"
  ].join(";");
  const nameCSS = [
    "font-size:11px",
    "font-weight:600",
    `color:${c.text}`
  ].join(";");
  const roleCSS = [
    "font-size:10px",
    "font-style:italic",
    `color:${c.textMuted}`,
    "margin-left:8px"
  ].join(";");
  const bodyCSS = [`color:${c.text}`, "line-height:1.7"].join(";");
  const timestampRow = timestamp ? `<section style="${timestampCSS}">${escText(timestamp)}</section>` : "";
  const nameRow = `<section style="display:block;margin-bottom:6px"><span style="${nameCSS}">${escText(name)}</span><span style="${roleCSS}">— ${escText(role || "speaker")}</span></section>`;
  return `<section class="container-dialogue-turn" style="${sectionCSS}">` + timestampRow + nameRow + `<section style="${bodyCSS}">`;
}
function renderAudioStampClose() {
  return "</section></section>\n";
}
const ATTR_RE = /([a-zA-Z_][\w-]*)=("([^"]*)"|'([^']*)'|(\S+))/g;
function parseInfo(raw) {
  const attrs = {};
  let rest = raw;
  rest = rest.replace(ATTR_RE, (_, key, _full, qv, sv, bare2) => {
    attrs[key] = qv ?? sv ?? bare2 ?? "";
    return "";
  });
  const title = rest.replace(/\s+/g, " ").trim();
  return { title, attrs };
}
const freeContainer = {
  open: () => '<section class="container-free">\n',
  close: "</section>\n"
};
const CONTAINER_REGISTRY = {
  intro: introContainer,
  cover: coverContainer,
  author: authorContainer,
  "section-title": sectionTitleContainer,
  tip: tipContainer,
  warning: warningContainer,
  info: infoContainer,
  danger: dangerContainer,
  note: noteContainer,
  "quote-card": quoteCardContainer,
  highlight: highlightContainer,
  compare: compareContainer,
  pros: prosContainer,
  cons: consContainer,
  steps: stepsContainer,
  divider: dividerContainer,
  "footer-cta": footerCTAContainer,
  recommend: recommendContainer,
  qrcode: qrcodeContainer,
  "voice-card": voiceCardContainer,
  "video-card": videoCardContainer,
  announcement: announcementContainer,
  "author-bio": authorBioContainer,
  "image-caption": imageCaptionContainer,
  timeline: timelineContainer,
  "timeline-item": timelineItemContainer,
  free: freeContainer,
  // 签名容器（abstract / key-number）
  abstract: abstractContainer,
  "key-number": keyNumberContainer,
  // data-brief 家族（masthead / section-tag / byline / editorial-header / toc / kpi-dashboard / bar-chart / qa-block / footnotes）
  masthead: mastheadContainer,
  "section-tag": sectionTagContainer,
  byline: bylineContainer,
  "editorial-header": editorialHeaderContainer,
  toc: tocContainer,
  "toc-item": tocItemContainer,
  "kpi-dashboard": kpiDashboardContainer,
  "kpi-item": kpiItemContainer,
  "bar-chart": barChartContainer,
  bar: barContainer,
  "qa-block": qaBlockContainer,
  footnotes: footnotesContainer,
  colophon: colophonContainer,
  "pull-quote": pullQuoteContainer,
  "table-card": tableCardContainer,
  "table-row": tableRowContainer,
  gallery: galleryContainer,
  "image-item": imageItemContainer,
  dialogue: dialogueContainer,
  "dialogue-turn": dialogueTurnContainer
};
const BODY_PLACEHOLDER = /\{\{\s*body\s*\}\}/;
function splitTemplateOnBody(template) {
  const idx = template.search(BODY_PLACEHOLDER);
  if (idx < 0) return { open: template, close: "" };
  const match = template.match(BODY_PLACEHOLDER);
  if (!match) return { open: template, close: "" };
  return {
    open: template.slice(0, idx),
    close: template.slice(idx + match[0].length)
  };
}
function fillPlaceholders(segment, uv, info) {
  let out = segment;
  out = out.replace(/\{\{\s*title\s*\}\}/g, escAttr(info.title));
  out = out.replace(/\{\{\s*attr\.([a-zA-Z_][\w-]*)\s*\}\}/g, (_, key) => {
    const v = info.attrs[key];
    return v === void 0 ? "" : escAttr(v);
  });
  out = out.replace(/\{\{\s*wrapperCSS\s*\}\}/g, escAttr(uv.css.wrapperCSS ?? ""));
  out = out.replace(/\{\{\s*titleCSS\s*\}\}/g, escAttr(uv.css.titleCSS ?? ""));
  out = out.replace(/\{\{\s*bodyCSS\s*\}\}/g, escAttr(uv.css.bodyCSS ?? ""));
  out = out.replace(/\{\{\s*svgSlot\s*\}\}/g, uv.css.svgSlot ?? "");
  return out;
}
function renderUserCustomOpen(uv, info) {
  const { open } = splitTemplateOnBody(uv.template);
  return fillPlaceholders(open, uv, info);
}
function renderUserCustomClose(uv, info) {
  const { close } = splitTemplateOnBody(uv.template);
  return fillPlaceholders(close, uv, info);
}
function customFenceName(uvId) {
  return `uc-${uvId}`;
}
const EMPHASIS_OPEN = "[.";
const EMPHASIS_CLOSE = ".]";
const WAVY_OPEN = "[~";
const WAVY_CLOSE = "~]";
function makeMatcher(openSeq, closeSeq, className) {
  return function matcher(state, silent) {
    const src = state.src;
    const start = state.pos;
    if (src.substr(start, openSeq.length) !== openSeq) return false;
    const contentStart = start + openSeq.length;
    let end = -1;
    for (let i = contentStart; i < src.length - (closeSeq.length - 1); i++) {
      const ch = src[i];
      if (ch === "\n") return false;
      if (ch === "\\") {
        i++;
        continue;
      }
      if (src.substr(i, closeSeq.length) === closeSeq) {
        end = i;
        break;
      }
    }
    if (end < 0) return false;
    const inner = src.slice(contentStart, end);
    if (!inner) return false;
    if (!silent) {
      const tokenOpen = state.push("html_inline", "", 0);
      tokenOpen.content = `<span class="${className}">`;
      const md = state.md;
      const innerRendered = md.renderInline(inner, state.env);
      const tokenContent = state.push("html_inline", "", 0);
      tokenContent.content = innerRendered;
      const tokenClose = state.push("html_inline", "", 0);
      tokenClose.content = `</span>`;
    }
    state.pos = end + closeSeq.length;
    return true;
  };
}
function registerInlineExtensions(md) {
  md.inline.ruler.before("emphasis", "wx_emphasis", makeMatcher(EMPHASIS_OPEN, EMPHASIS_CLOSE, "wx-emphasis"));
  md.inline.ruler.before("emphasis", "wx_wavy", makeMatcher(WAVY_OPEN, WAVY_CLOSE, "wx-wavy"));
}
function toRoman(n) {
  const map = [
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
  ];
  let out = "";
  let x = n;
  for (const [v, r] of map) {
    while (x >= v) {
      out += r;
      x -= v;
    }
  }
  return out || "I";
}
function resolveColor(key, colors) {
  return colors[key];
}
function decorationCss(style, colors) {
  const color = resolveColor(style.color, colors);
  const isBlock = style.display === "block";
  const parts = [`display:${isBlock ? "block" : "inline-block"}`, `color:${color}`];
  if (style.fontFamily === "monospace") parts.push("font-family:Menlo,Monaco,monospace");
  if (style.fontWeight) parts.push(`font-weight:${style.fontWeight}`);
  if (style.fontSize) parts.push(`font-size:${style.fontSize}px`);
  if (style.letterSpacing) parts.push(`letter-spacing:${style.letterSpacing}px`);
  if (isBlock) {
    parts.push(`margin-bottom:${style.marginBottom ?? 6}px`);
  } else {
    parts.push(`margin-right:${style.marginRight ?? 8}px`);
  }
  if (style.underline) {
    parts.push(`border-bottom:1px solid ${color}`);
    parts.push(`padding-bottom:${style.underlinePad ?? 2}px`);
  }
  if (style.backgroundColor) {
    const bg = resolveColor(style.backgroundColor, colors);
    parts.push(`background-color:${bg}`);
    const px = style.paddingX ?? 0;
    const py = style.paddingY ?? 0;
    if (px || py) parts.push(`padding:${py}px ${px}px`);
  }
  return parts.join(";");
}
const CIRCLED_NUMERALS = [
  "❶",
  "❷",
  "❸",
  "❹",
  "❺",
  "❻",
  "❼",
  "❽",
  "❾",
  "❿",
  "⓫",
  "⓬",
  "⓭",
  "⓮",
  "⓯",
  "⓰",
  "⓱",
  "⓲",
  "⓳",
  "⓴"
];
const CHINESE_NUMERALS = [
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
  "十",
  "十一",
  "十二",
  "十三",
  "十四",
  "十五",
  "十六",
  "十七",
  "十八",
  "十九",
  "二十"
];
function formatAutoNumber(kind, counters, level) {
  if (kind === "arabic-section") {
    return `${counters.h2}.${counters.h3InH2}`;
  }
  if (kind === "arabic-section-padded") {
    return `${String(counters.h2).padStart(2, "0")}.${counters.h3InH2}`;
  }
  const n = level === 2 ? counters.h2 : counters.h3;
  if (kind === "roman") return toRoman(n);
  if (kind === "arabic-padded") return String(n).padStart(2, "0");
  if (kind === "circled") return CIRCLED_NUMERALS[n - 1] ?? `(${n})`;
  return String(n);
}
function substituteSuffix(suffix, formattedN, rawIndex) {
  return suffix.replace(/\{cn\}/g, CHINESE_NUMERALS[rawIndex - 1] ?? String(rawIndex)).replace(/\{n\}/g, formattedN);
}
function applyHeadingPrefixDecorations(md, theme) {
  const decos = theme.decorations?.headingPrefix;
  if (!decos || decos.length === 0) return;
  const decosByLevel = /* @__PURE__ */ new Map();
  for (const d of decos) {
    const list = decosByLevel.get(d.level) ?? [];
    list.push(d);
    decosByLevel.set(d.level, list);
  }
  const colors = theme.tokens.colors;
  md.core.ruler.push("wx_heading_prefix_decorations", (state) => {
    const tokens = state.tokens;
    const counters = { h2: 0, h3: 0, h3InH2: 0 };
    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i];
      if (tok.type !== "heading_open") continue;
      const level = tok.tag === "h2" ? 2 : tok.tag === "h3" ? 3 : null;
      if (level === null) continue;
      if (level === 2) {
        counters.h2++;
        counters.h3InH2 = 0;
      } else {
        counters.h3++;
        counters.h3InH2++;
      }
      const applicable = decosByLevel.get(level);
      if (!applicable || applicable.length === 0) continue;
      const inlineTok = tokens[i + 1];
      if (!inlineTok || inlineTok.type !== "inline" || !inlineTok.children) continue;
      const children = inlineTok.children;
      for (const d of applicable) {
        applyOneHeadingDecoration(d, children, counters, level, colors);
      }
    }
  });
}
function applyOneHeadingDecoration(d, children, counters, level, colors) {
  const css = decorationCss(d.style, colors);
  if (children.length === 0) return;
  const Token = children[0].constructor;
  if (d.autoNumber) {
    const text = formatAutoNumber(d.autoNumber, counters, level);
    const rawIndex = level === 2 ? counters.h2 : counters.h3;
    const suffix = d.style.suffix ? substituteSuffix(d.style.suffix, text, rawIndex) : "";
    const span = new Token("html_inline", "", 0);
    span.content = `<span class="heading-prefix heading-prefix--autonumber" style="${css}">${text}${suffix}</span>`;
    children.splice(0, 0, span);
    return;
  }
  if (d.pattern) {
    const first = children[0];
    if (first.type !== "text" || !first.content) return;
    let re;
    try {
      re = new RegExp(d.pattern);
    } catch {
      return;
    }
    const m = re.exec(first.content);
    if (!m || !m[1]) return;
    const captured = m[1];
    const consumed = m[0].length;
    const rest = first.content.slice(consumed);
    const span = new Token("html_inline", "", 0);
    span.content = `<span class="heading-prefix heading-prefix--pattern" style="${css}">${captured}</span>`;
    if (rest) {
      first.content = rest;
      children.splice(0, 0, span);
    } else {
      children.splice(0, 1, span);
    }
  }
}
function pushCtx(env, name, ctx) {
  env.__wxContainerStacks ??= {};
  env.__wxContainerStacks[name] ??= [];
  env.__wxContainerStacks[name].push(ctx);
}
function popCtx(env, name) {
  return env.__wxContainerStacks?.[name]?.pop();
}
function pushCustomInfo(env, name, info) {
  env.__wxCustomInfoStacks ??= {};
  env.__wxCustomInfoStacks[name] ??= [];
  env.__wxCustomInfoStacks[name].push(info);
}
function popCustomInfo(env, name) {
  return env.__wxCustomInfoStacks?.[name]?.pop();
}
function createMarkdown(options = {}) {
  const theme = options.theme ?? themeRegistry.default;
  const customVariants = options.customVariants ?? [];
  const md = new MarkdownIt({
    html: true,
    xhtmlOut: false,
    breaks: false,
    linkify: true,
    typographer: false
  });
  md.use(markdownItMark);
  md.use(markdownItIns);
  md.use(markdownItFootnote);
  md.use(markdownItTaskLists, { enabled: true, label: true });
  for (const [name, renderer] of Object.entries(CONTAINER_REGISTRY)) {
    md.use(markdownItContainer, name, {
      validate(params) {
        return params.trim().split(/\s+/)[0] === name;
      },
      render(tokens, idx, _opts, env) {
        const token = tokens[idx];
        if (token.nesting === 1) {
          const rest = token.info.trim().slice(name.length).trim();
          const { title, attrs } = parseInfo(rest);
          const ctx2 = {
            themeId: theme.id,
            tokens: theme.tokens,
            assets: theme.assets,
            containers: theme.containers,
            innerStyles: theme.innerStyles,
            inline: theme.inline,
            variants: theme.variants,
            pageVariants: env.__wxPageVariants,
            kickers: theme.kickers,
            info: title,
            attrs,
            userVariants: env.__wxUserVariants
          };
          pushCtx(env, name, ctx2);
          return renderer.open(ctx2);
        }
        const ctx = popCtx(env, name) ?? emptyCtx(theme, env.__wxPageVariants, env.__wxUserVariants);
        return typeof renderer.close === "function" ? renderer.close(ctx) : renderer.close;
      }
    });
  }
  for (const uv of customVariants) {
    const fence = customFenceName(uv.id);
    md.use(markdownItContainer, fence, {
      validate(params) {
        return params.trim().split(/\s+/)[0] === fence;
      },
      render(tokens, idx, _opts, env) {
        const token = tokens[idx];
        if (token.nesting === 1) {
          const rest = token.info.trim().slice(fence.length).trim();
          const info2 = parseInfo(rest);
          pushCustomInfo(env, fence, info2);
          return renderUserCustomOpen(uv, info2);
        }
        const info = popCustomInfo(env, fence) ?? { title: "", attrs: {} };
        return renderUserCustomClose(uv, info);
      }
    });
  }
  registerInlineExtensions(md);
  const h2Prefix2 = theme.assets.h2Prefix ?? null;
  if (h2Prefix2) {
    md.renderer.rules.heading_open = (tokens, idx, opts, _env, self) => {
      const t = tokens[idx];
      if (t.tag === "h2") return `<h2>${h2Prefix2}`;
      return self.renderToken(tokens, idx, opts);
    };
  }
  applyDropcap(md, theme);
  applyHeadingPrefixDecorations(md, theme);
  applyTaskListSquares(md, theme);
  applyFootnotesEntrySplit(md);
  return md;
}
const FOOTNOTE_ENTRY_RE = /^\[\d+\][\s　]+/;
function applyFootnotesEntrySplit(md) {
  md.core.ruler.push("wx_footnotes_entry_split", (state) => {
    const tokens = state.tokens;
    if (tokens.length === 0) return;
    const Token = tokens[0].constructor;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type !== "container_footnotes_open") continue;
      let depth = 1;
      let j = i + 1;
      while (j < tokens.length) {
        if (tokens[j].type === "container_footnotes_open") depth++;
        else if (tokens[j].type === "container_footnotes_close") {
          depth--;
          if (depth === 0) break;
        }
        j++;
      }
      if (j >= tokens.length) continue;
      const next = [];
      let k = i + 1;
      while (k < j) {
        const pOpen = tokens[k];
        const inl = tokens[k + 1];
        const pClose = tokens[k + 2];
        if (pOpen?.type === "paragraph_open" && inl?.type === "inline" && pClose?.type === "paragraph_close") {
          const groups = splitFootnoteChildren(inl.children ?? []);
          if (groups.length <= 1) {
            next.push(pOpen, inl, pClose);
          } else {
            for (const g of groups) {
              const np = new Token("paragraph_open", "p", 1);
              const ni = new Token("inline", "", 0);
              ni.children = g;
              ni.content = g.filter((c) => c.type === "text").map((c) => c.content).join("");
              const nc = new Token("paragraph_close", "p", -1);
              next.push(np, ni, nc);
            }
          }
          k += 3;
        } else {
          next.push(pOpen);
          k++;
        }
      }
      tokens.splice(i + 1, j - i - 1, ...next);
    }
  });
}
function splitFootnoteChildren(children) {
  if (children.length === 0) return [];
  const groups = [];
  let current = [];
  for (let idx = 0; idx < children.length; idx++) {
    const ch = children[idx];
    if (ch.type === "softbreak" || ch.type === "hardbreak") {
      const nx = children[idx + 1];
      if (nx && nx.type === "text" && FOOTNOTE_ENTRY_RE.test(nx.content)) {
        if (current.length > 0) groups.push(current);
        current = [];
        continue;
      }
    }
    current.push(ch);
  }
  if (current.length > 0) groups.push(current);
  return groups;
}
function applyDropcap(md, theme) {
  const dropcap = theme.decorations?.introDropcap;
  if (!dropcap) return;
  const dropcapColor = theme.tokens.colors[dropcap.color];
  const fontSize = dropcap.fontSize ?? 48;
  const fontWeight = dropcap.fontWeight ?? 700;
  const marginRight = dropcap.marginRight ?? 8;
  const paddingTop = dropcap.paddingTop ?? 4;
  const dropcapStyle = `display:inline-block;font-size:${fontSize}px;font-weight:${fontWeight};color:${dropcapColor};line-height:1;margin:0 ${marginRight}px 0 0;padding-top:${paddingTop}px;vertical-align:baseline`;
  md.core.ruler.push("wx_intro_dropcap", (state) => {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type !== "container_intro_open") continue;
      let j = i + 1;
      while (j < tokens.length && tokens[j].type !== "paragraph_open" && tokens[j].type !== "container_intro_close") {
        j++;
      }
      if (j >= tokens.length || tokens[j].type === "container_intro_close") continue;
      const inlineTok = tokens[j + 1];
      if (!inlineTok || inlineTok.type !== "inline" || !inlineTok.children) continue;
      const children = inlineTok.children;
      let k = 0;
      while (k < children.length && children[k].type !== "text") k++;
      if (k >= children.length) continue;
      const txt = children[k].content;
      if (!txt) continue;
      let p = 0;
      while (p < txt.length && /[\s"'‘’“”「『《〈(（[［{｛・·。，、；：？！"']/.test(txt[p])) {
        p++;
      }
      if (p >= txt.length) continue;
      if (/[0-9]/.test(txt[p])) continue;
      const firstChar = txt[p];
      const before = txt.slice(0, p);
      const after = txt.slice(p + 1);
      const Token = children[k].constructor;
      const dropcapHtml = new Token("html_inline", "", 0);
      dropcapHtml.content = `<span class="intro-dropcap" style="${dropcapStyle}">${firstChar}</span>`;
      const newSegments = [dropcapHtml];
      if (after) {
        const afterTok = new Token("text", "", 0);
        afterTok.content = after;
        newSegments.push(afterTok);
      }
      if (before) {
        children[k].content = before;
        children.splice(k + 1, 0, ...newSegments);
      } else {
        children.splice(k, 1, ...newSegments);
      }
    }
  });
}
const CHECKBOX_INPUT_RE = /<input[^>]*\btask-list-item-checkbox\b[^>]*>/i;
const CHECKBOX_CHECKED_RE = /\bchecked\b/i;
const LABEL_TAG_RE = /^<\/?label\b/i;
function applyTaskListSquares(md, theme) {
  const c = theme.tokens.colors;
  const filled = `<span class="wx-task-square wx-task-square--on" style="display:inline-block;width:12px;height:12px;background-color:${c.primary};color:${c.textInverse};text-align:center;line-height:12px;font-size:11px;font-weight:700;vertical-align:-2px;margin-right:8px">✓</span>`;
  const empty = `<span class="wx-task-square wx-task-square--off" style="display:inline-block;width:12px;height:12px;border:1px solid ${c.text};vertical-align:-2px;margin-right:8px">&nbsp;</span>`;
  md.core.ruler.push("wx_tasklist_squares", (state) => {
    for (const tok of state.tokens) {
      if (tok.type !== "inline" || !tok.children) continue;
      const children = tok.children;
      for (const child of children) {
        if (child.type !== "html_inline") continue;
        if (CHECKBOX_INPUT_RE.test(child.content)) {
          child.content = CHECKBOX_CHECKED_RE.test(child.content) ? filled : empty;
        } else if (LABEL_TAG_RE.test(child.content)) {
          child.content = "";
        }
      }
    }
  });
}
function emptyCtx(theme, pageVariants, userVariants) {
  return {
    themeId: theme.id,
    tokens: theme.tokens,
    assets: theme.assets,
    containers: theme.containers,
    innerStyles: theme.innerStyles,
    inline: theme.inline,
    variants: theme.variants,
    pageVariants,
    kickers: theme.kickers,
    info: "",
    attrs: {},
    userVariants
  };
}
const FORBIDDEN_CSS_PROPS = [
  "font-family",
  "fontfamily",
  "position",
  "float"
];
const FORBIDDEN_DISPLAY_VALUES = /* @__PURE__ */ new Set([
  "flex",
  "inline-flex",
  "grid",
  "inline-grid"
]);
const FORBIDDEN_VALUE_PATTERNS = [
  [/-webkit-/i, "-webkit- 前缀在公众号会被剥离"],
  [/@media/i, "@media 查询会被公众号剥离"],
  [/@keyframes/i, "@keyframes 动画不被公众号支持"],
  [/:hover/i, ":hover 伪类粘贴后无效"],
  [/:active/i, ":active 伪类粘贴后无效"]
];
const FORBIDDEN_POSITION_PROPS = /* @__PURE__ */ new Set([
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "z-index"
]);
const HARD_REMOVE_TAGS = /* @__PURE__ */ new Set([
  "style",
  "script",
  "noscript",
  "link",
  "meta"
]);
const IFRAME_SRC_ALLOW = [
  /^https?:\/\/v\.qq\.com\//i
];
const NEAR_WHITE = "#fefefe";
function lintProp(prop, value, path) {
  const lower = prop.toLowerCase();
  if (FORBIDDEN_CSS_PROPS.includes(lower)) {
    return [{
      severity: "error",
      code: "forbidden-prop",
      prop,
      value,
      path,
      message: `[themeCSS] 主题在 ${path} 声明了 \`${prop}\`，违反微信平台约束。请移除。`
    }];
  }
  if (lower === "display" && FORBIDDEN_DISPLAY_VALUES.has(value.toLowerCase().trim())) {
    return [{
      severity: "error",
      code: "forbidden-display",
      prop,
      value,
      path,
      message: `[themeCSS] 主题在 ${path} 使用了 \`display: ${value}\`，微信粘贴后会被剥离。改用 block / inline-block / table 系列。`
    }];
  }
  for (const [re, reason] of FORBIDDEN_VALUE_PATTERNS) {
    if (re.test(value)) {
      return [{
        severity: "error",
        code: "forbidden-value-pattern",
        prop,
        value,
        path,
        message: `[themeCSS] 主题在 ${path} 的值里命中禁用模式（${reason}）：\`${value}\`。请移除。`
      }];
    }
  }
  return [];
}
/* @__PURE__ */ new Set([
  ...HARD_REMOVE_TAGS,
  "object",
  "embed",
  "form"
]);
const ROOT_CLASS = "markdown-body";
function createLRU(max) {
  if (max <= 0) throw new Error("[lru] max must be > 0");
  const map = /* @__PURE__ */ new Map();
  return {
    get(key) {
      const v = map.get(key);
      if (v === void 0 && !map.has(key)) return void 0;
      map.delete(key);
      map.set(key, v);
      return v;
    },
    set(key, value) {
      if (map.has(key)) map.delete(key);
      map.set(key, value);
      if (map.size > max) {
        const oldest = map.keys().next().value;
        if (oldest !== void 0) map.delete(oldest);
      }
    },
    has(key) {
      return map.has(key);
    },
    delete(key) {
      return map.delete(key);
    },
    clear() {
      map.clear();
    },
    get size() {
      return map.size;
    }
  };
}
function assertSafeProp(prop, value, path) {
  const diagnostics = lintProp(prop, value, path);
  if (diagnostics.length === 0) return;
  throw new ThemeAuthoringError(diagnostics[0].message);
}
function toCssDecl(obj, path) {
  const decls = [];
  for (const [key, rawValue] of Object.entries(obj)) {
    const prop = key.trim();
    const value = typeof rawValue === "number" ? `${rawValue}px` : String(rawValue).trim();
    if (!value) continue;
    assertSafeProp(prop, value, path);
    decls.push(`  ${prop}: ${value};`);
  }
  return decls.join("\n");
}
function rule(selector, obj, path) {
  const body = toCssDecl(obj, path);
  if (!body) return "";
  return `${selector} {
${body}
}`;
}
function elementSelector(tag) {
  return `.${ROOT_CLASS} ${tag}`;
}
function containerSelector(name) {
  return `.${ROOT_CLASS} .container-${name}`;
}
const themeCssCache = createLRU(12);
function generateThemeCSS(theme) {
  const cached = themeCssCache.get(theme.id);
  if (cached && cached.theme === theme) return cached.css;
  const css = computeThemeCSS(theme);
  themeCssCache.set(theme.id, { theme, css });
  return css;
}
function computeThemeCSS(theme) {
  const chunks = [];
  chunks.push(
    rule(
      `.${ROOT_CLASS}`,
      {
        "background-color": theme.tokens.colors.bg,
        color: theme.tokens.colors.text,
        "font-size": `${theme.tokens.typography.baseSize}px`,
        "line-height": String(theme.tokens.typography.lineHeight),
        "letter-spacing": `${theme.tokens.typography.letterSpacing}px`,
        padding: "20px 16px"
      },
      "root"
    )
  );
  const elementMap = [
    ["h1", theme.elements.h1],
    ["h2", theme.elements.h2],
    ["h3", theme.elements.h3],
    ["h4", theme.elements.h4],
    ["h5", theme.elements.h5],
    ["h6", theme.elements.h6],
    ["p", theme.elements.p],
    ["blockquote", theme.elements.blockquote],
    ["ul", theme.elements.ul],
    ["ol", theme.elements.ol],
    ["li", theme.elements.li],
    // inline code 容易塞超长 token（UUID / 长 URL / 模块路径），不加 word-break 会撑宽段落。
    // 只针对 inline 场景打破；紧跟的 `pre code` 会显式复位成 normal，保留代码块的保真排版。
    ["code", { ...theme.elements.code, "word-break": "break-all" }],
    ["kbd", theme.elements.kbd],
    ["pre", theme.elements.pre],
    ["pre code", {
      "background-color": "transparent",
      color: "inherit",
      padding: "0",
      "word-break": "normal"
    }],
    ["img", theme.elements.img],
    ["a", theme.elements.a],
    ["hr", theme.elements.hr],
    ["table", theme.elements.table],
    ["th", theme.elements.th],
    ["td", theme.elements.td],
    ["strong", theme.elements.strong],
    ["em", theme.elements.em]
  ];
  for (const [tag, obj] of elementMap) {
    const r = rule(elementSelector(tag), obj, `elements.${tag}`);
    if (r) chunks.push(r);
  }
  chunks.push(rule(`.${ROOT_CLASS} mark`, theme.inline.highlight, "inline.highlight"));
  chunks.push(rule(`.${ROOT_CLASS} .wx-wavy`, theme.inline.wavy, "inline.wavy"));
  chunks.push(rule(`.${ROOT_CLASS} .wx-emphasis`, theme.inline.emphasis, "inline.emphasis"));
  chunks.push(rule(`.${ROOT_CLASS} s, .${ROOT_CLASS} del`, theme.inline.del, "inline.del"));
  chunks.push(rule(`.${ROOT_CLASS} ins`, theme.inline.ins, "inline.ins"));
  for (const spec2 of STYLED_CONTAINERS) {
    const obj = theme.containers[spec2.styleKey];
    if (!obj) continue;
    const r = rule(containerSelector(spec2.name), obj, `containers.${spec2.styleKey}`);
    if (r) chunks.push(r);
  }
  const compareColSel = `.${ROOT_CLASS} .container-pros, .${ROOT_CLASS} .container-cons`;
  const compareColDescendant = (suffix) => `.${ROOT_CLASS} .container-pros ${suffix}, .${ROOT_CLASS} .container-cons ${suffix}`;
  chunks.push(rule(compareColSel, { "letter-spacing": "0" }, "compare.col"));
  chunks.push(
    rule(
      compareColDescendant("p"),
      {
        "font-size": "13px",
        "letter-spacing": "0",
        "line-height": "1.6",
        "margin-bottom": "6px"
      },
      "compare.col p"
    )
  );
  chunks.push(
    rule(
      compareColDescendant("li"),
      {
        "font-size": "13px",
        "letter-spacing": "0",
        "line-height": "1.55",
        "margin-bottom": "4px"
      },
      "compare.col li"
    )
  );
  chunks.push(
    rule(
      compareColDescendant("ul") + `, ${compareColDescendant("ol")}`,
      { "padding-left": "12px", "margin-bottom": "8px" },
      "compare.col ul"
    )
  );
  chunks.push(
    rule(
      compareColDescendant("h3"),
      { "font-size": "14px", "margin-top": "8px", "margin-bottom": "6px", "line-height": "1.4" },
      "compare.col h3"
    )
  );
  chunks.push(
    rule(
      compareColDescendant("code"),
      { "font-size": "12px", padding: "1px 4px" },
      "compare.col code"
    )
  );
  const adContainerP = `.${ROOT_CLASS} .container-tip p,.${ROOT_CLASS} .container-info p,.${ROOT_CLASS} .container-warning p,.${ROOT_CLASS} .container-danger p`;
  chunks.push(rule(adContainerP, { "text-indent": "0" }, "admonition.body p"));
  return chunks.filter(Boolean).join("\n\n");
}
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("py", python);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("json", json);
function highlightCode(code, lang) {
  const language = lang && hljs.getLanguage(lang) ? lang : "";
  if (!language) {
    return { html: escText(code), language: "" };
  }
  try {
    const result = hljs.highlight(code, { language, ignoreIllegals: true });
    return { html: result.value, language };
  } catch {
    return { html: escText(code), language: "" };
  }
}
const atomOneDarkCss = `
.hljs { color: #abb2bf; background: #282c34; }
.hljs-comment, .hljs-quote { color: #5c6370; font-style: italic; }
.hljs-doctag, .hljs-keyword, .hljs-formula { color: #c678dd; }
.hljs-section, .hljs-name, .hljs-selector-tag, .hljs-deletion, .hljs-subst { color: #e06c75; }
.hljs-literal { color: #56b6c2; }
.hljs-string, .hljs-regexp, .hljs-addition, .hljs-attribute, .hljs-meta .hljs-string { color: #98c379; }
.hljs-attr, .hljs-variable, .hljs-template-variable, .hljs-type, .hljs-selector-class, .hljs-selector-attr, .hljs-selector-pseudo, .hljs-number { color: #d19a66; }
.hljs-symbol, .hljs-bullet, .hljs-link, .hljs-meta, .hljs-selector-id, .hljs-title { color: #61aeee; }
.hljs-built_in, .hljs-title.class_, .hljs-class .hljs-title { color: #e6c07b; }
.hljs-emphasis { font-style: italic; }
.hljs-strong { font-weight: bold; }
`;
let lastInput = null;
let lastOutput = null;
function inlineHtml(htmlWithStyle) {
  if (lastInput !== null && lastInput === htmlWithStyle) return lastOutput;
  const styles2 = [];
  const htmlWithoutStyle = htmlWithStyle.replace(
    /<style[^>]*>([\s\S]*?)<\/style>/gi,
    (_, css2) => {
      styles2.push(css2);
      return "";
    }
  );
  const css = styles2.join("\n");
  const out = !css.trim() ? htmlWithoutStyle : juice.inlineContent(htmlWithoutStyle, css, {
    inlinePseudoElements: false,
    preserveImportant: false,
    preserveMediaQueries: false,
    preserveFontFaces: false,
    removeStyleTags: true
  });
  lastInput = htmlWithStyle;
  lastOutput = out;
  return out;
}
function parseFragment(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<!doctype html><html><body><div id="__wx_root__">${html}</div></body></html>`, "text/html");
  const container = doc.getElementById("__wx_root__");
  return { doc, container };
}
function serializeFragment(container) {
  return container.innerHTML;
}
function parseStyle(style) {
  if (!style) return [];
  const out = [];
  const placeholder = "\0";
  let depth = 0;
  let protected_ = "";
  for (const ch of style) {
    if (ch === "(") depth++;
    if (ch === ")") depth = Math.max(0, depth - 1);
    protected_ += depth > 0 && ch === ";" ? placeholder : ch;
  }
  for (const raw of protected_.split(";")) {
    const decl = raw.replace(new RegExp(placeholder, "g"), ";").trim();
    if (!decl) continue;
    const idx = decl.indexOf(":");
    if (idx < 0) continue;
    let prop = decl.slice(0, idx).trim();
    let value = decl.slice(idx + 1).trim();
    let important = false;
    if (/!important\s*$/i.test(value)) {
      important = true;
      value = value.replace(/!important\s*$/i, "").trim();
    }
    if (!prop || !value) continue;
    out.push({ prop, value, important });
  }
  return out;
}
function stringifyStyle(decls) {
  return decls.map((d) => `${d.prop}: ${d.value}${d.important ? " !important" : ""}`).join("; ");
}
function walkElements(root, visitor) {
  const stack = [root];
  while (stack.length) {
    const el = stack.pop();
    visitor(el);
    for (let i = el.children.length - 1; i >= 0; i--) {
      stack.push(el.children[i]);
    }
  }
}
function isInSvg(el) {
  let cur = el;
  while (cur) {
    if (cur.tagName.toLowerCase() === "svg") return true;
    cur = cur.parentElement;
  }
  return false;
}
function patchSvgSubtree(html, visitor) {
  const { container } = parseFragment(html);
  const svgs = container.querySelectorAll("svg");
  svgs.forEach((svg2) => {
    walkElements(svg2, visitor);
  });
  return serializeFragment(container);
}
const WRAP_MARKER$1 = "data-wx-list-wrap";
const FLATTEN_MARKER = "data-wx-list-flatten";
const FLATTEN_BULLET = "· ";
function patchListWrap(html) {
  const { container } = parseFragment(html);
  const deepRoots = [];
  walkElements(container, (el) => {
    const tag = el.tagName.toLowerCase();
    if (tag !== "ul" && tag !== "ol") return;
    if (listDepth(el) === 2) deepRoots.push(el);
  });
  for (const list of deepRoots) {
    const flat = flattenDeepList(list);
    list.parentElement?.replaceChild(flat, list);
  }
  const lists = [];
  walkElements(container, (el) => {
    const tag = el.tagName.toLowerCase();
    if (tag !== "ul" && tag !== "ol") return;
    const parent = el.parentElement;
    if (parent && parent.hasAttribute(WRAP_MARKER$1)) return;
    lists.push(el);
  });
  for (const list of lists) {
    const section = list.ownerDocument.createElement("section");
    section.setAttribute(WRAP_MARKER$1, "");
    const listStyle = list.getAttribute("style") ?? "";
    if (listStyle) {
      section.setAttribute("style", listStyle);
    }
    list.parentElement?.insertBefore(section, list);
    section.appendChild(list);
  }
  return serializeFragment(container);
}
function listDepth(el) {
  let depth = 0;
  let cur = el.parentElement;
  while (cur) {
    const tag = cur.tagName.toLowerCase();
    if (tag === "ul" || tag === "ol") depth++;
    cur = cur.parentElement;
  }
  return depth;
}
function flattenDeepList(list) {
  const doc = list.ownerDocument;
  const out = doc.createDocumentFragment();
  const items = Array.from(list.children).filter(
    (c) => c.tagName.toLowerCase() === "li"
  );
  for (const li of items) {
    const nested = Array.from(li.children).filter((c) => {
      const t = c.tagName.toLowerCase();
      return t === "ul" || t === "ol";
    });
    for (const child of nested) {
      const flat = flattenDeepList(child);
      li.replaceChild(flat, child);
    }
    const selfP = doc.createElement("p");
    selfP.setAttribute(FLATTEN_MARKER, "");
    selfP.appendChild(doc.createTextNode(FLATTEN_BULLET));
    const trailingParagraphs = [];
    while (li.firstChild) {
      const node = li.firstChild;
      if (node.nodeType === 1 && node.tagName.toLowerCase() === "p") {
        trailingParagraphs.push(node);
        li.removeChild(node);
      } else {
        selfP.appendChild(node);
      }
    }
    if (selfP.childNodes.length > 1) out.appendChild(selfP);
    for (const p of trailingParagraphs) out.appendChild(p);
  }
  return out;
}
const ID_WHITELIST$1 = /^(fn|fnref|footnote)[-\d]/i;
function stripForbiddenAttrs(html) {
  const { container } = parseFragment(html);
  walkElements(container, (el) => {
    if (el.hasAttribute("id")) {
      const id = el.getAttribute("id") ?? "";
      if (isInSvg(el) || !ID_WHITELIST$1.test(id)) {
        el.removeAttribute("id");
      }
    }
    const style = el.getAttribute("style");
    if (!style) return;
    const decls = parseStyle(style);
    const kept = decls.filter((d) => !FORBIDDEN_POSITION_PROPS.has(d.prop.toLowerCase()));
    if (kept.length === decls.length) return;
    if (kept.length === 0) {
      el.removeAttribute("style");
    } else {
      el.setAttribute("style", stringifyStyle(kept));
    }
  });
  return serializeFragment(container);
}
function stripForbiddenTags(html) {
  const { container } = parseFragment(html);
  const toRemove = [];
  const all = container.getElementsByTagName("*");
  for (let i = 0; i < all.length; i++) {
    const el = all[i];
    const tag = el.tagName.toLowerCase();
    if (HARD_REMOVE_TAGS.has(tag)) {
      toRemove.push(el);
      continue;
    }
    if (tag === "iframe") {
      const src = el.getAttribute("src") ?? "";
      const allowed = IFRAME_SRC_ALLOW.some((re) => re.test(src));
      if (!allowed) toRemove.push(el);
    }
  }
  for (const el of toRemove) el.remove();
  return serializeFragment(container);
}
function stripFontFamily(html) {
  const { container } = parseFragment(html);
  walkElements(container, (el) => {
    const style = el.getAttribute("style");
    if (!style) return;
    const decls = parseStyle(style);
    const kept = decls.filter((d) => d.prop.toLowerCase() !== "font-family");
    if (kept.length === decls.length) return;
    if (kept.length === 0) {
      el.removeAttribute("style");
    } else {
      el.setAttribute("style", stringifyStyle(kept));
    }
  });
  return serializeFragment(container);
}
const URL_RE = /url\(\s*(['"])([^'"]*)\1\s*\)/g;
function stripQuotesInUrl(s) {
  return s.replace(URL_RE, (_, _q, inner) => `url(${inner})`);
}
function patchSvgUrlQuotes(html) {
  return patchSvgSubtree(html, (el) => {
    for (let i = 0; i < el.attributes.length; i++) {
      const attr = el.attributes[i];
      if (!attr.value.includes("url(")) continue;
      const next = stripQuotesInUrl(attr.value);
      if (next !== attr.value) el.setAttribute(attr.name, next);
    }
    const style = el.getAttribute("style");
    if (style && style.includes("url(")) {
      const decls = parseStyle(style).map((d) => ({ ...d, value: stripQuotesInUrl(d.value) }));
      el.setAttribute("style", stringifyStyle(decls));
    }
  });
}
function patchSvgIds(html) {
  return patchSvgSubtree(html, (el) => {
    if (el.hasAttribute("id")) el.removeAttribute("id");
  });
}
const KEEP_MARKER = "data-wx-keep-flex";
function patchFlexToFallback(html) {
  const { container } = parseFragment(html);
  walkElements(container, (el) => {
    if (el.hasAttribute(KEEP_MARKER)) return;
    const style = el.getAttribute("style");
    if (!style) return;
    const decls = parseStyle(style);
    let changed = false;
    const next = decls.map((d) => {
      if (d.prop.toLowerCase() !== "display") return d;
      const v = d.value.toLowerCase();
      if (v === "flex" || v === "inline-flex") {
        changed = true;
        return { ...d, value: v === "inline-flex" ? "inline-block" : "block" };
      }
      return d;
    });
    if (changed) el.setAttribute("style", stringifyStyle(next));
  });
  return serializeFragment(container);
}
const WHITE_VALUES = /* @__PURE__ */ new Set(["#fff", "#ffffff", "white"]);
const RGB_WHITE_RE = /^\s*rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)\s*$/i;
function isWhite(v) {
  const s = v.trim().toLowerCase();
  return WHITE_VALUES.has(s) || RGB_WHITE_RE.test(s);
}
const COLOR_ATTRS = /* @__PURE__ */ new Set(["fill", "stroke", "stop-color", "flood-color", "lighting-color"]);
const COLOR_STYLE_PROPS = /* @__PURE__ */ new Set(["fill", "stroke", "color", "background", "background-color", "stop-color"]);
function patchSvgWhiteBg(html) {
  return patchSvgSubtree(html, (el) => {
    for (const name of Array.from(COLOR_ATTRS)) {
      const v = el.getAttribute(name);
      if (v && isWhite(v)) el.setAttribute(name, NEAR_WHITE);
    }
    const style = el.getAttribute("style");
    if (!style) return;
    const decls = parseStyle(style).map(
      (d) => COLOR_STYLE_PROPS.has(d.prop.toLowerCase()) && isWhite(d.value) ? { ...d, value: NEAR_WHITE } : d
    );
    el.setAttribute("style", stringifyStyle(decls));
  });
}
const WRAP_MARKER = "data-wx-list-wrap";
const KEEP_FLEX_MARKER = "data-wx-keep-flex";
const ID_WHITELIST = /^(fn|fnref|footnote)[-\d]/i;
const SAMPLE_LIMIT = 5;
function describeSelector(el) {
  const tag = el.tagName.toLowerCase();
  const cls = (el.getAttribute("class") ?? "").trim().split(/\s+/).filter(Boolean).slice(0, 3);
  return cls.length > 0 ? `${tag}.${cls.join(".")}` : tag;
}
function pushSample(bucket, sample) {
  if (bucket.length < SAMPLE_LIMIT) bucket.push(sample);
}
function inspectPatchTargets(html) {
  const counts = {
    listWrap: 0,
    deepList: 0,
    strippedId: 0,
    strippedPos: 0,
    hardTag: 0,
    disallowedIframe: 0,
    fontFamily: 0,
    flexFallback: 0,
    svgId: 0
  };
  const samples = {
    strippedId: [],
    strippedPos: [],
    hardTag: [],
    disallowedIframe: [],
    fontFamily: [],
    flexFallback: [],
    svgId: []
  };
  if (html && html.trim()) {
    try {
      const { container } = parseFragment(html);
      walkElements(container, (el) => {
        if (el === container) return;
        const tag = el.tagName.toLowerCase();
        const selector = describeSelector(el);
        if (tag === "ul" || tag === "ol") {
          const parent = el.parentElement;
          if (!parent || !parent.hasAttribute(WRAP_MARKER)) counts.listWrap++;
          let depth = 0;
          let cur = el.parentElement;
          while (cur) {
            const t = cur.tagName.toLowerCase();
            if (t === "ul" || t === "ol") depth++;
            cur = cur.parentElement;
          }
          if (depth === 2) counts.deepList++;
        }
        if (el.hasAttribute("id")) {
          const id = el.getAttribute("id") ?? "";
          if (isInSvg(el)) {
            counts.svgId++;
            pushSample(samples.svgId, { selector, before: `id="${id}"` });
          } else if (!ID_WHITELIST.test(id)) {
            counts.strippedId++;
            pushSample(samples.strippedId, { selector, before: `id="${id}"` });
          }
        }
        if (HARD_REMOVE_TAGS.has(tag)) {
          counts.hardTag++;
          pushSample(samples.hardTag, { selector, before: `<${tag}>` });
        }
        if (tag === "iframe") {
          const src = el.getAttribute("src") ?? "";
          const allowed = IFRAME_SRC_ALLOW.some((re) => re.test(src));
          if (!allowed) {
            counts.disallowedIframe++;
            pushSample(samples.disallowedIframe, { selector, before: `src="${src}"` });
          }
        }
        const style = el.getAttribute("style");
        if (style) {
          const decls = parseStyle(style);
          for (const d of decls) {
            const prop = d.prop.toLowerCase();
            if (FORBIDDEN_POSITION_PROPS.has(prop)) {
              counts.strippedPos++;
              pushSample(samples.strippedPos, { selector, before: `${d.prop}: ${d.value}` });
            }
            if (prop === "font-family") {
              counts.fontFamily++;
              pushSample(samples.fontFamily, { selector, before: `${d.prop}: ${d.value}` });
            }
            if (prop === "display" && /flex/i.test(d.value) && !el.hasAttribute(KEEP_FLEX_MARKER)) {
              counts.flexFallback++;
              pushSample(samples.flexFallback, { selector, before: `display: ${d.value}` });
            }
          }
        }
      });
    } catch {
    }
  }
  const entries = [];
  if (counts.listWrap)
    entries.push({ patch: "patchListWrap", label: "列表外包 <section>（保住外边距）", count: counts.listWrap });
  if (counts.deepList)
    entries.push({ patch: "patchListWrap", label: "≥ 3 层嵌套列表扁平化为段落", count: counts.deepList });
  if (counts.strippedId)
    entries.push({ patch: "stripForbiddenAttrs", label: "删除 id 属性（脚注锚点除外）", count: counts.strippedId, samples: samples.strippedId });
  if (counts.strippedPos)
    entries.push({ patch: "stripForbiddenAttrs", label: "剥离 position/top/z-index 等定位声明", count: counts.strippedPos, samples: samples.strippedPos });
  if (counts.hardTag)
    entries.push({ patch: "stripForbiddenTags", label: "移除 style/script/meta/link 等标签", count: counts.hardTag, samples: samples.hardTag });
  if (counts.disallowedIframe)
    entries.push({ patch: "stripForbiddenTags", label: "剥离非白名单 iframe", count: counts.disallowedIframe, samples: samples.disallowedIframe });
  if (counts.fontFamily)
    entries.push({ patch: "stripFontFamily", label: "剥离 inline font-family", count: counts.fontFamily, samples: samples.fontFamily });
  if (counts.flexFallback)
    entries.push({ patch: "patchFlexToFallback", label: "display:flex → block 降级", count: counts.flexFallback, samples: samples.flexFallback });
  if (counts.svgId)
    entries.push({ patch: "patchSvgIds", label: "SVG 子树 id 清理", count: counts.svgId, samples: samples.svgId });
  return {
    entries,
    total: entries.reduce((s, e) => s + e.count, 0)
  };
}
function applyWxPatches(html, opts = {}) {
  let out = html;
  out = patchListWrap(out);
  out = stripForbiddenAttrs(out);
  out = stripForbiddenTags(out);
  out = stripFontFamily(out);
  out = patchSvgUrlQuotes(out);
  out = patchSvgIds(out);
  out = patchFlexToFallback(out);
  if (opts.svgWhiteBg !== false) out = patchSvgWhiteBg(out);
  return out;
}
const wechatAdapter = {
  id: "wechat",
  name: "微信公众号",
  status: "stable",
  patch: (html, opts) => applyWxPatches(html, opts ?? {}),
  inspect: inspectPatchTargets
};
function applyZhihuPatches(html, _opts = {}) {
  return html;
}
const zhihuAdapter = {
  id: "zhihu",
  name: "知乎专栏",
  status: "placeholder",
  patch: (html, opts) => applyZhihuPatches(html, opts ?? {})
};
function applyXhsPatches(html, _opts = {}) {
  return html;
}
const xhsAdapter = {
  id: "xhs",
  name: "小红书",
  status: "placeholder",
  patch: (html, opts) => applyXhsPatches(html, opts ?? {})
};
const ALL = [wechatAdapter, zhihuAdapter, xhsAdapter];
const BY_ID = Object.fromEntries(
  ALL.map((a) => [a.id, a])
);
const DEFAULT_PLATFORM_ID = "wechat";
function listPlatforms() {
  return ALL;
}
function getPlatform(id) {
  const adapter = BY_ID[id];
  if (!adapter) {
    fail("PLATFORM_UNSUPPORTED", `Unknown platform id: "${id}"`, {
      hint: `Known: ${ALL.map((a) => a.id).join(", ")}`
    });
  }
  return adapter;
}
const FENCE_RE = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/;
function parseFrontmatter(source) {
  const m = FENCE_RE.exec(source);
  if (!m) return { config: {}, body: source, issues: [] };
  const yamlText = m[1];
  const body = source.slice(m[0].length);
  const { tree, issues } = parseShallowYaml(yamlText);
  const config = {};
  const variantsNode = tree.variants;
  if (variantsNode !== void 0) {
    if (typeof variantsNode === "string") {
      issues.push({
        path: "variants",
        message: "variants 应为对象（嵌套 key: id 形式），不是标量值",
        severity: "error"
      });
    } else {
      const validatedVariants = {};
      for (const [key, raw] of Object.entries(variantsNode)) {
        if (typeof raw !== "string") {
          issues.push({
            path: `variants.${key}`,
            message: "值应为 variant id 字符串",
            severity: "error"
          });
          continue;
        }
        if (!(key in VARIANT_IDS)) {
          issues.push({
            path: `variants.${key}`,
            message: `未知 variant slot "${key}"——合法值：${Object.keys(VARIANT_IDS).join(" / ")}`,
            severity: "warning"
          });
          continue;
        }
        const allowed = VARIANT_IDS[key];
        if (!allowed.includes(raw)) {
          issues.push({
            path: `variants.${key}`,
            message: `非法 variant id "${raw}"——${key} 合法值：${allowed.join(" / ")}`,
            severity: "warning"
          });
          continue;
        }
        validatedVariants[key] = raw;
      }
      if (Object.keys(validatedVariants).length > 0) config.variants = validatedVariants;
    }
  }
  const themeNode = tree.theme;
  if (themeNode !== void 0) {
    if (typeof themeNode !== "string") {
      issues.push({
        path: "theme",
        message: "theme 应为字符串（主题 id）",
        severity: "error"
      });
    } else {
      config.theme = themeNode;
    }
  }
  for (const key of Object.keys(tree)) {
    if (key !== "variants" && key !== "theme") {
      issues.push({
        path: key,
        message: `未识别 frontmatter 字段 "${key}"——本契约目前只消费 variants / theme`,
        severity: "warning"
      });
    }
  }
  return { config, body, issues };
}
const KV_RE = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/;
function unquote(s) {
  const t = s.trim();
  if (t.length >= 2) {
    if (t.startsWith('"') && t.endsWith('"') || t.startsWith("'") && t.endsWith("'")) {
      return t.slice(1, -1);
    }
  }
  return t;
}
function parseShallowYaml(text) {
  const tree = {};
  const issues = [];
  const lines = text.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) {
      i++;
      continue;
    }
    const indent = line.match(/^(\s*)/)?.[1].length ?? 0;
    if (indent > 0) {
      issues.push({
        path: `line:${i + 1}`,
        message: "frontmatter 顶层不应缩进；嵌套对象用 `key:` 头 + 下一行缩进 2 空格",
        severity: "warning"
      });
      i++;
      continue;
    }
    const m = KV_RE.exec(line);
    if (!m) {
      issues.push({
        path: `line:${i + 1}`,
        message: `无法解析（期望 \`key: value\` 形式）：${line}`,
        severity: "warning"
      });
      i++;
      continue;
    }
    const key = m[1];
    const value = m[2];
    if (value.trim() === "") {
      const nested = {};
      i++;
      while (i < lines.length) {
        const ln = lines[i];
        if (!ln.trim()) {
          i++;
          continue;
        }
        const childIndent = ln.match(/^(\s*)/)?.[1].length ?? 0;
        if (childIndent === 0) break;
        const cm = KV_RE.exec(ln.trim());
        if (!cm) {
          issues.push({
            path: `${key}.line:${i + 1}`,
            message: `无法解析嵌套行：${ln}`,
            severity: "warning"
          });
          i++;
          continue;
        }
        nested[cm[1]] = unquote(cm[2]);
        i++;
      }
      tree[key] = nested;
    } else {
      tree[key] = unquote(value);
      i++;
    }
  }
  return { tree, issues };
}
const MD_CACHE_MAX = 12;
const mdCache = createLRU(MD_CACHE_MAX);
function customsSig(uvs) {
  if (uvs.length === 0) return "";
  return [...uvs].sort((a, b) => a.id.localeCompare(b.id)).map((uv) => `${uv.id}@${uv.updatedAt}`).join("|");
}
function getMarkdown(theme, customVariants) {
  const key = `${theme.id}:${customsSig(customVariants)}`;
  const cached = mdCache.get(key);
  if (cached) return cached;
  const md = createMarkdown({ theme, customVariants });
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx];
    const info = token.info ? token.info.trim() : "";
    const { title, attrs } = parseInfo(info);
    const lang = title.split(/\s+/)[0] ?? "";
    const { html, language } = highlightCode(token.content, lang);
    const themeDefault = theme.variants.codeBlock;
    const override = attrs.variant;
    const chosen = override && override in CODE_BLOCK_VARIANTS ? override : themeDefault;
    const variant = CODE_BLOCK_VARIANTS[chosen] ?? CODE_BLOCK_VARIANTS.bare;
    return variant.render(theme, { language, codeInnerHtml: html }) + "\n";
  };
  mdCache.set(key, md);
  return md;
}
const RENDER_OUTPUT_CACHE_MAX = 16;
const renderCache = createLRU(RENDER_OUTPUT_CACHE_MAX);
function djb2(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) + h + s.charCodeAt(i) | 0;
  }
  return h.toString(36);
}
function uvSig(uvs) {
  if (!uvs || uvs.length === 0) return "";
  return [...uvs].sort((a, b) => a.id.localeCompare(b.id)).map((uv) => `${uv.id}@${uv.updatedAt}`).join("|");
}
function buildRenderCacheKey(input) {
  const platform = input.platform ?? DEFAULT_PLATFORM_ID;
  const wxPatchSig = input.wxPatch ? djb2(JSON.stringify(input.wxPatch)) : "";
  return [
    input.theme.id,
    djb2(input.md),
    platform,
    wxPatchSig,
    uvSig(input.userVariants)
  ].join(":");
}
function render$1(input) {
  const cacheKey = buildRenderCacheKey(input);
  const cached = renderCache.get(cacheKey);
  if (cached) return cached;
  const { md: source, theme } = input;
  const { config: pageConfig, body, issues: frontmatterIssues } = parseFrontmatter(source);
  const allUvs = input.userVariants ?? [];
  const customUvs = allUvs.filter(
    (uv) => uv.level === "custom"
  );
  const mdInstance = getMarkdown(theme, customUvs);
  const env = {};
  if (pageConfig.variants) env.__wxPageVariants = pageConfig.variants;
  if (allUvs.length > 0) {
    env.__wxUserVariants = new Map(allUvs.map((uv) => [uv.id, uv]));
  }
  const bodyHtml = mdInstance.render(body, env);
  const themeCss = generateThemeCSS(theme);
  const htmlWithStyle = [
    `<section class="${ROOT_CLASS}">`,
    `<style>${themeCss}
${atomOneDarkCss}</style>`,
    bodyHtml,
    `</section>`
  ].join("\n");
  const inlined = inlineHtml(htmlWithStyle);
  const platform = getPlatform(input.platform ?? DEFAULT_PLATFORM_ID);
  const patchLog = platform.inspect ? platform.inspect(inlined) : { entries: [], total: 0 };
  const finalHtml = platform.patch(inlined, input.wxPatch);
  const wordCount = countWords(body);
  const readingTime = Math.max(1, Math.ceil(wordCount / 300));
  const out = {
    html: finalHtml,
    wordCount,
    readingTime,
    patchLog,
    pageConfig,
    frontmatterIssues
  };
  renderCache.set(cacheKey, out);
  return out;
}
function countWords(s) {
  const cjk = (s.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) ?? []).length;
  const enWords = s.replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, " ").split(/\s+/).filter(Boolean).length;
  return cjk + enWords;
}
function getContainerVocabulary$1() {
  return CONTAINER_VOCABULARY;
}
function getContainerSpec$1(name) {
  return lookupContainerSpec(name);
}
function variantMeta(kind, id) {
  const table = {
    admonition: ADMONITION_VARIANTS,
    quote: QUOTE_VARIANTS,
    compare: COMPARE_VARIANTS,
    steps: STEPS_VARIANTS,
    divider: DIVIDER_VARIANTS,
    sectionTitle: SECTION_TITLE_VARIANTS,
    codeBlock: CODE_BLOCK_VARIANTS,
    note: NOTE_VARIANTS,
    highlight: HIGHLIGHT_VARIANTS,
    footnotes: FOOTNOTES_VARIANTS,
    recommend: RECOMMEND_VARIANTS,
    qrcode: QRCODE_VARIANTS,
    footerCTA: FOOTER_CTA_VARIANTS,
    pullQuote: PULL_QUOTE_VARIANTS,
    announcement: ANNOUNCEMENT_VARIANTS,
    tableCard: TABLE_CARD_VARIANTS,
    gallery: GALLERY_VARIANTS,
    dialogue: DIALOGUE_VARIANTS,
    qaBlock: QA_BLOCK_VARIANTS
  };
  const def = table[kind]?.[id];
  if (!def) return void 0;
  return {
    id,
    kind,
    name: def.meta.name,
    description: def.meta.description,
    designedFor: def.meta.designedFor
  };
}
function getVariantsForContainer$1(containerName) {
  const spec2 = lookupContainerSpec(containerName);
  if (!spec2 || !spec2.variantKind) return [];
  return variantIdsForKind(spec2.variantKind).map((id) => variantMeta(spec2.variantKind, id)).filter(Boolean);
}
function variantIdsForKind(kind) {
  const table = {
    admonition: ADMONITION_VARIANTS,
    quote: QUOTE_VARIANTS,
    compare: COMPARE_VARIANTS,
    steps: STEPS_VARIANTS,
    divider: DIVIDER_VARIANTS,
    sectionTitle: SECTION_TITLE_VARIANTS,
    codeBlock: CODE_BLOCK_VARIANTS,
    note: NOTE_VARIANTS,
    highlight: HIGHLIGHT_VARIANTS,
    footnotes: FOOTNOTES_VARIANTS,
    recommend: RECOMMEND_VARIANTS,
    qrcode: QRCODE_VARIANTS,
    footerCTA: FOOTER_CTA_VARIANTS,
    pullQuote: PULL_QUOTE_VARIANTS,
    announcement: ANNOUNCEMENT_VARIANTS,
    tableCard: TABLE_CARD_VARIANTS,
    gallery: GALLERY_VARIANTS,
    dialogue: DIALOGUE_VARIANTS,
    qaBlock: QA_BLOCK_VARIANTS
  };
  return Object.keys(table[kind] ?? {});
}
function getThemeDefaultVariants$1(variants) {
  const kinds = [
    "admonition",
    "quote",
    "compare",
    "steps",
    "divider",
    "sectionTitle",
    "codeBlock",
    "note",
    "highlight",
    "footnotes"
  ];
  const out = [];
  for (const kind of kinds) {
    const id = variants[kind];
    if (!id) continue;
    const meta = variantMeta(kind, id);
    if (meta) out.push(meta);
  }
  return out;
}
function getContainerSnippet$1(containerName, options = {}) {
  const spec2 = lookupContainerSpec(containerName);
  if (!spec2) fail("RESOURCE_NOT_FOUND", `Unknown container name: "${containerName}"`);
  if (!options.variantId) return spec2.example;
  const fence = spec2.fenceLength === 4 ? "::::" : ":::";
  const lines = spec2.example.split("\n");
  const openIdx = lines.findIndex((l) => l.startsWith(fence));
  if (openIdx < 0) return spec2.example;
  const open = lines[openIdx];
  lines[openIdx] = /\bvariant=/.test(open) ? open.replace(/\bvariant=("[^"]*"|'[^']*'|\S+)/, `variant=${options.variantId}`) : `${open}${open.endsWith(" ") ? "" : " "}variant=${options.variantId}`.trimEnd();
  return lines.join("\n");
}
const VARIANT_KINDS = [
  "admonition",
  "quote",
  "compare",
  "steps",
  "divider",
  "sectionTitle",
  "codeBlock",
  "note",
  "highlight",
  "footnotes"
];
function getThemeCapabilitiesView(args) {
  const sigSet = /* @__PURE__ */ new Set();
  for (const spec2 of CONTAINER_VOCABULARY) {
    if (spec2.styleKey && args.signatureContainers?.includes(spec2.styleKey)) {
      sigSet.add(spec2.name);
    }
  }
  const whitelist = args.capabilities?.containers ? new Set(args.capabilities.containers) : void 0;
  const excluded = new Set(args.capabilities?.excluded ?? []);
  const containers = CONTAINER_VOCABULARY.map((spec2) => {
    const pack = packOf(spec2);
    const namespace = namespaceOf(pack);
    const nsEnabled = isContainerEnabledForTheme(spec2, args.themeId);
    const whitelistOk = whitelist ? whitelist.has(spec2.name) : true;
    const ex = excluded.has(spec2.name);
    return {
      id: spec2.name,
      namespace,
      pack,
      available: nsEnabled && whitelistOk && !ex,
      signature: sigSet.has(spec2.name),
      excluded: ex
    };
  });
  const defaultVariants = {};
  for (const k of VARIANT_KINDS) {
    const v = args.variants[k];
    if (v !== void 0) defaultVariants[k] = v;
  }
  return {
    themeId: args.themeId,
    defaultVariants,
    recommendedVariantOverrides: { ...args.capabilities?.variantOverrides ?? {} },
    containers
  };
}
function getRecommendedVariantsFor$1(args) {
  const overrides = args.capabilities?.variantOverrides ?? {};
  const out = {};
  for (const kind of VARIANT_KINDS) {
    const fromCompat = [];
    for (const def of ALL_VARIANT_DEFS) {
      if (def.meta.kind !== kind) continue;
      const designedFor = def.meta.designedFor;
      if (designedFor && designedFor.includes(args.themeId)) fromCompat.push(def.meta.id);
    }
    const explicit = overrides[kind];
    const merged = explicit ? [explicit, ...fromCompat.filter((id) => id !== explicit)] : fromCompat;
    out[kind] = merged;
  }
  return out;
}
function toSummary(spec2) {
  return {
    id: spec2.id,
    name: spec2.name,
    description: spec2.description,
    audience: spec2.audience,
    palette: spec2.palette,
    variants: spec2.variants,
    signatureContainers: spec2.signatureContainers ?? []
  };
}
function listPersonas() {
  return ORDERED_SPECS.map(toSummary);
}
function getPersona(id) {
  const spec2 = SPEC_REGISTRY[id];
  if (!spec2) {
    fail("RESOURCE_NOT_FOUND", `Unknown persona id: "${id}"`, {
      path: `persona.id`,
      hint: `Known ids: ${Object.keys(SPEC_REGISTRY).join(", ")}`
    });
  }
  return spec2;
}
function getPersonaSummary(id) {
  return toSummary(getPersona(id));
}
function getSchema() {
  return PERSONA_SPEC_SCHEMA;
}
function getSupportedSignatureContainers() {
  return SUPPORTED_SIGNATURE_CONTAINERS;
}
function getVariantIds() {
  return VARIANT_IDS;
}
const HARD_RULES = Object.freeze({
  hexPattern: HEX_RE.source,
  minFontSize: MIN_FONT_SIZE,
  minStrokeWidth: MIN_STROKE_WIDTH,
  allowedFontFamilies: Object.freeze([...ALLOWED_FONT_FAMILIES])
});
function getDefaultKickers() {
  return DEFAULT_KICKERS;
}
function getInlineExtensions() {
  return INLINE_EXTENSIONS;
}
function getContainerVocabulary() {
  return getContainerVocabulary$1();
}
function getContainerSpec(name) {
  return getContainerSpec$1(name);
}
function getVariantsForContainer(containerName) {
  return getVariantsForContainer$1(containerName);
}
function getThemeDefaultVariants(variants) {
  return getThemeDefaultVariants$1(variants);
}
function getContainerSnippet(containerName, options) {
  return getContainerSnippet$1(containerName, options);
}
function getThemeCapabilities(personaId) {
  const spec2 = getPersona(personaId);
  return getThemeCapabilitiesView({
    themeId: spec2.id,
    variants: { ...DEFAULT_VARIANTS, ...spec2.variants },
    capabilities: spec2.capabilities,
    signatureContainers: spec2.signatureContainers
  });
}
function getRecommendedVariantsFor(personaId) {
  const spec2 = getPersona(personaId);
  return getRecommendedVariantsFor$1({
    themeId: spec2.id,
    capabilities: spec2.capabilities
  });
}
function validatePersona(spec2) {
  return validateSpec(spec2);
}
function render(input) {
  const { config: fm } = parseFrontmatter(input.md);
  const theme = resolveTheme(input, fm.theme);
  return render$1({
    md: input.md,
    theme,
    platform: input.platform,
    wxPatch: input.wxPatch
  });
}
function listPublishPlatforms() {
  return listPlatforms().map((p) => ({
    id: p.id,
    name: p.name,
    status: p.status
  }));
}
function resolveTheme(input, frontmatterTheme) {
  const declared = [input.persona, input.theme, input.spec].filter((v) => v !== void 0).length;
  if (declared > 1) {
    fail(
      "INPUT_AMBIGUOUS",
      `render: provide exactly one of \`persona\` | \`theme\` | \`spec\` (got ${declared})`
    );
  }
  if (frontmatterTheme && SPEC_REGISTRY[frontmatterTheme]) {
    return specToTheme(SPEC_REGISTRY[frontmatterTheme]);
  }
  if (input.theme) return input.theme;
  if (input.spec) {
    const result = validateSpec(input.spec);
    if (!result.ok) throw new WtException("SPEC_INVALID", result.errors, result.warnings);
    return specToTheme(input.spec);
  }
  const id = input.persona ?? "default";
  const spec2 = getPersona(id);
  return specToTheme(spec2);
}
function createPersona(spec2) {
  const validation = validateSpec(spec2);
  const theme = specToTheme(spec2);
  return { theme, validation };
}
function getMotifSpec(personaId) {
  return getPersona(personaId).motifs;
}
function renderMotif(shape, tokens) {
  return shapeToSvg(shape, tokens);
}
function renderMotifWithValues(template, values, tokens) {
  return renderMotifTemplate(template, values, tokens);
}
export {
  EXIT_CODES,
  HARD_RULES,
  WT_ERROR_INFO,
  WtException,
  createPersona,
  fail,
  getContainerSnippet,
  getContainerSpec,
  getContainerVocabulary,
  getDefaultKickers,
  getInlineExtensions,
  getMotifSpec,
  getPersona,
  getPersonaSummary,
  getRecommendedVariantsFor,
  getSchema,
  getSupportedSignatureContainers,
  getThemeCapabilities,
  getThemeDefaultVariants,
  getVariantIds,
  getVariantsForContainer,
  listPersonas,
  listPublishPlatforms,
  parseFrontmatter,
  render,
  renderMotif,
  renderMotifWithValues,
  validatePersona
};
//# sourceMappingURL=index.js.map
