'use client';

import { useState } from 'react';
import Accordion from '@/shared/ui/accordion';
import { usedocumentStore } from '@/shared/stores/useDocumentStore';
import { useRepoStore } from '@/shared/stores/useRepoStore';
import { useSaveAnalyses } from '../hooks/useSaveAnalyses';
import { LoadingAnimation } from '@/shared/ui/loding/LoadingAnimation';
import { ChartIframe } from './ChartIframe';
import NoData from '@/shared/ui/NoData';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Button from '@/shared/ui/Button';

export const DocumentWrap = () => {
  const { document, chartHtml, title, prUrl, tags, isPending, isError } = usedocumentStore();
  const { selectOrg, selectRepo } = useRepoStore();
  const [copiedPlain, setCopiedPlain] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const { mutate } = useSaveAnalyses();

  // MD 복사
  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(document ?? '');
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  // 일반 복사
  const handleCopyPlain = () => {
    // 마크다운 기호 제거
    const plain = (document ?? '')
      .replace(/[#*`_~>-]/g, '')
      .replace(/\n+/g, '\n')
      .trim();
    navigator.clipboard.writeText(plain);
    setCopiedPlain(true);
    setTimeout(() => setCopiedPlain(false), 2000);
  };

  // 문서 저장
  const handleSaveDoc = () => {
    mutate({
      title,
      prUrl,
      document: document ?? '',
      tags,
      repo_owner: selectOrg?.login ?? '',
      repo_name: selectRepo,
    });
  };

  if (isPending) return <LoadingAnimation />;

  if (isError)
    return (
      <NoData
        message="분석 결과 생성 중 오류가 발생했습니다"
        description="잠시 후 다시 시도해주세요."
      />
    );
  if (document === null || chartHtml === '') {
    return (
      <NoData
        message="분석 결과가 없습니다"
        description="문서 생성하기를 눌러 결과를 확인하세요."
      />
    );
  }
  return (
    <section className="flex flex-col gap-8">
      <Accordion defaultOpenItem={chartHtml ? 'item-1' : null}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>PR 변경 영향도</Accordion.Trigger>
          <Accordion.Content>
            <div>
              <ChartIframe chartHtml={chartHtml} />
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <Accordion accordion={false}>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>
            <div className="flex items-center justify-between w-full gap-3">
              <span>생성된 문서</span>
              <div className="flex gap-2 ml-auto">
                <div
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyPlain();
                  }}
                  className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  {copiedPlain ? '✅ 복사됨' : '📋 일반 복사'}
                </div>
                <div
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyMarkdown();
                  }}
                  className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  {copiedMarkdown ? '✅ 복사됨' : '🔗 MD 복사'}
                </div>
              </div>
              <div
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveDoc();
                }}
                className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-all cursor-pointer"
              >
                문서 저장하기
              </div>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <div className="p-4">
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{document ?? ''}</ReactMarkdown>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </section>
  );
};
