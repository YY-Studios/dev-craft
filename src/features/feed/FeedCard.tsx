import { MOCK_POSTS } from '@/app/feed/page';

import check from '@/shared/assets/icons/icon_check.svg';
import Image from 'next/image';

export function FeedCard({ post }: { post: (typeof MOCK_POSTS)[0] }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
      <div className="aspect-video overflow-hidden bg-gray-100 relative">
        <img
          src={post.thumbnail_url}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {post.is_author_verified && (
          <span className="absolute items-baseline flex gap-0.5 top-2 left-2 bg-black/70 text-white text-[10px] font-medium pl-1.5 pr-2 py-0.5 rounded-full">
            <span>
              <Image src={check} alt="" width={11} height={11} className="translate-y-[2px]" />
            </span>{' '}
            OWNER
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 leading-snug">
          {post.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{post.content}</p>
        <p className="text-xs text-gray-400 mb-3">
          {post.created_at} · {post.comments}개의 댓글
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img src={post.original_author.avatar_url} className="w-5 h-5 rounded-full" />
            <span className="text-xs text-gray-500">by {post.original_author.login}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span>♥</span>
            <span>{post.likes_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
