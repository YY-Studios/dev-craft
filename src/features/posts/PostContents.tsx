'use client';
import { useState } from 'react';
import { usePosts } from './hooks/usePosts'; // 저번에 수정한 무한스크롤 훅
import { useRepoStats } from './hooks/useRepoStats'; // 새로 만든 통계 훅
import PostAside from './PostAside';
import PostList from './PostList';
import { PostsSkeleton } from '@/shared/ui/loding/PostsSkeleton';

export const PostContents = ({ username }: { username: string }) => {
  const [selectRepo, setSelectRepo] = useState<string>('all');
  const { data: stats } = useRepoStats({ username });

  const {
    data: postsData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts({ username, selectRepo });

  if (isPending) {
    return (
      <div className="flex gap-10 w-full">
        <section className="flex-1">
          <PostsSkeleton />
        </section>
      </div>
    );
  }

  const allPosts = postsData?.pages.flat() ?? [];

  if (isError || (!isPending && allPosts.length === 0 && selectRepo === 'all')) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-32">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">게시글을 찾을 수 없습니다.</h2>
        <p className="text-gray-500">데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <PostAside stats={stats ?? []} setSelectRepo={setSelectRepo} selectRepo={selectRepo} />
      <section className="flex-1 min-w-0">
        <PostList
          posts={allPosts}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </section>
    </>
  );
};
