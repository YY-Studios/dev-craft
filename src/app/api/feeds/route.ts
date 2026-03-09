import { serverApi } from '@/shared/api/server/serverApi';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') ?? '';
  const sort = searchParams.get('sort') ?? 'latest';
  const cursor = searchParams.get('cursor') ?? '';
  const offset = searchParams.get('offset') ?? '0';
  const PAGE_SIZE = 2;
  try {
    let filter = '';
    if (query) {
      const safeQuery = encodeURIComponent(query);

      filter = `&or=(title.ilike.*${safeQuery}*,tags_text.ilike.*${safeQuery}*)`;
    }

    const base = `id,title,content,thumbnail_url,likes_count,created_at,tags,is_author_verified,users(username,avatar_url)`;

    let path = '';

    if (sort === 'latest') {
      const cursorFilter = cursor ? `&created_at=lt.${encodeURIComponent(cursor)}` : '';
      path = `/analyses?select=${base}&visibility=eq.true&order=created_at.desc&limit=${PAGE_SIZE}${filter}${cursorFilter}`;
    } else {
      path = `/analyses?select=${base}&visibility=eq.true&order=likes_count.desc&limit=${PAGE_SIZE}&offset=${offset}${filter}`;
    }

    const data = await serverApi(path);
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: '데이터 조회에 실패했습니다.' }, { status: 500 });
  }
}
