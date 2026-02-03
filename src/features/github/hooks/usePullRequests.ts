import { clientApi } from '@/shared/api/client/clientApi';
import { useQuery } from '@tanstack/react-query';
import { selectedOrgType } from '@/widgets/pull-request-step/PullRequestStepWrap';

interface PullRequest {
  id: number;
  number: number;
  title: string;
  body: string;
  state: 'open' | 'closed';
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
  merged_at: string | null;
}

interface PullRequestResponse {
  data: PullRequest[];
  totalPages: number;
}

interface UsePullRequestsProps {
  selectOrg?: selectedOrgType | null;
  selectRepo: string;
  page?: number;
}

export const usePullRequests = ({ selectOrg, selectRepo, page = 1 }: UsePullRequestsProps) => {
  return useQuery<PullRequestResponse>({
    queryKey: ['pullrequests', selectOrg?.login, selectRepo, page],
    queryFn: async (): Promise<PullRequestResponse> => {
      const data = await clientApi<PullRequestResponse>(
        `auth/github/pullRequests?owner=${selectOrg?.login}&repo=${selectRepo}&page=${page}`,
      );
      return data;
    },
    enabled: !!selectOrg?.login && !!selectRepo,
    staleTime: 1000 * 60 * 5,
  });
};
