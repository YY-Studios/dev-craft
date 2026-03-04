import { FeedCard } from '@/features/feed/FeedCard';
import { FeedTap } from './../../features/feed/FeedTap';
import { FeedSearch } from './../../features/feed/FeedSearch';
import { Suspense } from 'react';

// 임시 카드 DB 데이터
export const MOCK_POSTS = Array.from({ length: 10 }, (_, i) => ({
  id: `mock-${i}`,
  title: 'Next.js App Router에서 Server Action으로 폼 처리하기',
  content: '기존 API Route 방식과 비교하며 Server Action의 장단점을 알아봅니다.',
  thumbnail_url: `https://picsum.photos/seed/${i + 10}/600/340`,
  original_author: { login: '지니', avatar_url: `https://i.pravatar.cc/28?img=${i + 1}` },
  likes_count: (i + 1) * 7,
  comments: (i % 5) + 1, // 나중에 별도 테이블예정
  created_at: `${(i % 6) + 1}일 전`,
  tags: ['React', 'Next.js'],
  visibility: 'PUBLIC',
  is_author_verified: i % 2 === 0,
}));

export default function FeedPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q?.toLowerCase() ?? '';

  const filtered = MOCK_POSTS.filter((post) => {
    if (!query) return true;
    return (
      post.title.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-0 py-0 md:px-4 md:py-6">
      <div className="flex flex-wrap items-baseline justify-between mb-2 md:mb-6 border-gray-200">
        <div className="flex">
          <FeedTap />
        </div>
        <div className="max-w-xs pb-1 mt-2 md:mt-0">
          <Suspense fallback={null}>
            <FeedSearch />
          </Suspense>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(271px,1fr))] gap-3">
        {filtered.map((post) => (
          <FeedCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
