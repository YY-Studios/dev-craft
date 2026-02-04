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

export const useOrganizations = (page: number) => {
  return useQuery<OrganizationResponse>({
    queryKey: ['organizations', page],
    queryFn: async (): Promise<OrganizationResponse> => {
      const data = await clientApi<OrganizationResponse>(`auth/github/organizations?page=${page}`);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
