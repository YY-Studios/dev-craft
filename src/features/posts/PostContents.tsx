'use client';
import { useState } from 'react';
import { usePosts } from './hooks/usePosts';
import PostAside from './PostAside';
import PostList from './PostList';
import { ProjectWithAnalyses, Analysis } from './model/posts';

export const PostContents = () => {
  const { data: posts, isPending, isError } = usePosts();
  const [selectRepo, setSelectRepo] = useState<string>('all');
  const filteredPost =
    selectRepo === 'all' ? posts : posts?.filter((post) => post.repo_name === selectRepo);
  return (
    <>
      <PostAside posts={posts ?? []} setSelectRepo={setSelectRepo} />
      <section className="flex-1">
        <PostList posts={filteredPost ?? []} />
      </section>
    </>
  );
};
