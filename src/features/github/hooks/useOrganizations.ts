import { clientApi } from '@/shared/api/client/clientApi';
import { useQuery } from '@tanstack/react-query';

interface Organization {
  type: 'user' | 'org';
  login: string;
  avatar_url: string;
}

interface OrganizationResponse {
  data: Organization[];
  totalPages: number;
}

export const useOrganizations = () => {
  return useQuery<OrganizationResponse>({
    queryKey: ['organizations'],
    queryFn: async (): Promise<OrganizationResponse> => {
      const data = await clientApi<OrganizationResponse>('auth/github/organizations');
      console.log('서버에서 받아온 데이터:', data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
