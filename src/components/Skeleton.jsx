export function SkeletonCard() {
  return (
    <div className="card-premium p-5 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-[14px] bg-white/5" />
        <div className="w-16 h-6 rounded-lg bg-white/5" />
      </div>
      <div className="w-20 h-2.5 rounded bg-white/5 mb-3" />
      <div className="w-14 h-8 rounded bg-white/5 mb-1" />
      <div className="w-24 h-2 rounded bg-white/5" />
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 6 }) {
  return (
    <div className="space-y-3 p-5">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 animate-pulse">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-4 rounded bg-white/5" style={{ width: `${100 / cols}%` }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex gap-4">
        {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-premium p-5 animate-pulse">
          <div className="w-40 h-5 rounded bg-white/5 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-full h-8 rounded bg-white/5" />
              </div>
            ))}
          </div>
        </div>
        <div className="card-premium p-5 animate-pulse">
          <div className="w-40 h-5 rounded bg-white/5 mb-4" />
          <div className="w-48 h-48 rounded-full bg-white/5 mx-auto" />
        </div>
      </div>
    </div>
  );
}
