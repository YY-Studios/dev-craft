import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';
import { PromptFilterKey, PromptFilterCategory } from '@/features/prompt-filter/types';

interface PresetsType {
  id: number;
  name: string;
  filters: Partial<Record<PromptFilterCategory, PromptFilterKey[]>>;
}

export const useSaveFilters = () => {
  return useQuery({
    queryKey: ['presets'],
    queryFn: async () => {
      return clientApi<PresetsType[]>('presets');
    },
  });
};
