'use client';

import { FeedCardProps } from './model/types';
import Link from 'next/link';
import { Tag } from '@/shared/ui/Tag';
import IconLikeActive from '@/shared/assets/icons/icon_like_active.svg';

export function FeedCard({ post }: FeedCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
      {/* <div className="aspect-video overflow-hidden bg-gray-100 relative">
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
      </div> */}
      <Link href={`${post.users.username}/posts/${post.id}`} className="block p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-2 leading-snug">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">{post.content}</p>
        <p className="text-sm text-gray-400 mb-3">
          {/* {post.created_at} · {post.comments}개의 댓글 */}
          {post.created_at.slice(0, 10)}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img src={post.users.avatar_url} className="w-5 h-5 rounded-full" />
            <span className="text-sm text-gray-500">by {post.users.username}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <img src={IconLikeActive.src} alt="" className="w-4 h-4" />
            <span>{post.likes_count}</span>
          </div>
        </div>
        <ul className="flex gap-2 mt-5 flex-wrap">
          {post.tags.map((tag) => (
            <Tag key={tag} label={tag} size="sm" />
          ))}
        </ul>
      </Link>
    </div>
  );
}
