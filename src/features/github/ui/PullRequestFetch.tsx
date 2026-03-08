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

export const PullRequestFetch = () => {
  const { open, close } = useModal();
  const [searchQuery, setSearchQuery] = useState('');
  const { mutate } = useCallN8nWebhook();
  const { selectedPrUrl } = usePrStore();
  const {
    setDocument,
    setChartHtml,
    setPending,
    setError,
    setTitle,
    setPrUrl,
    setRepoOwner,
    setRepoName,
    setTags,
    isPending,
  } = usedocumentStore();
  const { selectedFilters } = usePromptFilterStore();

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
          const text = (data?.content ?? '').replace(/\\n/g, '\n');
          const chartHtml = data?.html;
          const title = data?.title;
          const prUrl = data?.pr_url;
          const tags = data?.tags;
          const repoOwner = data?.repo_owner;
          const repoName = data?.repo_name;
          setDocument(text);
          setTitle(title);
          setPrUrl(prUrl);
          setTags(tags);
          setChartHtml(chartHtml);
          setRepoOwner(repoOwner);
          setRepoName(repoName);
        },
        onError: () => {
          setPending(false);
          setError(true);
        },
      },
    );
  };

  const handleSelectRepository = () => {
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
