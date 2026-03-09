import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';

export const useWeeklyActivity = () => {
  return useQuery({
    queryKey: ['weekly-activity'],
    queryFn: () => clientApi<{ day: string; count: number }[]>('dashboard/weekly-activity'),
  });
};
