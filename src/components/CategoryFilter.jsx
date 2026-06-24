const CATEGORIES = [
  'All',
  'Electronics',
  'Fashion',
  'Books',
  'Home',
  'Sports',
  'Beauty',
  'Automotive',
]

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {CATEGORIES.map((cat) => {
        const isActive = selected === cat
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            aria-pressed={isActive}
            className={[
              'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-150 sm:text-sm',
              isActive
                ? 'border-mint/40 bg-mint/10 text-mint shadow-glow'
                : 'border-ink-border bg-ink-panel/50 text-ink_text-muted hover:border-ink-border hover:text-ink_text-primary hover:bg-ink-panel',
            ].join(' ')}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
