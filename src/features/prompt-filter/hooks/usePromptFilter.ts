// hooks/usePromptFilter.ts
'use client';

import { useState } from 'react';
import type { PromptFilterCategory, PromptFilterKey, PromptFilterState } from '../types';
import { FILTERS } from '../constants/test';

export function usePromptFilter() {
  const [filters, setFilters] = useState<PromptFilterState>(() => {
    const initial = {} as PromptFilterState;
    for (const category of Object.keys(FILTERS) as PromptFilterCategory[]) {
      initial[category] = new Set();
    }
    return initial;
  });

  const toggleFilter = (category: PromptFilterCategory, key: PromptFilterKey) => {
    setFilters((prev) => {
      const newSet = new Set(prev[category]);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return { ...prev, [category]: newSet };
    });
  };

  const isChecked = (category: PromptFilterCategory, key: PromptFilterKey) => {
    return filters[category].has(key);
  };

  return { filters, toggleFilter, isChecked };
}
