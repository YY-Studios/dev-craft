import { clientApi } from '@/shared/api/client/clientApi';
import { useQuery } from '@tanstack/react-query';
import { selectedOrgType } from '@/widgets/pull-request-step/PullRequestStepWrap';
// Repository 타입
interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  private: boolean;
}

// API 응답 타입
interface RepositoryResponse {
  data: Repository[];
  totalPages: number;
}

// Hook Props 타입
interface UseRepositoriesProps {
  selectOrg: selectedOrgType;
  page?: number;
}

export const useRepositories = ({ selectOrg, page }: UseRepositoriesProps) => {
  return useQuery<RepositoryResponse>({
    queryKey: ['repositories', selectOrg.login, page],
    queryFn: async (): Promise<RepositoryResponse> => {
      const data = await clientApi<RepositoryResponse>(
        `auth/github/repositories?type=${selectOrg.type}&login=${selectOrg.login}&page=${page}`,
      );
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
