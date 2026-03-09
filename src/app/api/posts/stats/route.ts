import { serverApi } from '@/shared/api/server/serverApi';
import { NextResponse } from 'next/server';

interface ProjectStatResponse {
  repo_name: string;
  analyses: {
    id: string;
    users: {
      username: string;
    };
  }[];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ message: '조회할 유저네임이 필요합니다.' }, { status: 400 });
  }

  try {
    const path = `/projects?select=repo_name,analyses!inner(id,users!inner(username))&analyses.users.username=eq.${username}`;

    const data = await serverApi<ProjectStatResponse[]>(path);
    const stats = data.map((project) => ({
      repo_name: project.repo_name,
      count: project.analyses.length,
    }));

    return NextResponse.json(stats);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: '통계 조회에 실패했습니다.' }, { status: 500 });
  }
}
