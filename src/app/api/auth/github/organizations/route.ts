import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export async function GET() {
  const cookieStore = await cookies();
  const githubToken = cookieStore.get('github_token')?.value;

  if (!githubToken) {
    return NextResponse.json({ message: 'GitHub 연결 필요' }, { status: 401 });
  }

  // github 내 정보
  const userRes = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${githubToken}` },
  });
  const user = await userRes.json();

  // github 내가 속한 조직들
  const orgsRes = await fetch('https://api.github.com/user/orgs', {
    headers: { Authorization: `Bearer ${githubToken}` },
  });

  const orgs = await orgsRes.json();

  return NextResponse.json([
    { type: 'user', login: user.login, avatar_url: user.avatar_url },
    ...orgs.map((org: any) => ({
      type: 'org',
      login: org.login,
      avatar_url: org.avatar_url,
    })),
  ]);
}
