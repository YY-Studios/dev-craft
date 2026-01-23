import { NextResponse } from 'next/server';

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: process.env.GITHUB_REDIRECT_URI!,
    scope: 'read:user user:email',
  });
  const githubAuthUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
  return NextResponse.redirect(githubAuthUrl);
}
