## 폴더 구조

```
src/
└── features/
    └── github/
        ├── api/
        │   ├── fetchOrganizations.ts   # 1. 오리진(조직) 목록
        │   ├── fetchRepositories.ts    # 2. 레포 목록
        │   └── fetchPullRequests.ts    # 3. PR 목록
        ├── hooks/
        │   ├── useOrganizations.ts
        │   ├── useRepositories.ts
        │   └── usePullRequests.ts
        └── ui/
            ├── OrganizationSelect.tsx
            ├── RepositorySelect.tsx
            └── PullRequestList.tsx
```

---

## 1. API 함수들

### fetchOrganizations.ts

```typescript
// 내 계정 + 소속 조직 목록
export async function fetchOrganizations(accessToken: string) {
  // 1. 내 정보
  const userRes = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const user = await userRes.json();

  // 2. 내가 속한 조직들
  const orgsRes = await fetch('https://api.github.com/user/orgs', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const orgs = await orgsRes.json();

  // 내 계정도 "오리진"으로 포함
  return [
    { type: 'user', login: user.login, avatar_url: user.avatar_url },
    ...orgs.map((org: any) => ({
      type: 'org',
      login: org.login,
      avatar_url: org.avatar_url,
    })),
  ];
}
```

### fetchRepositories.ts

```typescript
// 선택된 오리진의 레포 목록
export async function fetchRepositories(accessToken: string, owner: string, type: 'user' | 'org') {
  const endpoint =
    type === 'user'
      ? 'https://api.github.com/user/repos'
      : `https://api.github.com/orgs/${owner}/repos`;

  const res = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.json();
}
```

### fetchPullRequests.ts

```typescript
// 선택된 레포의 PR 목록
export async function fetchPullRequests(
  accessToken: string,
  owner: string,
  repo: string,
  state: 'open' | 'closed' | 'all' = 'open',
) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls?state=${state}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.json();
}
```

---

## 2. React Query 훅

### useOrganizations.ts

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchOrganizations } from '../api/fetchOrganizations';

export function useOrganizations(accessToken: string) {
  return useQuery({
    queryKey: ['organizations'],
    queryFn: () => fetchOrganizations(accessToken),
    enabled: !!accessToken,
  });
}
```

### useRepositories.ts

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchRepositories } from '../api/fetchRepositories';

export function useRepositories(accessToken: string, owner: string, type: 'user' | 'org') {
  return useQuery({
    queryKey: ['repositories', owner],
    queryFn: () => fetchRepositories(accessToken, owner, type),
    enabled: !!accessToken && !!owner,
  });
}
```

### usePullRequests.ts

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchPullRequests } from '../api/fetchPullRequests';

export function usePullRequests(accessToken: string, owner: string, repo: string) {
  return useQuery({
    queryKey: ['pullRequests', owner, repo],
    queryFn: () => fetchPullRequests(accessToken, owner, repo),
    enabled: !!accessToken && !!owner && !!repo,
  });
}
```

---

## 3. 사용 흐름 (컴포넌트)

```typescriptreact
'use client';

import { useState } from 'react';
import { useOrganizations } from '../hooks/useOrganizations';
import { useRepositories } from '../hooks/useRepositories';
import { usePullRequests } from '../hooks/usePullRequests';

export function PRSelector({ accessToken }: { accessToken: string }) {
  const [selectedOrg, setSelectedOrg] = useState<{ login: string; type: 'user' | 'org' } | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

  // 1단계: 오리진 목록
  const { data: orgs } = useOrganizations(accessToken);

  // 2단계: 레포 목록 (오리진 선택 후)
  const { data: repos } = useRepositories(
    accessToken,
    selectedOrg?.login ?? '',
    selectedOrg?.type ?? 'user'
  );

  // 3단계: PR 목록 (레포 선택 후)
  const { data: prs } = usePullRequests(
    accessToken,
    selectedOrg?.login ?? '',
    selectedRepo ?? ''
  );

  return (
    <div className="space-y-4">
      {/* 1. 오리진 선택 */}
      <select onChange={(e) => {
        const org = orgs?.find((o) => o.login === e.target.value);
        setSelectedOrg(org ?? null);
        setSelectedRepo(null); // 레포 초기화
      }}>
        <option value="">조직/계정 선택</option>
        {orgs?.map((org) => (
          <option key={org.login} value={org.login}>{org.login}</option>
        ))}
      </select>

      {/* 2. 레포 선택 */}
      {selectedOrg && (
        <select onChange={(e) => setSelectedRepo(e.target.value)}>
          <option value="">레포 선택</option>
          {repos?.map((repo: any) => (
            <option key={repo.id} value={repo.name}>{repo.name}</option>
          ))}
        </select>
      )}

      {/* 3. PR 목록 */}
      {selectedRepo && (
        <ul className="space-y-2">
          {prs?.map((pr: any) => (
            <li key={pr.id} className="border p-3 rounded">
              #{pr.number}: {pr.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## 흐름 정리

```
[조직/계정 선택] → useOrganizations
       ↓
[레포 선택] → useRepositories (enabled: selectedOrg 있을 때만)
       ↓
[PR 목록] → usePullRequests (enabled: selectedRepo 있을 때만)
```

---

이 구조로 시작하면 돼요! 팝오버로 바꾸려면 `<select>` 대신 `PopoverTrigger` + `PopoverContent` 안에 리스트 넣으면 돼요.
