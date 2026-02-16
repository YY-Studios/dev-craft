import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyAccessToken } from '@/shared/auth/verifyAccessToken';
import { serverApi } from '@/shared/api/server/serverApi';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: '로그인이 필요합니다.' }, { status: 401 });
  }

  try {
    const { user_id } = verifyAccessToken(accessToken);
    console.log(user_id);
    const data = await serverApi(`/saved_filters?user_id=eq.${user_id}&select=id,name,filters`);
    return NextResponse.json(data);
  } catch (error) {
    console.log('에러', error);
    return NextResponse.json(
      { message: '데이터 불러오는데 실패했습니다.Accordion' },
      { status: 401 },
    );
  }
}
