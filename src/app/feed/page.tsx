import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import { FeedTap } from '@/features/feed/FeedTap';
import { FeedSearch } from '@/features/feed/FeedSearch';
import { FeedList } from '@/features/feed/FeedList';
import { Suspense } from 'react';
import { serverApi } from '@/shared/api/server/serverApi';

export default async function FeedPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['feeds', 'latest', ''],
    queryFn: async () => {
      return serverApi(
        `/analyses?select=id,title,content,thumbnail_url,likes_count,created_at,tags,is_author_verified,users(username,avatar_url)&visibility=eq.true&order=created_at.desc&limit=6`,
      );
    },
    initialPageParam: '',
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container--sm flex flex-wrap items-baseline justify-between mb-2 md:mb-6 border-gray-200">
        <div className="flex">
          <Suspense fallback={null}>
            <FeedTap />
          </Suspense>
        </div>
        <div className="max-w-xs pb-1 mt-2 md:mt-0">
          <Suspense fallback={null}>
            <FeedSearch />
          </Suspense>
        </div>
        <Suspense fallback={null}>
          <FeedList />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
