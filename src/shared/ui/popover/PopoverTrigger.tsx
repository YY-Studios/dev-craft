import { usePopover } from './PopoverContext';
import { tv } from 'tailwind-variants';
import Image from 'next/image';
import chevronDown from '@/shared/assets/icons/Icon_chevron_down.svg';
import chevronUp from '@/shared/assets/icons/Icon_chevron_up.svg';

const triggerVariants = tv({
  base: 'flex items-center justify-between gap-2 px-4 py-2 rounded-lg border transition-all cursor-pointer w-full',
  variants: {
    isOpen: {
      true: 'bg-white border-gray-400 text-gray-600 shadow-sm',
      false: 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-400',
    },
    isActive: {
      true: 'border-slate-700 border-1 bg-slate-50 text-slate-900 shadow-sm',
    },
  },
  defaultVariants: {
    isOpen: false,
    isActive: false,
  },
});

interface PopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

export function PopoverTrigger({ children, className, isActive }: PopoverTriggerProps) {
  const { isOpen, setIsOpen } = usePopover();

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      className={triggerVariants({ isOpen, className, isActive })}
    >
      {children}
      <Image src={isOpen ? chevronUp : chevronDown} className="w-4 h-4" alt="" aria-hidden />
    </button>
  );
}
