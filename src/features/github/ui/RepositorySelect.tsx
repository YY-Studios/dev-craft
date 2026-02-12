import { useRepositories } from '@/features/github/hooks/useRepositories';
import { selectedOrgType } from '@/widgets/pull-request-step/PullRequestStepWrap';
import { useState } from 'react';
import Pagination from '@/shared/ui/Pagination';
import { RepoSkeleton } from '@/shared/ui/loding/RepoListSkeleton';
import NoData from '@/shared/ui/NoData';
interface RepositorySelectProps {
  selectOrg: selectedOrgType;
  setSelectRepo: (value: string) => void;
}
export const RepositorySelect = ({ selectOrg, setSelectRepo }: RepositorySelectProps) => {
  const [page, setPage] = useState(1);
  const { data: repos, isLoading, isFetched } = useRepositories({ selectOrg, page });

  if (isLoading) {
    return <RepoSkeleton count={5} />;
  }

  if (!repos)
    return <NoData message="데이터를 불러올 수 없습니다" description="잠시 후 다시 시도해주세요" />;

  return (
    <div>
      <ul className="grid grid-cols-1 gap-3">
        {isFetched &&
          repos?.data.map((repo) => (
            <li key={repo.id} className="relative">
              {/* 라디오 버튼 숨김 */}
              <input
                type="radio"
                id={repo.name}
                name="repositories"
                value={repo.name}
                className="peer hidden"
                onChange={() => {
                  setSelectRepo(repo.name);
                }}
              />

              {/* 선택 시 하이라이트되는 카드 레이아웃 */}
              <label
                htmlFor={repo.name}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-300 bg-white cursor-pointer
                       hover:border-gray-600 hover:bg-gray-50
                       peer-checked:border-gray-600 peer-checked:bg-gray-600/5 peer-checked:ring-1 peer-checked:ring-gray-600/20"
              >
                {/* 레포지토리 아이콘 (Book 아이콘 스타일) */}
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 peer-checked:bg-primary/10 peer-checked:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>

                {/* 레포지토리 이름 */}
                <span className="font-semibold text-gray-700 peer-checked:text-primary truncate">
                  {repo.name}
                </span>
              </label>
            </li>
          ))}
      </ul>
      <div className="flex justify-center mt-5">
        <Pagination currentPage={page} totalPages={repos?.totalPages || 1} onPageChange={setPage} />
      </div>
    </div>
  );
};
