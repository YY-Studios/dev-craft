# 🛠️ 개발자 공방 (dev-craft)

> **GitHub PR 하나로 블로그 글, README, 영향도 그래프까지** — 번거로운 문서 작업을 자동화하고, 개발자 커뮤니티에서 인사이트를 공유할 수 있는 플랫폼입니다.

---

## ✨ 주요 기능

### 📝 PR 기반 문서 자동 생성
- GitHub PR URL만 입력하면 **블로그 글**이나 **README** 초안을 즉시 생성
- PR 불러오기 기능으로 레포지토리 내 PR 목록에서 바로 선택 가능
- 말투, 문서 종류, 설명 수준, 독자 타겟, 글 구조 등 **커스텀 필터**로 원하는 스타일의 결과물 생성
- 자주 쓰는 필터 조합을 **저장/불러오기** 가능

### 📊 PR 변경 영향도 분석
- 변경된 파일들 간의 의존성과 영향 범위를 **인터랙티브 그래프**로 시각화
- 변경 파일 수, 영향 파일 수, 주의 항목 자동 분석
- 드래그 이동, 스크롤 줌, 노드 크기로 영향 범위 직관적 파악

### 🏠 나의 공방 (포트폴리오 대시보드)
- 기술 스택 레이더 차트, 이번 주 활동 현황 그래프
- 좋아요 TOP 3 인기 글 요약
- 레포지토리별 포스팅 목록 필터링

### 🌐 모두의 공방 (커뮤니티 피드)
- 생성된 문서를 피드에 공유하고, 다른 개발자의 글 탐색
- 최신순/인기순 정렬, 키워드 검색 (SSR 호환 URL 쿼리 파라미터 기반)
- 좋아요, 태그 기반 탐색
- 무한 스크롤 (커서 기반 페이지네이션)

### 🔗 외부 연동
- **GitHub OAuth**: GitHub 계정으로 간편 로그인

---

## 🚀 시작하기

### 사전 요구사항
- **Node.js** 18 이상
- **pnpm** (패키지 매니저)
- **Supabase** 프로젝트 및 API 키
- **Upstash Redis** 계정 (Rate Limit 관리용)
- **n8n** 워크플로우 서버 (Gemini AI 연동)

### 설치
```bash
git clone https://github.com/YY-Studios/dev-craft.git
cd dev-craft
pnpm install
```

### 환경변수 설정

`.env.local` 파일을 생성하고 아래의 값을 입력합니다.

| 변수명                          | 설명                                         |
| ------------------------------- | -------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase 프로젝트 URL                        |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key                            |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase service role key (서버 API용)       |
| `NEXT_PUBLIC_API_BASE_URL`      | Supabase REST API base URL                   |
| `N8N_WEBHOOK_URL`               | n8n 웹훅 URL                                 |
| `UPSTASH_REDIS_REST_URL`        | Upstash Redis REST URL                       |
| `UPSTASH_REDIS_REST_TOKEN`      | Upstash Redis REST 토큰                      |
| `ADMIN_GITHUB_IDS`              | Rate Limit 제외 대상 GitHub ID (쉼표로 구분) |
| `JWT_SECRET`                    | JWT 토큰 서명 키                             |
| `GITHUB_CLIENT_ID`              | GitHub OAuth App Client ID                   |
| `GITHUB_CLIENT_SECRET`          | GitHub OAuth App Client Secret               |

### 실행
```bash
pnpm dev
```

---

## 📖 사용 방법

1. **GitHub 로그인**: 메인 페이지에서 GitHub 계정으로 인증을 진행합니다.
2. **PR 링크 입력 또는 불러오기**: 분석할 PR URL을 직접 입력하거나, 레포지토리에서 PR을 선택합니다.
3. **필터 선택**: 문서 종류, 말투, 상세 수준, 독자 타겟 등 원하는 옵션을 설정합니다.
4. **생성 및 확인**: '문서 생성하기' 버튼을 클릭하여 블로그 글/README와 PR 영향도 그래프를 확인합니다.
5. **공유**: 생성된 문서를 커뮤니티 피드에 공개하거나, Velog로 바로 발행합니다.
6. **나의 공방**: 대시보드에서 내 기술 스택, 활동 현황, 인기 글을 한눈에 확인합니다.

---

## 🛠 기술 스택

| 분류 | 기술 |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| State | Zustand, @tanstack/react-query |
| Database & Auth | Supabase, GitHub OAuth, JWT (httpOnly cookie) |
| AI & Automation | n8n, Gemini AI |
| Rate Limit | Upstash Redis |
| Styling | Tailwind CSS v4, tailwind-variants, tailwind-merge, framer-motion |
| Rendering | react-markdown, remark-gfm, recharts, lottie-react |
| Analytics | Vercel Analytics |
| Package Manager | pnpm |

---

## 🔍 트러블슈팅

- **429 Too Many Requests**: IP당 하루 5회 생성 제한이 걸려 있습니다. GitHub 로그인 후 관리자에게 닉네임을 알려주시면 제한을 해제해드립니다.
- **n8n 503 에러**: Gemini AI 모델의 일시적 과부하일 수 있습니다. 1~2분 후 다시 시도해 주세요.
- **광고가 로컬에서 보이지 않아요**: Kakao AdFit은 보안 정책상 실제 배포된 도메인 환경에서만 노출됩니다.
- **피드에서 검색이 초기화돼요**: URL 쿼리 파라미터 기반이므로 브라우저 뒤로가기로 검색 상태가 유지됩니다.

---

## 👥 팀 및 라이선스

- **Team**: [YY-Studios](https://github.com/YY-Studios) (박유진, 이영우)
- **License**: MIT

---

**개발자 공방과 함께 더 나은 문서화 문화를 만들어보세요!** 궁금한 점이나 피드백이 있다면 [GitHub Issues](https://github.com/YY-Studios/dev-craft/issues)에 남겨주세요.
