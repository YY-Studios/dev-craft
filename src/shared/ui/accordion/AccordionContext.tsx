'use client';
import React from 'react';
import { createContext, useContext } from 'react';

interface AccordionContextValue {
  openItem: string | null;
  setOpenItem: React.Dispatch<React.SetStateAction<string | null>>;
  accordion: boolean;
}
export const AccordionContext = createContext<AccordionContextValue | null>(null);

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion 컴포넌트 내부에서만 사용 가능합니다.');
  }
  return context;
};
