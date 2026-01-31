'use client';

import { createContext, useContext } from 'react';

export interface PopoverContextValue {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (value: boolean) => void;
}

export const PopoverContext = createContext<PopoverContextValue | null>(null);

export const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) throw new Error('Popover 컴포넌트 안에서 사용해주세요');
  return context;
};
