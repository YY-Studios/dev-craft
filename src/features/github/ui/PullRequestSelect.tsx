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
      <ul className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
        {isFetched && filteredPRs && filteredPRs.length > 0 ? (
          filteredPRs.map((pr) => (
            <li key={pr.id} className="relative">
              <input
                type="radio"
                name="pr"
                id={`pr-${pr.number}`}
                className="peer hidden"
                value={pr.number}
              />
              <label
                htmlFor={`pr-${pr.number}`}
                className="group block rounded-xl border border-gray-300 bg-white p-5 cursor-pointer
                     hover:border-gray-600 hover:bg-gray-50 hover:shadow-md
                     peer-checked:border-gray-600 peer-checked:bg-gray-600/5 peer-checked:ring-1 peer-checked:ring-gray-600/20"
              >
                {/* 상단: PR 번호 및 상태 배지 */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    #{pr.number}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                      pr.state === 'open'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-purple-50 text-purple-700 border-purple-200'
                    }`}
                  >
                    {pr.state.toUpperCase()}
                  </span>
                </div>

                {/* 중단: 제목 (체크 시 텍스트 컬러 변경) */}
                <strong className="font-semibold text-gray-800 peer-checked:text-blue-800 transition-colors line-clamp-2 mb-2">
                  {pr.title}
                </strong>

                {/* 하단: 메타 정보 */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="truncate">
                    {selectOrg.login} / {selectRepo}
                  </span>
                </div>
              </label>
            </li>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-100 rounded-xl">
            <p className="text-gray-400 text-sm">
              {searchQuery ? '검색 결과가 없습니다' : '표시할 Pull Request가 없습니다'}
            </p>
          </div>
        )}
      </ul>
    </div>
  );
};
