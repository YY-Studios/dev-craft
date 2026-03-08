import { PostContents } from '@/features/posts/PostContents';

type PostsPageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function PostsPage({ params }: PostsPageProps) {
  const { username } = await params;
  console.log(username);
  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-10">
      <PostContents username={username} />
    </div>
  );
}
