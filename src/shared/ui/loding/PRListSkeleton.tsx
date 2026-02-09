export const PRListSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 border-2 border-gray-200 rounded-lg animate-pulse">
          <div className="flex items-start gap-3">
            {/* 라디오 버튼 */}
            <div className="w-5 h-5 rounded-full bg-gray-200 mt-1" />

            <div className="flex-1 space-y-2">
              {/* PR 제목 */}
              <div className="h-5 bg-gray-200 rounded w-3/4" />

              {/* PR 정보 */}
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
