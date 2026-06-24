import { formatPrice } from '../utils/format'

function StatCard({ label, value, accent = 'mint', sublabel }) {
  const accentClass =
    accent === 'mint'
      ? 'text-mint'
      : accent === 'violet'
      ? 'text-violet'
      : accent === 'red'
      ? 'text-red-400'
      : 'text-ink_text-primary'

  return (
    <div className="glass animate-slide-up rounded-xl px-4 py-4 shadow-glass transition-transform duration-200 hover:-translate-y-0.5 sm:px-5 sm:py-5">
      <p className="font-mono text-[11px] uppercase tracking-wider text-ink_text-muted">
        {label}
      </p>
      <p className={`mt-2 font-display text-2xl font-semibold tracking-tight ${accentClass} sm:text-3xl`}>
        {value}
      </p>
      {sublabel && (
        <p className="mt-1 text-xs text-ink_text-muted">{sublabel}</p>
      )}
    </div>
  )
}

export default function StatsBar({
  productsLoaded,
  category,
  averagePrice,
  healthStatus,
  hasMore,
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <StatCard
        label="Products Loaded"
        value={productsLoaded}
        sublabel={hasMore ? 'More available' : 'All loaded'}
        accent="mint"
      />
      <StatCard
        label="Current Category"
        value={category === 'All' ? 'All' : category}
        sublabel="Active filter"
        accent="violet"
      />
      <StatCard
        label="Average Price"
        value={productsLoaded > 0 ? formatPrice(averagePrice) : '—'}
        sublabel="Across loaded items"
      />
      <StatCard
        label="API Status"
        value={
          healthStatus === 'online'
            ? 'Healthy'
            : healthStatus === 'offline'
            ? 'Down'
            : 'Checking'
        }
        sublabel="GET /health"
        accent={
          healthStatus === 'online'
            ? 'mint'
            : healthStatus === 'offline'
            ? 'red'
            : 'default'
        }
      />
    </div>
  )
}
