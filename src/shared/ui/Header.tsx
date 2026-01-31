'use client';

import { useMe } from '@/features/auth/hooks/useMe';

export const Header = () => {
  const { data: user } = useMe();
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/';
  };
  return (
    <header className="border-b px-6 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">개발자 공방</h1>
          <p className="text-sm text-gray-500">코드와 문서를 함께 만드는 공간</p>
        </div>

        {user ? (
          <button className="rounded-md border px-4 py-2 text-sm" onClick={handleLogout}>
            로그아웃
          </button>
        ) : (
          <button
            className="rounded-md border px-4 py-2 text-sm"
            onClick={() => (window.location.href = 'api/auth/github')}
          >
            GitHub 로그인
          </button>
        )}

        {user && (
          <p>
            유저이름:
            <span>
              {user.avatar_url && <img src={user.avatar_url} alt="" className="w-5 h-5" />}
            </span>
            {user.username}
          </p>
        )}
      </div>
    </header>
  );
};
