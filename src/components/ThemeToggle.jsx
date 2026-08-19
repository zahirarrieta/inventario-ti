import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full border transition-all duration-300 flex items-center shrink-0 px-1"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #1c1542, #0e0133)"
          : "linear-gradient(135deg, #fff7ed, #fef3c7)",
        borderColor: isDark ? "rgba(15,219,242,0.35)" : "rgba(245,158,11,0.40)",
      }}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
    >
      <Sun size={12} className={`absolute left-2 ${isDark ? "text-text-muted" : "text-warning"}`} />
      <Moon size={12} className={`absolute right-2 ${isDark ? "text-ctp-cyan" : "text-text-muted"}`} />
      <span
        className="absolute w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          left: isDark ? "4px" : "36px",
          background: isDark ? "#0FDBF2" : "#f59e0b",
          boxShadow: `0 0 10px ${isDark ? "rgba(15,219,242,0.5)" : "rgba(245,158,11,0.5)"}`,
        }}
      >
        {isDark ? <Moon size={13} className="text-ctp-dark" /> : <Sun size={13} className="text-white" />}
      </span>
    </button>
  );
}
