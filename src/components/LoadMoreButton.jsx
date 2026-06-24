export default function LoadMoreButton({ onClick, isLoading, hasMore }) {
  if (!hasMore) {
    return (
      <p className="py-2 text-center font-mono text-xs text-ink_text-muted">
        — end of results —
      </p>
    )
  }

  return (
    <div className="flex justify-center py-2">
      <button
        type="button"
        onClick={onClick}
        disabled={isLoading}
        className="group relative flex items-center gap-2 rounded-lg border border-ink-border bg-ink-panel px-6 py-2.5 text-sm font-medium text-ink_text-primary transition-all duration-150 hover:border-mint/40 hover:text-mint disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading && (
          <svg className="h-4 w-4 animate-spin text-mint" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {isLoading ? 'Loading…' : 'Load More'}
      </button>
    </div>
  )
}
