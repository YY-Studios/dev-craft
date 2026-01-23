import { ApiError } from '../error/ApiError';
export async function serverApi<T>(path: string): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/rest/v1/${path}`, {
    cache: 'no-store',
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY || ''}`,
    },
  });
  if (!res.ok) {
    throw new ApiError(res.status, await res.text());
  }
  return res.json();
}
