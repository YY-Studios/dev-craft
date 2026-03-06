import { useMutation } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';
import { PromptFilterCategory, PromptFilterKey } from '@/features/prompt-filter/types';
import { useMe } from '@/features/auth/hooks/useMe';

export interface GeminiResponse {
  html: string;
  title: string;
  tags: string[];
  pr_url: string;
  content: string;
}

export const useCallN8nWebhook = () => {
  const { data: user } = useMe();

  return useMutation({
    mutationFn: async ({
      prUrl,
      filters,
    }: {
      prUrl: string;
      filters: Partial<Record<PromptFilterCategory, PromptFilterKey[]>>;
    }) => {
      //파싱
      const regex = /github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/;
      const match = prUrl.match(regex);

      if (!match) {
        throw new Error('pr 주소를 확인해주세요.');
      }

      const owner = match[1];
      const repo = match[2];
      const number = parseInt(match[3], 10);

      return await clientApi<GeminiResponse>('n8n/webhook', {
        method: 'POST',
        body: { owner, repo, number, filters, githubUserId: user?.github_user_id },
      });
    },
  });
};
