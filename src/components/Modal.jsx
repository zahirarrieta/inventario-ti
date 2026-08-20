import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, scale: 0.97, y: 6, transition: { duration: 0.1 } },
};

export default function Modal({ show, onClose, title, children, footer, size = "lg" }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (show) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [show]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && show) onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [show, onClose]);

  const sizeClasses = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };
  const sizeClass = sizeClasses[size] || sizeClasses.lg;

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          ref={overlayRef}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="modal-ctp-overlay"
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`${sizeClass} w-full modal-ctp`}
          >
            <div className="modal-ctp-header">
              <h3 className="modal-ctp-title">{title}</h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="modal-ctp-close w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                aria-label="Cerrar"
              >
                <X size={16} />
              </motion.button>
            </div>

            <div className="modal-ctp-body">{children}</div>

            {footer && <div className="modal-ctp-footer">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
