**순서:**

1. `react-intersection-observer` 설치 완료
2. `app/api/feeds/route.ts` — cursor/offset 파라미터 추가
3. `useFeedPosts.ts` — `useQuery` → `useInfiniteQuery` 교체
4. `FeedPage` — `prefetchInfiniteQuery` + `HydrationBoundary` 추가
5. `FeedList` — `useInView` + `fetchNextPage` 연결

============================================================

pnpm add react-intersection-observer

이거 부탁드립니다 꾸벅..!
우우우~~~

============================================================

import { serverApi } from '@/shared/api/server/serverApi';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
const { searchParams } = new URL(req.url);
const query = searchParams.get('q') ?? '';
const sort = searchParams.get('sort') ?? 'latest';
const cursor = searchParams.get('cursor') ?? ''; // 최신순: 마지막 글의 created_at
const offset = searchParams.get('offset') ?? '0'; // 인기순: 몇 번째부터 가져올지
const PAGE_SIZE = 10;

try {
const search = query ? `&title=ilike.*${query}*` : '';

    // select할 컬럼 목록
    const base = `id,title,content,thumbnail_url,likes_count,created_at,tags,is_author_verified,users(username,avatar_url)`;

    let path = '';

    if (sort === 'latest') {
      // cursor가 있으면 "이 시간 이전 글만 줘" 필터 추가
      const cursorFilter = cursor ? `&created_at=lt.${cursor}` : '';
      path = `/analyses?select=${base}&visibility=eq.true&order=created_at.desc&limit=${PAGE_SIZE}${search}${cursorFilter}`;
    } else {
      // 인기순은 offset으로 "n번째부터 줘" 방식
      path = `/analyses?select=${base}&visibility=eq.true&order=likes_count.desc&limit=${PAGE_SIZE}&offset=${offset}${search}`;
    }

    const data = await serverApi(path);
    return NextResponse.json(data);

} catch (e) {
console.error(e);
return NextResponse.json({ message: '데이터 조회에 실패했습니다.' }, { status: 500 });
}
}

============================================================

3번. useFeedPosts.ts — useInfiniteQuery 교체

```tsx
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { clientApi } from '@/shared/api/client/clientApi';
import { FeedPost } from '@/features/feed/types';

export function useFeedPosts(sort: string = 'latest') {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';

  return useInfiniteQuery({
    queryKey: ['feeds', sort, query], // sort나 query 바뀌면 처음부터 다시 fetch
    // 지금이 몇번째 페이지인지 알려주는 처음은 initialPageParam -> getNextPageParam
    queryFn: ({ pageParam }) => {
      // pageParam → getNextPageParam이 반환한 값 (커서 or 오프셋)
      const cursorParam = sort === 'latest' ? `&cursor=${pageParam}` : '';
      const offsetParam = sort === 'popular' ? `&offset=${pageParam}` : '';
      return clientApi<FeedPost[]>(
        `feeds?q=${query}&sort=${sort}${cursorParam}${offsetParam}`
      );
    },
    다음 페이지 param에 들어갈값을 요청 없으면 null
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return undefined; // 마지막 페이지

      if (sort === 'latest') {
        // 마지막 글의 created_at을 커서로 사용
        return lastPage[lastPage.length - 1].created_at;
      } else {
        // 지금까지 받은 글 수를 오프셋으로 사용
        return allPages.flat().length;
      }
    },
    // 이게 처음 pageParam에 들어갈값
    initialPageParam: sort === 'latest' ? '' : 0,
  });
}
```

4번. FeedPage — prefetchInfiniteQuery + HydrationBoundary 추가

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { FeedTap } from '@/features/feed/FeedTap';
import { FeedSearch } from '@/features/feed/FeedSearch';
import { FeedList } from '@/features/feed/FeedList';
import { Suspense } from 'react';

export default async function FeedPage() {
const queryClient = new QueryClient();

// 서버에서 첫 페이지 미리 fetch
await queryClient.prefetchInfiniteQuery({
queryKey: ['feeds', 'latest', ''],
queryFn: async () => {
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/feeds?sort=latest`);
return res.json();
},
initialPageParam: '',
});

return (
// 서버에서 만든 캐시를 클라이언트에 주입
<HydrationBoundary state={dehydrate(queryClient)}>

<div className="flex flex-wrap items-baseline justify-between mb-2 md:mb-6 border-gray-200">
<div className="flex">
<FeedTap />
</div>
<div className="max-w-xs pb-1 mt-2 md:mt-0">
<Suspense fallback={null}>
<FeedSearch />
</Suspense>
</div>
</div>
<Suspense fallback={<div>로딩중...</div>}>
<FeedList />
</Suspense>
</HydrationBoundary>
);
}

============================================================
5번. FeedList — useInView + fetchNextPage 연결

'use client';

import { FeedCard } from './FeedCard';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useFeedPosts } from './hooks/useFeedPosts';

export function FeedList() {
const { ref, inView } = useInView();

const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFeedPosts();

// 맨 아래 div가 화면에 들어오면 다음 페이지 fetch
useEffect(() => {
if (inView && hasNextPage) fetchNextPage();
}, [inView, hasNextPage]);

const posts = data?.pages.flat() ?? [];

return (
<>

<div className="grid grid-cols-[repeat(auto-fit,minmax(271px,1fr))] gap-3">
{posts.map((post) => (
<FeedCard key={post.id} post={post} />
))}
</div>
{/_ 이 div가 화면에 보이는 순간 다음 페이지 fetch _/}
<div ref={ref} />
{isFetchingNextPage && <div>불러오는 중...</div>}
</>
);
}

============================================================

지금 `useState`로 탭 상태 관리하는데, URL 기반으로 바꿔야 해. `FeedList`에서 `useSearchParams`로 읽을 수 있게.

```tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const TABS = [
  { label: '최신', value: 'latest' },
  { label: '인기', value: 'popular' },
];

export const FeedTap = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('sort') ?? 'latest';

  const handleTab = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.replace(`/feed?${params.toString()}`);
  };

  return (
    <>
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTab(tab.value)}
          className={`px-4 py-2.5 text-xl font-medium transition-colors cursor-pointer relative ${
            activeTab === tab.value ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {tab.label}
          {activeTab === tab.value && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
          )}
        </button>
      ))}
    </>
  );
};
```

`FeedSearch`랑 똑같은 패턴이야. URL에 `?sort=latest` or `?sort=popular` 반영하는 거.

# ============================================================

같은 글이 중복으로 오고 있어. Cursor가 제대로 안 넘어가는 거야.

`useFeedPosts`에서 `pageParam`이 빈 문자열일 때 URL에 `&cursor=` 이렇게 붙어서 문제가 생겨.

```ts
queryFn: ({ pageParam }) => {
  // pageParam이 빈 문자열이면 cursor 파라미터 아예 안 붙이기
  const cursorParam = sort === 'latest' && pageParam ? `&cursor=${pageParam}` : '';
  const offsetParam = sort === 'popular' && pageParam ? `&offset=${pageParam}` : '';
  return clientApi<FeedPost[]>(
    `feeds?q=${query}&sort=${sort}${cursorParam}${offsetParam}`
  );
},
```

`pageParam`이 있을 때만 cursor/offset 붙이도록 수정하면 돼.
