'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';
import { modal } from '@/shared/ui/modal/modalApi';

type CreateAnalysesPaylod = {
  title: string;
  prUrl: string;
  document: string;
  tags: string[];
  repo_owner: string;
  repo_name: string;
};

export const useSaveAnalyses = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateAnalysesPaylod) => {
      return clientApi('analyses', {
        method: 'POST',
        body: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analyses'] });
      modal.alert('저장 되었습니다.');
    },
    onError: (e) => {
      console.log(e);
      modal.alert('저장에 실패했습니다. 다시 시도해주세요');
    },
  });
};
