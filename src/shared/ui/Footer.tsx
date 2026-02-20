import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full py-8 border-t border-gray-200 text-gray-500 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center gap-4">
        {/* 약관 및 정책 링크 영역 */}
        <nav className="flex items-center gap-4 text-xs font-medium">
          <Link href="/privacy" className="hover:text-gray-900 transition-colors">
            개인정보처리방침
          </Link>
          <span className="w-px h-3 bg-gray-300" /> {/* 세로 구분선 */}
          <Link href="/terms" className="hover:text-gray-900 transition-colors">
            이용약관
          </Link>
        </nav>

        {/* 하단 카피라이트 및 안내 문구 */}
        <div className="text-center space-y-1">
          <p className="text-[10px] text-gray-400">
            본 서비스는 사용자 본인의 GitHub PR 분석을 돕기 위한 도구이며, 데이터를 별도로 저장하지
            않습니다.
          </p>
          <p className="text-xs">© {new Date().getFullYear()} **DevCraft**. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
