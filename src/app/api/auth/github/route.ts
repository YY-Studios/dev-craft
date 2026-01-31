import { NextResponse } from 'next/server';

export async function GET() {
  const scope = [
    'read:user', // 유저 정보
    'user:email', // 이메일
    'read:org', // 조직 목록
    'repo', // 프라이빗 레포 포함
  ].join(' ');

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: process.env.GITHUB_REDIRECT_URI!,
    scope: scope,
  });
  const githubAuthUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
  return NextResponse.redirect(githubAuthUrl);
}
