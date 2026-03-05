import PostAside from '@/features/posts/PostAside';
import PostList from '@/features/posts/PostList';

export default async function PostsPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-3">
      <PostAside />
      <section className="flex-1">
        <p>현재 경로의 유저: {username}</p>
        <PostList />
      </section>
    </div>
  );
}
