import { serverApi } from '@/shared/api/server/serverApi';
import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/shared/auth/verifyAccessToken';

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
const cookieStore = await cookies();
const accessToken = cookieStore.get('access_token')?.value;

if (!accessToken) {
return NextResponse.json({ message: '로그인이 필요합니다.' }, { status: 401 });
}
try {
const { user_id } = verifyAccessToken(accessToken);
const { id } = await context.params;
const numericId = Number(id);

    await serverApi(`saved_filters?id=eq.${numericId}&user_id=eq.${user_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json({ ok: true });

} catch (e) {
console.log(e);
return NextResponse.json({ message: '데이터 삭제에 실패했습니다.' }, { status: 401 });
}
}
