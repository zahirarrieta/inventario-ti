import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function StatCard({ icon: Icon, value, label, description, color = "#0FDBF2", trend, trendDir = "up", sparkData, delay = 0 }) {
  const data = sparkData || [
    { v: 12 }, { v: 19 }, { v: 14 }, { v: 22 }, { v: 18 }, { v: 25 }, { v: 20 }, { v: 28 },
  ];

  return (
    <div
      className="card-premium p-5 relative overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03]" style={{ background: `radial-gradient(circle, ${color}, transparent)` }} />

      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-[14px] flex items-center justify-center"
          style={{ background: `${color}18`, boxShadow: `0 0 20px ${color}15` }}
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

      <div className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1">{label}</div>
      <div className="text-[32px] font-extrabold text-text-primary leading-none mb-1" style={{ fontFamily: "Montserrat" }}>
        {value}
      </div>
      {description && <div className="text-xs text-text-muted">{description}</div>}

      <div className="absolute bottom-0 right-0 w-24 h-10 opacity-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
