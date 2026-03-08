'use client';
import { useState } from 'react';
import { usePosts } from './hooks/usePosts';
import PostAside from './PostAside';
import PostList from './PostList';
import { PostsSkeleton } from '@/shared/ui/loding/PostsSkeleton';

export const PostContents = ({ username }: { username: string }) => {
  const { data: posts, isPending, isError } = usePosts({ username: username });
  const [selectRepo, setSelectRepo] = useState<string>('all');
  console.log('posts', posts);
  if (isPending) {
    return <PostsSkeleton />;
  }
  const filteredPost =
    selectRepo === 'all' ? posts : posts?.filter((post) => post.repo_name === selectRepo);
  if (isError || !posts || posts.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-32">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">게시글을 찾을 수 없습니다.</h2>
        <p className="text-gray-500">
          유저네임(<span className="font-semibold text-primary">{username}</span>)이 정확한지 확인해
          주시거나, 아직 작성된 분석글이 없습니다.
        </p>
      </div>
    );
  }
  return (
    <>
      <PostAside posts={posts ?? []} setSelectRepo={setSelectRepo} />
      <section className="flex-1">
        <PostList posts={filteredPost ?? []} />
      </section>
    </>
  );
};
