import IconLike from '@/shared/assets/icons/icon_like.svg';
import IconComments from '@/shared/assets/icons/icon_comments.svg';
import Link from 'next/link';
const tags = ['Gemini', 'n8n', 'React', 'Figma', '해커톤'];
export default function PostCard() {
  return (
    <div className="flex-1 border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-2">
        {/* {user?.avatar_url && <img src={user?.avatar_url} alt="" />} */}
        <img src="/globe.svg" alt="YY-studio" className="w-6 h-6" />
        <div className="flex flex-col">
          <button className="text-xs md:text-sm font-semibold hover:underline">
            YY-Studiso/dev-craft
          </button>
          <span className="text-xs text-gray-500">2026.03.04</span>
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
          's' 하나 때문에 API가 터졌던 이야기
        </Link>
        <div className="text-sm md:text-base line-clamp-2 text-gray-500 mt-2.5">
          솔직히 말하면 이 프로젝트는 조코딩 해커톤 제출 마감이 코앞이라 반쯤 패닉 상태로
          만들었다.기획은 진작에 해뒀는데 막상 구현하려니 시간이 없었고 그냥 “일단 되게 만들자”는
          마음으로 달렸다.개발자 공방은 GitHub PR URL 하나 넣으면 블로그 글이랑 README를자”는
          마음으로 달렸다.개발자 공방은 GitHub PR URL 하나 넣으면 블로그 글이랑 README를자”는
          마음으로 달렸다.개발자 공방은 GitHub PR URL 하나 넣으면 블로그 글이랑 README를자”는
          마음으로 달렸다.개발자 공방은 GitHub PR URL 하나 넣으면 블로그 글이랑 README를자”는
          마음으로 달렸다.개발자 공방은 GitHub PR URL 하나 넣으면 블로그 글이랑 README를
        </div>
        <ul className="flex items-center gap-2 flex-wrap">
          {tags.map((tag) => (
            <li
              key={tag}
              className="text-xs md:text-sm px-2.5 py-1.5 text-primary bg-gray-100 rounded-full"
            >
              <span>{tag}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 text-xs md:text-sm">
            <img src={IconLike.src} alt="좋아요" className="w-4 h-4 md:w-6 md:h-6" />3
          </div>
          <div className="flex items-center gap-0.5 text-xs md:text-sm">
            <img src={IconComments.src} alt="댓글" className="w-4 h-4 md:w-6 md:h-6" />3
          </div>
        </div>
      </div>
    </div>
  );
}
