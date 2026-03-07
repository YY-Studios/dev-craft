import { NextRequest, NextResponse } from 'next/server';
import { serverApi } from '@/shared/api/server/serverApi';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/shared/auth/verifyAccessToken';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: '로그인이 필요합니다.' }, { status: 401 });
  }
  try {
    const { user_id } = verifyAccessToken(accessToken);
    const { title, prUrl, document, tags, repo_owner, repo_name } = await req.json();

    const projects = await serverApi<{ id: string }[]>(
      `/projects?on_conflict=user_id,repo_name,repo_owner`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates,return=representation',
        },
        body: {
          user_id: user_id,
          repo_owner: repo_owner,
          repo_name: repo_name,
        },
      },
    );

    await serverApi(`/analyses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: {
        project_id: projects[0].id,
        user_id: user_id,
        title: title,
        pr_url: prUrl,
        content: document,
        tags: tags,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: '저장 실패' }, { status: 500 });
  }
}
