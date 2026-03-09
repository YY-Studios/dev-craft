export default function PostDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse">
      <div className="flex gap-2 mb-3">
        <div className="h-6 w-16 rounded-full bg-zinc-200" />
        <div className="h-6 w-20 rounded-full bg-zinc-200" />
      </div>

      <div className="h-8 w-2/3 rounded bg-zinc-200 mb-4" />

      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="w-7 h-7 rounded-full bg-zinc-200" />
        <div className="flex flex-col gap-2">
          <div className="h-3 w-20 rounded bg-zinc-200" />
          <div className="h-3 w-16 rounded bg-zinc-200" />
        </div>
        <div className="ml-auto h-4 w-10 rounded bg-zinc-200" />
      </div>

      <div className="space-y-3 mb-6 pb-6 border-b border-zinc-100">
        <div className="h-4 w-full rounded bg-zinc-200" />
        <div className="h-4 w-[92%] rounded bg-zinc-200" />
        <div className="h-4 w-[85%] rounded bg-zinc-200" />
        <div className="h-4 w-[70%] rounded bg-zinc-200" />
      </div>
    </div>
  );
}
