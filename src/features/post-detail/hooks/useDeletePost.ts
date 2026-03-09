import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => clientApi(`post-detail/${id}`, { method: 'DELETE' }),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ['post-detail', id] });
    },
  });
};
