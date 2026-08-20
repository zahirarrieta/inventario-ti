import { motion, AnimatePresence } from "framer-motion";
import { Save, Trash2, UserCheck, Wrench } from "lucide-react";

const ICON_MAP = {
  save: Save,
  delete: Trash2,
  assign: UserCheck,
  maintenance: Wrench,
};

const COLOR_MAP = {
  save: { ring: "#0FDBF2", glow: "rgba(15,219,242,0.15)", text: "Guardando" },
  delete: { ring: "#ef4444", glow: "rgba(239,68,68,0.15)", text: "Eliminando" },
  assign: { ring: "#10b981", glow: "rgba(16,185,129,0.15)", text: "Asignando" },
  maintenance: { ring: "#f59e0b", glow: "rgba(245,158,11,0.15)", text: "Procesando" },
};

export default function SavingOverlay({ show, type = "save", label }) {
  const Icon = ICON_MAP[type] || Save;
  const palette = COLOR_MAP[type] || COLOR_MAP.save;
  const text = label || palette.text;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "rgba(6,15,32,0.65)", backdropFilter: "blur(6px)" }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="flex flex-col items-center gap-5"
          >
            {/* Anillos animados */}
            <div className="relative w-28 h-28">
              {/* Anillo exterior gira lento */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: `3px solid transparent`,
                  borderTopColor: palette.ring,
                  borderRightColor: `${palette.ring}44`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              {/* Anillo medio gira al revés */}
              <motion.div
                className="absolute inset-2 rounded-full"
                style={{
                  border: `2px solid transparent`,
                  borderBottomColor: palette.ring,
                  borderLeftColor: `${palette.ring}66`,
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              {/* glow de fondo */}
              <div
                className="absolute inset-3 rounded-full"
                style={{ background: palette.glow }}
              />
              {/* Icono central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon size={32} style={{ color: palette.ring }} strokeWidth={2} />
                </motion.div>
              </div>
            </div>

            {/* Texto */}
            <div className="text-center">
              <motion.p
                className="text-white font-semibold text-base tracking-wide"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                {text}
              </motion.p>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: palette.ring }}
                    animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
