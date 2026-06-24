import CategoryBadge from './CategoryBadge'
import { formatPrice, formatDate } from '../utils/format'

export default function ProductCardGrid({ products }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
      {products.map((p, idx) => (
        <div
          key={p.id}
          className="glass animate-slide-up rounded-xl p-4 shadow-glass transition-transform duration-200 hover:-translate-y-0.5"
          style={{ animationDelay: `${Math.min(idx, 12) * 30}ms` }}
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium leading-snug text-ink_text-primary">
              {p.name}
            </h3>
            <span className="shrink-0 font-mono text-sm font-semibold text-mint">
              {formatPrice(p.price)}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <CategoryBadge category={p.category} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-ink-border/60 pt-3 text-xs text-ink_text-muted">
            <div>
              <p className="font-mono uppercase tracking-wider text-[10px]">Created</p>
              <p className="mt-0.5 text-ink_text-primary/80">{formatDate(p.created_at)}</p>
            </div>
            <div>
              <p className="font-mono uppercase tracking-wider text-[10px]">Updated</p>
              <p className="mt-0.5 text-ink_text-primary/80">{formatDate(p.updated_at)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
