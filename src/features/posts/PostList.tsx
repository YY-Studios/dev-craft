'use client';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import PostCard from './PostCard';
import { PostsSkeleton } from '@/shared/ui/loding/PostsSkeleton';
import { AnalysisWithProject } from './model/posts';
interface PostListProps {
  posts: AnalysisWithProject[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function PostList({
  posts,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: PostListProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post.projects} analyses={post} />
      ))}

      <div ref={ref} className="h-10 w-full" />
      {isFetchingNextPage && <PostsSkeleton />}
    </div>
  );
}
