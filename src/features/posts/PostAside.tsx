const repolist = [
  '전체보기',
  'dev-craft',
  'YY-Studio',
  '말줌임테스트말줌임테스트말줌임테스트말줌임테스트말줌임테스트말줌임테스트말줌임테스트',
];
export default function PostAside() {
  return (
    <aside className="w-full md:w-50">
      <h2 className="hidden md:block text-base text-gray-700 font-semibold border-b border-gray-400 pb-3 mb-3">
        레포지토리 목록
      </h2>
      <ul className="flex md:flex-col gap-1.5 overflow-auto pb-2 md:pb-0">
        {repolist.map((repo) => (
          <li
            key={repo}
            className="flex md:block border border-gray-300 md:border-0 px-2 py-1 md:px-0 md:py-0 rounded-full md:rounded-none text-xs md:text-sm text-gray-700"
          >
            <button className="flex-1 md:max-w-4/5 text-left hover:text-primary cursor-pointer whitespace-nowrap md:truncate">
              {repo}
            </button>
            <span className=" ml-0.5">(12)</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
