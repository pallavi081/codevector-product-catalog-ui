export default function EmptyState({ message, hint, actionLabel, onAction }) {
  return (
    <div className="glass animate-fade-in flex flex-col items-center justify-center rounded-xl px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-ink-border bg-ink-panel">
        <svg className="h-6 w-6 text-ink_text-muted" fill="none" viewBox="0 0 24 24">
          <rect x="4" y="7" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </div>
      <p className="mt-4 font-display text-base font-medium text-ink_text-primary">
        {message || 'No products found'}
      </p>
      {hint && <p className="mt-1.5 max-w-sm text-sm text-ink_text-muted">{hint}</p>}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-lg border border-mint/30 bg-mint/10 px-4 py-2 text-sm font-medium text-mint transition-colors hover:bg-mint/15"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
