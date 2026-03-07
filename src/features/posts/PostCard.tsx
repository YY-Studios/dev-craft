import IconLike from '@/shared/assets/icons/icon_like.svg';
import IconComments from '@/shared/assets/icons/icon_comments.svg';
import Link from 'next/link';
import { Tag } from '@/shared/ui/Tag';
import { Analysis, ProjectWithAnalyses } from './model/posts';
const tags = ['Gemini', 'n8n', 'React', 'Figma', '해커톤'];

interface PostCardProps {
  post: ProjectWithAnalyses;
  analyses: Analysis;
}

export default function PostCard({ analyses, post }: PostCardProps) {
  return (
    <div className="flex-1 border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-2">
        {/* {user?.avatar_url && <img src={user?.avatar_url} alt="" />} */}
        <img src="/globe.svg" alt="YY-studio" className="w-6 h-6" />
        <div className="flex flex-col items-start">
          <button className="text-xs md:text-sm font-semibold hover:underline">
            {`${post.repo_owner} / ${post.repo_name}`}
          </button>
          <span className="text-xs text-gray-500">{analyses.created_at.slice(0, 10)}</span>
        </div>
      </div>
      <div className="mt-6 space-y-5">
        <Link href={'#'} className="relative h-60 overflow-hidden">
          <img
            src="/card_dummy.png"
            alt=""
            className="absolute left-0  w-ful h-full object-cover"
          />
        </Link>
        <Link href={'#'} className="text-xl md:text-2xl font-semibold hover:underline">
          {analyses.title}
        </Link>
        <div className="text-sm md:text-base line-clamp-2 text-gray-500 mt-2.5">
          {analyses.content}
        </div>
        <ul className="flex items-center gap-2 flex-wrap">
          {analyses.tags?.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 text-xs md:text-sm">
            <img src={IconLike.src} alt="좋아요" className="w-4 h-4 md:w-6 md:h-6" />
            {analyses.likes_count}
          </div>
          <div className="flex items-center gap-0.5 text-xs md:text-sm">
            <img src={IconComments.src} alt="댓글" className="w-4 h-4 md:w-6 md:h-6" />
            {analyses.views_count}
          </div>
        </div>
      </div>
    </div>
  );
}
