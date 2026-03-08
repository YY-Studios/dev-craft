import { useQuery } from '@tanstack/react-query';
import { ProjectWithAnalyses } from '@/features/posts/model/posts';
import { clientApi } from '@/shared/api/client/clientApi';

export const usePosts = ({ username }: { username: string }) => {
  return useQuery<ProjectWithAnalyses[] | null>({
    queryKey: ['posts', username],

    queryFn: async (): Promise<ProjectWithAnalyses[] | null> => {
      try {
        return await clientApi<ProjectWithAnalyses[]>(`posts?username=${username}`);
      } catch (e) {
        console.error('포스트 로딩 실패:', e);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5분간 캐시
    enabled: !!username,
  });
};
