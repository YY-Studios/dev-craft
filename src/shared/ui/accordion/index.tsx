import Accordion from './Accordion';
import AccordionTrigger from './AccordionTrigger';
import AccordionContent from './AccordionContent';
import AccordionItem from './AccordionItem';

export default Object.assign(Accordion, {
  Trigger: AccordionTrigger,
  Content: AccordionContent,
  Item: AccordionItem,
});

export { AccordionTrigger, AccordionContent, AccordionItem };
