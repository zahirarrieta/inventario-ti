import { createContext, useContext } from "react";

const ThemeContext = createContext();

export default ThemeContext;

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
