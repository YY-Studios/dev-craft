## dev-craft

GitHub PR을 불러와 자동화(n8n)로 분석·처리하는 개발자 도구입니다.

### 주요 기능

- GitHub OAuth 로그인
- 저장소 / PR 조회
- PR 데이터 n8n Webhook 연동
- 프롬프트 옵션 기반 자동화 처리

### 구조 요약

- 인증 / 유저 관리: Supabase
- 자동화 처리: n8n
- PR 데이터: 이벤트 기반 전달 (DB 저장 없음)

### 기술 스택

- Next.js
- TypeScript
- Supabase
- n8n
