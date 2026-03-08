export const PostsSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex-1 border border-gray-300 rounded-lg p-6 animate-pulse bg-white"
        >
          {/* 상단: 아바타 및 레포 정보 */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200" />
            <div className="space-y-1.5">
              <div className="h-3 w-32 bg-gray-300 rounded" />
              <div className="h-2 w-20 bg-gray-300 rounded" />
            </div>
          </div>

          {/* 중간: 제목 및 본문 */}
          <div className="mt-6 space-y-4">
            {/* 더미 이미지 영역 (필요 시) */}
            <div className="w-full h-40 bg-gray-50 rounded-md" />

            {/* 제목 */}
            <div className="h-6 w-3/4 bg-gray-200 rounded" />

            {/* 본문 (2줄) */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-300 rounded" />
              <div className="h-4 w-5/6 bg-gray-300 rounded" />
            </div>

            {/* 태그 영역 */}
            <div className="flex gap-2">
              <div className="h-6 w-12 bg-gray-300 rounded-full" />
              <div className="h-6 w-16 bg-gray-300 rounded-full" />
              <div className="h-6 w-10 bg-gray-300 rounded-full" />
            </div>

            {/* 하단 아이콘 (좋아요/댓글) */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-4 w-8 bg-gray-300 rounded" />
              <div className="h-4 w-8 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
