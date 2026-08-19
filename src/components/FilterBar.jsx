import { Search, X } from "lucide-react";

export default function FilterBar({ search, onSearchChange, searchPlaceholder = "Buscar...", filters = [], onClear }) {
  const hasFilters = search || filters.some((f) => f.value);

  return (
    <div className="filter-bar flex flex-wrap items-stretch gap-3">
      <div className="search-field min-w-[220px]">
        <Search size={16} className="text-text-muted shrink-0" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {filters.map((f) => (
        <select
          key={f.key}
          value={f.value}
          onChange={(e) => f.onChange(e.target.value)}
          className="select-dark text-sm min-w-[160px] w-auto flex-1 sm:flex-none sm:max-w-[220px]"
        >
          <option value="">{f.placeholder}</option>
          {f.options.map((opt) => {
            const value = typeof opt === "object" ? opt.value : opt;
            const label = typeof opt === "object" ? opt.label : opt;
            return <option key={value} value={value}>{label}</option>;
          })}
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
