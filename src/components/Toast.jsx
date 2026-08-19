import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { useEffect } from "react";

const iconMap = {
  success: CheckCircle,
  danger: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: { border: "rgba(16,185,129,0.3)", bg: "rgba(16,185,129,0.08)", icon: "#10b981" },
  danger: { border: "rgba(239,68,68,0.3)", bg: "rgba(239,68,68,0.08)", icon: "#ef4444" },
  warning: { border: "rgba(245,158,11,0.3)", bg: "rgba(245,158,11,0.08)", icon: "#f59e0b" },
  info: { border: "rgba(59,130,246,0.3)", bg: "rgba(59,130,246,0.08)", icon: "#3b82f6" },
};

export default function Toast({ message, type = "success", onClose }) {
  const Icon = iconMap[type] || iconMap.info;
  const colors = colorMap[type] || colorMap.info;

  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl animate-slide-in-right"
      style={{
        background: "rgba(9,1,38,0.92)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${colors.border}`,
        boxShadow: `0 10px 40px rgba(0,0,0,0.4), 0 0 20px ${colors.border}`,
        minWidth: 300,
        maxWidth: 420,
      }}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: colors.bg }}>
        <Icon size={18} style={{ color: colors.icon }} />
      </div>
      <span className="text-sm font-medium text-text-primary flex-1">{message}</span>
      <button
        onClick={onClose}
        className="p-1 rounded-lg hover:bg-white/5 text-text-muted hover:text-text-primary transition-all shrink-0"
        aria-label="Cerrar"
      >
        <X size={14} />
      </button>
      <div
        className="absolute bottom-0 left-0 h-[2px] rounded-b-xl"
        style={{
          background: colors.icon,
          animation: "shrink 3.5s linear forwards",
        }}
      />
      <style>{`@keyframes shrink { from { width: 100%; } to { width: 0%; } }`}</style>
    </div>
  );
}
