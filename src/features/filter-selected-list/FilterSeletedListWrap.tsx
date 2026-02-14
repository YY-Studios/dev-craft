import { FilterContainer } from '../prompt-filter/ui/FilterContainer';
import { FilterSelectedList } from './FilterSelectedList';
import Button from '@/shared/ui/Button';
export const FilterSelectedListWrap = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">문서 생성 옵션</h2>
        <Button>필터 저장</Button>
      </div>
      <FilterContainer />
      <FilterSelectedList />
      {/* 1칭찬^^ */}
    </section>
  );
};
