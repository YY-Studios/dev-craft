3단계: 수동 저장 (Next.js ➡️ Supabase)
미리보기를 확인한 유저가 최종적으로 [저장하기] 버튼을 누릅니다.
이때 비로소 Next.js에서 Supabase의 posts 테이블로 데이터를 INSERT 하는 쿼리를 전송합니다.
(Supabase는 순수하게 데이터 테이블 역할만 수행하도록 구성하셨으므로, 프론트엔드나 API 라우트에서 Supabase 클라이언트를 사용해 수동으로 직접 Insert 쿼리를 날려주면 됩니다.)

이때 DB에 같이 들어가야 할 핵심 데이터는 다음과 같습니다:

n8n이 만들어준 데이터 (title, tags, content, html) << 이거는 그 뮤테이트? 그거 불러올수있나? api 라우트에서?

유저가 선택했던 메타데이터 (org_name, repo_name, pr_url)

현재 로그인한 유저의 고유 ID (user_id) #### 4단계: 후처리 및 라우팅
Supabase 테이블에 성공적으로 데이터가 들어갔다는 응답(생성된 글의 고유 id)을 받으면, 프론트엔드에서 유저를 해당 글의 상세 보기 페이지(/[username]/posts/[생성된_id])나 나의 공방 목록 페이지로 리다이렉트 시켜줍니다.

==================================

레포 생성일, pr 기여
내가 여기에 pr 몇개 올렸는지 < 블로그 들어갈때 / git api 요청

총 생성 문서는
내가 생성한 문서 < 수퍼베이스 갯수 세기

이번 주 생성 문서수
0304 / 3 , 0305/0 , 0306/5 < 수퍼베이스 갯수 세기

가장 많이 생성한 태그
종류 많은거 상단 5개 < 수퍼베이스 갯수세기

인기 포스트 Top 5
만약 좋아요가 없을시 최신순 < 수퍼베이스 갯수세기

# =====================================

=====================================

## GitHub API 효율적으로 쓰는 법

### 1. 레포 생성일

```
GET /repos/{owner}/{repo}
```

→ `created_at` 필드 하나로 끝

---

### 2. 내 PR 개수

```
GET /search/issues?q=repo:{owner}/{repo}+type:pr+author:{username}
```

→ `total_count` 필드가 PR 개수

---

### 효율적인 방법: **둘을 한 번에** → GraphQL

REST는 요청 2번이지만 GraphQL은 1번으로 끝나요:

```graphql
query {
  repository(owner: "yujinimda", name: "레포명") {
    createdAt
    pullRequests(first: 1, states: [MERGED, OPEN, CLOSED]) {
      totalCount
    }
  }
}
```

**엔드포인트:** `POST https://api.github.com/graphql`

---

### 블로그 진입 시 호출이면

매번 API 요청하면 rate limit 걸릴 수 있으니까 **캐싱** 추천:

- `localStorage` + 24시간 TTL
- 또는 빌드 타임에 fetch해서 정적으로 박아두기 (Vite 기준 `vite.config.ts`에서)

어떤 방식으로 쓸 거예요? 빌드 타임 vs 런타임?

# =====================================

=====================================

REST API랑 비교하면 쉬워요.

**REST** → 서버가 주는 데이터 그대로 받음

```
GET /repos/yujinimda/portfolio
→ { name, createdAt, stars, forks, description, ... } // 필요없는 것도 다 옴
```

**GraphQL** → 내가 원하는 필드만 골라서 요청

```graphql
query {
  repository(owner: "yujinimda", name: "portfolio") {
    createdAt # 이것만 줘
  }
}
```

# =====================================

=====================================

핵심 차이는:

- REST는 엔드포인트가 여러 개 (`/repos`, `/pulls`, `/issues`...)
- GraphQL은 **엔드포인트 하나** (`/graphql`)에 쿼리만 바꿔서 요청

GitHub이 둘 다 지원하는데, 필요한 데이터만 정확히 뽑을 때는 GraphQL이 훨씬 효율적이에요.

const response = await fetch("https://api.github.com/graphql", {
method: "POST",
headers: {
"Authorization": "Bearer YOUR_GITHUB_TOKEN",
"Content-Type": "application/json",
},
body: JSON.stringify({
query: `       query {
        repository(owner: "yujinimda", name: "portfolio") {
          createdAt
        }
      }
    `
})
})

const data = await response.json()
console.log(data.data.repository.createdAt)
