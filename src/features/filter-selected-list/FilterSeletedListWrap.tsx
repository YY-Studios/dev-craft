'use client';

import { FilterContainer } from '../prompt-filter/ui/FilterContainer';
import { FilterSelectedList } from './FilterSelectedList';
import Button from '@/shared/ui/Button';
import { SaveFilterModal } from './SaveFilterModal';
import { Modal } from '@/shared/ui/modal/ModalRoot';
import { useModal } from '@/shared/ui/modal/ModalProvider';
import { useSaveFilters } from './hooks/useSaveFilters';

export const FilterSelectedListWrap = () => {
  const { open, close } = useModal();
  const { data } = useSaveFilters();

  console.log('data', data);
  const handleSaveFilter = () => {
    const id = open({
      component: (
        <Modal.Content>
          <Modal.Body>
            <SaveFilterModal onClose={() => close(id)} />
          </Modal.Body>
        </Modal.Content>
      ),
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">문서 생성 옵션</h2>
        <Button variant="gray" onClick={handleSaveFilter}>
          필터 저장
        </Button>
      </div>
      <FilterContainer />
      <FilterSelectedList />
    </section>
  );
};
