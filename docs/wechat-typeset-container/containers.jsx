// Container variants — each rendered inside a .wx (WeChat article body) wrapper

// ======================= A. 引用 / 金句 =======================
function QuoteA1() {
  return (
    <div className="wx">
      <p className="lede">罗兰·巴特在《明室》中谈到摄影的「刺点」时写道：</p>
      <div className="quote-a1">
        <div className="t">真正打动我的，不是照片说了什么，而是它无意中漏出来的那一点细节——一根带子、一只袖口、一只猫的爪。它从画面中刺穿出来，直接刺到我心里。</div>
      </div>
      <p>这个观察可以延伸到一切阅读体验：让我们停留的，常常不是论点，而是论点旁边那个意外的褶皱。</p>
    </div>
  );
}

function QuoteA2() {
  return (
    <div className="wx">
      <p className="lede">关于写作的克制：</p>
      <div className="quote-a2">
        <div className="t">写作不是把所有想说的话说出来；写作是知道哪些话不说，并让读者听见那些没说的。</div>
        <div className="by">玛丽莲·罗宾逊 · 写作十讲</div>
      </div>
      <p>这种克制并非妥协，而是更高级的表达 —— 把决定权交还给读者，让阅读成为合作。</p>
    </div>
  );
}

function QuoteA3() {
  return (
    <div className="wx">
      <p className="lede">在喧嚣的内容环境里，安静本身就是一种立场。</p>
      <div className="quote-a3">
        <div className="mark">{'\u201C'}</div>
        <div className="t">最好的设计，是让人完全意识不到设计的存在 —— 它消失在它要服务的事情里。</div>
        <div className="mark b">{'\u201C'}</div>
      </div>
      <p>这句话出自迪特·拉姆斯，但放在任何一种创作里都成立。</p>
    </div>
  );
}

function QuoteA4() {
  return (
    <div className="wx">
      <p className="lede">如果只能给设计师一句忠告，我会选这一句：</p>
      <div className="quote-a4">
        <div className="t">删除一切<em>可以删除</em>的东西，然后再删一次。</div>
      </div>
      <p>这不是关于极简主义，而是关于责任 —— 屏幕上每一个像素都在向读者索取注意力，必须值得这份索取。</p>
    </div>
  );
}

// ======================= B. 提示 / 注意 =======================
function TipB1() {
  return (
    <div className="wx">
      <p className="lede">在你开始这一章之前，先确认你的工具链已经就位。</p>
      <div className="tip-b1">
        <div className="h">
          <svg className="ic" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M8 4.6V8.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            <circle cx="8" cy="11.2" r=".95" fill="currentColor"/>
          </svg>
          <div className="lbl">写在前面</div>
        </div>
        <div className="body">本文的所有示例都假设你已经能熟练使用浏览器开发者工具。如果你还没有，建议先花二十分钟过一遍 Chrome DevTools 的官方导览。</div>
      </div>
      <p>准备好了，就让我们开始。</p>
    </div>
  );
}

function TipB2() {
  return (
    <div className="wx">
      <p className="lede">很多读者私信问我，为什么我从不用「框框」做笔记。</p>
      <div className="tip-b2">
        <div className="tag">N O T E</div>
        <div className="body">边框是一种偷懒的视觉手段 —— 它把所有的层次关系简化成一句「这里不一样」。而真正高级的排版，会让你说出「为什么不一样」、「不一样到什么程度」、「这种不一样意味着什么」。</div>
      </div>
      <p>所以接下来你会看到，提示框可以是背景、可以是字号、可以是空气，唯独不必是一个框。</p>
    </div>
  );
}

function TipB3() {
  return (
    <div className="wx">
      <p className="lede">所有数据采集工作开始之前，请先阅读以下条款：</p>
      <div className="tip-b3">
        <div>
          <div className="lbl">注<span className="dot">·</span>意</div>
          <div className="sub">P R E R E Q U I S I T E</div>
        </div>
        <div className="body">采集前必须取得用户的显式同意。匿名化处理不能替代知情同意，去标识化也不能。如果你的产品涉及未成年人，对应的合规要求会更严格。</div>
      </div>
      <p>不确定时，把流程发给法务过一遍；多花两天，胜过事后整改。</p>
    </div>
  );
}

function TipB4() {
  return (
    <div className="wx">
      <p className="lede">这一节是整本指南里最容易被跳过、但其实最重要的部分。</p>
      <div className="tip-b4">
        <div className="rule">
          <div className="ln"></div>
          <div className="lbl">C A V E A T</div>
          <div className="ln"></div>
        </div>
        <div className="body">下文的所有结论都建立在「样本独立同分布」这一假设上。如果你的数据是时间序列、或存在显著的群体效应，请直接跳到第五章。</div>
        <div className="end"></div>
      </div>
      <p>承认假设的边界，是研究者的基本职业素养。</p>
    </div>
  );
}

// ======================= C. 步骤 / 列表 =======================
function StepC1() {
  return (
    <div className="wx">
      <p className="lede">把一个想法落地，通常只需要四步 —— 但每一步都不能跳。</p>
      <div className="step-c1">
        {[
          ['01','锚定问题','别从解决方案开始；先用一句不超过 30 字的话写清楚你要回答的问题。'],
          ['02','穷举假设','至少写三个可能的解释，包括你最不愿意接受的那个。'],
          ['03','设计验证','为每个假设找出能让它被证伪的最小实验。'],
          ['04','复盘归档','无论结果好坏，把过程写下来，未来的你会感谢现在的你。'],
        ].map(([n,h,d])=>(
          <div className="it" key={n}>
            <div className="n">{n}</div>
            <div>
              <div className="h">{h}</div>
              <div className="d">{d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepC2() {
  return (
    <div className="wx">
      <p className="lede">一篇好的公众号文章，从选题到发布通常会经过三个阶段：</p>
      <div className="step-c2">
        <div className="row">
          <div className="cell">
            <div className="lbl">P H A S E</div>
            <div className="n">壹</div>
            <div className="t">选题与立意<br/>找到只有你能写的角度</div>
          </div>
          <div className="arr">→</div>
          <div className="cell">
            <div className="lbl">P H A S E</div>
            <div className="n">贰</div>
            <div className="t">结构与节奏<br/>把信息排成读者愿意往下读的形状</div>
          </div>
          <div className="arr">→</div>
          <div className="cell">
            <div className="lbl">P H A S E</div>
            <div className="n">叁</div>
            <div className="t">排版与发布<br/>用容器组织呼吸，用留白邀请阅读</div>
          </div>
        </div>
      </div>
      <p>跳过任何一步，结果都会立刻显形 —— 读者比你想象的敏感。</p>
    </div>
  );
}

function StepC3() {
  return (
    <div className="wx">
      <p className="lede">公众号排版工具的迭代路线：</p>
      <div className="step-c3">
        <div className="it">
          <div className="when">2024.10</div>
          <div className="node"></div>
          <div className="body">
            <div className="h">基础容器集</div>
            <div className="d">完成引用、提示、列表、数据四类核心容器的样式定义。</div>
          </div>
        </div>
        <div className="it">
          <div className="when">2025.02</div>
          <div className="node"></div>
          <div className="body">
            <div className="h">主题化与变量</div>
            <div className="d">引入主题色变量，所有容器的强调色集中管理。</div>
          </div>
        </div>
        <div className="it now">
          <div className="when">2025.07</div>
          <div className="node"></div>
          <div className="body">
            <div className="h">差异化重构</div>
            <div className="d">同一文档内的容器必须采用不同的视觉机制，禁止重复的色条与边框装饰。</div>
          </div>
        </div>
        <div className="it">
          <div className="when">2025.12</div>
          <div className="node"></div>
          <div className="body">
            <div className="h">手写体支持</div>
            <div className="d">为引用与署名增加可选的手写中文字体，进一步加强编辑气质。</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepC4() {
  return (
    <div className="wx">
      <p className="lede">读完一本书的四种方式 —— 不必按顺序，但请至少做一次第四种：</p>
      <div className="step-c4">
        <div className="it">
          <div className="n">壹</div>
          <div className="h">通读</div>
          <div className="d">不停笔、不查注，先把整本书走完一遍，记下被打动和被困住的页码。</div>
        </div>
        <div className="it">
          <div className="n">贰</div>
          <div className="h">复读</div>
          <div className="d">回到那些被打动的段落，问自己：是它说的内容打动我，还是它说的方式？</div>
        </div>
        <div className="it">
          <div className="n">叁</div>
          <div className="h">借读</div>
          <div className="d">找一个跟你立场不同的人聊这本书 —— 听对方读出了什么你没读到的。</div>
        </div>
        <div className="it">
          <div className="n">肆</div>
          <div className="h">写读</div>
          <div className="d">用三百字向一个没读过这本书的朋友推荐它。如果写不出，说明你其实没读完。</div>
        </div>
      </div>
    </div>
  );
}

// ======================= D. 数据 / 统计 =======================
function DataD1() {
  return (
    <div className="wx">
      <p className="lede">本季度，我们对全部存量文章的阅读完成率做了一次普查 —— 结果出人意料。</p>
      <div className="data-d1">
        <div className="label">A V G &nbsp;·&nbsp; R E A D &nbsp;C O M P L E T I O N</div>
        <div className="figure">
          <div className="v">63.8</div>
          <div className="u">%</div>
        </div>
        <div className="delta"><span className="arr">▲</span>较上季度提升 11.4 个百分点</div>
        <div className="note">样本：近 90 天发布的 184 篇文章，去重后阅读用户 28.6 万</div>
      </div>
      <p>这意味着「内容更长、读者反而读完更多」的反直觉假设，在这一季度得到了第一次正面验证。</p>
    </div>
  );
}

function DataD2() {
  return (
    <div className="wx">
      <p className="lede">把三个互不相关的数字放在一起，往往能看见隐藏的故事：</p>
      <div className="data-d2">
        <div className="label">2 0 2 5 &nbsp;·&nbsp; Q 3 &nbsp;&nbsp;S N A P S H O T</div>
        <div className="grid">
          <div className="cell">
            <div className="v">2.84<span className="u">M</span></div>
            <div className="k">月活跃读者</div>
          </div>
          <div className="cell">
            <div className="v"><span className="accent">186</span><span className="u">篇</span></div>
            <div className="k">发布文章</div>
          </div>
          <div className="cell">
            <div className="v">14:38<span className="u">min</span></div>
            <div className="k">人均阅读时长</div>
          </div>
          <div className="cell">
            <div className="v"><span className="accent">9.2</span><span className="u">x</span></div>
            <div className="k">同比转发倍率</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DataD3() {
  return (
    <div className="wx">
      <p className="lede">公众号读者最常使用的四种交互行为占比：</p>
      <div className="data-d3">
        <div className="row">
          <div className="top"><div className="k">读到底部</div><div className="v">63.8<span className="u">%</span></div></div>
          <div className="bar hi"><div className="fill" style={{width:'63.8%'}}></div></div>
        </div>
        <div className="row">
          <div className="top"><div className="k">点击「在看」</div><div className="v">28.4<span className="u">%</span></div></div>
          <div className="bar"><div className="fill" style={{width:'28.4%'}}></div></div>
        </div>
        <div className="row">
          <div className="top"><div className="k">转发至会话</div><div className="v">19.6<span className="u">%</span></div></div>
          <div className="bar"><div className="fill" style={{width:'19.6%'}}></div></div>
        </div>
        <div className="row">
          <div className="top"><div className="k">留言互动</div><div className="v">6.1<span className="u">%</span></div></div>
          <div className="bar"><div className="fill" style={{width:'6.1%'}}></div></div>
        </div>
      </div>
      <p>「读到底部」之所以高亮，是因为它和后续所有行为的相关系数都在 0.7 以上 —— 排版的全部努力都应该围着这一个指标转。</p>
    </div>
  );
}

function DataD4() {
  return (
    <div className="wx">
      <p className="lede">改版前后，关键指标的对照如下：</p>
      <div className="data-d4">
        <div className="col a">
          <div className="k">B E F O R E</div>
          <div className="v">42.1<span style={{fontSize:'14px',color:'var(--ink-4)',marginLeft:'4px',fontWeight:400}}>%</span></div>
          <div className="d">旧版阅读完成率<br/>样本 N = 96 篇</div>
        </div>
        <div className="col b">
          <div className="k">A F T E R</div>
          <div className="v"><span className="accent">63.8</span><span style={{fontSize:'14px',color:'#9a9692',marginLeft:'4px',fontWeight:400}}>%</span></div>
          <div className="d">新版阅读完成率<br/>样本 N = 184 篇</div>
        </div>
      </div>
      <p>提升幅度 21.7 个百分点，p &lt; 0.001。</p>
    </div>
  );
}

// ======================= E. 标题 / 小节 =======================
function HeadE1() {
  return (
    <div className="wx">
      <div className="head-e1">
        <div className="kicker">C H A P T E R &nbsp; 0 3</div>
        <h2>把信息排成读者愿意往下读的形状</h2>
        <div className="underline"></div>
        <div className="lede">排版不是装饰，而是阅读路径的设计 —— 决定读者下一秒看哪里，决定他要不要继续。</div>
      </div>
      <p>这一章会用四十页讲清楚一件事：层次感不是把字调大调小，而是给每一类信息找到它专属的几何位置。</p>
    </div>
  );
}

function HeadE2() {
  return (
    <div className="wx">
      <div className="head-e2">
        <div className="bignum">03</div>
        <div className="kicker">C H A P T E R</div>
        <h2>排版即阅读路径</h2>
      </div>
      <p className="lede">本章你将看到：阅读完成率为什么和段落长度无关、却和段落「形状」高度相关；为什么一段恰当的留白胜过一打高亮。</p>
      <p>所有结论都建立在 184 篇真实公众号文章的事后分析上 —— 不是来自直觉，也不是来自营销课程。</p>
    </div>
  );
}

function HeadE3() {
  return (
    <div className="wx">
      <div className="head-e3">
        <div className="badge hi">叁</div>
        <div className="col">
          <h2>排版即阅读路径</h2>
          <div className="sub">C H A P T E R &nbsp; T H R E E</div>
        </div>
      </div>
      <p className="lede">这一章不谈字体配色，只谈一件事 —— 你的排版决定了读者的眼睛先看到什么、再看到什么、什么时候放弃。</p>
      <p>把这一条想透，比记住任何「排版十大技巧」都重要。</p>
    </div>
  );
}

function HeadE4() {
  return (
    <div className="wx">
      <div className="head-e4">
        <h2>排版即<span className="hl">阅读路径</span>的设计</h2>
        <div className="kicker">C H A P T E R &nbsp; 0 3</div>
      </div>
      <p className="lede">读者的眼睛不是均匀扫过文章的；它在每一段开头跳跃、在每一段中段加速、在每一段结尾停顿。</p>
      <p>排版的本质，就是把这种节奏「翻译」成可见的几何形状 —— 让眼睛走得顺，比让眼睛被吸引更重要。</p>
    </div>
  );
}

// ======================= F. 对比 / 卡片组 =======================
function CardsF1() {
  return (
    <div className="wx">
      <p className="lede">把两种排版策略放在一起看，差别会变得很具体：</p>
      <div className="cards-f1">
        <div className="c">
          <div className="k">R E C O M M E N D E D</div>
          <h3>留白驱动</h3>
          <p>用上下间距和字号差建立层次，组件之间没有任何装饰边界，靠呼吸节奏区分。</p>
        </div>
        <div className="c minor">
          <div className="k">L E G A C Y</div>
          <h3>边框驱动</h3>
          <p>每一类信息都套一个不同颜色的框，依靠装饰强调差异 —— 读者最终视而不见。</p>
        </div>
      </div>
      <p>选哪个不只是审美问题，是阅读完成率问题。</p>
    </div>
  );
}

function CardsF2() {
  return (
    <div className="wx">
      <p className="lede">在所有改版动作里，下面这三件事的投入产出比最高：</p>
      <div className="cards-f2">
        <div className="c">
          <div className="k">A</div>
          <h3>留白</h3>
          <div className="t">把段落间距从 1.4em 加到 1.8em，所有阅读指标全面回升。</div>
        </div>
        <div className="c hero">
          <div className="k">B · 最高 ROI</div>
          <h3>层级</h3>
          <div className="t">用字号差代替颜色差建立层次，是收益最大、成本最低的一项改动。</div>
        </div>
        <div className="c">
          <div className="k">C</div>
          <h3>节奏</h3>
          <div className="t">在长文中均匀放置「短段」和「呼吸段」，提升阅读完成率。</div>
        </div>
      </div>
    </div>
  );
}

function CardsF3() {
  return (
    <div className="wx">
      <p className="lede">同一个内容、两种排版方向的对照：</p>
      <div className="cards-f3">
        <div className="vs">— vs —</div>
        <div className="row">
          <div className="label">编辑式</div>
          <div className="d">字号差驱动层次、生成连贯的阅读节奏；理想阅读时长 4–6 分钟；适合深度内容、长评、专题。</div>
        </div>
        <div className="row">
          <div className="label alt">营销式</div>
          <div className="d">高亮与色块驱动注意力、信息密度高、刺激性强；适合活动通知、产品发布、短促单。</div>
        </div>
      </div>
      <p>没有谁优谁劣 —— 选错场景才是问题。</p>
    </div>
  );
}

function CardsF4() {
  return (
    <div className="wx">
      <p className="lede">本期速览，按你需要的顺序读：</p>
      <div className="cards-f4">
        <div className="it">
          <div className="n">N o .&nbsp;0 1</div>
          <h3>留白比边框更安静</h3>
          <div className="d">为什么我们决定从所有容器中移除边框。</div>
        </div>
        <div className="it">
          <div className="n">N o .&nbsp;0 2</div>
          <h3>朱砂作为锚点</h3>
          <div className="d">主题色的 15% 上限，是怎么测出来的。</div>
        </div>
        <div className="it">
          <div className="n">N o .&nbsp;0 3</div>
          <h3>差异化的视觉机制</h3>
          <div className="d">同页面上的容器，必须用不同的设计维度。</div>
        </div>
        <div className="it">
          <div className="n">N o .&nbsp;0 4</div>
          <h3>从模板到组件</h3>
          <div className="d">为什么我们最终舍弃了「模板套用」这一思路。</div>
        </div>
      </div>
    </div>
  );
}

// ======================= G. 分割 / 过渡 =======================
function DivG1() {
  return (
    <div className="wx">
      <p>到这里，关于「层次」的话题暂时告一段落。接下来这一节，我们换一个完全不同的视角来看排版 —— 不是看一篇文章自己，而是看一篇文章在用户的整个信息流里的位置。</p>
      <div className="div-g1"></div>
      <p>当一篇文章被打开时，它在和用户当天看过的几十条内容竞争注意力。这是一种更宏观的「排版」 —— 信息密度、视觉调性、第一屏要传递的承诺。</p>
    </div>
  );
}

function DivG2() {
  return (
    <div className="wx">
      <p>本节小结：层次是字号差、不是颜色差；秩序是留白、不是边框；强调是位置、不是装饰。三件事记住其中任何一件，你的文章都会变好。</p>
      <div className="div-g2">
        <div className="ln"></div>
        <div className="t">I N T E R L U D E</div>
        <div className="ln"></div>
      </div>
      <p>接下来这一节会很短 —— 我想用三个例子说明：为什么你以为的「细节」，往往才是读者唯一会记住的东西。</p>
    </div>
  );
}

function DivG3() {
  return (
    <div className="wx">
      <p>排版的全部技巧，归根到底是一件事：替读者把决定都做完，让他只需要负责阅读本身。</p>
      <div className="div-g3"><span>◆ ◆ ◆</span></div>
      <p>下面进入今天最后一个话题 —— 也是被问得最多、但答案最朴素的一个 —— 关于「主题色」，它真正的角色应该是什么。</p>
    </div>
  );
}

function DivG4() {
  return (
    <div className="wx">
      <p>到这里，正文部分结束。后面附上的是这一期的脚注与延伸阅读，它们不影响主线，可以按需取用。</p>
      <div className="div-g4">尾&nbsp;声</div>
      <p className="lede">下一期我们会聊一个完全不同的话题：在公众号场景里，一张图到底应该出现在哪里 —— 是用在标题、首段、还是结尾？答案比你想得复杂。</p>
    </div>
  );
}

// expose for app.jsx
Object.assign(window, {
  QuoteA1, QuoteA2, QuoteA3, QuoteA4,
  TipB1, TipB2, TipB3, TipB4,
  StepC1, StepC2, StepC3, StepC4,
  DataD1, DataD2, DataD3, DataD4,
  HeadE1, HeadE2, HeadE3, HeadE4,
  CardsF1, CardsF2, CardsF3, CardsF4,
  DivG1, DivG2, DivG3, DivG4,
});
