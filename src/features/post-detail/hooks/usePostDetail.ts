import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';
import { postResponse } from '../model/type';

export const usePostDetail = ({ id }: { id: string }) => {
  return useQuery<postResponse>({
    queryKey: ['post-detail', id],
    queryFn: async (): Promise<postResponse> => {
      try {
        return await clientApi<postResponse>(`post-detail/${id}`);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false, // 탭 이동 시 캐시 사용
    enabled: !!id, // id 없으면 요청 안함
  });
};
