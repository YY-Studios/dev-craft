'use client';

import { PullRequestFetch } from '@/features/github/ui/PullRequestFetch';
import { useRepoStore } from '@/shared/stores/useRepoStore';
import { useEffect, useState } from 'react';
import Button from '@/shared/ui/Button';
import { PullRequestLink } from './PullRequestLink';

export const PullRequestWrap = () => {
  const { selectOrg, selectRepo } = useRepoStore();
  const hasRepoSelectd = !!selectOrg && !!selectRepo;
  const [isMounted] = useState(false);
  const [mode, setMode] = useState<'link' | 'select'>('link');

  useEffect(() => {
    if (isMounted && hasRepoSelectd) {
      setMode('select');
    }
  }, [isMounted, selectOrg, selectRepo]);

  return (
    <>
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
      {mode === 'link' && <PullRequestLink />}
      {/* PR 불러오기 */}
      {mode === 'select' && <PullRequestFetch />}
    </>
  );
};
