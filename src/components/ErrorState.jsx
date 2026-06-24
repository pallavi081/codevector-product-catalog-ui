export default function ErrorState({ message, onRetry }) {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center rounded-xl border border-red-400/20 bg-red-400/5 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-400/30 bg-red-400/10">
        <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="mt-4 font-display text-base font-medium text-ink_text-primary">
        Couldn&apos;t load products
      </p>
      <p className="mt-1.5 max-w-md text-sm text-ink_text-muted">
        {message || 'An unexpected error occurred. Please try again.'}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-400/15"
        >
          Try again
        </button>
      )}
    </div>
  )
}
