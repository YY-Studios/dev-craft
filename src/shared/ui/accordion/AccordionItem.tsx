'use client';
import React from 'react';
import { AccordionItemContext } from './AccordionItemcontext';
interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
}

const AccordionItem = ({ value, children }: AccordionItemProps) => {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div data-value={value} className="rounded-lg border border-gray-200">
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

export default AccordionItem;
