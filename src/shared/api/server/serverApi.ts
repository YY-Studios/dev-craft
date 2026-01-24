import { z } from 'zod';
import { ApiError } from './../error/ApiError';

// serverApi 옵션 타입 정의
interface RequestConfig<T = unknown> {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  cache?: RequestCache;
  schema?: z.ZodType<T>;
}

export async function serverApi<T>(path: string, config: RequestConfig<T> = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, cache = 'no-store', schema } = config;

  // base URL
  const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/rest/v1`;

  // fetch에 넘길 옵션 객체 생성
  const fetchOptions: RequestInit = {
    method,
    cache,
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      ...headers,
    },
  };

  if (body !== undefined) {
    fetchOptions.body = JSON.stringify(body);
  }

  const res = await fetch(`${baseUrl}${path}`, fetchOptions);

  if (!res.ok) {
    const errorBody = await res.text();
    throw new ApiError(res.status, errorBody);
  }

  // No Content 응답 대응
  if (res.status === 204) return null as T;

  const data = await res.json();

  // 스키마 검증
  if (schema) {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new ApiError(500, 'Response validation failed');
    }
    return result.data;
  }

  return data as T;
}
