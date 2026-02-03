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
  const repo = searchParams.get('repo');
  const owner = searchParams.get('owner'); // 'user' 또는 'org'

  // orgName 체크
  if (!repo || !owner) {
    return NextResponse.json({ message: 'owner와 repo가 필요합니다' }, { status: 400 });
  }

  const baseUrl = `https://api.github.com/repos/${owner}/${repo}/pulls`;

  const prRes = await fetch(`${baseUrl}?state=all`, {
    headers: { Authorization: `Bearer ${githubToken}` },
  });

  const pulls = await prRes.json();

  const linkHeader = prRes.headers.get('Link');

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

  return NextResponse.json({
    data: pulls,
    totalPages,
  });
}
