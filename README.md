좋아, **“말로 코드 설명”만 딱 정리해줄게.**
(실제 코드 붙이면 길어지니까 역할 중심으로 👌)

---

## 1️⃣ `api/fetchPullRequests.ts`

**역할:**
서버(API)에서 PR 목록을 “순수하게” 가져오는 함수

**들어갈 내용 (말로 예시)**

- `/pull-requests` 같은 엔드포인트 호출
- accessToken 자동 포함 (너희 clientApi / serverApi 규칙 기준)
- 응답을 그대로 반환 (가공 ❌)

👉 여기서는

- 상태 관리 ❌
- 로딩 / 에러 처리 ❌
- UI 관련 ❌

**한 줄 요약:**
“PR 데이터를 **가져오기만** 하는 레이어”

---

## 2️⃣ `hooks/usePullRequests.ts`

**역할:**
PR 데이터를 “화면에서 쓰기 좋게” 만드는 연결부

**들어갈 내용 (말로 예시)**

- React Query `useQuery` 사용
- 내부에서 `fetchPullRequests` 호출
- 캐시 키 관리 (`['pull-requests']`)
- 필요하면:
  - 로그인 여부 체크
  - 데이터 정렬 / 필터링
  - enabled 옵션

👉 여기서 한다:

- 로딩 상태
- 에러 상태
- refetch
- 캐시 유지

**한 줄 요약:**
“API + 상태를 **React에 맞게 묶어주는 훅**”

---

## 3️⃣ `model/pullRequest.types.ts`

**역할:**
PR 데이터의 **기준 형태 정의**

**들어갈 내용 (말로 예시)**

- PR 하나의 타입
  - id
  - title
  - author
  - status (open / closed / merged)
  - createdAt

- PR 리스트 응답 타입

👉 규칙:

- UI 전용 타입 ❌
- API 스펙 기준으로 작성
- enum / union 타입 적극 사용

**한 줄 요약:**
“PR 데이터의 **공식 설계도**”

---

## 4️⃣ `ui/PullRequestList.tsx`

**역할:**
PR 목록 전체를 보여주는 컨테이너 UI

**들어갈 내용 (말로 예시)**

- `usePullRequests()` 호출
- 로딩이면 스피너
- 에러면 에러 UI
- 성공 시:
  - PR 배열 map
  - `PullRequestItem`에 전달

👉 여기서는:

- 데이터 fetch 직접 ❌
- 타입 정의 ❌

**한 줄 요약:**
“PR 목록을 **어떻게 보여줄지**만 책임”

---

## 5️⃣ `ui/PullRequestItem.tsx`

**역할:**
PR 하나를 그리는 **순수 컴포넌트**

**들어갈 내용 (말로 예시)**

- title 표시
- 작성자 표시
- 상태 뱃지 (open / merged)
- 클릭 시 상세 이동

👉 규칙:

- 상태 관리 ❌
- API 호출 ❌
- props만 받아서 렌더링

**한 줄 요약:**
“PR 한 줄을 그리는 **완전 dumb 컴포넌트**”

---

## 6️⃣ `index.ts`

**역할:**
외부에서 쓰는 것만 정리해서 export

**들어갈 내용 (말로 예시)**

- `export { PullRequestList }`
- `export { usePullRequests }`

👉 내부 파일 구조 감추기

**한 줄 요약:**
“features/pull-request의 **공식 출입구**”

---

## 🔥 전체 흐름 한 줄로

```
UI(PullRequestList)
 → hook(usePullRequests)
   → api(fetchPullRequests)
     → 서버
```

---

이 구조의 장점:

- PR “불러오기” → “정렬” → “필터” 추가해도 안 흔들림
- 나중에 **PR 생성 / 수정 / 삭제** 붙이기 쉬움
- 리뷰어가 구조 보고 바로 이해함

다음으로 원하면
👉 **이걸 이슈 설명 문장 / PR 설명 템플릿으로 정리해줄게**
