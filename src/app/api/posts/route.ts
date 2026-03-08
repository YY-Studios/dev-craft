import { ProjectWithAnalyses } from '@/features/posts/model/posts';
import { serverApi } from '@/shared/api/server/serverApi';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { message: '조회할 유저네임(username)이 필요합니다.' },
      { status: 400 },
    );
  }
  try {
    const data = await serverApi<ProjectWithAnalyses[]>(
      `/projects?select=id,repo_name,repo_owner,user_id,analyses!inner(*,users!inner(username,avatar_url))&analyses.users.username=eq.${username}`,
    );

    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: '데이터 조회에 실패했습니다.' }, { status: 500 });
  }
}
