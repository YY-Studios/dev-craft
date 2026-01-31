import React from 'react';
import { usePopover } from './PopoverContext';
import { tv } from 'tailwind-variants';
import IconChevronDown from '@/shared/assets/icons/Icon_chevron_down.svg';
import IconChevronUp from '@/shared/assets/icons/Icon_chevron_up.svg';

const triggerVariants = tv({
  base: 'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors cursor-pointer',
  variants: {
    isOpen: {
      true: 'bg-[#1E2939] border-[#1E2939] text-white',
      false: 'bg-white border-[#D1D5DC] text-[#1E2939]',
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});

interface PopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function PopoverTrigger({ children, className }: PopoverTriggerProps) {
  const { isOpen, setIsOpen } = usePopover();

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      className={triggerVariants({ isOpen, className })}
    >
      {children}
      {isOpen ? <IconChevronUp className="w-4 h-4" /> : <IconChevronDown className="w-4 h-4" />}
    </button>
  );
}
