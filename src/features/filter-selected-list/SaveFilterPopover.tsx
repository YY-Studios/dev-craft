import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '@/shared/ui/popover';
import { useSaveFilters } from './hooks/useSaveFilters';

import Button from '@/shared/ui/Button';
import { usePromptFilterStore } from '@/shared/stores/usePromptFilterStore';
export const SaveFilterPopover = () => {
  const { data } = useSaveFilters();
  const setSelectFilters = usePromptFilterStore((s) => s.setSelectFilters);
  if (!data) return null;
  return (
    <div>
      <Popover>
        <PopoverTrigger>⭐ 저장된 필터</PopoverTrigger>
        <PopoverContent align="start">
          <ul>
            {data.map((filter) => (
              <li key={filter.id}>
                <Button onClick={() => setSelectFilters(filter.filters)}>{filter.name}</Button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};
