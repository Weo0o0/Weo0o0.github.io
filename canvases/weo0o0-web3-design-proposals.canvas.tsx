import {
  BarChart,
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  CollapsibleSection,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  LineChart,
  PieChart,
  Pill,
  Row,
  Spacer,
  Stack,
  Stat,
  Swatch,
  Table,
  Text,
  UsageBar,
  mergeStyle,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type Proposal = {
  id: number;
  name: string;
  codename: string;
  summary: string;
  signature: string;
  home: string;
  nav: string;
  post: string;
  charts: string;
  features: string[];
  tradeoff: string;
  priority: string;
  zones: Array<{ label: string; emphasis?: boolean }>;
};

const POSTS_TOTAL = 17;
const CATEGORY_DATA = [
  { label: "SQLi", value: 5 },
  { label: "coding", value: 2 },
  { label: "bee-box", value: 2 },
  { label: "etc", value: 2 },
  { label: "기타", value: 6 },
];
const TAG_BAR_CATEGORIES = ["이론", "SQLi", "sqlmap", "옵션", "권한", "python"];
const TAG_BAR_VALUES = [11, 5, 4, 4, 2, 2];
const MONTH_CATEGORIES = ["3월", "6월", "7월"];
const MONTH_VALUES = [2, 13, 2];

const FEATURES: Array<[string, string, string]> = [
  ["홈 hero + 최신 글 + 페이지네이션", "운영 중", "index.html · home-hero"],
  ["연도 / 카테고리 / 태그 아카이브", "P1 반영", "compact · sticky index"],
  ["검색 (/search/)", "페이지 있음 · config off", "search: true 필요"],
  ["글: TOC sticky · 읽기 시간 · Disqus", "글 layout 기본", "single.html"],
  ["관련 글 · 공유 · author sidebar", "글에서만", "author_profile: true"],
  ["브레드크럼 · 404 다크 · notice 블록", "운영 중", "Liquid includes"],
  ["사이드바 docs nav (보안·파이썬 등)", "데이터만", "navigation.yml docs"],
  ["GA · 소셜 footer", "운영 중", "_config.yml"],
];

const PROPOSALS: Proposal[] = [
  {
    id: 0,
    name: "Signal Console",
    codename: "Web3 v1 · 권장",
    summary:
      "확정한 Web3 v1(글래스 3단 + teal signal bar)을 전 페이지 셸에 적용. 홈에 월별 활동 미니 차트 1개만 두고 나머지는 읽기 우선.",
    signature: "전역 Signal Bar — masthead·hero·글 h1 아래 2px teal 라인",
    home: "L2 glass hero + Stat 2개(글 수·주력 카테고리) + LineChart(월별 발행)",
    nav: "L1 glass sticky masthead · 활성 링크 signal underline",
    post: "L2 header capsule · 본문 Base(무 glass) · h2 teal tint border",
    charts: "홈: 월별 LineChart 1 · 아카이브: 연도 BarChart(선택)",
    features: [
      "hero CTA",
      "compact archives",
      "taxonomy chips",
      "read time meta",
      "breadcrumbs",
    ],
    tradeoff: "가장 균형적. 시공 범위는 P0 masthead → hero → post 순.",
    priority: "P0 (PM PRD + frontend-design v1)",
    zones: [
      { label: "Glass Nav", emphasis: true },
      { label: "Hero + mini chart", emphasis: true },
      { label: "Recent compact list" },
      { label: "Footer" },
    ],
  },
  {
    id: 1,
    name: "Editorial Vault",
    codename: "읽기 우선",
    summary:
      "Web3보다 에디토리얼. glass 최소, Gowun Batang 대형 타이포와 여백으로 ‘밤의 노트’ 분위기. 차트는 아카이브 페이지에만.",
    signature: "Wide measure + mantle 인용·pull-quote left bar",
    home: "대형 headline · 발췌 유지(smart excerpt) · 차트 없음",
    nav: "flat dark bar · text-only links · logo 텍스트 mark",
    post: "넓은 본문(42rem) · TOC sidebar · notice를 editorial aside",
    charts: "연도 아카이브 상단: PieChart(카테고리 비율)만",
    features: ["smart excerpts", "TOC sticky", "notice blocks", "read time"],
    tradeoff: "‘Web3’ 인상은 약함. 글 몰입·가독성 최고.",
    priority: "P1 대안 — Web3 톤을 줄이고 싶을 때",
    zones: [
      { label: "Minimal nav" },
      { label: "Large headline + excerpt list", emphasis: true },
      { label: "Pagination" },
    ],
  },
  {
    id: 2,
    name: "Ops Dashboard",
    codename: "홈=대시보드",
    summary:
      "홈 첫 화면을 운영 대시보드로. 블로그 기능(검색·분류·통계)을 한눈에 노출하고 그래프로 탐색을 돕는다.",
    signature: "홈 상단 Stat 4 + Bar/Pie 2열 그리드",
    home: "Stat row · BarChart(태그) + PieChart(카테고리) · 아래 compact 글 목록",
    nav: "검색 강조(search toggle) · 카테고리/태그/연도 pill nav",
    post: "상단 breadcrumb + meta chips · 본문은 Vault와 동일",
    charts: "홈: Bar+Pie 필수 · search 활성화 후 ‘최다 태그’ 연동",
    features: [
      "search (enable)",
      "year/category/tag index",
      "pagination",
      "related posts",
    ],
    tradeoff: "홈 정보 밀도↑. 첫 방문이 ‘블로그’보다 ‘패널’처럼 느껴질 수 있음.",
    priority: "P1 — 탐색·재방문 UX 강화 시",
    zones: [
      { label: "Nav + search", emphasis: true },
      { label: "Stats + charts grid", emphasis: true },
      { label: "Compact posts" },
    ],
  },
  {
    id: 3,
    name: "Taxonomy Atlas",
    codename: "분류 지도",
    summary:
      "태그·카테고리 아카이브(P1 sticky index) 미학을 브랜드 중심으로. 홈에서 ‘지도’처럼 분류를 먼저 보여준다.",
    signature: "Sticky chip atlas — 홈·태그·카테고리 공통 컴포넌트",
    home: "taxonomy chip grid(실데이터) + hint copy · PieChart(태그 상위 6)",
    nav: "compact · 현재 페이지 chip highlight",
    post: "글 하단 taxonomy + related posts를 atlas footer로 연결",
    charts: "홈 Pie(태그) · 카테고리 페이지 Bar(글 수)",
    features: ["tags", "categories", "year archive hint", "duplicate tag hint"],
    tradeoff: "태그 `tag:` 필드와 MM `site.tags` 정합 필요. 글 본문은 2순위.",
    priority: "P1 — 아카이브 트래픽이 높을 때",
    zones: [
      { label: "Sticky chip atlas", emphasis: true },
      { label: "Pie chart" },
      { label: "Section lists" },
    ],
  },
  {
    id: 4,
    name: "Night Terminal",
    codename: "터미널 랩",
    summary:
      "보안·시스템 노트 주제에 맞게 UI 라벨을 monospace, notice를 alert 패널로. Web3 glow는 프롬프트 커서에만.",
    signature: "Prompt line — `$ weo0o0-note --latest` + blinking cursor (CSS)",
    home: "터미널 헤더 + horizontal BarChart(카테고리) + `$ ls posts/` 스타일 목록",
    nav: "crust border · mono caps labels · teal cursor on active",
    post: "code block 스킨 강화 · notice → alert tiers (info/warn/danger)",
    charts: "Horizontal BarChart(카테고리) — htop/ncurses 연상",
    features: ["notice blocks", "syntax highlight", "code copy", "Disqus footer"],
    tradeoff: "개성 최강. 장문 prose와 mono chrome 충돌 주의.",
    priority: "P2 실험 — 마음에 드는 요소만 Signal Console에 흡수",
    zones: [
      { label: "Mono nav + prompt", emphasis: true },
      { label: "H-bar chart" },
      { label: "Terminal post list" },
    ],
  },
];

function Wireframe({
  zones,
  accent,
  fill,
  stroke,
}: {
  zones: Proposal["zones"];
  accent: string;
  fill: string;
  stroke: string;
}) {
  return (
    <Stack gap={4} style={{ width: "100%" }}>
      {zones.map((zone) => (
        <div key={zone.label}>
          <Row
            align="center"
            style={mergeStyle(
              {
                minHeight: zone.emphasis ? 52 : 36,
                padding: "8px 10px",
                border: `1px solid ${stroke}`,
                background: zone.emphasis ? fill : "transparent",
              },
              zone.emphasis
                ? { borderLeft: `3px solid ${accent}` }
                : undefined,
            )}
          >
            <Text size="small" tone="secondary">
              {zone.label}
            </Text>
          </Row>
        </div>
      ))}
    </Stack>
  );
}

function ProposalCard({
  proposal,
  selected,
  onSelect,
}: {
  proposal: Proposal;
  selected: boolean;
  onSelect: () => void;
}) {
  const theme = useHostTheme();
  return (
    <Card
      style={mergeStyle(
        { height: "100%" },
        selected ? { outline: `2px solid ${theme.accent.primary}` } : undefined,
      )}
    >
      <CardHeader
        trailing={
          <Button variant={selected ? "primary" : "ghost"} onClick={onSelect}>
            {selected ? "선택됨" : "비교"}
          </Button>
        }
      >
        <Row gap={8} align="center">
          <Text weight="semibold">
            {proposal.id + 1}. {proposal.name}
          </Text>
          <Pill tone={proposal.id === 0 ? "success" : "neutral"} size="sm">
            {proposal.codename}
          </Pill>
        </Row>
      </CardHeader>
      <CardBody>
        <Stack gap={12}>
          <Text tone="secondary" size="small">
            {proposal.summary}
          </Text>
          <Callout tone="info">
            <Text size="small" weight="semibold">
              Signature
            </Text>
            <Text size="small">{proposal.signature}</Text>
          </Callout>
          <Wireframe
            zones={proposal.zones}
            accent={theme.accent.primary}
            fill={theme.fill.tertiary}
            stroke={theme.stroke.secondary}
          />
          <Grid columns={1} gap={6}>
            <Text size="small">
              <Text as="span" weight="semibold">
                Home ·{" "}
              </Text>
              {proposal.home}
            </Text>
            <Text size="small">
              <Text as="span" weight="semibold">
                Nav ·{" "}
              </Text>
              {proposal.nav}
            </Text>
            <Text size="small">
              <Text as="span" weight="semibold">
                Post ·{" "}
              </Text>
              {proposal.post}
            </Text>
            <Text size="small">
              <Text as="span" weight="semibold">
                Charts ·{" "}
              </Text>
              {proposal.charts}
            </Text>
          </Grid>
          <Row gap={6} wrap>
            {proposal.features.map((f) => (
              <span key={f}>
                <Pill tone="neutral" size="sm">
                  {f}
                </Pill>
              </span>
            ))}
          </Row>
          <Text size="small" tone="tertiary">
            Tradeoff: {proposal.tradeoff}
          </Text>
          <Text size="small" weight="semibold">
            {proposal.priority}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default function Weo0o0Web3DesignProposals() {
  const theme = useHostTheme();
  const [selected, setSelected] = useCanvasState<number>("selectedProposal", 0);
  const active = PROPOSALS[selected] ?? PROPOSALS[0];

  return (
    <Stack gap={20} style={{ padding: 16, maxWidth: 960 }}>
      <Stack gap={6}>
        <H1>Weo0o0-Note · Web3 디자인 시안 5종</H1>
        <Text tone="secondary">
          Jekyll + Minimal Mistakes 유지 · Catppuccin Mocha + teal #00adb5 · 실제
          글 17편 데이터 반영 · Source: repo _posts/ · 2024년 발행
        </Text>
      </Stack>

      <Row gap={12} wrap>
        <Stat label="총 글" value={String(POSTS_TOTAL)} tone="info" />
        <Stat label="카테고리" value="9" tone="info" />
        <Stat label="주력 태그" value="이론 11" tone="success" />
        <Stat label="스택" value="Jekyll" tone="info" />
      </Row>

      <CollapsibleSection title="블로그 기능 인벤토리" count={FEATURES.length} defaultOpen>
        <Table
          headers={["기능", "상태", "위치"]}
          rows={FEATURES.map((row) => [...row])}
          striped
        />
        <Spacer />
        <Text size="small" tone="tertiary">
          Gap: search config 미설정, masthead logo 누락, sidebar docs nav 미연결
        </Text>
      </CollapsibleSection>

      <Stack gap={8}>
        <H2>실데이터 차트 (모든 시안에서 재사용 가능)</H2>
        <Grid columns={2} gap={16}>
          <Stack gap={6}>
            <Text size="small" weight="semibold">
              2024년 월별 발행 글 수 (편)
            </Text>
            <LineChart
              categories={MONTH_CATEGORIES}
              series={[{ name: "Posts", data: MONTH_VALUES, tone: "info" }]}
              height={160}
              showValues
              valueSuffix=" 편"
            />
            <Text size="small" tone="tertiary">
              Source: _posts/ filename dates · 2024-03/06/07
            </Text>
          </Stack>
          <Stack gap={6}>
            <Text size="small" weight="semibold">
              카테고리별 글 비율 (donut)
            </Text>
            <Row justify="center">
              <PieChart data={CATEGORY_DATA.slice(0, 5)} donut size={160} />
            </Row>
            <Text size="small" tone="tertiary">
              Source: front matter categories · SQLi 5 / coding 2 / bee-box 2
            </Text>
          </Stack>
        </Grid>
        <Stack gap={6}>
          <Text size="small" weight="semibold">
            상위 태그 출현 횟수 (tag: 필드)
          </Text>
          <BarChart
            categories={TAG_BAR_CATEGORIES}
            series={[{ name: "Tag count", data: TAG_BAR_VALUES, tone: "info" }]}
            horizontal
            height={180}
            showValues
            valueSuffix=" 회"
          />
          <Text size="small" tone="tertiary">
            Source: _posts/ tag front matter · 이론 11 · SQLi 5 · sqlmap 4
          </Text>
        </Stack>
        <Stack gap={6}>
          <Text size="small" weight="semibold">
            기능 커버리지 (시안 1 Signal Console 기준)
          </Text>
          <UsageBar
            total={100}
            topLeftLabel="기능 커버리지 (Signal Console 기준, %)"
            segments={[
              { id: "home", value: 90, color: "green" },
              { id: "post", value: 75, color: "blue" },
              { id: "search", value: 40, color: "yellow" },
              { id: "docs", value: 25, color: "gray" },
            ]}
          />
          <Text size="small" tone="tertiary">
            정규화 추정치 · search/docs nav 활성화 시 Ops Dashboard 시안과 궁합↑
          </Text>
        </Stack>
      </Stack>

      <Divider />

      <Stack gap={8}>
        <Row align="center">
          <H2>5가지 디자인 시안</H2>
          <Spacer />
          <Text size="small" tone="tertiary">
            카드의 «비교»로 상세 패널 전환
          </Text>
        </Row>
        <Grid columns={1} gap={12}>
          {PROPOSALS.map((p) => (
            <div key={p.id}>
              <ProposalCard
                proposal={p}
                selected={selected === p.id}
                onSelect={() => setSelected(p.id)}
              />
            </div>
          ))}
        </Grid>
      </Stack>

      <Card>
        <CardHeader
          trailing={
            <Pill tone="success" size="sm">
              Amelia 추천
            </Pill>
          }
        >
          선택 시안 상세 — {active.name}
        </CardHeader>
        <CardBody>
          <Stack gap={12}>
            <Row gap={8} align="center">
              <Swatch color="blue" />
              <Text weight="semibold">{active.codename}</Text>
            </Row>
            <Text>{active.summary}</Text>
            <Grid columns={3} gap={12}>
              <Stack gap={4}>
                <H3>Masthead</H3>
                <Text size="small" tone="secondary">
                  {active.nav}
                </Text>
              </Stack>
              <Stack gap={4}>
                <H3>Home</H3>
                <Text size="small" tone="secondary">
                  {active.home}
                </Text>
              </Stack>
              <Stack gap={4}>
                <H3>Post</H3>
                <Text size="small" tone="secondary">
                  {active.post}
                </Text>
              </Stack>
            </Grid>
            <Callout tone="success">
              <Text size="small" weight="semibold">
                다음 시공 (weo0o0-jekyll-ui)
              </Text>
              <Text size="small">
                {selected === 0
                  ? "P0: _weo0o0-overrides.scss glass tokens + masthead signal bar → PR cursor/web3-p0-masthead-fc0c"
                  : selected === 2
                    ? "P1: index.html dashboard 섹션 + search: true + 홈 Bar/Pie Liquid include"
                    : selected === 4
                      ? "P2: notice/code 터미널 스킨만 선별 이식 — 전체 mono nav는 비권장"
                      : "선택 시안의 signature 1요소만 Signal Console(P0) 위에 레이어"}
              </Text>
            </Callout>
            <Text size="small" tone="tertiary">
              Design tokens: base {theme.bg.editor} · accent {theme.accent.primary}{" "}
              · Jekyll only, no React deploy
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}
