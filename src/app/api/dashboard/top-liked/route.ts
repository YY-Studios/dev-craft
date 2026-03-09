import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/shared/auth/verifyAccessToken';
import { NextResponse } from 'next/server';
import { serverApi } from '@/shared/api/server/serverApi';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  if (!accessToken) return NextResponse.json([], { status: 401 });

  const { user_id } = verifyAccessToken(accessToken);

  const data = await serverApi<{ id: string; title: string; likes_count: number }[]>(
    `/analyses?user_id=eq.${user_id}&select=id,title,likes_count,users(username)&order=likes_count.desc&limit=3`,
  );

  return NextResponse.json(data);
}
