'use client';

import { useState } from 'react';
import { FabricFilterState, FabricFilterKey } from '../types';
import { TEST } from '../contants/test';

const initialState = TEST.reduce(
  (acc, cur) => ({ ...acc, [cur.key]: false }),
  {} as FabricFilterState,
);

export function useFabricFilter() {
  const [filters, setFilters] = useState<FabricFilterState>(initialState);

  const setFilter = (key: FabricFilterKey, value: boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return { filters, setFilter };
}
