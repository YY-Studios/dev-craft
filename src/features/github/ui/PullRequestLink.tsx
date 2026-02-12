'use client';

import { useState } from 'react';
import Button from '@/shared/ui/Button';
import { useCallN8nWebhook } from '@/features/n8n/hooks/useCallN8nWebhook';
import { usedocumentStore } from '@/shared/stores/useDocumentStore';
import { modal } from '@/shared/ui/modal/modalApi';

export const PullRequestLink = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const { mutate } = useCallN8nWebhook();
  const { setDocument, setPending, setError, isPending } = usedocumentStore();

  const HandleGenerateFormLink = () => {
    if (!inputValue) {
      modal.alert('pr 주소를 입력해주세요.');
    }
    setPending(true);
    mutate(inputValue, {
      onSuccess: (data) => {
        setDocument(data?.content.parts[0].text);
      },
      onError: () => {
        setError(true);
      },
    });
  };

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">PR 링크 입력</h2>
      <input
        type="text"
        placeholder="GitHub PR 링크를 붙여넣으세요"
        className="w-full rounded-md border px-3 py-2 text-sm"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p className="text-xs text-gray-500">PR 링크를 붙여넣으면 레포 기준으로 PR을 불러옵니다</p>

      <Button
        className="w-full mt-5"
        onClick={() => HandleGenerateFormLink()}
        disabled={isPending || !inputValue}
      >
        {isPending ? '생성 중...' : '문서 생성하기'}
      </Button>
    </section>
  );
};
