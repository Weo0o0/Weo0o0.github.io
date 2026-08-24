# Weo0o0-Note 스킬 안내서 (비전공자용)

이 문서는 **코딩을 전공하지 않은 사람도** 한눈에 볼 수 있게, 지금 블로그에 붙어 있는 Cursor 스킬을 **같은 칸**으로만 설명합니다.

## 스킬이란?

스킬은 프로그램이 아닙니다. **AI에게 주는 업무 매뉴얼**입니다.

- 요리로 치면: 칼이 코드이고, 스킬은 레시피·위생 점검표입니다.
- 집 수리로 치면: 망치가 코드이고, 스킬은 공정표·안전 수칙입니다.

같은 블로그라도, 어떤 매뉴얼을 펼치느냐에 따라 결과가 달라집니다.

이 사이트는 **Jekyll 블로그**(글·목록·검색 중심)입니다.  
버튼을 잔뜩 누르는 앱이 아니므로, 앱 전용 도구를 억지로 쓰지 않습니다.

> 참고: `emilkowalski/skills`(애니메이션 중심)는 **아직 설치하지 않았습니다.** 이 목록에 없습니다.

---

## 한 장으로 보는 역할

| 순서 | 스킬 | 쉬운 별명 | 한 줄 | 출처 |
| --- | --- | --- | --- | --- |
| - | `skill-advisor` | Amelia 안내원 | 내 말이 무슨 뜻인지 듣고 맞는 스킬 고르기 | 이 저장소 로컬 |
| 0 | `weo0o0-jekyll-ui` | 우리 집 설명서 | 이 블로그 규칙·금지 사항 | 이 저장소 로컬 |
| 1 | `product-manager-skills` | 웹 개발 기획자 | 무엇을 왜 먼저 할지 정리 | Digidai |
| 2 | `impeccable` | 인테리어 디렉터 | 어디가 촌한지 평가·다듬기 | pbakaus |
| 3 | `web-design-guidelines` | 안전·품질 점검표 | 기본 웹 규칙 위반 찾기 | Vercel Labs |
| 4 | `frontend-design` | 콘셉트 디자이너 | 색·글씨·분위기 정하기 | Anthropic |
| 5 | `web-design-engineer` | 시공 팀 | 정해진 콘셉트를 화면에 반영 | mintz-studio |
| 6 | `check-fix-accessibility` | 누구나 쓰기 담당 | 키보드·대비·읽기 쉽게 | Neha |
| 7 | `effective-ui-design` | 자·수평기 | 여백·글자 크기·다크모드 디테일 | sebastian-software |
| 8 | `extract-design-system` | 색·글씨 표본 채집 | 반복되는 색·글씨 값을 목록으로 | arvindrk |

### 추천 사용 순서

**어떤 스킬인지 모르겠으면 → `skill-advisor`(Amelia) → 우리 규칙 → 기획(PM) → 평가 → 법규 점검 → 콘셉트 → 시공 → 접근성 → 디테일**

- 뭘 먼저 고칠지 모르면 → `product-manager-skills` (또는 먼저 `skill-advisor`)
- 색 목록만 필요하면 → `extract-design-system`만

한 번에 스킬을 여러 개 부르지 마세요. **한 목적에 스킬 하나**가 덜 헷갈립니다.

---

## 빈 템플릿 (새 스킬이 생기면 여기만 복사)

아래를 복사한 뒤 칸만 채우면 됩니다.

```markdown
### 스킬 이름: `example-skill`

- 쉬운 별명:
- 한 줄 설명:
- 출처 (GitHub):
- 설치 위치: `.cursor/skills/example-skill/`
- 설치 명령: `npx skills add owner/repo --skill name --agent cursor`
- 왜 필요한가?:
- 언제 시키나?:
  - …
  - …
- 이 블로그에서 하는 일:
- 하지 않는 일:
- 비유:
- 사용 예시 1: `채팅에 그대로 넣을 문장`
- 사용 예시 2: `채팅에 그대로 넣을 문장`
- 사용 예시 3: `채팅에 그대로 넣을 문장`
```

---

## 작성된 스킬 카드 (10개)

처음엔 **쉬운 별명**과 **사용 예시**만 읽어도 됩니다.

---

### 스킬 이름: `skill-advisor`

- 쉬운 별명: Amelia 안내원
- 한 줄 설명: 채팅에 적은 말의 뜻을 풀어, **지금 필요한 스킬 하나**를 골라 주고니다. 답변은 항상 한국어이며 👩‍💻 표시로 Amelia가 말합니다.
- 출처 (GitHub): 이 저장소에 직접 만든 로컬 스킬 (외부 리포 없음)
- 설치 위치: `.cursor/skills/skill-advisor/`
- 설치 명령: 없음 — 이미 프로젝트에 포함되어 있습니다
- 왜 필요한가?: 스킬이 많아지면 “뭐라고 불러야 하지?”에서 막힙니다. 안내원이 먼저 길을 짚어 줍니다.
- 언제 시키나?:
  - “어떤 스킬 써야 해?”
  - “블로그 예쁘게 하고 싶은데 뭐부터?”
  - “이 요청에 맞는 스킬 추천해 줘”
- 이 블로그에서 하는 일: `.cursor/skills/README.md` 목록을 기준으로 의도 → 스킬 매칭, 복붙용 채팅 문장 제공
- 하지 않는 일: 안내만 할 때는 화면을 크게 고치지 않습니다. 실행은 사용자가 “그 스킬로 진행”이라고 한 뒤입니다.
- 비유: 병원 안내 데스크 — 진료과를 먼저 안내하고, 수술은 해당 과에서
- 사용 예시 1: `skill-advisor로 내 말 해석해서 맞는 스킬 하나만 골라 줘. 블로그가 허전한 느낌이야.`
- 사용 예시 2: `👩‍💻 Amelia, 404를 다크하게 고치고 싶은데 어떤 스킬부터?`
- 사용 예시 3: `skill-advisor로 우선순위 정하는 스킬이랑 실제 시공 스킬 차이를 쉽게 설명해 줘.`

---

### 스킬 이름: `weo0o0-jekyll-ui`

- 쉬운 별명: 우리 집 설명서
- 한 줄 설명: “이 블로그는 이런 집이고, 다른 공법으로는 고치지 마라”고 AI에게 알려 주는 메모입니다.
- 출처 (GitHub): 이 저장소에 직접 만든 로컬 규칙 (외부 리포 없음)
- 설치 위치: `.cursor/skills/weo0o0-jekyll-ui/`
- 설치 명령: 없음 — 이미 프로젝트에 포함되어 있습니다
- 왜 필요한가?: 없으면 AI가 앱처럼 고치려다 블로그 구조가 깨질 수 있습니다.
- 언제 시키나?:
  - “우리 블로그 규칙 먼저 읽고 고쳐줘”
  - “테마 원본은 건드리지 말고 덮어쓰기만 해줘”
- 이 블로그에서 하는 일: 색·글꼴은 `assets/css/main.scss`, `_sass/_weo0o0-overrides.scss`만 쓰도록 안내합니다.
- 하지 않는 일: 예쁜 화면을 직접 그리지 않습니다. **길 안내**만 합니다.
- 비유: 아파트 관리실의 “페인트 색·개조 금지” 안내문
- 사용 예시 1: `weo0o0-jekyll-ui 규칙 지키고 홈 화면만 다듬어 줘.`
- 사용 예시 2: `weo0o0-jekyll-ui 기준으로 테마 원본 폴더는 건드리지 마.`
- 사용 예시 3: `weo0o0-jekyll-ui 읽고 404만 다크 스킨에 맞게 고쳐 줘.`

---

### 스킬 이름: `product-manager-skills`

- 쉬운 별명: 웹 개발 기획자
- 한 줄 설명: 화면을 바로 고치기 전에, “무엇을 왜 먼저 만들지”를 문서와 우선순위로 정리합니다.
- 출처 (GitHub): https://github.com/Digidai/product-manager-skills
- 설치 위치: `.cursor/skills/product-manager-skills/`
- 설치 명령: `npx skills add Digidai/product-manager-skills --agent cursor`
- 왜 필요한가?: 웹을 처음 하면 “예쁜 것부터” 손대기 쉬운데, 순서를 정해야 덜 헤맵니다.
- 언제 시키나?:
  - “블로그 개선 우선순위 정해 줘”
  - “검색 UX용 짧은 PRD 써 줘”
  - “다음에 할 일 3개만 골라 줘”
- 이 블로그에서 하는 일: 검색·404·카테고리·홈 중 **무엇을 먼저**, **왜**, **성공 기준**을 정리합니다.
- 하지 않는 일: CSS를 예쁘게 만들거나 레이아웃을 바로 바꾸는 일은 하지 않습니다.
- 비유: 집 수리 전 예산표·공정표를 적는 현장 소장
- 사용 예시 1: `product-manager-skills로 Weo0o0-Note 블로그 개선 우선순위 3개와 이유를 정리해 줘.`
- 사용 예시 2: `product-manager-skills로 검색 UX 개선용 짧은 PRD를 써 줘.`
- 사용 예시 3: `product-manager-skills로 지금 고칠 것과 나중에 고칠 것을 나눠 줘.`

---

### 스킬 이름: `impeccable`

- 쉬운 별명: 인테리어 디렉터
- 한 줄 설명: 페이지를 보고 어디가 눈에 안 들어오는지, 촌스러운지, 너무 시끄러운지 평가한 뒤 다듬습니다.
- 출처 (GitHub): https://github.com/pbakaus/impeccable
- 설치 위치: `.cursor/skills/impeccable/`
- 설치 명령: `npx skills add pbakaus/impeccable --skill impeccable --agent cursor`
- 왜 필요한가?: 색만 바꿀 일과 배치를 바꿀 일을 구분하지 못하면 손만 많고 결과는 그대로입니다.
- 언제 시키나?:
  - “홈이 밋밋해. 왜 그런지 평가해 줘”
  - “404 느낌 어떤지 봐 줘”
  - “너무 화려하면 조용하게 만들어 줘”
- 이 블로그에서 하는 일: 홈, 글 본문, 검색, 404처럼 **이미 있는 화면**을 먼저 비평합니다.
- 하지 않는 일: 글 본문 내용을 새로 쓰거나, 로그인·결제 같은 앱 기능을 만들지 않습니다.
- 비유: 인테리어 방송에서 “소파가 TV를 가려요”라고 짚는 장면
- 사용 예시 1: `impeccable으로 홈과 404를 critique한 다음, 큰 문제부터 알려 줘.`
- 사용 예시 2: `impeccable polish로 검색 페이지만 다듬어 줘.`
- 사용 예시 3: `impeccable으로 홈이 조용한지 화려한지 평가해 줘.`

---

### 스킬 이름: `web-design-guidelines`

- 쉬운 별명: 안전·품질 점검표
- 한 줄 설명: 초점이 보이는지, 그림 설명이 있는지, 어두운 화면에 맞는지처럼 **웹 기본 규칙**을 대조합니다.
- 출처 (GitHub): https://github.com/vercel-labs/agent-skills
- 설치 위치: `.cursor/skills/web-design-guidelines/`
- 설치 명령: `npx skills add vercel-labs/agent-skills --skill web-design-guidelines --agent cursor`
- 왜 필요한가?: 예쁜데 키보드로 메뉴를 못 열면 실제 방문자가 막힙니다.
- 언제 시키나?:
  - “우리 사이트 UX 점검해 줘”
  - “접근성이랑 기본 규칙 위주로 리뷰해 줘”
- 이 블로그에서 하는 일: `_layouts/`, `_includes/`, `_pages/` 같은 뼈대 파일을 규칙과 맞춰 봅니다.
- 하지 않는 일: 새 디자인을 제안하는 자리가 아닙니다. **위반을 찾는 자리**입니다.
- 비유: 식당 개업 전 보건소 점검
- 사용 예시 1: `web-design-guidelines로 헤더, 검색, 404를 점검하고 파일 위치랑 같이 알려 줘.`
- 사용 예시 2: `web-design-guidelines로 포커스랑 이미지 alt만 봐 줘.`
- 사용 예시 3: `web-design-guidelines로 _includes/masthead.html을 리뷰해 줘.`

---

### 스킬 이름: `frontend-design`

- 쉬운 별명: 콘셉트 디자이너
- 한 줄 설명: 색, 글씨, 여백의 **분위기**를 먼저 정해 “어디서나 볼 법한 AI 기본 디자인”을 피합니다.
- 출처 (GitHub): https://github.com/anthropics/skills
- 설치 위치: `.cursor/skills/frontend-design/`
- 설치 명령: `npx skills add anthropics/skills --skill frontend-design --agent cursor`
- 왜 필요한가?: 콘셉트 없이 고치면 보라 그라데이션·똑같은 카드처럼 남들과 같은 얼굴이 됩니다.
- 언제 시키나?:
  - “블로그 분위기를 더 또렷하게 하고 싶어”
  - “글씨랑 색 조합을 우리답게 정해 줘”
- 이 블로그에서 하는 일: 어두운 배경 + 청록 포인트 + 고운바탕/고운돋움을 지키며 개성을 키웁니다.
- 하지 않는 일: 평가·점검을 건너뛰고 처음부터 간판만 바꾸라는 뜻이 아닙니다.
- 비유: 옷 사기 전에 “겨울 출근룩인지 여름 피크닉인지” 무드를 정하기
- 사용 예시 1: `frontend-design으로 콘셉트를 짧게 정한 뒤, 테마 원본은 건드리지 말고 덮어쓰기만 해 줘.`
- 사용 예시 2: `frontend-design으로 색 4~6개와 서체 역할만 먼저 정해 줘.`
- 사용 예시 3: `frontend-design으로 홈 첫 화면 분위기만 제안해 줘. 코드는 아직 바꾸지 마.`

---

### 스킬 이름: `web-design-engineer`

- 쉬운 별명: 시공 팀
- 한 줄 설명: 정해진 콘셉트를 **실제 웹 페이지**로 옮깁니다. 이 프로젝트에서는 HTML/CSS를 블로그 구조에 맞게 반영합니다.
- 출처 (GitHub): https://github.com/mintz-studio/web-design-skill
- 설치 위치: `.cursor/skills/web-design-engineer/`
- 설치 명령: `npx skills add mintz-studio/web-design-skill --agent cursor`
- 왜 필요한가?: 아이디어만 있고 화면이 안 바뀌면 방문자는 차이를 못 느낍니다.
- 언제 시키나?:
  - “이 시안으로 404를 실제로 고쳐 줘”
  - “공지 배너 같은 조각을 만들어 줘”
- 이 블로그에서 하는 일: `_layouts`, `_includes`, 스타일 덮어쓰기에 반영합니다.
- 하지 않는 일: 이 저장소를 앱처럼 바꾸거나 다른 공법을 새로 들이지 않습니다.
- 비유: 도면을 보고 벽에 페인트·몰딩을 시공하는 팀
- 사용 예시 1: `web-design-engineer로 404만 시공해 줘. Jekyll 구조를 유지해.`
- 사용 예시 2: `web-design-engineer로 홈 헤더만 시공해 줘. 덮어쓰기 CSS만 사용해.`
- 사용 예시 3: `web-design-engineer로 검색 페이지 레이아웃만 손봐.`

---

### 스킬 이름: `check-fix-accessibility`

- 쉬운 별명: 누구나 쓰기 담당
- 한 줄 설명: 눈이 잘 안 보이거나 마우스를 못 쓰거나 낭독기를 쓰는 사람도 **글을 읽고 메뉴를 누를 수 있는지** 보고 고칩니다.
- 출처 (GitHub): https://github.com/Neha/check-fix-accessibility
- 설치 위치: `.cursor/skills/check-fix-accessibility/`
- 설치 명령: `npx skills add Neha/check-fix-accessibility --agent cursor`
- 왜 필요한가?: 색만 예쁜 버튼은 대비가 낮거나 키보드로 어디를 누르는지 모를 수 있습니다.
- 언제 시키나?:
  - “접근성 맞춰 줘”
  - “키보드만으로 메뉴가 되는지 봐 줘”
  - “글자와 배경 대비 확인해 줘”
- 이 블로그에서 하는 일: 건너뛰기 링크, 검색 버튼, 404, 다크 모드 대비율을 점검합니다.
- 하지 않는 일: “더 화려하게”가 목표가 아닙니다. **쓰는 데 막힘이 없게**가 목표입니다.
- 비유: 출입구에 경사로·점자 안내를 다는 일
- 사용 예시 1: `check-fix-accessibility로 홈·404·검색을 WCAG 기준으로 점검하고 고칠 점만 알려 줘.`
- 사용 예시 2: `check-fix-accessibility로 키보드 포커스가 보이는지 봐 줘.`
- 사용 예시 3: `check-fix-accessibility로 다크 배경과 글자 대비만 확인해 줘.`

---

### 스킬 이름: `effective-ui-design`

- 쉬운 별명: 자·수평기
- 한 줄 설명: 글자 크기, 버튼 크기, 여백, 다크 모드, “움직임 줄이기”처럼 **읽기 편한 디테일**을 맞춥니다.
- 출처 (GitHub): https://github.com/sebastian-software/effective-ui-design-skill
- 설치 위치: `.cursor/skills/effective-ui-design/`
- 설치 명령: `npx skills add sebastian-software/effective-ui-design-skill --agent cursor`
- 왜 필요한가?: 콘셉트는 좋은데 줄 간격이 빽빽하거나 애니메이션이 어지러우면 오래 읽기 힘듭니다.
- 언제 시키나?:
  - “글이 답답해 보여. 간격이랑 글자 크기 다듬어 줘”
  - “다크 모드랑 움직임 줄이기도 챙겨 줘”
- 이 블로그에서 하는 일: CSS 변수, 포커스 테두리, `prefers-reduced-motion` 규칙을 지키며 미세 조정합니다.
- 하지 않는 일: 블로그 주제나 글 내용을 바꾸지 않습니다.
- 비유: 액자를 걸 때 줄자로 1cm씩 맞추기
- 사용 예시 1: `effective-ui-design 기준으로 본문 여백이랑 버튼 위계만 다듬어 줘.`
- 사용 예시 2: `effective-ui-design으로 글자 크기가 모바일에서도 읽히게 점검해 줘.`
- 사용 예시 3: `effective-ui-design으로 reduced-motion이 지켜지는지 확인해 줘.`

---

### 스킬 이름: `extract-design-system`

- 쉬운 별명: 색·글씨 표본 채집
- 한 줄 설명: 사이트에 쓰인 색, 글꼴, 간격 같은 **반복되는 값**을 목록으로 뽑습니다.
- 출처 (GitHub): https://github.com/arvindrk/extract-design-system
- 설치 위치: `.cursor/skills/extract-design-system/`
- 설치 명령: `npx skills add arvindrk/extract-design-system --agent cursor`
- 왜 필요한가?: 색이 파일마다 조금씩 다르면 “이 회색이 그 회색인지” 헷갈립니다.
- 언제 시키나?:
  - “우리 블로그 색이랑 글씨 규칙을 표로 뽑아 줘”
  - “참고 사이트 느낌은 보되, 값만 목록으로 가져와 줘”
- 이 블로그에서 하는 일: `_sass`와 라이브 페이지에서 토큰을 읽어 덮어쓰기 파일에 정리합니다.
- 하지 않는 일: 화면을 화려하게 다시 그리는 스킬이 아닙니다. **재료 명세서**를 만듭니다.
- 비유: 옷장에서 자주 입는 옷의 색 번호·치수를 수첩에 적기
- 사용 예시 1: `extract-design-system으로 지금 다크 스킨 색·서체·간격을 목록으로만 정리해 줘.`
- 사용 예시 2: `extract-design-system으로 main.scss에 쓸 CSS 변수 초안만 만들어 줘.`
- 사용 예시 3: `extract-design-system으로 현재 블로그 토큰을 표로 뽑아 줘. 화면은 바꾸지 마.`

---

## 상황별 복붙 문장

채팅창에 **그대로 붙여 넣어도** 됩니다.

0. 어떤 스킬인지 모를 때:  
   `skill-advisor로 내 요청을 해석하고, 지금 쓸 스킬 하나와 복붙 문장을 줘.`
1. 뭘 먼저 할지:  
   `product-manager-skills로 블로그 개선용 짧은 PRD와 우선순위를 써 줘.`
2. 어디가 문제인지:  
   `우리 집 설명서 읽고, impeccable으로 홈이랑 404를 평가해 줘.`
3. 기본 규칙만:  
   `web-design-guidelines로 헤더·검색·404만 점검해 줘.`
4. 분위기만:  
   `frontend-design으로 콘셉트만 짧게. 코드는 아직 바꾸지 마.`
5. 정해진 대로 고치기:  
   `시공은 web-design-engineer로, 테마 원본 폴더는 건드리지 마.`
6. 누구나 쓰이게:  
   `check-frontend-accessibility로 키보드랑 대비만 봐 줘.`
7. 간격·글자만:  
   `effective-ui-design 기준으로 본문 여백만 다듬어 줘.`
8. 색 목록만:  
   `extract-design-system으로 지금 쓰는 색과 글씨만 표로 뽑아 줘.`

---

## 비전공자가 자주 하는 오해

- “스킬을 설치하면 블로그가 자동으로 예뻐지나?”  
  → 아닙니다. **채팅에서 일을 시켜야** 움직입니다.
- “스킬이 많을수록 좋은가?”  
  → 아닙니다. 이 블로그와 안 맞는 앱용 스킬은 일부러 빼 두었습니다.
- “영어 이름이 어려워요.”  
  → 카드의 **쉬운 별명**만 기억해도 됩니다. 채팅에는 영어 이름을 붙이면 AI가 매뉴얼을 정확히 찾습니다.
- “한 번에 전부 시키면 더 빠르지 않나요?”  
  → 오히려 헷갈립니다. **한 목적에 스킬 하나**가 결과도 낫습니다.

---

## 관련 파일

| 파일 | 하는 일 |
| --- | --- |
| [.cursor/skills/](.cursor/skills/) | 설치된 스킬 폴더들 |
| [skills-lock.json](../skills-lock.json) | 어디서 설치했는지 잠금 목록 |
| [.cursor/rules/jekyll-ui-ux.mdc](../rules/jekyll-ui-ux.mdc) | UI 작업 시 AI가 읽는 짧은 규칙 |
| [.cursor/skills/weo0o0-jekyll-ui/SKILL.md](weo0o0-jekyll-ui/SKILL.md) | 이 블로그 전용 상세 규칙 |
