import { useState, useMemo } from "react";
import { getMantenimientos, createMantenimiento, updateMantenimiento, deleteMantenimiento, getEquipos } from "../services/inventarioService";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import ButtonSpinner from "../components/ButtonSpinner";
import ConfirmModal from "../components/ConfirmModal";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";
import StatCard from "../components/StatCard";
import { Eye, Pencil, Trash2, Wrench, CalendarCheck, ArrowRightCircle, CheckCircle, Clock } from "lucide-react";

const ESTADOS_M = ["Programado", "En proceso", "Finalizado", "Cancelado"];
const TIPOS_MTTO = ["Preventivo", "Correctivo"];
const PER_PAGE = 10;
const emptyForm = { codigo: "", activoId: "", activoCodigo: "", tipo: "Preventivo", fecha: "", tecnico: "", descripcion: "", costo: "", estado: "Programado", proximaFecha: "" };

export default function Mantenimientos({ showToast }) {
  const [mantenimientos, setMantenimientos] = useState(() => getMantenimientos());
  const [search, setSearch] = useState("");
  const [fTipo, setFTipo] = useState("");
  const [fEstado, setFEstado] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [showDelete, setShowDelete] = useState(null);
  const [saving, setSaving] = useState(false);
  const equipos = useMemo(() => getEquipos(), []);

  const filtered = useMemo(() => mantenimientos.filter((m) => {
    const t = search.toLowerCase();
    return (!t || m.codigo.toLowerCase().includes(t) || m.activoCodigo.toLowerCase().includes(t) || m.tecnico.toLowerCase().includes(t)) && (!fTipo || m.tipo === fTipo) && (!fEstado || m.estado === fEstado);
  }), [mantenimientos, search, fTipo, fEstado]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const statsMtto = useMemo(() => ({
    programados: mantenimientos.filter((m) => m.estado === "Programado").length,
    enProceso: mantenimientos.filter((m) => m.estado === "En proceso").length,
    finalizados: mantenimientos.filter((m) => m.estado === "Finalizado").length,
    total: mantenimientos.length,
  }), [mantenimientos]);

  const openNew = () => { setForm({ ...emptyForm }); setEditingId(null); setShowForm(true); };
  const openEdit = (m) => { setForm({ ...m, costo: String(m.costo || ""), activoId: String(m.activoId || "") }); setEditingId(m.id); setShowForm(true); };
  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    const eq = equipos.find((e) => e.id === Number(form.activoId));
    const data = { ...form, activoId: form.activoId ? Number(form.activoId) : null, activoCodigo: eq ? eq.codigo : form.activoCodigo, costo: form.costo ? Number(form.costo) : 0 };
    if (editingId) { updateMantenimiento(editingId, data); showToast("Mantenimiento actualizado."); }
    else { createMantenimiento(data); showToast("Mantenimiento creado."); }
    setMantenimientos(getMantenimientos()); setShowForm(false); setSaving(false);
  };
  const handleDelete = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 300));
    deleteMantenimiento(showDelete.id); setMantenimientos(getMantenimientos()); setShowDelete(null); showToast("Mantenimiento eliminado.", "danger"); setSaving(false);
  };
  const clearFilters = () => { setSearch(""); setFTipo(""); setFEstado(""); setPage(1); };

  const getTipoBadge = (tipo) => tipo === "Preventivo"
    ? "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-ctp-cyan/10 text-ctp-cyan border border-ctp-cyan/25"
    : "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-warning/10 text-warning border border-warning/25";

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Mantenimientos" subtitle="Gestión de mantenimientos preventivos y correctivos" actionLabel="Nuevo mantenimiento" onAction={openNew} actionIcon={Wrench} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CalendarCheck} value={statsMtto.programados} label="Programados" color="#3b82f6" index={0} />
        <StatCard icon={Clock} value={statsMtto.enProceso} label="En proceso" color="#f59e0b" index={1} />
        <StatCard icon={CheckCircle} value={statsMtto.finalizados} label="Finalizados" color="#10b981" index={2} />
        <StatCard icon={ArrowRightCircle} value={statsMtto.total} label="Total registros" color="#023859" index={3} />
      </div>

      <div className="card-premium p-4 animate-fade-in-up">
        <FilterBar
          search={search}
          onSearchChange={(val) => { setSearch(val); setPage(1); }}
          searchPlaceholder="Buscar por código, activo o técnico"
          filters={[
            { key: "tipo", value: fTipo, placeholder: "Todos los tipos", options: TIPOS_MTTO, onChange: (val) => { setFTipo(val); setPage(1); } },
            { key: "estado", value: fEstado, placeholder: "Todos los estados", options: ESTADOS_M, onChange: (val) => { setFEstado(val); setPage(1); } },
          ]}
          onClear={clearFilters}
        />
      </div>

      <div className="card-premium overflow-hidden animate-fade-in-up stagger-2">
        <div className="overflow-x-auto">
          <table className="table-dark-ctp">
            <thead>
              <tr>
                <th>Código</th>
                <th>Activo</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Técnico</th>
                <th>Descripción</th>
                <th>Costo</th>
                <th>Estado</th>
                <th>Próximo mtto.</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="10">
                    <EmptyState onClear={clearFilters} />
                  </td>
                </tr>
              ) : (
                paginated.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <code className="text-ctp-cyan font-semibold text-sm">{m.codigo}</code>
                    </td>
                    <td>
                      <span className="font-semibold text-sm text-text-primary">{m.activoCodigo}</span>
                    </td>
                    <td>
                      <span className={getTipoBadge(m.tipo)}>{m.tipo}</span>
                    </td>
                    <td>
                      <span className="text-xs text-text-muted">{m.fecha}</span>
                    </td>
                    <td>
                      <span className="text-xs text-text-muted">{m.tecnico}</span>
                    </td>
                    <td>
                      <span className="text-xs text-text-muted max-w-[180px] inline-block overflow-hidden text-ellipsis whitespace-nowrap">{m.descripcion}</span>
                    </td>
                    <td>
                      {m.costo ? `$${m.costo.toLocaleString()}` : <span className="text-text-muted">-</span>}
                    </td>
                    <td>
                      <StatusBadge estado={m.estado} />
                    </td>
                    <td>
                      <span className="text-xs text-text-muted">{m.proximaFecha || "-"}</span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-icon" title="Ver detalle" onClick={() => setShowDetail(m)}><Eye size={16} /></button>
                        <button className="btn-icon edit" title="Editar" onClick={() => openEdit(m)}><Pencil size={16} /></button>
                        <button className="btn-icon danger" title="Eliminar" onClick={() => setShowDelete(m)}><Trash2 size={16} /></button>
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

      <Modal
        show={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? "Editar mantenimiento" : "Nuevo mantenimiento"}
        size="lg"
        footer={
          <>
            <button className="btn-ghost" onClick={() => setShowForm(false)} disabled={saving}>Cancelar</button>
            <button className="btn-ctp" onClick={handleSave} disabled={saving}>
              {saving ? <><ButtonSpinner size={16} /> Guardando...</> : `${editingId ? "Actualizar" : "Crear"} mantenimiento`}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Código</label>
            <input type="text" className="input-dark w-full" value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })} placeholder="MTTO-XXX" />
          </div>
          <div className="lg:col-span-2">
            <label className="form-label">Activo *</label>
            <select className="select-dark w-full" value={form.activoId} onChange={(e) => setForm({ ...form, activoId: e.target.value })}>
              <option value="">Seleccionar activo...</option>
              {equipos.map((eq) => (
                <option key={eq.id} value={eq.id}>{eq.codigo} - {eq.marca} {eq.modelo}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Tipo *</label>
            <select className="select-dark w-full" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
              {TIPOS_MTTO.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Fecha *</label>
            <input type="date" className="input-dark w-full" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Estado</label>
            <select className="select-dark w-full" value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
              {ESTADOS_M.map((es) => <option key={es} value={es}>{es}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Técnico *</label>
            <input type="text" className="input-dark w-full" value={form.tecnico} onChange={(e) => setForm({ ...form, tecnico: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Costo ($)</label>
            <input type="number" className="input-dark w-full" value={form.costo} onChange={(e) => setForm({ ...form, costo: e.target.value })} />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className="form-label">Descripción *</label>
            <textarea className="input-dark w-full" rows="3" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Describa el trabajo realizado..."></textarea>
          </div>
          <div>
            <label className="form-label">Próxima fecha</label>
            <input type="date" className="input-dark w-full" value={form.proximaFecha} onChange={(e) => setForm({ ...form, proximaFecha: e.target.value })} />
          </div>
        </div>
      </Modal>

      <Modal show={!!showDetail} onClose={() => setShowDetail(null)} title="Detalle del mantenimiento" size="lg">
        {showDetail && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="inset-panel">
              <h6 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
                <Wrench size={16} className="text-ctp-cyan" />
                Información del Mantenimiento
              </h6>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-text-muted">Código:</span><span className="text-ctp-cyan font-semibold">{showDetail.codigo}</span></div>
                <div className="flex justify-between text-sm"><span className="text-text-muted">Activo:</span><span className="text-text-primary font-semibold">{showDetail.activoCodigo}</span></div>
                <div className="flex justify-between text-sm"><span className="text-text-muted">Tipo:</span><span className={getTipoBadge(showDetail.tipo)}>{showDetail.tipo}</span></div>
                <div className="flex justify-between text-sm"><span className="text-text-muted">Fecha:</span><span className="text-text-secondary">{showDetail.fecha}</span></div>
                <div className="flex justify-between text-sm items-center"><span className="text-text-muted">Estado:</span><StatusBadge estado={showDetail.estado} /></div>
              </div>
            </div>
            <div className="inset-panel">
              <h6 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
                <Clock size={16} className="text-ctp-cyan" />
                Detalles
              </h6>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-text-muted">Técnico:</span><span className="text-text-secondary">{showDetail.tecnico}</span></div>
                <div className="flex justify-between text-sm"><span className="text-text-muted">Costo:</span><span className="text-text-secondary">{showDetail.costo ? `$${showDetail.costo.toLocaleString()}` : "N/A"}</span></div>
                <div className="flex justify-between text-sm"><span className="text-text-muted">Próximo mtto.:</span><span className="text-text-secondary">{showDetail.proximaFecha || "N/A"}</span></div>
              </div>
            </div>
            <div className="md:col-span-2 inset-panel">
              <h6 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
                <Eye size={16} className="text-ctp-cyan" />
                Descripción
              </h6>
              <p className="text-sm text-text-secondary mb-0">{showDetail.descripcion}</p>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal show={!!showDelete} onClose={() => setShowDelete(null)} onConfirm={handleDelete} saving={saving} message={`No se puede deshacer la eliminación de ${showDelete?.codigo}.`} />
    </div>
  );
}
