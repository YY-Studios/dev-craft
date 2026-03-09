import Button from '@/shared/ui/Button';
import Errorlogo from '@/shared/assets/icons/icon_error_logo.svg';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="container--sm text-center">
      {/* 로고 + 404 나란히 */}
      <div className="mb-8 flex items-center justify-center gap-3">
        <div className="relative h-28 w-28 flex-shrink-0 opacity-40">
          <Image src={Errorlogo} alt="Error logo" fill className="object-contain" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 sm:text-7xl md:text-8xl">404</h1>
      </div>

      {/* 설명 텍스트 */}
      <p className="mb-3 text-lg font-semibold text-gray-700 md:text-xl">
        페이지를 찾을 수 없습니다
      </p>
      <p className="mb-10 text-sm text-gray-500 md:text-base">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>

      {/* 버튼 */}
      <Button as="link" href="/" className="gap-2">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        홈으로 돌아가기
      </Button>
    </div>
  );
}
