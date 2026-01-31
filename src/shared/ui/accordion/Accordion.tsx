'use client';
import React from 'react';
import { AccordionContext } from './AccordionContext';
import { useState } from 'react';

interface AccordionProps {
  children: React.ReactNode;
  accordion?: boolean;
  defaultOpenItem?: string | null;
}
const Accordion = ({ children, accordion = true, defaultOpenItem = null }: AccordionProps) => {
  const [openItem, setOpenItem] = useState<string | null>(defaultOpenItem);
  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem, accordion }}>
      {children}
    </AccordionContext.Provider>
  );
};

export default Accordion;
