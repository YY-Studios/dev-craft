'use client';

import { useState } from 'react';
import { TEST } from '../constants/test';
import type { FabricFilterKey, FabricFilterState } from '../types';

const initialState: FabricFilterState = TEST.reduce(
  (acc: FabricFilterState, cur: { key: FabricFilterKey }) => {
    acc[cur.key] = false;
    return acc;
  },
  {} as FabricFilterState,
);

export function useFabricFilter() {
  const [filters, setFilters] = useState<FabricFilterState>(initialState);

  const setFilter = (key: FabricFilterKey, value: boolean) => {
    setFilters((prev: FabricFilterState) => ({
      ...prev,
      [key]: value,
    }));
  };

  return { filters, setFilter };
}
