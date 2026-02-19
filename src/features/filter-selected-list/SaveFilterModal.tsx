'use client';

import { useState } from 'react';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/input/Input';
import { Modal } from '@/shared/ui/modal/ModalRoot';
import { FilterSelectedList } from './FilterSelectedList';
import { modal } from '@/shared/ui/modal/modalApi';
import { usePromptFilterStore } from '@/shared/stores/usePromptFilterStore';
import { PromptFilterCategory, PromptFilterKey } from '../prompt-filter/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';
import { useMe } from '../auth/hooks/useMe';

export type SaveFilterModalProps = {
  onClose: () => void;
};

type CreatePresetPayload = {
  name: string;
  filters: Partial<Record<PromptFilterCategory, PromptFilterKey[]>>;
};

export const SaveFilterModal = ({ onClose }: SaveFilterModalProps) => {
  const [filterName, setFilterName] = useState('');
  const queryClient = useQueryClient();
  const { selectedFilters } = usePromptFilterStore();
  const { data: user } = useMe();

  const savePresetMutation = useMutation({
    mutationFn: async (payload: CreatePresetPayload) => {
      return clientApi('/saved-filters', {
        method: 'POST',
        body: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presets'] });
      onClose();
    },
  });

  const handleSave = () => {
    if (!user) {
      modal.alert('GitHub 로그인 후 이용 가능합니다.');
      return;
    }

    const name = filterName.trim();
    if (!name) {
      modal.alert('이름을 입력해주세요.');
      return;
    }

    savePresetMutation.mutate({
      name,
      filters: selectedFilters,
    });
    onClose();
  };

  return (
    <>
      <Modal.Header>필터 저장</Modal.Header>
      <p>
        현재 선택한 필터를 프리셋으로 저장합니다.
        <br />
        나중에 프리셋에서 바로 불러올 수 있어요.
      </p>
      <Modal.Body>
        <Input
          placeholder="프리셋 이름을 입력하세요"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="mt-4 mb-4"
        />
        <FilterSelectedList />
      </Modal.Body>
      <Modal.Footer>
        <div className="flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            취소
          </Button>
          <Button className="flex-1" onClick={handleSave}>
            저장
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};
