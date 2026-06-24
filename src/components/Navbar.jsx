const CATEGORIES_DOC_HINT = 'GET /products · cursor-paginated'

export default function Navbar({ healthStatus }) {
  const dot =
    healthStatus === 'online'
      ? 'bg-mint shadow-[0_0_8px_2px_rgba(110,231,183,0.6)]'
      : healthStatus === 'offline'
      ? 'bg-red-400 shadow-[0_0_8px_2px_rgba(248,113,113,0.5)]'
      : 'bg-ink_text-muted'

  return (
    <header className="sticky top-0 z-40 border-b border-ink-border/80 glass-strong">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-border bg-ink-panel">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path
                d="M9 6 L5 12 L9 18"
                stroke="#6EE7B7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 6 L19 12 L15 18"
                stroke="#A78BFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="leading-tight">
            <h1 className="font-display text-base font-semibold tracking-tight text-ink_text-primary sm:text-lg">
              Product Catalog
            </h1>
            <p className="hidden font-mono text-[11px] text-ink_text-muted sm:block">
              {CATEGORIES_DOC_HINT}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-ink-border bg-ink-panel/60 px-3 py-1.5 sm:flex">
            <span className={`h-2 w-2 rounded-full ${dot} transition-colors`} />
            <span className="font-mono text-xs text-ink_text-muted">
              {healthStatus === 'online'
                ? 'API online'
                : healthStatus === 'offline'
                ? 'API offline'
                : 'Checking API…'}
            </span>
          </div>
          <a
            href={import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/docs` : '#'}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-ink-border bg-ink-panel px-3 py-1.5 text-xs font-medium text-ink_text-primary transition-colors hover:border-mint/40 hover:text-mint sm:text-sm"
          >
            API Docs
          </a>
        </div>
      </div>
    </header>
  )
}
