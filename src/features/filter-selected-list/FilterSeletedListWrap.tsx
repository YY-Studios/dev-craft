import { FilterContainer } from '../prompt-filter/ui/FilterContainer';
import { FilterSelectedList } from './FilterSelectedList';

export const FilterSelectedListWrap = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">문서 생성 옵션</h2>
      <FilterContainer />
      <FilterSelectedList />
      {/* 1칭찬^^ */}
    </section>
  );
};
