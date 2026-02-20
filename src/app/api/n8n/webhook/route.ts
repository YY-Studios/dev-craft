import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Upstash Redis 연결
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
const limitCount = 5;
// 24시간 슬라이딩 윈도우로 IP당 5회 제한
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(limitCount, '24 h'),
  analytics: true,
});

// 환경변수에서 어드민 GitHub ID 목록 파싱 (쉼표 구분)
const ADMIN_GITHUB_IDS = process.env.ADMIN_GITHUB_IDS?.split(',') ?? [];

// 요청 IP 추출 (Vercel은 x-forwarded-for 헤더에 IP가 들어옴)
function getIP(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const body = await request.json();

  // body에 담긴 githubUserId가 어드민 목록에 있으면 rate limit 스킵
  const isAdmin = body.githubUserId && ADMIN_GITHUB_IDS.includes(String(body.githubUserId));

  if (!isAdmin) {
    // 어드민 아닐 때만 rate limit 체크
    const ip = getIP(request);
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      // 한도 초과 시 429 반환
      return NextResponse.json(
        { error: `하루 요청 한도(${limitCount}회)를 초과했습니다. 내일 다시 시도해주세요.` },
        { status: 429 },
      );
    }
  }

  if (!webhookUrl) {
    return Response.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  const n8nRes = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!n8nRes.ok) {
    return NextResponse.json({ message: 'n8n 요청 실패' }, { status: n8nRes.status });
  }

  const data = await n8nRes.json();

  return NextResponse.json(data);
}
