import { useInfiniteQuery } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';
import { FeedPost } from '../model/types';
import { useSearchParams } from 'next/navigation';

export function useFeedPosts() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const sort = searchParams.get('sort') ?? 'latest';

  return useInfiniteQuery({
    queryKey: ['feeds', sort, query],
    queryFn: ({ pageParam }) => {
      console.log('pageParam:', pageParam);
      const cursorParam =
        sort === 'latest' && pageParam ? `&cursor=${encodeURIComponent(pageParam)}` : '';
      const offsetParam = sort === 'popular' && pageParam ? `&offset=${pageParam}` : '';

      return clientApi<FeedPost[]>(`feeds?q=${query}&sort=${sort}${cursorParam}${offsetParam}`);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 6) return undefined;

      if (sort === 'latest') {
        return lastPage[lastPage.length - 1].created_at;
      } else {
        return allPages.flat().length;
      }
    },
    initialPageParam: sort === 'latest' ? '' : 0,
  });
}
