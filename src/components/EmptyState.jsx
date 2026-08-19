import { Inbox, RotateCcw } from "lucide-react";

export default function EmptyState({ icon: IconComp, title = "Sin resultados", message = "No se encontraron registros.", onClear }) {
  const LucideIcon = IconComp || Inbox;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-border-subtle flex items-center justify-center mb-4">
        <LucideIcon size={28} className="text-text-muted" />
      </div>
      <h5 className="text-base font-semibold text-text-primary mb-1">{title}</h5>
      <p className="text-sm text-text-muted text-center max-w-xs">{message}</p>
      {onClear && (
        <button onClick={onClear} className="btn-ghost mt-4 text-xs">
          <RotateCcw size={14} />
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
