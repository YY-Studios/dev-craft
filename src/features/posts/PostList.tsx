'use client';

import { ProjectWithAnalyses, Analysis } from './model/posts';
import PostCard from './PostCard';

interface PostListProps {
  posts: ProjectWithAnalyses[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="flex flex-col gap-6">
      {posts?.flatMap((post) =>
        post.analyses.map((analyses) => (
          <PostCard key={analyses.id} post={post} analyses={analyses} />
        )),
      )}
    </div>
  );
}
