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
  const orgsRes = await fetch(`https://api.github.com/user/orgs?page=${page}&per_page=4`, {
    headers: { Authorization: `Bearer ${githubToken}` },
  });

  const orgs = await orgsRes.json();

  // Link 헤더에서 마지막 페이지 번호 추출
  const linkHeader = orgsRes.headers.get('Link');

  let totalPages = 1;

  if (linkHeader) {
    //  page= 뒤의 숫자만 찾고, 그 뒤에 뭐가 오든 상관없이
    const lastMatch = linkHeader.match(/page=(\d+)[^>]*>;\s*rel="last"/);

    if (lastMatch) {
      totalPages = parseInt(lastMatch[1]);
    } else if (linkHeader.includes('rel="prev"')) {
      const prevMatch = linkHeader.match(/page=(\d+)[^>]*>;\s*rel="prev"/);
      if (prevMatch) {
        totalPages = parseInt(prevMatch[1]) + 1;
      }
    }
  }

  // pagination 정보 포함해서 응답
  return NextResponse.json({
    data: [
      ...(page === '1'
        ? [{ type: 'user' as const, login: user.login, avatar_url: user.avatar_url }]
        : []),
      ...orgs.map((org: any) => ({
        type: 'org',
        login: org.login,
        avatar_url: org.avatar_url,
      })),
    ],
    totalPages, // 전체 페이지 수
  });
}
