'use client';

import { useInView } from 'react-intersection-observer';
import { FeedCard } from './FeedCard';
import { useFeedPosts } from './hooks/useFeedPosts';
import { useEffect } from 'react';

export function FeedList() {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFeedPosts();
  const post = posts?.pages.flat() ?? [];
  console.log(post);
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <>
      {' '}
      <div className="grid grid-cols-1 gap-5 mt-5">
        {post?.map((post, idx) => (
          <FeedCard key={idx} post={post} />
        ))}
      </div>
      <div ref={ref} />
      {isFetchingNextPage && <div>불러오는 중...</div>}
    </>
  );
}
