import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const body = await request.json();
  if (!webhookUrl) {
    return Response.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  const n8nRes = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!n8nRes.ok) {
    return NextResponse.json(
      { message: '현재 서버를 정비 중이에요. 조금만 기다려 주세요 😊' },
      { status: n8nRes.status },
    );
  }

  const data = await n8nRes.json();

  return NextResponse.json(data);
}
