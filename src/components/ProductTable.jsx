import CategoryBadge from './CategoryBadge'
import { formatPrice, formatDate } from '../utils/format'

export default function ProductTable({ products }) {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-ink-border lg:block">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-ink-border bg-ink-panel/80">
            <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-ink_text-muted">
              Product
            </th>
            <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-ink_text-muted">
              Category
            </th>
            <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-ink_text-muted">
              Price
            </th>
            <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-ink_text-muted">
              Created
            </th>
            <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-ink_text-muted">
              Updated
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, idx) => (
            <tr
              key={p.id}
              className="animate-fade-in border-b border-ink-border/60 bg-ink-panel/30 transition-colors last:border-b-0 hover:bg-ink-panel/70"
              style={{ animationDelay: `${Math.min(idx, 12) * 25}ms` }}
            >
              <td className="px-5 py-3.5 font-medium text-ink_text-primary">
                {p.name}
              </td>
              <td className="px-5 py-3.5">
                <CategoryBadge category={p.category} />
              </td>
              <td className="px-5 py-3.5 font-mono text-ink_text-primary">
                {formatPrice(p.price)}
              </td>
              <td className="px-5 py-3.5 text-ink_text-muted">
                {formatDate(p.created_at)}
              </td>
              <td className="px-5 py-3.5 text-ink_text-muted">
                {formatDate(p.updated_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
