'use client';

import Button from '@/shared/ui/Button';
import { Tag } from '@/shared/ui/Tag';
import IconLike from '@/shared/assets/icons/icon_like.svg';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { usePostDetail } from './hooks/usePostDetail';
import Link from 'next/link';
import PostDetailSkeleton from '@/shared/ui/loding/PostsDetailSkeleton';
import NoData from '@/shared/ui/NoData';
import { modal } from '@/shared/ui/modal/modalApi';
import { useRouter } from 'next/navigation';
import { useDeletePost } from './hooks/useDeletePost';
import { useMe } from '../auth/hooks/useMe';

interface PostDetailProps {
  id: string;
}
export default function PostDetail({ id }: PostDetailProps) {
  const router = useRouter();
  const { data, isPending, isError } = usePostDetail({ id });
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const { data: me } = useMe();
  const isOwner = me?.username === data?.users.username;

  const handleDelete = async () => {
    const confirmed = await modal.confirm('정말 삭제하시겠습니까?', {
      title: '포스트 삭제',
      confirmText: '삭제',
      cancelText: '취소',
    });
    if (!confirmed) return;

    deletePost(id, {
      onSuccess: () => router.push(`/${data?.users.username}/posts`),
    });
  };

  if (isPending) {
    return <PostDetailSkeleton />;
  }

  if (isError || !data) {
    return <NoData message="데이터를 불러올 수 없습니다" description="잠시 후 다시 시도해주세요" />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* 태그 */}
      <div className="mb-2">
        <ul className="flex items-center gap-2 flex-wrap">
          {data.tags?.map((tag) => (
            <Tag key={tag} label={tag} size="sm" />
          ))}
        </ul>
      </div>

      {/* 제목 */}
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{data.title}</h1>

      {/* 작성자 */}
      <div className="flex  items-center gap-2 mb-6 pb-4 border-b border-gray-100">
        <img src={data.users.avatar_url ?? undefined} className="w-7 h-7 rounded-full" />
        <div className="flex flex-col">
          <Link
            href={`/${data.users.username}/posts`}
            className="text-sm text-gray-700 font-bold hover:underline"
          >
            {data.users.username}
          </Link>
          <span className="text-xs text-gray-400">{data.created_at.slice(0, 10)}</span>
        </div>
        <div className="ml-auto flex items-center gap-0.5 text-xs md:text-sm">
          <img src={IconLike.src} alt="좋아요" className="w-4 h-4 md:w-5 md:h-5" />
          {data.likes_count}
        </div>
        {isOwner && (
          <Button variant="gray" size="sm" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? '삭제 중...' : '삭제'}
          </Button>
        )}
      </div>

      {/* 본문 */}
      <div className="mb-6 border-b border-zinc-100 pb-6">
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
        </div>

        {/* 레포/PR 링크 */}
        <div className="mt-10 text-xs text-zinc-500">
          <span>
            이 문서는 개발자 공방으로 생성되었으며, 아래 GitHub PR 변경사항을 기반으로
            작성되었습니다.
          </span>
          <div className="mt-2">
            <a
              href={data.pr_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-[4px] decoration-zinc-300 decoration-1 hover:text-zinc-700 hover:decoration-zinc-400"
            >
              PR 원본 보기
            </a>
          </div>
        </div>
      </div>

      {/* 댓글 */}
      {/* <div className="mt-8">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">댓글 3개</h2>

        <div className="flex gap-3 mb-10">
          <img src="https://i.pravatar.cc/28?img=2" className="w-7 h-7 rounded-full mt-1" />

          <div className="flex-1">
            <textarea
              placeholder="댓글을 입력하세요"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none h-20 focus:outline-none focus:border-gray-400"
            />
            <div className="mt-2 flex justify-end">
              <Button type="button" variant="github" size="sm">
                등록
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-zinc-100">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 py-5">
              <img src={`https://i.pravatar.cc/28?img=${i}`} className="w-7 h-7 rounded-full" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-700">유저{i}</span>
                    <span className="text-xs text-gray-400">1일 전</span>
                  </div>

                  <div className="flex items-center">
                    <Button type="button" variant="ghost" size="sm" className="!h-auto !px-0 !py-0">
                      수정
                    </Button>
                    <span className="mx-2 text-xs text-zinc-300">|</span>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      className="!h-auto !px-0 !py-0"
                    >
                      삭제
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-gray-600">좋은 글 감사합니다!</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
