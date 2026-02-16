import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/shared/auth/verifyAccessToken';
import { serverApi } from '@/shared/api/server/serverApi';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: '로그인이 필요합니다.' }, { status: 401 });
  }

  try {
    const { user_id } = verifyAccessToken(accessToken);
    const { name, filters } = await req.json();
    console.log(user_id, name, filters);

    await serverApi('/saved_filters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: {
        user_id: user_id,
        name: name,
        filters: filters,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: '저장 실패' }, { status: 500 });
  }
}
