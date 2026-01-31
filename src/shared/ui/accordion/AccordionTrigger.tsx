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
        accordion ? 'cursor-pointer' : 'cursor-default',
      )}
      aria-expanded={isOpen}
    >
      <span>{children}</span>
      {accordion && (
        <span>
          <img
            src={(isOpen ? IconSquareMinus : IconSquarePlus).src}
            className="w-6 h-6"
            alt=""
            aria-hidden
          />
        </span>
      )}
    </button>
  );
};

export default AccordionTrigger;
