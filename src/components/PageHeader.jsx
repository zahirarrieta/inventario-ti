export default function PageHeader({ title, subtitle, actionLabel, actionIcon: ActionIcon, onAction }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
      </div>
      {onAction && (
        <button onClick={onAction} className="btn-ctp shrink-0">
          {ActionIcon && <ActionIcon size={16} />}
          {actionLabel || "Nuevo"}
        </button>
      )}
    </div>
  );
}
