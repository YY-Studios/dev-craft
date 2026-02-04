import { ApiError } from '@/shared/api/error/ApiError';

interface ClientApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
}

export async function clientApi<T>(path: string, options?: ClientApiOptions): Promise<T> {
  const res = await fetch(`/api/${path}`, {
    method: options?.method ?? 'GET',
    credentials: 'include',
    headers: options?.body ? { 'Content-Type': 'application/json' } : undefined,
    body: options?.body ? JSON.stringify(options.body) : undefined,
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
