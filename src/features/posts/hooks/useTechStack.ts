import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';

export const useTechStack = () => {
  return useQuery({
    queryKey: ['tech-stack'],
    queryFn: () => clientApi<{ subject: string; value: number }[]>('dashboard/tech-stack'),
  });
};
