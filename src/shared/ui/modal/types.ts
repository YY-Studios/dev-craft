import { ModalItem } from './ModalProvider';

export type ModalContextType = {
  modals: ModalItem[];
  // eslint-disable-next-line no-unused-vars
  open: (modal: Omit<ModalItem, 'id'>) => string;
  // eslint-disable-next-line no-unused-vars
  close: (id: string) => void;
  closeAll: () => void;
};
