'use client';

import { useState } from 'react';
import Button from '@/shared/ui/Button';
import { GeminiResponse, useCallN8nWebhook } from '@/features/n8n/hooks/useCallN8nWebhook';
import { usedocumentStore } from '@/shared/stores/useDocumentStore';
import { modal } from '@/shared/ui/modal/modalApi';
import Input from '@/shared/ui/input/Input';
import { usePromptFilterStore } from '@/shared/stores/usePromptFilterStore';

export const PullRequestLink = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const { mutate } = useCallN8nWebhook();
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

  const HandleGenerateFormLink = (targetUrl?: string) => {
    const urlToUse = targetUrl || inputValue;
    if (!urlToUse) {
      modal.alert('pr 주소를 입력해주세요.');
      return;
    }
    setPending(true);
    mutate(
      {
        prUrl: urlToUse,
        filters: selectedFilters,
      },
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
        onError: (e) => {
          setPending(false);
          setError(true);
          modal.alert(e.message);
        },
      },
    );
  };

  // 체험 로직
  const handleTry = () => {
    const sampleUrl = 'https://github.com/YY-Studios/dev-craft/pull/242';
    setInputValue(sampleUrl);
    HandleGenerateFormLink(sampleUrl);
  };
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold border-l-5 border-primary pl-2">PR 링크 입력</h2>
        <Button variant="secondary" onClick={handleTry}>
          샘플 PR 주소로 체험해보기
        </Button>
      </div>
      <Input
        type="text"
        placeholder="GitHub PR 링크를 붙여넣으세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p className="text-xs text-gray-500">PR 링크를 붙여넣으면 레포 기준으로 PR을 불러옵니다</p>

      <Button
        className="w-full mt-5"
        onClick={() => HandleGenerateFormLink()}
        disabled={isPending || !inputValue}
        variant={inputValue ? 'primary' : 'secondary'}
      >
        {isPending ? '생성 중...' : '문서 생성하기'}
      </Button>
    </section>
  );
};
