import { NextRequest, NextResponse } from 'next/server';
import { getGithubUserByToken } from '@/shared/api/server/github';
import { serverApi } from '@/shared/api/server/serverApi';
import { User } from '@/shared/types/user';
import { createAccessToken } from '@/shared/auth/createAccessToken';

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
  const { access_token: github_access_token } = await tokenRes.json();

  if (!github_access_token) {
    return NextResponse.json({ messege: '토큰 에러' }, { status: 400 });
  }

  // access token으로 GitHub 사용자 정보 가져오기
  const githubUser = await getGithubUserByToken(github_access_token);
  console.log('githubUser:', githubUser);

  // 여기서 githubUser를다시하자
  const users = await serverApi<User[]>('/user?on_conflict=github_user_id', {
    method: 'POST',
    headers: {
      Prefer: 'resolution=merge-duplicates,return=representation', // insert 후 생성된 row 반환
    },
    body: {
      github_user_id: githubUser.id,
      username: githubUser.login,
      avatar_url: githubUser.avatar_url,
      email: githubUser.email ?? null,
    },
  });

  const user = users[0];
  const accessToken = createAccessToken({ user_id: user.id });

  const response = NextResponse.redirect(new URL('/', req.url));

  response.cookies.set({
    name: 'access_token',
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  response.cookies.set({
    name: 'github_token',
    value: github_access_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
