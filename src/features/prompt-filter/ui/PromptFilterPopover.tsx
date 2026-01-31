'use client';

import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '@/shared/ui/popover';
import { Checkbox } from '@/shared/ui/Checkbox';
import type { PromptFilterKey } from '../types';

interface FilterPopoverProps {
  label: string;
  options: readonly { key: PromptFilterKey; label: string }[];
  // eslint-disable-next-line no-unused-vars
  isChecked: (key: PromptFilterKey) => boolean;
  // eslint-disable-next-line no-unused-vars
  onToggle: (key: PromptFilterKey) => void;
}

export function FilterPopover({ label, options, isChecked, onToggle }: FilterPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>{label}</PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-2 gap-2 p-4">
          {options.map(({ key, label }) => (
            <Checkbox
              key={key}
              label={label}
              checked={isChecked(key)}
              onChange={() => onToggle(key)}
            />
          ))}
        </div>
        <PopoverClose className="w-full bg-[#1E2939] text-white py-3 rounded-b-lg">
          Done
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
