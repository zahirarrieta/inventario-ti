import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
  getEstadisticas, getEquipos, getMonitores, getImpresoras,
  getSoftware, getActividad, getUsuarioNombre,
} from "../services/inventarioService";
import {
  Monitor, Printer, Keyboard, Box, Wrench, Users, Plus, ArrowRight,
  CheckCircle, ArrowRightCircle, XCircle, Pencil, Sparkles, Clock,
  Tag, TrendingUp, Eye,
} from "lucide-react";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { SkeletonDashboard } from "../components/Skeleton";

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

const activityLabels = {
  registro: "Registro",
  asignacion: "Asignación",
  mantenimiento: "Mantenimiento",
  baja: "Baja",
  edicion: "Edición",
};

const COLORS = ["#0FDBF2", "#023859", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-xl text-xs font-medium dropdown-panel shadow-lg">
      <p className="text-text-secondary mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-bold" style={{ color: p.color }}>
          {p.value} activos
        </p>
      ))}
    </div>
  );
};

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-xl text-xs font-medium dropdown-panel shadow-lg">
      <span className="text-text-primary">{payload[0].name}: </span>
      <span className="font-bold" style={{ color: payload[0].payload?.fill || "#0FDBF2" }}>
        {payload[0].value}
      </span>
    </div>
  );
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

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

  const statusData = [
    { name: "Activos", value: equipos.filter((e) => e.estado === "Activo").length + monitores.filter((m) => m.estado === "Activo").length + impresoras.filter((i) => i.estado === "Activo").length },
    { name: "Disponibles", value: equipos.filter((e) => e.estado === "Disponible").length + monitores.filter((m) => m.estado === "Disponible").length },
    { name: "Mantenimiento", value: stats.enMantenimiento },
    { name: "Dados de baja", value: stats.dadosDeBaja },
  ];

  const categoryData = [
    { name: "Equipos", cantidad: stats.equipos, fill: "#023859" },
    { name: "Monitores", cantidad: stats.monitores, fill: "#0FDBF2" },
    { name: "Impresoras", cantidad: stats.impresoras, fill: "#10b981" },
    { name: "Periféricos", cantidad: stats.perifericos, fill: "#f59e0b" },
    { name: "Software", cantidad: software.length, fill: "#3b82f6" },
  ];

  if (loading) return <SkeletonDashboard />;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
            ¡Bienvenido, Administrador! <Sparkles size={22} className="text-ctp-cyan" />
          </h1>
          <p className="text-sm text-text-muted mt-1">Resumen general del inventario tecnológico</p>
        </div>
        <Link to="/equipos" className="btn-ctp shrink-0">
          <Plus size={16} /> Nuevo activo
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon={Box} value={stats.totalActivos} label="Total Activos" description="Todos los registros" color="#0FDBF2" trend="+12.5%" trendDir="up" index={0} />
        <StatCard icon={Monitor} value={stats.equipos} label="Equipos" description="Computadores" color="#023859" index={1} />
        <StatCard icon={Monitor} value={stats.monitores} label="Monitores" description="Pantallas" color="#0FDBF2" index={2} />
        <StatCard icon={Printer} value={stats.impresoras} label="Impresoras" description="Dispositivos" color="#10b981" index={3} />
        <StatCard icon={Keyboard} value={stats.perifericos} label="Periféricos" description="Accesorios" color="#f59e0b" index={4} />
        <StatCard icon={Wrench} value={stats.enMantenimiento} label="Mantenimiento" description="En reparación" color="#ef4444" index={5} />
        <StatCard icon={Users} value={stats.usuarios} label="Usuarios" description="Activos" color="#3b82f6" index={6} />
        <StatCard icon={Box} value={software.length} label="Software" description="Licencias" color="#0FDBF2" index={7} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="lg:col-span-2 card-premium p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-ctp-cyan" />
              <h3 className="text-sm font-bold text-text-primary">Activos por categoría</h3>
            </div>
            <span className="text-xs text-text-muted">{stats.totalActivos} total</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "var(--color-text-muted)", fontSize: 11, fontWeight: 600 }}
                  axisLine={{ stroke: "var(--color-border-subtle)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "var(--color-text-muted)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(15, 219, 242, 0.06)" }} />
                <Bar dataKey="cantidad" radius={[6, 6, 0, 0]} maxBarSize={50}>
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="card-premium p-5 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-4">
            <Eye size={16} className="text-ctp-cyan" />
            <h3 className="text-sm font-bold text-text-primary">Distribución por estado</h3>
          </div>
          <div className="flex-1 min-h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value" animationBegin={200} animationDuration={800}>
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-3">
            {statusData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                  <span className="text-text-secondary">{item.name}</span>
                </div>
                <span className="font-bold text-text-primary">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
          className="lg:col-span-2 card-premium overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h3 className="text-sm font-bold text-text-primary">Últimos activos registrados</h3>
            <Link to="/equipos" className="text-xs font-medium text-ctp-cyan hover:text-ctp-cyan-light transition-colors flex items-center gap-1">
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto flex-1">
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
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={7}
          className="card-premium p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-ctp-cyan" />
              <h3 className="text-sm font-bold text-text-primary">Actividad reciente</h3>
            </div>
            <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider bg-white/5 px-2 py-1 rounded-md">
              {actividad.length} registros
            </span>
          </div>
          <div className="space-y-0 flex-1 overflow-y-auto">
            {actividad.map((act, idx) => {
              const Icon = activityIcons[act.tipo] || CheckCircle;
              const color = activityColors[act.tipo] || "#6b6b80";
              const label = activityLabels[act.tipo] || act.tipo;
              return (
                <motion.div
                  key={act.id}
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  custom={idx}
                  className="group flex gap-3 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] rounded-lg px-2 -mx-2 transition-colors cursor-default"
                >
                  <div className="relative shrink-0">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ background: `${color}18`, border: `1px solid ${color}25` }}
                    >
                      <Icon size={16} style={{ color }} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs text-text-primary font-medium leading-snug">{act.descripcion}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span
                        className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                        style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
                      >
                        <Tag size={8} />
                        {label}
                      </span>
                      <span className="text-[10px] text-text-muted">{act.fecha}</span>
                      <span className="text-[10px] text-text-muted font-mono">{act.hora}</span>
                      <span className="text-[10px] text-text-muted">·</span>
                      <span className="text-[10px] text-text-secondary font-medium">{act.usuario}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
