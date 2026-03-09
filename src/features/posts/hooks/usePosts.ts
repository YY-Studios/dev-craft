import { useInfiniteQuery } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';

export const usePosts = ({ username, selectRepo }: { username: string; selectRepo: string }) => {
  return useInfiniteQuery({
    queryKey: ['posts', username, selectRepo],

    queryFn: async ({ pageParam }) => {
      const cursorParam = pageParam ? `&cursor=${encodeURIComponent(pageParam as string)}` : '';
      return await clientApi(`posts?username=${username}&repo=${selectRepo}${cursorParam}`);
    },
    initialPageParam: '',
    getNextPageParam: (lastPage: any[]) => {
      if (!lastPage || lastPage.length < 10) return undefined;
      return lastPage[lastPage.length - 1].created_at;
    },
    enabled: !!username,
  });
};
