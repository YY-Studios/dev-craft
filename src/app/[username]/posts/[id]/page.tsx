import { Tag } from '@/shared/ui/Tag';
import IconLike from '@/shared/assets/icons/icon_like.svg';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Button from '@/shared/ui/Button';

const tags = ['Gemini', 'n8n', 'React', 'Figma', '해커톤'];
const MOCK_CONTENT = `
## 들어가며

솔직히 말하면 이 프로젝트는 조코딩 해커톤 제출 마감이 코앞이라 반쯤 패닉 상태로 만들었다. 기획은 진작에 해뒀는데 막상 구현하려니 시간이 없었고, 그냥 "일단 되게 만들자"는 마음으로 달렸다.

## 문제 상황

배포하고 나서 API가 간헐적으로 터지기 시작했다. 처음엔 서버 문제인 줄 알았다. 로그 뒤지고, n8n 워크플로우 확인하고, Redis 키 확인하고... 한 시간 넘게 삽질했다.

\`\`\`ts
// 문제가 된 코드
const endpoint = 'https://api.github.com/repo/' + repoName;
\`\`\`

알고 보니 \`repo\` 가 아니라 \`repos\` 였다. \`'s'\` 하나가 빠져있었던 것이다.

## 왜 이게 문제였나

GitHub REST API는 경로가 틀리면 404를 반환한다. 근데 우리 에러 핸들링이 404를 그냥 조용히 삼켜버리고 있었다. 덕분에 에러가 위로 전파되지 않았고, 결과적으로 아무 데이터도 없는 빈 응답이 내려왔다.

\`\`\`ts
// 수정 후
const endpoint = 'https://api.github.com/repos/' + repoName;
\`\`\`

## 배운 것

- API 경로는 공식 문서에서 복붙하자. 직접 타이핑하지 말고.
- 에러를 조용히 삼키는 코드는 나중에 반드시 터진다.
- 404도 명시적으로 핸들링해야 한다.

\`\`\`ts
if (response.status === 404) {
  throw new Error('존재하지 않는 레포지토리입니다.');
}
\`\`\`

## 마치며

해커톤이라 급하게 만들었다는 핑계를 대고 싶지만, 사실 이런 실수는 급하지 않아도 한다. 중요한 건 같은 실수를 두 번 하지 않는 것. 이제 API 경로 직접 타이핑하는 일은 없을 것 같다.
`;

export default function PostDetailPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* 태그 */}
      <div className="mb-2">
        <ul className="flex items-center gap-2 flex-wrap">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} size="sm" />
          ))}
        </ul>
      </div>

      {/* 제목 */}
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Next.js App Router에서 Server Action으로 폼 처리하기
      </h1>

      {/* 작성자 */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
        <img src="https://i.pravatar.cc/28" className="w-7 h-7 rounded-full" />
        <span className="text-sm text-gray-600">지니</span>
        <span className="text-xs text-gray-400">3일 전</span>
        <div className="ml-auto flex items-center gap-0.5 text-xs md:text-sm">
          <img src={IconLike.src} alt="좋아요" className="w-4 h-4 md:w-5 md:h-5" />3
        </div>
      </div>

      {/* 본문 */}
      <div className="mb-6 border-b border-zinc-100 pb-6">
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{MOCK_CONTENT}</ReactMarkdown>
        </div>

        {/* 레포/PR 링크 */}
        <div className="mt-10 text-xs text-zinc-500">
          <span>
            이 문서는 개발자 공방으로 생성되었으며, 아래 GitHub PR 변경사항을 기반으로
            작성되었습니다.
          </span>
          <div className="mt-2">
            <a
              href="https://github.com/YY-Studios/dev-craft"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-[4px] decoration-zinc-300 decoration-1 hover:text-zinc-700 hover:decoration-zinc-400"
            >
              레포지토리
            </a>
            <span className="mx-2 text-zinc-300">|</span>
            <a
              href="https://github.com/YY-Studios/dev-craft/pull/1"
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
      <div className="mt-8">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">댓글 3개</h2>

        {/* 댓글 입력 */}
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

        {/* 댓글 목록 */}
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
      </div>
    </div>
  );
}
