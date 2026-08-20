import { useState, useMemo } from "react";
import { getPerifericos, createPeriferico, updatePeriferico, deletePeriferico, getUsuarios, getUsuarioNombre } from "../services/inventarioService";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import SavingOverlay from "../components/SavingOverlay";
import ConfirmModal from "../components/ConfirmModal";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";
import StatCard from "../components/StatCard";
import { Eye, Pencil, Trash2, Keyboard, Package, UserCheck, ArchiveX } from "lucide-react";

const ESTADOS = ["Activo", "Disponible", "Dado de baja"];
const TIPOS_PER = ["Teclado", "Mouse", "Headset", "Webcam", "Docking Station", "Adaptador", "Cargador", "Fuente", "Cable"];
const MARCAS_PER = ["Dell", "HP", "Logitech", "Lenovo", "Jabra", "Microsoft", "APC", "Genérico"];
const PER_PAGE = 10;
const emptyForm = { codigo: "", tipo: "Teclado", marca: "Dell", modelo: "", serial: "", usuarioId: "", estado: "Activo", ubicacion: "" };

export default function Perifericos({ showToast }) {
  const [perifericos, setPerifericos] = useState(() => getPerifericos());
  const [search, setSearch] = useState("");
  const [fTipo, setFTipo] = useState("");
  const [fMarca, setFMarca] = useState("");
  const [fEstado, setFEstado] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [showDelete, setShowDelete] = useState(null);
  const [saving, setSaving] = useState(false);
  const usuarios = useMemo(() => getUsuarios(), []);

  const filtered = useMemo(() => perifericos.filter((p) => {
    const t = search.toLowerCase();
    return (
      (!t ||
        p.codigo.toLowerCase().includes(t) ||
        p.serial.toLowerCase().includes(t) ||
        p.marca.toLowerCase().includes(t) ||
        p.tipo.toLowerCase().includes(t) ||
        p.modelo.toLowerCase().includes(t)) &&
      (!fTipo || p.tipo === fTipo) &&
      (!fMarca || p.marca === fMarca) &&
      (!fEstado || p.estado === fEstado)
    );
  }), [perifericos, search, fTipo, fMarca, fEstado]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const total = perifericos.length;
  const asignados = perifericos.filter((p) => p.usuarioId && p.estado === "Activo").length;
  const disponibles = perifericos.filter((p) => p.estado === "Disponible").length;
  const dadosBaja = perifericos.filter((p) => p.estado === "Dado de baja").length;

  const openNew = () => { setForm({ ...emptyForm }); setEditingId(null); setShowForm(true); };
  const openEdit = (p) => { setForm({ ...p, usuarioId: p.usuarioId ? String(p.usuarioId) : "" }); setEditingId(p.id); setShowForm(true); };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    const data = { ...form, usuarioId: form.usuarioId ? Number(form.usuarioId) : null };
    if (editingId) { updatePeriferico(editingId, data); showToast("Periférico actualizado."); }
    else { createPeriferico(data); showToast("Periférico creado."); }
    setPerifericos(getPerifericos()); setShowForm(false); setSaving(false);
  };

  const handleDelete = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 300));
    deletePeriferico(showDelete.id); setPerifericos(getPerifericos()); setShowDelete(null); showToast("Periférico eliminado.", "danger"); setSaving(false);
  };

  const clearFilters = () => { setSearch(""); setFTipo(""); setFMarca(""); setFEstado(""); setPage(1); };

  const statCards = [
    { icon: Keyboard, label: "Total", value: total, color: "#0FDBF2", description: "Periféricos registrados" },
    { icon: UserCheck, label: "Asignados", value: asignados, color: "#10b981", description: "En uso por usuarios" },
    { icon: Package, label: "Disponibles", value: disponibles, color: "#3b82f6", description: "Sin asignar" },
    { icon: ArchiveX, label: "Dados de baja", value: dadosBaja, color: "#ef4444", description: "Retirados del inventario" },
  ];

  return (
    <div className="page-content">
      <PageHeader
        title="Periféricos"
        subtitle="Gestión de periféricos y accesorios"
        actionLabel="Nuevo periférico"
        actionIcon={Keyboard}
        onAction={openNew}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <StatCard
            key={s.label}
            icon={s.icon}
            value={s.value}
            label={s.label}
            description={s.description}
            color={s.color}
            index={i}
          />
        ))}
      </div>

      <div className="card-premium p-4 animate-fade-in-up">
          <FilterBar
            search={search}
            onSearchChange={(v) => { setSearch(v); setPage(1); }}
            searchPlaceholder="Buscar por código, serial, tipo o marca..."
            filters={[
              { key: "tipo", value: fTipo, onChange: (v) => { setFTipo(v); setPage(1); }, placeholder: "Todos los tipos", options: TIPOS_PER },
              { key: "marca", value: fMarca, onChange: (v) => { setFMarca(v); setPage(1); }, placeholder: "Todas las marcas", options: MARCAS_PER },
              { key: "estado", value: fEstado, onChange: (v) => { setFEstado(v); setPage(1); }, placeholder: "Todos los estados", options: ESTADOS },
            ]}
            onClear={clearFilters}
          />
      </div>

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
                    <EmptyState icon={Keyboard} onClear={clearFilters} />
                  </td>
                </tr>
              ) : (
                paginated.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <code className="text-ctp-cyan font-semibold">{p.codigo}</code>
                    </td>
                    <td className="text-text-secondary">{p.tipo}</td>
                    <td className="text-text-secondary">{p.marca}</td>
                    <td className="text-text-secondary">{p.modelo}</td>
                    <td className="text-text-muted text-xs">{p.serial}</td>
                    <td className="text-text-secondary">{getUsuarioNombre(p.usuarioId)}</td>
                    <td className="text-text-muted text-xs">{p.ubicacion || "-"}</td>
                    <td><StatusBadge estado={p.estado} /></td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-icon" title="Ver detalle" onClick={() => setShowDetail(p)}><Eye size={16} /></button>
                        <button className="btn-icon edit" title="Editar" onClick={() => openEdit(p)}><Pencil size={16} /></button>
                        <button className="btn-icon danger" title="Eliminar" onClick={() => setShowDelete(p)}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          totalItems={filtered.length}
          itemsPerPage={PER_PAGE}
          onPageChange={setPage}
        />
      </div>

      <Modal
        show={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? "Editar periférico" : "Nuevo periférico"}
        size="lg"
        footer={
          <>
            <button className="btn-ghost" onClick={() => setShowForm(false)} disabled={saving}>Cancelar</button>
            <button className="btn-ctp" onClick={handleSave} disabled={saving}>
              Guardar
            </button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="form-label">Código *</label>
            <input
              type="text"
              className="input-dark"
              value={form.codigo}
              onChange={(e) => setForm({ ...form, codigo: e.target.value })}
              placeholder="TI-PF-XXXXX"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="form-label">Tipo *</label>
            <select className="select-dark" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
              {TIPOS_PER.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="form-label">Marca *</label>
            <select className="select-dark" value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })}>
              {MARCAS_PER.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="form-label">Modelo *</label>
            <input
              type="text"
              className="input-dark"
              value={form.modelo}
              onChange={(e) => setForm({ ...form, modelo: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="form-label">Serial *</label>
            <input
              type="text"
              className="input-dark"
              value={form.serial}
              onChange={(e) => setForm({ ...form, serial: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="form-label">Estado</label>
            <select className="select-dark" value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
              {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="form-label">Usuario</label>
            <select className="select-dark" value={form.usuarioId} onChange={(e) => setForm({ ...form, usuarioId: e.target.value })}>
              <option value="">Sin asignar</option>
              {usuarios.map((u) => <option key={u.id} value={u.id}>{u.nombre} {u.apellido}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="form-label">Ubicación</label>
            <input
              type="text"
              className="input-dark"
              value={form.ubicacion}
              onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
            />
          </div>
        </div>
      </Modal>

      <Modal show={!!showDetail} onClose={() => setShowDetail(null)} title="Detalle del periférico" size="lg">
        {showDetail && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h6 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <Keyboard size={16} className="text-ctp-cyan" />
                Información General
              </h6>
              <div className="space-y-3 inset-panel">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Código</span>
                  <code className="text-sm text-ctp-cyan font-semibold">{showDetail.codigo}</code>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Tipo</span>
                  <span className="text-sm text-text-secondary">{showDetail.tipo}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Marca</span>
                  <span className="text-sm text-text-secondary">{showDetail.marca}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Modelo</span>
                  <span className="text-sm text-text-secondary">{showDetail.modelo}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Serial</span>
                  <span className="text-sm text-text-secondary">{showDetail.serial}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Estado</span>
                  <StatusBadge estado={showDetail.estado} />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h6 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <UserCheck size={16} className="text-ctp-cyan" />
                Asignación
              </h6>
              <div className="space-y-3 inset-panel">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Usuario</span>
                  <span className="text-sm text-text-secondary">{getUsuarioNombre(showDetail.usuarioId)}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Ubicación</span>
                  <span className="text-sm text-text-secondary">{showDetail.ubicacion || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        show={!!showDelete}
        onClose={() => setShowDelete(null)}
        onConfirm={handleDelete}
        saving={saving}
        message={`¿Eliminar periférico ${showDelete?.codigo}? Esta acción no se puede deshacer.`}
      />
      <SavingOverlay show={saving} type={showDelete ? "delete" : "save"} />
    </div>
  );
}
