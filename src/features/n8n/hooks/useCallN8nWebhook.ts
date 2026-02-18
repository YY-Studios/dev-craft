import { useMutation } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';
import { PromptFilterCategory, PromptFilterKey } from '@/features/prompt-filter/types';

export interface GeminiResponse {
  content: {
    parts: Array<{
      text: string;
    }>;
    role: string;
  };
  finishReason: string;
  index: number;
}

export const useCallN8nWebhook = () => {
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
        throw new Error('Invalid GitHub PR URL');
      }

      const owner = match[1];
      const repo = match[2];
      const number = parseInt(match[3], 10);

      return await clientApi<GeminiResponse>('n8n/webhook', {
        method: 'POST',
        body: { owner, repo, number, filters },
      });
    },
  });
};
