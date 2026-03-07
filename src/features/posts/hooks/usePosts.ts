import { useQuery } from '@tanstack/react-query';
import { ProjectWithAnalyses } from '@/features/posts/model/posts';
import { clientApi } from '@/shared/api/client/clientApi';

export const usePosts = () => {
  return useQuery<ProjectWithAnalyses[] | null>({
    queryKey: ['posts'],
    queryFn: async (): Promise<ProjectWithAnalyses[] | null> => {
      try {
        return await clientApi<ProjectWithAnalyses[]>('posts');
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5분간 캐시
  });
};
