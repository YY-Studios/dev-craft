'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMe } from '@/features/auth/hooks/useMe';
import logo from '@/shared/assets/icons/icon_logo.svg';
import { Button } from './Button';
import { cn } from '../lib/cn';
import { modal } from './modal/modalApi';

export const Header = () => {
  const pathname = usePathname();
  const { data: user } = useMe();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    localStorage.clear();
    window.location.href = '/';
  };

  const handleGuestLogin = async () => {
    try {
      const res = await fetch('/api/auth/guest', { method: 'POST' });

      if (res.ok) {
        window.location.href = '/';
      } else {
        modal.alert('게스트 로그인에 실패했습니다.');
      }
    } catch (e) {
      console.error(e);
      alert('서버 오류가 발생했습니다.');
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        {/* left */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center">
              <Image src={logo} alt="logo" className="h-auto w-full" />
            </div>
            <h1 className="font-logo text-lg font-bold text-zinc-900">개발자 공방</h1>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/create"
              className={cn(
                'text-sm font-medium transition-colors hover:text-zinc-900',
                pathname === '/create' ? 'font-bold text-zinc-900' : 'text-zinc-500', // [수정] active 스타일
              )}
            >
              문서 생성
            </Link>
            <Link
              href="/feed"
              className={cn(
                'text-sm font-medium transition-colors hover:text-zinc-900',
                pathname === '/feed' ? 'font-bold text-zinc-900' : 'text-zinc-500',
              )}
            >
              모두의 공방
            </Link>
            {user ? (
              <Link
                href={`/${user.username}/posts`}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-zinc-900',
                  pathname === `/${user.username}/posts`
                    ? 'font-bold text-zinc-900'
                    : 'text-zinc-500',
                )}
              >
                나의 공방
              </Link>
            ) : (
              ''
            )}
          </nav>
        </div>

        {/* right */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  className="h-8 w-8 rounded-full border border-zinc-200 object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 border border-zinc-200">
                  <span className="text-sm font-medium text-zinc-600">
                    {user.username?.[0]?.toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-sm font-medium text-zinc-700">{user.username}</span>
            </div>
          )}

          {user ? (
            <Button variant="gray" onClick={handleLogout}>
              로그아웃
            </Button>
          ) : (
            <>
              <Button onClick={handleGuestLogin} variant="gray">
                체험 로그인으로 시작하기
              </Button>
              <Button onClick={() => (window.location.href = '/api/auth/github')} variant="github">
                <svg className="mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub로 시작하기
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
