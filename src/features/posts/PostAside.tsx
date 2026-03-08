'use client';
import { ProjectWithAnalyses } from './model/posts';

interface PostAsideProps {
  posts: ProjectWithAnalyses[];
  setSelectRepo: (repo: string) => void;
}

export default function PostAside({ posts, setSelectRepo }: PostAsideProps) {
  const handelSelectRepo = (repo: string) => {
    setSelectRepo(repo);
  };
  return (
    <aside className="w-full md:w-50">
      <h2 className="hidden md:block text-base text-gray-700 font-semibold border-b border-gray-400 pb-3 mb-3">
        레포지토리 목록
      </h2>
      <ul className="flex md:flex-col gap-1.5 overflow-auto pb-2 md:pb-0">
        <li className="flex md:block border border-gray-300 md:border-0 px-2 py-1 md:px-0 md:py-0 rounded-full md:rounded-none text-xs md:text-sm text-gray-700">
          {' '}
          <button
            onClick={() => handelSelectRepo('all')}
            className="flex-1 md:max-w-4/5 text-left hover:text-primary cursor-pointer whitespace-nowrap md:truncate"
          >
            {`전체보기()`}
          </button>
        </li>
        {posts.map((post) => (
          <li
            key={post.repo_name}
            className="flex md:block border border-gray-300 md:border-0 px-2 py-1 md:px-0 md:py-0 rounded-full md:rounded-none text-xs md:text-sm text-gray-700"
          >
            <button
              onClick={() => handelSelectRepo(post.repo_name)}
              className="flex-1 md:max-w-4/5 text-left hover:text-primary cursor-pointer whitespace-nowrap md:truncate"
            >
              {post.repo_name}
            </button>
            <span className=" ml-0.5">{`(${post.analyses.length})`}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
