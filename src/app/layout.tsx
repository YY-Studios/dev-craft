import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/shared/ui/Header';
import './globals.css';
import { QueryProvider } from '@/shared/providers/QueryProvider';
import { ModalProvider } from '@/shared/ui/modal/ModalProvider';
import { Footer } from '@/shared/ui/Footer';

export const metadata: Metadata = {
  title: '개발자 공방 | PR 기반 문서 자동화 도구',
  description:
    'GitHub PR URL 하나로 블로그 글, README, 영향도 그래프를 자동 생성합니다. Velog 자동 포스팅까지 한 번에.',
  keywords: [
    'PR 문서 자동화',
    '개발 블로그 자동 생성',
    'README 생성기',
    'GitHub PR 분석',
    'AI 문서 생성',
    '개발자 도구',
    'Velog 자동 포스팅',
  ],
  authors: [{ name: 'YY-Studios', url: 'https://github.com/YY-Studios' }],
  openGraph: {
    type: 'website',
    title: '개발자 공방 | PR 기반 문서 자동화 도구',
    description: 'GitHub PR URL 하나로 블로그 글, README, 영향도 그래프를 자동 생성합니다.',
    siteName: '개발자 공방',
    images: [{ url: 'https://dev-craft-lake.vercel.app/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '개발자 공방 | PR 기반 문서 자동화 도구',
    description: 'GitHub PR URL 하나로 블로그 글, README, 영향도 그래프를 자동 생성합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <QueryProvider>
          <ModalProvider>
            <Header />
            <main className="">{children}</main>
            <Footer />
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
