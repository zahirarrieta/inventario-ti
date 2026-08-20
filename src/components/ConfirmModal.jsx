import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import ButtonSpinner from "./ButtonSpinner";

export default function ConfirmModal({ show, onClose, onConfirm, title = "¿Está seguro?", message = "Esta acción no se puede deshacer.", confirmLabel = "Eliminar", saving = false }) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-ghost" onClick={onClose} disabled={saving}>
            Cancelar
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-danger-ctp" onClick={onConfirm} disabled={saving}>
            {saving ? <><ButtonSpinner size={16} /> Eliminando...</> : confirmLabel}
          </motion.button>
        </>
      }
    >
      <div className="flex flex-col items-center py-4 text-center">
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-14 h-14 rounded-2xl bg-danger/10 border border-danger/20 flex items-center justify-center mb-4"
        >
          <AlertTriangle size={24} className="text-danger" />
        </motion.div>
        <p className="text-sm text-text-secondary max-w-xs">{message}</p>
      </div>
    </Modal>
  );
}
