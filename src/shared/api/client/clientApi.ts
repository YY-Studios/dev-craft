import { ApiError } from '@/shared/api/error/ApiError';

/**
 * 지정된 서버 API 경로에 쿠키를 포함한 요청을 보내고 응답을 제네릭 타입으로 반환합니다.
 *
 * 요청이 실패하면 응답 본문에서 가능한 오류 메시지를 추출하여 ApiError를 던집니다.
 *
 * @param path - 서버의 상대 API 경로 (예: "users/123")
 * @returns 응답 본문을 파싱한 결과를 제네릭 타입 `T`로 반환합니다
 * @throws {ApiError} HTTP 상태 코드와 서버가 제공한 또는 원시 응답 텍스트를 포함한 오류
 */
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