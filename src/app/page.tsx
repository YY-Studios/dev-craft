import { LoadingAnimation } from '@/shared/ui/loding/LoadingAnimation';
import { PullRequestWrap } from './../features/github/ui/PullRequestWrap';
import { FilterSelectedListWrap } from '@/features/filter-selected-list/FilterSeletedListWrap';
import { DocumentWrap } from '@/features/document/ui/DocumentWrap';
import Accordion from '@/shared/ui/accordion';

export default function MainPage() {
  return (
    <div className=" space-y-10">
      <h2>로딩 애니메이션</h2>
      <LoadingAnimation />
      <PullRequestWrap />
      {/* 문서 생성 옵션 */}
      <FilterSelectedListWrap />
      {/* 문서 생성하기 */}
      {/* PR 변경 영향도 */}
      <Accordion>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>PR 변경 영향도</Accordion.Trigger>
          <Accordion.Content>
            <p className="p-4">아코디언 컨텐츠</p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      {/* 생성된 문서 */}
      <DocumentWrap />
    </div>
  );
}
