'use client';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '@/shared/ui/popover';
import { useSaveFilters } from './hooks/useSaveFilters';
import { PromptFilterKey, PromptFilterCategory } from '@/features/prompt-filter/types';
import { TrashIcon } from '@/shared/assets/icons/TrashIcon';
import { usePromptFilterStore } from '@/shared/stores/usePromptFilterStore';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';
import { useMe } from '../auth/hooks/useMe';
export const SaveFilterPopover = () => {
  const { data: user } = useMe();
  const { data } = useSaveFilters();
  const setSelectedFilters = usePromptFilterStore((s) => s.setSelectedFilters);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const handleSelectFilter = (filter: Partial<Record<PromptFilterCategory, PromptFilterKey[]>>) => {
    setSelectedFilters(filter);
    setOpen(false);
  };

  const deletePresetMutation = useMutation({
    mutationFn: async (id: number) => {
      return clientApi(`/delete-filters/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presets'] });
    },
  });
  const handleDelete = (id: number) => {
    deletePresetMutation.mutate(id);
  };

  if (!user) return null;
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>⭐ 저장된 필터</PopoverTrigger>
        {/* 팝오버 너비 및 패딩 설정 */}
        <PopoverContent align="start" className="w-72 p-2">
          <ul className=" max-h-[300px] overflow-y-auto">
            {data === undefined ? (
              <li className="p-4 text-center text-sm text-slate-500">저장된 필터가 없습니다.</li>
            ) : (
              data?.map((filter) => (
                <li
                  key={filter.id}
                  className="group flex items-center justify-between hover:bg-slate-100 transition-colors border-b-1 border-gray-200 last:border-b-0"
                >
                  {/* 필터 선택 버튼 */}
                  <button
                    onClick={() => handleSelectFilter(filter.filters)}
                    className="flex-1 text-left px-3 py-2 text-md text-slate-700 truncate outline-none rounded-md focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                    title={filter.name}
                  >
                    {filter.name}
                  </button>

                  {/* 삭제 버튼 (평소엔 숨김, 호버/포커스 시 표시) */}
                  <button
                    onClick={() => handleDelete(filter.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md outline-none cursor-pointer"
                    aria-label={`${filter.name} 삭제`}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </li>
              ))
            )}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};
