import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// GET() → GET(request: Request) - page 받기 위해
export async function GET(request: Request) {
  const cookieStore = await cookies();
  const githubToken = cookieStore.get('github_token')?.value;

  if (!githubToken) {
    return NextResponse.json({ message: 'GitHub 연결 필요' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  // github 내 정보
  const userRes = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${githubToken}` },
  });
  const user = await userRes.json();

  // github 내가 속한 조직들
  const orgsRes = await fetch(`https://api.github.com/user/orgs?page=${page}&per_page=10`, {
    headers: { Authorization: `Bearer ${githubToken}` },
  });

  const orgs = await orgsRes.json();

  // 추가: Link 헤더에서 마지막 페이지 번호 추출
  const linkHeader = orgsRes.headers.get('Link');
  const lastMatch = linkHeader?.match(/page=(\d+)>; rel="last"/);
  const totalPages = lastMatch ? parseInt(lastMatch[1]) : 1;

  // 수정: pagination 정보 포함해서 응답
  return NextResponse.json({
    data: [
      { type: 'user', login: user.login, avatar_url: user.avatar_url },
      ...orgs.map((org: any) => ({
        type: 'org',
        login: org.login,
        avatar_url: org.avatar_url,
      })),
    ],
    totalPages, // 추가: 전체 페이지 수
  });
}
