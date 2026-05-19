// Lay out all container variants in a DesignCanvas with a live Tweaks panel.
//
// DCSection only picks up DCArtboard children that are DIRECT children
// (it filters by component type), so we render the artboards inline rather
// than through a wrapper component.

const { useEffect } = React;
const AB_W = 440;

// --- Palette presets (ordered: accent, ink, paper) --------------------------
const PALETTES = [
  ['#B8473C', '#1a1a1a', '#fafaf7'], // 朱砂 / 墨 / 纸  (default)
  ['#3F6B4E', '#1a1a1a', '#f7f7f2'], // 松绿 / 墨 / 暖白
  ['#27497A', '#1a1a1a', '#f6f7f4'], // 靛蓝 / 墨 / 冷白
  ['#A66A2E', '#1a1a1a', '#faf7f0'], // 赭石 / 墨 / 米黄
  ['#1a1a1a', '#1a1a1a', '#fafaf7'], // 全墨 / 无主题色
];

// Mix `hex` with white at `amt` (0..1) so we can derive --accent-soft.
function softTint(hex, amt = 0.86) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0,2),16);
  const g = parseInt(h.slice(2,4),16);
  const b = parseInt(h.slice(4,6),16);
  const mix = (c) => Math.round(c + (255 - c) * amt);
  const to2 = (n) => n.toString(16).padStart(2,'0');
  return '#' + to2(mix(r)) + to2(mix(g)) + to2(mix(b));
}
// Mix `hex` with paper at `amt` (0..1) to derive --accent-ink (darker accent).
function deepenedAccent(hex, amt = 0.4) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0,2),16);
  const g = parseInt(h.slice(2,4),16);
  const b = parseInt(h.slice(4,6),16);
  const mix = (c) => Math.round(c * (1 - amt));
  const to2 = (n) => n.toString(16).padStart(2,'0');
  return '#' + to2(mix(r)) + to2(mix(g)) + to2(mix(b));
}

function applyTweaks(t) {
  const root = document.documentElement.style;
  const [accent, ink, paper] = t.palette;
  root.setProperty('--accent', accent);
  root.setProperty('--accent-soft', softTint(accent, 0.86));
  root.setProperty('--accent-ink', deepenedAccent(accent, 0.4));
  root.setProperty('--ink', ink);
  root.setProperty('--paper', paper);
  root.setProperty('--tw-title',
    t.titleFont === 'sans' ? 'var(--cn-sans)' : 'var(--cn-serif)');
  root.setProperty('--tw-fs', t.fontSize + 'px');
  root.setProperty('--tw-r', t.radius + 'px');
  root.setProperty('--tw-r-sm', Math.max(0, Math.round(t.radius / 2)) + 'px');
  root.setProperty('--tw-pgap', t.paraGap + 'px');
}

function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  useEffect(() => { applyTweaks(t); }, [t]);

  const mk = (id, label, Comp, h) => (
    <DCArtboard key={id} id={id} label={label} width={AB_W} height={h}>
      <Comp />
    </DCArtboard>
  );

  return (
    <>
      <DesignCanvas defaultZoom={0.62}>
        <DCSection id="A" title="A · 引用 / 金句" subtitle="文字本身即装饰 — 大引号锚点 · 报纸署名 · 上下引号包围 · 纯字体">
          {mk('A1', 'A1 · 大引号锚点', QuoteA1, 520)}
          {mk('A2', 'A2 · 报纸署名式', QuoteA2, 520)}
          {mk('A3', 'A3 · 上下引号包围 · 居中', QuoteA3, 520)}
          {mk('A4', 'A4 · 纯字体 italic · 0 装饰', QuoteA4, 520)}
        </DCSection>

        <DCSection id="B" title="B · 提示 / 注意" subtitle="不同的视觉锚 — 浅主题色背景 · 横标 · 字号对比 · 上下线收束">
          {mk('B1', 'B1 · 浅主题色 + 图标', TipB1, 480)}
          {mk('B2', 'B2 · 纸条 · NOTE 横标', TipB2, 480)}
          {mk('B3', 'B3 · 大字号「注意」', TipB3, 480)}
          {mk('B4', 'B4 · 上下细线收束', TipB4, 480)}
        </DCSection>

        <DCSection id="C" title="C · 步骤 / 列表" subtitle="不同的连接逻辑 — 圆点+虚线 · 横向流 · 时间轴 · 巨号衬字">
          {mk('C1', 'C1 · 圆形序号 + 虚线连接', StepC1, 560)}
          {mk('C2', 'C2 · 横向步骤条 1→2→3', StepC2, 560)}
          {mk('C3', 'C3 · 时间轴竖排', StepC3, 560)}
          {mk('C4', 'C4 · 巨号透明数字衬字', StepC4, 560)}
        </DCSection>

        <DCSection id="D" title="D · 数据 / 统计" subtitle="信息密度递进 — 单数据 · 多数据反白 · 进度条 · 对比双列">
          {mk('D1', 'D1 · 大数字 + 单位分离', DataD1, 500)}
          {mk('D2', 'D2 · 深色反白多指标', DataD2, 500)}
          {mk('D3', 'D3 · 圆角进度条组', DataD3, 500)}
          {mk('D4', 'D4 · 改版前后对比', DataD4, 500)}
        </DCSection>

        <DCSection id="E" title="E · 标题 / 小节" subtitle="标题的四种打开方式 — 下划线 · 衬字 · 徽章 · 错位高亮">
          {mk('E1', 'E1 · 下方短横线 + 引言', HeadE1, 460)}
          {mk('E2', 'E2 · 巨号透明数字衬字', HeadE2, 460)}
          {mk('E3', 'E3 · 序号徽章横排', HeadE3, 460)}
          {mk('E4', 'E4 · 错位高亮双色', HeadE4, 460)}
        </DCSection>

        <DCSection id="F" title="F · 对比 / 卡片组" subtitle="留白即分隔 — 双卡主次 · 三卡其一反白 · 行式对比 · 索引网格">
          {mk('F1', 'F1 · 主次卡 · 双列', CardsF1, 470)}
          {mk('F2', 'F2 · 三卡 · 其一反白', CardsF2, 470)}
          {mk('F3', 'F3 · 行式对比', CardsF3, 470)}
          {mk('F4', 'F4 · 索引网格', CardsF4, 470)}
        </DCSection>

        <DCSection id="G" title="G · 分割 / 过渡" subtitle="装饰即语义 — 渐变线 · 文字横标 · 装饰字符 · 留白本身">
          {mk('G1', 'G1 · 渐变淡入淡出', DivG1, 380)}
          {mk('G2', 'G2 · 文字横标分隔', DivG2, 380)}
          {mk('G3', 'G3 · 装饰字符 ◆◆◆', DivG3, 380)}
          {mk('G4', 'G4 · 居中尾声字符', DivG4, 380)}
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="配色">
          <TweakColor
            label="主题方案"
            value={t.palette}
            options={PALETTES}
            onChange={(v) => setTweak('palette', v)}
          />
        </TweakSection>

        <TweakSection label="字体">
          <TweakRadio
            label="标题字体"
            value={t.titleFont}
            options={[
              { value: 'serif', label: '衬线' },
              { value: 'sans',  label: '黑体' },
            ]}
            onChange={(v) => setTweak('titleFont', v)}
          />
          <TweakSlider
            label="正文字号"
            value={t.fontSize}
            min={13} max={18} step={1} unit="px"
            onChange={(v) => setTweak('fontSize', v)}
          />
        </TweakSection>

        <TweakSection label="形态">
          <TweakRadio
            label="圆角粒度"
            value={t.radius}
            options={[
              { value: 0,  label: '直角' },
              { value: 4,  label: '微圆' },
              { value: 10, label: '大圆' },
            ]}
            onChange={(v) => setTweak('radius', v)}
          />
          <TweakSlider
            label="段距"
            value={t.paraGap}
            min={8} max={24} step={2} unit="px"
            onChange={(v) => setTweak('paraGap', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
