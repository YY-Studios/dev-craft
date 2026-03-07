import { PostContents } from '@/features/posts/PostContents';

export default async function PostsPage() {
  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-10">
      <PostContents />
    </div>
  );
}
