import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Monitor, Printer, Keyboard, Box, Users, Wrench,
  Settings, LogOut, ChevronLeft, Activity
} from "lucide-react";

const sections = [
  {
    title: "Principal",
    items: [
      { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    ],
  },
  {
    title: "Inventario",
    items: [
      { path: "/equipos", icon: Monitor, label: "Equipos" },
      { path: "/monitores", icon: Monitor, label: "Monitores" },
      { path: "/impresoras", icon: Printer, label: "Impresoras" },
      { path: "/perifericos", icon: Keyboard, label: "Periféricos" },
      { path: "/software", icon: Box, label: "Software" },
    ],
  },
  {
    title: "Gestión",
    items: [
      { path: "/usuarios", icon: Users, label: "Usuarios" },
      { path: "/mantenimientos", icon: Wrench, label: "Mantenimientos" },
    ],
  },
];

export default function Sidebar({ collapsed, onNavigate, onToggleCollapse }) {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 h-16 shrink-0 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ctp-cyan to-ctp-blue flex items-center justify-center shrink-0">
          <Activity size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <div className="text-sm font-bold text-white tracking-wide leading-tight">Inventario TI</div>
            <div className="text-[10px] font-medium text-ctp-cyan/60 uppercase tracking-widest">CTP Médica</div>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        {sections.map((section) => (
          <div key={section.title} className="mb-2">
            {!collapsed && (
              <div className="px-3 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                {section.title}
              </div>
            )}
            {collapsed && <div className="my-2 mx-auto w-6 h-px bg-white/10" />}
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                  className={`group flex items-center gap-3 rounded-xl transition-all duration-200 ${
                    collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
                  } ${
                    active
                      ? "bg-gradient-to-r from-ctp-cyan/15 to-ctp-purple/30 text-ctp-cyan shadow-[0_0_20px_rgba(15,219,242,0.10)] relative"
                      : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                  }`}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-ctp-cyan shadow-[0_0_8px_rgba(15,219,242,0.5)]" />
                  )}
                  <Icon
                    size={20}
                    className={`shrink-0 transition-all duration-200 ${
                      active ? "text-ctp-cyan drop-shadow-[0_0_6px_rgba(15,219,242,0.5)]" : "text-text-muted group-hover:text-text-primary"
                    }`}
                  />
                  {!collapsed && (
                    <span className={`text-sm transition-all duration-200 ${active ? "font-semibold text-white" : "font-medium"}`}>
                      {item.label}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="px-3 pb-3 space-y-1 border-t border-white/5 pt-3">
        {!collapsed && (
          <>
            <button
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-text-secondary hover:bg-white/5 hover:text-text-primary transition-all duration-200 text-sm font-medium"
            >
              <Settings size={20} className="text-text-muted" />
              <span>Configuración</span>
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-text-secondary hover:bg-danger/10 hover:text-danger transition-all duration-200 text-sm font-medium"
            >
              <LogOut size={20} className="text-text-muted" />
              <span>Cerrar sesión</span>
            </button>
          </>
        )}
        {collapsed && (
          <>
            <button onClick={(e) => e.preventDefault()} className="flex items-center justify-center w-full px-2 py-2.5 rounded-xl text-text-muted hover:bg-white/5 hover:text-text-primary transition-all" title="Configuración">
              <Settings size={20} />
            </button>
            <button onClick={(e) => e.preventDefault()} className="flex items-center justify-center w-full px-2 py-2.5 rounded-xl text-text-muted hover:bg-danger/10 hover:text-danger transition-all" title="Cerrar sesión">
              <LogOut size={20} />
            </button>
          </>
        )}
      </div>

      {!collapsed && (
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-ctp-dark border border-border-subtle flex items-center justify-center text-text-muted hover:text-ctp-cyan hover:border-ctp-cyan/30 transition-all duration-200 z-50"
          aria-label="Colapsar sidebar"
        >
          <ChevronLeft size={14} />
        </button>
      )}
    </div>
  );
}
