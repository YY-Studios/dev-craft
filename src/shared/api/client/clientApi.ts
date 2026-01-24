import { ApiError } from '@/shared/api/error/ApiError';

export async function clientApi<T>(path: string): Promise<T> {
  const res = await fetch(`/api/${path}`, {
    // 로그인 쿠키를 API 요청에 같이 실어 보내는 옵션
    credentials: 'include',
  });

  if (!res.ok) {
    const raw = await res.text();
    let message = 'Request failed';

    if (raw) {
      try {
        const data = JSON.parse(raw) as { message?: string };
        message = data.message ?? message;
      } catch {
        message = raw;
      }
    }

    throw new ApiError(res.status, message);
  }

  return res.json();
}
