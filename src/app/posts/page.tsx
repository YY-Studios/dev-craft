'use client';
import PostAside from '@/features/posts/PostAside';
import PostList from '@/features/posts/PostList';
import { useMe } from '@/features/auth/hooks/useMe';

export default function PostsPage() {
  const { data: user } = useMe();
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <PostAside />
      <section className="flex-1">
        <PostList />
      </section>
    </div>
  );
}
