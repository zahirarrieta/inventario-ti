import { useState, useMemo } from "react";
import { getImpresoras, createImpresora, updateImpresora, deleteImpresora, getUsuarios, getUsuarioNombre } from "../services/inventarioService";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import SavingOverlay from "../components/SavingOverlay";
import ConfirmModal from "../components/ConfirmModal";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";
import StatCard from "../components/StatCard";
import { Eye, Pencil, Trash2, Printer } from "lucide-react";

const ESTADOS = ["Activo", "Disponible", "En mantenimiento", "Dado de baja"];
const TIPOS_IMP = ["Láser", "Inyección", "Multifuncional", "Térmica"];
const MARCAS_IMP = ["HP", "Epson", "Brother", "Samsung", "Zebra"];
const PER_PAGE = 10;
const emptyForm = { codigo: "", marca: "HP", modelo: "", serial: "", tipo: "Láser", ip: "", ubicacion: "", area: "", estado: "Activo", contador: 0, usuarioResponsableId: "" };

export default function Impresoras({ showToast }) {
  const [impresoras, setImpresoras] = useState(() => getImpresoras());
  const [search, setSearch] = useState("");
  const [fMarca, setFMarca] = useState("");
  const [fTipo, setFTipo] = useState("");
  const [fEstado, setFEstado] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [showDelete, setShowDelete] = useState(null);
  const [saving, setSaving] = useState(false);
  const usuarios = useMemo(() => getUsuarios(), []);

  const filtered = useMemo(() => impresoras.filter((i) => {
    const t = search.toLowerCase();
    return (!t || i.codigo.toLowerCase().includes(t) || i.serial.toLowerCase().includes(t) || i.marca.toLowerCase().includes(t) || i.modelo.toLowerCase().includes(t))
      && (!fMarca || i.marca === fMarca)
      && (!fTipo || i.tipo === fTipo)
      && (!fEstado || i.estado === fEstado);
  }), [impresoras, search, fMarca, fTipo, fEstado]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const totalAll = impresoras.length;
  const totalActivas = impresoras.filter((i) => i.estado === "Activo").length;
  const totalBaja = impresoras.filter((i) => i.estado === "Dado de baja").length;
  const totalMantenimiento = impresoras.filter((i) => i.estado === "En mantenimiento").length;

  const openNew = () => { setForm({ ...emptyForm }); setEditingId(null); setShowForm(true); };
  const openEdit = (imp) => { setForm({ ...imp, usuarioResponsableId: imp.usuarioResponsableId ? String(imp.usuarioResponsableId) : "" }); setEditingId(imp.id); setShowForm(true); };
  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    const data = { ...form, usuarioResponsableId: form.usuarioResponsableId ? Number(form.usuarioResponsableId) : null, contador: Number(form.contador) || 0 };
    if (editingId) { updateImpresora(editingId, data); showToast("Impresora actualizada."); }
    else { createImpresora(data); showToast("Impresora creada."); }
    setImpresoras(getImpresoras()); setShowForm(false); setSaving(false);
  };
  const handleDelete = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 300));
    deleteImpresora(showDelete.id); setImpresoras(getImpresoras()); setShowDelete(null); showToast("Impresora eliminada.", "danger"); setSaving(false);
  };
  const clearFilters = () => { setSearch(""); setFMarca(""); setFTipo(""); setFEstado(""); setPage(1); };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Impresoras" subtitle="Gestión de dispositivos de impresión" actionLabel="Nueva impresora" actionIcon={Printer} onAction={openNew} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Printer} value={totalAll} label="Total" description="Impresoras registradas" color="#0FDBF2" index={0} />
        <StatCard icon={Printer} value={totalActivas} label="Activas" description="En operación normal" color="#10b981" index={1} />
        <StatCard icon={Printer} value={totalBaja} label="Fuera de servicio" description="Dadas de baja" color="#ef4444" index={2} />
        <StatCard icon={Printer} value={totalMantenimiento} label="Mantenimiento" description="En reparación" color="#f59e0b" index={3} />
      </div>

      <div className="card-premium p-4 animate-fade-in-up">
        <FilterBar
          search={search}
          onSearchChange={(v) => { setSearch(v); setPage(1); }}
          searchPlaceholder="Buscar por código, serial, marca o modelo..."
          filters={[
            { key: "marca", value: fMarca, onChange: (v) => { setFMarca(v); setPage(1); }, placeholder: "Todas las marcas", options: MARCAS_IMP },
            { key: "tipo", value: fTipo, onChange: (v) => { setFTipo(v); setPage(1); }, placeholder: "Todos los tipos", options: TIPOS_IMP },
            { key: "estado", value: fEstado, onChange: (v) => { setFEstado(v); setPage(1); }, placeholder: "Todos los estados", options: ESTADOS },
          ]}
          onClear={clearFilters}
        />
      </div>

      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-dark-ctp">
            <thead>
              <tr>
                <th>Código</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Tipo</th>
                <th>IP</th>
                <th>Serial</th>
                <th>Ubicación</th>
                <th>Contador</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan="10"><EmptyState onClear={clearFilters} /></td></tr>
              ) : paginated.map((imp) => (
                <tr key={imp.id}>
                  <td><span className="font-semibold text-ctp-cyan">{imp.codigo}</span></td>
                  <td>{imp.marca}</td>
                  <td>{imp.modelo}</td>
                  <td>{imp.tipo}</td>
                  <td><span className="text-text-muted text-xs">{imp.ip || "-"}</span></td>
                  <td><span className="text-text-muted text-xs">{imp.serial}</span></td>
                  <td><span className="text-xs">{imp.ubicacion || "-"}</span></td>
                  <td>{imp.contador.toLocaleString()}</td>
                  <td><StatusBadge estado={imp.estado} /></td>
                  <td>
                    <div className="table-actions">
                      <button onClick={() => setShowDetail(imp)} className="btn-icon" title="Ver detalle"><Eye size={16} /></button>
                      <button onClick={() => openEdit(imp)} className="btn-icon edit" title="Editar"><Pencil size={16} /></button>
                      <button onClick={() => setShowDelete(imp)} className="btn-icon danger" title="Eliminar"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} totalItems={filtered.length} itemsPerPage={PER_PAGE} onPageChange={setPage} />
      </div>

      <Modal show={showForm} onClose={() => setShowForm(false)} title={editingId ? "Editar impresora" : "Nueva impresora"} size="lg"
        footer={<><button className="btn-ghost" onClick={() => setShowForm(false)} disabled={saving}>Cancelar</button><button className="btn-ctp" onClick={handleSave} disabled={saving}>Guardar</button></>}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Código *</label>
            <input type="text" className="input-dark w-full" value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })} placeholder="TI-PR-XXXXX" />
          </div>
          <div>
            <label className="form-label">Marca *</label>
            <select className="select-dark w-full" value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })}>{MARCAS_IMP.map((m) => <option key={m} value={m}>{m}</option>)}</select>
          </div>
          <div>
            <label className="form-label">Modelo *</label>
            <input type="text" className="input-dark w-full" value={form.modelo} onChange={(e) => setForm({ ...form, modelo: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Serial *</label>
            <input type="text" className="input-dark w-full" value={form.serial} onChange={(e) => setForm({ ...form, serial: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Tipo *</label>
            <select className="select-dark w-full" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>{TIPOS_IMP.map((t) => <option key={t} value={t}>{t}</option>)}</select>
          </div>
          <div>
            <label className="form-label">IP</label>
            <input type="text" className="input-dark w-full" value={form.ip} onChange={(e) => setForm({ ...form, ip: e.target.value })} placeholder="192.168.1.xxx" />
          </div>
          <div>
            <label className="form-label">Área</label>
            <input type="text" className="input-dark w-full" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Ubicación</label>
            <input type="text" className="input-dark w-full" value={form.ubicacion} onChange={(e) => setForm({ ...form, ubicacion: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Estado</label>
            <select className="select-dark w-full" value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>{ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}</select>
          </div>
          <div>
            <label className="form-label">Contador (páginas)</label>
            <input type="number" className="input-dark w-full" value={form.contador} onChange={(e) => setForm({ ...form, contador: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <label className="form-label">Responsable</label>
            <select className="select-dark w-full" value={form.usuarioResponsableId} onChange={(e) => setForm({ ...form, usuarioResponsableId: e.target.value })}>
              <option value="">Sin asignar</option>
              {usuarios.map((u) => <option key={u.id} value={u.id}>{u.nombre} {u.apellido}</option>)}
            </select>
          </div>
        </div>
      </Modal>

      <Modal show={!!showDetail} onClose={() => setShowDetail(null)} title="Detalle de impresora" size="lg">
        {showDetail && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="inset-panel space-y-3">
              <h6 className="flex items-center gap-2 text-sm font-bold text-text-primary">
                <Printer size={16} className="text-ctp-cyan" /> Información General
              </h6>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-xs text-text-muted">Código</span><span className="text-sm font-semibold text-ctp-cyan">{showDetail.codigo}</span></div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-xs text-text-muted">Marca</span><span className="text-sm text-text-secondary">{showDetail.marca}</span></div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-xs text-text-muted">Modelo</span><span className="text-sm text-text-secondary">{showDetail.modelo}</span></div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-xs text-text-muted">Serial</span><span className="text-sm text-text-secondary">{showDetail.serial}</span></div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-xs text-text-muted">Tipo</span><span className="text-sm text-text-secondary">{showDetail.tipo}</span></div>
              <div className="flex justify-between items-center py-1.5"><span className="text-xs text-text-muted">Estado</span><StatusBadge estado={showDetail.estado} /></div>
            </div>
            <div className="inset-panel space-y-3">
              <h6 className="flex items-center gap-2 text-sm font-bold text-text-primary">
                <Printer size={16} className="text-ctp-cyan" /> Red y Ubicación
              </h6>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-xs text-text-muted">IP</span><span className="text-sm text-text-secondary">{showDetail.ip || "-"}</span></div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-xs text-text-muted">Área</span><span className="text-sm text-text-secondary">{showDetail.area || "-"}</span></div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-xs text-text-muted">Ubicación</span><span className="text-sm text-text-secondary">{showDetail.ubicacion || "-"}</span></div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5"><span className="text-xs text-text-muted">Contador</span><span className="text-sm text-text-secondary">{showDetail.contador.toLocaleString()} páginas</span></div>
              <div className="flex justify-between items-center py-1.5"><span className="text-xs text-text-muted">Responsable</span><span className="text-sm text-text-secondary">{getUsuarioNombre(showDetail.usuarioResponsableId)}</span></div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal show={!!showDelete} onClose={() => setShowDelete(null)} onConfirm={handleDelete} saving={saving} message={`¿Eliminar impresora ${showDelete?.codigo}? Esta acción no se puede deshacer.`} />
      <SavingOverlay show={saving} type={showDelete ? "delete" : "save"} />
    </div>
  );
}
