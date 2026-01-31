'use client';

import { useState } from 'react';
import Input from '@/shared/ui/input/Input';
import { useOrganizations } from '@/features/github/hooks/useOrganizations';
import { FilterContainer } from './../../features/prompt-filter/ui/FilterContainer';
import Button from '@/shared/ui/Button';
import Accordion from '@/shared/ui/accordion';
export default function DevPage() {
  const [mode, setMode] = useState<'link' | 'select'>('link');
  const { data: orgs, refetch, isLoading, isFetched } = useOrganizations();
  const [selectedOrigin, setSelectedOrigin] = useState<{} | null>(null);
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 space-y-10">
      {/* 조직 받아오기 테스트 */}
      <Button onClick={() => refetch()}>조직 받아오기</Button>

      {isLoading && <p>로딩 중...</p>}

      {/* {isFetched && orgs?.map((org) => <li key={org.login}>{org.login}</li>)} */}
      {`${selectedOrigin}`}
      {isFetched &&
        orgs?.map((org) => (
          <label key={org.login}>
            <input
              type="radio"
              name="origin"
              value={org.login}
              onChange={() => setSelectedOrigin(org)}
            />
            {org.login}
          </label>
        ))}

      {/* 팝오버 테스트 */}
      <h2>팝오버 컴포넌트 + 체크박스 컴포넌트 테스트</h2>
      <FilterContainer />

      {/* 인풋 테스트 */}
      <h2>인풋 컴포넌트 테스트</h2>
      <Input placeholder="이름을 입력하세요" />
      {/* 토글 */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('link')}
          className={`rounded-md px-4 py-2 text-sm ${
            mode === 'link' ? 'bg-black text-white' : 'border'
          }`}
        >
          PR 링크 입력
        </button>
        <button
          onClick={() => setMode('select')}
          className={`rounded-md px-4 py-2 text-sm ${
            mode === 'select' ? 'bg-black text-white' : 'border'
          }`}
        >
          PR 불러오기
        </button>
      </div>
      {/* PR 링크 복붙 */}
      {mode === 'link' && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">PR 링크 입력</h2>
          <input
            type="text"
            placeholder="GitHub PR 링크를 붙여넣으세요"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
          <p className="text-xs text-gray-500">
            PR 링크를 붙여넣으면 레포 기준으로 PR을 불러옵니다
          </p>
        </section>
      )}
      {/* PR 불러오기 */}
      {mode === 'select' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">PR 불러오기</h2>
            <button className="rounded-md bg-black px-4 py-2 text-sm text-white">
              repository 선택
            </button>
          </div>

          <input
            type="text"
            placeholder="PR 제목 또는 번호 검색"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          <ul className="space-y-3">
            <li className="flex items-start gap-3 rounded-lg border p-4">
              <input type="radio" name="pr" />
              <div>
                <h3 className="font-medium">PR #123: 로그인 리팩토링</h3>
                <p className="text-sm text-gray-500">owner/repo · Open</p>
              </div>
            </li>

            <li className="flex items-start gap-3 rounded-lg border p-4">
              <input type="radio" name="pr" />
              <div>
                <h3 className="font-medium">PR #122: UI 컴포넌트 정리</h3>
                <p className="text-sm text-gray-500">owner/repo · Merged</p>
              </div>
            </li>
          </ul>
        </section>
      )}
      {/* 문서 생성 옵션 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">문서 생성 옵션</h2>
        <div className="flex flex-wrap gap-2">
          <select className="rounded-md border px-3 py-2 text-sm">
            <option>문서 종류</option>
            <option>블로그</option>
            <option>README</option>
          </select>
          <select className="rounded-md border px-3 py-2 text-sm">
            <option>글 목적</option>
            <option>회고</option>
            <option>트러블슈팅</option>
          </select>
          <select className="rounded-md border px-3 py-2 text-sm">
            <option>톤</option>
            <option>차분한</option>
            <option>멘토 말투</option>
          </select>
        </div>
      </section>
      {/* 문서 생성하기 */}
      <section>
        <button className="w-full rounded-md bg-black py-3 text-sm text-white">
          문서 생성하기
        </button>
      </section>
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
      <Accordion accordion={false}>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>생성된 문서</Accordion.Trigger>
          <Accordion.Content>
            <p className="p-4">아코디언이 아닙니다</p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
