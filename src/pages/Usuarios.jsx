import { useState, useMemo } from "react";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getEquipos,
  getPerifericos,
  getMonitores,
} from "../services/inventarioService";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import ConfirmModal from "../components/ConfirmModal";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";
import ButtonSpinner from "../components/ButtonSpinner";
import { Eye, Pencil, Trash2, Users, Box } from "lucide-react";

const ESTADOS_U = ["Activo", "Inactivo"];
const AREAS = [
  "Sistemas",
  "Contabilidad",
  "Recursos Humanos",
  "Gerencia",
  "Ventas",
  "Recepción",
  "Administración",
  "Logística",
  "Almacén",
];
const UBICACIONES = [
  "Oficina Principal - Piso 1",
  "Oficina Principal - Piso 2",
  "Oficina Gerencia - Piso 3",
  "Oficina Ventas - Piso 1",
  "Oficina Contabilidad - Piso 1",
  "Recepción - Piso 1",
  "Oficina Administración - Piso 1",
];
const PER_PAGE = 10;
const emptyForm = {
  nombre: "",
  apellido: "",
  documento: "",
  correo: "",
  telefono: "",
  area: "",
  cargo: "",
  ubicacion: "",
  estado: "Activo",
};

export default function Usuarios({ showToast }) {
  const [usuarios, setUsuarios] = useState(() => getUsuarios());
  const [search, setSearch] = useState("");
  const [fArea, setFArea] = useState("");
  const [fEstado, setFEstado] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [showUserAssets, setShowUserAssets] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [showDelete, setShowDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(
    () =>
      usuarios.filter((u) => {
        const t = search.toLowerCase();
        return (
          (!t ||
            u.nombre.toLowerCase().includes(t) ||
            u.apellido.toLowerCase().includes(t) ||
            u.correo.toLowerCase().includes(t) ||
            u.documento.includes(t)) &&
          (!fArea || u.area === fArea) &&
          (!fEstado || u.estado === fEstado)
        );
      }),
    [usuarios, search, fArea, fEstado]
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const getUserAssets = (userId) => {
    const eq = getEquipos().filter((e) => e.usuarioId === userId);
    const mn = getMonitores().filter((m) => m.usuarioId === userId);
    const pf = getPerifericos().filter((p) => p.usuarioId === userId);
    return [
      ...eq.map((e) => ({ ...e, categoria: e.tipo })),
      ...mn.map((m) => ({ ...m, categoria: "Monitor" })),
      ...pf.map((p) => ({ ...p, categoria: p.tipo })),
    ];
  };

  const getInitials = (u) => {
    const n = (u.nombre || "").charAt(0);
    const a = (u.apellido || "").charAt(0);
    return `${n}${a}`.toUpperCase();
  };

  const openNew = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (u) => {
    setForm({ ...u });
    setEditingId(u.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    if (editingId) {
      updateUsuario(editingId, form);
      showToast("Usuario actualizado.");
    } else {
      createUsuario(form);
      showToast("Usuario creado.");
    }
    setUsuarios(getUsuarios());
    setShowForm(false); setSaving(false);
  };

  const handleDelete = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 300));
    deleteUsuario(showDelete.id);
    setUsuarios(getUsuarios());
    setShowDelete(null);
    showToast("Usuario eliminado.", "danger"); setSaving(false);
  };

  const clearFilters = () => {
    setSearch("");
    setFArea("");
    setFEstado("");
    setPage(1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Usuarios"
        subtitle="Gestión de usuarios y asignación de activos"
        actionLabel="Nuevo usuario"
        onAction={openNew}
        actionIcon={Users}
      />

      <div className="card-premium p-4 animate-fade-in-up">
        <FilterBar
          search={search}
          onSearchChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          searchPlaceholder="Buscar por nombre, correo o documento"
          filters={[
            {
              key: "area",
              value: fArea,
              placeholder: "Todas las áreas",
              options: AREAS,
              onChange: (val) => {
                setFArea(val);
                setPage(1);
              },
            },
            {
              key: "estado",
              value: fEstado,
              placeholder: "Todos los estados",
              options: ESTADOS_U,
              onChange: (val) => {
                setFEstado(val);
                setPage(1);
              },
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
                <th>Documento</th>
                <th>Correo</th>
                <th>Área</th>
                <th>Cargo</th>
                <th>Ubicación</th>
                <th>Activos</th>
                <th>Estado</th>
                <th>Acciones</th>
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
                paginated.map((u) => {
                  const ac = getUserAssets(u.id).length;
                  return (
                    <tr key={u.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ctp-cyan to-ctp-blue flex items-center justify-center text-xs font-bold text-white shrink-0">
                            {getInitials(u)}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-text-primary truncate">
                              {u.nombre} {u.apellido}
                            </div>
                            <div className="text-xs text-text-muted truncate">
                              {u.correo}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-text-secondary text-sm">
                          {u.documento}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs text-text-muted hidden lg:inline">
                          {u.correo}
                        </span>
                      </td>
                      <td>
                        <span className="text-text-secondary text-sm">
                          {u.area}
                        </span>
                      </td>
                      <td>
                        <span className="text-text-secondary text-sm">
                          {u.cargo}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs text-text-muted">
                          {u.ubicacion || "-"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-ctp-cyan/10 text-ctp-cyan border border-ctp-cyan/20 hover:bg-ctp-cyan/20 transition-all"
                          onClick={() => setShowUserAssets(u)}
                        >
                          <Box size={12} />
                          {ac}
                        </button>
                      </td>
                      <td>
                        <StatusBadge estado={u.estado} />
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="btn-icon" title="Ver detalle" onClick={() => setShowDetail(u)}><Eye size={16} /></button>
                          <button className="btn-icon edit" title="Editar" onClick={() => openEdit(u)}><Pencil size={16} /></button>
                          <button className="btn-icon danger" title="Eliminar" onClick={() => setShowDelete(u)}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })
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

      {/* Form Modal */}
      <Modal
        show={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? "Editar usuario" : "Nuevo usuario"}
        size="lg"
        footer={
          <>
            <button className="btn-ghost" onClick={() => setShowForm(false)} disabled={saving}>
              Cancelar
            </button>
            <button className="btn-ctp" onClick={handleSave} disabled={saving}>
              {saving ? <><ButtonSpinner size={16} /> Guardando...</> : (editingId ? "Actualizar" : "Crear usuario")}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="form-label">
              Nombre *
            </label>
            <input
              type="text"
              className="input-dark w-full"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">
              Apellido *
            </label>
            <input
              type="text"
              className="input-dark w-full"
              value={form.apellido}
              onChange={(e) => setForm({ ...form, apellido: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">
              Documento *
            </label>
            <input
              type="text"
              className="input-dark w-full"
              value={form.documento}
              onChange={(e) => setForm({ ...form, documento: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">
              Correo *
            </label>
            <input
              type="email"
              className="input-dark w-full"
              value={form.correo}
              onChange={(e) => setForm({ ...form, correo: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">
              Teléfono
            </label>
            <input
              type="text"
              className="input-dark w-full"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">
              Área *
            </label>
            <select
              className="select-dark w-full"
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
            >
              <option value="">Seleccionar...</option>
              {AREAS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">
              Cargo *
            </label>
            <input
              type="text"
              className="input-dark w-full"
              value={form.cargo}
              onChange={(e) => setForm({ ...form, cargo: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">
              Estado
            </label>
            <select
              className="select-dark w-full"
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
            >
              {ESTADOS_U.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">
              Ubicación
            </label>
            <select
              className="select-dark w-full"
              value={form.ubicacion}
              onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
            >
              <option value="">Seleccionar...</option>
              {UBICACIONES.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal
        show={!!showDetail}
        onClose={() => setShowDetail(null)}
        title="Detalle del usuario"
        size="lg"
      >
        {showDetail && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Personal Info */}
            <div className="inset-panel">
              <h6 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
                <Users size={16} className="text-ctp-cyan" />
                Información Personal
              </h6>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Nombre:</span>
                  <span className="text-text-primary font-medium">
                    {showDetail.nombre} {showDetail.apellido}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Documento:</span>
                  <span className="text-text-secondary">
                    {showDetail.documento}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Correo:</span>
                  <span className="text-text-secondary">
                    {showDetail.correo}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Teléfono:</span>
                  <span className="text-text-secondary">
                    {showDetail.telefono || "-"}
                  </span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-text-muted">Estado:</span>
                  <StatusBadge estado={showDetail.estado} />
                </div>
              </div>
            </div>

            {/* Laboral Info */}
            <div className="inset-panel">
              <h6 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
                <Box size={16} className="text-ctp-cyan" />
                Información Laboral
              </h6>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Área:</span>
                  <span className="text-text-secondary">
                    {showDetail.area}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Cargo:</span>
                  <span className="text-text-secondary">
                    {showDetail.cargo}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Ubicación:</span>
                  <span className="text-text-secondary">
                    {showDetail.ubicacion}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Activos:</span>
                  <span className="text-ctp-cyan font-semibold">
                    {getUserAssets(showDetail.id).length} asignados
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* User Assets Modal */}
      <Modal
        show={!!showUserAssets}
        onClose={() => setShowUserAssets(null)}
        title={`Activos de ${showUserAssets ? showUserAssets.nombre + " " + showUserAssets.apellido : ""}`}
        size="lg"
      >
        {showUserAssets && (
          <div className="overflow-x-auto">
            <table className="table-dark-ctp">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Categoría</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {getUserAssets(showUserAssets.id).length === 0 ? (
                  <tr>
                    <td colSpan="5">
                      <div className="py-8 text-center">
                        <p className="text-text-muted text-sm">
                          Sin activos asignados.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  getUserAssets(showUserAssets.id).map((a) => (
                    <tr key={a.id}>
                      <td>
                        <code className="text-ctp-cyan font-semibold text-sm">
                          {a.codigo}
                        </code>
                      </td>
                      <td>{a.categoria}</td>
                      <td>{a.marca}</td>
                      <td>{a.modelo}</td>
                      <td>
                        <StatusBadge estado={a.estado} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </Modal>

      <ConfirmModal
        show={!!showDelete}
        onClose={() => setShowDelete(null)}
        onConfirm={handleDelete}
        saving={saving}
        message={`Eliminar usuario ${showDelete?.nombre} ${showDelete?.apellido}?`}
      />
    </div>
  );
}
