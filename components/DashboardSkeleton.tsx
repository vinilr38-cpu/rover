export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse">
      {/* Title Placeholder */}
      <div className="h-8 w-64 bg-zinc-800/50 rounded-md"></div>
      
      {/* KPI Cards Skeleton Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 bg-zinc-950/50 border border-white/5 rounded-xl h-28 flex flex-col justify-between">
            <div className="h-4 w-24 bg-zinc-800/50 rounded"></div>
            <div className="h-8 w-16 bg-zinc-800/50 rounded"></div>
          </div>
        ))}
      </div>

      {/* Main Chart Skeleton */}
      <div className="h-[400px] w-full bg-zinc-950/50 border border-white/5 rounded-xl p-4">
        <div className="h-6 w-48 bg-zinc-800/50 rounded mb-6"></div>
        <div className="h-full w-full bg-zinc-900/30 rounded-lg"></div>
      </div>
    </div>
  );
}
