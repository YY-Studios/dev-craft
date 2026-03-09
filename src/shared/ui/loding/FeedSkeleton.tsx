export const FeedSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 gap-5 mt-5 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-6 bg-white animate-pulse">
          <div className="h-6 w-3/4 max-w-md bg-gray-200 rounded mb-3" />

          <div className="space-y-2 mb-4">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
          </div>

          <div className="h-3 w-20 bg-gray-200 rounded mb-4" />

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-300 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
            <div className="h-4 w-8 bg-gray-200 rounded" />
          </div>

          {/* 5. 태그 영역 */}
          <div className="flex items-center gap-2">
            <div className="h-7 w-16 bg-gray-100 rounded-full" />
            <div className="h-7 w-12 bg-gray-100 rounded-full" />
            <div className="h-7 w-20 bg-gray-100 rounded-full" />
            <div className="h-7 w-14 bg-gray-100 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
