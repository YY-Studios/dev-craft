import { ProjectWithAnalyses } from '@/features/posts/model/posts';
import { serverApi } from '@/shared/api/server/serverApi';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');
  const cursor = searchParams.get('cursor') ?? '';
  const repo = searchParams.get('repo') ?? 'all';
  const PAGE_SIZE = 10;

  if (!username) {
    return NextResponse.json(
      { message: '조회할 유저네임(username)이 필요합니다.' },
      { status: 400 },
    );
  }
  try {
    let path = `/analyses?select=*,projects!inner(id,repo_name,repo_owner),users!inner(username,avatar_url)&users.username=eq.${username}&order=created_at.desc&limit=${PAGE_SIZE}`;

    if (cursor) {
      path += `&created_at=lt.${encodeURIComponent(cursor)}`;
    }

    if (repo !== 'all') {
      path += `&projects.repo_name=eq.${repo}`;
    }

    const data = await serverApi(path);

    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: '데이터 조회에 실패했습니다.' }, { status: 500 });
  }
}
