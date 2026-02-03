'use client';

import Input from '@/shared/ui/input/Input';
import { useEffect, useState } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  debounceMs?: number;
}

export const PullRequsetSearch = ({ onSearch, debounceMs = 300 }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue);
    }, debounceMs);

    // 이전 타이머 취소
    return () => clearTimeout(timer);
  }, [inputValue, debounceMs, onSearch]);

  return (
    <div>
      <Input
        type="text"
        placeholder="PR 제목 또는 번호 검색"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};
