import { useRepositories } from '@/features/github/hooks/useRepositories';
import { selectedOrgType } from '@/widgets/pull-request-step/PullRequestStepWrap';
interface RepositorySelectProps {
  selectOrg: selectedOrgType;
  setSelectRepo: (value: string) => void;
}
export const RepositorySelect = ({ selectOrg, setSelectRepo }: RepositorySelectProps) => {
  const { data: repos, refetch, isLoading, isFetched } = useRepositories({ selectOrg, page: 1 });

  console.log('레포지토리 데이터:', repos);
  console.log('로딩 중:', isLoading);
  console.log('데이터 있음:', isFetched);
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
                className="w-4 h-4 accent-gray-900 cursor-pointer"
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
    </div>
  );
};
