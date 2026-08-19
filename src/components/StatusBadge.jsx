const statusConfig = {
  "Activo": { color: "#10b981", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.25)", lightBg: "rgba(16,185,129,0.12)", lightBorder: "rgba(16,185,129,0.30)" },
  "Disponible": { color: "#0FDBF2", bg: "rgba(15,219,242,0.10)", border: "rgba(15,219,242,0.25)", lightBg: "rgba(15,219,242,0.10)", lightBorder: "rgba(15,219,242,0.30)" },
  "En mantenimiento": { color: "#f59e0b", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.25)", lightBg: "rgba(245,158,11,0.10)", lightBorder: "rgba(245,158,11,0.30)" },
  "Dado de baja": { color: "#ef4444", bg: "rgba(239,68,68,0.10)", border: "rgba(239,68,68,0.25)", lightBg: "rgba(239,68,68,0.10)", lightBorder: "rgba(239,68,68,0.30)" },
  "Inactivo": { color: "#6b6b80", bg: "rgba(107,107,128,0.10)", border: "rgba(107,107,128,0.25)", lightBg: "rgba(107,107,128,0.10)", lightBorder: "rgba(107,107,128,0.25)" },
  "Programado": { color: "#3b82f6", bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.25)", lightBg: "rgba(59,130,246,0.10)", lightBorder: "rgba(59,130,246,0.30)" },
  "En proceso": { color: "#f59e0b", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.25)", lightBg: "rgba(245,158,11,0.10)", lightBorder: "rgba(245,158,11,0.30)" },
  "Finalizado": { color: "#10b981", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.25)", lightBg: "rgba(16,185,129,0.12)", lightBorder: "rgba(16,185,129,0.30)" },
  "Cancelado": { color: "#6b6b80", bg: "rgba(107,107,128,0.10)", border: "rgba(107,107,128,0.25)", lightBg: "rgba(107,107,128,0.10)", lightBorder: "rgba(107,107,128,0.25)" },
  "Por vencer": { color: "#f59e0b", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.25)", lightBg: "rgba(245,158,11,0.10)", lightBorder: "rgba(245,158,11,0.30)" },
  "Vencido": { color: "#ef4444", bg: "rgba(239,68,68,0.10)", border: "rgba(239,68,68,0.25)", lightBg: "rgba(239,68,68,0.10)", lightBorder: "rgba(239,68,68,0.30)" },
  "Suspendido": { color: "#6b6b80", bg: "rgba(107,107,128,0.10)", border: "rgba(107,107,128,0.25)", lightBg: "rgba(107,107,128,0.10)", lightBorder: "rgba(107,107,128,0.25)" },
};

export default function StatusBadge({ estado }) {
  const cfg = statusConfig[estado] || { color: "#6b6b80", bg: "rgba(107,107,128,0.10)", border: "rgba(107,107,128,0.25)", lightBg: "rgba(107,107,128,0.10)", lightBorder: "rgba(107,107,128,0.25)" };
  const isLight = typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "light";

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors duration-200"
      style={{
        color: cfg.color,
        background: isLight ? cfg.lightBg : cfg.bg,
        border: `1px solid ${isLight ? cfg.lightBorder : cfg.border}`,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}80` }} />
      {estado}
    </span>
  );
}
