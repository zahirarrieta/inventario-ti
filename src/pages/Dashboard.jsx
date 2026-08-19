import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area } from "recharts";
import {
  getEstadisticas, getEquipos, getMonitores, getImpresoras,
  getSoftware, getActividad, getUsuarioNombre,
} from "../services/inventarioService";
import { Monitor, Printer, Keyboard, Box, Wrench, Users, Plus, ArrowRight, CheckCircle, ArrowRightCircle, XCircle, Pencil } from "lucide-react";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";

const activityIcons = {
  registro: CheckCircle,
  asignacion: ArrowRightCircle,
  mantenimiento: Wrench,
  baja: XCircle,
  edicion: Pencil,
};

const activityColors = {
  registro: "#10b981",
  asignacion: "#0FDBF2",
  mantenimiento: "#f59e0b",
  baja: "#ef4444",
  edicion: "#3b82f6",
};

const COLORS = ["#0FDBF2", "#023859", "#a855f7", "#10b981", "#f59e0b", "#ef4444"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-xl text-xs font-medium" style={{ background: "rgba(9,1,38,0.95)", border: "1px solid rgba(15,219,242,0.2)", backdropFilter: "blur(10px)" }}>
      <span className="text-text-primary">{payload[0].name}: </span>
      <span className="text-ctp-cyan font-bold">{payload[0].value}</span>
    </div>
  );
};

export default function Dashboard() {
  const stats = useMemo(() => getEstadisticas(), []);
  const equipos = useMemo(() => getEquipos(), []);
  const monitores = useMemo(() => getMonitores(), []);
  const impresoras = useMemo(() => getImpresoras(), []);
  const software = useMemo(() => getSoftware(), []);
  const actividad = useMemo(() => getActividad(), []);

  const ultimosActivos = useMemo(() => {
    const all = [
      ...equipos.map((e) => ({ ...e, tipoActivo: "Equipo" })),
      ...monitores.map((m) => ({ ...m, tipoActivo: "Monitor" })),
    ];
    return all.slice(0, 8);
  }, [equipos, monitores]);

  const sparkEquipos = useMemo(() => equipos.slice(0, 8).map((_, i) => ({ v: 15 + Math.sin(i) * 8 + i * 2 })), [equipos]);
  const sparkMonitores = useMemo(() => monitores.slice(0, 8).map((_, i) => ({ v: 10 + Math.cos(i) * 5 + i * 1.5 })), [monitores]);
  const sparkImpresoras = useMemo(() => impresoras.slice(0, 8).map((_, i) => ({ v: 5 + Math.sin(i + 1) * 3 + i })), [impresoras]);

  const statusData = [
    { name: "Activos", value: equipos.filter((e) => e.estado === "Activo").length + monitores.filter((m) => m.estado === "Activo").length + impresoras.filter((i) => i.estado === "Activo").length },
    { name: "Disponibles", value: equipos.filter((e) => e.estado === "Disponible").length + monitores.filter((m) => m.estado === "Disponible").length },
    { name: "Mantenimiento", value: stats.enMantenimiento },
    { name: "Dados de baja", value: stats.dadosDeBaja },
  ];

  const areaData = [
    { name: "Ene", activos: 62 }, { name: "Feb", activos: 65 }, { name: "Mar", activos: 68 },
    { name: "Abr", activos: 70 }, { name: "May", activos: 72 }, { name: "Jun", activos: 74 },
    { name: "Jul", activos: 75 }, { name: "Ago", activos: stats.totalActivos },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">¡Bienvenido, Administrador! 👋</h1>
          <p className="text-sm text-text-muted mt-1">Resumen general del inventario tecnológico</p>
        </div>
        <Link to="/equipos" className="btn-ctp shrink-0">
          <Plus size={16} /> Nuevo activo
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Box} value={stats.totalActivos} label="Total Activos" description="Todos los registros" color="#0FDBF2" trend="+12.5%" trendDir="up" sparkData={sparkEquipos} delay={0} />
        <StatCard icon={Monitor} value={stats.equipos} label="Equipos" description="Computadores y portátiles" color="#a855f7" sparkData={sparkMonitores} delay={0.05} />
        <StatCard icon={Monitor} value={stats.monitores} label="Monitores" description="Pantallas" color="#023859" sparkData={sparkMonitores} delay={0.10} />
        <StatCard icon={Printer} value={stats.impresoras} label="Impresoras" description="Dispositivos" color="#10b981" sparkData={sparkImpresoras} delay={0.15} />
        <StatCard icon={Keyboard} value={stats.perifericos} label="Periféricos" description="Accesorios" color="#f59e0b" delay={0.20} />
        <StatCard icon={Wrench} value={stats.enMantenimiento} label="Mantenimiento" description="En reparación" color="#ef4444" delay={0.25} />
        <StatCard icon={Users} value={stats.usuarios} label="Usuarios" description="Activos" color="#3b82f6" delay={0.30} />
        <StatCard icon={Box} value={software.length} label="Software" description="Licencias" color="#0FDBF2" delay={0.35} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card-premium p-5 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-text-primary">Activos por categoría</h3>
            <span className="text-xs text-text-muted">{stats.totalActivos} total</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0FDBF2" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#0FDBF2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="activos" stroke="#0FDBF2" strokeWidth={2} fill="url(#gradientArea)" />
                <Tooltip content={<CustomTooltip />} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-premium p-5 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
          <h3 className="text-sm font-bold text-text-primary mb-4">Distribución por estado</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {statusData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-text-secondary">{item.name}</span>
                </div>
                <span className="font-bold text-text-primary">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card-premium overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h3 className="text-sm font-bold text-text-primary">Últimos activos registrados</h3>
            <Link to="/equipos" className="text-xs font-medium text-ctp-cyan hover:text-ctp-cyan-light transition-colors flex items-center gap-1">
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table-dark-ctp">
              <thead>
                <tr>
                  <th>Código</th><th>Tipo</th><th>Marca</th><th>Modelo</th><th>Serial</th><th>Usuario</th><th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {ultimosActivos.map((a, idx) => (
                  <tr key={idx}>
                    <td><code className="text-ctp-cyan font-semibold text-xs">{a.codigo}</code></td>
                    <td>{a.tipo}</td>
                    <td>{a.marca}</td>
                    <td>{a.modelo}</td>
                    <td><span className="text-text-muted text-xs">{a.serial}</span></td>
                    <td>{getUsuarioNombre(a.usuarioId)}</td>
                    <td><StatusBadge estado={a.estado} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-premium p-5 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
          <h3 className="text-sm font-bold text-text-primary mb-4">Actividad reciente</h3>
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {actividad.map((act, idx) => {
              const Icon = activityIcons[act.tipo] || CheckCircle;
              const color = activityColors[act.tipo] || "#6b6b80";
              return (
                <div key={act.id} className="flex gap-3 animate-fade-in-up" style={{ animationDelay: `${0.35 + idx * 0.05}s` }}>
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    {idx < actividad.length - 1 && (
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-4 bg-white/5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pb-2">
                    <p className="text-xs text-text-primary font-medium leading-snug">{act.descripcion}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-text-muted">{act.fecha}</span>
                      <span className="text-[10px] text-text-muted">·</span>
                      <span className="text-[10px] text-text-muted">{act.usuario}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
