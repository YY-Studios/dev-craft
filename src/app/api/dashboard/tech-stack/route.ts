import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/shared/auth/verifyAccessToken';
import { NextResponse } from 'next/server';
import { serverApi } from '@/shared/api/server/serverApi';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  if (!accessToken) return NextResponse.json([], { status: 401 });

  const { user_id } = verifyAccessToken(accessToken);

  const data = await serverApi<{ subject: string; value: number }[]>(`/rpc/get_tech_stack`, {
    method: 'POST',
    body: { p_user_id: user_id },
  });

  return NextResponse.json(data);
}
