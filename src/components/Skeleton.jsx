export function SkeletonCard() {
  return (
    <div className="card-premium p-5 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-white/5 dark:bg-white/5" style={{ background: "var(--color-border-subtle)" }} />
        <div className="w-16 h-6 rounded-lg" style={{ background: "var(--color-border-subtle)" }} />
      </div>
      <div className="w-20 h-2.5 rounded mb-3" style={{ background: "var(--color-border-subtle)" }} />
      <div className="w-14 h-8 rounded mb-1" style={{ background: "var(--color-border-subtle)" }} />
      <div className="w-24 h-2 rounded" style={{ background: "var(--color-border-subtle)" }} />
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 6 }) {
  return (
    <div className="card-premium p-5 animate-pulse">
      <div className="flex gap-4 mb-4">
        {Array.from({ length: cols }).map((_, j) => (
          <div key={j} className="h-3 rounded" style={{ width: `${100 / cols}%`, background: "var(--color-border-subtle)" }} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-3 border-b" style={{ borderColor: "var(--color-border-subtle)" }}>
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-3.5 rounded" style={{ width: `${100 / cols}%`, background: "var(--color-border-subtle)" }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="w-64 h-6 rounded" style={{ background: "var(--color-border-subtle)" }} />
          <div className="w-44 h-3 rounded" style={{ background: "var(--color-border-subtle)" }} />
        </div>
        <div className="w-28 h-9 rounded-xl" style={{ background: "var(--color-border-subtle)" }} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card-premium p-5 animate-pulse">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 rounded" style={{ background: "var(--color-border-subtle)" }} />
            <div className="w-40 h-4 rounded" style={{ background: "var(--color-border-subtle)" }} />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-end gap-3">
                <div className="w-10 rounded-t" style={{ height: `${40 + Math.random() * 80}px`, background: "var(--color-border-subtle)" }} />
                <div className="w-10 rounded-t" style={{ height: `${30 + Math.random() * 60}px`, background: "var(--color-border-subtle)" }} />
              </div>
            ))}
          </div>
        </div>
        <div className="card-premium p-5 animate-pulse">
          <div className="w-40 h-4 rounded mb-4" style={{ background: "var(--color-border-subtle)" }} />
          <div className="w-40 h-40 rounded-full mx-auto" style={{ background: "var(--color-border-subtle)" }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card-premium animate-pulse">
          <div className="px-5 py-4 border-b" style={{ borderColor: "var(--color-border-subtle)" }}>
            <div className="w-48 h-4 rounded" style={{ background: "var(--color-border-subtle)" }} />
          </div>
          <SkeletonTable rows={5} cols={7} />
        </div>
        <div className="card-premium p-5 animate-pulse">
          <div className="w-36 h-4 rounded mb-5" style={{ background: "var(--color-border-subtle)" }} />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3 py-3" style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
              <div className="w-8 h-8 rounded-xl shrink-0" style={{ background: "var(--color-border-subtle)" }} />
              <div className="flex-1 space-y-2">
                <div className="w-full h-3 rounded" style={{ background: "var(--color-border-subtle)" }} />
                <div className="w-2/3 h-2 rounded" style={{ background: "var(--color-border-subtle)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
