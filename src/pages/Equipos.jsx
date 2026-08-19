import { useState, useMemo } from "react";
import { getEquipos, createEquipo, updateEquipo, deleteEquipo, getUsuarios, getUsuarioNombre } from "../services/inventarioService";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import ConfirmModal from "../components/ConfirmModal";
import Pagination from "../components/Pagination";
import StatCard from "../components/StatCard";
import FilterBar from "../components/FilterBar";
import { Monitor, Eye, Pencil, Trash2, UserCheck, Info, Cpu, User, ShieldCheck, Plus } from "lucide-react";

const ESTADOS = ["Activo", "Disponible", "En mantenimiento", "Dado de baja"];
const TIPOS = ["Computador", "Portátil"];
const MARCAS = ["Dell", "HP", "Lenovo", "Acer", "ASUS"];
const AREAS = ["Sistemas", "Contabilidad", "Recursos Humanos", "Gerencia", "Ventas", "Recepción", "Administración", "Logística", "Almacén"];
const UBICACIONES = ["Oficina Principal - Piso 1", "Oficina Principal - Piso 2", "Oficina Principal - Piso 3", "Oficina Gerencia - Piso 3", "Oficina Ventas - Piso 1", "Oficina Contabilidad - Piso 1", "Recepción - Piso 1", "Oficina Administración - Piso 1", "Almacén de TI", "Taller de TI"];
const PER_PAGE = 10;

const emptyForm = {
  codigo: "", tipo: "Computador", marca: "Dell", modelo: "", serial: "", procesador: "", ram: "8 GB", almacenamiento: "256 GB SSD", so: "Windows 11 Pro", fechaCompra: "", fechaGarantia: "", proveedor: "", costo: "", estado: "Activo", usuarioId: "", area: "", ubicacion: "", observaciones: "",
};

export default function Equipos({ showToast }) {
  const [equipos, setEquipos] = useState(() => getEquipos());
  const [search, setSearch] = useState("");
  const [fTipo, setFTipo] = useState("");
  const [fMarca, setFMarca] = useState("");
  const [fEstado, setFEstado] = useState("");
  const [fUbicacion, setFUbicacion] = useState("");
  const [fUsuario, setFUsuario] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [showAssign, setShowAssign] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [showDelete, setShowDelete] = useState(null);
  const [assignForm, setAssignForm] = useState({ usuarioId: "", area: "", ubicacion: "", fechaAsignacion: "", observaciones: "" });

  const usuarios = useMemo(() => getUsuarios(), []);

  const kpis = useMemo(() => ({
    total: equipos.length,
    asignados: equipos.filter((e) => e.usuarioId != null && e.estado === "Activo").length,
    disponibles: equipos.filter((e) => e.estado === "Disponible").length,
    mantenimiento: equipos.filter((e) => e.estado === "En mantenimiento").length,
  }), [equipos]);

  const filtered = useMemo(() => {
    return equipos.filter((e) => {
      const t = search.toLowerCase();
      return (!t || e.codigo.toLowerCase().includes(t) || e.serial.toLowerCase().includes(t) || e.marca.toLowerCase().includes(t) || e.modelo.toLowerCase().includes(t) || getUsuarioNombre(e.usuarioId).toLowerCase().includes(t))
        && (!fTipo || e.tipo === fTipo) && (!fMarca || e.marca === fMarca) && (!fEstado || e.estado === fEstado)
        && (!fUbicacion || e.ubicacion === fUbicacion) && (!fUsuario || String(e.usuarioId) === fUsuario);
    });
  }, [equipos, search, fTipo, fMarca, fEstado, fUbicacion, fUsuario]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const openNew = () => { setForm({ ...emptyForm }); setEditingId(null); setShowForm(true); };
  const openEdit = (eq) => { setForm({ ...eq, usuarioId: eq.usuarioId ? String(eq.usuarioId) : "" }); setEditingId(eq.id); setShowForm(true); };

  const handleSave = () => {
    const data = { ...form, usuarioId: form.usuarioId ? Number(form.usuarioId) : null, costo: form.costo ? Number(form.costo) : 0 };
    if (editingId) { updateEquipo(editingId, data); showToast("Equipo actualizado correctamente."); }
    else { createEquipo(data); showToast("Equipo creado correctamente."); }
    setEquipos(getEquipos()); setShowForm(false);
  };

  const handleDelete = () => { deleteEquipo(showDelete.id); setEquipos(getEquipos()); setShowDelete(null); showToast("Equipo eliminado.", "danger"); };

  const handleAssign = () => {
    updateEquipo(showAssign.id, { usuarioId: assignForm.usuarioId ? Number(assignForm.usuarioId) : null, area: assignForm.area, ubicacion: assignForm.ubicacion, estado: assignForm.usuarioId ? "Activo" : showAssign.estado });
    setEquipos(getEquipos()); setShowAssign(null); showToast("Activo asignado correctamente.");
  };

  const clearFilters = () => { setSearch(""); setFTipo(""); setFMarca(""); setFEstado(""); setFUbicacion(""); setFUsuario(""); setPage(1); };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Equipos</h1>
          <p className="text-sm text-text-muted mt-1">Administración de equipos tecnológicos</p>
        </div>
        <button onClick={openNew} className="btn-ctp shrink-0">
          <Plus size={16} /> Nuevo equipo
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Monitor} value={kpis.total} label="Total" description="Equipos registrados" color="#0FDBF2" delay={0} />
        <StatCard icon={UserCheck} value={kpis.asignados} label="Asignados" description="Con usuario asignado" color="#10b981" delay={0.05} />
        <StatCard icon={Info} value={kpis.disponibles} label="Disponibles" description="Sin asignar" color="#34d399" delay={0.10} />
        <StatCard icon={Cpu} value={kpis.mantenimiento} label="Mantenimiento" description="En reparación" color="#f59e0b" delay={0.15} />
      </div>

      <div className="card-premium p-4 animate-fade-in-up stagger-2">
        <FilterBar
          search={search}
          onSearchChange={(v) => { setSearch(v); setPage(1); }}
          searchPlaceholder="Buscar por código, serial, marca o usuario"
          filters={[
            { key: "tipo", value: fTipo, onChange: (v) => { setFTipo(v); setPage(1); }, placeholder: "Todos los tipos", options: TIPOS },
            { key: "marca", value: fMarca, onChange: (v) => { setFMarca(v); setPage(1); }, placeholder: "Todas las marcas", options: MARCAS },
            { key: "estado", value: fEstado, onChange: (v) => { setFEstado(v); setPage(1); }, placeholder: "Todos los estados", options: ESTADOS },
            { key: "ubicacion", value: fUbicacion, onChange: (v) => { setFUbicacion(v); setPage(1); }, placeholder: "Todas las ubicaciones", options: UBICACIONES },
            { key: "usuario", value: fUsuario, onChange: (v) => { setFUsuario(v); setPage(1); }, placeholder: "Todos los usuarios", options: usuarios.map((u) => ({ value: String(u.id), label: `${u.nombre} ${u.apellido}` })) },
          ]}
          onClear={clearFilters}
        />
      </div>

      {/* Table */}
      <div className="card-premium overflow-hidden animate-fade-in-up stagger-3">
        <div className="overflow-x-auto">
          <table className="table-dark-ctp">
            <thead>
              <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Serial</th>
                <th>Usuario</th>
                <th>Ubicación</th>
                <th>Estado</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="9">
                    <EmptyState onClear={clearFilters} />
                  </td>
                </tr>
              ) : (
                paginated.map((e) => (
                  <tr key={e.id} className="group">
                    <td>
                      <code className="text-ctp-cyan font-semibold text-sm">{e.codigo}</code>
                    </td>
                    <td>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-ctp-blue" />
                        {e.tipo}
                      </span>
                    </td>
                    <td className="font-medium">{e.marca}</td>
                    <td className="font-medium">{e.modelo}</td>
                    <td>
                      <span className="text-text-muted text-xs font-mono">{e.serial}</span>
                    </td>
                    <td className="font-medium">{getUsuarioNombre(e.usuarioId)}</td>
                    <td>
                      <span className="text-xs">{e.ubicacion || "-"}</span>
                    </td>
                    <td><StatusBadge estado={e.estado} /></td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-icon" title="Ver detalle" onClick={() => setShowDetail(e)}>
                          <Eye size={16} />
                        </button>
                        <button className="btn-icon edit" title="Editar" onClick={() => openEdit(e)}>
                          <Pencil size={16} />
                        </button>
                        <button
                          className="btn-icon assign"
                          title="Asignar"
                          onClick={() => {
                            setShowAssign(e);
                            setAssignForm({
                              usuarioId: e.usuarioId ? String(e.usuarioId) : "",
                              area: e.area,
                              ubicacion: e.ubicacion,
                              fechaAsignacion: "",
                              observaciones: "",
                            });
                          }}
                        >
                          <UserCheck size={16} />
                        </button>
                        <button className="btn-icon danger" title="Eliminar" onClick={() => setShowDelete(e)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} totalItems={filtered.length} itemsPerPage={PER_PAGE} onPageChange={setPage} />
      </div>

      {/* Form Modal */}
      <Modal
        show={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? "Editar equipo" : "Nuevo equipo"}
        size="xl"
        footer={
          <>
            <button className="btn-ghost" onClick={() => setShowForm(false)}>Cancelar</button>
            <button className="btn-ctp" onClick={handleSave}>
              <Monitor size={16} /> Guardar equipo
            </button>
          </>
        }
      >
        <div className="space-y-6">
          {/* Sección: Información General */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3 flex items-center gap-2">
              <Info size={14} className="text-ctp-cyan" /> Información General
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Código de activo *</label>
                <input type="text" className="input-dark w-full" value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })} placeholder="TI-PC-XXXXX" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Tipo *</label>
                <select className="select-dark w-full" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
                  {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Marca *</label>
                <select className="select-dark w-full" value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })}>
                  {MARCAS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Modelo *</label>
                <input type="text" className="input-dark w-full" value={form.modelo} onChange={(e) => setForm({ ...form, modelo: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Serial *</label>
                <input type="text" className="input-dark w-full" value={form.serial} onChange={(e) => setForm({ ...form, serial: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Estado</label>
                <select className="select-dark w-full" value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
                  {ESTADOS.map((es) => <option key={es} value={es}>{es}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Sección: Especificaciones Técnicas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3 flex items-center gap-2">
              <Cpu size={14} className="text-ctp-cyan" /> Especificaciones Técnicas
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Procesador</label>
                <input type="text" className="input-dark w-full" value={form.procesador} onChange={(e) => setForm({ ...form, procesador: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">RAM</label>
                <select className="select-dark w-full" value={form.ram} onChange={(e) => setForm({ ...form, ram: e.target.value })}>
                  {["4 GB", "8 GB", "16 GB", "32 GB", "64 GB"].map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Almacenamiento</label>
                <select className="select-dark w-full" value={form.almacenamiento} onChange={(e) => setForm({ ...form, almacenamiento: e.target.value })}>
                  {["128 GB SSD", "256 GB SSD", "512 GB SSD", "1 TB SSD", "1 TB HDD"].map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Sistema Operativo</label>
                <select className="select-dark w-full" value={form.so} onChange={(e) => setForm({ ...form, so: e.target.value })}>
                  {["Windows 10 Pro", "Windows 11 Home", "Windows 11 Pro", "macOS", "Linux Ubuntu"].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Sección: Asignación y Ubicación */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3 flex items-center gap-2">
              <User size={14} className="text-ctp-cyan" /> Asignación y Ubicación
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Usuario</label>
                <select className="select-dark w-full" value={form.usuarioId} onChange={(e) => setForm({ ...form, usuarioId: e.target.value })}>
                  <option value="">Sin asignar</option>
                  {usuarios.map((u) => <option key={u.id} value={u.id}>{u.nombre} {u.apellido}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Área</label>
                <select className="select-dark w-full" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}>
                  <option value="">Seleccionar...</option>
                  {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Ubicación</label>
                <select className="select-dark w-full" value={form.ubicacion} onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}>
                  <option value="">Seleccionar...</option>
                  {UBICACIONES.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Sección: Compra y Garantía */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3 flex items-center gap-2">
              <ShieldCheck size={14} className="text-ctp-cyan" /> Compra y Garantía
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Fecha compra</label>
                <input type="date" className="input-dark w-full" value={form.fechaCompra} onChange={(e) => setForm({ ...form, fechaCompra: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Fecha garantía</label>
                <input type="date" className="input-dark w-full" value={form.fechaGarantia} onChange={(e) => setForm({ ...form, fechaGarantia: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Proveedor</label>
                <input type="text" className="input-dark w-full" value={form.proveedor} onChange={(e) => setForm({ ...form, proveedor: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Costo ($)</label>
                <input type="number" className="input-dark w-full" value={form.costo} onChange={(e) => setForm({ ...form, costo: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">Observaciones</label>
            <textarea className="input-dark w-full" rows="2" value={form.observaciones} onChange={(e) => setForm({ ...form, observaciones: e.target.value })} placeholder="Notas adicionales sobre el equipo..."></textarea>
          </div>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal show={!!showDetail} onClose={() => setShowDetail(null)} title="Detalle del activo" size="lg">
        {showDetail && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Info General */}
            <div className="inset-panel">
              <h6 className="flex items-center gap-2 text-sm font-bold text-text-primary mb-4">
                <Info size={16} className="text-ctp-cyan" />
                Información General
              </h6>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-sm text-text-muted font-medium">Código</span><span className="text-sm text-ctp-cyan font-bold">{showDetail.codigo}</span></div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-sm text-text-muted font-medium">Tipo</span><span className="text-sm font-medium">{showDetail.tipo}</span></div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-sm text-text-muted font-medium">Marca</span><span className="text-sm font-medium">{showDetail.marca}</span></div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-sm text-text-muted font-medium">Modelo</span><span className="text-sm font-medium">{showDetail.modelo}</span></div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-sm text-text-muted font-medium">Serial</span><span className="text-sm font-medium font-mono">{showDetail.serial}</span></div>
                <div className="flex justify-between items-center py-1.5"><span className="text-sm text-text-muted font-medium">Estado</span><StatusBadge estado={showDetail.estado} /></div>
              </div>
            </div>

            {/* Info Técnica */}
            <div className="inset-panel">
              <h6 className="flex items-center gap-2 text-sm font-bold text-text-primary mb-4">
                <Cpu size={16} className="text-ctp-cyan" />
                Información Técnica
              </h6>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-sm text-text-muted font-medium">Procesador</span><span className="text-sm font-medium">{showDetail.procesador || "-"}</span></div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-sm text-text-muted font-medium">RAM</span><span className="text-sm font-medium">{showDetail.ram || "-"}</span></div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-sm text-text-muted font-medium">Almacenamiento</span><span className="text-sm font-medium">{showDetail.almacenamiento || "-"}</span></div>
                <div className="flex justify-between items-center py-1.5"><span className="text-sm text-text-muted font-medium">SO</span><span className="text-sm font-medium">{showDetail.so || "-"}</span></div>
              </div>
            </div>

            {/* Asignación */}
            <div className="inset-panel">
              <h6 className="flex items-center gap-2 text-sm font-bold text-text-primary mb-4">
                <User size={16} className="text-ctp-cyan" />
                Asignación
              </h6>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-sm text-text-muted font-medium">Usuario</span><span className="text-sm font-medium">{getUsuarioNombre(showDetail.usuarioId)}</span></div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-sm text-text-muted font-medium">Área</span><span className="text-sm font-medium">{showDetail.area || "-"}</span></div>
                <div className="flex justify-between items-center py-1.5"><span className="text-sm text-text-muted font-medium">Ubicación</span><span className="text-sm font-medium">{showDetail.ubicacion || "-"}</span></div>
              </div>
            </div>

            {/* Garantía y Compra */}
            <div className="inset-panel">
              <h6 className="flex items-center gap-2 text-sm font-bold text-text-primary mb-4">
                <ShieldCheck size={16} className="text-ctp-cyan" />
                Garantía y Compra
              </h6>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-sm text-text-muted font-medium">Fecha compra</span><span className="text-sm font-medium">{showDetail.fechaCompra || "-"}</span></div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-sm text-text-muted font-medium">Garantía</span><span className="text-sm font-medium">{showDetail.fechaGarantia || "-"}</span></div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-sm text-text-muted font-medium">Proveedor</span><span className="text-sm font-medium">{showDetail.proveedor || "-"}</span></div>
                <div className="flex justify-between items-center py-1.5"><span className="text-sm text-text-muted font-medium">Costo</span><span className="text-sm font-bold text-ctp-cyan">{showDetail.costo ? `$${showDetail.costo.toLocaleString()}` : "-"}</span></div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Assign Modal */}
      <Modal
        show={!!showAssign}
        onClose={() => setShowAssign(null)}
        title="Asignar activo"
        size="md"
        footer={
          <>
            <button className="btn-ghost" onClick={() => setShowAssign(null)}>Cancelar</button>
            <button className="btn-ctp" onClick={handleAssign}>
              <UserCheck size={16} /> Asignar
            </button>
          </>
        }
      >
        {showAssign && (
          <div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-info/10 border border-info/20 mb-5 text-sm">
              <Info size={16} className="text-info shrink-0" />
              <span className="text-text-secondary">Asignando: <span className="font-bold text-text-primary">{showAssign.codigo}</span> — {showAssign.marca} {showAssign.modelo}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1.5">Usuario *</label>
                <select className="select-dark w-full" value={assignForm.usuarioId} onChange={(e) => setAssignForm({ ...assignForm, usuarioId: e.target.value })}>
                  <option value="">Seleccionar...</option>
                  {usuarios.filter((u) => u.estado === "Activo").map((u) => <option key={u.id} value={u.id}>{u.nombre} {u.apellido}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Área</label>
                <select className="select-dark w-full" value={assignForm.area} onChange={(e) => setAssignForm({ ...assignForm, area: e.target.value })}>
                  <option value="">Seleccionar...</option>
                  {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Ubicación</label>
                <select className="select-dark w-full" value={assignForm.ubicacion} onChange={(e) => setAssignForm({ ...assignForm, ubicacion: e.target.value })}>
                  <option value="">Seleccionar...</option>
                  {UBICACIONES.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Fecha</label>
                <input type="date" className="input-dark w-full" value={assignForm.fechaAsignacion} onChange={(e) => setAssignForm({ ...assignForm, fechaAsignacion: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1.5">Observaciones</label>
                <textarea className="input-dark w-full" rows="2" value={assignForm.observaciones} onChange={(e) => setAssignForm({ ...assignForm, observaciones: e.target.value })}></textarea>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal show={!!showDelete} onClose={() => setShowDelete(null)} onConfirm={handleDelete} message={`No se puede deshacer la eliminación de ${showDelete?.codigo} — ${showDelete?.marca} ${showDelete?.modelo}.`} />
    </div>
  );
}
