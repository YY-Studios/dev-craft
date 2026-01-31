import { createContext, useContext } from 'react';

interface AccordionItemContextValue {
  value: string;
}
export const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionItem 컴포넌트 내부에서만 사용 가능합니다.');
  }
  return context;
};
