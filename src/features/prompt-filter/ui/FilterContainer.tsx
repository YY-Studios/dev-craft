'use client';

import { FILTERS } from '../constants/options';
import type { PromptFilterCategory } from '../types';
import { FilterPopover } from './PromptFilterPopover';
import { usePromptFilterStore } from '@/shared/stores/usePromptFilterStore';
import { SaveFilterPopover } from './../../filter-selected-list/SaveFilterPopover';
export function FilterContainer() {
  const { toggleFilter, isChecked } = usePromptFilterStore();

  // 필터 카테고리 배열 추출
  const categories = Object.keys(FILTERS) as PromptFilterCategory[];
  const totalCount = categories.length;

  return (
    <div className="flex flex-col gap-2">
      <SaveFilterPopover />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:flex">
        {categories.map((category, index) => {
          const align = index >= totalCount / 2 ? 'end' : 'start';
          const isSingleSelect = category === 'documentType';

          return (
            <FilterPopover
              key={category}
              label={FILTERS[category].label}
              options={FILTERS[category].options}
              isChecked={(key) => isChecked(category, key)}
              onToggle={(key) => toggleFilter(category, key)}
              align={align} // 계산된 align 전달
              isSingleSelect={isSingleSelect}
            />
          );
        })}
      </div>
    </div>
  );
}
