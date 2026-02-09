export const RepoSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 animate-pulse">
          {/* 라디오 버튼 */}
          <div className="w-4 h-4 rounded-full bg-gray-200" />

          {/* 텍스트 */}
          <div className="h-4 bg-gray-200 rounded flex-1 max-w-[200px] mt-2" />
        </div>
      ))}
    </div>
  );
};
