import { FeedTap } from '@/features/feed/FeedTap';
import { FeedSearch } from '@/features/feed/FeedSearch';
import { FeedList } from '@/features/feed/FeedList';
import { Suspense } from 'react';

export default function FeedPage() {
  return (
    <>
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
      <Suspense fallback={null}>
        <FeedList />
      </Suspense>
    </>
  );
}
