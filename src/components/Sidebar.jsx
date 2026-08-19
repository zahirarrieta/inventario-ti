import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Monitor, Printer, Keyboard, Box, Users, Wrench,
  Settings, LogOut, ChevronLeft, ChevronRight, Activity
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
    <div className="sidebar-inner relative flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 h-16 shrink-0 sidebar-divider">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ctp-cyan to-ctp-blue flex items-center justify-center shrink-0">
          <Activity size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in min-w-0">
            <div className="sidebar-brand-title text-sm font-bold tracking-wide leading-tight">Inventario TI</div>
            <div className="sidebar-brand-sub text-[10px] font-medium uppercase tracking-widest">CTP Médica</div>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        {sections.map((section) => (
          <div key={section.title} className="mb-2">
            {!collapsed && (
              <div className="sidebar-section-label px-3 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest">
                {section.title}
              </div>
            )}
            {collapsed && <div className="sidebar-rule my-2 mx-auto w-6 h-px" />}
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                  className={`sidebar-link group flex items-center gap-3 rounded-xl transition-all duration-200 ${
                    collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
                  } ${active ? "sidebar-link-active relative" : ""}`}
                >
                  {active && <div className="sidebar-active-bar absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full" />}
                  <Icon size={20} className="sidebar-link-icon shrink-0" />
                  {!collapsed && (
                    <span className={`text-sm ${active ? "font-semibold" : "font-medium"}`}>
                      {item.label}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="px-3 pb-3 space-y-1 sidebar-divider pt-3">
        <button
          onClick={(e) => e.preventDefault()}
          className={`sidebar-link flex items-center rounded-xl w-full text-sm font-medium ${
            collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5"
          }`}
          title="Configuración"
        >
          <Settings size={20} className="sidebar-link-icon" />
          {!collapsed && <span>Configuración</span>}
        </button>
        <button
          onClick={(e) => e.preventDefault()}
          className={`sidebar-link sidebar-link-danger flex items-center rounded-xl w-full text-sm font-medium ${
            collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5"
          }`}
          title="Cerrar sesión"
        >
          <LogOut size={20} className="sidebar-link-icon" />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>

      <button
        type="button"
        onClick={onToggleCollapse}
        className="sidebar-collapse-btn hidden lg:flex"
        aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
        title={collapsed ? "Expandir menú" : "Colapsar menú"}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </div>
  );
}
