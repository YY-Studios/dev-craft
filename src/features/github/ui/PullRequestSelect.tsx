'use client';

import { useRepoStore } from '@/shared/stores/useRepoStore';
import { usePullRequests } from '../hooks/usePullRequests';
import { PRListSkeleton } from '@/shared/ui/loding/PRListSkeleton';

interface PullRequestSelectProps {
  searchQuery: string;
}

export const PullRequsetSelect = ({ searchQuery }: PullRequestSelectProps) => {
  const { selectOrg, selectRepo } = useRepoStore();
  const { data: pulls, isLoading, isFetched } = usePullRequests({ selectOrg, selectRepo });

  if (!selectOrg || !selectRepo) {
    return <p>레포지토리를 먼저 선택해주세요</p>;
  }

  if (isLoading) return <PRListSkeleton count={5} />;

  // 클라이언트 필터링 로직
  const filteredPRs = pulls?.data.filter((pr) => {
    if (!searchQuery) return true; // 검색결과가 없다면 true

    const query = searchQuery.toLowerCase();
    const titleMatch = pr.title.toLowerCase().includes(query); // 검색어가 제목에 있다면 true
    const numberMatch = pr.number.toString().includes(query); // 검색어가 pr번호에 있다면 true

    return titleMatch || numberMatch;
  });

  return (
    <div>
      <ul className="space-y-3 max-h-100 overflow-y-auto pr-2">
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
          <p className="text-center text-gray-500 py-8">
            {searchQuery ? '검색 결과가 없습니다' : 'PR이 없습니다'}
          </p>
        )}
      </ul>
    </div>
  );
};
