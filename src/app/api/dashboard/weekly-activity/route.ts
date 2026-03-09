import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/shared/auth/verifyAccessToken';
import { NextResponse } from 'next/server';
import { serverApi } from '@/shared/api/server/serverApi';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  if (!accessToken) return NextResponse.json([], { status: 401 });

  const { user_id } = verifyAccessToken(accessToken);

  const data = await serverApi<{ created_at: string }[]>(
    `/analyses?user_id=eq.${user_id}&select=created_at&order=created_at.desc`,
  );

  // 최근 7일 날짜별 count
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const result = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().slice(0, 10);
    const day = days[date.getDay()];
    const count = data.filter((d) => d.created_at.slice(0, 10) === dateStr).length;
    return { day, count };
  });

  return NextResponse.json(result);
}
