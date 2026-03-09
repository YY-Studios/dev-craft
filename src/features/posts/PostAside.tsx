'use client';
import { RepoStat } from './hooks/useRepoStats';

interface PostAsideProps {
  stats: RepoStat[];
  setSelectRepo: (repo: string) => void;
  selectRepo: string;
}

export default function PostAside({ stats, setSelectRepo, selectRepo }: PostAsideProps) {
  const handelSelectRepo = (repo: string) => {
    setSelectRepo(repo);
  };

  const totalCount = stats.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <aside className="min-w-full md:min-w-50">
      <h2 className="hidden md:block text-base text-gray-700 font-semibold border-b border-gray-400 pb-3 mb-3">
        레포지토리 목록
      </h2>
      <ul className="flex md:flex-col gap-1.5 overflow-auto pb-2 md:pb-0">
        <li className="flex md:block border border-gray-300 md:border-0 px-2 py-1 md:px-0 md:py-0 rounded-full md:rounded-none text-xs md:text-sm text-gray-700">
          <button
            onClick={() => handelSelectRepo('all')}
            className={`flex-1 md:max-w-4/5 text-left hover:text-primary cursor-pointer whitespace-nowrap md:truncate ${selectRepo === 'all' ? 'text-primary font-bold' : ''}`}
          >
            전체보기 ({totalCount})
          </button>
        </li>
        {stats.map((stat) => (
          <li
            key={stat.repo_name}
            className="flex md:block border border-gray-300 md:border-0 px-2 py-1 md:px-0 md:py-0 rounded-full md:rounded-none text-xs md:text-sm text-gray-700"
          >
            <button
              onClick={() => handelSelectRepo(stat.repo_name)}
              className={`flex-1 md:max-w-4/5 text-left hover:text-primary cursor-pointer whitespace-nowrap md:truncate ${selectRepo === stat.repo_name ? 'text-primary font-bold' : ''}`}
            >
              {stat.repo_name}
            </button>
            <span className="ml-0.5">({stat.count})</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
