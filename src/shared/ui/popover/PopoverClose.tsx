import type { ReactNode } from 'react';
import Button from '../Button';
import { usePopover } from './PopoverContext';

interface PopoverCloseProps {
  children: ReactNode;
  className?: string;
}

export function PopoverClose({ children, className }: PopoverCloseProps) {
  const { setIsOpen } = usePopover();

  return (
    <Button type="button" onClick={() => setIsOpen(false)} className={className}>
      {children}
    </Button>
  );
}
