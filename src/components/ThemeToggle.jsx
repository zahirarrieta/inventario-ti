import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full border transition-all duration-300 flex items-center shrink-0"
      style={{
        background: isDark
          ? "linear-gradient(135deg, rgba(15,219,242,0.15), rgba(33,1,64,0.30))"
          : "linear-gradient(135deg, rgba(251,191,36,0.20), rgba(245,158,11,0.15))",
        borderColor: isDark ? "rgba(15,219,242,0.25)" : "rgba(245,158,11,0.30)",
      }}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
    >
      <span
        className="absolute w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          left: isDark ? "4px" : "28px",
          background: isDark ? "#0FDBF2" : "#f59e0b",
          boxShadow: `0 0 10px ${isDark ? "rgba(15,219,242,0.4)" : "rgba(245,158,11,0.4)"}`,
        }}
      >
        {isDark ? <Moon size={12} className="text-ctp-dark" /> : <Sun size={12} className="text-white" />}
      </span>
    </button>
  );
}
