import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const githubToken = cookieStore.get('github_token')?.value;

  if (!githubToken) {
    return NextResponse.json({ message: 'GitHub 연결 필요' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const login = searchParams.get('login');
  const type = searchParams.get('type'); // 'user' 또는 'org'

  // orgName 체크
  if (!login || !type) {
    return NextResponse.json({ message: '조직명이 필요합니다' }, { status: 400 });
  }

  const baseUrl =
    type == 'user'
      ? `https://api.github.com/users/${login}/repos`
      : `https://api.github.com/orgs/${login}/repos`;

  // 내가 선택한 조직에 대한 레포지토리 리스트 불러오기
  const repoRes = await fetch(`${baseUrl}?page=${page}&per_page=10`, {
    headers: { Authorization: `Bearer ${githubToken}` },
  });

  const repos = await repoRes.json();
  console.log('여기', repos);

  // Link 헤더에서 totalPages 추출
  const linkHeader = repoRes.headers.get('Link');
  const lastMatch = linkHeader?.match(/page=(\d+)>; rel="last"/);
  const totalPages = lastMatch ? parseInt(lastMatch[1]) : 1;

  return NextResponse.json({
    data: repos,
    totalPages,
  });
}
