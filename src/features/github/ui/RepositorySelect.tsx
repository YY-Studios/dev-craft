import { useRepositories } from '@/features/github/hooks/useRepositories';
import { selectedOrgType } from '@/widgets/pull-request-step/PullRequestStepWrap';
import { useState } from 'react';
import Pagination from '@/shared/ui/Pagination';
interface RepositorySelectProps {
  selectOrg: selectedOrgType;
  setSelectRepo: (value: string) => void;
}
export const RepositorySelect = ({ selectOrg, setSelectRepo }: RepositorySelectProps) => {
  const [page, setPage] = useState(1);
  const { data: repos, isLoading, isFetched } = useRepositories({ selectOrg, page });
  return (
    <div>
      {isLoading && <p>데이터 불러오는 중...</p>}
      <ul className="flex flex-col gap-4">
        {isFetched &&
          repos?.data.map((repo) => (
            <li key={repo.id} className="flex gap-2 items-center">
              <input
                type="radio"
                id={repo.name}
                name="repositories"
                value={repo.name}
                className="w-4 h-4 accent-gray-800 cursor-pointer"
                onChange={() => {
                  setSelectRepo(repo.name);
                }}
              />
              <label
                htmlFor={repo.name}
                className="flex items-center gap-1 font-bold text-lg cursor-pointer"
              >
                {repo.name}
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
