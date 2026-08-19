import { useState, useMemo } from "react";
import { getMonitores, createMonitor, updateMonitor, deleteMonitor, getUsuarios, getUsuarioNombre } from "../services/inventarioService";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import ConfirmModal from "../components/ConfirmModal";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";
import { Eye, Pencil, Trash2, Monitor as MonitorIcon, Users, CheckCircle, Wrench } from "lucide-react";

const ESTADOS = ["Activo", "Disponible", "En mantenimiento", "Dado de baja"];
const MARCAS = ["Dell", "HP", "Lenovo", "Samsung", "LG", "AOC"];
const PER_PAGE = 10;
const emptyForm = { codigo: "", marca: "Dell", modelo: "", serial: "", tamano: '24"', resolucion: "1920x1080", tipoPanel: "IPS", fechaCompra: "", estado: "Activo", usuarioId: "", area: "", ubicacion: "" };

export default function Monitores({ showToast }) {
  const [monitores, setMonitores] = useState(() => getMonitores());
  const [search, setSearch] = useState("");
  const [fMarca, setFMarca] = useState("");
  const [fEstado, setFEstado] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [showDelete, setShowDelete] = useState(null);
  const usuarios = useMemo(() => getUsuarios(), []);

  const stats = useMemo(() => ({
    total: monitores.length,
    asignados: monitores.filter((m) => m.usuarioId != null).length,
    disponibles: monitores.filter((m) => m.estado === "Disponible").length,
    mantenimiento: monitores.filter((m) => m.estado === "En mantenimiento").length,
  }), [monitores]);

  const filtered = useMemo(() => monitores.filter((m) => {
    const t = search.toLowerCase();
    return (!t || m.codigo.toLowerCase().includes(t) || m.serial.toLowerCase().includes(t) || m.marca.toLowerCase().includes(t)) && (!fMarca || m.marca === fMarca) && (!fEstado || m.estado === fEstado);
  }), [monitores, search, fMarca, fEstado]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const openNew = () => { setForm({ ...emptyForm }); setEditingId(null); setShowForm(true); };
  const openEdit = (m) => { setForm({ ...m, usuarioId: m.usuarioId ? String(m.usuarioId) : "" }); setEditingId(m.id); setShowForm(true); };
  const handleSave = () => {
    const data = { ...form, usuarioId: form.usuarioId ? Number(form.usuarioId) : null };
    if (editingId) { updateMonitor(editingId, data); showToast("Monitor actualizado."); }
    else { createMonitor(data); showToast("Monitor creado."); }
    setMonitores(getMonitores()); setShowForm(false);
  };
  const handleDelete = () => { deleteMonitor(showDelete.id); setMonitores(getMonitores()); setShowDelete(null); showToast("Monitor eliminado.", "danger"); };
  const clearFilters = () => { setSearch(""); setFMarca(""); setFEstado(""); setPage(1); };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Monitores"
        subtitle="Gestión de monitores y pantallas"
        actionLabel="Nuevo monitor"
        onAction={openNew}
        actionIcon={MonitorIcon}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={MonitorIcon} value={stats.total} label="Total" description="Monitores registrados" color="#0FDBF2" delay={0} />
        <StatCard icon={Users} value={stats.asignados} label="Asignados" description="Con usuario asignado" color="#3b82f6" delay={0.05} />
        <StatCard icon={CheckCircle} value={stats.disponibles} label="Disponibles" description="Sin asignar" color="#10b981" delay={0.10} />
        <StatCard icon={Wrench} value={stats.mantenimiento} label="Mantenimiento" description="En reparación" color="#f59e0b" delay={0.15} />
      </div>

      <div className="card-premium p-5 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <FilterBar
          search={search}
          onSearchChange={(v) => { setSearch(v); setPage(1); }}
          searchPlaceholder="Buscar por código, serial o marca"
          filters={[
            { key: "marca", value: fMarca, onChange: (v) => { setFMarca(v); setPage(1); }, placeholder: "Todas las marcas", options: MARCAS },
            { key: "estado", value: fEstado, onChange: (v) => { setFEstado(v); setPage(1); }, placeholder: "Todos los estados", options: ESTADOS },
          ]}
          onClear={clearFilters}
        />
      </div>

      <div className="card-premium overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
        <div className="overflow-x-auto">
          <table className="table-dark-ctp">
            <thead>
              <tr>
                <th>Código</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Tamaño</th>
                <th>Resolución</th>
                <th>Serial</th>
                <th>Usuario</th>
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
              ) : paginated.map((m) => (
                <tr key={m.id}>
                  <td><code className="text-ctp-cyan font-semibold text-xs">{m.codigo}</code></td>
                  <td>{m.marca}</td>
                  <td>{m.modelo}</td>
                  <td>{m.tamano}</td>
                  <td><span className="text-text-muted text-xs">{m.resolucion}</span></td>
                  <td><span className="text-text-muted text-xs">{m.serial}</span></td>
                  <td>{getUsuarioNombre(m.usuarioId)}</td>
                  <td><StatusBadge estado={m.estado} /></td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setShowDetail(m)}
                        className="p-2 rounded-lg hover:bg-white/5 text-text-muted hover:text-ctp-cyan transition-all"
                        title="Ver detalle"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => openEdit(m)}
                        className="p-2 rounded-lg hover:bg-white/5 text-text-muted hover:text-ctp-cyan transition-all"
                        title="Editar"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setShowDelete(m)}
                        className="p-2 rounded-lg hover:bg-white/5 text-text-muted hover:text-danger transition-all"
                        title="Eliminar"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} totalItems={filtered.length} itemsPerPage={PER_PAGE} onPageChange={setPage} />
      </div>

      <Modal show={showForm} onClose={() => setShowForm(false)} title={editingId ? "Editar monitor" : "Nuevo monitor"} size="lg"
        footer={
          <>
            <button className="btn-ghost" onClick={() => setShowForm(false)}>Cancelar</button>
            <button className="btn-ctp" onClick={handleSave}>Guardar</button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1.5">Código *</label>
            <input type="text" className="input-dark" value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })} placeholder="TI-MN-XXXXX" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1.5">Marca *</label>
            <select className="select-dark" value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })}>
              {MARCAS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1.5">Modelo *</label>
            <input type="text" className="input-dark" value={form.modelo} onChange={(e) => setForm({ ...form, modelo: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1.5">Serial *</label>
            <input type="text" className="input-dark" value={form.serial} onChange={(e) => setForm({ ...form, serial: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1.5">Tamaño</label>
            <select className="select-dark" value={form.tamano} onChange={(e) => setForm({ ...form, tamano: e.target.value })}>
              {['22"', '24"', '27"', '32"'].map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1.5">Resolución</label>
            <select className="select-dark" value={form.resolucion} onChange={(e) => setForm({ ...form, resolucion: e.target.value })}>
              {["1920x1080", "2560x1440", "3840x2160"].map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1.5">Tipo de panel</label>
            <select className="select-dark" value={form.tipoPanel} onChange={(e) => setForm({ ...form, tipoPanel: e.target.value })}>
              {["IPS", "VA", "TN", "OLED"].map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1.5">Fecha de compra</label>
            <input type="date" className="input-dark" value={form.fechaCompra} onChange={(e) => setForm({ ...form, fechaCompra: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1.5">Estado</label>
            <select className="select-dark" value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
              {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1.5">Usuario</label>
            <select className="select-dark" value={form.usuarioId} onChange={(e) => setForm({ ...form, usuarioId: e.target.value })}>
              <option value="">Sin asignar</option>
              {usuarios.map((u) => <option key={u.id} value={u.id}>{u.nombre} {u.apellido}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1.5">Área</label>
            <input type="text" className="input-dark" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1.5">Ubicación</label>
            <input type="text" className="input-dark" value={form.ubicacion} onChange={(e) => setForm({ ...form, ubicacion: e.target.value })} />
          </div>
        </div>
      </Modal>

      <Modal show={!!showDetail} onClose={() => setShowDetail(null)} title="Detalle del monitor" size="lg">
        {showDetail && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-ctp-cyan/10 flex items-center justify-center">
                  <MonitorIcon size={16} className="text-ctp-cyan" />
                </div>
                <h6 className="text-sm font-bold text-text-primary">Información General</h6>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className="text-xs text-text-muted">Código:</span><span className="text-sm font-semibold text-ctp-cyan">{showDetail.codigo}</span></div>
                <div className="flex justify-between items-center"><span className="text-xs text-text-muted">Marca:</span><span className="text-sm text-text-primary">{showDetail.marca}</span></div>
                <div className="flex justify-between items-center"><span className="text-xs text-text-muted">Modelo:</span><span className="text-sm text-text-primary">{showDetail.modelo}</span></div>
                <div className="flex justify-between items-center"><span className="text-xs text-text-muted">Serial:</span><span className="text-sm text-text-primary">{showDetail.serial}</span></div>
                <div className="flex justify-between items-center"><span className="text-xs text-text-muted">Estado:</span><StatusBadge estado={showDetail.estado} /></div>
              </div>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-ctp-cyan/10 flex items-center justify-center">
                  <MonitorIcon size={16} className="text-ctp-cyan" />
                </div>
                <h6 className="text-sm font-bold text-text-primary">Especificaciones</h6>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className="text-xs text-text-muted">Tamaño:</span><span className="text-sm text-text-primary">{showDetail.tamano}</span></div>
                <div className="flex justify-between items-center"><span className="text-xs text-text-muted">Resolución:</span><span className="text-sm text-text-primary">{showDetail.resolucion}</span></div>
                <div className="flex justify-between items-center"><span className="text-xs text-text-muted">Panel:</span><span className="text-sm text-text-primary">{showDetail.tipoPanel}</span></div>
                <div className="flex justify-between items-center"><span className="text-xs text-text-muted">Usuario:</span><span className="text-sm text-text-primary">{getUsuarioNombre(showDetail.usuarioId)}</span></div>
                <div className="flex justify-between items-center"><span className="text-xs text-text-muted">Ubicación:</span><span className="text-sm text-text-primary">{showDetail.ubicacion || "-"}</span></div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal show={!!showDelete} onClose={() => setShowDelete(null)} onConfirm={handleDelete} message={`Eliminar monitor ${showDelete?.codigo}?`} />
    </div>
  );
}
