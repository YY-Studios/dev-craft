'use client';

import { useState } from 'react';

import { Modal } from '@/shared/ui/modal/ModalRoot';
import { useModal } from '@/shared/ui/modal/ModalProvider';
import { modal } from '@/shared/ui/modal/modalApi';

import Button from '@/shared/ui/Button';
import { PullRequsetSelect } from './PullRequestSelect';
import { PullRequestStepWrap } from '@/widgets/pull-request-step/PullRequestStepWrap';
import { PullRequsetSearch } from './PullRequsetSearch';
import { GeminiResponse, useCallN8nWebhook } from '@/features/n8n/hooks/useCallN8nWebhook';
import { usePrStore } from '@/shared/stores/usePrStore';
import { usedocumentStore } from '@/shared/stores/useDocumentStore';
import { usePromptFilterStore } from '@/shared/stores/usePromptFilterStore';
import { useMe } from '@/features/auth/hooks/useMe';

export const PullRequestFetch = () => {
  const { open, close } = useModal();
  const [searchQuery, setSearchQuery] = useState('');
  const { mutate } = useCallN8nWebhook();
  const { selectedPrUrl } = usePrStore();
  const { setDocument, setChartHtml, setPending, setError, isPending } = usedocumentStore();
  const { selectedFilters } = usePromptFilterStore();
  const { data: me } = useMe();

  const handleGenerateFromSelect = () => {
    if (!selectedPrUrl) {
      modal.alert('PR을 선택해주세요.');
      return;
    }
    setPending(true);
    mutate(
      { prUrl: selectedPrUrl, filters: selectedFilters },
      {
        onSuccess: (data: GeminiResponse) => {
          const text = data?.content ?? '';
          const chartHtml = data?.html;
          setDocument(text);
          setChartHtml(chartHtml);
        },
        onError: () => {
          setPending(false);
          setError(true);
        },
      },
    );
  };

  const handleSelectRepository = () => {
    if (!me) {
      modal.alert('로그인이 필요합니다.');
      return;
    }
    const id = open({
      component: (
        <Modal.Content>
          <Modal.Body>
            <PullRequestStepWrap onClose={() => close(id)} />
          </Modal.Body>
        </Modal.Content>
      ),
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold border-l-5 border-primary pl-2">PR 불러오기</h2>
        <Button onClick={() => handleSelectRepository()}>repository 선택</Button>
      </div>
      <PullRequsetSearch onSearch={setSearchQuery} />
      <PullRequsetSelect searchQuery={searchQuery} />
      <Button
        className="w-full mt-10"
        onClick={handleGenerateFromSelect}
        disabled={isPending || !selectedPrUrl}
        variant={selectedPrUrl ? 'primary' : 'secondary'}
      >
        {isPending ? '생성 중...' : '문서 생성하기 (불러오기)'}
      </Button>
    </section>
  );
};
