import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function Modal({ show, onClose, title, children, footer, size = "lg" }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(0,0,0,0.60)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className={`w-full ${sizeClass} max-h-[90vh] flex flex-col rounded-2xl border animate-scale-in overflow-hidden modal-ctp`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0 modal-ctp-header">
          <h3 className="text-lg font-bold modal-ctp-title">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-xl modal-ctp-close transition-all">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 modal-ctp-body">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t shrink-0 modal-ctp-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
