'use client';

import { useEffect, useState } from 'react';
import { FilterContainer } from './../../features/prompt-filter/ui/FilterContainer';
import Accordion from '@/shared/ui/accordion';
import { PullRequestwarp } from '@/features/github/ui/PullRequestwarp';
import { useRepoStore } from '@/shared/stores/useRepoStore';
import { Button } from './../../shared/ui/Button';
import { useCallN8nWebbhook } from '@/features/n8n/hooks/useCallN8nWebhook';
import { LoadingAnimation } from '@/shared/ui/loding/LoadingAnimation';

export default function DevPage() {
  const { selectOrg, selectRepo } = useRepoStore();
  const hasRepoSelectd = !!selectOrg && !!selectRepo;
  const [mode, setMode] = useState<'link' | 'select'>('link');
  const [isMounted, setIsMounted] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const {
    data: copyData,
    mutate: copyMutate,
    isError: copyIsError,
    isPending: copyIsPending,
  } = useCallN8nWebbhook();

  const renderContent = () => {
    if (copyIsPending) return <p>로딩 중...</p>;
    if (copyIsError) return <p>에러 발생!</p>;
    if (copyData) return <p>{copyData.content.parts[0].text}</p>;
    return <p>분석을 시작해 주세요.</p>;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && hasRepoSelectd) {
      setMode('select');
    }
  }, [isMounted, selectOrg, selectRepo]);

  if (!isMounted) return null;
  console.log(copyData);
  return (
    <div className=" space-y-10">
      {/* 토글 */}
      <h2>로딩 애니메이션</h2>
      <LoadingAnimation />
      {/* 토글 */}
      <div className="flex gap-2">
        <Button variant="tab" isActive={mode === 'link'} onClick={() => setMode('link')}>
          PR 링크 입력
        </Button>
        <Button variant="tab" isActive={mode === 'select'} onClick={() => setMode('select')}>
          PR 불러오기
        </Button>
      </div>
      {/* PR 링크 복사 붙여넣기 */}
      {mode === 'link' && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">PR 링크 입력</h2>
          <input
            type="text"
            placeholder="GitHub PR 링크를 붙여넣으세요"
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            PR 링크를 붙여넣으면 레포 기준으로 PR을 불러옵니다
          </p>

          <Button className="w-full mt-5" onClick={() => copyMutate(inputValue)}>
            문서 생성하기 (복붙용)
          </Button>
        </section>
      )}
      {/* PR 불러오기 */}
      {mode === 'select' && (
        <section>
          <PullRequestwarp />
          <Button className="w-full mt-10">문서 생성하기 (불러오기)</Button>
        </section>
      )}
      {/* 문서 생성 옵션 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">문서 생성 옵션</h2>
        <FilterContainer />
      </section>
      {/* 문서 생성하기 */}

      {/* PR 변경 영향도 */}
      <Accordion>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>PR 변경 영향도</Accordion.Trigger>
          <Accordion.Content>
            <p className="p-4">아코디언 컨텐츠</p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      {/* 생성된 문서 */}
      <Accordion accordion={false}>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>생성된 문서</Accordion.Trigger>
          <Accordion.Content>
            <p className="p-4">
              {copyIsPending ? (
                '문서를 불러오는 중입니다...'
              ) : copyIsError ? (
                <span className="text-red-500">에러가 발생했습니다. 다시 시도해 주세요.</span>
              ) : (
                copyData?.content.parts[0].text
              )}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
