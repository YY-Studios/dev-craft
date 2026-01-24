import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/shared/auth/verifyAccessToken';
import { NextResponse } from 'next/server';
import { serverApi } from '@/shared/api/server/serverApi';
import { User } from '@/shared/types/user';
export async function GET() {
  // 쿠키에서 access_token 읽기
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: '로그인이 필요합니다.' }, { status: 401 });
  }

  try {
    // verifyAccessToken으로 토큰 검증
    const { user_id } = verifyAccessToken(accessToken);
    //payload의 user_id로 user 테이블 조회 유저이름도 못뽑고 유저 이멜도 못뽑고 그래짜나요?
    const user = await serverApi<User[]>(`/user?id=eq.${user_id}`);
    //유저 정보 반환
    return NextResponse.json(user[0]);
  } catch (error) {
    console.log('에러:', error);
    return NextResponse.json({ message: '인증이 실패했습니다.' }, { status: 401 });
  }
}
