import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const routeConfig = {
  "/dashboard": { label: "Dashboard", section: null },
  "/equipos": { label: "Equipos", section: "Inventario" },
  "/monitores": { label: "Monitores", section: "Inventario" },
  "/impresoras": { label: "Impresoras", section: "Inventario" },
  "/perifericos": { label: "Periféricos", section: "Inventario" },
  "/software": { label: "Software", section: "Inventario" },
  "/usuarios": { label: "Usuarios", section: "Gestión" },
  "/mantenimientos": { label: "Mantenimientos", section: "Gestión" },
};

export default function Navbar({ onToggleSidebar, sidebarOpen }) {
  const location = useLocation();
  const config = routeConfig[location.pathname] || { label: "Página", section: null };
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const userMenuRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setShowUserMenu(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const notifications = [
    { id: 1, text: "Nuevo equipo registrado", time: "Hace 5 min", icon: "🖥️" },
    { id: 2, text: "Mantenimiento programado", time: "Hace 1 hora", icon: "🔧" },
    { id: 3, text: "Licencia próxima a vencer", time: "Hace 2 horas", icon: "⚠️" },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center gap-4 px-4 lg:px-6 border-b border-white/5"
      style={{ background: "rgba(9,1,38,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
      <button
        onClick={onToggleSidebar}
        className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-text-secondary hover:text-text-primary transition-all"
        aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
      >
        <Menu size={20} />
      </button>

      <div className="hidden lg:flex items-center gap-2 text-sm">
        <Link to="/dashboard" className="text-text-muted hover:text-text-primary transition-colors">Inicio</Link>
        {config.section && (
          <>
            <span className="text-text-muted/40">/</span>
            <span className="text-text-muted">{config.section}</span>
          </>
        )}
        <span className="text-text-muted/40">/</span>
        <span className="text-text-primary font-medium">{config.label}</span>
      </div>

      <div className="flex-1" />

      <div className={`hidden md:flex items-center gap-2 rounded-xl border transition-all duration-200 px-3 py-2 ${
        searchFocused
          ? "border-ctp-cyan/40 bg-white/[0.06] shadow-[0_0_15px_rgba(15,219,242,0.08)]"
          : "border-white/8 bg-white/[0.03]"
      }`} style={{ width: 280 }}>
        <Search size={16} className={`shrink-0 transition-colors ${searchFocused ? "text-ctp-cyan" : "text-text-muted"}`} />
        <input
          type="text"
          placeholder="Buscar activos, usuarios..."
          className="bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted w-full"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <kbd className="hidden lg:inline text-[10px] font-medium text-text-muted bg-white/5 border border-white/10 rounded px-1.5 py-0.5">Ctrl+K</kbd>
      </div>

      <ThemeToggle />

      <div ref={notifRef} className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 rounded-xl hover:bg-white/5 text-text-secondary hover:text-text-primary transition-all"
          aria-label="Notificaciones"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-ctp-cyan animate-pulse" />
        </button>

        {showNotifications && (
          <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-border-subtle bg-ctp-dark/95 backdrop-blur-xl shadow-2xl animate-scale-in overflow-hidden">
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <span className="text-sm font-semibold text-text-primary">Notificaciones</span>
              <span className="text-[10px] font-bold text-ctp-cyan bg-ctp-cyan/10 rounded-full px-2 py-0.5">{notifications.length}</span>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className="px-4 py-3 hover:bg-white/[0.03] transition-colors border-b border-white/[0.03] cursor-pointer">
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">{n.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary font-medium leading-tight">{n.text}</p>
                      <p className="text-[11px] text-text-muted mt-1">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-white/5 text-center">
              <button className="text-xs font-medium text-ctp-cyan hover:text-ctp-cyan-light transition-colors">Ver todas</button>
            </div>
          </div>
        )}
      </div>

      <div ref={userMenuRef} className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl hover:bg-white/5 transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ctp-cyan to-ctp-purple flex items-center justify-center text-white text-xs font-bold">
            AT
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-text-primary leading-tight">Administrador TI</div>
            <div className="text-[10px] text-text-muted leading-tight">CTP Médica</div>
          </div>
          <ChevronDown size={14} className={`text-text-muted transition-transform duration-200 ${showUserMenu ? "rotate-180" : ""}`} />
        </button>

        {showUserMenu && (
          <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-border-subtle bg-ctp-dark/95 backdrop-blur-xl shadow-2xl animate-scale-in overflow-hidden">
            <div className="px-4 py-3 border-b border-white/5">
              <div className="text-sm font-semibold text-text-primary">Administrador TI</div>
              <div className="text-xs text-text-muted">admin.ti@ctpmedica.com</div>
            </div>
            <div className="py-1.5">
              <button className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-text-secondary hover:bg-white/[0.04] hover:text-text-primary transition-colors">
                <User size={16} /> Mi perfil
              </button>
              <button className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-text-secondary hover:bg-white/[0.04] hover:text-text-primary transition-colors">
                <Settings size={16} /> Configuración
              </button>
            </div>
            <div className="border-t border-white/5 py-1.5">
              <button className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-danger hover:bg-danger/10 transition-colors">
                <LogOut size={16} /> Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
