import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';

export const useTopLiked = () => {
  return useQuery({
    queryKey: ['top-liked'],
    queryFn: () =>
      clientApi<{ id: string; title: string; likes_count: number; users: { username: string } }[]>(
        'dashboard/top-liked',
      ),
  });
};
