import { z } from 'zod';
import { cookies } from 'next/headers';
import { ApiError } from './../error/ApiError';

// serverApi 옵션 타입 정의
interface RequestConfig<T = unknown> {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  cache?: RequestCache;
  schema?: z.ZodType<T>;
  useAuth?: boolean;
  apiType?: 'rest' | 'auth';
}

export async function serverApi<T>(path: string, config: RequestConfig<T> = {}): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    cache = 'no-store',
    schema,
    useAuth = false,
    apiType = 'rest',
  } = config;

  // API 타입에 따른 base URL
  const baseUrl =
    apiType === 'auth'
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/v1`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/rest/v1`;

  // 사용자 토큰 가져오기
  let authHeader = `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`;

  if (useAuth) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      throw new ApiError(401, 'Unauthorized');
    }
    authHeader = `Bearer ${accessToken}`;
  }

  // fetch에 넘길 옵션 객체 생성
  const fetchOptions: RequestInit = {
    method,
    cache,
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: authHeader,
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
      console.error('Schema validation failed:', result.error.flatten());
      throw new ApiError(500, 'Response validation failed');
    }
    return result.data;
  }

  return data as T;
}
