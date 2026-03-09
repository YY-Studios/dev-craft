import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/shared/auth/verifyAccessToken';
import { NextRequest, NextResponse } from 'next/server';
import { serverApi } from '@/shared/api/server/serverApi';

async function getUserId() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  if (!accessToken) return null;
  const { user_id } = verifyAccessToken(accessToken);
  return user_id;
}

type Like = { id: string; user_id: string; analysis_id: string };

// 좋아요 수 + 내가 눌렀는지
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user_id = await getUserId();

  const likes = await serverApi<Like[]>(`/likes?analysis_id=eq.${id}`);

  return NextResponse.json({
    count: likes.length,
    isLiked: user_id ? likes.some((l) => l.user_id === user_id) : false,
  });
}

// 좋아요 추가
export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user_id = await getUserId();
  if (!user_id) return NextResponse.json({ message: '인증이 필요합니다.' }, { status: 401 });

  try {
    await serverApi('/likes', {
      method: 'POST',
      body: { analysis_id: id, user_id },
    });
    // likes_count +1
    await serverApi(`/rpc/increment_likes`, {
      method: 'POST',
      body: { analysis_id: id },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ message: '좋아요에 실패했습니다.' }, { status: 500 });
  }
}

// 좋아요 취소
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user_id = await getUserId();
  if (!user_id) return NextResponse.json({ message: '인증이 필요합니다.' }, { status: 401 });

  try {
    await serverApi(`/likes?analysis_id=eq.${id}&user_id=eq.${user_id}`, {
      method: 'DELETE',
    });
    // likes_count -1
    await serverApi(`/rpc/decrement_likes`, {
      method: 'POST',
      body: { analysis_id: id },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ message: '좋아요 취소에 실패했습니다.' }, { status: 500 });
  }
}
