import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ messege: '코드가 없습니다.' }, { status: 400 });
  }

  // 받은 code를 access token으로 교환
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    return NextResponse.json({ messege: '토큰 에러' }, { status: 400 });
  }
  const response = NextResponse.redirect(new URL('/', req.url));

  response.cookies.set({
    name: 'github_access_token',
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  return response;
}
