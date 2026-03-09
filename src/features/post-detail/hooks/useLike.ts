import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';

type LikeResponse = { count: number; isLiked: boolean };

export const useLike = (id: string) => {
  const queryClient = useQueryClient();

  const { data } = useQuery<LikeResponse>({
    queryKey: ['like', id],
    queryFn: () => clientApi(`post-like/${id}`),
  });

  const { mutate: toggleLike } = useMutation({
    mutationFn: () =>
      clientApi(`post-like/${id}`, {
        method: data?.isLiked ? 'DELETE' : 'POST',
      }),
    onMutate: async () => {
      // 낙관적 업데이트
      await queryClient.cancelQueries({ queryKey: ['like', id] });
      const prev = queryClient.getQueryData<LikeResponse>(['like', id]);
      queryClient.setQueryData(['like', id], {
        count: prev!.count + (prev!.isLiked ? -1 : 1),
        isLiked: !prev!.isLiked,
      });
      return { prev };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['like', id], context?.prev);
    },
  });

  return { count: data?.count ?? 0, isLiked: data?.isLiked ?? false, toggleLike };
};
