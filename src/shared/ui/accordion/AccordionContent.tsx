import React from 'react';
import { useAccordion } from './AccordionContext';
import { useAccordionItem } from './AccordionItemcontext';
import { cn } from '@/shared/lib/cn';
interface AccordionContentProps {
  children: React.ReactNode;
}

const AccordionContent = ({ children }: AccordionContentProps) => {
  const { openItem, accordion } = useAccordion();
  const { value } = useAccordionItem();
  const isOpen = accordion ? openItem === value : true;
  return (
    <div className={cn('grid', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
      <div className="overflow-hidden">{children}</div>
    </div>
  );
};
export default AccordionContent;
