```typescript
import jwt from 'jsonwebtoken';

export function verifyAccessToken(token: string): { user_id: string } {
  return jwt.verify(token, process.env.JWT_SECRET!) as { user_id: string };
}
```

---

끝이에요! `jwt.verify`가 알아서 해줘요:

- 서명 검증 ✅ sect
- 만료 시간 체크 ✅ 7일
- 실패 시 에러 throw ✅

jwt.verify(token, secret)

서명 검증 - 이 토큰이 우리 서버(JWT_SECRET)로 만든 게 맞는지
만료 체크 - expiresIn: '7d' 지났는지
payload 반환 - 검증 성공하면 { user_id: '...' } 반환

# ==================================================================

==================================================================

실패하면?
typescript// 위조된 토큰 → JsonWebTokenError
// 만료된 토큰 → TokenExpiredError
자동으로 에러 throw 해줘서 try-catch로 잡으면 돼요.

import jwt from 'jsonwebtoken';

user/me 서버 라우트

const token = req.cookies.get('access_token')?.value;

try {
const { user_id } = verifyAccessToken(token);
// 성공
} catch {
// JWT 에러든 뭐든 → 401
return NextResponse.json({ message: '인증 실패' }, { status: 401 });
}

클라이언트 버튼 익 누르면 유저미로 가고
if (!res.ok) {
// status: 401
const error = await res.json();
console.log(error.message); // "로그인 필요"
// → 로그인 페이지로 이동 등
}

==================================================================

==================================================================

## 테스트 방법

### 1. 먼저 로그인

브라우저에서 GitHub 로그인 진행 → 쿠키에 `access_token` 저장됨

### 2. 브라우저에서 직접 접속

```
http://localhost:3000/api/me
```

---

### 또는 개발자 도구에서 테스트

로그인 후 아무 페이지에서 F12 → Console:

```javascript
fetch('/api/me')
  .then((res) => res.json())
  .then(console.log);
```

---

### 쿠키 확인하는 법

F12 → Application → Cookies → `localhost`에서 `access_token` 있는지 확인

---

## 예상 결과

```json
// 성공 (로그인됨)
{ "id": "uuid...", "username": "lywoo00", "avatar_url": "..." }

// 실패 (로그인 안됨)
{ "message": "로그인이 필요합니다." }
```

==================================================================

==================================================================

useMe 훅만들고
typescript// features/auth/hooks/useMe.ts
import { useQuery } from '@tanstack/react-query';

export const useMe = () => {
return useQuery({
queryKey: ['me'],
queryFn: async () => {
const res = await fetch('/api/me');
if (!res.ok) return null;
return res.json();
},
});
};

두 가지 방법이 있어요:

---

## 방법 1: 클라이언트에서 그냥 호출 (간단)

prefetch 없이 `useMe()`가 알아서 호출해요:

```typescriptreact
// 그냥 useMe() 쓰면 됨
const { data: user, isLoading } = useMe();

if (isLoading) return <Skeleton />;  // 로딩 중
```

별도 설정 없이 바로 동작해요. 처음엔 이걸로 충분해요!

---

## 방법 2: 서버에서 Prefetch (초기 로딩 빠름)

```typescriptreact
// app/layout.tsx
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/lib/getQueryClient';
import { cookies } from 'next/headers';

export default async function RootLayout({ children }) {
  const queryClient = getQueryClient();

  // 서버에서 미리 fetch
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (token) {
    await queryClient.prefetchQuery({
      queryKey: ['me'],
      queryFn: async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/me`, {
          headers: { Cookie: `access_token=${token}` },
        });
        if (!res.ok) return null;
        return res.json();
      },
    });
  }

  return (
    <html>
      <body>
        <QueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
          </HydrationBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}
```

---

---

## 추천

**방법 1로 시작**하세요. `useMe()` 훅만 있으면 되고, 나중에 성능 최적화 필요하면 방법 2 추가해도 돼요.

크게 안 느려요!

---

## 실제 차이

| 방식               | 로딩 시간                        |
| ------------------ | -------------------------------- |
| Prefetch (서버)    | 페이지 로드와 동시에 데이터 있음 |
| useMe (클라이언트) | 페이지 로드 후 ~50-200ms 추가    |

---

## 체감 차이

```
Prefetch:     [페이지 + 유저 정보] ──────────▶ 완료
useMe:        [페이지] ──▶ [유저 정보] ──────▶ 완료
                          ↑
                       여기서 잠깐 로딩
```

버튼 하나 깜빡이는 정도예요. 대부분 사용자는 못 느껴요.

---

---

---

## 결론

- **지금은 useMe로 충분**
- 나중에 "로그인 버튼 깜빡임 거슬린다" 싶으면 prefetch 추가
- 최적화는 문제가 생겼을 때 해도 늦지 않아요

// src/features/auth/hooks/useMe.ts
import { useQuery } from '@tanstack/react-query';

import { User } from '@/shared/types/user';

export const useMe = () => {
return useQuery<User | null>({
queryKey: ['me'],
queryFn: async () => {
const res = await fetch('/api/me');
if (!res.ok) return null;
return res.json();
},
staleTime: 1000 _ 60 _ 5, // 5분간 캐시
});
};

---

---

useQuery만 쓸 때:
[HTML 도착] → [JS 로드] → [useQuery 실행] → [데이터 도착]
↑
여기서 로딩 표시

prefetch + useQuery:
[서버에서 미리 fetch] → [HTML + 데이터 도착] → [useQuery가 캐시 사용]
↑
로딩 없음!
