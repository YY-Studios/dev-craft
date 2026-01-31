import React from 'react';
import { useAccordion } from './AccordionContext';
import { useAccordionItem } from './AccordionItemcontext';
import { cn } from '@/shared/lib/cn';
import IconSquarePlus from '@/shared/assets/icons/icon_square_plus.svg';
import IconSquareMinus from '@/shared/assets/icons/icon_square_minus.svg';
interface AccordionTriggerProps {
  children: React.ReactNode;
}

const AccordionTrigger = ({ children }: AccordionTriggerProps) => {
  const { openItem, setOpenItem, accordion } = useAccordion();
  const { value } = useAccordionItem();
  const isOpen = accordion ? openItem === value : true;

  const handleClick = () => {
    if (!accordion) return;
    setOpenItem(isOpen ? '' : value);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'flex items-center justify-between w-full p-6 border-gray-200',
        isOpen && 'border-b',
      )}
      aria-expanded={isOpen}
    >
      <span>{children}</span>
      {accordion && (
        <span className={cn('transition-transform duration-200', isOpen && 'rotate-180')}>
          {isOpen ? <IconSquareMinus /> : <IconSquarePlus />}
        </span>
      )}
    </button>
  );
};

export default AccordionTrigger;
