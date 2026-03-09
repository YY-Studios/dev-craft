import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';

export interface RepoStat {
  repo_name: string;
  count: number;
}

export const useRepoStats = ({ username }: { username: string }) => {
  return useQuery<RepoStat[] | null>({
    queryKey: ['repoStats', username],
    queryFn: async (): Promise<RepoStat[] | null> => {
      try {
        return await clientApi<RepoStat[]>(`posts/stats?username=${username}`);
      } catch (e) {
        console.error('레포지토리 통계 로딩 실패:', e);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5분간 캐시
    enabled: !!username,
  });
};
