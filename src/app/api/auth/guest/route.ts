import { NextResponse } from 'next/server';
import { createAccessToken } from '@/shared/auth/createAccessToken';

export async function POST() {
  try {
    const GUEST_USER_ID = '11111111-1111-1111-1111-111111111111';

    const accessToken = createAccessToken({ user_id: GUEST_USER_ID });

    const response = NextResponse.json({ message: '게스트 로그인 성공' }, { status: 200 });

    response.cookies.set({
      name: 'access_token',
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    response.cookies.set({
      name: 'github_token',
      value: '',
      httpOnly: true,
      maxAge: 0, // 즉시 만료
      path: '/',
    });

    return response;
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: '게스트 로그인 처리 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
