import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';
import { FeedCardProps } from '../model/types';

export function useFeedPosts(query: string) {
  return useQuery({
    // query가 바뀔 때마다 자동으로 재요청 (ex. 'React' → 'Next.js')
    // 같은 검색어 다시 치면 캐시에서 바로 꺼내줘서 빠르게 보여줌
    queryKey: ['feeds', query],
    queryFn: () => clientApi<FeedCardProps['post'][]>(`feeds?q=${query}`),
  });
}
