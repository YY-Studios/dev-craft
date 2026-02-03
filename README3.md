좋은 질문이에요! 검색은 **부모(PullRequestwarp)에서 state 관리**하고 자식에게 전달하는 게 가장 간단해요.

**1. PullRequestwarp 수정 (검색 state 추가):**

```typescriptreact
import { useState } from 'react';
import Button from '@/shared/ui/Button';
import { PullRequsetSelect } from './PullRequestSelect';
import { Modal } from '@/shared/ui/modal/ModalRoot';
import { PullRequestStepWrap } from '@/widgets/pull-request-step/PullRequestStepWrap';
import { useModal } from '@/shared/ui/modal/ModalProvider';

export const PullRequestwarp = () => {
  const { open, close } = useModal();
  const [searchQuery, setSearchQuery] = useState(''); // 🔹 검색어 state

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">PR 불러오기</h2>
        <Button
          onClick={() => {
            const id = open({
              component: (
                <Modal.Content>
                  <Modal.Body>
                    <PullRequestStepWrap onClose={() => close(id)} />
                  </Modal.Body>
                </Modal.Content>
              ),
            });
          }}
        >
          repository 선택
        </Button>
      </div>

      {/* 🔹 검색 input */}
      <input
        type="text"
        placeholder="PR 제목 또는 번호 검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-md border px-3 py-2 text-sm"
      />

      {/* 🔹 검색어 전달 */}
      <PullRequsetSelect searchQuery={searchQuery} />
    </section>
  );
};
```

**2. PullRequestSelect 수정 (검색 필터링):**

```typescriptreact
'use client';

import { useState } from 'react';
import { useRepoStore } from '@/shared/stores/useRepoStore';
import { usePullRequests } from '../hooks/usePullRequests';
import Pagination from '@/shared/ui/Pagination';

interface PullRequestSelectProps {
  searchQuery: string; // 🔹 추가
}

export const PullRequsetSelect = ({ searchQuery }: PullRequestSelectProps) => {
  const { selectOrg, selectRepo } = useRepoStore();
  const [page, setPage] = useState(1);

  const { data: pulls, isLoading } = usePullRequests({
    selectOrg,
    selectRepo,
    page
  });

  if (!selectOrg || !selectRepo) {
    return <p>레포지토리를 먼저 선택해주세요</p>;
  }

  if (isLoading) return <p>로딩 중...</p>;

  // 🔹 검색 필터링 (클라이언트 사이드)
  const filteredPRs = pulls?.data.filter((pr) => {
    if (!searchQuery) return true; // 검색어 없으면 전체 표시

    const query = searchQuery.toLowerCase();
    const titleMatch = pr.title.toLowerCase().includes(query);
    const numberMatch = pr.number.toString().includes(query);

    return titleMatch || numberMatch;
  });

  return (
    <div>
      <ul className="space-y-3">
        {filteredPRs && filteredPRs.length > 0 ? (
          filteredPRs.map((pr) => (
            <li key={pr.id} className="flex items-start gap-3 rounded-lg border p-4">
              <label className="block w-full" htmlFor={`pr-${pr.number}`}>
                <input type="radio" name="pr" id={`pr-${pr.number}`} />
                <div>
                  <h3 className="font-medium">
                    PR #{pr.number}: {pr.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectOrg.login}/{selectRepo} · {pr.state}
                  </p>
                </div>
              </label>
            </li>
          ))
        ) : (
          // 🔹 검색 결과 없을 때
          <p className="text-center text-gray-500 py-8">
            검색 결과가 없습니다
          </p>
        )}
      </ul>

      <div className="flex justify-center mt-5">
        <Pagination
          currentPage={page}
          totalPages={pulls?.totalPages || 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
```

**검색 동작:**

```
1. 사용자가 "login" 입력
2. searchQuery = "login"
3. filteredPRs에서 제목이나 번호에 "login" 포함된 PR만 필터링
4. 필터링된 결과 표시
5. 검색어 지우면 전체 PR 다시 표시
```

**추가 개선 (선택사항):**

**debounce 적용 (검색 성능 최적화):**

```typescriptreact
import { useState, useMemo } from 'react';
import { useDebounce } from '@/hooks/useDebounce'; // 이건 따로 만들어야 함

export const PullRequestwarp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300); // 🔹 300ms 후 적용

  return (
    // ...
    <PullRequsetSelect searchQuery={debouncedQuery} /> // 🔹 debounced 값 전달
  );
};
```

**하이라이팅 추가:**

```typescriptreact
// 검색어 하이라이트 함수
const highlightText = (text: string, query: string) => {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="bg-yellow-200">{part}</mark>
      : part
  );
};

// 사용
<h3 className="font-medium">
  PR #{pr.number}: {highlightText(pr.title, searchQuery)}
</h3>
```

간단하게 시작하고 필요하면 추가 기능 넣으세요! 😊

😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊
😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊
😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊

'use client';

import { useRepoStore } from '@/shared/stores/useRepoStore';
import { usePullRequests } from '../hooks/usePullRequests';
import Pagination from '@/shared/ui/Pagination';
import { useState } from 'react';

// 🔹 수정: Props 인터페이스 추가
interface PullRequestSelectProps {
searchQuery: string;
}

// 🔹 수정: 구조분해 방식 수정 (searchQuery: Props) → ({ searchQuery }: Props)
export const PullRequsetSelect = ({ searchQuery }: PullRequestSelectProps) => {
const { selectOrg, selectRepo } = useRepoStore();
const [page, setPage] = useState(1);

const { data: pulls, isLoading, isFetched } = usePullRequests({ selectOrg, selectRepo, page });

if (!selectOrg || !selectRepo) {
return <p>레포지토리를 먼저 선택해주세요</p>;
}

if (isLoading) return <p>로딩 중...</p>;

// 🔹 추가: 클라이언트 필터링 로직
const filteredPRs = pulls?.data.filter((pr) => {
if (!searchQuery) return true; // 검색어 없으면 전체 표시

    const query = searchQuery.toLowerCase();
    const titleMatch = pr.title.toLowerCase().includes(query);
    const numberMatch = pr.number.toString().includes(query);

    return titleMatch || numberMatch;

});

return (

<div>
<ul className="space-y-3">
{/_ 🔹 수정: pulls?.data → filteredPRs 사용 _/}
{/_ 🔹 수정: 검색 결과 없을 때 처리 추가 _/}
{isFetched && filteredPRs && filteredPRs.length > 0 ? (
filteredPRs.map((pr) => (
<li key={pr.id} className="flex items-start gap-3 rounded-lg border p-4">
<label className="block w-full" htmlFor={`pr-${pr.number}`}>
<input type="radio" name="pr" id={`pr-${pr.number}`} />
<div>
<h3 className="font-medium">
PR #{pr.number}: {pr.title}
</h3>
<p className="text-sm text-gray-500">
{selectOrg.login}/{selectRepo} · {pr.state}
</p>
</div>
</label>
</li>
))
) : (
// 🔹 추가: 검색 결과 없을 때 메시지
<p className="text-center text-gray-500 py-8">
{searchQuery ? '검색 결과가 없습니다' : 'PR이 없습니다'}
</p>
)}
</ul>
<div className="flex justify-center mt-5">
<Pagination currentPage={page} totalPages={pulls?.totalPages || 1} onPageChange={setPage} />
</div>
</div>
);
};
