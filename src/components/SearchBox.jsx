export default function SearchBox({ value, onChange, resultCount, totalCount }) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink_text-muted"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search loaded products…"
        aria-label="Search loaded products by name or category"
        className="w-full rounded-lg border border-ink-border bg-ink-panel/60 py-2 pl-9 pr-3 text-sm text-ink_text-primary placeholder:text-ink_text-muted/70 outline-none transition-colors focus:border-mint/40"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink_text-muted transition-colors hover:text-ink_text-primary"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
      {value && (
        <p className="absolute -bottom-5 left-0 font-mono text-[11px] text-ink_text-muted">
          {resultCount} of {totalCount} match
        </p>
      )}
    </div>
  )
}
