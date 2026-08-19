import { useState, useMemo } from "react";
import { getSoftware, createSoftware, updateSoftware, deleteSoftware, getLicenciasResumen } from "../services/inventarioService";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import ConfirmModal from "../components/ConfirmModal";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";
import StatCard from "../components/StatCard";
import { Eye, Pencil, Trash2, Box, Key, AlertTriangle, CheckCircle } from "lucide-react";

const TIPOS_LICENCIA = ["Suscripción", "OEM", "Gratuita", "Incluido", "Perpetua"];
const ESTADOS = ["Activo", "Por vencer", "Vencido", "Suspendido"];
const PER_PAGE = 10;

const emptyForm = {
  nombre: "", fabricante: "", version: "", tipoLicencia: "Suscripción", clave: "",
  cantidadAdquirida: 1, cantidadUtilizada: 0, fechaCompra: "", fechaVencimiento: "",
  proveedor: "", estado: "Activo",
};

export default function Software({ showToast }) {
  const [software, setSoftware] = useState(() => getSoftware());
  const [search, setSearch] = useState("");
  const [fEstado, setFEstado] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [showDelete, setShowDelete] = useState(null);

  const licencias = useMemo(() => getLicenciasResumen(), []);

  const filtered = useMemo(() => software.filter((s) => {
    const t = search.toLowerCase();
    return (
      (!t || s.nombre.toLowerCase().includes(t) || s.fabricante.toLowerCase().includes(t)) &&
      (!fEstado || s.estado === fEstado)
    );
  }), [software, search, fEstado]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const openNew = () => { setForm({ ...emptyForm }); setEditingId(null); setShowForm(true); };
  const openEdit = (s) => { setForm({ ...s }); setEditingId(s.id); setShowForm(true); };

  const handleSave = () => {
    const data = {
      ...form,
      cantidadAdquirida: Number(form.cantidadAdquirida),
      cantidadUtilizada: Number(form.cantidadUtilizada),
    };
    if (editingId) { updateSoftware(editingId, data); showToast("Software actualizado correctamente."); }
    else { createSoftware(data); showToast("Software creado correctamente."); }
    setSoftware(getSoftware());
    setShowForm(false);
  };

  const handleDelete = () => {
    deleteSoftware(showDelete.id);
    setSoftware(getSoftware());
    setShowDelete(null);
    showToast("Software eliminado.", "danger");
  };

  const clearFilters = () => { setSearch(""); setFEstado(""); setPage(1); };

  return (
    <div className="p-6 animate-fade-in">
      <PageHeader
        title="Software y Licencias"
        subtitle="Gestión de software y licencias"
        actionLabel="Nuevo software"
        actionIcon={Box}
        onAction={openNew}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={CheckCircle} value={licencias.disponibles} label="Disponibles" color="#10b981" delay={0} />
        <StatCard icon={Key} value={licencias.utilizadas} label="Utilizadas" color="var(--ctp-blue)" delay={0.1} />
        <StatCard icon={AlertTriangle} value={licencias.porVencer} label="Por vencer" color="#f59e0b" delay={0.2} />
        <StatCard icon={Trash2} value={licencias.vencidas} label="Vencidas" color="#ef4444" delay={0.3} />
      </div>

      <div className="card-premium p-4 border-b border-white/5 mb-4 animate-fade-in-up">
        <FilterBar
          search={search}
          onSearchChange={(val) => { setSearch(val); setPage(1); }}
          searchPlaceholder="Buscar por nombre, fabricante o versión"
          filters={[
            {
              key: "estado",
              value: fEstado,
              placeholder: "Todos los estados",
              options: ESTADOS,
              onChange: (val) => { setFEstado(val); setPage(1); },
            },
          ]}
          onClear={clearFilters}
        />
      </div>

      <div className="card-premium overflow-hidden animate-fade-in-up stagger-2">
        <div className="overflow-x-auto">
          <table className="table-dark-ctp">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fabricante</th>
                <th>Versión</th>
                <th>Tipo</th>
                <th>Clave</th>
                <th>Adquiridas</th>
                <th>Utilizadas</th>
                <th>Disponibles</th>
                <th>Vencimiento</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="11">
                    <EmptyState onClear={clearFilters} />
                  </td>
                </tr>
              ) : (
                paginated.map((s) => {
                  const disp = s.cantidadAdquirida - s.cantidadUtilizada;
                  const pct = s.cantidadAdquirida > 0 ? (s.cantidadUtilizada / s.cantidadAdquirida) * 100 : 0;
                  return (
                    <tr key={s.id}>
                      <td>
                        <strong className="text-text-primary">{s.nombre}</strong>
                      </td>
                      <td>{s.fabricante}</td>
                      <td>
                        <span className="text-text-muted text-xs">{s.version}</span>
                      </td>
                      <td>
                        <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-white/[0.06] text-text-secondary border border-white/8">
                          {s.tipoLicencia}
                        </span>
                      </td>
                      <td>
                        <code className="text-xs text-ctp-cyan font-semibold">{s.clave}</code>
                      </td>
                      <td className="text-center">{s.cantidadAdquirida}</td>
                      <td className="text-center">{s.cantidadUtilizada}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-bold ${disp > 0 ? "text-success" : "text-danger"}`}
                          >
                            {disp}
                          </span>
                          <div className="w-16 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(pct, 100)}%`,
                                background: pct > 90 ? "#ef4444" : "#0FDBF2",
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-xs text-text-muted">{s.fechaVencimiento || "N/A"}</span>
                      </td>
                      <td>
                        <StatusBadge estado={s.estado} />
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <button
                            className="p-1.5 rounded-lg text-text-muted hover:text-ctp-cyan hover:bg-ctp-cyan/10 transition-all"
                            title="Ver detalle"
                            onClick={() => setShowDetail(s)}
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            className="p-1.5 rounded-lg text-text-muted hover:text-warning hover:bg-warning/10 transition-all"
                            title="Editar"
                            onClick={() => openEdit(s)}
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-all"
                            title="Eliminar"
                            onClick={() => setShowDelete(s)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
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
        title={editingId ? "Editar software" : "Nuevo software"}
        size="lg"
        footer={
          <>
            <button className="btn-ghost" onClick={() => setShowForm(false)}>Cancelar</button>
            <button className="btn-ctp" onClick={handleSave}>Guardar software</button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-xs font-medium text-text-muted mb-1.5">Nombre *</label>
            <input type="text" className="input-dark w-full" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Ej: Microsoft Office 365" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">Fabricante *</label>
            <input type="text" className="input-dark w-full" value={form.fabricante} onChange={(e) => setForm({ ...form, fabricante: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">Versión</label>
            <input type="text" className="input-dark w-full" value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">Tipo de licencia</label>
            <select className="select-dark w-full" value={form.tipoLicencia} onChange={(e) => setForm({ ...form, tipoLicencia: e.target.value })}>
              {TIPOS_LICENCIA.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">Clave</label>
            <input type="text" className="input-dark w-full" value={form.clave} onChange={(e) => setForm({ ...form, clave: e.target.value })} placeholder="XXXXX-XXXXX-XXXXX" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">Estado</label>
            <select className="select-dark w-full" value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
              {ESTADOS.map((es) => <option key={es} value={es}>{es}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">Adquiridas</label>
            <input type="number" className="input-dark w-full" value={form.cantidadAdquirida} onChange={(e) => setForm({ ...form, cantidadAdquirida: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">Utilizadas</label>
            <input type="number" className="input-dark w-full" value={form.cantidadUtilizada} onChange={(e) => setForm({ ...form, cantidadUtilizada: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">Fecha compra</label>
            <input type="date" className="input-dark w-full" value={form.fechaCompra} onChange={(e) => setForm({ ...form, fechaCompra: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">Vencimiento</label>
            <input type="date" className="input-dark w-full" value={form.fechaVencimiento} onChange={(e) => setForm({ ...form, fechaVencimiento: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">Proveedor</label>
            <input type="text" className="input-dark w-full" value={form.proveedor} onChange={(e) => setForm({ ...form, proveedor: e.target.value })} />
          </div>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal show={!!showDetail} onClose={() => setShowDetail(null)} title="Detalle del software" size="lg">
        {showDetail && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Info General */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <h6 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
                <Box size={16} className="text-ctp-cyan" />
                Información General
              </h6>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Nombre:</span>
                  <span className="text-text-secondary font-medium">{showDetail.nombre}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Fabricante:</span>
                  <span className="text-text-secondary">{showDetail.fabricante}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Versión:</span>
                  <span className="text-text-secondary">{showDetail.version}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Tipo:</span>
                  <span className="text-text-secondary">{showDetail.tipoLicencia}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Clave:</span>
                  <code className="text-ctp-cyan font-semibold">{showDetail.clave}</code>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-text-muted">Estado:</span>
                  <StatusBadge estado={showDetail.estado} />
                </div>
              </div>
            </div>

            {/* Licencias */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <h6 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
                <Key size={16} className="text-ctp-cyan" />
                Licencias
              </h6>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Adquiridas:</span>
                  <span className="text-text-secondary">{showDetail.cantidadAdquirida}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Utilizadas:</span>
                  <span className="text-text-secondary">{showDetail.cantidadUtilizada}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Disponibles:</span>
                  <span className="text-success font-bold">{showDetail.cantidadAdquirida - showDetail.cantidadUtilizada}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Vencimiento:</span>
                  <span className="text-text-secondary">{showDetail.fechaVencimiento || "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Proveedor:</span>
                  <span className="text-text-secondary">{showDetail.proveedor || "-"}</span>
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
        message={`No se puede deshacer la eliminación de ${showDelete?.nombre}.`}
      />
    </div>
  );
}
