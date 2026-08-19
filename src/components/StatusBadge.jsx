import { useTheme } from "../context/ThemeContext";

const statusConfig = {
  "Activo": { color: "#34d399", lightColor: "#047857", bg: "rgba(16,185,129,0.18)", border: "rgba(16,185,129,0.32)", lightBg: "rgba(16,185,129,0.14)", lightBorder: "rgba(16,185,129,0.28)" },
  "Disponible": { color: "#67e8f9", lightColor: "#0e7490", bg: "rgba(15,219,242,0.16)", border: "rgba(15,219,242,0.32)", lightBg: "rgba(14,116,144,0.10)", lightBorder: "rgba(14,116,144,0.28)" },
  "En mantenimiento": { color: "#fbbf24", lightColor: "#b45309", bg: "rgba(245,158,11,0.18)", border: "rgba(245,158,11,0.34)", lightBg: "rgba(245,158,11,0.14)", lightBorder: "rgba(180,83,9,0.28)" },
  "Dado de baja": { color: "#fca5a5", lightColor: "#b91c1c", bg: "rgba(239,68,68,0.18)", border: "rgba(239,68,68,0.32)", lightBg: "rgba(239,68,68,0.12)", lightBorder: "rgba(185,28,28,0.28)" },
  "Inactivo": { color: "#c4c4d6", lightColor: "#4b5563", bg: "rgba(107,107,128,0.18)", border: "rgba(107,107,128,0.30)", lightBg: "rgba(107,114,128,0.12)", lightBorder: "rgba(75,85,99,0.25)" },
  "Programado": { color: "#93c5fd", lightColor: "#1d4ed8", bg: "rgba(59,130,246,0.18)", border: "rgba(59,130,246,0.32)", lightBg: "rgba(59,130,246,0.12)", lightBorder: "rgba(29,78,216,0.25)" },
  "En proceso": { color: "#fbbf24", lightColor: "#b45309", bg: "rgba(245,158,11,0.18)", border: "rgba(245,158,11,0.34)", lightBg: "rgba(245,158,11,0.14)", lightBorder: "rgba(180,83,9,0.28)" },
  "Finalizado": { color: "#34d399", lightColor: "#047857", bg: "rgba(16,185,129,0.18)", border: "rgba(16,185,129,0.32)", lightBg: "rgba(16,185,129,0.14)", lightBorder: "rgba(16,185,129,0.28)" },
  "Cancelado": { color: "#c4c4d6", lightColor: "#4b5563", bg: "rgba(107,107,128,0.18)", border: "rgba(107,107,128,0.30)", lightBg: "rgba(107,114,128,0.12)", lightBorder: "rgba(75,85,99,0.25)" },
  "Por vencer": { color: "#fbbf24", lightColor: "#b45309", bg: "rgba(245,158,11,0.18)", border: "rgba(245,158,11,0.34)", lightBg: "rgba(245,158,11,0.14)", lightBorder: "rgba(180,83,9,0.28)" },
  "Vencido": { color: "#fca5a5", lightColor: "#b91c1c", bg: "rgba(239,68,68,0.18)", border: "rgba(239,68,68,0.32)", lightBg: "rgba(239,68,68,0.12)", lightBorder: "rgba(185,28,28,0.28)" },
  "Suspendido": { color: "#c4c4d6", lightColor: "#4b5563", bg: "rgba(107,107,128,0.18)", border: "rgba(107,107,128,0.30)", lightBg: "rgba(107,114,128,0.12)", lightBorder: "rgba(75,85,99,0.25)" },
};

export default function StatusBadge({ estado }) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const cfg = statusConfig[estado] || statusConfig.Inactivo;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap"
      style={{
        color: isLight ? cfg.lightColor : cfg.color,
        background: isLight ? cfg.lightBg : cfg.bg,
        border: `1px solid ${isLight ? cfg.lightBorder : cfg.border}`,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: isLight ? cfg.lightColor : cfg.color }} />
      {estado}
    </span>
  );
}
