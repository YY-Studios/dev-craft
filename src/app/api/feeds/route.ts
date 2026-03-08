import { serverApi } from '@/shared/api/server/serverApi';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // URL에서 ?q=React 부분을 다루는 객체 꺼내기
  const { searchParams } = new URL(req.url);
  // q 값 추출, 검색어 없으면 빈 문자열
  const query = searchParams.get('q') ?? '';

  try {
    // Supabase REST API 문법: title에 React 포함된 것만 줘
    const filter = query ? `&title=ilike.*${query}*` : '';

    const data = await serverApi(
      `/analyses?select=id,title,content,thumbnail_url,likes_count,created_at,tags,is_author_verified,users(username,avatar_url)&visibility=eq.true&order=created_at.desc${filter}`,
    );

    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: '데이터 조회에 실패했습니다.' }, { status: 500 });
  }
}
