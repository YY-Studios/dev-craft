'use client';
import { Badge } from './Badge';
import { usePromptFilterStore } from '@/shared/stores/usePromptFilterStore';
import { FILTERS } from '../prompt-filter/constants/options';
import { PromptFilterCategory, PromptFilterKey } from '../prompt-filter/types';
export const FilterSelectedList = () => {
  const { selectedFilters, removeFilter } = usePromptFilterStore();
  const flatFilter = Object.entries(selectedFilters).flatMap(([category, keys]) =>
    keys.map((key) => ({
      category: category as PromptFilterCategory,
      key: key as PromptFilterKey,
      label: FILTERS[category as PromptFilterCategory].options.find((opt) => opt.key === key)
        ?.label,
    })),
  );
  console.log('selectedFilters', selectedFilters);
  console.log('flatFilter', flatFilter);

  if (flatFilter.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 bg-gray-100 p-2 rounded-lg">
      {flatFilter.map((item) => (
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
