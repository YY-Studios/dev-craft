'use client';

import Input from '@/shared/ui/input/Input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const FeedSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('q') ?? '');

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (inputValue) params.set('q', inputValue);
      else params.delete('q');
      router.replace(`/feed?${params.toString()}`);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div>
      <Input
        type="text"
        placeholder="제목 또는 태그 검색"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};
