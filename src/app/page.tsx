export const metadata = {
  title: 'DevCraft',
};
import { PullRequestWrap } from './../features/github/ui/PullRequestWrap';
import { FilterSelectedListWrap } from '@/features/filter-selected-list/FilterSeletedListWrap';
import { DocumentWrap } from '@/features/document/ui/DocumentWrap';

export default function MainPage() {
  return (
    <div className=" space-y-10">
      {/* pr 링크 넣기 + 불러오기 */}
      <PullRequestWrap />
      {/* 문서 생성 옵션 */}
      <FilterSelectedListWrap />
      {/* PR 변경 영향도 + 생성된 문서 */}
      <DocumentWrap />
    </div>
  );
}
