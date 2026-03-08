'use client';

import { FeedCard } from './FeedCard';
import { useSearchParams } from 'next/navigation';
import { useFeedPosts } from './hooks/useFeedPosts';

export function FeedList() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const { data: posts, isLoading } = useFeedPosts(query);

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(271px,1fr))] gap-3">
      {posts?.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}
    </div>
  );
}
