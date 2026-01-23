// src/app/api/auth/github/callback/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // 여기에 GitHub 콜백 로직을 구현할 예정
  return NextResponse.json({ message: 'GitHub Callback' });
}
