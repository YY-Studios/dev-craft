'use client';

import { PullRequestFetch } from '@/features/github/ui/PullRequestFetch';
import { useRepoStore } from '@/shared/stores/useRepoStore';
import { useEffect, useState } from 'react';
import Button from '@/shared/ui/Button';
import { PullRequestLink } from './PullRequestLink';
import { useMe } from '@/features/auth/hooks/useMe';
import { modal } from '@/shared/ui/modal/modalApi';
export const PullRequestWrap = () => {
  const { selectOrg, selectRepo } = useRepoStore();
  const hasRepoSelectd = !!selectOrg && !!selectRepo;
  const [isMounted] = useState(false);
  const [mode, setMode] = useState<'link' | 'select'>('link');
  const { data: me } = useMe();
  console.log('me', me);
  useEffect(() => {
    if (isMounted && hasRepoSelectd) {
      setMode('select');
    }
  }, [isMounted, selectOrg, selectRepo]);

  const handleSetMode = (mode: 'link' | 'select') => {
    if (!me) {
      modal.alert('로그인이 필요합니다.');
      return;
    }
    if (me.id === '11111111-1111-1111-1111-111111111111') {
      modal.alert('게스트는 PR을 불러 올 수 없습니다. 깃허브 로그인을 해주세요.');
      return;
    }

    setMode(mode);
  };

  return (
    <>
      {/* 토글 */}
      <div className="flex gap-2">
        <Button variant="tab" isActive={mode === 'link'} onClick={() => handleSetMode('link')}>
          PR 링크 입력
        </Button>
        <Button variant="tab" isActive={mode === 'select'} onClick={() => handleSetMode('select')}>
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
