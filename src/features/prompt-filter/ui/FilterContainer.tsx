'use client';

import { FILTERS } from '../constants/test';
import { usePromptFilter } from '../hooks/usePromptFilter';
import type { PromptFilterCategory } from '../types';
import { FilterPopover } from './PromptFilterPopover';

export function FilterContainer() {
  const { toggleFilter, isChecked } = usePromptFilter();

  return (
    <div className="flex gap-2">
      {(Object.keys(FILTERS) as PromptFilterCategory[]).map((category) => (
        <FilterPopover
          key={category}
          label={FILTERS[category].label}
          options={FILTERS[category].options}
          isChecked={(key) => isChecked(category, key)}
          onToggle={(key) => toggleFilter(category, key)}
        />
      ))}
    </div>
  );
}
