'use client';

import { useState } from 'react';
import Input from '@/shared/ui/input/Input';

import { FilterContainer } from './../../features/prompt-filter/ui/FilterContainer';
export default function DevPage() {
  const [mode, setMode] = useState<'link' | 'select'>('link');

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 space-y-10">
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
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">PR 변경 영향도</h2>

        <div className="rounded-md border p-6 text-sm text-gray-500">변경 영향도 시각화 영역</div>
      </section>
      {/* 생성된 문서 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">생성된 문서</h2>

        <div className="rounded-md border p-6 text-sm text-gray-500">생성된 문서</div>
      </section>
    </div>
  );
}
