import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PromptFilterKey, PromptFilterCategory } from '@/features/prompt-filter/types';
import { FILTERS } from '@/features/prompt-filter/constants/options';
interface PomptFilterStore {
  // 필터 상태: { documentType: ['readme'], purpose: ['overview', 'usage'].filter(item => item !== key) }
  selectedFilters: Partial<Record<PromptFilterCategory, PromptFilterKey[]>>;
  setSelectFilters: (data: Partial<Record<PromptFilterCategory, PromptFilterKey[]>>) => void;
  isChecked: (category: PromptFilterCategory, key: PromptFilterKey) => boolean;
  toggleFilter: (category: PromptFilterCategory, key: PromptFilterKey) => void;
  removeFilter: (category: PromptFilterCategory, key: PromptFilterKey) => void;
  resetFilters: () => void;
  getFlatFilters: () => {
    category: PromptFilterCategory;
    key: PromptFilterKey;
    label: string | undefined;
  }[];
}

export const usePromptFilterStore = create<PomptFilterStore>()(
  devtools((set, get) => ({
    selectedFilters: {
      documentType: ['blog'],
    },
    setSelectFilters: (data) =>
      set((state) => {
        if (JSON.stringify(state.selectedFilters) === JSON.stringify(data)) {
          return state;
        }
        return {
          selectedFilters: data,
        };
      }),
    isChecked: (category, key) => {
      return get().selectedFilters[category]?.includes(key) ?? false;
    },
    toggleFilter: (category, key) =>
      set((state) => {
        const isSingleSelect = category === 'documentType';
        const currentList = state.selectedFilters[category] || [];
        if (isSingleSelect) {
          return {
            selectedFilters: {
              ...state.selectedFilters,
              [category]: [key],
            },
          };
        }

        const isExist = currentList.includes(key);
        return {
          selectedFilters: {
            ...state.selectedFilters,
            [category]: isExist
              ? currentList.filter((item) => item !== key) // 이미 있으면 제거
              : [...currentList, key], // 없으면 추가
          },
        };
      }),
    removeFilter: (category, key) =>
      set((state) => {
        return {
          selectedFilters: {
            ...state.selectedFilters,
            [category]: (state.selectedFilters[category] || []).filter((item) => item !== key),
          },
        };
      }),
    resetFilters: () => set({ selectedFilters: {} }),
    getFlatFilters: () => {
      const filters = get().selectedFilters;

      const allFilters = Object.entries(filters).flatMap(([category, keys]) =>
        keys.map((key) => ({
          category: category as PromptFilterCategory,
          key: key as PromptFilterKey,
          label: FILTERS[category as PromptFilterCategory].options.find((opt) => opt.key === key)
            ?.label,
        })),
      );

      // documentType 따로 분리
      const docTypeFilters = allFilters.filter((f) => f.category === 'documentType');
      const otherFilters = allFilters.filter((f) => f.category !== 'documentType');

      return [...docTypeFilters, ...otherFilters];
    },
  })),
);
