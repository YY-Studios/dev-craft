import { PullRequestWrap } from '@/features/github/ui/PullRequestWrap';
import { FilterSelectedListWrap } from '@/features/filter-selected-list/FilterSeletedListWrap';
import { DocumentWrap } from '@/features/document/ui/DocumentWrap';
import { AdFitBanner } from '@/features/adfit/AdFitBanner';
export default function CreatePage() {
  return (
    <div className="space-y-10 container mx-auto">
      {/* 광고 */}
      <AdFitBanner />
      {/* pr 링크 넣기 + 불러오기 */}
      <PullRequestWrap />
      {/* 문서 생성 옵션 */}
      <FilterSelectedListWrap />
      {/* PR 변경 영향도 + 생성된 문서 */}
      <DocumentWrap />
    </div>
  );
}
