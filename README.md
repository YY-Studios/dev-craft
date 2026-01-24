좋아, 이건 **Next.js에서 제일 정석적인 GitHub OAuth + HttpOnly 토큰 저장 흐름**이라
단계별로 **왜 필요한지 → 뭐 하는지 → 코드**까지 한 번에 정리해줄게.
(지금까지 얘기한 clientApi / serverApi 구조랑도 딱 맞게 갈게 👍)

---

# 전체 그림 먼저 (이게 제일 중요 🔥)

```txt
[1] 유저가 "GitHub로 로그인" 클릭
      ↓
[2] Next 서버 → GitHub OAuth 페이지로 리다이렉트
      ↓
[3] GitHub 로그인 & 권한 승인
      ↓
[4] GitHub → Next 콜백 URL로 code 전달
      ↓
[5] Next 서버가 code → access_token 교환
      ↓
[6] access_token을 HttpOnly 쿠키로 저장
      ↓
[7] 로그인 완료 🎉
```

---

# 0️⃣ 준비물 체크

- Next.js (App Router)
- 서버 환경 (Node 18+)
- **토큰은 HttpOnly Cookie로만 관리**
- client에서는 토큰 직접 접근 ❌

---

# 1️⃣ GitHub에서 OAuth App 만들기

## GitHub → Settings → Developer settings → OAuth Apps

### 👉 **New OAuth App**

| 항목                       | 값                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| Application name           | dev-craft                                                                                        |
| Homepage URL               | [http://localhost:3000](http://localhost:3000)                                                   |
| Authorization callback URL | [http://localhost:3000/api/auth/github/callback](http://localhost:3000/api/auth/github/callback) |

👉 **Register application**

---

### 생성 후 꼭 챙길 것

- **Client ID**
- **Client Secret** (Generate)

---

## `.env.local`

```env
GITHUB_CLIENT_ID=xxxxx
GITHUB_CLIENT_SECRET=xxxxx
GITHUB_REDIRECT_URI=http://localhost:3000/api/auth/github/callback
```

❗ `NEXT_PUBLIC_` 붙이지 마
→ 서버 전용임

---

# 2️⃣ 로그인 시작 API (GitHub로 보내는 역할)

## `/app/api/auth/github/route.ts`

```ts
import { NextResponse } from 'next/server';

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: process.env.GITHUB_REDIRECT_URI!,
    scope: 'read:user user:email',
  });

  const githubAuthUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;

  return NextResponse.redirect(githubAuthUrl);
}
```

### 역할

- GitHub 로그인 페이지로 **리다이렉트만 담당**
- 토큰 ❌
- 쿠키 ❌

---

# 3️⃣ 로그인 버튼 (Client)

```tsx
'use client';

export function GithubLoginButton() {
  const handleLogin = () => {
    window.location.href = '/api/auth/github';
  };

  return <button onClick={handleLogin}>GitHub로 로그인</button>;
}
```

---

# 4️⃣ GitHub 콜백 처리 (제일 핵심 💥)

## `/app/api/auth/github/callback/route.ts`

```ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ message: 'No code' }, { status: 400 });
  }

  // 1️⃣ code → access_token 교환
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      code,
    }),
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    return NextResponse.json({ message: 'Token error' }, { status: 400 });
  }

  // 2️⃣ HttpOnly 쿠키 저장
  const response = NextResponse.redirect(new URL('/', req.url));

  response.cookies.set({
    name: 'github_access_token',
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
```

---

## 🔐 왜 HttpOnly 쿠키냐?

- JS에서 접근 불가
- XSS 방어
- clientApi에서 자동 전송됨

```txt
document.cookie ❌
fetch('/api/...') → 쿠키 자동 포함 ⭕
```

---

# 5️⃣ 로그인 후 사용자 정보 가져오기 (서버)

## `/shared/api/server/github.ts`

```ts
import { cookies } from 'next/headers';

export async function getGithubUser() {
  const token = cookies().get('github_access_token')?.value;

  if (!token) throw new Error('Unauthorized');

  const res = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
```

---

## API Route로 감싸기

### `/app/api/me/route.ts`

```ts
import { getGithubUser } from '@/shared/api/server/github';

export async function GET() {
  try {
    const user = await getGithubUser();
    return Response.json(user);
  } catch {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
```

---

# 6️⃣ Client에서 로그인 상태 사용

```tsx
'use client';

import { useEffect, useState } from 'react';
import { clientApi } from '@/shared/api/client/clientApi';

export default function Page() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    clientApi('/me')
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  if (!user) return <div>로그인 안됨</div>;

  return <div>{user.login} 로그인됨</div>;
}
```

---

# 7️⃣ 로그아웃

## `/app/api/auth/logout/route.ts`

```ts
import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set({
    name: 'github_access_token',
    value: '',
    maxAge: 0,
    path: '/',
  });

  return res;
}
```

---

# 최종 구조 요약 ⭐

```txt
client
 └─ 로그인 버튼
server
 ├─ /api/auth/github        → GitHub로 보내기
 ├─ /api/auth/github/callback → 토큰 교환 + HttpOnly 저장
 ├─ /api/me                → 로그인 상태 확인
 └─ /api/auth/logout       → 쿠키 제거
```

---

## 한 줄 결론 🔥

- GitHub OAuth는 **Next 서버가 전부 처리**
- 토큰은 **HttpOnly 쿠키**
- client는 **로그인 여부만 소비**
- 지금 네 프로젝트 구조랑 **완벽하게 맞는 방식**

---

다음 단계로 바로 갈 수 있는 거 👇
👉 **DB에 유저 저장 + 첫 로그인 처리**
👉 **Access Token 만료 대응 / refresh 전략**
👉 **Supabase Auth랑 GitHub OAuth 비교 구조**

뭐부터 볼까?

여기서는 **딱 2개가 잘못됐고**, 그거만 고치면 구조는 맞아.

---

❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌

## 1️⃣ GitHub 토큰 변수명 (버그)

GitHub에서 내려주는 응답 키는 **`access_token`** 이야.
지금은 구조분해를 잘못하고 있음.

❌ 지금 코드

```ts
const { github_access_token } = await tokenRes.json();
```

✅ 고쳐야 함

```ts
const { access_token: githubAccessToken } = await tokenRes.json();
```

그리고 아래도 같이 수정:

```ts
if (!githubAccessToken) {
  return NextResponse.json({ message: '토큰 에러' }, { status: 400 });
}

const githubUser = await getGithubUserByToken(githubAccessToken);
```

---

## 2️⃣ 우리 JWT payload가 잘못됨 (중요)

지금 이 줄 ❌

```ts
const accessToken = createAccessToken({ user_id: githubUser.id });
```

문제:

- `githubUser.id` → **GitHub 숫자 ID**
- JWT에는 **우리 users 테이블의 id(uuid)** 가 들어가야 함

✅ 정답

```ts
const accessToken = createAccessToken({ user_id: user.id });
```

이게 **아주 중요**함.

---

## 정리된 수정 버전 (핵심만)

```ts
const { access_token: githubAccessToken } = await tokenRes.json();

const githubUser = await getGithubUserByToken(githubAccessToken);

const user = await serverApi<User>('user', {
  method: 'POST',
  body: {
    github_user_id: githubUser.id,
    username: githubUser.login,
    avatar_url: githubUser.avatar_url,
    email: githubUser.email ?? null,
  },
});

const accessToken = createAccessToken({ user_id: user.id });
```

---

## 한 줄 요약

- GitHub 토큰 키 이름 틀렸음 (`access_token`)
- JWT에는 **GitHub id가 아니라 우리 user.id(uuid)** 넣어야 함

이 두 개 고치면
OAuth → users 저장 → 우리 토큰 발급 **정상 플로우**다.

**Upsert** = **Up**date + In**sert** 의 합성어예요.

---

❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌

## 동작 방식

| 상황                | INSERT만            | Upsert       |
| ------------------- | ------------------- | ------------ |
| 유저가 없을 때      | 새로 생성 ✅        | 새로 생성 ✅ |
| 유저가 이미 있을 때 | 에러 ❌ (지금 상황) | 업데이트 ✅  |

---

## Supabase에서 Upsert 적용법

`Prefer` 헤더에 `resolution=merge-duplicates` 추가:

```typescript
// 기존 (INSERT만)
headers: {
  'Prefer': 'return=representation',
}

// 변경 (Upsert)
headers: {
  'Prefer': 'return=representation,resolution=merge-duplicates',
}
```

---

## 결과

```
첫 로그인 → github_user_id 없음 → INSERT (새 유저 생성)
재로그인 → github_user_id 있음 → UPDATE (기존 유저 정보 반환)
```

둘 다 에러 없이 유저 정보를 받을 수 있어요!
