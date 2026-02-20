# 🛠️ 개발자 공방 (dev-craft)

> **GitHub PR 하나로 블로그 글, README, 영향도 그래프까지** — 번거로운 문서 작업을 자동화하여 개발 본연의 업무에 집중할 수 있도록 돕는 도구입니다.

---

## ✨ 주요 기능

- **PR 기반 문서 자동 생성**: GitHub PR URL만 입력하면 **블로그 글**이나 **README** 초안을 즉시 생성합니다.
- **커스텀 필터**: 말투, 문서 종류, 설명 수준(입문자용~전문가용) 등 옵션을 선택하여 원하는 스타일의 결과물을 얻을 수 있습니다.
- **PR 영향도 시각화**: 변경된 파일들 간의 의존성과 영향 범위를 직관적인 **인터랙티브 그래프**로 확인합니다.
- **Velog 즉시 발행**: 생성된 분석 결과를 내 Velog 계정으로 바로 포스팅할 수 있습니다.
- **GitHub OAuth**: 복잡한 설정 없이 GitHub 계정으로 간편하게 시작하세요.

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
| `N8N_WEBHOOK_URL`               | n8n 웹훅 URL                                 |
| `UPSTASH_REDIS_REST_URL`        | Upstash Redis REST URL                       |
| `UPSTASH_REDIS_REST_TOKEN`      | Upstash Redis REST 토큰                      |
| `ADMIN_GITHUB_IDS`              | Rate Limit 제외 대상 GitHub ID (쉼표로 구분) |

### 실행

```bash
pnpm dev

```

---

## 📖 사용 방법

1. **GitHub 로그인**: 메인 페이지에서 GitHub 계정으로 인증을 진행합니다.
2. **PR 링크 입력**: 분석하고자 하는 GitHub Pull Request URL을 붙여넣습니다.
3. **필터 선택**: 문서 종류, 말투, 상세 수준 등 원하는 옵션을 체크합니다.
4. **생성 및 확인**: '문서 생성하기' 버튼을 클릭하여 결과물과 영향도 그래프를 확인합니다.
5. **(선택) 배포**: Velog 토큰을 입력하고 생성된 글을 바로 발행합니다.

---

## 🛠 기술 스택

- **Framework**: Next.js 15 (App Router), TypeScript
- **State Management**: Zustand, React Query
- **Database & Auth**: Supabase, GitHub OAuth
- **Automation**: n8n, Gemini AI
- **Performance**: Upstash Redis (Rate Limit)
- **Styling**: Tailwind CSS

---

## 🔍 트러블슈팅

- **광고가 로컬에서 보이지 않아요**: Kakao AdFit은 보안 정책상 실제 배포된 도메인 환경에서만 노출됩니다.
- **429 Too Many Requests**: IP당 하루 10회 생성 제한이 걸려 있습니다. 다음 날 시도하거나 관리자에게 문의하세요.
- **n8n 503 에러**: Gemini AI 모델의 일시적 과부하일 수 있습니다. 1~2분 후 다시 시도해 주세요.

---

## 👥 팀 및 라이선스

- **Team**: [YY-Studios](https://www.google.com/search?q=https://github.com/YY-Studios)
- **License**: 본 프로젝트는 **MIT 라이선스**를 따릅니다.

---

**개발자 공방과 함께 더 나은 문서화 문화를 만들어보세요!** 궁금한 점이나 피드백이 있다면 [GitHub Issues](https://www.google.com/search?q=https://github.com/YY-Studios/dev-craft/issues)에 남겨주세요.
