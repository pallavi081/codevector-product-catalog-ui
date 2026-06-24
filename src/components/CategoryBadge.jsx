const COLOR_MAP = {
  Electronics: 'border-violet/30 bg-violet/10 text-violet',
  Fashion: 'border-pink-400/30 bg-pink-400/10 text-pink-300',
  Books: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  Home: 'border-mint/30 bg-mint/10 text-mint',
  Sports: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
  Beauty: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
  Automotive: 'border-orange-400/30 bg-orange-400/10 text-orange-300',
}

const DEFAULT_COLOR = 'border-ink-border bg-ink-panel text-ink_text-muted'

export default function CategoryBadge({ category }) {
  const classes = COLOR_MAP[category] || DEFAULT_COLOR
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${classes}`}
    >
      {category || 'Uncategorized'}
    </span>
  )
}
