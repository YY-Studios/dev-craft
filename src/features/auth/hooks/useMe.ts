import { useQuery } from '@tanstack/react-query';
import { User } from '@/shared/types/user';
import { clientApi } from '@/shared/api/client/clientApi';

export const useMe = () => {
  return useQuery<User | null>({
    queryKey: ['me'],
    queryFn: async (): Promise<User | null> => {
      try {
        return await clientApi<User>('me');
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5분간 캐시
  });
};
