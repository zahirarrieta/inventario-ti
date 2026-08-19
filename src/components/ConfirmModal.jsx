import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

export default function ConfirmModal({ show, onClose, onConfirm, title = "¿Está seguro?", message = "Esta acción no se puede deshacer.", confirmLabel = "Eliminar" }) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button className="btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn-danger-ctp" onClick={onConfirm}>{confirmLabel}</button>
        </>
      }
    >
      <div className="flex flex-col items-center py-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-danger/10 border border-danger/20 flex items-center justify-center mb-4">
          <AlertTriangle size={24} className="text-danger" />
        </div>
        <p className="text-sm text-text-secondary max-w-xs">{message}</p>
      </div>
    </Modal>
  );
}
