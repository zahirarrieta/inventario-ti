export default function StatCard({ icon: Icon, value, label, description, color = "#0FDBF2", trend, trendDir = "up", delay = 0 }) {
  return (
    <div
      className="card-premium stat-card animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="stat-card-accent" style={{ background: color }} />

      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${color}22` }}
        >
          <Icon size={22} style={{ color }} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
            trendDir === "up" ? "text-success bg-success/10" : "text-danger bg-danger/10"
          }`}>
            {trendDir === "up" ? "↑" : "↓"} {trend}
          </div>
        )}
      </div>

      <div className="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-1.5">{label}</div>
      <div className="text-[30px] font-extrabold text-text-primary leading-none mb-1.5 tracking-tight">
        {value}
      </div>
      {description && <div className="text-xs text-text-muted leading-snug">{description}</div>}
    </div>
  );
}
