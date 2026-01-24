import { ApiError } from '@/shared/api/error/ApiError';

export async function clientApi<T>(path: string): Promise<T> {
  const res = await fetch(`/api/${path}`, {
    // 로그인 쿠키를 API 요청에 같이 실어 보내는 옵션
    credentials: 'include',
  });

  if (!res.ok) {
    let message = 'Request failed';

    try {
      const data = await res.json();
      message = data.message ?? message;
    } catch {
      message = await res.text();
    }

    throw new ApiError(res.status, message);
  }

  return res.json();
}
