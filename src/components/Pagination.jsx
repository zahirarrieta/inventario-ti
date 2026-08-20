export default function Pagination({ page, totalPages, totalItems, itemsPerPage, onPageChange }) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * itemsPerPage + 1;
  const end = Math.min(page * itemsPerPage, totalItems);

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="table-footer flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5">
      <span className="text-xs text-text-muted">
        Mostrando <span className="font-semibold text-text-secondary">{start}</span> a <span className="font-semibold text-text-secondary">{end}</span> de <span className="font-semibold text-text-secondary">{totalItems}</span>
      </span>
      <div className="pagination-dark">
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>‹</button>
        {getPages().map((p, i) =>
          p === "..." ? (
            <span key={`e${i}`} className="px-1 text-text-muted text-xs">…</span>
          ) : (
            <button key={p} className={p === page ? "active" : ""} onClick={() => onPageChange(p)}>{p}</button>
          )
        )}
        <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>›</button>
      </div>
    </div>
  );
}
