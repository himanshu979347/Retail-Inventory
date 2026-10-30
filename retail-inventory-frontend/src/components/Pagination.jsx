export default function Pagination({ page, totalPages, onChange, totalLabel }) {
  if (totalPages <= 1 && !totalLabel) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm">
      <span className="text-muted">{totalLabel}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-2 py-1 rounded text-muted hover:bg-bg disabled:opacity-40"
        >
          ‹
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-7 h-7 rounded text-xs font-medium ${
              p === page ? 'bg-primary text-white' : 'text-ink hover:bg-bg'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="px-2 py-1 rounded text-muted hover:bg-bg disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </div>
  )
}
