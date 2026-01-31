import { clientApi } from '@/shared/api/client/clientApi';
import { useQuery } from '@tanstack/react-query';

interface Organization {
  type: 'user' | 'org';
  login: string;
  avatar_url: string;
}

export const useOrganizations = () => {
  return useQuery<Organization[]>({
    queryKey: ['organizations'],
    queryFn: async (): Promise<Organization[]> => {
      const data = await clientApi<Organization[]>('auth/github/organizations');
      console.log('서버에서 받아온 데이터:', data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
