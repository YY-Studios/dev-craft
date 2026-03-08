'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const TABS = [
  { label: '최신', value: 'latest' },
  { label: '인기', value: 'popular' },
];

export const FeedTap = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('sort') ?? 'latest';

  const handleTab = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.replace(`/feed?${params.toString()}`);
  };

  return (
    <>
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTab(tab.value)}
          className={`px-4 py-2.5 text-xl font-medium transition-colors cursor-pointer relative ${
            activeTab === tab.value ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {tab.label}
          {activeTab === tab.value && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
          )}
        </button>
      ))}
    </>
  );
};
