'use client';

import { FilterContainer } from '../prompt-filter/ui/FilterContainer';
import { FilterSelectedList } from './FilterSelectedList';
import Button from '@/shared/ui/Button';
import { SaveFilterModal } from './SaveFilterModal';
import { Modal } from '@/shared/ui/modal/ModalRoot';
import { useModal } from '@/shared/ui/modal/ModalProvider';
import { useSaveFilters } from './hooks/useSaveFilters';
import { usePromptFilterStore } from '@/shared/stores/usePromptFilterStore';

export const FilterSelectedListWrap = () => {
  const { open, close } = useModal();
  const { data } = useSaveFilters();
  const { resetFilters, selectedFilters } = usePromptFilterStore();

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
        <h2 className="text-xl font-bold border-l-5 border-primary pl-2">문서 생성 옵션</h2>
        <div className="flex items-center gap-4">
          {Object.keys(selectedFilters).length !== 0 && (
            <button
              type="button"
              className=" font-bold border-b-1 cursor-pointer text-sm text-gray-700"
              onClick={resetFilters}
            >
              선택 삭제
            </button>
          )}
          <Button variant="gray" onClick={handleSaveFilter}>
            필터 저장
          </Button>
        </div>
      </div>
      <FilterContainer />

      <FilterSelectedList />
    </section>
  );
};
