'use client';

import Accordion from '@/shared/ui/accordion';
import { usedocumentStore } from '@/shared/stores/useDocumentStore';

export const DocumentWrap = () => {
  const { document, isPending, isError } = usedocumentStore();
  return (
    <Accordion accordion={false}>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>생성된 문서</Accordion.Trigger>
        <Accordion.Content>
          <p className="p-4">
            {isPending ? (
              '문서를 불러오는 중입니다...'
            ) : isError ? (
              <span className="text-red-500">에러가 발생했습니다. 다시 시도해 주세요.</span>
            ) : (
              document
            )}
          </p>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
