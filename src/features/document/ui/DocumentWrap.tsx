'use client';

import Accordion from '@/shared/ui/accordion';
import { usedocumentStore } from '@/shared/stores/useDocumentStore';
import { LoadingAnimation } from '@/shared/ui/loding/LoadingAnimation';
import { ChartIframe } from './ChartIframe';
import NoData from '@/shared/ui/NoData';

export const DocumentWrap = () => {
  const { document, chartHtml, isPending, isError } = usedocumentStore();

  if (isPending) return <LoadingAnimation />;

  if (isError)
    return (
      <NoData
        message="분석 결과 생성 중 오류가 발생했습니다"
        description="잠시 후 다시 시도해주세요."
      />
    );
  return (
    <section className="flex flex-col gap-8">
      <Accordion>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>PR 변경 영향도</Accordion.Trigger>
          <Accordion.Content>
            <p className="p-4">
              {isPending ? (
                'PR 변경 영향도를 불러오는 중입니다...'
              ) : isError ? (
                <span className="text-red-500">에러가 발생했습니다. 다시 시도해 주세요.</span>
              ) : (
                <ChartIframe chartHtml={chartHtml} />
              )}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
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
    </section>
  );
};
