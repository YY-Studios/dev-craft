interface NoDataProps {
  message?: string;
  description?: string;
  className?: string;
}

export default function NoData({
  message = '표시할 데이터가 없습니다',
  description,
  className = '',
}: NoDataProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-100 py-12 ${className}`}
    >
      <p className="text-sm text-gray-400">{message}</p>
      {description && <p className="mt-1 text-xs text-gray-300">{description}</p>}
    </div>
  );
}
