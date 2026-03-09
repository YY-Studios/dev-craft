'use client';

import { useInView } from 'react-intersection-observer';
import { FeedCard } from './FeedCard';
import { useFeedPosts } from './hooks/useFeedPosts';
import { useEffect } from 'react';
import NoData from '@/shared/ui/NoData';
import { FeedSkeleton } from '@/shared/ui/loding/FeedSkeleton';

export function FeedList() {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFeedPosts();
  const post = posts?.pages.flat() ?? [];
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <FeedSkeleton count={4} />;
  }

  if (post.length === 0) {
    return (
      <NoData
        message="검색 결과가 없습니다."
        description="다른 검색어나 태그로 다시 검색해 보세요."
        className="w-full mt-10"
      />
    );
  }

  return (
    <>
      {' '}
      <div className="grid grid-cols-1 gap-5 mt-5">
        {post?.map((post, idx) => (
          <FeedCard key={idx} post={post} />
        ))}
      </div>
      <div ref={ref} />
      {isFetchingNextPage && <FeedSkeleton />}
    </>
  );
}
