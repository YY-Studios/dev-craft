'use client';

import { useState } from 'react';

const TABS = ['인기', '최신', '피드'];

export const FeedTap = () => {
  const [activeTab, setActiveTab] = useState('인기');

  return (
    <>
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer relative ${
            activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {tab}
          {activeTab === tab && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
          )}
        </button>
      ))}
    </>
  );
};
