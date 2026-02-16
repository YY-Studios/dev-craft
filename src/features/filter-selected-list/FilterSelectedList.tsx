'use client';
import { Badge } from './Badge';
import { usePromptFilterStore } from '@/shared/stores/usePromptFilterStore';
import { PromptFilterCategory, PromptFilterKey } from '../prompt-filter/types';
export const FilterSelectedList = () => {
  const { removeFilter, selectedFilters } = usePromptFilterStore();
  const getFlatFilters = usePromptFilterStore((state) => state.getFlatFilters);
  const flatFilters = getFlatFilters();

  console.log('flatFilters', flatFilters);
  console.log('selectedFilters', selectedFilters);
  if (flatFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 bg-gray-100 p-2 rounded-lg">
      {flatFilters.map((item) => (
        <Badge
          key={item.key}
          label={item.label}
          removeFilter={() => removeFilter(item.category, item.key)}
          isSingle={item.category === 'documentType'}
        />
      ))}
    </div>
  );
};
