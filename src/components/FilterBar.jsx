import { Search, X } from "lucide-react";

export default function FilterBar({ search, onSearchChange, searchPlaceholder = "Buscar...", filters = [], onClear }) {
  const hasFilters = search || filters.some((f) => f.value);

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
      <div className="flex items-center gap-2 flex-1 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 transition-all focus-within:border-ctp-cyan/40 focus-within:bg-white/[0.06]">
        <Search size={16} className="text-text-muted shrink-0" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted w-full"
        />
      </div>

      {filters.map((f) => (
        <select
          key={f.key}
          value={f.value}
          onChange={(e) => f.onChange(e.target.value)}
          className="select-dark text-sm min-w-[140px]"
        >
          <option value="">{f.placeholder}</option>
          {f.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ))}

      {hasFilters && (
        <button onClick={onClear} className="btn-ghost text-xs shrink-0">
          <X size={14} />
          Limpiar
        </button>
      )}
    </div>
  );
}
