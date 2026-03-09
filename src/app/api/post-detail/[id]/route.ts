import { postResponse } from '@/features/post-detail/model/type';
import { serverApi } from '@/shared/api/server/serverApi';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const data = await serverApi<postResponse[]>(
      `/analyses?id=eq.${id}&select=*,users(username,avatar_url)&limit=1`,
    );
    return NextResponse.json(data[0]);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: '데이터 조회에 실패했습니다.' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await serverApi(`/analyses?id=eq.${id}`, { method: 'DELETE' });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: '삭제에 실패했습니다.' }, { status: 500 });
  }
}
