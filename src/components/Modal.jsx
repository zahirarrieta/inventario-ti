import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

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

  if (!show) return null;

  const sizeClasses = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };
  const sizeClass = sizeClasses[size] || sizeClasses.lg;

  return createPortal(
    <div
      ref={overlayRef}
      className="modal-ctp-overlay animate-fade-in"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className={`${sizeClass} w-full modal-ctp animate-scale-in`}>
        <div className="modal-ctp-header">
          <h3 className="modal-ctp-title">{title}</h3>
          <button
            onClick={onClose}
            className="modal-ctp-close w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            aria-label="Cerrar"
          >
            <X size={16} />
          </button>
        </div>

        <div className="modal-ctp-body">{children}</div>

        {footer && <div className="modal-ctp-footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
