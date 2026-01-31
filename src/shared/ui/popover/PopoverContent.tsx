import React from 'react';
import { cn } from '@/shared/lib/cn';
import { usePopover } from './PopoverContext';

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
}

export function PopoverContent({ children, className, align = 'start' }: PopoverContentProps) {
  const { isOpen } = usePopover();

  if (!isOpen) return null;

  const alignClass = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  return (
    <div
      className={cn(
        'absolute top-full mt-2 z-50',
        'bg-white rounded-2xl shadow-xl',
        'p-5 min-w-[280px]',
        alignClass[align],
        className,
      )}
    >
      {children}
    </div>
  );
}
