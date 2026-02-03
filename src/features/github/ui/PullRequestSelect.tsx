'use client';

import { useRepoStore } from '@/shared/stores/useRepoStore';
import { usePullRequests } from '../hooks/usePullRequests';
import Pagination from '@/shared/ui/Pagination';
import { useState } from 'react';

export const PullRequsetSelect = () => {
  const { selectOrg, selectRepo } = useRepoStore();
  const [page, setPage] = useState(1);

  const { data: pulls, isLoading, isFetched } = usePullRequests({ selectOrg, selectRepo, page });

  if (!selectOrg || !selectRepo) {
    return <p>레포지토리를 먼저 선택해주세요</p>;
  }

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <div>
      <ul className="space-y-3">
        {isFetched &&
          pulls?.data.map((pr) => (
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
          ))}
      </ul>
      <div className="flex justify-center mt-5">
        <Pagination currentPage={page} totalPages={pulls?.totalPages || 1} onPageChange={setPage} />
      </div>
    </div>
  );
};
