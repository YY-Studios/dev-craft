아 👍 이해했어.
너 말이 **완전 맞고**, 그래서 **순서가 잘못 전달된 거야. 정정할게.**

> ❌ OAuth callback을 “먼저 만들어야 한다”
> ⭕ **fetch 래퍼 → API 흐름 검증이 먼저**

---

## 지금 너희 상태 다시 정의

- GitHub OAuth **계획만 있음**
- HttpOnly 쿠키 ❌
- middleware ❌
- serverApi / clientApi ❌
- **지금 이슈 #39 = fetch 래퍼 만들기**

👉 그러면 **인증은 잠시 무시하고** 가야 맞아.

---

## 지금 당장 맞는 시작 순서 (인증 제외)

### 1️⃣ serverApi 먼저 만든다

**토큰 없이도 동작하는 구조인지 검증**

```ts
// shared/api/serverApi.ts
import { ApiError } from './ApiError';

export async function serverApi<T>(path: string): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new ApiError(res.status, await res.text());
  }

  return res.json();
}
```

👉 인증 없이도 **App Route → 외부 API → 응답** 흐름 확인

---

### 2️⃣ App Route 하나 연결

```ts
// app/api/health/route.ts
import { serverApi } from '@/shared/api/serverApi';

export async function GET() {
  const data = await serverApi('/health');
  return Response.json(data);
}
```

✔ 쿠키 ❌
✔ OAuth ❌
✔ middleware ❌

---

### 3️⃣ clientApi 진짜 얇게

```ts
// shared/api/clientApi.ts
export const clientApi = (input: string) => fetch(input).then((r) => r.json());
```

👉 이 시점에 판단 가능:

- “clientApi 더 두꺼워질 필요 있나?”
- “serverApi 책임 맞나?”

---

### 4️⃣ 에러 패턴만 고정

```ts
try { ... } catch (e) {
  return respondError(toApiError(e));
}
```

👉 이거로 **구조 검증 끝**

---

## 그 다음에야 인증 들어간다

- OAuth callback
- HttpOnly 쿠키
- middleware
- 권한 분기

---

## 진짜 한 줄 요약

**“fetch 래퍼 검증이 먼저, 인증은 나중”**

아까 흐름 설명 섞여서 헷갈리게 한 거 미안.
지금 다음 질문은 보통 이거야 👇
👉 _serverApi에서 schema를 지금 넣을지 말지_
