import { ProjectWithAnalyses } from '@/features/posts/model/posts';
import { serverApi } from '@/shared/api/server/serverApi';
import { verifyAccessToken } from '@/shared/auth/verifyAccessToken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: '로그인이 필요합니다.' }, { status: 401 });
  }
  try {
    const { user_id } = verifyAccessToken(accessToken);
    const data = await serverApi<ProjectWithAnalyses[]>(
      `/projects?user_id=eq.${user_id}&select=id,repo_name,repo_owner,user_id,analyses(*)`,
    );

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ message: '데이터 조회에 실패했습니다.' }, { status: 500 });
  }
}
